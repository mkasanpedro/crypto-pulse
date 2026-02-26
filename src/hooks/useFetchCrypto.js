import { useState, useEffect, useCallback } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true); // Always start in loading state
  const [error, setError] = useState(null);

  const fetchMarket = useCallback(async () => {
    setLoading(true); // Force loading true on every manual call/reload
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`
      );
      
      if (res.status === 429) throw new Error("Rate limit exceeded. Wait 60s.");
      if (!res.ok) throw new Error("Network response was not ok.");

      const data = await res.json();
      setCoins(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      // Adding a slight delay (500ms) makes the transition feel smoother and less "jumpy"
      setTimeout(() => setLoading(false), 500);
    }
  }, [currency, setCoins]);

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  return { loading, error };
};