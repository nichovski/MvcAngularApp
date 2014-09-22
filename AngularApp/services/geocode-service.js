app.factory('geocodeService', function () {
    return {
        getFormattedAddress: function (lat, lng) {
           
            console.log(lat);
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var street;
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
               
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        street = results[0].formatted_address;
                        // element.text(results[0].formatted_address);
                    } else {
                        street = 'Location not found';
                        //element.text('Location not found');
                    }
                } else {
                    street = 'Geocoder failed due to: ' + status;
                    // element.text('Geocoder failed due to: ' + status);
                }
            });

            return street;
        }
    }

});