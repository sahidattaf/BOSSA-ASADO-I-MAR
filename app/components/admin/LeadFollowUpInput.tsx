'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

function toDateTimeLocalValue(value: string | null | undefined) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

export default function LeadFollowUpInput({
  leadId,
  followUpDue,
}: {
  leadId: string;
  followUpDue: string | null;
}) {
  const router = useRouter();
  const [value, setValue] = useState(toDateTimeLocalValue(followUpDue));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function saveFollowUpDue(nextValue = value) {
    setError(null);
    setSaved(false);

    let isoValue: string | null = null;

    if (nextValue.trim()) {
      const date = new Date(nextValue);

      if (Number.isNaN(date.getTime())) {
        setError('Enter a valid follow-up date.');
        return;
      }

      isoValue = date.toISOString();
    }

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ follow_up_due: isoValue }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Follow-up update failed.');
      }

      setSaved(true);
      startTransition(() => {
        router.refresh();
      });
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Follow-up update failed.');
    }
  }

  async function clearFollowUpDue() {
    setValue('');
    await saveFollowUpDue('');
  }

  return (
    <div className="follow-up-editor">
      <input
        aria-label="Follow-up due date and time"
        type="datetime-local"
        value={value}
        disabled={isPending}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className="follow-up-actions">
        <button type="button" disabled={isPending} onClick={() => saveFollowUpDue()}>
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <button type="button" disabled={isPending} className="secondary" onClick={clearFollowUpDue}>
          Clear
        </button>
      </div>
      {saved ? <span className="follow-up-help">Saved</span> : null}
      {error ? <span className="follow-up-error">{error}</span> : null}
    </div>
  );
}
