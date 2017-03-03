/// <reference path="request.js" />
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, $window, $location) {
        $scope.urlImage = "";
        getAllUserRole();
        getAllUsers();
        getAllCategories();
        getAllPosts();
        getAllPages();
        
    //get all users role
        function getAllUserRole() {
        $http({
            method: "GET",
            url: "http://localhost:55550/api/UserRole/GetAllUserRole",
        }).then(function success(response) {
            $scope.userroles = response.data;
            console.log($scope.userroles);
        }, function error(response) {

        });
        }
    //get userrole by id
        function getUserRole(id) {
            $http.get("http://localhost:55550/api/UserRole/GetUserroleById/" + id)
                .then(function success(response) {
                    alert("success");
                }, function error(response) { });
        }
    //save user role
        $scope.saveUserrole = function () {
            $http.post("http://localhost:55550/api/UserRole/PostUserrole"
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
            url: "http://localhost:55550/api/User/GetAllUsers"
        }).then(function successs(response) {
            $scope.allUsers = response.data;
            console.log($scope.allUsers);
        }, function error(response) { });
        }
    //save user
        $scope.saveUser = function () {
            $http.post("http://localhost:55550/api/User/PostUser",
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
                        $http.delete("http://localhost:55550/api/User/DeleteUserById" + userid).then(function success(response) {
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
                $http.put("http://localhost:55550/api/User/PutUser",
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
    //get categories
        function getAllCategories() {
            $http.get("http://localhost:55550/api/Category/GetAllCategories").
                then(function success(response) {
                    $scope.categories = response.data;
                   
                }, function error(response) {
                    console.log("Error" + response);
                });
      }
    //save category
        $scope.saveCat = function () {
            $http.post("http://localhost:55550/api/Category/PostCategory",
                 JSON.stringify({ "id": 0, "name": $scope.cat_name, "description": $scope.cat_des }))
              .then(function success(respones) {
                  swal("រក្សារទុក!", "ប្រភេទអត្ថបទត្រូវបានរក្សាទុក!.", "success");
                  getAllCategories();
                  $("#close").trigger('click');
                  clearCat();
              }, function error(respones) { });
        }
        $scope.saveCategory = function () {
            if ($scope.cat_header == "កែប្រែប្រភេទនៃអត្ថបទ") {
                $scope.saveEditCat($scope.cat_id);
            } else if ($scope.cat_header = "បង្កើតថ្មី") {
                $scope.saveCat();
            }
        }
    //delete category
        $scope.deleteCategory = function (id) {
            var catid = id;
            swal({
                title: "ប្រាកដថាចង់លុបប្រភេទអត្ថបទនេះ?",
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
                       $http.delete("http://localhost:55550/api/Category/DeleteCategoryByID/" + catid).then(function success(response) {
                           $scope.data = response.data.DATA;
                          
                           if ($scope.data == 0) {
                               swal("បោះបង់!", "ប្រភេទអត្ថបទត្រូវបានប្រើប្រាស់", "error");
                           } else {
                               swal("លុប!", "ប្រភេទអត្ថបទត្រូវបានលុប.", "success");
                               getAllCategories();
                           }
                          
                       });

                   } else {
                       swal("បោះបង់", "ទិន្នន័យរក្សារទុកដដែល", "error");
                   }
               });
        }
    //click add new category and set title header
        $scope.setCatHeader = function () {
            $scope.cat_header = "បង្កើតថ្មី";
        }
    //get category by id and set title header
        $scope.getCat = function (id) {
            var catid = id;
            $scope.cat_header = "កែប្រែប្រភេទនៃអត្ថបទ";
            $http.get("http://localhost:55550/api/Category/GetCategoryById/"+catid)
                .then(function success(response)
                {
                    $scope.cat_id = response.data.id;
                    $scope.cat_name = response.data.name;
                    $scope.cat_des = response.data.description;

                }, function error() { });
        }
    //save update category
        $scope.saveEditCat = function (id) {
            $http.put("http://localhost:55550/api/Category/Put",
                JSON.stringify({
                    "id": id,
                    "name": $scope.cat_name,
                    "description": $scope.cat_des
                }))
                .then(function success(response) {
                    getAllCategories();
                    swal("ជោគជ័យ", "ប្រភេទអត្ថបទត្រូវបានកែប្រែ", "success")
                    $("#close").trigger('click');
                    clearCat();
                }, function error() { });
        }
    //save post
        $scope.savePost = function () {
          var htmldata = CKEDITOR.instances.editor1.getData();
            $http.post("http://localhost:55550/api/Post/PostArticle",
               JSON.stringify({
                   "id": 0,
                   "title": $scope.title,
                   "texts": htmldata,
                   "image": $scope.urlImage,
                   "author": $scope.author,
                   "category_id": $scope.cat_id,
                   "user_id": 1
               })
              ).then(function success(response) {
                  swal("ជោគជ័យ", "អត្ថបទត្រូវបានរក្សារទុក", "success")
              }, function error(response) {
                  console.log(response);
              });
           
        }
    //get all post
        function getAllPosts(){
            $http.get("http://localhost:55550/api/Post/GetAllPosts")
                .then(function success(response) {
                    console.log(response.data);
                    $scope.posts = response.data;
                }, function error(response) {});
        }
    //delete post
        $scope.deletePost = function (id) {
            var postid = id;
            swal({
                title: "ប្រាកដថាចង់លុបអត្ថបទនេះ?",
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
                      $http.delete("http://localhost:55550/api/Post/Delete/" + postid).then(function success(response) {
                          swal("លុប!", "អត្ថបទត្រូវបានលុប", "success");
                          getAllPosts();

                      });

                  } else {
                      swal("បោះបង់", "ទិន្នន័យរក្សារទុកដដែល", "error");
                  }
              });
        }
    //edit post and redirect
        $scope.editPost = function (id) {
            $window.location.href = "/post/editPost?postId=" + id; 
        }
    //loaded  and get postid
        $scope.onload = function () {
            var currenturl = $location.absUrl();
            var id = currenturl.split("=")[1];
            $http.get("http://localhost:55550/api/Post/Get/" + id)
                .then(function success(response) {
                    $scope.postid = id;
                    $scope.title = response.data.title;
                    $scope.cate_id = response.data.cat_id+"";
                    $scope.author = response.data.author;
                    $scope.myeditor = response.data.texts;
                },
                 function error() { });
        }
    //save update post
        $scope.updatePost = function (id) {
            var htmldata = CKEDITOR.instances.myeditor.getData();
            $http.put(
                "http://localhost:55550/api/Post/Put",
                 JSON.stringify({
                     "id": id,
                    "title": $scope.title,
                    "texts": htmldata,
                    "image": $scope.urlImage,
                    "author": $scope.author,
                    "category_id": $scope.cate_id,
                    "user_id": 1
            })
               ).then(function success(response) {
                   swal("ជោគជ័យ", "អត្ថបទត្រូវបានកែប្រែថ្មី", "success")
                   $window.location.href = "/post";

               }, function error(response) {
                   console.log(response);
               });

        }
    //getUrlImage from ckeditor 
        $scope.getUrlImage = function (element) {
            $scope.urlImage = element;
        }
    //clear category fields
        function clearCat() {
            $scope.cat_name = "";
            $scope.cat_des = "";
        } 
    //create page
        $scope.createPage = function () {
            var contents = CKEDITOR.instances.editor1.getData();
             var url = "www";
             var userid = 1;
             $http.post("http://localhost:55550/api/Page/Post",
                 JSON.stringify({
                     "url": url,
                     "title":$scope.title,
                     "contents": contents,
                     "user_id": userid,
                 }))
                 .then(function success(response) {
                     swal("ជោគជ័យ", "ទំព័រត្រូវបានបង្កើត", "success")
                 }, function error(response) {

                 });
        }
    //get all page 
        function getAllPages() {
            $http.get("http://localhost:55550/api/Page/Get")
             .then(function success(response) {
                 console.log(response.data);
                 $scope.pages = response.data;
             }, function error(response) { });
        }
    //edit page and redirect
        $scope.editPage = function (id) {
            $window.location.href = "/page/editPage?page_id=" + id;
        }
    //page load and get page by id
        $scope.onpageLoad = function () {

            var currenturl = $location.absUrl();
            var id = currenturl.split("=")[1];
            $http.get("http://localhost:55550/api/Page/Get/" + id)
                .then(function success(response) {
                    $scope.pageid = id;
                    $scope.title = response.data.title;
                    $scope.contents = response.data.contents;
                },
                 function error() { });
        }
    //delete page
        $scope.deletePage = function (id) {
            swal({
                title: "ប្រាកដថាចង់លុបទំព័រនេះ?",
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
                     $http.delete("http://localhost:55550/api/Page/Delete/" + id).then(function success(response) {
                         swal("លុប!", "ទំព័រត្រូវបានលុប", "success");
                         getAllPages();

                     });

                 } else {
                     swal("បោះបង់", "ទិន្នន័យរក្សារទុកដដែល", "error");
                 }
             });
        }
    //save update page
        $scope.saveEditPage = function () {
            var contents = CKEDITOR.instances.editor1.getData();
           
            var url = "http://localhost:55550/page";
            $http.put("http://localhost:55550/api/Page/Put",
               JSON.stringify({
                   "id": $scope.pageid,
                   "url":url,
                   "title": $scope.title,
                   "contents": contents,
                   "user_id":1
               }))
               .then(function success(response) {
                  
                   swal({
                       title: "ជោគជ័យ",
                       text: "ប្រភេទអត្ថបទត្រូវបានកែប្រែ",
                       confirmButtonText: "បាទ!"
                   }, function (isConfirm) {
                       if (isConfirm) {
                           $window.location.href = "/page";
                           getAllPages();
                       }
                   });
                  
                  
               }, function error() {
                   console.log(response);
               });
           

        }
        

});