var grisouApp = angular.module('grisouApp', []);

grisouApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

grisouApp.controller('ContributionListCtrl', function ($scope, $http) {
  $scope.itemClicked = function ($index) {
    $scope.selectedIndex = $index;
  }

  $scope.search = function (domain, user) {
    $http.jsonp('http://' + domain + '/w/api.php?action=query&list=usercontribs&ucuser=' + user + '&uclimit=500&ucdir=newer&format=json&callback=JSON_CALLBACK').success(function(data) {
      $scope.contributions = data['query']['usercontribs'];
    });
  }
});
