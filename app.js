angular.module('webapp', ['alert.messenger']);

angular.module('webapp').controller('ParentCtrl', ['$scope',  function ParentCtrl($scope) {
  'use strict';

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
      message : {
        'type': $scope.message.type,
        'closeable': $scope.message.closeable,
        'text': $scope.message.text,
        'expires': $scope.message.expires
      }
    });
  };
}]);
