


/* Dependencies
------------------------------------------------- */
import $ from 'jquery';


/* Default settings
------------------------------------------------- */
var _defaults = {

};


/* Class definition
------------------------------------------------- */
class Component {

	constructor (el, options) {
		this._isDestroyed = true;
		this._settings = $.extend(true, {}, _defaults, options);
	}

	init () {
		this._isDestroyed = false;
	}

	destroy () {
		this._isDestroyed = true;
	}

	get isDestroyed () {
		return this._isDestroyed;
	}

	get $el () {
		return this._$el;
	}

	get settings () {
		return this._settings;
	}

	_on () {

	}

	_off () {

	}

	_query () {

	}

	_clearQueryCache () {

	}

	_resolveElement () {

	}
}


/* Export
------------------------------------------------- */
export { Component };
