import { IQuery } from './IQuery';
const db = require('../../db/connect');

export default async function getAllProducts(): Promise<IQuery> {
  const Shop: any = db.models.Shop;

  const mongoQuery: any = Shop.findOne({
    name: process.env.DEV_STORENAME,
  });
  const mongoResult: any = await mongoQuery.exec();

  const query: string = `query {
      products(first: 250) {
        edges {
          node {
            id
          }
        }
      }
    }`;

  const result: IQuery = {
    title: 'getAllProducts',
    query: query,
    shopName: mongoResult.name,
    shopToken: mongoResult.token,
  };

  return result;
}
