angular.module("Eateries").factory("EateriesFactory",EateriesFactory);

function EateriesFactory($http){
    return{
        placeAdd : placeAdd,
        placeUpdate : placeUpdate,
        placeDisplay : placeDisplay,
        getonePlace : getonePlace,
        putPlaceUpdate : putPlaceUpdate
    };

    function placeAdd(){
        return $http.get('/addplaces').then(completed).catch(failed);
    }

    function placeDisplay(){
        console.log("In display data factory");
        return $http.get('/places').then(completed).catch(failed);
    }

    function placeUpdate(id){
        return $http.get('/places/'+id+'/update').then(completed).catch(failed);
    }

    function putPlaceUpdate(id){
        return $http.put('/places/'+id+'/update').then(completed).catch(failed);
    }

    function getonePlace(id){
        return $http.get('/places/'+id).then(completed).catch(failed);
    }

    function completed(response){
        return response.data
    }

    function failed(err){
        console.log("Error occurred @ data factory "+err.statusCode());
    }


}