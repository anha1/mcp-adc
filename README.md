#MCP3008/MCP3208 analog-to-digital converters support for Raspberry Pi.
This Node.js module provides 
[MCP3208(12bit)](http://ww1.microchip.com/downloads/en/DeviceDoc/21298c.pdf) and
[MCP3008(10bit)](https://www.adafruit.com/datasheets/MCP3008.pdf)  analog-to-digital converters support. These chips
are a good option for Raspberry Pi DIY projects 
(see a sample with a wiring diagram 
[here](http://www.rpi-spy.co.uk/2013/10/analogue-sensors-on-the-raspberry-pi-using-an-mcp3008/)).

If using with Raspberry Pi, please do not forget to enable SPI support using [raspi-config](https://www.raspberrypi.org/documentation/configuration/raspi-config.md).

## Code sample
```
var McpAdc = require('mcp-adc');

var adc = new McpAdc.Mcp3208();

var channel = 0;

adc.readRawValue(channel, function(value) {
        console.log("Raw value:\t" + value);
});

adc.readVoltage(channel, function(voltage) {
        console.log("Voltage:\t" + voltage);
});

adc.readNormalizedValue(channel, function(normValue) {
        console.log("Percents:\t" + (normValue * 100));
});
```

Output:
```
Raw value:	 700
Voltage:	0.5649084249084249
Percents:	17.094017094017094
```

It is also possible to use MCP3008:
```
var adc = new McpAdc.Mcp3008();
```

and provide custom reference voltage and/or SPI instance:
```
var adc = new McpAdc.Mcp3208({
    voltage: 1.3, //1.3v
    spi: mySpiInstance
});
```

