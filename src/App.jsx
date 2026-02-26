import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans overflow-x-hidden">
          {/* Navigation: Uses flex-wrap and md:flex-row to stay visible on all sizes */}
          <nav className="w-full p-4 md:px-8 md:py-6 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 flex flex-wrap justify-between items-center sticky top-0 z-[100]">
            <h1 className="text-xl font-black text-cyan-400 italic tracking-tighter uppercase mb-2 md:mb-0">
              Crypto Pulse
            </h1>
            
            {/* Links: flex-wrap ensures they move to a new line instead of disappearing */}
            <div className="flex items-center gap-3 sm:gap-6 font-bold text-[10px] sm:text-xs uppercase tracking-widest flex-wrap">
              <Link to="/" className="hover:text-cyan-400 transition-all border-b border-transparent hover:border-cyan-400 pb-1">Market</Link>
              <Link to="/analysis" className="hover:text-cyan-400 transition-all border-b border-transparent hover:border-cyan-400 pb-1">Analysis</Link>
              <Link to="/settings" className="bg-cyan-500/10 border border-cyan-500/50 px-3 py-1.5 rounded-lg hover:bg-cyan-500/20 transition-all">Settings</Link>
            </div>
          </nav>

          <main className="flex-grow w-full max-w-[100vw]">
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