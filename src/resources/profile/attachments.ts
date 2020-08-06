import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { ProfileOptionIdOrReference } from "../../types";
import { httpRequest } from "../../http";

export default class Attachments {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  list(source_key: string, options: ProfileOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profile/attachments?source_key=${source_key}&${urlParams}`, { headers: this.hrflow.headers });
  }
}