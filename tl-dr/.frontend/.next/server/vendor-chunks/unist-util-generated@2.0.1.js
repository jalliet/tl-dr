"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/unist-util-generated@2.0.1";
exports.ids = ["vendor-chunks/unist-util-generated@2.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/unist-util-generated@2.0.1/node_modules/unist-util-generated/lib/index.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unist-util-generated@2.0.1/node_modules/unist-util-generated/lib/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generated: () => (/* binding */ generated)\n/* harmony export */ });\n/**\n * @typedef PointLike\n * @property {number | null | undefined} [line]\n * @property {number | null | undefined} [column]\n * @property {number | null | undefined} [offset]\n *\n * @typedef PositionLike\n * @property {PointLike | null | undefined} [start]\n * @property {PointLike | null | undefined} [end]\n *\n * @typedef NodeLike\n * @property {PositionLike | null | undefined} [position]\n */\n\n/**\n * Check if `node` is generated.\n *\n * @param {NodeLike | null | undefined} [node]\n *   Node to check.\n * @returns {boolean}\n *   Whether `node` is generated (does not have positional info).\n */\nfunction generated(node) {\n  return (\n    !node ||\n    !node.position ||\n    !node.position.start ||\n    !node.position.start.line ||\n    !node.position.start.column ||\n    !node.position.end ||\n    !node.position.end.line ||\n    !node.position.end.column\n  )\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vdW5pc3QtdXRpbC1nZW5lcmF0ZWRAMi4wLjEvbm9kZV9tb2R1bGVzL3VuaXN0LXV0aWwtZ2VuZXJhdGVkL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDLGNBQWMsMkJBQTJCO0FBQ3pDO0FBQ0E7QUFDQSxjQUFjLDhCQUE4QjtBQUM1QyxjQUFjLDhCQUE4QjtBQUM1QztBQUNBO0FBQ0EsY0FBYyxpQ0FBaUM7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyw2QkFBNkI7QUFDeEM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL2hvbWUva2VuamkvaGFjay1wcm9qZWN0cy90bC1kci90bC1kci8uZnJvbnRlbmQvbm9kZV9tb2R1bGVzLy5wbnBtL3VuaXN0LXV0aWwtZ2VuZXJhdGVkQDIuMC4xL25vZGVfbW9kdWxlcy91bmlzdC11dGlsLWdlbmVyYXRlZC9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiBQb2ludExpa2VcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2xpbmVdXG4gKiBAcHJvcGVydHkge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtjb2x1bW5dXG4gKiBAcHJvcGVydHkge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtvZmZzZXRdXG4gKlxuICogQHR5cGVkZWYgUG9zaXRpb25MaWtlXG4gKiBAcHJvcGVydHkge1BvaW50TGlrZSB8IG51bGwgfCB1bmRlZmluZWR9IFtzdGFydF1cbiAqIEBwcm9wZXJ0eSB7UG9pbnRMaWtlIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2VuZF1cbiAqXG4gKiBAdHlwZWRlZiBOb2RlTGlrZVxuICogQHByb3BlcnR5IHtQb3NpdGlvbkxpa2UgfCBudWxsIHwgdW5kZWZpbmVkfSBbcG9zaXRpb25dXG4gKi9cblxuLyoqXG4gKiBDaGVjayBpZiBgbm9kZWAgaXMgZ2VuZXJhdGVkLlxuICpcbiAqIEBwYXJhbSB7Tm9kZUxpa2UgfCBudWxsIHwgdW5kZWZpbmVkfSBbbm9kZV1cbiAqICAgTm9kZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIGBub2RlYCBpcyBnZW5lcmF0ZWQgKGRvZXMgbm90IGhhdmUgcG9zaXRpb25hbCBpbmZvKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlZChub2RlKSB7XG4gIHJldHVybiAoXG4gICAgIW5vZGUgfHxcbiAgICAhbm9kZS5wb3NpdGlvbiB8fFxuICAgICFub2RlLnBvc2l0aW9uLnN0YXJ0IHx8XG4gICAgIW5vZGUucG9zaXRpb24uc3RhcnQubGluZSB8fFxuICAgICFub2RlLnBvc2l0aW9uLnN0YXJ0LmNvbHVtbiB8fFxuICAgICFub2RlLnBvc2l0aW9uLmVuZCB8fFxuICAgICFub2RlLnBvc2l0aW9uLmVuZC5saW5lIHx8XG4gICAgIW5vZGUucG9zaXRpb24uZW5kLmNvbHVtblxuICApXG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/unist-util-generated@2.0.1/node_modules/unist-util-generated/lib/index.js\n");

/***/ })

};
;