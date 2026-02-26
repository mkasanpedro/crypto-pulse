import { createContext, useContext, useState } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]); // This stores the data globally
  const [currency, setCurrency] = useState('usd');

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);