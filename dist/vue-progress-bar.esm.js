//
//
//

const inBrowser = typeof window !== 'undefined';
var script = {
    name: 'VueProgress',
    serverCacheKey: () => 'Progress',
    computed: {
        style () {
            const progress = this.progress;
            const options = progress.options;
            const isShow = !!options.show;
            const location = options.location;
            const style = {
                'background-color': options.canSuccess ? options.color : options.failedColor,
                'opacity': options.show ? 1 : 0,
                'position': options.position
            };
            if (location === 'top' || location === 'bottom') {
                location === 'top' ? style.top = '0px' : style.bottom = '0px';
                if (!options.inverse) {
                    style.left = '0px';
                } else {
                    style.right = '0px';
                }
                style.width = progress.percent + '%';
                style.height = options.thickness;
                style.transition = (isShow ? "width " + options.transition.speed + ", " : "") + "opacity " + options.transition.opacity;
            } else if (location === 'left' || location === 'right') {
                location === 'left' ? style.left = '0px' : style.right = '0px';
                if (!options.inverse) {
                    style.bottom = '0px';
                } else {
                    style.top = '0px';
                }
                style.height = progress.percent + '%';
                style.width = options.thickness;
                style.transition = (isShow ? "height " + options.transition.speed + ", " : "") + "opacity " + options.transition.opacity;
            }
            return style
        },
        progress() {
            if (inBrowser) {
                return window.VueProgressBarEventBus.RADON_LOADING_BAR
            } else {
                return {
                    percent: 0,
                    options: {
                        canSuccess: true,
                        show: false,
                        color: 'rgb(19, 91, 55)',
                        failedColor: 'red',
                        thickness: '2px',
                        transition: {
                            speed: '0.2s',
                            opacity: '0.6s',
                            termination: 300
                        },
                        location: 'top',
                        autoRevert: true,
                        inverse: false
                    }
                }
            }
        }
    }
}

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"__cov-progress",style:(_vm.style)})};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-0592026a_0", { source: ".__cov-progress{opacity:1;z-index:999999}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var vueProgressBar = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  )

function assign (target, source) { // eslint-disable-line no-unused-vars
    for (var index = 1, key, src; index < arguments.length; ++index) {
        src = arguments[index];

        for (key in src) {
            if (Object.prototype.hasOwnProperty.call(src, key)) {
                target[key] = src[key];
            }
        }
    }

    return target
}

