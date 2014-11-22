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

grisouApp.factory('Resume', function () {
   // Define the constructor function.
	function Resume( _nom ) {
	this.nom = _nom
	this.ajouts = 0;
	this.retraits = 0;
	this.references = 0;
	this.survivre = 0;
	this.commentaires = 0;
	this.suiviReponse = 0;
	this.reponses = 0;
	this.sizeDiff = 0;
	
}
// Define the "instance" methods using the prototype
// and standard prototypal inheritance.
	Resume.prototype = {
	getNom: function() {
	return( this.nom );
	},
	getString: function() {
	return( "");
	}
	};

// Return constructor - this is what defines the actual
// injectable in the DI framework.
return( Resume ); 
});

grisouApp.factory('TotalResume', function (Resume,Contributions) {
	return {
	
	 getResume : function(contributions,domain) {
	 
		var articles = [];
		var buf = null;
		contributions.forEach(function(cont) {
			articles.forEach(function(art) {
				if (art == cont)
				{
					buf = art;
				}
			});
			if (buf == null) {
				var i = articles.push(new Resume(cont.title));
				buf = articles[i-1];
			}
			
			buf.sizeDiff += cont.size;
			var oldId = cont.parentid;
			var newId = cont.revid;
			var a;
			var b;
			
			var oldText = Contributions.get({
				domain: domain,
				oldid: oldId,
			}, function(){
				a = oldText;
			});

			var newText =  Contributions.get({
			  domain: domain,
			  oldid: newId,
			}, function(){
			  b = newText;
			});
			var test = getDiff(a,b);
			
			buf = null;
		});
		console.log(articles);
	 
	 }
	};
	
	
});



grisouApp.controller('ContributionListCtrl', function ($http, $scope, Contributions,TotalResume,Resume) {
  $scope.itemClicked = function ($index, domain) {
    $scope.selectedIndex = $index;
    $scope.loading = true;

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
  }
  
  $scope.search = function (domain, user) {
    $scope.revision = null;
    $scope.selectedIndex = null;
	var test = $scope.contributions = Contributions.query({
      domain:  domain,
      ucuser:  user,
      ucshow:  $scope.includeMinorEdits ? [] : ['!minor'],
      ucstart: $scope.startDate,
      ucend:   $scope.endDate
    },function() {
			TotalResume.getResume(test,domain);
	});
	
	console.log($scope.contributions);
  };
});

// Copyright VOGG 2013
function strip_tags(input, allowed) {
  // http://kevin.vanzonneveld.net
  allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
}

function getDiff(text1, text2) {
  var dmp = new diff_match_patch();
  var res = dmp.diff_main(strip_tags(text1), strip_tags(text2));
  
  return res;
}

grisouApp.controller('TabsCtrl', function ($scope, $window) {
});
