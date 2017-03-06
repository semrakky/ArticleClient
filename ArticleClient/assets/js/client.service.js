var app = angular.module('myApp');
app.service("clientService", function ($http) {
   
    this.getAllPosts = function () {
        return $http.get('http://localhost:55550/api/Post/GetAllPosts')
            .then(function (response) {
                return response.data;
            }
			, function (response) {
			    console.log('cannot connect');
			});
    }

    this.getAllCategories = function () {
        return $http.get('http://localhost:55550/api/Category/GetAllCategories')
           .then(function (response) {
               return response.data;
           }, function () { });
    }

    this.getPost = function () {
        alert("getpostid called");
        return $http.get("http://localhost:55550/api/Post/Get/")
            .then(function (response) { return response.data; }, function () { });
    }
});