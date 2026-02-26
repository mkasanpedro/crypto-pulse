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

  const filteredCoins = coins.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // FULL SCREEN LOADING STATE
  if (loading) return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="mt-8 text-cyan-400 font-black tracking-[0.5em] animate-pulse">
        SYNCING ASSETS
      </h2>
      <p className="text-slate-600 text-[10px] mt-2 uppercase font-bold tracking-widest">
        Establishing Secure Connection...
      </p>
    </div>
  );

  if (error) return (
    <div className="p-20 text-center">
      <p className="text-rose-500 font-bold mb-4 uppercase tracking-widest">Error: {error}</p>
      <button onClick={() => window.location.reload()} className="text-cyan-400 underline uppercase text-xs">Try Reconnecting</button>
    </div>
  );

  return (
    <div className="py-10 max-w-6xl mx-auto">
      <div className="mb-10 flex justify-center">
        <input 
          ref={inputRef}
          type="text" 
          value={search}
          placeholder="Search by currency name..." 
          className="w-full max-w-xl p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none shadow-2xl transition-all"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <MarketChart />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:scale-[1.03] transition-transform cursor-pointer shadow-lg border-b-4 border-b-cyan-600/30">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} className="w-10 h-10" alt={coin.name} />
              <h3 className="font-bold text-lg">{coin.name}</h3>
            </div>
            <p className="text-3xl font-mono text-cyan-400 font-bold">
              {currency.toUpperCase()} {coin.current_price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;