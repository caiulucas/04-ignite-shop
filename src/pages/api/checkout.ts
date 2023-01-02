import { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '@/libs/stripe';

type Product = { defaultPriceId: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bag }: { bag: Product[] } = req.body;

  if (req.method !== 'POST') return res.status(405);

  if (!bag) return res.status(400);

  const formattedBag = bag.map((product) => ({
    price: product.defaultPriceId,
    quantity: 1
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: `${process.env.NEXT_URL}/`,
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    mode: 'payment',
    line_items: formattedBag
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  });
}
