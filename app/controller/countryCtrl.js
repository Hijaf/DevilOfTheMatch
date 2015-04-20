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