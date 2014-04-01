function ParentCtrl($scope){
  $scope.foo = "Hello";
  //Emit to Parent example part 2
  $scope.$on("UPDATE_PARENT", function(event, message){
    $scope.foo = message;
    //Broadcast to Child example part 1
    $scope.$broadcast("DO_BIDDING", {
      buttonTitle : "Taken over",
      onButtonClick : function(){
        $scope.foo = "HAHA this button no longer works!";
      }
    });
  });
}

function ChildCtrl($scope){
  $scope.buttonTitle = "Update Parent";
  $scope.onButtonClick = function(){
    //Emit to Parent example part 1
    this.$emit("UPDATE_PARENT", "Updated");
  };
  //Broadcast to Child example part 2
  $scope.$on("DO_BIDDING", function(event, data){
    for(var i in data){
      $scope[i] = data[i];
    }
  });
}
