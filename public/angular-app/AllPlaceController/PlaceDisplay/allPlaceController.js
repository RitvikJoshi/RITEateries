angular.module("Eateries").controller('placeDisplayController',placeDisplayController);

function placeDisplayController($scope,EateriesFactory){
    console.log("In placeDisplayController");
    var vm =this;

    vm.title = "Places to eat";
    EateriesFactory.placeDisplay().then(function(response){
       console.log(response);
       vm.placeList = response;
       vm.places = response;

    });

    $scope.getstars = function (num){
        console.log("In getstars");
        return new Array(num);
    }

};