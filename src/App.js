import React from 'react';
import logo from './logo.svg';
import './App.css';
import QuantityList from './QuantityList'

function App() {
  return (
    <div className="App">
        <div>
            <h2>Quantity Measurement App</h2>
        </div>
            <br/>
        <div>
            <QuantityList/>
        </div>
    </div>
  );
}

export default App;
