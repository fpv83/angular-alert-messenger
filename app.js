angular.module('webapp', ['alert.messenger']);

angular.module('webapp').controller('ParentCtrl', ['$scope',  function ParentCtrl($scope) {
  'use strict';

  $scope.initial = function () {
    this.$emit("message", {
      'type': 'success',
      'closeable': true,
      'text': 'success',
      'expires': null
    });
    this.$emit("message", {
      'type': 'info',
      'closeable': true,
      'text': 'info',
      'expires': null
    });
    this.$emit("message", {
      'type': 'danger',
      'closeable': true,
      'text': 'danger',
      'expires': null
    });
    this.$emit("message", {
      'type': 'warning',
      'closeable': true,
      'text': 'warning',
      'expires': null
    });
  };

  $scope.initial();

  $scope.infotypes = [
    'danger',
    'info',
    'warning',
    'success'
  ];

  $scope.message = {
    'text': 'Hello',
    'closeable': true,
    'type': 'danger',
    'expires': 5000
  };

  $scope.buttonTitle = 'try it !';
  $scope.onButtonClick = function () {
    this.$emit("message", {
      'type': $scope.message.type,
      'closeable': $scope.message.closeable,
      'text': $scope.message.text,
      'expires': $scope.message.expires
    });
  };
}]);
