/*!
 * JavaScript DTMF Tone Generator v1.0
 * https://github.com/ernaniaz/dtmftone/
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 * Date: Jan/20/2021
 */
( function ()
{
  /**
   * Private variables
   */
  var frequencies = {
    '1': { f1: 697, f2: 1209},
    '2': { f1: 697, f2: 1336},
    '3': { f1: 697, f2: 1477},
    'A': { f1: 697, f2: 1633},
    '4': { f1: 770, f2: 1209},
    '5': { f1: 770, f2: 1336},
    '6': { f1: 770, f2: 1477},
    'B': { f1: 770, f2: 1633},
    '7': { f1: 852, f2: 1209},
    '8': { f1: 852, f2: 1336},
    '9': { f1: 852, f2: 1477},
    'C': { f1: 852, f2: 1633},
    '*': { f1: 941, f2: 1209},
    '0': { f1: 941, f2: 1336},
    '#': { f1: 941, f2: 1477},
    'D': { f1: 941, f2: 1633}
  }
  var audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
  var settings = {};
  var status = 0;	// 0 = Not initialized, 1 = Initialized (not playing), 2 = Playing
  var freq1 = 0;
  var freq2 = 0;
  var osc1 = null;
  var osc2 = null;
  var tone = null;
  var context = null;

  /**
   * Method constructor
   */
  this.DTMFTone = function ()
  {
    settings.context = new audioContext ();
    context = settings.context;
    status = 1;

    /**
     * Object methods
     */
    this.isPlaying = function ()
    {
      return status == 2;
    }
    this.getTone = function ()
    {
      return tone;
    }
    this.setTone = function ( newtone)
    {
      if ( frequencies.hasOwnProperty ( newtone))
      {
        tone = newtone;
        var frequencyPair = frequencies[newtone];
        freq1 = frequencyPair.f1;
        freq2 = frequencyPair.f2;
      } else {
        throw new Error ( 'Invalid tone.');
      }

      return this;
    }
    this.play = function ()
    {
      if ( osc1)
      {
        osc1.disconnect ();
      }
      if ( osc2)
      {
        osc2.disconnect ();
      }
      setup ();
      osc1.start ? osc1.start ( 0) : osc1.noteOn ( 0);
      osc2.start ? osc2.start ( 0) : osc2.noteOn ( 0);
      status = 2;

      return this;
    }
    this.stop = function ()
    {
      if ( osc1)
      {
        osc1.disconnect ();
      }
      if ( osc2)
      {
        osc2.disconnect ();
      }
      status = 1;

      return this;
    }

    /**
     * Private methods
     */
    function setup ()
    {
      osc1 = context.createOscillator ();
      osc2 = context.createOscillator ();
      osc1.frequency.value = freq1;
      osc2.frequency.value = freq2;

      gainNode = context.createGain ();
      gainNode.gain.value = 0.25;

      filter = context.createBiquadFilter ();
      filter.type = 'lowpass';
      filter.frequency = 8000;

      osc1.connect ( gainNode);
      osc2.connect ( gainNode);

      gainNode.connect ( filter);
      filter.connect ( settings.context.destination);
    }

    return this;
  }

  /**
   * Public variables
   */
  this.about = {
    version: '1.0',
    author: 'Ernani José Camargo Azevedo'
  };

  // We need that our library is globally accesible, then we save in the window
  if ( typeof ( window.DTMFTone) === 'undefined')
  {
    window.DTMFTone = DTMFTone;
  }
}) ();
