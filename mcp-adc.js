var SPI = require('spi');

var extend = require('util')._extend;

var openSpi = function() {
    var device = '/dev/spidev0.0';
    return new SPI.Spi(device, [], function(s) {
        s.open();
    });
};

var Adc = function(options) {
    var self = this;

    var settings = extend( {
        voltage: 3.3, //3.3V by default
        spi: null
    }, options);

    self.voltage = settings.voltage;
    self.spi = settings.spi || openSpi();

    /**
     * Read voltage (in a range 0-3.3V by default).
     * @param channel
     * @param callback
     */
    self.readVoltage = function(channel, callback) {
        self.readSpi(channel, function(value) {
            var voltage = ((value * self.voltage) / self.maxValue);
            callback(voltage);
        });
    };

    /**
     * Read normalized value (in a range 0-1).
     * @param channel
     * @param callback
     */
    self.readNormalizedValue = function(channel, callback) {
        self.readSpi(channel, function(value) {
            var normalizedValue = ((value) / self.maxValue);
            callback(normalizedValue);
        });
    };

    /**
     * Read raw ADC value (the range depends on ADC resolution).
     * @param channel
     * @param callback
     */
    self.readRawValue = function(channel, callback) {
        self.readSpi(channel, callback);
    }
};

module.exports.Mcp3208 = function(options) {
  var self = this;
  Adc.call(self, options);
  self.maxValue = 4095;
  self.readSpi = function(channel, callback) {
      var tx = new Buffer([4 | 2 | (channel >> 2), (channel & 3) << 6, 0]);
      var rx = new Buffer([0, 0, 0]);

      self.spi.transfer(tx, rx, function(dev, buffer) {
          var value = ((buffer[1] & 15) << 8) + buffer[2];
          callback(value);
      })
  };
};

module.exports.Mcp3008 = function(options) {
    var self = this;
    Adc.call(self, options);
    self.maxValue = 1023;
    self.readSpi = function(channel, callback) {
        var tx = new Buffer([1, (8 + channel) << 4, 0]);
        var rx = new Buffer([0, 0, 0]);

        self.spi.transfer(tx, rx, function(dev, buffer) {
            var value = ((buffer[1] & 3) << 8) + buffer[2];
            callback(value);
        })
    };
};

