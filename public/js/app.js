angular.module('flickr', ['ngRoute', 'flickrServices'])
    .config(airlineRouter);

function airlineRouter($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: function(){

            }
        })
        .when('/:id', {
            templateUrl: 'partials/main.html',
            reloadOnSearch: false,
            controller: function($scope, $routeParams, $location){
                $scope.setCurrentPhoto($routeParams.id);
                if(!$scope.currentPhoto || $scope.loading){
                    $location.path('/');
                    return;
                }
                $scope.openModal();

            }
        })
}
