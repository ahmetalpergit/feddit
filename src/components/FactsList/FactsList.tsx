import { IFact } from '../../utils/types';
import Fact from '../Fact';

type FactsListProps = {
  data: IFact[];
};

const FactsList = ({ data }: FactsListProps) => {
  return (
    <ul>
      {data.length ? (
        data.map((fact) => <Fact key={fact.id} fact={fact} />)
      ) : (
        <li>No facts found, create the first one!</li>
      )}
    </ul>
  );
};

export default FactsList;
