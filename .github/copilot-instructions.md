# Copilot Instructions for Sunset Landing

- This is a Next.js 16 app-router project using `@/*` path aliases from `tsconfig.json`.
- The main page is in `app/page.tsx`; it is a client component and renders the booking flow via `src/components/booking/BookingModal.tsx`.
- Booking form state, validation, and checkout submission are handled entirely in `BookingModal.tsx`.
- Checkout creation is implemented in `app/api/checkout/route.ts`. It builds line items from `src/lib/checkout-builder.ts` and creates a Stripe session through `src/lib/payments/registry.ts`.
- Payment provider selection is controlled by `PAYMENT_PROVIDER` but the current registry only has `stripe`. Do not assume a working Square provider exists yet.
- Webhook processing is implemented in `app/api/webhooks/stripe/route.ts`; it validates Stripe signatures and sends confirmation emails via `src/lib/email`.
- Email sending uses Resend with `RESEND_API_KEY` and HTML templates in `src/lib/email/templates.ts`.
- The UI uses Tailwind v4 utility classes and simple reusable pieces under `src/components/ui/` like `SectionReveal`, `GradientButton`, and `ParticipantCounter`.
- `src/constants/index.ts` defines pricing, time slots, pickup locations, and other content-driven data.
- Important env variables: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, and optionally `PAYMENT_PROVIDER`.
- Build and dev commands are standard Next.js scripts from `package.json`: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
- There are no dedicated test scripts in this repo.
- If extending the payment flow, update `src/lib/payments/types.ts` and `src/lib/payments/registry.ts` first, then wire the new provider implementation.
- Be careful: the booking modal sends `promoApplied` to `/api/checkout`, but the backend currently ignores it. Keep changes aligned with the existing booking metadata pattern.
- Prefer small changes in the `app/api` route handlers when modifying server-side behavior; these routes are the source of truth for checkout and webhook logic.
