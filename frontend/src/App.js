import React from "react";
import {Routes, Route} from "react-router-dom"
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Intro from './pages/main/intro';
import VOC from './pages/main/voc';
import Worker from './pages/main/worker'
import Article from './pages/main/article/articlelist'
import CreateArticle from './pages/main/article/createarticle'
import './App.css'
/* import Intro from './pages/main/intro';
import VOC from './pages/main/voc';
import Notice from './pages/main/notice';*/


function App() {
  return (
    <div className="App">
     <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/voc" element={<VOC />} />
          <Route path="/worker" element={<Worker />} />
          <Route path="/article" element={<Article />} />
          <Route path="/createarticle" element={<CreateArticle />} />
      </Routes>
    </div>
  );
}

export default App;
