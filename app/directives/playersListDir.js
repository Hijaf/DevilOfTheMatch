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