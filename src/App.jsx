import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
          <nav className="p-5 bg-slate-900 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50">
            <h1 className="text-2xl font-black text-cyan-400 italic tracking-tighter uppercase">Crypto Pulse</h1>
            <div className="flex gap-6 sm:gap-10 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
              <Link to="/" className="hover:text-cyan-400 transition-all border-b-2 border-transparent hover:border-cyan-400 pb-1">Market</Link>
              <Link to="/analysis" className="hover:text-cyan-400 transition-all border-b-2 border-transparent hover:border-cyan-400 pb-1">Analysis</Link>
              <Link to="/settings" className="hover:text-cyan-400 transition-all border-b-2 border-transparent hover:border-cyan-400 pb-1">Settings</Link>
            </div>
          </nav>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;