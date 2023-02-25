$(document).ready(function () {

  $(function () {
    // Auto-populate address list based on filter values
    $('#streetNumber, #streetAddress, #city, #state, #postalCode, #country').on('input', function () {
      var filters = {
        NUMBER: $('#streetNumber').val(),
        STREET: $('#streetAddress').val(),
        CITY: $('#city').val(),
        STATE: $('#state').val(),
        POSTCODE: $('#postalCode').val(),
        COUNTRY: $('#country').val()
      };
      $.getJSON('/address_API/search', filters, function (data) {
        console.log('Received response:', data);
        var addressList = $('#address-list');
        addressList.empty(); // clear the address list before adding new items
        $.each(data, function (key, value) {
          // loop through the response data and append each item to the address list
          $('#address-list').append('<option value="' + value.STREET +'" data-NUMBER="' + value.NUMBER + '" data-STREET="' + value.STREET + '" data-CITY="' + value.CITY + '" data-STATE="' + value.STATE + '" data-POSTCODE="' + value.POSTCODE + '" data-COUNTRY="' + value.COUNTRY + '">' + value.NUMBER + ', ' + value.STREET + ', ' + value.CITY + ', ' + value.STATE + ' ' + value.POSTCODE + ', ' + value.COUNTRY + '</option>');
        });
      });
    });
  
    // Auto-populate other fields based on the selected option in the dropdown
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
  });
});