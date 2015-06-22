declare module "tastespoon" {
    export import Resource = require("tastespoon/resource");
    export import Context = require("tastespoon/context");
    import Server = require("tastespoon/server");
    import Http = require("./http");
    export declare var define: typeof Server.define;
    export declare var server: typeof Server.findServerByName;
    export declare var http: (string: any, HttpOption: any) => (Server: any) => Http.HttpContext;
}

declare module "tastespoon/resource" {
    class Resource {
        toString(): string;
    }
    export = Resource;
}

declare module "tastespoon/context" {
    import Server = require("tastespoon/server");
    import Resource = require("tastespoon/resource");
    class Context {
        server: Server;
        resource: Resource;
        constructor(server: Server, resource: Resource);
    }
    export = Context;
}

declare module "tastespoon/server" {
    import Resource = require("tastespoon/resource");
    declare class Server extends Resource {
        static define(name: string, address: string): void;
        static findServerByName(name: string): Server;
        name: string;
        address: string;
        constructor(name: string, address: string);
        toString(): string;
    }
    export = Server;
}
