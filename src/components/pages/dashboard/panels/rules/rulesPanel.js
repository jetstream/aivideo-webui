// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';

import { AjaxError, Indicator } from 'components/shared';
import {
  Panel,
  PanelContent,
  PanelError,
  PanelHeader,
  PanelHeaderLabel,
  PanelMsg,
  PanelOverlay
} from 'components/pages/dashboard/panel';
import { RulesGrid, rulesColumnDefs } from 'components/pages/rules/rulesGrid';
import { toDiagnosticsModel } from 'services/models';
import { translateColumnDefs } from 'utilities';

export class RulesPanel extends Component {

  constructor(props) {
    super(props);

    this.columnDefs = [
      {
        ...rulesColumnDefs.ruleName,
      },
      {
        ...rulesColumnDefs.severity
      },
      {
        ...rulesColumnDefs.lastTrigger,
      }
    ];
  }

  logExploreClick = () => {
    this.props.logEvent(toDiagnosticsModel('RulesPanel_ExploreClick', {}));
  }

  render() {
    const { t, rules, isPending, error, fetchRules } = this.props;
    const gridProps = {
      columnDefs: translateColumnDefs(t, this.columnDefs),
      onGridReady: this.onGridReady,
      rowData: isPending ? undefined : rules || [],
      onContextMenuChange: this.onContextMenuChange,
      t: this.props.t,
      deviceGroups: this.props.deviceGroups,
      refresh: fetchRules,
      logEvent: this.props.logEvent
    };
    const showOverlay = isPending && !rules.length;

    return (
      <Panel className="rules-panel-container">
        <PanelHeader>
          <PanelHeaderLabel>{t('dashboard.panels.rules.header')}</PanelHeaderLabel>
        </PanelHeader>
        <PanelContent>
        <RulesGrid {...gridProps} />
          {
            (!showOverlay && rules.length === 0)
              && <PanelMsg>{t('dashboard.noData')}</PanelMsg>
          }
        </PanelContent>
        { showOverlay && <PanelOverlay><Indicator /></PanelOverlay> }
        { error && <PanelError><AjaxError t={t} error={error} /></PanelError> }
      </Panel>
    );
  }
}
