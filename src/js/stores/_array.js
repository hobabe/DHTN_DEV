EPT._array = {
    randomInt(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    initFramesWithKey(key, count) {
        var arr = [];
        for (var i = 1; i < count + 1; i++) {
            arr.push({ key: key + i })
        }
        return arr;
    }
};