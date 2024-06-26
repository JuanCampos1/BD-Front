import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import MainPageAdmin from './components/MainPage/Main-page-admin.js'
import Register from './components/Register/Register'
import Fixture from './components/Fixture/Fixture';
import Prediction from './components/Predictions/Predictions';
import AdminPartido from './components/adminPartido/adminPartido';
import { withAdminCheck } from './components/Auth/auth';
import Ranking from './components/Ranking/Ranking';
import MostrarPredicciones from './components/ShowPredictions/ShowPredictions';
import FinalUpdate from './components/FinalUpdate/FinalUpdate';
import AdminAddPartido from './components/adminPartido/add-partido.js';
import MainPageAlumno from './components/MainPage/Main-page-alumno.js';

const AdminPartidoWithAdminCheck = withAdminCheck(AdminPartido);
const AdminAddPartidoWithAdminCheck = withAdminCheck(AdminAddPartido);
const MainPageWithAdminCheck = withAdminCheck(MainPageAdmin);
const FinalUpdateWithAdminCheck = withAdminCheck(FinalUpdate);

export default function App() {
  console.log("asdasdads", Login);
  //localStorage.clear();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/fixture" element={<Fixture/>}/>
        <Route path="/prediction" element={<Prediction/>}/>
        <Route path="/main" element={<MainPageAlumno/>} />
        <Route path="/admin/main" element={<MainPageWithAdminCheck/>} />
        <Route path="/admin/partido" element={<AdminPartidoWithAdminCheck/>}/>
        <Route path="/admin/partido/add" element={<AdminAddPartidoWithAdminCheck/>}/>
        <Route path="/admin/update/final" element={<FinalUpdateWithAdminCheck/>}/>
        <Route path="/ranking" element={<Ranking/>}/>
        <Route path="/showpredictions" element={<MostrarPredicciones/>}/> 
      </Routes>
    </BrowserRouter>
  );
}