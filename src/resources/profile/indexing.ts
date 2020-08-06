import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { ProfileOptionIdOrReference, ProfileJSON } from "../../types";
import { httpRequest, httpPostRequest, httpPutRequest } from "../../http";

export default class Indexing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(source_key: string, options: ProfileOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profile/indexing?source_key=${source_key}&${urlParams}`, { headers: this.hrflow.headers });
  }

  addJson(source_key: string, data: ProfileJSON) {
    const payload = {...data, source_key}
    const url = `${defaults.API_URL}/profile/indexing`;
    return httpPostRequest(url, payload, { headers: this.hrflow.headers });
  }

  edit(source_key: string, key: string, data: ProfileJSON) {
    const payload = {...data, source_key, key}
    const url = `${defaults.API_URL}/profile/indexing`;
    return httpPutRequest(url, payload, { headers: this.hrflow.headers });
  }
}