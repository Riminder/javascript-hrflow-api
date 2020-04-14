import { HrflowAPIResponse } from "./types";

export class APIError extends Error {
  response: HrflowAPIResponse;
  constructor(message: string, response: HrflowAPIResponse) {
    super(message);
    this.response = response;
  }
}