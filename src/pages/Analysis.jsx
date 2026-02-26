import MarketChart from '../components/MarketChart';
import { useCrypto } from '../context/CryptoContext';

const Analysis = () => {
  const { coins, currency } = useCrypto();

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Market Analysis</h1>
        <p className="text-slate-500 mt-2">Visualizing the performance of the top 10 assets in {currency.toUpperCase()}.</p>
      </div>
      
      <MarketChart />

      <div className="mt-8 p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
        <h3 className="text-cyan-400 font-black text-sm tracking-widest uppercase mb-6">Live Insights</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-slate-800">
            <span className="text-slate-400">Dominant Asset</span>
            <span className="font-bold text-lg">{coins[0]?.name || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-800">
            <span className="text-slate-400">Current Leader Price</span>
            <span className="font-mono text-cyan-400 font-bold">{currency.toUpperCase()} {coins[0]?.current_price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;