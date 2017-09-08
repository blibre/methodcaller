let handler = {
    get(target, propKey, receiver) {
        return (...args) => console.log(args);
    }
};

module.exports = new Proxy({}, handler);