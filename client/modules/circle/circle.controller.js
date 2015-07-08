/**
 * @inject $scope
 * @inject Circle
 * @inject LiveSet
 * @inject createChangeStream
 * @dep ls.LiveSet
 * @dep ls.ChangeStream
 * @dep lbServices
 */

var src = new EventSource('/api/circles/subscription?_format=event-source');
var changes = createChangeStream(src);
var set;

$scope.drawing = false;
var stage = $scope.stage = {h: 600, w: 800};

Circle.find().$promise.then(function(circles) {
  set = new LiveSet(circles, changes);
  $scope.circles = set.toLiveArray();
});

$scope.draw = function(e) {
  if($scope.drawing) {
    Circle.create({
      x: e.clientX,
      y: e.clientY,
      r: Math.floor(10 * Math.random())
    });
  }
}
