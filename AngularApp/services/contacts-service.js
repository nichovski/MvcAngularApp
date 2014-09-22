app.factory("contactsService", function ($rootScope, $q) {
    
    return {
        create: function () {
            return navigator.contacts.create();
        },
        find: function (filter) {
            var deferred = $q.defer();

            var self = this;

            var options = new ContactFindOptions();
            options.filter = filter;
            options.multiple = true;

            var fields = ["*"];

            deferred.notify('Getting contacts');

            navigator.contacts.find(fields, function (data) {
                var sortedContacts = self.sort(data);

                deferred.resolve({
                    success: true,
                    message: 'Success',
                    contacts: sortedContacts,
                    letters: self.getLetters(sortedContacts)
                });
                
            }, function (error) {
                deferred.reject({
                    success: false,
                    message: 'Error:' + error,
                    contacts: error
                });

              
                //$rootScope.getContactFieldsError(error);
            }, options);

            return deferred.promise;
        },
        sort: function (contacts) {
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //var contactsJson = '[{"id":"1","rawId":"1","displayName":"Plugger","name":{"formatted":"Plugger ","givenName":"Plugger"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"9798","id":"2","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"2","rawId":"2","displayName":"vlado","name":{"formatted":"vlado ","givenName":"vlado"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"+38978316168","id":"4","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"3","rawId":"3","displayName":"dejan mdc","name":{"formatted":"dejan mdc ","givenName":"dejan mdc"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"071243364","id":"6","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"1","rawId":"1","displayName":"Plugger","name":{"formatted":"Plugger ","givenName":"Plugger"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"9798","id":"2","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"2","rawId":"2","displayName":"vlado","name":{"formatted":"vlado ","givenName":"vlado"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"+38978316168","id":"4","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"3","rawId":"3","displayName":"dejan mdc","name":{"formatted":"dejan mdc ","givenName":"dejan mdc"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"071243364","id":"6","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"1","rawId":"1","displayName":"Plugger","name":{"formatted":"Plugger ","givenName":"Plugger"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"9798","id":"2","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"2","rawId":"2","displayName":"vlado","name":{"formatted":"vlado ","givenName":"vlado"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"+38978316168","id":"4","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"3","rawId":"3","displayName":"dejan mdc","name":{"formatted":"dejan mdc ","givenName":"dejan mdc"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"071243364","id":"6","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"1","rawId":"1","displayName":"Plugger","name":{"formatted":"Plugger ","givenName":"Plugger"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"9798","id":"2","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"2","rawId":"2","displayName":"vlado","name":{"formatted":"vlado ","givenName":"vlado"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"+38978316168","id":"4","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"3","rawId":"3","displayName":"dejan mdc","name":{"formatted":"dejan mdc ","givenName":"dejan mdc"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"071243364","id":"6","pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null}]';
            //contacts = JSON.parse(contactsJson);
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var contactsWithoutNull = _.where(contacts, function (item) { return item.displayName != null && item.phoneNumbers != null && item.phoneNumbers.length > 0; });

            var sortedContacts = _.groupBy(contactsWithoutNull, function (item) { return item.displayName[0].toUpperCase(); });
            
            return sortedContacts;
        },
        getLetters: function (sortedContacts) {

            var arrayLetters = [];

            for (var propertyName in sortedContacts) {
                if (!_.contains(arrayLetters, propertyName)) {
                    arrayLetters.push({ letter: propertyName });
                }
            }

            return arrayLetters;
        }
    };
});

