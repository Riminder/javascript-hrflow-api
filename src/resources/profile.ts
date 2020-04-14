import Hrflow = require("..");
import defaults from "../defaults";
import { ProfilesOptions, ProfileOptionIdOrReference, ProfileUpload, TrainingMetadata } from "../types";
import { generateURLParams } from "../utils";
import { ReadStream } from "fs";
import { httpPostRequest, httpRequest } from "../http";
import Document from "./document";
import Parsing from "./parsing";
import Scoring from "./scoring";
import Stage from "./stage";
import Rating from "./rating";
import JSON from "./json";
import Revealing from "./revealing";

export default class Profile {
  private hrflow: Hrflow;
  document: Document;
  parsing: Parsing;
  scoring: Scoring;
  stage: Stage;
  rating: Rating;
  json: JSON;
  revealing: Revealing;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
    this.document = new Document(this.hrflow);
    this.parsing = new Parsing(this.hrflow);
    this.scoring = new Scoring(this.hrflow);
    this.stage = new Stage(this.hrflow);
    this.rating = new Rating(this.hrflow);
    this.json = new JSON(this.hrflow);
    this.revealing = new Revealing(this.hrflow);
  }

  get(options: ProfileOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profile?${urlParams}`, { headers: this.hrflow.headers });
  }

  list(options: ProfilesOptions) {
    if (options.date_end) {
      if (options.date_end && typeof options.date_end === "object") {
        options.date_end = Math.floor(options.date_end.getTime() / 1000);
      } else {
        options.date_end = Math.floor(options.date_end as number / 1000);
      }
    }
    if (options.date_start) {
      if (options.date_start && typeof options.date_start === "object") {
        options.date_start = Math.floor(options.date_start.getTime() / 1000);
      } else {
        options.date_start = Math.floor(options.date_start as number / 1000);
      }
    }
    const urlParams = generateURLParams(options);

    return httpRequest(`${defaults.API_URL}/profiles?${urlParams}`, { headers: this.hrflow.headers });
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