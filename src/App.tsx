import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import { Fact } from './utils/types';
import ShareForm from './components/ShareForm';

function App() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [category, setCategory] = useState('');

  const fetchAndLoadFacts = async () => {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL, {
      headers: {
        apikey: import.meta.env.VITE_API_KEY,
        authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION}`,
      },
    });
    const data = await res.json();
    setFacts(data);
  };

  useEffect(() => {
    fetchAndLoadFacts();
  }, []);

  return (
    <>
      <Header />
      <main>
        <aside>
          <Categories category={category} setCategory={setCategory} />
        </aside>
        <section className="facts">
          <ShareForm />
          <ul className="factList">
            {facts
              .filter((el) => (category ? el.category === category : el))
              .map((fact) => (
                <li className="fact" key={fact.id}>
                  <p>
                    {fact.text}
                    <a target="_blank" href={fact.source}>
                      (source)
                    </a>
                    <span className="tag">#{fact.category}</span>
                  </p>
                  <div className="votes">
                    <button>👍 {fact.votes.interesting}</button>
                    <button>😮 {fact.votes.shocking}</button>
                    <button>⛔ {fact.votes.report}</button>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
