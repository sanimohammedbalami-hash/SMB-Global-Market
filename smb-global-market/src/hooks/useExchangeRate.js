import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

let cachedRate = null;

export function useExchangeRate() {
  const [rate, setRate] = useState(cachedRate ?? 1325);

  useEffect(() => {
    if (cachedRate) return;
    supabase
      .from('platform_settings')
      .select('usd_to_ngn_rate')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (data?.usd_to_ngn_rate) {
          cachedRate = Number(data.usd_to_ngn_rate);
          setRate(cachedRate);
        }
      });
  }, []);

  return rate;
}

export function ngnToUsd(ngnAmount, rate) {
  return (Number(ngnAmount) / rate).toFixed(2);
  }
