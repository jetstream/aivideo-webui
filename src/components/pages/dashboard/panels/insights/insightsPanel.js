// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';

import { AjaxError } from 'components/shared';
import {
  Panel,
  PanelContent,
  PanelError,
  PanelHeader,
  PanelHeaderLabel,
  PanelMsg
} from 'components/pages/dashboard/panel';
import { toDiagnosticsModel } from 'services/models';
import { DeviceListDropdownContainer as DeviceListDropdown } from 'components/shell/deviceListDropdown';

import './insightsPanel.scss';

export class InsightsPanel extends Component {


  logExploreClick = () => {
    this.props.logEvent(toDiagnosticsModel('InsightsPanel_ExploreClick', {}));
  }

  render() {
    const { t, error, imageEvent } = this.props;

    if (!imageEvent) {
      return (
        <Panel className="insights-panel-container">
        <PanelHeader>
          <PanelHeaderLabel>{t('dashboard.panels.insights.header')}</PanelHeaderLabel>
          <DeviceListDropdown selectDevicePrompt={t('dashboard.panels.insights.selectADevicePrompt')} />
        </PanelHeader>
        <PanelContent>
        {
          <PanelMsg>{t('dashboard.noData')}</PanelMsg>
        }
        </PanelContent>
        { error && <PanelError><AjaxError t={t} error={error} /></PanelError> }
      </Panel>
      );
    }

    return (

      <Panel className="insights-panel-container">
        <PanelHeader>
          <PanelHeaderLabel>{t('dashboard.panels.insights.header')}</PanelHeaderLabel>
          <DeviceListDropdown />
        </PanelHeader>
        <PanelContent>
          <img src={imageEvent.data.url} alt={imageEvent.data.url}></img>
        </PanelContent>
        { error && <PanelError><AjaxError t={t} error={error} /></PanelError> }
      </Panel>
    );
  }
}
