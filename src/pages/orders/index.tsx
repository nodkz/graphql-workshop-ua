/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'qs';

import OrderListQuery from './OrderListQuery';

interface Props extends RouteComponentProps {}

export default class Orders extends React.Component<Props> {
  onSetPage = (page: number) => {
    const { search } = this.props.location;
    const query = qs.parse(search, { ignoreQueryPrefix: true }) || {};

    this.props.history.push({
      search: qs.stringify({ ...query, page }),
    });
  };

  render() {
    const { search } = this.props.location;
    const query = qs.parse(search, { ignoreQueryPrefix: true }) || {};

    const page = parseInt(query.page, 10) || 1;
    const perPage = parseInt(query.perPage, 10) || 10;

    return <OrderListQuery onSetPage={this.onSetPage} page={page} perPage={perPage} />;
  }
}
