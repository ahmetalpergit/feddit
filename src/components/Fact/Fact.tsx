import { useState, useEffect } from 'react';
import { IFact } from '../../utils/types';
import styles from './fact.module.scss';

type FactProps = {
  fact: IFact;
};

const Fact = ({ fact }: FactProps) => {
  const [vote, setVote] = useState<keyof IFact['votes'] | undefined>(undefined);
  const [prevVote, setPreviousVote] = useState<
    keyof IFact['votes'] | undefined
  >(undefined);

  const factId = fact.id;

  useEffect(() => {
    const voteForFactRequest = async () => {
      if (!vote) return;

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}?id=eq.${String(factId)}`,
        {
          method: 'PATCH',
          headers: {
            apikey: import.meta.env.VITE_API_KEY,
            authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(
            prevVote
              ? {
                  votes: {
                    ...fact.votes,
                    [vote]: fact.votes[vote] + 1,
                    [prevVote]: fact.votes[prevVote] - 1,
                  },
                }
              : {
                  votes: {
                    ...fact.votes,
                    [vote]: fact.votes[vote] + 1,
                  },
                }
          ),
        }
      );

      return res.json();
    };

    voteForFactRequest();
  }, [vote]);

  return (
    <li className={styles.fact} key={fact.id}>
      <p>
        {fact.text}
        <a target="_blank" href={fact.source}>
          (source)
        </a>
        <span className={styles.tag}>#{fact.category}</span>
      </p>
      <div className={styles.votes}>
        <button
          className={vote === 'interesting' ? 'selected' : ''}
          onClick={() =>
            setVote((prev) => {
              if (prev) {
                setPreviousVote(prev);
              }
              return 'interesting';
            })
          }
        >
          👍 {fact.votes.interesting}
        </button>
        <button
          className={vote === 'shocking' ? 'selected' : ''}
          onClick={() =>
            setVote((prev) => {
              if (prev) {
                setPreviousVote(prev);
              }
              return 'shocking';
            })
          }
        >
          😮 {fact.votes.shocking}
        </button>
        <button
          className={vote === 'report' ? 'selected' : ''}
          onClick={() =>
            setVote((prev) => {
              if (prev) {
                setPreviousVote(prev);
              }
              return 'report';
            })
          }
        >
          ⛔ {fact.votes.report}
        </button>
      </div>
    </li>
  );
};

export default Fact;
