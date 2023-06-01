import { useState } from 'react';
import { ALL_CATEGORIES } from '../../utils/constants';

const ShareForm = () => {
  const [isSharingFact, setIsSharingFact] = useState<boolean>(false);

  return (
    <div className="share">
      {isSharingFact ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="factInput"
            type="text"
            placeholder="Share a fact with the world ... (200)"
          />
          <input type="text" placeholder="Enter source for the fact" />
          <select name="" id="">
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
