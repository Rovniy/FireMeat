var fire = angular.module('fire', []);

fire.controller('allPage', function ($scope, $http, $rootScope, $location) {

	//Генерация случайного числа
	$scope.userIDD = Math.floor(Math.random( ) * (999999999999 - 9999 + 1)) + 9999;

	//Оплата по умолчанию банковской картой
	$scope.paymentType = 'AC';

	$http.get('/js/database.json').then(function (response){
		$scope.tovari = response.data.data;
		$scope.base = response.data;
	});

	
	$rootScope.cartData = {}; //Корзина товаров
	$scope.allSum = 0; //Общая сумма товаров в корзине
	$scope.allMass = 0; //Общая масса товаров в корзине
	console.log('Корзина:', $rootScope.cartData);

	$scope.hideTable = Object.keys($rootScope.cartData).length;

	//Добавление товаров в корзину
	$scope.addToCart = function (id) {
		//Поиск по базе
		$scope.tovari.forEach(function(f){
			if (f.id == id) {
				$scope.itemData = f;
			}
		});
		//Добавление в корзину и фильтрация
		if ('item'+id in $rootScope.cartData) {
			console.log('Товар уже в корзине');
		} else {
			$rootScope.cartData['item' + id] = {
				"id": id,
				"count": 1,
				"name" : $scope.itemData.name,
				"decs": $scope.itemData.decs,
				"cost": $scope.itemData.cost,
				"mass": $scope.itemData.mass
			};
			console.log('Корзина:', $rootScope.cartData);
			$scope.allSum = $scope.allSum + $rootScope.cartData['item' + id].cost;
			$scope.allMass = $scope.allMass + $rootScope.cartData['item' + id].mass;
		}
		$scope.hideTable = Object.keys($rootScope.cartData).length;
	};

	$scope.ifsearchInCart = function(id){
		if ('item'+id in $rootScope.cartData) {
			return true;
		}
	}

	//Удаление из корзины товаров
	$scope.removeFromCart = function (id) {
		$scope.allSum = $scope.allSum - $rootScope.cartData['item' + id].cost * $rootScope.cartData['item' + id].count;
		$scope.allMass = $scope.allMass - $rootScope.cartData['item' + id].mass * $rootScope.cartData['item' + id].count;
		delete $rootScope.cartData['item' + id];
		console.log('Корзина:', $rootScope.cartData);
		$scope.hideTable = Object.keys($rootScope.cartData).length;
		if ($scope.hideTable == 0) {
			$scope.radio = "";
		}
	};

	//Изменение количества товара в корзине
	$scope.countColl = function(event, id) {
		if (event == "plus") {
			$rootScope.cartData['item' + id].count++;
			$scope.allSum = $scope.allSum + $rootScope.cartData['item' + id].cost;
			$scope.allMass = $scope.allMass + $rootScope.cartData['item' + id].mass;
		}
		if (event == "minus") {
			if ($rootScope.cartData['item' + id].count > 1) {
				$rootScope.cartData['item' + id].count--;
				$scope.allSum = $scope.allSum - $rootScope.cartData['item' + id].cost;
				$scope.allMass = $scope.allMass - $rootScope.cartData['item' + id].mass;
			}
		}
	};

	//Отправка письма на почту
	$scope.confirmAll = function(key) {
		$scope.postData = {};
		$scope.postData.rows = [];
		angular.forEach($rootScope.cartData, function(value) {
			$scope.postData.rows.push(value);
		});
		$scope.postData.allcost = $scope.allSum;
		$scope.postData.userIDD = $scope.userIDD;
		$scope.postData.allmass = $scope.allMass;
		$scope.postData.phone = $scope.phone || 'не указан';
		$scope.postData.allmoney = 'Наличный расчет';
		$scope.postData.message = $scope.messega;
		$scope.postData.address = 'Адрес: ' + $scope.street + ', дом: ' + $scope.home + ', подъезд:' + $scope.doors + ', этаж: ' + $scope.floor + ', квартира: ' + $scope.homeNumber;
		console.log('postData', $scope.postData);
		$scope.dataPhp = "mail.php?f="+JSON.stringify($scope.postData);
		$http.get($scope.dataPhp).then(function(response) {
			$scope.allSuccess = true;
			console.log('ok', response);
		}, function(response) {
			$scope.allError = true;
			console.log('error', response);
		});
		if (key !== 'card') {
			$('#myModal').modal('hide');
			$('#successModal').modal('show');
			$scope.postData = {};
			$rootScope.cartData = {};
			$scope.hideTable = Object.keys($rootScope.cartData).length;
			$scope.messega = '';
			$scope.phone = '';
			$scope.street = '';
			$scope.home = '';
			$scope.doors = '';
			$scope.floor = '';
			$scope.homeNumber = '';

		}
	};

});

$(document).ready(function ($) {
	//Плавный переход по якорям
	$("a.ancLinks").click(function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html,body').animate({scrollTop: destination}, 500);
		return false;
	});

	//Переадрессация на мобильную версию
	if (device.mobile()) {
		window.location.href = 'http://м.' + window.location.host;
	}

	//Переадрессация на мобильную версию
	if (device.tablet()) {
		window.location.href = 'http://м.' + window.location.host;
	}

	//Интервал смены баннеров в хедере
	$('.carousel').carousel({
		interval: 4000
	});
});