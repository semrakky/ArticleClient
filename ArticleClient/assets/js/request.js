/// <reference path="request.js" />
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
   
        getAllUserRole();
        getAllUsers();
        
    //get all users role
        function getAllUserRole() {
        $http({
            method: "GET",
            url: "http://localhost:55550/api/UserRole",
        }).then(function success(response) {
            $scope.userroles = response.data;
            console.log($scope.userroles);
        }, function error(response) {

        });
    }
    //save user role
        $scope.saveUserrole = function () {
        $http.post("http://localhost:55550/api/UserRole"
             ,JSON.stringify({"id": 0, "name": $scope.role_name, "description": $scope.role_des }))
            .then(function success(response) {
                alert("Success");
                getAllUserRole();
          },
          function error(response) {
          	console.log(response)
          	alert("Eorror");
          });

    }
    //get all users
        function getAllUsers() {
        $http({
            method: "GET",
            url: "http://localhost:55550/api/User"
        }).then(function successs(response) {
            $scope.allUsers = response.data;
            console.log($scope.allUsers);
        }, function error(response) { });
        }
    //save user
        $scope.saveUser = function () {
            $http.post("http://localhost:55550/api/User",
                JSON.stringify({
                    "name": $scope.user_account,
                    "email": $scope.user_email,
                    "firstname": $scope.user_firstname,
                    "lastname": $scope.user_lastname,
                    "gender": $scope.user_gender,
                    "passwd": $scope.user_pwd,
                    "role_id": $scope.role_id
                }))
                .then(function success(response) {
                    swal("ជោគជ័យ", "ធ្នកប្រើប្រាស់ត្រូវបានបន្ថែម", "success")
                    console.log(response);
                    $scope.user_account = "";
                    $scope.user_email = "";
                    $scope.user_firstname = "";
                    $scope.user_lastname = "";
                    $scope.user_pwd = "";
                    $scope.user_cpwd = "";
                    $scope.user_gender = "0";
                    $scope.role_id = "0";
                    getAllUsers();
                }, function error(response) {
                    console.log(response);
                });
        }
    //delete user by id
        $scope.userDelete = function (id) {
             var userid=id;
              swal({
                                title: "ប្រាកដថាចង់លុបអ្នកប្រើប្រាស់?",
                                text: "ទិន្នន័យនឹងត្រូវបានបាត់បង់!",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "បាទ, លុប!",
                                cancelButtonText: "ទេ, បោះបង់!",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                function (isConfirm) {
                    if (isConfirm) {
                        $http.delete("http://localhost:55550/api/User/" + userid).then(function success(response) {
                            swal("លុប!", "អ្នកប្រើប្រាស់ត្រូវបានលុប.", "success");
                             getAllUsers();
                            
                        });
                        
                    } else {
                        swal("បោះបង់", "ទិន្នន័យរក្សារទុកដដែល", "error");
                    }
                });
        }
    //edit user
        $scope.userEdit = function (element) {
            $scope.user_account = element.user.name;
            $scope.user_email = element.user.email;
            $scope.user_firstname =element.user.firstname
            $scope.user_lastname = element.user.lastname;
            $scope.user_gender = element.user.gender;
            $scope.user_pwd = element.user.passwd;
            $scope.user_cpwd = element.user.passwd;
            $scope.role_id = element.user.role_id + "";
            //user edit btn save
            $scope.saveUserupdate = function () {
                alert($scope.role_id);
                $http.put("http://localhost:55550/api/User",
                  JSON.stringify({
                      "id": element.user.id,
                      "name": $scope.user_account,
                      "email": $scope.user_email,
                      "firstname": $scope.user_firstname,
                      "lastname": $scope.user_lastname,
                      "gender": $scope.user_gender,
                      "passwd": $scope.user_pwd,
                      "role_id": $scope.role_id
                  }))
                 .then(function success(response) {
                     getAllUsers();
                     swal("ជោគជ័យ", "អ្ធកប្រើប្រាស់ត្រូវបានកែប្រែ", "success")
                     $("#btnClose").trigger('click');
                 }, function error(response) {

                 }
            );

            }
        }
    //post user
        $scope.savePost = function () {
            alert(CKEDITOR.instances.editor1.getData());
        }

});