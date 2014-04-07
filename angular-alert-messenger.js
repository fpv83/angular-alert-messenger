/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 fpv83
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * http://opensource.org/licenses/mit-license.php
 */

angular.module('alert.messenger', []);

angular.module('alert.messenger').controller('alertCTRL', ['$scope', '$rootScope', function AnotherCtrl($scope, $rootScope) {
  'use strict';
  var messages = [];
  $scope.message = {};

  $rootScope.$on("message", function (event, data) {
    data.message.id = $scope.generateId();
    messages.splice(0, 0, data.message);
    $scope.messages = messages;
    if (data.message.expires) {
      setTimeout(function () {$scope.expire(data.message.id); }, data.message.expires);
    }
  });

  $scope.$on("scopedmessage", function (event, data) {
    messages.splice(0, 0, data.message);
    $scope.messages = messages;
    if (data.message.expires) {
      setTimeout(function () {$scope.expire(data.message.id); }, data.message.expires);
    }
  });

  $scope.close = function close(itemIndex) {
    $scope.messages.splice(itemIndex, 1);
  };

  $scope.expire = function expiremessage(messageId) {
    for (var i = 0; i < $scope.messages.length; i++) {
      if  ($scope.messages[i].id === messageId) {
        $scope.$apply($scope.close(i));
      }
    }
  };

  $scope.generateId = function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
  };

}]);

angular.module('alert.messenger').directive('alerts', function () {
  'use strict';
  return {
    restrict: 'EA',
    controller: 'alertCTRL',
    template:
      '<div class="alert alert-{{item.type}}" data-expires="{{item.expires}}"' +
           'ng-repeat="item in messages"' +
           'ng-class="{\'alert-dismissable\': \'item.closeable || true\'}"' +
           'role="alert">' +
        '<button ng-if="item.closeable" type="button" class="close" ng-click="close($index)">' +
          '<span aria-hidden="true">&times;</span>' +
          '<span class="sr-only">Close</span>' +
        '</button>' +
        '{{item.text}}' +
      '</div>',
    replace: true
  };
});
