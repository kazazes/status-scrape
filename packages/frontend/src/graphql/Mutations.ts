import gql from "graphql-tag";

export const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export const UPSERT_TARGET = gql`
  mutation UpsertTarget(
    $name: String!
    $twitterHandle: String!
    $strategy: ScrapeStrategy!
    $companyUrl: String!
    $statusUrl: String!
  ) {
    upsertScrapeTarget(
      data: {
        name: $name
        companyUrl: $companyUrl
        twitterHandle: $twitterHandle
        strategy: $strategy
        statusUrl: $statusUrl
      }
    ) {
      id
    }
  }
`;
