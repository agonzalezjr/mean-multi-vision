angular.module('app').controller('mvMainCtrl', function($scope) {
  $scope.courses = [
    {
      name: 'C# for sociopaths',
      featured: true,
      published: new Date('2017-07-26')
    },
    {
      name: 'Super duper expert C#',
      featured: false,
      published: new Date('2017-01-01')
    },
    {
      name: 'JavaScript for people over 20',
      featured: true,
      published: new Date('2017-12-8')
    },
    {
      name: 'Code reviews for jerks',
      featured: false,
      published: new Date('2016-04-01')
    }
  ];
});
