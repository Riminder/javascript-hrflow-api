import { HrflowOptions } from "./types";
import { Webhooks } from "./webhooks";
import Source from "./resources/source";
import Profile from "./resources/profile/profile";
import Job from "./resources/job/job";
import Document from "./resources/document/document";

class Hrflow {
  public headers: any;
  public api_secret: string;
  public webhooks_key: string;
  public api_user: string;
  public webhooks: Webhooks;
  public source: Source;
  public profile: Profile;
  public job: Job;
  public document: Document;

  constructor(options: HrflowOptions) {

    if (!options.api_secret) {
      let error = new Error("No API Key was supplied for Hrflow SDK");
      throw error;
    }

    this.api_secret = options.api_secret;
    this.headers = {
      "X-API-KEY": this.api_secret,
      "X-USER-EMAIL": this.api_user
    };
    if (options.webhooks_key) {
      this.webhooks_key = options.webhooks_key;
    }

    this._init();
  }

  private _init() {
    if (this.webhooks_key) {
      this.webhooks = new Webhooks(this);
    }

    this.source = new Source(this);
    this.profile = new Profile(this);
    this.job = new Job(this);
    this.document = new Document(this);
  }
}

export = Hrflow;