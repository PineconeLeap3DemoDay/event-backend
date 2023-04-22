export const companyTypeDefs = `#graphql
    type Company {
        registrationnumber: String!
        rating: Int!
        password: String!
        id: ID!
    }
    input companyInput {
        registrationnumber: String!
        password: String!
    }
    type signupCompanyResponse {
        company: Company!
        token: String!
    }
    type Mutation {
        signupCompany(company: companyInput): signupCompanyResponse
        signinCompany(company: companyInput): signupCompanyResponse
    }
    type Query {
        companies: [Company!]!
    }`;
