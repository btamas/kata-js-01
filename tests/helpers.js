var should = require('should'),
	_ = require('underscore');

var Helpers = function Helpers() {};

Helpers.prototype.factorial = function factorial( n ) {
	if ( n <= 1 ) {
		return 1;
	}
	else {
		return this.factorial( n - 1 ) * n;
	}
};

Helpers.prototype.calculatePermutationCount = function( text ) {
	var countLetters = _.reduce(
		_.countBy( text.split('') ),
		function( memo, letterCount ) {
			memo[letterCount] = memo[letterCount] + 1 || 1;
			return memo;
		},
		[]
	);

	var repeatDivider = 1;
	countLetters.forEach(_.bind(function( frequency, i ) {
		repeatDivider *= Math.pow( this.factorial( i ), frequency);
	},this));

	return this.factorial(text.length) / repeatDivider;
};

var helpers = new Helpers();

suite('test TestFunctions', function() {
	test('test calculatePermutationCount', function() {
		helpers.calculatePermutationCount( '' ).should.be.exactly(1);
		helpers.calculatePermutationCount( '12345' ).should.be.exactly(120);
		helpers.calculatePermutationCount( 'a' ).should.be.exactly(1);
		helpers.calculatePermutationCount( 'abb' ).should.be.exactly(3);
	});
});

module.exports = helpers;