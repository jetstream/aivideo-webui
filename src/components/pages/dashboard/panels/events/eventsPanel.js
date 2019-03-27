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
import { LinkRenderer } from 'components/shared/cellRenderers';
import { toDiagnosticsModel } from 'services/models';
import { translateColumnDefs } from 'utilities';

export class EventsPanel extends Component {

  constructor(props) {
    super(props);

    const exploreText = props.t('dashboard.panels.events.explore');
    this.columnDefs = [
      {
        ...rulesColumnDefs.ruleName,
        cellRendererFramework: undefined, // Hide soft select link
        minWidth: 200
      },
      rulesColumnDefs.severity,
      {
        headerName: 'rules.grid.count',
        field: 'count'
      },
      {
        ...rulesColumnDefs.explore,
        cellRendererFramework: props => <LinkRenderer {...props} ariaLabel={exploreText} to={`/maintenance/rule/${props.value}`} onLinkClick={this.logExploreClick} />
      }
    ];
  }

  logExploreClick = () => {
    this.props.logEvent(toDiagnosticsModel('EventsPanel_ExploreClick', {}));
  }

  render() {
    const { t, events, isPending, error } = this.props;
    const gridProps = {
      columnDefs: translateColumnDefs(t, this.columnDefs),
      rowData: events,
      suppressFlyouts: true,
      domLayout: 'autoHeight',
      deltaRowDataMode: false,
      t
    };
    const showOverlay = isPending && !events.length;
    console.log("EVENT GRIDPROP ", gridProps);
    return (
      <Panel className="events-panel-container">
        <PanelHeader>
          <PanelHeaderLabel>{t('dashboard.panels.events.header')}</PanelHeaderLabel>
        </PanelHeader>
        <PanelContent>
          <RulesGrid {...gridProps} />
          {
            (!showOverlay && events.length === 0)
              && <PanelMsg>{t('dashboard.noData')}</PanelMsg>
          }
        </PanelContent>
        { showOverlay && <PanelOverlay><Indicator /></PanelOverlay> }
        { error && <PanelError><AjaxError t={t} error={error} /></PanelError> }
      </Panel>
    );
  }
}
