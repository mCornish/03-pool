import React, { Component } from 'react';
import _ from 'lodash';
import uuid from 'uuid/v4';
import './App.css';

import Declaration from './components/Declaration/Declaration';
import NewPlayer from './components/NewPlayer/NewPlayer';


class App extends Component {
  state = {
    addingPlayer: true,
    isPlaying: false,
    newPlayer: {},
    players: [],
    winner: null
  }
  render() {
    const activePlayers = _.filter(this.state.players, { isActive: true });
    const enoughActive = activePlayers.length === 2;
    const enoughPlayers = this.state.players.length === 2;
    const selectingPlayers = this.state.isPlaying && !enoughActive;

    return (
      <div className="App">
        <h1 className="App__logo">O<sub>3</sub> Pool</h1>

        <div className="flex-col flex-margin">
          <button
            onClick={this.startGame}
            className={!enoughPlayers ? 'is-invisible' : ''}
          >New Game</button>

          {(this.state.addingPlayer || !enoughPlayers) ? (
            <NewPlayer
              onSubmit={this.handlePlayerSubmit}
            />
          ) : (
            <button
              onClick={this.toggleAddPlayer}
            >Add Player</button>
          )}
        </div>
        

        <div className={selectingPlayers ? 'is-selecting' : ''}>
          <h2>Players</h2>
          <p className={selectingPlayers ? '' : 'is-invisible'}>Select 2 players to before you start playing.</p>
          <table className="Players">
            <thead>
              <tr>
                <th>Name</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
            {_.sortBy(this.state.players, 'wins').map((player) => (
              <tr
                key={player.id}
                onClick={() => this.setPlayerActive(player.id)}
                className={`Players__player ${player.isActive ? 'is-active' : ''}`}
              >
                <td>{player.name}</td>
                <td>{player.wins}</td>
                <td className="text-right">
                  {player.isActive && enoughActive ? (
                    <button onClick={() => this.declareWinner(player)}>Winner!</button>
                  ) : (
                    <button
                      onClick={() => this.removePlayer(player.id)}
                    >Remove</button>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <Declaration text={this.state.winner} />
      </div>
    );
  }

  addPlayer = ({ name, wins = 0}) => {
    const player = {
      id: uuid(),
      name,
      wins
    };
    const players = this.state.players.concat(player);
    const addingPlayer = players.length < 2;
    this.setState({
      addingPlayer,
      players
    });
  }

  declareWinner = (player) => {
    this.setState({ winner: player.name });
    this.updatePlayer(player.id, { wins: player.wins + 1 });
    this.endGame();
  }

  handlePlayerSubmit = (e, player) => {
    e.preventDefault();
    
    if (!player) return this.setState({ addingPlayer: false });
    e.target.reset();
    this.addPlayer(player);
  }

  removePlayer = (playerId) => {
    const players = _.reject(this.state.players, { id: playerId });
    this.setState({ players });
  }

  endGame = () => {
    const players = this.state.players.map(toInactive);
    this.setState({
      isPlaying: false,
      players,
    });

    function toInactive(player) {
      return _.assign({}, player, { isActive: false });
    }
  }

  setPlayerActive = (playerId) => {
    if (!this.state.isPlaying) return undefined;
    const activePlayers = _.filter(this.state.players, { isActive: true });
    if (activePlayers.length === 2) return undefined;
    this.updatePlayer(playerId, { isActive: true })
  }

  startGame = () => {
    this.setState({
      isPlaying: true,
      winner: null
    })
  }

  toggleAddPlayer = (addingPlayer = !this.state.addingPlayer) => {
    this.setState({ addingPlayer })
  }

  updatePlayer = (playerId, playerInfo) => {
    const playerIndex = _.findIndex(this.state.players, { id: playerId });
    const player = this.state.players[playerIndex];
    const updatedPlayer = _.assign({}, player, playerInfo);
    const players = this.state.players;
    players[playerIndex] = updatedPlayer;

    this.setState({ players });
  }
}

export default App;
