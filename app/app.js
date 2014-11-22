var grisouApp = angular.module('grisouApp', ['ngResource', 'ngSanitize', 'ui.bootstrap', 'diff-match-patch']);

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
    $scope.loading = true;
    $scope.talkParticipation = false;

    $scope.articleBeforeRevision = Contributions.get({
      domain: domain,
      oldid: $scope.contributions[$index].parentid,
    }, function(){
      $scope.loading = false;
    });

    $scope.articleAfterRevision = Contributions.get({
      domain: domain,
      oldid: $scope.contributions[$index].revid,
    }, function(){
      $scope.loading = false;
    });

    articleTitle = $scope.contributions[$index].title;
    $scope.talkParticipation = $scope.talks.filter(function (talk) {
        talkTitle = talk.title.substring(talk.title.indexOf(":")+1, talk.title.length);
        return talkTitle === articleTitle;
    }).length > 0; // Filter returns an array if at least one element matches
  }

  $scope.search = function (domain, user) {
    $scope.revision = null;
    $scope.selectedIndex = null;
    $scope.contributions = Contributions.query({
      domain:  domain,
      ucuser:  user,
      ucnamespace: 0,
      ucshow:  $scope.includeMinorEdits ? [] : ['!minor'],
      ucstart: $scope.startDate,
      ucend:   $scope.endDate
    });
    $scope.talks = Contributions.query({
      domain:  domain,
      ucuser:  user,
      ucnamespace: 1,
      ucshow:  $scope.includeMinorEdits ? [] : ['!minor'],
      ucstart: $scope.startDate,
      ucend:   $scope.endDate
    });
  };
});

grisouApp.controller('TabsCtrl', function ($scope, $window) {
});
