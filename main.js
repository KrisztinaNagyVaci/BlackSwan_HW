var NameGame = angular.module('NameGame', []);

NameGame.controller('AppController', function($scope, $http) {
  $scope.dogs = [{"name": "Max"}, {"name": "Buddy"}, {"name": "Charlie"}, {"name": "Jack"}, {"name": "Rocky"}, {"name": "Toby"},
  {"name": "Tucker"}, {"name": "Jake"}, {"name": "Bear"}, {"name": "Duke"}, {"name": "Teddy"}, {"name": "Oliver"}, {"name": "Riley"},
  {"name": "Bailey"}, {"name": "Bentley"}, {"name": "Brutus"}, {"name": "Buster"}, {"name": "Cody"}, {"name": "Dexter"}, {"name": "Winston"},]
  $scope.message = "";
  var highscore = 0;
  $scope.dogsandscore = [];

// *******************Init process*************************

  $scope.addName = function() {
    var newDog = {
      name: $scope.newDog.name
    };
    $scope.setNameMessage(newDog);
    $scope.callScoreFunctions(newDog);
    $scope.pushDogInList(newDog);
  };

// ********************Manage scores***********************

  $scope.callScoreFunctions = function(newDog){
    var score = $scope.countScore(newDog)
    $scope.calculateHighscore(score);
    $scope.callScoresMessages(score, highscore);
  };

  $scope.countScore = function(newDog) {
    var result = 0;
    if ($scope.isInList(newDog)) {
      var list = [];
      for (var i = 0; i < newDog.name.length; i++){
        if (list.indexOf(newDog.name[i]) == -1){
          list.push(newDog.name[i]);
        };
      };
      result = list.length;
    };
    fillDogsAndScore(newDog.name, result);
    return result;
  };

  $scope.calculateHighscore = function(score){
    highscore += score;
  };

// ******************Create messages*****************************

  function setOnlistMessage(newDog){
    $scope.message = newDog + " is on the list."
  };

  function setNotOnlistMessage(newDog){
    $scope.message = newDog + " is not on the list. Try again!"
  };

  function setTotalScoreMessage(highscore){
    $scope.highscore = "Your total score is " + highscore;
  };

  function setScoreMessage(score){
    $scope.score = "Your score is " + score;
  };

  $scope.callScoresMessages = function(score, highscore){
    setScoreMessage(score);
    setTotalScoreMessage(highscore);
  };

  $scope.setNameMessage = function(newDog) {
    if ($scope.isInList(newDog)) {
      setOnlistMessage(newDog.name);
    } else {
      setNotOnlistMessage(newDog.name);
    };
  };

// *******************Manage lists********************************

  function createTwoItemsList(nameInput, scoreInput) {
    return [ { name: nameInput, score: scoreInput } ];
  };

  function fillDogsAndScore(name, score){
      if (isUniqueWord(name)){
        $scope.dogsandscore.push(createTwoItemsList(name, score));
      };
  };

  $scope.pushDogInList = function(newDog){
    $scope.dogs.push(newDog);
  };

  $scope.isInList = function(newDog) {
    var result = false;
    for (var i = 0; i < $scope.dogs.length; i++){
      if ($scope.dogs[i].name === newDog.name) {
        result = true;
      };
    };
    return result;
  };

  function isUniqueWord(name){
    var result = true;
    for (var i = 0; i < $scope.dogsandscore.length; i++) {
      if ($scope.dogsandscore[i][0].name === name ) {
        result = false;
      };
    };
    return result;
  };

});
