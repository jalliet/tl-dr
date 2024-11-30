"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/make-cancellable-promise@1.3.2";
exports.ids = ["vendor-chunks/make-cancellable-promise@1.3.2"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/make-cancellable-promise@1.3.2/node_modules/make-cancellable-promise/dist/esm/index.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/make-cancellable-promise@1.3.2/node_modules/make-cancellable-promise/dist/esm/index.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ makeCancellablePromise)\n/* harmony export */ });\nfunction makeCancellablePromise(promise) {\n    var isCancelled = false;\n    var wrappedPromise = new Promise(function (resolve, reject) {\n        promise\n            .then(function (value) { return !isCancelled && resolve(value); })\n            .catch(function (error) { return !isCancelled && reject(error); });\n    });\n    return {\n        promise: wrappedPromise,\n        cancel: function () {\n            isCancelled = true;\n        },\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbWFrZS1jYW5jZWxsYWJsZS1wcm9taXNlQDEuMy4yL25vZGVfbW9kdWxlcy9tYWtlLWNhbmNlbGxhYmxlLXByb21pc2UvZGlzdC9lc20vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHdDQUF3QztBQUM3RSxzQ0FBc0MsdUNBQXVDO0FBQzdFLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBIiwic291cmNlcyI6WyIvaG9tZS9rZW5qaS9oYWNrLXByb2plY3RzL3RsLWRyL3RsLWRyLy5mcm9udGVuZC9ub2RlX21vZHVsZXMvLnBucG0vbWFrZS1jYW5jZWxsYWJsZS1wcm9taXNlQDEuMy4yL25vZGVfbW9kdWxlcy9tYWtlLWNhbmNlbGxhYmxlLXByb21pc2UvZGlzdC9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZUNhbmNlbGxhYmxlUHJvbWlzZShwcm9taXNlKSB7XG4gICAgdmFyIGlzQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgdmFyIHdyYXBwZWRQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuICFpc0NhbmNlbGxlZCAmJiByZXNvbHZlKHZhbHVlKTsgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHsgcmV0dXJuICFpc0NhbmNlbGxlZCAmJiByZWplY3QoZXJyb3IpOyB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiB3cmFwcGVkUHJvbWlzZSxcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/make-cancellable-promise@1.3.2/node_modules/make-cancellable-promise/dist/esm/index.js\n");

/***/ })

};
;