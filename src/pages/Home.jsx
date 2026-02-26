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

  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

  const filteredCoins = coins.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  // FULL SCREEN LOADING STATE
  if (loading) return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-slate-800 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <h2 className="mt-8 text-cyan-400 font-black tracking-[0.5em] animate-pulse uppercase text-xs">Syncing Market...</h2>
    </div>
  );

  if (error) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center p-10">
      <p className="text-rose-500 font-bold mb-4 uppercase text-xs tracking-widest font-mono">Error: {error}</p>
      <button onClick={() => window.location.reload()} className="text-cyan-400 underline uppercase text-[10px] font-bold">Try Again</button>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-10 animate-in fade-in duration-700">
      <div className="w-full flex justify-center mb-10">
        <input 
          ref={inputRef} type="text" value={search} placeholder="Search assets..." 
          className="w-full max-w-2xl p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none shadow-2xl transition-all"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <MarketChart />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-cyan-500 transition-all group shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} className="w-10 h-10 group-hover:scale-110 transition-transform" alt="" />
              <h3 className="font-bold text-lg">{coin.name}</h3>
            </div>
            <p className="text-2xl font-mono text-cyan-400 font-bold uppercase">
              {currency} {coin.current_price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;