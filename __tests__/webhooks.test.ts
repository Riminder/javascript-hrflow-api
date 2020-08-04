import Hrflow = require("../src/index");
import { Webhooks } from "../src/webhooks";
import * as util from "tweetnacl-util";
import * as sha256 from "fast-sha256";

let app: Hrflow;
const api_secret = "api_key";
const api_user = "api_user";
const webhooks_key = "webhooks_key";

function generateSignature(key: string, event: string) {
    const data: Webhooks.ProfileParseResponse = {
        type: event,
        message: "The parsing succeeded",
        profile: {
            profile_key: "id",
            reference: "reference"
        }
    };

    const JSONPayload = JSON.stringify(data);
    const base64Payload = util.encodeBase64(util.decodeUTF8(JSONPayload));

    const signature = sha256.hmac(util.decodeUTF8(key), util.decodeUTF8(base64Payload));
    const base64Signature = util.encodeBase64(signature);

    return `${base64Signature}.${base64Payload}`;
}

const callbackMock = jest.fn();

describe("Webhooks tests",  () => {
    describe("Webhook check", () => {
        test("It should check if the webhook is correctly set up", () => {
            app = new Hrflow({ api_secret, api_user, webhooks_key });
            app.webhooks.check()
                .then((response) => {
                    expect(response).toMatchSnapshot();
                });
        });
    });

    describe("Webhook creation", () => {
        test("It should not create webhooks if no key is given", () => {
            app = new Hrflow({ api_secret, api_user });
            expect(app.webhooks).toBeUndefined();
        });

        test("It should create webhooks if the key is given", () => {
            app = new Hrflow({ api_secret, api_user, webhooks_key });
            expect(app.webhooks).toBeDefined();
        });

        test("It should throw an error if we try to create webhooks without a key", () => {
            expect(() => {
                const webhooks = new Webhooks(null);
            }).toThrowError("The webhook secret key must be specified");
        });
    });

    describe("Webhooks usage", () => {
        describe("Webhooks binding", () => {
            beforeEach(() => {
                app = new Hrflow({ api_secret, api_user, webhooks_key });
            });

            test("It should throw an error if we try to bind an inexistant event", (done) => {
                expect(() => {
                    app.webhooks.on("not.an.event", (data: Webhooks.Response, type: string) => {});
                }).toThrowError("This event doesn't exist");
                done();
            });

            test("It should throw an error if we try to bind two functions to the same event", (done) => {
                expect(() => {
                    app.webhooks
                        .on("profile.parsing.success", (data: Webhooks.Response, type: string) => {})
                        .on("profile.parsing.success", (data: Webhooks.Response, type: string) => {});
                }).toThrowError("This callback already has been declared");
                done();
            });

            test("It should bind the event correctly", (done) => {
                expect(app.webhooks.on("profile.parsing.success", (data: Webhooks.Response, type: string) => {
                    console.log(type);
                    return 42;
                })).toBeInstanceOf(Webhooks);
                expect(app.webhooks.binding.has("profile.parsing.success")).toBeTruthy();
                expect(app.webhooks.binding.get("profile.parsing.success")({} as Webhooks.Response, "test")).toBe(42);
                done();
            });
        });

        describe("Webhooks call", () => {
            beforeAll(() => {
                app = new Hrflow({ api_secret, api_user, webhooks_key });
                app.webhooks.on("profile.parsing.success", callbackMock);
            });

            test("It should throw an error if the header is not given", () => {
                expect(app.webhooks.handle({})).toThrowError("The signature is missing from the headers");
            });

            test("It should throw an error if the signature is invalid", () => {
                const signature = generateSignature("wrong_key", "profile.parsing.success");
                const headers = {
                    "HTTP-RIMINDER-SIGNATURE": signature
                };
                expect(app.webhooks.handle(headers)).toThrowError("The signature is invalid");
            });

            test("It should throw an error if the event is unknown", () => {
                const signature = generateSignature(webhooks_key, "unknwown.event");
                const headers = {
                    "HTTP-RIMINDER-SIGNATURE": signature
                };
                expect(app.webhooks.handle(headers)).toThrowError("Unknown event: unknwown.event");
            });

            test("It should call the callbacj function", () => {
                const signature = generateSignature(webhooks_key, "profile.parsing.error");
                const headers = {
                    "HTTP-RIMINDER-SIGNATURE": signature
                };
                app.webhooks.on("profile.parsing.error", callbackMock);
                app.webhooks.handle(headers)();
                expect(callbackMock).toHaveBeenCalledTimes(1);
            });
        });
    });
});