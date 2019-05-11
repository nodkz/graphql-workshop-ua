import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const httpLink = new HttpLink({
  uri: 'https://graphql-compose.herokuapp.com/northwind/',
  // uri: 'http://localhost:4444/northwind/',
  fetch,
  credentials: 'same-origin',
  headers: {},
});

const cache = new InMemoryCache();
const link = ApolloLink.from([httpLink]);

export const apolloClient = new ApolloClient({ cache, link });

const query = gql`
  query OrderListQuery($page: Int!, $perPage: Int!) {
    viewer {
      orderPagination(page: $page, perPage: $perPage) {
        ...OrderList_orderPagination
      }
    }
  }

  fragment OrderList_orderPagination on OrderPagination {
    count
    items {
      ...OrderRow_order
    }
    pageInfo {
      pageCount
      currentPage
    }
  }

  fragment OrderRow_order on Order {
    orderID
    orderDate
    customerID
    employeeID
    employee {
      firstName
      lastName
      birthDate
    }
    customer {
      companyName
      orderList(limit: $perPage) {
        orderID
      }
    }
    freight
  }
`;

console.log(query);

// const res = apolloClient.query();
