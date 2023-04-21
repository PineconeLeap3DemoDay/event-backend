"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
exports.categorySchema = "#graphql\n    type Category {\n        name: String!\n        _id: ID!\n    }\n    type Query {\n        categories: [Category]\n    }\n    type Mutation {\n        addCategory(name: String!): Category\n    }\n";
