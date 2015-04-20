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