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

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-cyan-400 font-bold animate-pulse">FETCHING ASSETS...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <div className="w-full flex justify-center mb-8">
        <input 
          ref={inputRef}
          type="text" 
          value={search}
          placeholder="Search coins..." 
          className="w-full max-w-2xl p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none shadow-xl transition-all"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <MarketChart />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-cyan-500 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} className="w-8 h-8" alt="" />
              <h3 className="font-bold">{coin.name}</h3>
            </div>
            <p className="text-2xl font-mono text-cyan-400 font-bold">
              {currency.toUpperCase()} {coin.current_price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;