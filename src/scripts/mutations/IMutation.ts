export interface IMutation {
  title: string;
  query: any;
  shopName: string;
  shopToken: string;
  delay?: number;
  variables?: object;
}
