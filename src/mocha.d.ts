declare module "mocha/lib/context" {
    class Context {
    }

    export = Context;
}

declare module "mocha/lib/suite" {
    import Test = require("mocha/lib/test");
    import Context = require("mocha/lib/context");
    import Events = require("events");

    class Suite extends Events.EventEmitter {
        file: string;
        pending: boolean;
        parent: Suite;
        ctx: Context;

        constructor(title: string, parentContext: Context);
        addSuite(suite: Suite): Suite;
        addTest(test: Test): Suite;
    }

    export = Suite;
}

declare module "mocha/lib/test" {
    import Context = require("mocha/lib/context");

    class Test {
        file: string;
        ctx: Context;

        constructor(title: string, fn: (done?: Function) => any);
    }

    export = Test;
}
