var should = require('should'),
	_ = require('underscore'),
	helpers = require('./helpers/helpers'),
	permutations = require('../libs/permutations');

suite('test Permutations', function() {
	test('test correct results', function() {
		var testDataProvider = [
			'1', '', '123', '212', '11', 'alma',
			'123456', '112122'
		];

		testDataProvider.forEach(function( testCase ) {
			var result = permutations.getPermutations( testCase );

			//check number of the result
			result.length.should.be.exactly( helpers.calculatePermutationCount( testCase ) );

			//check uniquity
			should( result ).eql( _.uniq(result) );

			//check the same letters
			result.forEach(function( resultItem ) {
				should( _.countBy(resultItem.split('')) ).eql( _.countBy(testCase.split('')) );
			});
		});
	});
});