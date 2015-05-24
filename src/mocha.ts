/// <reference path="mocha.d.ts" />

import Resource = require("./resource");
import Server = require("./server");
import Context = require("./context");
import MochaContext = require("mocha/lib/context");
import Suite = require("mocha/lib/suite");
import Test = require("mocha/lib/test");

class ResourceSuite extends Suite {
    resource: Resource;
    contextify: (Server) => Context;

    constructor(resource: Resource, parentContext: MochaContext);
    constructor(contextify: (Server) => Context, parentContext: MochaContext);
    constructor(resource: any, parentContext: MochaContext) {
        super(resource.toString(), parentContext);
        if (resource instanceof Resource) {
            this.resource = resource;
        } else {
            this.contextify = resource;
        }
    }

    addTest(test: Test): Suite {
        super.addTest(test);
        var context = this.createContext();
        for (var key in context) {
            if (!test.ctx[key] && context[key] instanceof Function) {
                test.ctx[key] = () => { return context[key](); };
            }
        }
        return this;
    }

    createContext(): Context {
        var server = this.findServer();
        var contextify = this.findContextify();
        return contextify(server);
    }

    findServer(): Server {
        if (this.resource instanceof Server) {
            return <Server> this.resource;
        }

        if (!(this.parent instanceof ResourceSuite)) {
            return null;
        }

        return (<ResourceSuite> this.parent).findServer();
    }

    findContextify(): (Server) => Context {
        if (this.contextify != null) {
            return this.contextify;
        }

        if (!(this.parent instanceof ResourceSuite)) {
            return null;
        }

        return (<ResourceSuite> this.parent).findContextify();
    }
}

function createSuite(parent: Suite, server: Server): ResourceSuite;
function createSuite(parent: Suite, contextify: (Server) => Context): ResourceSuite;
function createSuite(parent: Suite, server: any): ResourceSuite {
    var suite = new ResourceSuite(server, parent.ctx);
    suite.parent = parent;
    if (parent.pending) suite.pending = true;
    parent.addSuite(suite);
    return suite;
}

function registerInterface(suite: Suite): void {
    var suites: Array<Suite> = [suite];

    suite.on("pre-require", function(context, file: string, mocha) {
        function describe(server: Server, fn: (suite: Suite) => void);
        function describe(contextify: (Server) => Context, fn: (suite: Suite) => void);
        function describe(server: any, fn: (suite: Suite) => void) {
            var suite = createSuite(suites[0], server);
            suite.file = file;
            suites.unshift(suite);
            fn.call(suite);
            suites.shift();
            return suite;
        };

        context.describe = describe;

        context.server = function(name) {
            return Server.findServerByName(name);
        };

        context.it = function(title: string, fn): Test {
            var suite = suites[0];
            if (suite.pending) fn = null;
            var test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };
    });
}

export = registerInterface;
