var Item = require('./item');

var Light = function Light() {
	this.price = 15;
	this.name = 'light';
	this.unit = 'year';
};

Light.prototype = new Item;

module.exports = new Light;