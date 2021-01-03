import axios from 'axios';

export default class ScriptRunner {
  title: string;
  query: string;
  token: string;
  variables?: object;

  constructor(title: string, query: string, token: string, variables?: object) {
    this.title = title;
    this.query = query;
    this.token = token;
    this.variables = variables;
  }

  run() {
    console.log(this.title);
    console.log(this.token);
  }
}
