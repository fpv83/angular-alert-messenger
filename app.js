angular.module('webapp', []);

angular.module('webapp').controller('test', ['$scope',  function test($scope) {
  'use strict';
}]);

angular.module('webapp').controller('ParentCtrl', ['$scope',  function ParentCtrl($scope) {
  'use strict';
  $scope.message = {
    'text': 'Hello',
    'closable': true,
    'kind': 'danger',
    'expires': 1000
  };

  $scope.buttonTitle = 'try';
  $scope.onButtonClick = function () {
    console.log($scope.message.kind);
    this.$emit("message", {
      message : {
        'kind': $scope.message.kind,
        'closable': $scope.message.closable,
        'text': $scope.message.text,
        'expire': $scope.message.expires
      }
//      ,
//      onButtonClick : function () {
//        $scope.foo = "HAHA this button no longer works!";
//      }
    });
  };
}]);

angular.module('webapp').controller('AnotherCtrl', ['$scope', '$rootScope', function AnotherCtrl($scope, $rootScope) {
  'use strict';
  $scope.message = {};
  $scope.messages = [];
  $rootScope.$on("message", function (event, data) {
    console.log(data);
    $scope.messages.splice(0,0,data.message);
    $scope.message.test = data.onButtonClick;
  });
  $scope.messages.close = function close(itemIndex) {
    $scope.messages.splice(itemIndex, 1);
  };
}]);

angular.module('webapp').directive('alerts', function () {
  'use strict';
  return {
    restrict: 'EA',
    controller: 'AnotherCtrl',
    template:
      '<div class="alert" ng-repeat="item in messages track by $index" ng-class="{\'alert-{{item.kind || \'info\'}}\': true, \'alert-dismissable\': \'item.closable || true\'}" role="alert">' +
        '{{item.text}}' +
        '<button ng-if="item.closable" type="button" class="close" ng-click="messages.close($index)">' +
          '<span aria-hidden="true">&times;</span>' +
          '<span class="sr-only">Close</span>' +
        '</button>' +
      '</div>',
    replace: true
  };
});
