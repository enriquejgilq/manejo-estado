import React from 'react';
import './App.css';
import { UseState } from './UseState.js'
import { ClassState } from './ClassState.js'
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name='UseState' />
      <ClassState name='ClassState' />
      <UseReducer name='UseReducer' />
    </div>
  );
}

export default App;
