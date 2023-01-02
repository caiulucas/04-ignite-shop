import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next/types';
import { CaretLeft, CaretRight, Handbag } from 'phosphor-react';
import { useState } from 'react';
import Stripe from 'stripe';
import { useContextSelector } from 'use-context-selector';

import { ProductBagContext } from '@/contexts/productBag';
import { stripe } from '@/libs/stripe';
import {
  HomeContainer,
  Product,
  ProductFooter,
  SliderButton
} from '@/styles/pages/home';
import { numberFormatter } from '@/utils/formatter';

type ProductData = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  rawPrice: number;
  defaultPriceId: string;
};

interface HomeProps {
  products: ProductData[];
}

export default function Home({ products }: HomeProps) {
  const addToBag = useContextSelector(
    ProductBagContext,
    (context) => context.addToBag
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      origin: 'center',
      perView: 2.5,
      spacing: 48
    },
    initial: 0,
    slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
    created: () => setLoaded(true)
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer>
        <div ref={sliderRef} className="keen-slider">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              passHref
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <ProductFooter>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button onClick={() => addToBag(product)}>
                    <Handbag />
                  </button>
                </ProductFooter>
              </Product>
            </Link>
          ))}
          {loaded && instanceRef.current && (
            <>
              <SliderButton
                disabled={currentSlide === 0}
                onClick={() => instanceRef.current?.prev()}
              >
                <CaretLeft />
              </SliderButton>

              <SliderButton
                right
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
                onClick={() => instanceRef.current?.next()}
              >
                <CaretRight />
              </SliderButton>
            </>
          )}
        </div>
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products: ProductData[] = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      defaultPriceId: price.id,
      price: numberFormatter.format(Number(price.unit_amount) / 100),
      rawPrice: Number(price.unit_amount)
    };
  });

  return {
    props: { products },
    revalidate: 60 * 60 * 1 // 1 hour
  };
};
