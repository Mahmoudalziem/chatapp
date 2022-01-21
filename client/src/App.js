import React, { useEffect } from "react";
import { iniSocket, iniPeer } from "./lib/socketPeer";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Home from "./components/home";
import NotFound from "./components/error";
import Chat from "./components/chat";

import "./App.scss";


function App() {
  useEffect(() => {
    iniSocket();
    iniPeer();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:room/:username" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