let Progress = {
    $vm: null,
    state: {
        tFailColor: '',
        tColor: '',
        timer: null,
        cut: 0
    },
    init (vm) {
        this.$vm = vm;
    },
    start (time) {
        if (!this.$vm) return
        if (!time) time = 3000;
        this.$vm.RADON_LOADING_BAR.percent = 0; // this.$vm.RADON_LOADING_BAR.percent
        this.$vm.RADON_LOADING_BAR.options.show = true;
        this.$vm.RADON_LOADING_BAR.options.canSuccess = true;
        this.state.cut = 10000 / Math.floor(time);
        clearInterval(this.state.timer);
        this.state.timer = setInterval(() => {
            this.increase(this.state.cut * Math.random());
            if (this.$vm.RADON_LOADING_BAR.percent > 95 && this.$vm.RADON_LOADING_BAR.options.autoFinish) {
                this.finish();
            }
        }, 100);
    },
    set (num) {
        this.$vm.RADON_LOADING_BAR.options.show = true;
        this.$vm.RADON_LOADING_BAR.options.canSuccess = true;
        this.$vm.RADON_LOADING_BAR.percent = Math.floor(num);
    },
    get () {
        return Math.floor(this.$vm.RADON_LOADING_BAR.percent)
    },
    increase (num) {
        this.$vm.RADON_LOADING_BAR.percent = Math.min(99, this.$vm.RADON_LOADING_BAR.percent + Math.floor(num));
    },
    decrease (num) {
        this.$vm.RADON_LOADING_BAR.percent = this.$vm.RADON_LOADING_BAR.percent - Math.floor(num);
    },
    hide () {
        clearInterval(this.state.timer);
        this.state.timer = null;
        setTimeout(() => {
            this.$vm.RADON_LOADING_BAR.options.show = false;
            Vue.nextTick(() => {
                setTimeout(() => {
                    this.$vm.RADON_LOADING_BAR.percent = 0;
                }, 100);
                if (this.$vm.RADON_LOADING_BAR.options.autoRevert) {
                    setTimeout(() => {
                        this.revert();
                    }, 300);
                }
            });
        }, this.$vm.RADON_LOADING_BAR.options.transition.termination);
    },
    pause () {
        clearInterval(this.state.timer);
    },
    finish () {
        if (!this.$vm) return
        this.$vm.RADON_LOADING_BAR.percent = 100;
        this.hide();
    },
    fail () {
        this.$vm.RADON_LOADING_BAR.options.canSuccess = false;
        this.$vm.RADON_LOADING_BAR.percent = 100;
        this.hide();
    },
    setFailColor (color) {
        this.$vm.RADON_LOADING_BAR.options.failedColor = color;
    },
    setColor (color) {
        this.$vm.RADON_LOADING_BAR.options.color = color;
    },
    setLocation (loc) {
        this.$vm.RADON_LOADING_BAR.options.location = loc;
    },
    setTransition (transition) {
        this.$vm.RADON_LOADING_BAR.options.transition = transition;
    },
    tempFailColor (color) {
        this.state.tFailColor = this.$vm.RADON_LOADING_BAR.options.failedColor;
        this.$vm.RADON_LOADING_BAR.options.failedColor = color;
    },
    tempColor (color) {
        this.state.tColor = this.$vm.RADON_LOADING_BAR.options.color;
        this.$vm.RADON_LOADING_BAR.options.color = color;
    },
    tempLocation (loc) {
        this.state.tLocation = this.$vm.RADON_LOADING_BAR.options.location;
        this.$vm.RADON_LOADING_BAR.options.location = loc;
    },
    tempTransition (transition) {
        this.state.tTransition = this.$vm.RADON_LOADING_BAR.options.transition;
        this.$vm.RADON_LOADING_BAR.options.transition = transition;
    },
    revertColor () {
        this.$vm.RADON_LOADING_BAR.options.color = this.state.tColor;
        this.state.tColor = '';
    },
    revertFailColor () {
        this.$vm.RADON_LOADING_BAR.options.failedColor = this.state.tFailColor;
        this.state.tFailColor = '';
    },
    revertLocation () {
        this.$vm.RADON_LOADING_BAR.options.location = this.state.tLocation;
        this.state.tLocation = '';
    },
    revertTransition () {
        this.$vm.RADON_LOADING_BAR.options.transition = this.state.tTransition;
        this.state.tTransition = {};
    },
    revert () {
        if (this.$vm.RADON_LOADING_BAR.options.autoRevert) {
            if (this.state.tColor) {
                this.revertColor();
            }
            if (this.state.tFailColor) {
                this.revertFailColor();
            }
            if (this.state.tLocation) {
                this.revertLocation();
            }
            if (this.state.tTransition && (this.state.tTransition.speed !== undefined || this.state.tTransition.opacity !== undefined)) {
                this.revertTransition();
            }
        }
    },
    parseMeta (meta) {
        for (var x in meta.func) {
            let func = meta.func[x];
            switch (func.call) {
                case 'color':
                    switch (func.modifier) {
                        case 'set':
                            this.setColor(func.argument);
                            break
                        case 'temp':
                            this.tempColor(func.argument);
                            break
                    }
                    break;
                case 'fail':
                    switch (func.modifier) {
                        case 'set':
                            this.setFailColor(func.argument);
                            break
                        case 'temp':
                            this.tempFailColor(func.argument);
                            break
                    }
                    break;
                case 'location':
                    switch (func.modifier) {
                        case 'set':
                            this.setLocation(func.argument);
                            break
                        case 'temp':
                            this.tempLocation(func.argument);
                            break
                    }
                    break
                case 'transition':
                    switch (func.modifier) {
                        case 'set':
                            this.setTransition(func.argument);
                            break
                        case 'temp':
                            this.tempTransition(func.argument);
                            break
                    }
                    break
            }
        }
    }
};

function install (Vue, options = {}) {
    const inBrowser = typeof window !== 'undefined';

    const DEFAULT_OPTION = {
        canSuccess: true,
        show: false,
        color: '#73ccec',
        position: 'fixed',
        failedColor: 'red',
        thickness: '2px',
        transition: {
            speed: '0.2s',
            opacity: '0.6s',
            termination: 300
        },
        autoRevert: true,
        location: 'top',
        inverse: false,
        autoFinish: true
    };

    const progressOptions = assign(DEFAULT_OPTION, options);

    const VueProgressBarEventBus = new Vue({
        data: {
            RADON_LOADING_BAR: {
                percent: 0,
                options: progressOptions
            }
        }
    });

    if (inBrowser) {
        window.VueProgressBarEventBus = VueProgressBarEventBus;
        Progress.init(VueProgressBarEventBus);
    }

    const Component = Vue.extend(vueProgressBar);
    document.body.appendChild((new Component().$mount()).$el);

    Vue.prototype.$Progress = Progress;
}

var index = {
    install,
    progress: Progress
}

export default index;
