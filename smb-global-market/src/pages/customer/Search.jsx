import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../../services/productService';
import ProductCard from '../../components/customer/ProductCard';

export default function Search() {
  const [params] = useSearchParams();
  const term = params.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!term) return setLoading(false);
    setLoading(true);
    searchProducts(term).then(setResults).finally(() => setLoading(false));
  }, [term]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-lg font-semibold mb-1">Search results for "{term}"</h1>
      <p className="text-sm text-gray-500 mb-6">{loading ? 'Searching...' : `${results.length} result(s)`}</p>
      {!loading && results.length === 0 && <p className="text-gray-400">No products matched your search.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
