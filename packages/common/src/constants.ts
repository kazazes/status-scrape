import { default as gql } from "graphql-tag";

const constants = {
  SIGNUP: gql`
    mutation($name: name, $email: email, $password: password) {
      signup(name: $name, email: $email, password: $password) {
        token
        user {
          id
          email
          name
        }
      }
    }
  `,
  LOGIN: gql`
    mutation($email: email, $password: password) {
      login(email: $email, password: $password) {
        token
        user {
          id
        }
      }
    }
  `
};

export default constants;
