import { IMutation } from './IMutation';

export default async function deleteAllProducts(
  input: any
): Promise<IMutation> {
  const productIds: any = input.result.products.edges.map(
    (edge) => edge.node.id
  );

  const query = `mutation productDelete($input: ProductDeleteInput!) {
    productDelete(input: $input) {
      deletedProductId
      shop {
        id
      }
      userErrors {
        field
        message
      }
    }
  }`;

  const result: IMutation = {
    title: 'deleteAllProducts',
    query: query,
    shopName: input.shopName,
    shopToken: input.shopToken,
    delay: 150,
    variables: productIds,
  };

  return result;
}
