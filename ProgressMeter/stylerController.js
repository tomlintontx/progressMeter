mod.controller('stylerController', ['$scope',
    function ($scope) {

        /**
         * variables
         */


        /**
         * watches
         */
       
        $scope.$watch('widget', function (val) {

            $scope.model = $$get($scope, 'widget.style');
        });

        $scope.getValues = function () {
            $scope.model.prefix = document.getElementById("prefixValue").value;
            $scope.model.postfix = document.getElementById("postfixValue").value;
            _.defer(function () {
                $scope.$root.widget.redraw();
            });
        };
        /**
         * public methods
         */
        
    }
]);