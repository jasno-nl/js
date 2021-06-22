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
  // Wanneer er een fout in het document wordt gevonden bij inzenden, dient het loading scherm weer weggehaald te worden
  window.Parsley.on('field:error', function() { 
    $("#loading").css("display", "none");
    //Wanneer het adresveld een error geeft, verwijder dan de melding zodat het huisnummer op dezelfde regel blijft staan
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
   // Zoek of er een garantie-formulier wordt weergegeven en pak het Garantievoorwaarden label en muteer deze naar een label met hyperlink.
  if ($("label:contains('garantievoorwaarden')").exists()) {
      var id = $("label:contains('garantievoorwaarden')").attr('for'),
      divId = "field_"+id,
      input = $("label:contains('garantievoorwaarden') input:first");
      $("label:contains('garantievoorwaarden')").attr({
        'id': id + "_label"
      });
      id+= "_label";
      document.getElementById(id).innerHTML = '' ;
      document.getElementById(id).appendChild(input[0]);
      document.getElementById(id).innerHTML += 'Ja, ik ga met de <a href="https://www.jasnoshutters.be/garantie" target="_blank">garantievoorwaarden</a> akkoord.*';

      $("label:contains('garantievoorwaarden') input").attr({
        'data-parsley-required':"true",
        'data-parsley-error-message': "U dient akkoord te gaan met de garantievoorwaarden om uw raamdecoratie te registreren.",
        'data-parsley-class-handler': '#'+divId
      });
  }
  // Zoek naar de eerste 4 divs startend met "interest_" om deze te omringen met een element voor Parsley om de fout zichtbaar te maken en te verwijderen bij juiste invoer
  var divs = $('div[id^="interest_"]');
  for(var i = 0; i < divs.length; i+=4) {
    divs.slice(i, i+4).wrapAll("<div id='parsley-interests'></div>");
  }

  // Zoek naar advies/inmeet vinkjes en zet ze in 1 div zodat parsley een multiple ervan kan maken (1 of meer)
  var advies = jQuery('input[data-name^="Ik wil graag"]').parent().parent();
    for(var i = 0; i < advies.length; i+=2) {
    advies.slice(i, i+2).wrapAll("<div id='advies-parsley'></div>");
  }

  // Koppel de controle variabelen aan de vinkjes die gecontroleerd moeten worden.
  if (jQuery(" label:contains('Ik wil graag') input") !== '') {
    jQuery(" label:contains('Ik wil graag') input").attr({
    'data-parsley-multiple':"advies",
    'data-parsley-mincheck':"1",
    'data-parsley-required':"true",
    'data-parsley-errors-container': "#advies-parsley",
    'data-parsley-class-handler': "#advies-parsley",
    'data-parsley-error-message': "Kies op zijn minst één van de mogelijkheden."
    });
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
  if ($(" label:contains('JASNO ') input") !== '') {
    $(" label:contains('JASNO ') input").attr({
    'data-parsley-multiple':"product",
    'data-parsley-mincheck':"1",
    'data-parsley-required':"true",
    'data-parsley-errors-container': "#parsley-interests",
    'data-parsley-class-handler': "#parsley-interests",
    'data-parsley-error-message': "Kies op zijn minst één product dat u heeft gekocht."
    });
  }
  if ($(" label:contains('garantievoorwaarden') input") !== '') {
    $(" label:contains('garantievoorwaarden') input").attr({
    'data-parsley-mincheck':"1",
    'data-parsley-required':"true",
    'data-parsley-error-message': "Je dient akoord te gaan met de voorwaarden."
    });
  if ($(" label:contains(' brochure') input") !== '') {
    $(" label:contains(' brochure') input").attr({
    'data-parsley-multiple':"brochure",
    'data-parsley-mincheck':"1",
    'data-parsley-required':"true",
    'data-parsley-errors-container': "#parsley-interests",
    'data-parsley-class-handler': "#parsley-interests",
    'data-parsley-error-message': "Kies op zijn minst één product waarvan u de brochure wenst te ontvangen."
    });
  }

  //Verplichten van nieuwsbrief opt-in
  if (window.location.pathname.indexOf("_nieuwsbrief") > -1) {
    var x = jQuery('input[value="Ja, nog niet bevestigd"]').parent().parent().attr('id');
    jQuery('input[value="Ja, nog niet bevestigd"]').attr({
    'data-parsley-mincheck':"1",
    'data-parsley-required':"true",
    'data-parsley-errors-container': "#" + x,
    'data-parsley-error-message': "U moet wel het vinkje aanzetten om de nieuwsbrief te ontvangen"
    });
  }

  //Maak van 'Reden voor wijziging' op mutatie-formulier een niet selecteerbare optie, maar maak het daarmee niet ook een verplicht veld. Vrijheid voor wel/niet invullen moet bewaard blijven.
  if ($("select[title='Reden voor wijziging'] option[value='Reden voor wijziging van gegevens']").exists()) {
        $("option[value='Reden voor wijziging van gegevens']").prop('disabled', true);
        $("option[value='Reden voor wijziging van gegevens']").prop('selected', true);
  }
  //Maak van 'in de' op bel-mij-terug-formulier een niet selecteerbare optie, maar maak het daarmee niet ook een verplicht veld. Vrijheid voor wel/niet invullen moet bewaard blijven.
  if ($("select[title='tijdens/in de'] option[value='tijdens/in de']").exists()) {
        $("option[value='tijdens/in de']").prop('disabled', true);
        $("option[value='tijdens/in de']").prop('selected', true);
  }
  // Koppel de controle module Parsley.js aan het formulier
  if ($("form").exists() !== '') {
    $("form").parsley();
  }
  //Koppel een regex patroon van acceptabele codes aan het veld voor de garantie-code
  if ($("input[placeholder='Code op uw garantiekaart**']").exists()) {
    $("input[placeholder='Code op uw garantiekaart**']").parsley({
    pattern: /^(JS|js|Js|jS)(\s|\s?)(12|13|14|15|16|17|18|19|20|21)(20|24)(\s|\s?)([0-9]{4})$/
    });
  }
  //Koppel een bericht met verduidelijking voor het veld van de garantie-code bij foutieve invoer
  if ($("input[placeholder='Code op uw garantiekaart**']").exists()) {
    $("input[placeholder='Code op uw garantiekaart**']").attr("data-parsley-error-message", "De code is niet juist. Controleer het kaartje dat bij het product geleverd is.");
  }
  //Koppel een regex patroon aan het veld met de dealer keuze
  if ($("select[title='Verdelernaam']").exists()) {
    $("select[title='Verdelernaam']").parsley({
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
  if ($("input[placeholder='Code op uw garantiekaart**']") !== '') {
    $("input[placeholder='Code op uw garantiekaart**']").focusout(function(){
    $("input[placeholder='Code op uw garantiekaart**']").attr('value',$("input[placeholder='Code op uw garantiekaart**']").val().replace(/\s/g, ''));
    $("input[placeholder='Code op uw garantiekaart**']").val($("input[placeholder='Code op uw garantiekaart**']").val().replace(/\s/g, ''));
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
          y = $("select[title='Verdelernaam'] option:selected").val();

      if (x.test(y)) {
        if ($("input[data-name='Onbekende dealernaam'").exists()) {
          $("input[data-name='Onbekende dealernaam'").removeClass('hidden');
          $("input[data-name='Onbekende dealernaam'").parents("div.form-group.hidden").removeClass('hidden');
          $("input[data-name='Onbekende dealernaam'").addClass('text required');
          $("input[data-name='Onbekende dealernaam'").attr({
            'placeholder':"Naam van verdeler*",
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
  if ($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").exists()) {

    if ($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").val() == "Ja, nog niet bevestigd") {
      $("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").removeAttr('checked');
    }
    else if ($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").val() == "Nee, uitgeschreven") {
        $("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").removeAttr('checked');
    }
    else if ($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").val() === "") {
        $("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").removeAttr('checked');
    }
    else if ($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").val() == "Ja, bevestigd") {
        $("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").attr('checked', 'checked');
    }
  }
    //Wanneer het formulier wordt gecontroleerd worden een aantal acties uitgevoerd
    window.Parsley.on('form:validated', function(){
      //Verplaats de error bij het telefoonnummer zodat de vlag goed blijft staan en valideer het telefoonnummer
      moveError();
      telValidate();
      //Het dealerkeuzeveld wordt gecontroleerd evenals het extra veld wanneer er voor onbekende dealer is gekozen.
      $('select').on('select2:select', function() {
        if ($("select[title='Kies een verdeler uit de lijst']") !== '' ) {
          $("select[title='Kies een verdeler uit de lijst']").parsley().validate();
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
    var telInput = $("input[title^='Tele']");
    var ok = telInput.intlTelInput("isValidNumber");
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
    //Uitlezen van de invoer van de gebruiker v.w.b. het interesseveld voor de nieuwsbrief en aangepaste waarde naar Copernica toesturen
    if ($("input[data-name='Ja ik ga met de Garantievoorwaarden akkoord.']").exists()) {
      if ($("input[data-name='Ja ik ga met de Garantievoorwaarden akkoord.']").is(":checked")) {
        $("input[data-name='Ja ik ga met de Garantievoorwaarden akkoord.']").val('Ja');
      }
    }

    if ($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").exists()) {

      if ($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").is(":checked") &&
        $("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").val() =='Ja, bevestigd') {}

      else if ($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").is(":checked") &&
          $("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").val() !='Ja, bevestigd') {
            $("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").val('Ja, nog niet bevestigd');
      }
      else if (!($("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").is(":checked"))) {
                $("input[data-name='Ik word graag 1x per maand op de hoogte gehouden van nieuws van JASNO']").val('Nee, uitgeschreven');
      }
    }
    //Kopieer de gekozen dealernaam op basis van de dealercode naar het veld "Dealernaam" in Copernica
    if ($("select[title='Verdelernaam'] option:selected").val() !== 'ONBEKEND' ) {
      $("input[data-name='Dealernaam']").attr('value', $("select[title='Verdelernaam'] option:selected").text());
      $("input[data-name='Dealernaam']").text($("select[title='Verdelernaam'] option:selected").text());
    }
    if ($("select[title='Verdelernaam'] option:selected").val() === 'ONBEKEND' ) {
      $("input[data-name='Dealernaam']").attr('value', $("input[data-name='Onbekende dealernaam']").val());
    }
    if ($("select[title='Kies uw voorkeursverdeler']").exists()){
      if ($("select[title='Kies uw voorkeursverdeler'] option.selected").val() !== '') {
        $("input[data-name='Dealernaam']").attr('value', $("select[title='Kies uw voorkeursverdeler'] option:selected").text());
        $("input[data-name='Dealernaam']").text($("select[title='Kies uw voorkeursverdeler'] option:selected").text());
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
    //Voorwaarden akkoord Ja/Nee?
      if ($(" label:contains('Voorwaarden') input:checked").length > 0) {
        $("input[data-name='Voorwaarden_Akkoord']").attr('value', 'Ja');
    }
    //Bel mij terug vinkje invullen in db
    if ($(" label:contains('Bel mij terug') input:checked").length > 0) {
        $("input[data-name='Bel mij terug']").attr('value', 'Ja');
    }
    else {
      $("input[data-name='Bel mij terug']").attr('value', 'Nee');
    }
    
    //Voorwaarden akkoord Ja/Nee?
      if ($(" label:contains('Voorwaarden') input:checked").length > 0) {
        $("input[data-name='Voorwaarden_Akkoord']").attr('value', 'Ja');
    }
    //Wanneer het formulier wordt gecontroleerd worden een aantal acties uitgevoerd
    window.Parsley.on('form:validated', function(){
      //Verplaats de error bij het telefoonnummer zodat de vlag goed blijft staan en valideer het telefoonnummer
      moveError();
      telValidate();
      //Het dealerkeuzeveld wordt gecontroleerd evenals het extra veld wanneer er voor onbekende dealer is gekozen.
      $('select').on('select2:select', function() {
        if ($("select[title='Kies een verdeler uit de lijst']") !== '' ) {
          $("select[title='Kies een verdeler uit de lijst']").parsley().validate();
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
  }
});