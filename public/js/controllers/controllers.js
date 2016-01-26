angular.module('Anno')
    .controller('HomepageCtrl', ['$scope', '$routeParams', '$filter', '$http', 'AIService', function($scope, $routeParams, $filter, $http, AIService) {

    AIService.post(function(data) {
        console.log(data);
    })

}]);