'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const LEAD_OWNERS = [
  'Unassigned',
  'Coach Sahid',
  'Manager',
  'Kitchen',
  'Sales',
  'Events',
] as const;

type LeadOwner = (typeof LEAD_OWNERS)[number];

function normalizeOwner(owner: string | null | undefined): LeadOwner {
  if (!owner) return 'Unassigned';
  return LEAD_OWNERS.includes(owner as LeadOwner) ? (owner as LeadOwner) : 'Unassigned';
}

export default function LeadOwnerSelect({
  leadId,
  currentOwner,
}: {
  leadId: string;
  currentOwner: string | null;
}) {
  const router = useRouter();
  const [owner, setOwner] = useState<LeadOwner>(normalizeOwner(currentOwner));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function updateOwner(nextOwner: LeadOwner) {
    const previousOwner = owner;
    setOwner(nextOwner);
    setError(null);
    setSaved(false);

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ follow_up_owner: nextOwner }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Owner update failed.');
      }

      setSaved(true);
      startTransition(() => {
        router.refresh();
      });
    } catch (updateError) {
      setOwner(previousOwner);
      setError(updateError instanceof Error ? updateError.message : 'Owner update failed.');
    }
  }

  return (
    <div className="owner-editor">
      <select
        aria-label="Assign lead owner"
        value={owner}
        disabled={isPending}
        onChange={(event) => updateOwner(event.target.value as LeadOwner)}
      >
        {LEAD_OWNERS.map((leadOwner) => (
          <option key={leadOwner} value={leadOwner}>
            {leadOwner}
          </option>
        ))}
      </select>
      {isPending ? <span className="owner-help">Saving...</span> : null}
      {saved ? <span className="owner-help">Saved</span> : null}
      {error ? <span className="owner-error">{error}</span> : null}
    </div>
  );
}
