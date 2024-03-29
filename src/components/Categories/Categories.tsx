import { Dispatch, SetStateAction } from 'react';
import { ALL_CATEGORIES } from '../../utils/constants';
import styles from './categories.module.scss';

type CategoriesProps = {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
};

const Categories = ({ category, setCategory }: CategoriesProps) => {
  return (
    <ul className={styles.categories}>
      <li onClick={() => setCategory('')}>
        <button className={!category ? 'selected' : ''}>all</button>
      </li>
      {ALL_CATEGORIES.map(({ name }) => (
        <li onClick={() => setCategory(name)} key={name}>
          <button className={category === name ? 'selected' : ''}>
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
