var converter = angular.module('ConverterApp', [])

converter.controller('ConverterCntlr', ['$scope', '$http', function($scope, $http) {
	$scope.rates = {};
	$http.get('http://api.fixer.io/latest?base=ZAR')
		.then(function(res) {
			$scope.rates = res.data.rates;
			$scope.toCurType = "USD";
			$scope.fromCurType = "CAD";
			$scope.toConvert();
		});
	$scope.toConvert = function() {            
			if($scope.fromCurType === $scope.toCurType){
				$scope.toCurVal = $scope.fromCurVal;
				$scope.toval = 1;
			}else{
				$scope.toCurVal = $scope.fromCurVal * ($scope.rates[$scope.toCurType] * (1 / $scope.rates[$scope.fromCurType]));
				$scope.toCurVal = Math.round($scope.toCurVal * 100) / 100;
				$scope.toval = Math.round($scope.rates[$scope.toCurType] * 100)/100;
			}
	};

 }]);

converter.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
            var val = '';
        }
        
        var clean = val.replace(/[^0-9\.]/g, '');
		var decimalCheck = clean.split('.');
          
        if(!angular.isUndefined(decimalCheck[1])) {
            decimalCheck[1] = decimalCheck[1].slice(0,2);
            clean =decimalCheck[0] + '.' + decimalCheck[1];
        }

        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});
