var should = require('should'),
	_ = require('underscore'),
	helpers = require('./helpers'),
	permutations = require('../libs/permutations');

var testDataProvider = function() {
	return [
		[ '1', ['1'] ],
		[ '', [ '' ] ],
		[ '123', ['123', '132', '213', '231', '312', '321'] ],
		[ '212', ['122', '212', '221'] ],
		[ '11', [ '11' ] ],
		[ 'alma', [ 'alma', 'alam', 'amla', 'amal', 'aaml', 'aalm', 'maal', 'mala' ] ]
	];
};

suite('test Permutations', function() {
	testDataProvider().forEach(function( testCase ) {
		test('test correct result with "' + testCase[0] + '"', function() {
			var result = permutations.getPermutations( testCase[0] );

			//check number of the result
			result.length.should.be.exactly( helpers.calculatePermutationCount( testCase[0] ) );

			//check uniquity
			should( result ).eql( _.uniq(result) );

			//check the same letters
			result.forEach(function( resultItem ) {
				should( _.countBy(resultItem.split('')) ).eql( _.countBy(testCase[0].split('')) );
			});
		});
	});
});