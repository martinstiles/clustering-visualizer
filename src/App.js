import React from 'react';
import Header from './views/header.js'
import Table from './views/clustering/table'

function App() {

  const algorithmStyle = {
    //textAlign: 'center',
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return (
    <>
      <div style={algorithmStyle}>
        <Header />
        <Table />
      </div>
    </>
  );
}

export default App;
