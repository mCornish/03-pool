import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './NewPlayer.css';

class NewPlayer extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    player: {}
  }

  render = () => (
    <form
      onSubmit={(e) => this.props.onSubmit(e, this.state.player)}
      className="NewPlayer flex-col flex-margin"
    >
      <div className="flex-row flex-margin">
        <div className="NewPlayer__field">
          <label htmlFor="new-player-name">Name</label>
          <input
            id="new-player-name"
            onChange={(e) => this.updatePlayer({ name: e.target.value })}
            placeholder="First Last"
          />
        </div>
        <div className="NewPlayer__field">
          <label htmlFor="new-player-wins">Wins</label>
          <input
            id="new-player-wins"
            onChange={(e) => this.updatePlayer({ wins: e.target.value })}
            type="number"
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      <div className="NewPlayer__buttons">
        <button
          type="button"
          onClick={this.props.onSubmit}
          className="NewPlayer__cancel"
        >Cancel</button>
        <button
          type="submit"
          className="NewPlayer__submit"
        >Add</button>
      </div>
    </form>
  );

  updatePlayer = (playerInfo) => {
    const player = _.assign({}, this.state.player, playerInfo);
    this.setState({ player });
  }
}

export default NewPlayer;