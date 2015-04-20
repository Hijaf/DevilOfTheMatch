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