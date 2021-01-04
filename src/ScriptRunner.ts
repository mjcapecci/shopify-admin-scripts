import axios from 'axios';
import { IQuery } from './scripts/queries/IQuery';
import { IMutation } from './scripts/mutations/IMutation';

export default class ScriptRunner {
  title: string;
  query: string;
  shopName: string;
  shopToken: string;
  delay?: number;
  variables?: any;

  constructor(query?: IQuery, mutation?: IMutation) {
    if (query && !mutation) {
      this.title = query.title;
      this.query = query.query;
      this.shopName = query.shopName;
      this.shopToken = query.shopToken;
      return;
    }

    if (mutation && !query) {
      this.title = mutation.title;
      this.query = mutation.query;
      this.shopName = mutation.shopName;
      this.shopToken = mutation.shopToken;
      this.delay = mutation.delay;
      this.variables = mutation.variables;
      return;
    }
  }

  async run(): Promise<object> {
    const url: string = `https://${this.shopName}/admin/api/graphql.json`;

    const headers: object = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': this.shopToken,
    };

    const graphQuery: string = this.query;

    // single mutation query
    if (!this.variables) {
      try {
        const res: any = await axios.post(
          url,
          JSON.stringify({
            query: graphQuery,
          }),
          {
            headers,
          }
        );

        const values: object = res.data.data;

        return values;
      } catch (error) {
        console.log(error);
      }
      // compound mutation query with variables
    } else {
      const topRes = this.variables.map(async (variable) => {
        try {
          const res: any = await axios.post(
            url,
            JSON.stringify({
              query: graphQuery,
              variables: {
                input: {
                  id: variable,
                },
              },
            }),
            {
              headers,
            }
          );

          const values: object = res.data.data;

          return values;
        } catch (error) {
          console.log(error);
        }
      });
      return topRes;
    }
  }
}
