EPT._array = {
    randomInt(max, min) {
        return min + Math.floor((max - min) * Math.random());
    },
    initFramesWithKey(key, count) {
        var arr = [];
        for (var i = 1; i < count + 1; i++) {
            arr.push({ key: key + i })
        }
        return arr;
    }
};