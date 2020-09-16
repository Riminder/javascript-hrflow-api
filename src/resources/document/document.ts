import Hrflow = require("../..");
import Parsing from "./parsing";
import Revealing from './revealing';
import Embedding from "./embedding";
import Linking from "./linking";



export default class Job {
  private hrflow: Hrflow;
  parsing: Parsing;
  revealing: Revealing;
  embedding: Embedding;
  linking: Linking;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
    this.parsing = new Parsing(this.hrflow);
    this.revealing = new Revealing(this.hrflow);
    this.embedding = new Embedding(this.hrflow);
    this.linking = new Linking(this.hrflow);
  }
}