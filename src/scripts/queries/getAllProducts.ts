import { IQuery } from './IQuery';
const db = require('../../db/connect');

export default async function getAllProducts(): Promise<IQuery> {
  const Shop: any = db.models.Shop;

  try {
    const mongoQuery: any = await Shop.findOne({
      shop_name: process.env.DEV_STORENAME,
    });

    if (!mongoQuery.shop_name) {
      throw new Error('No Shop Name/Token Could Be Found');
    }

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
      shopName: mongoQuery.shop_name,
      shopToken: mongoQuery.shop_token,
    };

    return result;
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}
