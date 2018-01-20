const _ = require('lodash');
const request = require('request-promise-native');
const BaseClient = require('../BaseClient');

class WunderGroundWeather extends BaseClient {

    constructor(config) {
        super(config);

        if(!_.isString(config.key)) {
            throw new BaseClient.Errors.ClientIllegalArgumentError(
                'Invalid or missing WonderGroundWeather api key'
            );
        }
    }

    getConditionByCity(city, state = '', country = '') {
        if(!_.isString(city)) {
            throw new BaseClient.Errors.ClientIllegalArgumentError(
                'Invalid city name. Make sure it\'s a non-empty string'
            );
        }

        const params = [];
        
        if(!_.isEmpty(country)) {
            params.push(country);
        }
        
        if(!_.isEmpty(state)) {
            params.push(state);
        }

        params.push(city);
        const query = params.join('/');
        return this._call('GET', 'conditions', query)
            .then(response => {
                if('results' in response && _.isArray(response.results)) {
                    return _.map(response.results, item => this._extendResponse(item.l));
                }

                return response;
            });
    }

    getConditionById() {}

    _extendResponse(link) {
        return this._call('GET', 'conditions', link);
    }

    _call(method, endpoint, query) {
        const requestObject = {
            method,
            uri: `http://api.wunderground.com/api/${this.config.key}/${endpoint}/q/${query}.json`,
            json: true,
        };

        return request(requestObject);
    }

}

module.exports = WunderGroundWeather;
