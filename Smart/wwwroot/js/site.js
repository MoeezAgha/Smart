$(document).ready(function () {
    $('#searchResults').hide();
    var typingTimer;
    var doneTypingInterval = 3000;

    $('#StreetAddress').on('input', function () {
        clearTimeout(typingTimer);
        $('#loadingSpinner').show(); // Show loading spinner
        typingTimer = setTimeout(performSearch, doneTypingInterval);
    });

    // Event delegation for anchor elements in the dropdown
    $('#searchResults').on('click', 'a', function () {
        // Get the selected result from the data-result attribute
        var result = JSON.parse($(this).attr('data-result'));
        console.log(result);
        // Set the selected address as the input value
        $('#StreetAddress').val(result.streetAddress);

        // Update the other input fields
        $('#City').val(result.city);
        $('#State').val(result.state);
        $('#County').val(result.county);

        // Clear the search results dropdown
        $('#searchResults .dropdown-menu').empty();
    });
});



function performSearch() {
    var address = $('#StreetAddress').val();

    $.ajax({
        type: 'POST',
        url: '/SearchAddress/SearchAddress',
        data: { address: address },
        success: function (data) {
            displayResults(data);
            $('#searchResults').show();
        },
        complete: function () {
            $('#loadingSpinner').hide(); // Hide loading spinner on request completion
        }
    });
}

function displayResults(results) {
    var $dropdown = $('#searchResults .dropdown-menu');
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
