# DTMFTone
[![GitHub release](https://img.shields.io/github/release/ernaniaz/dtmftone.svg?maxAge=2592000)](https://github.com/ernaniaz/dtmftone)
[![GitHub license](https://img.shields.io/github/license/ernaniaz/dtmftone.svg)](https://github.com/ernaniaz/dtmftone)

This is a simple JavaScript library to generate a telephony DTMF tones into web browser.

## Usage

You need to instantiate a new object. Call object method *setTone ( tone)* to change the tone to any valid one (0 to 9, A to D, * and #). To start playing, just call the method *play ()*, and to stop the method *stop ()*.

## Example

```
var dtmf = new DTMFTones ();

dtmf.setTone ( '7').play ();
```

This will play the number 7 DTMF tone on the page.

## License

MIT License.
