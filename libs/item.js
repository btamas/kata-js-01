var Item = function Item() {
};

Item.prototype.getPrice = function getPrice() {
	return this.price;
};

Item.prototype.getName = function getName() {
	return this.name;
};

Item.prototype.getUnit = function getUnit() {
	return this.unit;
};

module.exports = Item;