import type { NextPage } from 'next';
import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
}

interface Product {
  id: number;
  price: number;
  title: string;
}

const Home: NextPage = () => {
  const [ search, setSearch ] = useState('');
  const [ results, setResults ] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  const addToWishList = useCallback((id: number) => {
    console.log(id);
  }, []);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data: Product[] = await response.json();

    const totalPrice = data.reduce((total: number, product) => {
        return total + product.price;
    }, 0);

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    });

    setResults({ totalPrice, data: products });
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  )
}

export default Home;
