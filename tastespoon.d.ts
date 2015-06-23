declare module "tastespoon" {
    export import Resource = require("tastespoon/lib/resource");
    export import Context = require("tastespoon/lib/context");
    import Server = require("tastespoon/lib/server");
    export var define: typeof Server.define;
    export var server: typeof Server.findServerByName;
}

declare module "tastespoon/lib/resource" {
    class Resource {
        toString(): string;
    }
    export = Resource;
}

declare module "tastespoon/lib/context" {
    import Server = require("tastespoon/lib/server");
    import Resource = require("tastespoon/lib/resource");
    class Context {
        server: Server;
        resource: Resource;
        constructor(server: Server, resource: Resource);
    }
    export = Context;
}

declare module "tastespoon/lib/server" {
    import Resource = require("tastespoon/lib/resource");
    class Server extends Resource {
        static define(name: string, address: string): void;
        static findServerByName(name: string): Server;
        name: string;
        address: string;
        constructor(name: string, address: string);
        toString(): string;
    }
    export = Server;
}
