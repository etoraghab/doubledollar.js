'use strict';
/**
 * atordvairn.js @ 07c56d1
 * @author: atordvairn
 * @license GPL-3.0 ( GNU public license )
 * @see https://github.com/atordvairn/atordvairn.js.js
 * @description: The core function of the library that encapsulates all the features.
 */

const $$ = (sel, option) => {
  if (option == 1) {
    return document.querySelector(sel);
  }

  const self = {
    element: document.querySelector(sel),
    /**
     * @returns The HTMLELement representation of the element matching the given selector.
     */
    html: function () {
      return self.element;
    },
    /** Registers a listener or handler for the given `event`.
     * @param {string} event A case sensitive string representing the type of event to be listened.
     * @param {(ev: Event) => void} listener The function (accepting a parameter of the Event) which listens to the event and does something as it is triggered.
     * @see https://developer.mozilla.org/en-US/docs/Web/Events
     */
    on: function (event, listener) {
      self.element.addEventListener(event, listener);
    },
    /**
     * Hides an element using CSS Visibility (hidden)
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
     */
    hide: function () {
      self.element.style.visibility = 'hidden';
    },
    /** Gets or sets a HTML attribute of the element.
     * @param {string} name The name of the attribute to perform the action on (get or set).
     * @param {any} [value] The value of the attribute. If not passed, returns the value of the attribute name passed in the first argument.
     * @returns If `value` is not passed, returns the value of the given attribute name. If it is passed, returns nothing (`undefined`).
     * @see https://developer.mozilla.org/en-US/docs/Glossary/Attribute
     */
    attr: function (name, value) {
      if (value == null) {
        return self.element.getAttribute(name);
      } else {
        self.element.setAttribute(name, value);
      }
    },
    /**
     * Shows an element using CSS Visibility (visible)
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
     */
    show: function () {
      self.element.style.visibility = 'visible';
    },
    /**
     * Appends a string to the end of the [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) of the element.
     * @param {string} text The string to be appended
     */
    append: function (text) {
      self.element.innerHTML = self.element.innerHTML + text;
    },
    /**
     * Prepends a string to the end of the [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) of the element.
     * @param {string} text The string to be prepended.
     */
    prepend: function (text) {
      self.element.innerHTML = text + self.element.innerHTML;
    },
    /**
     * Changes the styles of the given CSS `prop` to `val`.
     * @param {string} prop The CSS property to change the styles.
     * @param {*} val The value of the property.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference
     */
    css: function (prop, val) {
      self.element.style[prop] = val;
    },
    /**
     * Removes the given element from the DOM.
     */
    remove: function () {
      self.element.remove();
    },
    /**
     * Toggles the visibility of an element (hidden/visible).
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
     */
    toggle: function () {
      self.element.style.visibility == 'visible'
        ? (self.element.style.visibility = 'hidden')
        : (self.element.style.visibility = 'visible');
    },
    /**
     * Performs the given `action` on the LOcalStorage.
     * @param {'clear'|'set'|'get'|'remove'} action The name of the action to be performed.
     * @param {string} key The key of the element to perform the given `action` on.
     * @param {string} [value] If `action == 'set'`, sets the value of the given `action`, else ignored.
     * @returns If `action=='get'`, returns the value of the given key, else `undefined`.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
     */
    storage: function (action, key, value) {
      if (action == 'clear') {
        localStorage.clear();
      } else if (action == 'set') {
        localStorage.setItem(key, value);
      } else if (action == 'get') {
        value = localStorage.getItem(key);
        return value;
      } else if (action == 'remove') {
        localStorage.remove(key);
      } else {
        console.log('no action defined');
      }
    },
    /**
     * Appends a remote JavaScript file to the head of the document.
     * @param {string} url THe absolute or relative path to the script which is to be added to the document.
     */
    addScript: function (url) {
      const script = document.createElement('script');
      script.src = url;
      document.head.append(script);
    },
    /**
     * Appends a remote CSS file to the head of the document.
     * @param {string} url THe absolute or relative path to the stylesheet which is to be added to the document.
     */
    addStyle: function (url) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.src = url;
      document.head.append(style);
    },
    /**
     * Sets / creates a cookie.
     * @param {string} key The key of the new cookie.
     * @param {string} val The value to the cookie.
     * @param {string} expires The expiry date in the GMT String format \([see here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString)\)
     * @param {string} path The path under which the cookie is valid.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
     */
    setCookie: function (key, val, expires, path) {
      if (expires == null) {
        expires = 'session';
      }
      document.cookie = `${key}=${val}; expires=${expires}; path=${path}`;
    },
    /**
     * Gets the value of a set cookie.
     * @param {string} cname The key of the desired cookie.
     * @returns The value of the cookie or an empty string if the cookie with the given `cname` is not set.
     */
    getCookie: function (cname) {
      const name = cname + '=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
    /**
     * Appends a new element to the given element as the latter's child.
     * @param {string} elm The name of the element to be created \([see here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)\)
     * @param {string} [id] The value of the [id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) attribute to be set on the new element.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    addElm: function (elm, id) {
      var element1 = document.createElement(elm);
      element1.id = id;
      self.element.appendChild(element1);
    },
    /**
     *
     * @param {string} [text]
     * @returns If `text` is not passed, returns the [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) of the given element, else `undefined`.
     */
    text: function (text) {
      if (text == null) {
        return self.element.innerHTML;
      } else {
        self.element.innerHTML = text;
      }
    },
    /**
     * Converts a text into an image using Canvas.
     * @param {string} text The text to be converted.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
     */
    textToImg: function (text) {
      var canvas = self.element;
      var ctx = canvas.getContext('2d');
      ctx.font = '30px Arial';
      ctx.fillText(text, 10, 50);
    },
    /**
     * Pulses the vibration hardware on a client. If no such hardware is present, this has no effect.
     * @param {number|Array.<Number>} val The pattern of vibration
     */
    vibrate: function (val) {
      navigator.vibrate(val);
    },
    /**
     * Uses the system's text-to-speech engine to speak the given `message`.
     * @param {string} message The string to be speech-synthesized.
     */
    read: function (message) {
      var speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    },
    /**
     * Perform a GET request on the given `url`.
     * @param {string} url The URL to be fetched.
     */
    load: function (url) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          self.element.innerHTML = this.responseText;
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    },
    /**
     * Performs a GET request on the given `url` with credentials.
     * @param {string} url The URL to be fetched.
     * @param {string} username The username for the request.
     * @param {string} password The password for the request.
     */
    loadWithPass: function (url, username, password) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          self.element.innerHTML = this.responseText;
        }
      };
      xhttp.open('GET', url, true, username, password);
      xhttp.send();
    },
    /**
     * @property {string} lang The system language of the client.
     * @property {string} userAgent The user agent string of the client.
     * @property {string} os The operating system platform used by the client.
     * @property {string} vendor The manufacturer / vendor of the client.
     * @property {boolean} online Returns whether the client is connected to a network.
     * @property {boolean} cookieEnabled Returns whether cookies are enabled by the client.
     * @property {"1"|"0"|"unspecified"} doNotTrack The 'Do not track' setting of the client.
     * @property {string} version The reported version of the browser used by the client.
     */
    data: {
      lang: navigator.language,
      userAgent: navigator.userAgent,
      os: navigator.platform,
      vender: navigator.vendor,
      online: navigator.onLine,
      cookies: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      version: navigator.appVersion,
    },
    /**
     * Redirects the client to the given `url`.
     * @param {string} url Redirection target
     */
    redirect: function (url) {
      document.location.href = url;
    },
    /**
     * Set the fingerprint in the localStorage (sort of).
     * @param {string} fingerprintValue
     */
    fingerprint: function (fingerprintValue) {
      hash().storage('set', 'fingerprints', fingerprintValue);
    },
    /**
     * Check the stored fingerprint against the given one.
     * @param {string} val The fingerprint to check the stored one against.
     * @returns`true` if stored fingerprint matches the given fingerprint, `false` otherwise.
     */
    checkFingerprint: function (val) {
      if (hash().storage('get', 'fingerprints') == val) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Create custom elements with the specified markup.
     * @param {string} name Name of the custom element
     * @param {string} code HTML markup for the element.
     */
    recycle: function (name, code) {
      class Header extends HTMLElement {
        constructor() {
          super();
        }

        connectedCallback() {
          this.innerHTML = code;
        }
      }
      customElements.define(name, Header);
    },
  };
  return self;
};

/*
  starting the react class which extends to a constructor.
*/

class react {
  constructor({ el, data }) {
    this.$el = document.querySelector(el);
    this.$data = data;

    const render = renderreact(this);
    walkDataProps(this, render);
    render();
  }
}

const regex = {
  mostach: /\{\{((?:.|\r?\n)+?)\}\}/,
};

function renderreact(react) {
  const originalTemplate = react.$el.cloneNode(true);

  return () => {
    const { $data } = react;

    react.$el.innerHTML = originalTemplate.innerHTML.replace(
      new RegExp(regex.mostach, "g"),
      (_, val) => $data[val.trim()]
    );
  };
}

function walkDataProps(react, cb) {
  for (const key in react.$data) {
    defineReactive(react, key);
    defineReactive(react, key, cb);
  }
}

function defineReactive(obj, key, cb) {
  let value = obj.$data[key];

  Object.defineProperty(cb ? obj.$data : obj, key, {
    configurable: true,
    get() {
      return value;
    },
    set(newValue) {
      if (value === newValue) return;
      value = newValue;

      if (cb) {
        obj[key] = value;
        cb();
      } else {
        obj.$data[key] = value;
      }
    },
  });
}
