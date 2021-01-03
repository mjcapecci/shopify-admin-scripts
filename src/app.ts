import deleteAllProducts from './scripts/mutations/deleteAllProducts';
import ScriptRunner from './ScriptRunner';
const db = require('./db/connect');
db.connectDB();

const runner = new ScriptRunner('TEST TITLE', 'TEST QUERY', 'TEST TOKEN');
runner.run();

db.disconnectDB();

// console.log(deleteAllProducts());
