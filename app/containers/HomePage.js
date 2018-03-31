// @flow
import React, { Component } from 'react';
import GameForm from '../components/GameForm';
import ScreenshotPreview from './ScreenshotPreview';

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      game: 'hq',
      openChrome: true,
    };
  }

  handleGameSelect(game) {
    this.setState({ game });
  }

  handleOpenChrome(e) {
    this.setState({ openChrome: e.target.checked });
  }

  render() {
    return (
      <div>
        <GameForm
          handleGameSelect={e => this.handleGameSelect(e)}
          game={this.state.game}
          handleOpenChrome={e => this.handleOpenChrome(e)}
          openChrome={this.state.openChrome}
        />
        <ScreenshotPreview shouldOpenChrome={this.state.openChrome} game={this.state.game} />
      </div>
    );
  }
}
