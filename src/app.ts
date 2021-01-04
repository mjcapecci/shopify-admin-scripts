import ScriptRunner from './ScriptRunner';
import IResult from './IResult';
const db = require('./db/connect');
db.connectDB();

// script defs
import getAllProducts from './scripts/queries/getAllProducts';
import deleteAllProducts from './scripts/mutations/deleteAllProducts';

async function executeQuery(query: () => any): Promise<IResult> {
  const queryInput = await query();
  const queryRunner = new ScriptRunner(queryInput, null);
  const values: object = await queryRunner.run();
  db.disconnectDB();
  return {
    result: values,
    shopName: queryRunner.shopName,
    shopToken: queryRunner.shopToken,
  };
}

async function executeMutation(
  query: () => any,
  mutation: (mutationInput: IResult) => any
): Promise<any> {
  const input: IResult = await executeQuery(query);
  const buildMutation = await mutation(input);
  const mutationRunner = new ScriptRunner(null, buildMutation);
  const values: object = await mutationRunner.run();
  db.disconnectDB();
  return {
    result: values,
  };
}

// console input logic
const args = require('yargs').argv;

if (args.script === 'getAllProducts') executeQuery(getAllProducts);
if (args.script === 'deleteAllProducts')
  executeMutation(getAllProducts, deleteAllProducts);
