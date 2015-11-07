/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Module to be tested:
	digamma = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset digamma', function tests() {

	var validationData = require( './fixtures/output.json' );

	it( 'should export a function', function test() {
		expect( digamma ).to.be.a( 'function' );
	});

	it( 'should evaluate the digamma function and deep set', function test() {
		var data, expected, i;

		data = validationData.data.map( function( e ) {
			return {'x': e};
		});

		data = digamma( data, 'x' );

		expected = validationData.expected
			.map( function( d ) {
				if (d === 'Inf' ) {
					return Number.POSITIVE_INFINITY;
				}
				if ( d === '-Inf' ) {
					return Number.NEGATIVE_INFINITY;
				}
				return d;
			})
			.map( function( d ) {
				return {'x': d};
			});

		for ( i = 0; i < data.length; i++ ) {
			if ( isFiniteNumber( data[ i ].x ) && isFiniteNumber( expected[ i ].x ) ) {
				assert.closeTo( data[ i ].x, expected[ i ].x, 1e-12 );
			}
		}

		// Custom separator...
		data = validationData.data.map( function( e ) {
			return {'x': [9, e]};
		});

		data = digamma( data, 'x/1', '/' );
		expected = validationData.expected
			.map( function( d ) {
				if (d === 'Inf' ) {
					return Number.POSITIVE_INFINITY;
				}
				if ( d === '-Inf' ) {
					return Number.NEGATIVE_INFINITY;
				}
				return d;
			})
			.map( function( e ) {
				return {'x': [9, e]};
			});

		for ( i = 0; i < data.length; i++ ) {
			if ( isFiniteNumber( data[ i ].x[ 1 ] ) && isFiniteNumber( expected[ i ].x[ 1 ] ) ) {
				assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-12, 'custom separator' );
			}
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( digamma( [], 'x' ), [] );
		assert.deepEqual( digamma( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = digamma( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});