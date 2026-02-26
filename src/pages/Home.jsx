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

  if (loading) return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="mt-6 text-cyan-400 font-black tracking-[0.4em] animate-pulse">LOADING DATA...</h2>
    </div>
  );

  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center p-10 text-center">
      <p className="text-rose-500 font-bold mb-4">FAILED TO FETCH: {error}</p>
      <button onClick={() => window.location.reload()} className="px-6 py-2 bg-slate-800 rounded-full text-xs font-bold uppercase tracking-widest">Retry Connection</button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <input 
        ref={inputRef} type="text" value={search} placeholder="Search assets..." 
        className="w-full p-4 mb-8 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none shadow-xl"
        onChange={(e) => setSearch(e.target.value)}
      />
      <MarketChart />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-cyan-500 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} className="w-10 h-10" alt="" />
              <h3 className="font-bold text-lg">{coin.name}</h3>
            </div>
            <p className="text-2xl font-mono text-cyan-400 font-bold uppercase">{currency} {coin.current_price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;