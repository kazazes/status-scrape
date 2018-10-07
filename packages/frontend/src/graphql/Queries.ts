import gql from "graphql-tag";

export const ME = gql`
  query Me {
    me {
      name
      email
    }
  }
`;

export const TARGETS = gql`
  query listTargets {
    listTargets {
      name
      twitterHandle
      strategy
      statusUrl
      companyUrl
      results {
        updatedAt
        status
      }
    }
  }
`;
