var BotTest = require('bot-test'),
    Bot     = require('mybot'),
    should  = require('should'),
    Q       = require('q');

var config1 = {
  nick: 'ebot',
  channels: ['#test'],
  plugins: ['../index.js'],
  server: '127.0.0.1'
};

var DEBUG = false;

describe('test fortune', function () {
  var realbot, testbot;

  before(function (done) {
    this.timeout(55000);

    testbot = new BotTest({debug: DEBUG});
    realbot = new Bot(config1);

    return Q.try(function () {
      return testbot.init(realbot.connectAll.bind(realbot), true);
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });

  describe('test fortune cookie', function () {
    it('should get cookie', function (done) {
      this.timeout(15000);
      testbot.bot.say('#test', realbot.nick + ': !cookie');
      testbot.bot.testMessageExists({channel: '#test',
                                     callback: function () { done(); }});
    });

    /*
    it('should show help', function (done) {
      this.timeout(15000);
      testbot.bot.say('#test', realbot.nick + ': help');
      done();
    });
    */
  });
});
