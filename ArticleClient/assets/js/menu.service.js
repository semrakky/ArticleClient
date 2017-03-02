var app = angular.module('myApp');

app.service("menuService", function ($http) {
	this.getList = function () {
		
		return $http.get('http://localhost:55550/api/Menu/GetList')
            .then(function (response)
            {
            	return response.data;
            }
			, function (response) {
				console.log('cannot connect');
			});
	};
	this.get = function () {
		return $http.get('http://localhost:55550/api/Menu/Get')
			.then(function (response) {
				return response.data;
			}
			, function (response) {
				console.log('cannot connect');
			});
	}
	this.put = function (menu) {
	    return $http.put('http://localhost:55550/api/Menu/Put', menu)
			.then(function (response) {
			    return response.data;
			}
			, function (response) {
			    console.log('cannot connect');
			});
	}
	this.delete = function (menu) {
	    return $http.delete('http://localhost:55550/api/Menu/Delete/' + menu.id)
        .then(function (response) {
            return response.data;
        }, function (response) {
        });
	}
	this.post = function (menu) {
	    return $http.post('http://localhost:55550/api/Menu/Post', menu)
			.then(function (response) {
			    return response.data;
			}
			, function (response) {
			    console.log('cannot connect');
			});
	}
	this.getpages = function () {
	    return $http.get('http://localhost:55550/api/Page/Get')
			.then(function (response) {
			    return response.data;
			}
			, function (response) {
			    console.log('cannot connect');
			});
	}
});