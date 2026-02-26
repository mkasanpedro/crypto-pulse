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

  // CONSISTENT FULL-SCREEN OVERLAY
  if (loading) return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950">
      <div className="w-16 h-16 border-4 border-slate-800 rounded-full relative">
        <div className="absolute inset-0 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-cyan-400 font-bold tracking-widest text-xs animate-pulse">SYNCING BLOCKCHAIN...</p>
    </div>
  );

  return (
    <div className="w-full px-4 py-8 md:p-10 max-w-7xl mx-auto">
      <div className="w-full flex justify-center mb-10 px-2">
        <input 
          ref={inputRef} type="text" value={search} placeholder="Search coin..." 
          className="w-full max-w-2xl p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none shadow-xl transition-all"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <MarketChart />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-cyan-500/50 transition-all shadow-lg flex flex-col justify-between h-full">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} className="w-10 h-10" alt="" />
              <h3 className="font-bold text-lg truncate">{coin.name}</h3>
            </div>
            <p className="text-2xl font-mono text-cyan-400 font-bold uppercase truncate">
              {currency} {coin.current_price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;