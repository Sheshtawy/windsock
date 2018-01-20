const ClientFactory = require('../../src/Integrations/ClientFactory');
const BaseCLient = require('../../src/Integrations/BaseClient');
const expect = require('../Resources/chai').expect;

describe('ClientFactory', () => {
    describe('create', () => {
        it('should return an instance of a client (i.e. WunderGroundWeather)', () => {
            const aClient = ClientFactory.create('WunderGroundWeather', {
                key: process.env.WUNDERGROUND_API_KEY,
            });

            expect(aClient).to.be.an.instanceOf(BaseCLient);
        });

        it('should throw an error if client name is not a string', () => {
            const fn = () => ClientFactory.create(1, {});

            expect(fn).to.throw(Error).that.is.an.instanceOf(
                ClientFactory.Errors.NotSupportedClientError
            ).and.to.have.property('message').that.equals('1 is not valid/supported');
        });

        it('should throw an error if not supported client', () => {
            const fn = () => ClientFactory.create('ANonSupportedClient', {});

            expect(fn).to.throw(Error).that.is.an.instanceOf(
                ClientFactory.Errors.NotSupportedClientError
            ).and.to.have.property('message').that.equals(
                'ANonSupportedClient is not valid/supported'
            );
        });

        it('should throw error if invalid config', () => {
            const fn = () => ClientFactory.create('WunderGroundWeather', 1);

            expect(fn).to.throw(Error).that.is.an.instanceOf(
                BaseCLient.Errors.ClientInvalidConfigError
            ).and.to.have.property('message').that.equals(
                'Client config must be a non-empty plain object'
            );
        });

        it('should throw error if empty config', () => {
            const fn = () => ClientFactory.create('WunderGroundWeather', {});

            expect(fn).to.throw(Error).that.is.an.instanceOf(
                BaseCLient.Errors.ClientInvalidConfigError
            ).and.to.have.property('message').that.equals(
                'Client config must be a non-empty plain object'
            );
        });
    });
});
