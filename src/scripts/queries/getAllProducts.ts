import { IQuery } from './IQuery';

export default function getAllProducts(): IQuery {
  const result: IQuery = {
    query: 'test',
    shopToken: 'test',
  };

  return result;
}
