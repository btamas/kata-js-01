var Permutation = function Permutation() {};

Permutation.prototype.getPermutations = function getPermutations( text ) {
	return this._getPermutations( '', text );
};

Permutation.prototype._getPermutations = function _getPermutations( prefix, text ) {
	var n = text.length;
	if ( n === 0 ) {
		return [ prefix ];
	}
	else {
		var result = [];
		for( var i=0; i < n; i++ ) {
			if ( text.indexOf( text[i] ) >= i ) {
				var p = this._getPermutations( prefix + text[i], text.substr(0, i) + text.substr(i+1) );
				result = result.concat(p);
			}
		}
		return result;
	}
};

module.exports = new Permutation();
