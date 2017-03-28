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
			}else{
				$scope.toCurVal = $scope.fromCurVal * ($scope.rates[$scope.toCurType] * (1 / $scope.rates[$scope.fromCurType]));
				$scope.toCurVal = Math.round($scope.toCurVal * 100) / 100;
			}
	};

 }]);

converter.controller('MyController', function ($scope, $window) {
   $scope.OpenPopupWindow = function () {
       $window.open("./js/default.html", "popup", "width=300,height=200,left=450,top=150");
       $popup.fromType = $scope.fromCurType;
       $popup.toVal = $scope.toCurVal;
       $popup.toType = $scope.toType;
   }
});

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
        
        var clean = val.replace(/[^-0-9\.]/g, '');
        var negativeCheck = clean.split('-');
		var decimalCheck = clean.split('.');
        if(!angular.isUndefined(negativeCheck[1])) {
            negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
            clean =negativeCheck[0] + '-' + negativeCheck[1];
            if(negativeCheck[0].length > 0) {
            	clean =negativeCheck[0];
            }
            
        }
          
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

converter.directive('myDirective', ['$window', function ($window) {

     return {
        link: link,
        restrict: 'E',
        template: '<div>window size: {{width}}px</div>'
     };

     function link(scope, element, attrs){

       scope.width = $window.innerWidth;

       angular.element($window).bind('resize', function(){

         scope.width = $window.innerWidth;

         // manuall $digest required as resize event
         // is outside of angular
         scope.$digest();
       });

     }

 }]);