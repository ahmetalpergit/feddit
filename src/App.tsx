import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import { IFact } from './utils/types';
import ShareForm from './components/ShareForm';
import FactsList from './components/FactsList/FactsList';

function App() {
  const [facts, setFacts] = useState<IFact[]>([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchAndLoadFacts = async () => {
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
      setFacts(data);
    };
    fetchAndLoadFacts();
  }, [category]);

  return (
    <>
      <Header />
      <main>
        <aside>
          <Categories category={category} setCategory={setCategory} />
        </aside>
        <section className="facts">
          <ShareForm setFacts={setFacts} />
          <FactsList data={facts} />
        </section>
      </main>
    </>
  );
}

export default App;
