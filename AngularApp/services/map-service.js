app.factory("mapService", function ($rootScope, $q, $http) {

    return {
        setMap: function () {
            var self = this;
            $rootScope.map = {
                clickedMarker: {
                    title: 'You clicked here',
                    latitude: null,
                    longitude: null
                },
                events: {
                    'dragend': self.onMapChangeEvent,
                    'zoom_changed': self.onMapChangeEvent,

                },
                options: {
                    streetViewControl: false,
                    panControl: false,
                    maxZoom: 20,
                    minZoom: 3,
                    satellite: false
                },
                center: {
                    latitude: $rootScope.latitude,
                    longitude: $rootScope.longitude
                },
                zoom: 17,
                icon: "img/i-m-here.png"
            };

           // $rootScope.map.isReady = true;
           return $rootScope.map;
        },
        onMapChangeEvent : function (map) {

            console.log(map);

            var center = map.getCenter();

            $rootScope.latitude = center.lat();
            $rootScope.longitude = center.lng();

           // this.setMapResults();
        },
        setCurrentPosition: function () {

            var self = this;
            var deferred = $q.defer();

            deferred.notify('Getting current location');

            var onSuccess = function(position) {

                //alert(JSON.stringify(position.coords.latitude + ";" + position.coords.longitude));

                $rootScope.latitude = position.coords.latitude;
                $rootScope.longitude = position.coords.longitude;
                
                self.setMap();
                //self.setMapResults();
                //$scope.showMap = true;
                $rootScope.map.isReady = true;

                deferred.resolve({
                    success: true,
                    message: 'Success',
                    latitude: $rootScope.latitude,
                    longitude: $rootScope.longitude,
                    map: $rootScope.map
                });
            };

            function onError(error) {

             deferred.reject({
                    success: false,
                    message: 'code: ' + error.code + '\n' +
                        'message: ' + error.message + '\n',
                });

                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }
            
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, maximumAge: 0 });
            
            return deferred.promise;
        },
        setFormattedAddress: function () {

            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng($rootScope.latitude, $rootScope.longitude);

            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                console.log('----------------setFormattedAddress---------------------');
                console.log(results);
                console.log('----------------setFormattedAddress---------------------');
                if (status == google.maps.GeocoderStatus.OK) {
                  
                    if (results[0]) {
                        $rootScope.streetAddress = results[0].formatted_address;
                    } else {
                        $rootScope.streetAddress = 'Location not found';
                    }
                } else {
                    //$rootScope.streetAddress = 'Geocoder failed due to: ' + status;
                }
            });

        },
        setMapResults: function (lat, lng) {

           // var self = this; 
            lat = typeof lat != "undefined" ? lat : $rootScope.latitude;
            lng = typeof lng != "undefined" ? lng : $rootScope.longitude;

            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);

            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        console.log(results);
                    //    $rootScope.latitude = lat;
                    //    $rootScope.longitude = lng;
                 //       self.setMap();
               //         $rootScope.map.isReady = true;

                     //   $rootScope.clickedMarker.latitude = lat;
                    //    $rootScope.clickedMarker.longitude = lng;
                        console.log('----------------setFormattedAddress---------------------');
                        console.log(results);
                        console.log('----------------setFormattedAddress---------------------');
                        console.log($rootScope.map);
                        $rootScope.mapResults = results;
                        $rootScope.streetAddress = results[0].formatted_address;
                    } else {
                        $rootScope.streetAddress = 'Location not found';
                    }
                } else {
                   // $rootScope.streetAddress = 'Geocoder failed due to: ' + status;
                }
            });

        },
        getDistance : function(origins,destinations) {
           // var data = "phoneNumber=" + user.phoneNumber + "&password=" + user.password;
          //  var contentLenght = data.length;
            return $http({
                method: 'GET',
                url: 'http://maps.googleapis.com/maps/api/distancematrix/json?'
                    + 'origins=' + origins.latitude + ',' + origins.longitude
                    + '&destinations=' + destinations.latitude + ',' + destinations.longitude,
              //  data: data,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
    };
});
