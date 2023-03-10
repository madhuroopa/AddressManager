$(document).ready(function () {
    document.getElementById('form').style.display="none";
    var table = $('#addresses');
    var fields=[]
    $('#country_codes').on('change', function() {
      var countryCode = $(this).val();
      $("#address-search-form input[type='text'], #address-search-form select").val('');
      table.empty();
      fields=[]
      updateAddressForm(countryCode);
      
    });
    function updateAddressForm(countryCodes) {
      if (countryCodes.length > 1) {
        $('.form-group').removeClass('hidden');
        $(".form-group").each(function() {
          // Get the input element and its label
          var input = $(this).find(".form-control");
          var label = $(this).find(".label");
        
          // Reset the label and placeholder values to the default values
          label.text(input.attr("data-default-label"));
          
          input.attr("placeholder", input.attr("data-default-placeholder"));
        });
     
        document.getElementById('form').style.display = "block";
        
        // Display the country agnostic form that includes all the necessary fields for all the selected countries
      }
      else{
        var countryCode = countryCodes[0];
        $.ajax({
          url: '/address_API/addressformat/' + countryCode,
          success: function(data) {
            //console.log(data)
            length=data.length
            console.log("hello")
            console.log(data)
            var visibleDivIds = [];
            
             for (var i = 0; i < length; i++) {
              var component = Object.keys(data[i])[0];
              console.log("hello")
              console.log(data[i][component][0])
              console.log(component)
              var input = $('#' + component);
              
              
              if (input.length > 0) {
                if(data[i][component][0]!=""){
                  fields.push(component)
                  input.attr('placeholder', data[i][component][1]);
                  input.prev().text(data[i][component][0].trim());
                  var divId = $('#' + component).closest("div").attr("id");
                  console.log(divId)
                  
                 // document.getElementById('street_address').style.display="block"
                  var divElement = document.getElementById(divId);
                  if (divElement) {
                    divElement.classList.remove('hidden');
                    visibleDivIds.push(divId);
                    } 
                }
                else{
                  console.log("hello")
                  var divId = $('#' + component).closest("div").attr("id");
                  console.log(divId)
                  
                 // document.getElementById('street_address').style.display="block"
                  var divElement = document.getElementById(divId);
                  if (divElement) {
                    divElement.classList.add('hidden');
                    } 

                }

            }
          }
         
        $('.form-group').each(function() {
          if (visibleDivIds.indexOf($(this).attr('id')) == -1) {
            $(this).addClass('hidden');
          } else {
            $(this).removeClass('hidden');
          }

        });
        document.getElementById('form').style.display = "block";
        document.getElementById('button').style.display = "block";
        //document.getElementById('region_class').style.display = "block";

          /*  if(flag){
             document.getElementById('form').style.display="block"
             
            }
            else{
              document.getElementById('form').style.display="block"
              document.getElementById('region_class').style.display="none"

            }*/

            }
        });
     }
  };

      
    
    
    $('#address-search-form').submit(function(e) {
        e.preventDefault(); // prevent the form from submitting normally

        // get the form values
        var recipient_name = $('#recipient_name').val();
        var street = $('#street').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var postal_code = $('#postal_code').val();
        var country_code = $('#country_codes').val().map(function(value) {
          return value.replace(/"/g, '');
        });
        console.log($('#country_codes').val())
        // construct the query parameters
        var params = {
          'recipient_name': recipient_name,
          'street': street,
          'city': city,
          'state': state,
          'postal_code': postal_code,
          'country_code': JSON.stringify(country_code)
        };
        
        console.log(params)
       
        // make an AJAX request to the API endpoint
        $('#alert-container').empty();
        $('#addresses').empty();
        $.getJSON('/address_API/search', params)
        .done(function (data) {
          
          console.log('Received response:', data);
          
                // handle the response data
         

               
                var addresses = data;
                
                console.log(fields)
                table.empty();
                var headerRow = $("<tr>");
              if(fields.length!=0){
                for (i=0;i<fields.length;i++){
                  var input = $('#' +fields[i]);
                  label=input.prev().text();
                  headerRow.append($("<th>").text(label));
                }
                table.append(headerRow);
              }
              else{
                var headerRow = $("<tr>");
                headerRow.append($("<th>").text("Country"));
                headerRow.append($("<th>").text("Country Name"));
                headerRow.append($("<th>").text("Recipient Name"));
                headerRow.append($("<th>").text("Street"));
                headerRow.append($("<th>").text("Region/Neighborhood"));
                headerRow.append($("<th>").text("Postal Code"));
                headerRow.append($("<th>").text("City"));
                headerRow.append($("<th>").text("State"));
                table.append(headerRow);
              }
                
                
              var bodyRows = [];
              if(fields.length!=0){
                $.each(addresses, function(index, address) {
                    var row = $("<tr>");
                 
                    for (i=0;i<fields.length;i++){
                      if(fields[i]=="recipient_name"){
                        row.append($("<td>").text(address.recipient_name));
                      }
                      if(fields[i]=="postal_code"){
                        row.append($("<td>").text(address.postal_code));
                      }
                      if(fields[i]=="region"){
                        row.append($("<td>").text(address.region));
                      }
                     
                      if(fields[i]=="street"){
                        row.append($("<td>").text(address.street));
                      }
                      if(fields[i]=="city"){
                        row.append($("<td>").text(address.city));
                      }
                      if(fields[i]=="state"){
                        row.append($("<td>").text(address.state));
                      }
                     
                      if(fields[i]=="country_codes"){
                        row.append($("<td>").text(address.country));
                      }
                    table.append(row);
                    //bodyRows.push(row);
                    
                    console.log(row)
                    
                    }
                    
                  });
                  }
                    else{
                      $.each(addresses, function(index, address) {
                        var row = $("<tr>");
                        row.append($("<td>").text(address.country_code));
                        row.append($("<td>").text(address.country));
                        row.append($("<td>").text(address.recipient_name));
                        row.append($("<td>").text(address.street));
                        row.append($("<td>").text(address.region));
                        row.append($("<td>").text(address.postal_code));
                        row.append($("<td>").text(address.city));
                        row.append($("<td>").text(address.state));
                        table.append(row);
                      
    

                      });
                    }
                   
                
                    
              })
        .fail(function (jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 404) {
            // handle 404 error
            
              // show a Bootstrap error alert
              var alert = $('<div class="alert alert-danger alert-dismissible fade show" role="alert"> <div>No addresses found for the given criteria.</div></div>');
              $('#alert-container').empty().append(alert);
              var svg = $()
              return;
          
          } 
        
          else if (jqXHR.status === 500) {
            // handle 500 error
            var alert = $('<div class="alert alert-danger alert-dismissible fade show" role="alert"> <div>500: Internal Servor Error</div></div>');
            $('#alert-container').empty().append(alert);
            var svg = $()
            return;
          } 
        });
        
    });
    $('#addresses').on("click","tr",function () {
      if(fields.length!=0){
      for (i=0; i<fields.length;i++){
        var input = $('#' +fields[i]);
        var value = $(this).find("td:nth-child(" + (i+1) + ")").text();

        input.val(value);

      }
    }
    else{
      var country_code = $(this).find("td:nth-child(1)").text();
      var recipient_name = $(this).find("td:nth-child(3)").text();
      var street=$(this).find("td:nth-child(4)").text();
      var postal_code = $(this).find("td:nth-child(5)").text();
      var city = $(this).find("td:nth-child(6)").text();
      var state = $(this).find("td:nth-child(7)").text();
    $("#country_codes").val([country_code]); // use an array to set the value of a multi-select dropdown
    $("#recipient_name").val(recipient_name);
    $("#street").val(street);
    $("#city").val(city);
    $("#state").val(state);
    $("#postal_code").val(postal_code);

    }
    });


   /* // Auto-populate other fields based on the selected option in the dropdown
    $('#streetNumber').on('input', function () {
      console.log('Address list change event triggered');
      var selectedOption = $('#address-list option[value="' + $(this).val() + '"]');
      if ($(this).val() === '') { // if street number is empty, clear other fields
        $('#streetAddress, #city, #state, #postalCode, #dropdown_country').val('');
      } else if (selectedOption.length > 0) {
        $('#streetNumber').val(selectedOption.attr('data-NUMBER'));
        $('#streetAddress').val(selectedOption.attr('data-STREET'));
        $('#city').val(selectedOption.attr('data-CITY'));
        $('#state').val(selectedOption.attr('data-STATE'));
        $('#postalCode').val(selectedOption.attr('data-POSTCODE'));

        $('#dropdown_country').val(selectedOption.attr('data-COUNTRY'))
      }
    });
    */
  });



