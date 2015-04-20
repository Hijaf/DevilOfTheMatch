angular.module(appName).controller('mainCtrl', ['$scope', '$rootScope', 'CountryService', function($scope, $rootScope, CountryService){
	$scope.arrowDown = function(event){
		$rootScope.$emit("arrowPressed", event.keyCode);
	}
}]);