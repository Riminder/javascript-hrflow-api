import Hrflow = require("../..");
import { ReadStream } from "fs";
import defaults from "../../defaults";
import { generateURLParams } from "../../utils";
import { ProfileOptionIdOrReference, ProfileUpload } from "../../types";
import { httpRequest, httpPostRequest } from "../../http";

export default class Parsing {
  private hrflow: Hrflow;

  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(source_key: string, options: ProfileOptionIdOrReference) {
    const urlParams = generateURLParams(options);
    return httpRequest(`${defaults.API_URL}/profile/parsing?source_key=${source_key}&${urlParams}`, { headers: this.hrflow.headers });
  }

  addFile( source_key: string, file: ReadStream ,data: ProfileUpload) {
    const url = `${defaults.API_URL}/profile/parsing/file`;
    let payload  = {...data, file, source_key}
    return httpPostRequest(url, payload, { headers: this.hrflow.headers });
  }
}