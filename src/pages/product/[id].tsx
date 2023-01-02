import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Stripe from 'stripe';
import { useContextSelector } from 'use-context-selector';

import { ProductBagContext } from '@/contexts/productBag';
import { stripe } from '@/libs/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails
} from '@/styles/pages/product';
import { numberFormatter } from '@/utils/formatter';

type ProductData = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  rawPrice: number;
  description: string;
  defaultPriceId: string;
};

interface ProductProps {
  product: ProductData;
}

export default function Product({ product }: ProductProps) {
  const addToBag = useContextSelector(
    ProductBagContext,
    (context) => context.addToBag
  );

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={() => addToBag(product)}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<
  { product: object },
  { id: string }
> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: numberFormatter.format(Number(price.unit_amount) / 100),
        rawPrice: Number(price.unit_amount),
        defaultPriceId: price.id,
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  };
};
