/// <reference path="../typings/tsd.d.ts" />

import Resource = require("./resource");

var servers: { [key: string]: Server } = {};

class Server extends Resource {

    static define(name: string, address: string): void {
        servers[name] = new Server(name, address);
    }
    
    static findServerByName(name: string): Server {
        var server = servers[name];
        if (!server) {
            throw "server not found";
        }
        return server;
    }

    address: string;

    constructor(public name: string, address: string) {
        super();
        this.address = address;
    }

    toString(): string {
        return `server '${this.name}'`;
    }
}

export = Server;
