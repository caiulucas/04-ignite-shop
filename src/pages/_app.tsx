import type { AppProps } from 'next/app';
import Image from 'next/image';

import logoSvg from '@/assets/logo.svg';
import { globalStyles } from '@/styles/global';
import { Container, Header } from '@/styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image
          src={logoSvg}
          alt="Ignite Shop"
          width={Infinity}
          height={Infinity}
        />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
