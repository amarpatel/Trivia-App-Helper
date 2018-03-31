// @flow
import React, { Component } from 'react';
import { shell } from 'electron';
import GameForm from '../components/GameForm';
import Author from '../components/Author';
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

  handleOnAuthorClick() {
    shell.openExternal('https://www.linkedin.com/in/amarmpatel/');
  }

  render() {
    return (
      <div>
        <GameForm
          handleGameSelect={e => this.handleGameSelect(e)}
          game={this.state.game}
          handleOpenChrome={e => this.handleOpenChrome(e)}
          openChrome={this.state.openChrome}
          handleOnAuthorClick={() => this.handleOnAuthorClick()}
        />
        <ScreenshotPreview shouldOpenChrome={this.state.openChrome} game={this.state.game} />
        <Author handleOnAuthorClick={() => this.handleOnAuthorClick()}/>
      </div>
    );
  }
}
