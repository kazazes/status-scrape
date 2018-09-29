export const typeDefs = /* GraphQL */ `type AggregateStatusScrapeTarget {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createStatusScrapeTarget(data: StatusScrapeTargetCreateInput!): StatusScrapeTarget!
  updateStatusScrapeTarget(data: StatusScrapeTargetUpdateInput!, where: StatusScrapeTargetWhereUniqueInput!): StatusScrapeTarget
  updateManyStatusScrapeTargets(data: StatusScrapeTargetUpdateInput!, where: StatusScrapeTargetWhereInput): BatchPayload!
  upsertStatusScrapeTarget(where: StatusScrapeTargetWhereUniqueInput!, create: StatusScrapeTargetCreateInput!, update: StatusScrapeTargetUpdateInput!): StatusScrapeTarget!
  deleteStatusScrapeTarget(where: StatusScrapeTargetWhereUniqueInput!): StatusScrapeTarget
  deleteManyStatusScrapeTargets(where: StatusScrapeTargetWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  statusScrapeTarget(where: StatusScrapeTargetWhereUniqueInput!): StatusScrapeTarget
  statusScrapeTargets(where: StatusScrapeTargetWhereInput, orderBy: StatusScrapeTargetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StatusScrapeTarget]!
  statusScrapeTargetsConnection(where: StatusScrapeTargetWhereInput, orderBy: StatusScrapeTargetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StatusScrapeTargetConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum ScrapeStrategy {
  STATUSPAGE_IO
}

type StatusScrapeTarget {
  id: ID!
  name: String!
  twitterHandle: String
  strategy: ScrapeStrategy!
  statusUrl: String!
}

type StatusScrapeTargetConnection {
  pageInfo: PageInfo!
  edges: [StatusScrapeTargetEdge]!
  aggregate: AggregateStatusScrapeTarget!
}

input StatusScrapeTargetCreateInput {
  name: String!
  twitterHandle: String
  strategy: ScrapeStrategy
  statusUrl: String!
}

type StatusScrapeTargetEdge {
  node: StatusScrapeTarget!
  cursor: String!
}

enum StatusScrapeTargetOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  twitterHandle_ASC
  twitterHandle_DESC
  strategy_ASC
  strategy_DESC
  statusUrl_ASC
  statusUrl_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type StatusScrapeTargetPreviousValues {
  id: ID!
  name: String!
  twitterHandle: String
  strategy: ScrapeStrategy!
  statusUrl: String!
}

type StatusScrapeTargetSubscriptionPayload {
  mutation: MutationType!
  node: StatusScrapeTarget
  updatedFields: [String!]
  previousValues: StatusScrapeTargetPreviousValues
}

input StatusScrapeTargetSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StatusScrapeTargetWhereInput
  AND: [StatusScrapeTargetSubscriptionWhereInput!]
  OR: [StatusScrapeTargetSubscriptionWhereInput!]
  NOT: [StatusScrapeTargetSubscriptionWhereInput!]
}

input StatusScrapeTargetUpdateInput {
  name: String
  twitterHandle: String
  strategy: ScrapeStrategy
  statusUrl: String
}

input StatusScrapeTargetWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  twitterHandle: String
  twitterHandle_not: String
  twitterHandle_in: [String!]
  twitterHandle_not_in: [String!]
  twitterHandle_lt: String
  twitterHandle_lte: String
  twitterHandle_gt: String
  twitterHandle_gte: String
  twitterHandle_contains: String
  twitterHandle_not_contains: String
  twitterHandle_starts_with: String
  twitterHandle_not_starts_with: String
  twitterHandle_ends_with: String
  twitterHandle_not_ends_with: String
  strategy: ScrapeStrategy
  strategy_not: ScrapeStrategy
  strategy_in: [ScrapeStrategy!]
  strategy_not_in: [ScrapeStrategy!]
  statusUrl: String
  statusUrl_not: String
  statusUrl_in: [String!]
  statusUrl_not_in: [String!]
  statusUrl_lt: String
  statusUrl_lte: String
  statusUrl_gt: String
  statusUrl_gte: String
  statusUrl_contains: String
  statusUrl_not_contains: String
  statusUrl_starts_with: String
  statusUrl_not_starts_with: String
  statusUrl_ends_with: String
  statusUrl_not_ends_with: String
  AND: [StatusScrapeTargetWhereInput!]
  OR: [StatusScrapeTargetWhereInput!]
  NOT: [StatusScrapeTargetWhereInput!]
}

input StatusScrapeTargetWhereUniqueInput {
  id: ID
  name: String
  twitterHandle: String
  statusUrl: String
}

type Subscription {
  statusScrapeTarget(where: StatusScrapeTargetSubscriptionWhereInput): StatusScrapeTargetSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`