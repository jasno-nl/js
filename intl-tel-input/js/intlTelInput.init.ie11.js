$(document).ready(function() {
      if (jQuery("input[data-validator^='intlTelNumber'").length > 0) {
        var telInput = jQuery("input[data-validator^='intlTelNumber']");
        
    }
    else {
      var telInput = '0';
    }
    // else if (jQuery("input[title^='Ulica'").length > 0) 
    // {
    //   var telInput = jQuery("input[title^='Ulica']");
    // }

    function isIE () {
              var myNav = navigator.userAgent.toLowerCase();
              var dom = document.location.pathname.replace('/', '').split('_');
              if( myNav.indexOf('msie') > -1 || myNav.indexOf('.net') > -1) {
                  utilsIE = '//www.jasnoshutters.' + dom[0] + '/addons/intl-tel-input/js/utils.js';
                if (telInput !== '0') {
                      telInput.intlTelInput({
                      initialCountry: "auto",
                      preferredCountries: ["nl", "be", "fr", "de", "at", "ch", "dk", "pl", "gb"],
                      autoPlaceholder: "polite",
                      geoIpLookup: function(callback) {
                            var pathCountry = document.location.pathname.replace('/', '').split('_');
                            if ((pathCountry[0]) === 'en') {
                              callback('gb');
                            }
                            else {
                              callback(pathCountry[0]);
                            }          
                          },
                      utilsScript: utilsIE
                      });
                  }
              }
              else {
              // var host = new URL(document.referrer).hostname.split('.'),
                error = document.getElementById("tel-error"),
                
                utils = '//www.jasnoshutters.' + dom[0] + '/addons/intl-tel-input/js/utils.js';
                if (telInput !== '0') {
                telInput.intlTelInput({
                  initialCountry: "auto",
                  preferredCountries: ["nl", "be", "fr", "de", "at", "ch", "dk", "pl", "gb"],
                  autoPlaceholder: "polite",
                  geoIpLookup: function(callback) {
                      var referrer = new URL(document.referrer).hostname,
                      x = referrer.split('.');
                      if ((x[x.length-1]) === 'com') {
                        callback('gb');
                      }
                      else {
                        callback(x[x.length-1]);
                      }          
                    },
                  utilsScript: utils
                });
              }
              }
            }
    

    
    var reset = function() {
      if (telInput !== '') {
      telInput.removeClass("is-invalid parsely-error");
      telInput.removeClass("is-valid parsley-success");
      var error = document.getElementById("tel-error");
      if (error !== null) {
          error.parentNode.removeChild(error);
      }
      }      
    };

    //function validate
    function validate(){
      var dom = document.location.pathname.replace('/', '').split('_');
        if (telInput.val() !== '') {
            if (jQuery.trim(telInput.val())) {
              if (telInput.intlTelInput("isValidNumber")) {
                telInput.addClass("is-valid parsley-success");
                var error = document.getElementById("tel-error");
                if (error !== null) {
                error.parentNode.removeChild(error);
                }
              } else {
                telInput.addClass("is-invalid parsely-error");
                if (document.getElementById("tel-error") === null) {
                  var input = jQuery(".intl-tel-input.allow-dropdown");
                  switch(dom[0]) {

                    case 'nl': jQuery('<ul class="parsley-errors-list filled" id="tel-error"><li class="parsley-required">Het telefoonnummer lijkt niet juist, waarschijnlijk is het te lang. Je hoeft geen +31 en voorloopnul in te voeren. Dus bijvoorbeeld 6-12345678 zal volstaan.</li></ul>').insertAfter( input );
                    break;

                    case 'be': jQuery('<ul class="parsley-errors-list filled" id="tel-error"><li class="parsley-required">Het telefoonnummer lijkt niet juist, waarschijnlijk is het te lang. U hoeft geen +32 en voorloopnul in te voeren. Dus bijvoorbeeld 0470 12 34 56 zal volstaan.</li></ul>').insertAfter( input );
                    break;

                    case 'fr': jQuery("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Le numéro de téléphone ne semble pas correctement, il est probablement trop long. Vous n'êtes pas obligé d'entrer un zéro et +33. Ainsi, par exemple 06 12 34 56 78 suffit.</li></ul>").insertAfter( input );
                    break;

                    case 'de': jQuery("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Die Telefonnummer scheint nicht richtig. Es ist wahrscheinlich zu lang. Sie soll keine Null und +49 eingeben. Zum Beispiel, 01512 3456789 ist ausreichend.</li></ul>").insertAfter( input );
                    break;

                    case 'at': jQuery("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Die Telefonnummer scheint nicht richtig. Es ist wahrscheinlich zu lang. Sie soll keine Null und +43 eingeben. Zum Beispiel, 0664 123456 ist ausreichend.</li></ul>").insertAfter( input );
                    break;

                    case 'ch': jQuery("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Die Telefonnummer scheint nicht richtig. Es ist wahrscheinlich zu lang. Sie soll keine Null und +41 eingeben. Zum Beispiel, 078 123 45 67 ist ausreichend.</li></ul>").insertAfter( input );
                    break;

                    case 'dk': jQuery("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Telefonnummeret er forkert. Det er sandsynligvis for lang. Du behøver ikke at indtaste et nul og +45. For eksempel, 20 12 34 56 er tilstrækkelig.</li></ul>").insertAfter( input );
                    break;

                    case 'pl': jQuery("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Podany numer telefonu jest nieprawidłowy. Jest to prawdopodobnie zbyt długo. Nie musisz wpisać zero i +48. Na przykład, 512 345 678 jest wystarczająca.</li></ul>").insertAfter( input );
                    break;

                    default: jQuery('<ul class="parsley-errors-list filled" id="tel-error"><li class="parsley-required">The phone number seems incorrect, please adjust accordingly.</li></ul>').insertAfter( input );
                  }
                }
              }
            }
      }      
    }
  if (document.querySelector('[data-validator="intlTelNumber"]') !== null) {
  let tel= document.querySelector('[data-validator="intlTelNumber"]');  
  if (typeof tel !== 'undefined') {
  tel.addEventListener('keyup', () =>{ reset(); validate();});
  }
}
    isIE();
});