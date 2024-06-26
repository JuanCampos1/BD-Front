import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import MainPage from './components/MainPage/Main-page'
import Register from './components/Register/Register'
import Fixture from './components/Fixture/Fixture';
import Prediction from './components/Predictions/Predictions';
import AdminPartido from './components/adminPartido/adminPartido';
import { withAdminCheck } from './components/Auth/auth';
import Ranking from './components/Ranking/Ranking';
import MostrarPredicciones from './components/ShowPredictions/ShowPredictions';
import FinalUpdate from './components/FinalUpdate/FinalUpdate';

const AdminPartidoWithAdminCheck = withAdminCheck(AdminPartido);


export default function App() {
  console.log("asdasdads", Login);
  //localStorage.clear();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/fixture" element={<Fixture/>}/>
        <Route path="/prediction" element={<Prediction/>}/>
        <Route path="/admin/partido" element={<AdminPartidoWithAdminCheck/>}/>
        <Route path="/ranking" element={<Ranking/>}/>
        <Route path="/showpredictions" element={<MostrarPredicciones/>}/>
        <Route path="/admin/update/final" element={<FinalUpdate/>}/>
      </Routes>
    </BrowserRouter>
  );
}