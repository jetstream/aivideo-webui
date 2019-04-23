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

  camerasToOptions = camIds => camIds
    .map(( value ) => ({ label: value, value: value }));


  render() {
    const { devices, activeDeviceId, selectDevicePrompt } = this.props;

    const cameras = devices.reduce(function(total, currentItem, currentIndex, arr) {
      // do we need to filter out offline devices?
      if(currentItem.tags.hasOwnProperty('cameras')) {
        Object.entries(currentItem.tags.cameras).forEach(([key, value]) =>  total.push(value.semanticId));
      }
      return total;
    }, []);
    //console.log("cameras: ", cameras);

    // if we don't have an activeDevice, show "Select a camera" as the first option
    const cameraIds = activeDeviceId ? cameras : [selectDevicePrompt].concat(cameras);

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
        options={this.camerasToOptions(cameraIds)}
        value={activeDeviceId}
        onChange={this.onChange(cameraIds)} />
    );
  }
}
