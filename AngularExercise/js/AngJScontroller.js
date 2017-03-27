var converter = angular.module('ConverterApp', [])
converter.controller('ConverterCntlr', ['$scope', '$http', function($scope, $http) {
	$scope.rates = {};
	$http.get('http://api.fixer.io/latest?base=ZAR')
		.then(function(res) {
			$scope.rates = res.data.rates;
			$scope.toCurType = "USD";
			$scope.fromCurType = "CAD";
			$scope.fromCurVal = 0.00;
			$scope.toConvert();
		});
	$scope.toConvert = function() {            
			if($scope.fromCurType === $scope.toCurType){
				$scope.toCurVal = $scope.fromCurVal;
			}else{
				$scope.toCurVal = $scope.fromCurVal * ($scope.rates[$scope.toCurType] * (1 / $scope.rates[$scope.fromCurType]));
				$scope.toCurVal = Math.round($scope.toCurVal * 100) / 100;
			}
	};
 }]);