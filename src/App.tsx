import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import { IFact } from './utils/types';
import ShareForm from './components/ShareForm';
import FactsList from './components/FactsList/FactsList';
import { fetchAndLoadFacts } from './utils/requests';

function App() {
  const [facts, setFacts] = useState<IFact[]>([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchAndLoadFacts(category, setFacts);
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
