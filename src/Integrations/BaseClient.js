const _ = require('lodash');

class ClientInvalidConfigError extends Error {

    constructor(message) {
        super(message);
        this.name = 'ClientInvalidConfig';
    }

}

class BaseClient {

    constructor(config) {
        this.config = config;
    }

    get supportedMethods() {
        return Object.getOwnPropertyNames(this)
            .filter(prop => typeof this[prop] === 'function');
    }

    supports(methodName) {
        return this.supportedMethods.indexOf(methodName) !== -1;
    }

}

module.exports = BaseClient;
module.exports.Errors = { ClientInvalidConfigError };
