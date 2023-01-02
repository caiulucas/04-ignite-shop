import type { AppProps } from 'next/app';

import { Header } from '@/components/Header';
import { ProductBagProvider } from '@/contexts/productBag';
import { globalStyles } from '@/styles/global';
import { Container } from '@/styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <ProductBagProvider>
        <Header />
        <Component {...pageProps} />
      </ProductBagProvider>
    </Container>
  );
}
