import Hrflow = require("../..");
import defaults from "../../defaults";
import { ProfileOptionIdOrReference, ProfileJSON } from "../../types";
import { generateURLParams } from "../../utils";
import { httpRequest, httpPutRequest } from "../../http";
import Attachments from "./attachments";
import Tags from './tags';
import Metadatas from "./metadatas";
import Parsing from "./parsing";
import Scoring from "./scoring";
import Rating from "./rating";
// import JSON from "./json";
import Revealing from "./revealing";
import Embedding from './embedding';
import Searching from './searching';
import Indexing from "./indexing";
export default class Profile {
  private hrflow: Hrflow;
  attachments: Attachments;
  tags: Tags;
  metadatas: Metadatas;
  parsing: Parsing;
  indexing: Indexing;
  scoring: Scoring;
  revealing: Revealing;
  embedding: Embedding;
  searching: Searching;
  rating: Rating;
  // json: JSON;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
    this.attachments = new Attachments(this.hrflow);
    this.tags = new Tags(this.hrflow);
    this.metadatas = new Metadatas(this.hrflow);
    this.parsing = new Parsing(this.hrflow);
    this.indexing = new Indexing(this.hrflow)
    this.scoring = new Scoring(this.hrflow);
    this.revealing = new Revealing(this.hrflow);
    this.embedding = new Embedding(this.hrflow);
    this.searching = new Searching(this.hrflow);
    this.rating = new Rating(this.hrflow);
    // this.json = new JSON(this.hrflow);
    
  }

  get(options: ProfileOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profile?${urlParams}`, { headers: this.hrflow.headers });
  }
}