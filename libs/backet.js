var _ = require('underscore'),

	Item = require('./item');

var Backet = function Backet() {
	this.items = [];
	this.discountsFromPrice = [];
	this.discountsFromAmount = [];
};

Backet.prototype.getSize = function getSize() {
	return _.reduce( this.items, function( memo, item ) {
		return memo + item.count
	}, 0);
};

Backet.prototype.getItems = function getItems() {
	return this.items;
};

Backet.prototype._getItemPosition = function _getItemPosition( item ) {
	for (var i = 0; i < this.items.length; i++) {
		if ( this.items[i].item === item ) {
			return i;
		}
	}
	return -1;
};

Backet.prototype._getItemDiscountFromPrice = function _getItemDiscountFromPrice( item ) {
	for (var i = 0; i < this.discountsFromPrice.length; i++) {
		if ( this.discountsFromPrice[i].item === item ) {
			return i;
		}
	}
	return -1;
};

Backet.prototype._getItemDiscountFromAmount = function _getItemDiscountFromAmount( item ) {
	for (var i = 0; i < this.discountsFromAmount.length; i++) {
		if ( this.discountsFromAmount[i].item === item ) {
			return i;
		}
	}
	return -1;
};

Backet.prototype.addItem = function addItem( newItem ) {
	if ( !(newItem instanceof Item) ) {
		throw new Error( 'The basket can accept only Item object' );
	}

	var addedItemPosition = this._getItemPosition( newItem );
	if ( addedItemPosition === -1 ) {
		this.items.push({
			count: 1,
			item: newItem
		});
	}
	else {
		this.items[ addedItemPosition ].count++;
	}

	return this;
};

Backet.prototype.removeItem = function removeItem( item ) {
	var addedItemPosition = this._getItemPosition( item );
	if ( addedItemPosition === -1 ) {
		throw new Error( 'Cannot remove not added item' );
	}

	if ( this.items[ addedItemPosition ].count === 1 ) {
		this.items.splice( addedItemPosition, 1 );
	}
	else {
		this.items[ addedItemPosition ].count--;
	}

	return this;
};

Backet.prototype.getValue = function getValue() {
	return _.reduce( this.items, _.bind(function( memo, item ) {
		var itemPrice = item.item.price * item.count;

		var itemDiscountPosition = this._getItemDiscountFromPrice( item.item );
		if ( itemDiscountPosition !== -1 && this.discountsFromPrice[ itemDiscountPosition ].limit <= itemPrice ) {
			itemPrice *= ( 100 - this.discountsFromPrice[ itemDiscountPosition ].discount ) / 100;
		}

		var itemAmountDiscountPosition = this._getItemDiscountFromAmount( item.item );
		if ( itemAmountDiscountPosition !== -1 && this.discountsFromAmount[ itemAmountDiscountPosition ].limit <= itemPrice ) {
			itemPrice *= ( 100 - this.discountsFromAmount[ itemAmountDiscountPosition ].discount ) / 100;
		}

		return memo + itemPrice;
	}, this), 0);
};

Backet.prototype.setDiscountFromPrice = function setDiscountFromPrice( item, limit, discount ) {
	if ( discount < 0 ) {
		throw new Error( 'Cannot set negative discount' );
	}

	if ( limit < 0 ) {
		throw new Error( 'Cannot set negative limit' );
	}

	this.discountsFromPrice.push({
		item: item,
		limit: limit,
		discount: discount
	});

	return this;
};

Backet.prototype.setDiscountFromAmount = function setDiscountFromAmount( item, limit, discount ) {
	if ( discount < 0 ) {
		throw new Error( 'Cannot set negative discount' );
	}

	if ( limit < 0 ) {
		throw new Error( 'Cannot set negative limit' );
	}

	this.discountsFromAmount.push({
		item: item,
		limit: limit,
		discount: discount
	});

	return this;
};

module.exports = Backet;