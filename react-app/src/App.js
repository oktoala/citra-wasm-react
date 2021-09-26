import React from 'react';
import { useEffect } from 'react';
import './App.css';

import Main from "./components/Main";
import Appbar from "./components/Appbar";

const App = () => {

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <Appbar></Appbar>
      <Main />
    </div>
  );
};

export default App;