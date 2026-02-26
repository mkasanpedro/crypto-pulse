import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();
  const [chartType, setChartType] = useState('line');

  const data = coins.map(coin => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price
  }));

  return (
    <div className="w-full bg-slate-900 p-4 md:p-8 rounded-3xl border border-slate-800 shadow-2xl mb-10 h-[350px] md:h-[450px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-cyan-400 font-bold text-xs tracking-widest uppercase">Visualization</h2>
        
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button 
            onClick={() => setChartType('line')}
            className={`flex-1 sm:px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${chartType === 'line' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            LINE
          </button>
          <button 
            onClick={() => setChartType('bar')}
            className={`flex-1 sm:px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${chartType === 'bar' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            BAR
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        {chartType === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} itemStyle={{ color: '#22d3ee' }} />
            <Line type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={3} dot={{ r: 3, fill: '#22d3ee' }} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip cursor={{fill: '#1e293b', opacity: 0.4}} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} itemStyle={{ color: '#22d3ee' }} />
            <Bar dataKey="price" fill="#22d3ee" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;