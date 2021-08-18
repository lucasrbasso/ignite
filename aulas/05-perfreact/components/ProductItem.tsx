import React, { memo, useState } from 'react';
import dynamic from 'next/dynamic';

import { AddProductToWishListProps } from './AddProductToWishList';

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }
  onAddToWishList: (id: number) => void;
}

const AddProductToWishList = dynamic<AddProductToWishListProps>(async () => {
  const mod = await import('./AddProductToWishList');
  return mod.AddProductToWishList;
}, {
  loading: () => <span>Carregando...</span>
})

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {

  const [ isAddingToWishlist, setIsAddingToWishlist ] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      { isAddingToWishlist && <AddProductToWishList
        onAddToWishList={() => onAddToWishList(product.id)}
        onRequestClose={() => {setIsAddingToWishlist(false)}}
      />}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
	return Object.is(prevProps.product, nextProps.product);
});
