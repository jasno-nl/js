$(document).ready(function() {
  //Creëer functie om te controleren of een element bestaat.
  $.fn.exists = function () {
    return this.length !== 0;
  };
  //Creëer functie om error message van telefoonnummer te verplaatsen
  function moveError(){
      var error = $(".intl-tel-input.allow-dropdown ul.parsley-errors-list");
      error.after("").insertAfter($(".intl-tel-input.allow-dropdown").parent());
  }
  //telefoonnummer validatie
  function telValidate(){
    var dom = document.location.pathname.replace('/', '').split('_');
    if (typeof telInput !== 'undefined') {
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
            switch(dom[0]) {

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
}
  // Wanneer er een fout in het document wordt gevonden bij inzenden, dient het loading scherm weer weggehaald te worden
  window.Parsley.on('field:error', function() { 
    $("#loading").css("display", "none");
    if ($("input[placeholder^='Ad']").next('ul').exists()) {
      jQuery("input[placeholder^='Ad']").next('ul').remove();
    }
  });

  //Verplaatsen huisnummer naar juiste plek
  if ($("input[placeholder='Nr.*']").exists()) {
      if (jQuery("input[placeholder='Nr.*']").parent().prevAll().find("input[placeholder^='Ad']").length !== 0) {
      var x = jQuery("input[placeholder='Nr.*']").parent();
      jQuery("input[placeholder^='Ad']").prependTo(x);
    } else if (jQuery("input[placeholder='Nr.*']").parent().nextAll().find("input[placeholder^='Ad']").length !== 0) {
      var y = jQuery("input[placeholder='Nr.*']").parent();
      jQuery("input[placeholder^='Ad']").appendTo(y);
    }
  }

  // Maak de DOM in orde voor de koppeling met de controle module Parsley.js  
  // Zoek naar de eerste 4 divs startend met "interest_" om deze te omringen met een element voor Parsley om de fout zichtbaar te maken en te verwijderen bij juiste invoer
  var divs = $('div[id^="interest_"]');
  for(var i = 0; i < divs.length; i+=4) {
    divs.slice(i, i+4).wrapAll("<div id='parsley-interests'></div>");
  }
  // Haal de form-group class van interesse velden af om hiermee overbodige ruimte te verwijderen
  if ($(".form-group.interest") !== '') {
    $(".form-group.interest").removeClass('form-group');
  }
  // Zoek naar vinkvelden waar de bovenliggende div elementen de class form-group bevatten en verwijder hier ook form-group ivm overbodige ruimte
  if ($(".form-group.field input[type='checkbox'][value='Ja']") !== '') {
    $(".form-group.field input[type='checkbox'][value='Ja']").parents("div.form-group.field").removeClass('form-group');
  }
  // Koppel de controle variabelen aan de interesses die gecontroleerd moeten worden
  if ($(" label:contains('JASNO ') input ") !== '') {
    $(" label:contains('JASNO ') input").attr({
    'data-parsley-multiple':"product",
    'data-parsley-mincheck':"1",
    'data-parsley-required':"true",
    'data-parsley-errors-container': "#parsley-interests",
    'data-parsley-class-handler': "#parsley-interests",
    'data-parsley-error-message': "Wählen Sie mindestens ein Produkt, das Sie gekauft haben."
    });
  }
  if ($(" label:contains(' Broschüre') input") !== '') {
    $(" label:contains(' Broschüre') input").attr({
    'data-parsley-multiple':"broschure",
    'data-parsley-mincheck':"1",
    'data-parsley-required':"true",
    'data-parsley-errors-container': "#parsley-interests",
    'data-parsley-class-handler': "#parsley-interests",
    'data-parsley-error-message': "Bitte wählen Sie mindestens ein Produkt, von dem Sie die Broschüre erhalten möchten."
    });
  }

  //Verplichten van nieuwsbrief opt-in
  if (window.location.pathname.indexOf("_nieuwsbrief") > -1) {
    var x = jQuery('input[value="Ja, nog niet bevestigd"]').parent().parent().attr('id');
    jQuery('input[value="Ja, nog niet bevestigd"]').attr({
    'data-parsley-mincheck':"1",
    'data-parsley-required':"true",
    'data-parsley-errors-container': "#" + x
    });
  }

  // Maak van 'Reden voor wijziging' op mutatie-formulier een niet selecteerbare optie, maar maak het daarmee niet ook een verplicht veld. Vrijheid voor wel/niet invullen moet bewaard blijven.
  if ($("select[title='Reden voor wijziging'] option[value='Reden voor wijziging van gegevens']").exists()) {
        $("option[value='Reden voor wijziging van gegevens']").prop('disabled', true);
        $("option[value='Reden voor wijziging van gegevens']").prop('selected', true);
  }
  // Maak van 'in de' op bel-mij-terug-formulier een niet selecteerbare optie, maar maak het daarmee niet ook een verplicht veld. Vrijheid voor wel/niet invullen moet bewaard blijven.
  if ($("select[title='tijdens/in de'] option[value='tijdens/in de']").exists()) {
        $("option[value='tijdens/in de']").prop('disabled', true);
        $("option[value='tijdens/in de']").prop('selected', true);
  }
  // Koppel de controle module Parsley.js aan het formulier
  if ($("form") !== '') {
    $("form").parsley();
  }
  //Koppel een regex patroon van acceptabele codes aan het veld voor de garantie-code
  if ($("input[placeholder='Nummer der Garantiekarte**']").exists()) {
    $("input[placeholder='Nummer der Garantiekarte**']").parsley({
    pattern: /^(JS|js|Js|jS)(\s|\s?)(12|13|14|15|16|17|18|19|20)(20|24)(\s|\s?)([0-9]{4})$/
    });
  }
  //Koppel een bericht met verduidelijking voor het veld van de garantie-code bij foutieve invoer
  if ($("input[placeholder='Nummer der Garantiekarte**']").exists()) {
    $("input[placeholder='Nummer der Garantiekarte**']").attr("data-parsley-error-message", "Der Code ist nicht korrekt. Schauen Sie sich die Karte, die mit dem Produkt geliefert wurde.");
  }
  //Koppel een regex patroon aan het veld met de dealer keuze
  if ($("select[title='Händlername']").exists()) {
    $("select[title='Händlername']").parsley({
    pattern: /(^D[0-9]{5})|(^ONBEKEND$)/
    });
  }
   //Koppel een regex patroon aan het veld 'Reden voor wijziging'.
  if ($("select[title='Reden voor wijziging']").exists() ) {
    $("select[title='Reden voor wijziging']").parsley({
    pattern: /(^Ik.*)/
    });
  }
  //Corrigeer de garantiecode na invoer voor versturen naar Copernica (haal spaties weg)
  if ($("input[placeholder='Nummer der Garantiekarte**']").exists()) {
    $("input[placeholder='Nummer der Garantiekarte**']").focusout(function(){
    $("input[placeholder='Nummer der Garantiekarte**']").attr('value',$("input[placeholder='Nummer der Garantiekarte**']").val().replace(/\s/g, ''));
    $("input[placeholder='Nummer der Garantiekarte**']").val($("input[placeholder='Nummer der Garantiekarte**']").val().replace(/\s/g, ''));
    });
  }
  //Koppel de dropdown module select2 aan de dropdowns in het formulier. Hiermee worden grote lijsten makkelijker doorzoekbaar.
  if ($(".dropdown").exists()) {
    $(".dropdown").select2();
  }
  //Maak een verborgen veld zichtbaar wanneer men heeft gekozen voor de waarde dat de dealer niet in de lijst voorkomt en koppel de controle module Parsley.js eraan
  if ($('select').exists()) {
      $('select').on('select2:select', function() {
      var x = /^ONBEKEND/,
          y = $("select[title='Händlername'] option:selected").val();

      if (x.test(y)) {
        if ($("input[data-name='Onbekende dealernaam'").exists()) {
          $("input[data-name='Onbekende dealernaam'").removeClass('hidden');
          $("input[data-name='Onbekende dealernaam'").parents("div.form-group.hidden").removeClass('hidden');
          $("input[data-name='Onbekende dealernaam'").addClass('text required');
          $("input[data-name='Onbekende dealernaam'").attr({
            'placeholder':"Händlername*",
            'type':"text"
          });
        }
      }
      else if (!x.test(y)) {
        if ($("input[data-name='Onbekende dealernaam'").exists()) {
          $("input[data-name='Onbekende dealernaam'").removeClass('text required');
          $("input[data-name='Onbekende dealernaam'").parents("div.form-group.hidden").addClass('hidden');
          $("input[data-name='Onbekende dealernaam'").addClass('hidden');
          $("input[data-name='Onbekende dealernaam'").attr('type', "hidden");  
          if ($("input[data-name='Onbekende dealernaam'").exists()) {
            $("input[data-name='Onbekende dealernaam'").parsley().validate();
          }
        }
      }
    });
  }
  //Lees de value van de nieuwsbrief interesse uit en verwerk dit naar een vinkje aan/uit op basis van gegevens uit Copernica bij het vertonen van het formulier
    if ($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").exists()) {

      if ($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").val() == "Ja, nog niet bevestigd") {
        $("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").removeAttr('checked');
      }
      else if ($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").val() == "Nee, uitgeschreven") {
          $("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").removeAttr('checked');
      }
      else if ($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").val() === "") {
          $("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").removeAttr('checked');
      }
      else if ($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").val() == "Ja, bevestigd") {
          $("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").attr('checked', 'checked');
      }
    }
    //Wanneer het formulier wordt gecontroleerd worden een aantal acties uitgevoerd
    window.Parsley.on('form:validated', function(){
      //Verplaats de error bij het telefoonnummer zodat de vlag goed blijft staan en valideer het telefoonnummer
      moveError();
      telValidate();
      //Het dealerkeuzeveld wordt gecontroleerd evenals het extra veld wanneer er voor onbekende dealer is gekozen.
      $('select').on('select2:select', function() {
        if ($("select[title='Händlername']") !== '' ) {
          $("select[title='Händlername']").parsley().validate();
        }
        if ($("input[data-name='Onbekende dealernaam'") !== '' ) {
          $("input[data-name='Onbekende dealernaam'").parsley().validate();
        }
        if ($("select[title='Reden voor wijziging']") !== '' ) {
          $("select[title='Reden voor wijziging']").parsley().validate();
        }
      });
    });  
  //Bij verzenden van het formulier wordt er ingegrepen en worden waarden van invoervelden naar verborgen velden overgezet welke in Copernica aan een ander database veld zijn gekoppeld.
  window.Parsley.on('form:submit', function (e) {
    //Laat het loading scherm zien 
    $("#loading").css("display", "block");
    if (typeof telInput !== 'undefined') {
      var telInput = $("input[title^='Tele']");
      var ok = telInput.intlTelInput("isValidNumber");
      console.log(ok);
      if (ok) {
        // Haal het nummer op en formateer het.
        telInput.val(telInput.intlTelInput("getNumber"));        
      }
      else {
        e.validationResult = false;
        $("#loading").css("display", "none");
        telInput.focus();
        return false;
      }
    }
    //Uitlezen van de invoer van de gebruiker v.w.b. het interesseveld voor de nieuwsbrief en aangepaste waarde naar Copernica toesturen
    if ($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").exists()) {

      if ($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").is(":checked") &&
        $("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").val() =='Ja, bevestigd') {}

      else if ($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").is(":checked") &&
          $("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").val() !='Ja, bevestigd') {
            $("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").val('Ja, nog niet bevestigd');
      }
      else if (!($("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").is(":checked"))) {
                $("input[data-name='Ich möchte gerne 4 x jährlich über Aktuelles informiert werden, um auf dem Laufenden zu bleiben.']").val('Nee, uitgeschreven');
      }
    }
    //Kopieer de gekozen dealernaam op basis van de dealercode naar het veld "Dealernaam" in Copernica
    if ($("select[title='Händlername'] option:selected").val() !== 'ONBEKEND' ) {
      $("input[data-name='Dealernaam']").attr('value', $("select[title='Händlername'] option:selected").text());
      $("input[data-name='Dealernaam']").text($("select[title='Händlername'] option:selected").text());
    }
    if ($("select[title='Händlername'] option:selected").val() === 'ONBEKEND' ) {
      $("input[data-name='Dealernaam']").attr('value', $("input[data-name='Onbekende dealernaam']").val());
    }
    if ($("select[title='Wählen Sie bitte Ihre Bevorzugter Händler']").exists()){
      if ($("select[title='Wählen Sie bitte Ihre Bevorzugter Händler'] option.selected").val() !== '') {
        $("input[data-name='Dealernaam']").attr('value', $("select[title='Wählen Sie bitte Ihre Bevorzugter Händler'] option:selected").text());
        $("input[data-name='Dealernaam']").text($("select[title='Wählen Sie bitte Ihre Bevorzugter Händler'] option:selected").text());
      }
    }    
    //Wanneer de interesses/gekochte producten zijn aangevinkt, worden de bijbehorende velden in Copernica van de juiste waarde voorzien.
    if ($(" label:contains('JASNO Shutters') input:checked").length > 0) {
        $("input[data-name='JASNO Shutters gekocht']").attr('value', 'Ja');
    }
    if ($(" label:contains('JASNO Blinds') input:checked").length > 0) {
        $("input[data-name='JASNO Blinds gekocht']").attr('value', 'Ja');
    }
    if ($(" label:contains('JASNO Folds') input:checked").length > 0) {
        $("input[data-name='JASNO Folds gekocht']").attr('value', 'Ja');
    }
    if ($(" label:contains('JASNO Swings') input:checked").length > 0) {
        $("input[data-name='JASNO Swings gekocht']").attr('value', 'Ja');
    }
    //Wanneer het formulier wordt gecontroleerd worden een aantal acties uitgevoerd
    window.Parsley.on('form:validated', function(){
      //Verplaats de error bij het telefoonnummer zodat de vlag goed blijft staan en valideer het telefoonnummer
      moveError();
      telValidate();
      //Het dealerkeuzeveld wordt gecontroleerd evenals het extra veld wanneer er voor onbekende dealer is gekozen.
      $('select').on('select2:select', function() {
        if ($("select[title='Händlername']") !== '' ) {
          $("select[title='Händlername']").parsley().validate();
        }
        if ($("input[data-name='Onbekende dealernaam'") !== '' ) {
          $("input[data-name='Onbekende dealernaam'").parsley().validate();
        }
        if ($("select[title='Reden voor wijziging']") !== '' ) {
          $("select[title='Reden voor wijziging']").parsley().validate();
        }
      });
      //Het datum- en tijdveld bij de showroom formulieren en inmeetafspraak formulieren worden hier gecontroleerd
      if (dpicker.exists()) {
          dpicker.on({
            set: function(){
              if ($( "input[placeholder='Ik bezoek JASNO op*']" )!== '') {
                $( "input[placeholder='Ik bezoek JASNO op*']" ).parsley().validate();
              }
            }
          });
        }
        if (tpicker.exists()) {
          tpicker.on({
            set: function(){
              if ($( "input[placeholder='Ik kom dan graag langs om*']" )!== '') {
                $( "input[placeholder='Ik kom dan graag langs om*']" ).parsley().validate();
              }
            }
          });
        }
    });
  });
});