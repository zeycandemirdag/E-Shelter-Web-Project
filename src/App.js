import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AdminAnimal from './AdminPages/AdminAnimal';
import AdminPage from './AdminPages/AdminPage';
import AdminVeterinary from './AdminPages/AddVeterinar';
import Home from './Pages/Home';
import OwnerDetails from './AdminPages/OwnerPage';
function App() {
  
  return ( 
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/adminanimal" element={<AdminAnimal/>} />
        <Route path="/veterinaries" element={<AdminVeterinary/>} />
        <Route path="/ownerdetails" element={<OwnerDetails/>} />
       </Routes>
  );
}

export default App;
