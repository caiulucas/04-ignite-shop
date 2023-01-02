import axios from 'axios';
import { X } from 'phosphor-react';
import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { ProductBagContext } from '@/contexts/productBag';
import {
  BagInfo,
  BagItems,
  Modal as StyledModal,
  ModalContainer
} from '@/styles/components/modal';
import { numberFormatter } from '@/utils/formatter';

import { BagItem } from './BagItem';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  const { bag, clearBag } = useContextSelector(
    ProductBagContext,
    (context) => ({
      bag: context.bag,
      clearBag: context.clearBag
    })
  );

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const total = bag.reduce((acc, product) => {
    return acc + product.rawPrice;
  }, 0);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        bag
      });

      const { checkoutUrl } = response.data;
      clearBag();

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);

      alert('Falha ao redirecionar ao checkout!');
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <>
      {isOpen && (
        <ModalContainer onClick={onClose}>
          <StyledModal>
            <nav>
              <button onClick={onClose}>
                <X />
              </button>
            </nav>

            <BagItems>
              <section>
                <h2>Sacola de compras</h2>

                <div>
                  {bag.map((product) => (
                    <BagItem key={product.id} data={product} />
                  ))}
                </div>
              </section>

              <BagInfo>
                <div>
                  <label>Quantidade</label>
                  <p>{bag.length} itens</p>
                </div>
                <div>
                  <label>
                    <strong>Valor total</strong>
                  </label>
                  <span>{numberFormatter.format(total / 100)}</span>
                </div>

                <button
                  onClick={handleBuyProduct}
                  disabled={isCreatingCheckoutSession}
                >
                  Finalizar compra
                </button>
              </BagInfo>
            </BagItems>
          </StyledModal>
        </ModalContainer>
      )}
    </>
  );
}
