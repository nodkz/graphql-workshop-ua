import gql from 'graphql-tag';

const a = 1;
const b = 'c';

a / b; // should be an error

gql`
  query Test {
    viewer {
      order {
        customerID
        wrongField # should be an error
      }
    }
  }
`;
