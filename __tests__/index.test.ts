import * as fs from "fs";
import { generateURLParams } from "../src/utils";
import { httpRequest } from "../src/http";
import Hrflow = require("../src/index");
import { HrflowOptions, profilesSearchingOptions, ProfileUpload, Stage, SortBy, OrderBy, ProfileJSON } from "../src/types";

let app: Hrflow;

/**
 * @Readme: These tests are incomplete. We should also test the content of the request. It's currently testing
 * only the endpoint and the query parameters given.
 * @Todo: Add body check for each post/patch route
 */

function getQueryParamAsArray(query: string): Array<string> {
  return query
    .split("&")
    .map((entry: string) => entry.split("=")[0]);
}

describe("Other tests", () => {
  describe("\"Hrflow\" object relative tests", () => {
    test("it should throw an error when no key is given", () => {
      expect(() => {
        app = new Hrflow({} as HrflowOptions);
      }).toThrowErrorMatchingSnapshot();
    });
  });

  describe("utils module relative tests", () => {
    test("This should return null if there is no input data", () => {
      expect(generateURLParams(null)).toBeNull();
    });
  });

  describe("http module relative tests", () => {
    test("It should throw an error if the error code is not 200 or 201", () => {
      const headers = {
        "X-API-KEY": "api_key",
      };

      expect.assertions(1);
      return httpRequest("localhost", { error: true, headers }).catch((e) => {
        expect(e).toMatchSnapshot();
      });
    });

    test("it should throw an error if something went wrong with the request", () => {
      const headers = {
        "X-API-KEY": "api_key",
      };
      expect.assertions(1);
      return httpRequest("localhost", { reject: true, headers }).catch((e) => {
        expect(e).toMatchSnapshot();
      });
    });
  });
});

