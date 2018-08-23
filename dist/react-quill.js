!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("classnames"),require("noop"),require("object-assign"),require("prop-types"),require("quill"),require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["classnames","noop","object-assign","prop-types","quill","react","react-dom"],t):"object"==typeof exports?exports.ReactQuill=t(require("classnames"),require("noop"),require("object-assign"),require("prop-types"),require("quill"),require("react"),require("react-dom")):e.ReactQuill=t(e.classnames,e.noop,e["object-assign"],e["prop-types"],e.quill,e.react,e["react-dom"])}(this,function(e,t,r,n,o,i,u){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="/",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),i=n(o);t.default=i.default},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,s,c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},f=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),p=r(7),d=n(p),h=r(8),y=(n(h),r(5)),b=n(y),m=r(2),q=n(m),v=r(3),g=n(v),j=r(4),_=(n(j),r(6)),x=n(_),O=(s=l=function(e){function t(){var e,r,n,o;i(this,t);for(var a=arguments.length,l=Array(a),s=0;s<a;s++)l[s]=arguments[s];return r=n=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),n._onEditorChange=function(){var e=n.props.onChange;e({target:{quill:n.quill,value:n.html}})},o=r,u(n,o)}return a(t,e),f(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.value,r=e.options;this.quill=new x.default(this.root,r),this.quill.on("editor-change",this._onEditorChange),this.html=t}},{key:"componentWillUnmount",value:function(){this.quill.off("editor-change",this._onEditorChange),this.quill=null}},{key:"render",value:function(){var e=this,t=this.props,r=t.className,n=o(t,["className"]);return d.default.createElement("section",c({ref:function(t){return e.root=t},className:(0,q.default)("react-quill",r)},n))}},{key:"html",set:function(e){this.quill.container.firstChild.innerHTML=e},get:function(){return this.quill.container.firstChild.innerHTML}}]),t}(p.Component),l.propTypes={className:b.default.string,value:b.default.string,onChange:b.default.func,options:b.default.object},l.defaultProps={onChange:g.default,options:{theme:"snow"}},s);t.default=O},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t){e.exports=n},function(e,t){e.exports=o},function(e,t){e.exports=i},function(e,t){e.exports=u}])});
//# sourceMappingURL=react-quill.js.map