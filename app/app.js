var grisouApp = angular.module('grisouApp', ['ngResource', 'ngSanitize', 'ui.bootstrap']);

/**
 *  SEARCH CONTROLLERS
 */
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
    $scope.contributions = Contributions.query({
      domain: domain,
      ucuser: user
    });
  }
});


/**
 *  ADVANCED SEARCH CONTROLLERS
 */

/* Collapse effect of advanced search */
grisouApp.controller('AdvancedSearchCollapseCtrl', function ($scope) {
  $scope.isCollapsed = false;
});

/* Date picker for From and To date */
grisouApp.controller('DatepickerDemoCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd MMM yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
});

/* Radio button Toggle for Minor Edit option */
grisouApp.controller('MinorEditCtrl', function($scope) {
  $scope.minorEditModel = 'With';
});
