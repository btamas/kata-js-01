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

var helpers = module.exports = new Helpers();

suite('test Factorial', function() {
	var dataProvider = [
		[ 0, 1 ],
		[ 1, 1 ],
		[ 2, 2 ],
		[ 3, 6 ],
		[ 4, 24 ],
		[ 10, 3628800 ]
	];

	test('test factorial', function() {
		dataProvider.forEach(function( testCase ) {
			helpers.factorial( testCase[0]).should.be.exactly(testCase[1]);
		});
	});
});

suite('test CalculatePermutationCount', function() {
	var dataProvider = [
		[ '', 1 ],
		[ '12345', 120 ],
		[ 'a', 1 ],
		[ 'abb', 3 ]
	];

	test('test calculatePermutationCount', function() {
		dataProvider.forEach(function( testCase ) {
			helpers.calculatePermutationCount( testCase[0] ).should.be.exactly( testCase[1]);
		});
	});
});