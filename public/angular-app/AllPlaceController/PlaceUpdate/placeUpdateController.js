angular.module("Eateries").controller('placeUpdateController',placeUpdateController);

function placeUpdateController($scope,$routeParams,EateriesFacotry){
    console.log("In placeUpdateController");
    var vm =this;
    var id = $routeParams.id;
    EateriesFacotry.placeUpdate(id).then(function(response){
        console.log(response);
        vm.title = response.name;
        vm.name = response.name;
        vm.description = response.description;
        vm.address = response.location.address;
        vm.latitude = response.location.latitude;
        vm.longitude = response.location.longitude;
        vm.photo = response.photo;
        vm.features = response.speciality;
        vm.manager = response.contact.manager;
        vm.phone = response.contact.phone;
        vm.email = response.contact.email;
        vm.payment = response.payment;
    });



}