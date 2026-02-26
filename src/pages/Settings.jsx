import { useCrypto } from '../context/CryptoContext';

const Settings = () => {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="max-w-xl mx-auto p-10">
      <h2 className="text-3xl font-black text-cyan-400 mb-6 uppercase">Settings</h2>
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
        <label className="block text-slate-400 font-bold mb-4 uppercase text-xs">Preferred Currency</label>
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-cyan-400"
        >
          <option value="usd">USD - US Dollar</option>
          <option value="eur">EUR - Euro</option>
          <option value="php">PHP - Philippine Peso</option>
        </select>
        <p className="mt-4 text-slate-500 text-sm italic">Global state will update all prices to {currency.toUpperCase()}.</p>
      </div>
    </div>
  );
};

export default Settings;