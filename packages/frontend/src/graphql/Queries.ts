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
    }
  }
`;

export const TARGET_JOBS = gql`
  query statusScrapeJobs(
    $where: StatusScrapeJobWhereInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    statusScrapeJobs(
      where: $where
      orderBy: updatedAt_DESC
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      id
      createdAt
      updatedAt
      status
    }
  }
`;
