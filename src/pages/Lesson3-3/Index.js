(function (){
    function addCreator(x) {
        return function(y) {
            return x += y;
        }
    }

    const add = addCreator(5);
    console.log(add(5)); // 10
    console.log(addCreator(1)(3)); // 4
})();