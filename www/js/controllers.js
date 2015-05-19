angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope : $scope
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

.controller('homeCtrl', function($scope, $state) {
	$scope.gohome = function() {
		console.log('Estoy home');
		$state.go('app.home');
	};
	$scope.golog = function() {
		console.log('Estoy en log');
		$state.go('homelogin');
	};
})

.controller('CategoryListCtrl', function($scope, $state, $stateParams, Category, $window) {
	$scope.categories = Category.query();
	$scope.gotoaddCategory = function() {
		$state.go('app.editCategoriesAdd');
	};
	$scope.deleteCategory = function(categorias) { // Delete a movie. Issues a DELETE to /api/movies/:id
      Category.delete(function() {
        $window.location.href = ''; //redirect to home
      });
  };

})

.controller('ItemDetailCtrl', function($scope, $state, $stateParams, Item) {
	$scope.items = Item.get({ category_id : $stateParams.category_id });
	$scope.categoryName = $stateParams.category_name;
	$scope.gotoaddItem = function() {
		$state.go('app.editItemsAdd');
	};
})

.controller('ImageDetailCtrl', function($scope, $stateParams, RESOURCES, Images) {
	$scope.itemName = $stateParams.item_name;
	$scope.itemDesc = $stateParams.item_description;
	$scope.itemId = $stateParams.item_id;

	$scope.Imagenes = Images.query({ item_id : $stateParams.item_id });
})

.controller('SelectTabCtrl', function($scope, $state) {
	$scope.gotoEditCategories = function() {
		console.log('Estoy en Categories');
		$state.go('app.editCategories');
	};
	$scope.gotoEditItems = function() {
		console.log('Estoy en Items');
		$state.go('app.editItems');
	};
})

.controller('AddCategoryCtrl', function($scope, $state, $stateParams, Category, $ionicPopup, $timeout) {
	$scope.category = new Category();
	$scope.addCategory = function() {
    	$scope.category.$save(function() {
      		$state.go('app.editCategories');console.log("de vuelta");
    	}
    	);
		var alertPopup = $ionicPopup.alert({
     		title: 'Accion Successfull!',
     		template: $scope.category.name + ' was added as new category'
   		});
  	};
})

.controller('UpdateCategoryCtrl', function($scope, $state, $stateParams, Category/*, $ionicPopup, $timeout*/) {
	console.log("estoy en update");
	$scope.updateCategory = function() { //create a new movie. Issues a POST to /api/movies
    	$scope.category.$update(function() {
      		$state.go('app.editCategories');console.log("de vuelta otra vez"); // on success go back to home i.e. movies state.
    	});
    	/*$scope.loadCategory = function() { //Issues a GET request to /api/movies/:id to get a movie to update
    		$scope.category = Category.get({ id: $stateParams.category_id });
  		};
  		$scope.loadCategory(); // Load a movie which can be edited on UI


		var alertPopup = $ionicPopup.alert({
     		title: 'Accion Successfull!',
     		template: 'New category was uploaded'
   		});*/
  	};
})

.controller('AddItemCtrl', function($scope, $state, $stateParams, Item, Category, $ionicPopup, $timeout) {
	Category.query(function(data) {
    $scope.categories = data;
    $scope.data.category = $scope.categories[$scope.categories.length-1];
  });

	$scope.item = new Item();
	$scope.addItem = function() {
    	$scope.itemDetails.category_id = $scope.data.category.id;
    	Item.add({}, $scope.itemDetails);
    	
		var alertPopup = $ionicPopup.alert({
     		title: 'Accion Successfull!',
     		template: 'New item was added'
   		});
   		$state.go('app.editCategories');
  	};
})



/*

.controller('AddItemCtrl', [ '$rootScope', '$scope', '$cordovaCamera', '$cordovaFile', '$cordovaCapture', '$ionicPopup', 'RESOURCES', 'Category', 'Item', function($rootScope, $scope, $cordovaCamera, $cordovaFile, $cordovaCapture, $ionicPopup, RESOURCES, Category, Item) {
  $scope.itemDetails = {};
  $scope.categoryDetails = {};
  $scope.images = [];
  $scope.data = {};



  Category.query(function(data) {
    $scope.categories = data;
    $scope.data.category = $scope.categories[$scope.categories.length-1];
  });

  $scope.addItem = function(category){
    var noSubmit = false;
    if ($scope.itemDetails.name == "" || !angular.isString($scope.itemDetails.name)){
      noSubmit = true;
    }if ($scope.itemDetails.description == "" || !angular.isString($scope.itemDetails.description)){
      noSubmit = true;
    }
    $scope.itemDetails.category_id = $scope.data.category.id;    
    $scope.itemDetails.video = $scope.videoURL;
    if (!noSubmit) {
      $scope.showConfirmItem();
    }else{
     
    }
  }

  $scope.showConfirmItem = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Item: <b>'+$scope.itemDetails.name+'</b>',
      template: 'Are you sure you want upload it in the category <b>'+$scope.data.category.name+'</b>?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
        Item.add({}, $scope.itemDetails);
        $scope.uploadFile();
      } else {
        console.log('You are not sure');
      }
    });
  };
/*
  $scope.uploadFile = function(){
    var uploadUrl = RESOURCES.IMAGES; //config URL
    Item.query({category_id: $scope.itemDetails.category_id}, function(items){
      $scope.imageDetails = {};
      $scope.imageDetails.item_id = items[items.length-1].id;
      for(var i = 0; i < $rootScope.images.length; i++){
        var file = $rootScope.images[i];
        $scope.imageDetails.name = $scope.imageDetails.label = file.name;
        var image = $scope.imageDetails;
        //console.log('file is ' + file +'-' +JSON.stringify(file) + "  @"+uploadUrl);
        fileUpload.uploadFileToUrl(file, uploadUrl, image);
      }
    });    
  };
}])*/


























.controller('PlaylistCtrl', function($scope, $stateParams) {
});


