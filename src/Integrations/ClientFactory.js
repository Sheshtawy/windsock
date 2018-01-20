const _ = require('lodash');
const ClientInvalidConfigError = require('./BaseClient');

const supportedClients = {};

class NotSupportedClientError extends Error {

    constructor(message) {
        super(message);
        this.name = 'NotSupportedClient';
    }

}

class ClientFactory {

    static create(name, config) {
        if(!_.isString(name) || !_.has(supportedClients, name)) {
            throw new NotSupportedClientError(`${name} is not valid/supported'`);
        }

        if(!_.isPlainObject(config) || _.isEmpty(config)) {
            throw new ClientInvalidConfigError('Client config must be a not-empty plain object');
        }

        return new supportedClients[name](config);
    }

}

module.exports = ClientFactory;
module.exports.Errors = { NotSupportedClientError }; 
