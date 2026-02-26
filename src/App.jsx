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
          {/* Navigation Fix: flex-nowrap prevents the buttons from disappearing */}
          <nav className="w-full p-4 md:p-6 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 flex justify-between items-center sticky top-0 z-50">
            <h1 className="text-lg md:text-xl font-black text-cyan-400 italic tracking-tighter uppercase flex-shrink-0">
              Crypto Pulse
            </h1>
            
            {/* flex-shrink-0 and flex-nowrap ensure the right side doesn't jump or cut */}
            <div className="flex items-center justify-end gap-3 sm:gap-8 font-bold text-[10px] sm:text-xs uppercase tracking-widest ml-4 flex-nowrap flex-shrink-0">
              <Link to="/" className="hover:text-cyan-400 transition-all">Market</Link>
              <Link to="/analysis" className="hover:text-cyan-400 transition-all">Analysis</Link>
              <Link to="/settings" className="bg-cyan-500/10 border border-cyan-500/50 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-cyan-500/20 transition-all">Settings</Link>
            </div>
          </nav>

          <main className="flex-grow w-full">
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