import React, { useEffect, useState } from 'react';
import './App.css';
import getPrices from './services/api';

function App() {

  const [prices, setPrices] = useState<Prices>({} as Prices);

  useEffect(() => {
    // Fetch the prices and update them every minute
    getPrices().then((data) => {
      console.log(data);
      setPrices(data);
    });

    const interval = setInterval(() => {
      getPrices().then((data) => {
        setPrices(data);
      }); 
    }, 60000);

    // Unmounts interval safely
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {
        `EUR: ${prices.EUR} GBP: ${prices.GBP} USD: ${prices.USD}`
      }
    </div>
  );
}

export default App;
