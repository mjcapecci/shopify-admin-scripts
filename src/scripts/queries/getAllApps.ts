import { IQuery } from './IQuery';
const db = require('../../db/connect');

export default async function getAllApps(): Promise<IQuery> {
  const Shop: any = db.models.Shop;

  const mongoQuery: any = Shop.findOne({
    name: process.env.DEV_STORENAME,
  });
  const mongoResult: any = await mongoQuery.exec();

  const query: string = `
    query {
        appInstallations (first:50) {
        edges {
            node {
            id
            launchUrl
            }
          }
        }
    }
  `;

  const result: IQuery = {
    title: 'getAllApps',
    query: query,
    shopName: mongoResult.name,
    shopToken: mongoResult.token,
  };

  return result;
}
