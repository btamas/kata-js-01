var assert = require("assert"),
	starship = require("../libs/starship");

suite('Starship', function() {

	test('name of the starship, should be "starship"', function() {
		assert.strictEqual('starship', starship.getName());
	});

	test('price of the starship, should be 999.99', function() {
		assert.strictEqual(999.99, starship.getPrice());
	});

	test('unit of the starship, should be piece', function() {
		assert.strictEqual('piece', starship.getUnit());
	});
});