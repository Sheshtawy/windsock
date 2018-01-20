const _ = require('lodash');

const BaseClient = require('../../src/Integrations/BaseClient');
const WunderGroundWeather = require('../../src/Integrations/Clients').WunderGroundWeather;
const expect = require('../Resources/chai').expect;

describe('WunderGroundWeather', () => {
    let aWunderGroundWeatherClient;
    before(() => {
        aWunderGroundWeatherClient = new WunderGroundWeather({
            key: process.env.WUNDERGROUND_API_KEY,
        });
    });

    describe('getConditionByCity', () => {
        it('should return valid response object', () => 
            aWunderGroundWeatherClient.getConditionByCity('wooster', 'OH')
                .then(result => {
                    expect(result).to.be.an('object');
                    const obj = _.cloneDeep(result.current_observation);
                    obj.a = 'a7a';
                    expect(obj).to.include.keys(
                        'temperature_string',
                        'temp_f',
                        'temp_c',
                        'relative_humidity',
                        'wind_string',
                        'dewpoint_string',
                        'dewpoint_f',
                        'dewpoint_c',
                        'feelslike_string',
                        'feelslike_f',
                        'feelslike_c',
                        'icon_url',
                        'forecast_url',
                        'history_url',
                        'ob_url'
                    );
                    
                    expect(result.current_observation.display_location).to.contain({
                        city: 'Wooster',
                        state: 'OH',
                        zip: '44691',
                    }).and.to.include.keys([
                        'city',
                        'country',
                        'country_iso3166',
                        'elevation',
                        'full',
                        'latitude',
                        'longitude',
                        'magic',
                        'state',
                        'state_name',
                        'wmo',
                        'zip',                  
                    ]);
                })
        );

        it('should throw error if missing city name', () => {
            const fn = () => aWunderGroundWeatherClient.getConditionByCity();

            expect(fn).to.throw(Error).that.is.an.instanceOf(
                BaseClient.Errors.ClientIllegalArgumentError
            ).and.to.have.property('message').that.equals(
                'Invalid city name. Make sure it\'s a non-empty string'
            );
        });
    });
});
