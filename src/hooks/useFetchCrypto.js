import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
  const { coins, setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // CRITICAL: If coins already exist, STOP. Do not fetch again.
    if (coins && coins.length > 0) {
      setLoading(false);
      return;
    }

    const fetchMarket = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`);
        
        if (res.status === 429) throw new Error("Rate Limit: Stop clicking so fast! Wait 60s.");
        if (!res.ok) throw new Error("API is down.");
        
        const data = await res.json();
        setCoins(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        // Keep the loader visible for a split second for "feel"
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchMarket();
  }, [currency, setCoins, coins]); // Depend on coins array

  return { loading, error };
};