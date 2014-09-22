app.factory('cache', function ($cacheFactory) {
    var cache = $cacheFactory('myCache');
    return cache;
});