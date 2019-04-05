// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';
import { SelectInput } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Input/SelectInput';

//import { toDiagnosticsModel } from 'services/models';

import './deviceListDropdown.scss';

export class DeviceListDropdown extends Component {

  onChange = (deviceIds) => (value) => {
    //this.props.logEvent(toDiagnosticsModel('DeviceListFilter_Select', {}));
    // Don't try to update the device list if the device id doesn't exist
    if (deviceIds.indexOf(value) > -1) {
      this.props.changeSelectedDevice(value);
    }
    //this.props.logEvent(toDiagnosticsModel('DeviceFilter_Select', {}));
  }

  devicesToOptions = deviceIds => deviceIds
    .map(( value ) => ({ label: value, value: value }));


  render() {
    const { devices, activeDeviceId, selectDevicePrompt } = this.props;
    // filter out offline devices
    const filteredDevicesIds = devices.filter((value) => { return value.connected; }).map(({ id }) => id);
    // if we don't have an activeDevice, show "Select a device" as the first option
    const deviceIds = activeDeviceId ? filteredDevicesIds : [selectDevicePrompt].concat(filteredDevicesIds);

    return (
      <SelectInput
        name="device-list-dropdown"
        className="device-list-dropdown"
        attr={{
          select: {
            className: "device-list-dropdown-select",
            'aria-label': this.props.t(`deviceGroupDropDown.ariaLabel`)
          },
          chevron: {
            className: "device-list-dropdown-chevron",
          },
        }}
        options={this.devicesToOptions(deviceIds)}
        value={activeDeviceId}
        onChange={this.onChange(deviceIds)} />
    );
  }
}
