var assert = require("assert"),
	light = require("../libs/light");

suite('Light', function() {

	test('name of the light, should be "light"', function() {
		assert.strictEqual('light', light.getName());
	});

	test('price of the light, should be 15', function() {
		assert.strictEqual(15, light.getPrice());
	});

	test('unit of the light, should be year', function() {
		assert.strictEqual('year', light.getUnit());
	});
});