var app = angular.module('myApp');
app.controller('menuCtrl', function ($scope, menuService) {
    $scope.menulist = [];
    $scope.selectedMenu = {};
    $scope.menuTree = [];
    $scope.mainMenu = {};
    $scope.nullparent = { id: "" };
    $scope.tosave = {};

    $scope.getList = function () {
        menuService.getList().then(function (response) {
            $scope.menulist = response;
            console.log(response);
        });
    }
    $scope.getList();

    $scope.getTree = function () {
        menuService.get().then(function (response) {
            $scope.menuTree = response;
            console.log(response);
        });
    }
    $scope.getTree();
    $scope.update = function () {
        swal({
            title: "ប្រាកដថាចង់លុបមីនុយ?",
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
                $scope.selectedMenu.parent_id = $scope.mainMenu.id;
                menuService.put($scope.selectedMenu).then(function (response) {
                    if (response != "Failed")
                        swal("ជោគជ័យ", "ទិន្នន័យបានកែប្រែ", "success")
                    else {
                        swal("បរាជ័យ", "មិនអាចកែរែបានប្បាន", "error")
                        $scope.getList();
                    }
                });

            } else {
                swal("បោះបង់", "ទិន្នន័យរក្សារទុកដដែល", "error");
            }
        });

        
    }
    $scope.delete = function (menu) {
        swal({
            title: "ប្រាកដថាចង់លុបមីនុយ?",
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
                menuService.delete(menu).then(function (response) {
                    if (response != "Failed!")
                        swal("ជោគជ័យ", "ទិន្នន័យបានលុប", "success")
                    else {
                        swal("បរាជ័យ", "មិនអាចលុបបាន", "error")
                        $scope.getList();
                    }
                });

            } else {
                swal("បោះបង់", "ទិន្នន័យរក្សារទុកដដែល", "error");
            }
        });
        
    }
    $scope.save = function () {
        try{
            if($scope.mainMenu.id!=undefined)
                $scope.tosave.parent_id = $scope.mainMenu.id;
            if($scope.selectedPage.id!=undefined)
                $scope.tosave.page_id = $scope.selectedPage.id;

            $scope.tosave.title = $scope.menuname;
            $scope.tosave.user_id = $("#user_id").val();

            menuService.post($scope.tosave).then(function (response) {
                if (response == "Failed to saved") {
                    //alert(response);
                    swal("បរាជ័យ", "មិនអាចរក្សាទុកបាន", "error")
                }
                else {
                    swal("ជោគជ័យ", "រក្សាទុកបានរួចរាល់", "success")
                    $scope.getList();
                }

            });
        } catch (e) {
            swal("បរាជ័យ", "ពត៌មានមិនត្រឹមត្រូវ", "error")
        }
        
    }
    $scope.getpages = function () {
        menuService.getpages().then(function (response) {
            $scope.pages = response;
            console.log(response);
        });
    }
    $scope.getpages();
    $scope.edit = function (menu) {
        $scope.selectedMenu = menu;
        $scope.selectedMain();
        $scope.selectPage();
        $scope.menulist.unshift($scope.nullparent);
    }
    $scope.pop = function () {
        var index = $scope.menulist.indexOf($scope.nullparent);
        if (index == 0)
            $scope.menulist.splice(index, 1);
    }
    $scope.menuFilter = function (menu) {
        return menu.id != undefined ;
    };
    
    $scope.selectedMain = function () {
        var idx = -1;
        for (var i = 0; i < $scope.menulist.length; i++) {
            if ($scope.menulist[i].id == $scope.selectedMenu.parent_id) {
                idx = i;
            }
        }
        
        $scope.mainMenu = $scope.menulist[idx];
    }
    $scope.selectPage = function () {
        var idx = -1;
        for (var i = 0; i < $scope.pages.length; i++) {
            if ($scope.pages[i].id == $scope.selectedMenu.page_id) {
                idx = i;
            }
        }
        $scope.selectedPage = $scope.pages[idx];
    }
    $scope.filterMainMenu = function (menu) {
        return (menu.id != $scope.selectedMenu.id);
    };
});