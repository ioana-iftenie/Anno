angular.module('Anno')
    .controller('HeaderCtrl', ['$scope', function($scope) {

    	$('body').on('click', '.header-menu a', function() {
    		$('.header-menu a.active').removeClass('active');
    		$(this).addClass('active');
    	});

	}])
	.controller('HomepageCtrl', ['$scope', function($scope) {

	}])
    .controller('LoginCtrl', ['$scope', '$routeParams', '$filter', '$http', 'LoginService', function($scope, $routeParams, $filter, $http, LoginService) {
    	$scope.errorCode = $routeParams.error;
    	console.log($scope.errorCode);
	    LoginService.post(function(data) {
	        console.log(data);
	    })
	}])
