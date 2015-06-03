angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
    	scope: $scope
    }).then(function (modal) {
    	$scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
    	$scope.modal.hide();
    	$state.go('app.home');
    };

    // Open the login modal
    $scope.login = function () {
    	$scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
    	console.log('Doing login', $scope.loginData);
    	$state.go('app.home');

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
        	$scope.closeLogin();
        }, 1000);
    };
})

.controller('homeCtrl', function ($scope, $state) {
	$scope.gohome = function () {
		$state.go('app.home');
	};

	$scope.golog = function () {
		$state.go('homelogin');
	};
})

.controller('CategoryListCtrl', function ($scope, $state, $stateParams, Category, Item, $ionicPopup) {
	Category.query(function (data) {
		$scope.categories = data;
		for(var i = 0; i < $scope.categories.length; i++){
			$scope.categories[i].items = 0;
			Item.query({category_id: $scope.categories[i].id}, function(items){
				if (items.length) {
					//$scope.categories[items[2].category_id-1].items = items.length;
              	};
          	});
		}
	});

	$scope.gotoaddCategory = function () {
		$state.go('app.editCategoriesAdd');
	};

	$scope.deleteCategory = function (category) {
		console.log("function deleteCategory");
		Item.query({category_id: category.id}, function (items) {
			if(items.length) {
				$ionicPopup.alert({
					title: 'The category <b>' + category.name + '</b> contains items',
					template: 'If you want, delete them previously'
				});
			}else {
				Category.delete(category);
				$ionicPopup.confirm({
					title: 'The category <b>' + category.name + '</b> will be removed',
					template: 'Are you sure?'
				});
			}
		})
	};

	$scope.updateCategory = function (category) {
		$state.go('app.editCategoriesUpdate');
	}
})

.controller('ItemDetailCtrl', function ($scope, $state, $stateParams, Item, Images, $ionicPopup) {
	$scope.items = Item.get({category_id: $stateParams.category_id});
	$scope.categoryName = $stateParams.category_name;
	
	$scope.gotoaddItem = function () {
		$state.go('app.editItemsAdd');
	};

	$scope.deleteItem = function (item) {
		console.log("function deleteitem");
		Images.query({item_id: item.id}, function (images) {
			if(images.length) {
				$ionicPopup.alert({
					title: 'The item <b>' + item.name + '</b> contains images',
					template: 'If you want, delete them previously'
				});
			}else {
				Item.delete(item);
				$ionicPopup.confirm({
					title: 'The item <b>' + item.name + '</b> will be removed',
					template: 'Are you sure?'
				});
			}
		})	
	};
})

.controller('ImageDetailCtrl', function ($scope, $stateParams, $state, RESOURCES, Images, $ionicPopup, $sce, $ionicModal) {
	$scope.itemName = $stateParams.item_name;
	$scope.itemDesc = $stateParams.item_description;
	$scope.itemId = $stateParams.item_id;
	$scope.Imagenes = [];

	$scope.Imagenes = Images.query({item_id: $stateParams.item_id});

	// code for show images in full Screen and slider
	/*Images.query({item_id: $scope.itemId}, function(images){
		for(var i=0; i<images.length; i++){
			$scope.Imagenes.push(RESOURCES.USERS_DOMAIN + images[i].uri);
		};
	});*/

	$scope.showFullscreen = function(index) {
		console.log("function showFullscreen");
		$ionicModal.fromTemplateUrl('templates/imagesFullScreen.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
			$scope.index = index;
			jQuery('.button').bind('click', function(event) {
				event.stopPropagation();
			});
		});
	};

	$scope.closeModal = function(){
		$scope.modal.remove();
	};

	$scope.backward = function(index) {
		if (index-1 >= 0) {
			$scope.index--;
		};
	}

	$scope.forward = function(index) {
		if (index+1 <= $scope.images.length-1) {
			$scope.index++;
		};
	}

	$scope.deleteImage = function (imagen) {
		Images.delete(imagen);
		$ionicPopup.confirm({
			title: 'The image <b>' + imagen.name + '</b> will be removed!',
			template: 'Are you sure?'
		});
	};
})

.controller('SelectTabCtrl', function ($scope, $state) {
	$scope.gotoEditCategories = function () {
		console.log('Estoy en EditCategories');
		$state.go('app.editCategories');
	};

	$scope.gotoEditItems = function () {
		console.log('Estoy en EditItems');
		$state.go('app.editItems');
	};

	$scope.gotoCamera = function () {
		console.log('Estoy en Camera');
		$state.go('app.uploadFromCamera');
	};

	$scope.gotoLibrary = function () {
		console.log('Estoy en Library');
		$state.go('app.uploadFromLibrary');
	};
})

.controller('AddCategoryCtrl', function ($scope, $state, $stateParams, Category, $ionicPopup) {
	$scope.category = new Category();
	
	$scope.addCategory = function () {
		if ($scope.category.name == null || $scope.category.description == null) {
			$ionicPopup.confirm({
				title: 'Action Unsuccessfull!',
				template: 'The fields can not be empty'
			});
		} else {
			$scope.category.$save(function () {
				$ionicPopup.alert({
					title: 'Action Successfull!',
					template: $scope.category.name + ' was added as new category'
				});
				$state.go('app.editCategories');
			});
		}
	};
})

