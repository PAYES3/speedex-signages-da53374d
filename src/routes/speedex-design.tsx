import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/speedex-design')({
  beforeLoad: () => {
    throw redirect({ to: '/speedex-digital', statusCode: 301 });
  },
});
