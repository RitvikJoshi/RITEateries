angular.module("Eateries",["ngRoute"]).config(config);

function config($routeProvider){
    console.log("In Angular route provider");

    $routeProvider.when("/",{
                    templateUrl: "angular-app/AllPlaceController/PlaceDisplay/displayPlaces.html",
                    controller: placeDisplayController,
                    controllerAs: 'vm'
                });

};



