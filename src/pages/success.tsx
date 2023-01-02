import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

import { stripe } from '@/libs/stripe';
import {
  ImageContainer,
  SuccessContainer,
  Images
} from '@/styles/pages/success';

type ProductData = {
  imageUrl: string;
};

interface SuccessProps {
  customerName: string;
  products: ProductData[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <Images>
          {products.map((product) => (
            <ImageContainer key={product.imageUrl}>
              <Image src={product.imageUrl} width={140} height={140} alt="" />
            </ImageContainer>
          ))}
        </Images>

        <p>
          Uhuul {customerName}, sua compra de {products.length} camisetas já
          está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id;

  if (!sessionId) return { redirect: { destination: '/', permanent: false } };

  const session = await stripe.checkout.sessions.retrieve(`${sessionId}`, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details!.name;
  const lineItems = session.line_items!.data;

  const products = lineItems.map((data: any) => {
    const product = data.price?.product as Stripe.Product;

    return {
      imageUrl: product?.images[0]
    };
  });

  return {
    props: {
      customerName,
      products
    }
  };
};
