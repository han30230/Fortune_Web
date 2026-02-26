import Stripe from "stripe";

/**
 * Stripe server-side instance (API routes / Server Components only).
 * Uses STRIPE_SECRET_KEY. Do not use in client components.
 */
function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export const stripe = getStripe();
