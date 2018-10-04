import { default as gql } from "graphql-tag";

export const APOLLO_TOKEN = "APOLLO_TOKEN";

export const mutations = {
  LOGIN: gql`
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `,

  SIGNUP: gql`
    mutation SignupMutation(
      $email: String!
      $password: String!
      $name: String!
    ) {
      signup(email: $email, password: $password, name: $name) {
        token
      }
    }
  `
};
