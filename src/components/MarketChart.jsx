import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();
  const data = coins.map(coin => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price
  }));

  return (
    /* Fix: aspect-ratio and w-full prevents the jumping/resizing glitch */
    <div className="w-full bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl mb-10 h-[300px] md:h-[400px] overflow-hidden">
      <h2 className="text-cyan-400 font-bold mb-4 text-xs tracking-widest uppercase">Price Trend Analysis</h2>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
              itemStyle={{ color: '#22d3ee' }}
            />
            <Line type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketChart;