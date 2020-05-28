webpackHotUpdate("static/development/pages/docs.js",{

/***/ "./pages/docs.tsx":
/*!************************!*\
  !*** ./pages/docs.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ \"../../../node_modules/@babel/runtime-corejs2/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ \"../../../node_modules/@babel/runtime-corejs2/core-js/json/stringify.js\");\n/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ \"../../../node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ \"../../../node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ \"../../../node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ \"../../../node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ \"../../../node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ \"../../../node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ \"../../../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ \"../../../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Container */ \"../../../node_modules/@material-ui/core/esm/Container/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ \"../../../node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Box */ \"../../../node_modules/@material-ui/core/esm/Box/index.js\");\n/* harmony import */ var markdown_to_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! markdown-to-jsx */ \"../../../node_modules/markdown-to-jsx/dist/esm.js\");\n/* harmony import */ var _README_md__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../README.md */ \"../README.md\");\n/* harmony import */ var _README_md__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_README_md__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _client_lib_Link__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ~/client/lib/Link */ \"./lib/Link.tsx\");\n/* harmony import */ var _client_util_axios__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ~/client/util/axios */ \"./util/axios.tsx\");\n\n\n\n\n\n\n\n\nvar _jsxFileName = \"/github/ewl/packages/examples/client/pages/docs.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement;\n\n\n\n\n\n\n\n\n\n\nvar Docs =\n/*#__PURE__*/\nfunction (_React$Component) {\n  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(Docs, _React$Component);\n\n  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(Docs, null, [{\n    key: \"getInitialProps\",\n    value: function () {\n      var _getInitialProps = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n      /*#__PURE__*/\n      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ctx) {\n        var userList;\n        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return Object(_client_util_axios__WEBPACK_IMPORTED_MODULE_16__[\"post\"])('http://medrecweb-infra-ewell-uat.192.168.150.42.nip.io/api/authority/getTreeList', {\n                  datatype: \"json\",\n                  i18n: \"zh\",\n                  nvalue: {},\n                  params: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()({\n                    \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzU3MDkzNjQsInVzZXJuYW1lIjoiMzA5NiJ9.ERbxadzWZE9SjUrjzzaNL4jZoXgHLawqV1M557GYczI\",\n                    \"query\": {\n                      \"loginToken\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzU3MDkzNjQsInVzZXJuYW1lIjoiMzA5NiJ9.ERbxadzWZE9SjUrjzzaNL4jZoXgHLawqV1M557GYczI\",\n                      \"appId\": \"1001\",\n                      \"activeDeptCode\": \"12002000\"\n                    },\n                    \"appId\": \"1001\",\n                    \"dimenCode\": \"Dept\",\n                    \"deviceType\": \"pc\"\n                  })\n                });\n\n              case 2:\n                userList = _context.sent;\n                console.log(userList);\n                return _context.abrupt(\"return\", {\n                  userList: userList\n                });\n\n              case 5:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n\n      function getInitialProps(_x) {\n        return _getInitialProps.apply(this, arguments);\n      }\n\n      return getInitialProps;\n    }()\n  }]);\n\n  function Docs(props) {\n    var _this;\n\n    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, Docs);\n\n    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(Docs).call(this, props));\n    _this.state = {};\n    return _this;\n  }\n\n  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(Docs, [{\n    key: \"render\",\n    value: function render() {\n      return __jsx(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n        maxWidth: \"sm\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 31\n        },\n        __self: this\n      }, __jsx(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n        my: 4,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 32\n        },\n        __self: this\n      }, __jsx(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n        variant: \"h4\",\n        component: \"h1\",\n        gutterBottom: true,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 33\n        },\n        __self: this\n      }, \"Next.js with TypeScript example\"), __jsx(_client_lib_Link__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n        href: \"/docs2\",\n        color: \"secondary\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 36\n        },\n        __self: this\n      }, \"Go to the docs2 page\"), __jsx(\"ul\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 39\n        },\n        __self: this\n      }, this.props.userList.map(function (item) {\n        return __jsx(\"li\", {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 41\n          },\n          __self: this\n        }, item.name, \":\", item.age);\n      })), __jsx(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n        children: _README_md__WEBPACK_IMPORTED_MODULE_14___default.a,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 44\n        },\n        __self: this\n      })));\n    }\n  }]);\n\n  return Docs;\n}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    docs: state.docs\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_9__[\"connect\"])(mapStateToProps)(Docs));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9kb2NzLnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL2RvY3MudHN4P2I0MWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9yZWdlbmVyYXRvclJ1bnRpbWUgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczIvcmVnZW5lcmF0b3JcIjtcbmltcG9ydCBfSlNPTiRzdHJpbmdpZnkgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczIvY29yZS1qcy9qc29uL3N0cmluZ2lmeVwiO1xuaW1wb3J0IF9hc3luY1RvR2VuZXJhdG9yIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMyL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3JcIjtcbmltcG9ydCBfY2xhc3NDYWxsQ2hlY2sgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczIvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2tcIjtcbmltcG9ydCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiBmcm9tIFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMi9oZWxwZXJzL2VzbS9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCI7XG5pbXBvcnQgX2dldFByb3RvdHlwZU9mIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMyL2hlbHBlcnMvZXNtL2dldFByb3RvdHlwZU9mXCI7XG5pbXBvcnQgX2NyZWF0ZUNsYXNzIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMyL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzXCI7XG5pbXBvcnQgX2luaGVyaXRzIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMyL2hlbHBlcnMvZXNtL2luaGVyaXRzXCI7XG52YXIgX2pzeEZpbGVOYW1lID0gXCIvZ2l0aHViL2V3bC9wYWNrYWdlcy9leGFtcGxlcy9jbGllbnQvcGFnZXMvZG9jcy50c3hcIjtcbnZhciBfX2pzeCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQ7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvQ29udGFpbmVyJztcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHknO1xuaW1wb3J0IEJveCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9Cb3gnO1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ21hcmtkb3duLXRvLWpzeCc7XG5pbXBvcnQgcmVhZG1lIGZyb20gJy4uLy4uL1JFQURNRS5tZCc7XG5pbXBvcnQgTGluayBmcm9tICd+L2NsaWVudC9saWIvTGluayc7XG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnfi9jbGllbnQvdXRpbC9heGlvcyc7XG5cbnZhciBEb2NzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhEb2NzLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBfY3JlYXRlQ2xhc3MoRG9jcywgbnVsbCwgW3tcbiAgICBrZXk6IFwiZ2V0SW5pdGlhbFByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfZ2V0SW5pdGlhbFByb3BzID0gX2FzeW5jVG9HZW5lcmF0b3IoXG4gICAgICAvKiNfX1BVUkVfXyovXG4gICAgICBfcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShjdHgpIHtcbiAgICAgICAgdmFyIHVzZXJMaXN0O1xuICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3N0KCdodHRwOi8vbWVkcmVjd2ViLWluZnJhLWV3ZWxsLXVhdC4xOTIuMTY4LjE1MC40Mi5uaXAuaW8vYXBpL2F1dGhvcml0eS9nZXRUcmVlTGlzdCcsIHtcbiAgICAgICAgICAgICAgICAgIGRhdGF0eXBlOiBcImpzb25cIixcbiAgICAgICAgICAgICAgICAgIGkxOG46IFwiemhcIixcbiAgICAgICAgICAgICAgICAgIG52YWx1ZToge30sXG4gICAgICAgICAgICAgICAgICBwYXJhbXM6IF9KU09OJHN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKbGVIQWlPakUxTnpVM01Ea3pOalFzSW5WelpYSnVZVzFsSWpvaU16QTVOaUo5LkVSYnhhZHpXWkU5U2pVcmp6emFOTDRqWm9YZ0hMYXdxVjFNNTU3R1ljeklcIixcbiAgICAgICAgICAgICAgICAgICAgXCJxdWVyeVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJsb2dpblRva2VuXCI6IFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SmxlSEFpT2pFMU56VTNNRGt6TmpRc0luVnpaWEp1WVcxbElqb2lNekE1TmlKOS5FUmJ4YWR6V1pFOVNqVXJqenphTkw0alpvWGdITGF3cVYxTTU1N0dZY3pJXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBJZFwiOiBcIjEwMDFcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImFjdGl2ZURlcHRDb2RlXCI6IFwiMTIwMDIwMDBcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcImFwcElkXCI6IFwiMTAwMVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRpbWVuQ29kZVwiOiBcIkRlcHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkZXZpY2VUeXBlXCI6IFwicGNcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdXNlckxpc3QgPSBfY29udGV4dC5zZW50O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJMaXN0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHtcbiAgICAgICAgICAgICAgICAgIHVzZXJMaXN0OiB1c2VyTGlzdFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0SW5pdGlhbFByb3BzKF94KSB7XG4gICAgICAgIHJldHVybiBfZ2V0SW5pdGlhbFByb3BzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRJbml0aWFsUHJvcHM7XG4gICAgfSgpXG4gIH1dKTtcblxuICBmdW5jdGlvbiBEb2NzKHByb3BzKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERvY3MpO1xuXG4gICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoRG9jcykuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKERvY3MsIFt7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX19qc3goQ29udGFpbmVyLCB7XG4gICAgICAgIG1heFdpZHRoOiBcInNtXCIsXG4gICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiAzMVxuICAgICAgICB9LFxuICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgIH0sIF9fanN4KEJveCwge1xuICAgICAgICBteTogNCxcbiAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgIGxpbmVOdW1iZXI6IDMyXG4gICAgICAgIH0sXG4gICAgICAgIF9fc2VsZjogdGhpc1xuICAgICAgfSwgX19qc3goVHlwb2dyYXBoeSwge1xuICAgICAgICB2YXJpYW50OiBcImg0XCIsXG4gICAgICAgIGNvbXBvbmVudDogXCJoMVwiLFxuICAgICAgICBndXR0ZXJCb3R0b206IHRydWUsXG4gICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiAzM1xuICAgICAgICB9LFxuICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgIH0sIFwiTmV4dC5qcyB3aXRoIFR5cGVTY3JpcHQgZXhhbXBsZVwiKSwgX19qc3goTGluaywge1xuICAgICAgICBocmVmOiBcIi9kb2NzMlwiLFxuICAgICAgICBjb2xvcjogXCJzZWNvbmRhcnlcIixcbiAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgIGxpbmVOdW1iZXI6IDM2XG4gICAgICAgIH0sXG4gICAgICAgIF9fc2VsZjogdGhpc1xuICAgICAgfSwgXCJHbyB0byB0aGUgZG9jczIgcGFnZVwiKSwgX19qc3goXCJ1bFwiLCB7XG4gICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiAzOVxuICAgICAgICB9LFxuICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgIH0sIHRoaXMucHJvcHMudXNlckxpc3QubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBfX2pzeChcImxpXCIsIHtcbiAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICAgIGxpbmVOdW1iZXI6IDQxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgICAgfSwgaXRlbS5uYW1lLCBcIjpcIiwgaXRlbS5hZ2UpO1xuICAgICAgfSkpLCBfX2pzeChNYXJrZG93biwge1xuICAgICAgICBjaGlsZHJlbjogcmVhZG1lLFxuICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUsXG4gICAgICAgICAgbGluZU51bWJlcjogNDRcbiAgICAgICAgfSxcbiAgICAgICAgX19zZWxmOiB0aGlzXG4gICAgICB9KSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEb2NzO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG52YXIgbWFwU3RhdGVUb1Byb3BzID0gZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgZG9jczogc3RhdGUuZG9jc1xuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKERvY3MpOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/docs.tsx\n");

/***/ })

})