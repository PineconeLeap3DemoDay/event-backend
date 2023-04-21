"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryTypeDefs = void 0;
var graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.categoryTypeDefs = (0, graphql_tag_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Category {\n        name: String!\n        _id: ID!\n    }\n    type Query {\n        categories: [Category]\n    }\n    type Mutation {\n        addCategory(name: String!): Category\n    }\n"], ["\n    type Category {\n        name: String!\n        _id: ID!\n    }\n    type Query {\n        categories: [Category]\n    }\n    type Mutation {\n        addCategory(name: String!): Category\n    }\n"])));
var templateObject_1;
