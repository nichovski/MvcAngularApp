'use strict';

app.controller("HomeController", function ($scope, tumblrRepository, $http) {
    $scope.tumblrReponse = null;

    var onGetTumblrBlogComplete = function (response) {
        $scope.tumblrReponse = response.data.response;
        if (response.data.response.length == 0) {
            $scope.error = "Could not fetch the blog.";
        } else {
            $scope.error = null;
        }
    };

    var onGetTumblrBlogError = function (reason) {
        $scope.error = "Could not fetch the blog.";
    };

    $scope.searchBlog = function (blog) {
       var blogRequest = tumblrRepository.getBlogPost(blog);
       blogRequest.then(onGetTumblrBlogComplete, onGetTumblrBlogError);
    };

    $scope.convertDate = function (stringDate) {
        return moment.utc(stringDate).format("LLLL");;
    };
});
