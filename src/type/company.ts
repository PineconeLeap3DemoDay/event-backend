export const companyTypeDefs = `#graphql
    scalar Date
    type Category {
        id: ID!
        name: String
    }
    type Event {
        id: ID!
        title: String!
        about: String!
        thumbnail: String!
        rating: Int!
        ticketcount: Int!
        category: Category!
        price: Int!
        expirationdate: Int!
        location: String!
        startDate: Date
    }
    type Company {
        registrationnumber: String!
        rating: Int!
        id: ID!
        name: String!
        events: [Event]
        followers: [User]
    }
    input addCompanyInput {
        registrationnumber: String!
        password: String!
        name: String!
    }
    input loginCompanyInput {
        registrationnumber: String!
        password: String!
    }
    type addCompanyResponse {
        company: Company!
        token: String!
    }
    type Mutation {
        addCompany(company: addCompanyInput): addCompanyResponse
        loginCompany(company: loginCompanyInput): addCompanyResponse
    }
    type Query {
        companies: [Company!]!
        company(id: ID!): Company!
    }
    `;
