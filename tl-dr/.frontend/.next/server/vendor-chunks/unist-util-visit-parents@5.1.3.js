"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/unist-util-visit-parents@5.1.3";
exports.ids = ["vendor-chunks/unist-util-visit-parents@5.1.3"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/color.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/color.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   color: () => (/* binding */ color)\n/* harmony export */ });\n/**\n * @param {string} d\n * @returns {string}\n */\nfunction color(d) {\n  return '\\u001B[33m' + d + '\\u001B[39m'\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vdW5pc3QtdXRpbC12aXNpdC1wYXJlbnRzQDUuMS4zL25vZGVfbW9kdWxlcy91bmlzdC11dGlsLXZpc2l0LXBhcmVudHMvbGliL2NvbG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0EiLCJzb3VyY2VzIjpbIi9ob21lL2tlbmppL2hhY2stcHJvamVjdHMvdGwtZHIvdGwtZHIvLmZyb250ZW5kL25vZGVfbW9kdWxlcy8ucG5wbS91bmlzdC11dGlsLXZpc2l0LXBhcmVudHNANS4xLjMvbm9kZV9tb2R1bGVzL3VuaXN0LXV0aWwtdmlzaXQtcGFyZW50cy9saWIvY29sb3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yKGQpIHtcbiAgcmV0dXJuICdcXHUwMDFCWzMzbScgKyBkICsgJ1xcdTAwMUJbMzltJ1xufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/color.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/index.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/index.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CONTINUE: () => (/* binding */ CONTINUE),\n/* harmony export */   EXIT: () => (/* binding */ EXIT),\n/* harmony export */   SKIP: () => (/* binding */ SKIP),\n/* harmony export */   visitParents: () => (/* binding */ visitParents)\n/* harmony export */ });\n/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ \"(ssr)/./node_modules/.pnpm/unist-util-is@5.2.1/node_modules/unist-util-is/lib/index.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ \"(ssr)/./node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/color.js\");\n/**\n * @typedef {import('unist').Node} Node\n * @typedef {import('unist').Parent} Parent\n * @typedef {import('unist-util-is').Test} Test\n */\n\n/**\n * @typedef {boolean | 'skip'} Action\n *   Union of the action types.\n *\n * @typedef {number} Index\n *   Move to the sibling at `index` next (after node itself is completely\n *   traversed).\n *\n *   Useful if mutating the tree, such as removing the node the visitor is\n *   currently on, or any of its previous siblings.\n *   Results less than 0 or greater than or equal to `children.length` stop\n *   traversing the parent.\n *\n * @typedef {[(Action | null | undefined | void)?, (Index | null | undefined)?]} ActionTuple\n *   List with one or two values, the first an action, the second an index.\n *\n * @typedef {Action | ActionTuple | Index | null | undefined | void} VisitorResult\n *   Any value that can be returned from a visitor.\n */\n\n/**\n * @template {Node} [Visited=Node]\n *   Visited node type.\n * @template {Parent} [Ancestor=Parent]\n *   Ancestor type.\n * @callback Visitor\n *   Handle a node (matching `test`, if given).\n *\n *   Visitors are free to transform `node`.\n *   They can also transform the parent of node (the last of `ancestors`).\n *\n *   Replacing `node` itself, if `SKIP` is not returned, still causes its\n *   descendants to be walked (which is a bug).\n *\n *   When adding or removing previous siblings of `node` (or next siblings, in\n *   case of reverse), the `Visitor` should return a new `Index` to specify the\n *   sibling to traverse after `node` is traversed.\n *   Adding or removing next siblings of `node` (or previous siblings, in case\n *   of reverse) is handled as expected without needing to return a new `Index`.\n *\n *   Removing the children property of an ancestor still results in them being\n *   traversed.\n * @param {Visited} node\n *   Found node.\n * @param {Array<Ancestor>} ancestors\n *   Ancestors of `node`.\n * @returns {VisitorResult}\n *   What to do next.\n *\n *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.\n *   An `Action` is treated as a tuple of `[Action]`.\n *\n *   Passing a tuple back only makes sense if the `Action` is `SKIP`.\n *   When the `Action` is `EXIT`, that action can be returned.\n *   When the `Action` is `CONTINUE`, `Index` can be returned.\n */\n\n/**\n * @template {Node} [Tree=Node]\n *   Tree type.\n * @template {Test} [Check=string]\n *   Test type.\n * @typedef {Visitor<import('./complex-types.js').Matches<import('./complex-types.js').InclusiveDescendant<Tree>, Check>, Extract<import('./complex-types.js').InclusiveDescendant<Tree>, Parent>>} BuildVisitor\n *   Build a typed `Visitor` function from a tree and a test.\n *\n *   It will infer which values are passed as `node` and which as `parents`.\n */\n\n\n\n\n/**\n * Continue traversing as normal.\n */\nconst CONTINUE = true\n\n/**\n * Stop traversing immediately.\n */\nconst EXIT = false\n\n/**\n * Do not traverse this node’s children.\n */\nconst SKIP = 'skip'\n\n/**\n * Visit nodes, with ancestral information.\n *\n * This algorithm performs *depth-first* *tree traversal* in *preorder*\n * (**NLR**) or if `reverse` is given, in *reverse preorder* (**NRL**).\n *\n * You can choose for which nodes `visitor` is called by passing a `test`.\n * For complex tests, you should test yourself in `visitor`, as it will be\n * faster and will have improved type information.\n *\n * Walking the tree is an intensive task.\n * Make use of the return values of the visitor when possible.\n * Instead of walking a tree multiple times, walk it once, use `unist-util-is`\n * to check if a node matches, and then perform different operations.\n *\n * You can change the tree.\n * See `Visitor` for more info.\n *\n * @param tree\n *   Tree to traverse.\n * @param test\n *   `unist-util-is`-compatible test\n * @param visitor\n *   Handle each node.\n * @param reverse\n *   Traverse in reverse preorder (NRL) instead of the default preorder (NLR).\n * @returns\n *   Nothing.\n */\nconst visitParents =\n  /**\n   * @type {(\n   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &\n   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)\n   * )}\n   */\n  (\n    /**\n     * @param {Node} tree\n     * @param {Test} test\n     * @param {Visitor<Node>} visitor\n     * @param {boolean | null | undefined} [reverse]\n     * @returns {void}\n     */\n    function (tree, test, visitor, reverse) {\n      if (typeof test === 'function' && typeof visitor !== 'function') {\n        reverse = visitor\n        // @ts-expect-error no visitor given, so `visitor` is test.\n        visitor = test\n        test = null\n      }\n\n      const is = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)(test)\n      const step = reverse ? -1 : 1\n\n      factory(tree, undefined, [])()\n\n      /**\n       * @param {Node} node\n       * @param {number | undefined} index\n       * @param {Array<Parent>} parents\n       */\n      function factory(node, index, parents) {\n        /** @type {Record<string, unknown>} */\n        // @ts-expect-error: hush\n        const value = node && typeof node === 'object' ? node : {}\n\n        if (typeof value.type === 'string') {\n          const name =\n            // `hast`\n            typeof value.tagName === 'string'\n              ? value.tagName\n              : // `xast`\n              typeof value.name === 'string'\n              ? value.name\n              : undefined\n\n          Object.defineProperty(visit, 'name', {\n            value:\n              'node (' + (0,_color_js__WEBPACK_IMPORTED_MODULE_1__.color)(node.type + (name ? '<' + name + '>' : '')) + ')'\n          })\n        }\n\n        return visit\n\n        function visit() {\n          /** @type {ActionTuple} */\n          let result = []\n          /** @type {ActionTuple} */\n          let subresult\n          /** @type {number} */\n          let offset\n          /** @type {Array<Parent>} */\n          let grandparents\n\n          if (!test || is(node, index, parents[parents.length - 1] || null)) {\n            result = toResult(visitor(node, parents))\n\n            if (result[0] === EXIT) {\n              return result\n            }\n          }\n\n          // @ts-expect-error looks like a parent.\n          if (node.children && result[0] !== SKIP) {\n            // @ts-expect-error looks like a parent.\n            offset = (reverse ? node.children.length : -1) + step\n            // @ts-expect-error looks like a parent.\n            grandparents = parents.concat(node)\n\n            // @ts-expect-error looks like a parent.\n            while (offset > -1 && offset < node.children.length) {\n              // @ts-expect-error looks like a parent.\n              subresult = factory(node.children[offset], offset, grandparents)()\n\n              if (subresult[0] === EXIT) {\n                return subresult\n              }\n\n              offset =\n                typeof subresult[1] === 'number' ? subresult[1] : offset + step\n            }\n          }\n\n          return result\n        }\n      }\n    }\n  )\n\n/**\n * Turn a return value into a clean result.\n *\n * @param {VisitorResult} value\n *   Valid return values from visitors.\n * @returns {ActionTuple}\n *   Clean result.\n */\nfunction toResult(value) {\n  if (Array.isArray(value)) {\n    return value\n  }\n\n  if (typeof value === 'number') {\n    return [CONTINUE, value]\n  }\n\n  return [value]\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vdW5pc3QtdXRpbC12aXNpdC1wYXJlbnRzQDUuMS4zL25vZGVfbW9kdWxlcy91bmlzdC11dGlsLXZpc2l0LXBhcmVudHMvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkMsYUFBYSx3QkFBd0I7QUFDckMsYUFBYSw4QkFBOEI7QUFDM0M7O0FBRUE7QUFDQSxhQUFhLGtCQUFrQjtBQUMvQjtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG9FQUFvRTtBQUNqRjtBQUNBO0FBQ0EsYUFBYSx3REFBd0Q7QUFDckU7QUFDQTs7QUFFQTtBQUNBLGNBQWMsTUFBTTtBQUNwQjtBQUNBLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLGlCQUFpQjtBQUM1QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQSxhQUFhLHVMQUF1TDtBQUNwTTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUM7QUFDTDs7QUFFaEM7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQixlQUFlLGVBQWU7QUFDOUIsZUFBZSw0QkFBNEI7QUFDM0MsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNEQUFPO0FBQ3hCOztBQUVBOztBQUVBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkIsaUJBQWlCLG9CQUFvQjtBQUNyQyxpQkFBaUIsZUFBZTtBQUNoQztBQUNBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLGdEQUFLO0FBQzlCLFdBQVc7QUFDWDs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQixhQUFhO0FBQ2xDO0FBQ0EscUJBQXFCLGFBQWE7QUFDbEM7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIi9ob21lL2tlbmppL2hhY2stcHJvamVjdHMvdGwtZHIvdGwtZHIvLmZyb250ZW5kL25vZGVfbW9kdWxlcy8ucG5wbS91bmlzdC11dGlsLXZpc2l0LXBhcmVudHNANS4xLjMvbm9kZV9tb2R1bGVzL3VuaXN0LXV0aWwtdmlzaXQtcGFyZW50cy9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCd1bmlzdCcpLk5vZGV9IE5vZGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaXN0JykuUGFyZW50fSBQYXJlbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaXN0LXV0aWwtaXMnKS5UZXN0fSBUZXN0XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7Ym9vbGVhbiB8ICdza2lwJ30gQWN0aW9uXG4gKiAgIFVuaW9uIG9mIHRoZSBhY3Rpb24gdHlwZXMuXG4gKlxuICogQHR5cGVkZWYge251bWJlcn0gSW5kZXhcbiAqICAgTW92ZSB0byB0aGUgc2libGluZyBhdCBgaW5kZXhgIG5leHQgKGFmdGVyIG5vZGUgaXRzZWxmIGlzIGNvbXBsZXRlbHlcbiAqICAgdHJhdmVyc2VkKS5cbiAqXG4gKiAgIFVzZWZ1bCBpZiBtdXRhdGluZyB0aGUgdHJlZSwgc3VjaCBhcyByZW1vdmluZyB0aGUgbm9kZSB0aGUgdmlzaXRvciBpc1xuICogICBjdXJyZW50bHkgb24sIG9yIGFueSBvZiBpdHMgcHJldmlvdXMgc2libGluZ3MuXG4gKiAgIFJlc3VsdHMgbGVzcyB0aGFuIDAgb3IgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGBjaGlsZHJlbi5sZW5ndGhgIHN0b3BcbiAqICAgdHJhdmVyc2luZyB0aGUgcGFyZW50LlxuICpcbiAqIEB0eXBlZGVmIHtbKEFjdGlvbiB8IG51bGwgfCB1bmRlZmluZWQgfCB2b2lkKT8sIChJbmRleCB8IG51bGwgfCB1bmRlZmluZWQpP119IEFjdGlvblR1cGxlXG4gKiAgIExpc3Qgd2l0aCBvbmUgb3IgdHdvIHZhbHVlcywgdGhlIGZpcnN0IGFuIGFjdGlvbiwgdGhlIHNlY29uZCBhbiBpbmRleC5cbiAqXG4gKiBAdHlwZWRlZiB7QWN0aW9uIHwgQWN0aW9uVHVwbGUgfCBJbmRleCB8IG51bGwgfCB1bmRlZmluZWQgfCB2b2lkfSBWaXNpdG9yUmVzdWx0XG4gKiAgIEFueSB2YWx1ZSB0aGF0IGNhbiBiZSByZXR1cm5lZCBmcm9tIGEgdmlzaXRvci5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7Tm9kZX0gW1Zpc2l0ZWQ9Tm9kZV1cbiAqICAgVmlzaXRlZCBub2RlIHR5cGUuXG4gKiBAdGVtcGxhdGUge1BhcmVudH0gW0FuY2VzdG9yPVBhcmVudF1cbiAqICAgQW5jZXN0b3IgdHlwZS5cbiAqIEBjYWxsYmFjayBWaXNpdG9yXG4gKiAgIEhhbmRsZSBhIG5vZGUgKG1hdGNoaW5nIGB0ZXN0YCwgaWYgZ2l2ZW4pLlxuICpcbiAqICAgVmlzaXRvcnMgYXJlIGZyZWUgdG8gdHJhbnNmb3JtIGBub2RlYC5cbiAqICAgVGhleSBjYW4gYWxzbyB0cmFuc2Zvcm0gdGhlIHBhcmVudCBvZiBub2RlICh0aGUgbGFzdCBvZiBgYW5jZXN0b3JzYCkuXG4gKlxuICogICBSZXBsYWNpbmcgYG5vZGVgIGl0c2VsZiwgaWYgYFNLSVBgIGlzIG5vdCByZXR1cm5lZCwgc3RpbGwgY2F1c2VzIGl0c1xuICogICBkZXNjZW5kYW50cyB0byBiZSB3YWxrZWQgKHdoaWNoIGlzIGEgYnVnKS5cbiAqXG4gKiAgIFdoZW4gYWRkaW5nIG9yIHJlbW92aW5nIHByZXZpb3VzIHNpYmxpbmdzIG9mIGBub2RlYCAob3IgbmV4dCBzaWJsaW5ncywgaW5cbiAqICAgY2FzZSBvZiByZXZlcnNlKSwgdGhlIGBWaXNpdG9yYCBzaG91bGQgcmV0dXJuIGEgbmV3IGBJbmRleGAgdG8gc3BlY2lmeSB0aGVcbiAqICAgc2libGluZyB0byB0cmF2ZXJzZSBhZnRlciBgbm9kZWAgaXMgdHJhdmVyc2VkLlxuICogICBBZGRpbmcgb3IgcmVtb3ZpbmcgbmV4dCBzaWJsaW5ncyBvZiBgbm9kZWAgKG9yIHByZXZpb3VzIHNpYmxpbmdzLCBpbiBjYXNlXG4gKiAgIG9mIHJldmVyc2UpIGlzIGhhbmRsZWQgYXMgZXhwZWN0ZWQgd2l0aG91dCBuZWVkaW5nIHRvIHJldHVybiBhIG5ldyBgSW5kZXhgLlxuICpcbiAqICAgUmVtb3ZpbmcgdGhlIGNoaWxkcmVuIHByb3BlcnR5IG9mIGFuIGFuY2VzdG9yIHN0aWxsIHJlc3VsdHMgaW4gdGhlbSBiZWluZ1xuICogICB0cmF2ZXJzZWQuXG4gKiBAcGFyYW0ge1Zpc2l0ZWR9IG5vZGVcbiAqICAgRm91bmQgbm9kZS5cbiAqIEBwYXJhbSB7QXJyYXk8QW5jZXN0b3I+fSBhbmNlc3RvcnNcbiAqICAgQW5jZXN0b3JzIG9mIGBub2RlYC5cbiAqIEByZXR1cm5zIHtWaXNpdG9yUmVzdWx0fVxuICogICBXaGF0IHRvIGRvIG5leHQuXG4gKlxuICogICBBbiBgSW5kZXhgIGlzIHRyZWF0ZWQgYXMgYSB0dXBsZSBvZiBgW0NPTlRJTlVFLCBJbmRleF1gLlxuICogICBBbiBgQWN0aW9uYCBpcyB0cmVhdGVkIGFzIGEgdHVwbGUgb2YgYFtBY3Rpb25dYC5cbiAqXG4gKiAgIFBhc3NpbmcgYSB0dXBsZSBiYWNrIG9ubHkgbWFrZXMgc2Vuc2UgaWYgdGhlIGBBY3Rpb25gIGlzIGBTS0lQYC5cbiAqICAgV2hlbiB0aGUgYEFjdGlvbmAgaXMgYEVYSVRgLCB0aGF0IGFjdGlvbiBjYW4gYmUgcmV0dXJuZWQuXG4gKiAgIFdoZW4gdGhlIGBBY3Rpb25gIGlzIGBDT05USU5VRWAsIGBJbmRleGAgY2FuIGJlIHJldHVybmVkLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIHtOb2RlfSBbVHJlZT1Ob2RlXVxuICogICBUcmVlIHR5cGUuXG4gKiBAdGVtcGxhdGUge1Rlc3R9IFtDaGVjaz1zdHJpbmddXG4gKiAgIFRlc3QgdHlwZS5cbiAqIEB0eXBlZGVmIHtWaXNpdG9yPGltcG9ydCgnLi9jb21wbGV4LXR5cGVzLmpzJykuTWF0Y2hlczxpbXBvcnQoJy4vY29tcGxleC10eXBlcy5qcycpLkluY2x1c2l2ZURlc2NlbmRhbnQ8VHJlZT4sIENoZWNrPiwgRXh0cmFjdDxpbXBvcnQoJy4vY29tcGxleC10eXBlcy5qcycpLkluY2x1c2l2ZURlc2NlbmRhbnQ8VHJlZT4sIFBhcmVudD4+fSBCdWlsZFZpc2l0b3JcbiAqICAgQnVpbGQgYSB0eXBlZCBgVmlzaXRvcmAgZnVuY3Rpb24gZnJvbSBhIHRyZWUgYW5kIGEgdGVzdC5cbiAqXG4gKiAgIEl0IHdpbGwgaW5mZXIgd2hpY2ggdmFsdWVzIGFyZSBwYXNzZWQgYXMgYG5vZGVgIGFuZCB3aGljaCBhcyBgcGFyZW50c2AuXG4gKi9cblxuaW1wb3J0IHtjb252ZXJ0fSBmcm9tICd1bmlzdC11dGlsLWlzJ1xuaW1wb3J0IHtjb2xvcn0gZnJvbSAnLi9jb2xvci5qcydcblxuLyoqXG4gKiBDb250aW51ZSB0cmF2ZXJzaW5nIGFzIG5vcm1hbC5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTlRJTlVFID0gdHJ1ZVxuXG4vKipcbiAqIFN0b3AgdHJhdmVyc2luZyBpbW1lZGlhdGVseS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVYSVQgPSBmYWxzZVxuXG4vKipcbiAqIERvIG5vdCB0cmF2ZXJzZSB0aGlzIG5vZGXigJlzIGNoaWxkcmVuLlxuICovXG5leHBvcnQgY29uc3QgU0tJUCA9ICdza2lwJ1xuXG4vKipcbiAqIFZpc2l0IG5vZGVzLCB3aXRoIGFuY2VzdHJhbCBpbmZvcm1hdGlvbi5cbiAqXG4gKiBUaGlzIGFsZ29yaXRobSBwZXJmb3JtcyAqZGVwdGgtZmlyc3QqICp0cmVlIHRyYXZlcnNhbCogaW4gKnByZW9yZGVyKlxuICogKCoqTkxSKiopIG9yIGlmIGByZXZlcnNlYCBpcyBnaXZlbiwgaW4gKnJldmVyc2UgcHJlb3JkZXIqICgqKk5STCoqKS5cbiAqXG4gKiBZb3UgY2FuIGNob29zZSBmb3Igd2hpY2ggbm9kZXMgYHZpc2l0b3JgIGlzIGNhbGxlZCBieSBwYXNzaW5nIGEgYHRlc3RgLlxuICogRm9yIGNvbXBsZXggdGVzdHMsIHlvdSBzaG91bGQgdGVzdCB5b3Vyc2VsZiBpbiBgdmlzaXRvcmAsIGFzIGl0IHdpbGwgYmVcbiAqIGZhc3RlciBhbmQgd2lsbCBoYXZlIGltcHJvdmVkIHR5cGUgaW5mb3JtYXRpb24uXG4gKlxuICogV2Fsa2luZyB0aGUgdHJlZSBpcyBhbiBpbnRlbnNpdmUgdGFzay5cbiAqIE1ha2UgdXNlIG9mIHRoZSByZXR1cm4gdmFsdWVzIG9mIHRoZSB2aXNpdG9yIHdoZW4gcG9zc2libGUuXG4gKiBJbnN0ZWFkIG9mIHdhbGtpbmcgYSB0cmVlIG11bHRpcGxlIHRpbWVzLCB3YWxrIGl0IG9uY2UsIHVzZSBgdW5pc3QtdXRpbC1pc2BcbiAqIHRvIGNoZWNrIGlmIGEgbm9kZSBtYXRjaGVzLCBhbmQgdGhlbiBwZXJmb3JtIGRpZmZlcmVudCBvcGVyYXRpb25zLlxuICpcbiAqIFlvdSBjYW4gY2hhbmdlIHRoZSB0cmVlLlxuICogU2VlIGBWaXNpdG9yYCBmb3IgbW9yZSBpbmZvLlxuICpcbiAqIEBwYXJhbSB0cmVlXG4gKiAgIFRyZWUgdG8gdHJhdmVyc2UuXG4gKiBAcGFyYW0gdGVzdFxuICogICBgdW5pc3QtdXRpbC1pc2AtY29tcGF0aWJsZSB0ZXN0XG4gKiBAcGFyYW0gdmlzaXRvclxuICogICBIYW5kbGUgZWFjaCBub2RlLlxuICogQHBhcmFtIHJldmVyc2VcbiAqICAgVHJhdmVyc2UgaW4gcmV2ZXJzZSBwcmVvcmRlciAoTlJMKSBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IHByZW9yZGVyIChOTFIpLlxuICogQHJldHVybnNcbiAqICAgTm90aGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHZpc2l0UGFyZW50cyA9XG4gIC8qKlxuICAgKiBAdHlwZSB7KFxuICAgKiAgICg8VHJlZSBleHRlbmRzIE5vZGUsIENoZWNrIGV4dGVuZHMgVGVzdD4odHJlZTogVHJlZSwgdGVzdDogQ2hlY2ssIHZpc2l0b3I6IEJ1aWxkVmlzaXRvcjxUcmVlLCBDaGVjaz4sIHJldmVyc2U/OiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gdm9pZCkgJlxuICAgKiAgICg8VHJlZSBleHRlbmRzIE5vZGU+KHRyZWU6IFRyZWUsIHZpc2l0b3I6IEJ1aWxkVmlzaXRvcjxUcmVlPiwgcmV2ZXJzZT86IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB2b2lkKVxuICAgKiApfVxuICAgKi9cbiAgKFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdHJlZVxuICAgICAqIEBwYXJhbSB7VGVzdH0gdGVzdFxuICAgICAqIEBwYXJhbSB7VmlzaXRvcjxOb2RlPn0gdmlzaXRvclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFtyZXZlcnNlXVxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICh0cmVlLCB0ZXN0LCB2aXNpdG9yLCByZXZlcnNlKSB7XG4gICAgICBpZiAodHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZpc2l0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV2ZXJzZSA9IHZpc2l0b3JcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBubyB2aXNpdG9yIGdpdmVuLCBzbyBgdmlzaXRvcmAgaXMgdGVzdC5cbiAgICAgICAgdmlzaXRvciA9IHRlc3RcbiAgICAgICAgdGVzdCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXMgPSBjb252ZXJ0KHRlc3QpXG4gICAgICBjb25zdCBzdGVwID0gcmV2ZXJzZSA/IC0xIDogMVxuXG4gICAgICBmYWN0b3J5KHRyZWUsIHVuZGVmaW5lZCwgW10pKClcblxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBpbmRleFxuICAgICAgICogQHBhcmFtIHtBcnJheTxQYXJlbnQ+fSBwYXJlbnRzXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGZhY3Rvcnkobm9kZSwgaW5kZXgsIHBhcmVudHMpIHtcbiAgICAgICAgLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn0gKi9cbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogaHVzaFxuICAgICAgICBjb25zdCB2YWx1ZSA9IG5vZGUgJiYgdHlwZW9mIG5vZGUgPT09ICdvYmplY3QnID8gbm9kZSA6IHt9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPVxuICAgICAgICAgICAgLy8gYGhhc3RgXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUudGFnTmFtZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgPyB2YWx1ZS50YWdOYW1lXG4gICAgICAgICAgICAgIDogLy8gYHhhc3RgXG4gICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZS5uYW1lID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICA/IHZhbHVlLm5hbWVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcblxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2aXNpdCwgJ25hbWUnLCB7XG4gICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgJ25vZGUgKCcgKyBjb2xvcihub2RlLnR5cGUgKyAobmFtZSA/ICc8JyArIG5hbWUgKyAnPicgOiAnJykpICsgJyknXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2aXNpdFxuXG4gICAgICAgIGZ1bmN0aW9uIHZpc2l0KCkge1xuICAgICAgICAgIC8qKiBAdHlwZSB7QWN0aW9uVHVwbGV9ICovXG4gICAgICAgICAgbGV0IHJlc3VsdCA9IFtdXG4gICAgICAgICAgLyoqIEB0eXBlIHtBY3Rpb25UdXBsZX0gKi9cbiAgICAgICAgICBsZXQgc3VicmVzdWx0XG4gICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgICAgbGV0IG9mZnNldFxuICAgICAgICAgIC8qKiBAdHlwZSB7QXJyYXk8UGFyZW50Pn0gKi9cbiAgICAgICAgICBsZXQgZ3JhbmRwYXJlbnRzXG5cbiAgICAgICAgICBpZiAoIXRlc3QgfHwgaXMobm9kZSwgaW5kZXgsIHBhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXSB8fCBudWxsKSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdG9SZXN1bHQodmlzaXRvcihub2RlLCBwYXJlbnRzKSlcblxuICAgICAgICAgICAgaWYgKHJlc3VsdFswXSA9PT0gRVhJVCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBsb29rcyBsaWtlIGEgcGFyZW50LlxuICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuICYmIHJlc3VsdFswXSAhPT0gU0tJUCkge1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBsb29rcyBsaWtlIGEgcGFyZW50LlxuICAgICAgICAgICAgb2Zmc2V0ID0gKHJldmVyc2UgPyBub2RlLmNoaWxkcmVuLmxlbmd0aCA6IC0xKSArIHN0ZXBcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgbG9va3MgbGlrZSBhIHBhcmVudC5cbiAgICAgICAgICAgIGdyYW5kcGFyZW50cyA9IHBhcmVudHMuY29uY2F0KG5vZGUpXG5cbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgbG9va3MgbGlrZSBhIHBhcmVudC5cbiAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPiAtMSAmJiBvZmZzZXQgPCBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIGxvb2tzIGxpa2UgYSBwYXJlbnQuXG4gICAgICAgICAgICAgIHN1YnJlc3VsdCA9IGZhY3Rvcnkobm9kZS5jaGlsZHJlbltvZmZzZXRdLCBvZmZzZXQsIGdyYW5kcGFyZW50cykoKVxuXG4gICAgICAgICAgICAgIGlmIChzdWJyZXN1bHRbMF0gPT09IEVYSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VicmVzdWx0XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvZmZzZXQgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiBzdWJyZXN1bHRbMV0gPT09ICdudW1iZXInID8gc3VicmVzdWx0WzFdIDogb2Zmc2V0ICsgc3RlcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgKVxuXG4vKipcbiAqIFR1cm4gYSByZXR1cm4gdmFsdWUgaW50byBhIGNsZWFuIHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0ge1Zpc2l0b3JSZXN1bHR9IHZhbHVlXG4gKiAgIFZhbGlkIHJldHVybiB2YWx1ZXMgZnJvbSB2aXNpdG9ycy5cbiAqIEByZXR1cm5zIHtBY3Rpb25UdXBsZX1cbiAqICAgQ2xlYW4gcmVzdWx0LlxuICovXG5mdW5jdGlvbiB0b1Jlc3VsdCh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIFtDT05USU5VRSwgdmFsdWVdXG4gIH1cblxuICByZXR1cm4gW3ZhbHVlXVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/unist-util-visit-parents@5.1.3/node_modules/unist-util-visit-parents/lib/index.js\n");

/***/ })

};
;