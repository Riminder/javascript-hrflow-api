import Hrflow = require("../..");
// import defaults from "../../defaults";
// import { httpPostRequest } from "../../http";
import Parsing from "./parsing";
import Reasoning from "./reasoning";
import Scoring from "../profile/scoring";
import Searching from "./searching";


export default class Job {
  private hrflow: Hrflow;
  searching: Searching;
  parsing: Parsing;
  reasoning: Reasoning;
  scoring: Scoring;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
    this.searching = new Searching(this.hrflow);
    this.parsing = new Parsing(this.hrflow);
    this.reasoning = new Reasoning(this.hrflow);
    this.scoring = new Scoring(this.hrflow);
  }

  // add(data: JobPostOptions) {
  //   const url = `${defaults.API_URL}/profile`;
  //   return httpPostRequest(url, data, file, { headers: this.hrflow.headers });
  // }

}