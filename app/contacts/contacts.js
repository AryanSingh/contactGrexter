'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl',['$scope','$firebaseArray',function($scope,$firebaseArray){
  var ref = firebase.database().ref().child('contacts');
  $scope.contacts = $firebaseArray(ref);
  $scope.showAddForm = function(){
    $scope.addFormShow = true;
  }
  $scope.showEditForm = function(contact){
    $scope.editFormShow = true;
    $scope.id			    = contact.$id;
		$scope.name 			= contact.name;
		$scope.email 			= contact.email;
		$scope.message 			= contact.message;
		$scope.phone 		= contact.phone;
    $scope.duration_of_stay = contact.duration_of_stay;
		$scope.property_link 		= contact.property_link;
		$scope.rent_without_furniture 	= contact.rent_without_furniture;
		$scope.security_deposit_months 	= contact.security_deposit_months;
		$scope.date 			= contact.date;
		$scope.time 			= contact.time;
    $scope.acquired_through   = contact.acquired_through;
  }
  $scope.hide = function(){
    $scope.addFormShow = false;
    $scope.contactShow = false;
  }
  $scope.addFormSubmit = function(){
    console.log('submitted');
    if($scope.name){ var name = $scope.name; } else { var name = null; }
		if($scope.email){ var email = $scope.email; } else { var email = null; }
		if($scope.message){ var message = $scope.message; } else { var message = null; }
    if($scope.duration_of_stay){ var duration_of_stay = $scope.duration_of_stay;} else { var duration_of_stay = null};
		if($scope.phone){ var phone = $scope.phone; } else { var phone = null; }
		if($scope.property_link){ var property_link = $scope.property_link; } else { var property_link = null; }
		if($scope.rent_without_furniture){ var rent_without_furniture = $scope.rent_without_furniture; } else { var rent_without_furniture = null; }
		if($scope.security_deposit_months){ var security_deposit_months = $scope.security_deposit_months; } else { var security_deposit_months = null; }
		if($scope.date){ var date = $scope.date; } else { var date = null; }
		if($scope.time){ var time = $scope.time; } else { var time = null; }
    if($scope.acquiredThrough){ var acquired_through = $scope.acquiredThrough;} else { var acquired_through = "Website"; }
    if($scope.resolved){ var resolved = $scope.resolved;} else { var resolved = "Not Resolved"};

    $scope.contacts.$add({
      name:name,
      email:email,
      message: message,
      duration_of_stay: duration_of_stay,
      phone:phone,
      property_link: property_link,
      rent_without_furniture: rent_without_furniture,
      security_deposit_months: security_deposit_months,
      date: date,
      time:time,
      acquired_through:acquired_through,
      resolved:resolved
    }).then(function(ref){
      var id = ref.key;
      console.log("added contact with id:" + id);
      // console.log(ref);
      clearFields();
      $scope.addFormShow = false;
      $scope.msg = "contact added";
    })
  }
  $scope.editFormSubmit = function(){
    console.log("editing the form");
    var id = $scope.id;
    var record = $scope.contacts.$getRecord(id);
    record.name 						= $scope.name;
		record.email 						= $scope.email;
		record.message 						= $scope.message;
		record.duration_of_stay  = $scope.duration_of_stay;
    record.phone             = $scope.phone;
    record.property_link      = $scope.property_link;
    record.rent_without_furniture = $scope.rent_without_furniture;
    record.security_deposit_months = $scope.security_deposit_months;
    record.date                    = $scope.date;
    record.time                   = $scope.time;
    record.acquired_through       = $scope.acquired_through;
    record.resolved               = $scope.resolved;

    $scope.contacts.$save(record).then(function(ref){
      // console.log(ref.key);
    })
    clearFields();
    $scope.editFormShow = false;
    $scope.msg = "contact updated";
  }
  $scope.showContact = function(contact){
    // console.log("gettin contact ...");
    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.message = contact.message;
    $scope.duration_of_stay = contact.duration_of_stay;
    $scope.phone = contact.phone;
    $scope.property_link = contact.property_link;
    $scope.rent_without_furniture = contact.rent_without_furniture;
    $scope.security_deposit_months = contact.security_deposit_months;
    $scope.date = contact.date;
    $scope.time = contact.time;
    $scope.acquired_through = contact.acquired_through;
    $scope.resolved = contact.resolved;
    $scope.contactShow = true;
  }
  $scope.removeContact = function(contact){
    // console.log("removing contact");
    $scope.contacts.$remove(contact);
    // console.log("contact removed");
  }
  function clearFields(){
		console.log('Clearing All Fields...');

		$scope.name = '';
		$scope.email = '';
		$scope.message = '';
    $scope.duration_of_stay = '';
		$scope.phone = '';
    $scope.property_link = '';
    $scope.rent_without_furniture = '';
		$scope.security_deposit_months = '';
    $scope.date = '';
    $scope.time = '';
    $scope.acquired_through = '';
    $scope.resolved = '';
	}
}]);
