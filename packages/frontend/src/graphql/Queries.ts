import gql from "graphql-tag";

export const ME = gql`
  query Me {
    me {
      name
      email
    }
  }
`;
