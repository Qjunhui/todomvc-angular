(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!

	//1.创建模块
	//2.基于模块创建控制器
	//3.将模块和控制器作用到具体的html元素上
	//4.基于视图业务划分不同的控制器，设计数据模型

	angular.module("TodoApp", [])
		.controller("MainController", [
			'$scope',
			function ($scope) {
			$scope.title = "Todos";
			$scope.todoText = "";
			$scope.toggleAll = false;
			//过滤器===未过滤
			// $scope.todoFilter={completed:false};
			$scope.todoFilter={};

			$scope.todos = [
				{id:1,title: "吃饭", completed: false},
				{id:2,title: "睡觉", completed: true},
				{id:3,title: "打豆豆", completed: false}
			];


			// 添加
			$scope.addTodo = function () {
				if ($scope.todoText.trim() === "") {
					return;
				}
				var id=0;
				$scope.todos.forEach(function (todo) {
				todo.id>id && (id=todo.id);
				});
				$scope.todos.push({
					id:id+1,//最大id+1===或者最后一个id+1
					title: $scope.todoText,
					completed: false
				});
				$scope.todoText = "";
			};

			//删除
			$scope.destroyById = function (id) {
				var index;
				$scope.todos.forEach(function (todo, i) {
					todo.id === id && (index = i);
				});

				$scope.todos.splice(index,1);
			};


			//全选===click、model不能同名
			$scope.toggle=function () {
				$scope.todos.forEach(function (todo) {
					todo.completed=$scope.toggleAll;
				})
			};


			//删除所有完成的
			//第二种做法：将未完成的元素push到重新赋值的todos里
			$scope.clearAll=function () {
				// 不能在forEach中删除数组的多个元素（边遍历边删除）

				// $scope.todos.forEach(function (todo,index) {
				// 	todo.completed && $scope.todos.splice(index,1)
				// })

				for(var i=0;i<$scope.todos.length;i++){
				    var todo=$scope.todos[i];
					if(todo.completed) {
						$scope.todos.splice(i,1);
						i--;//在遍历中删除数组元素，使用for循环  i--
					}
				}
			}
		}])

	// 自定义过滤器
	angular.module("TodoApp")
		.filter("getUncompletedCount",function () {
			return function (input) {
				var count=0;
				input.forEach(function (todo) {
					!todo.completed && (count++)
				})
				return count;
			}
		})
})
(window.angular);
