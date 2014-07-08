var assert = require('assert'),

	Backet = require('../libs/backet'),
	apple = require('../libs/apple'),
	starship = require('../libs/starship');

suite('Backet', function() {
	var backet;

	setup(function() {
		backet = new Backet();
	});

	test('should be empty without add any item', function() {
		assert.strictEqual( 0, backet.getSize() );
	});

	test('should be get back that added', function() {
		backet.addItem( apple );
		var items = backet.getItems();
		assert.strictEqual( 1, backet.getSize() );
		assert.strictEqual( apple, items[0].item );
	});

	test('could add only Item object', function() {
		assert.throws(function() {
			backet.addItem({});
		}, Error );
	});

	test('could remove item from basket', function() {
		backet.addItem( apple );
		backet.removeItem( apple );
		assert.strictEqual( 0, backet.getSize() );
	});

	test('could not remove not added item', function() {
		assert.throws(function() {
			backet.removeItem( apple );
		}, Error);

		backet.addItem( apple );
		assert.throws(function() {
			backet.removeItem( starship );
		}, Error);
	});

	test('could get 0 amount of empty backet', function() {
		assert.strictEqual( 0, backet.getValue() );
	});

	test('could chain backet functions', function() {
		backet.addItem( apple ).removeItem( apple ).getValue();
	});

	test('could get amount of backet', function() {
		backet.addItem( apple );
		assert.strictEqual( apple.getPrice(), backet.getValue() );

		backet.addItem( apple );
		assert.strictEqual( apple.getPrice() * 2, backet.getValue() );

		backet.removeItem( apple ).removeItem( apple ).addItem( starship );
		assert.strictEqual( 999.99, backet.getValue() );
	});

	test('could set discount from price', function() {
		backet.setDiscountFromPrice( apple, 33, 10 );
		backet.addItem( apple );
		assert.strictEqual( apple.getPrice(), backet.getValue() );

		backet.addItem( apple );
		assert.strictEqual( apple.getPrice() * 2 * 0.9, backet.getValue() );
	});

	test('could setted discount from price working properly', function() {
		backet.setDiscountFromPrice( apple, 20, 20 );
		backet.addItem( starship );
		assert.strictEqual( starship.getPrice(), backet.getValue() );

		backet.addItem( apple );
		assert.strictEqual( starship.getPrice() + apple.getPrice() * 0.8, backet.getValue() );

		backet.removeItem( starship );
		assert.strictEqual( apple.getPrice() * 0.8, backet.getValue() );
	});
	
	test('could set discount from amount', function() {
		backet.setDiscountFromAmount( apple, 2, 10 );
		backet.addItem( apple ).addItem( apple );
		assert.strictEqual( apple.getPrice() * 2 * 0.9, backet.getValue() );
	});

	test('could setted discount from amount working property', function() {
		backet.setDiscountFromPrice( apple, 2, 20 );
		backet.addItem( starship );
		assert.strictEqual( starship.getPrice(), backet.getValue() );

		backet.addItem( apple).addItem( apple );
		assert.strictEqual( starship.getPrice() + apple.getPrice() * 2 * 0.8, backet.getValue() );

		backet.removeItem( starship );
		assert.strictEqual( apple.getPrice() * 2 * 0.8, backet.getValue() );
	});

	test('could not set negative discount', function() {
		assert.throws(function() {
			backet.setDiscountFromPrice( apple, 1, -10 );
		}, Error);

		assert.throws(function() {
			backet.setDiscountFromAmount( apple, 1, -10 );
		}, Error);
	});

	test('could not set negative limit', function() {
		assert.throws(function() {
			backet.setDiscountFromPrice( apple, -10, 0 );
		}, Error);

		assert.throws(function() {
			backet.setDiscountFromAmount( apple, -10, 0 );
		}, Error);
	});
});