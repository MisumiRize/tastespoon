import Server = require("./server");
import Resource = require("./resource");

class Context {

    constructor(public server: Server, public resource: Resource) {
    }
}

export = Context;
