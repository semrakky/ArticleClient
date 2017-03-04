var app = angular.module('myApp');
app.controller('clientCtrl', function ($scope, clientService) {
   
    $scope.post = [];
    
    
    $scope.getPosts = function () {
        clientService.getAllPosts().then(function (response) {
            $scope.posts = response;
            
        });
    }

    function getallCategories() { 
        clientService.getAllCategories()
            .then(function (response) {
                $scope.categories = response;
                console.log($scope.categories);
            }, function () {
        });
    }

    $scope.getPosts();
    getallCategories();
});