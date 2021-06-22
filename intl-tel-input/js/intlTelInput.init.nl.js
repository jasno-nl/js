var telInput = $("input[title^='Tele']");
    
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
          callback(x[x.length-1]);
        });
      },
      utilsScript: "//www.jasnoshutters.nl/addons/intl-tel-input/js/utils.js"
    });
    
    var reset = function() {
      telInput.removeClass("parsley-error");
      telInput.removeClass("parsley-success");
    };
    
    // on blur: validate
    telInput.blur(function() {
      reset();
      if ($.trim(telInput.val())) {
        if (telInput.intlTelInput("isValidNumber")) {
          telInput.addClass("parsley-success");
        } else {
          telInput.addClass("parsley-error");
        }
      }
    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);