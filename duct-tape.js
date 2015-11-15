( function () {
	"use strict";

	const tape = require( "tape-catch" );

	module.exports = function test() {
		let f;
		let params = [];
		for ( let loop = 0; loop < arguments.length; loop++ ) {
			if ( typeof arguments[ loop ] === "function" ) {
				f = arguments[ loop ];
			}
			else {
				params.push( arguments[ loop ] );
			}
		}
		params.push( function ( t ) {
			const p = f( t );
			if ( p && p.then ) {
				p.then( function () {
					t.end();
				}, function ( err ) {
					t.end( err );
				} );
			}
		} );
		tape.apply( tape, params );
	};

	module.exports.skip = function () {
		tape.skip.apply( tape, arguments );
	};
} )();