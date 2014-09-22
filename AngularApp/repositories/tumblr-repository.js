'user strict';

app.factory("tumblrRepository", function ($http) {
    return {
        getBlogPost: function (blog) {
            var url = "http://api.tumblr.com/v2/blog/" + blog.url + ".tumblr.com/posts?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&callback=JSON_CALLBACK";
            return $http.jsonp(url);
        }
    };
});