.controller('UpdateCategoryCtrl', function ($scope, $state, $stateParams, Category, $ionicPopup) {
	$scope.catDetailsBefore = {};
	$scope.catDetailsBefore.name = $stateParams.name;
	$scope.catDetailsBefore.description = $stateParams.description;
	console.log($scope.catDetailsBefore);  //mostrara los parametros de la categoria a actualizar

    $scope.updateCategory = function (name, description) {
    	$scope.catDetailsAfter = {};
    	$scope.catDetailsAfter.name = name;
    	$scope.catDetailsAfter.description = description;	
    	console.log($scope.catDetailsAfter);  //mostrara los nuevos parametros a actualizar en el server

    	$ionicPopup.alert({
			title: 'Accion Successfull!',
			template: 'This category was updated with a the new name<b> ' + $scope.catDetailsAfter.name + '</b>'
		});
		$state.go('app.editCategories');

    	Category.update($scope.catDetails);

    };
})

.controller('AddItemCtrl', function ($scope, $state, $stateParams, Item, Category, $ionicPopup) {
	Category.query(function (data) {
		$scope.categories = data;
		$scope.item.category = $scope.categories[0];
	});

	$scope.item = new Item();

	$scope.addItem = function () {
		if ($scope.item.name == null || $scope.item.description == null) {
			console.log($scope.item);
			$ionicPopup.alert({
				title: 'Accion Unsuccessfull!',
				template: 'The fields can not be empty'
			});
		} else {
			$scope.item.category_id = $scope.item.category.id;
			console.log($scope.item);
			$scope.item.$save(function () {
				$ionicPopup.alert({
					title: 'Accion Successfull!',
					template: $scope.item.name + ' was added as new item'
				});
				$state.go('app.editItems');
			});
		}
	};
})

.controller('UpdateItemCtrl', function ($scope, $state, $stateParams, Category, Item, $ionicPopup) {
	$scope.itemDetails = {};
	$scope.itemDetails.name = $stateParams.name;
    $scope.itemDetails.description = $stateParams.description;

	Category.query(function (data) {
		$scope.categories = data;
		$scope.itemDetails.category = $scope.categories[0];
		console.log($scope.itemDetails);  //mostrara los parametros del item a acutalizar 
	});

    $scope.updateItem = function (name, categoryName, description) {
    	$scope.itemDetails.name = name;
    	$scope.itemDetails.category = categoryName;
    	$scope.itemDetails.description = description; 
    	console.log($scope.itemDetails);  //mostrara los nuevos parametros a actualizar en el server
		
		$ionicPopup.alert({
			title: 'Accion Successfull!',
			template: '<b>' + $scope.itemDetails.name + ' </b>was updated in the category <b>' + $scope.itemDetails.category.name + '</b>'
		});
		$state.go('app.editItems');

		Item.update($scope.itemDetails);  //comando update no permitido por el server
	};	
})

.controller("CameraCtrl", function ($scope, $cordovaCamera, $rootScope, Category) {
	$scope.takePicture = function () {
		var options = {
			quality: 75,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 100,
			targetHeight: 100,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true
		};

		$cordovaCamera.getPicture(options).then(function (imageData) {
			$scope.imgURI = "data:image/jpeg;base64," + imageData;
		}, function (err) {
            // An error occured. Show a message to the user
        });
	};
})

.controller('LoadFileCtrl', function($rootScope, $scope, $ionicPopup) {
	$scope.images = [];
	$scope.loadImage = function(){ 
		console.log("function loadimage");
		var file = $scope.myFile; //name supported by new directive
		if (file) {
			$scope.images.push(file);
			$scope.myFile = "";
			$rootScope.images = $scope.images;
			$ionicPopup.confirm({
				title: 'Image Loaded',
				template: 'Press Submit to upload'
			});
		};
	};
})

.controller('UploadCtrl', [ '$rootScope', '$scope', '$ionicPopup', 'RESOURCES', 'Category', 'Item', 'fileUpload', '$state', function($rootScope, $scope, $ionicPopup, RESOURCES, Category, Item, fileUpload, $state) {
	$scope.itemDetails = {};
	$scope.images = [];
	$scope.data = {};

	Category.query(function(data) {
		$scope.categories = data;
		$scope.data.category = $scope.categories[0];
	});

	$scope.checkAtributes = function(category){
		var submit = true;
		if ($scope.itemDetails.name == null ){
			submit = false;
		}if ($scope.itemDetails.description == null ){
			submit = false;
		}
		$scope.itemDetails.category_id = $scope.data.category.id;    
		
		if (submit) {
			$scope.addItem();
		}else{
			$scope.submitError();
		}
	};

	$scope.submitError = function(){
		$ionicPopup.alert({
			title: 'Can\'t upload',
			template: 'The fields can not be empty'
		});
	}

	$scope.addItem = function() {
		$ionicPopup.alert({
			title: 'Action Successfull',
			template: 'Image upload to category <b>'+ $scope.data.category.name + '</b>'		
		});

		Item.add({}, $scope.itemDetails); 

		$scope.upload();
		$state.go('app.upload');
	};

	$scope.upload = function(){
		console.log("function upload");
		var uploadUrl = RESOURCES.IMAGES; //config URL
		Item.query({category_id: $scope.itemDetails.category_id}, function (item){
			$scope.imageDetails = {};
			$scope.imageDetails.item_id = item[item.length-1].id;

			for(var i = 0; i < $rootScope.images.length; i++){
				var file = $rootScope.images[i];
				$scope.imageDetails.name = file.name;
				$scope.imageDetails.label = file.name;
				var image = $scope.imageDetails;
				fileUpload.uploadFileToUrl(file, uploadUrl, image);
			}
		});    
	};
}]);



