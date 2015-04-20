var DevilOfTheMatch = angular.module(appName, [
	'ngRoute',
	'ngTouch'
]);

angular.module(appName).config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/lists',{
				templateUrl: 'app/views/lists.html',
				controller: 'listsCtrl'
			}).
			otherwise({
				redirectTo: '/lists'
			});
	}]);
angular.module(appName).directive('focus', ['$timeout', function($timeout){
	return {
		restrict: "A",
		scope: {
			focus: "="
		},
		link : function(scope, element, attrs){
			scope.$watch('focus', function(value){
				if(value){
					element[0].focus();
				}
			})
		}
	};
}]);
angular.module(appName).directive('playerslist', ['$window',function($window){
	return {
		restrict: "A",
		link : function(scope, element){
			scope.$on('playersListLoaded', function(event, value){
				if($window.innerWidth<1280){
					element.css({"width": value*120+"px"});
				}
			})
		}
	};
}]);
angular.module(appName).controller('countryCtrl', ['$scope', '$rootScope', 'CountryService', function($scope, $rootScope, CountryService){
	$scope.getInfoCountries = function(){
		CountryService.getCountry('Belgium').success(function(data,status){
			$scope.belgium = data;
		});

		CountryService.getCountry('Country').success(function(data,status){
			$scope.country = data;
		});
	}

	$scope.getInfoCountries();
}]);
angular.module(appName).controller('mainCtrl', ['$scope', '$rootScope', 'CountryService', function($scope, $rootScope, CountryService){
	$scope.arrowDown = function(event){
		$rootScope.$emit("arrowPressed", event.keyCode);
	}
}]);
angular.module(appName).controller('playersCtrl', ['$scope', '$rootScope', 'PlayersService', function($scope, $rootScope, PlayersService){
	$scope.popup = false;
	$scope.getPlayersList = function(){
		PlayersService.getPlayers().success(function(data,status){
			console.log(data);
			$scope.players = data;
			$scope.playerSelected = data[0];
			$scope.indexActifPlayer = 0;
			$rootScope.$broadcast('playersListLoaded', $scope.players.length);
		});
	}

	$scope.nextPlayer = function(indexActif){
		if((indexActif+1)<$scope.players.length){
			$scope.playerSelected = $scope.players[indexActif+1];
			$scope.indexActifPlayer = indexActif+1;
		}
	}

	$scope.previewPlayer = function(indexActif){
		if((indexActif-1)>=0){
			$scope.playerSelected = $scope.players[indexActif-1];
			$scope.indexActifPlayer = indexActif-1;
		}
	}

	$scope.selectPlayer = function(index){
		$scope.playerSelected = $scope.players[index];
		$scope.indexActifPlayer = index;
	}

	$rootScope.$on('arrowPressed', function(event, keycode){
		if(keycode==37){
			$scope.previewPlayer($scope.indexActifPlayer);
		}else{
			if(keycode==39){;
				$scope.nextPlayer($scope.indexActifPlayer);
			}
		}
	});
	
	$scope.voteForPlayer = function(index, player){
		$scope.popup = true;
		$scope.vote = player;
	}

	$scope.getPlayersList();
}]);
angular.module(appName).service('CountryService', ['$http', '$q', function ($http, $q){
	var url = {
		"Belgium": "./JSON/belgium.json",
		"Country": "./JSON/otherCountry.json"
	};
	return{
		getCountry: function(country){
			return $http({method: 'GET', url: url[country]});
		}
	};
}]);
angular.module(appName).service('DirectoryService', ['$http', '$q', '$timeout', function ($http, $q, $timeout){
		return{
			saveDirectory: function (aDirectories){
				var deferred= $q.defer();
				$timeout(function(){
					window.localStorage.setItem('karkeAppliDivxDir', JSON.stringify(aDirectories));
					deferred.resolve();
				}, 0);
				return deferred.promise;
			},
			getDirectories: function(){
				var deferred = $q.defer();
				if(window.localStorage.getItem('karkeAppliDivxDir')){
					deferred.resolve({data: JSON.parse(window.localStorage.getItem('karkeAppliDivxDir'))});
				}
				return deferred.promise;
			}
		};
	}
]);
angular.module(appName).service('PathDirService',['$q', function($q){
	return {
		getPathDir: function(directory){
			console.log(directory);
//			fs.readdir(directory,
//				function(err, files){
//					var aFiles = [];
//					if(err) throw err;
////					for(var i=0;i<files.length;i++){
////						console.log(files[i].indexOf('.wmv'));
////						if(files[i].indexOf('.wmv')!=-1){
////							aFiles.push(files[i]);
////						}
////					}
//					console.log(files);
//					console.log(aFiles);
//				}
//			);
		}
	};
}]);
angular.module(appName).service('PlayersService', ['$http', '$q', function ($http, $q){
	var url = {
		"playersList": "./JSON/playersList.json"
	};
	return{
		getPlayers: function(){
			return $http({method: 'GET', url: url.playersList});
		}
	};
}]);