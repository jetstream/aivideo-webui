// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';
import { SelectInput } from '@microsoft/azure-iot-ux-fluent-controls/lib/components/Input/SelectInput';

//import { toDiagnosticsModel } from 'services/models';

import './deviceListDropdown.scss';

export class DeviceListDropdown extends Component {

  onChange = (deviceIds) => (value) => {
    console.log("CHANGE DEVICE", value);
    //this.props.logEvent(toDiagnosticsModel('DeviceListFilter_Select', {}));
    // Don't try to update the device list if the device id doesn't exist
    if (deviceIds.indexOf(value) > -1) {
      this.props.changeSelectedDevice(value);
    }
    //this.props.logEvent(toDiagnosticsModel('DeviceFilter_Select', {}));
  }

  devicesToOptions = devices => devices
    .map(({ id }) => ({ label: id, value: id }));


  render() {
    const { devices, activeDeviceId } = this.props;
    const deviceIds = devices.map(({ id }) => id);

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
        options={this.devicesToOptions(devices)}
        value={activeDeviceId}
        onChange={this.onChange(deviceIds)} />
    );
  }
}
