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