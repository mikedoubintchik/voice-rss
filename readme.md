An API wrapper for the [Voice RSS Text-To-Speech API](http://www.voicerss.org/default.aspx)

[![npm](https://img.shields.io/npm/v/voice-rss.svg?style=flat-square)](https://github.com/allurewebsolutions/voice-rss)
[![npm bundle size](https://img.shields.io/bundlephobia/min/voice-rss.svg?style=flat-square)](https://github.com/allurewebsolutions/voice-rss)
[![npm](https://img.shields.io/npm/dw/voice-rss.svg?style=flat-square)](https://github.com/allurewebsolutions/voice-rss)

The Voice RSS Text-To-Speech API creates a high quality audio stream with a very simple implementation. This npm module is a wrapper for this API to make it easy to implement in your Node or JavaScript projects.

* [Voice RSS Official Documentation][voice-rss-official-documentation]

**Table of contents:**
* [Quickstart](#quickstart)
  * [Before you begin](#before-you-begin)
  * [Installing the client library](#installing-the-client-library)
  * [Using the client library](#using-the-client-library)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [License](#license)
* [To Do](#to-do)

## Quickstart

### Before you begin
1.  [Setup an API key][apikey]

### Installing the client library
```bash
// npm
npm install voice-rss --save-dev

// yarn
yarn add voice-rss --dev
```

### Initiate the client library
##### 
```javascript
// Imports the Voice RSS client library: es6 import (alternative 1)
import VoiceRSSWebApi from './voice-rss-api';

// Imports the Voice RSS client library: require (alternative 2)
const VoiceRSSWebApi = require('./voice-rss-api');

// Instantiates the client
const VoiceRSS = new VoiceRSSWebApi();
VoiceRSS.setApiKey('API_KEY');

// Instantiates the client with an api key
const VoiceRSS = new VoiceRSSWebApi('API_KEY');
```

### Using the client library
Here are three examples of how to use the client library
```javascript
// callback implementation
// the second argument is the options
// see "Default options" section below for available options and for setting options all at once
// see "Setting options" section below to set options one by one
VoiceRSS.getAudio('Hello World', {}, (err, audio) => {
    if (err) console.error(err);
    else new Audio(audio).play();
});

// promise implementation
// you can pass the options as the second argument, as in the callback implementation
VoiceRSS.getAudio('Hello World')
    .then(audio => new Audio(audio).play())
    .catch(error => console.log(error));

// async/await implementation
// you can pass the options as the second argument, as in the callback implementation
(async () => {
    const audio = await VoiceRSS.getAudio('Hello World');
    
    // play the audio
    new Audio(audio).play();
    
    // OR console log the audio (base64 encoding)
    console.log(audio);
})();
```

##### Setting options
```javascript
VoiceRSS.setApiKey('API_KEY');
VoiceRSS.setLanguage('en-us');
VoiceRSS.setSpeechRate(0);
VoiceRSS.setAudioCodec('auto');
VoiceRSS.setAudioFormat('44khz_16bit_stereo');
VoiceRSS.setSSML(false);
VoiceRSS.setB64(false);
```

##### Getting options
```javascript
VoiceRSS.getApiKey();
VoiceRSS.getLanguage();
VoiceRSS.getSpeechRate();
VoiceRSS.getAudioCodec();
VoiceRSS.getAudioFormat();
VoiceRSS.getSSML();
VoiceRSS.getB64();
```

##### Default options
```javascript
const options = {
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
    b64: false,
};
```

##### Available options
All of the available options can be found in the [official documentation][voice-rss-official-documentation]

## Versioning
This library follows [Semantic Versioning](http://semver.org/).

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/googleapis/nodejs-translate/blob/master/CONTRIBUTING.md).

## License
MIT

See [LICENSE](https://github.com/allurewebsolutions/voice-rss/blob/master/LICENSE)

[apikey]: http://www.voicerss.org/login.aspx
[voice-rss-official-documentation]: http://www.voicerss.org/api/documentation.aspx

## To Do
- [ ] 100% test coverage
- [ ] Implement typescript
- [ ] Minimize bundle size
