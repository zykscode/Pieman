export const typeDefs = `
type Query {
    users(archived: Boolean): [User!]!
    user(id: ID!): User
    ratings(userId: ID): [Rating!]!
    transactions(userId: ID, status: TransactionStatus): [Transaction!]!
  }
  
  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User
    deleteUser(id: ID!): User
    createTransaction(data: CreateTransactionInput!): Transaction!
    updateTransaction(id: ID!, data: UpdateTransactionInput!): Transaction
    createRating(data: CreateRatingInput!): Rating!
    updateRating(id: ID!, data: UpdateRatingInput!): Rating
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    ratings: [Rating!]!
    transactions: [Transaction!]!
    soldTransactions: [Transaction!]!
    role: UserRole!
    accounts: [Account!]!
    archived: Boolean!
  }
  
  type Rating {
    id: ID!
    user: User!
    userId: ID!
    rating: Float!
    comment: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type Transaction {
    id: ID!
    buyer: User!
    buyerId: ID!
    seller: User!
    sellerId: ID!
    piAmount: Float!
    nairaAmount: Float!
    rate: Float!
    description: String
    status: TransactionStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type Account {
    id: ID!
    userId: ID!
    type: String!
    provider: String!
    providerAccountId: String!
    refresh_token: String
    access_token: String
    expires_at: Int
    token_type: String
    scope: String
    id_token: String
    session_state: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }
  
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    role: UserRole!
  }
  
  input UpdateUserInput {
    name: String
    email: String
    password: String
    role: UserRole
    archived: Boolean
  }
  
  input CreateTransactionInput {
    buyerId: ID!
    sellerId: ID!
    piAmount: Float!
    nairaAmount: Float!
    rate: Float!
    description: String
  }
  
  input UpdateTransactionInput {
    buyerId: ID
    sellerId: ID
    piAmount: Float
    nairaAmount: Float
    rate: Float
    description: String
    status: TransactionStatus
  }
  
  input CreateRatingInput {
    userId: ID!
    rating: Float!
    comment: String!
  }
  
  input UpdateRatingInput {
    rating: Float
    comment: String
  }
  
  enum UserRole {
    USER
    ADMIN
  }
  
  enum TransactionStatus {
    PENDING
    CONFIRMED
    REFUNDED
  }
  
  scalar DateTime
`