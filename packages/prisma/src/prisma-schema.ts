export const typeDefs = /* GraphQL */ `type AggregateStatusScrape {
  count: Int!
}

type AggregateStatusScrapeResult {
  count: Int!
}

type AggregateStatusScrapeTarget {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createStatusScrape(data: StatusScrapeCreateInput!): StatusScrape!
  updateStatusScrape(data: StatusScrapeUpdateInput!, where: StatusScrapeWhereUniqueInput!): StatusScrape
  updateManyStatusScrapes(data: StatusScrapeUpdateInput!, where: StatusScrapeWhereInput): BatchPayload!
  upsertStatusScrape(where: StatusScrapeWhereUniqueInput!, create: StatusScrapeCreateInput!, update: StatusScrapeUpdateInput!): StatusScrape!
  deleteStatusScrape(where: StatusScrapeWhereUniqueInput!): StatusScrape
  deleteManyStatusScrapes(where: StatusScrapeWhereInput): BatchPayload!
  createStatusScrapeResult(data: StatusScrapeResultCreateInput!): StatusScrapeResult!
  updateManyStatusScrapeResults(data: StatusScrapeResultUpdateInput!, where: StatusScrapeResultWhereInput): BatchPayload!
  deleteManyStatusScrapeResults(where: StatusScrapeResultWhereInput): BatchPayload!
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
  statusScrape(where: StatusScrapeWhereUniqueInput!): StatusScrape
  statusScrapes(where: StatusScrapeWhereInput, orderBy: StatusScrapeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StatusScrape]!
  statusScrapesConnection(where: StatusScrapeWhereInput, orderBy: StatusScrapeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StatusScrapeConnection!
  statusScrapeResults(where: StatusScrapeResultWhereInput, orderBy: StatusScrapeResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StatusScrapeResult]!
  statusScrapeResultsConnection(where: StatusScrapeResultWhereInput, orderBy: StatusScrapeResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StatusScrapeResultConnection!
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

type StatusScrape {
  id: ID!
  createdAt: DateTime!
  failed: Boolean!
  dom: String
  target: StatusScrapeTarget!
  results(where: StatusScrapeResultWhereInput, orderBy: StatusScrapeResultOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StatusScrapeResult!]
}

type StatusScrapeConnection {
  pageInfo: PageInfo!
  edges: [StatusScrapeEdge]!
  aggregate: AggregateStatusScrape!
}

input StatusScrapeCreateInput {
  failed: Boolean
  dom: String
  target: StatusScrapeTargetCreateOneWithoutResultsInput!
  results: StatusScrapeResultCreateManyWithoutScrapeInput
}

input StatusScrapeCreateManyWithoutTargetInput {
  create: [StatusScrapeCreateWithoutTargetInput!]
  connect: [StatusScrapeWhereUniqueInput!]
}

input StatusScrapeCreateOneWithoutResultsInput {
  create: StatusScrapeCreateWithoutResultsInput
  connect: StatusScrapeWhereUniqueInput
}

input StatusScrapeCreateWithoutResultsInput {
  failed: Boolean
  dom: String
  target: StatusScrapeTargetCreateOneWithoutResultsInput!
}

input StatusScrapeCreateWithoutTargetInput {
  failed: Boolean
  dom: String
  results: StatusScrapeResultCreateManyWithoutScrapeInput
}

type StatusScrapeEdge {
  node: StatusScrape!
  cursor: String!
}

enum StatusScrapeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  failed_ASC
  failed_DESC
  dom_ASC
  dom_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type StatusScrapePreviousValues {
  id: ID!
  createdAt: DateTime!
  failed: Boolean!
  dom: String
}

type StatusScrapeResult {
  scrape: StatusScrape!
  category: String!
  component: String!
  status: SystemStatus!
}

type StatusScrapeResultConnection {
  pageInfo: PageInfo!
  edges: [StatusScrapeResultEdge]!
  aggregate: AggregateStatusScrapeResult!
}

input StatusScrapeResultCreateInput {
  scrape: StatusScrapeCreateOneWithoutResultsInput!
  category: String!
  component: String!
  status: SystemStatus!
}

input StatusScrapeResultCreateManyWithoutScrapeInput {
  create: [StatusScrapeResultCreateWithoutScrapeInput!]
}

input StatusScrapeResultCreateWithoutScrapeInput {
  category: String!
  component: String!
  status: SystemStatus!
}

type StatusScrapeResultEdge {
  node: StatusScrapeResult!
  cursor: String!
}

enum StatusScrapeResultOrderByInput {
  category_ASC
  category_DESC
  component_ASC
  component_DESC
  status_ASC
  status_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type StatusScrapeResultPreviousValues {
  category: String!
  component: String!
  status: SystemStatus!
}

type StatusScrapeResultSubscriptionPayload {
  mutation: MutationType!
  node: StatusScrapeResult
  updatedFields: [String!]
  previousValues: StatusScrapeResultPreviousValues
}

input StatusScrapeResultSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StatusScrapeResultWhereInput
  AND: [StatusScrapeResultSubscriptionWhereInput!]
  OR: [StatusScrapeResultSubscriptionWhereInput!]
  NOT: [StatusScrapeResultSubscriptionWhereInput!]
}

input StatusScrapeResultUpdateInput {
  scrape: StatusScrapeUpdateOneRequiredWithoutResultsInput
  category: String
  component: String
  status: SystemStatus
}

input StatusScrapeResultUpdateManyWithoutScrapeInput {
  create: [StatusScrapeResultCreateWithoutScrapeInput!]
}

input StatusScrapeResultWhereInput {
  scrape: StatusScrapeWhereInput
  category: String
  category_not: String
  category_in: [String!]
  category_not_in: [String!]
  category_lt: String
  category_lte: String
  category_gt: String
  category_gte: String
  category_contains: String
  category_not_contains: String
  category_starts_with: String
  category_not_starts_with: String
  category_ends_with: String
  category_not_ends_with: String
  component: String
  component_not: String
  component_in: [String!]
  component_not_in: [String!]
  component_lt: String
  component_lte: String
  component_gt: String
  component_gte: String
  component_contains: String
  component_not_contains: String
  component_starts_with: String
  component_not_starts_with: String
  component_ends_with: String
  component_not_ends_with: String
  status: SystemStatus
  status_not: SystemStatus
  status_in: [SystemStatus!]
  status_not_in: [SystemStatus!]
  AND: [StatusScrapeResultWhereInput!]
  OR: [StatusScrapeResultWhereInput!]
  NOT: [StatusScrapeResultWhereInput!]
}

type StatusScrapeSubscriptionPayload {
  mutation: MutationType!
  node: StatusScrape
  updatedFields: [String!]
  previousValues: StatusScrapePreviousValues
}

input StatusScrapeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StatusScrapeWhereInput
  AND: [StatusScrapeSubscriptionWhereInput!]
  OR: [StatusScrapeSubscriptionWhereInput!]
  NOT: [StatusScrapeSubscriptionWhereInput!]
}

type StatusScrapeTarget {
  id: ID!
  name: String!
  twitterHandle: String
  strategy: ScrapeStrategy!
  statusUrl: String!
  results(where: StatusScrapeWhereInput, orderBy: StatusScrapeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StatusScrape!]
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
  results: StatusScrapeCreateManyWithoutTargetInput
}

input StatusScrapeTargetCreateOneWithoutResultsInput {
  create: StatusScrapeTargetCreateWithoutResultsInput
  connect: StatusScrapeTargetWhereUniqueInput
}

input StatusScrapeTargetCreateWithoutResultsInput {
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
  results: StatusScrapeUpdateManyWithoutTargetInput
}

input StatusScrapeTargetUpdateOneRequiredWithoutResultsInput {
  create: StatusScrapeTargetCreateWithoutResultsInput
  update: StatusScrapeTargetUpdateWithoutResultsDataInput
  upsert: StatusScrapeTargetUpsertWithoutResultsInput
  connect: StatusScrapeTargetWhereUniqueInput
}

input StatusScrapeTargetUpdateWithoutResultsDataInput {
  name: String
  twitterHandle: String
  strategy: ScrapeStrategy
  statusUrl: String
}

input StatusScrapeTargetUpsertWithoutResultsInput {
  update: StatusScrapeTargetUpdateWithoutResultsDataInput!
  create: StatusScrapeTargetCreateWithoutResultsInput!
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
  results_every: StatusScrapeWhereInput
  results_some: StatusScrapeWhereInput
  results_none: StatusScrapeWhereInput
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

input StatusScrapeUpdateInput {
  failed: Boolean
  dom: String
  target: StatusScrapeTargetUpdateOneRequiredWithoutResultsInput
  results: StatusScrapeResultUpdateManyWithoutScrapeInput
}

input StatusScrapeUpdateManyWithoutTargetInput {
  create: [StatusScrapeCreateWithoutTargetInput!]
  delete: [StatusScrapeWhereUniqueInput!]
  connect: [StatusScrapeWhereUniqueInput!]
  disconnect: [StatusScrapeWhereUniqueInput!]
  update: [StatusScrapeUpdateWithWhereUniqueWithoutTargetInput!]
  upsert: [StatusScrapeUpsertWithWhereUniqueWithoutTargetInput!]
}

input StatusScrapeUpdateOneRequiredWithoutResultsInput {
  create: StatusScrapeCreateWithoutResultsInput
  update: StatusScrapeUpdateWithoutResultsDataInput
  upsert: StatusScrapeUpsertWithoutResultsInput
  connect: StatusScrapeWhereUniqueInput
}

input StatusScrapeUpdateWithoutResultsDataInput {
  failed: Boolean
  dom: String
  target: StatusScrapeTargetUpdateOneRequiredWithoutResultsInput
}

input StatusScrapeUpdateWithoutTargetDataInput {
  failed: Boolean
  dom: String
  results: StatusScrapeResultUpdateManyWithoutScrapeInput
}

input StatusScrapeUpdateWithWhereUniqueWithoutTargetInput {
  where: StatusScrapeWhereUniqueInput!
  data: StatusScrapeUpdateWithoutTargetDataInput!
}

input StatusScrapeUpsertWithoutResultsInput {
  update: StatusScrapeUpdateWithoutResultsDataInput!
  create: StatusScrapeCreateWithoutResultsInput!
}

input StatusScrapeUpsertWithWhereUniqueWithoutTargetInput {
  where: StatusScrapeWhereUniqueInput!
  update: StatusScrapeUpdateWithoutTargetDataInput!
  create: StatusScrapeCreateWithoutTargetInput!
}

input StatusScrapeWhereInput {
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
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  failed: Boolean
  failed_not: Boolean
  dom: String
  dom_not: String
  dom_in: [String!]
  dom_not_in: [String!]
  dom_lt: String
  dom_lte: String
  dom_gt: String
  dom_gte: String
  dom_contains: String
  dom_not_contains: String
  dom_starts_with: String
  dom_not_starts_with: String
  dom_ends_with: String
  dom_not_ends_with: String
  target: StatusScrapeTargetWhereInput
  results_every: StatusScrapeResultWhereInput
  results_some: StatusScrapeResultWhereInput
  results_none: StatusScrapeResultWhereInput
  AND: [StatusScrapeWhereInput!]
  OR: [StatusScrapeWhereInput!]
  NOT: [StatusScrapeWhereInput!]
}

input StatusScrapeWhereUniqueInput {
  id: ID
}

type Subscription {
  statusScrape(where: StatusScrapeSubscriptionWhereInput): StatusScrapeSubscriptionPayload
  statusScrapeResult(where: StatusScrapeResultSubscriptionWhereInput): StatusScrapeResultSubscriptionPayload
  statusScrapeTarget(where: StatusScrapeTargetSubscriptionWhereInput): StatusScrapeTargetSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

enum SystemStatus {
  OPERATIONAL
  UNKNOWN
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