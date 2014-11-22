var grisouApp = angular.module('grisouApp', ['ngResource', 'ngSanitize', 'ui.bootstrap']);

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
          return angular.fromJson(data).parse;
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
          return angular.fromJson(data).query.usercontribs;
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
    $scope.revision = null;
    $scope.selectedIndex = null;
    $scope.contributions = Contributions.query({
      domain:  domain,
      ucuser:  user,
      ucshow:  $scope.includeMinorEdits ? [] : ['!minor'],
      ucstart: $scope.startDate,
      ucend:   $scope.endDate
    });
  }
});
