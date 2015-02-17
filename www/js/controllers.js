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
})

.controller('ItemDetailCtrl', function($location, $scope, $stateParams, Item) {
   Item.query({}, function (data) {
          console.log(data);
          $scope.Item = [];
         for(x=0; x<data.length; x++) {
              if (data[x].category_id == $stateParams.category_id ){
                 $scope.Item.push(data[x]);
              }
         }
           })
    })
    
.controller('ImageDetailCtrl', function($location, $scope, $stateParams, Images) {
        Images.query({}, function (data) {
          $scope.Imagenes = [];
          for(x=0; x<data.length; x++) {
               if (data[x].item_id == $stateParams.item_id ){
                  $scope.Imagenes.push(data[x]);
               }
          }
        })
        
    })

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
