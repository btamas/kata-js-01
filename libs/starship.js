var Item = require('./item');

var Starship = function Starship() {
	this.price = 999.99;
	this.name = 'starship';
	this.unit = 'piece';
};

Starship.prototype = new Item;

module.exports = new Starship;