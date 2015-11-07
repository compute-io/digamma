/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Check whether an element is `NaN`
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	digamma = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number digamma', function tests() {

	var	validationData = require( './fixtures/output.json' ),
		data = validationData.data,
		expected = validationData.expected.map( function( d ) {
			return d === 'Inf' ? Infinity : d;
		});

	it( 'should export a function', function test() {
		expect( digamma ).to.be.a( 'function' );
	});

	it( 'should evaluate the digamma function', function test() {
		var actual;
		for ( var i = 0; i < data.length; i++ ) {
			actual =  digamma( data[ i ] );
			if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
				assert.closeTo( actual, expected[ i ] , 1e-14 );
			}
		}
	});

	it( 'should evaluate the digamma function for x such that remainder > 0.5', function test() {
		var data,
			expected,
			actual;
		data = -3.8;
		expected = -2.863183589156929;
		actual = digamma( data );
		assert.closeTo( actual, expected, 1e-14 );
	});

	it( 'should return `NaN` if provided `NaN` as input', function test() {
		assert.isTrue( isnan( digamma( NaN ) ) );
	});

});
