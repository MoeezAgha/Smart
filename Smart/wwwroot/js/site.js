function setupAddressSearch(inputId, cityId, stateId, countyId, resultsDivId) {
    $(document).ready(function () {
        // Hide the specific results dropdown
        $(resultsDivId).hide();
        var typingTimer;
        var doneTypingInterval = 3000;

        $(inputId).on('input', function () {
            clearTimeout(typingTimer);
            $('#loadingSpinner').show(); // Show loading spinner
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

            // Clear the search results dropdown
            $(resultsDivId + ' .dropdown-menu').empty();
            $(resultsDivId).hide();
        });
    });
}

function performSearch(inputId, cityId, stateId, countyId, resultsDivId) {
    var address = $(inputId).val();

    $.ajax({
        type: 'POST',
        url: '/SearchAddress/SearchAddress',
        data: { address: address },
        success: function (data) {
            displayResults(data, inputId, cityId, stateId, countyId, resultsDivId);
            $(resultsDivId).show(); // Show the specific results dropdown
        },
        complete: function () {
            $('#loadingSpinner').hide();
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
