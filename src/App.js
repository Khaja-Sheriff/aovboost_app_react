import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Dashboard from './pages/Dashboard';
import Offers from './pages/Offers';
import AddOrEditOffer from './pages/AddOrEditOffer';
import AppDemo from './pages/AppDemo';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/Offers' element={<Offers />} />
        <Route path='/Offers/AddOffer' element={<AddOrEditOffer />} />
        <Route path='/AppDemo' element={<AppDemo />} />
        <Route path='Contact' element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
