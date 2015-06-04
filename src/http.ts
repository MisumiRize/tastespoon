/// <reference path="../typings/tsd.d.ts" />

import Resource = require("./resource");
import Context = require("./context");
import Server = require("./server");
import Request = require("request");
import NodeUrl = require("url");
import ES6 = require("es6-promise");

export enum HttpMethod {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
    HEAD,
}

export interface HttpOption {
    method: HttpMethod;
}

export class HttpResource extends Resource {

    url: NodeUrl.Url;

    constructor(url: string, public options: HttpOption = {method: HttpMethod.GET}) {
        super();
        this.url = NodeUrl.parse(url);
    }

    toString(): string {
        return `http '${this.url.href}'`
    }
}

export class HttpContext extends Context {

    result() {
        var url = (<HttpResource> this.resource).url;
        var loc = `${url.protocol}//${this.server.address}:${url.port || 80}`;
        var options = (<HttpResource> this.resource).options;

        return new ES6.Promise((resolve, reject) => {
            Request(
                {
                    url: loc,
                    method: HttpMethod[options.method],
                    headers: {
                        Host: url.hostname
                    }
                }, function(err, res, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

export var http: (string, HttpOption) => ((Server) => HttpContext) = (url, options) => {
    var resource = new HttpResource(url, options);
    var httpContext = (server: Server) => {
        return new HttpContext(server, resource);
    };
    httpContext["toString"] = () => {
        return resource.toString();
    };
    return httpContext;
};
