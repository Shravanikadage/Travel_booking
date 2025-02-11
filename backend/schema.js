const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Booking {
    id: ID!
    name: String!
    email: String!
    phone: String!
    from: String!
    to: String!
    date: String!
    adults: Int!
    children: Int!
  }

  type Query {
    getBookings: [Booking]
  }

  type Mutation {
    addBooking(
      name: String!,
      email: String!,
      phone: String!,
      from: String!,
      to: String!,
      date: String!,
      adults: Int!,
      children: Int!
    ): Booking
  }
`;

module.exports = typeDefs;
