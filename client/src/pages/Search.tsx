import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const demo = {
  productId: '12',
  photo: 'https://chisellabs.com/blog/wp-content/uploads/2022/05/What-is-a-Product.png',
  name: 'string',
  price: 24,
  stock: 4,
};

const Search = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {};
  const isNextPage = true;
  const isPrevPage = true;

  return (
    <div className='search-page'>
      <aside>
        <h2>Filter</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value=''>None</option>
            <option value='asc'>Price (Low to high)</option>
            <option value='dsc'>Price (High to how)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ''}</h4>
          <input
            type='range'
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value=''>All</option>
            <option value='laptop'>Laptop</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>All Products</h1>
        <input
          type='text'
          placeholder='Search by name....'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='search-product-list'>
          <ProductCard {...demo} handler={addToCartHandler} />
          <ProductCard {...demo} handler={addToCartHandler} />
          <ProductCard {...demo} handler={addToCartHandler} />
        </div>
        <article>
          <button disabled={!isPrevPage} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>
          <span>{page} of 4</span>
          <button disabled={!isNextPage} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
