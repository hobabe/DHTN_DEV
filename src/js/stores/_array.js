EPT._array = {
    randomInt(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomPercentInt(percents, pecent) {
        var indexGet = Math.floor(Math.random() * (percents.length - 1 - 0 + 1)) + 0
        return 2;//percents[indexGet];
    },
    initFramesWithKey(key, count) {
        var arr = [];
        for (var i = 1; i < count + 1; i++) {
            arr.push({ key: key + i })
        }
        return arr;
    }
};