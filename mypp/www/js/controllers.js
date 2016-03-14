angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicLoading, $timeout) {
   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Wait 3 second...'
      });
      $timeout(function() { 
          $ionicLoading.hide(); //just change the function names
        }, 3000); //use timeout function with 3 second delay (same as backdrop)
   };
})

.controller('ChatsCtrl', function($scope, Chats, $ionicBackdrop, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.showBackdrop = function() {
        $ionicBackdrop.retain();
        $timeout(function() { 
          $ionicBackdrop.release();
        }, 3000);
  };

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.chat= [
   {id: 1},
   {id: 2},
   {id: 3},
   {id: 4}
];

$scope.moveItem = function(chat, fromIndex, toIndex) {
   $scope.chats.splice(fromIndex, 1);
   $scope.chats.splice(toIndex, 0, chat);
};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicActionSheet) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.triggerActionSheet = function() {

        // Show the action sheet
        var showActionSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Edit 1' },
                { text: 'Edit 2' }
            ],
            destructiveText: 'Delete',
            titleText: 'Action Sheet',
            cancelText: 'Cancel',
            cancel: function() {
                  // add cancel code...
            },
            buttonClicked: function(index) {
                if(index === 0) {
                    // add edit 1 code
                }
                if(index === 1) {
                    // add edit 2 code
                }
            },
            destructiveButtonClicked: function() {
                // add delete code..
            }
        });
    };
})

.controller('AccountCtrl', function($scope, $ionicPopup) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         title: 'Simple Chat',
         subTitle: 'Newsletter',
         scope: $scope,
      
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Subscribe</b>',
               type: 'button-positive',
                  onTap: function(e) {
            
                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   };
  // When button is clicked, the popup will be shown...
   $scope.showConfirm = function() {
  
      var confirmPopup = $ionicPopup.confirm({
         title: 'Exit',
         template: 'Are you sure?'
      });

      confirmPopup.then(function(res) {
         if(res) {
            console.log('Sure!');
         } else {
            console.log('Not sure!');
         }
      });
    
   };
   $scope.showAlert = function() {
  
      var alertPopup = $ionicPopup.alert({
         title: 'Error',
         template: 'Something was missing'
      });

      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };
   $scope.showPrompt = function() {
  
      var promptPopup = $ionicPopup.prompt({
         title: 'Title',
         template: 'Template text',
         inputType: 'text',
         inputPlaceholder: 'Placeholder'
      });
        
      promptPopup.then(function(res) {
         console.log(res);
      });
    
   };
})
  .controller('TestCtrl', function($scope, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
   $scope.items = [];

   $scope.noMoreItemsAvailable = false;
  
   $scope.loadMore = function() {

      $scope.items.push({ id: $scope.items.length}); 

      if ($scope.items.length == 30) {
         $scope.noMoreItemsAvailable = true;
      }

      $scope.$broadcast('scroll.infiniteScrollComplete');
   };
   $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop();
   };
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
   }
   $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
   }
})
;