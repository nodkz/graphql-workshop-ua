/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Query } from 'react-apollo';
import OrderList from './OrderList';
import { OrdersTestQuery, OrdersTestQueryVariables } from './__generated__/OrdersTestQuery';
import gql from 'graphql-tag';

interface Props extends OrdersTestQueryVariables {
  onSetPage: (page: number) => any;
}

class TypedQuery extends Query<OrdersTestQuery> {}

export default class OrderListQuery extends React.Component<Props> {
  render() {
    const { page, perPage } = this.props;

    return (
      <TypedQuery
        variables={{ page, perPage }}
        fetchPolicy="network-only"
        query={gql`
          query OrdersTestQuery($page: Int!, $perPage: Int) {
            viewer {
              category {
                description
                name
              }
              orderPagination(perPage: $perPage, page: $page, sort: ORDERID_ASC) {
                count
                ...OrderList_orderPagination
              }
              regionList {
                name
              }
            }
          }

          ${OrderList.fragments.orderPagination}
        `}
      >
        {({ error, loading, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;
          if (data) {
            return (
              <div>
                <h1>
                  Orders:{' '}
                  {!!data &&
                    !!data.viewer &&
                    !!data.viewer.orderPagination &&
                    data.viewer.orderPagination.count}
                </h1>
                {!!data && !!data.viewer && !!data.viewer.orderPagination && (
                  <OrderList
                    orderPagination={data.viewer.orderPagination}
                    onSetPage={this.props.onSetPage}
                  />
                )}
              </div>
            );
          }
        }}
      </TypedQuery>
    );
  }
}
