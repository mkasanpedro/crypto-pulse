import MarketChart from '../components/MarketChart';
import { useCrypto } from '../context/CryptoContext';

const Analysis = () => {
  const { coins } = useCrypto();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Market Analysis</h2>
        <p className="text-slate-400">Visualizing data for the top {coins.length} assets.</p>
      </div>

      <MarketChart />

      <div className="mt-10 p-6 bg-slate-900 border border-slate-800 rounded-3xl">
        <h3 className="text-cyan-400 font-bold mb-4 uppercase text-sm tracking-widest">Key Insights</h3>
        <ul className="space-y-4 text-slate-300">
          <li className="flex justify-between border-b border-slate-800 pb-2">
            <span>Market Leader:</span>
            <span className="font-mono text-white">{coins[0]?.name || 'Loading...'}</span>
          </li>
          <li className="flex justify-between border-b border-slate-800 pb-2">
            <span>Top Asset Price:</span>
            <span className="font-mono text-white">${coins[0]?.current_price.toLocaleString()}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Analysis;