var BinarySearch = function BinarySearch() {
	this.limits = [];
	this.result = 0;
};

BinarySearch.prototype.search = function search( list ) {
	this.limits = [ 0, list.length ];
	this.result = 0;
};

BinarySearch.prototype._getMiddleElementIndex = function _getMiddleElementIndex( list ) {
	return Math.floor( list.length / 2 );
};

BinarySearch.prototype._getMiddleElement = function _getMiddleElement( list ) {
	return list[ this._getMiddleElementIndex( list ) ] || null;
};

BinarySearch.prototype._getStepDirection = function _getStepDirection( list, element ) {
	var middleElement = this._getMiddleElement( list );

	if ( middleElement === null ) {
		return null;
	}

	if ( middleElement > element ) {
		return -1;
	}
	else if ( middleElement < element ) {
		return 1;
	}

	return 0;
};

BinarySearch.prototype._splitList = function _splitList( list, direction ) {
	var resultList = null,
		middleElemIndex = this._getMiddleElementIndex( list );

	if ( direction === 1 ) {
		resultList = list.splice( middleElemIndex + 1 );
	}
	else if ( direction === -1 ) {
		resultList = list.splice( 0, middleElemIndex );
	}

	return resultList;
};

BinarySearch.prototype._searchStep = function _searchStep( list, element ) {
	var result = this._getMiddleElement( list ) === element;
	if ( result === true ) {
		this.result += this._getMiddleElementIndex( list );
		return true;
	}
	else {
		var direction = this._getStepDirection( list, element );
		if (direction === 1) {
			this.limits[0] = this._getMiddleElementIndex( list );
		}
		else {
			this.limits[1] = this._getMiddleElementIndex( list );
		}
		this.result += this._getMiddleElementIndex( list ) * direction;
		return false;
	}
};

BinarySearch.prototype._getLimits = function _getLimits() {
	return this.limits;
};

module.exports = BinarySearch;