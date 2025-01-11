import React from 'react';
import Navbar from './components/navbar';
import Upload from './components/Upload';
import Verify from './components/Verify';
import Footer from './components/footer';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Upload />
        <Verify />
      </main>
      <Footer />
    </div>
  );
}

export default App;