'use client';

import ErrorContent from '@/components/ErrorContent';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <ErrorContent />
      </body>
    </html>
  );
}
