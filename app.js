function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
    }
    return newArr;
}

(function(){
    var app = angular.module('stylepuzzle', []);
    app.controller('scraperController', ['$http', '$scope', function($http, $scope){
        var store = this;
        store.ci_array  = [];
        store.products= {};
        store.display = {};
        store.thumb_array = [];
        // TODO clean up
        store.final_thumb_array = []
        var link = 'https://cdn.rawgit.com/tobiaslei/c5c186ea75d05de6a195/raw/f40a5c0e4eb6106fa650dee82478999a65010ab9/feed.json';
        $http.get(link).success(function (data) {
            store.products = data.feed;
            store.display = store.products;
            for(i=0; i<store.products.length; i++){
                store.ci_array.push(store.products[i].images[0]);
                tmp_array = [];
                for (j in store.products[i].images){
                    store.products[i].images[j].div = i
                    tmp_array.push(store.products[i].images[j])
                }
                store.thumb_array.push(tmp_array)
            }
            //split thumbnails into lists of 3
            for (i in store.thumb_array){
                store.final_thumb_array.push(chunk(store.thumb_array[i],2));
            }
        });
        $scope.click = function(image, index) {
            //console.log('here' + store.ci_array.length);
            store.ci_array.splice(image.div, 1);
            store.ci_array.splice(image.div, 0, image);
        };
        $scope.loadMore = function() {
            console.log('here');
        //slice += 2;
        //store.display = store.products.slice(0, slice);
        }
    }]);
})();