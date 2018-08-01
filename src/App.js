import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

class App extends Component {
  state = {
    addingPlayer: true,
    newPlayer: {},
    players: []
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.toggleAddPlayer}>Add Player</button>
        {this.state.addingPlayer && (
          <form onSubmit={(e) => this.handlePlayerSubmit(e, this.state.newPlayer)}>
            <label htmlFor="new-player-name">Name</label>
            <input
              id="new-player-name"
              onChange={(e) => this.updateNewPlayer({ name: e.target.value })}
            />

            <label htmlFor="new-player-wins">Wins</label>
            <input
              id="new-player-wins"
              onChange={(e) => this.updateNewPlayer({ win: e.target.value })}
            />

            <button type="submit">Add</button>
          </form>
        )}
      </div>
    );
  }

  addPlayer = (player) => {
    const players = this.state.players.concat(player);
    const addingPlayer = players.length < 2;
    this.setState({
      addingPlayer,
      players
    });
  }

  handlePlayerSubmit = (e, player) => {
    e.preventDefault();
    e.target.reset();
    this.addPlayer(player);
  }

  toggleAddPlayer = (addingPlayer = !this.state.addingPlayer) => {
    this.setState({ addingPlayer })
  }

  updateNewPlayer = (playerInfo) => {
    const newPlayer = _.assign({}, this.state.newPlayer, playerInfo);
    this.setState({ newPlayer });
  }
}

export default App;
