var Component = System.get('pintxos-component').default;

describe('Component', function () {

	var instance;

	beforeEach(function () {
		$('.test').remove();
		$('body').append('<div class="test"><div class="child"/></div>');

		instance = new Component($('.test')[0], {});

	});

	describe('$el getter', function () {
		it('should return a jQuery object', function () {

			expect(instance.$el instanceof jQuery).toBe(true);
		});
	});

	describe('lifecycle API', function () {

		it('should be destroyable', function () {
			expect(instance.isDestroyed).toBe(true);

			instance.init();

			expect(instance.isDestroyed).toBe(false);

			instance.destroy();
			expect(instance.isDestroyed).toBe(true);
		});

		it('shoud trigger init and destroy events on the component\'s main element', function () {

			var initTriggered, destroyTriggered;

			instance.$el.on(instance.settings.events.init, function () {
				initTriggered = true;
			});

			instance.$el.on(instance.settings.events.destroy, function () {
				destroyTriggered = true;
			});

			instance.init();
			instance.destroy();

			expect(initTriggered).toBe(true);
			expect(destroyTriggered).toBe(true);
		});

	});

	describe('event API', function () {

		var $link;

		beforeEach(function () {
			$('.testLink, .newElement').remove();
			$('body').append('<a class="testLink" href="#">Test</a>');
			$link = $('.testLink');
		});

		it('Should execute an event handler bound with _on, should not execute the event handler when it is unbound with _off', function () {

			var clicked = false, id;

			id = instance._on($link, 'click', function () {
				clicked = true;
			});

			$link.trigger('click');

			expect(clicked).toBe(true);

			clicked = false;
			instance._off(id);

			$link.trigger('click');
			expect(clicked).toBe(false);
			expect(instance._eventData[id]).not.toBeDefined();

		});

		it('Should unbind all event handlers when the component is destroyed', function () {

			var clicked = false, id;

			id = instance._on($link, 'click', function () {
				clicked = true;
			});

			instance.destroy();

			$link.trigger('click');

			expect(clicked).toBe(false);

		});

		it('The context of the event handler should be the instance instead of the event target', function () {
			instance._on($link, 'click', function () {
				expect(this).toEqual(instance);
			});

			$link.trigger('click');
		});

	});

	describe('query cache', function () {

		it('should cache elements', function () {
			var $result = instance._query('.child');
			expect(instance._queryCache['.child']).toEqual($result)
		});

		it('should not create duplicated cache entries', function () {
			instance._query('.child');
			instance._query('.child');
			expect(Object.keys(instance._queryCache).length).toEqual(1)
		});

		it('should take the forceQuery param into account', function () {

			// query for a non existing element => this will be cached
			instance._query('.newElement');

			// adding the element
			instance.$el.append('<div class="newElement"/>');

			// query again with forceQuery = true
			var $el = instance._query('.newElement', true);

			expect($el[0]).toEqual(instance.$el.find('.newElement')[0]);
		});

		it('should clear the query cache when the component is destroyed', function () {
			instance._query('.child');
			instance.destroy();
			expect(Object.keys(instance._queryCache).length).toEqual(0);
		});

	});

	describe('resolve element', function () {

		it('should return a jQuery object when given a string', function () {
			var $el = instance._resolveElement('.child');
			expect($el[0]).toBe(instance.$el.find('.child')[0]);
		});

		it('should return a jQuery object when given a jQuery object', function () {
			var $el = instance._resolveElement(instance.$el.find('.child'));
			expect($el[0]).toBe(instance.$el.find('.child')[0]);
		});

		it('should return the main element when given undefined', function () {
			var el = undefined;
			var $el = instance._resolveElement(el);
			expect($el).toBe(instance.$el);
		});

		it('should return a jQuery object when given an HTMLElement', function () {
			var $el = instance._resolveElement(instance.$el.find('.child')[0]);
			var el = instance.$el.find('.child')[0];
			expect($el[0]).toBe(instance.$el.find('.child')[0]);
		});

	});



});
