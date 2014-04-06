function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
};

angular.module('webapp', []);

angular.module('webapp').controller('test', ['$scope',  function test($scope) {
  'use strict';
}]);

angular.module('webapp').controller('ParentCtrl', ['$scope',  function ParentCtrl($scope) {
  'use strict';
  $scope.message = {
    'text': 'Hello',
    'closeable': true,
    'type': 'danger',
    'expires': 1000
  };

  $scope.buttonTitle = 'try';
  $scope.onButtonClick = function () {
    this.$emit("message", {
      message : {
        'id': generateUUID(),
        'type': $scope.message.type,
        'closeable': $scope.message.closeable,
        'text': $scope.message.text,
        'expires': $scope.message.expires
      }
    });
  };
}]);

angular.module('webapp').controller('AnotherCtrl', ['$scope', '$rootScope', function AnotherCtrl($scope, $rootScope) {
  'use strict';
  var messages = [];
  $scope.message = {};

  $rootScope.$on("message", function (event, data) {
    messages.splice(0, 0, data.message);
    $scope.messages = messages;
    if (data.message.expires) {
      setTimeout(function() {$scope.expire(data.message.id)}, data.message.expires);
    }
  });

  $scope.close = function close(itemIndex) {
    $scope.messages.splice(itemIndex, 1);
  };

  $scope.expire = function expiremessage(messageId) {
    console.log('expire', messageId);
    for (var i = 0; i < $scope.messages.length; i++) {
      if  ($scope.messages[i].id === messageId) {
        $scope.$apply($scope.close(i));
      }
    }
  };

}]);

angular.module('webapp').directive('alerts', function () {
  'use strict';
  return {
    restrict: 'EA',
    controller: 'AnotherCtrl',
    template: '<div class="alert alert-{{item.type}}" data-expires="{{item.expires}}"' +
           'ng-repeat="item in messages"' +
           'ng-class="{\'alert-dismissable\': \'item.closeable || true\'}"' +
           'role="alert">' +
           '{{item.text}}' + ' ' + '{{item.id}}' +
        '<button ng-if="item.closeable" type="button" class="close" ng-click="close($index)">' +
          '<span aria-hidden="true">&times;</span>' +
          '<span class="sr-only">Close</span>' +
        '</button>' +
      '</div>',
    replace: true
  };
});
