var Permutation = function Permutation() {};

Permutation.prototype.getPermutations = function getPermutations( text ) {
	return this._getPermutations( '', text );
};

Permutation.prototype._getPermutations = function _getPermutations( prefix, text ) {
	if ( text.length === 0 ) {
		return [ prefix ];
	}
	else {
		var result = [];
		for( var i=0; i < text.length; i++ ) {
			//prevent duplications
			if ( text.indexOf( text[i] ) < i ) {
				continue;
			}

			var permutations = this._getPermutations( prefix + text[i], text.substr(0, i) + text.substr(i+1) );
			result = result.concat(permutations);
		}
		return result;
	}
};

module.exports = new Permutation();
