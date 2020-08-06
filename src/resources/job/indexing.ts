import Hrflow = require("../..");
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { jobOptionIdOrReference, JobPostOptions } from "../../types";
import { httpRequest, httpPostRequest, httpPutRequest } from "../../http";

export default class Indexing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(board_key: string, options: jobOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/job/indexing?board_key=${board_key}${urlParams}`, { headers: this.hrflow.headers });
  }

  addJson(board_key: string, data: JobPostOptions) {
    const payload = {...data, board_key}
    const url = `${defaults.API_URL}/job/indexing`;
    return httpPostRequest(url, payload, { headers: this.hrflow.headers });
  }

  edit(board_key: string, key: string, data: JobPostOptions) {
    const payload = {...data, board_key, key}
    const url = `${defaults.API_URL}/job/indexing`;
    return httpPutRequest(url, payload, { headers: this.hrflow.headers });
  }
}