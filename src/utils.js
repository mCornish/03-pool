import _ from 'lodash';

/** Retrieves players from localStorage
 * @returns {Object[]} A collection of players
 */
function localPlayers() {
  const playerItems = _.toPairs(localStorage).filter(isPlayer);
  return playerItems.reduce(toPlayers, []);

  function isPlayer(itemPair) {
    return itemPair[0].indexOf('op:player') === 0;
  }

  function toPlayers(players, itemPair) {
    const key = itemPair[0];
    const value = itemPair[1];
    if (!key.includes('player')) return players;
    const playerKey = key.split('_')[1];
    const id = key.split('_')[2];

    // Check for existing player and update accordingly
    const playerIndex = _.findIndex(players, { id });
    const playerInfo = { id, [playerKey]: value };
    const player = playerIndex > -1 ?
      _.assign({}, players[playerIndex], playerInfo) :
      playerInfo;

    if (playerIndex === -1) return players.concat(player);
    const newPlayers = players;
    newPlayers[playerIndex] = player;
    return newPlayers;
  }
}

/**
 * Returns a random name
 * @returns A random name
 */
function randomName() {
	const names = [
    'Amanda S',
    'Andrea K',
    'Ashley C',
    'Ashley M',
    'Beth P',
    'Brian C',
    'Calvin G',
    'Christina L',
    'Daniel L',
    'Greg A',
    'Jackie O',
    'Jay F',
    'Jessica W',
    'Joan M',
    'Josh S',
    'Joshua B',
    'Justin H',
    'Justin M',
    'Keith S',
    'Kelsey H',
    'Lauren S',
    'Mike C',
    'Mike G',
    'Steve G',
    'Tara T',
    'Tim B',
    'Zuhib D',
  ];
	return names[randomNum(0, names.length - 1)];
}

/**
 * Returns a random number within a range
 * @param {Number} [min=0] - Lower limit of range to find random number
 * @param {Number} [max=100] - Upper limit of range to find random number
 * @returns {Number} A random number within the range
 */
function randomNum(min=0, max=100) {
    return Math.floor(Math.random() * ((max - min) + 1) + min);
}

export {
  localPlayers,
  randomName
}