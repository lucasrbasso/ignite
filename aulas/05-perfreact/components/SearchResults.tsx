import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from 'react-virtualized';

interface Product {
  id: number;
  price: number;
  title: string;
  priceFormatted: string;
}

interface SearchResultsProps {
  results: Product[];
  onAddToWishList: (id: number) => void;
  totalPrice: number;
}

export function SearchResults({ results, onAddToWishList, totalPrice}: SearchResultsProps) {


  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

    </div>
  )
}
