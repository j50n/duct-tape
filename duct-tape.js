( function () {
	"use strict";

	const tape = require( "tape-catch" );

	function isPromise( p ) {
		return p && p.then && typeof p.then === "function";
	}

	function test() {
		let params = [];
		Array.prototype.slice.call( arguments ).forEach( function ( arg ) {
			if ( typeof arg === "function" ) {
				const testFunction = arg;
				params.push(
					function ductTapeTestWrapper( t ) {
						const p = testFunction( t );
						if ( isPromise( p ) ) {
							p.then( function resolve() {
								t.end();
							}, function reject( err ) {
								t.end( err );
							} );
						}
					} );
			}
			else {
				params.push( arg );
			}
		} );

		tape.apply( tape, params );
	}

	test.skip = function skip() {
		tape.skip.apply( tape, arguments );
	};

	module.exports = test;
} )();