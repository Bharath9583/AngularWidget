var currconvController = angular.module('myApp', [])
 currconvController.controller('ConvertCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.rates = {};
        $http.get('http://api.fixer.io/latest?base=ZAR')
            .then(function(res) {
                $scope.rates = res.data.rates;
                $scope.toType = "INR";
                $scope.fromType = "USD";
                $scope.fromValue = 1;
                $scope.forExConvert();
            });
        $scope.forExConvert = function() {            
                if($scope.fromType === $scope.toType){
                    $scope.toValue = $scope.fromValue;
                }else{
                    $scope.toValue = $scope.fromValue * ($scope.rates[$scope.toType] * (1 / $scope.rates[$scope.fromType]));
                    $scope.toValue = Math.round($scope.toValue * 100) / 100;
                }
        };
    }]);