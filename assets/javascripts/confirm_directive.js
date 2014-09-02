(function(angular) {

  var
  definitions;

  definitions = [
  niConfirm
  ]; 

  angular.module('ni.Validator').directive('niConfirm', definitions);

  function niConfirm() {

    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        field: '=niConfirm'
      },
      link: confirmValidation
    }

    function confirmValidation (scope, elm, attrs, ctrl) {
      var 
      errorElement,
      isConfirm;

      elm.on('blur keyup', function() {
        var isConfirm = scope.field === ctrl.$viewValue;
        errorDecorator(!isConfirm, "Does not match.");
      });

      function errorDecorator(boolStatement, errorMessage) {
        if (boolStatement) {
          if (!errorElement) errorElement = elm.after('<p class="error">'+errorMessage+'</p>').next();
        }
        else {
          if (errorElement) {
            if (errorElement[0].innerHTML == errorMessage) {
              errorElement.remove();
              errorElement = null;
            }
          }
        }
      }
    }
  }

})(angular);
