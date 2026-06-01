'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const LEAD_STATUSES = [
  'New',
  'WhatsApp Clicked',
  'Conversation Started',
  'Awaiting Details',
  'Confirmed',
  'Deposit Pending',
  'Deposit Paid',
  'Completed',
  'Lost',
  'Cancelled',
] as const;

type LeadStatus = (typeof LEAD_STATUSES)[number];

function isLeadStatus(value: string): value is LeadStatus {
  return LEAD_STATUSES.includes(value as LeadStatus);
}

export default function LeadStatusSelect({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function updateStatus(nextStatus: string) {
    if (!isLeadStatus(nextStatus)) return;

    const previousStatus = status;
    setStatus(nextStatus);
    setError(null);

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lead_status: nextStatus }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Status update failed.');
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (updateError) {
      setStatus(previousStatus);
      setError(updateError instanceof Error ? updateError.message : 'Status update failed.');
    }
  }

  return (
    <div className="status-editor">
      <select
        aria-label="Update lead status"
        value={status}
        disabled={isPending}
        onChange={(event) => updateStatus(event.target.value)}
      >
        {LEAD_STATUSES.map((leadStatus) => (
          <option key={leadStatus} value={leadStatus}>
            {leadStatus}
          </option>
        ))}
      </select>
      {isPending ? <span className="status-help">Saving...</span> : null}
      {error ? <span className="status-error">{error}</span> : null}
    </div>
  );
}
