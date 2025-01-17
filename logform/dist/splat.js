'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('util');

var _require = require('triple-beam'),
    SPLAT = _require.SPLAT;

/**
 * Captures the number of format (i.e. %s strings) in a given string.
 * Based on `util.format`, see Node.js source:
 * https://github.com/nodejs/node/blob/b1c8f15c5f169e021f7c46eb7b219de95fe97603/lib/util.js#L201-L230
 * @type {RegExp}
 */


var formatRegExp = /%[scdjifoO%]/g;

/**
 * Captures the number of escaped % signs in a format string (i.e. %s strings).
 * @type {RegExp}
 */
var escapedPercent = /%%/g;

var Splatter = function () {
  function Splatter(opts) {
    _classCallCheck(this, Splatter);

    this.options = opts;
  }

  /**
     * Check to see if tokens <= splat.length, assign { splat, meta } into the
     * `info` accordingly, and write to this instance.
     *
     * @param  {Info} info Logform info message.
     * @param  {String[]} tokens Set of string interpolation tokens.
     * @returns {Info} Modified info message
     * @private
     */


  _createClass(Splatter, [{
    key: '_splat',
    value: function _splat(info, tokens) {
      var msg = info.message;
      var splat = info[SPLAT] || info.splat || [];
      var percents = msg.match(escapedPercent);
      var escapes = percents && percents.length || 0;

      // The expected splat is the number of tokens minus the number of escapes
      // e.g.
      // - { expectedSplat: 3 } '%d %s %j'
      // - { expectedSplat: 5 } '[%s] %d%% %d%% %s %j'
      //
      // Any "meta" will be arugments in addition to the expected splat size
      // regardless of type. e.g.
      //
      // logger.log('info', '%d%% %s %j', 100, 'wow', { such: 'js' }, { thisIsMeta: true });
      // would result in splat of four (4), but only three (3) are expected. Therefore:
      //
      // extraSplat = 3 - 4 = -1
      // metas = [100, 'wow', { such: 'js' }, { thisIsMeta: true }].splice(-1, -1 * -1);
      // splat = [100, 'wow', { such: 'js' }]
      var expectedSplat = tokens.length - escapes;
      var extraSplat = expectedSplat - splat.length;
      var metas = extraSplat < 0 ? splat.splice(extraSplat, -1 * extraSplat) : [];

      // Now that { splat } has been separated from any potential { meta }. we
      // can assign this to the `info` object and write it to our format stream.
      if (metas.length === 1) {
        info.meta = metas[0];
      } else if (metas.length) {
        info.meta = metas;
      }

      info.message = util.format.apply(util, [msg].concat(_toConsumableArray(splat)));
      return info;
    }

    /**
       * Transforms the `info` message by using `util.format` to complete
       * any `info.message` provided it has string interpolation tokens.
       * If no tokens exist then `info` is immutable.
       *
       * @param  {Info} info Logform info message.
       * @param  {Object} opts Options for this instance.
       * @returns {Info} Modified info message
       */

  }, {
    key: 'transform',
    value: function transform(info) {
      var msg = info.message;
      var splat = info[SPLAT] || info.splat;

      // No need to process anything if splat is undefined
      if (!splat || !splat.length) {
        return info;
      }

      // Extract tokens, if none available default to empty array to
      // ensure consistancy in expected results
      var tokens = msg && msg.match && msg.match(formatRegExp);

      // This condition will take care of inputs with info[SPLAT]
      // but no tokens present
      if (!tokens && (splat || splat.length)) {
        var metas = splat.length > 1 ? splat.splice(0) : splat;

        // Now that { splat } has been separated from any potential { meta }. we
        // can assign this to the `info` object and write it to our format stream.
        if (metas.length === 1) {
          info.meta = metas[0];
        } else if (metas.length) {
          info.meta = metas;
        }
        return info;
      }

      if (tokens) {
        return this._splat(info, tokens);
      }

      return info;
    }
  }]);

  return Splatter;
}();

/*
 * function splat (info)
 * Returns a new instance of the splat format TransformStream
 * which performs string interpolation from `info` objects. This was
 * previously exposed implicitly in `winston < 3.0.0`.
 */


module.exports = function (opts) {
  return new Splatter(opts);
};