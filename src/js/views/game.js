define(['jquery', 'views/view', 'tmpl/game', 'views/game-score'], function ($, View, tmpl, ScoreView) {
	var GameView = View.extend({
		template: tmpl,

		delegate: function () {
			$(window).on('resize', this.onWindowResize);
		},

		hide: function () {
			GameView.__super__.hide.call(this);
			this.undelegate();
		},

		initialize: function () {
			GameView.__super__.initialize.call(this);
			this.sceneEl = this.$('.game__scene');
			_.bindAll(this, 'onWindowResize');
		},

		onWindowResize: function () {
			this.resizeScene();
		},

		render: function () {
			GameView.__super__.render.call(this);
		},

		resizeScene: function () {
			var K = 4 / 3;
			var height = $(window).height();
			var width = height * K;
			if (width > $(window).width()) {
				width = $(window).width();
				height = width / K;
			}
			this.sceneEl.css({
				width: width,
				height: height
			});
		},

		show: function () {
			GameView.__super__.show.call(this);
			this.score = this.collection.create({ score: 0});
			this.scoreView = new ScoreView({
				el: this.$('.game__scene-score'),
				model: this.score
			});
			this.delegate();
			this.resizeScene();
		},

		undelegate: function () {
			$(window).off('resize', this.onWindowResize);
			this.scoreView.undelegate();
		}
	});
	
	return GameView;
});
