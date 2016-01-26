angular.module('Anno')
    .controller('HeaderCtrl', ['$scope', function($scope) {

    	$('body').on('click', '.header-menu a', function() {
    		$('.header-menu a.active').removeClass('active');
    		$(this).addClass('active');
    	});

	}])
	.controller('HomepageCtrl', ['$scope', function($scope) {

	}])