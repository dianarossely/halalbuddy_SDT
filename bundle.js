/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module and put it into the cache
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object __webpack_modules__
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var app = angular.module('app', ['ngRoute']);

	__webpack_require__(1);

	angular.module('app').filter('startFrom', function() {
	    return function(input, start) {
	        start = +start; //parse to int
	        return input.slice(start);
	    }
	});

	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);

	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);

	app.run(function ($rootScope) {
	    // init test
	});

	app.config(['$routeProvider', function($routeProvider) {
	    $routeProvider

	    .when('/ingredients', {
	        template: '<dashboard display="ingredients"></dashboard>'
	    })

	    .when('/ingredients/:ingredientId', {
	        template: function (params) {
	            return ('<dashboard display="ingredient" ingredient-id="' + params.ingredientId + '"></dashboard>');
	        }
	    })

	    .when('/articles', {
	        template: '<dashboard display="articles"></dashboard>'
	    })

	    .when('/articles/:articleId', {
	        template: function (params) {
	            return ('<dashboard display="articleEditor" article-id="' + params.articleId + '"></dashboard>');
	        }
	    })

	    .otherwise({
	        redirectTo: '/ingredients'
	    });
	}]);

/***/ },
/* 1 */
/***/ function(module, exports) {

angular.module('app').factory('Ingredients', function () {
	var SERVER_URL = 'http://api.halalbuddy.me';
	var SERVER_API_KEY = 'h4l4lbuddys3rv3r4p1k3y';
	var _ingredients = [];

	return {
			get: function (filter, callback) {
					async.waterfall([
							function (callback) {
									if (_ingredients.length > 0) {
											callback(null, _ingredients);
									} else {
											$.ajax({
													type: 'GET',
													url: SERVER_URL + '/core/collections/ingredients',
													beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
													dataType: 'json',
													success: function (result) {
															if (result && result.success) {
																	_ingredients = result.data;
																	callback(null, _ingredients);
															} else {
																	callback(result.error);
															}
													},
													error: function () {
															callback('Server error.');
													}
											});
									}
							},

							function (ingredients, callback) {
									var filtered = _.filter(ingredients, function (item) {
											var name = item.name.toLowerCase(),
													code = item.code.toLowerCase();

											if (filter.length > 0) {
													return (name.indexOf(filter.toLowerCase()) !== -1 || code.indexOf(filter.toLowerCase()) !== -1);
											} else {
													return true;
											}
									});

									callback(null, filtered);
							}
					], function (error, ingredients) {
							callback(error, ingredients);
					});
			},

			getById: function (id, callback) {
					async.waterfall([
							function (callback) {
									if (_ingredients.length > 0) {
											callback(null, _ingredients);
									} else {
											$.ajax({
													type: 'GET',
													url: SERVER_URL + '/core/collections/ingredients',
													beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
													dataType: 'json',
													success: function (result) {
															if (result && result.success) {
																	_ingredients = result.data;
																	callback(null, _ingredients);
															} else {
																	callback(result.error);
															}
													},
													error: function () {
															callback('Server error.');
													}
											});
									}
							},

							function (ingredients, callback) {
									var filtered = _.findWhere(ingredients, { _id: id });

									if (filtered !== undefined) {
											callback(null, filtered);
									} else {
											callback('Unable to find given id.', undefined);
									}
							}
					], function (error, ingredient) {
							callback(error, ingredient);
					});
			},

			add: function (data, callback) {
					$.ajax({
							type: 'POST',
							url: SERVER_URL + '/core/collections/ingredients',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							data: data,
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											_ingredients.unshift(result.data);
											callback(null, result.data);
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			update: function (id, data, callback) {
					$.ajax({
							type: 'PUT',
							url: SERVER_URL + '/core/collections/ingredients/' + id,
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							data: data,
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											for (var i = 0; i < _ingredients.length; i++) {
													if (_ingredients[i]._id === id) {
															_ingredients[i].name = result.data.name;
															_ingredients[i].otherNames = result.data.otherNames;
															_ingredients[i].code = result.data.code;
															_ingredients[i].description = result.data.description;
															_ingredients[i].foundIn = result.data.foundIn;
															_ingredients[i].process = result.data.process;
															_ingredients[i].chemicalFormula = result.data.chemicalFormula;
															_ingredients[i].pictures = result.data.pictures;
															_ingredients[i].links = result.data.links;
															_ingredients[i].tags = result.data.tags;

															_ingredients[i].halal = result.data.halal;
															_ingredients[i].halalCosmetic = result.data.halalCosmetic;
															_ingredients[i].vegetarian = result.data.vegetarian;
															_ingredients[i].hazardousChemical = result.data.hazardousChemical;
															_ingredients[i].foodAllergen = result.data.foodAllergen;
															_ingredients[i].cosmeticAllergen = result.data.cosmeticAllergen;
															break;
													}
											}

											callback();
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			delete: function (id, callback) {
					$.ajax({
							type: 'DELETE',
							url: SERVER_URL + '/core/collections/ingredients/' + id,
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											for (var i = 0; i < _ingredients.length; i++) {
													if (_ingredients[i]._id === id) {
															_ingredients.splice(i, 1);
															break;
													}
											}

											callback();
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			release: function (callback) {
					$.ajax({
							type: 'POST',
							url: SERVER_URL + '/ingredients/release',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											callback();
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			releaseCosmetic: function (callback) {
					$.ajax({
							type: 'POST',
							url: SERVER_URL + '/beautyingredients/release',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											callback();
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			releaseVege: function (callback) {
					$.ajax({
							type: 'POST',
							url: SERVER_URL + '/vegeingredients/release',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											callback();
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			releaseHazard: function (callback) {
					$.ajax({
							type: 'POST',
							url: SERVER_URL + '/hazardingredients/release',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											callback();
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			latestVersion: function (callback) {
					$.ajax({
							type: 'GET',
							url: SERVER_URL + '/ingredients/latest/version',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											callback(null, result.data);
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			latestCosmeticVersion: function (callback) {
					$.ajax({
							type: 'GET',
							url: SERVER_URL + '/beautyingredients/latest/version',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											callback(null, result.data);
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			latestVegetarianVersion: function (callback) {
					$.ajax({
							type: 'GET',
							url: SERVER_URL + '/vegeingredients/latest/version',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											callback(null, result.data);
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			},

			latestHazardVersion: function (callback) {
					$.ajax({
							type: 'GET',
							url: SERVER_URL + '/hazardingredients/latest/version',
							beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
							dataType: 'json',
							success: function (result) {
									if (result && result.success) {
											callback(null, result.data);
									} else {
											callback(result.error);
									}
							},
							error: function () {
									callback('Server error.');
							}
					});
			}
	};
});
angular.module('app').factory('Articles', function () {
	    var SERVER_URL = 'http://api.halalbuddy.me';
	    var SERVER_API_KEY = 'h4l4lbuddys3rv3r4p1k3y';
	    var _articles = [];

	    return {
	        get: function (filter, callback) {
	            async.waterfall([
	                function (callback) {
	                    if (_articles.length > 0) {
	                        callback(null, _articles);
	                    } else {
	                        $.ajax({
	                            type: 'GET',
	                            url: SERVER_URL + '/core/collections/articles',
	                            beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
	                            dataType: 'json',
	                            success: function (result) {
	                                if (result && result.success) {
	                                    _articles = result.data;
	                                    callback(null, _articles);
	                                } else {
	                                    callback(result.error);
	                                }
	                            },
	                            error: function () {
	                                callback('Server error.');
	                            }
	                        });
	                    }
	                },

	                function (articles, callback) {
	                    var filtered = _.filter(articles, function (item) {
	                        var title = item.title.toLowerCase();

	                        if (filter.length > 0) {
	                            return (title.indexOf(filter.toLowerCase()) !== -1);
	                        } else {
	                            return true;
	                        }
	                    });

	                    callback(null, filtered);
	                }
	            ], function (error, articles) {
	                callback(error, articles);
	            });
	        },

	        getById: function (id, callback) {
	            async.waterfall([
	                function (callback) {
	                    if (_articles.length > 0) {
	                        callback(null, _articles);
	                    } else {
	                        $.ajax({
	                            type: 'GET',
	                            url: SERVER_URL + '/core/collections/articles',
	                            beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
	                            dataType: 'json',
	                            success: function (result) {
	                                if (result && result.success) {
	                                    _articles = result.data;
	                                    callback(null, _articles);
	                                } else {
	                                    callback(result.error);
	                                }
	                            },
	                            error: function () {
	                                callback('Server error.');
	                            }
	                        });
	                    }
	                },

	                function (articles, callback) {
	                    var filtered = _.findWhere(articles, { _id: id });

	                    if (filtered !== undefined) {
	                        callback(null, filtered);
	                    } else {
	                        callback('Unable to find given id.', undefined);
	                    }
	                }
	            ], function (error, article) {
	                callback(error, article);
	            });
	        },

	        add: function (data, callback) {
	            $.ajax({
	                type: 'POST',
	                url: SERVER_URL + '/core/collections/articles',
	                beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
	                data: data,
	                dataType: 'json',
	                success: function (result) {
	                    if (result && result.success) {
	                        _articles.unshift(result.data);
	                        callback(null, result.data);
	                    } else {
	                        callback(result.error);
	                    }
	                },
	                error: function () {
	                    callback('Server error.');
	                }
	            });
	        },

	        update: function (id, data, callback) {
	            $.ajax({
	                type: 'PUT',
	                url: SERVER_URL + '/core/collections/articles/' + id,
	                beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
	                data: data,
	                dataType: 'json',
	                success: function (result) {
	                    if (result && result.success) {
	                        for (var i = 0; i < _articles.length; i++) {
	                            if (_articles[i]._id === id) {
	                                _articles[i] = result.data;
	                                break;
	                            }
	                        }

	                        callback();
	                    } else {
	                        callback(result.error);
	                    }
	                },
	                error: function () {
	                    callback('Server error.');
	                }
	            });
	        },

	        delete: function (id, callback) {
	            $.ajax({
	                type: 'DELETE',
	                url: SERVER_URL + '/core/collections/articles/' + id,
	                beforeSend: function(xhr){ xhr.setRequestHeader('x-meijinjs-api-key', SERVER_API_KEY); },
	                dataType: 'json',
	                success: function (result) {
	                    if (result && result.success) {
	                        for (var i = 0; i < _articles.length; i++) {
	                            if (_articles[i]._id === id) {
	                                _articles.splice(i, 1);
	                                break;
	                            }
	                        }

	                        callback();
	                    } else {
	                        callback(result.error);
	                    }
	                },
	                error: function () {
	                    callback('Server error.');
	                }
	            });
	        }
	    };
	});
/***/ },
/* 2 */
/***/ function(module, exports) {

	angular.module('app').directive('dashboard', function () {
		return {
			restrict: 'E',
			scope: {
				display: '@',
				ingredientId: '@',
				articleId: '@'
			},
			templateUrl: 'components/dashboard.html',
			controller: function ($scope) {

			}
		};
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	angular.module('app').directive('menu', function () {
		return {
			restrict: 'E',
			scope: {
				current: '@'
			},
			templateUrl: 'components/menu.html',
			controller: function ($scope) {
				$scope.logout = function ($event) {
					alert('LOGOUT');
				};
			}
		};
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredients', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'components/ingredients.html',
			controller: function ($scope, Ingredients) {
				$scope.ingredients = [];
				$scope.filter = '';
				$scope.processing = true;

				$scope.pageLimit = 100;
				$scope.currentPage = 0;
				$scope.totalPage = 1;

				$scope.newIngredientForm = false;

				$scope.name = '';
				$scope.code = '';
				$scope.description = '';
				$scope.status = 'Mushbooh';
				$scope.halalIf = '';
				$scope.haramIf = '';

				$scope.latestVersion = 'NA';
				$scope.latestCosmeticVersion = 'NA';
				$scope.latestVegetarianVersion = 'NA';
				$scope.latestHazardVersion = 'NA';

				async.waterfall([
					function (callback) {
						$('#processingCover').show();

						Ingredients.get($scope.filter, function (error, ingredients) {
							$scope.ingredients = ingredients;
							$scope.totalPage = new Array(Math.ceil($scope.ingredients.length / $scope.pageLimit));
							$scope.currentPage = 0;

							callback(error);
						});
					},

					function (callback) {
						Ingredients.latestVersion(function (error, version) {
							$scope.latestVersion = version;
							callback(error);
						});
					},
					function (callback) {
						Ingredients.latestCosmeticVersion(function (error, version) {
							$scope.latestCosmeticVersion = version;
							callback(error);
						});
					},
					function (callback) {
						Ingredients.latestVegetarianVersion(function (error, version) {
							$scope.latestVegetarianVersion = version;
							callback(error);
						});
					},
					function (callback) {
						Ingredients.latestHazardVersion(function (error, version) {
							$scope.latestHazardVersion = version;
							callback(error);
						});
					}
				], function (error) {
					if (error) {
						alert(error);
					}

					$scope.processing = false;

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

					$('#processingCover').hide();
				});

				$scope.onFilterChange = function () {
					Ingredients.get($scope.filter, function (error, ingredients) {
						$scope.ingredients = ingredients;
						$scope.totalPage = new Array(Math.ceil($scope.ingredients.length / $scope.pageLimit));
						$scope.currentPage = 0;
						try {
							$scope.$digest();
						} catch (e) {
							// do nothing
						}
					});
				};

				$scope.showNewIngredientForm = function () {
					/** OLD IMPLEMENTATION
					$scope.name = '';
					$scope.code = '';
					$scope.description = '';
					$scope.status = 'Mushbooh';
					$scope.halalIf = '';
					$scope.haramIf = '';

					$scope.newIngredientForm = true;
					**/
					// go to ingredient editor
					window.location.href = '/#/two/ingredients/new';
				};

				$scope.new = function ($event) {
					if ($scope.name.length === 0 || $scope.description.length === 0) {
						alert('Name and description are compulsory field.');
						return;
					}

					if ($scope.code.length === 0) {
						$scope.code = 'NIL';
					}

					if ($scope.halalIf.length === 0) {
						$scope.halalIf = 'NIL';
					}

					if ($scope.haramIf.length === 0) {
						$scope.haramIf = 'NIL';
					}

					$scope.newIngredientForm = false;

					var data = {
						name: $scope.name,
						code: $scope.code,
						description: $scope.description,
						halal: {
							status: $scope.status,
							halalIf: $scope.halalIf,
							haramIf: $scope.haramIf
						}
					};

					$('#processingCover').show();

					Ingredients.add(data, function (error) {
						$('#processingCover').hide();

						if (!error) {
							alert('Successfully add new ingredient.');

							$scope.filter = '';
							$scope.onFilterChange();
						} else {
							alert(error);
						}
					});
				};

				$scope.cancel = function () {
					$scope.newIngredientForm = false;
				};

				$scope.toPage = function (page) {
					$scope.currentPage = page;
				};

				$scope.release = function ($event) {
					var confirm = prompt('Release current state of ingredients? Type "yes" to continue...');

					if (confirm && confirm === 'yes') {
						async.waterfall([
							function (callback) {
								$('#processingCover').show();

								Ingredients.release(function (error) {
									callback(error);
								});
							},

							function (callback) {
								Ingredients.latestVersion(function (error, version) {
									$scope.latestVersion = version;
									callback(error);
								});
							}
						], function (error) {
							if (error) {
								alert(error);
							}

							try {
								$scope.$digest();
							} catch (e) {
								// do nothing
							}

							$('#processingCover').hide();
						});
					} else {
						alert('Ingredients release has been canceled.');
					}
				};
		$scope.releaseCosmetic = function ($event) {
			var confirm = prompt('Release current state of ingredients? Type "yes" to continue...');

			if (confirm && confirm === 'yes') {
				async.waterfall([
					function (callback) {
						$('#processingCover').show();

						Ingredients.releaseCosmetic(function (error) {
							callback(error);
						});
					},

					function (callback) {
						Ingredients.latestCosmeticVersion(function (error, version) {
							$scope.latestCosmeticVersion = version;
							callback(error);
						});
					}
				], function (error) {
					if (error) {
						alert(error);
					}

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

					$('#processingCover').hide();
				});
			} else {
				alert('Ingredients release has been canceled.');
			}
		};

		$scope.releaseVege = function ($event) {
  		var confirm = prompt('Release current state of ingredients? Type "YES" to continue...');

  		if (confirm && confirm === 'yes') {
  			async.waterfall([
  				function (callback) {
  					$('#processingCover').show();

  					Ingredients.releaseVege(function (error) {
  						callback(error);
  					});
  				},

  				function (callback) {
  					Ingredients.latestVegetarianVersion(function (error, version) {
  						$scope.latestVegetarianVersion = version;
  						callback(error);
  					});
  				}
  			], function (error) {
  				if (error) {
  					alert(error);
  				}

  				try {
  					$scope.$digest();
  				} catch (e) {
  					// do nothing
  				}

  				$('#processingCover').hide();
  			});
  		} else {
  			alert('Vegetarian Ingredients release has been canceled.');
  		 }
  	 };
		 $scope.releaseHazard = function ($event) {
	 		var confirm = prompt('Release current state of ingredients? Type "yes" to continue...');

	 		if (confirm && confirm === 'yes') {
	 			async.waterfall([
	 				function (callback) {
	 					$('#processingCover').show();

	 					Ingredients.releaseHazard(function (error) {
	 						callback(error);
	 					});
	 				},

	 				function (callback) {
	 					Ingredients.latestHazardVersion(function (error, version) {
	 						$scope.latestHazardVersion = version;
	 						callback(error);
	 					});
	 				}
	 			], function (error) {
	 				if (error) {
	 					alert(error);
	 				}

	 				try {
	 					$scope.$digest();
	 				} catch (e) {
	 					// do nothing
	 				}

	 				$('#processingCover').hide();
	 			});
	 		} else {
	 			alert('Hazardous Chemical ingredients release has been canceled.');
	 		 }
	 	 };
	}
};
});
/***/ },
/* 5 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredientRow', function () {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				id: '@ingredientId',
				name: '@ingredientName',
				code: '@ingredientCode',
				description: '@ingredientDescription',
				status: '@ingredientStatus',
				halalIf: '@ingredientHalalIf',
				haramIf: '@ingredientHaramIf'
			},
			templateUrl: 'components/ingredient-row.html',
			controller: function ($scope, Ingredients) {
				$scope.mode = 'read';

				$scope.editInput = {
					name: $scope.name,
					code: $scope.code,
					description: $scope.description,
					status: $scope.status,
					halalIf: $scope.halalIf,
					haramIf: $scope.haramIf
				};

				$scope.edit = function ($event) {
					/** OLD IMPLEMENTATION
					$scope.mode = 'edit';
					**/
					// go to ingredient editor
					window.location.href = '/#/two/ingredients/' + $scope.id;
				};

				$scope.delete = function ($event) {
					var confirm = prompt('Type "delete" to proceed with this ingredient deletion.');

					if (confirm && confirm === 'delete') {
						$('#processingCover').show();

						Ingredients.delete($scope.id, function (error) {
							$('#processingCover').hide();

							if (!error) {
								alert('Successfully delete ingredient.');
								$($event.currentTarget).parent().parent().parent().remove();
							} else {
								alert(error);
							}
						});
					} else {
						alert('Delete ingredient has been canceled.');
					}
				};

				$scope.save = function ($event) {
					if ($scope.editInput.name.length === 0 || $scope.editInput.description.length === 0) {
						alert('Name and description are compulsory field.');
						return;
					}

					if ($scope.editInput.code.length === 0) {
						$scope.editInput.code = 'NIL';
					}

					if ($scope.editInput.halalIf.length === 0) {
						$scope.editInput.halalIf = 'NIL';
					}

					if ($scope.editInput.haramIf.length === 0) {
						$scope.editInput.haramIf = 'NIL';
					}

					var data = {
						name: $scope.editInput.name,
						code: $scope.editInput.code,
						description: $scope.editInput.description,
						halal: {
							status: $scope.editInput.status,
							halalIf: $scope.editInput.halalIf,
							haramIf: $scope.editInput.haramIf
						}
					};

					$('#processingCover').show();

					Ingredients.update($scope.id, data, function (error) {
						$('#processingCover').hide();

						if (!error) {
							alert('Successfully update existing ingredient.');
						} else {
							alert(error);
						}

						$scope.name = $scope.editInput.name;
						$scope.code = $scope.editInput.code;
						$scope.description = $scope.editInput.description;
						$scope.status = $scope.editInput.status;
						$scope.halalIf = $scope.editInput.halalIf;
						$scope.haramIf = $scope.editInput.haramIf;

						$scope.mode = 'read';

						try {
							$scope.$digest();
						} catch (e) {
							// do nothing
						}
					});
				};

				$scope.cancel = function ($event) {
					if (confirm('Discard all changes?')) {
						$scope.editInput = {
							name: $scope.name,
							code: $scope.code,
							description: $scope.description,
							status: $scope.status,
							halalIf: $scope.halalIf,
							haramIf: $scope.haramIf
						};

						$scope.mode = 'read';
					}
				};
			}
		};
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	angular.module('app').directive('articles', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'components/articles.html',
			controller: function ($scope, Articles) {
				$scope.articles = [];
				$scope.filter = '';
				$scope.processing = false;

				$scope.pageLimit = 100;
				$scope.currentPage = 0;
				$scope.totalPage = 1;

				async.waterfall([
					function (callback) {
						$('#processingCover').show();

						Articles.get($scope.filter, function (error, articles) {
							$scope.articles = articles;
							$scope.totalPage = new Array(Math.ceil($scope.articles.length / $scope.pageLimit));
							$scope.currentPage = 0;

							callback(error);
						});
					}
				], function (error) {
					if (error) {
						alert(error);
					}

					$scope.processing = false;

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

					$('#processingCover').hide();
				});

				$scope.onFilterChange = function () {
					Articles.get($scope.filter, function (error, articles) {
						$scope.articles = articles;
						$scope.totalPage = new Array(Math.ceil($scope.articles.length / $scope.pageLimit));
						$scope.currentPage = 0;
						try {
							$scope.$digest();
						} catch (e) {
							// do nothing
						}
					});
				};

				$scope.toPage = function (page) {
					$scope.currentPage = page;
				};

				$scope.edit = function ($event, articleId) {
					window.location.href = '/#/two/articles/' + articleId;
				};

				$scope.delete = function ($event, articleId) {
					var confirm = prompt('Type "delete" to proceed with this article deletion.');

					if (confirm && confirm === 'delete') {
						$('#processingCover').show();

						Articles.delete(articleId, function (error) {
							$('#processingCover').hide();

							if (!error) {
								alert('Successfully delete article.');
								$($event.currentTarget).parent().parent().remove();
							} else {
								alert(error);
							}
						});
					} else {
						alert('Delete article has been canceled.');
					}
				};
			}
		};
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	angular.module('app').directive('articleEditor', function () {
		return {
			restrict: 'E',
			scope: {
				id: '@articleId'
			},
			templateUrl: 'components/article-editor.html',
			controller: function ($scope, Articles) {
				$('#processingCover').show();

				var simplemde = new SimpleMDE();

				$scope.title = '';
				$scope.picture = '';

				async.waterfall([
					function (callback) {
						if ($scope.id !== 'new') {
							Articles.getById($scope.id, callback);
						} else {
							callback('new');
						}
					},

					function (article, callback) {
						$scope.title = article.title;
						$scope.picture = article.picture;
						simplemde.value(article.text.replace(/<br\/>/g,'\n'));

						try {
							$scope.$digest();
						} catch (e) {
							// do nothing
						}

						callback();
					}
				], function (error, article) {
					$('#processingCover').hide();

					if (error && error !== 'new') {
						alert(error);
						window.location.href = '/#/two/articles';
					}
				});

				$scope.save = function ($event) {
					if ($scope.title.length === 0 || $scope.picture.length === 0 || simplemde.value().length === 0) {
						alert('Title, cover picture and content are compulsory field.');
						return;
					}

					var data = {
						title: $scope.title,
						picture: $scope.picture,
						text: simplemde.value().replace(/\n/g, '<br/>')
					};

					$('#processingCover').show();

					if ($scope.id === 'new') {
						Articles.add(data, function (error, article) {
							$('#processingCover').hide();

							if (!error) {
								alert('Successfully add new article.');
								$scope.id = article._id;
							} else {
								alert(error);
							}

							try {
								$scope.$digest();
							} catch (e) {
								// do nothing
							}
						});
					} else {
						Articles.update($scope.id, data, function (error) {
							$('#processingCover').hide();

							if (!error) {
								alert('Successfully update existing article.');
							} else {
								alert(error);
							}

							try {
								$scope.$digest();
							} catch (e) {
								// do nothing
							}
						});
					}
				};

				$scope.cancel = function ($event) {
					if (confirm('Discard all changes?')) {
						window.location.href = '/#/two/articles';
					}
				};
			}
		};
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredient', function () {
		return {
			restrict: 'E',
			scope: {
				id: '@ingredientId'
			},
			templateUrl: 'components/ingredient.html',
			controller: function ($scope, Ingredients) {
				$('#processingCover').show();

				$scope.name = '';
				$scope.otherName = '';
				$scope.code = '';
				$scope.description = '';
				$scope.origin = '';
				$scope.foundIn = '';
				$scope.process = '';
				$scope.chemicalFormula = '';
				$scope.link = '';

				var _data = null;

				function _arrayToTextarea(values) {
					var ret = '';

					for (var i = 0; values && i < values.length; i++) {
						if (ret.length > 0) {
							ret += '\n';
						}
						ret += values[i];
					}

					return ret;
				}

				function _textareaToArray(text) {
					var tokens = text.split('\n'),
						ret = [];

					for (var i = 0; i < tokens.length; i++) {
						if (tokens[i].length > 0) {
							ret.push(tokens[i]);
						}
					}

					return ret;
				}

				async.waterfall([
					function (callback) {
						if ($scope.id !== 'new') {
							Ingredients.getById($scope.id, callback);
						} else {
							callback('new');
						}
					},

					function (ingredient, callback) {
						$scope.name = ingredient.name;
						$scope.otherName = _arrayToTextarea(ingredient.otherNames);
						$scope.code = ingredient.code;
						$scope.description = ingredient.description;
						$scope.origin = _arrayToTextarea(ingredient.origin);
						$scope.foundIn = _arrayToTextarea(ingredient.foundIn);
						$scope.process = _arrayToTextarea(ingredient.process);
						$scope.chemicalFormula = ingredient.chemicalFormula;
						$scope.link = _arrayToTextarea(ingredient.links);

						try {
							$scope.$digest();
						} catch (e) {
							// do nothing
						}

						// Broadcast init value event to child.
						setTimeout(function () {
							$scope.$broadcast('init', ingredient);
						}, 500);

						callback();
					}
				], function (error, ingredient) {
					$('#processingCover').hide();

					if (error && error !== 'new') {
						alert(error);
						window.location.href = '/#/two/ingredients';
					}
				});

				$scope.activeTab = function ($event) {
					var tabId = $($event.target).attr('aria-controls');

					if (tabId === undefined) {
						tabId = $($event.target).parent().attr('aria-controls');
					}

					$('.active').removeClass('active');
					$('#' + tabId).addClass('active');
				};

				$scope.$on('segmentValue', function (event, args) {
					var segment = args.segment,
						data = args.data;

					switch (segment) {
						case 'halal':
							_data.halal = {
								status: data.status,
								halalIf: data.halalIf,
								haramIf: data.haramIf,
								justifications: data.justifications,
								safetyInformation: data.safetyInformation,
								links: data.links
							};

							console.log(_data.halal);
							break;
						case 'halalCosmetic':
							_data.halalCosmetic = {
								status: data.status,
								halalIf: data.halalIf,
								haramIf: data.haramIf,
								justifications: data.justifications,
								safetyInformation: data.safetyInformation,
								links: data.links
							};
							break;
						case 'vegetarian':
							_data.vegetarian = {
								status: data.status,
								nonVegetarianStatus: data.nonVegetarianStatus,
								vegetarianStatus: data.vegetarianStatus,
								dependsStatus: data.dependsStatus,
								justifications: data.justifications,
								safetyInformation: data.safetyInformation,
								links: data.links
							};
							break;
						case 'hazardousChemical':
							_data.hazardousChemical = {
								status: {
									possibleCarcinogen: data.possibleCarcinogen,
									carcinogen: data.carcinogen,
									toxic: data.toxic,
									inflammatory: data.inflammatory,
									flammable: data.flammable,
									others: data.others,
									safe: data.safe
								},
								justifications: data.justifications,
								safetyInformation: data.safetyInformation,
								links: data.links
							};
							break;
						case 'foodAllergen':
							_data.foodAllergen = {
								status: {
									peanut: data.peanut,
									treeNut: data.treeNut,
									milk: data.milk,
									egg: data.egg,
									wheat: data.wheat,
									soy: data.soy,
									fish: data.fish,
									shellfish: data.shellfish,
									others: data.others
								},
								justifications: data.justifications,
								safetyInformation: data.safetyInformation,
								links: data.links
							};
							break;
						case 'cosmeticAllergen':
							_data.cosmeticAllergen = {
								status: {
									fragrance: data.fragrance,
									metal: data.metal,
									preservative: data.preservative,
									acid: data.acid,
									sunscreen: data.sunscreen,
									sulfate: data.sulfate,
									alcohol: data.alcohol,
									others: data.others
								},
								justifications: data.justifications,
								safetyInformation: data.safetyInformation,
								links: data.links
							};
							break;
					}

					if (_data.halal !== null && _data.halalCosmetic !== null
						&& _data.vegetarian !== null && _data.hazardousChemical !== null
						&& _data.foodAllergen !== null && _data.cosmeticAllergen !== null) {
						_saveHelper();
					}
				});

				$scope.save = function ($event) {
					$('#processingCover').show();

					_data = {
						name: $scope.name,
						otherNames: _textareaToArray($scope.otherName),
						code: $scope.code,
						description: $scope.description,
						origin: _textareaToArray($scope.origin),
						foundIn: _textareaToArray($scope.foundIn),
						process: _textareaToArray($scope.process),
						chemicalFormula: $scope.chemicalFormula,
						links: _textareaToArray($scope.link),
						halal: null,
						halalCosmetic: null,
						vegetarian: null,
						hazardousChemical: null,
						foodAllergen: null,
						cosmeticAllergen: null
					};

					$scope.$broadcast('latest');
				};

				function _saveHelper() {
					// console.log(_data);

					if ($scope.id === 'new') {
						Ingredients.add(_data, function (error, ingredient) {
							$('#processingCover').hide();

							if (!error) {
								alert('Successfully add new ingredient.');
								$scope.id = ingredient._id;
							} else {
								alert(error);
							}

							try {
								$scope.$digest();
							} catch (e) {
								// do nothing
							}

							_data = null;
						});
					} else {
						Ingredients.update($scope.id, _data, function (error) {
							$('#processingCover').hide();

							if (!error) {
								alert('Successfully update existing ingredient.');
							} else {
								alert(error);
							}

							try {
								$scope.$digest();
							} catch (e) {
								// do nothing
							}

							_data = null;
						});
					}
				}

				$scope.cancel = function ($event) {
					if (confirm('Discard all changes?')) {
						window.location.href = '/#/two/ingredients';
					}
				};
			}
		};
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredientCosmeticAllergen', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'components/ingredient-cosmetic-allergen.html',
			controller: function ($scope) {
				$scope.fragrance = false;
				$scope.metal = false;
				$scope.preservative = false;
				$scope.acid = false;
				$scope.sunscreen = false;
				$scope.sulfate = false;
				$scope.alcohol = false;
				$scope.other = '';
				$scope.justifications = [];
				$scope.safetyInformation = '';
				$scope.link = '';

				function _arrayToTextarea(values) {
					var ret = '';

					for (var i = 0; values && i < values.length; i++) {
						if (ret.length > 0) {
							ret += '\n';
						}
						ret += values[i];
					}

					return ret;
				}

				function _textareaToArray(text) {
					var tokens = text.split('\n'),
						ret = [];

					for (var i = 0; i < tokens.length; i++) {
						if (tokens[i].length > 0) {
							ret.push(tokens[i]);
						}
					}

					return ret;
				}

				$scope.$on('init', function (event, args) {
					if (args.cosmeticAllergen !== undefined) {
						$scope.fragrance = args.cosmeticAllergen.status.fragrance;
						$scope.metal = args.cosmeticAllergen.status.metal;
						$scope.preservative = args.cosmeticAllergen.status.preservative;
						$scope.acid = args.cosmeticAllergen.status.acid;
						$scope.sunscreen = args.cosmeticAllergen.status.sunscreen;
						$scope.sulfate = args.cosmeticAllergen.status.sulfate;
						$scope.alcohol = args.cosmeticAllergen.status.alcohol;
						$scope.other = _arrayToTextarea(args.cosmeticAllergen.status.others);

						for (var i = 0; i < args.cosmeticAllergen.justifications.length; i++) {
							args.cosmeticAllergen.justifications[i].link = _arrayToTextarea(args.cosmeticAllergen.justifications[i].links);
							$scope.justifications.push(args.cosmeticAllergen.justifications[i]);
						}

						$scope.safetyInformation = args.cosmeticAllergen.safetyInformation;
						$scope.link = _arrayToTextarea(args.cosmeticAllergen.links);

						$scope.$digest();
					}
				});

				$scope.$on('latest', function (event, args) {
					for (var i = 0; i < $scope.justifications.length; i++) {
						$scope.justifications[i].links = _textareaToArray($scope.justifications[i].link);
					}

					$scope.$emit('segmentValue', {
						segment: 'cosmeticAllergen',
						data: {
							fragrance: $scope.fragrance,
							metal: $scope.metal,
							preservative: $scope.preservative,
							acid: $scope.acid,
							sunscreen: $scope.sunscreen,
							sulfate: $scope.sulfate,
							alcohol: $scope.alcohol,
							others: _textareaToArray($scope.other),
							justifications: $scope.justifications,
							safetyInformation: $scope.safetyInformation,
							links: _textareaToArray($scope.link)
						}
					});
				});

				$scope.addJustification = function ($event) {
					$scope.justifications.push({
						id: Date.now(),
						status: '',
						explanation: '',
						links: [],
						link: ''
					});

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

				};

				$scope.removeJustification = function (justification) {
					$scope.justifications = _.without($scope.justifications, justification);

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}
				};
			}
		};
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredientFoodAllergen', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'components/ingredient-food-allergen.html',
			controller: function ($scope) {
				$scope.peanut = false;
				$scope.treeNut = false;
				$scope.milk = false;
				$scope.egg = false;
				$scope.wheat = false;
				$scope.soy = false;
				$scope.fish = false;
				$scope.shellfish = false;
				$scope.other = '';
				$scope.justifications = [];
				$scope.safetyInformation = '';
				$scope.link = '';

				function _arrayToTextarea(values) {
					var ret = '';

					for (var i = 0; values && i < values.length; i++) {
						if (ret.length > 0) {
							ret += '\n';
						}
						ret += values[i];
					}

					return ret;
				}

				function _textareaToArray(text) {
					var tokens = text.split('\n'),
						ret = [];

					for (var i = 0; i < tokens.length; i++) {
						if (tokens[i].length > 0) {
							ret.push(tokens[i]);
						}
					}

					return ret;
				}

				$scope.$on('init', function (event, args) {
					if (args.foodAllergen !== undefined) {
						$scope.peanut = args.foodAllergen.status.peanut;
						$scope.treeNut = args.foodAllergen.status.treeNut;
						$scope.milk = args.foodAllergen.status.milk;
						$scope.egg = args.foodAllergen.status.egg;
						$scope.wheat = args.foodAllergen.status.wheat;
						$scope.soy = args.foodAllergen.status.soy;
						$scope.fish = args.foodAllergen.status.fish;
						$scope.shellfish = args.foodAllergen.status.shellfish;
						$scope.other = _arrayToTextarea(args.foodAllergen.status.others);

						for (var i = 0; i < args.foodAllergen.justifications.length; i++) {
							args.foodAllergen.justifications[i].link = _arrayToTextarea(args.foodAllergen.justifications[i].links);
							$scope.justifications.push(args.foodAllergen.justifications[i]);
						}

						$scope.safetyInformation = args.foodAllergen.safetyInformation;
						$scope.link = _arrayToTextarea(args.foodAllergen.links);

						$scope.$digest();
					}
				});

				$scope.$on('latest', function (event, args) {
					for (var i = 0; i < $scope.justifications.length; i++) {
						$scope.justifications[i].links = _textareaToArray($scope.justifications[i].link);
					}

					$scope.$emit('segmentValue', {
						segment: 'foodAllergen',
						data: {
							peanut: $scope.peanut,
							treeNut: $scope.treeNut,
							milk: $scope.milk,
							egg: $scope.egg,
							wheat: $scope.wheat,
							soy: $scope.soy,
							fish: $scope.fish,
							shellfish: $scope.shellfish,
							others: _textareaToArray($scope.other),
							justifications: $scope.justifications,
							safetyInformation: $scope.safetyInformation,
							links: _textareaToArray($scope.link)
						}
					});
				});

				$scope.addJustification = function ($event) {
					$scope.justifications.push({
						id: Date.now(),
						status: '',
						explanation: '',
						links: [],
						link: ''
					});

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

				};

				$scope.removeJustification = function (justification) {
					$scope.justifications = _.without($scope.justifications, justification);

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}
				};
			}
		};
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredientHalalCosmetic', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'components/ingredient-halal-cosmetic.html',
			controller: function ($scope) {
				$scope.status = '';
				$scope.halalIf = '';
				$scope.haramIf = '';
				$scope.justifications = [];
				$scope.safetyInformation = '';
				$scope.link = '';

				function _arrayToTextarea(values) {
					var ret = '';

					for (var i = 0; values && i < values.length; i++) {
						if (ret.length > 0) {
							ret += '\n';
						}
						ret += values[i];
					}

					return ret;
				}

				function _textareaToArray(text) {
					var tokens = text.split('\n'),
						ret = [];

					for (var i = 0; i < tokens.length; i++) {
						if (tokens[i].length > 0) {
							ret.push(tokens[i]);
						}
					}

					return ret;
				}

				$scope.$on('init', function (event, args) {
					if (args.halalCosmetic !== undefined) {
						$scope.status = args.halalCosmetic.status;
						$scope.halalIf = args.halalCosmetic.halalIf;
						$scope.haramIf = args.halalCosmetic.haramIf;

						for (var i = 0; i < args.halalCosmetic.justifications.length; i++) {
							args.halalCosmetic.justifications[i].link = _arrayToTextarea(args.halalCosmetic.justifications[i].links);
							$scope.justifications.push(args.halalCosmetic.justifications[i]);
						}

						$scope.safetyInformation = args.halalCosmetic.safetyInformation;
						$scope.link = _arrayToTextarea(args.halalCosmetic.links);

						$scope.$digest();
					}
				});

				$scope.$on('latest', function (event, args) {
					for (var i = 0; i < $scope.justifications.length; i++) {
						$scope.justifications[i].links = _textareaToArray($scope.justifications[i].link);
					}

					$scope.$emit('segmentValue', {
						segment: 'halalCosmetic',
						data: {
							status: $scope.status,
							halalIf: $scope.halalIf,
							haramIf: $scope.haramIf,
							justifications: $scope.justifications,
							safetyInformation: $scope.safetyInformation,
							links: _textareaToArray($scope.link)
						}
					});
				});

				$scope.addJustification = function ($event) {
					$scope.justifications.push({
						id: Date.now(),
						status: '',
						explanation: '',
						links: [],
						link: ''
					});

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

				};

				$scope.removeJustification = function (justification) {
					$scope.justifications = _.without($scope.justifications, justification);

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}
				};
			}
		};
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredientHalalFood', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'components/ingredient-halal-food.html',
			controller: function ($scope) {
				$scope.status = '';
				$scope.halalIf = '';
				$scope.haramIf = '';
				$scope.justifications = [];
				$scope.safetyInformation = '';
				$scope.link = '';

				function _arrayToTextarea(values) {
					var ret = '';

					for (var i = 0; values && i < values.length; i++) {
						if (ret.length > 0) {
							ret += '\n';
						}
						ret += values[i];
					}

					return ret;
				}

				function _textareaToArray(text) {
					var tokens = text.split('\n'),
						ret = [];

					for (var i = 0; i < tokens.length; i++) {
						if (tokens[i].length > 0) {
							ret.push(tokens[i]);
						}
					}

					return ret;
				}

				$scope.$on('init', function (event, args) {
					if (args.halal !== undefined) {
						$scope.status = args.halal.status;
						$scope.halalIf = args.halal.halalIf;
						$scope.haramIf = args.halal.haramIf;

						for (var i = 0; i < args.halal.justifications.length; i++) {
							args.halal.justifications[i].link = _arrayToTextarea(args.halal.justifications[i].links);
							$scope.justifications.push(args.halal.justifications[i]);
						}

						$scope.safetyInformation = args.halal.safetyInformation;
						$scope.link = _arrayToTextarea(args.halal.links);

						$scope.$digest();
					}
				});

				$scope.$on('latest', function (event, args) {
					for (var i = 0; i < $scope.justifications.length; i++) {
						$scope.justifications[i].links = _textareaToArray($scope.justifications[i].link);
					}

					$scope.$emit('segmentValue', {
						segment: 'halal',
						data: {
							status: $scope.status,
							halalIf: $scope.halalIf,
							haramIf: $scope.haramIf,
							justifications: $scope.justifications,
							safetyInformation: $scope.safetyInformation,
							links: _textareaToArray($scope.link)
						}
					});
				});

				$scope.addJustification = function ($event) {
					$scope.justifications.push({
						id: Date.now(),
						status: '',
						explanation: '',
						links: [],
						link: ''
					});

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

				};

				$scope.removeJustification = function (justification) {
					$scope.justifications = _.without($scope.justifications, justification);

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}
				};
			}
		};
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredientHazardousChemical', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'components/ingredient-hazardous-chemical.html',
			controller: function ($scope) {
				$scope.possibleCarcinogen = false;
				$scope.carcinogen = false;
				$scope.toxic = false;
				$scope.inflammatory = false;
				$scope.flammable = false;
				$scope.safe = false;
				$scope.other = '';
				$scope.justifications = [];
				$scope.safetyInformation = '';
				$scope.link = '';

				function _arrayToTextarea(values) {
					var ret = '';

					for (var i = 0; values && i < values.length; i++) {
						if (ret.length > 0) {
							ret += '\n';
						}
						ret += values[i];
					}

					return ret;
				}

				function _textareaToArray(text) {
					var tokens = text.split('\n'),
						ret = [];

					for (var i = 0; i < tokens.length; i++) {
						if (tokens[i].length > 0) {
							ret.push(tokens[i]);
						}
					}

					return ret;
				}

				$scope.$on('init', function (event, args) {
					if (args.hazardousChemical !== undefined) {
						$scope.possibleCarcinogen = args.hazardousChemical.status.possibleCarcinogen;
						$scope.carcinogen = args.hazardousChemical.status.carcinogen;
						$scope.toxic = args.hazardousChemical.status.toxic;
						$scope.inflammatory = args.hazardousChemical.status.inflammatory;
						$scope.flammable = args.hazardousChemical.status.flammable;
						$scope.safe = args.hazardousChemical.status.safe;
						$scope.other = _arrayToTextarea(args.hazardousChemical.status.others);

						for (var i = 0; i < args.hazardousChemical.justifications.length; i++) {
							args.hazardousChemical.justifications[i].link = _arrayToTextarea(args.hazardousChemical.justifications[i].links);
							$scope.justifications.push(args.hazardousChemical.justifications[i]);
						}

						$scope.safetyInformation = args.hazardousChemical.safetyInformation;
						$scope.link = _arrayToTextarea(args.hazardousChemical.links);

						$scope.$digest();
					}
				});

				$scope.$on('latest', function (event, args) {
					for (var i = 0; i < $scope.justifications.length; i++) {
						$scope.justifications[i].links = _textareaToArray($scope.justifications[i].link);
					}

					$scope.$emit('segmentValue', {
						segment: 'hazardousChemical',
						data: {
							possibleCarcinogen: $scope.possibleCarcinogen,
							carcinogen: $scope.carcinogen,
							toxic: $scope.toxic,
							inflammatory: $scope.inflammatory,
							flammable: $scope.flammable,
							safe: $scope.safe,
							others: _textareaToArray($scope.other),
							justifications: $scope.justifications,
							safetyInformation: $scope.safetyInformation,
							links: _textareaToArray($scope.link)
						}
					});
				});

				$scope.addJustification = function ($event) {
					$scope.justifications.push({
						id: Date.now(),
						status: '',
						explanation: '',
						links: [],
						link: ''
					});

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

				};

				$scope.removeJustification = function (justification) {
					$scope.justifications = _.without($scope.justifications, justification);

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}
				};
			}
		};
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredientVegetarian', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'components/ingredient-vegetarian.html',
			controller: function ($scope) {
				$scope.status = '';
				$scope.animalProduced = false;
				$scope.dairyProduct = false;
				$scope.animalByProduct = false;
				$scope.animal = false;
				$scope.justifications = [];
				$scope.safetyInformation = '';
				$scope.link = '';
				// new
				$scope.vegan = false;
				$scope.ovo = false;
				$scope.lacto = false;
				$scope.ovolacto = false;
				$scope.synthetic = false;
				$scope.animal = false;

				function _arrayToTextarea(values) {
					var ret = '';

					for (var i = 0; values && i < values.length; i++) {
						if (ret.length > 0) {
							ret += '\n';
						}
						ret += values[i];
					}

					return ret;
				}

				function _textareaToArray(text) {
					var tokens = text.split('\n'),
						ret = [];

					for (var i = 0; i < tokens.length; i++) {
						if (tokens[i].length > 0) {
							ret.push(tokens[i]);
						}
					}

					return ret;
				}

				$scope.$on('init', function (event, args) {
					if (args.vegetarian !== undefined) {
						$scope.status = args.vegetarian.status;
						$scope.animalProduced = args.vegetarian.nonVegetarianStatus.animalProduced;
						$scope.dairyProduct = args.vegetarian.nonVegetarianStatus.dairyProduct;
						$scope.animalByProduct = args.vegetarian.nonVegetarianStatus.animalByProduct;
						$scope.animal = args.vegetarian.nonVegetarianStatus.animal;
						// new
						$scope.vegan = args.vegetarian.vegetarianStatus.vegan;
						$scope.ovo = args.vegetarian.vegetarianStatus.ovo;
						$scope.lacto = args.vegetarian.vegetarianStatus.lacto;
						$scope.ovolacto = args.vegetarian.vegetarianStatus.ovolacto;
						$scope.synthetic = args.vegetarian.dependsStatus.synthetic;
						$scope.animal = args.vegetarian.dependsStatus.animal;

						for (var i = 0; i < args.vegetarian.justifications.length; i++) {
							args.vegetarian.justifications[i].link = _arrayToTextarea(args.vegetarian.justifications[i].links);
							$scope.justifications.push(args.vegetarian.justifications[i]);
						}

						$scope.safetyInformation = args.vegetarian.safetyInformation;
						$scope.link = _arrayToTextarea(args.vegetarian.links);

						$scope.$digest();
					}
				});

				$scope.$on('latest', function (event, args) {
					for (var i = 0; i < $scope.justifications.length; i++) {
						$scope.justifications[i].links = _textareaToArray($scope.justifications[i].link);
					}

					$scope.$emit('segmentValue', {
						segment: 'vegetarian',
						data: {
							status: $scope.status,
							nonVegetarianStatus: {
								animalProduced: $scope.animalProduced,
								dairyProduct: $scope.dairyProduct,
								animalByProduct: $scope.animalByProduct,
								animal: $scope.animal
							},// new
							vegetarianStatus: {
								vegan: $scope.vegan,
								ovo: $scope.ovo,
								lacto: $scope.lacto,
								ovolacto: $scope.ovolacto
							},
							dependsStatus: {
								synthetic: $scope.synthetic,
								animal: $scope.animal
							},
							justifications: $scope.justifications,
							safetyInformation: $scope.safetyInformation,
							links: _textareaToArray($scope.link)
						}
					});
				});

				$scope.addJustification = function ($event) {
					$scope.justifications.push({
						id: Date.now(),
						status: '',
						explanation: '',
						links: [],
						link: ''
					});

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}

				};

				$scope.removeJustification = function (justification) {
					$scope.justifications = _.without($scope.justifications, justification);

					try {
						$scope.$digest();
					} catch (e) {
						// do nothing
					}
				};
			}
		};
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	angular.module('app').directive('ingredientJustification', function () {
		return {
			restrict: 'E',
			scope: {
				justification: '=',
				removeJustification: '&'
			},
			templateUrl: 'components/ingredient-justification.html',
			controller: function ($scope) {
				$scope.remove = function ($event) {
					var confirm = prompt("Remove '" + $scope.justification.status + "' justification?\nType 'yes' to proceed.", "");
					if (confirm && confirm.toLowerCase() === 'yes') {
						$scope.removeJustification({justification: $scope.justification});
					}
				};
			}
		};
	});

/***/ }
/******/ ]);
