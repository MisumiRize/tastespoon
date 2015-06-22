TasteSpoon
==========

[![Circle CI](https://circleci.com/gh/MisumiRize/tastespoon.svg?style=svg)](https://circleci.com/gh/MisumiRize/tastespoon)
[![Dependency Status](https://david-dm.org/MisumiRize/tastespoon.svg)](https://david-dm.org/MisumiRize/tastespoon)
[![devDependency Status](https://david-dm.org/MisumiRize/tastespoon/dev-status.svg)](https://david-dm.org/MisumiRize/tastespoon#info=devDependencies)

Micro infrastracture behavior testing framework inspired by [Infrataster](http://infrataster.net/).

## Concept

* NPM/CommonJS based plugin system
* Pluggable with any JavaScript testing framework
* Mocha integration is ready

## Usage

```bash
$ npm install tastespoon --save-dev
```

## Running with Docker and Mocha

```bash
$ npm install mocha tastespoon --save-dev
$ docker run -t -i -d -p 8000:80 nginx
```

```javascript
import TasteSpoon from "tastespoon"
import assert from "assert"

TasteSpoon.define("http", "127.0.0.1")

let server = TasteSpoon.server("http")
describe(server, () => {

    let http = TasteSpoon.http("http://example.com:8000")
    describe(http, () => {
        it("returns 200", () => {
            return http(server).result().then((response) => {
                assert(response.statusCode == 200)
            })
        })
    })
})
```

```bash
$ mocha test/http_test.js
```

## Mocha Integration

```javascript
import TasteSpoon from "tastespoon"
import assert from "assert"
let http = TasteSpoon.http

TasteSpoon.define("http", "127.0.0.1")

describe(server("http"), () => {
    describe(http("http://example.com:8000"), () => {
        it("returns 200", () => {
            return this.result().then((response) => {
                assert(response.statusCode == 200)
            })
        })
    })
})
```

```bash
$ mocha -u tastespoon/mocha test/http_test.js
```
