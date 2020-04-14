import Hrflow = require("..");
import defaults from "../defaults";
import { httpPatchRequest } from "../http";
import { RatingPatch } from "../types";

export default class Rating {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  set(data: RatingPatch) {
    let url = `${defaults.API_URL}/profile/rating`;
    return httpPatchRequest(url, data, { headers: this.hrflow.headers });
  }
}