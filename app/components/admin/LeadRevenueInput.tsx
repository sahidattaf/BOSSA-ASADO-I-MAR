'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type Currency = 'XCG' | 'USD';

function cleanInitialValue(value: number | null | undefined) {
  if (value === null || value === undefined) return '';
  return value.toFixed(2);
}

export default function LeadRevenueInput({
  leadId,
  actualValue,
  currency,
}: {
  leadId: string;
  actualValue: number | null;
  currency: Currency;
}) {
  const router = useRouter();
  const [value, setValue] = useState(cleanInitialValue(actualValue));
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function saveRevenue() {
    setError(null);
    setSaved(false);

    const trimmedValue = value.trim();
    const parsedValue = trimmedValue === '' ? null : Number(trimmedValue);

    if (parsedValue !== null && (!Number.isFinite(parsedValue) || parsedValue < 0)) {
      setError('Enter a valid amount.');
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actual_value: parsedValue,
          currency: selectedCurrency,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Revenue update failed.');
      }

      setSaved(true);
      startTransition(() => {
        router.refresh();
      });
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Revenue update failed.');
    }
  }

  return (
    <div className="revenue-editor">
      <div className="revenue-row">
        <select
          aria-label="Currency"
          value={selectedCurrency}
          disabled={isPending}
          onChange={(event) => setSelectedCurrency(event.target.value as Currency)}
        >
          <option value="XCG">XCG</option>
          <option value="USD">USD</option>
        </select>
        <input
          aria-label="Actual lead revenue"
          inputMode="decimal"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={value}
          disabled={isPending}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="button" disabled={isPending} onClick={saveRevenue}>
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
      {saved ? <span className="revenue-help">Saved</span> : null}
      {error ? <span className="revenue-error">{error}</span> : null}
    </div>
  );
}
