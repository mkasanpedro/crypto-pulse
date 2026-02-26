import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();
  const [chartType, setChartType] = useState('line'); // State to handle toggle

  const data = coins.map(coin => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price
  }));

  return (
    <div className="w-full bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl mb-10 h-[350px] md:h-[450px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-cyan-400 font-bold text-xs tracking-widest uppercase">Visualization</h2>
        
        {/* Chart Toggle Buttons */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setChartType('line')}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${chartType === 'line' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            LINE
          </button>
          <button 
            onClick={() => setChartType('bar')}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${chartType === 'bar' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            BAR
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        {chartType === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} itemStyle={{ color: '#22d3ee' }} />
            <Line type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip cursor={{fill: '#1e293b', opacity: 0.4}} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} itemStyle={{ color: '#22d3ee' }} />
            <Bar dataKey="price" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;