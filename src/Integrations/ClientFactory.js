const _ = require('lodash');
const BaseClient = require('./BaseClient');

const supportedClients = require('./Clients');

class NotSupportedClientError extends Error {

    constructor(message) {
        super(message);
        this.name = 'NotSupportedClient';
    }

}

class ClientFactory {

    static create(name, config) {
        if(!_.isString(name) || !_.has(supportedClients, name)) {
            throw new NotSupportedClientError(`${name} is not valid/supported`);
        }

        if(!_.isPlainObject(config) || _.isEmpty(config)) {
            throw new BaseClient.Errors.ClientInvalidConfigError('Client config must be a non-empty plain object');
        }

        return new supportedClients[_.upperFirst(_.camelCase(name))](config);
    }

}

module.exports = ClientFactory;
module.exports.Errors = { NotSupportedClientError }; 
