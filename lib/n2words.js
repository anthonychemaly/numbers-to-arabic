/**
 * @module n2words
 */

import n2wordsAR from './i18n/ar.js';
import n2wordsEN from './i18n/en.js';

const dict = {
  en: n2wordsEN, // default
  ar: n2wordsAR,
};

/**
 * Converts a number to written form.
 * @param {number|string|bigint} value The number to convert.
 * @param {object} [options] User options.
 * @returns {string} Value in written format.
 * TODO [2024-06] Migrate to object destructing for parameters
 */
// eslint-disable-next-line unicorn/no-object-as-default-parameter
function floatToCardinal(value, options = { lang: 'en' }) {
  const function_ = dict[options.lang];
  if (function_ != undefined) return function_(value, options);

  const fallbackLang = options.lang
    .split('-') // 'en-UK' -> ['en', 'UK']
    .map((_, index, array) => array.slice(0, array.length - index).join('-')) // ['en-UK', 'en']
    .find((l) => dict[l] != undefined);
  if (fallbackLang != undefined) return dict[fallbackLang](value, options);

  throw new Error('Unsupported language: ' + value + '.');
}

export default floatToCardinal;
