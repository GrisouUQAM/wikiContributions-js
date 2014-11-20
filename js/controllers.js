var grisouApp = angular.module('grisouApp', ['ngResource']);

grisouApp.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

grisouApp.factory('Contributions', ['$resource', function ($resource) {
  return $resource(
    'http://:domain/w/api.php', {
      action:   'query',
      callback: 'JSON_CALLBACK',
      format:   'json',
      list:     'usercontribs',
      uclimit:  '500'
    }, {
      'query': {
        method:'jsonp',
        isArray: true,
        transformResponse: function (data) {
          return angular.fromJson(data).query.usercontribs;
        }
      }
    }
  );
}]);

grisouApp.controller('ContributionListCtrl', function ($http, $scope, Contributions) {
  $scope.itemClicked = function ($index) {
    $scope.selectedIndex = $index;
  }

  $scope.search = function (domain, user) {
    $scope.contributions = Contributions.query({
      domain: domain,
      ucuser: user
    });
  }
});
