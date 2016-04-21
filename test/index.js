
var Test = require('segmentio-integration-tester');
var Sendwithus = require('../');
var mapper = require('../lib/mapper');
var Track = require('segmentio-facade').Track;

describe('Sendwithus', function(){
  var sendwithus;
  var settings;
  var test;

  beforeEach(function(){
    settings = {
      apiKey: 'live_7252c5d59aa9c0ed65239cce083ea7e5f0505f0f',
      integrationId: 'sio_MA2T2LtHDvsNDjDke7aC6Q' };
    sendwithus = new Sendwithus(settings);
    test = Test(sendwithus, __dirname);
    test.mapper(mapper);
  });

  it('should have the correct settings', function(){
    test
      .name('Sendwithus')
      .channels(['client', 'server', 'mobile'])
      .ensure('settings.apiKey')
      .ensure('settings.integrationId')
      .ensure('message.userId')
      .retries(10);
  });

  describe('.validate()', function(){
    it('should not be valid without an api key', function(){
      delete settings.apiKey;
      delete settings.invalid;
      var msg = new Track({ userId: 'arbitor' });
      test.invalid(msg, settings);
    });

    it('should be valid with complete settings', function(){
      var msg = new Track({ userId: 'dark archon' });
      test.valid(msg, settings);
    });

    it('should not accept calls without userId', function(){
      var msg = new Track({});
      test.invalid(msg, settings);
    });
  });

  describe('mapper', function(){
    describe('identify', function(){
      it('should map basic identify', function(){
        test.maps('identify-basic');
      });
    });

    describe('track', function(){
      it('should map basic track', function(){
        test.maps('track-basic');
      });
    });
  });

  describe('.identify()', function(){
    it('should send basic identify', function(done){
      var json = test.fixture('identify-basic');
      var output = json.output;
      output.timestamp = new Date(output.timestamp);
      test
        .identify(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should not error on invalid key', function(done){
      var json = test.fixture('identify-basic');
      var output = json.output;
      output.timestamp = new Date(output.timestamp);
      test
        .identify(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });
  });

  describe('.track()', function(){
    it('should send basic track', function(done){
      var json = test.fixture('track-basic');
      var output = json.output;
      output.timestamp = new Date(output.timestamp);
      test
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should not error on invalid key', function(done){
      var json = test.fixture('track-basic');
      var output = json.output;
      output.timestamp = new Date(output.timestamp);
      test
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });
  });
});
