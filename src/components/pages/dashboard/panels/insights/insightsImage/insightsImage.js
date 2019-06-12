// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';
import { PanelMsg } from 'components/pages/dashboard/panel';
import './insightsImage.scss';

export class InsightsImage extends Component {

  handleImageLoaded() {
    //console.log("BBS", this.props.boundingBoxes);
    const imgWidth =  this.refs.imageRef.width;
    const imgHeight = this.refs.imageRef.height;
    this.refs.canvasRef.width = imgWidth;
    this.refs.canvasRef.height = imgHeight;
    const canvasContext = this.refs.canvasRef.getContext("2d");

    this.props.boundingBoxes.forEach((bb) => {
      //console.log("Drawing", bb.data.bbxmin, bb.data.bbymin, bb.data.bbxmax, bb.data.bbymax);
      const bbymin = bb.data.bbymin; //0.37305212020874023;
      const bbxmin = bb.data.bbxmin; //0.59874922037124634;
      const bbymax = bb.data.bbymax; //0.57989329099655151;
      const bbxmax = bb.data.bbxmax; //0.68968445062637329;

      // RED
      const x = imgWidth * bbxmin;
      const y = imgHeight * bbymin;
      const width = imgWidth * (bbxmax - bbxmin);
      const height = imgHeight * (bbymax - bbymin);

      canvasContext.strokeStyle = "#FF0000";
      canvasContext.strokeRect(x, y, width, height);
      canvasContext.lineWidth = 2;

    });
  }

  render() {
    const { t, image } = this.props;
    if (!image) {
      return (
        <PanelMsg>{t('dashboard.noData')}</PanelMsg>
      );
    }

    return (
      <div ref="containerRef" className="insights-image-container">
        <img
          ref="imageRef"
          className="insights-image"
          src={image.url}
          alt={image.url}
          onLoad={this.handleImageLoaded.bind(this)}/>
        <canvas ref="canvasRef" width={100} height={100} />
      </div>
    );

  }
}
