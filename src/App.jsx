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
          <nav className="w-full p-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex justify-between items-center sticky top-0 z-50">
            <h1 className="text-xl font-black text-cyan-400 italic tracking-tighter uppercase">Crypto Pulse</h1>
            
            <div className="flex items-center gap-6 font-bold text-xs uppercase tracking-widest">
              {/* USE <Link>, NEVER <a href> */}
              <Link to="/" className="hover:text-cyan-400 transition-all">Market</Link>
              <Link to="/analysis" className="hover:text-cyan-400 transition-all">Analysis</Link>
              <Link to="/settings" className="bg-cyan-500/10 border border-cyan-500/50 px-3 py-1 rounded-lg hover:bg-cyan-500/20 transition-all">Settings</Link>
            </div>
          </nav>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/analysis" element={ <Analysis /> } />
              <Route path="/settings" element={ <Settings /> } />
            </Routes>
          </main>
        </div>
      </Router>
    </CryptoProvider>
  );
}
export default App;