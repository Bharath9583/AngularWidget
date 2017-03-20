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
            $scope.rates = {};
            $http.get('http://api.fixer.io/latest?base='+$scope.fromType)
            .then(function(res) {
                if($scope.fromType === $scope.toType){
                    $scope.toValue = $scope.fromValue;
                }else{
                    $scope.rates = res.data.rates;
                    $scope.toValue = $scope.fromValue * res.data.rates[$scope.toType];
                }
                
        });
        };
    }]);