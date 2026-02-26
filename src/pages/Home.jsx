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

  if (loading) return <div className="h-screen flex items-center justify-center text-cyan-400 animate-pulse font-bold uppercase tracking-widest">Scanning Blockchain...</div>;
  
  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-rose-500 text-3xl font-black mb-2 uppercase">Limit Reached</h2>
      <p className="text-slate-400 mb-6">{error}</p>
      <button onClick={() => window.location.reload()} className="px-8 py-3 bg-cyan-500 text-slate-950 font-bold rounded-full hover:bg-cyan-400 transition-all">Retry Now</button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <input 
        ref={inputRef}
        type="text" 
        value={search}
        placeholder="Search for a coin..." 
        className="w-full p-4 mb-8 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-cyan-500 outline-none shadow-2xl transition-all"
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <MarketChart />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-cyan-500 transition-all group shadow-xl border-t-4 border-t-transparent">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} className="w-10 h-10 group-hover:scale-110 transition-transform" alt="" />
              <h3 className="font-bold text-lg">{coin.name}</h3>
            </div>
            <p className="text-3xl font-mono text-cyan-400 font-bold uppercase">
              {currency} {coin.current_price.toLocaleString()}
            </p>
            <p className={`mt-2 font-bold ${coin.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;