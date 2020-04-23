import Hrflow = require("../..");
import defaults from "../../defaults";
import { ProfileOptionIdOrReference, ProfileUpload, TrainingMetadata } from "../../types";
import { generateURLParams } from "../../utils";
import { httpPostRequest, httpRequest } from "../../http";
import Attachment from "./attachment";
import Tags from './tags';
import Metadata from "./metadata";
import Parsing from "./parsing";
import Scoring from "./scoring";
import Rating from "./rating";
import JSON from "./json";
import Revealing from "./revealing";
import Embedding from './embedding';
import Searching from './searching';
export default class Profile {
  private hrflow: Hrflow;
  attachment: Attachment;
  tags: Tags;
  metadata: Metadata;
  parsing: Parsing;
  scoring: Scoring;
  revealing: Revealing;
  embedding: Embedding;
  searching: Searching;
  rating: Rating;
  json: JSON;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
    this.attachment = new Attachment(this.hrflow);
    this.tags = new Tags(this.hrflow);
    this.metadata = new Metadata(this.hrflow);
    this.parsing = new Parsing(this.hrflow);
    this.scoring = new Scoring(this.hrflow);
    this.revealing = new Revealing(this.hrflow);
    this.embedding = new Embedding(this.hrflow);
    this.searching = new Searching(this.hrflow);
    this.rating = new Rating(this.hrflow);
    this.json = new JSON(this.hrflow);
    
  }

  get(options: ProfileOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profile?${urlParams}`, { headers: this.hrflow.headers });
  }

  add(data: ProfileUpload) {
    if (data.timestamp_reception) {
      if (data.timestamp_reception && typeof data.timestamp_reception === "object") {
        data.timestamp_reception = Math.floor(data.timestamp_reception.getTime() / 1000);
      } else {
        data.timestamp_reception = Math.floor(data.timestamp_reception as number / 1000);
      }
    }
    const url = `${defaults.API_URL}/profile`;
    return httpPostRequest(url, data, { headers: this.hrflow.headers });
  }
}