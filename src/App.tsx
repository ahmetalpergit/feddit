import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import { Fact } from './utils/types';
import ShareForm from './components/ShareForm';
import Facts from './components/Facts/Facts';

function App() {
  const [facts, setFacts] = useState<Fact[]>([]);
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
          <ShareForm />
          <Facts data={facts} />
        </section>
      </main>
    </>
  );
}

export default App;
