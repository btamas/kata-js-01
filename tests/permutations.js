var should = require('should'),
	_ = require('underscore'),
	helpers = require('./helpers/helpers'),
	permutations = require('../libs/permutations');

suite('test Permutations', function() {
	var testDataProvider = [
		[ '1', ['1'] ],
		[ '', [ '' ] ],
		[ '123', ['123', '132', '213', '231', '312', '321'] ],
		[ '212', ['122', '212', '221'] ],
		[ '11', [ '11' ] ],
		[ 'alma', [ 'alma', 'alam', 'amla', 'amal', 'aaml', 'aalm', 'maal', 'mala' ] ]
	];

	test('test correct results', function() {
		testDataProvider.forEach(function( testCase ) {
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