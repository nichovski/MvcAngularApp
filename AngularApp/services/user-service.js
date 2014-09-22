app.factory('userService', function () {
    
    return {
        encryptCustomerId: $location.search().CustomerId,
        user:  {
            Id: "",
            CustomerId: "",
            CellNo: "",
            VerificationCode: "",
            IsVerified: false,
            SecretKey: "",
            SecondsDelay: 0,
            IsEnrolled: false,
            DateTimeIns: null,
            SelectedOptionType:null
        }
    };
});