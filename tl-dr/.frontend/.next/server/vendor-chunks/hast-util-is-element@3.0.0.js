"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-is-element@3.0.0";
exports.ids = ["vendor-chunks/hast-util-is-element@3.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/hast-util-is-element@3.0.0/node_modules/hast-util-is-element/lib/index.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/hast-util-is-element@3.0.0/node_modules/hast-util-is-element/lib/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   convertElement: () => (/* binding */ convertElement),\n/* harmony export */   isElement: () => (/* binding */ isElement)\n/* harmony export */ });\n/**\n * @typedef {import('hast').Element} Element\n * @typedef {import('hast').Parents} Parents\n */\n\n/**\n * @template Fn\n * @template Fallback\n * @typedef {Fn extends (value: any) => value is infer Thing ? Thing : Fallback} Predicate\n */\n\n/**\n * @callback Check\n *   Check that an arbitrary value is an element.\n * @param {unknown} this\n *   Context object (`this`) to call `test` with\n * @param {unknown} [element]\n *   Anything (typically a node).\n * @param {number | null | undefined} [index]\n *   Position of `element` in its parent.\n * @param {Parents | null | undefined} [parent]\n *   Parent of `element`.\n * @returns {boolean}\n *   Whether this is an element and passes a test.\n *\n * @typedef {Array<TestFunction | string> | TestFunction | string | null | undefined} Test\n *   Check for an arbitrary element.\n *\n *   * when `string`, checks that the element has that tag name\n *   * when `function`, see `TestFunction`\n *   * when `Array`, checks if one of the subtests pass\n *\n * @callback TestFunction\n *   Check if an element passes a test.\n * @param {unknown} this\n *   The given context.\n * @param {Element} element\n *   An element.\n * @param {number | undefined} [index]\n *   Position of `element` in its parent.\n * @param {Parents | undefined} [parent]\n *   Parent of `element`.\n * @returns {boolean | undefined | void}\n *   Whether this element passes the test.\n *\n *   Note: `void` is included until TS sees no return as `undefined`.\n */\n\n/**\n * Check if `element` is an `Element` and whether it passes the given test.\n *\n * @param element\n *   Thing to check, typically `element`.\n * @param test\n *   Check for a specific element.\n * @param index\n *   Position of `element` in its parent.\n * @param parent\n *   Parent of `element`.\n * @param context\n *   Context object (`this`) to call `test` with.\n * @returns\n *   Whether `element` is an `Element` and passes a test.\n * @throws\n *   When an incorrect `test`, `index`, or `parent` is given; there is no error\n *   thrown when `element` is not a node or not an element.\n */\nconst isElement =\n  // Note: overloads in JSDoc can’t yet use different `@template`s.\n  /**\n   * @type {(\n   *   (<Condition extends TestFunction>(element: unknown, test: Condition, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & Predicate<Condition, Element>) &\n   *   (<Condition extends string>(element: unknown, test: Condition, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & {tagName: Condition}) &\n   *   ((element?: null | undefined) => false) &\n   *   ((element: unknown, test?: null | undefined, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element) &\n   *   ((element: unknown, test?: Test, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => boolean)\n   * )}\n   */\n  (\n    /**\n     * @param {unknown} [element]\n     * @param {Test | undefined} [test]\n     * @param {number | null | undefined} [index]\n     * @param {Parents | null | undefined} [parent]\n     * @param {unknown} [context]\n     * @returns {boolean}\n     */\n    // eslint-disable-next-line max-params\n    function (element, test, index, parent, context) {\n      const check = convertElement(test)\n\n      if (\n        index !== null &&\n        index !== undefined &&\n        (typeof index !== 'number' ||\n          index < 0 ||\n          index === Number.POSITIVE_INFINITY)\n      ) {\n        throw new Error('Expected positive finite `index`')\n      }\n\n      if (\n        parent !== null &&\n        parent !== undefined &&\n        (!parent.type || !parent.children)\n      ) {\n        throw new Error('Expected valid `parent`')\n      }\n\n      if (\n        (index === null || index === undefined) !==\n        (parent === null || parent === undefined)\n      ) {\n        throw new Error('Expected both `index` and `parent`')\n      }\n\n      return looksLikeAnElement(element)\n        ? check.call(context, element, index, parent)\n        : false\n    }\n  )\n\n/**\n * Generate a check from a test.\n *\n * Useful if you’re going to test many nodes, for example when creating a\n * utility where something else passes a compatible test.\n *\n * The created function is a bit faster because it expects valid input only:\n * an `element`, `index`, and `parent`.\n *\n * @param test\n *   A test for a specific element.\n * @returns\n *   A check.\n */\nconst convertElement =\n  // Note: overloads in JSDoc can’t yet use different `@template`s.\n  /**\n   * @type {(\n   *   (<Condition extends TestFunction>(test: Condition) => (element: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & Predicate<Condition, Element>) &\n   *   (<Condition extends string>(test: Condition) => (element: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & {tagName: Condition}) &\n   *   ((test?: null | undefined) => (element?: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element) &\n   *   ((test?: Test) => Check)\n   * )}\n   */\n  (\n    /**\n     * @param {Test | null | undefined} [test]\n     * @returns {Check}\n     */\n    function (test) {\n      if (test === null || test === undefined) {\n        return element\n      }\n\n      if (typeof test === 'string') {\n        return tagNameFactory(test)\n      }\n\n      // Assume array.\n      if (typeof test === 'object') {\n        return anyFactory(test)\n      }\n\n      if (typeof test === 'function') {\n        return castFactory(test)\n      }\n\n      throw new Error('Expected function, string, or array as `test`')\n    }\n  )\n\n/**\n * Handle multiple tests.\n *\n * @param {Array<TestFunction | string>} tests\n * @returns {Check}\n */\nfunction anyFactory(tests) {\n  /** @type {Array<Check>} */\n  const checks = []\n  let index = -1\n\n  while (++index < tests.length) {\n    checks[index] = convertElement(tests[index])\n  }\n\n  return castFactory(any)\n\n  /**\n   * @this {unknown}\n   * @type {TestFunction}\n   */\n  function any(...parameters) {\n    let index = -1\n\n    while (++index < checks.length) {\n      if (checks[index].apply(this, parameters)) return true\n    }\n\n    return false\n  }\n}\n\n/**\n * Turn a string into a test for an element with a certain type.\n *\n * @param {string} check\n * @returns {Check}\n */\nfunction tagNameFactory(check) {\n  return castFactory(tagName)\n\n  /**\n   * @param {Element} element\n   * @returns {boolean}\n   */\n  function tagName(element) {\n    return element.tagName === check\n  }\n}\n\n/**\n * Turn a custom test into a test for an element that passes that test.\n *\n * @param {TestFunction} testFunction\n * @returns {Check}\n */\nfunction castFactory(testFunction) {\n  return check\n\n  /**\n   * @this {unknown}\n   * @type {Check}\n   */\n  function check(value, index, parent) {\n    return Boolean(\n      looksLikeAnElement(value) &&\n        testFunction.call(\n          this,\n          value,\n          typeof index === 'number' ? index : undefined,\n          parent || undefined\n        )\n    )\n  }\n}\n\n/**\n * Make sure something is an element.\n *\n * @param {unknown} element\n * @returns {element is Element}\n */\nfunction element(element) {\n  return Boolean(\n    element &&\n      typeof element === 'object' &&\n      'type' in element &&\n      element.type === 'element' &&\n      'tagName' in element &&\n      typeof element.tagName === 'string'\n  )\n}\n\n/**\n * @param {unknown} value\n * @returns {value is Element}\n */\nfunction looksLikeAnElement(value) {\n  return (\n    value !== null &&\n    typeof value === 'object' &&\n    'type' in value &&\n    'tagName' in value\n  )\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vaGFzdC11dGlsLWlzLWVsZW1lbnRAMy4wLjAvbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC1pcy1lbGVtZW50L2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckMsYUFBYSx3QkFBd0I7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvRUFBb0U7QUFDakY7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVywyQkFBMkI7QUFDdEM7QUFDQSxXQUFXLDRCQUE0QjtBQUN2QztBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYSx5RUFBeUU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLDBMQUEwTCxtQkFBbUI7QUFDN007QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEIsZUFBZSxrQkFBa0I7QUFDakMsZUFBZSwyQkFBMkI7QUFDMUMsZUFBZSw0QkFBNEI7QUFDM0MsZUFBZSxTQUFTO0FBQ3hCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLDhMQUE4TCxtQkFBbUI7QUFDak47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5QkFBeUI7QUFDeEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyw4QkFBOEI7QUFDekMsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxZQUFZO0FBQ1osWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL2hvbWUva2VuamkvaGFjay1wcm9qZWN0cy90bC1kci90bC1kci8uZnJvbnRlbmQvbm9kZV9tb2R1bGVzLy5wbnBtL2hhc3QtdXRpbC1pcy1lbGVtZW50QDMuMC4wL25vZGVfbW9kdWxlcy9oYXN0LXV0aWwtaXMtZWxlbWVudC9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuRWxlbWVudH0gRWxlbWVudFxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLlBhcmVudHN9IFBhcmVudHNcbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGblxuICogQHRlbXBsYXRlIEZhbGxiYWNrXG4gKiBAdHlwZWRlZiB7Rm4gZXh0ZW5kcyAodmFsdWU6IGFueSkgPT4gdmFsdWUgaXMgaW5mZXIgVGhpbmcgPyBUaGluZyA6IEZhbGxiYWNrfSBQcmVkaWNhdGVcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBDaGVja1xuICogICBDaGVjayB0aGF0IGFuIGFyYml0cmFyeSB2YWx1ZSBpcyBhbiBlbGVtZW50LlxuICogQHBhcmFtIHt1bmtub3dufSB0aGlzXG4gKiAgIENvbnRleHQgb2JqZWN0IChgdGhpc2ApIHRvIGNhbGwgYHRlc3RgIHdpdGhcbiAqIEBwYXJhbSB7dW5rbm93bn0gW2VsZW1lbnRdXG4gKiAgIEFueXRoaW5nICh0eXBpY2FsbHkgYSBub2RlKS5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2luZGV4XVxuICogICBQb3NpdGlvbiBvZiBgZWxlbWVudGAgaW4gaXRzIHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IG51bGwgfCB1bmRlZmluZWR9IFtwYXJlbnRdXG4gKiAgIFBhcmVudCBvZiBgZWxlbWVudGAuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGlzIGlzIGFuIGVsZW1lbnQgYW5kIHBhc3NlcyBhIHRlc3QuXG4gKlxuICogQHR5cGVkZWYge0FycmF5PFRlc3RGdW5jdGlvbiB8IHN0cmluZz4gfCBUZXN0RnVuY3Rpb24gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkfSBUZXN0XG4gKiAgIENoZWNrIGZvciBhbiBhcmJpdHJhcnkgZWxlbWVudC5cbiAqXG4gKiAgICogd2hlbiBgc3RyaW5nYCwgY2hlY2tzIHRoYXQgdGhlIGVsZW1lbnQgaGFzIHRoYXQgdGFnIG5hbWVcbiAqICAgKiB3aGVuIGBmdW5jdGlvbmAsIHNlZSBgVGVzdEZ1bmN0aW9uYFxuICogICAqIHdoZW4gYEFycmF5YCwgY2hlY2tzIGlmIG9uZSBvZiB0aGUgc3VidGVzdHMgcGFzc1xuICpcbiAqIEBjYWxsYmFjayBUZXN0RnVuY3Rpb25cbiAqICAgQ2hlY2sgaWYgYW4gZWxlbWVudCBwYXNzZXMgYSB0ZXN0LlxuICogQHBhcmFtIHt1bmtub3dufSB0aGlzXG4gKiAgIFRoZSBnaXZlbiBjb250ZXh0LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiAgIEFuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gW2luZGV4XVxuICogICBQb3NpdGlvbiBvZiBgZWxlbWVudGAgaW4gaXRzIHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gW3BhcmVudF1cbiAqICAgUGFyZW50IG9mIGBlbGVtZW50YC5cbiAqIEByZXR1cm5zIHtib29sZWFuIHwgdW5kZWZpbmVkIHwgdm9pZH1cbiAqICAgV2hldGhlciB0aGlzIGVsZW1lbnQgcGFzc2VzIHRoZSB0ZXN0LlxuICpcbiAqICAgTm90ZTogYHZvaWRgIGlzIGluY2x1ZGVkIHVudGlsIFRTIHNlZXMgbm8gcmV0dXJuIGFzIGB1bmRlZmluZWRgLlxuICovXG5cbi8qKlxuICogQ2hlY2sgaWYgYGVsZW1lbnRgIGlzIGFuIGBFbGVtZW50YCBhbmQgd2hldGhlciBpdCBwYXNzZXMgdGhlIGdpdmVuIHRlc3QuXG4gKlxuICogQHBhcmFtIGVsZW1lbnRcbiAqICAgVGhpbmcgdG8gY2hlY2ssIHR5cGljYWxseSBgZWxlbWVudGAuXG4gKiBAcGFyYW0gdGVzdFxuICogICBDaGVjayBmb3IgYSBzcGVjaWZpYyBlbGVtZW50LlxuICogQHBhcmFtIGluZGV4XG4gKiAgIFBvc2l0aW9uIG9mIGBlbGVtZW50YCBpbiBpdHMgcGFyZW50LlxuICogQHBhcmFtIHBhcmVudFxuICogICBQYXJlbnQgb2YgYGVsZW1lbnRgLlxuICogQHBhcmFtIGNvbnRleHRcbiAqICAgQ29udGV4dCBvYmplY3QgKGB0aGlzYCkgdG8gY2FsbCBgdGVzdGAgd2l0aC5cbiAqIEByZXR1cm5zXG4gKiAgIFdoZXRoZXIgYGVsZW1lbnRgIGlzIGFuIGBFbGVtZW50YCBhbmQgcGFzc2VzIGEgdGVzdC5cbiAqIEB0aHJvd3NcbiAqICAgV2hlbiBhbiBpbmNvcnJlY3QgYHRlc3RgLCBgaW5kZXhgLCBvciBgcGFyZW50YCBpcyBnaXZlbjsgdGhlcmUgaXMgbm8gZXJyb3JcbiAqICAgdGhyb3duIHdoZW4gYGVsZW1lbnRgIGlzIG5vdCBhIG5vZGUgb3Igbm90IGFuIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0VsZW1lbnQgPVxuICAvLyBOb3RlOiBvdmVybG9hZHMgaW4gSlNEb2MgY2Fu4oCZdCB5ZXQgdXNlIGRpZmZlcmVudCBgQHRlbXBsYXRlYHMuXG4gIC8qKlxuICAgKiBAdHlwZSB7KFxuICAgKiAgICg8Q29uZGl0aW9uIGV4dGVuZHMgVGVzdEZ1bmN0aW9uPihlbGVtZW50OiB1bmtub3duLCB0ZXN0OiBDb25kaXRpb24sIGluZGV4PzogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCwgcGFyZW50PzogUGFyZW50cyB8IG51bGwgfCB1bmRlZmluZWQsIGNvbnRleHQ/OiB1bmtub3duKSA9PiBlbGVtZW50IGlzIEVsZW1lbnQgJiBQcmVkaWNhdGU8Q29uZGl0aW9uLCBFbGVtZW50PikgJlxuICAgKiAgICg8Q29uZGl0aW9uIGV4dGVuZHMgc3RyaW5nPihlbGVtZW50OiB1bmtub3duLCB0ZXN0OiBDb25kaXRpb24sIGluZGV4PzogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCwgcGFyZW50PzogUGFyZW50cyB8IG51bGwgfCB1bmRlZmluZWQsIGNvbnRleHQ/OiB1bmtub3duKSA9PiBlbGVtZW50IGlzIEVsZW1lbnQgJiB7dGFnTmFtZTogQ29uZGl0aW9ufSkgJlxuICAgKiAgICgoZWxlbWVudD86IG51bGwgfCB1bmRlZmluZWQpID0+IGZhbHNlKSAmXG4gICAqICAgKChlbGVtZW50OiB1bmtub3duLCB0ZXN0PzogbnVsbCB8IHVuZGVmaW5lZCwgaW5kZXg/OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLCBwYXJlbnQ/OiBQYXJlbnRzIHwgbnVsbCB8IHVuZGVmaW5lZCwgY29udGV4dD86IHVua25vd24pID0+IGVsZW1lbnQgaXMgRWxlbWVudCkgJlxuICAgKiAgICgoZWxlbWVudDogdW5rbm93biwgdGVzdD86IFRlc3QsIGluZGV4PzogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCwgcGFyZW50PzogUGFyZW50cyB8IG51bGwgfCB1bmRlZmluZWQsIGNvbnRleHQ/OiB1bmtub3duKSA9PiBib29sZWFuKVxuICAgKiApfVxuICAgKi9cbiAgKFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7dW5rbm93bn0gW2VsZW1lbnRdXG4gICAgICogQHBhcmFtIHtUZXN0IHwgdW5kZWZpbmVkfSBbdGVzdF1cbiAgICAgKiBAcGFyYW0ge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtpbmRleF1cbiAgICAgKiBAcGFyYW0ge1BhcmVudHMgfCBudWxsIHwgdW5kZWZpbmVkfSBbcGFyZW50XVxuICAgICAqIEBwYXJhbSB7dW5rbm93bn0gW2NvbnRleHRdXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcbiAgICBmdW5jdGlvbiAoZWxlbWVudCwgdGVzdCwgaW5kZXgsIHBhcmVudCwgY29udGV4dCkge1xuICAgICAgY29uc3QgY2hlY2sgPSBjb252ZXJ0RWxlbWVudCh0ZXN0KVxuXG4gICAgICBpZiAoXG4gICAgICAgIGluZGV4ICE9PSBudWxsICYmXG4gICAgICAgIGluZGV4ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicgfHxcbiAgICAgICAgICBpbmRleCA8IDAgfHxcbiAgICAgICAgICBpbmRleCA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgcG9zaXRpdmUgZmluaXRlIGBpbmRleGAnKVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudCAhPT0gbnVsbCAmJlxuICAgICAgICBwYXJlbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAoIXBhcmVudC50eXBlIHx8ICFwYXJlbnQuY2hpbGRyZW4pXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB2YWxpZCBgcGFyZW50YCcpXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgKGluZGV4ID09PSBudWxsIHx8IGluZGV4ID09PSB1bmRlZmluZWQpICE9PVxuICAgICAgICAocGFyZW50ID09PSBudWxsIHx8IHBhcmVudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYm90aCBgaW5kZXhgIGFuZCBgcGFyZW50YCcpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsb29rc0xpa2VBbkVsZW1lbnQoZWxlbWVudClcbiAgICAgICAgPyBjaGVjay5jYWxsKGNvbnRleHQsIGVsZW1lbnQsIGluZGV4LCBwYXJlbnQpXG4gICAgICAgIDogZmFsc2VcbiAgICB9XG4gIClcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGNoZWNrIGZyb20gYSB0ZXN0LlxuICpcbiAqIFVzZWZ1bCBpZiB5b3XigJlyZSBnb2luZyB0byB0ZXN0IG1hbnkgbm9kZXMsIGZvciBleGFtcGxlIHdoZW4gY3JlYXRpbmcgYVxuICogdXRpbGl0eSB3aGVyZSBzb21ldGhpbmcgZWxzZSBwYXNzZXMgYSBjb21wYXRpYmxlIHRlc3QuXG4gKlxuICogVGhlIGNyZWF0ZWQgZnVuY3Rpb24gaXMgYSBiaXQgZmFzdGVyIGJlY2F1c2UgaXQgZXhwZWN0cyB2YWxpZCBpbnB1dCBvbmx5OlxuICogYW4gYGVsZW1lbnRgLCBgaW5kZXhgLCBhbmQgYHBhcmVudGAuXG4gKlxuICogQHBhcmFtIHRlc3RcbiAqICAgQSB0ZXN0IGZvciBhIHNwZWNpZmljIGVsZW1lbnQuXG4gKiBAcmV0dXJuc1xuICogICBBIGNoZWNrLlxuICovXG5leHBvcnQgY29uc3QgY29udmVydEVsZW1lbnQgPVxuICAvLyBOb3RlOiBvdmVybG9hZHMgaW4gSlNEb2MgY2Fu4oCZdCB5ZXQgdXNlIGRpZmZlcmVudCBgQHRlbXBsYXRlYHMuXG4gIC8qKlxuICAgKiBAdHlwZSB7KFxuICAgKiAgICg8Q29uZGl0aW9uIGV4dGVuZHMgVGVzdEZ1bmN0aW9uPih0ZXN0OiBDb25kaXRpb24pID0+IChlbGVtZW50OiB1bmtub3duLCBpbmRleD86IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsIHBhcmVudD86IFBhcmVudHMgfCBudWxsIHwgdW5kZWZpbmVkLCBjb250ZXh0PzogdW5rbm93bikgPT4gZWxlbWVudCBpcyBFbGVtZW50ICYgUHJlZGljYXRlPENvbmRpdGlvbiwgRWxlbWVudD4pICZcbiAgICogICAoPENvbmRpdGlvbiBleHRlbmRzIHN0cmluZz4odGVzdDogQ29uZGl0aW9uKSA9PiAoZWxlbWVudDogdW5rbm93biwgaW5kZXg/OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLCBwYXJlbnQ/OiBQYXJlbnRzIHwgbnVsbCB8IHVuZGVmaW5lZCwgY29udGV4dD86IHVua25vd24pID0+IGVsZW1lbnQgaXMgRWxlbWVudCAmIHt0YWdOYW1lOiBDb25kaXRpb259KSAmXG4gICAqICAgKCh0ZXN0PzogbnVsbCB8IHVuZGVmaW5lZCkgPT4gKGVsZW1lbnQ/OiB1bmtub3duLCBpbmRleD86IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsIHBhcmVudD86IFBhcmVudHMgfCBudWxsIHwgdW5kZWZpbmVkLCBjb250ZXh0PzogdW5rbm93bikgPT4gZWxlbWVudCBpcyBFbGVtZW50KSAmXG4gICAqICAgKCh0ZXN0PzogVGVzdCkgPT4gQ2hlY2spXG4gICAqICl9XG4gICAqL1xuICAoXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUZXN0IHwgbnVsbCB8IHVuZGVmaW5lZH0gW3Rlc3RdXG4gICAgICogQHJldHVybnMge0NoZWNrfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICh0ZXN0KSB7XG4gICAgICBpZiAodGVzdCA9PT0gbnVsbCB8fCB0ZXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdGFnTmFtZUZhY3RvcnkodGVzdClcbiAgICAgIH1cblxuICAgICAgLy8gQXNzdW1lIGFycmF5LlxuICAgICAgaWYgKHR5cGVvZiB0ZXN0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gYW55RmFjdG9yeSh0ZXN0KVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNhc3RGYWN0b3J5KHRlc3QpXG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgZnVuY3Rpb24sIHN0cmluZywgb3IgYXJyYXkgYXMgYHRlc3RgJylcbiAgICB9XG4gIClcblxuLyoqXG4gKiBIYW5kbGUgbXVsdGlwbGUgdGVzdHMuXG4gKlxuICogQHBhcmFtIHtBcnJheTxUZXN0RnVuY3Rpb24gfCBzdHJpbmc+fSB0ZXN0c1xuICogQHJldHVybnMge0NoZWNrfVxuICovXG5mdW5jdGlvbiBhbnlGYWN0b3J5KHRlc3RzKSB7XG4gIC8qKiBAdHlwZSB7QXJyYXk8Q2hlY2s+fSAqL1xuICBjb25zdCBjaGVja3MgPSBbXVxuICBsZXQgaW5kZXggPSAtMVxuXG4gIHdoaWxlICgrK2luZGV4IDwgdGVzdHMubGVuZ3RoKSB7XG4gICAgY2hlY2tzW2luZGV4XSA9IGNvbnZlcnRFbGVtZW50KHRlc3RzW2luZGV4XSlcbiAgfVxuXG4gIHJldHVybiBjYXN0RmFjdG9yeShhbnkpXG5cbiAgLyoqXG4gICAqIEB0aGlzIHt1bmtub3dufVxuICAgKiBAdHlwZSB7VGVzdEZ1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gYW55KC4uLnBhcmFtZXRlcnMpIHtcbiAgICBsZXQgaW5kZXggPSAtMVxuXG4gICAgd2hpbGUgKCsraW5kZXggPCBjaGVja3MubGVuZ3RoKSB7XG4gICAgICBpZiAoY2hlY2tzW2luZGV4XS5hcHBseSh0aGlzLCBwYXJhbWV0ZXJzKSkgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vKipcbiAqIFR1cm4gYSBzdHJpbmcgaW50byBhIHRlc3QgZm9yIGFuIGVsZW1lbnQgd2l0aCBhIGNlcnRhaW4gdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hlY2tcbiAqIEByZXR1cm5zIHtDaGVja31cbiAqL1xuZnVuY3Rpb24gdGFnTmFtZUZhY3RvcnkoY2hlY2spIHtcbiAgcmV0dXJuIGNhc3RGYWN0b3J5KHRhZ05hbWUpXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIHRhZ05hbWUoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT09IGNoZWNrXG4gIH1cbn1cblxuLyoqXG4gKiBUdXJuIGEgY3VzdG9tIHRlc3QgaW50byBhIHRlc3QgZm9yIGFuIGVsZW1lbnQgdGhhdCBwYXNzZXMgdGhhdCB0ZXN0LlxuICpcbiAqIEBwYXJhbSB7VGVzdEZ1bmN0aW9ufSB0ZXN0RnVuY3Rpb25cbiAqIEByZXR1cm5zIHtDaGVja31cbiAqL1xuZnVuY3Rpb24gY2FzdEZhY3RvcnkodGVzdEZ1bmN0aW9uKSB7XG4gIHJldHVybiBjaGVja1xuXG4gIC8qKlxuICAgKiBAdGhpcyB7dW5rbm93bn1cbiAgICogQHR5cGUge0NoZWNrfVxuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2sodmFsdWUsIGluZGV4LCBwYXJlbnQpIHtcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgIGxvb2tzTGlrZUFuRWxlbWVudCh2YWx1ZSkgJiZcbiAgICAgICAgdGVzdEZ1bmN0aW9uLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICB0eXBlb2YgaW5kZXggPT09ICdudW1iZXInID8gaW5kZXggOiB1bmRlZmluZWQsXG4gICAgICAgICAgcGFyZW50IHx8IHVuZGVmaW5lZFxuICAgICAgICApXG4gICAgKVxuICB9XG59XG5cbi8qKlxuICogTWFrZSBzdXJlIHNvbWV0aGluZyBpcyBhbiBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gZWxlbWVudFxuICogQHJldHVybnMge2VsZW1lbnQgaXMgRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gZWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIGVsZW1lbnQgJiZcbiAgICAgIHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0JyAmJlxuICAgICAgJ3R5cGUnIGluIGVsZW1lbnQgJiZcbiAgICAgIGVsZW1lbnQudHlwZSA9PT0gJ2VsZW1lbnQnICYmXG4gICAgICAndGFnTmFtZScgaW4gZWxlbWVudCAmJlxuICAgICAgdHlwZW9mIGVsZW1lbnQudGFnTmFtZSA9PT0gJ3N0cmluZydcbiAgKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcbiAqIEByZXR1cm5zIHt2YWx1ZSBpcyBFbGVtZW50fVxuICovXG5mdW5jdGlvbiBsb29rc0xpa2VBbkVsZW1lbnQodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSAhPT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAndHlwZScgaW4gdmFsdWUgJiZcbiAgICAndGFnTmFtZScgaW4gdmFsdWVcbiAgKVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/hast-util-is-element@3.0.0/node_modules/hast-util-is-element/lib/index.js\n");

/***/ })

};
;