import { HrflowOptions } from "./types";
import { Webhooks } from "./webhooks";
import Source from "./resources/source";
import Filter from "./resources/filter";
import Profile from "./resources/profile";
import Offer from "./resources/offer";

class Hrflow {
  public headers: any;
  public API_Key: string;
  public Webhooks_Key: string;
  public webhooks: Webhooks;
  public source: Source;
  public filter: Filter;
  public profile: Profile;
  public offer: Offer;

  constructor(options: HrflowOptions) {

    if (!options.API_Key) {
      let error = new Error("No API Key was supplied for Hrflow SDK");
      throw error;
    }

    this.API_Key = options.API_Key;
    this.headers = {
      "X-API-Key": this.API_Key,
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
    this.filter = new Filter(this);
    this.profile = new Profile(this);
    this.offer = new Offer(this);
  }
}

export = Hrflow;