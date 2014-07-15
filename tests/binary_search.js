var assert = require("assert"),
	BinarySearch = require('../libs/binary_search');

var checkArrayEquals = function( array1, array2 ) {
	if (!array1 || !array2 || array1.length !== array2.length) {
		return false;
	}

	for( var i = 0; i < array1.length; i++ ) {
		if ( array1[i] !== array2[i] ) {
			return false;
		}
	}
	return true;
};

suite('Binary search', function() {

	setup(function() {
		this.list = [
			[ 1, 2, 4, 8, 16, 32, 64 ],
			[ 1, 2 ],
			[ 1 ],
			[]
		];
		this.element = 4;
		this.binarySearch = new BinarySearch();
	});

	test('getMiddleElement should work correctly', function() {
		assert.strictEqual( 8, this.binarySearch._getMiddleElement( this.list[0] ) );
		assert.strictEqual( 2, this.binarySearch._getMiddleElement( this.list[1] ) );
		assert.strictEqual( 1, this.binarySearch._getMiddleElement( this.list[2] ) );
		assert.strictEqual( null, this.binarySearch._getMiddleElement( this.list[3] ) );
	});

	test('step direction should work correctly', function() {
		assert.strictEqual( 0, this.binarySearch._getStepDirection( this.list[0], 8 ) );
		assert.strictEqual( 1, this.binarySearch._getStepDirection( this.list[0], 16 ) );
		assert.strictEqual( -1, this.binarySearch._getStepDirection( this.list[0], 4 ) );

		assert.strictEqual( 0, this.binarySearch._getStepDirection( this.list[1], 2 ) );
		assert.strictEqual( 0, this.binarySearch._getStepDirection( this.list[2], 1 ) );

		assert.strictEqual( null, this.binarySearch._getStepDirection( this.list[3], 1 ) );
	});

	test('splitList function work with -1', function() {
		assert.strictEqual( true, checkArrayEquals( [1,2,4], this.binarySearch._splitList( this.list[0], -1 ) ) );

	});

	test('splitList function work with 1', function() {
		assert.strictEqual( true, checkArrayEquals( [16,32,64], this.binarySearch._splitList( this.list[0], 1 ) ) );
	});

	test('splitList function work with even element list', function() {
		assert.strictEqual( true, checkArrayEquals( [1], this.binarySearch._splitList( this.list[1], -1 ) ) );
	});

	test('splitList function work with even element list', function() {
		assert.strictEqual( true, checkArrayEquals( [], this.binarySearch._splitList( this.list[1], 1 ) ) );
	});

	test('splitList function work with 1 element list', function() {
		assert.strictEqual( true, checkArrayEquals( [], this.binarySearch._splitList( this.list[2], 1 ) ) );
	});

	test('splitList function work with 0 element list', function() {
		assert.strictEqual( true, checkArrayEquals( [], this.binarySearch._splitList( this.list[3], 1 ) ) );
	});

	test('searchStep function', function() {
		assert.strictEqual( true, this.binarySearch._searchStep( this.list[0], 8 ) );

		assert.strictEqual( false, this.binarySearch._searchStep( this.list[0], 1 ) );
		assert.strictEqual( true, checkArrayEquals( [ 0, this.binarySearch._getMiddleElementIndex( this.list[0] ) ], this.binarySearch._getLimits() ) );
	});
});