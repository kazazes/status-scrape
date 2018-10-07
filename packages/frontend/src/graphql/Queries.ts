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
      id
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

export const TARGET = gql`
  query target($target: StatusScrapeTargetWhereUniqueInput!) {
    target(target: $target) {
      id
      name
      twitterHandle
      strategy
      statusUrl
      companyUrl
      # results {
      #   results {
      #     category
      #     component
      #     status
      #   }
      # }
    }
  }
`;
