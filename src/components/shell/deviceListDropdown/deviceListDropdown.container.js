// Copyright (c) Microsoft. All rights reserved.

import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import {
  epics as appEpics
} from 'store/reducers/appReducer';

import {
  redux as deviceRedux,
  getDevices,
  getActiveDeviceId
} from 'store/reducers/devicesReducer';
import { DeviceListDropdown } from './deviceListDropdown';

const mapStateToProps = state => ({
  devices: getDevices(state),
  activeDeviceId: getActiveDeviceId(state)
});

// Wrap the dispatch method
const mapDispatchToProps = dispatch => ({
  changeSelectedDevice: (id) => dispatch(deviceRedux.actions.updateActiveDevice(id)),
  logEvent: diagnosticsModel => dispatch(appEpics.actions.logEvent(diagnosticsModel))
});

export const DeviceListDropdownContainer = withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(DeviceListDropdown));
