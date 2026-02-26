import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
  const { coins, setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coins && coins.length > 0) {
      setLoading(false);
      return;
    }

    const fetchMarket = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`);
        if (res.status === 429) throw new Error("Rate limit hit.");
        if (!res.ok) throw new Error("API Failure");
        const data = await res.json();
        setCoins(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchMarket();
  }, [currency, setCoins, coins]);

  return { loading, error };
};