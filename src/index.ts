export import Resource = require("./resource");
export import Context = require("./context");
import Server = require("./server");
import Http = require("./http");

export var define = Server.define;
export var server = Server.findServerByName;
export var http = Http.http;
