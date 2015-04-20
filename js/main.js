var DevilOfTheMatch = angular.module(appName, [
	'ngRoute',
	'ngTouch'
]);

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