var assert = require("assert"),
	apple = require("../libs/apple");

suite('Apple', function() {

	test('name of the apple, should be "apple"', function() {
		assert.strictEqual('apple', apple.getName());
	});

	test('price of the apple, should be 32', function() {
		assert.strictEqual(32, apple.getPrice());
	});

	test('unit of the apple, should be kg', function() {
		assert.strictEqual('kg', apple.getUnit());
	});
});