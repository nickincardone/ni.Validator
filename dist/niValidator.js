
// assets/javascripts/validator_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    
  ]; 

  angular.module('ni.Validator', dependencies);

})(angular);

// assets/javascripts/confirm_directive.js
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


// assets/javascripts/validator_directive.js
(function(angular) {

  var
  definitions;

  definitions = [
  niValidator
  ]; 

  angular.module('ni.Validator').directive('niValidator', definitions);

  function niValidator() {

    return {
      require: 'ngModel',
      scope: {
        validationType: '@niValidator'
      },
      link: validateInput
    };

    function validateInput(scope, elm, attrs, ctrl) {
      var errorElement;
      var validationTypes = scope.validationType.split(" ");
      elm.on('blur keyup', function() {
        for (var i in validationTypes) {
          if (validationTypes[i] === 'digits') digitsValidation();
          if (validationTypes[i] === 'text') textValidation();
          if (validationTypes[i] === 'required') requireValidation();
          if (validationTypes[i] === 'email') emailValidation();
          if (validationTypes[i] === 'password') passwordValidation();
          if (validationTypes[i] === 'url') urlValidation();
          if (validationTypes[i] === 'countryCode') countryCodeValidation();
          if (validationTypes[i] === 'phoneNumber') phoneNumberValidation();
        }
      });

      function countryCodeValidation() {
        var reCountryCode = /^\+[1-9]+\d{0,2}$/;
        ctrl.$setValidity('pcCountryCode', reCountryCode.test(ctrl.$viewValue));
        errorDecorator(ctrl.$error.pcCountryCode && ctrl.$dirty && ctrl.$viewValue, "Invalid Country Code.");
      }

      function phoneNumberValidation() {
        var rePhoneNumber = /^\d{1}[-\.\u0020\d]{6,16}$/;
        ctrl.$setValidity('pcPhoneNumber', rePhoneNumber.test(ctrl.$viewValue));
        errorDecorator(ctrl.$error.pcPhoneNumber && ctrl.$dirty && ctrl.$viewValue, "Invalid Phone Number.");
      }

      function digitsValidation() {
        ctrl.$setValidity('pcDigits', /^\d+$/.test(ctrl.$viewValue));
        errorDecorator(ctrl.$error.pcDigits && ctrl.$dirty && ctrl.$viewValue, "Must be numbers only.");
      }

      function textValidation() {
        ctrl.$setValidity('pcDigits', /^[a-zA-Z]*$/.test(ctrl.$viewValue));
        errorDecorator(ctrl.$error.pcDigits && ctrl.$dirty && ctrl.$viewValue, "Must be Letters only.");
      }

      function requireValidation() {
        ctrl.$viewValue ? ctrl.$setValidity('pcRequired', true) : ctrl.$setValidity('pcRequired', false);
        errorDecorator(ctrl.$error.pcRequired && ctrl.$dirty, 'Required.');
      }

      function emailValidation() {
        var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        ctrl.$setValidity('pcEmail', reEmail.test(ctrl.$viewValue));
        errorDecorator(ctrl.$error.pcEmail && ctrl.$dirty && ctrl.$viewValue, "Enter a Valid Email.");
      }

      function passwordValidation() {
        var rePassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/;
        var passMin = 8;
        var passMax = 20;

        ctrl.$setValidity('pcPassword', rePassword.test(ctrl.$viewValue));

        errorDecorator(ctrl.$error.pcPassword && ctrl.$dirty && ctrl.$viewValue, "Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol.)" );
        errorDecorator(ctrl.$viewValue && (ctrl.$viewValue.length < passMin || ctrl.$viewValue.length >passMax) && ctrl.$dirty, "Passwords must be between 8 and 20 characters.");
      }

      function urlValidation() {
        var reUrl = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;

        ctrl.$setValidity('pcUrl', reUrl.test(ctrl.$viewValue));
        errorDecorator(ctrl.$error.pcUrl && ctrl.$dirty && ctrl.$viewValue, 'Enter a Valid Url With http://.');
      }

      function errorDecorator(boolStatement, errorMessage) {
        if (boolStatement) {
          if (!errorElement) errorElement = elm.after('<p class="error">'+errorMessage+'</p>').next();
        }
        else if (errorElement) {
          if (errorElement[0].innerHTML == errorMessage) {
            errorElement.remove();
            errorElement = null;
          }
        }
        
      }

    }
  }
}) (angular);
