import React from 'react';
import gql from 'graphql-tag';
import { Pagination } from 'react-bootstrap';
import OrderRow from './OrderRow';
import { OrderList_orderPagination } from './__generated__/OrderList_orderPagination';

interface Props {
  orderPagination: OrderList_orderPagination;
  onSetPage: (page: number) => any;
}

class OrderList extends React.Component<Props> {
  static fragments = {
    orderPagination: gql`
      fragment OrderList_orderPagination on OrderPagination {
        items {
          ...OrderRow_order
        }
        pageInfo {
          pageCount
          currentPage
        }
      }

      ${OrderRow.fragments.order}
    `,
  };

  setPage = (page: number) => {
    const { onSetPage } = this.props;
    if (onSetPage) onSetPage(page);
  };

  render() {
    const { orderPagination } = this.props;
    const { pageCount, currentPage } = orderPagination.pageInfo;

    return (
      <div>
        {!!orderPagination.items &&
          orderPagination.items.map((order, i) => {
            if (!order) return <div>Empty element</div>;
            return <OrderRow key={i} order={order} />;
          })}

        <Pagination>
          {[...Array(pageCount)].map((_, i) => {
            return (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => {
                  this.setPage(i + 1);
                }}
              >
                {i + 1}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </div>
    );
  }
}

export default OrderList;
