import Hrflow = require("../..");
import Parsing from "./parsing";
import Indexing from './indexing';
import Reasoning from "./reasoning";
import Scoring from "../profile/scoring";
import Searching from "./searching";


export default class Job {
  private hrflow: Hrflow;
  searching: Searching;
  parsing: Parsing;
  indexing: Indexing;
  reasoning: Reasoning;
  scoring: Scoring;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
    this.searching = new Searching(this.hrflow);
    this.parsing = new Parsing(this.hrflow);
    this.indexing = new Indexing(this.hrflow);
    this.reasoning = new Reasoning(this.hrflow);
    this.scoring = new Scoring(this.hrflow);
  }
}