import { useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import MarketChart from '../components/MarketChart';

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins, currency } = useCrypto();
  const [search, setSearch] = useLocalStorage('cryptoSearch', '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const filteredCoins = coins.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="p-20 text-center text-cyan-400 font-bold animate-pulse uppercase">Syncing Market...</div>;
  if (error) return <div className="p-20 text-center text-red-500 font-bold italic">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      {/* 1. Search Bar */}
      <input 
        ref={inputRef}
        type="text" 
        value={search}
        placeholder="Search coins..." 
        className="w-full p-4 mb-8 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all shadow-xl"
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {/* 2. Visible Chart in Market (As per Lab Figure 1) */}
      <MarketChart />

      {/* 3. Coin Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:scale-[1.02] transition-all shadow-lg border-t-4 border-t-transparent hover:border-t-cyan-500">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} className="w-10 h-10" alt={coin.name} />
              <h3 className="font-bold text-lg">{coin.name}</h3>
            </div>
            <p className="text-2xl font-mono text-cyan-400 font-bold uppercase">
              {currency} {coin.current_price.toLocaleString()}
            </p>
            <p className={`mt-2 font-bold text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;