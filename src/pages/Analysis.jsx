import MarketChart from '../components/MarketChart';
import { useFetchCrypto } from '../hooks/useFetchCrypto';

const Analysis = () => {
  // This will now pull from the CACHE instead of hitting the API again
  const { loading, error } = useFetchCrypto();

  if (loading) return <div className="p-20 text-center text-cyan-400 animate-pulse">Analyzing...</div>;

  return (
    <div className="max-w-6xl mx-auto p-10 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black mb-8 uppercase italic">Statistical Analysis</h1>
      <MarketChart />
      <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800">
        <p className="text-slate-400">Showing top 10 assets by market cap.</p>
      </div>
    </div>
  );
};
export default Analysis;