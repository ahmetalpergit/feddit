import { useState } from 'react';
import { ALL_CATEGORIES } from '../../utils/constants';
import { Fact } from '../../utils/types';
import { ShareFormSchema } from './formSchema';

const ShareForm = () => {
  const [isSharingFact, setIsSharingFact] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Fact>({
    text: '',
    source: '',
    category: '',
    votes: {
      interesting: 0,
      report: 0,
      shocking: 0,
    },
  });
  const [errors, setErrors] = useState<Partial<Fact>>({
    text: '',
    source: '',
    category: '',
  });

  const resetAllFields = () => {
    setFormValues({
      text: '',
      source: '',
      category: '',
      votes: {
        interesting: 0,
        report: 0,
        shocking: 0,
      },
    });
    setErrors({
      text: '',
      source: '',
      category: '',
    });
  };

  const shareFactPostRequest = async (fact: Fact) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}`, {
      method: 'POST',
      headers: {
        apikey: import.meta.env.VITE_API_KEY,
        authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(fact),
    });

    return res.json();
  };

  return (
    <div className="share">
      {isSharingFact ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const shareFormValidationResult =
              ShareFormSchema.safeParse(formValues);

            if (!shareFormValidationResult.success) {
              const { issues } = shareFormValidationResult.error;

              issues.forEach((issue) => {
                const [errorType] = issue.path;
                const { message } = issue;
                setErrors((prev) => ({ ...prev, [errorType]: message }));
              });
            } else {
              const newFact = {
                ...formValues,
                id: Math.floor(Math.random() * 1000000),
                createdAt: new Date(),
              };
              shareFactPostRequest(newFact);
              resetAllFields();
              setIsSharingFact(false);
            }
          }}
        >
          <input
            className={`factInput ${errors.text ? 'error' : ''}`}
            type="text"
            placeholder={errors.text || 'Share a fact with the world ... (200)'}
            onChange={(e) => {
              setFormValues((prev) => ({ ...prev, text: e.target.value }));
              setErrors((prev) => ({ ...prev, text: '' }));
            }}
            value={formValues.text}
          />
          <input
            className={`factInput ${errors.source ? 'error' : ''}`}
            type="text"
            placeholder={errors.source || 'Enter source for the fact'}
            onChange={(e) => {
              setFormValues((prev) => ({ ...prev, source: e.target.value }));
              setErrors((prev) => ({ ...prev, source: '' }));
            }}
            value={formValues.source}
          />
          <select
            className={errors.category ? 'error' : ''}
            defaultValue={''}
            name=""
            id=""
            onChange={(e) => {
              setFormValues((prev) => ({ ...prev, category: e.target.value }));
              setErrors((prev) => ({ ...prev, category: '' }));
            }}
          >
            <option value="" disabled>
              {'-- Select category --'}
            </option>
            {ALL_CATEGORIES.map(({ name }) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </select>
          <button className="btn post">Post</button>
          <button onClick={() => setIsSharingFact(false)}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => setIsSharingFact(true)} className="shareBtn btn">
          Share a fact
        </button>
      )}
    </div>
  );
};

export default ShareForm;
