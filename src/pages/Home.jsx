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

  // 1. IMPROVED LOADING INDICATOR
  if (loading) return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-800 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <p className="mt-6 text-cyan-400 font-black tracking-[0.3em] animate-pulse text-sm">INITIALIZING DATA...</p>
    </div>
  );

  if (error) return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center p-6">
      <div className="bg-rose-500/10 p-6 rounded-full mb-4">
        <span className="text-4xl">⚠️</span>
      </div>
      <h2 className="text-white text-xl font-bold mb-2">Sync Failed</h2>
      <p className="text-slate-500 max-w-xs mb-6">{error}</p>
      <button onClick={() => window.location.reload()} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-all text-sm font-bold">Try Again</button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 animate-in fade-in duration-700">
      <div className="relative mb-8">
        <input 
          ref={inputRef}
          type="text" 
          value={search}
          placeholder="Search for a cryptocurrency..." 
          className="w-full p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none shadow-2xl transition-all pl-12"
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="absolute left-4 top-5 text-slate-500">🔍</span>
      </div>
      
      <MarketChart />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.length > 0 ? filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-cyan-500 transition-all group shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} className="w-10 h-10 group-hover:scale-110 transition-transform" alt="" />
              <h3 className="font-bold text-lg">{coin.name}</h3>
            </div>
            <p className="text-3xl font-mono text-cyan-400 font-bold uppercase">
              {currency} {coin.current_price.toLocaleString()}
            </p>
            <p className={`mt-2 font-bold flex items-center gap-1 ${coin.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              <span>{coin.price_change_percentage_24h > 0 ? '▲' : '▼'}</span>
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        )) : (
          <div className="col-span-full text-center py-20 text-slate-600 italic">No assets found matching "{search}"</div>
        )}
      </div>
    </div>
  );
};

export default Home;