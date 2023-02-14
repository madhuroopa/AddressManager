$(document).ready(function () {
    //making an ajax request to retrieve countries
    $.getJSON("/address_API/countries", function (data) {
        $.each(data, function (key, country) {
            $("#dropdown_country").append("<option value='" + country.Country_Code + "'>" + country.Country + "</option>");
        });
    });
    $("#dropdown_country").change(function () {
        var countryCode = $(this).val();
        if (countryCode === "") {
            $("#country").val("");
            $("#country").prop("disabled", true);
        } else {
            // Make an AJAX request to retrieve the country name based on the country code
            $.getJSON("/address_API/countries", function (data) {
                var countryName = "";
                $.each(data, function (key, country) {
                    if (country.Country_Code === countryCode) {
                        countryName = country.Country;
                        return false;
                    }
                });
                $("#country").val(countryName);
                $("#country").prop("disabled", false);
            });
        }
    });
});


