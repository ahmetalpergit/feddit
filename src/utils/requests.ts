import { Dispatch, SetStateAction } from 'react';
import { IFact } from './types';

export const fetchAndLoadFacts = async (
  category: string,
  setState: Dispatch<SetStateAction<IFact[]>>
) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}${
        category ? `?category=eq.${category}&select=*` : ''
      }`,
      {
        headers: {
          apikey: import.meta.env.VITE_API_KEY,
          authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION}`,
        },
      }
    );
    const data = await res.json();
    setState(data);
  } catch (err) {
    console.log('fetchAndLoadFacts request error:', err);
  }
};
