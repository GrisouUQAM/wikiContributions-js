var grisouApp = angular.module('grisouApp', ['ngResource']);

grisouApp.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

grisouApp.factory('Contributions', ['$resource', function ($resource) {
  return $resource(
    'http://:domain/w/api.php', {
      callback: 'JSON_CALLBACK',
      format:   'json'
    }, {
      'get': {
        method:'jsonp',
        params: {
          action: 'parse',
          prop:   'text'
        },
        transformResponse: function (data) {
          return data.parse.text;
        }
      },
      'query': {
        method:'jsonp',
        params: {
          action:  'query',
          list:    'usercontribs',
          uclimit: '500'
        },
        isArray: true,
        transformResponse: function (data) {
          return data.query.usercontribs;
        }
      }
    }
  );
}]);

grisouApp.controller('ContributionListCtrl', function ($http, $scope, Contributions) {
  $scope.itemClicked = function ($index, domain) {
    $scope.selectedIndex = $index;
    $scope.revision = Contributions.get({
      domain: domain,
      oldid: $scope.contributions[$index].revid,
    });
  }

  $scope.search = function (domain, user) {
    $scope.contributions = Contributions.query({
      domain: domain,
      ucuser: user
    });
  }
});
