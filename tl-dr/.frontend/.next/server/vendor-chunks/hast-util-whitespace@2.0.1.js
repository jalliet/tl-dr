"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-whitespace@2.0.1";
exports.ids = ["vendor-chunks/hast-util-whitespace@2.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/hast-util-whitespace@2.0.1/node_modules/hast-util-whitespace/index.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/.pnpm/hast-util-whitespace@2.0.1/node_modules/hast-util-whitespace/index.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   whitespace: () => (/* binding */ whitespace)\n/* harmony export */ });\n/**\n * Check if the given value is *inter-element whitespace*.\n *\n * @param {unknown} thing\n *   Thing to check (typically `Node` or `string`).\n * @returns {boolean}\n *   Whether the `value` is inter-element whitespace (`boolean`): consisting of\n *   zero or more of space, tab (`\\t`), line feed (`\\n`), carriage return\n *   (`\\r`), or form feed (`\\f`).\n *   If a node is passed it must be a `Text` node, whose `value` field is\n *   checked.\n */\nfunction whitespace(thing) {\n  /** @type {string} */\n  const value =\n    // @ts-expect-error looks like a node.\n    thing && typeof thing === 'object' && thing.type === 'text'\n      ? // @ts-expect-error looks like a text.\n        thing.value || ''\n      : thing\n\n  // HTML whitespace expression.\n  // See <https://infra.spec.whatwg.org/#ascii-whitespace>.\n  return typeof value === 'string' && value.replace(/[ \\t\\n\\f\\r]/g, '') === ''\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vaGFzdC11dGlsLXdoaXRlc3BhY2VAMi4wLjEvbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC13aGl0ZXNwYWNlL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvaG9tZS9rZW5qaS9oYWNrLXByb2plY3RzL3RsLWRyL3RsLWRyLy5mcm9udGVuZC9ub2RlX21vZHVsZXMvLnBucG0vaGFzdC11dGlsLXdoaXRlc3BhY2VAMi4wLjEvbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC13aGl0ZXNwYWNlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzICppbnRlci1lbGVtZW50IHdoaXRlc3BhY2UqLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmdcbiAqICAgVGhpbmcgdG8gY2hlY2sgKHR5cGljYWxseSBgTm9kZWAgb3IgYHN0cmluZ2ApLlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiAgIFdoZXRoZXIgdGhlIGB2YWx1ZWAgaXMgaW50ZXItZWxlbWVudCB3aGl0ZXNwYWNlIChgYm9vbGVhbmApOiBjb25zaXN0aW5nIG9mXG4gKiAgIHplcm8gb3IgbW9yZSBvZiBzcGFjZSwgdGFiIChgXFx0YCksIGxpbmUgZmVlZCAoYFxcbmApLCBjYXJyaWFnZSByZXR1cm5cbiAqICAgKGBcXHJgKSwgb3IgZm9ybSBmZWVkIChgXFxmYCkuXG4gKiAgIElmIGEgbm9kZSBpcyBwYXNzZWQgaXQgbXVzdCBiZSBhIGBUZXh0YCBub2RlLCB3aG9zZSBgdmFsdWVgIGZpZWxkIGlzXG4gKiAgIGNoZWNrZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGl0ZXNwYWNlKHRoaW5nKSB7XG4gIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICBjb25zdCB2YWx1ZSA9XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBsb29rcyBsaWtlIGEgbm9kZS5cbiAgICB0aGluZyAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnICYmIHRoaW5nLnR5cGUgPT09ICd0ZXh0J1xuICAgICAgPyAvLyBAdHMtZXhwZWN0LWVycm9yIGxvb2tzIGxpa2UgYSB0ZXh0LlxuICAgICAgICB0aGluZy52YWx1ZSB8fCAnJ1xuICAgICAgOiB0aGluZ1xuXG4gIC8vIEhUTUwgd2hpdGVzcGFjZSBleHByZXNzaW9uLlxuICAvLyBTZWUgPGh0dHBzOi8vaW5mcmEuc3BlYy53aGF0d2cub3JnLyNhc2NpaS13aGl0ZXNwYWNlPi5cbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUucmVwbGFjZSgvWyBcXHRcXG5cXGZcXHJdL2csICcnKSA9PT0gJydcbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/hast-util-whitespace@2.0.1/node_modules/hast-util-whitespace/index.js\n");

/***/ })

};
;