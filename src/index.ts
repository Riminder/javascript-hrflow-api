import { HrflowOptions } from "./types";
import { Webhooks } from "./webhooks";
import Source from "./resources/source";
import Profile from "./resources/profile/profile";
import Job from "./resources/job/job";

class Hrflow {
  public headers: any;
  public API_Key: string;
  public Webhooks_Key: string;
  public webhooks: Webhooks;
  public source: Source;
  public profile: Profile;
  public job: Job;

  constructor(options: HrflowOptions) {

    if (!options.API_Key) {
      let error = new Error("No API Key was supplied for Hrflow SDK");
      throw error;
    }

    this.API_Key = options.API_Key;
    this.headers = {
      "X-API-KEY": this.API_Key,
    };
    if (options.Webhooks_Key) {
      this.Webhooks_Key = options.Webhooks_Key;
    }

    this._init();
  }

  private _init() {
    if (this.Webhooks_Key) {
      this.webhooks = new Webhooks(this);
    }

    this.source = new Source(this);
    this.profile = new Profile(this);
    this.job = new Job(this);
  }
}

export = Hrflow;