// import "highlight.js/styles/stackoverflow-light.css";
// import hljs from "highlight.js/lib/core";
// import javascript from "highlight.js/lib/languages/javascript";
// import hljsVuePlugin from "@highlightjs/vue-plugin";

import hljs from 'highlight.js/lib/core';
// import 'highlight.js/scss/stackoverflow-light.scss';
import javascript from 'highlight.js/lib/languages/javascript';

export default defineNuxtPlugin((nuxtApp) => {
    hljs.registerLanguage('javascript', javascript);
//   hljs.registerLanguage("javascript", javascript);

//   nuxtApp.vueApp.use(hljsVuePlugin);
  // now available on `nuxtApp.$injected`
  // nuxtApp.provide("injected", () => "my injected function");
  // You can alternatively use this format, which comes with automatic type support
    return {
      provide: {
        hljs
      },
    };
});
