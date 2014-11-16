var grisouApp = angular.module('grisouApp', []);

grisouApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

grisouApp.controller('ContributionListCtrl', function ($scope, $http) {
  $http.jsonp('http://en.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=Catrope&uclimit=3&ucdir=newer&format=json&callback=JSON_CALLBACK').success(function(data) {
    $scope.contributions = data['query']['usercontribs'];
  });
});
