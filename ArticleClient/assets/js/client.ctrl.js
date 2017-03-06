var app = angular.module('myApp');
app.controller('clientCtrl', function ($scope, clientService, $http, $window, $location) {
   
    $scope.posts= [];
   
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

    $scope.onDetailRedirect = function () {
        var currenturl = $location.absUrl();
        var id = currenturl.split("=")[1];
        $http.get("http://localhost:55550/api/Post/Get/" + id)
            .then(function success(response) {
                $('#description').append(response.data.texts);
                $scope.post = response.data;
            },
             function error() { });
    }

    $scope.detail = function (id) {
          $window.location.href = "/home/detail?post_id="+id;
    }

    $scope.detailCat = function (id) {
        $window.location.href = "/home/category?cate_id=" + id;
    }

    $scope.onRedirectCat = function () {
        var currenturl = $location.absUrl();
        var id = currenturl.split("=")[1];
        $http.get('http://localhost:55550/api/Post/GetPostByCatId/' + id)
            .then(function (response) {
                $scope.cats = response.data;
            });
    }
 
    $scope.getPosts();
    getallCategories();
   
    $scope.getOldPost = function () {
        $http.get('http://localhost:55550/api/Post/getOldPosts').then(function (response) {
            $scope.oldPosts = response.data;
        });
    }
    $scope.getOldPost();

});