describe("Wrapper test", () => {
    app = new Hrflow({api_secret : "api_key", api_user: "api_user"});
    describe("Source endpoints", () => {
        test("It should call the get source list endpoint", () => {
          const options = {};
          app.source.list(options).then((response: any) => {
            expect(response).toMatchSnapshot();
          })
        }
       );

        test("It should call the get source endpoint", () => {
          app.source.get("source_key").then((response: any) => {
            expect(response).toMatchSnapshot();
          });
        });
      });

    describe("Profile endpoints", () => {
      test("It should call the get profile endpoint using Date object", () => {
        const options: profilesSearchingOptions = {
          source_keys: ["source1", "source2"],
          created_at_min: new Date(0),
          created_at_max: new Date(1234),
          page: 1,
          stage: Stage.YES,
          limit: 30,
          sort_by: SortBy.DATE_RECEPTION,
          order_by: OrderBy.DESC,
        };
        app.profile.searching.list(options)
          .then((response: any) => {
          expect(response).toMatchSnapshot();
          expect(getQueryParamAsArray(response.url.query)).toEqual(Object.keys(options));
        });
      });

      test("It should call the get profile endpoint using Date number", () => {
        const options: profilesSearchingOptions = {
          source_keys: ["source1", "source2"],
          created_at_min: 0,
          created_at_max: (new Date("2018-01-01")).getTime(),
          page: 1,
          stage: Stage.YES,
          limit: 30,
          sort_by: SortBy.DATE_RECEPTION,
          order_by: OrderBy.DESC,
        };
        app.profile.searching.list(options)
          .then((response: any) => {
          expect(response).toMatchSnapshot();
          expect(getQueryParamAsArray(response.url.query)).toEqual(Object.keys(options));
        });
      });

      test("It should call the get profile endpoint with the profile id", () => {
        const options = {
          source_key: "source_key",
          profile_key: "profile_key",
        };
        app.profile.get(options).then((response: any) => {
          expect(response).toMatchSnapshot();
        });
      });

      test("It should call the get profile endpoint with the profile reference", () => {
        const options = {
          source_key: "source_key",
          reference: "reference",
        };
        app.profile.get(options).then((response: any) => {
          expect(response).toMatchSnapshot();
        });
      });

      test("It should call the get profile attachments endpoint with the profile id", () => {
        const options = {
          source_key: "source_key",
          profile_key: "profile_key",
        };
        app.profile.attachments.list(options).then((response: any) => {
          expect(response).toMatchSnapshot();
        });
      });

      test("It should call the get profile document endpoint with the profile reference", () => {
        const options = {
          source_key: "source_key",
          reference: "reference",
        };
        app.profile.attachments.list(options).then((response: any) => {
          expect(response).toMatchSnapshot();
        });
      });

      test("It should call the get profile parsing endpoint with the profile id", () => {
        const options = {
          source_key: "source_key",
          profile_key: "profile_key",
        };
        app.profile.parsing.get(options).then((response: any) => {
          expect(response).toMatchSnapshot();
        });
      });

      test("It should call the get profile parsing endpoint with the profile reference", () => {
        const options = {
          source_key: "source_key",
          reference: "reference",
        };
        app.profile.parsing.get(options).then((response: any) => {
          expect(response).toMatchSnapshot();
        });
      });

      test("It should call the get profile scoring endpoint with the profile id", () => {
        const options = {
          source_keys:  ["source_key"],
          job_key: "job_key",
          board_key: "board_key",
        };
        app.profile.scoring.list(options).then((response: any) => {
          expect(response).toMatchSnapshot();
        });
      });

      test("It should call the get profile scoring endpoint with the profile reference", () => {
        const options = {
          source_keys:  ["source_key"],
          job_key: "job_key",
          board_key: "board_key",
        };
        app.profile.scoring.list(options).then((response: any) => {
          expect(response).toMatchSnapshot();
        });
      });

      test("It should call the post resume endpoint", () => {
        const file = fs.createReadStream("./test.txt");
        const data: ProfileUpload = {
          source_key: "source_key",
          file: file,
          reference: "ref",
          created_at: new Date(Date.now()),
          metadatas: [{
            name: "filter_reference",
            value: "123456"
          }],
        };

        app.profile.addFile(data)
          .then((response: any) => {
            const responseWithoutBody = {
              url: response.url,
              options: {
                headers: response.options.headers,
                method: response.options.method
              }
            };
            expect(responseWithoutBody).toMatchSnapshot();
        });
      });

      // test("It should call the patch stage endpoint with the the profile id and filter id", () => {
      //   const data: StagePatch = {
      //     source_key: "source_key",
      //     profile_key: "profile_key",
      //     filter_id: "filter_id",
      //     stage: Stage.YES,
      //   };

      //   app.profile.stage.set(data)
      //     .then((response: any) => {
      //       const responseWithoutBody = {
      //         url: response.url,
      //         options: {
      //           headers: response.options.headers,
      //           method: response.options.method
      //         }
      //       };
      //       expect(responseWithoutBody).toMatchSnapshot();
      //     });
      // });

      // test("It should call the patch stage endpoint with the the profile id and filter reference", () => {
      //   const data: StagePatch = {
      //     source_key: "source_key",
      //     profile_key: "profile_key",
      //     filter_id: "filter_id",
      //     stage: Stage.YES,
      //   };
      //   app.profile.stage.set(data)
      //     .then((response: any) => {
      //       const responseWithoutBody = {
      //         url: response.url,
      //         options: {
      //           headers: response.options.headers,
      //           method: response.options.method
      //         }
      //       };
      //       expect(responseWithoutBody).toMatchSnapshot();
      //     });
      // });

      // test("It should call the patch stage endpoint with the the profile reference and filter id", () => {
      //   const data: StagePatch = {
      //     source_key: "source_key",
      //     profile_key: "profile_key",
      //     filter_id: "filter_id",
      //     stage: Stage.YES,
      //   };
      //   app.profile.stage.set(data)
      //     .then((response: any) => {
      //       const responseWithoutBody = {
      //         url: response.url,
      //         options: {
      //           headers: response.options.headers,
      //           method: response.options.method
      //         }
      //       };
      //       expect(responseWithoutBody).toMatchSnapshot();
      //     });
      // });

      // test("It should call the patch stage endpoint with the the profile reference and filter reference", () => {
      //   const data: StagePatch = {
      //     source_key: "source_key",
      //     profile_key: "profile_key",
      //     filter_id: "filter_id",
      //     stage: Stage.YES,
      //   };
      //   app.profile.stage.set(data)
      //     .then((response: any) => {
      //       const responseWithoutBody = {
      //         url: response.url,
      //         options: {
      //           headers: response.options.headers,
      //           method: response.options.method
      //         }
      //       };
      //       expect(responseWithoutBody).toMatchSnapshot();
      //     });
      // });

      // test("It should call the patch rating endpoint with the the profile id and filter id", () => {
      //   const data: RatingPatch = {
      //     source_key: "source_key",
      //     profile_key: "profile_key",
      //     filter_id: "filter_id",
      //     rating: 2
      //   };
      //   app.profile.rating.set(data)
      //     .then((response: any) => {
      //       const responseWithoutBody = {
      //         url: response.url,
      //         options: {
      //           headers: response.options.headers,
      //           method: response.options.method
      //         }
      //       };
      //       expect(responseWithoutBody).toMatchSnapshot();
      //     });
      // });

      // test("It should call the patch rating endpoint with the the profile id and filter reference", () => {
      //   const data: RatingPatch = {
      //     source_key: "source_key",
      //     profile_key: "profile_key",
      //     filter_id: "filter_id",
      //     rating: 2
      //   };
      //   app.profile.rating.set(data)
      //     .then((response: any) => {
      //       const responseWithoutBody = {
      //         url: response.url,
      //         options: {
      //           headers: response.options.headers,
      //           method: response.options.method
      //         }
      //       };
      //       expect(responseWithoutBody).toMatchSnapshot();
      //     });
      // });

      // test("It should call the patch rating endpoint with the the profile reference and filter id", () => {
      //   const data: RatingPatch = {
      //     source_key: "source_key",
      //     profile_key: "profile_key",
      //     filter_id: "filter_id",
      //     rating: 2
      //   };
      //   app.profile.rating.set(data)
      //     .then((response: any) => {
      //       const responseWithoutBody = {
      //         url: response.url,
      //         options: {
      //           headers: response.options.headers,
      //           method: response.options.method
      //         }
      //       };
      //       expect(responseWithoutBody).toMatchSnapshot();
      //     });
      // });

      // test("It should call the patch rating endpoint with the the profile reference and filter reference", () => {
      //   const data: RatingPatch = {
      //     source_key: "source_key",
      //     profile_key: "profile_key",
      //     filter_id: "filter_id",
      //     rating: 2
      //   };
      //   app.profile.rating.set(data)
      //     .then((response: any) => {
      //       const responseWithoutBody = {
      //         url: response.url,
      //         options: {
      //           headers: response.options.headers,
      //           method: response.options.method
      //         }
      //       };
      //       expect(responseWithoutBody).toMatchSnapshot();
      //     });
      // });

      test("It should call the post profile data endpoint", () => {
        const json: ProfileJSON = {
          source_key: "source_key",
          reference: "macfly",
          info: {
            full_name: "Marty McFly",
            first_name: "Marty McFly",
            last_name: "Marty McFly",
            email: "marty.mcfly@gmail.com",
            phone: "202-555-0141",
            summary: "High school student, loves to time travel",
            location: {
              text: "9303 Lyon Drive, Lyon Estates, Hill Valley CA 95420"
            },
            urls: {
              from_resume: [
                "test.com"
              ],
              linkedin: "",
              twitter: "",
              facebook: "",
              github: "",
              picture: ""
            }
          },
          experiences: [{
            date_start: "01/01/2017",
            date_end: "01/01/2018",
            title: "CusCo employee",
            company: "CusCo",
            location: {
              text: "Hill Valley"
            },
            description: "Fujitsu company"
          }],
          educations: [{
            date_start: "01/01/1985",
            date_end: "01/01/1986",
            title: "Hill Valley High School",
            school: "Hill Valley High School",
            location: {
              text: "Hill Valley"
            },
            description: "a school"
          }],
          skills: [
           {
             name: 'python',
             value: 'senior'
           }
          ],
          languages: [
            {
              name: 'english',
              value: 'fluent'
            }
          ],
          interests: [
            {
              name: 'aptitude',
              value: true,
            }
          ],
          labels: {
            job_key: "848491764713d6a6dd97480f865ffdb51077a6fb",
            job_reference: "azerty123",
            stage: "later",
            stage_timestamp: 1594806495285,
            rating: null,
            rating_timestamp: null,
          }
        };

        app.profile.addJson(json).then((response: any) => {
          const responseWithoutBody = {
            url: response.url,
            options: {
              headers: response.options.headers,
              method: response.options.method
            }
          };
          expect(responseWithoutBody).toMatchSnapshot();
        });
      });

      // test("It should call the check profile data endpoint", () => {
      //   const json: JsonUploadCheck = {
      //     profile_json: {
      //       name: "Marty McFly",
      //       email: "marty.mcfly@gmail.com",
      //       phone: "202-555-0141",
      //       summary: "High school student, loves to time travel",
      //       timestamp_reception: new Date("1985-10-21"),
      //       location_details: {
      //         text: "9303 Lyon Drive, Lyon Estates, Hill Valley CA 95420"
      //       },
      //       experiences: [{
      //         start: "01/01/2017",
      //         end: "01/01/2018",
      //         title: "CusCo employee",
      //         company: "CusCo",
      //         location_details: {
      //           text: "Hill Valley"
      //         },
      //         location: "Hill Valley",
      //         description: "Fujitsu company"
      //       }],
      //       educations: [{
      //         start: "01/01/1985",
      //         end: "01/01/1986",
      //         title: "Hill Valley High School",
      //         school: "Hill Valley High School",
      //         location_details: {
      //           text: "Hill Valley"
      //         },
      //         location: "Hill Valley",
      //         description: "a school"
      //       }],
      //       skills: [
      //         "skate",
      //         "time travel"
      //       ],
      //       languages: [
      //         "english"
      //       ],
      //       interests: [
      //         "music",
      //       ],
      //       urls: {
      //         from_resume: [
      //           "test.com"
      //         ],
      //         linkedin: "",
      //         twitter: "",
      //         facebook: "",
      //         github: "",
      //         picture: ""
      //       }
      //     }
      //   };

      //   app.profile.json.check(json).then((response: any) => {
      //     const responseWithoutBody = {
      //       url: response.url,
      //       options: {
      //         headers: response.options.headers,
      //         method: response.options.method
      //       }
      //     };
      //     expect(responseWithoutBody).toMatchSnapshot();
      //   });
      // });
    });
});