import Image from 'next/image';
import { useContextSelector } from 'use-context-selector';

import { ProductBagContext } from '@/contexts/productBag';
import { BagItemContainer, ImageContainer } from '@/styles/components/bagItem';

interface BagItemProps {
  data: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
  };
}

export function BagItem({ data }: BagItemProps) {
  const removeToBag = useContextSelector(
    ProductBagContext,
    (context) => context.removeToBag
  );

  return (
    <BagItemContainer>
      <ImageContainer>
        <Image src={data.imageUrl} width={96} height={96} alt="" />
      </ImageContainer>

      <div>
        <p>{data.name}</p>
        <span>{data.price}</span>

        <button onClick={() => removeToBag(data.id)}>Remover</button>
      </div>
    </BagItemContainer>
  );
}
