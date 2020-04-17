import Hrflow = require("../..");
import defaults from "../../defaults";
import { ProfileOptionIdOrReference, ProfileUpload, TrainingMetadata } from "../../types";
import { generateURLParams } from "../../utils";
import { ReadStream } from "fs";
import { httpPostRequest, httpRequest } from "../../http";
import Attachment from "./attachment";
import Parsing from "./parsing";
import Scoring from "./scoring";
import Stage from "./stage";
import Rating from "./rating";
import JSON from "./json";
import Revealing from "./revealing";
import Embedding from './embedding';
export default class Profile {
  private hrflow: Hrflow;
  attachment: Attachment;
  parsing: Parsing;
  scoring: Scoring;
  revealing: Revealing;
  embedding: Embedding;
  stage: Stage;
  rating: Rating;
  json: JSON;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
    this.attachment = new Attachment(this.hrflow);
    this.parsing = new Parsing(this.hrflow);
    this.scoring = new Scoring(this.hrflow);
    this.stage = new Stage(this.hrflow);
    this.revealing = new Revealing(this.hrflow);
    this.embedding = new Embedding(this.hrflow);
    this.rating = new Rating(this.hrflow);
    this.json = new JSON(this.hrflow);
    
  }

  get(options: ProfileOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profile?${urlParams}`, { headers: this.hrflow.headers });
  }

  add(data: ProfileUpload, file: ReadStream) {
    if (data.timestamp_reception) {
      if (data.timestamp_reception && typeof data.timestamp_reception === "object") {
        data.timestamp_reception = Math.floor(data.timestamp_reception.getTime() / 1000);
      } else {
        data.timestamp_reception = Math.floor(data.timestamp_reception as number / 1000);
      }
    }
    if (data.training_metadata) {
      data.training_metadata.forEach((metadata: TrainingMetadata) => {
        if (typeof metadata.rating_timestamp === "object") {
          metadata.rating_timestamp = Math.floor(metadata.rating_timestamp.getTime() / 1000);
        } else {
          metadata.rating_timestamp = Math.floor(metadata.rating_timestamp as number / 1000);
        }
        if (typeof metadata.stage_timestamp === "object") {
          metadata.stage_timestamp = Math.floor(metadata.stage_timestamp.getTime() / 1000);
        } else {
          metadata.stage_timestamp = Math.floor(metadata.stage_timestamp as number / 1000);
        }
      });
    }
    const url = `${defaults.API_URL}/profile`;
    return httpPostRequest(url, data, file, { headers: this.hrflow.headers });
  }
}