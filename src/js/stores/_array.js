EPT._array = {
    randomInt(max, min) {
        return min + Math.floor((max - min) * Math.random());
    },
    calDistance(x, y, a, b)
    {
        return (Math.sqrt(Math.pow(a-x, 2) + Math.pow(b-y, 2)));
    }
};