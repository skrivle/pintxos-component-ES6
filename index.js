/* Default settings
------------------------------------------------- */
var _defaults = {
	events: {
		init: 'init.Component',
		destroy: 'destroy.Component'
	}
};


/* Class definition
------------------------------------------------- */
class Component {

	constructor (el, options) {
		this._$el = $(el);
		this._isDestroyed = true;
		this._settings = $.extend(true, {}, _defaults, options);
	}

	init () {

		if (!this.isDestroyed) {
			this.destroy();
		}

		this._isDestroyed = false;
		this.$el.trigger(this.settings.events.init);

		return this;
	}

	destroy () {
		this._isDestroyed = true;
		this.$el.trigger(this.settings.events.destroy);
		return this;
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
}


/* Export
------------------------------------------------- */
export default Component;
