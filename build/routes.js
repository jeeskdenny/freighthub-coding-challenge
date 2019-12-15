"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var url_1 = __importDefault(require("url"));
var controller_1 = __importDefault(require("./controller"));
var routesModule = http_1.default.createServer(function (req, res) {
    var shipemntObject = new controller_1.default();
    if (req && req.url) {
        var reqUrl = url_1.default.parse(req.url, true);
        // POST Endpoint
        if (reqUrl.pathname == '/multiple' && req.method === 'POST') {
            shipemntObject.multipleRequestApi(req, res);
        }
        else {
            shipemntObject.invalidUrl(req, res);
        }
    }
});
exports.default = routesModule;
