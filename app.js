(function(){
    var app = angular.module('stylepuzzle', ['infinite-scroll']);
    app.controller('scraperController', ['$http', '$scope', function($http, $scope){
        var store = this;
        store.products= {};
        // keeps track of which thumbnail should be the large image
        store.large_images = [];
        store.thumb_array = [];
        store.infinite_product = {};
        var update_page = 3;
        var link = 'https://cdn.rawgit.com/tobiaslei/c5c186ea75d05de6a195/raw/f40a5c0e4eb6106fa650dee82478999a65010ab9/feed.json';
        $http.get(link).success(function (data) {
            store.products = data.feed;
            for(i=0; i<store.products.length; i++){
                store.large_images.push(store.products[i].images[0]);
                tmp_array = [];
                for (j in store.products[i].images){
                    //keep track of which div each thumbnail is in
                    store.products[i].images[j].div = i;
                    tmp_array.push(store.products[i].images[j])
                }
                store.thumb_array.push(tmp_array)
            }

            // set up initial infinite scrolling value
            store.infinite_product = store.products.slice(0, update_page);
        });
        $scope.click = function(image) {
            // change the thumbnail to display by changing large_image array to the clicked thumbnail
            store.large_images.splice(image.div, 1);
            store.large_images.splice(image.div, 0, image);
        };
        $scope.loadMore = function() {
            // updates infinite_product array with new data to load
            update_page += 2;
            if(store.infinite_product.length >1) {
                store.infinite_product = store.products.slice(0, update_page);
            }
        }
    }]);
})();