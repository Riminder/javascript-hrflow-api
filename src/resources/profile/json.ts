// import Hrflow = require("../..");
// import defaults from "../../defaults";
// import { JsonUpload, Metadatas, Labels, JsonUploadCheck } from "../../types";
// import { httpPostRequest } from "../../http";

// export default class JSON {
//   private hrflow: Hrflow;

//   constructor(hrflow: Hrflow) {
//     this.hrflow = hrflow;
//   }

//   add(data: JsonUpload) {
//     const transformedData = this._tranformTimestamp(data);
//     const url = `${defaults.API_URL}/profile/json`;
//     return httpPostRequest(url, transformedData, { headers: this.hrflow.headers });
//   }


//   private _tranformTimestamp(data: JsonUpload ): JsonUpload {
//     if (data.profile_json.timestamp_reception) {
//       if (data.profile_json.timestamp_reception && typeof data.profile_json.timestamp_reception === "object") {
//         data.profile_json.timestamp_reception = Math.floor(data.profile_json.timestamp_reception.getTime() / 1000);
//       } else {
//         data.profile_json.timestamp_reception = Math.floor(data.profile_json.timestamp_reception as number / 1000);
//       }
//     }
//     if (data.labels) {
//       data.labels.forEach((label: Labels) => {
//         if (typeof label.rating_timestamp === "object") {
//           label.rating_timestamp = Math.floor(label.rating_timestamp.getTime() / 1000);
//         } else {
//           label.rating_timestamp = Math.floor(label.rating_timestamp as number / 1000);
//         }
//         if (typeof label.stage_timestamp === "object") {
//           label.stage_timestamp = Math.floor(label.stage_timestamp.getTime() / 1000);
//         } else {
//           label.stage_timestamp = Math.floor(label.stage_timestamp as number / 1000);
//         }
//       });
//     }

//     return data;
//   }
// }