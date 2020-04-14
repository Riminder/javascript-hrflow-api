import Hrflow = require("..");
import defaults from "../defaults";
import { httpRequest } from "../http";

export default class Source {
  private hrflow: Hrflow;
  constructor(hrflow: Hrflow) {
    this.hrflow = hrflow;
  }

  get(id: string) {
    return httpRequest(`${defaults.API_URL}/source?source_id=${id}`, { headers: this.hrflow.headers });
  }

  list() {
    return httpRequest(`${defaults.API_URL}/sources`, { headers: this.hrflow.headers });
  }
}