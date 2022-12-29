import { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '@/libs/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId } = req.body;

  if (req.method !== 'POST') return res.status(405);

  if (!priceId) return res.status(400);

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: `${process.env.NEXT_URL}/`,
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }]
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  });
}
