import assert = require("power-assert");
import TasteSpoon = require("../../");
require("./spec_helper");

let server = TasteSpoon.server("http");
describe(server, () => {

    let http = TasteSpoon.http("http://example.com:8000");
    describe(http, () => {
        it("returns 200", () => {
            return http(server).result().then((response) => {
                assert(response.statusCode == 200);
            });
        });
    });
});
