import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Authenticate from './pages/Authenticate';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Transactions from './pages/Transactions';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </div>
  );
}

export default App;
