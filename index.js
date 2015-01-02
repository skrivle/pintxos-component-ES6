/* Default settings
------------------------------------------------- */
var _defaults = {
	events: {
		init: 'init.Component',
		destroy: 'destroy.Component'
	}
};

var _uid = 0;


/* Class definition
------------------------------------------------- */
class Component {

	/* Constructor
	------------------------------------------------- */
	constructor (el, options) {
		this._$el = $(el);
		this._isDestroyed = true;
		this._settings = $.extend(true, {}, _defaults, options);

		this._eventData = {};
		this._queryCache = {};
	}

	/* Methods
	------------------------------------------------- */
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
		this._off();
		this._clearQueryCache();
		return this;
	}

	_on ($el, event, selector, handler) {

		var eventData, uid, handlerWrapper, _self;

		_self = this;

		// shuffle arguments
		if(typeof selector === 'function') {
			handler = selector;
			selector = null;
		}

		// making sure that the event handler's this keyword is pointing to the
		// class instance instead of the event target. We're also creating
		// a unique event handler to unbind with later on.
		handlerWrapper = function () {
			handler.apply(_self, arguments);
		};

		// using jQuery's on method to actually bind the event handler
		$el.on(event, selector, handlerWrapper);

		// create a map with all data needed to unbind the event
		eventData = {
			handler: handlerWrapper,
			$el: $el,
			event: event,
			selector: selector
		};

		uid = '_event' + (_uid ++);
		this._eventData[uid] = eventData;

		return uid;
	}

	_off (uid) {
		var eventData, key;

		if(typeof uid === 'undefined') {

			for(key in this._eventData) {
				this._off(key);
			}

		}else if(this._eventData.hasOwnProperty(uid)) {

			eventData = this._eventData[uid];
			eventData.$el.off(eventData.event, eventData.selector, eventData.handler);

			delete this._eventData[uid];
		}
	}

	_query (selector, context, forceQuery) {
		var $context, $result;

		// shuffle arguments
		if(typeof context === 'undefined' || typeof context === 'boolean') {
			forceQuery = context;
			context = this.$el;
		}

		forceQuery = (typeof forceQuery === 'undefined') ? false : forceQuery;

		if(!this._queryCache.hasOwnProperty(selector) || forceQuery) {
			$context = (context instanceof jQuery) ? context : $(context);
			$result = $context.find(selector);
			this._queryCache[selector] = $result;
		}else{
			$result = this._queryCache[selector];
		}

		return $result;
	}

	_clearQueryCache () {
		this._queryCache = {};
	}

	_resolveElement (element, forceQuery) {

		var $result;

		$result = undefined;
		forceQuery = (typeof forceQuery !== 'undefined') ? forceQuery : false;

		if(element instanceof jQuery) {
			$result = element;
		}else if(typeof element === 'undefined') {
			$result = this.$el;
		}else if(typeof element === 'string') {
			$result = this._query(element, forceQuery);
		}else if(element instanceof HTMLElement) {
			$result = $(element);
		}

		return $result;
	};

	/* Getters
	------------------------------------------------- */
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
