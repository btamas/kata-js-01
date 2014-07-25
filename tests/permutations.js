var should = require('should'),
	_ = require('underscore'),
	permutations = require('../libs/permutations');

var fact = function fact( n ) {
	if ( n <= 1 ) {
		return 1;
	}
	else {
		return fact( n - 1 ) * n;
	}
};

var testDataProvider = function() {
	return [
		[ '1', ['1'] ],
		[ '', [ '' ] ],
		[ '123', ['123', '132', '213', '231', '312', '321'] ],
		[ '212', ['122', '212', '221'] ],
		[ '11', [ '11' ] ]
	];
}

var calculatePermutationCount = function( text ) {
	var countLetters = _.reduce(
		_.countBy( text.split('') ),
		function( memo, letterCount ) {
			memo[letterCount] = memo[letterCount] + 1 || 1;
			return memo;
		},
		[]
	);

	var repeatDivider = 1;
	countLetters.forEach(function( frequency, i ) {
		repeatDivider *= Math.pow( fact( i ), frequency);
	});

	return fact(text.length) / repeatDivider;
};

suite('test Permutations', function() {
	testDataProvider().forEach(function( testCase ) {
		test('test correct result with "' + testCase[0] + '"', function() {
			var result = permutations.getPermutations( testCase[0] );

			//check number of the result
			result.length.should.be.exactly( calculatePermutationCount( testCase[0] ) );

			//check uniquity
			should( result ).eql( _.uniq(result) );

			//check the same letters
			result.forEach(function( resultItem ) {
				should( _.countBy(resultItem.split('')) ).eql( _.countBy(testCase[0].split('')) );
			});
		});
	});
});