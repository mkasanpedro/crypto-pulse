import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
          {/* Use w-full and justify-between to keep sides pinned */}
          <nav className="w-full p-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex justify-between items-center sticky top-0 z-50">
            <h1 className="text-xl font-black text-cyan-400 italic tracking-tighter">
              CRYPTO-PULSE
            </h1>
            
            {/* Desktop & Mobile: flex keeps them on the right. 
                md:flex-row and gap ensures they don't jump around */}
            <div className="flex items-center gap-4 sm:gap-8 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Market</Link>
              <Link to="/analysis" className="hover:text-cyan-400 transition-colors">Analysis</Link>
              <Link to="/settings" className="hover:text-cyan-400 transition-colors border-2 border-cyan-500/50 px-3 py-1 rounded-lg">Settings</Link>
            </div>
          </nav>

          <main className="flex-grow container mx-auto px-4">
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