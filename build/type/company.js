"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyTypeDefs = void 0;
exports.companyTypeDefs = "#graphql\n    type Company {\n        registrationnumber: String!\n        rating: Int!\n        password: String!\n        id: ID!\n    }\n    input addCompanyInput {\n        registrationnumber: String!\n        password: String!\n    }\n    type Mutation {\n        addCompany(company: addCompanyInput): Company\n    }\n    type Query {\n        companies: [Company!]!\n    }\n    \n";
