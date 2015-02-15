angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
 // Form data for the login modal
 $scope.loginData = {};

 // Create the login modal that we will use later
 $ionicModal.fromTemplateUrl('templates/login.html', {
 scope: $scope
 }).then(function(modal) {
 $scope.modal = modal;
 });

 // Triggered in the login modal to close it
 $scope.closeLogin = function() {
 $scope.modal.hide();
 $state.go('app.home');
 };

 // Open the login modal
 $scope.login = function() {
 $scope.modal.show();
 };

 // Perform the login action when the user submits the login form
 $scope.doLogin = function() {
 console.log('Doing login', $scope.loginData);
 $state.go('app.home');

 // Simulate a login delay. Remove this and replace with your login
 // code if using a login system
 $timeout(function() {
 $scope.closeLogin();
 }, 1000);
 };
 })

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('loginCtrl', function($scope, $stateParams, $state) {

	$scope.signIn = function(user) {
		console.log('Sign-In', user);
		$state.go('app.home');
	};
})

.controller('homeCtrl', function($scope, $stateParams, $state) {
	$scope.gohome = function() {
		console.log('Estoy home');
		$state.go('app.home');
	};
	$scope.golog = function() {
		console.log('Estoy en log');
		$state.go('homelogin');
	};
})


.controller('CategoryListCtrl', function ($location, $scope, Category) {
    Category.query(function (data) {
        $scope.categories = data;
    });
    $scope.insert = function (currentCategory) {
        console.log("llega ok." + currentCategory.code);
        Category.add({}, currentCategory);
        $location.path('/categories');
    };
    $scope.remove = function (currentCategory) {
        Category.remove({id: id}, {}, function (data) {
            $location.path('/');
        });
    };

})

.controller('ItemDetailCtrl', function($location, $scope, $stateParams, Item) {
   var items = Item.query({category_id: $stateParams.category_id}, function (data) {
          console.log(items);
          $scope.Category = $stateParams;
          $scope.Item = [];
         for(x=0; x<items.length; x++) {
              if (items[x].category_id == $stateParams.category_id ){
                 $scope.Item.push(items[x]);
              }
         }
           });

        $scope.update = function (currentItem) {
            Item.update({id: $scope.Item.code}, currentItem, function (data) {
                $location.path('/');
            });
        };

    })
    
.controller('ImageDetailCtrl', function($location, $scope, $stateParams, Images) {
        var images = Images.query({item_id: $stateParams.item_id}, function (data) {
          $scope.Images = [];
          for(x=0; x<images.length; x++) {
               if (images[x].item_id == $stateParams.item_id ){
                  $scope.Images.push(images[x]);
               }
          }
        });
        $scope.update = function (currentItem) {
            Item.update({id: $scope.Item.code}, currentItem, function (data) {
                $location.path('/');
            });
        };
    })

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
