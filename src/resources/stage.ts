import Hrflow = require("..");
import defaults from "../defaults";
import { httpPatchRequest } from "../http";
import { StagePatch } from "../types";

export default class Stage {
  private hrflow: Hrflow;
  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  set(data: StagePatch) {
    let url = `${defaults.API_URL}/profile/stage`;
    return httpPatchRequest(url, data, { headers: this.hrflow.headers });
  }
}