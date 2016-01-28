angular.module('Anno')
	.factory('AIService', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/homepage');
			},
			post : function() {
				return $http.get('/api/homepage');
			}
		}
	}])
	.factory('LoginService', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			post : function() {
				return $http.get('/api/login');
			}
		}
	}])
	.factory('SongService', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/song/' + $routeParams.id);
			},
			post : function() {
				return $http.get('/api/song/' + $routeParams.id);
			}
		}
	}])