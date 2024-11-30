"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-combine-extensions@1.1.0";
exports.ids = ["vendor-chunks/micromark-util-combine-extensions@1.1.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/micromark-util-combine-extensions@1.1.0/node_modules/micromark-util-combine-extensions/index.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/micromark-util-combine-extensions@1.1.0/node_modules/micromark-util-combine-extensions/index.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   combineExtensions: () => (/* binding */ combineExtensions),\n/* harmony export */   combineHtmlExtensions: () => (/* binding */ combineHtmlExtensions)\n/* harmony export */ });\n/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-chunked */ \"(ssr)/./node_modules/.pnpm/micromark-util-chunked@1.1.0/node_modules/micromark-util-chunked/dev/index.js\");\n/**\n * @typedef {import('micromark-util-types').Extension} Extension\n * @typedef {import('micromark-util-types').Handles} Handles\n * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension\n * @typedef {import('micromark-util-types').NormalizedExtension} NormalizedExtension\n */\n\n\n\nconst hasOwnProperty = {}.hasOwnProperty\n\n/**\n * Combine multiple syntax extensions into one.\n *\n * @param {Array<Extension>} extensions\n *   List of syntax extensions.\n * @returns {NormalizedExtension}\n *   A single combined extension.\n */\nfunction combineExtensions(extensions) {\n  /** @type {NormalizedExtension} */\n  const all = {}\n  let index = -1\n\n  while (++index < extensions.length) {\n    syntaxExtension(all, extensions[index])\n  }\n\n  return all\n}\n\n/**\n * Merge `extension` into `all`.\n *\n * @param {NormalizedExtension} all\n *   Extension to merge into.\n * @param {Extension} extension\n *   Extension to merge.\n * @returns {void}\n */\nfunction syntaxExtension(all, extension) {\n  /** @type {keyof Extension} */\n  let hook\n\n  for (hook in extension) {\n    const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined\n    /** @type {Record<string, unknown>} */\n    const left = maybe || (all[hook] = {})\n    /** @type {Record<string, unknown> | undefined} */\n    const right = extension[hook]\n    /** @type {string} */\n    let code\n\n    if (right) {\n      for (code in right) {\n        if (!hasOwnProperty.call(left, code)) left[code] = []\n        const value = right[code]\n        constructs(\n          // @ts-expect-error Looks like a list.\n          left[code],\n          Array.isArray(value) ? value : value ? [value] : []\n        )\n      }\n    }\n  }\n}\n\n/**\n * Merge `list` into `existing` (both lists of constructs).\n * Mutates `existing`.\n *\n * @param {Array<unknown>} existing\n * @param {Array<unknown>} list\n * @returns {void}\n */\nfunction constructs(existing, list) {\n  let index = -1\n  /** @type {Array<unknown>} */\n  const before = []\n\n  while (++index < list.length) {\n    // @ts-expect-error Looks like an object.\n    ;(list[index].add === 'after' ? existing : before).push(list[index])\n  }\n\n  (0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_0__.splice)(existing, 0, 0, before)\n}\n\n/**\n * Combine multiple HTML extensions into one.\n *\n * @param {Array<HtmlExtension>} htmlExtensions\n *   List of HTML extensions.\n * @returns {HtmlExtension}\n *   A single combined HTML extension.\n */\nfunction combineHtmlExtensions(htmlExtensions) {\n  /** @type {HtmlExtension} */\n  const handlers = {}\n  let index = -1\n\n  while (++index < htmlExtensions.length) {\n    htmlExtension(handlers, htmlExtensions[index])\n  }\n\n  return handlers\n}\n\n/**\n * Merge `extension` into `all`.\n *\n * @param {HtmlExtension} all\n *   Extension to merge into.\n * @param {HtmlExtension} extension\n *   Extension to merge.\n * @returns {void}\n */\nfunction htmlExtension(all, extension) {\n  /** @type {keyof HtmlExtension} */\n  let hook\n\n  for (hook in extension) {\n    const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined\n    const left = maybe || (all[hook] = {})\n    const right = extension[hook]\n    /** @type {keyof Handles} */\n    let type\n\n    if (right) {\n      for (type in right) {\n        // @ts-expect-error assume document vs regular handler are managed correctly.\n        left[type] = right[type]\n      }\n    }\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbWljcm9tYXJrLXV0aWwtY29tYmluZS1leHRlbnNpb25zQDEuMS4wL25vZGVfbW9kdWxlcy9taWNyb21hcmstdXRpbC1jb21iaW5lLWV4dGVuc2lvbnMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQSxhQUFhLDBDQUEwQztBQUN2RCxhQUFhLHdDQUF3QztBQUNyRCxhQUFhLDhDQUE4QztBQUMzRCxhQUFhLG9EQUFvRDtBQUNqRTs7QUFFNkM7O0FBRTdDLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxrQkFBa0I7QUFDN0I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1AsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQztBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7O0FBRUE7QUFDQTtBQUNBLGVBQWUseUJBQXlCO0FBQ3hDLHlDQUF5QztBQUN6QyxlQUFlLHFDQUFxQztBQUNwRDtBQUNBLGVBQWUsUUFBUTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsZ0JBQWdCO0FBQzNCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQjtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLEVBQUUsOERBQU07QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNCQUFzQjtBQUNqQztBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUCxhQUFhLGVBQWU7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUI7QUFDQSxXQUFXLGVBQWU7QUFDMUI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxlQUFlLGVBQWU7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL2hvbWUva2VuamkvaGFjay1wcm9qZWN0cy90bC1kci90bC1kci8uZnJvbnRlbmQvbm9kZV9tb2R1bGVzLy5wbnBtL21pY3JvbWFyay11dGlsLWNvbWJpbmUtZXh0ZW5zaW9uc0AxLjEuMC9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtY29tYmluZS1leHRlbnNpb25zL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWljcm9tYXJrLXV0aWwtdHlwZXMnKS5FeHRlbnNpb259IEV4dGVuc2lvblxuICogQHR5cGVkZWYge2ltcG9ydCgnbWljcm9tYXJrLXV0aWwtdHlwZXMnKS5IYW5kbGVzfSBIYW5kbGVzXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtaWNyb21hcmstdXRpbC10eXBlcycpLkh0bWxFeHRlbnNpb259IEh0bWxFeHRlbnNpb25cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay11dGlsLXR5cGVzJykuTm9ybWFsaXplZEV4dGVuc2lvbn0gTm9ybWFsaXplZEV4dGVuc2lvblxuICovXG5cbmltcG9ydCB7c3BsaWNlfSBmcm9tICdtaWNyb21hcmstdXRpbC1jaHVua2VkJ1xuXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5XG5cbi8qKlxuICogQ29tYmluZSBtdWx0aXBsZSBzeW50YXggZXh0ZW5zaW9ucyBpbnRvIG9uZS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PEV4dGVuc2lvbj59IGV4dGVuc2lvbnNcbiAqICAgTGlzdCBvZiBzeW50YXggZXh0ZW5zaW9ucy5cbiAqIEByZXR1cm5zIHtOb3JtYWxpemVkRXh0ZW5zaW9ufVxuICogICBBIHNpbmdsZSBjb21iaW5lZCBleHRlbnNpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lRXh0ZW5zaW9ucyhleHRlbnNpb25zKSB7XG4gIC8qKiBAdHlwZSB7Tm9ybWFsaXplZEV4dGVuc2lvbn0gKi9cbiAgY29uc3QgYWxsID0ge31cbiAgbGV0IGluZGV4ID0gLTFcblxuICB3aGlsZSAoKytpbmRleCA8IGV4dGVuc2lvbnMubGVuZ3RoKSB7XG4gICAgc3ludGF4RXh0ZW5zaW9uKGFsbCwgZXh0ZW5zaW9uc1tpbmRleF0pXG4gIH1cblxuICByZXR1cm4gYWxsXG59XG5cbi8qKlxuICogTWVyZ2UgYGV4dGVuc2lvbmAgaW50byBgYWxsYC5cbiAqXG4gKiBAcGFyYW0ge05vcm1hbGl6ZWRFeHRlbnNpb259IGFsbFxuICogICBFeHRlbnNpb24gdG8gbWVyZ2UgaW50by5cbiAqIEBwYXJhbSB7RXh0ZW5zaW9ufSBleHRlbnNpb25cbiAqICAgRXh0ZW5zaW9uIHRvIG1lcmdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHN5bnRheEV4dGVuc2lvbihhbGwsIGV4dGVuc2lvbikge1xuICAvKiogQHR5cGUge2tleW9mIEV4dGVuc2lvbn0gKi9cbiAgbGV0IGhvb2tcblxuICBmb3IgKGhvb2sgaW4gZXh0ZW5zaW9uKSB7XG4gICAgY29uc3QgbWF5YmUgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKGFsbCwgaG9vaykgPyBhbGxbaG9va10gOiB1bmRlZmluZWRcbiAgICAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIHVua25vd24+fSAqL1xuICAgIGNvbnN0IGxlZnQgPSBtYXliZSB8fCAoYWxsW2hvb2tdID0ge30pXG4gICAgLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHVuZGVmaW5lZH0gKi9cbiAgICBjb25zdCByaWdodCA9IGV4dGVuc2lvbltob29rXVxuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIGxldCBjb2RlXG5cbiAgICBpZiAocmlnaHQpIHtcbiAgICAgIGZvciAoY29kZSBpbiByaWdodCkge1xuICAgICAgICBpZiAoIWhhc093blByb3BlcnR5LmNhbGwobGVmdCwgY29kZSkpIGxlZnRbY29kZV0gPSBbXVxuICAgICAgICBjb25zdCB2YWx1ZSA9IHJpZ2h0W2NvZGVdXG4gICAgICAgIGNvbnN0cnVjdHMoXG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBMb29rcyBsaWtlIGEgbGlzdC5cbiAgICAgICAgICBsZWZ0W2NvZGVdLFxuICAgICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA/IFt2YWx1ZV0gOiBbXVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTWVyZ2UgYGxpc3RgIGludG8gYGV4aXN0aW5nYCAoYm90aCBsaXN0cyBvZiBjb25zdHJ1Y3RzKS5cbiAqIE11dGF0ZXMgYGV4aXN0aW5nYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PHVua25vd24+fSBleGlzdGluZ1xuICogQHBhcmFtIHtBcnJheTx1bmtub3duPn0gbGlzdFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGNvbnN0cnVjdHMoZXhpc3RpbmcsIGxpc3QpIHtcbiAgbGV0IGluZGV4ID0gLTFcbiAgLyoqIEB0eXBlIHtBcnJheTx1bmtub3duPn0gKi9cbiAgY29uc3QgYmVmb3JlID0gW11cblxuICB3aGlsZSAoKytpbmRleCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBMb29rcyBsaWtlIGFuIG9iamVjdC5cbiAgICA7KGxpc3RbaW5kZXhdLmFkZCA9PT0gJ2FmdGVyJyA/IGV4aXN0aW5nIDogYmVmb3JlKS5wdXNoKGxpc3RbaW5kZXhdKVxuICB9XG5cbiAgc3BsaWNlKGV4aXN0aW5nLCAwLCAwLCBiZWZvcmUpXG59XG5cbi8qKlxuICogQ29tYmluZSBtdWx0aXBsZSBIVE1MIGV4dGVuc2lvbnMgaW50byBvbmUuXG4gKlxuICogQHBhcmFtIHtBcnJheTxIdG1sRXh0ZW5zaW9uPn0gaHRtbEV4dGVuc2lvbnNcbiAqICAgTGlzdCBvZiBIVE1MIGV4dGVuc2lvbnMuXG4gKiBAcmV0dXJucyB7SHRtbEV4dGVuc2lvbn1cbiAqICAgQSBzaW5nbGUgY29tYmluZWQgSFRNTCBleHRlbnNpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lSHRtbEV4dGVuc2lvbnMoaHRtbEV4dGVuc2lvbnMpIHtcbiAgLyoqIEB0eXBlIHtIdG1sRXh0ZW5zaW9ufSAqL1xuICBjb25zdCBoYW5kbGVycyA9IHt9XG4gIGxldCBpbmRleCA9IC0xXG5cbiAgd2hpbGUgKCsraW5kZXggPCBodG1sRXh0ZW5zaW9ucy5sZW5ndGgpIHtcbiAgICBodG1sRXh0ZW5zaW9uKGhhbmRsZXJzLCBodG1sRXh0ZW5zaW9uc1tpbmRleF0pXG4gIH1cblxuICByZXR1cm4gaGFuZGxlcnNcbn1cblxuLyoqXG4gKiBNZXJnZSBgZXh0ZW5zaW9uYCBpbnRvIGBhbGxgLlxuICpcbiAqIEBwYXJhbSB7SHRtbEV4dGVuc2lvbn0gYWxsXG4gKiAgIEV4dGVuc2lvbiB0byBtZXJnZSBpbnRvLlxuICogQHBhcmFtIHtIdG1sRXh0ZW5zaW9ufSBleHRlbnNpb25cbiAqICAgRXh0ZW5zaW9uIHRvIG1lcmdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGh0bWxFeHRlbnNpb24oYWxsLCBleHRlbnNpb24pIHtcbiAgLyoqIEB0eXBlIHtrZXlvZiBIdG1sRXh0ZW5zaW9ufSAqL1xuICBsZXQgaG9va1xuXG4gIGZvciAoaG9vayBpbiBleHRlbnNpb24pIHtcbiAgICBjb25zdCBtYXliZSA9IGhhc093blByb3BlcnR5LmNhbGwoYWxsLCBob29rKSA/IGFsbFtob29rXSA6IHVuZGVmaW5lZFxuICAgIGNvbnN0IGxlZnQgPSBtYXliZSB8fCAoYWxsW2hvb2tdID0ge30pXG4gICAgY29uc3QgcmlnaHQgPSBleHRlbnNpb25baG9va11cbiAgICAvKiogQHR5cGUge2tleW9mIEhhbmRsZXN9ICovXG4gICAgbGV0IHR5cGVcblxuICAgIGlmIChyaWdodCkge1xuICAgICAgZm9yICh0eXBlIGluIHJpZ2h0KSB7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgYXNzdW1lIGRvY3VtZW50IHZzIHJlZ3VsYXIgaGFuZGxlciBhcmUgbWFuYWdlZCBjb3JyZWN0bHkuXG4gICAgICAgIGxlZnRbdHlwZV0gPSByaWdodFt0eXBlXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/micromark-util-combine-extensions@1.1.0/node_modules/micromark-util-combine-extensions/index.js\n");

/***/ })

};
;