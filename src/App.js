import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AdminAnimal from './AdminPages/AdminAnimal';
import AdminPage from './AdminPages/AdminPage';
import AdminVeterinary from './AdminPages/AddVeterinar';
import Home from './Pages/Home';
import OwnerDetails from './AdminPages/OwnerPage';
import Donations from './AdminPages/Donations';
import DonationForm from './UserPages/DonationForm';
import Animal from './UserPages/Animal';
import Login from './UserPages/LoginPage';
import User from './UserPages/User';
import Register from './UserPages/Register';
import Veterinary from './UserPages/Veterinar';
function App() {
  
  return ( 
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/adminanimal" element={<AdminAnimal/>} />
        <Route path="/donations" element={<Donations/>} />
        <Route path="/veterinaries" element={<AdminVeterinary/>} />
        <Route path="/ownerdetails" element={<OwnerDetails/>} />
        <Route path="/donationform" element={<DonationForm/>} />
        <Route path="/animal" element={<Animal/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/userInfo" element={<User/>} />
        <Route path="/userveterinaries" element={<Veterinary/>} />
       </Routes>
  );
}

export default App;
