import Image from 'next/image';
import Link from 'next/link';
import { Handbag } from 'phosphor-react';
import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import logoSvg from '@/assets/logo.svg';
import { ProductBagContext } from '@/contexts/productBag';
import { HeaderContainer } from '@/styles/components/header';

import { Modal } from './Modal';
export function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const bag = useContextSelector(ProductBagContext, (context) => context.bag);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Image
          src={logoSvg}
          alt="Ignite Shop"
          width={Infinity}
          height={Infinity}
        />
      </Link>
      <button onClick={openModal}>
        <Handbag />

        {bag.length ? <span>{bag.length}</span> : <></>}
      </button>

      <Modal onClose={closeModal} isOpen={modalIsOpen} />
    </HeaderContainer>
  );
}
