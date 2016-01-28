angular.module('Anno', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/homepage', {
				templateUrl: 'views/homepage.html',
				controller: 'HomepageCtrl'
			})
			.when('/song/:id', {
				templateUrl: 'views/song.html',
				controller: 'SongCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'HomepageCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
		  	.otherwise({
		    	redirectTo: '/homepage'
		  	});
	}])
