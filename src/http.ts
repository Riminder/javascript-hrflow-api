
import "fetch-everywhere";

const FormData = require("form-data");
import axios from 'axios';

import { HrflowAPIResponse } from "./types";
import { APIError } from "./errors";

export const httpRequest = (url: string, options?: any) => {
  let opts = {
    ...options
  };
  if ( typeof process === 'object' ) {
    return fetch(url, opts)
    .then(successHandler, errorHandler)
    .then((json: HrflowAPIResponse) => json.data);
  } else {
    return window.fetch(url, opts)
    .then(successHandler, errorHandler)
    .then((json: HrflowAPIResponse) => json.data);
  }
};

export const httpPostRequest = (url: string, data?: any, options?: any) => {
  // Object.assign(options.headers, { "Content-type": "multipart/form-data" });
  const body = data ? generateBody(data) : null;

  const opts = {
    ...options,
    method: "POST",
    body,
  };

   if ( typeof process === 'object' ) {
    return fetch(url, opts)
    .then(successHandler, errorHandler)
    .then((json: HrflowAPIResponse) => json.data);
  } else {
    return window.fetch(url, opts)
    .then(successHandler, errorHandler)
    .then((json: HrflowAPIResponse) => json.data);
  }
};

export const httpPatchRequest = (url: string, data: any, options?: any) => {
  Object.assign(options.headers, { "Content-type": "application/json" });
  const body = JSON.stringify(data);

  const opts = {
    ...options,
    method: "PATCH",
    body
  };
  if ( typeof process === 'object' ) {
    return fetch(url, opts)
    .then(successHandler, errorHandler)
    .then((json: HrflowAPIResponse) => json.data);
  } else {
    return window.fetch(url, opts)
    .then(successHandler, errorHandler)
    .then((json: HrflowAPIResponse) => json.data);
  }
};

export const httpPutRequest = (url: string, data: any, options?: any) => {
  Object.assign(options.headers, { "Content-type": "application/json" });
  const body = JSON.stringify(data);

  const opts = {
    ...options,
    method: "PUT",
    body
  };
  if ( typeof process === 'object' ) {
    return fetch(url, opts)
    .then(successHandler, errorHandler)
    .then((json: HrflowAPIResponse) => json.data);
  } else {
    return window.fetch(url, opts)
    .then(successHandler, errorHandler)
    .then((json: HrflowAPIResponse) => json.data);
  }
};

const successHandler = (response: Response) => {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  return response.json().then((data: HrflowAPIResponse) => {
    throw new APIError("An error occured", data);
  });
};

const errorHandler = (err: any) => {
  let error = new Error(err.message);
  (<any>error).response = err;
  return Promise.reject(error);
};

const generateBody = (data: any) => {
  let body: any;

  if (data.file) {
    body = new FormData();
    body.append("file", data.file as any);
    Object.keys(data).forEach((key) => {
      if ((data as any)[key] instanceof Array && key !== 'file') {
        body.append(key, JSON.stringify((data as any)[key]));
      } else {
        body.append(key, (data as any)[key]);
      }
    });
  } else {
    body = JSON.stringify(data);
  }

  return body;
};
