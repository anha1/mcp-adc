#mcp-adc Node.js module: MCP3208/MCP3008 SPI analog-to-digital converters support for RaspberryPi.

This library provides [MCP3208(12bit)](http://ww1.microchip.com/downloads/en/DeviceDoc/21298c.pdf) and
[MCP3008(10bit)](https://www.adafruit.com/datasheets/MCP3008.pdf)  analog-to-digital converters support. These chips
are a good option for RaspberryPi DIY projects 
(see a sample with a wiring diagram 
[here](https://learn.adafruit.com/reading-a-analog-in-and-controlling-audio-volume-with-the-raspberry-pi/connecting-the-cobbler-to-a-mcp3008)).

If using with RaspberryPi, please do not forget to enable SPI support using "raspi-config" first.

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

And provide custom reference voltage and/or SPI instance:
```
var adc = new McpAdc.Mcp3208({
    voltage: 1.3, //1.3v
    spi: mySpiInstance
});
```