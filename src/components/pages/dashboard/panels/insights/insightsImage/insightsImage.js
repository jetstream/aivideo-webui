// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';

import {
  PanelMsg
} from 'components/pages/dashboard/panel';


export class InsightsImage extends Component {

  render() {
    const { t, image } = this.props;
    if (!image) {
      return (
        <PanelMsg>{t('dashboard.noData')}</PanelMsg>
      );
    }

    return (
      <img src={image.url} alt={image.url}></img>
    );

  }
}
