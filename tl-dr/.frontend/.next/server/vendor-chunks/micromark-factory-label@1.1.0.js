"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-factory-label@1.1.0";
exports.ids = ["vendor-chunks/micromark-factory-label@1.1.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/micromark-factory-label@1.1.0/node_modules/micromark-factory-label/dev/index.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/micromark-factory-label@1.1.0/node_modules/micromark-factory-label/dev/index.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   factoryLabel: () => (/* binding */ factoryLabel)\n/* harmony export */ });\n/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ \"(ssr)/./node_modules/.pnpm/micromark-util-character@1.2.0/node_modules/micromark-util-character/dev/index.js\");\n/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ \"(ssr)/./node_modules/.pnpm/micromark-util-symbol@1.1.0/node_modules/micromark-util-symbol/codes.js\");\n/* harmony import */ var micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol/constants.js */ \"(ssr)/./node_modules/.pnpm/micromark-util-symbol@1.1.0/node_modules/micromark-util-symbol/constants.js\");\n/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromark-util-symbol/types.js */ \"(ssr)/./node_modules/.pnpm/micromark-util-symbol@1.1.0/node_modules/micromark-util-symbol/types.js\");\n/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ \"(ssr)/./node_modules/.pnpm/uvu@0.5.6/node_modules/uvu/assert/index.mjs\");\n/**\n * @typedef {import('micromark-util-types').Effects} Effects\n * @typedef {import('micromark-util-types').State} State\n * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext\n * @typedef {import('micromark-util-types').TokenType} TokenType\n */\n\n\n\n\n\n\n\n/**\n * Parse labels.\n *\n * > 👉 **Note**: labels in markdown are capped at 999 characters in the string.\n *\n * ###### Examples\n *\n * ```markdown\n * [a]\n * [a\n * b]\n * [a\\]b]\n * ```\n *\n * @this {TokenizeContext}\n *   Tokenize context.\n * @param {Effects} effects\n *   Context.\n * @param {State} ok\n *   State switched to when successful.\n * @param {State} nok\n *   State switched to when unsuccessful.\n * @param {TokenType} type\n *   Type of the whole label (`[a]`).\n * @param {TokenType} markerType\n *   Type for the markers (`[` and `]`).\n * @param {TokenType} stringType\n *   Type for the identifier (`a`).\n * @returns {State}\n *   Start state.\n */\n// eslint-disable-next-line max-params\nfunction factoryLabel(effects, ok, nok, type, markerType, stringType) {\n  const self = this\n  let size = 0\n  /** @type {boolean} */\n  let seen\n\n  return start\n\n  /**\n   * Start of label.\n   *\n   * ```markdown\n   * > | [a]\n   *     ^\n   * ```\n   *\n   * @type {State}\n   */\n  function start(code) {\n    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket, 'expected `[`')\n    effects.enter(type)\n    effects.enter(markerType)\n    effects.consume(code)\n    effects.exit(markerType)\n    effects.enter(stringType)\n    return atBreak\n  }\n\n  /**\n   * In label, at something, before something else.\n   *\n   * ```markdown\n   * > | [a]\n   *      ^\n   * ```\n   *\n   * @type {State}\n   */\n  function atBreak(code) {\n    if (\n      size > micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.linkReferenceSizeMax ||\n      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||\n      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||\n      (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket && !seen) ||\n      // To do: remove in the future once we’ve switched from\n      // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,\n      // which doesn’t need this.\n      // Hidden footnotes hook.\n      /* c8 ignore next 3 */\n      (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.caret &&\n        !size &&\n        '_hiddenFootnoteSupport' in self.parser.constructs)\n    ) {\n      return nok(code)\n    }\n\n    if (code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket) {\n      effects.exit(stringType)\n      effects.enter(markerType)\n      effects.consume(code)\n      effects.exit(markerType)\n      effects.exit(type)\n      return ok\n    }\n\n    // To do: indent? Link chunks and EOLs together?\n    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code)) {\n      effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)\n      effects.consume(code)\n      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.lineEnding)\n      return atBreak\n    }\n\n    effects.enter(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkString, {contentType: micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.contentTypeString})\n    return labelInside(code)\n  }\n\n  /**\n   * In label, in text.\n   *\n   * ```markdown\n   * > | [a]\n   *      ^\n   * ```\n   *\n   * @type {State}\n   */\n  function labelInside(code) {\n    if (\n      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.eof ||\n      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||\n      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket ||\n      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownLineEnding)(code) ||\n      size++ > micromark_util_symbol_constants_js__WEBPACK_IMPORTED_MODULE_2__.constants.linkReferenceSizeMax\n    ) {\n      effects.exit(micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_4__.types.chunkString)\n      return atBreak(code)\n    }\n\n    effects.consume(code)\n    if (!seen) seen = !(0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.markdownSpace)(code)\n    return code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.backslash ? labelEscape : labelInside\n  }\n\n  /**\n   * After `\\`, at a special character.\n   *\n   * ```markdown\n   * > | [a\\*a]\n   *        ^\n   * ```\n   *\n   * @type {State}\n   */\n  function labelEscape(code) {\n    if (\n      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.leftSquareBracket ||\n      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.backslash ||\n      code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_1__.codes.rightSquareBracket\n    ) {\n      effects.consume(code)\n      size++\n      return labelInside\n    }\n\n    return labelInside(code)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbWljcm9tYXJrLWZhY3RvcnktbGFiZWxAMS4xLjAvbm9kZV9tb2R1bGVzL21pY3JvbWFyay1mYWN0b3J5LWxhYmVsL2Rldi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEsd0NBQXdDO0FBQ3JELGFBQWEsc0NBQXNDO0FBQ25ELGFBQWEsZ0RBQWdEO0FBQzdELGFBQWEsMENBQTBDO0FBQ3ZEOztBQUUwRTtBQUN0QjtBQUNRO0FBQ1I7QUFDYjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsSUFBSSwrQ0FBTSxVQUFVLGlFQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsYUFBYSx5RUFBUztBQUN0QixlQUFlLGlFQUFLO0FBQ3BCLGVBQWUsaUVBQUs7QUFDcEIsZ0JBQWdCLGlFQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUVBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsaUVBQUs7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLDRFQUFrQjtBQUMxQixvQkFBb0IsaUVBQUs7QUFDekI7QUFDQSxtQkFBbUIsaUVBQUs7QUFDeEI7QUFDQTs7QUFFQSxrQkFBa0IsaUVBQUssZUFBZSxhQUFhLHlFQUFTLG1CQUFtQjtBQUMvRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpRUFBSztBQUNwQixlQUFlLGlFQUFLO0FBQ3BCLGVBQWUsaUVBQUs7QUFDcEIsTUFBTSw0RUFBa0I7QUFDeEIsZUFBZSx5RUFBUztBQUN4QjtBQUNBLG1CQUFtQixpRUFBSztBQUN4QjtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHVFQUFhO0FBQ3BDLG9CQUFvQixpRUFBSztBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUVBQUs7QUFDcEIsZUFBZSxpRUFBSztBQUNwQixlQUFlLGlFQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvaG9tZS9rZW5qaS9oYWNrLXByb2plY3RzL3RsLWRyL3RsLWRyLy5mcm9udGVuZC9ub2RlX21vZHVsZXMvLnBucG0vbWljcm9tYXJrLWZhY3RvcnktbGFiZWxAMS4xLjAvbm9kZV9tb2R1bGVzL21pY3JvbWFyay1mYWN0b3J5LWxhYmVsL2Rldi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay11dGlsLXR5cGVzJykuRWZmZWN0c30gRWZmZWN0c1xuICogQHR5cGVkZWYge2ltcG9ydCgnbWljcm9tYXJrLXV0aWwtdHlwZXMnKS5TdGF0ZX0gU3RhdGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay11dGlsLXR5cGVzJykuVG9rZW5pemVDb250ZXh0fSBUb2tlbml6ZUNvbnRleHRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay11dGlsLXR5cGVzJykuVG9rZW5UeXBlfSBUb2tlblR5cGVcbiAqL1xuXG5pbXBvcnQge21hcmtkb3duTGluZUVuZGluZywgbWFya2Rvd25TcGFjZX0gZnJvbSAnbWljcm9tYXJrLXV0aWwtY2hhcmFjdGVyJ1xuaW1wb3J0IHtjb2Rlc30gZnJvbSAnbWljcm9tYXJrLXV0aWwtc3ltYm9sL2NvZGVzLmpzJ1xuaW1wb3J0IHtjb25zdGFudHN9IGZyb20gJ21pY3JvbWFyay11dGlsLXN5bWJvbC9jb25zdGFudHMuanMnXG5pbXBvcnQge3R5cGVzfSBmcm9tICdtaWNyb21hcmstdXRpbC1zeW1ib2wvdHlwZXMuanMnXG5pbXBvcnQge29rIGFzIGFzc2VydH0gZnJvbSAndXZ1L2Fzc2VydCdcblxuLyoqXG4gKiBQYXJzZSBsYWJlbHMuXG4gKlxuICogPiDwn5GJICoqTm90ZSoqOiBsYWJlbHMgaW4gbWFya2Rvd24gYXJlIGNhcHBlZCBhdCA5OTkgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nLlxuICpcbiAqICMjIyMjIyBFeGFtcGxlc1xuICpcbiAqIGBgYG1hcmtkb3duXG4gKiBbYV1cbiAqIFthXG4gKiBiXVxuICogW2FcXF1iXVxuICogYGBgXG4gKlxuICogQHRoaXMge1Rva2VuaXplQ29udGV4dH1cbiAqICAgVG9rZW5pemUgY29udGV4dC5cbiAqIEBwYXJhbSB7RWZmZWN0c30gZWZmZWN0c1xuICogICBDb250ZXh0LlxuICogQHBhcmFtIHtTdGF0ZX0gb2tcbiAqICAgU3RhdGUgc3dpdGNoZWQgdG8gd2hlbiBzdWNjZXNzZnVsLlxuICogQHBhcmFtIHtTdGF0ZX0gbm9rXG4gKiAgIFN0YXRlIHN3aXRjaGVkIHRvIHdoZW4gdW5zdWNjZXNzZnVsLlxuICogQHBhcmFtIHtUb2tlblR5cGV9IHR5cGVcbiAqICAgVHlwZSBvZiB0aGUgd2hvbGUgbGFiZWwgKGBbYV1gKS5cbiAqIEBwYXJhbSB7VG9rZW5UeXBlfSBtYXJrZXJUeXBlXG4gKiAgIFR5cGUgZm9yIHRoZSBtYXJrZXJzIChgW2AgYW5kIGBdYCkuXG4gKiBAcGFyYW0ge1Rva2VuVHlwZX0gc3RyaW5nVHlwZVxuICogICBUeXBlIGZvciB0aGUgaWRlbnRpZmllciAoYGFgKS5cbiAqIEByZXR1cm5zIHtTdGF0ZX1cbiAqICAgU3RhcnQgc3RhdGUuXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXG5leHBvcnQgZnVuY3Rpb24gZmFjdG9yeUxhYmVsKGVmZmVjdHMsIG9rLCBub2ssIHR5cGUsIG1hcmtlclR5cGUsIHN0cmluZ1R5cGUpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgbGV0IHNpemUgPSAwXG4gIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgbGV0IHNlZW5cblxuICByZXR1cm4gc3RhcnRcblxuICAvKipcbiAgICogU3RhcnQgb2YgbGFiZWwuXG4gICAqXG4gICAqIGBgYG1hcmtkb3duXG4gICAqID4gfCBbYV1cbiAgICogICAgIF5cbiAgICogYGBgXG4gICAqXG4gICAqIEB0eXBlIHtTdGF0ZX1cbiAgICovXG4gIGZ1bmN0aW9uIHN0YXJ0KGNvZGUpIHtcbiAgICBhc3NlcnQoY29kZSA9PT0gY29kZXMubGVmdFNxdWFyZUJyYWNrZXQsICdleHBlY3RlZCBgW2AnKVxuICAgIGVmZmVjdHMuZW50ZXIodHlwZSlcbiAgICBlZmZlY3RzLmVudGVyKG1hcmtlclR5cGUpXG4gICAgZWZmZWN0cy5jb25zdW1lKGNvZGUpXG4gICAgZWZmZWN0cy5leGl0KG1hcmtlclR5cGUpXG4gICAgZWZmZWN0cy5lbnRlcihzdHJpbmdUeXBlKVxuICAgIHJldHVybiBhdEJyZWFrXG4gIH1cblxuICAvKipcbiAgICogSW4gbGFiZWwsIGF0IHNvbWV0aGluZywgYmVmb3JlIHNvbWV0aGluZyBlbHNlLlxuICAgKlxuICAgKiBgYGBtYXJrZG93blxuICAgKiA+IHwgW2FdXG4gICAqICAgICAgXlxuICAgKiBgYGBcbiAgICpcbiAgICogQHR5cGUge1N0YXRlfVxuICAgKi9cbiAgZnVuY3Rpb24gYXRCcmVhayhjb2RlKSB7XG4gICAgaWYgKFxuICAgICAgc2l6ZSA+IGNvbnN0YW50cy5saW5rUmVmZXJlbmNlU2l6ZU1heCB8fFxuICAgICAgY29kZSA9PT0gY29kZXMuZW9mIHx8XG4gICAgICBjb2RlID09PSBjb2Rlcy5sZWZ0U3F1YXJlQnJhY2tldCB8fFxuICAgICAgKGNvZGUgPT09IGNvZGVzLnJpZ2h0U3F1YXJlQnJhY2tldCAmJiAhc2VlbikgfHxcbiAgICAgIC8vIFRvIGRvOiByZW1vdmUgaW4gdGhlIGZ1dHVyZSBvbmNlIHdl4oCZdmUgc3dpdGNoZWQgZnJvbVxuICAgICAgLy8gYG1pY3JvbWFyay1leHRlbnNpb24tZm9vdG5vdGVgIHRvIGBtaWNyb21hcmstZXh0ZW5zaW9uLWdmbS1mb290bm90ZWAsXG4gICAgICAvLyB3aGljaCBkb2VzbuKAmXQgbmVlZCB0aGlzLlxuICAgICAgLy8gSGlkZGVuIGZvb3Rub3RlcyBob29rLlxuICAgICAgLyogYzggaWdub3JlIG5leHQgMyAqL1xuICAgICAgKGNvZGUgPT09IGNvZGVzLmNhcmV0ICYmXG4gICAgICAgICFzaXplICYmXG4gICAgICAgICdfaGlkZGVuRm9vdG5vdGVTdXBwb3J0JyBpbiBzZWxmLnBhcnNlci5jb25zdHJ1Y3RzKVxuICAgICkge1xuICAgICAgcmV0dXJuIG5vayhjb2RlKVxuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBjb2Rlcy5yaWdodFNxdWFyZUJyYWNrZXQpIHtcbiAgICAgIGVmZmVjdHMuZXhpdChzdHJpbmdUeXBlKVxuICAgICAgZWZmZWN0cy5lbnRlcihtYXJrZXJUeXBlKVxuICAgICAgZWZmZWN0cy5jb25zdW1lKGNvZGUpXG4gICAgICBlZmZlY3RzLmV4aXQobWFya2VyVHlwZSlcbiAgICAgIGVmZmVjdHMuZXhpdCh0eXBlKVxuICAgICAgcmV0dXJuIG9rXG4gICAgfVxuXG4gICAgLy8gVG8gZG86IGluZGVudD8gTGluayBjaHVua3MgYW5kIEVPTHMgdG9nZXRoZXI/XG4gICAgaWYgKG1hcmtkb3duTGluZUVuZGluZyhjb2RlKSkge1xuICAgICAgZWZmZWN0cy5lbnRlcih0eXBlcy5saW5lRW5kaW5nKVxuICAgICAgZWZmZWN0cy5jb25zdW1lKGNvZGUpXG4gICAgICBlZmZlY3RzLmV4aXQodHlwZXMubGluZUVuZGluZylcbiAgICAgIHJldHVybiBhdEJyZWFrXG4gICAgfVxuXG4gICAgZWZmZWN0cy5lbnRlcih0eXBlcy5jaHVua1N0cmluZywge2NvbnRlbnRUeXBlOiBjb25zdGFudHMuY29udGVudFR5cGVTdHJpbmd9KVxuICAgIHJldHVybiBsYWJlbEluc2lkZShjb2RlKVxuICB9XG5cbiAgLyoqXG4gICAqIEluIGxhYmVsLCBpbiB0ZXh0LlxuICAgKlxuICAgKiBgYGBtYXJrZG93blxuICAgKiA+IHwgW2FdXG4gICAqICAgICAgXlxuICAgKiBgYGBcbiAgICpcbiAgICogQHR5cGUge1N0YXRlfVxuICAgKi9cbiAgZnVuY3Rpb24gbGFiZWxJbnNpZGUoY29kZSkge1xuICAgIGlmIChcbiAgICAgIGNvZGUgPT09IGNvZGVzLmVvZiB8fFxuICAgICAgY29kZSA9PT0gY29kZXMubGVmdFNxdWFyZUJyYWNrZXQgfHxcbiAgICAgIGNvZGUgPT09IGNvZGVzLnJpZ2h0U3F1YXJlQnJhY2tldCB8fFxuICAgICAgbWFya2Rvd25MaW5lRW5kaW5nKGNvZGUpIHx8XG4gICAgICBzaXplKysgPiBjb25zdGFudHMubGlua1JlZmVyZW5jZVNpemVNYXhcbiAgICApIHtcbiAgICAgIGVmZmVjdHMuZXhpdCh0eXBlcy5jaHVua1N0cmluZylcbiAgICAgIHJldHVybiBhdEJyZWFrKGNvZGUpXG4gICAgfVxuXG4gICAgZWZmZWN0cy5jb25zdW1lKGNvZGUpXG4gICAgaWYgKCFzZWVuKSBzZWVuID0gIW1hcmtkb3duU3BhY2UoY29kZSlcbiAgICByZXR1cm4gY29kZSA9PT0gY29kZXMuYmFja3NsYXNoID8gbGFiZWxFc2NhcGUgOiBsYWJlbEluc2lkZVxuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIGBcXGAsIGF0IGEgc3BlY2lhbCBjaGFyYWN0ZXIuXG4gICAqXG4gICAqIGBgYG1hcmtkb3duXG4gICAqID4gfCBbYVxcKmFdXG4gICAqICAgICAgICBeXG4gICAqIGBgYFxuICAgKlxuICAgKiBAdHlwZSB7U3RhdGV9XG4gICAqL1xuICBmdW5jdGlvbiBsYWJlbEVzY2FwZShjb2RlKSB7XG4gICAgaWYgKFxuICAgICAgY29kZSA9PT0gY29kZXMubGVmdFNxdWFyZUJyYWNrZXQgfHxcbiAgICAgIGNvZGUgPT09IGNvZGVzLmJhY2tzbGFzaCB8fFxuICAgICAgY29kZSA9PT0gY29kZXMucmlnaHRTcXVhcmVCcmFja2V0XG4gICAgKSB7XG4gICAgICBlZmZlY3RzLmNvbnN1bWUoY29kZSlcbiAgICAgIHNpemUrK1xuICAgICAgcmV0dXJuIGxhYmVsSW5zaWRlXG4gICAgfVxuXG4gICAgcmV0dXJuIGxhYmVsSW5zaWRlKGNvZGUpXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/micromark-factory-label@1.1.0/node_modules/micromark-factory-label/dev/index.js\n");

/***/ })

};
;