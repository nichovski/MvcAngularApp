app.factory("storageService", function ($rootScope, storage, userRepository) {

    return {
        isTokenExist: function () {
           var token = storage.get("token");
            if (token) {
                return true;
            } else {
                return false;
            }
        },
        getUser : function () {
            var user = storage.get('user');

            return user;
        },
        getToken : function () {
            return storage.get("token");
        }
    }
   
});
