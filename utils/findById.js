module.exports = function (arr, id) {
    let found;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            found = arr[i];
            break;
        }
    }

    return found;
};
