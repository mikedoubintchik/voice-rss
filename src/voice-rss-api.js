/* global module */
'use strict';

/**
 * Voice RSS Web API Wrapper
 */
class VoiceRSSWebApi {
    constructor(apiKey) {
        this.baseUri = 'https://api.voicerss.org';
        this.apiKey = apiKey ? apiKey : null;
        this.globalOptions = {};
    }

    _validate = (requestData) => {
        if (!requestData) throw 'The settings are undefined';
        if (!requestData.key) throw 'The API key is undefined';
        if (!requestData.src) throw 'The text is undefined';
        if (!requestData.hl) throw 'The language is undefined';
        if (requestData.r < -10 || requestData.r > 10) throw 'The speech rate must be between -10 and 10';
        if (requestData.c && 'auto' !== requestData.c.toLowerCase()) {
            let a = !1;
            switch (requestData.c.toLowerCase()) {
                case 'mp3':
                    a = (new Audio).canPlayType('audio/mpeg').replace('no', '');
                    break;
                case 'wav':
                    a = (new Audio).canPlayType('audio/wav').replace('no', '');
                    break;
                case 'aac':
                    a = (new Audio).canPlayType('audio/aac').replace('no', '');
                    break;
                case 'ogg':
                    a = (new Audio).canPlayType('audio/ogg').replace('no', '');
                    break;
                case 'caf':
                    a = (new Audio).canPlayType('audio/x-caf').replace('no', '')
            }
            if (!a) throw 'The browser does not support the audio codec ' + requestData.c
        }
    };

    WrapPromiseWithAbort = (promise, onAbort) => {
        promise.abort = onAbort;
        return promise;
    };

    _promiseProvider = (promiseFunction, onAbort) => {
        let returnedPromise;

        if (window.Promise) returnedPromise = new window.Promise(promiseFunction);

        if (returnedPromise) return new this.WrapPromiseWithAbort(returnedPromise, onAbort);
        else return null;
    };

    _buildRequest = (requestData) => {
        const codec = requestData.c && 'auto' !== requestData.c.toLowerCase() ? requestData.c : this._detectCodec();

        return 'key=' + (requestData.key || '') +
            '&src=' + (requestData.src || '') +
            '&hl=' + (requestData.hl || '') +
            '&r=' + (requestData.r || '') +
            '&c=' + (codec || '') +
            '&f=' + (requestData.f || '') +
            '&ssml=' + (requestData.ssml || '') +
            '&b64=true';
    };

    _detectCodec = () => {
        const audio = new Audio;

        return audio.canPlayType('audio/mpeg').replace('no', '')
            ? 'mp3'
            : audio.canPlayType('audio/wav').replace('no', '')
                ? 'wav'
                : audio.canPlayType('audio/aac').replace('no', '')
                    ? 'aac'
                    : audio.canPlayType('audio/ogg').replace('no', '')
                        ? 'ogg'
                        : audio.canPlayType('audio/x-caf').replace('no', '')
                            ? 'caf'
                            : ''
    };

    _getXHR = () => {
        try {
            return new XMLHttpRequest
        } catch (e) {
        }
        try {
            return new ActiveXObject('Msxml3.XMLHTTP')
        } catch (e) {
        }
        try {
            return new ActiveXObject('Msxml2.XMLHTTP.6.0')
        } catch (e) {
        }
        try {
            return new ActiveXObject('Msxml2.XMLHTTP.3.0')
        } catch (e) {
        }
        try {
            return new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
        }
        try {
            return new ActiveXObject('Microsoft.XMLHTTP')
        } catch (e) {
        }
        throw 'The browser does not support HTTP request'
    };

    _performRequest = (requestData, options, callback) => {
        const req = this._getXHR();

        const promiseFunction = (resolve, reject) => {
            const success = (data) => {
                if (resolve) {
                    resolve(data);
                }
                if (callback) {
                    callback(null, data);
                }
            };

            const failure = () => {
                if (reject) {
                    reject(req);
                }
                if (callback) {
                    callback(req, null);
                }
            };

            req.open('POST', requestData.url);

            if (requestData.contentType) req.setRequestHeader('Content-Type', requestData.contentType);

            req.onreadystatechange = () => {
                if (req.readyState === 4) {
                    let data = null;

                    try {
                        data = req.responseText ? req.responseText : '';
                    } catch (e) {
                        console.error(e);
                    }

                    if (req.status >= 200 && req.status < 300) {
                        success(data);
                    } else {
                        failure();
                    }
                }
            };

            req.send(this._buildRequest(requestData));
        };

        if (callback) {
            promiseFunction();
            return null;
        } else {
            return this._promiseProvider(promiseFunction, () => req.abort());
        }
    };

    getAudio = (text, options = {}, callback) => {
        const requestData = {
            url: this.baseUri + '/',
            key: this.apiKey,
            src: text,
            hl: this.globalOptions.language ? this.globalOptions.language : (options.hl ? options.hl : 'en-us'),
            r: this.globalOptions.speechRate ? this.globalOptions.speechRate : (options.r ? options.r : 0),
            c: this.globalOptions.audioCodec ? this.globalOptions.audioCodec : (options.c ? options.c : 'mp3'),
            f: this.globalOptions.audioFormat ? this.globalOptions.audioFormat : (options.f ? options.f : '44khz_16bit_stereo'),
            ssml: this.globalOptions.ssml ? this.globalOptions.ssml : (options.ssml ? options.ssml : false),
            b64: this.globalOptions.b64 ? this.globalOptions.b64 : (options.b64 ? options.b64 : false),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        };

        this._validate(requestData);

        return this._performRequest(requestData, options, callback);
    };

    // Getters
    getApiKey = () => this.apiKey;
    getLanguage = () => this.globalOptions.language;
    getSpeechRate = () => this.globalOptions.speechRate;
    getAudioCodec = () => this.globalOptions.audioCodec;
    getAudioFormat = () => this.globalOptions.audioFormat;
    getSSML = () => this.globalOptions.ssml;
    getB64 = () => this.globalOptions.b64;

    // Setters
    setApiKey = apiKey => this.apiKey = apiKey;
    setLanguage = language => this.globalOptions.language = language;
    setSpeechRate = speechRate => this.globalOptions.speechRate = speechRate;
    setAudioCodec = audioCodec => this.globalOptions.audioCodec = audioCodec;
    setAudioFormat = audioFormat => this.globalOptions.audioFormat = audioFormat;
    setSSML = ssml => this.globalOptions.ssml = ssml;
    setB64 = b64 => this.globalOptions.b64 = b64;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = VoiceRSSWebApi;
}
