// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';
import defaultVideoImage from 'assets/images/placeholderVid.png';

import { AjaxError } from 'components/shared';
import {
  Panel,
  PanelContent,
  PanelError,
  PanelHeader,
  PanelHeaderLabel
} from 'components/pages/dashboard/panel';
import { toDiagnosticsModel } from 'services/models';

export class InsightsPanel extends Component {


  logExploreClick = () => {
    this.props.logEvent(toDiagnosticsModel('InsightsPanel_ExploreClick', {}));
  }

  render() {
    const { t, error } = this.props;

    return (
      <Panel className="insights-panel-container">
        <PanelHeader>
          <PanelHeaderLabel>{t('dashboard.panels.insights.header')}</PanelHeaderLabel>
        </PanelHeader>
        <PanelContent>
          <img src={defaultVideoImage} alt=""></img>

        </PanelContent>
        { error && <PanelError><AjaxError t={t} error={error} /></PanelError> }
      </Panel>
    );
  }
}
