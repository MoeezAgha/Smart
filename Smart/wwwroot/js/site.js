function setupAddressSearch(inputId, cityId, stateId, countyId, resultsDivId) {
    $(document).ready(function () {
        // Hide the specific results dropdown initially
        $(resultsDivId).hide();

        // Set up a timer to delay the search while typing
        var typingTimer;
        var doneTypingInterval = 3000;    

        // Append the loading spinner element to the input-group
        $(`${inputId}`).parent().append(
            '<div class="input-group-append">' +
            '<div class="loadingSpinner spinner-border" role="status" id="' + inputId.substring(1) + '-loadingSpinner" style="display: none;">' +
            '<span class="sr-only"></span>' +
            '</div>' +
            '</div>'
        );

     


        // Handle input change event
        $(inputId).on('input', function () {
            clearTimeout(typingTimer);
            // Show loading spinner
            $(`${inputId}-loadingSpinner`).show();
            // Set a timer to wait for typing to finish before performing the search
            typingTimer = setTimeout(function () {
                performSearch(inputId, cityId, stateId, countyId, resultsDivId);
            }, doneTypingInterval);
        });

        // Event delegation for anchor elements in the dropdown
        $(resultsDivId).on('click', 'a', function () {
            var result = JSON.parse($(this).attr('data-result'));

            // Set the selected address as the input value
            $(inputId).val(result.completeAddress);

            // Update the related input fields
            $(cityId).val(result.city);
            $(stateId).val(result.state);
            $(countyId).val(result.county);

            // Add a background color for 2 seconds
            setBackGroundColor(cityId, stateId, countyId);

            // Clear the search results dropdown
            $(resultsDivId + ' .dropdown-menu').empty();
            // Hide the results dropdown
            $(resultsDivId).hide();

            // Remove the background color after 2 seconds
            removeBackGroundColor(cityId, stateId, countyId);
        });
    });
}

function setBackGroundColor(cityId, stateId, countyId) {
    $(cityId).css('background-color', 'lightblue');
    $(stateId).css('background-color', 'lightblue');
    $(countyId).css('background-color', 'lightblue');
}

function removeBackGroundColor(cityId, stateId, countyId) {
    setTimeout(function() {
        $(cityId).css('background-color', '');
        $(stateId).css('background-color', '');
        $(countyId).css('background-color', '');
    }, 2000);
}

function performSearch(inputId, cityId, stateId, countyId, resultsDivId) {
    var address = $(inputId).val();

    $.ajax({
        type: 'POST',
        url: '/SearchAddress/SearchAddress',
        data: { address: address },
        success: function (data) {
            // Display the search results
            displayResults(data, inputId, cityId, stateId, countyId, resultsDivId);
            // Show the specific results dropdown
            $(resultsDivId).show();
        },
        complete: function () {
            // Hide the loading spinner after the search is complete
            $(`${inputId}-loadingSpinner`).hide();
        }
    });
}

function displayResults(results, inputId, cityId, stateId, countyId, resultsDivId) {
    var $dropdown = $(resultsDivId + ' .dropdown-menu');
    $dropdown.empty();

    if (results.length === 0) {
        $dropdown.append('<li>No results found</li>');
    } else {
        results.forEach(function (result) {
            var listItem = $('<li><a href="#">' + result.completeAddress + '</a></li>');

            // Set the data-result attribute with the result model as a JSON string
            listItem.find('a').attr('data-result', JSON.stringify(result));

            $dropdown.append(listItem);
        });
    }

    $dropdown.show();
}
