import { Fact } from '../../utils/types';

type FactsProps = {
  data: Fact[];
};

const Facts = ({ data }: FactsProps) => {
  return (
    <ul className="factList">
      {data.length ? (
        data.map((fact) => (
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
        ))
      ) : (
        <li>No facts found, create the first one!</li>
      )}
    </ul>
  );
};

export default Facts;
