import Hrflow = require("../..");
import Parsing from "./parsing";
import Revealing from './revealing';
import Embedding from "./embedding";



export default class Job {
  private hrflow: Hrflow;
  parsing: Parsing;
  revealing: Revealing;
  embedding: Embedding;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
    this.parsing = new Parsing(this.hrflow);
    this.revealing = new Revealing(this.hrflow);
    this.embedding = new Embedding(this.hrflow);
  }
}