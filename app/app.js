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
		var dmp = new diff_match_patch();
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
				var aa = oldText;
				a = aa;
				//console.log(aa);
				var newText =  Contributions.get({
					domain: domain,
					oldid: newId,
					}, function(){
					var bb = newText;
					b =bb;
					//console.log(bb);
					var c = aa;
					
					
					var res = dmp.diff_main(c, b);
					res.forEach(function(item) {
						console.log(item);
					});
			});
			});

			
			//console.log(oldText);
			//var test = getDiff(a,b);
			//console.log(test);
			
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



grisouApp.controller('TabsCtrl', function ($scope, $window) {
});
