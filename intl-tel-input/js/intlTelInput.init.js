    if ($("input[title^='Tele'").length > 0) {
        var telInput = $("input[title^='Tele']");
    }
    else if ($("input[title^='Numéro'").length > 0)
    {
      var telInput = $("input[title^='Numéro']");
    }
    else if ($("input[title^='Numer'").length > 0) 
    {
      var telInput = $("input[title^='Numer']");
    }
    //input = $(".intl-tel-input.allow-dropdown"),
    var host = new URL(document.referrer).hostname,
    host = host.split('.'),
    dom = host[host.length-1],
    error = document.getElementById("tel-error"),
    referrer = '//' + new URL(document.referrer).hostname + '/addons/intl-tel-input/js/utils.js';

    telInput.intlTelInput({
      initialCountry: "auto",
      preferredCountries: ["nl", "be", "fr", "de", "at", "ch", "dk", "pl", "gb"],
      autoPlaceholder: "aggressive",
      geoIpLookup: function(callback) {
        $.get("https://freegeoip.net/json/?callback=?", function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country_code) ? resp.country_code : "";
          callback(countryCode);
        }).fail(function(resp) {
          var referrer = new URL(document.referrer).hostname,
          x = referrer.split('.');
          if ((x[x.length-1]) === 'com') {
            callback('gb');
          }
          else {
            callback(x[x.length-1]);
          }
        });
      },
      utilsScript: referrer
    });
    
    var reset = function() {
      telInput.removeClass("parsley-error");
      telInput.removeClass("parsley-success");
      var error = document.getElementById("tel-error");
      if (error !== null) {
          error.parentNode.removeChild(error);
      }      
    };

    //function validate
    function validate(){
      if ($.trim(telInput.val())) {
        if (telInput.intlTelInput("isValidNumber")) {
          telInput.addClass("parsley-success");
          var error = document.getElementById("tel-error");
          if (error !== null) {
          error.parentNode.removeChild(error);
          }
        } else {
          telInput.addClass("parsley-error");
          if (document.getElementById("tel-error") === null) {
            var input = $(".intl-tel-input.allow-dropdown");
            switch(dom) {

              case 'nl': $('<ul class="parsley-errors-list filled" id="tel-error"><li class="parsley-required">Het telefoonnummer lijkt niet juist, waarschijnlijk is het te lang. U hoeft geen +31 en voorloopnul in te voeren. Dus bijvoorbeeld 6-12345678 zal volstaan.</li></ul>').insertAfter( input );
              break;

              case 'be': $('<ul class="parsley-errors-list filled" id="tel-error"><li class="parsley-required">Het telefoonnummer lijkt niet juist, waarschijnlijk is het te lang. U hoeft geen +32 en voorloopnul in te voeren. Dus bijvoorbeeld 0470 12 34 56 zal volstaan.</li></ul>').insertAfter( input );
              break;

              case 'fr': $("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Le numéro de téléphone ne semble pas correctement, il est probablement trop long. Vous n'êtes pas obligé d'entrer un zéro et +33. Ainsi, par exemple 06 12 34 56 78 suffit.</li></ul>").insertAfter( input );
              break;

              case 'de': $("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Die Telefonnummer scheint nicht richtig. Es ist wahrscheinlich zu lang. Sie soll keine Null und +49 eingeben. Zum Beispiel, 01512 3456789 ist ausreichend.</li></ul>").insertAfter( input );
              break;

              case 'at': $("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Die Telefonnummer scheint nicht richtig. Es ist wahrscheinlich zu lang. Sie soll keine Null und +43 eingeben. Zum Beispiel, 0664 123456 ist ausreichend.</li></ul>").insertAfter( input );
              break;

              case 'ch': $("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Die Telefonnummer scheint nicht richtig. Es ist wahrscheinlich zu lang. Sie soll keine Null und +41 eingeben. Zum Beispiel, 078 123 45 67 ist ausreichend.</li></ul>").insertAfter( input );
              break;

              case 'dk': $("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Telefonnummeret er forkert. Det er sandsynligvis for lang. Du behøver ikke at indtaste et nul og +45. For eksempel, 20 12 34 56 er tilstrækkelig.</li></ul>").insertAfter( input );
              break;

              case 'pl': $("<ul class='parsley-errors-list filled' id='tel-error'><li class='parsley-required'>Podany numer telefonu jest nieprawidłowy. Jest to prawdopodobnie zbyt długo. Nie musisz wpisać zero i +48. Na przykład, 512 345 678 jest wystarczająca.</li></ul>").insertAfter( input );
              break;

              default: $('<ul class="parsley-errors-list filled" id="tel-error"><li class="parsley-required">The phone number seems incorrect, please adjust accordingly.</li></ul>').insertAfter( input );
            }
          }
        }
      }      
    }
    
    // on blur: validate
    telInput.blur(function() {
      reset();
      validate();

    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);