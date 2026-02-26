import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
  const { coins, setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have coins for this currency already, don't flash the loader
    if (coins && coins.length > 0 && !loading) return;

    const fetchMarket = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`);
        if (!res.ok) throw new Error("API Limit reached");
        const data = await res.json();
        setCoins(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        // Keeps the indicator visible long enough to be consistent
        setTimeout(() => setLoading(false), 600);
      }
    };

    fetchMarket();
  }, [currency, setCoins]);

  return { loading, error };
};