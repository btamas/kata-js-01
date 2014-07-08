var Item = require('./item');

var Apple = function Apple() {
	this.price = 32;
	this.name = 'apple';
	this.unit = 'kg';
};

Apple.prototype = new Item;

module.exports = new Apple;