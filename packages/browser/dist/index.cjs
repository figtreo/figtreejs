"use strict";
var lv = Object.defineProperty;
var sv = (t, r, o) =>
  r in t
    ? lv(t, r, { enumerable: !0, configurable: !0, writable: !0, value: o })
    : (t[r] = o);
var ct = (t, r, o) => sv(t, typeof r != "symbol" ? r + "" : r, o);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function xg(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var mf = { exports: {} },
  fs = {},
  gf = { exports: {} },
  We = {};
var Gp;
function uv() {
  if (Gp) return We;
  Gp = 1;
  var t = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    l = Symbol.for("react.strict_mode"),
    u = Symbol.for("react.profiler"),
    c = Symbol.for("react.provider"),
    p = Symbol.for("react.context"),
    m = Symbol.for("react.forward_ref"),
    w = Symbol.for("react.suspense"),
    v = Symbol.for("react.memo"),
    _ = Symbol.for("react.lazy"),
    T = Symbol.iterator;
  function M(F) {
    return F === null || typeof F != "object"
      ? null
      : ((F = (T && F[T]) || F["@@iterator"]),
        typeof F == "function" ? F : null);
  }
  var P = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    $ = Object.assign,
    L = {};
  function z(F, X, Re) {
    ((this.props = F),
      (this.context = X),
      (this.refs = L),
      (this.updater = Re || P));
  }
  ((z.prototype.isReactComponent = {}),
    (z.prototype.setState = function (F, X) {
      if (typeof F != "object" && typeof F != "function" && F != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, F, X, "setState");
    }),
    (z.prototype.forceUpdate = function (F) {
      this.updater.enqueueForceUpdate(this, F, "forceUpdate");
    }));
  function D() {}
  D.prototype = z.prototype;
  function W(F, X, Re) {
    ((this.props = F),
      (this.context = X),
      (this.refs = L),
      (this.updater = Re || P));
  }
  var H = (W.prototype = new D());
  ((H.constructor = W), $(H, z.prototype), (H.isPureReactComponent = !0));
  var Y = Array.isArray,
    oe = Object.prototype.hasOwnProperty,
    fe = { current: null },
    ae = { key: !0, ref: !0, __self: !0, __source: !0 };
  function _e(F, X, Re) {
    var Le,
      ze = {},
      Ue = null,
      Qe = null;
    if (X != null)
      for (Le in (X.ref !== void 0 && (Qe = X.ref),
      X.key !== void 0 && (Ue = "" + X.key),
      X))
        oe.call(X, Le) && !ae.hasOwnProperty(Le) && (ze[Le] = X[Le]);
    var Ve = arguments.length - 2;
    if (Ve === 1) ze.children = Re;
    else if (1 < Ve) {
      for (var K = Array(Ve), ve = 0; ve < Ve; ve++) K[ve] = arguments[ve + 2];
      ze.children = K;
    }
    if (F && F.defaultProps)
      for (Le in ((Ve = F.defaultProps), Ve))
        ze[Le] === void 0 && (ze[Le] = Ve[Le]);
    return {
      $$typeof: t,
      type: F,
      key: Ue,
      ref: Qe,
      props: ze,
      _owner: fe.current,
    };
  }
  function Ee(F, X) {
    return {
      $$typeof: t,
      type: F.type,
      key: X,
      ref: F.ref,
      props: F.props,
      _owner: F._owner,
    };
  }
  function xe(F) {
    return typeof F == "object" && F !== null && F.$$typeof === t;
  }
  function te(F) {
    var X = { "=": "=0", ":": "=2" };
    return (
      "$" +
      F.replace(/[=:]/g, function (Re) {
        return X[Re];
      })
    );
  }
  var Se = /\/+/g;
  function ie(F, X) {
    return typeof F == "object" && F !== null && F.key != null
      ? te("" + F.key)
      : X.toString(36);
  }
  function ke(F, X, Re, Le, ze) {
    var Ue = typeof F;
    (Ue === "undefined" || Ue === "boolean") && (F = null);
    var Qe = !1;
    if (F === null) Qe = !0;
    else
      switch (Ue) {
        case "string":
        case "number":
          Qe = !0;
          break;
        case "object":
          switch (F.$$typeof) {
            case t:
            case r:
              Qe = !0;
          }
      }
    if (Qe)
      return (
        (Qe = F),
        (ze = ze(Qe)),
        (F = Le === "" ? "." + ie(Qe, 0) : Le),
        Y(ze)
          ? ((Re = ""),
            F != null && (Re = F.replace(Se, "$&/") + "/"),
            ke(ze, X, Re, "", function (ve) {
              return ve;
            }))
          : ze != null &&
            (xe(ze) &&
              (ze = Ee(
                ze,
                Re +
                  (!ze.key || (Qe && Qe.key === ze.key)
                    ? ""
                    : ("" + ze.key).replace(Se, "$&/") + "/") +
                  F,
              )),
            X.push(ze)),
        1
      );
    if (((Qe = 0), (Le = Le === "" ? "." : Le + ":"), Y(F)))
      for (var Ve = 0; Ve < F.length; Ve++) {
        Ue = F[Ve];
        var K = Le + ie(Ue, Ve);
        Qe += ke(Ue, X, Re, K, ze);
      }
    else if (((K = M(F)), typeof K == "function"))
      for (F = K.call(F), Ve = 0; !(Ue = F.next()).done; )
        ((Ue = Ue.value),
          (K = Le + ie(Ue, Ve++)),
          (Qe += ke(Ue, X, Re, K, ze)));
    else if (Ue === "object")
      throw (
        (X = String(F)),
        Error(
          "Objects are not valid as a React child (found: " +
            (X === "[object Object]"
              ? "object with keys {" + Object.keys(F).join(", ") + "}"
              : X) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return Qe;
  }
  function Ze(F, X, Re) {
    if (F == null) return F;
    var Le = [],
      ze = 0;
    return (
      ke(F, Le, "", "", function (Ue) {
        return X.call(Re, Ue, ze++);
      }),
      Le
    );
  }
  function je(F) {
    if (F._status === -1) {
      var X = F._result;
      ((X = X()),
        X.then(
          function (Re) {
            (F._status === 0 || F._status === -1) &&
              ((F._status = 1), (F._result = Re));
          },
          function (Re) {
            (F._status === 0 || F._status === -1) &&
              ((F._status = 2), (F._result = Re));
          },
        ),
        F._status === -1 && ((F._status = 0), (F._result = X)));
    }
    if (F._status === 1) return F._result.default;
    throw F._result;
  }
  var Ne = { current: null },
    G = { transition: null },
    ce = {
      ReactCurrentDispatcher: Ne,
      ReactCurrentBatchConfig: G,
      ReactCurrentOwner: fe,
    };
  function de() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (We.Children = {
      map: Ze,
      forEach: function (F, X, Re) {
        Ze(
          F,
          function () {
            X.apply(this, arguments);
          },
          Re,
        );
      },
      count: function (F) {
        var X = 0;
        return (
          Ze(F, function () {
            X++;
          }),
          X
        );
      },
      toArray: function (F) {
        return (
          Ze(F, function (X) {
            return X;
          }) || []
        );
      },
      only: function (F) {
        if (!xe(F))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return F;
      },
    }),
    (We.Component = z),
    (We.Fragment = o),
    (We.Profiler = u),
    (We.PureComponent = W),
    (We.StrictMode = l),
    (We.Suspense = w),
    (We.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ce),
    (We.act = de),
    (We.cloneElement = function (F, X, Re) {
      if (F == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            F +
            ".",
        );
      var Le = $({}, F.props),
        ze = F.key,
        Ue = F.ref,
        Qe = F._owner;
      if (X != null) {
        if (
          (X.ref !== void 0 && ((Ue = X.ref), (Qe = fe.current)),
          X.key !== void 0 && (ze = "" + X.key),
          F.type && F.type.defaultProps)
        )
          var Ve = F.type.defaultProps;
        for (K in X)
          oe.call(X, K) &&
            !ae.hasOwnProperty(K) &&
            (Le[K] = X[K] === void 0 && Ve !== void 0 ? Ve[K] : X[K]);
      }
      var K = arguments.length - 2;
      if (K === 1) Le.children = Re;
      else if (1 < K) {
        Ve = Array(K);
        for (var ve = 0; ve < K; ve++) Ve[ve] = arguments[ve + 2];
        Le.children = Ve;
      }
      return {
        $$typeof: t,
        type: F.type,
        key: ze,
        ref: Ue,
        props: Le,
        _owner: Qe,
      };
    }),
    (We.createContext = function (F) {
      return (
        (F = {
          $$typeof: p,
          _currentValue: F,
          _currentValue2: F,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (F.Provider = { $$typeof: c, _context: F }),
        (F.Consumer = F)
      );
    }),
    (We.createElement = _e),
    (We.createFactory = function (F) {
      var X = _e.bind(null, F);
      return ((X.type = F), X);
    }),
    (We.createRef = function () {
      return { current: null };
    }),
    (We.forwardRef = function (F) {
      return { $$typeof: m, render: F };
    }),
    (We.isValidElement = xe),
    (We.lazy = function (F) {
      return { $$typeof: _, _payload: { _status: -1, _result: F }, _init: je };
    }),
    (We.memo = function (F, X) {
      return { $$typeof: v, type: F, compare: X === void 0 ? null : X };
    }),
    (We.startTransition = function (F) {
      var X = G.transition;
      G.transition = {};
      try {
        F();
      } finally {
        G.transition = X;
      }
    }),
    (We.unstable_act = de),
    (We.useCallback = function (F, X) {
      return Ne.current.useCallback(F, X);
    }),
    (We.useContext = function (F) {
      return Ne.current.useContext(F);
    }),
    (We.useDebugValue = function () {}),
    (We.useDeferredValue = function (F) {
      return Ne.current.useDeferredValue(F);
    }),
    (We.useEffect = function (F, X) {
      return Ne.current.useEffect(F, X);
    }),
    (We.useId = function () {
      return Ne.current.useId();
    }),
    (We.useImperativeHandle = function (F, X, Re) {
      return Ne.current.useImperativeHandle(F, X, Re);
    }),
    (We.useInsertionEffect = function (F, X) {
      return Ne.current.useInsertionEffect(F, X);
    }),
    (We.useLayoutEffect = function (F, X) {
      return Ne.current.useLayoutEffect(F, X);
    }),
    (We.useMemo = function (F, X) {
      return Ne.current.useMemo(F, X);
    }),
    (We.useReducer = function (F, X, Re) {
      return Ne.current.useReducer(F, X, Re);
    }),
    (We.useRef = function (F) {
      return Ne.current.useRef(F);
    }),
    (We.useState = function (F) {
      return Ne.current.useState(F);
    }),
    (We.useSyncExternalStore = function (F, X, Re) {
      return Ne.current.useSyncExternalStore(F, X, Re);
    }),
    (We.useTransition = function () {
      return Ne.current.useTransition();
    }),
    (We.version = "18.3.1"),
    We
  );
}
var Jp;
function Hs() {
  return (Jp || ((Jp = 1), (gf.exports = uv())), gf.exports);
}
var em;
function av() {
  if (em) return fs;
  em = 1;
  var t = Hs(),
    r = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    l = Object.prototype.hasOwnProperty,
    u = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(m, w, v) {
    var _,
      T = {},
      M = null,
      P = null;
    (v !== void 0 && (M = "" + v),
      w.key !== void 0 && (M = "" + w.key),
      w.ref !== void 0 && (P = w.ref));
    for (_ in w) l.call(w, _) && !c.hasOwnProperty(_) && (T[_] = w[_]);
    if (m && m.defaultProps)
      for (_ in ((w = m.defaultProps), w)) T[_] === void 0 && (T[_] = w[_]);
    return {
      $$typeof: r,
      type: m,
      key: M,
      ref: P,
      props: T,
      _owner: u.current,
    };
  }
  return ((fs.Fragment = o), (fs.jsx = p), (fs.jsxs = p), fs);
}
var tm;
function cv() {
  return (tm || ((tm = 1), (mf.exports = av())), mf.exports);
}
var me = cv(),
  Te = Hs();
const Vf = xg(Te);
var yf = { exports: {} },
  un = {},
  vf = { exports: {} },
  wf = {};
var nm;
function fv() {
  return (
    nm ||
      ((nm = 1),
      (function (t) {
        function r(G, ce) {
          var de = G.length;
          G.push(ce);
          e: for (; 0 < de; ) {
            var F = (de - 1) >>> 1,
              X = G[F];
            if (0 < u(X, ce)) ((G[F] = ce), (G[de] = X), (de = F));
            else break e;
          }
        }
        function o(G) {
          return G.length === 0 ? null : G[0];
        }
        function l(G) {
          if (G.length === 0) return null;
          var ce = G[0],
            de = G.pop();
          if (de !== ce) {
            G[0] = de;
            e: for (var F = 0, X = G.length, Re = X >>> 1; F < Re; ) {
              var Le = 2 * (F + 1) - 1,
                ze = G[Le],
                Ue = Le + 1,
                Qe = G[Ue];
              if (0 > u(ze, de))
                Ue < X && 0 > u(Qe, ze)
                  ? ((G[F] = Qe), (G[Ue] = de), (F = Ue))
                  : ((G[F] = ze), (G[Le] = de), (F = Le));
              else if (Ue < X && 0 > u(Qe, de))
                ((G[F] = Qe), (G[Ue] = de), (F = Ue));
              else break e;
            }
          }
          return ce;
        }
        function u(G, ce) {
          var de = G.sortIndex - ce.sortIndex;
          return de !== 0 ? de : G.id - ce.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var c = performance;
          t.unstable_now = function () {
            return c.now();
          };
        } else {
          var p = Date,
            m = p.now();
          t.unstable_now = function () {
            return p.now() - m;
          };
        }
        var w = [],
          v = [],
          _ = 1,
          T = null,
          M = 3,
          P = !1,
          $ = !1,
          L = !1,
          z = typeof setTimeout == "function" ? setTimeout : null,
          D = typeof clearTimeout == "function" ? clearTimeout : null,
          W = typeof setImmediate != "undefined" ? setImmediate : null;
        typeof navigator != "undefined" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function H(G) {
          for (var ce = o(v); ce !== null; ) {
            if (ce.callback === null) l(v);
            else if (ce.startTime <= G)
              (l(v), (ce.sortIndex = ce.expirationTime), r(w, ce));
            else break;
            ce = o(v);
          }
        }
        function Y(G) {
          if (((L = !1), H(G), !$))
            if (o(w) !== null) (($ = !0), je(oe));
            else {
              var ce = o(v);
              ce !== null && Ne(Y, ce.startTime - G);
            }
        }
        function oe(G, ce) {
          (($ = !1), L && ((L = !1), D(_e), (_e = -1)), (P = !0));
          var de = M;
          try {
            for (
              H(ce), T = o(w);
              T !== null && (!(T.expirationTime > ce) || (G && !te()));

            ) {
              var F = T.callback;
              if (typeof F == "function") {
                ((T.callback = null), (M = T.priorityLevel));
                var X = F(T.expirationTime <= ce);
                ((ce = t.unstable_now()),
                  typeof X == "function"
                    ? (T.callback = X)
                    : T === o(w) && l(w),
                  H(ce));
              } else l(w);
              T = o(w);
            }
            if (T !== null) var Re = !0;
            else {
              var Le = o(v);
              (Le !== null && Ne(Y, Le.startTime - ce), (Re = !1));
            }
            return Re;
          } finally {
            ((T = null), (M = de), (P = !1));
          }
        }
        var fe = !1,
          ae = null,
          _e = -1,
          Ee = 5,
          xe = -1;
        function te() {
          return !(t.unstable_now() - xe < Ee);
        }
        function Se() {
          if (ae !== null) {
            var G = t.unstable_now();
            xe = G;
            var ce = !0;
            try {
              ce = ae(!0, G);
            } finally {
              ce ? ie() : ((fe = !1), (ae = null));
            }
          } else fe = !1;
        }
        var ie;
        if (typeof W == "function")
          ie = function () {
            W(Se);
          };
        else if (typeof MessageChannel != "undefined") {
          var ke = new MessageChannel(),
            Ze = ke.port2;
          ((ke.port1.onmessage = Se),
            (ie = function () {
              Ze.postMessage(null);
            }));
        } else
          ie = function () {
            z(Se, 0);
          };
        function je(G) {
          ((ae = G), fe || ((fe = !0), ie()));
        }
        function Ne(G, ce) {
          _e = z(function () {
            G(t.unstable_now());
          }, ce);
        }
        ((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (G) {
            G.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            $ || P || (($ = !0), je(oe));
          }),
          (t.unstable_forceFrameRate = function (G) {
            0 > G || 125 < G
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Ee = 0 < G ? Math.floor(1e3 / G) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return M;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return o(w);
          }),
          (t.unstable_next = function (G) {
            switch (M) {
              case 1:
              case 2:
              case 3:
                var ce = 3;
                break;
              default:
                ce = M;
            }
            var de = M;
            M = ce;
            try {
              return G();
            } finally {
              M = de;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (G, ce) {
            switch (G) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                G = 3;
            }
            var de = M;
            M = G;
            try {
              return ce();
            } finally {
              M = de;
            }
          }),
          (t.unstable_scheduleCallback = function (G, ce, de) {
            var F = t.unstable_now();
            switch (
              (typeof de == "object" && de !== null
                ? ((de = de.delay),
                  (de = typeof de == "number" && 0 < de ? F + de : F))
                : (de = F),
              G)
            ) {
              case 1:
                var X = -1;
                break;
              case 2:
                X = 250;
                break;
              case 5:
                X = 1073741823;
                break;
              case 4:
                X = 1e4;
                break;
              default:
                X = 5e3;
            }
            return (
              (X = de + X),
              (G = {
                id: _++,
                callback: ce,
                priorityLevel: G,
                startTime: de,
                expirationTime: X,
                sortIndex: -1,
              }),
              de > F
                ? ((G.sortIndex = de),
                  r(v, G),
                  o(w) === null &&
                    G === o(v) &&
                    (L ? (D(_e), (_e = -1)) : (L = !0), Ne(Y, de - F)))
                : ((G.sortIndex = X), r(w, G), $ || P || (($ = !0), je(oe))),
              G
            );
          }),
          (t.unstable_shouldYield = te),
          (t.unstable_wrapCallback = function (G) {
            var ce = M;
            return function () {
              var de = M;
              M = ce;
              try {
                return G.apply(this, arguments);
              } finally {
                M = de;
              }
            };
          }));
      })(wf)),
    wf
  );
}
var rm;
function dv() {
  return (rm || ((rm = 1), (vf.exports = fv())), vf.exports);
}
var om;
function hv() {
  if (om) return un;
  om = 1;
  var t = Hs(),
    r = dv();
  function o(e) {
    for (
      var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        i = 1;
      i < arguments.length;
      i++
    )
      n += "&args[]=" + encodeURIComponent(arguments[i]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var l = new Set(),
    u = {};
  function c(e, n) {
    (p(e, n), p(e + "Capture", n));
  }
  function p(e, n) {
    for (u[e] = n, e = 0; e < n.length; e++) l.add(n[e]);
  }
  var m = !(
      typeof window == "undefined" ||
      typeof window.document == "undefined" ||
      typeof window.document.createElement == "undefined"
    ),
    w = Object.prototype.hasOwnProperty,
    v =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    _ = {},
    T = {};
  function M(e) {
    return w.call(T, e)
      ? !0
      : w.call(_, e)
        ? !1
        : v.test(e)
          ? (T[e] = !0)
          : ((_[e] = !0), !1);
  }
  function P(e, n, i, s) {
    if (i !== null && i.type === 0) return !1;
    switch (typeof n) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return s
          ? !1
          : i !== null
            ? !i.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function $(e, n, i, s) {
    if (n === null || typeof n == "undefined" || P(e, n, i, s)) return !0;
    if (s) return !1;
    if (i !== null)
      switch (i.type) {
        case 3:
          return !n;
        case 4:
          return n === !1;
        case 5:
          return isNaN(n);
        case 6:
          return isNaN(n) || 1 > n;
      }
    return !1;
  }
  function L(e, n, i, s, a, h, x) {
    ((this.acceptsBooleans = n === 2 || n === 3 || n === 4),
      (this.attributeName = s),
      (this.attributeNamespace = a),
      (this.mustUseProperty = i),
      (this.propertyName = e),
      (this.type = n),
      (this.sanitizeURL = h),
      (this.removeEmptyString = x));
  }
  var z = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      z[e] = new L(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var n = e[0];
      z[n] = new L(n, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        z[e] = new L(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      z[e] = new L(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        z[e] = new L(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      z[e] = new L(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      z[e] = new L(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      z[e] = new L(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      z[e] = new L(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var D = /[\-:]([a-z])/g;
  function W(e) {
    return e[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var n = e.replace(D, W);
      z[n] = new L(n, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var n = e.replace(D, W);
        z[n] = new L(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var n = e.replace(D, W);
      z[n] = new L(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      z[e] = new L(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (z.xlinkHref = new L(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      z[e] = new L(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function H(e, n, i, s) {
    var a = z.hasOwnProperty(n) ? z[n] : null;
    (a !== null
      ? a.type !== 0
      : s ||
        !(2 < n.length) ||
        (n[0] !== "o" && n[0] !== "O") ||
        (n[1] !== "n" && n[1] !== "N")) &&
      ($(n, i, a, s) && (i = null),
      s || a === null
        ? M(n) &&
          (i === null ? e.removeAttribute(n) : e.setAttribute(n, "" + i))
        : a.mustUseProperty
          ? (e[a.propertyName] = i === null ? (a.type === 3 ? !1 : "") : i)
          : ((n = a.attributeName),
            (s = a.attributeNamespace),
            i === null
              ? e.removeAttribute(n)
              : ((a = a.type),
                (i = a === 3 || (a === 4 && i === !0) ? "" : "" + i),
                s ? e.setAttributeNS(s, n, i) : e.setAttribute(n, i))));
  }
  var Y = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    oe = Symbol.for("react.element"),
    fe = Symbol.for("react.portal"),
    ae = Symbol.for("react.fragment"),
    _e = Symbol.for("react.strict_mode"),
    Ee = Symbol.for("react.profiler"),
    xe = Symbol.for("react.provider"),
    te = Symbol.for("react.context"),
    Se = Symbol.for("react.forward_ref"),
    ie = Symbol.for("react.suspense"),
    ke = Symbol.for("react.suspense_list"),
    Ze = Symbol.for("react.memo"),
    je = Symbol.for("react.lazy"),
    Ne = Symbol.for("react.offscreen"),
    G = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (G && e[G]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var de = Object.assign,
    F;
  function X(e) {
    if (F === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        F = (n && n[1]) || "";
      }
    return (
      `
` +
      F +
      e
    );
  }
  var Re = !1;
  function Le(e, n) {
    if (!e || Re) return "";
    Re = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (n)
        if (
          ((n = function () {
            throw Error();
          }),
          Object.defineProperty(n.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(n, []);
          } catch (V) {
            var s = V;
          }
          Reflect.construct(e, [], n);
        } else {
          try {
            n.call();
          } catch (V) {
            s = V;
          }
          e.call(n.prototype);
        }
      else {
        try {
          throw Error();
        } catch (V) {
          s = V;
        }
        e();
      }
    } catch (V) {
      if (V && s && typeof V.stack == "string") {
        for (
          var a = V.stack.split(`
`),
            h = s.stack.split(`
`),
            x = a.length - 1,
            N = h.length - 1;
          1 <= x && 0 <= N && a[x] !== h[N];

        )
          N--;
        for (; 1 <= x && 0 <= N; x--, N--)
          if (a[x] !== h[N]) {
            if (x !== 1 || N !== 1)
              do
                if ((x--, N--, 0 > N || a[x] !== h[N])) {
                  var R =
                    `
` + a[x].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      R.includes("<anonymous>") &&
                      (R = R.replace("<anonymous>", e.displayName)),
                    R
                  );
                }
              while (1 <= x && 0 <= N);
            break;
          }
      }
    } finally {
      ((Re = !1), (Error.prepareStackTrace = i));
    }
    return (e = e ? e.displayName || e.name : "") ? X(e) : "";
  }
  function ze(e) {
    switch (e.tag) {
      case 5:
        return X(e.type);
      case 16:
        return X("Lazy");
      case 13:
        return X("Suspense");
      case 19:
        return X("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = Le(e.type, !1)), e);
      case 11:
        return ((e = Le(e.type.render, !1)), e);
      case 1:
        return ((e = Le(e.type, !0)), e);
      default:
        return "";
    }
  }
  function Ue(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ae:
        return "Fragment";
      case fe:
        return "Portal";
      case Ee:
        return "Profiler";
      case _e:
        return "StrictMode";
      case ie:
        return "Suspense";
      case ke:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case te:
          return (e.displayName || "Context") + ".Consumer";
        case xe:
          return (e._context.displayName || "Context") + ".Provider";
        case Se:
          var n = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = n.displayName || n.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Ze:
          return (
            (n = e.displayName || null),
            n !== null ? n : Ue(e.type) || "Memo"
          );
        case je:
          ((n = e._payload), (e = e._init));
          try {
            return Ue(e(n));
          } catch (i) {}
      }
    return null;
  }
  function Qe(e) {
    var n = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (n.displayName || "Context") + ".Consumer";
      case 10:
        return (n._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = n.render),
          (e = e.displayName || e.name || ""),
          n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return n;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Ue(n);
      case 8:
        return n === _e ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof n == "function") return n.displayName || n.name || null;
        if (typeof n == "string") return n;
    }
    return null;
  }
  function Ve(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function K(e) {
    var n = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function ve(e) {
    var n = K(e) ? "checked" : "value",
      i = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
      s = "" + e[n];
    if (
      !e.hasOwnProperty(n) &&
      typeof i != "undefined" &&
      typeof i.get == "function" &&
      typeof i.set == "function"
    ) {
      var a = i.get,
        h = i.set;
      return (
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function () {
            return a.call(this);
          },
          set: function (x) {
            ((s = "" + x), h.call(this, x));
          },
        }),
        Object.defineProperty(e, n, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return s;
          },
          setValue: function (x) {
            s = "" + x;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[n]);
          },
        }
      );
    }
  }
  function $e(e) {
    e._valueTracker || (e._valueTracker = ve(e));
  }
  function ee(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var i = n.getValue(),
      s = "";
    return (
      e && (s = K(e) ? (e.checked ? "true" : "false") : e.value),
      (e = s),
      e !== i ? (n.setValue(e), !0) : !1
    );
  }
  function Ye(e) {
    if (
      ((e = e || (typeof document != "undefined" ? document : void 0)),
      typeof e == "undefined")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch (n) {
      return e.body;
    }
  }
  function He(e, n) {
    var i = n.checked;
    return de({}, n, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: i != null ? i : e._wrapperState.initialChecked,
    });
  }
  function gt(e, n) {
    var i = n.defaultValue == null ? "" : n.defaultValue,
      s = n.checked != null ? n.checked : n.defaultChecked;
    ((i = Ve(n.value != null ? n.value : i)),
      (e._wrapperState = {
        initialChecked: s,
        initialValue: i,
        controlled:
          n.type === "checkbox" || n.type === "radio"
            ? n.checked != null
            : n.value != null,
      }));
  }
  function dt(e, n) {
    ((n = n.checked), n != null && H(e, "checked", n, !1));
  }
  function Vt(e, n) {
    dt(e, n);
    var i = Ve(n.value),
      s = n.type;
    if (i != null)
      s === "number"
        ? ((i === 0 && e.value === "") || e.value != i) && (e.value = "" + i)
        : e.value !== "" + i && (e.value = "" + i);
    else if (s === "submit" || s === "reset") {
      e.removeAttribute("value");
      return;
    }
    (n.hasOwnProperty("value")
      ? Un(e, n.type, i)
      : n.hasOwnProperty("defaultValue") && Un(e, n.type, Ve(n.defaultValue)),
      n.checked == null &&
        n.defaultChecked != null &&
        (e.defaultChecked = !!n.defaultChecked));
  }
  function Nn(e, n, i) {
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
      var s = n.type;
      if (
        !(
          (s !== "submit" && s !== "reset") ||
          (n.value !== void 0 && n.value !== null)
        )
      )
        return;
      ((n = "" + e._wrapperState.initialValue),
        i || n === e.value || (e.value = n),
        (e.defaultValue = n));
    }
    ((i = e.name),
      i !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      i !== "" && (e.name = i));
  }
  function Un(e, n, i) {
    (n !== "number" || Ye(e.ownerDocument) !== e) &&
      (i == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + i && (e.defaultValue = "" + i));
  }
  var Tn = Array.isArray;
  function bn(e, n, i, s) {
    if (((e = e.options), n)) {
      n = {};
      for (var a = 0; a < i.length; a++) n["$" + i[a]] = !0;
      for (i = 0; i < e.length; i++)
        ((a = n.hasOwnProperty("$" + e[i].value)),
          e[i].selected !== a && (e[i].selected = a),
          a && s && (e[i].defaultSelected = !0));
    } else {
      for (i = "" + Ve(i), n = null, a = 0; a < e.length; a++) {
        if (e[a].value === i) {
          ((e[a].selected = !0), s && (e[a].defaultSelected = !0));
          return;
        }
        n !== null || e[a].disabled || (n = e[a]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function qt(e, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(o(91));
    return de({}, n, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function _t(e, n) {
    var i = n.value;
    if (i == null) {
      if (((i = n.children), (n = n.defaultValue), i != null)) {
        if (n != null) throw Error(o(92));
        if (Tn(i)) {
          if (1 < i.length) throw Error(o(93));
          i = i[0];
        }
        n = i;
      }
      (n == null && (n = ""), (i = n));
    }
    e._wrapperState = { initialValue: Ve(i) };
  }
  function Do(e, n) {
    var i = Ve(n.value),
      s = Ve(n.defaultValue);
    (i != null &&
      ((i = "" + i),
      i !== e.value && (e.value = i),
      n.defaultValue == null && e.defaultValue !== i && (e.defaultValue = i)),
      s != null && (e.defaultValue = "" + s));
  }
  function Oo(e) {
    var n = e.textContent;
    n === e._wrapperState.initialValue &&
      n !== "" &&
      n !== null &&
      (e.value = n);
  }
  function jo(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function io(e, n) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? jo(n)
      : e === "http://www.w3.org/2000/svg" && n === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Bn,
    Ao = (function (e) {
      return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction
        ? function (n, i, s, a) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(n, i, s, a);
            });
          }
        : e;
    })(function (e, n) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = n;
      else {
        for (
          Bn = Bn || document.createElement("div"),
            Bn.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>",
            n = Bn.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; n.firstChild; ) e.appendChild(n.firstChild);
      }
    });
  function sr(e, n) {
    if (n) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Lr = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Uo = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Lr).forEach(function (e) {
    Uo.forEach(function (n) {
      ((n = n + e.charAt(0).toUpperCase() + e.substring(1)), (Lr[n] = Lr[e]));
    });
  });
  function zr(e, n, i) {
    return n == null || typeof n == "boolean" || n === ""
      ? ""
      : i || typeof n != "number" || n === 0 || (Lr.hasOwnProperty(e) && Lr[e])
        ? ("" + n).trim()
        : n + "px";
  }
  function Ii(e, n) {
    e = e.style;
    for (var i in n)
      if (n.hasOwnProperty(i)) {
        var s = i.indexOf("--") === 0,
          a = zr(i, n[i], s);
        (i === "float" && (i = "cssFloat"),
          s ? e.setProperty(i, a) : (e[i] = a));
      }
  }
  var Fl = de(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function bo(e, n) {
    if (n) {
      if (Fl[e] && (n.children != null || n.dangerouslySetInnerHTML != null))
        throw Error(o(137, e));
      if (n.dangerouslySetInnerHTML != null) {
        if (n.children != null) throw Error(o(60));
        if (
          typeof n.dangerouslySetInnerHTML != "object" ||
          !("__html" in n.dangerouslySetInnerHTML)
        )
          throw Error(o(61));
      }
      if (n.style != null && typeof n.style != "object") throw Error(o(62));
    }
  }
  function Bo(e, n) {
    if (e.indexOf("-") === -1) return typeof n.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Vo = null;
  function Ft(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Dr = null,
    pn = null,
    qe = null;
  function ur(e) {
    if ((e = Kl(e))) {
      if (typeof Dr != "function") throw Error(o(280));
      var n = e.stateNode;
      n && ((n = hu(n)), Dr(e.stateNode, e.type, n));
    }
  }
  function Or(e) {
    pn ? (qe ? qe.push(e) : (qe = [e])) : (pn = e);
  }
  function ar() {
    if (pn) {
      var e = pn,
        n = qe;
      if (((qe = pn = null), ur(e), n)) for (e = 0; e < n.length; e++) ur(n[e]);
    }
  }
  function mn(e, n) {
    return e(n);
  }
  function jr() {}
  var gn = !1;
  function Ho(e, n, i) {
    if (gn) return e(n, i);
    gn = !0;
    try {
      return mn(e, n, i);
    } finally {
      ((gn = !1), (pn !== null || qe !== null) && (jr(), ar()));
    }
  }
  function Vn(e, n) {
    var i = e.stateNode;
    if (i === null) return null;
    var s = hu(i);
    if (s === null) return null;
    i = s[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((s = !s.disabled) ||
          ((e = e.type),
          (s = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !s));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function") throw Error(o(231, n, typeof i));
    return i;
  }
  var Ar = !1;
  if (m)
    try {
      var cr = {};
      (Object.defineProperty(cr, "passive", {
        get: function () {
          Ar = !0;
        },
      }),
        window.addEventListener("test", cr, cr),
        window.removeEventListener("test", cr, cr));
    } catch (e) {
      Ar = !1;
    }
  function Fi(e, n, i, s, a, h, x, N, R) {
    var V = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(i, V);
    } catch (J) {
      this.onError(J);
    }
  }
  var fr = !1,
    lo = null,
    so = !1,
    dr = null,
    Li = {
      onError: function (e) {
        ((fr = !0), (lo = e));
      },
    };
  function uo(e, n, i, s, a, h, x, N, R) {
    ((fr = !1), (lo = null), Fi.apply(Li, arguments));
  }
  function Wo(e, n, i, s, a, h, x, N, R) {
    if ((uo.apply(this, arguments), fr)) {
      if (fr) {
        var V = lo;
        ((fr = !1), (lo = null));
      } else throw Error(o(198));
      so || ((so = !0), (dr = V));
    }
  }
  function Hn(e) {
    var n = e,
      i = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do ((n = e), (n.flags & 4098) !== 0 && (i = n.return), (e = n.return));
      while (e);
    }
    return n.tag === 3 ? i : null;
  }
  function hr(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (
        (n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function zi(e) {
    if (Hn(e) !== e) throw Error(o(188));
  }
  function Qo(e) {
    var n = e.alternate;
    if (!n) {
      if (((n = Hn(e)), n === null)) throw Error(o(188));
      return n !== e ? null : e;
    }
    for (var i = e, s = n; ; ) {
      var a = i.return;
      if (a === null) break;
      var h = a.alternate;
      if (h === null) {
        if (((s = a.return), s !== null)) {
          i = s;
          continue;
        }
        break;
      }
      if (a.child === h.child) {
        for (h = a.child; h; ) {
          if (h === i) return (zi(a), e);
          if (h === s) return (zi(a), n);
          h = h.sibling;
        }
        throw Error(o(188));
      }
      if (i.return !== s.return) ((i = a), (s = h));
      else {
        for (var x = !1, N = a.child; N; ) {
          if (N === i) {
            ((x = !0), (i = a), (s = h));
            break;
          }
          if (N === s) {
            ((x = !0), (s = a), (i = h));
            break;
          }
          N = N.sibling;
        }
        if (!x) {
          for (N = h.child; N; ) {
            if (N === i) {
              ((x = !0), (i = h), (s = a));
              break;
            }
            if (N === s) {
              ((x = !0), (s = h), (i = a));
              break;
            }
            N = N.sibling;
          }
          if (!x) throw Error(o(189));
        }
      }
      if (i.alternate !== s) throw Error(o(190));
    }
    if (i.tag !== 3) throw Error(o(188));
    return i.stateNode.current === i ? e : n;
  }
  function Ur(e) {
    return ((e = Qo(e)), e !== null ? pr(e) : null);
  }
  function pr(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var n = pr(e);
      if (n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var br = r.unstable_scheduleCallback,
    Yo = r.unstable_cancelCallback,
    Di = r.unstable_shouldYield,
    Oi = r.unstable_requestPaint,
    ot = r.unstable_now,
    Mt = r.unstable_getCurrentPriorityLevel,
    ao = r.unstable_ImmediatePriority,
    co = r.unstable_UserBlockingPriority,
    mr = r.unstable_NormalPriority,
    ji = r.unstable_LowPriority,
    Wn = r.unstable_IdlePriority,
    yn = null,
    Ht = null;
  function Br(e) {
    if (Ht && typeof Ht.onCommitFiberRoot == "function")
      try {
        Ht.onCommitFiberRoot(yn, e, void 0, (e.current.flags & 128) === 128);
      } catch (n) {}
  }
  var wt = Math.clz32 ? Math.clz32 : Ko,
    qo = Math.log,
    Xo = Math.LN2;
  function Ko(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((qo(e) / Xo) | 0)) | 0);
  }
  var Qn = 64,
    Vr = 4194304;
  function gr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function yr(e, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var s = 0,
      a = e.suspendedLanes,
      h = e.pingedLanes,
      x = i & 268435455;
    if (x !== 0) {
      var N = x & ~a;
      N !== 0 ? (s = gr(N)) : ((h &= x), h !== 0 && (s = gr(h)));
    } else ((x = i & ~a), x !== 0 ? (s = gr(x)) : h !== 0 && (s = gr(h)));
    if (s === 0) return 0;
    if (
      n !== 0 &&
      n !== s &&
      (n & a) === 0 &&
      ((a = s & -s), (h = n & -n), a >= h || (a === 16 && (h & 4194240) !== 0))
    )
      return n;
    if (((s & 4) !== 0 && (s |= i & 16), (n = e.entangledLanes), n !== 0))
      for (e = e.entanglements, n &= s; 0 < n; )
        ((i = 31 - wt(n)), (a = 1 << i), (s |= e[i]), (n &= ~a));
    return s;
  }
  function f(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return n + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function y(e, n) {
    for (
      var i = e.suspendedLanes,
        s = e.pingedLanes,
        a = e.expirationTimes,
        h = e.pendingLanes;
      0 < h;

    ) {
      var x = 31 - wt(h),
        N = 1 << x,
        R = a[x];
      (R === -1
        ? ((N & i) === 0 || (N & s) !== 0) && (a[x] = f(N, n))
        : R <= n && (e.expiredLanes |= N),
        (h &= ~N));
    }
  }
  function k(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function E() {
    var e = Qn;
    return ((Qn <<= 1), (Qn & 4194240) === 0 && (Qn = 64), e);
  }
  function U(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e);
    return n;
  }
  function O(e, n, i) {
    ((e.pendingLanes |= n),
      n !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (n = 31 - wt(n)),
      (e[n] = i));
  }
  function Q(e, n) {
    var i = e.pendingLanes & ~n;
    ((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= n),
      (e.mutableReadLanes &= n),
      (e.entangledLanes &= n),
      (n = e.entanglements));
    var s = e.eventTimes;
    for (e = e.expirationTimes; 0 < i; ) {
      var a = 31 - wt(i),
        h = 1 << a;
      ((n[a] = 0), (s[a] = -1), (e[a] = -1), (i &= ~h));
    }
  }
  function se(e, n) {
    var i = (e.entangledLanes |= n);
    for (e = e.entanglements; i; ) {
      var s = 31 - wt(i),
        a = 1 << s;
      ((a & n) | (e[s] & n) && (e[s] |= n), (i &= ~a));
    }
  }
  var he = 0;
  function Fe(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var Ae,
    tt,
    Xt,
    Kt,
    Lt,
    Yn = !1,
    Zt = [],
    Gt = null,
    zt = null,
    vn = null,
    Jt = new Map(),
    vr = new Map(),
    wr = [],
    Qa =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function Gs(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Gt = null;
        break;
      case "dragenter":
      case "dragleave":
        zt = null;
        break;
      case "mouseover":
      case "mouseout":
        vn = null;
        break;
      case "pointerover":
      case "pointerout":
        Jt.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vr.delete(n.pointerId);
    }
  }
  function Zo(e, n, i, s, a, h) {
    return e === null || e.nativeEvent !== h
      ? ((e = {
          blockedOn: n,
          domEventName: i,
          eventSystemFlags: s,
          nativeEvent: h,
          targetContainers: [a],
        }),
        n !== null && ((n = Kl(n)), n !== null && tt(n)),
        e)
      : ((e.eventSystemFlags |= s),
        (n = e.targetContainers),
        a !== null && n.indexOf(a) === -1 && n.push(a),
        e);
  }
  function Ya(e, n, i, s, a) {
    switch (n) {
      case "focusin":
        return ((Gt = Zo(Gt, e, n, i, s, a)), !0);
      case "dragenter":
        return ((zt = Zo(zt, e, n, i, s, a)), !0);
      case "mouseover":
        return ((vn = Zo(vn, e, n, i, s, a)), !0);
      case "pointerover":
        var h = a.pointerId;
        return (Jt.set(h, Zo(Jt.get(h) || null, e, n, i, s, a)), !0);
      case "gotpointercapture":
        return (
          (h = a.pointerId),
          vr.set(h, Zo(vr.get(h) || null, e, n, i, s, a)),
          !0
        );
    }
    return !1;
  }
  function Mn(e) {
    var n = ii(e.target);
    if (n !== null) {
      var i = Hn(n);
      if (i !== null) {
        if (((n = i.tag), n === 13)) {
          if (((n = hr(i)), n !== null)) {
            ((e.blockedOn = n),
              Lt(e.priority, function () {
                Xt(i);
              }));
            return;
          }
        } else if (n === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function fo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var i = Jo(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var s = new i.constructor(i.type, i);
        ((Vo = s), i.target.dispatchEvent(s), (Vo = null));
      } else return ((n = Kl(i)), n !== null && tt(n), (e.blockedOn = i), !1);
      n.shift();
    }
    return !0;
  }
  function Go(e, n, i) {
    fo(e) && i.delete(n);
  }
  function nt() {
    ((Yn = !1),
      Gt !== null && fo(Gt) && (Gt = null),
      zt !== null && fo(zt) && (zt = null),
      vn !== null && fo(vn) && (vn = null),
      Jt.forEach(Go),
      vr.forEach(Go));
  }
  function qn(e, n) {
    e.blockedOn === n &&
      ((e.blockedOn = null),
      Yn ||
        ((Yn = !0),
        r.unstable_scheduleCallback(r.unstable_NormalPriority, nt)));
  }
  function xr(e) {
    function n(a) {
      return qn(a, e);
    }
    if (0 < Zt.length) {
      qn(Zt[0], e);
      for (var i = 1; i < Zt.length; i++) {
        var s = Zt[i];
        s.blockedOn === e && (s.blockedOn = null);
      }
    }
    for (
      Gt !== null && qn(Gt, e),
        zt !== null && qn(zt, e),
        vn !== null && qn(vn, e),
        Jt.forEach(n),
        vr.forEach(n),
        i = 0;
      i < wr.length;
      i++
    )
      ((s = wr[i]), s.blockedOn === e && (s.blockedOn = null));
    for (; 0 < wr.length && ((i = wr[0]), i.blockedOn === null); )
      (Mn(i), i.blockedOn === null && wr.shift());
  }
  var Pn = Y.ReactCurrentBatchConfig,
    wn = !0;
  function Ai(e, n, i, s) {
    var a = he,
      h = Pn.transition;
    Pn.transition = null;
    try {
      ((he = 1), Ui(e, n, i, s));
    } finally {
      ((he = a), (Pn.transition = h));
    }
  }
  function Hr(e, n, i, s) {
    var a = he,
      h = Pn.transition;
    Pn.transition = null;
    try {
      ((he = 4), Ui(e, n, i, s));
    } finally {
      ((he = a), (Pn.transition = h));
    }
  }
  function Ui(e, n, i, s) {
    if (wn) {
      var a = Jo(e, n, i, s);
      if (a === null) (oc(e, n, s, ho, i), Gs(e, s));
      else if (Ya(a, e, n, i, s)) s.stopPropagation();
      else if ((Gs(e, s), n & 4 && -1 < Qa.indexOf(e))) {
        for (; a !== null; ) {
          var h = Kl(a);
          if (
            (h !== null && Ae(h),
            (h = Jo(e, n, i, s)),
            h === null && oc(e, n, s, ho, i),
            h === a)
          )
            break;
          a = h;
        }
        a !== null && s.stopPropagation();
      } else oc(e, n, s, null, i);
    }
  }
  var ho = null;
  function Jo(e, n, i, s) {
    if (((ho = null), (e = Ft(s)), (e = ii(e)), e !== null))
      if (((n = Hn(e)), n === null)) e = null;
      else if (((i = n.tag), i === 13)) {
        if (((e = hr(n)), e !== null)) return e;
        e = null;
      } else if (i === 3) {
        if (n.stateNode.current.memoizedState.isDehydrated)
          return n.tag === 3 ? n.stateNode.containerInfo : null;
        e = null;
      } else n !== e && (e = null);
    return ((ho = e), null);
  }
  function Ll(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Mt()) {
          case ao:
            return 1;
          case co:
            return 4;
          case mr:
          case ji:
            return 16;
          case Wn:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Xn = null,
    bi = null,
    Bi = null;
  function Js() {
    if (Bi) return Bi;
    var e,
      n = bi,
      i = n.length,
      s,
      a = "value" in Xn ? Xn.value : Xn.textContent,
      h = a.length;
    for (e = 0; e < i && n[e] === a[e]; e++);
    var x = i - e;
    for (s = 1; s <= x && n[i - s] === a[h - s]; s++);
    return (Bi = a.slice(e, 1 < s ? 1 - s : void 0));
  }
  function Wr(e) {
    var n = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && n === 13 && (e = 13))
        : (e = n),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ei() {
    return !0;
  }
  function ti() {
    return !1;
  }
  function Pt(e) {
    function n(i, s, a, h, x) {
      ((this._reactName = i),
        (this._targetInst = a),
        (this.type = s),
        (this.nativeEvent = h),
        (this.target = x),
        (this.currentTarget = null));
      for (var N in e)
        e.hasOwnProperty(N) && ((i = e[N]), (this[N] = i ? i(h) : h[N]));
      return (
        (this.isDefaultPrevented = (
          h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1
        )
          ? ei
          : ti),
        (this.isPropagationStopped = ti),
        this
      );
    }
    return (
      de(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var i = this.nativeEvent;
          i &&
            (i.preventDefault
              ? i.preventDefault()
              : typeof i.returnValue != "unknown" && (i.returnValue = !1),
            (this.isDefaultPrevented = ei));
        },
        stopPropagation: function () {
          var i = this.nativeEvent;
          i &&
            (i.stopPropagation
              ? i.stopPropagation()
              : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0),
            (this.isPropagationStopped = ei));
        },
        persist: function () {},
        isPersistent: ei,
      }),
      n
    );
  }
  var po = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Qr = Pt(po),
    ni = de({}, po, { view: 0, detail: 0 }),
    zl = Pt(ni),
    mo,
    Yr,
    Sr,
    ri = de({}, ni, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Yi,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Sr &&
              (Sr && e.type === "mousemove"
                ? ((mo = e.screenX - Sr.screenX), (Yr = e.screenY - Sr.screenY))
                : (Yr = mo = 0),
              (Sr = e)),
            mo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Yr;
      },
    }),
    Dl = Pt(ri),
    eu = de({}, ri, { dataTransfer: 0 }),
    Ol = Pt(eu),
    Wt = de({}, ni, { relatedTarget: 0 }),
    Vi = Pt(Wt),
    jl = de({}, po, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    qa = Pt(jl),
    tu = de({}, po, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Hi = Pt(tu),
    nu = de({}, po, { data: 0 }),
    Al = Pt(nu),
    Wi = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Qi = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    ru = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function ou(e) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(e)
      : (e = ru[e])
        ? !!n[e]
        : !1;
  }
  function Yi() {
    return ou;
  }
  var Ul = de({}, ni, {
      key: function (e) {
        if (e.key) {
          var n = Wi[e.key] || e.key;
          if (n !== "Unidentified") return n;
        }
        return e.type === "keypress"
          ? ((e = Wr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Qi[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Yi,
      charCode: function (e) {
        return e.type === "keypress" ? Wr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Wr(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    iu = Pt(Ul),
    d = de({}, ri, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    g = Pt(d),
    S = de({}, ni, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Yi,
    }),
    C = Pt(S),
    B = de({}, po, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    A = Pt(B),
    q = de({}, ri, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    re = Pt(q),
    Ie = [9, 13, 27, 32],
    be = m && "CompositionEvent" in window,
    De = null;
  m && "documentMode" in document && (De = document.documentMode);
  var it = m && "TextEvent" in window && !De,
    Dt = m && (!be || (De && 8 < De && 11 >= De)),
    en = " ",
    tn = !1;
  function oi(e, n) {
    switch (e) {
      case "keyup":
        return Ie.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function bl(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var kr = !1;
  function ry(e, n) {
    switch (e) {
      case "compositionend":
        return bl(n);
      case "keypress":
        return n.which !== 32 ? null : ((tn = !0), en);
      case "textInput":
        return ((e = n.data), e === en && tn ? null : e);
      default:
        return null;
    }
  }
  function oy(e, n) {
    if (kr)
      return e === "compositionend" || (!be && oi(e, n))
        ? ((e = Js()), (Bi = bi = Xn = null), (kr = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Dt && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var iy = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Xd(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!iy[e.type] : n === "textarea";
  }
  function Kd(e, n, i, s) {
    (Or(s),
      (n = cu(n, "onChange")),
      0 < n.length &&
        ((i = new Qr("onChange", "change", null, i, s)),
        e.push({ event: i, listeners: n })));
  }
  var Bl = null,
    Vl = null;
  function ly(e) {
    ph(e, 0);
  }
  function lu(e) {
    var n = Gi(e);
    if (ee(n)) return e;
  }
  function sy(e, n) {
    if (e === "change") return n;
  }
  var Zd = !1;
  if (m) {
    var Xa;
    if (m) {
      var Ka = "oninput" in document;
      if (!Ka) {
        var Gd = document.createElement("div");
        (Gd.setAttribute("oninput", "return;"),
          (Ka = typeof Gd.oninput == "function"));
      }
      Xa = Ka;
    } else Xa = !1;
    Zd = Xa && (!document.documentMode || 9 < document.documentMode);
  }
  function Jd() {
    Bl && (Bl.detachEvent("onpropertychange", eh), (Vl = Bl = null));
  }
  function eh(e) {
    if (e.propertyName === "value" && lu(Vl)) {
      var n = [];
      (Kd(n, Vl, e, Ft(e)), Ho(ly, n));
    }
  }
  function uy(e, n, i) {
    e === "focusin"
      ? (Jd(), (Bl = n), (Vl = i), Bl.attachEvent("onpropertychange", eh))
      : e === "focusout" && Jd();
  }
  function ay(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return lu(Vl);
  }
  function cy(e, n) {
    if (e === "click") return lu(n);
  }
  function fy(e, n) {
    if (e === "input" || e === "change") return lu(n);
  }
  function dy(e, n) {
    return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n);
  }
  var Kn = typeof Object.is == "function" ? Object.is : dy;
  function Hl(e, n) {
    if (Kn(e, n)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof n != "object" ||
      n === null
    )
      return !1;
    var i = Object.keys(e),
      s = Object.keys(n);
    if (i.length !== s.length) return !1;
    for (s = 0; s < i.length; s++) {
      var a = i[s];
      if (!w.call(n, a) || !Kn(e[a], n[a])) return !1;
    }
    return !0;
  }
  function th(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function nh(e, n) {
    var i = th(e);
    e = 0;
    for (var s; i; ) {
      if (i.nodeType === 3) {
        if (((s = e + i.textContent.length), e <= n && s >= n))
          return { node: i, offset: n - e };
        e = s;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = th(i);
    }
  }
  function rh(e, n) {
    return e && n
      ? e === n
        ? !0
        : e && e.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? rh(e, n.parentNode)
            : "contains" in e
              ? e.contains(n)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function oh() {
    for (var e = window, n = Ye(); n instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch (s) {
        i = !1;
      }
      if (i) e = n.contentWindow;
      else break;
      n = Ye(e.document);
    }
    return n;
  }
  function Za(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        n === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function hy(e) {
    var n = oh(),
      i = e.focusedElem,
      s = e.selectionRange;
    if (
      n !== i &&
      i &&
      i.ownerDocument &&
      rh(i.ownerDocument.documentElement, i)
    ) {
      if (s !== null && Za(i)) {
        if (
          ((n = s.start),
          (e = s.end),
          e === void 0 && (e = n),
          "selectionStart" in i)
        )
          ((i.selectionStart = n),
            (i.selectionEnd = Math.min(e, i.value.length)));
        else if (
          ((e = ((n = i.ownerDocument || document) && n.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var a = i.textContent.length,
            h = Math.min(s.start, a);
          ((s = s.end === void 0 ? h : Math.min(s.end, a)),
            !e.extend && h > s && ((a = s), (s = h), (h = a)),
            (a = nh(i, h)));
          var x = nh(i, s);
          a &&
            x &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== a.node ||
              e.anchorOffset !== a.offset ||
              e.focusNode !== x.node ||
              e.focusOffset !== x.offset) &&
            ((n = n.createRange()),
            n.setStart(a.node, a.offset),
            e.removeAllRanges(),
            h > s
              ? (e.addRange(n), e.extend(x.node, x.offset))
              : (n.setEnd(x.node, x.offset), e.addRange(n)));
        }
      }
      for (n = [], e = i; (e = e.parentNode); )
        e.nodeType === 1 &&
          n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof i.focus == "function" && i.focus(), i = 0; i < n.length; i++)
        ((e = n[i]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top));
    }
  }
  var py = m && "documentMode" in document && 11 >= document.documentMode,
    qi = null,
    Ga = null,
    Wl = null,
    Ja = !1;
  function ih(e, n, i) {
    var s =
      i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Ja ||
      qi == null ||
      qi !== Ye(s) ||
      ((s = qi),
      "selectionStart" in s && Za(s)
        ? (s = { start: s.selectionStart, end: s.selectionEnd })
        : ((s = (
            (s.ownerDocument && s.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (s = {
            anchorNode: s.anchorNode,
            anchorOffset: s.anchorOffset,
            focusNode: s.focusNode,
            focusOffset: s.focusOffset,
          })),
      (Wl && Hl(Wl, s)) ||
        ((Wl = s),
        (s = cu(Ga, "onSelect")),
        0 < s.length &&
          ((n = new Qr("onSelect", "select", null, n, i)),
          e.push({ event: n, listeners: s }),
          (n.target = qi))));
  }
  function su(e, n) {
    var i = {};
    return (
      (i[e.toLowerCase()] = n.toLowerCase()),
      (i["Webkit" + e] = "webkit" + n),
      (i["Moz" + e] = "moz" + n),
      i
    );
  }
  var Xi = {
      animationend: su("Animation", "AnimationEnd"),
      animationiteration: su("Animation", "AnimationIteration"),
      animationstart: su("Animation", "AnimationStart"),
      transitionend: su("Transition", "TransitionEnd"),
    },
    ec = {},
    lh = {};
  m &&
    ((lh = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Xi.animationend.animation,
      delete Xi.animationiteration.animation,
      delete Xi.animationstart.animation),
    "TransitionEvent" in window || delete Xi.transitionend.transition);
  function uu(e) {
    if (ec[e]) return ec[e];
    if (!Xi[e]) return e;
    var n = Xi[e],
      i;
    for (i in n) if (n.hasOwnProperty(i) && i in lh) return (ec[e] = n[i]);
    return e;
  }
  var sh = uu("animationend"),
    uh = uu("animationiteration"),
    ah = uu("animationstart"),
    ch = uu("transitionend"),
    fh = new Map(),
    dh =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function go(e, n) {
    (fh.set(e, n), c(n, [e]));
  }
  for (var tc = 0; tc < dh.length; tc++) {
    var nc = dh[tc],
      my = nc.toLowerCase(),
      gy = nc[0].toUpperCase() + nc.slice(1);
    go(my, "on" + gy);
  }
  (go(sh, "onAnimationEnd"),
    go(uh, "onAnimationIteration"),
    go(ah, "onAnimationStart"),
    go("dblclick", "onDoubleClick"),
    go("focusin", "onFocus"),
    go("focusout", "onBlur"),
    go(ch, "onTransitionEnd"),
    p("onMouseEnter", ["mouseout", "mouseover"]),
    p("onMouseLeave", ["mouseout", "mouseover"]),
    p("onPointerEnter", ["pointerout", "pointerover"]),
    p("onPointerLeave", ["pointerout", "pointerover"]),
    c(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    c(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    c("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    c(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    c(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    c(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Ql =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    yy = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Ql),
    );
  function hh(e, n, i) {
    var s = e.type || "unknown-event";
    ((e.currentTarget = i), Wo(s, n, void 0, e), (e.currentTarget = null));
  }
  function ph(e, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var s = e[i],
        a = s.event;
      s = s.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var x = s.length - 1; 0 <= x; x--) {
            var N = s[x],
              R = N.instance,
              V = N.currentTarget;
            if (((N = N.listener), R !== h && a.isPropagationStopped()))
              break e;
            (hh(a, N, V), (h = R));
          }
        else
          for (x = 0; x < s.length; x++) {
            if (
              ((N = s[x]),
              (R = N.instance),
              (V = N.currentTarget),
              (N = N.listener),
              R !== h && a.isPropagationStopped())
            )
              break e;
            (hh(a, N, V), (h = R));
          }
      }
    }
    if (so) throw ((e = dr), (so = !1), (dr = null), e);
  }
  function ut(e, n) {
    var i = n[cc];
    i === void 0 && (i = n[cc] = new Set());
    var s = e + "__bubble";
    i.has(s) || (mh(n, e, 2, !1), i.add(s));
  }
  function rc(e, n, i) {
    var s = 0;
    (n && (s |= 4), mh(i, e, s, n));
  }
  var au = "_reactListening" + Math.random().toString(36).slice(2);
  function Yl(e) {
    if (!e[au]) {
      ((e[au] = !0),
        l.forEach(function (i) {
          i !== "selectionchange" && (yy.has(i) || rc(i, !1, e), rc(i, !0, e));
        }));
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[au] || ((n[au] = !0), rc("selectionchange", !1, n));
    }
  }
  function mh(e, n, i, s) {
    switch (Ll(n)) {
      case 1:
        var a = Ai;
        break;
      case 4:
        a = Hr;
        break;
      default:
        a = Ui;
    }
    ((i = a.bind(null, n, i, e)),
      (a = void 0),
      !Ar ||
        (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
        (a = !0),
      s
        ? a !== void 0
          ? e.addEventListener(n, i, { capture: !0, passive: a })
          : e.addEventListener(n, i, !0)
        : a !== void 0
          ? e.addEventListener(n, i, { passive: a })
          : e.addEventListener(n, i, !1));
  }
  function oc(e, n, i, s, a) {
    var h = s;
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null)
      e: for (;;) {
        if (s === null) return;
        var x = s.tag;
        if (x === 3 || x === 4) {
          var N = s.stateNode.containerInfo;
          if (N === a || (N.nodeType === 8 && N.parentNode === a)) break;
          if (x === 4)
            for (x = s.return; x !== null; ) {
              var R = x.tag;
              if (
                (R === 3 || R === 4) &&
                ((R = x.stateNode.containerInfo),
                R === a || (R.nodeType === 8 && R.parentNode === a))
              )
                return;
              x = x.return;
            }
          for (; N !== null; ) {
            if (((x = ii(N)), x === null)) return;
            if (((R = x.tag), R === 5 || R === 6)) {
              s = h = x;
              continue e;
            }
            N = N.parentNode;
          }
        }
        s = s.return;
      }
    Ho(function () {
      var V = h,
        J = Ft(i),
        ne = [];
      e: {
        var Z = fh.get(e);
        if (Z !== void 0) {
          var pe = Qr,
            ye = e;
          switch (e) {
            case "keypress":
              if (Wr(i) === 0) break e;
            case "keydown":
            case "keyup":
              pe = iu;
              break;
            case "focusin":
              ((ye = "focus"), (pe = Vi));
              break;
            case "focusout":
              ((ye = "blur"), (pe = Vi));
              break;
            case "beforeblur":
            case "afterblur":
              pe = Vi;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              pe = Dl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              pe = Ol;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              pe = C;
              break;
            case sh:
            case uh:
            case ah:
              pe = qa;
              break;
            case ch:
              pe = A;
              break;
            case "scroll":
              pe = zl;
              break;
            case "wheel":
              pe = re;
              break;
            case "copy":
            case "cut":
            case "paste":
              pe = Hi;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              pe = g;
          }
          var we = (n & 4) !== 0,
            yt = !we && e === "scroll",
            j = we ? (Z !== null ? Z + "Capture" : null) : Z;
          we = [];
          for (var I = V, b; I !== null; ) {
            b = I;
            var le = b.stateNode;
            if (
              (b.tag === 5 &&
                le !== null &&
                ((b = le),
                j !== null &&
                  ((le = Vn(I, j)), le != null && we.push(ql(I, le, b)))),
              yt)
            )
              break;
            I = I.return;
          }
          0 < we.length &&
            ((Z = new pe(Z, ye, null, i, J)),
            ne.push({ event: Z, listeners: we }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((Z = e === "mouseover" || e === "pointerover"),
            (pe = e === "mouseout" || e === "pointerout"),
            Z &&
              i !== Vo &&
              (ye = i.relatedTarget || i.fromElement) &&
              (ii(ye) || ye[qr]))
          )
            break e;
          if (
            (pe || Z) &&
            ((Z =
              J.window === J
                ? J
                : (Z = J.ownerDocument)
                  ? Z.defaultView || Z.parentWindow
                  : window),
            pe
              ? ((ye = i.relatedTarget || i.toElement),
                (pe = V),
                (ye = ye ? ii(ye) : null),
                ye !== null &&
                  ((yt = Hn(ye)),
                  ye !== yt || (ye.tag !== 5 && ye.tag !== 6)) &&
                  (ye = null))
              : ((pe = null), (ye = V)),
            pe !== ye)
          ) {
            if (
              ((we = Dl),
              (le = "onMouseLeave"),
              (j = "onMouseEnter"),
              (I = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((we = g),
                (le = "onPointerLeave"),
                (j = "onPointerEnter"),
                (I = "pointer")),
              (yt = pe == null ? Z : Gi(pe)),
              (b = ye == null ? Z : Gi(ye)),
              (Z = new we(le, I + "leave", pe, i, J)),
              (Z.target = yt),
              (Z.relatedTarget = b),
              (le = null),
              ii(J) === V &&
                ((we = new we(j, I + "enter", ye, i, J)),
                (we.target = b),
                (we.relatedTarget = yt),
                (le = we)),
              (yt = le),
              pe && ye)
            )
              t: {
                for (we = pe, j = ye, I = 0, b = we; b; b = Ki(b)) I++;
                for (b = 0, le = j; le; le = Ki(le)) b++;
                for (; 0 < I - b; ) ((we = Ki(we)), I--);
                for (; 0 < b - I; ) ((j = Ki(j)), b--);
                for (; I--; ) {
                  if (we === j || (j !== null && we === j.alternate)) break t;
                  ((we = Ki(we)), (j = Ki(j)));
                }
                we = null;
              }
            else we = null;
            (pe !== null && gh(ne, Z, pe, we, !1),
              ye !== null && yt !== null && gh(ne, yt, ye, we, !0));
          }
        }
        e: {
          if (
            ((Z = V ? Gi(V) : window),
            (pe = Z.nodeName && Z.nodeName.toLowerCase()),
            pe === "select" || (pe === "input" && Z.type === "file"))
          )
            var Ce = sy;
          else if (Xd(Z))
            if (Zd) Ce = fy;
            else {
              Ce = ay;
              var Me = uy;
            }
          else
            (pe = Z.nodeName) &&
              pe.toLowerCase() === "input" &&
              (Z.type === "checkbox" || Z.type === "radio") &&
              (Ce = cy);
          if (Ce && (Ce = Ce(e, V))) {
            Kd(ne, Ce, i, J);
            break e;
          }
          (Me && Me(e, Z, V),
            e === "focusout" &&
              (Me = Z._wrapperState) &&
              Me.controlled &&
              Z.type === "number" &&
              Un(Z, "number", Z.value));
        }
        switch (((Me = V ? Gi(V) : window), e)) {
          case "focusin":
            (Xd(Me) || Me.contentEditable === "true") &&
              ((qi = Me), (Ga = V), (Wl = null));
            break;
          case "focusout":
            Wl = Ga = qi = null;
            break;
          case "mousedown":
            Ja = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ja = !1), ih(ne, i, J));
            break;
          case "selectionchange":
            if (py) break;
          case "keydown":
          case "keyup":
            ih(ne, i, J);
        }
        var Pe;
        if (be)
          e: {
            switch (e) {
              case "compositionstart":
                var Oe = "onCompositionStart";
                break e;
              case "compositionend":
                Oe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Oe = "onCompositionUpdate";
                break e;
            }
            Oe = void 0;
          }
        else
          kr
            ? oi(e, i) && (Oe = "onCompositionEnd")
            : e === "keydown" &&
              i.keyCode === 229 &&
              (Oe = "onCompositionStart");
        (Oe &&
          (Dt &&
            i.locale !== "ko" &&
            (kr || Oe !== "onCompositionStart"
              ? Oe === "onCompositionEnd" && kr && (Pe = Js())
              : ((Xn = J),
                (bi = "value" in Xn ? Xn.value : Xn.textContent),
                (kr = !0))),
          (Me = cu(V, Oe)),
          0 < Me.length &&
            ((Oe = new Al(Oe, e, null, i, J)),
            ne.push({ event: Oe, listeners: Me }),
            Pe
              ? (Oe.data = Pe)
              : ((Pe = bl(i)), Pe !== null && (Oe.data = Pe)))),
          (Pe = it ? ry(e, i) : oy(e, i)) &&
            ((V = cu(V, "onBeforeInput")),
            0 < V.length &&
              ((J = new Al("onBeforeInput", "beforeinput", null, i, J)),
              ne.push({ event: J, listeners: V }),
              (J.data = Pe))));
      }
      ph(ne, n);
    });
  }
  function ql(e, n, i) {
    return { instance: e, listener: n, currentTarget: i };
  }
  function cu(e, n) {
    for (var i = n + "Capture", s = []; e !== null; ) {
      var a = e,
        h = a.stateNode;
      (a.tag === 5 &&
        h !== null &&
        ((a = h),
        (h = Vn(e, i)),
        h != null && s.unshift(ql(e, h, a)),
        (h = Vn(e, n)),
        h != null && s.push(ql(e, h, a))),
        (e = e.return));
    }
    return s;
  }
  function Ki(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function gh(e, n, i, s, a) {
    for (var h = n._reactName, x = []; i !== null && i !== s; ) {
      var N = i,
        R = N.alternate,
        V = N.stateNode;
      if (R !== null && R === s) break;
      (N.tag === 5 &&
        V !== null &&
        ((N = V),
        a
          ? ((R = Vn(i, h)), R != null && x.unshift(ql(i, R, N)))
          : a || ((R = Vn(i, h)), R != null && x.push(ql(i, R, N)))),
        (i = i.return));
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var vy = /\r\n?/g,
    wy = /\u0000|\uFFFD/g;
  function yh(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        vy,
        `
`,
      )
      .replace(wy, "");
  }
  function fu(e, n, i) {
    if (((n = yh(n)), yh(e) !== n && i)) throw Error(o(425));
  }
  function du() {}
  var ic = null,
    lc = null;
  function sc(e, n) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var uc = typeof setTimeout == "function" ? setTimeout : void 0,
    xy = typeof clearTimeout == "function" ? clearTimeout : void 0,
    vh = typeof Promise == "function" ? Promise : void 0,
    Sy =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof vh != "undefined"
          ? function (e) {
              return vh.resolve(null).then(e).catch(ky);
            }
          : uc;
  function ky(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function ac(e, n) {
    var i = n,
      s = 0;
    do {
      var a = i.nextSibling;
      if ((e.removeChild(i), a && a.nodeType === 8))
        if (((i = a.data), i === "/$")) {
          if (s === 0) {
            (e.removeChild(a), xr(n));
            return;
          }
          s--;
        } else (i !== "$" && i !== "$?" && i !== "$!") || s++;
      i = a;
    } while (i);
    xr(n);
  }
  function yo(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (((n = e.data), n === "$" || n === "$!" || n === "$?")) break;
        if (n === "/$") return null;
      }
    }
    return e;
  }
  function wh(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?") {
          if (n === 0) return e;
          n--;
        } else i === "/$" && n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Zi = Math.random().toString(36).slice(2),
    _r = "__reactFiber$" + Zi,
    Xl = "__reactProps$" + Zi,
    qr = "__reactContainer$" + Zi,
    cc = "__reactEvents$" + Zi,
    _y = "__reactListeners$" + Zi,
    Cy = "__reactHandles$" + Zi;
  function ii(e) {
    var n = e[_r];
    if (n) return n;
    for (var i = e.parentNode; i; ) {
      if ((n = i[qr] || i[_r])) {
        if (
          ((i = n.alternate),
          n.child !== null || (i !== null && i.child !== null))
        )
          for (e = wh(e); e !== null; ) {
            if ((i = e[_r])) return i;
            e = wh(e);
          }
        return n;
      }
      ((e = i), (i = e.parentNode));
    }
    return null;
  }
  function Kl(e) {
    return (
      (e = e[_r] || e[qr]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function Gi(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(o(33));
  }
  function hu(e) {
    return e[Xl] || null;
  }
  var fc = [],
    Ji = -1;
  function vo(e) {
    return { current: e };
  }
  function at(e) {
    0 > Ji || ((e.current = fc[Ji]), (fc[Ji] = null), Ji--);
  }
  function st(e, n) {
    (Ji++, (fc[Ji] = e.current), (e.current = n));
  }
  var wo = {},
    Ot = vo(wo),
    nn = vo(!1),
    li = wo;
  function el(e, n) {
    var i = e.type.contextTypes;
    if (!i) return wo;
    var s = e.stateNode;
    if (s && s.__reactInternalMemoizedUnmaskedChildContext === n)
      return s.__reactInternalMemoizedMaskedChildContext;
    var a = {},
      h;
    for (h in i) a[h] = n[h];
    return (
      s &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = n),
        (e.__reactInternalMemoizedMaskedChildContext = a)),
      a
    );
  }
  function rn(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function pu() {
    (at(nn), at(Ot));
  }
  function xh(e, n, i) {
    if (Ot.current !== wo) throw Error(o(168));
    (st(Ot, n), st(nn, i));
  }
  function Sh(e, n, i) {
    var s = e.stateNode;
    if (((n = n.childContextTypes), typeof s.getChildContext != "function"))
      return i;
    s = s.getChildContext();
    for (var a in s) if (!(a in n)) throw Error(o(108, Qe(e) || "Unknown", a));
    return de({}, i, s);
  }
  function mu(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        wo),
      (li = Ot.current),
      st(Ot, e),
      st(nn, nn.current),
      !0
    );
  }
  function kh(e, n, i) {
    var s = e.stateNode;
    if (!s) throw Error(o(169));
    (i
      ? ((e = Sh(e, n, li)),
        (s.__reactInternalMemoizedMergedChildContext = e),
        at(nn),
        at(Ot),
        st(Ot, e))
      : at(nn),
      st(nn, i));
  }
  var Xr = null,
    gu = !1,
    dc = !1;
  function _h(e) {
    Xr === null ? (Xr = [e]) : Xr.push(e);
  }
  function Ey(e) {
    ((gu = !0), _h(e));
  }
  function xo() {
    if (!dc && Xr !== null) {
      dc = !0;
      var e = 0,
        n = he;
      try {
        var i = Xr;
        for (he = 1; e < i.length; e++) {
          var s = i[e];
          do s = s(!0);
          while (s !== null);
        }
        ((Xr = null), (gu = !1));
      } catch (a) {
        throw (Xr !== null && (Xr = Xr.slice(e + 1)), br(ao, xo), a);
      } finally {
        ((he = n), (dc = !1));
      }
    }
    return null;
  }
  var tl = [],
    nl = 0,
    yu = null,
    vu = 0,
    Rn = [],
    $n = 0,
    si = null,
    Kr = 1,
    Zr = "";
  function ui(e, n) {
    ((tl[nl++] = vu), (tl[nl++] = yu), (yu = e), (vu = n));
  }
  function Ch(e, n, i) {
    ((Rn[$n++] = Kr), (Rn[$n++] = Zr), (Rn[$n++] = si), (si = e));
    var s = Kr;
    e = Zr;
    var a = 32 - wt(s) - 1;
    ((s &= ~(1 << a)), (i += 1));
    var h = 32 - wt(n) + a;
    if (30 < h) {
      var x = a - (a % 5);
      ((h = (s & ((1 << x) - 1)).toString(32)),
        (s >>= x),
        (a -= x),
        (Kr = (1 << (32 - wt(n) + a)) | (i << a) | s),
        (Zr = h + e));
    } else ((Kr = (1 << h) | (i << a) | s), (Zr = e));
  }
  function hc(e) {
    e.return !== null && (ui(e, 1), Ch(e, 1, 0));
  }
  function pc(e) {
    for (; e === yu; )
      ((yu = tl[--nl]), (tl[nl] = null), (vu = tl[--nl]), (tl[nl] = null));
    for (; e === si; )
      ((si = Rn[--$n]),
        (Rn[$n] = null),
        (Zr = Rn[--$n]),
        (Rn[$n] = null),
        (Kr = Rn[--$n]),
        (Rn[$n] = null));
  }
  var xn = null,
    Sn = null,
    ft = !1,
    Zn = null;
  function Eh(e, n) {
    var i = zn(5, null, null, 0);
    ((i.elementType = "DELETED"),
      (i.stateNode = n),
      (i.return = e),
      (n = e.deletions),
      n === null ? ((e.deletions = [i]), (e.flags |= 16)) : n.push(i));
  }
  function Nh(e, n) {
    switch (e.tag) {
      case 5:
        var i = e.type;
        return (
          (n =
            n.nodeType !== 1 || i.toLowerCase() !== n.nodeName.toLowerCase()
              ? null
              : n),
          n !== null
            ? ((e.stateNode = n), (xn = e), (Sn = yo(n.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (n = e.pendingProps === "" || n.nodeType !== 3 ? null : n),
          n !== null ? ((e.stateNode = n), (xn = e), (Sn = null), !0) : !1
        );
      case 13:
        return (
          (n = n.nodeType !== 8 ? null : n),
          n !== null
            ? ((i = si !== null ? { id: Kr, overflow: Zr } : null),
              (e.memoizedState = {
                dehydrated: n,
                treeContext: i,
                retryLane: 1073741824,
              }),
              (i = zn(18, null, null, 0)),
              (i.stateNode = n),
              (i.return = e),
              (e.child = i),
              (xn = e),
              (Sn = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function mc(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function gc(e) {
    if (ft) {
      var n = Sn;
      if (n) {
        var i = n;
        if (!Nh(e, n)) {
          if (mc(e)) throw Error(o(418));
          n = yo(i.nextSibling);
          var s = xn;
          n && Nh(e, n)
            ? Eh(s, i)
            : ((e.flags = (e.flags & -4097) | 2), (ft = !1), (xn = e));
        }
      } else {
        if (mc(e)) throw Error(o(418));
        ((e.flags = (e.flags & -4097) | 2), (ft = !1), (xn = e));
      }
    }
  }
  function Th(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return;
    xn = e;
  }
  function wu(e) {
    if (e !== xn) return !1;
    if (!ft) return (Th(e), (ft = !0), !1);
    var n;
    if (
      ((n = e.tag !== 3) &&
        !(n = e.tag !== 5) &&
        ((n = e.type),
        (n = n !== "head" && n !== "body" && !sc(e.type, e.memoizedProps))),
      n && (n = Sn))
    ) {
      if (mc(e)) throw (Mh(), Error(o(418)));
      for (; n; ) (Eh(e, n), (n = yo(n.nextSibling)));
    }
    if ((Th(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      e: {
        for (e = e.nextSibling, n = 0; e; ) {
          if (e.nodeType === 8) {
            var i = e.data;
            if (i === "/$") {
              if (n === 0) {
                Sn = yo(e.nextSibling);
                break e;
              }
              n--;
            } else (i !== "$" && i !== "$!" && i !== "$?") || n++;
          }
          e = e.nextSibling;
        }
        Sn = null;
      }
    } else Sn = xn ? yo(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Mh() {
    for (var e = Sn; e; ) e = yo(e.nextSibling);
  }
  function rl() {
    ((Sn = xn = null), (ft = !1));
  }
  function yc(e) {
    Zn === null ? (Zn = [e]) : Zn.push(e);
  }
  var Ny = Y.ReactCurrentBatchConfig;
  function Zl(e, n, i) {
    if (
      ((e = i.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (i._owner) {
        if (((i = i._owner), i)) {
          if (i.tag !== 1) throw Error(o(309));
          var s = i.stateNode;
        }
        if (!s) throw Error(o(147, e));
        var a = s,
          h = "" + e;
        return n !== null &&
          n.ref !== null &&
          typeof n.ref == "function" &&
          n.ref._stringRef === h
          ? n.ref
          : ((n = function (x) {
              var N = a.refs;
              x === null ? delete N[h] : (N[h] = x);
            }),
            (n._stringRef = h),
            n);
      }
      if (typeof e != "string") throw Error(o(284));
      if (!i._owner) throw Error(o(290, e));
    }
    return e;
  }
  function xu(e, n) {
    throw (
      (e = Object.prototype.toString.call(n)),
      Error(
        o(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(n).join(", ") + "}"
            : e,
        ),
      )
    );
  }
  function Ph(e) {
    var n = e._init;
    return n(e._payload);
  }
  function Rh(e) {
    function n(j, I) {
      if (e) {
        var b = j.deletions;
        b === null ? ((j.deletions = [I]), (j.flags |= 16)) : b.push(I);
      }
    }
    function i(j, I) {
      if (!e) return null;
      for (; I !== null; ) (n(j, I), (I = I.sibling));
      return null;
    }
    function s(j, I) {
      for (j = new Map(); I !== null; )
        (I.key !== null ? j.set(I.key, I) : j.set(I.index, I), (I = I.sibling));
      return j;
    }
    function a(j, I) {
      return ((j = Mo(j, I)), (j.index = 0), (j.sibling = null), j);
    }
    function h(j, I, b) {
      return (
        (j.index = b),
        e
          ? ((b = j.alternate),
            b !== null
              ? ((b = b.index), b < I ? ((j.flags |= 2), I) : b)
              : ((j.flags |= 2), I))
          : ((j.flags |= 1048576), I)
      );
    }
    function x(j) {
      return (e && j.alternate === null && (j.flags |= 2), j);
    }
    function N(j, I, b, le) {
      return I === null || I.tag !== 6
        ? ((I = af(b, j.mode, le)), (I.return = j), I)
        : ((I = a(I, b)), (I.return = j), I);
    }
    function R(j, I, b, le) {
      var Ce = b.type;
      return Ce === ae
        ? J(j, I, b.props.children, le, b.key)
        : I !== null &&
            (I.elementType === Ce ||
              (typeof Ce == "object" &&
                Ce !== null &&
                Ce.$$typeof === je &&
                Ph(Ce) === I.type))
          ? ((le = a(I, b.props)), (le.ref = Zl(j, I, b)), (le.return = j), le)
          : ((le = Hu(b.type, b.key, b.props, null, j.mode, le)),
            (le.ref = Zl(j, I, b)),
            (le.return = j),
            le);
    }
    function V(j, I, b, le) {
      return I === null ||
        I.tag !== 4 ||
        I.stateNode.containerInfo !== b.containerInfo ||
        I.stateNode.implementation !== b.implementation
        ? ((I = cf(b, j.mode, le)), (I.return = j), I)
        : ((I = a(I, b.children || [])), (I.return = j), I);
    }
    function J(j, I, b, le, Ce) {
      return I === null || I.tag !== 7
        ? ((I = gi(b, j.mode, le, Ce)), (I.return = j), I)
        : ((I = a(I, b)), (I.return = j), I);
    }
    function ne(j, I, b) {
      if ((typeof I == "string" && I !== "") || typeof I == "number")
        return ((I = af("" + I, j.mode, b)), (I.return = j), I);
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case oe:
            return (
              (b = Hu(I.type, I.key, I.props, null, j.mode, b)),
              (b.ref = Zl(j, null, I)),
              (b.return = j),
              b
            );
          case fe:
            return ((I = cf(I, j.mode, b)), (I.return = j), I);
          case je:
            var le = I._init;
            return ne(j, le(I._payload), b);
        }
        if (Tn(I) || ce(I))
          return ((I = gi(I, j.mode, b, null)), (I.return = j), I);
        xu(j, I);
      }
      return null;
    }
    function Z(j, I, b, le) {
      var Ce = I !== null ? I.key : null;
      if ((typeof b == "string" && b !== "") || typeof b == "number")
        return Ce !== null ? null : N(j, I, "" + b, le);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case oe:
            return b.key === Ce ? R(j, I, b, le) : null;
          case fe:
            return b.key === Ce ? V(j, I, b, le) : null;
          case je:
            return ((Ce = b._init), Z(j, I, Ce(b._payload), le));
        }
        if (Tn(b) || ce(b)) return Ce !== null ? null : J(j, I, b, le, null);
        xu(j, b);
      }
      return null;
    }
    function pe(j, I, b, le, Ce) {
      if ((typeof le == "string" && le !== "") || typeof le == "number")
        return ((j = j.get(b) || null), N(I, j, "" + le, Ce));
      if (typeof le == "object" && le !== null) {
        switch (le.$$typeof) {
          case oe:
            return (
              (j = j.get(le.key === null ? b : le.key) || null),
              R(I, j, le, Ce)
            );
          case fe:
            return (
              (j = j.get(le.key === null ? b : le.key) || null),
              V(I, j, le, Ce)
            );
          case je:
            var Me = le._init;
            return pe(j, I, b, Me(le._payload), Ce);
        }
        if (Tn(le) || ce(le))
          return ((j = j.get(b) || null), J(I, j, le, Ce, null));
        xu(I, le);
      }
      return null;
    }
    function ye(j, I, b, le) {
      for (
        var Ce = null, Me = null, Pe = I, Oe = (I = 0), Nt = null;
        Pe !== null && Oe < b.length;
        Oe++
      ) {
        Pe.index > Oe ? ((Nt = Pe), (Pe = null)) : (Nt = Pe.sibling);
        var Ge = Z(j, Pe, b[Oe], le);
        if (Ge === null) {
          Pe === null && (Pe = Nt);
          break;
        }
        (e && Pe && Ge.alternate === null && n(j, Pe),
          (I = h(Ge, I, Oe)),
          Me === null ? (Ce = Ge) : (Me.sibling = Ge),
          (Me = Ge),
          (Pe = Nt));
      }
      if (Oe === b.length) return (i(j, Pe), ft && ui(j, Oe), Ce);
      if (Pe === null) {
        for (; Oe < b.length; Oe++)
          ((Pe = ne(j, b[Oe], le)),
            Pe !== null &&
              ((I = h(Pe, I, Oe)),
              Me === null ? (Ce = Pe) : (Me.sibling = Pe),
              (Me = Pe)));
        return (ft && ui(j, Oe), Ce);
      }
      for (Pe = s(j, Pe); Oe < b.length; Oe++)
        ((Nt = pe(Pe, j, Oe, b[Oe], le)),
          Nt !== null &&
            (e &&
              Nt.alternate !== null &&
              Pe.delete(Nt.key === null ? Oe : Nt.key),
            (I = h(Nt, I, Oe)),
            Me === null ? (Ce = Nt) : (Me.sibling = Nt),
            (Me = Nt)));
      return (
        e &&
          Pe.forEach(function (Po) {
            return n(j, Po);
          }),
        ft && ui(j, Oe),
        Ce
      );
    }
    function we(j, I, b, le) {
      var Ce = ce(b);
      if (typeof Ce != "function") throw Error(o(150));
      if (((b = Ce.call(b)), b == null)) throw Error(o(151));
      for (
        var Me = (Ce = null), Pe = I, Oe = (I = 0), Nt = null, Ge = b.next();
        Pe !== null && !Ge.done;
        Oe++, Ge = b.next()
      ) {
        Pe.index > Oe ? ((Nt = Pe), (Pe = null)) : (Nt = Pe.sibling);
        var Po = Z(j, Pe, Ge.value, le);
        if (Po === null) {
          Pe === null && (Pe = Nt);
          break;
        }
        (e && Pe && Po.alternate === null && n(j, Pe),
          (I = h(Po, I, Oe)),
          Me === null ? (Ce = Po) : (Me.sibling = Po),
          (Me = Po),
          (Pe = Nt));
      }
      if (Ge.done) return (i(j, Pe), ft && ui(j, Oe), Ce);
      if (Pe === null) {
        for (; !Ge.done; Oe++, Ge = b.next())
          ((Ge = ne(j, Ge.value, le)),
            Ge !== null &&
              ((I = h(Ge, I, Oe)),
              Me === null ? (Ce = Ge) : (Me.sibling = Ge),
              (Me = Ge)));
        return (ft && ui(j, Oe), Ce);
      }
      for (Pe = s(j, Pe); !Ge.done; Oe++, Ge = b.next())
        ((Ge = pe(Pe, j, Oe, Ge.value, le)),
          Ge !== null &&
            (e &&
              Ge.alternate !== null &&
              Pe.delete(Ge.key === null ? Oe : Ge.key),
            (I = h(Ge, I, Oe)),
            Me === null ? (Ce = Ge) : (Me.sibling = Ge),
            (Me = Ge)));
      return (
        e &&
          Pe.forEach(function (iv) {
            return n(j, iv);
          }),
        ft && ui(j, Oe),
        Ce
      );
    }
    function yt(j, I, b, le) {
      if (
        (typeof b == "object" &&
          b !== null &&
          b.type === ae &&
          b.key === null &&
          (b = b.props.children),
        typeof b == "object" && b !== null)
      ) {
        switch (b.$$typeof) {
          case oe:
            e: {
              for (var Ce = b.key, Me = I; Me !== null; ) {
                if (Me.key === Ce) {
                  if (((Ce = b.type), Ce === ae)) {
                    if (Me.tag === 7) {
                      (i(j, Me.sibling),
                        (I = a(Me, b.props.children)),
                        (I.return = j),
                        (j = I));
                      break e;
                    }
                  } else if (
                    Me.elementType === Ce ||
                    (typeof Ce == "object" &&
                      Ce !== null &&
                      Ce.$$typeof === je &&
                      Ph(Ce) === Me.type)
                  ) {
                    (i(j, Me.sibling),
                      (I = a(Me, b.props)),
                      (I.ref = Zl(j, Me, b)),
                      (I.return = j),
                      (j = I));
                    break e;
                  }
                  i(j, Me);
                  break;
                } else n(j, Me);
                Me = Me.sibling;
              }
              b.type === ae
                ? ((I = gi(b.props.children, j.mode, le, b.key)),
                  (I.return = j),
                  (j = I))
                : ((le = Hu(b.type, b.key, b.props, null, j.mode, le)),
                  (le.ref = Zl(j, I, b)),
                  (le.return = j),
                  (j = le));
            }
            return x(j);
          case fe:
            e: {
              for (Me = b.key; I !== null; ) {
                if (I.key === Me)
                  if (
                    I.tag === 4 &&
                    I.stateNode.containerInfo === b.containerInfo &&
                    I.stateNode.implementation === b.implementation
                  ) {
                    (i(j, I.sibling),
                      (I = a(I, b.children || [])),
                      (I.return = j),
                      (j = I));
                    break e;
                  } else {
                    i(j, I);
                    break;
                  }
                else n(j, I);
                I = I.sibling;
              }
              ((I = cf(b, j.mode, le)), (I.return = j), (j = I));
            }
            return x(j);
          case je:
            return ((Me = b._init), yt(j, I, Me(b._payload), le));
        }
        if (Tn(b)) return ye(j, I, b, le);
        if (ce(b)) return we(j, I, b, le);
        xu(j, b);
      }
      return (typeof b == "string" && b !== "") || typeof b == "number"
        ? ((b = "" + b),
          I !== null && I.tag === 6
            ? (i(j, I.sibling), (I = a(I, b)), (I.return = j), (j = I))
            : (i(j, I), (I = af(b, j.mode, le)), (I.return = j), (j = I)),
          x(j))
        : i(j, I);
    }
    return yt;
  }
  var ol = Rh(!0),
    $h = Rh(!1),
    Su = vo(null),
    ku = null,
    il = null,
    vc = null;
  function wc() {
    vc = il = ku = null;
  }
  function xc(e) {
    var n = Su.current;
    (at(Su), (e._currentValue = n));
  }
  function Sc(e, n, i) {
    for (; e !== null; ) {
      var s = e.alternate;
      if (
        ((e.childLanes & n) !== n
          ? ((e.childLanes |= n), s !== null && (s.childLanes |= n))
          : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n),
        e === i)
      )
        break;
      e = e.return;
    }
  }
  function ll(e, n) {
    ((ku = e),
      (vc = il = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & n) !== 0 && (on = !0), (e.firstContext = null)));
  }
  function In(e) {
    var n = e._currentValue;
    if (vc !== e)
      if (((e = { context: e, memoizedValue: n, next: null }), il === null)) {
        if (ku === null) throw Error(o(308));
        ((il = e), (ku.dependencies = { lanes: 0, firstContext: e }));
      } else il = il.next = e;
    return n;
  }
  var ai = null;
  function kc(e) {
    ai === null ? (ai = [e]) : ai.push(e);
  }
  function Ih(e, n, i, s) {
    var a = n.interleaved;
    return (
      a === null ? ((i.next = i), kc(n)) : ((i.next = a.next), (a.next = i)),
      (n.interleaved = i),
      Gr(e, s)
    );
  }
  function Gr(e, n) {
    e.lanes |= n;
    var i = e.alternate;
    for (i !== null && (i.lanes |= n), i = e, e = e.return; e !== null; )
      ((e.childLanes |= n),
        (i = e.alternate),
        i !== null && (i.childLanes |= n),
        (i = e),
        (e = e.return));
    return i.tag === 3 ? i.stateNode : null;
  }
  var So = !1;
  function _c(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Fh(e, n) {
    ((e = e.updateQueue),
      n.updateQueue === e &&
        (n.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function Jr(e, n) {
    return {
      eventTime: e,
      lane: n,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function ko(e, n, i) {
    var s = e.updateQueue;
    if (s === null) return null;
    if (((s = s.shared), (Ke & 2) !== 0)) {
      var a = s.pending;
      return (
        a === null ? (n.next = n) : ((n.next = a.next), (a.next = n)),
        (s.pending = n),
        Gr(e, i)
      );
    }
    return (
      (a = s.interleaved),
      a === null ? ((n.next = n), kc(s)) : ((n.next = a.next), (a.next = n)),
      (s.interleaved = n),
      Gr(e, i)
    );
  }
  function _u(e, n, i) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (i & 4194240) !== 0))
    ) {
      var s = n.lanes;
      ((s &= e.pendingLanes), (i |= s), (n.lanes = i), se(e, i));
    }
  }
  function Lh(e, n) {
    var i = e.updateQueue,
      s = e.alternate;
    if (s !== null && ((s = s.updateQueue), i === s)) {
      var a = null,
        h = null;
      if (((i = i.firstBaseUpdate), i !== null)) {
        do {
          var x = {
            eventTime: i.eventTime,
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          };
          (h === null ? (a = h = x) : (h = h.next = x), (i = i.next));
        } while (i !== null);
        h === null ? (a = h = n) : (h = h.next = n);
      } else a = h = n;
      ((i = {
        baseState: s.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: h,
        shared: s.shared,
        effects: s.effects,
      }),
        (e.updateQueue = i));
      return;
    }
    ((e = i.lastBaseUpdate),
      e === null ? (i.firstBaseUpdate = n) : (e.next = n),
      (i.lastBaseUpdate = n));
  }
  function Cu(e, n, i, s) {
    var a = e.updateQueue;
    So = !1;
    var h = a.firstBaseUpdate,
      x = a.lastBaseUpdate,
      N = a.shared.pending;
    if (N !== null) {
      a.shared.pending = null;
      var R = N,
        V = R.next;
      ((R.next = null), x === null ? (h = V) : (x.next = V), (x = R));
      var J = e.alternate;
      J !== null &&
        ((J = J.updateQueue),
        (N = J.lastBaseUpdate),
        N !== x &&
          (N === null ? (J.firstBaseUpdate = V) : (N.next = V),
          (J.lastBaseUpdate = R)));
    }
    if (h !== null) {
      var ne = a.baseState;
      ((x = 0), (J = V = R = null), (N = h));
      do {
        var Z = N.lane,
          pe = N.eventTime;
        if ((s & Z) === Z) {
          J !== null &&
            (J = J.next =
              {
                eventTime: pe,
                lane: 0,
                tag: N.tag,
                payload: N.payload,
                callback: N.callback,
                next: null,
              });
          e: {
            var ye = e,
              we = N;
            switch (((Z = n), (pe = i), we.tag)) {
              case 1:
                if (((ye = we.payload), typeof ye == "function")) {
                  ne = ye.call(pe, ne, Z);
                  break e;
                }
                ne = ye;
                break e;
              case 3:
                ye.flags = (ye.flags & -65537) | 128;
              case 0:
                if (
                  ((ye = we.payload),
                  (Z = typeof ye == "function" ? ye.call(pe, ne, Z) : ye),
                  Z == null)
                )
                  break e;
                ne = de({}, ne, Z);
                break e;
              case 2:
                So = !0;
            }
          }
          N.callback !== null &&
            N.lane !== 0 &&
            ((e.flags |= 64),
            (Z = a.effects),
            Z === null ? (a.effects = [N]) : Z.push(N));
        } else
          ((pe = {
            eventTime: pe,
            lane: Z,
            tag: N.tag,
            payload: N.payload,
            callback: N.callback,
            next: null,
          }),
            J === null ? ((V = J = pe), (R = ne)) : (J = J.next = pe),
            (x |= Z));
        if (((N = N.next), N === null)) {
          if (((N = a.shared.pending), N === null)) break;
          ((Z = N),
            (N = Z.next),
            (Z.next = null),
            (a.lastBaseUpdate = Z),
            (a.shared.pending = null));
        }
      } while (!0);
      if (
        (J === null && (R = ne),
        (a.baseState = R),
        (a.firstBaseUpdate = V),
        (a.lastBaseUpdate = J),
        (n = a.shared.interleaved),
        n !== null)
      ) {
        a = n;
        do ((x |= a.lane), (a = a.next));
        while (a !== n);
      } else h === null && (a.shared.lanes = 0);
      ((di |= x), (e.lanes = x), (e.memoizedState = ne));
    }
  }
  function zh(e, n, i) {
    if (((e = n.effects), (n.effects = null), e !== null))
      for (n = 0; n < e.length; n++) {
        var s = e[n],
          a = s.callback;
        if (a !== null) {
          if (((s.callback = null), (s = i), typeof a != "function"))
            throw Error(o(191, a));
          a.call(s);
        }
      }
  }
  var Gl = {},
    Cr = vo(Gl),
    Jl = vo(Gl),
    es = vo(Gl);
  function ci(e) {
    if (e === Gl) throw Error(o(174));
    return e;
  }
  function Cc(e, n) {
    switch ((st(es, n), st(Jl, e), st(Cr, Gl), (e = n.nodeType), e)) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : io(null, "");
        break;
      default:
        ((e = e === 8 ? n.parentNode : n),
          (n = e.namespaceURI || null),
          (e = e.tagName),
          (n = io(n, e)));
    }
    (at(Cr), st(Cr, n));
  }
  function sl() {
    (at(Cr), at(Jl), at(es));
  }
  function Dh(e) {
    ci(es.current);
    var n = ci(Cr.current),
      i = io(n, e.type);
    n !== i && (st(Jl, e), st(Cr, i));
  }
  function Ec(e) {
    Jl.current === e && (at(Cr), at(Jl));
  }
  var ht = vo(0);
  function Eu(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (
          i !== null &&
          ((i = i.dehydrated), i === null || i.data === "$?" || i.data === "$!")
        )
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
    return null;
  }
  var Nc = [];
  function Tc() {
    for (var e = 0; e < Nc.length; e++)
      Nc[e]._workInProgressVersionPrimary = null;
    Nc.length = 0;
  }
  var Nu = Y.ReactCurrentDispatcher,
    Mc = Y.ReactCurrentBatchConfig,
    fi = 0,
    pt = null,
    xt = null,
    Ct = null,
    Tu = !1,
    ts = !1,
    ns = 0,
    Ty = 0;
  function jt() {
    throw Error(o(321));
  }
  function Pc(e, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < e.length; i++)
      if (!Kn(e[i], n[i])) return !1;
    return !0;
  }
  function Rc(e, n, i, s, a, h) {
    if (
      ((fi = h),
      (pt = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (Nu.current = e === null || e.memoizedState === null ? $y : Iy),
      (e = i(s, a)),
      ts)
    ) {
      h = 0;
      do {
        if (((ts = !1), (ns = 0), 25 <= h)) throw Error(o(301));
        ((h += 1),
          (Ct = xt = null),
          (n.updateQueue = null),
          (Nu.current = Fy),
          (e = i(s, a)));
      } while (ts);
    }
    if (
      ((Nu.current = Ru),
      (n = xt !== null && xt.next !== null),
      (fi = 0),
      (Ct = xt = pt = null),
      (Tu = !1),
      n)
    )
      throw Error(o(300));
    return e;
  }
  function $c() {
    var e = ns !== 0;
    return ((ns = 0), e);
  }
  function Er() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Ct === null ? (pt.memoizedState = Ct = e) : (Ct = Ct.next = e), Ct);
  }
  function Fn() {
    if (xt === null) {
      var e = pt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = xt.next;
    var n = Ct === null ? pt.memoizedState : Ct.next;
    if (n !== null) ((Ct = n), (xt = e));
    else {
      if (e === null) throw Error(o(310));
      ((xt = e),
        (e = {
          memoizedState: xt.memoizedState,
          baseState: xt.baseState,
          baseQueue: xt.baseQueue,
          queue: xt.queue,
          next: null,
        }),
        Ct === null ? (pt.memoizedState = Ct = e) : (Ct = Ct.next = e));
    }
    return Ct;
  }
  function rs(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Ic(e) {
    var n = Fn(),
      i = n.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = e;
    var s = xt,
      a = s.baseQueue,
      h = i.pending;
    if (h !== null) {
      if (a !== null) {
        var x = a.next;
        ((a.next = h.next), (h.next = x));
      }
      ((s.baseQueue = a = h), (i.pending = null));
    }
    if (a !== null) {
      ((h = a.next), (s = s.baseState));
      var N = (x = null),
        R = null,
        V = h;
      do {
        var J = V.lane;
        if ((fi & J) === J)
          (R !== null &&
            (R = R.next =
              {
                lane: 0,
                action: V.action,
                hasEagerState: V.hasEagerState,
                eagerState: V.eagerState,
                next: null,
              }),
            (s = V.hasEagerState ? V.eagerState : e(s, V.action)));
        else {
          var ne = {
            lane: J,
            action: V.action,
            hasEagerState: V.hasEagerState,
            eagerState: V.eagerState,
            next: null,
          };
          (R === null ? ((N = R = ne), (x = s)) : (R = R.next = ne),
            (pt.lanes |= J),
            (di |= J));
        }
        V = V.next;
      } while (V !== null && V !== h);
      (R === null ? (x = s) : (R.next = N),
        Kn(s, n.memoizedState) || (on = !0),
        (n.memoizedState = s),
        (n.baseState = x),
        (n.baseQueue = R),
        (i.lastRenderedState = s));
    }
    if (((e = i.interleaved), e !== null)) {
      a = e;
      do ((h = a.lane), (pt.lanes |= h), (di |= h), (a = a.next));
      while (a !== e);
    } else a === null && (i.lanes = 0);
    return [n.memoizedState, i.dispatch];
  }
  function Fc(e) {
    var n = Fn(),
      i = n.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = e;
    var s = i.dispatch,
      a = i.pending,
      h = n.memoizedState;
    if (a !== null) {
      i.pending = null;
      var x = (a = a.next);
      do ((h = e(h, x.action)), (x = x.next));
      while (x !== a);
      (Kn(h, n.memoizedState) || (on = !0),
        (n.memoizedState = h),
        n.baseQueue === null && (n.baseState = h),
        (i.lastRenderedState = h));
    }
    return [h, s];
  }
  function Oh() {}
  function jh(e, n) {
    var i = pt,
      s = Fn(),
      a = n(),
      h = !Kn(s.memoizedState, a);
    if (
      (h && ((s.memoizedState = a), (on = !0)),
      (s = s.queue),
      Lc(bh.bind(null, i, s, e), [e]),
      s.getSnapshot !== n || h || (Ct !== null && Ct.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        os(9, Uh.bind(null, i, s, a, n), void 0, null),
        Et === null)
      )
        throw Error(o(349));
      (fi & 30) !== 0 || Ah(i, n, a);
    }
    return a;
  }
  function Ah(e, n, i) {
    ((e.flags |= 16384),
      (e = { getSnapshot: n, value: i }),
      (n = pt.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (pt.updateQueue = n),
          (n.stores = [e]))
        : ((i = n.stores), i === null ? (n.stores = [e]) : i.push(e)));
  }
  function Uh(e, n, i, s) {
    ((n.value = i), (n.getSnapshot = s), Bh(n) && Vh(e));
  }
  function bh(e, n, i) {
    return i(function () {
      Bh(n) && Vh(e);
    });
  }
  function Bh(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var i = n();
      return !Kn(e, i);
    } catch (s) {
      return !0;
    }
  }
  function Vh(e) {
    var n = Gr(e, 1);
    n !== null && tr(n, e, 1, -1);
  }
  function Hh(e) {
    var n = Er();
    return (
      typeof e == "function" && (e = e()),
      (n.memoizedState = n.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: rs,
        lastRenderedState: e,
      }),
      (n.queue = e),
      (e = e.dispatch = Ry.bind(null, pt, e)),
      [n.memoizedState, e]
    );
  }
  function os(e, n, i, s) {
    return (
      (e = { tag: e, create: n, destroy: i, deps: s, next: null }),
      (n = pt.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (pt.updateQueue = n),
          (n.lastEffect = e.next = e))
        : ((i = n.lastEffect),
          i === null
            ? (n.lastEffect = e.next = e)
            : ((s = i.next), (i.next = e), (e.next = s), (n.lastEffect = e))),
      e
    );
  }
  function Wh() {
    return Fn().memoizedState;
  }
  function Mu(e, n, i, s) {
    var a = Er();
    ((pt.flags |= e),
      (a.memoizedState = os(1 | n, i, void 0, s === void 0 ? null : s)));
  }
  function Pu(e, n, i, s) {
    var a = Fn();
    s = s === void 0 ? null : s;
    var h = void 0;
    if (xt !== null) {
      var x = xt.memoizedState;
      if (((h = x.destroy), s !== null && Pc(s, x.deps))) {
        a.memoizedState = os(n, i, h, s);
        return;
      }
    }
    ((pt.flags |= e), (a.memoizedState = os(1 | n, i, h, s)));
  }
  function Qh(e, n) {
    return Mu(8390656, 8, e, n);
  }
  function Lc(e, n) {
    return Pu(2048, 8, e, n);
  }
  function Yh(e, n) {
    return Pu(4, 2, e, n);
  }
  function qh(e, n) {
    return Pu(4, 4, e, n);
  }
  function Xh(e, n) {
    if (typeof n == "function")
      return (
        (e = e()),
        n(e),
        function () {
          n(null);
        }
      );
    if (n != null)
      return (
        (e = e()),
        (n.current = e),
        function () {
          n.current = null;
        }
      );
  }
  function Kh(e, n, i) {
    return (
      (i = i != null ? i.concat([e]) : null),
      Pu(4, 4, Xh.bind(null, n, e), i)
    );
  }
  function zc() {}
  function Zh(e, n) {
    var i = Fn();
    n = n === void 0 ? null : n;
    var s = i.memoizedState;
    return s !== null && n !== null && Pc(n, s[1])
      ? s[0]
      : ((i.memoizedState = [e, n]), e);
  }
  function Gh(e, n) {
    var i = Fn();
    n = n === void 0 ? null : n;
    var s = i.memoizedState;
    return s !== null && n !== null && Pc(n, s[1])
      ? s[0]
      : ((e = e()), (i.memoizedState = [e, n]), e);
  }
  function Jh(e, n, i) {
    return (fi & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (on = !0)), (e.memoizedState = i))
      : (Kn(i, n) ||
          ((i = E()), (pt.lanes |= i), (di |= i), (e.baseState = !0)),
        n);
  }
  function My(e, n) {
    var i = he;
    ((he = i !== 0 && 4 > i ? i : 4), e(!0));
    var s = Mc.transition;
    Mc.transition = {};
    try {
      (e(!1), n());
    } finally {
      ((he = i), (Mc.transition = s));
    }
  }
  function ep() {
    return Fn().memoizedState;
  }
  function Py(e, n, i) {
    var s = No(e);
    if (
      ((i = {
        lane: s,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      tp(e))
    )
      np(n, i);
    else if (((i = Ih(e, n, i, s)), i !== null)) {
      var a = Yt();
      (tr(i, e, s, a), rp(i, n, s));
    }
  }
  function Ry(e, n, i) {
    var s = No(e),
      a = {
        lane: s,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (tp(e)) np(n, a);
    else {
      var h = e.alternate;
      if (
        e.lanes === 0 &&
        (h === null || h.lanes === 0) &&
        ((h = n.lastRenderedReducer), h !== null)
      )
        try {
          var x = n.lastRenderedState,
            N = h(x, i);
          if (((a.hasEagerState = !0), (a.eagerState = N), Kn(N, x))) {
            var R = n.interleaved;
            (R === null
              ? ((a.next = a), kc(n))
              : ((a.next = R.next), (R.next = a)),
              (n.interleaved = a));
            return;
          }
        } catch (V) {
        } finally {
        }
      ((i = Ih(e, n, a, s)),
        i !== null && ((a = Yt()), tr(i, e, s, a), rp(i, n, s)));
    }
  }
  function tp(e) {
    var n = e.alternate;
    return e === pt || (n !== null && n === pt);
  }
  function np(e, n) {
    ts = Tu = !0;
    var i = e.pending;
    (i === null ? (n.next = n) : ((n.next = i.next), (i.next = n)),
      (e.pending = n));
  }
  function rp(e, n, i) {
    if ((i & 4194240) !== 0) {
      var s = n.lanes;
      ((s &= e.pendingLanes), (i |= s), (n.lanes = i), se(e, i));
    }
  }
  var Ru = {
      readContext: In,
      useCallback: jt,
      useContext: jt,
      useEffect: jt,
      useImperativeHandle: jt,
      useInsertionEffect: jt,
      useLayoutEffect: jt,
      useMemo: jt,
      useReducer: jt,
      useRef: jt,
      useState: jt,
      useDebugValue: jt,
      useDeferredValue: jt,
      useTransition: jt,
      useMutableSource: jt,
      useSyncExternalStore: jt,
      useId: jt,
      unstable_isNewReconciler: !1,
    },
    $y = {
      readContext: In,
      useCallback: function (e, n) {
        return ((Er().memoizedState = [e, n === void 0 ? null : n]), e);
      },
      useContext: In,
      useEffect: Qh,
      useImperativeHandle: function (e, n, i) {
        return (
          (i = i != null ? i.concat([e]) : null),
          Mu(4194308, 4, Xh.bind(null, n, e), i)
        );
      },
      useLayoutEffect: function (e, n) {
        return Mu(4194308, 4, e, n);
      },
      useInsertionEffect: function (e, n) {
        return Mu(4, 2, e, n);
      },
      useMemo: function (e, n) {
        var i = Er();
        return (
          (n = n === void 0 ? null : n),
          (e = e()),
          (i.memoizedState = [e, n]),
          e
        );
      },
      useReducer: function (e, n, i) {
        var s = Er();
        return (
          (n = i !== void 0 ? i(n) : n),
          (s.memoizedState = s.baseState = n),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (s.queue = e),
          (e = e.dispatch = Py.bind(null, pt, e)),
          [s.memoizedState, e]
        );
      },
      useRef: function (e) {
        var n = Er();
        return ((e = { current: e }), (n.memoizedState = e));
      },
      useState: Hh,
      useDebugValue: zc,
      useDeferredValue: function (e) {
        return (Er().memoizedState = e);
      },
      useTransition: function () {
        var e = Hh(!1),
          n = e[0];
        return ((e = My.bind(null, e[1])), (Er().memoizedState = e), [n, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, n, i) {
        var s = pt,
          a = Er();
        if (ft) {
          if (i === void 0) throw Error(o(407));
          i = i();
        } else {
          if (((i = n()), Et === null)) throw Error(o(349));
          (fi & 30) !== 0 || Ah(s, n, i);
        }
        a.memoizedState = i;
        var h = { value: i, getSnapshot: n };
        return (
          (a.queue = h),
          Qh(bh.bind(null, s, h, e), [e]),
          (s.flags |= 2048),
          os(9, Uh.bind(null, s, h, i, n), void 0, null),
          i
        );
      },
      useId: function () {
        var e = Er(),
          n = Et.identifierPrefix;
        if (ft) {
          var i = Zr,
            s = Kr;
          ((i = (s & ~(1 << (32 - wt(s) - 1))).toString(32) + i),
            (n = ":" + n + "R" + i),
            (i = ns++),
            0 < i && (n += "H" + i.toString(32)),
            (n += ":"));
        } else ((i = Ty++), (n = ":" + n + "r" + i.toString(32) + ":"));
        return (e.memoizedState = n);
      },
      unstable_isNewReconciler: !1,
    },
    Iy = {
      readContext: In,
      useCallback: Zh,
      useContext: In,
      useEffect: Lc,
      useImperativeHandle: Kh,
      useInsertionEffect: Yh,
      useLayoutEffect: qh,
      useMemo: Gh,
      useReducer: Ic,
      useRef: Wh,
      useState: function () {
        return Ic(rs);
      },
      useDebugValue: zc,
      useDeferredValue: function (e) {
        var n = Fn();
        return Jh(n, xt.memoizedState, e);
      },
      useTransition: function () {
        var e = Ic(rs)[0],
          n = Fn().memoizedState;
        return [e, n];
      },
      useMutableSource: Oh,
      useSyncExternalStore: jh,
      useId: ep,
      unstable_isNewReconciler: !1,
    },
    Fy = {
      readContext: In,
      useCallback: Zh,
      useContext: In,
      useEffect: Lc,
      useImperativeHandle: Kh,
      useInsertionEffect: Yh,
      useLayoutEffect: qh,
      useMemo: Gh,
      useReducer: Fc,
      useRef: Wh,
      useState: function () {
        return Fc(rs);
      },
      useDebugValue: zc,
      useDeferredValue: function (e) {
        var n = Fn();
        return xt === null ? (n.memoizedState = e) : Jh(n, xt.memoizedState, e);
      },
      useTransition: function () {
        var e = Fc(rs)[0],
          n = Fn().memoizedState;
        return [e, n];
      },
      useMutableSource: Oh,
      useSyncExternalStore: jh,
      useId: ep,
      unstable_isNewReconciler: !1,
    };
  function Gn(e, n) {
    if (e && e.defaultProps) {
      ((n = de({}, n)), (e = e.defaultProps));
      for (var i in e) n[i] === void 0 && (n[i] = e[i]);
      return n;
    }
    return n;
  }
  function Dc(e, n, i, s) {
    ((n = e.memoizedState),
      (i = i(s, n)),
      (i = i == null ? n : de({}, n, i)),
      (e.memoizedState = i),
      e.lanes === 0 && (e.updateQueue.baseState = i));
  }
  var $u = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? Hn(e) === e : !1;
    },
    enqueueSetState: function (e, n, i) {
      e = e._reactInternals;
      var s = Yt(),
        a = No(e),
        h = Jr(s, a);
      ((h.payload = n),
        i != null && (h.callback = i),
        (n = ko(e, h, a)),
        n !== null && (tr(n, e, a, s), _u(n, e, a)));
    },
    enqueueReplaceState: function (e, n, i) {
      e = e._reactInternals;
      var s = Yt(),
        a = No(e),
        h = Jr(s, a);
      ((h.tag = 1),
        (h.payload = n),
        i != null && (h.callback = i),
        (n = ko(e, h, a)),
        n !== null && (tr(n, e, a, s), _u(n, e, a)));
    },
    enqueueForceUpdate: function (e, n) {
      e = e._reactInternals;
      var i = Yt(),
        s = No(e),
        a = Jr(i, s);
      ((a.tag = 2),
        n != null && (a.callback = n),
        (n = ko(e, a, s)),
        n !== null && (tr(n, e, s, i), _u(n, e, s)));
    },
  };
  function op(e, n, i, s, a, h, x) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(s, h, x)
        : n.prototype && n.prototype.isPureReactComponent
          ? !Hl(i, s) || !Hl(a, h)
          : !0
    );
  }
  function ip(e, n, i) {
    var s = !1,
      a = wo,
      h = n.contextType;
    return (
      typeof h == "object" && h !== null
        ? (h = In(h))
        : ((a = rn(n) ? li : Ot.current),
          (s = n.contextTypes),
          (h = (s = s != null) ? el(e, a) : wo)),
      (n = new n(i, h)),
      (e.memoizedState =
        n.state !== null && n.state !== void 0 ? n.state : null),
      (n.updater = $u),
      (e.stateNode = n),
      (n._reactInternals = e),
      s &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = a),
        (e.__reactInternalMemoizedMaskedChildContext = h)),
      n
    );
  }
  function lp(e, n, i, s) {
    ((e = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(i, s),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(i, s),
      n.state !== e && $u.enqueueReplaceState(n, n.state, null));
  }
  function Oc(e, n, i, s) {
    var a = e.stateNode;
    ((a.props = i), (a.state = e.memoizedState), (a.refs = {}), _c(e));
    var h = n.contextType;
    (typeof h == "object" && h !== null
      ? (a.context = In(h))
      : ((h = rn(n) ? li : Ot.current), (a.context = el(e, h))),
      (a.state = e.memoizedState),
      (h = n.getDerivedStateFromProps),
      typeof h == "function" && (Dc(e, n, h, i), (a.state = e.memoizedState)),
      typeof n.getDerivedStateFromProps == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function" ||
        (typeof a.UNSAFE_componentWillMount != "function" &&
          typeof a.componentWillMount != "function") ||
        ((n = a.state),
        typeof a.componentWillMount == "function" && a.componentWillMount(),
        typeof a.UNSAFE_componentWillMount == "function" &&
          a.UNSAFE_componentWillMount(),
        n !== a.state && $u.enqueueReplaceState(a, a.state, null),
        Cu(e, i, a, s),
        (a.state = e.memoizedState)),
      typeof a.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function ul(e, n) {
    try {
      var i = "",
        s = n;
      do ((i += ze(s)), (s = s.return));
      while (s);
      var a = i;
    } catch (h) {
      a =
        `
Error generating stack: ` +
        h.message +
        `
` +
        h.stack;
    }
    return { value: e, source: n, stack: a, digest: null };
  }
  function jc(e, n, i) {
    return {
      value: e,
      source: null,
      stack: i != null ? i : null,
      digest: n != null ? n : null,
    };
  }
  function Ac(e, n) {
    try {
      console.error(n.value);
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  var Ly = typeof WeakMap == "function" ? WeakMap : Map;
  function sp(e, n, i) {
    ((i = Jr(-1, i)), (i.tag = 3), (i.payload = { element: null }));
    var s = n.value;
    return (
      (i.callback = function () {
        (ju || ((ju = !0), (ef = s)), Ac(e, n));
      }),
      i
    );
  }
  function up(e, n, i) {
    ((i = Jr(-1, i)), (i.tag = 3));
    var s = e.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var a = n.value;
      ((i.payload = function () {
        return s(a);
      }),
        (i.callback = function () {
          Ac(e, n);
        }));
    }
    var h = e.stateNode;
    return (
      h !== null &&
        typeof h.componentDidCatch == "function" &&
        (i.callback = function () {
          (Ac(e, n),
            typeof s != "function" &&
              (Co === null ? (Co = new Set([this])) : Co.add(this)));
          var x = n.stack;
          this.componentDidCatch(n.value, {
            componentStack: x !== null ? x : "",
          });
        }),
      i
    );
  }
  function ap(e, n, i) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new Ly();
      var a = new Set();
      s.set(n, a);
    } else ((a = s.get(n)), a === void 0 && ((a = new Set()), s.set(n, a)));
    a.has(i) || (a.add(i), (e = qy.bind(null, e, n, i)), n.then(e, e));
  }
  function cp(e) {
    do {
      var n;
      if (
        ((n = e.tag === 13) &&
          ((n = e.memoizedState),
          (n = n !== null ? n.dehydrated !== null : !0)),
        n)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function fp(e, n, i, s, a) {
    return (e.mode & 1) === 0
      ? (e === n
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (i.flags |= 131072),
            (i.flags &= -52805),
            i.tag === 1 &&
              (i.alternate === null
                ? (i.tag = 17)
                : ((n = Jr(-1, 1)), (n.tag = 2), ko(i, n, 1))),
            (i.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = a), e);
  }
  var zy = Y.ReactCurrentOwner,
    on = !1;
  function Qt(e, n, i, s) {
    n.child = e === null ? $h(n, null, i, s) : ol(n, e.child, i, s);
  }
  function dp(e, n, i, s, a) {
    i = i.render;
    var h = n.ref;
    return (
      ll(n, a),
      (s = Rc(e, n, i, s, h, a)),
      (i = $c()),
      e !== null && !on
        ? ((n.updateQueue = e.updateQueue),
          (n.flags &= -2053),
          (e.lanes &= ~a),
          eo(e, n, a))
        : (ft && i && hc(n), (n.flags |= 1), Qt(e, n, s, a), n.child)
    );
  }
  function hp(e, n, i, s, a) {
    if (e === null) {
      var h = i.type;
      return typeof h == "function" &&
        !uf(h) &&
        h.defaultProps === void 0 &&
        i.compare === null &&
        i.defaultProps === void 0
        ? ((n.tag = 15), (n.type = h), pp(e, n, h, s, a))
        : ((e = Hu(i.type, null, s, n, n.mode, a)),
          (e.ref = n.ref),
          (e.return = n),
          (n.child = e));
    }
    if (((h = e.child), (e.lanes & a) === 0)) {
      var x = h.memoizedProps;
      if (
        ((i = i.compare), (i = i !== null ? i : Hl), i(x, s) && e.ref === n.ref)
      )
        return eo(e, n, a);
    }
    return (
      (n.flags |= 1),
      (e = Mo(h, s)),
      (e.ref = n.ref),
      (e.return = n),
      (n.child = e)
    );
  }
  function pp(e, n, i, s, a) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (Hl(h, s) && e.ref === n.ref)
        if (((on = !1), (n.pendingProps = s = h), (e.lanes & a) !== 0))
          (e.flags & 131072) !== 0 && (on = !0);
        else return ((n.lanes = e.lanes), eo(e, n, a));
    }
    return Uc(e, n, i, s, a);
  }
  function mp(e, n, i) {
    var s = n.pendingProps,
      a = s.children,
      h = e !== null ? e.memoizedState : null;
    if (s.mode === "hidden")
      if ((n.mode & 1) === 0)
        ((n.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          st(cl, kn),
          (kn |= i));
      else {
        if ((i & 1073741824) === 0)
          return (
            (e = h !== null ? h.baseLanes | i : i),
            (n.lanes = n.childLanes = 1073741824),
            (n.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (n.updateQueue = null),
            st(cl, kn),
            (kn |= e),
            null
          );
        ((n.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (s = h !== null ? h.baseLanes : i),
          st(cl, kn),
          (kn |= s));
      }
    else
      (h !== null ? ((s = h.baseLanes | i), (n.memoizedState = null)) : (s = i),
        st(cl, kn),
        (kn |= s));
    return (Qt(e, n, a, i), n.child);
  }
  function gp(e, n) {
    var i = n.ref;
    ((e === null && i !== null) || (e !== null && e.ref !== i)) &&
      ((n.flags |= 512), (n.flags |= 2097152));
  }
  function Uc(e, n, i, s, a) {
    var h = rn(i) ? li : Ot.current;
    return (
      (h = el(n, h)),
      ll(n, a),
      (i = Rc(e, n, i, s, h, a)),
      (s = $c()),
      e !== null && !on
        ? ((n.updateQueue = e.updateQueue),
          (n.flags &= -2053),
          (e.lanes &= ~a),
          eo(e, n, a))
        : (ft && s && hc(n), (n.flags |= 1), Qt(e, n, i, a), n.child)
    );
  }
  function yp(e, n, i, s, a) {
    if (rn(i)) {
      var h = !0;
      mu(n);
    } else h = !1;
    if ((ll(n, a), n.stateNode === null))
      (Fu(e, n), ip(n, i, s), Oc(n, i, s, a), (s = !0));
    else if (e === null) {
      var x = n.stateNode,
        N = n.memoizedProps;
      x.props = N;
      var R = x.context,
        V = i.contextType;
      typeof V == "object" && V !== null
        ? (V = In(V))
        : ((V = rn(i) ? li : Ot.current), (V = el(n, V)));
      var J = i.getDerivedStateFromProps,
        ne =
          typeof J == "function" ||
          typeof x.getSnapshotBeforeUpdate == "function";
      (ne ||
        (typeof x.UNSAFE_componentWillReceiveProps != "function" &&
          typeof x.componentWillReceiveProps != "function") ||
        ((N !== s || R !== V) && lp(n, x, s, V)),
        (So = !1));
      var Z = n.memoizedState;
      ((x.state = Z),
        Cu(n, s, x, a),
        (R = n.memoizedState),
        N !== s || Z !== R || nn.current || So
          ? (typeof J == "function" && (Dc(n, i, J, s), (R = n.memoizedState)),
            (N = So || op(n, i, N, s, Z, R, V))
              ? (ne ||
                  (typeof x.UNSAFE_componentWillMount != "function" &&
                    typeof x.componentWillMount != "function") ||
                  (typeof x.componentWillMount == "function" &&
                    x.componentWillMount(),
                  typeof x.UNSAFE_componentWillMount == "function" &&
                    x.UNSAFE_componentWillMount()),
                typeof x.componentDidMount == "function" &&
                  (n.flags |= 4194308))
              : (typeof x.componentDidMount == "function" &&
                  (n.flags |= 4194308),
                (n.memoizedProps = s),
                (n.memoizedState = R)),
            (x.props = s),
            (x.state = R),
            (x.context = V),
            (s = N))
          : (typeof x.componentDidMount == "function" && (n.flags |= 4194308),
            (s = !1)));
    } else {
      ((x = n.stateNode),
        Fh(e, n),
        (N = n.memoizedProps),
        (V = n.type === n.elementType ? N : Gn(n.type, N)),
        (x.props = V),
        (ne = n.pendingProps),
        (Z = x.context),
        (R = i.contextType),
        typeof R == "object" && R !== null
          ? (R = In(R))
          : ((R = rn(i) ? li : Ot.current), (R = el(n, R))));
      var pe = i.getDerivedStateFromProps;
      ((J =
        typeof pe == "function" ||
        typeof x.getSnapshotBeforeUpdate == "function") ||
        (typeof x.UNSAFE_componentWillReceiveProps != "function" &&
          typeof x.componentWillReceiveProps != "function") ||
        ((N !== ne || Z !== R) && lp(n, x, s, R)),
        (So = !1),
        (Z = n.memoizedState),
        (x.state = Z),
        Cu(n, s, x, a));
      var ye = n.memoizedState;
      N !== ne || Z !== ye || nn.current || So
        ? (typeof pe == "function" && (Dc(n, i, pe, s), (ye = n.memoizedState)),
          (V = So || op(n, i, V, s, Z, ye, R) || !1)
            ? (J ||
                (typeof x.UNSAFE_componentWillUpdate != "function" &&
                  typeof x.componentWillUpdate != "function") ||
                (typeof x.componentWillUpdate == "function" &&
                  x.componentWillUpdate(s, ye, R),
                typeof x.UNSAFE_componentWillUpdate == "function" &&
                  x.UNSAFE_componentWillUpdate(s, ye, R)),
              typeof x.componentDidUpdate == "function" && (n.flags |= 4),
              typeof x.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof x.componentDidUpdate != "function" ||
                (N === e.memoizedProps && Z === e.memoizedState) ||
                (n.flags |= 4),
              typeof x.getSnapshotBeforeUpdate != "function" ||
                (N === e.memoizedProps && Z === e.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = s),
              (n.memoizedState = ye)),
          (x.props = s),
          (x.state = ye),
          (x.context = R),
          (s = V))
        : (typeof x.componentDidUpdate != "function" ||
            (N === e.memoizedProps && Z === e.memoizedState) ||
            (n.flags |= 4),
          typeof x.getSnapshotBeforeUpdate != "function" ||
            (N === e.memoizedProps && Z === e.memoizedState) ||
            (n.flags |= 1024),
          (s = !1));
    }
    return bc(e, n, i, s, h, a);
  }
  function bc(e, n, i, s, a, h) {
    gp(e, n);
    var x = (n.flags & 128) !== 0;
    if (!s && !x) return (a && kh(n, i, !1), eo(e, n, h));
    ((s = n.stateNode), (zy.current = n));
    var N =
      x && typeof i.getDerivedStateFromError != "function" ? null : s.render();
    return (
      (n.flags |= 1),
      e !== null && x
        ? ((n.child = ol(n, e.child, null, h)), (n.child = ol(n, null, N, h)))
        : Qt(e, n, N, h),
      (n.memoizedState = s.state),
      a && kh(n, i, !0),
      n.child
    );
  }
  function vp(e) {
    var n = e.stateNode;
    (n.pendingContext
      ? xh(e, n.pendingContext, n.pendingContext !== n.context)
      : n.context && xh(e, n.context, !1),
      Cc(e, n.containerInfo));
  }
  function wp(e, n, i, s, a) {
    return (rl(), yc(a), (n.flags |= 256), Qt(e, n, i, s), n.child);
  }
  var Bc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Vc(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function xp(e, n, i) {
    var s = n.pendingProps,
      a = ht.current,
      h = !1,
      x = (n.flags & 128) !== 0,
      N;
    if (
      ((N = x) ||
        (N = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0),
      N
        ? ((h = !0), (n.flags &= -129))
        : (e === null || e.memoizedState !== null) && (a |= 1),
      st(ht, a & 1),
      e === null)
    )
      return (
        gc(n),
        (e = n.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((n.mode & 1) === 0
              ? (n.lanes = 1)
              : e.data === "$!"
                ? (n.lanes = 8)
                : (n.lanes = 1073741824),
            null)
          : ((x = s.children),
            (e = s.fallback),
            h
              ? ((s = n.mode),
                (h = n.child),
                (x = { mode: "hidden", children: x }),
                (s & 1) === 0 && h !== null
                  ? ((h.childLanes = 0), (h.pendingProps = x))
                  : (h = Wu(x, s, 0, null)),
                (e = gi(e, s, i, null)),
                (h.return = n),
                (e.return = n),
                (h.sibling = e),
                (n.child = h),
                (n.child.memoizedState = Vc(i)),
                (n.memoizedState = Bc),
                e)
              : Hc(n, x))
      );
    if (((a = e.memoizedState), a !== null && ((N = a.dehydrated), N !== null)))
      return Dy(e, n, x, s, N, a, i);
    if (h) {
      ((h = s.fallback), (x = n.mode), (a = e.child), (N = a.sibling));
      var R = { mode: "hidden", children: s.children };
      return (
        (x & 1) === 0 && n.child !== a
          ? ((s = n.child),
            (s.childLanes = 0),
            (s.pendingProps = R),
            (n.deletions = null))
          : ((s = Mo(a, R)), (s.subtreeFlags = a.subtreeFlags & 14680064)),
        N !== null ? (h = Mo(N, h)) : ((h = gi(h, x, i, null)), (h.flags |= 2)),
        (h.return = n),
        (s.return = n),
        (s.sibling = h),
        (n.child = s),
        (s = h),
        (h = n.child),
        (x = e.child.memoizedState),
        (x =
          x === null
            ? Vc(i)
            : {
                baseLanes: x.baseLanes | i,
                cachePool: null,
                transitions: x.transitions,
              }),
        (h.memoizedState = x),
        (h.childLanes = e.childLanes & ~i),
        (n.memoizedState = Bc),
        s
      );
    }
    return (
      (h = e.child),
      (e = h.sibling),
      (s = Mo(h, { mode: "visible", children: s.children })),
      (n.mode & 1) === 0 && (s.lanes = i),
      (s.return = n),
      (s.sibling = null),
      e !== null &&
        ((i = n.deletions),
        i === null ? ((n.deletions = [e]), (n.flags |= 16)) : i.push(e)),
      (n.child = s),
      (n.memoizedState = null),
      s
    );
  }
  function Hc(e, n) {
    return (
      (n = Wu({ mode: "visible", children: n }, e.mode, 0, null)),
      (n.return = e),
      (e.child = n)
    );
  }
  function Iu(e, n, i, s) {
    return (
      s !== null && yc(s),
      ol(n, e.child, null, i),
      (e = Hc(n, n.pendingProps.children)),
      (e.flags |= 2),
      (n.memoizedState = null),
      e
    );
  }
  function Dy(e, n, i, s, a, h, x) {
    if (i)
      return n.flags & 256
        ? ((n.flags &= -257), (s = jc(Error(o(422)))), Iu(e, n, x, s))
        : n.memoizedState !== null
          ? ((n.child = e.child), (n.flags |= 128), null)
          : ((h = s.fallback),
            (a = n.mode),
            (s = Wu({ mode: "visible", children: s.children }, a, 0, null)),
            (h = gi(h, a, x, null)),
            (h.flags |= 2),
            (s.return = n),
            (h.return = n),
            (s.sibling = h),
            (n.child = s),
            (n.mode & 1) !== 0 && ol(n, e.child, null, x),
            (n.child.memoizedState = Vc(x)),
            (n.memoizedState = Bc),
            h);
    if ((n.mode & 1) === 0) return Iu(e, n, x, null);
    if (a.data === "$!") {
      if (((s = a.nextSibling && a.nextSibling.dataset), s)) var N = s.dgst;
      return (
        (s = N),
        (h = Error(o(419))),
        (s = jc(h, s, void 0)),
        Iu(e, n, x, s)
      );
    }
    if (((N = (x & e.childLanes) !== 0), on || N)) {
      if (((s = Et), s !== null)) {
        switch (x & -x) {
          case 4:
            a = 2;
            break;
          case 16:
            a = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            a = 32;
            break;
          case 536870912:
            a = 268435456;
            break;
          default:
            a = 0;
        }
        ((a = (a & (s.suspendedLanes | x)) !== 0 ? 0 : a),
          a !== 0 &&
            a !== h.retryLane &&
            ((h.retryLane = a), Gr(e, a), tr(s, e, a, -1)));
      }
      return (sf(), (s = jc(Error(o(421)))), Iu(e, n, x, s));
    }
    return a.data === "$?"
      ? ((n.flags |= 128),
        (n.child = e.child),
        (n = Xy.bind(null, e)),
        (a._reactRetry = n),
        null)
      : ((e = h.treeContext),
        (Sn = yo(a.nextSibling)),
        (xn = n),
        (ft = !0),
        (Zn = null),
        e !== null &&
          ((Rn[$n++] = Kr),
          (Rn[$n++] = Zr),
          (Rn[$n++] = si),
          (Kr = e.id),
          (Zr = e.overflow),
          (si = n)),
        (n = Hc(n, s.children)),
        (n.flags |= 4096),
        n);
  }
  function Sp(e, n, i) {
    e.lanes |= n;
    var s = e.alternate;
    (s !== null && (s.lanes |= n), Sc(e.return, n, i));
  }
  function Wc(e, n, i, s, a) {
    var h = e.memoizedState;
    h === null
      ? (e.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: s,
          tail: i,
          tailMode: a,
        })
      : ((h.isBackwards = n),
        (h.rendering = null),
        (h.renderingStartTime = 0),
        (h.last = s),
        (h.tail = i),
        (h.tailMode = a));
  }
  function kp(e, n, i) {
    var s = n.pendingProps,
      a = s.revealOrder,
      h = s.tail;
    if ((Qt(e, n, s.children, i), (s = ht.current), (s & 2) !== 0))
      ((s = (s & 1) | 2), (n.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = n.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Sp(e, i, n);
          else if (e.tag === 19) Sp(e, i, n);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === n) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === n) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      s &= 1;
    }
    if ((st(ht, s), (n.mode & 1) === 0)) n.memoizedState = null;
    else
      switch (a) {
        case "forwards":
          for (i = n.child, a = null; i !== null; )
            ((e = i.alternate),
              e !== null && Eu(e) === null && (a = i),
              (i = i.sibling));
          ((i = a),
            i === null
              ? ((a = n.child), (n.child = null))
              : ((a = i.sibling), (i.sibling = null)),
            Wc(n, !1, a, i, h));
          break;
        case "backwards":
          for (i = null, a = n.child, n.child = null; a !== null; ) {
            if (((e = a.alternate), e !== null && Eu(e) === null)) {
              n.child = a;
              break;
            }
            ((e = a.sibling), (a.sibling = i), (i = a), (a = e));
          }
          Wc(n, !0, i, null, h);
          break;
        case "together":
          Wc(n, !1, null, null, void 0);
          break;
        default:
          n.memoizedState = null;
      }
    return n.child;
  }
  function Fu(e, n) {
    (n.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (n.alternate = null), (n.flags |= 2));
  }
  function eo(e, n, i) {
    if (
      (e !== null && (n.dependencies = e.dependencies),
      (di |= n.lanes),
      (i & n.childLanes) === 0)
    )
      return null;
    if (e !== null && n.child !== e.child) throw Error(o(153));
    if (n.child !== null) {
      for (
        e = n.child, i = Mo(e, e.pendingProps), n.child = i, i.return = n;
        e.sibling !== null;

      )
        ((e = e.sibling),
          (i = i.sibling = Mo(e, e.pendingProps)),
          (i.return = n));
      i.sibling = null;
    }
    return n.child;
  }
  function Oy(e, n, i) {
    switch (n.tag) {
      case 3:
        (vp(n), rl());
        break;
      case 5:
        Dh(n);
        break;
      case 1:
        rn(n.type) && mu(n);
        break;
      case 4:
        Cc(n, n.stateNode.containerInfo);
        break;
      case 10:
        var s = n.type._context,
          a = n.memoizedProps.value;
        (st(Su, s._currentValue), (s._currentValue = a));
        break;
      case 13:
        if (((s = n.memoizedState), s !== null))
          return s.dehydrated !== null
            ? (st(ht, ht.current & 1), (n.flags |= 128), null)
            : (i & n.child.childLanes) !== 0
              ? xp(e, n, i)
              : (st(ht, ht.current & 1),
                (e = eo(e, n, i)),
                e !== null ? e.sibling : null);
        st(ht, ht.current & 1);
        break;
      case 19:
        if (((s = (i & n.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (s) return kp(e, n, i);
          n.flags |= 128;
        }
        if (
          ((a = n.memoizedState),
          a !== null &&
            ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
          st(ht, ht.current),
          s)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((n.lanes = 0), mp(e, n, i));
    }
    return eo(e, n, i);
  }
  var _p, Qc, Cp, Ep;
  ((_p = function (e, n) {
    for (var i = n.child; i !== null; ) {
      if (i.tag === 5 || i.tag === 6) e.appendChild(i.stateNode);
      else if (i.tag !== 4 && i.child !== null) {
        ((i.child.return = i), (i = i.child));
        continue;
      }
      if (i === n) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === n) return;
        i = i.return;
      }
      ((i.sibling.return = i.return), (i = i.sibling));
    }
  }),
    (Qc = function () {}),
    (Cp = function (e, n, i, s) {
      var a = e.memoizedProps;
      if (a !== s) {
        ((e = n.stateNode), ci(Cr.current));
        var h = null;
        switch (i) {
          case "input":
            ((a = He(e, a)), (s = He(e, s)), (h = []));
            break;
          case "select":
            ((a = de({}, a, { value: void 0 })),
              (s = de({}, s, { value: void 0 })),
              (h = []));
            break;
          case "textarea":
            ((a = qt(e, a)), (s = qt(e, s)), (h = []));
            break;
          default:
            typeof a.onClick != "function" &&
              typeof s.onClick == "function" &&
              (e.onclick = du);
        }
        bo(i, s);
        var x;
        i = null;
        for (V in a)
          if (!s.hasOwnProperty(V) && a.hasOwnProperty(V) && a[V] != null)
            if (V === "style") {
              var N = a[V];
              for (x in N) N.hasOwnProperty(x) && (i || (i = {}), (i[x] = ""));
            } else
              V !== "dangerouslySetInnerHTML" &&
                V !== "children" &&
                V !== "suppressContentEditableWarning" &&
                V !== "suppressHydrationWarning" &&
                V !== "autoFocus" &&
                (u.hasOwnProperty(V)
                  ? h || (h = [])
                  : (h = h || []).push(V, null));
        for (V in s) {
          var R = s[V];
          if (
            ((N = a != null ? a[V] : void 0),
            s.hasOwnProperty(V) && R !== N && (R != null || N != null))
          )
            if (V === "style")
              if (N) {
                for (x in N)
                  !N.hasOwnProperty(x) ||
                    (R && R.hasOwnProperty(x)) ||
                    (i || (i = {}), (i[x] = ""));
                for (x in R)
                  R.hasOwnProperty(x) &&
                    N[x] !== R[x] &&
                    (i || (i = {}), (i[x] = R[x]));
              } else (i || (h || (h = []), h.push(V, i)), (i = R));
            else
              V === "dangerouslySetInnerHTML"
                ? ((R = R ? R.__html : void 0),
                  (N = N ? N.__html : void 0),
                  R != null && N !== R && (h = h || []).push(V, R))
                : V === "children"
                  ? (typeof R != "string" && typeof R != "number") ||
                    (h = h || []).push(V, "" + R)
                  : V !== "suppressContentEditableWarning" &&
                    V !== "suppressHydrationWarning" &&
                    (u.hasOwnProperty(V)
                      ? (R != null && V === "onScroll" && ut("scroll", e),
                        h || N === R || (h = []))
                      : (h = h || []).push(V, R));
        }
        i && (h = h || []).push("style", i);
        var V = h;
        (n.updateQueue = V) && (n.flags |= 4);
      }
    }),
    (Ep = function (e, n, i, s) {
      i !== s && (n.flags |= 4);
    }));
  function is(e, n) {
    if (!ft)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var i = null; n !== null; )
            (n.alternate !== null && (i = n), (n = n.sibling));
          i === null ? (e.tail = null) : (i.sibling = null);
          break;
        case "collapsed":
          i = e.tail;
          for (var s = null; i !== null; )
            (i.alternate !== null && (s = i), (i = i.sibling));
          s === null
            ? n || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (s.sibling = null);
      }
  }
  function At(e) {
    var n = e.alternate !== null && e.alternate.child === e.child,
      i = 0,
      s = 0;
    if (n)
      for (var a = e.child; a !== null; )
        ((i |= a.lanes | a.childLanes),
          (s |= a.subtreeFlags & 14680064),
          (s |= a.flags & 14680064),
          (a.return = e),
          (a = a.sibling));
    else
      for (a = e.child; a !== null; )
        ((i |= a.lanes | a.childLanes),
          (s |= a.subtreeFlags),
          (s |= a.flags),
          (a.return = e),
          (a = a.sibling));
    return ((e.subtreeFlags |= s), (e.childLanes = i), n);
  }
  function jy(e, n, i) {
    var s = n.pendingProps;
    switch ((pc(n), n.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (At(n), null);
      case 1:
        return (rn(n.type) && pu(), At(n), null);
      case 3:
        return (
          (s = n.stateNode),
          sl(),
          at(nn),
          at(Ot),
          Tc(),
          s.pendingContext &&
            ((s.context = s.pendingContext), (s.pendingContext = null)),
          (e === null || e.child === null) &&
            (wu(n)
              ? (n.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), Zn !== null && (rf(Zn), (Zn = null)))),
          Qc(e, n),
          At(n),
          null
        );
      case 5:
        Ec(n);
        var a = ci(es.current);
        if (((i = n.type), e !== null && n.stateNode != null))
          (Cp(e, n, i, s, a),
            e.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152)));
        else {
          if (!s) {
            if (n.stateNode === null) throw Error(o(166));
            return (At(n), null);
          }
          if (((e = ci(Cr.current)), wu(n))) {
            ((s = n.stateNode), (i = n.type));
            var h = n.memoizedProps;
            switch (((s[_r] = n), (s[Xl] = h), (e = (n.mode & 1) !== 0), i)) {
              case "dialog":
                (ut("cancel", s), ut("close", s));
                break;
              case "iframe":
              case "object":
              case "embed":
                ut("load", s);
                break;
              case "video":
              case "audio":
                for (a = 0; a < Ql.length; a++) ut(Ql[a], s);
                break;
              case "source":
                ut("error", s);
                break;
              case "img":
              case "image":
              case "link":
                (ut("error", s), ut("load", s));
                break;
              case "details":
                ut("toggle", s);
                break;
              case "input":
                (gt(s, h), ut("invalid", s));
                break;
              case "select":
                ((s._wrapperState = { wasMultiple: !!h.multiple }),
                  ut("invalid", s));
                break;
              case "textarea":
                (_t(s, h), ut("invalid", s));
            }
            (bo(i, h), (a = null));
            for (var x in h)
              if (h.hasOwnProperty(x)) {
                var N = h[x];
                x === "children"
                  ? typeof N == "string"
                    ? s.textContent !== N &&
                      (h.suppressHydrationWarning !== !0 &&
                        fu(s.textContent, N, e),
                      (a = ["children", N]))
                    : typeof N == "number" &&
                      s.textContent !== "" + N &&
                      (h.suppressHydrationWarning !== !0 &&
                        fu(s.textContent, N, e),
                      (a = ["children", "" + N]))
                  : u.hasOwnProperty(x) &&
                    N != null &&
                    x === "onScroll" &&
                    ut("scroll", s);
              }
            switch (i) {
              case "input":
                ($e(s), Nn(s, h, !0));
                break;
              case "textarea":
                ($e(s), Oo(s));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof h.onClick == "function" && (s.onclick = du);
            }
            ((s = a), (n.updateQueue = s), s !== null && (n.flags |= 4));
          } else {
            ((x = a.nodeType === 9 ? a : a.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = jo(i)),
              e === "http://www.w3.org/1999/xhtml"
                ? i === "script"
                  ? ((e = x.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof s.is == "string"
                    ? (e = x.createElement(i, { is: s.is }))
                    : ((e = x.createElement(i)),
                      i === "select" &&
                        ((x = e),
                        s.multiple
                          ? (x.multiple = !0)
                          : s.size && (x.size = s.size)))
                : (e = x.createElementNS(e, i)),
              (e[_r] = n),
              (e[Xl] = s),
              _p(e, n, !1, !1),
              (n.stateNode = e));
            e: {
              switch (((x = Bo(i, s)), i)) {
                case "dialog":
                  (ut("cancel", e), ut("close", e), (a = s));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (ut("load", e), (a = s));
                  break;
                case "video":
                case "audio":
                  for (a = 0; a < Ql.length; a++) ut(Ql[a], e);
                  a = s;
                  break;
                case "source":
                  (ut("error", e), (a = s));
                  break;
                case "img":
                case "image":
                case "link":
                  (ut("error", e), ut("load", e), (a = s));
                  break;
                case "details":
                  (ut("toggle", e), (a = s));
                  break;
                case "input":
                  (gt(e, s), (a = He(e, s)), ut("invalid", e));
                  break;
                case "option":
                  a = s;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!s.multiple }),
                    (a = de({}, s, { value: void 0 })),
                    ut("invalid", e));
                  break;
                case "textarea":
                  (_t(e, s), (a = qt(e, s)), ut("invalid", e));
                  break;
                default:
                  a = s;
              }
              (bo(i, a), (N = a));
              for (h in N)
                if (N.hasOwnProperty(h)) {
                  var R = N[h];
                  h === "style"
                    ? Ii(e, R)
                    : h === "dangerouslySetInnerHTML"
                      ? ((R = R ? R.__html : void 0), R != null && Ao(e, R))
                      : h === "children"
                        ? typeof R == "string"
                          ? (i !== "textarea" || R !== "") && sr(e, R)
                          : typeof R == "number" && sr(e, "" + R)
                        : h !== "suppressContentEditableWarning" &&
                          h !== "suppressHydrationWarning" &&
                          h !== "autoFocus" &&
                          (u.hasOwnProperty(h)
                            ? R != null && h === "onScroll" && ut("scroll", e)
                            : R != null && H(e, h, R, x));
                }
              switch (i) {
                case "input":
                  ($e(e), Nn(e, s, !1));
                  break;
                case "textarea":
                  ($e(e), Oo(e));
                  break;
                case "option":
                  s.value != null && e.setAttribute("value", "" + Ve(s.value));
                  break;
                case "select":
                  ((e.multiple = !!s.multiple),
                    (h = s.value),
                    h != null
                      ? bn(e, !!s.multiple, h, !1)
                      : s.defaultValue != null &&
                        bn(e, !!s.multiple, s.defaultValue, !0));
                  break;
                default:
                  typeof a.onClick == "function" && (e.onclick = du);
              }
              switch (i) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s = !!s.autoFocus;
                  break e;
                case "img":
                  s = !0;
                  break e;
                default:
                  s = !1;
              }
            }
            s && (n.flags |= 4);
          }
          n.ref !== null && ((n.flags |= 512), (n.flags |= 2097152));
        }
        return (At(n), null);
      case 6:
        if (e && n.stateNode != null) Ep(e, n, e.memoizedProps, s);
        else {
          if (typeof s != "string" && n.stateNode === null) throw Error(o(166));
          if (((i = ci(es.current)), ci(Cr.current), wu(n))) {
            if (
              ((s = n.stateNode),
              (i = n.memoizedProps),
              (s[_r] = n),
              (h = s.nodeValue !== i) && ((e = xn), e !== null))
            )
              switch (e.tag) {
                case 3:
                  fu(s.nodeValue, i, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    fu(s.nodeValue, i, (e.mode & 1) !== 0);
              }
            h && (n.flags |= 4);
          } else
            ((s = (i.nodeType === 9 ? i : i.ownerDocument).createTextNode(s)),
              (s[_r] = n),
              (n.stateNode = s));
        }
        return (At(n), null);
      case 13:
        if (
          (at(ht),
          (s = n.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (ft && Sn !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0)
            (Mh(), rl(), (n.flags |= 98560), (h = !1));
          else if (((h = wu(n)), s !== null && s.dehydrated !== null)) {
            if (e === null) {
              if (!h) throw Error(o(318));
              if (
                ((h = n.memoizedState),
                (h = h !== null ? h.dehydrated : null),
                !h)
              )
                throw Error(o(317));
              h[_r] = n;
            } else
              (rl(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (At(n), (h = !1));
          } else (Zn !== null && (rf(Zn), (Zn = null)), (h = !0));
          if (!h) return n.flags & 65536 ? n : null;
        }
        return (n.flags & 128) !== 0
          ? ((n.lanes = i), n)
          : ((s = s !== null),
            s !== (e !== null && e.memoizedState !== null) &&
              s &&
              ((n.child.flags |= 8192),
              (n.mode & 1) !== 0 &&
                (e === null || (ht.current & 1) !== 0
                  ? St === 0 && (St = 3)
                  : sf())),
            n.updateQueue !== null && (n.flags |= 4),
            At(n),
            null);
      case 4:
        return (
          sl(),
          Qc(e, n),
          e === null && Yl(n.stateNode.containerInfo),
          At(n),
          null
        );
      case 10:
        return (xc(n.type._context), At(n), null);
      case 17:
        return (rn(n.type) && pu(), At(n), null);
      case 19:
        if ((at(ht), (h = n.memoizedState), h === null)) return (At(n), null);
        if (((s = (n.flags & 128) !== 0), (x = h.rendering), x === null))
          if (s) is(h, !1);
          else {
            if (St !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = n.child; e !== null; ) {
                if (((x = Eu(e)), x !== null)) {
                  for (
                    n.flags |= 128,
                      is(h, !1),
                      s = x.updateQueue,
                      s !== null && ((n.updateQueue = s), (n.flags |= 4)),
                      n.subtreeFlags = 0,
                      s = i,
                      i = n.child;
                    i !== null;

                  )
                    ((h = i),
                      (e = s),
                      (h.flags &= 14680066),
                      (x = h.alternate),
                      x === null
                        ? ((h.childLanes = 0),
                          (h.lanes = e),
                          (h.child = null),
                          (h.subtreeFlags = 0),
                          (h.memoizedProps = null),
                          (h.memoizedState = null),
                          (h.updateQueue = null),
                          (h.dependencies = null),
                          (h.stateNode = null))
                        : ((h.childLanes = x.childLanes),
                          (h.lanes = x.lanes),
                          (h.child = x.child),
                          (h.subtreeFlags = 0),
                          (h.deletions = null),
                          (h.memoizedProps = x.memoizedProps),
                          (h.memoizedState = x.memoizedState),
                          (h.updateQueue = x.updateQueue),
                          (h.type = x.type),
                          (e = x.dependencies),
                          (h.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (i = i.sibling));
                  return (st(ht, (ht.current & 1) | 2), n.child);
                }
                e = e.sibling;
              }
            h.tail !== null &&
              ot() > fl &&
              ((n.flags |= 128), (s = !0), is(h, !1), (n.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = Eu(x)), e !== null)) {
              if (
                ((n.flags |= 128),
                (s = !0),
                (i = e.updateQueue),
                i !== null && ((n.updateQueue = i), (n.flags |= 4)),
                is(h, !0),
                h.tail === null &&
                  h.tailMode === "hidden" &&
                  !x.alternate &&
                  !ft)
              )
                return (At(n), null);
            } else
              2 * ot() - h.renderingStartTime > fl &&
                i !== 1073741824 &&
                ((n.flags |= 128), (s = !0), is(h, !1), (n.lanes = 4194304));
          h.isBackwards
            ? ((x.sibling = n.child), (n.child = x))
            : ((i = h.last),
              i !== null ? (i.sibling = x) : (n.child = x),
              (h.last = x));
        }
        return h.tail !== null
          ? ((n = h.tail),
            (h.rendering = n),
            (h.tail = n.sibling),
            (h.renderingStartTime = ot()),
            (n.sibling = null),
            (i = ht.current),
            st(ht, s ? (i & 1) | 2 : i & 1),
            n)
          : (At(n), null);
      case 22:
      case 23:
        return (
          lf(),
          (s = n.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== s && (n.flags |= 8192),
          s && (n.mode & 1) !== 0
            ? (kn & 1073741824) !== 0 &&
              (At(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : At(n),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function Ay(e, n) {
    switch ((pc(n), n.tag)) {
      case 1:
        return (
          rn(n.type) && pu(),
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 3:
        return (
          sl(),
          at(nn),
          at(Ot),
          Tc(),
          (e = n.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((n.flags = (e & -65537) | 128), n)
            : null
        );
      case 5:
        return (Ec(n), null);
      case 13:
        if (
          (at(ht), (e = n.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(o(340));
          rl();
        }
        return (
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        );
      case 19:
        return (at(ht), null);
      case 4:
        return (sl(), null);
      case 10:
        return (xc(n.type._context), null);
      case 22:
      case 23:
        return (lf(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Lu = !1,
    Ut = !1,
    Uy = typeof WeakSet == "function" ? WeakSet : Set,
    ge = null;
  function al(e, n) {
    var i = e.ref;
    if (i !== null)
      if (typeof i == "function")
        try {
          i(null);
        } catch (s) {
          mt(e, n, s);
        }
      else i.current = null;
  }
  function Yc(e, n, i) {
    try {
      i();
    } catch (s) {
      mt(e, n, s);
    }
  }
  var Np = !1;
  function by(e, n) {
    if (((ic = wn), (e = oh()), Za(e))) {
      if ("selectionStart" in e)
        var i = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          i = ((i = e.ownerDocument) && i.defaultView) || window;
          var s = i.getSelection && i.getSelection();
          if (s && s.rangeCount !== 0) {
            i = s.anchorNode;
            var a = s.anchorOffset,
              h = s.focusNode;
            s = s.focusOffset;
            try {
              (i.nodeType, h.nodeType);
            } catch (le) {
              i = null;
              break e;
            }
            var x = 0,
              N = -1,
              R = -1,
              V = 0,
              J = 0,
              ne = e,
              Z = null;
            t: for (;;) {
              for (
                var pe;
                ne !== i || (a !== 0 && ne.nodeType !== 3) || (N = x + a),
                  ne !== h || (s !== 0 && ne.nodeType !== 3) || (R = x + s),
                  ne.nodeType === 3 && (x += ne.nodeValue.length),
                  (pe = ne.firstChild) !== null;

              )
                ((Z = ne), (ne = pe));
              for (;;) {
                if (ne === e) break t;
                if (
                  (Z === i && ++V === a && (N = x),
                  Z === h && ++J === s && (R = x),
                  (pe = ne.nextSibling) !== null)
                )
                  break;
                ((ne = Z), (Z = ne.parentNode));
              }
              ne = pe;
            }
            i = N === -1 || R === -1 ? null : { start: N, end: R };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (
      lc = { focusedElem: e, selectionRange: i }, wn = !1, ge = n;
      ge !== null;

    )
      if (
        ((n = ge), (e = n.child), (n.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = n), (ge = e));
      else
        for (; ge !== null; ) {
          n = ge;
          try {
            var ye = n.alternate;
            if ((n.flags & 1024) !== 0)
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (ye !== null) {
                    var we = ye.memoizedProps,
                      yt = ye.memoizedState,
                      j = n.stateNode,
                      I = j.getSnapshotBeforeUpdate(
                        n.elementType === n.type ? we : Gn(n.type, we),
                        yt,
                      );
                    j.__reactInternalSnapshotBeforeUpdate = I;
                  }
                  break;
                case 3:
                  var b = n.stateNode.containerInfo;
                  b.nodeType === 1
                    ? (b.textContent = "")
                    : b.nodeType === 9 &&
                      b.documentElement &&
                      b.removeChild(b.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(o(163));
              }
          } catch (le) {
            mt(n, n.return, le);
          }
          if (((e = n.sibling), e !== null)) {
            ((e.return = n.return), (ge = e));
            break;
          }
          ge = n.return;
        }
    return ((ye = Np), (Np = !1), ye);
  }
  function ls(e, n, i) {
    var s = n.updateQueue;
    if (((s = s !== null ? s.lastEffect : null), s !== null)) {
      var a = (s = s.next);
      do {
        if ((a.tag & e) === e) {
          var h = a.destroy;
          ((a.destroy = void 0), h !== void 0 && Yc(n, i, h));
        }
        a = a.next;
      } while (a !== s);
    }
  }
  function zu(e, n) {
    if (
      ((n = n.updateQueue), (n = n !== null ? n.lastEffect : null), n !== null)
    ) {
      var i = (n = n.next);
      do {
        if ((i.tag & e) === e) {
          var s = i.create;
          i.destroy = s();
        }
        i = i.next;
      } while (i !== n);
    }
  }
  function qc(e) {
    var n = e.ref;
    if (n !== null) {
      var i = e.stateNode;
      switch (e.tag) {
        case 5:
          e = i;
          break;
        default:
          e = i;
      }
      typeof n == "function" ? n(e) : (n.current = e);
    }
  }
  function Tp(e) {
    var n = e.alternate;
    (n !== null && ((e.alternate = null), Tp(n)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((n = e.stateNode),
        n !== null &&
          (delete n[_r],
          delete n[Xl],
          delete n[cc],
          delete n[_y],
          delete n[Cy])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function Mp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Pp(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Mp(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Xc(e, n, i) {
    var s = e.tag;
    if (s === 5 || s === 6)
      ((e = e.stateNode),
        n
          ? i.nodeType === 8
            ? i.parentNode.insertBefore(e, n)
            : i.insertBefore(e, n)
          : (i.nodeType === 8
              ? ((n = i.parentNode), n.insertBefore(e, i))
              : ((n = i), n.appendChild(e)),
            (i = i._reactRootContainer),
            i != null || n.onclick !== null || (n.onclick = du)));
    else if (s !== 4 && ((e = e.child), e !== null))
      for (Xc(e, n, i), e = e.sibling; e !== null; )
        (Xc(e, n, i), (e = e.sibling));
  }
  function Kc(e, n, i) {
    var s = e.tag;
    if (s === 5 || s === 6)
      ((e = e.stateNode), n ? i.insertBefore(e, n) : i.appendChild(e));
    else if (s !== 4 && ((e = e.child), e !== null))
      for (Kc(e, n, i), e = e.sibling; e !== null; )
        (Kc(e, n, i), (e = e.sibling));
  }
  var Rt = null,
    Jn = !1;
  function _o(e, n, i) {
    for (i = i.child; i !== null; ) (Rp(e, n, i), (i = i.sibling));
  }
  function Rp(e, n, i) {
    if (Ht && typeof Ht.onCommitFiberUnmount == "function")
      try {
        Ht.onCommitFiberUnmount(yn, i);
      } catch (N) {}
    switch (i.tag) {
      case 5:
        Ut || al(i, n);
      case 6:
        var s = Rt,
          a = Jn;
        ((Rt = null),
          _o(e, n, i),
          (Rt = s),
          (Jn = a),
          Rt !== null &&
            (Jn
              ? ((e = Rt),
                (i = i.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(i)
                  : e.removeChild(i))
              : Rt.removeChild(i.stateNode)));
        break;
      case 18:
        Rt !== null &&
          (Jn
            ? ((e = Rt),
              (i = i.stateNode),
              e.nodeType === 8
                ? ac(e.parentNode, i)
                : e.nodeType === 1 && ac(e, i),
              xr(e))
            : ac(Rt, i.stateNode));
        break;
      case 4:
        ((s = Rt),
          (a = Jn),
          (Rt = i.stateNode.containerInfo),
          (Jn = !0),
          _o(e, n, i),
          (Rt = s),
          (Jn = a));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Ut &&
          ((s = i.updateQueue), s !== null && ((s = s.lastEffect), s !== null))
        ) {
          a = s = s.next;
          do {
            var h = a,
              x = h.destroy;
            ((h = h.tag),
              x !== void 0 && ((h & 2) !== 0 || (h & 4) !== 0) && Yc(i, n, x),
              (a = a.next));
          } while (a !== s);
        }
        _o(e, n, i);
        break;
      case 1:
        if (
          !Ut &&
          (al(i, n),
          (s = i.stateNode),
          typeof s.componentWillUnmount == "function")
        )
          try {
            ((s.props = i.memoizedProps),
              (s.state = i.memoizedState),
              s.componentWillUnmount());
          } catch (N) {
            mt(i, n, N);
          }
        _o(e, n, i);
        break;
      case 21:
        _o(e, n, i);
        break;
      case 22:
        i.mode & 1
          ? ((Ut = (s = Ut) || i.memoizedState !== null), _o(e, n, i), (Ut = s))
          : _o(e, n, i);
        break;
      default:
        _o(e, n, i);
    }
  }
  function $p(e) {
    var n = e.updateQueue;
    if (n !== null) {
      e.updateQueue = null;
      var i = e.stateNode;
      (i === null && (i = e.stateNode = new Uy()),
        n.forEach(function (s) {
          var a = Ky.bind(null, e, s);
          i.has(s) || (i.add(s), s.then(a, a));
        }));
    }
  }
  function er(e, n) {
    var i = n.deletions;
    if (i !== null)
      for (var s = 0; s < i.length; s++) {
        var a = i[s];
        try {
          var h = e,
            x = n,
            N = x;
          e: for (; N !== null; ) {
            switch (N.tag) {
              case 5:
                ((Rt = N.stateNode), (Jn = !1));
                break e;
              case 3:
                ((Rt = N.stateNode.containerInfo), (Jn = !0));
                break e;
              case 4:
                ((Rt = N.stateNode.containerInfo), (Jn = !0));
                break e;
            }
            N = N.return;
          }
          if (Rt === null) throw Error(o(160));
          (Rp(h, x, a), (Rt = null), (Jn = !1));
          var R = a.alternate;
          (R !== null && (R.return = null), (a.return = null));
        } catch (V) {
          mt(a, n, V);
        }
      }
    if (n.subtreeFlags & 12854)
      for (n = n.child; n !== null; ) (Ip(n, e), (n = n.sibling));
  }
  function Ip(e, n) {
    var i = e.alternate,
      s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((er(n, e), Nr(e), s & 4)) {
          try {
            (ls(3, e, e.return), zu(3, e));
          } catch (we) {
            mt(e, e.return, we);
          }
          try {
            ls(5, e, e.return);
          } catch (we) {
            mt(e, e.return, we);
          }
        }
        break;
      case 1:
        (er(n, e), Nr(e), s & 512 && i !== null && al(i, i.return));
        break;
      case 5:
        if (
          (er(n, e),
          Nr(e),
          s & 512 && i !== null && al(i, i.return),
          e.flags & 32)
        ) {
          var a = e.stateNode;
          try {
            sr(a, "");
          } catch (we) {
            mt(e, e.return, we);
          }
        }
        if (s & 4 && ((a = e.stateNode), a != null)) {
          var h = e.memoizedProps,
            x = i !== null ? i.memoizedProps : h,
            N = e.type,
            R = e.updateQueue;
          if (((e.updateQueue = null), R !== null))
            try {
              (N === "input" &&
                h.type === "radio" &&
                h.name != null &&
                dt(a, h),
                Bo(N, x));
              var V = Bo(N, h);
              for (x = 0; x < R.length; x += 2) {
                var J = R[x],
                  ne = R[x + 1];
                J === "style"
                  ? Ii(a, ne)
                  : J === "dangerouslySetInnerHTML"
                    ? Ao(a, ne)
                    : J === "children"
                      ? sr(a, ne)
                      : H(a, J, ne, V);
              }
              switch (N) {
                case "input":
                  Vt(a, h);
                  break;
                case "textarea":
                  Do(a, h);
                  break;
                case "select":
                  var Z = a._wrapperState.wasMultiple;
                  a._wrapperState.wasMultiple = !!h.multiple;
                  var pe = h.value;
                  pe != null
                    ? bn(a, !!h.multiple, pe, !1)
                    : Z !== !!h.multiple &&
                      (h.defaultValue != null
                        ? bn(a, !!h.multiple, h.defaultValue, !0)
                        : bn(a, !!h.multiple, h.multiple ? [] : "", !1));
              }
              a[Xl] = h;
            } catch (we) {
              mt(e, e.return, we);
            }
        }
        break;
      case 6:
        if ((er(n, e), Nr(e), s & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((a = e.stateNode), (h = e.memoizedProps));
          try {
            a.nodeValue = h;
          } catch (we) {
            mt(e, e.return, we);
          }
        }
        break;
      case 3:
        if (
          (er(n, e), Nr(e), s & 4 && i !== null && i.memoizedState.isDehydrated)
        )
          try {
            xr(n.containerInfo);
          } catch (we) {
            mt(e, e.return, we);
          }
        break;
      case 4:
        (er(n, e), Nr(e));
        break;
      case 13:
        (er(n, e),
          Nr(e),
          (a = e.child),
          a.flags & 8192 &&
            ((h = a.memoizedState !== null),
            (a.stateNode.isHidden = h),
            !h ||
              (a.alternate !== null && a.alternate.memoizedState !== null) ||
              (Jc = ot())),
          s & 4 && $p(e));
        break;
      case 22:
        if (
          ((J = i !== null && i.memoizedState !== null),
          e.mode & 1 ? ((Ut = (V = Ut) || J), er(n, e), (Ut = V)) : er(n, e),
          Nr(e),
          s & 8192)
        ) {
          if (
            ((V = e.memoizedState !== null),
            (e.stateNode.isHidden = V) && !J && (e.mode & 1) !== 0)
          )
            for (ge = e, J = e.child; J !== null; ) {
              for (ne = ge = J; ge !== null; ) {
                switch (((Z = ge), (pe = Z.child), Z.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ls(4, Z, Z.return);
                    break;
                  case 1:
                    al(Z, Z.return);
                    var ye = Z.stateNode;
                    if (typeof ye.componentWillUnmount == "function") {
                      ((s = Z), (i = Z.return));
                      try {
                        ((n = s),
                          (ye.props = n.memoizedProps),
                          (ye.state = n.memoizedState),
                          ye.componentWillUnmount());
                      } catch (we) {
                        mt(s, i, we);
                      }
                    }
                    break;
                  case 5:
                    al(Z, Z.return);
                    break;
                  case 22:
                    if (Z.memoizedState !== null) {
                      zp(ne);
                      continue;
                    }
                }
                pe !== null ? ((pe.return = Z), (ge = pe)) : zp(ne);
              }
              J = J.sibling;
            }
          e: for (J = null, ne = e; ; ) {
            if (ne.tag === 5) {
              if (J === null) {
                J = ne;
                try {
                  ((a = ne.stateNode),
                    V
                      ? ((h = a.style),
                        typeof h.setProperty == "function"
                          ? h.setProperty("display", "none", "important")
                          : (h.display = "none"))
                      : ((N = ne.stateNode),
                        (R = ne.memoizedProps.style),
                        (x =
                          R != null && R.hasOwnProperty("display")
                            ? R.display
                            : null),
                        (N.style.display = zr("display", x))));
                } catch (we) {
                  mt(e, e.return, we);
                }
              }
            } else if (ne.tag === 6) {
              if (J === null)
                try {
                  ne.stateNode.nodeValue = V ? "" : ne.memoizedProps;
                } catch (we) {
                  mt(e, e.return, we);
                }
            } else if (
              ((ne.tag !== 22 && ne.tag !== 23) ||
                ne.memoizedState === null ||
                ne === e) &&
              ne.child !== null
            ) {
              ((ne.child.return = ne), (ne = ne.child));
              continue;
            }
            if (ne === e) break e;
            for (; ne.sibling === null; ) {
              if (ne.return === null || ne.return === e) break e;
              (J === ne && (J = null), (ne = ne.return));
            }
            (J === ne && (J = null),
              (ne.sibling.return = ne.return),
              (ne = ne.sibling));
          }
        }
        break;
      case 19:
        (er(n, e), Nr(e), s & 4 && $p(e));
        break;
      case 21:
        break;
      default:
        (er(n, e), Nr(e));
    }
  }
  function Nr(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        e: {
          for (var i = e.return; i !== null; ) {
            if (Mp(i)) {
              var s = i;
              break e;
            }
            i = i.return;
          }
          throw Error(o(160));
        }
        switch (s.tag) {
          case 5:
            var a = s.stateNode;
            s.flags & 32 && (sr(a, ""), (s.flags &= -33));
            var h = Pp(e);
            Kc(e, h, a);
            break;
          case 3:
          case 4:
            var x = s.stateNode.containerInfo,
              N = Pp(e);
            Xc(e, N, x);
            break;
          default:
            throw Error(o(161));
        }
      } catch (R) {
        mt(e, e.return, R);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function By(e, n, i) {
    ((ge = e), Fp(e));
  }
  function Fp(e, n, i) {
    for (var s = (e.mode & 1) !== 0; ge !== null; ) {
      var a = ge,
        h = a.child;
      if (a.tag === 22 && s) {
        var x = a.memoizedState !== null || Lu;
        if (!x) {
          var N = a.alternate,
            R = (N !== null && N.memoizedState !== null) || Ut;
          N = Lu;
          var V = Ut;
          if (((Lu = x), (Ut = R) && !V))
            for (ge = a; ge !== null; )
              ((x = ge),
                (R = x.child),
                x.tag === 22 && x.memoizedState !== null
                  ? Dp(a)
                  : R !== null
                    ? ((R.return = x), (ge = R))
                    : Dp(a));
          for (; h !== null; ) ((ge = h), Fp(h), (h = h.sibling));
          ((ge = a), (Lu = N), (Ut = V));
        }
        Lp(e);
      } else
        (a.subtreeFlags & 8772) !== 0 && h !== null
          ? ((h.return = a), (ge = h))
          : Lp(e);
    }
  }
  function Lp(e) {
    for (; ge !== null; ) {
      var n = ge;
      if ((n.flags & 8772) !== 0) {
        var i = n.alternate;
        try {
          if ((n.flags & 8772) !== 0)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                Ut || zu(5, n);
                break;
              case 1:
                var s = n.stateNode;
                if (n.flags & 4 && !Ut)
                  if (i === null) s.componentDidMount();
                  else {
                    var a =
                      n.elementType === n.type
                        ? i.memoizedProps
                        : Gn(n.type, i.memoizedProps);
                    s.componentDidUpdate(
                      a,
                      i.memoizedState,
                      s.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var h = n.updateQueue;
                h !== null && zh(n, h, s);
                break;
              case 3:
                var x = n.updateQueue;
                if (x !== null) {
                  if (((i = null), n.child !== null))
                    switch (n.child.tag) {
                      case 5:
                        i = n.child.stateNode;
                        break;
                      case 1:
                        i = n.child.stateNode;
                    }
                  zh(n, x, i);
                }
                break;
              case 5:
                var N = n.stateNode;
                if (i === null && n.flags & 4) {
                  i = N;
                  var R = n.memoizedProps;
                  switch (n.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      R.autoFocus && i.focus();
                      break;
                    case "img":
                      R.src && (i.src = R.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (n.memoizedState === null) {
                  var V = n.alternate;
                  if (V !== null) {
                    var J = V.memoizedState;
                    if (J !== null) {
                      var ne = J.dehydrated;
                      ne !== null && xr(ne);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(o(163));
            }
          Ut || (n.flags & 512 && qc(n));
        } catch (Z) {
          mt(n, n.return, Z);
        }
      }
      if (n === e) {
        ge = null;
        break;
      }
      if (((i = n.sibling), i !== null)) {
        ((i.return = n.return), (ge = i));
        break;
      }
      ge = n.return;
    }
  }
  function zp(e) {
    for (; ge !== null; ) {
      var n = ge;
      if (n === e) {
        ge = null;
        break;
      }
      var i = n.sibling;
      if (i !== null) {
        ((i.return = n.return), (ge = i));
        break;
      }
      ge = n.return;
    }
  }
  function Dp(e) {
    for (; ge !== null; ) {
      var n = ge;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var i = n.return;
            try {
              zu(4, n);
            } catch (R) {
              mt(n, i, R);
            }
            break;
          case 1:
            var s = n.stateNode;
            if (typeof s.componentDidMount == "function") {
              var a = n.return;
              try {
                s.componentDidMount();
              } catch (R) {
                mt(n, a, R);
              }
            }
            var h = n.return;
            try {
              qc(n);
            } catch (R) {
              mt(n, h, R);
            }
            break;
          case 5:
            var x = n.return;
            try {
              qc(n);
            } catch (R) {
              mt(n, x, R);
            }
        }
      } catch (R) {
        mt(n, n.return, R);
      }
      if (n === e) {
        ge = null;
        break;
      }
      var N = n.sibling;
      if (N !== null) {
        ((N.return = n.return), (ge = N));
        break;
      }
      ge = n.return;
    }
  }
  var Vy = Math.ceil,
    Du = Y.ReactCurrentDispatcher,
    Zc = Y.ReactCurrentOwner,
    Ln = Y.ReactCurrentBatchConfig,
    Ke = 0,
    Et = null,
    vt = null,
    $t = 0,
    kn = 0,
    cl = vo(0),
    St = 0,
    ss = null,
    di = 0,
    Ou = 0,
    Gc = 0,
    us = null,
    ln = null,
    Jc = 0,
    fl = 1 / 0,
    to = null,
    ju = !1,
    ef = null,
    Co = null,
    Au = !1,
    Eo = null,
    Uu = 0,
    as = 0,
    tf = null,
    bu = -1,
    Bu = 0;
  function Yt() {
    return (Ke & 6) !== 0 ? ot() : bu !== -1 ? bu : (bu = ot());
  }
  function No(e) {
    return (e.mode & 1) === 0
      ? 1
      : (Ke & 2) !== 0 && $t !== 0
        ? $t & -$t
        : Ny.transition !== null
          ? (Bu === 0 && (Bu = E()), Bu)
          : ((e = he),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Ll(e.type))),
            e);
  }
  function tr(e, n, i, s) {
    if (50 < as) throw ((as = 0), (tf = null), Error(o(185)));
    (O(e, i, s),
      ((Ke & 2) === 0 || e !== Et) &&
        (e === Et && ((Ke & 2) === 0 && (Ou |= i), St === 4 && To(e, $t)),
        sn(e, s),
        i === 1 &&
          Ke === 0 &&
          (n.mode & 1) === 0 &&
          ((fl = ot() + 500), gu && xo())));
  }
  function sn(e, n) {
    var i = e.callbackNode;
    y(e, n);
    var s = yr(e, e === Et ? $t : 0);
    if (s === 0)
      (i !== null && Yo(i), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((n = s & -s), e.callbackPriority !== n)) {
      if ((i != null && Yo(i), n === 1))
        (e.tag === 0 ? Ey(jp.bind(null, e)) : _h(jp.bind(null, e)),
          Sy(function () {
            (Ke & 6) === 0 && xo();
          }),
          (i = null));
      else {
        switch (Fe(s)) {
          case 1:
            i = ao;
            break;
          case 4:
            i = co;
            break;
          case 16:
            i = mr;
            break;
          case 536870912:
            i = Wn;
            break;
          default:
            i = mr;
        }
        i = Qp(i, Op.bind(null, e));
      }
      ((e.callbackPriority = n), (e.callbackNode = i));
    }
  }
  function Op(e, n) {
    if (((bu = -1), (Bu = 0), (Ke & 6) !== 0)) throw Error(o(327));
    var i = e.callbackNode;
    if (dl() && e.callbackNode !== i) return null;
    var s = yr(e, e === Et ? $t : 0);
    if (s === 0) return null;
    if ((s & 30) !== 0 || (s & e.expiredLanes) !== 0 || n) n = Vu(e, s);
    else {
      n = s;
      var a = Ke;
      Ke |= 2;
      var h = Up();
      (Et !== e || $t !== n) && ((to = null), (fl = ot() + 500), pi(e, n));
      do
        try {
          Qy();
          break;
        } catch (N) {
          Ap(e, N);
        }
      while (!0);
      (wc(),
        (Du.current = h),
        (Ke = a),
        vt !== null ? (n = 0) : ((Et = null), ($t = 0), (n = St)));
    }
    if (n !== 0) {
      if (
        (n === 2 && ((a = k(e)), a !== 0 && ((s = a), (n = nf(e, a)))), n === 1)
      )
        throw ((i = ss), pi(e, 0), To(e, s), sn(e, ot()), i);
      if (n === 6) To(e, s);
      else {
        if (
          ((a = e.current.alternate),
          (s & 30) === 0 &&
            !Hy(a) &&
            ((n = Vu(e, s)),
            n === 2 && ((h = k(e)), h !== 0 && ((s = h), (n = nf(e, h)))),
            n === 1))
        )
          throw ((i = ss), pi(e, 0), To(e, s), sn(e, ot()), i);
        switch (((e.finishedWork = a), (e.finishedLanes = s), n)) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            mi(e, ln, to);
            break;
          case 3:
            if (
              (To(e, s),
              (s & 130023424) === s && ((n = Jc + 500 - ot()), 10 < n))
            ) {
              if (yr(e, 0) !== 0) break;
              if (((a = e.suspendedLanes), (a & s) !== s)) {
                (Yt(), (e.pingedLanes |= e.suspendedLanes & a));
                break;
              }
              e.timeoutHandle = uc(mi.bind(null, e, ln, to), n);
              break;
            }
            mi(e, ln, to);
            break;
          case 4:
            if ((To(e, s), (s & 4194240) === s)) break;
            for (n = e.eventTimes, a = -1; 0 < s; ) {
              var x = 31 - wt(s);
              ((h = 1 << x), (x = n[x]), x > a && (a = x), (s &= ~h));
            }
            if (
              ((s = a),
              (s = ot() - s),
              (s =
                (120 > s
                  ? 120
                  : 480 > s
                    ? 480
                    : 1080 > s
                      ? 1080
                      : 1920 > s
                        ? 1920
                        : 3e3 > s
                          ? 3e3
                          : 4320 > s
                            ? 4320
                            : 1960 * Vy(s / 1960)) - s),
              10 < s)
            ) {
              e.timeoutHandle = uc(mi.bind(null, e, ln, to), s);
              break;
            }
            mi(e, ln, to);
            break;
          case 5:
            mi(e, ln, to);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return (sn(e, ot()), e.callbackNode === i ? Op.bind(null, e) : null);
  }
  function nf(e, n) {
    var i = us;
    return (
      e.current.memoizedState.isDehydrated && (pi(e, n).flags |= 256),
      (e = Vu(e, n)),
      e !== 2 && ((n = ln), (ln = i), n !== null && rf(n)),
      e
    );
  }
  function rf(e) {
    ln === null ? (ln = e) : ln.push.apply(ln, e);
  }
  function Hy(e) {
    for (var n = e; ; ) {
      if (n.flags & 16384) {
        var i = n.updateQueue;
        if (i !== null && ((i = i.stores), i !== null))
          for (var s = 0; s < i.length; s++) {
            var a = i[s],
              h = a.getSnapshot;
            a = a.value;
            try {
              if (!Kn(h(), a)) return !1;
            } catch (x) {
              return !1;
            }
          }
      }
      if (((i = n.child), n.subtreeFlags & 16384 && i !== null))
        ((i.return = n), (n = i));
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    }
    return !0;
  }
  function To(e, n) {
    for (
      n &= ~Gc,
        n &= ~Ou,
        e.suspendedLanes |= n,
        e.pingedLanes &= ~n,
        e = e.expirationTimes;
      0 < n;

    ) {
      var i = 31 - wt(n),
        s = 1 << i;
      ((e[i] = -1), (n &= ~s));
    }
  }
  function jp(e) {
    if ((Ke & 6) !== 0) throw Error(o(327));
    dl();
    var n = yr(e, 0);
    if ((n & 1) === 0) return (sn(e, ot()), null);
    var i = Vu(e, n);
    if (e.tag !== 0 && i === 2) {
      var s = k(e);
      s !== 0 && ((n = s), (i = nf(e, s)));
    }
    if (i === 1) throw ((i = ss), pi(e, 0), To(e, n), sn(e, ot()), i);
    if (i === 6) throw Error(o(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = n),
      mi(e, ln, to),
      sn(e, ot()),
      null
    );
  }
  function of(e, n) {
    var i = Ke;
    Ke |= 1;
    try {
      return e(n);
    } finally {
      ((Ke = i), Ke === 0 && ((fl = ot() + 500), gu && xo()));
    }
  }
  function hi(e) {
    Eo !== null && Eo.tag === 0 && (Ke & 6) === 0 && dl();
    var n = Ke;
    Ke |= 1;
    var i = Ln.transition,
      s = he;
    try {
      if (((Ln.transition = null), (he = 1), e)) return e();
    } finally {
      ((he = s), (Ln.transition = i), (Ke = n), (Ke & 6) === 0 && xo());
    }
  }
  function lf() {
    ((kn = cl.current), at(cl));
  }
  function pi(e, n) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var i = e.timeoutHandle;
    if ((i !== -1 && ((e.timeoutHandle = -1), xy(i)), vt !== null))
      for (i = vt.return; i !== null; ) {
        var s = i;
        switch ((pc(s), s.tag)) {
          case 1:
            ((s = s.type.childContextTypes), s != null && pu());
            break;
          case 3:
            (sl(), at(nn), at(Ot), Tc());
            break;
          case 5:
            Ec(s);
            break;
          case 4:
            sl();
            break;
          case 13:
            at(ht);
            break;
          case 19:
            at(ht);
            break;
          case 10:
            xc(s.type._context);
            break;
          case 22:
          case 23:
            lf();
        }
        i = i.return;
      }
    if (
      ((Et = e),
      (vt = e = Mo(e.current, null)),
      ($t = kn = n),
      (St = 0),
      (ss = null),
      (Gc = Ou = di = 0),
      (ln = us = null),
      ai !== null)
    ) {
      for (n = 0; n < ai.length; n++)
        if (((i = ai[n]), (s = i.interleaved), s !== null)) {
          i.interleaved = null;
          var a = s.next,
            h = i.pending;
          if (h !== null) {
            var x = h.next;
            ((h.next = a), (s.next = x));
          }
          i.pending = s;
        }
      ai = null;
    }
    return e;
  }
  function Ap(e, n) {
    do {
      var i = vt;
      try {
        if ((wc(), (Nu.current = Ru), Tu)) {
          for (var s = pt.memoizedState; s !== null; ) {
            var a = s.queue;
            (a !== null && (a.pending = null), (s = s.next));
          }
          Tu = !1;
        }
        if (
          ((fi = 0),
          (Ct = xt = pt = null),
          (ts = !1),
          (ns = 0),
          (Zc.current = null),
          i === null || i.return === null)
        ) {
          ((St = 1), (ss = n), (vt = null));
          break;
        }
        e: {
          var h = e,
            x = i.return,
            N = i,
            R = n;
          if (
            ((n = $t),
            (N.flags |= 32768),
            R !== null && typeof R == "object" && typeof R.then == "function")
          ) {
            var V = R,
              J = N,
              ne = J.tag;
            if ((J.mode & 1) === 0 && (ne === 0 || ne === 11 || ne === 15)) {
              var Z = J.alternate;
              Z
                ? ((J.updateQueue = Z.updateQueue),
                  (J.memoizedState = Z.memoizedState),
                  (J.lanes = Z.lanes))
                : ((J.updateQueue = null), (J.memoizedState = null));
            }
            var pe = cp(x);
            if (pe !== null) {
              ((pe.flags &= -257),
                fp(pe, x, N, h, n),
                pe.mode & 1 && ap(h, V, n),
                (n = pe),
                (R = V));
              var ye = n.updateQueue;
              if (ye === null) {
                var we = new Set();
                (we.add(R), (n.updateQueue = we));
              } else ye.add(R);
              break e;
            } else {
              if ((n & 1) === 0) {
                (ap(h, V, n), sf());
                break e;
              }
              R = Error(o(426));
            }
          } else if (ft && N.mode & 1) {
            var yt = cp(x);
            if (yt !== null) {
              ((yt.flags & 65536) === 0 && (yt.flags |= 256),
                fp(yt, x, N, h, n),
                yc(ul(R, N)));
              break e;
            }
          }
          ((h = R = ul(R, N)),
            St !== 4 && (St = 2),
            us === null ? (us = [h]) : us.push(h),
            (h = x));
          do {
            switch (h.tag) {
              case 3:
                ((h.flags |= 65536), (n &= -n), (h.lanes |= n));
                var j = sp(h, R, n);
                Lh(h, j);
                break e;
              case 1:
                N = R;
                var I = h.type,
                  b = h.stateNode;
                if (
                  (h.flags & 128) === 0 &&
                  (typeof I.getDerivedStateFromError == "function" ||
                    (b !== null &&
                      typeof b.componentDidCatch == "function" &&
                      (Co === null || !Co.has(b))))
                ) {
                  ((h.flags |= 65536), (n &= -n), (h.lanes |= n));
                  var le = up(h, N, n);
                  Lh(h, le);
                  break e;
                }
            }
            h = h.return;
          } while (h !== null);
        }
        Bp(i);
      } catch (Ce) {
        ((n = Ce), vt === i && i !== null && (vt = i = i.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Up() {
    var e = Du.current;
    return ((Du.current = Ru), e === null ? Ru : e);
  }
  function sf() {
    ((St === 0 || St === 3 || St === 2) && (St = 4),
      Et === null ||
        ((di & 268435455) === 0 && (Ou & 268435455) === 0) ||
        To(Et, $t));
  }
  function Vu(e, n) {
    var i = Ke;
    Ke |= 2;
    var s = Up();
    (Et !== e || $t !== n) && ((to = null), pi(e, n));
    do
      try {
        Wy();
        break;
      } catch (a) {
        Ap(e, a);
      }
    while (!0);
    if ((wc(), (Ke = i), (Du.current = s), vt !== null)) throw Error(o(261));
    return ((Et = null), ($t = 0), St);
  }
  function Wy() {
    for (; vt !== null; ) bp(vt);
  }
  function Qy() {
    for (; vt !== null && !Di(); ) bp(vt);
  }
  function bp(e) {
    var n = Wp(e.alternate, e, kn);
    ((e.memoizedProps = e.pendingProps),
      n === null ? Bp(e) : (vt = n),
      (Zc.current = null));
  }
  function Bp(e) {
    var n = e;
    do {
      var i = n.alternate;
      if (((e = n.return), (n.flags & 32768) === 0)) {
        if (((i = jy(i, n, kn)), i !== null)) {
          vt = i;
          return;
        }
      } else {
        if (((i = Ay(i, n)), i !== null)) {
          ((i.flags &= 32767), (vt = i));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((St = 6), (vt = null));
          return;
        }
      }
      if (((n = n.sibling), n !== null)) {
        vt = n;
        return;
      }
      vt = n = e;
    } while (n !== null);
    St === 0 && (St = 5);
  }
  function mi(e, n, i) {
    var s = he,
      a = Ln.transition;
    try {
      ((Ln.transition = null), (he = 1), Yy(e, n, i, s));
    } finally {
      ((Ln.transition = a), (he = s));
    }
    return null;
  }
  function Yy(e, n, i, s) {
    do dl();
    while (Eo !== null);
    if ((Ke & 6) !== 0) throw Error(o(327));
    i = e.finishedWork;
    var a = e.finishedLanes;
    if (i === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), i === e.current))
      throw Error(o(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var h = i.lanes | i.childLanes;
    if (
      (Q(e, h),
      e === Et && ((vt = Et = null), ($t = 0)),
      ((i.subtreeFlags & 2064) === 0 && (i.flags & 2064) === 0) ||
        Au ||
        ((Au = !0),
        Qp(mr, function () {
          return (dl(), null);
        })),
      (h = (i.flags & 15990) !== 0),
      (i.subtreeFlags & 15990) !== 0 || h)
    ) {
      ((h = Ln.transition), (Ln.transition = null));
      var x = he;
      he = 1;
      var N = Ke;
      ((Ke |= 4),
        (Zc.current = null),
        by(e, i),
        Ip(i, e),
        hy(lc),
        (wn = !!ic),
        (lc = ic = null),
        (e.current = i),
        By(i),
        Oi(),
        (Ke = N),
        (he = x),
        (Ln.transition = h));
    } else e.current = i;
    if (
      (Au && ((Au = !1), (Eo = e), (Uu = a)),
      (h = e.pendingLanes),
      h === 0 && (Co = null),
      Br(i.stateNode),
      sn(e, ot()),
      n !== null)
    )
      for (s = e.onRecoverableError, i = 0; i < n.length; i++)
        ((a = n[i]), s(a.value, { componentStack: a.stack, digest: a.digest }));
    if (ju) throw ((ju = !1), (e = ef), (ef = null), e);
    return (
      (Uu & 1) !== 0 && e.tag !== 0 && dl(),
      (h = e.pendingLanes),
      (h & 1) !== 0 ? (e === tf ? as++ : ((as = 0), (tf = e))) : (as = 0),
      xo(),
      null
    );
  }
  function dl() {
    if (Eo !== null) {
      var e = Fe(Uu),
        n = Ln.transition,
        i = he;
      try {
        if (((Ln.transition = null), (he = 16 > e ? 16 : e), Eo === null))
          var s = !1;
        else {
          if (((e = Eo), (Eo = null), (Uu = 0), (Ke & 6) !== 0))
            throw Error(o(331));
          var a = Ke;
          for (Ke |= 4, ge = e.current; ge !== null; ) {
            var h = ge,
              x = h.child;
            if ((ge.flags & 16) !== 0) {
              var N = h.deletions;
              if (N !== null) {
                for (var R = 0; R < N.length; R++) {
                  var V = N[R];
                  for (ge = V; ge !== null; ) {
                    var J = ge;
                    switch (J.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ls(8, J, h);
                    }
                    var ne = J.child;
                    if (ne !== null) ((ne.return = J), (ge = ne));
                    else
                      for (; ge !== null; ) {
                        J = ge;
                        var Z = J.sibling,
                          pe = J.return;
                        if ((Tp(J), J === V)) {
                          ge = null;
                          break;
                        }
                        if (Z !== null) {
                          ((Z.return = pe), (ge = Z));
                          break;
                        }
                        ge = pe;
                      }
                  }
                }
                var ye = h.alternate;
                if (ye !== null) {
                  var we = ye.child;
                  if (we !== null) {
                    ye.child = null;
                    do {
                      var yt = we.sibling;
                      ((we.sibling = null), (we = yt));
                    } while (we !== null);
                  }
                }
                ge = h;
              }
            }
            if ((h.subtreeFlags & 2064) !== 0 && x !== null)
              ((x.return = h), (ge = x));
            else
              e: for (; ge !== null; ) {
                if (((h = ge), (h.flags & 2048) !== 0))
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ls(9, h, h.return);
                  }
                var j = h.sibling;
                if (j !== null) {
                  ((j.return = h.return), (ge = j));
                  break e;
                }
                ge = h.return;
              }
          }
          var I = e.current;
          for (ge = I; ge !== null; ) {
            x = ge;
            var b = x.child;
            if ((x.subtreeFlags & 2064) !== 0 && b !== null)
              ((b.return = x), (ge = b));
            else
              e: for (x = I; ge !== null; ) {
                if (((N = ge), (N.flags & 2048) !== 0))
                  try {
                    switch (N.tag) {
                      case 0:
                      case 11:
                      case 15:
                        zu(9, N);
                    }
                  } catch (Ce) {
                    mt(N, N.return, Ce);
                  }
                if (N === x) {
                  ge = null;
                  break e;
                }
                var le = N.sibling;
                if (le !== null) {
                  ((le.return = N.return), (ge = le));
                  break e;
                }
                ge = N.return;
              }
          }
          if (
            ((Ke = a),
            xo(),
            Ht && typeof Ht.onPostCommitFiberRoot == "function")
          )
            try {
              Ht.onPostCommitFiberRoot(yn, e);
            } catch (Ce) {}
          s = !0;
        }
        return s;
      } finally {
        ((he = i), (Ln.transition = n));
      }
    }
    return !1;
  }
  function Vp(e, n, i) {
    ((n = ul(i, n)),
      (n = sp(e, n, 1)),
      (e = ko(e, n, 1)),
      (n = Yt()),
      e !== null && (O(e, 1, n), sn(e, n)));
  }
  function mt(e, n, i) {
    if (e.tag === 3) Vp(e, e, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Vp(n, e, i);
          break;
        } else if (n.tag === 1) {
          var s = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof s.componentDidCatch == "function" &&
              (Co === null || !Co.has(s)))
          ) {
            ((e = ul(i, e)),
              (e = up(n, e, 1)),
              (n = ko(n, e, 1)),
              (e = Yt()),
              n !== null && (O(n, 1, e), sn(n, e)));
            break;
          }
        }
        n = n.return;
      }
  }
  function qy(e, n, i) {
    var s = e.pingCache;
    (s !== null && s.delete(n),
      (n = Yt()),
      (e.pingedLanes |= e.suspendedLanes & i),
      Et === e &&
        ($t & i) === i &&
        (St === 4 || (St === 3 && ($t & 130023424) === $t && 500 > ot() - Jc)
          ? pi(e, 0)
          : (Gc |= i)),
      sn(e, n));
  }
  function Hp(e, n) {
    n === 0 &&
      ((e.mode & 1) === 0
        ? (n = 1)
        : ((n = Vr), (Vr <<= 1), (Vr & 130023424) === 0 && (Vr = 4194304)));
    var i = Yt();
    ((e = Gr(e, n)), e !== null && (O(e, n, i), sn(e, i)));
  }
  function Xy(e) {
    var n = e.memoizedState,
      i = 0;
    (n !== null && (i = n.retryLane), Hp(e, i));
  }
  function Ky(e, n) {
    var i = 0;
    switch (e.tag) {
      case 13:
        var s = e.stateNode,
          a = e.memoizedState;
        a !== null && (i = a.retryLane);
        break;
      case 19:
        s = e.stateNode;
        break;
      default:
        throw Error(o(314));
    }
    (s !== null && s.delete(n), Hp(e, i));
  }
  var Wp;
  Wp = function (e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps || nn.current) on = !0;
      else {
        if ((e.lanes & i) === 0 && (n.flags & 128) === 0)
          return ((on = !1), Oy(e, n, i));
        on = (e.flags & 131072) !== 0;
      }
    else ((on = !1), ft && (n.flags & 1048576) !== 0 && Ch(n, vu, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 2:
        var s = n.type;
        (Fu(e, n), (e = n.pendingProps));
        var a = el(n, Ot.current);
        (ll(n, i), (a = Rc(null, n, s, e, a, i)));
        var h = $c();
        return (
          (n.flags |= 1),
          typeof a == "object" &&
          a !== null &&
          typeof a.render == "function" &&
          a.$$typeof === void 0
            ? ((n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              rn(s) ? ((h = !0), mu(n)) : (h = !1),
              (n.memoizedState =
                a.state !== null && a.state !== void 0 ? a.state : null),
              _c(n),
              (a.updater = $u),
              (n.stateNode = a),
              (a._reactInternals = n),
              Oc(n, s, e, i),
              (n = bc(null, n, s, !0, h, i)))
            : ((n.tag = 0), ft && h && hc(n), Qt(null, n, a, i), (n = n.child)),
          n
        );
      case 16:
        s = n.elementType;
        e: {
          switch (
            (Fu(e, n),
            (e = n.pendingProps),
            (a = s._init),
            (s = a(s._payload)),
            (n.type = s),
            (a = n.tag = Gy(s)),
            (e = Gn(s, e)),
            a)
          ) {
            case 0:
              n = Uc(null, n, s, e, i);
              break e;
            case 1:
              n = yp(null, n, s, e, i);
              break e;
            case 11:
              n = dp(null, n, s, e, i);
              break e;
            case 14:
              n = hp(null, n, s, Gn(s.type, e), i);
              break e;
          }
          throw Error(o(306, s, ""));
        }
        return n;
      case 0:
        return (
          (s = n.type),
          (a = n.pendingProps),
          (a = n.elementType === s ? a : Gn(s, a)),
          Uc(e, n, s, a, i)
        );
      case 1:
        return (
          (s = n.type),
          (a = n.pendingProps),
          (a = n.elementType === s ? a : Gn(s, a)),
          yp(e, n, s, a, i)
        );
      case 3:
        e: {
          if ((vp(n), e === null)) throw Error(o(387));
          ((s = n.pendingProps),
            (h = n.memoizedState),
            (a = h.element),
            Fh(e, n),
            Cu(n, s, null, i));
          var x = n.memoizedState;
          if (((s = x.element), h.isDehydrated))
            if (
              ((h = {
                element: s,
                isDehydrated: !1,
                cache: x.cache,
                pendingSuspenseBoundaries: x.pendingSuspenseBoundaries,
                transitions: x.transitions,
              }),
              (n.updateQueue.baseState = h),
              (n.memoizedState = h),
              n.flags & 256)
            ) {
              ((a = ul(Error(o(423)), n)), (n = wp(e, n, s, i, a)));
              break e;
            } else if (s !== a) {
              ((a = ul(Error(o(424)), n)), (n = wp(e, n, s, i, a)));
              break e;
            } else
              for (
                Sn = yo(n.stateNode.containerInfo.firstChild),
                  xn = n,
                  ft = !0,
                  Zn = null,
                  i = $h(n, null, s, i),
                  n.child = i;
                i;

              )
                ((i.flags = (i.flags & -3) | 4096), (i = i.sibling));
          else {
            if ((rl(), s === a)) {
              n = eo(e, n, i);
              break e;
            }
            Qt(e, n, s, i);
          }
          n = n.child;
        }
        return n;
      case 5:
        return (
          Dh(n),
          e === null && gc(n),
          (s = n.type),
          (a = n.pendingProps),
          (h = e !== null ? e.memoizedProps : null),
          (x = a.children),
          sc(s, a) ? (x = null) : h !== null && sc(s, h) && (n.flags |= 32),
          gp(e, n),
          Qt(e, n, x, i),
          n.child
        );
      case 6:
        return (e === null && gc(n), null);
      case 13:
        return xp(e, n, i);
      case 4:
        return (
          Cc(n, n.stateNode.containerInfo),
          (s = n.pendingProps),
          e === null ? (n.child = ol(n, null, s, i)) : Qt(e, n, s, i),
          n.child
        );
      case 11:
        return (
          (s = n.type),
          (a = n.pendingProps),
          (a = n.elementType === s ? a : Gn(s, a)),
          dp(e, n, s, a, i)
        );
      case 7:
        return (Qt(e, n, n.pendingProps, i), n.child);
      case 8:
        return (Qt(e, n, n.pendingProps.children, i), n.child);
      case 12:
        return (Qt(e, n, n.pendingProps.children, i), n.child);
      case 10:
        e: {
          if (
            ((s = n.type._context),
            (a = n.pendingProps),
            (h = n.memoizedProps),
            (x = a.value),
            st(Su, s._currentValue),
            (s._currentValue = x),
            h !== null)
          )
            if (Kn(h.value, x)) {
              if (h.children === a.children && !nn.current) {
                n = eo(e, n, i);
                break e;
              }
            } else
              for (h = n.child, h !== null && (h.return = n); h !== null; ) {
                var N = h.dependencies;
                if (N !== null) {
                  x = h.child;
                  for (var R = N.firstContext; R !== null; ) {
                    if (R.context === s) {
                      if (h.tag === 1) {
                        ((R = Jr(-1, i & -i)), (R.tag = 2));
                        var V = h.updateQueue;
                        if (V !== null) {
                          V = V.shared;
                          var J = V.pending;
                          (J === null
                            ? (R.next = R)
                            : ((R.next = J.next), (J.next = R)),
                            (V.pending = R));
                        }
                      }
                      ((h.lanes |= i),
                        (R = h.alternate),
                        R !== null && (R.lanes |= i),
                        Sc(h.return, i, n),
                        (N.lanes |= i));
                      break;
                    }
                    R = R.next;
                  }
                } else if (h.tag === 10) x = h.type === n.type ? null : h.child;
                else if (h.tag === 18) {
                  if (((x = h.return), x === null)) throw Error(o(341));
                  ((x.lanes |= i),
                    (N = x.alternate),
                    N !== null && (N.lanes |= i),
                    Sc(x, i, n),
                    (x = h.sibling));
                } else x = h.child;
                if (x !== null) x.return = h;
                else
                  for (x = h; x !== null; ) {
                    if (x === n) {
                      x = null;
                      break;
                    }
                    if (((h = x.sibling), h !== null)) {
                      ((h.return = x.return), (x = h));
                      break;
                    }
                    x = x.return;
                  }
                h = x;
              }
          (Qt(e, n, a.children, i), (n = n.child));
        }
        return n;
      case 9:
        return (
          (a = n.type),
          (s = n.pendingProps.children),
          ll(n, i),
          (a = In(a)),
          (s = s(a)),
          (n.flags |= 1),
          Qt(e, n, s, i),
          n.child
        );
      case 14:
        return (
          (s = n.type),
          (a = Gn(s, n.pendingProps)),
          (a = Gn(s.type, a)),
          hp(e, n, s, a, i)
        );
      case 15:
        return pp(e, n, n.type, n.pendingProps, i);
      case 17:
        return (
          (s = n.type),
          (a = n.pendingProps),
          (a = n.elementType === s ? a : Gn(s, a)),
          Fu(e, n),
          (n.tag = 1),
          rn(s) ? ((e = !0), mu(n)) : (e = !1),
          ll(n, i),
          ip(n, s, a),
          Oc(n, s, a, i),
          bc(null, n, s, !0, e, i)
        );
      case 19:
        return kp(e, n, i);
      case 22:
        return mp(e, n, i);
    }
    throw Error(o(156, n.tag));
  };
  function Qp(e, n) {
    return br(e, n);
  }
  function Zy(e, n, i, s) {
    ((this.tag = e),
      (this.key = i),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = n),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = s),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function zn(e, n, i, s) {
    return new Zy(e, n, i, s);
  }
  function uf(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Gy(e) {
    if (typeof e == "function") return uf(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === Se)) return 11;
      if (e === Ze) return 14;
    }
    return 2;
  }
  function Mo(e, n) {
    var i = e.alternate;
    return (
      i === null
        ? ((i = zn(e.tag, n, e.key, e.mode)),
          (i.elementType = e.elementType),
          (i.type = e.type),
          (i.stateNode = e.stateNode),
          (i.alternate = e),
          (e.alternate = i))
        : ((i.pendingProps = n),
          (i.type = e.type),
          (i.flags = 0),
          (i.subtreeFlags = 0),
          (i.deletions = null)),
      (i.flags = e.flags & 14680064),
      (i.childLanes = e.childLanes),
      (i.lanes = e.lanes),
      (i.child = e.child),
      (i.memoizedProps = e.memoizedProps),
      (i.memoizedState = e.memoizedState),
      (i.updateQueue = e.updateQueue),
      (n = e.dependencies),
      (i.dependencies =
        n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (i.sibling = e.sibling),
      (i.index = e.index),
      (i.ref = e.ref),
      i
    );
  }
  function Hu(e, n, i, s, a, h) {
    var x = 2;
    if (((s = e), typeof e == "function")) uf(e) && (x = 1);
    else if (typeof e == "string") x = 5;
    else
      e: switch (e) {
        case ae:
          return gi(i.children, a, h, n);
        case _e:
          ((x = 8), (a |= 8));
          break;
        case Ee:
          return (
            (e = zn(12, i, n, a | 2)),
            (e.elementType = Ee),
            (e.lanes = h),
            e
          );
        case ie:
          return (
            (e = zn(13, i, n, a)),
            (e.elementType = ie),
            (e.lanes = h),
            e
          );
        case ke:
          return (
            (e = zn(19, i, n, a)),
            (e.elementType = ke),
            (e.lanes = h),
            e
          );
        case Ne:
          return Wu(i, a, h, n);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case xe:
                x = 10;
                break e;
              case te:
                x = 9;
                break e;
              case Se:
                x = 11;
                break e;
              case Ze:
                x = 14;
                break e;
              case je:
                ((x = 16), (s = null));
                break e;
            }
          throw Error(o(130, e == null ? e : typeof e, ""));
      }
    return (
      (n = zn(x, i, n, a)),
      (n.elementType = e),
      (n.type = s),
      (n.lanes = h),
      n
    );
  }
  function gi(e, n, i, s) {
    return ((e = zn(7, e, s, n)), (e.lanes = i), e);
  }
  function Wu(e, n, i, s) {
    return (
      (e = zn(22, e, s, n)),
      (e.elementType = Ne),
      (e.lanes = i),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function af(e, n, i) {
    return ((e = zn(6, e, null, n)), (e.lanes = i), e);
  }
  function cf(e, n, i) {
    return (
      (n = zn(4, e.children !== null ? e.children : [], e.key, n)),
      (n.lanes = i),
      (n.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      n
    );
  }
  function Jy(e, n, i, s, a) {
    ((this.tag = n),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = U(0)),
      (this.expirationTimes = U(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = U(0)),
      (this.identifierPrefix = s),
      (this.onRecoverableError = a),
      (this.mutableSourceEagerHydrationData = null));
  }
  function ff(e, n, i, s, a, h, x, N, R) {
    return (
      (e = new Jy(e, n, i, N, R)),
      n === 1 ? ((n = 1), h === !0 && (n |= 8)) : (n = 0),
      (h = zn(3, null, null, n)),
      (e.current = h),
      (h.stateNode = e),
      (h.memoizedState = {
        element: s,
        isDehydrated: i,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      _c(h),
      e
    );
  }
  function ev(e, n, i) {
    var s =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: fe,
      key: s == null ? null : "" + s,
      children: e,
      containerInfo: n,
      implementation: i,
    };
  }
  function Yp(e) {
    if (!e) return wo;
    e = e._reactInternals;
    e: {
      if (Hn(e) !== e || e.tag !== 1) throw Error(o(170));
      var n = e;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (rn(n.type)) {
              n = n.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        n = n.return;
      } while (n !== null);
      throw Error(o(171));
    }
    if (e.tag === 1) {
      var i = e.type;
      if (rn(i)) return Sh(e, i, n);
    }
    return n;
  }
  function qp(e, n, i, s, a, h, x, N, R) {
    return (
      (e = ff(i, s, !0, e, a, h, x, N, R)),
      (e.context = Yp(null)),
      (i = e.current),
      (s = Yt()),
      (a = No(i)),
      (h = Jr(s, a)),
      (h.callback = n != null ? n : null),
      ko(i, h, a),
      (e.current.lanes = a),
      O(e, a, s),
      sn(e, s),
      e
    );
  }
  function Qu(e, n, i, s) {
    var a = n.current,
      h = Yt(),
      x = No(a);
    return (
      (i = Yp(i)),
      n.context === null ? (n.context = i) : (n.pendingContext = i),
      (n = Jr(h, x)),
      (n.payload = { element: e }),
      (s = s === void 0 ? null : s),
      s !== null && (n.callback = s),
      (e = ko(a, n, x)),
      e !== null && (tr(e, a, x, h), _u(e, a, x)),
      x
    );
  }
  function Yu(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Xp(e, n) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function df(e, n) {
    (Xp(e, n), (e = e.alternate) && Xp(e, n));
  }
  function tv() {
    return null;
  }
  var Kp =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function hf(e) {
    this._internalRoot = e;
  }
  ((qu.prototype.render = hf.prototype.render =
    function (e) {
      var n = this._internalRoot;
      if (n === null) throw Error(o(409));
      Qu(e, n, null, null);
    }),
    (qu.prototype.unmount = hf.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var n = e.containerInfo;
          (hi(function () {
            Qu(null, e, null, null);
          }),
            (n[qr] = null));
        }
      }));
  function qu(e) {
    this._internalRoot = e;
  }
  qu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var n = Kt();
      e = { blockedOn: null, target: e, priority: n };
      for (var i = 0; i < wr.length && n !== 0 && n < wr[i].priority; i++);
      (wr.splice(i, 0, e), i === 0 && Mn(e));
    }
  };
  function pf(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Xu(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Zp() {}
  function nv(e, n, i, s, a) {
    if (a) {
      if (typeof s == "function") {
        var h = s;
        s = function () {
          var V = Yu(x);
          h.call(V);
        };
      }
      var x = qp(n, s, e, 0, null, !1, !1, "", Zp);
      return (
        (e._reactRootContainer = x),
        (e[qr] = x.current),
        Yl(e.nodeType === 8 ? e.parentNode : e),
        hi(),
        x
      );
    }
    for (; (a = e.lastChild); ) e.removeChild(a);
    if (typeof s == "function") {
      var N = s;
      s = function () {
        var V = Yu(R);
        N.call(V);
      };
    }
    var R = ff(e, 0, !1, null, null, !1, !1, "", Zp);
    return (
      (e._reactRootContainer = R),
      (e[qr] = R.current),
      Yl(e.nodeType === 8 ? e.parentNode : e),
      hi(function () {
        Qu(n, R, i, s);
      }),
      R
    );
  }
  function Ku(e, n, i, s, a) {
    var h = i._reactRootContainer;
    if (h) {
      var x = h;
      if (typeof a == "function") {
        var N = a;
        a = function () {
          var R = Yu(x);
          N.call(R);
        };
      }
      Qu(n, x, e, a);
    } else x = nv(i, n, e, a, s);
    return Yu(x);
  }
  ((Ae = function (e) {
    switch (e.tag) {
      case 3:
        var n = e.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var i = gr(n.pendingLanes);
          i !== 0 &&
            (se(n, i | 1),
            sn(n, ot()),
            (Ke & 6) === 0 && ((fl = ot() + 500), xo()));
        }
        break;
      case 13:
        (hi(function () {
          var s = Gr(e, 1);
          if (s !== null) {
            var a = Yt();
            tr(s, e, 1, a);
          }
        }),
          df(e, 1));
    }
  }),
    (tt = function (e) {
      if (e.tag === 13) {
        var n = Gr(e, 134217728);
        if (n !== null) {
          var i = Yt();
          tr(n, e, 134217728, i);
        }
        df(e, 134217728);
      }
    }),
    (Xt = function (e) {
      if (e.tag === 13) {
        var n = No(e),
          i = Gr(e, n);
        if (i !== null) {
          var s = Yt();
          tr(i, e, n, s);
        }
        df(e, n);
      }
    }),
    (Kt = function () {
      return he;
    }),
    (Lt = function (e, n) {
      var i = he;
      try {
        return ((he = e), n());
      } finally {
        he = i;
      }
    }),
    (Dr = function (e, n, i) {
      switch (n) {
        case "input":
          if ((Vt(e, i), (n = i.name), i.type === "radio" && n != null)) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (
              i = i.querySelectorAll(
                "input[name=" + JSON.stringify("" + n) + '][type="radio"]',
              ),
                n = 0;
              n < i.length;
              n++
            ) {
              var s = i[n];
              if (s !== e && s.form === e.form) {
                var a = hu(s);
                if (!a) throw Error(o(90));
                (ee(s), Vt(s, a));
              }
            }
          }
          break;
        case "textarea":
          Do(e, i);
          break;
        case "select":
          ((n = i.value), n != null && bn(e, !!i.multiple, n, !1));
      }
    }),
    (mn = of),
    (jr = hi));
  var rv = { usingClientEntryPoint: !1, Events: [Kl, Gi, hu, Or, ar, of] },
    cs = {
      findFiberByHostInstance: ii,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    ov = {
      bundleType: cs.bundleType,
      version: cs.version,
      rendererPackageName: cs.rendererPackageName,
      rendererConfig: cs.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: Y.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = Ur(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: cs.findFiberByHostInstance || tv,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
    var Zu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Zu.isDisabled && Zu.supportsFiber)
      try {
        ((yn = Zu.inject(ov)), (Ht = Zu));
      } catch (e) {}
  }
  return (
    (un.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rv),
    (un.createPortal = function (e, n) {
      var i =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!pf(n)) throw Error(o(200));
      return ev(e, n, null, i);
    }),
    (un.createRoot = function (e, n) {
      if (!pf(e)) throw Error(o(299));
      var i = !1,
        s = "",
        a = Kp;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
        (n = ff(e, 1, !1, null, null, i, !1, s, a)),
        (e[qr] = n.current),
        Yl(e.nodeType === 8 ? e.parentNode : e),
        new hf(n)
      );
    }),
    (un.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var n = e._reactInternals;
      if (n === void 0)
        throw typeof e.render == "function"
          ? Error(o(188))
          : ((e = Object.keys(e).join(",")), Error(o(268, e)));
      return ((e = Ur(n)), (e = e === null ? null : e.stateNode), e);
    }),
    (un.flushSync = function (e) {
      return hi(e);
    }),
    (un.hydrate = function (e, n, i) {
      if (!Xu(n)) throw Error(o(200));
      return Ku(null, e, n, !0, i);
    }),
    (un.hydrateRoot = function (e, n, i) {
      if (!pf(e)) throw Error(o(405));
      var s = (i != null && i.hydratedSources) || null,
        a = !1,
        h = "",
        x = Kp;
      if (
        (i != null &&
          (i.unstable_strictMode === !0 && (a = !0),
          i.identifierPrefix !== void 0 && (h = i.identifierPrefix),
          i.onRecoverableError !== void 0 && (x = i.onRecoverableError)),
        (n = qp(n, null, e, 1, i != null ? i : null, a, !1, h, x)),
        (e[qr] = n.current),
        Yl(e),
        s)
      )
        for (e = 0; e < s.length; e++)
          ((i = s[e]),
            (a = i._getVersion),
            (a = a(i._source)),
            n.mutableSourceEagerHydrationData == null
              ? (n.mutableSourceEagerHydrationData = [i, a])
              : n.mutableSourceEagerHydrationData.push(i, a));
      return new qu(n);
    }),
    (un.render = function (e, n, i) {
      if (!Xu(n)) throw Error(o(200));
      return Ku(null, e, n, !1, i);
    }),
    (un.unmountComponentAtNode = function (e) {
      if (!Xu(e)) throw Error(o(40));
      return e._reactRootContainer
        ? (hi(function () {
            Ku(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[qr] = null));
            });
          }),
          !0)
        : !1;
    }),
    (un.unstable_batchedUpdates = of),
    (un.unstable_renderSubtreeIntoContainer = function (e, n, i, s) {
      if (!Xu(i)) throw Error(o(200));
      if (e == null || e._reactInternals === void 0) throw Error(o(38));
      return Ku(e, n, i, !1, s);
    }),
    (un.version = "18.3.1-next-f1338f8080-20240426"),
    un
  );
}
var im;
function Sg() {
  if (im) return yf.exports;
  im = 1;
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (r) {
        console.error(r);
      }
  }
  return (t(), (yf.exports = hv()), yf.exports);
}
var pv = Sg(),
  yd = Qs(),
  Be = (t) => Ws(t, yd),
  vd = Qs();
Be.write = (t) => Ws(t, vd);
var Ra = Qs();
Be.onStart = (t) => Ws(t, Ra);
var wd = Qs();
Be.onFrame = (t) => Ws(t, wd);
var xd = Qs();
Be.onFinish = (t) => Ws(t, xd);
var yl = [];
Be.setTimeout = (t, r) => {
  const o = Be.now() + r,
    l = () => {
      const c = yl.findIndex((p) => p.cancel == l);
      (~c && yl.splice(c, 1), (Lo -= ~c ? 1 : 0));
    },
    u = { time: o, handler: t, cancel: l };
  return (yl.splice(kg(o), 0, u), (Lo += 1), _g(), u);
};
var kg = (t) => ~(~yl.findIndex((r) => r.time > t) || ~yl.length);
Be.cancel = (t) => {
  (Ra.delete(t), wd.delete(t), xd.delete(t), yd.delete(t), vd.delete(t));
};
Be.sync = (t) => {
  ((Hf = !0), Be.batchedUpdates(t), (Hf = !1));
};
Be.throttle = (t) => {
  let r;
  function o() {
    try {
      t(...r);
    } finally {
      r = null;
    }
  }
  function l(...u) {
    ((r = u), Be.onStart(o));
  }
  return (
    (l.handler = t),
    (l.cancel = () => {
      (Ra.delete(o), (r = null));
    }),
    l
  );
};
var Sd = typeof window < "u" ? window.requestAnimationFrame : () => {};
Be.use = (t) => (Sd = t);
Be.now = typeof performance < "u" ? () => performance.now() : Date.now;
Be.batchedUpdates = (t) => t();
Be.catch = console.error;
Be.frameLoop = "always";
Be.advance = () => {
  Be.frameLoop !== "demand"
    ? console.warn(
        "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand",
      )
    : Eg();
};
var Fo = -1,
  Lo = 0,
  Hf = !1;
function Ws(t, r) {
  Hf ? (r.delete(t), t(0)) : (r.add(t), _g());
}
function _g() {
  Fo < 0 && ((Fo = 0), Be.frameLoop !== "demand" && Sd(Cg));
}
function mv() {
  Fo = -1;
}
function Cg() {
  ~Fo && (Sd(Cg), Be.batchedUpdates(Eg));
}
function Eg() {
  const t = Fo;
  Fo = Be.now();
  const r = kg(Fo);
  if ((r && (Ng(yl.splice(0, r), (o) => o.handler()), (Lo -= r)), !Lo)) {
    mv();
    return;
  }
  (Ra.flush(),
    yd.flush(t ? Math.min(64, Fo - t) : 16.667),
    wd.flush(),
    vd.flush(),
    xd.flush());
}
function Qs() {
  let t = new Set(),
    r = t;
  return {
    add(o) {
      ((Lo += r == t && !t.has(o) ? 1 : 0), t.add(o));
    },
    delete(o) {
      return ((Lo -= r == t && t.has(o) ? 1 : 0), t.delete(o));
    },
    flush(o) {
      r.size &&
        ((t = new Set()),
        (Lo -= r.size),
        Ng(r, (l) => l(o) && t.add(l)),
        (Lo += t.size),
        (r = t));
    },
  };
}
function Ng(t, r) {
  t.forEach((o) => {
    try {
      r(o);
    } catch (l) {
      Be.catch(l);
    }
  });
}
var gv = Object.defineProperty,
  yv = (t, r) => {
    for (var o in r) gv(t, o, { get: r[o], enumerable: !0 });
  },
  lr = {};
yv(lr, {
  assign: () => wv,
  colors: () => zo,
  createStringInterpolator: () => _d,
  skipAnimation: () => Mg,
  to: () => Tg,
  willAdvance: () => Cd,
});
function Wf() {}
var vv = (t, r, o) =>
    Object.defineProperty(t, r, { value: o, writable: !0, configurable: !0 }),
  ue = {
    arr: Array.isArray,
    obj: (t) => !!t && t.constructor.name === "Object",
    fun: (t) => typeof t == "function",
    str: (t) => typeof t == "string",
    num: (t) => typeof t == "number",
    und: (t) => t === void 0,
  };
function ro(t, r) {
  if (ue.arr(t)) {
    if (!ue.arr(r) || t.length !== r.length) return !1;
    for (let o = 0; o < t.length; o++) if (t[o] !== r[o]) return !1;
    return !0;
  }
  return t === r;
}
var Xe = (t, r) => t.forEach(r);
function $r(t, r, o) {
  if (ue.arr(t)) {
    for (let l = 0; l < t.length; l++) r.call(o, t[l], `${l}`);
    return;
  }
  for (const l in t) t.hasOwnProperty(l) && r.call(o, t[l], l);
}
var Cn = (t) => (ue.und(t) ? [] : ue.arr(t) ? t : [t]);
function xs(t, r) {
  if (t.size) {
    const o = Array.from(t);
    (t.clear(), Xe(o, r));
  }
}
var ws = (t, ...r) => xs(t, (o) => o(...r)),
  kd = () =>
    typeof window > "u" ||
    !window.navigator ||
    /ServerSideRendering|^Deno\//.test(window.navigator.userAgent),
  _d,
  Tg,
  zo = null,
  Mg = !1,
  Cd = Wf,
  wv = (t) => {
    (t.to && (Tg = t.to),
      t.now && (Be.now = t.now),
      t.colors !== void 0 && (zo = t.colors),
      t.skipAnimation != null && (Mg = t.skipAnimation),
      t.createStringInterpolator && (_d = t.createStringInterpolator),
      t.requestAnimationFrame && Be.use(t.requestAnimationFrame),
      t.batchedUpdates && (Be.batchedUpdates = t.batchedUpdates),
      t.willAdvance && (Cd = t.willAdvance),
      t.frameLoop && (Be.frameLoop = t.frameLoop));
  },
  Ss = new Set(),
  jn = [],
  xf = [],
  ha = 0,
  $a = {
    get idle() {
      return !Ss.size && !jn.length;
    },
    start(t) {
      ha > t.priority ? (Ss.add(t), Be.onStart(xv)) : (Pg(t), Be(Qf));
    },
    advance: Qf,
    sort(t) {
      if (ha) Be.onFrame(() => $a.sort(t));
      else {
        const r = jn.indexOf(t);
        ~r && (jn.splice(r, 1), Rg(t));
      }
    },
    clear() {
      ((jn = []), Ss.clear());
    },
  };
function xv() {
  (Ss.forEach(Pg), Ss.clear(), Be(Qf));
}
function Pg(t) {
  jn.includes(t) || Rg(t);
}
function Rg(t) {
  jn.splice(
    Sv(jn, (r) => r.priority > t.priority),
    0,
    t,
  );
}
function Qf(t) {
  const r = xf;
  for (let o = 0; o < jn.length; o++) {
    const l = jn[o];
    ((ha = l.priority), l.idle || (Cd(l), l.advance(t), l.idle || r.push(l)));
  }
  return ((ha = 0), (xf = jn), (xf.length = 0), (jn = r), jn.length > 0);
}
function Sv(t, r) {
  const o = t.findIndex(r);
  return o < 0 ? t.length : o;
}
var kv = {
    transparent: 0,
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199,
  },
  ir = "[-+]?\\d*\\.?\\d+",
  pa = ir + "%";
function Ia(...t) {
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var _v = new RegExp("rgb" + Ia(ir, ir, ir)),
  Cv = new RegExp("rgba" + Ia(ir, ir, ir, ir)),
  Ev = new RegExp("hsl" + Ia(ir, pa, pa)),
  Nv = new RegExp("hsla" + Ia(ir, pa, pa, ir)),
  Tv = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  Mv = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  Pv = /^#([0-9a-fA-F]{6})$/,
  Rv = /^#([0-9a-fA-F]{8})$/;
function $v(t) {
  let r;
  return typeof t == "number"
    ? t >>> 0 === t && t >= 0 && t <= 4294967295
      ? t
      : null
    : (r = Pv.exec(t))
      ? parseInt(r[1] + "ff", 16) >>> 0
      : zo && zo[t] !== void 0
        ? zo[t]
        : (r = _v.exec(t))
          ? ((hl(r[1]) << 24) | (hl(r[2]) << 16) | (hl(r[3]) << 8) | 255) >>> 0
          : (r = Cv.exec(t))
            ? ((hl(r[1]) << 24) |
                (hl(r[2]) << 16) |
                (hl(r[3]) << 8) |
                um(r[4])) >>>
              0
            : (r = Tv.exec(t))
              ? parseInt(r[1] + r[1] + r[2] + r[2] + r[3] + r[3] + "ff", 16) >>>
                0
              : (r = Rv.exec(t))
                ? parseInt(r[1], 16) >>> 0
                : (r = Mv.exec(t))
                  ? parseInt(
                      r[1] + r[1] + r[2] + r[2] + r[3] + r[3] + r[4] + r[4],
                      16,
                    ) >>> 0
                  : (r = Ev.exec(t))
                    ? (lm(sm(r[1]), Gu(r[2]), Gu(r[3])) | 255) >>> 0
                    : (r = Nv.exec(t))
                      ? (lm(sm(r[1]), Gu(r[2]), Gu(r[3])) | um(r[4])) >>> 0
                      : null;
}
function Sf(t, r, o) {
  return (
    o < 0 && (o += 1),
    o > 1 && (o -= 1),
    o < 1 / 6
      ? t + (r - t) * 6 * o
      : o < 1 / 2
        ? r
        : o < 2 / 3
          ? t + (r - t) * (2 / 3 - o) * 6
          : t
  );
}
function lm(t, r, o) {
  const l = o < 0.5 ? o * (1 + r) : o + r - o * r,
    u = 2 * o - l,
    c = Sf(u, l, t + 1 / 3),
    p = Sf(u, l, t),
    m = Sf(u, l, t - 1 / 3);
  return (
    (Math.round(c * 255) << 24) |
    (Math.round(p * 255) << 16) |
    (Math.round(m * 255) << 8)
  );
}
function hl(t) {
  const r = parseInt(t, 10);
  return r < 0 ? 0 : r > 255 ? 255 : r;
}
function sm(t) {
  return (((parseFloat(t) % 360) + 360) % 360) / 360;
}
function um(t) {
  const r = parseFloat(t);
  return r < 0 ? 0 : r > 1 ? 255 : Math.round(r * 255);
}
function Gu(t) {
  const r = parseFloat(t);
  return r < 0 ? 0 : r > 100 ? 1 : r / 100;
}
function am(t) {
  let r = $v(t);
  if (r === null) return t;
  r = r || 0;
  const o = (r & 4278190080) >>> 24,
    l = (r & 16711680) >>> 16,
    u = (r & 65280) >>> 8,
    c = (r & 255) / 255;
  return `rgba(${o}, ${l}, ${u}, ${c})`;
}
var Es = (t, r, o) => {
  if (ue.fun(t)) return t;
  if (ue.arr(t)) return Es({ range: t, output: r, extrapolate: o });
  if (ue.str(t.output[0])) return _d(t);
  const l = t,
    u = l.output,
    c = l.range || [0, 1],
    p = l.extrapolateLeft || l.extrapolate || "extend",
    m = l.extrapolateRight || l.extrapolate || "extend",
    w = l.easing || ((v) => v);
  return (v) => {
    const _ = Fv(v, c);
    return Iv(v, c[_], c[_ + 1], u[_], u[_ + 1], w, p, m, l.map);
  };
};
function Iv(t, r, o, l, u, c, p, m, w) {
  let v = w ? w(t) : t;
  if (v < r) {
    if (p === "identity") return v;
    p === "clamp" && (v = r);
  }
  if (v > o) {
    if (m === "identity") return v;
    m === "clamp" && (v = o);
  }
  return l === u
    ? l
    : r === o
      ? t <= r
        ? l
        : u
      : (r === -1 / 0
          ? (v = -v)
          : o === 1 / 0
            ? (v = v - r)
            : (v = (v - r) / (o - r)),
        (v = c(v)),
        l === -1 / 0
          ? (v = -v)
          : u === 1 / 0
            ? (v = v + l)
            : (v = v * (u - l) + l),
        v);
}
function Fv(t, r) {
  for (var o = 1; o < r.length - 1 && !(r[o] >= t); ++o);
  return o - 1;
}
var Lv = { linear: (t) => t },
  Ns = Symbol.for("FluidValue.get"),
  xl = Symbol.for("FluidValue.observers"),
  Dn = (t) => !!(t && t[Ns]),
  fn = (t) => (t && t[Ns] ? t[Ns]() : t),
  cm = (t) => t[xl] || null;
function zv(t, r) {
  t.eventObserved ? t.eventObserved(r) : t(r);
}
function Ts(t, r) {
  const o = t[xl];
  o &&
    o.forEach((l) => {
      zv(l, r);
    });
}
var $g = class {
    constructor(t) {
      if (!t && !(t = this.get)) throw Error("Unknown getter");
      Dv(this, t);
    }
  },
  Dv = (t, r) => Ig(t, Ns, r);
function Pl(t, r) {
  if (t[Ns]) {
    let o = t[xl];
    (o || Ig(t, xl, (o = new Set())),
      o.has(r) || (o.add(r), t.observerAdded && t.observerAdded(o.size, r)));
  }
  return r;
}
function Ms(t, r) {
  const o = t[xl];
  if (o && o.has(r)) {
    const l = o.size - 1;
    (l ? o.delete(r) : (t[xl] = null),
      t.observerRemoved && t.observerRemoved(l, r));
  }
}
var Ig = (t, r, o) =>
    Object.defineProperty(t, r, { value: o, writable: !0, configurable: !0 }),
  aa = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  Ov =
    /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
  fm = new RegExp(`(${aa.source})(%|[a-z]+)`, "i"),
  jv = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
  Fa = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/,
  Fg = (t) => {
    const [r, o] = Av(t);
    if (!r || kd()) return t;
    const l = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(r);
    return l
      ? l.trim()
      : o && o.startsWith("--")
        ? window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(o) || t
        : o && Fa.test(o)
          ? Fg(o)
          : o || t;
  },
  Av = (t) => {
    const r = Fa.exec(t);
    if (!r) return [,];
    const [, o, l] = r;
    return [o, l];
  },
  kf,
  Uv = (t, r, o, l, u) =>
    `rgba(${Math.round(r)}, ${Math.round(o)}, ${Math.round(l)}, ${u})`,
  Lg = (t) => {
    kf ||
      (kf = zo
        ? new RegExp(`(${Object.keys(zo).join("|")})(?!\\w)`, "g")
        : /^\b$/);
    const r = t.output.map((u) =>
        fn(u).replace(Fa, Fg).replace(Ov, am).replace(kf, am),
      ),
      o = r.map((u) => u.match(aa).map(Number)),
      l = o[0]
        .map((u, c) =>
          o.map((p) => {
            if (!(c in p))
              throw Error('The arity of each "output" value must be equal');
            return p[c];
          }),
        )
        .map((u) => Es({ ...t, output: u }));
    return (u) => {
      var m;
      const c =
        !fm.test(r[0]) &&
        ((m = r.find((w) => fm.test(w))) == null ? void 0 : m.replace(aa, ""));
      let p = 0;
      return r[0].replace(aa, () => `${l[p++](u)}${c || ""}`).replace(jv, Uv);
    };
  },
  Ed = "react-spring: ",
  zg = (t) => {
    const r = t;
    let o = !1;
    if (typeof r != "function")
      throw new TypeError(`${Ed}once requires a function parameter`);
    return (...l) => {
      o || (r(...l), (o = !0));
    };
  },
  bv = zg(console.warn);
function Bv() {
  bv(`${Ed}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
var Vv = zg(console.warn);
function Hv() {
  Vv(
    `${Ed}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`,
  );
}
function La(t) {
  return (
    ue.str(t) &&
    (t[0] == "#" || /\d/.test(t) || (!kd() && Fa.test(t)) || t in (zo || {}))
  );
}
var Nd = kd() ? Te.useEffect : Te.useLayoutEffect,
  Wv = () => {
    const t = Te.useRef(!1);
    return (
      Nd(
        () => (
          (t.current = !0),
          () => {
            t.current = !1;
          }
        ),
        [],
      ),
      t
    );
  };
function Dg() {
  const t = Te.useState()[1],
    r = Wv();
  return () => {
    r.current && t(Math.random());
  };
}
function Qv(t, r) {
  const [o] = Te.useState(() => ({ inputs: r, result: t() })),
    l = Te.useRef(),
    u = l.current;
  let c = u;
  return (
    c
      ? (r && c.inputs && Yv(r, c.inputs)) || (c = { inputs: r, result: t() })
      : (c = o),
    Te.useEffect(() => {
      ((l.current = c), u == o && (o.inputs = o.result = void 0));
    }, [c]),
    c.result
  );
}
function Yv(t, r) {
  if (t.length !== r.length) return !1;
  for (let o = 0; o < t.length; o++) if (t[o] !== r[o]) return !1;
  return !0;
}
var Og = (t) => Te.useEffect(t, qv),
  qv = [];
function dm(t) {
  const r = Te.useRef();
  return (
    Te.useEffect(() => {
      r.current = t;
    }),
    r.current
  );
}
var Ps = Symbol.for("Animated:node"),
  Xv = (t) => !!t && t[Ps] === t,
  Mr = (t) => t && t[Ps],
  Td = (t, r) => vv(t, Ps, r),
  za = (t) => t && t[Ps] && t[Ps].getPayload(),
  jg = class {
    constructor() {
      Td(this, this);
    }
    getPayload() {
      return this.payload || [];
    }
  },
  Ys = class extends jg {
    constructor(t) {
      (super(),
        (this._value = t),
        (this.done = !0),
        (this.durationProgress = 0),
        ue.num(this._value) && (this.lastPosition = this._value));
    }
    static create(t) {
      return new Ys(t);
    }
    getPayload() {
      return [this];
    }
    getValue() {
      return this._value;
    }
    setValue(t, r) {
      return (
        ue.num(t) &&
          ((this.lastPosition = t),
          r &&
            ((t = Math.round(t / r) * r),
            this.done && (this.lastPosition = t))),
        this._value === t ? !1 : ((this._value = t), !0)
      );
    }
    reset() {
      const { done: t } = this;
      ((this.done = !1),
        ue.num(this._value) &&
          ((this.elapsedTime = 0),
          (this.durationProgress = 0),
          (this.lastPosition = this._value),
          t && (this.lastVelocity = null),
          (this.v0 = null)));
    }
  },
  Rs = class extends Ys {
    constructor(t) {
      (super(0),
        (this._string = null),
        (this._toString = Es({ output: [t, t] })));
    }
    static create(t) {
      return new Rs(t);
    }
    getValue() {
      const t = this._string;
      return t != null ? t : (this._string = this._toString(this._value));
    }
    setValue(t) {
      if (ue.str(t)) {
        if (t == this._string) return !1;
        ((this._string = t), (this._value = 1));
      } else if (super.setValue(t)) this._string = null;
      else return !1;
      return !0;
    }
    reset(t) {
      (t && (this._toString = Es({ output: [this.getValue(), t] })),
        (this._value = 0),
        super.reset());
    }
  },
  ma = { dependencies: null },
  Da = class extends jg {
    constructor(t) {
      (super(), (this.source = t), this.setValue(t));
    }
    getValue(t) {
      const r = {};
      return (
        $r(this.source, (o, l) => {
          Xv(o)
            ? (r[l] = o.getValue(t))
            : Dn(o)
              ? (r[l] = fn(o))
              : t || (r[l] = o);
        }),
        r
      );
    }
    setValue(t) {
      ((this.source = t), (this.payload = this._makePayload(t)));
    }
    reset() {
      this.payload && Xe(this.payload, (t) => t.reset());
    }
    _makePayload(t) {
      if (t) {
        const r = new Set();
        return ($r(t, this._addToPayload, r), Array.from(r));
      }
    }
    _addToPayload(t) {
      ma.dependencies && Dn(t) && ma.dependencies.add(t);
      const r = za(t);
      r && Xe(r, (o) => this.add(o));
    }
  },
  Ag = class extends Da {
    constructor(t) {
      super(t);
    }
    static create(t) {
      return new Ag(t);
    }
    getValue() {
      return this.source.map((t) => t.getValue());
    }
    setValue(t) {
      const r = this.getPayload();
      return t.length == r.length
        ? r.map((o, l) => o.setValue(t[l])).some(Boolean)
        : (super.setValue(t.map(Kv)), !0);
    }
  };
function Kv(t) {
  return (La(t) ? Rs : Ys).create(t);
}
function Yf(t) {
  const r = Mr(t);
  return r ? r.constructor : ue.arr(t) ? Ag : La(t) ? Rs : Ys;
}
var hm = (t, r) => {
    const o = !ue.fun(t) || (t.prototype && t.prototype.isReactComponent);
    return Te.forwardRef((l, u) => {
      const c = Te.useRef(null),
        p =
          o &&
          Te.useCallback(
            ($) => {
              c.current = Jv(u, $);
            },
            [u],
          ),
        [m, w] = Gv(l, r),
        v = Dg(),
        _ = () => {
          const $ = c.current;
          (o && !$) ||
            (($ ? r.applyAnimatedValues($, m.getValue(!0)) : !1) === !1 && v());
        },
        T = new Zv(_, w),
        M = Te.useRef();
      (Nd(
        () => (
          (M.current = T),
          Xe(w, ($) => Pl($, T)),
          () => {
            M.current &&
              (Xe(M.current.deps, ($) => Ms($, M.current)),
              Be.cancel(M.current.update));
          }
        ),
      ),
        Te.useEffect(_, []),
        Og(() => () => {
          const $ = M.current;
          Xe($.deps, (L) => Ms(L, $));
        }));
      const P = r.getComponentProps(m.getValue());
      return Te.createElement(t, { ...P, ref: p });
    });
  },
  Zv = class {
    constructor(t, r) {
      ((this.update = t), (this.deps = r));
    }
    eventObserved(t) {
      t.type == "change" && Be.write(this.update);
    }
  };
function Gv(t, r) {
  const o = new Set();
  return (
    (ma.dependencies = o),
    t.style && (t = { ...t, style: r.createAnimatedStyle(t.style) }),
    (t = new Da(t)),
    (ma.dependencies = null),
    [t, o]
  );
}
function Jv(t, r) {
  return (t && (ue.fun(t) ? t(r) : (t.current = r)), r);
}
var pm = Symbol.for("AnimatedComponent"),
  e1 = (
    t,
    {
      applyAnimatedValues: r = () => !1,
      createAnimatedStyle: o = (u) => new Da(u),
      getComponentProps: l = (u) => u,
    } = {},
  ) => {
    const u = {
        applyAnimatedValues: r,
        createAnimatedStyle: o,
        getComponentProps: l,
      },
      c = (p) => {
        const m = mm(p) || "Anonymous";
        return (
          ue.str(p)
            ? (p = c[p] || (c[p] = hm(p, u)))
            : (p = p[pm] || (p[pm] = hm(p, u))),
          (p.displayName = `Animated(${m})`),
          p
        );
      };
    return (
      $r(t, (p, m) => {
        (ue.arr(t) && (m = mm(p)), (c[m] = c(p)));
      }),
      { animated: c }
    );
  },
  mm = (t) =>
    ue.str(t)
      ? t
      : t && ue.str(t.displayName)
        ? t.displayName
        : (ue.fun(t) && t.name) || null;
function Si(t, ...r) {
  return ue.fun(t) ? t(...r) : t;
}
var ks = (t, r) =>
    t === !0 || !!(r && t && (ue.fun(t) ? t(r) : Cn(t).includes(r))),
  Ug = (t, r) => (ue.obj(t) ? r && t[r] : t),
  bg = (t, r) => (t.default === !0 ? t[r] : t.default ? t.default[r] : void 0),
  t1 = (t) => t,
  Md = (t, r = t1) => {
    let o = n1;
    t.default && t.default !== !0 && ((t = t.default), (o = Object.keys(t)));
    const l = {};
    for (const u of o) {
      const c = r(t[u], u);
      ue.und(c) || (l[u] = c);
    }
    return l;
  },
  n1 = [
    "config",
    "onProps",
    "onStart",
    "onChange",
    "onPause",
    "onResume",
    "onRest",
  ],
  r1 = {
    config: 1,
    from: 1,
    to: 1,
    ref: 1,
    loop: 1,
    reset: 1,
    pause: 1,
    cancel: 1,
    reverse: 1,
    immediate: 1,
    default: 1,
    delay: 1,
    onProps: 1,
    onStart: 1,
    onChange: 1,
    onPause: 1,
    onResume: 1,
    onRest: 1,
    onResolve: 1,
    items: 1,
    trail: 1,
    sort: 1,
    expires: 1,
    initial: 1,
    enter: 1,
    update: 1,
    leave: 1,
    children: 1,
    onDestroyed: 1,
    keys: 1,
    callId: 1,
    parentId: 1,
  };
function o1(t) {
  const r = {};
  let o = 0;
  if (
    ($r(t, (l, u) => {
      r1[u] || ((r[u] = l), o++);
    }),
    o)
  )
    return r;
}
function Bg(t) {
  const r = o1(t);
  if (r) {
    const o = { to: r };
    return ($r(t, (l, u) => u in r || (o[u] = l)), o);
  }
  return { ...t };
}
function $s(t) {
  return (
    (t = fn(t)),
    ue.arr(t)
      ? t.map($s)
      : La(t)
        ? lr.createStringInterpolator({ range: [0, 1], output: [t, t] })(1)
        : t
  );
}
function i1(t) {
  for (const r in t) return !0;
  return !1;
}
function qf(t) {
  return ue.fun(t) || (ue.arr(t) && ue.obj(t[0]));
}
function l1(t, r) {
  var o;
  ((o = t.ref) == null || o.delete(t), r == null || r.delete(t));
}
function s1(t, r) {
  var o;
  r &&
    t.ref !== r &&
    ((o = t.ref) == null || o.delete(t), r.add(t), (t.ref = r));
}
var u1 = { default: { tension: 170, friction: 26 } },
  Xf = { ...u1.default, mass: 1, damping: 1, easing: Lv.linear, clamp: !1 },
  a1 = class {
    constructor() {
      ((this.velocity = 0), Object.assign(this, Xf));
    }
  };
function c1(t, r, o) {
  (o && ((o = { ...o }), gm(o, r), (r = { ...o, ...r })),
    gm(t, r),
    Object.assign(t, r));
  for (const p in Xf) t[p] == null && (t[p] = Xf[p]);
  let { frequency: l, damping: u } = t;
  const { mass: c } = t;
  return (
    ue.und(l) ||
      (l < 0.01 && (l = 0.01),
      u < 0 && (u = 0),
      (t.tension = Math.pow((2 * Math.PI) / l, 2) * c),
      (t.friction = (4 * Math.PI * u * c) / l)),
    t
  );
}
function gm(t, r) {
  if (!ue.und(r.decay)) t.duration = void 0;
  else {
    const o = !ue.und(r.tension) || !ue.und(r.friction);
    ((o || !ue.und(r.frequency) || !ue.und(r.damping) || !ue.und(r.mass)) &&
      ((t.duration = void 0), (t.decay = void 0)),
      o && (t.frequency = void 0));
  }
}
var ym = [],
  f1 = class {
    constructor() {
      ((this.changed = !1),
        (this.values = ym),
        (this.toValues = null),
        (this.fromValues = ym),
        (this.config = new a1()),
        (this.immediate = !1));
    }
  };
function Vg(t, { key: r, props: o, defaultProps: l, state: u, actions: c }) {
  return new Promise((p, m) => {
    var $;
    let w,
      v,
      _ = ks(($ = o.cancel) != null ? $ : l == null ? void 0 : l.cancel, r);
    if (_) P();
    else {
      ue.und(o.pause) || (u.paused = ks(o.pause, r));
      let L = l == null ? void 0 : l.pause;
      (L !== !0 && (L = u.paused || ks(L, r)),
        (w = Si(o.delay || 0, r)),
        L ? (u.resumeQueue.add(M), c.pause()) : (c.resume(), M()));
    }
    function T() {
      (u.resumeQueue.add(M),
        u.timeouts.delete(v),
        v.cancel(),
        (w = v.time - Be.now()));
    }
    function M() {
      w > 0 && !lr.skipAnimation
        ? ((u.delayed = !0),
          (v = Be.setTimeout(P, w)),
          u.pauseQueue.add(T),
          u.timeouts.add(v))
        : P();
    }
    function P() {
      (u.delayed && (u.delayed = !1),
        u.pauseQueue.delete(T),
        u.timeouts.delete(v),
        t <= (u.cancelId || 0) && (_ = !0));
      try {
        c.start({ ...o, callId: t, cancel: _ }, p);
      } catch (L) {
        m(L);
      }
    }
  });
}
var Pd = (t, r) =>
    r.length == 1
      ? r[0]
      : r.some((o) => o.cancelled)
        ? vl(t.get())
        : r.every((o) => o.noop)
          ? Hg(t.get())
          : nr(
              t.get(),
              r.every((o) => o.finished),
            ),
  Hg = (t) => ({ value: t, noop: !0, finished: !0, cancelled: !1 }),
  nr = (t, r, o = !1) => ({ value: t, finished: r, cancelled: o }),
  vl = (t) => ({ value: t, cancelled: !0, finished: !1 });
function Wg(t, r, o, l) {
  const { callId: u, parentId: c, onRest: p } = r,
    { asyncTo: m, promise: w } = o;
  return !c && t === m && !r.reset
    ? w
    : (o.promise = (async () => {
        ((o.asyncId = u), (o.asyncTo = t));
        const v = Md(r, (z, D) => (D === "onRest" ? void 0 : z));
        let _, T;
        const M = new Promise((z, D) => ((_ = z), (T = D))),
          P = (z) => {
            const D =
              (u <= (o.cancelId || 0) && vl(l)) ||
              (u !== o.asyncId && nr(l, !1));
            if (D) throw ((z.result = D), T(z), z);
          },
          $ = (z, D) => {
            const W = new vm(),
              H = new wm();
            return (async () => {
              if (lr.skipAnimation)
                throw (Is(o), (H.result = nr(l, !1)), T(H), H);
              P(W);
              const Y = ue.obj(z) ? { ...z } : { ...D, to: z };
              ((Y.parentId = u),
                $r(v, (fe, ae) => {
                  ue.und(Y[ae]) && (Y[ae] = fe);
                }));
              const oe = await l.start(Y);
              return (
                P(W),
                o.paused &&
                  (await new Promise((fe) => {
                    o.resumeQueue.add(fe);
                  })),
                oe
              );
            })();
          };
        let L;
        if (lr.skipAnimation) return (Is(o), nr(l, !1));
        try {
          let z;
          (ue.arr(t)
            ? (z = (async (D) => {
                for (const W of D) await $(W);
              })(t))
            : (z = Promise.resolve(t($, l.stop.bind(l)))),
            await Promise.all([z.then(_), M]),
            (L = nr(l.get(), !0, !1)));
        } catch (z) {
          if (z instanceof vm) L = z.result;
          else if (z instanceof wm) L = z.result;
          else throw z;
        } finally {
          u == o.asyncId &&
            ((o.asyncId = c),
            (o.asyncTo = c ? m : void 0),
            (o.promise = c ? w : void 0));
        }
        return (
          ue.fun(p) &&
            Be.batchedUpdates(() => {
              p(L, l, l.item);
            }),
          L
        );
      })());
}
function Is(t, r) {
  (xs(t.timeouts, (o) => o.cancel()),
    t.pauseQueue.clear(),
    t.resumeQueue.clear(),
    (t.asyncId = t.asyncTo = t.promise = void 0),
    r && (t.cancelId = r));
}
var vm = class extends Error {
    constructor() {
      super(
        "An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.",
      );
    }
  },
  wm = class extends Error {
    constructor() {
      super("SkipAnimationSignal");
    }
  },
  Kf = (t) => t instanceof Rd,
  d1 = 1,
  Rd = class extends $g {
    constructor() {
      (super(...arguments), (this.id = d1++), (this._priority = 0));
    }
    get priority() {
      return this._priority;
    }
    set priority(t) {
      this._priority != t && ((this._priority = t), this._onPriorityChange(t));
    }
    get() {
      const t = Mr(this);
      return t && t.getValue();
    }
    to(...t) {
      return lr.to(this, t);
    }
    interpolate(...t) {
      return (Bv(), lr.to(this, t));
    }
    toJSON() {
      return this.get();
    }
    observerAdded(t) {
      t == 1 && this._attach();
    }
    observerRemoved(t) {
      t == 0 && this._detach();
    }
    _attach() {}
    _detach() {}
    _onChange(t, r = !1) {
      Ts(this, { type: "change", parent: this, value: t, idle: r });
    }
    _onPriorityChange(t) {
      (this.idle || $a.sort(this),
        Ts(this, { type: "priority", parent: this, priority: t }));
    }
  },
  Ei = Symbol.for("SpringPhase"),
  Qg = 1,
  Zf = 2,
  Gf = 4,
  _f = (t) => (t[Ei] & Qg) > 0,
  Ro = (t) => (t[Ei] & Zf) > 0,
  ds = (t) => (t[Ei] & Gf) > 0,
  xm = (t, r) => (r ? (t[Ei] |= Zf | Qg) : (t[Ei] &= ~Zf)),
  Sm = (t, r) => (r ? (t[Ei] |= Gf) : (t[Ei] &= ~Gf)),
  Yg = class extends Rd {
    constructor(t, r) {
      if (
        (super(),
        (this.animation = new f1()),
        (this.defaultProps = {}),
        (this._state = {
          paused: !1,
          delayed: !1,
          pauseQueue: new Set(),
          resumeQueue: new Set(),
          timeouts: new Set(),
        }),
        (this._pendingCalls = new Set()),
        (this._lastCallId = 0),
        (this._lastToId = 0),
        (this._memoizedDuration = 0),
        !ue.und(t) || !ue.und(r))
      ) {
        const o = ue.obj(t) ? { ...t } : { ...r, from: t };
        (ue.und(o.default) && (o.default = !0), this.start(o));
      }
    }
    get idle() {
      return !(Ro(this) || this._state.asyncTo) || ds(this);
    }
    get goal() {
      return fn(this.animation.to);
    }
    get velocity() {
      const t = Mr(this);
      return t instanceof Ys
        ? t.lastVelocity || 0
        : t.getPayload().map((r) => r.lastVelocity || 0);
    }
    get hasAnimated() {
      return _f(this);
    }
    get isAnimating() {
      return Ro(this);
    }
    get isPaused() {
      return ds(this);
    }
    get isDelayed() {
      return this._state.delayed;
    }
    advance(t) {
      let r = !0,
        o = !1;
      const l = this.animation;
      let { toValues: u } = l;
      const { config: c } = l,
        p = za(l.to);
      (!p && Dn(l.to) && (u = Cn(fn(l.to))),
        l.values.forEach((v, _) => {
          if (v.done) return;
          const T = v.constructor == Rs ? 1 : p ? p[_].lastPosition : u[_];
          let M = l.immediate,
            P = T;
          if (!M) {
            if (((P = v.lastPosition), c.tension <= 0)) {
              v.done = !0;
              return;
            }
            let $ = (v.elapsedTime += t);
            const L = l.fromValues[_],
              z =
                v.v0 != null
                  ? v.v0
                  : (v.v0 = ue.arr(c.velocity) ? c.velocity[_] : c.velocity);
            let D;
            const W =
              c.precision ||
              (L == T ? 0.005 : Math.min(1, Math.abs(T - L) * 0.001));
            if (ue.und(c.duration))
              if (c.decay) {
                const H = c.decay === !0 ? 0.998 : c.decay,
                  Y = Math.exp(-(1 - H) * $);
                ((P = L + (z / (1 - H)) * (1 - Y)),
                  (M = Math.abs(v.lastPosition - P) <= W),
                  (D = z * Y));
              } else {
                D = v.lastVelocity == null ? z : v.lastVelocity;
                const H = c.restVelocity || W / 10,
                  Y = c.clamp ? 0 : c.bounce,
                  oe = !ue.und(Y),
                  fe = L == T ? v.v0 > 0 : L < T;
                let ae,
                  _e = !1;
                const Ee = 1,
                  xe = Math.ceil(t / Ee);
                for (
                  let te = 0;
                  te < xe &&
                  ((ae = Math.abs(D) > H),
                  !(!ae && ((M = Math.abs(T - P) <= W), M)));
                  ++te
                ) {
                  oe &&
                    ((_e = P == T || P > T == fe),
                    _e && ((D = -D * Y), (P = T)));
                  const Se = -c.tension * 1e-6 * (P - T),
                    ie = -c.friction * 0.001 * D,
                    ke = (Se + ie) / c.mass;
                  ((D = D + ke * Ee), (P = P + D * Ee));
                }
              }
            else {
              let H = 1;
              (c.duration > 0 &&
                (this._memoizedDuration !== c.duration &&
                  ((this._memoizedDuration = c.duration),
                  v.durationProgress > 0 &&
                    ((v.elapsedTime = c.duration * v.durationProgress),
                    ($ = v.elapsedTime += t))),
                (H = (c.progress || 0) + $ / this._memoizedDuration),
                (H = H > 1 ? 1 : H < 0 ? 0 : H),
                (v.durationProgress = H)),
                (P = L + c.easing(H) * (T - L)),
                (D = (P - v.lastPosition) / t),
                (M = H == 1));
            }
            ((v.lastVelocity = D),
              Number.isNaN(P) &&
                (console.warn("Got NaN while animating:", this), (M = !0)));
          }
          (p && !p[_].done && (M = !1),
            M ? (v.done = !0) : (r = !1),
            v.setValue(P, c.round) && (o = !0));
        }));
      const m = Mr(this),
        w = m.getValue();
      if (r) {
        const v = fn(l.to);
        ((w !== v || o) && !c.decay
          ? (m.setValue(v), this._onChange(v))
          : o && c.decay && this._onChange(w),
          this._stop());
      } else o && this._onChange(w);
    }
    set(t) {
      return (
        Be.batchedUpdates(() => {
          (this._stop(), this._focus(t), this._set(t));
        }),
        this
      );
    }
    pause() {
      this._update({ pause: !0 });
    }
    resume() {
      this._update({ pause: !1 });
    }
    finish() {
      if (Ro(this)) {
        const { to: t, config: r } = this.animation;
        Be.batchedUpdates(() => {
          (this._onStart(), r.decay || this._set(t, !1), this._stop());
        });
      }
      return this;
    }
    update(t) {
      return ((this.queue || (this.queue = [])).push(t), this);
    }
    start(t, r) {
      let o;
      return (
        ue.und(t)
          ? ((o = this.queue || []), (this.queue = []))
          : (o = [ue.obj(t) ? t : { ...r, to: t }]),
        Promise.all(o.map((l) => this._update(l))).then((l) => Pd(this, l))
      );
    }
    stop(t) {
      const { to: r } = this.animation;
      return (
        this._focus(this.get()),
        Is(this._state, t && this._lastCallId),
        Be.batchedUpdates(() => this._stop(r, t)),
        this
      );
    }
    reset() {
      this._update({ reset: !0 });
    }
    eventObserved(t) {
      t.type == "change"
        ? this._start()
        : t.type == "priority" && (this.priority = t.priority + 1);
    }
    _prepareNode(t) {
      const r = this.key || "";
      let { to: o, from: l } = t;
      ((o = ue.obj(o) ? o[r] : o),
        (o == null || qf(o)) && (o = void 0),
        (l = ue.obj(l) ? l[r] : l),
        l == null && (l = void 0));
      const u = { to: o, from: l };
      return (
        _f(this) ||
          (t.reverse && ([o, l] = [l, o]),
          (l = fn(l)),
          ue.und(l) ? Mr(this) || this._set(o) : this._set(l)),
        u
      );
    }
    _update({ ...t }, r) {
      const { key: o, defaultProps: l } = this;
      (t.default &&
        Object.assign(
          l,
          Md(t, (p, m) => (/^on/.test(m) ? Ug(p, o) : p)),
        ),
        _m(this, t, "onProps"),
        ps(this, "onProps", t, this));
      const u = this._prepareNode(t);
      if (Object.isFrozen(this))
        throw Error(
          "Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?",
        );
      const c = this._state;
      return Vg(++this._lastCallId, {
        key: o,
        props: t,
        defaultProps: l,
        state: c,
        actions: {
          pause: () => {
            ds(this) ||
              (Sm(this, !0),
              ws(c.pauseQueue),
              ps(this, "onPause", nr(this, hs(this, this.animation.to)), this));
          },
          resume: () => {
            ds(this) &&
              (Sm(this, !1),
              Ro(this) && this._resume(),
              ws(c.resumeQueue),
              ps(
                this,
                "onResume",
                nr(this, hs(this, this.animation.to)),
                this,
              ));
          },
          start: this._merge.bind(this, u),
        },
      }).then((p) => {
        if (t.loop && p.finished && !(r && p.noop)) {
          const m = qg(t);
          if (m) return this._update(m, !0);
        }
        return p;
      });
    }
    _merge(t, r, o) {
      if (r.cancel) return (this.stop(!0), o(vl(this)));
      const l = !ue.und(t.to),
        u = !ue.und(t.from);
      if (l || u)
        if (r.callId > this._lastToId) this._lastToId = r.callId;
        else return o(vl(this));
      const { key: c, defaultProps: p, animation: m } = this,
        { to: w, from: v } = m;
      let { to: _ = w, from: T = v } = t;
      (u && !l && (!r.default || ue.und(_)) && (_ = T),
        r.reverse && ([_, T] = [T, _]));
      const M = !ro(T, v);
      (M && (m.from = T), (T = fn(T)));
      const P = !ro(_, w);
      P && this._focus(_);
      const $ = qf(r.to),
        { config: L } = m,
        { decay: z, velocity: D } = L;
      ((l || u) && (L.velocity = 0),
        r.config &&
          !$ &&
          c1(
            L,
            Si(r.config, c),
            r.config !== p.config ? Si(p.config, c) : void 0,
          ));
      let W = Mr(this);
      if (!W || ue.und(_)) return o(nr(this, !0));
      const H = ue.und(r.reset)
          ? u && !r.default
          : !ue.und(T) && ks(r.reset, c),
        Y = H ? T : this.get(),
        oe = $s(_),
        fe = ue.num(oe) || ue.arr(oe) || La(oe),
        ae = !$ && (!fe || ks(p.immediate || r.immediate, c));
      if (P) {
        const te = Yf(_);
        if (te !== W.constructor)
          if (ae) W = this._set(oe);
          else
            throw Error(
              `Cannot animate between ${W.constructor.name} and ${te.name}, as the "to" prop suggests`,
            );
      }
      const _e = W.constructor;
      let Ee = Dn(_),
        xe = !1;
      if (!Ee) {
        const te = H || (!_f(this) && M);
        ((P || te) && ((xe = ro($s(Y), oe)), (Ee = !xe)),
          ((!ro(m.immediate, ae) && !ae) ||
            !ro(L.decay, z) ||
            !ro(L.velocity, D)) &&
            (Ee = !0));
      }
      if (
        (xe && Ro(this) && (m.changed && !H ? (Ee = !0) : Ee || this._stop(w)),
        !$ &&
          ((Ee || Dn(w)) &&
            ((m.values = W.getPayload()),
            (m.toValues = Dn(_) ? null : _e == Rs ? [1] : Cn(oe))),
          m.immediate != ae && ((m.immediate = ae), !ae && !H && this._set(w)),
          Ee))
      ) {
        const { onRest: te } = m;
        Xe(p1, (ie) => _m(this, r, ie));
        const Se = nr(this, hs(this, w));
        (ws(this._pendingCalls, Se),
          this._pendingCalls.add(o),
          m.changed &&
            Be.batchedUpdates(() => {
              var ie;
              ((m.changed = !H),
                te == null || te(Se, this),
                H
                  ? Si(p.onRest, Se)
                  : (ie = m.onStart) == null || ie.call(m, Se, this));
            }));
      }
      (H && this._set(Y),
        $
          ? o(Wg(r.to, r, this._state, this))
          : Ee
            ? this._start()
            : Ro(this) && !P
              ? this._pendingCalls.add(o)
              : o(Hg(Y)));
    }
    _focus(t) {
      const r = this.animation;
      t !== r.to &&
        (cm(this) && this._detach(), (r.to = t), cm(this) && this._attach());
    }
    _attach() {
      let t = 0;
      const { to: r } = this.animation;
      (Dn(r) && (Pl(r, this), Kf(r) && (t = r.priority + 1)),
        (this.priority = t));
    }
    _detach() {
      const { to: t } = this.animation;
      Dn(t) && Ms(t, this);
    }
    _set(t, r = !0) {
      const o = fn(t);
      if (!ue.und(o)) {
        const l = Mr(this);
        if (!l || !ro(o, l.getValue())) {
          const u = Yf(o);
          (!l || l.constructor != u ? Td(this, u.create(o)) : l.setValue(o),
            l &&
              Be.batchedUpdates(() => {
                this._onChange(o, r);
              }));
        }
      }
      return Mr(this);
    }
    _onStart() {
      const t = this.animation;
      t.changed ||
        ((t.changed = !0), ps(this, "onStart", nr(this, hs(this, t.to)), this));
    }
    _onChange(t, r) {
      (r || (this._onStart(), Si(this.animation.onChange, t, this)),
        Si(this.defaultProps.onChange, t, this),
        super._onChange(t, r));
    }
    _start() {
      const t = this.animation;
      (Mr(this).reset(fn(t.to)),
        t.immediate || (t.fromValues = t.values.map((r) => r.lastPosition)),
        Ro(this) || (xm(this, !0), ds(this) || this._resume()));
    }
    _resume() {
      lr.skipAnimation ? this.finish() : $a.start(this);
    }
    _stop(t, r) {
      if (Ro(this)) {
        xm(this, !1);
        const o = this.animation;
        (Xe(o.values, (u) => {
          u.done = !0;
        }),
          o.toValues && (o.onChange = o.onPause = o.onResume = void 0),
          Ts(this, { type: "idle", parent: this }));
        const l = r
          ? vl(this.get())
          : nr(this.get(), hs(this, t != null ? t : o.to));
        (ws(this._pendingCalls, l),
          o.changed && ((o.changed = !1), ps(this, "onRest", l, this)));
      }
    }
  };
function hs(t, r) {
  const o = $s(r),
    l = $s(t.get());
  return ro(l, o);
}
function qg(t, r = t.loop, o = t.to) {
  const l = Si(r);
  if (l) {
    const u = l !== !0 && Bg(l),
      c = (u || t).reverse,
      p = !u || u.reset;
    return Fs({
      ...t,
      loop: r,
      default: !1,
      pause: void 0,
      to: !c || qf(o) ? o : void 0,
      from: p ? t.from : void 0,
      reset: p,
      ...u,
    });
  }
}
function Fs(t) {
  const { to: r, from: o } = (t = Bg(t)),
    l = new Set();
  return (
    ue.obj(r) && km(r, l),
    ue.obj(o) && km(o, l),
    (t.keys = l.size ? Array.from(l) : null),
    t
  );
}
function h1(t) {
  const r = Fs(t);
  return (ue.und(r.default) && (r.default = Md(r)), r);
}
function km(t, r) {
  $r(t, (o, l) => o != null && r.add(l));
}
var p1 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function _m(t, r, o) {
  t.animation[o] = r[o] !== bg(r, o) ? Ug(r[o], t.key) : void 0;
}
function ps(t, r, ...o) {
  var l, u, c, p;
  ((u = (l = t.animation)[r]) == null || u.call(l, ...o),
    (p = (c = t.defaultProps)[r]) == null || p.call(c, ...o));
}
var m1 = ["onStart", "onChange", "onRest"],
  g1 = 1,
  y1 = class {
    constructor(t, r) {
      ((this.id = g1++),
        (this.springs = {}),
        (this.queue = []),
        (this._lastAsyncId = 0),
        (this._active = new Set()),
        (this._changed = new Set()),
        (this._started = !1),
        (this._state = {
          paused: !1,
          pauseQueue: new Set(),
          resumeQueue: new Set(),
          timeouts: new Set(),
        }),
        (this._events = {
          onStart: new Map(),
          onChange: new Map(),
          onRest: new Map(),
        }),
        (this._onFrame = this._onFrame.bind(this)),
        r && (this._flush = r),
        t && this.start({ default: !0, ...t }));
    }
    get idle() {
      return (
        !this._state.asyncTo &&
        Object.values(this.springs).every(
          (t) => t.idle && !t.isDelayed && !t.isPaused,
        )
      );
    }
    get item() {
      return this._item;
    }
    set item(t) {
      this._item = t;
    }
    get() {
      const t = {};
      return (this.each((r, o) => (t[o] = r.get())), t);
    }
    set(t) {
      for (const r in t) {
        const o = t[r];
        ue.und(o) || this.springs[r].set(o);
      }
    }
    update(t) {
      return (t && this.queue.push(Fs(t)), this);
    }
    start(t) {
      let { queue: r } = this;
      return (
        t ? (r = Cn(t).map(Fs)) : (this.queue = []),
        this._flush ? this._flush(this, r) : (Jg(this, r), Jf(this, r))
      );
    }
    stop(t, r) {
      if ((t !== !!t && (r = t), r)) {
        const o = this.springs;
        Xe(Cn(r), (l) => o[l].stop(!!t));
      } else
        (Is(this._state, this._lastAsyncId), this.each((o) => o.stop(!!t)));
      return this;
    }
    pause(t) {
      if (ue.und(t)) this.start({ pause: !0 });
      else {
        const r = this.springs;
        Xe(Cn(t), (o) => r[o].pause());
      }
      return this;
    }
    resume(t) {
      if (ue.und(t)) this.start({ pause: !1 });
      else {
        const r = this.springs;
        Xe(Cn(t), (o) => r[o].resume());
      }
      return this;
    }
    each(t) {
      $r(this.springs, t);
    }
    _onFrame() {
      const { onStart: t, onChange: r, onRest: o } = this._events,
        l = this._active.size > 0,
        u = this._changed.size > 0;
      ((l && !this._started) || (u && !this._started)) &&
        ((this._started = !0),
        xs(t, ([m, w]) => {
          ((w.value = this.get()), m(w, this, this._item));
        }));
      const c = !l && this._started,
        p = u || (c && o.size) ? this.get() : null;
      (u &&
        r.size &&
        xs(r, ([m, w]) => {
          ((w.value = p), m(w, this, this._item));
        }),
        c &&
          ((this._started = !1),
          xs(o, ([m, w]) => {
            ((w.value = p), m(w, this, this._item));
          })));
    }
    eventObserved(t) {
      if (t.type == "change")
        (this._changed.add(t.parent), t.idle || this._active.add(t.parent));
      else if (t.type == "idle") this._active.delete(t.parent);
      else return;
      Be.onFrame(this._onFrame);
    }
  };
function Jf(t, r) {
  return Promise.all(r.map((o) => Xg(t, o))).then((o) => Pd(t, o));
}
async function Xg(t, r, o) {
  const { keys: l, to: u, from: c, loop: p, onRest: m, onResolve: w } = r,
    v = ue.obj(r.default) && r.default;
  (p && (r.loop = !1), u === !1 && (r.to = null), c === !1 && (r.from = null));
  const _ = ue.arr(u) || ue.fun(u) ? u : void 0;
  _
    ? ((r.to = void 0), (r.onRest = void 0), v && (v.onRest = void 0))
    : Xe(m1, (L) => {
        const z = r[L];
        if (ue.fun(z)) {
          const D = t._events[L];
          ((r[L] = ({ finished: W, cancelled: H }) => {
            const Y = D.get(z);
            Y
              ? (W || (Y.finished = !1), H && (Y.cancelled = !0))
              : D.set(z, {
                  value: null,
                  finished: W || !1,
                  cancelled: H || !1,
                });
          }),
            v && (v[L] = r[L]));
        }
      });
  const T = t._state;
  r.pause === !T.paused
    ? ((T.paused = r.pause), ws(r.pause ? T.pauseQueue : T.resumeQueue))
    : T.paused && (r.pause = !0);
  const M = (l || Object.keys(t.springs)).map((L) => t.springs[L].start(r)),
    P = r.cancel === !0 || bg(r, "cancel") === !0;
  ((_ || (P && T.asyncId)) &&
    M.push(
      Vg(++t._lastAsyncId, {
        props: r,
        state: T,
        actions: {
          pause: Wf,
          resume: Wf,
          start(L, z) {
            P
              ? (Is(T, t._lastAsyncId), z(vl(t)))
              : ((L.onRest = m), z(Wg(_, L, T, t)));
          },
        },
      }),
    ),
    T.paused &&
      (await new Promise((L) => {
        T.resumeQueue.add(L);
      })));
  const $ = Pd(t, await Promise.all(M));
  if (p && $.finished && !(o && $.noop)) {
    const L = qg(r, p, u);
    if (L) return (Jg(t, [L]), Xg(t, L, !0));
  }
  return (w && Be.batchedUpdates(() => w($, t, t.item)), $);
}
function Cm(t, r) {
  const o = { ...t.springs };
  return (
    r &&
      Xe(Cn(r), (l) => {
        (ue.und(l.keys) && (l = Fs(l)),
          ue.obj(l.to) || (l = { ...l, to: void 0 }),
          Gg(o, l, (u) => Zg(u)));
      }),
    Kg(t, o),
    o
  );
}
function Kg(t, r) {
  $r(r, (o, l) => {
    t.springs[l] || ((t.springs[l] = o), Pl(o, t));
  });
}
function Zg(t, r) {
  const o = new Yg();
  return ((o.key = t), r && Pl(o, r), o);
}
function Gg(t, r, o) {
  r.keys &&
    Xe(r.keys, (l) => {
      (t[l] || (t[l] = o(l)))._prepareNode(r);
    });
}
function Jg(t, r) {
  Xe(r, (o) => {
    Gg(t.springs, o, (l) => Zg(l, t));
  });
}
var Oa = ({ children: t, ...r }) => {
    const o = Te.useContext(ga),
      l = r.pause || !!o.pause,
      u = r.immediate || !!o.immediate;
    r = Qv(() => ({ pause: l, immediate: u }), [l, u]);
    const { Provider: c } = ga;
    return Te.createElement(c, { value: r }, t);
  },
  ga = v1(Oa, {});
Oa.Provider = ga.Provider;
Oa.Consumer = ga.Consumer;
function v1(t, r) {
  return (
    Object.assign(t, Te.createContext(r)),
    (t.Provider._context = t),
    (t.Consumer._context = t),
    t
  );
}
var w1 = () => {
  const t = [],
    r = function (l) {
      Hv();
      const u = [];
      return (
        Xe(t, (c, p) => {
          if (ue.und(l)) u.push(c.start());
          else {
            const m = o(l, c, p);
            m && u.push(c.start(m));
          }
        }),
        u
      );
    };
  ((r.current = t),
    (r.add = function (l) {
      t.includes(l) || t.push(l);
    }),
    (r.delete = function (l) {
      const u = t.indexOf(l);
      ~u && t.splice(u, 1);
    }),
    (r.pause = function () {
      return (Xe(t, (l) => l.pause(...arguments)), this);
    }),
    (r.resume = function () {
      return (Xe(t, (l) => l.resume(...arguments)), this);
    }),
    (r.set = function (l) {
      Xe(t, (u, c) => {
        const p = ue.fun(l) ? l(c, u) : l;
        p && u.set(p);
      });
    }),
    (r.start = function (l) {
      const u = [];
      return (
        Xe(t, (c, p) => {
          if (ue.und(l)) u.push(c.start());
          else {
            const m = this._getProps(l, c, p);
            m && u.push(c.start(m));
          }
        }),
        u
      );
    }),
    (r.stop = function () {
      return (Xe(t, (l) => l.stop(...arguments)), this);
    }),
    (r.update = function (l) {
      return (Xe(t, (u, c) => u.update(this._getProps(l, u, c))), this);
    }));
  const o = function (l, u, c) {
    return ue.fun(l) ? l(c, u) : l;
  };
  return ((r._getProps = o), r);
};
function x1(t, r, o) {
  const l = ue.fun(r) && r;
  l && !o && (o = []);
  const u = Te.useMemo(() => (l || arguments.length == 3 ? w1() : void 0), []),
    c = Te.useRef(0),
    p = Dg(),
    m = Te.useMemo(
      () => ({
        ctrls: [],
        queue: [],
        flush(D, W) {
          const H = Cm(D, W);
          return c.current > 0 &&
            !m.queue.length &&
            !Object.keys(H).some((Y) => !D.springs[Y])
            ? Jf(D, W)
            : new Promise((Y) => {
                (Kg(D, H),
                  m.queue.push(() => {
                    Y(Jf(D, W));
                  }),
                  p());
              });
        },
      }),
      [],
    ),
    w = Te.useRef([...m.ctrls]),
    v = [],
    _ = dm(t) || 0;
  (Te.useMemo(() => {
    (Xe(w.current.slice(t, _), (D) => {
      (l1(D, u), D.stop(!0));
    }),
      (w.current.length = t),
      T(_, t));
  }, [t]),
    Te.useMemo(() => {
      T(0, Math.min(_, t));
    }, o));
  function T(D, W) {
    for (let H = D; H < W; H++) {
      const Y = w.current[H] || (w.current[H] = new y1(null, m.flush)),
        oe = l ? l(H, Y) : r[H];
      oe && (v[H] = h1(oe));
    }
  }
  const M = w.current.map((D, W) => Cm(D, v[W])),
    P = Te.useContext(Oa),
    $ = dm(P),
    L = P !== $ && i1(P);
  (Nd(() => {
    (c.current++, (m.ctrls = w.current));
    const { queue: D } = m;
    (D.length && ((m.queue = []), Xe(D, (W) => W())),
      Xe(w.current, (W, H) => {
        (u == null || u.add(W), L && W.start({ default: P }));
        const Y = v[H];
        Y && (s1(W, Y.ref), W.ref ? W.queue.push(Y) : W.start(Y));
      }));
  }),
    Og(() => () => {
      Xe(m.ctrls, (D) => D.stop(!0));
    }));
  const z = M.map((D) => ({ ...D }));
  return u ? [z, u] : z;
}
function ja(t, r) {
  const o = ue.fun(t),
    [[l], u] = x1(1, o ? t : [t], o ? [] : r);
  return o || arguments.length == 2 ? [l, u] : l;
}
var e0 = class extends Rd {
  constructor(t, r) {
    (super(),
      (this.source = t),
      (this.idle = !0),
      (this._active = new Set()),
      (this.calc = Es(...r)));
    const o = this._get(),
      l = Yf(o);
    Td(this, l.create(o));
  }
  advance(t) {
    const r = this._get(),
      o = this.get();
    (ro(r, o) || (Mr(this).setValue(r), this._onChange(r, this.idle)),
      !this.idle && Em(this._active) && Cf(this));
  }
  _get() {
    const t = ue.arr(this.source) ? this.source.map(fn) : Cn(fn(this.source));
    return this.calc(...t);
  }
  _start() {
    this.idle &&
      !Em(this._active) &&
      ((this.idle = !1),
      Xe(za(this), (t) => {
        t.done = !1;
      }),
      lr.skipAnimation
        ? (Be.batchedUpdates(() => this.advance()), Cf(this))
        : $a.start(this));
  }
  _attach() {
    let t = 1;
    (Xe(Cn(this.source), (r) => {
      (Dn(r) && Pl(r, this),
        Kf(r) &&
          (r.idle || this._active.add(r), (t = Math.max(t, r.priority + 1))));
    }),
      (this.priority = t),
      this._start());
  }
  _detach() {
    (Xe(Cn(this.source), (t) => {
      Dn(t) && Ms(t, this);
    }),
      this._active.clear(),
      Cf(this));
  }
  eventObserved(t) {
    t.type == "change"
      ? t.idle
        ? this.advance()
        : (this._active.add(t.parent), this._start())
      : t.type == "idle"
        ? this._active.delete(t.parent)
        : t.type == "priority" &&
          (this.priority = Cn(this.source).reduce(
            (r, o) => Math.max(r, (Kf(o) ? o.priority : 0) + 1),
            0,
          ));
  }
};
function S1(t) {
  return t.idle !== !1;
}
function Em(t) {
  return !t.size || Array.from(t).every(S1);
}
function Cf(t) {
  t.idle ||
    ((t.idle = !0),
    Xe(za(t), (r) => {
      r.done = !0;
    }),
    Ts(t, { type: "idle", parent: t }));
}
var k1 = (t, ...r) => new e0(t, r);
lr.assign({ createStringInterpolator: Lg, to: (t, r) => new e0(t, r) });
var t0 = /^--/;
function _1(t, r) {
  return r == null || typeof r == "boolean" || r === ""
    ? ""
    : typeof r == "number" &&
        r !== 0 &&
        !t0.test(t) &&
        !(_s.hasOwnProperty(t) && _s[t])
      ? r + "px"
      : ("" + r).trim();
}
var Nm = {};
function C1(t, r) {
  if (!t.nodeType || !t.setAttribute) return !1;
  const o =
      t.nodeName === "filter" ||
      (t.parentNode && t.parentNode.nodeName === "filter"),
    {
      className: l,
      style: u,
      children: c,
      scrollTop: p,
      scrollLeft: m,
      viewBox: w,
      ...v
    } = r,
    _ = Object.values(v),
    T = Object.keys(v).map((M) =>
      o || t.hasAttribute(M)
        ? M
        : Nm[M] ||
          (Nm[M] = M.replace(/([A-Z])/g, (P) => "-" + P.toLowerCase())),
    );
  c !== void 0 && (t.textContent = c);
  for (const M in u)
    if (u.hasOwnProperty(M)) {
      const P = _1(M, u[M]);
      t0.test(M) ? t.style.setProperty(M, P) : (t.style[M] = P);
    }
  (T.forEach((M, P) => {
    t.setAttribute(M, _[P]);
  }),
    l !== void 0 && (t.className = l),
    p !== void 0 && (t.scrollTop = p),
    m !== void 0 && (t.scrollLeft = m),
    w !== void 0 && t.setAttribute("viewBox", w));
}
var _s = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  E1 = (t, r) => t + r.charAt(0).toUpperCase() + r.substring(1),
  N1 = ["Webkit", "Ms", "Moz", "O"];
_s = Object.keys(_s).reduce(
  (t, r) => (N1.forEach((o) => (t[E1(o, r)] = t[r])), t),
  _s,
);
var T1 = /^(matrix|translate|scale|rotate|skew)/,
  M1 = /^(translate)/,
  P1 = /^(rotate|skew)/,
  Ef = (t, r) => (ue.num(t) && t !== 0 ? t + r : t),
  ca = (t, r) =>
    ue.arr(t)
      ? t.every((o) => ca(o, r))
      : ue.num(t)
        ? t === r
        : parseFloat(t) === r,
  R1 = class extends Da {
    constructor({ x: t, y: r, z: o, ...l }) {
      const u = [],
        c = [];
      ((t || r || o) &&
        (u.push([t || 0, r || 0, o || 0]),
        c.push((p) => [
          `translate3d(${p.map((m) => Ef(m, "px")).join(",")})`,
          ca(p, 0),
        ])),
        $r(l, (p, m) => {
          if (m === "transform")
            (u.push([p || ""]), c.push((w) => [w, w === ""]));
          else if (T1.test(m)) {
            if ((delete l[m], ue.und(p))) return;
            const w = M1.test(m) ? "px" : P1.test(m) ? "deg" : "";
            (u.push(Cn(p)),
              c.push(
                m === "rotate3d"
                  ? ([v, _, T, M]) => [
                      `rotate3d(${v},${_},${T},${Ef(M, w)})`,
                      ca(M, 0),
                    ]
                  : (v) => [
                      `${m}(${v.map((_) => Ef(_, w)).join(",")})`,
                      ca(v, m.startsWith("scale") ? 1 : 0),
                    ],
              ));
          }
        }),
        u.length && (l.transform = new $1(u, c)),
        super(l));
    }
  },
  $1 = class extends $g {
    constructor(t, r) {
      (super(), (this.inputs = t), (this.transforms = r), (this._value = null));
    }
    get() {
      return this._value || (this._value = this._get());
    }
    _get() {
      let t = "",
        r = !0;
      return (
        Xe(this.inputs, (o, l) => {
          const u = fn(o[0]),
            [c, p] = this.transforms[l](ue.arr(u) ? u : o.map(fn));
          ((t += " " + c), (r = r && p));
        }),
        r ? "none" : t
      );
    }
    observerAdded(t) {
      t == 1 && Xe(this.inputs, (r) => Xe(r, (o) => Dn(o) && Pl(o, this)));
    }
    observerRemoved(t) {
      t == 0 && Xe(this.inputs, (r) => Xe(r, (o) => Dn(o) && Ms(o, this)));
    }
    eventObserved(t) {
      (t.type == "change" && (this._value = null), Ts(this, t));
    }
  },
  I1 = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan",
  ];
lr.assign({
  batchedUpdates: pv.unstable_batchedUpdates,
  createStringInterpolator: Lg,
  colors: kv,
});
var F1 = e1(I1, {
    applyAnimatedValues: C1,
    createAnimatedStyle: (t) => new R1(t),
    getComponentProps: ({ scrollTop: t, scrollLeft: r, ...o }) => o,
  }),
  Pr = F1.animated;
const L1 = ["cx", "cy", "r", "stroke", "strokeWidth", "fill"];
function z1(t) {
  const r = {};
  for (const o of L1) {
    const l = t[o];
    l != null && (typeof l == "number" || typeof l == "string") && (r[o] = l);
  }
  return r;
}
const D1 = function (t) {
    const { animated: r, x: o, y: l, ...u } = t,
      c = { ...u, cx: o, cy: l },
      p = z1(c),
      m = ja({ ...p, config: { duration: 500 } });
    return r
      ? me.jsx(Pr.circle, { className: "node-shape", ...c, ...m })
      : me.jsx(Pr.circle, { className: "node-shape", ...c });
  },
  O1 = ["d", "stroke", "strokeWidth"];
function j1(t) {
  const r = {};
  for (const o of O1) {
    const l = t[o];
    l != null && (typeof l == "number" || typeof l == "string") && (r[o] = l);
  }
  return r;
}
function Aa(t) {
  const { animated: r, ...o } = t,
    l = j1(o),
    u = ja({ ...l, config: { duration: 500 } });
  return r ? me.jsx(Pr.path, { ...o, ...u }) : me.jsx(Pr.path, { ...o });
}
function Tm(t, r) {
  return t - r / 2;
}
const A1 = ["rx", "ry", "x", "y", "width", "height", "stroke", "strokeWidth"];
function U1(t) {
  const r = {};
  for (const o of A1) {
    const l = t[o];
    l != null && (typeof l == "number" || typeof l == "string") && (r[o] = l);
  }
  return r;
}
const b1 = function (t) {
    const { x: r, y: o, width: l, height: u, ...c } = t,
      p = Tm(r, l),
      m = Tm(o, u),
      w = { ...c, x: p, y: m, width: l, height: u };
    return me.jsx($d, { ...w });
  },
  $d = function (t) {
    const { animated: r, ...o } = t,
      l = U1(o),
      u = ja({ ...l, config: { duration: 500 } });
    return r
      ? me.jsx(Pr.rect, { className: "node-shape", ...o, ...u })
      : me.jsx(Pr.rect, { className: "node-shape", ...o });
  },
  Nf = (t) => t instanceof Yg;
function Mm(t, r, o) {
  return Nf(t) || Nf(r) || Nf(o)
    ? k1([t, r, o], (l, u, c) => `translate(${l},${u}) rotate(${c})`)
    : `translate(${t},${r}) rotate(${o})`;
}
function n0(t) {
  const {
      alignmentBaseline: r,
      textAnchor: o,
      rotation: l,
      x: u,
      y: c,
      text: p,
      d: m,
      animated: w,
      ...v
    } = t,
    _ = ja({ x: u, y: c, rotation: l, config: { duration: 500 } });
  if (w) {
    const T = Mm(_.x, _.y, _.rotation);
    return me.jsxs("g", {
      children: [
        me.jsx(Pr.text, {
          alignmentBaseline: r,
          textAnchor: o,
          transform: T,
          ...v,
          children: p,
        }),
        m
          ? me.jsx(Pr.path, {
              strokeWidth: 1,
              stroke: "grey",
              strokeDasharray: "2",
              d: m,
            })
          : null,
      ],
    });
  } else {
    const T = Mm(u, c, l);
    return me.jsxs("g", {
      children: [
        me.jsx(Pr.text, {
          alignmentBaseline: r,
          textAnchor: o,
          transform: T,
          ...v,
          children: p,
        }),
        m
          ? me.jsx(Pr.path, {
              strokeWidth: 1,
              stroke: "grey",
              strokeDasharray: "2",
              d: m,
            })
          : null,
      ],
    });
  }
}
const B1 = (t) => ({ ...t, x: 0, y: 0 }),
  oo = Te.createContext(B1),
  Id = {
    width: 1e3,
    height: 1e3,
    rootLength: 0,
    rootAngle: 0,
    angleRange: 2 * Math.PI - 0.3,
    tipSpace: () => 1,
    curvature: 0,
    showRoot: !1,
    spread: 1,
    fishEye: { x: 0, y: 0, scale: 0 },
    cartoonedNodes: new Map(),
    pollard: 0,
    padding: 20,
    invert: !1,
    minRadius: 0,
  };
function fa(t, r) {
  return t == null || r == null
    ? NaN
    : t < r
      ? -1
      : t > r
        ? 1
        : t >= r
          ? 0
          : NaN;
}
function V1(t, r) {
  return t == null || r == null
    ? NaN
    : r < t
      ? -1
      : r > t
        ? 1
        : r >= t
          ? 0
          : NaN;
}
function r0(t) {
  let r, o, l;
  t.length !== 2
    ? ((r = fa), (o = (m, w) => fa(t(m), w)), (l = (m, w) => t(m) - w))
    : ((r = t === fa || t === V1 ? t : H1), (o = t), (l = t));
  function u(m, w, v = 0, _ = m.length) {
    if (v < _) {
      if (r(w, w) !== 0) return _;
      do {
        const T = (v + _) >>> 1;
        o(m[T], w) < 0 ? (v = T + 1) : (_ = T);
      } while (v < _);
    }
    return v;
  }
  function c(m, w, v = 0, _ = m.length) {
    if (v < _) {
      if (r(w, w) !== 0) return _;
      do {
        const T = (v + _) >>> 1;
        o(m[T], w) <= 0 ? (v = T + 1) : (_ = T);
      } while (v < _);
    }
    return v;
  }
  function p(m, w, v = 0, _ = m.length) {
    const T = u(m, w, v, _ - 1);
    return T > v && l(m[T - 1], w) > -l(m[T], w) ? T - 1 : T;
  }
  return { left: u, center: p, right: c };
}
function H1() {
  return 0;
}
function W1(t) {
  return t === null ? NaN : +t;
}
const Q1 = r0(fa),
  Y1 = Q1.right;
r0(W1).center;
function Sl(t, r) {
  let o, l;
  if (r === void 0)
    for (const u of t)
      u != null &&
        (o === void 0
          ? u >= u && (o = l = u)
          : (o > u && (o = u), l < u && (l = u)));
  else {
    let u = -1;
    for (let c of t)
      (c = r(c, ++u, t)) != null &&
        (o === void 0
          ? c >= c && (o = l = c)
          : (o > c && (o = c), l < c && (l = c)));
  }
  return [o, l];
}
const q1 = Math.sqrt(50),
  X1 = Math.sqrt(10),
  K1 = Math.sqrt(2);
function ya(t, r, o) {
  const l = (r - t) / Math.max(0, o),
    u = Math.floor(Math.log10(l)),
    c = l / Math.pow(10, u),
    p = c >= q1 ? 10 : c >= X1 ? 5 : c >= K1 ? 2 : 1;
  let m, w, v;
  return (
    u < 0
      ? ((v = Math.pow(10, -u) / p),
        (m = Math.round(t * v)),
        (w = Math.round(r * v)),
        m / v < t && ++m,
        w / v > r && --w,
        (v = -v))
      : ((v = Math.pow(10, u) * p),
        (m = Math.round(t / v)),
        (w = Math.round(r / v)),
        m * v < t && ++m,
        w * v > r && --w),
    w < m && 0.5 <= o && o < 2 ? ya(t, r, o * 2) : [m, w, v]
  );
}
function Z1(t, r, o) {
  if (((r = +r), (t = +t), (o = +o), !(o > 0))) return [];
  if (t === r) return [t];
  const l = r < t,
    [u, c, p] = l ? ya(r, t, o) : ya(t, r, o);
  if (!(c >= u)) return [];
  const m = c - u + 1,
    w = new Array(m);
  if (l)
    if (p < 0) for (let v = 0; v < m; ++v) w[v] = (c - v) / -p;
    else for (let v = 0; v < m; ++v) w[v] = (c - v) * p;
  else if (p < 0) for (let v = 0; v < m; ++v) w[v] = (u + v) / -p;
  else for (let v = 0; v < m; ++v) w[v] = (u + v) * p;
  return w;
}
function ed(t, r, o) {
  return ((r = +r), (t = +t), (o = +o), ya(t, r, o)[2]);
}
function G1(t, r, o) {
  ((r = +r), (t = +t), (o = +o));
  const l = r < t,
    u = l ? ed(r, t, o) : ed(t, r, o);
  return (l ? -1 : 1) * (u < 0 ? 1 / -u : u);
}
function J1(t, r) {
  let o,
    l = -1,
    u = -1;
  if (r === void 0)
    for (const c of t)
      (++u,
        c != null && (o < c || (o === void 0 && c >= c)) && ((o = c), (l = u)));
  else
    for (let c of t)
      (c = r(c, ++u, t)) != null &&
        (o < c || (o === void 0 && c >= c)) &&
        ((o = c), (l = u));
  return l;
}
function Fd(t, r) {
  let o = 0,
    l = 0;
  if (r === void 0)
    for (let u of t) u != null && (u = +u) >= u && (++o, (l += u));
  else {
    let u = -1;
    for (let c of t)
      (c = r(c, ++u, t)) != null && (c = +c) >= c && (++o, (l += c));
  }
  if (o) return l / o;
}
var et = ((t) => (
  (t.DISCRETE = "DISCRETE"),
  (t.BOOLEAN = "BOOLEAN"),
  (t.NUMERICAL = "NUMERICAL"),
  (t.NUMERICAL_SET = "NUMERICAL_SET"),
  (t.DISCRETE_SET = "DISCRETE_SET"),
  (t.MARKOV_JUMPS = "MARKOV_JUMPS"),
  (t.DENSITIES = "DENSITIES"),
  t
))(et || {});
function ew(t) {
  const r = t
    .split(/\s*('[^']+'|"[^"]+"|;|\(|\)|,|:|=|\[&|\]|\{|\})\s*/)
    .filter((v) => v.length > 0);
  let o = !0,
    l = "",
    u = !1,
    c = !1,
    p = [],
    m;
  const w = {};
  if (r[0] !== "[&" || r[r.length - 1] !== "]")
    throw new Error(
      "expecting a [& at the start and ] at the end of the annotation",
    );
  for (const v of r)
    if (v === "[&") o = !0;
    else if (v === "=") o = !1;
    else if (v === ",") {
      if (u) continue;
      if (((o = !0), m === void 0)) throw new Error("Empty annotation value");
      w[l] = m;
    } else if (v === "{") (u ? ((c = !0), (p = [])) : (m = []), (u = !0));
    else if (v === "}") c ? ((c = !1), m.push(p)) : (u = !1);
    else if (v === "]") {
      if (m === void 0) throw new Error("Empty annotation value");
      w[l] = m;
    } else {
      let _ = v;
      ((_.startsWith('"') || _.startsWith("'")) && (_ = _.slice(1)),
        (_.endsWith('"') || _.endsWith("'")) && (_ = _.slice(0, -1)),
        o
          ? (l = _.replace(".", "_"))
          : u
            ? c
              ? p.push(_)
              : m.push(_)
            : isNaN(_)
              ? (m = _)
              : (m = parseFloat(_)));
    }
  return w;
}
function tw(t) {
  if (Array.isArray(t)) {
    if (Array.isArray(t[0])) {
      const l = t;
      if (l.map((u) => u.length === 3).reduce((u, c) => u && c, !0)) {
        const u = l.map(([c, p, m]) => {
          const w = Number(c);
          if (!Number.isFinite(w))
            throw new Error(
              `Expected a markov jump annotation but the first entry ${c} could not be make a number`,
            );
          return { time: w, from: p, to: m };
        });
        return { type: et.MARKOV_JUMPS, value: u };
      } else
        throw Error(
          `Markov jump with dimension ${l[0].length} detected. Expected 3. ${l.map((u) => u.length).join(",")}`,
        );
    }
    const r = t,
      o = r.every((l) => typeof l == "string");
    if (r.every((l) => Number.isFinite(Number(l)))) {
      const l = r.map((u) => Number(u));
      return { type: et.NUMERICAL_SET, value: l };
    }
    return o
      ? { type: et.DISCRETE_SET, value: r.slice() }
      : { type: et.DISCRETE_SET, value: r.map(String) };
  } else if (nw(t)) {
    const r = Object.entries(t),
      o = r.every(([, u]) => Number.isFinite(Number(u))),
      l = r.every(([, u]) => typeof u == "boolean");
    if (o) {
      const u = {};
      for (const [c, p] of r) {
        const m = Number(p);
        u[c] = m;
      }
      return { type: et.DENSITIES, value: u };
    }
    if (l) {
      const u = r
        .filter(([, c]) => c === !0)
        .map(([c]) => c)
        .sort();
      return { type: et.DISCRETE_SET, value: u };
    }
    throw new Error(
      "Unsupported object value: expected numeric (probabilities) or boolean map",
    );
  } else {
    if (typeof t == "boolean") return { type: et.BOOLEAN, value: t };
    if (typeof t == "number") return { type: et.NUMERICAL, value: t };
    if (typeof t == "string") {
      const r = t.toLowerCase();
      if (r === "true" || r === "false")
        return { type: et.BOOLEAN, value: r === "true" };
      const o = Number(t);
      return Number.isFinite(o)
        ? { type: et.NUMERICAL, value: o }
        : { type: et.DISCRETE, value: t };
    }
  }
  throw new Error(`Unsupported annotation value: ${String(t)}`);
}
function nw(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
function rw(t) {
  switch (t.type) {
    case et.DISCRETE:
      return t.value;
    case et.BOOLEAN:
      return String(t.value);
    case et.NUMERICAL:
      return String(t.value);
    case et.NUMERICAL_SET:
      return "{" + t.value.map((r) => String(r)).join(", ") + "}";
    case et.DISCRETE_SET:
      return "{" + t.value.join(", ") + "}";
    case et.MARKOV_JUMPS:
      return (
        "{" +
        t.value.map((r) => `{${String(r.time)},${r.from},${r.to}}`).join(", ") +
        "}"
      );
    case et.DENSITIES:
      throw new Error(`No defined why to write densities (${t.id}) as a string. 
 Please convert keys and values to separate array annotations.`);
  }
}
var rt = ((t) => ((t.Some = "some"), (t.Nothing = "nothing"), t))(rt || {});
const Ir = () => ({ type: "nothing" }),
  Ua = (t) => ({ type: "some", value: t }),
  Pm = (t, r) => {
    switch (t.type) {
      case "some":
        return t.value;
      case "nothing":
        throw new Error(r);
    }
  };
function o0(t, r) {
  let o;
  if (r instanceof Object) {
    if (r.type === rt.Nothing) return r;
    o = r.value;
  } else o = r;
  const l = t.allNames[o];
  return l === void 0 ? Ir() : Ua(l);
}
function Ls(t, r) {
  let o;
  if (r instanceof Object) {
    if (r.type === rt.Nothing) return r;
    o = r.value;
  } else o = r;
  const l = t.byName[o];
  return l === void 0 ? Ir() : Ua(l);
}
function ow(t, r) {
  return { name: t, number: r, annotations: {} };
}
class Rl {
  constructor(r) {
    ct(this, "_data");
    this._data = r || { allNames: [], byName: {}, finalized: !1 };
  }
  lockTaxa() {
    return (this._data.finalized || (this._data.finalized = !0), this);
  }
  addTaxon(r) {
    if (this._data.finalized)
      throw new Error("Cannot add taxon to finalized set");
    let o;
    if (typeof r == "string") {
      const l = r;
      if (Object.prototype.hasOwnProperty.call(this._data.byName, l))
        throw new Error(
          `taxon ${l} already exists in the set. Names must be unique`,
        );
      o = ow(l, this._data.allNames.length);
    } else {
      if (
        ((o = r),
        Object.prototype.hasOwnProperty.call(this._data.byName, o.name))
      )
        throw new Error(
          `taxon ${o.name} already exists in the set. Names must be unique`,
        );
      if (
        this._data.allNames[o.number] &&
        this._data.allNames[o.number] !== o.name
      )
        throw new Error(
          `taxon number ${o.number} already exists in the set with name ${this._data.allNames[o.number]}. Taxon numbers must be unique`,
        );
      console.log("Adding existing taxon:", o.name);
    }
    return (
      (this._data.allNames[o.number] = o.name),
      (this._data.byName[o.name] = o),
      this
    );
  }
  getTaxon(r) {
    const o = Ls(this._data, o0(this._data, r));
    switch (o.type) {
      case rt.Some:
        return o.value;
      case rt.Nothing:
        throw new Error(`Taxon by name ${r} not found`);
    }
  }
  getTaxonByName(r) {
    const o = Ls(this._data, r);
    switch (o.type) {
      case rt.Some:
        return o.value;
      case rt.Nothing:
        throw new Error(`Taxon by name ${r} not found`);
    }
  }
  hasTaxon(r) {
    return Object.prototype.hasOwnProperty.call(this._data.byName, r);
  }
  getTaxonCount() {
    return this._data.allNames.length;
  }
  get isFinalized() {
    return this._data.finalized;
  }
}
const Tf = new Date(),
  Mf = new Date();
function Fr(t, r, o, l) {
  function u(c) {
    return (t((c = arguments.length === 0 ? new Date() : new Date(+c))), c);
  }
  return (
    (u.floor = (c) => (t((c = new Date(+c))), c)),
    (u.ceil = (c) => (t((c = new Date(c - 1))), r(c, 1), t(c), c)),
    (u.round = (c) => {
      const p = u(c),
        m = u.ceil(c);
      return c - p < m - c ? p : m;
    }),
    (u.offset = (c, p) => (
      r((c = new Date(+c)), p == null ? 1 : Math.floor(p)),
      c
    )),
    (u.range = (c, p, m) => {
      const w = [];
      if (
        ((c = u.ceil(c)),
        (m = m == null ? 1 : Math.floor(m)),
        !(c < p) || !(m > 0))
      )
        return w;
      let v;
      do (w.push((v = new Date(+c))), r(c, m), t(c));
      while (v < c && c < p);
      return w;
    }),
    (u.filter = (c) =>
      Fr(
        (p) => {
          if (p >= p) for (; t(p), !c(p); ) p.setTime(p - 1);
        },
        (p, m) => {
          if (p >= p)
            if (m < 0) for (; ++m <= 0; ) for (; r(p, -1), !c(p); );
            else for (; --m >= 0; ) for (; r(p, 1), !c(p); );
        },
      )),
    o &&
      ((u.count = (c, p) => (
        Tf.setTime(+c),
        Mf.setTime(+p),
        t(Tf),
        t(Mf),
        Math.floor(o(Tf, Mf))
      )),
      (u.every = (c) => (
        (c = Math.floor(c)),
        !isFinite(c) || !(c > 0)
          ? null
          : c > 1
            ? u.filter(
                l ? (p) => l(p) % c === 0 : (p) => u.count(0, p) % c === 0,
              )
            : u
      ))),
    u
  );
}
const iw = 1e3,
  Ld = iw * 60,
  lw = Ld * 60,
  zs = lw * 24,
  i0 = zs * 7,
  zd = Fr(
    (t) => t.setHours(0, 0, 0, 0),
    (t, r) => t.setDate(t.getDate() + r),
    (t, r) =>
      (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Ld) / zs,
    (t) => t.getDate() - 1,
  );
zd.range;
const Dd = Fr(
  (t) => {
    t.setUTCHours(0, 0, 0, 0);
  },
  (t, r) => {
    t.setUTCDate(t.getUTCDate() + r);
  },
  (t, r) => (r - t) / zs,
  (t) => t.getUTCDate() - 1,
);
Dd.range;
const sw = Fr(
  (t) => {
    t.setUTCHours(0, 0, 0, 0);
  },
  (t, r) => {
    t.setUTCDate(t.getUTCDate() + r);
  },
  (t, r) => (r - t) / zs,
  (t) => Math.floor(t / zs),
);
sw.range;
function Ri(t) {
  return Fr(
    (r) => {
      (r.setDate(r.getDate() - ((r.getDay() + 7 - t) % 7)),
        r.setHours(0, 0, 0, 0));
    },
    (r, o) => {
      r.setDate(r.getDate() + o * 7);
    },
    (r, o) =>
      (o - r - (o.getTimezoneOffset() - r.getTimezoneOffset()) * Ld) / i0,
  );
}
const l0 = Ri(0),
  va = Ri(1),
  uw = Ri(2),
  aw = Ri(3),
  kl = Ri(4),
  cw = Ri(5),
  fw = Ri(6);
l0.range;
va.range;
uw.range;
aw.range;
kl.range;
cw.range;
fw.range;
function $i(t) {
  return Fr(
    (r) => {
      (r.setUTCDate(r.getUTCDate() - ((r.getUTCDay() + 7 - t) % 7)),
        r.setUTCHours(0, 0, 0, 0));
    },
    (r, o) => {
      r.setUTCDate(r.getUTCDate() + o * 7);
    },
    (r, o) => (o - r) / i0,
  );
}
const s0 = $i(0),
  wa = $i(1),
  dw = $i(2),
  hw = $i(3),
  _l = $i(4),
  pw = $i(5),
  mw = $i(6);
s0.range;
wa.range;
dw.range;
hw.range;
_l.range;
pw.range;
mw.range;
const Ni = Fr(
  (t) => {
    (t.setMonth(0, 1), t.setHours(0, 0, 0, 0));
  },
  (t, r) => {
    t.setFullYear(t.getFullYear() + r);
  },
  (t, r) => r.getFullYear() - t.getFullYear(),
  (t) => t.getFullYear(),
);
Ni.every = (t) =>
  !isFinite((t = Math.floor(t))) || !(t > 0)
    ? null
    : Fr(
        (r) => {
          (r.setFullYear(Math.floor(r.getFullYear() / t) * t),
            r.setMonth(0, 1),
            r.setHours(0, 0, 0, 0));
        },
        (r, o) => {
          r.setFullYear(r.getFullYear() + o * t);
        },
      );
Ni.range;
const Ti = Fr(
  (t) => {
    (t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0));
  },
  (t, r) => {
    t.setUTCFullYear(t.getUTCFullYear() + r);
  },
  (t, r) => r.getUTCFullYear() - t.getUTCFullYear(),
  (t) => t.getUTCFullYear(),
);
Ti.every = (t) =>
  !isFinite((t = Math.floor(t))) || !(t > 0)
    ? null
    : Fr(
        (r) => {
          (r.setUTCFullYear(Math.floor(r.getUTCFullYear() / t) * t),
            r.setUTCMonth(0, 1),
            r.setUTCHours(0, 0, 0, 0));
        },
        (r, o) => {
          r.setUTCFullYear(r.getUTCFullYear() + o * t);
        },
      );
Ti.range;
function Pf(t) {
  if (0 <= t.y && t.y < 100) {
    var r = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return (r.setFullYear(t.y), r);
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Rf(t) {
  if (0 <= t.y && t.y < 100) {
    var r = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return (r.setUTCFullYear(t.y), r);
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function ms(t, r, o) {
  return { y: t, m: r, d: o, H: 0, M: 0, S: 0, L: 0 };
}
function gw(t) {
  var r = t.dateTime,
    o = t.date,
    l = t.time,
    u = t.periods,
    c = t.days,
    p = t.shortDays,
    m = t.months,
    w = t.shortMonths,
    v = gs(u),
    _ = ys(u),
    T = gs(c),
    M = ys(c),
    P = gs(p),
    $ = ys(p),
    L = gs(m),
    z = ys(m),
    D = gs(w),
    W = ys(w),
    H = {
      a: Ne,
      A: G,
      b: ce,
      B: de,
      c: null,
      d: zm,
      e: zm,
      f: Aw,
      g: Xw,
      G: Zw,
      H: Dw,
      I: Ow,
      j: jw,
      L: u0,
      m: Uw,
      M: bw,
      p: F,
      q: X,
      Q: jm,
      s: Am,
      S: Bw,
      u: Vw,
      U: Hw,
      V: Ww,
      w: Qw,
      W: Yw,
      x: null,
      X: null,
      y: qw,
      Y: Kw,
      Z: Gw,
      "%": Om,
    },
    Y = {
      a: Re,
      A: Le,
      b: ze,
      B: Ue,
      c: null,
      d: Dm,
      e: Dm,
      f: nx,
      g: dx,
      G: px,
      H: Jw,
      I: ex,
      j: tx,
      L: c0,
      m: rx,
      M: ox,
      p: Qe,
      q: Ve,
      Q: jm,
      s: Am,
      S: ix,
      u: lx,
      U: sx,
      V: ux,
      w: ax,
      W: cx,
      x: null,
      X: null,
      y: fx,
      Y: hx,
      Z: mx,
      "%": Om,
    },
    oe = {
      a: xe,
      A: te,
      b: Se,
      B: ie,
      c: ke,
      d: Fm,
      e: Fm,
      f: Iw,
      g: Im,
      G: $m,
      H: Lm,
      I: Lm,
      j: Mw,
      L: $w,
      m: Tw,
      M: Pw,
      p: Ee,
      q: Nw,
      Q: Lw,
      s: zw,
      S: Rw,
      u: Sw,
      U: kw,
      V: _w,
      w: xw,
      W: Cw,
      x: Ze,
      X: je,
      y: Im,
      Y: $m,
      Z: Ew,
      "%": Fw,
    };
  ((H.x = fe(o, H)),
    (H.X = fe(l, H)),
    (H.c = fe(r, H)),
    (Y.x = fe(o, Y)),
    (Y.X = fe(l, Y)),
    (Y.c = fe(r, Y)));
  function fe(K, ve) {
    return function ($e) {
      var ee = [],
        Ye = -1,
        He = 0,
        gt = K.length,
        dt,
        Vt,
        Nn;
      for ($e instanceof Date || ($e = new Date(+$e)); ++Ye < gt; )
        K.charCodeAt(Ye) === 37 &&
          (ee.push(K.slice(He, Ye)),
          (Vt = Rm[(dt = K.charAt(++Ye))]) != null
            ? (dt = K.charAt(++Ye))
            : (Vt = dt === "e" ? " " : "0"),
          (Nn = ve[dt]) && (dt = Nn($e, Vt)),
          ee.push(dt),
          (He = Ye + 1));
      return (ee.push(K.slice(He, Ye)), ee.join(""));
    };
  }
  function ae(K, ve) {
    return function ($e) {
      var ee = ms(1900, void 0, 1),
        Ye = _e(ee, K, ($e += ""), 0),
        He,
        gt;
      if (Ye != $e.length) return null;
      if ("Q" in ee) return new Date(ee.Q);
      if ("s" in ee) return new Date(ee.s * 1e3 + ("L" in ee ? ee.L : 0));
      if (
        (ve && !("Z" in ee) && (ee.Z = 0),
        "p" in ee && (ee.H = (ee.H % 12) + ee.p * 12),
        ee.m === void 0 && (ee.m = "q" in ee ? ee.q : 0),
        "V" in ee)
      ) {
        if (ee.V < 1 || ee.V > 53) return null;
        ("w" in ee || (ee.w = 1),
          "Z" in ee
            ? ((He = Rf(ms(ee.y, 0, 1))),
              (gt = He.getUTCDay()),
              (He = gt > 4 || gt === 0 ? wa.ceil(He) : wa(He)),
              (He = Dd.offset(He, (ee.V - 1) * 7)),
              (ee.y = He.getUTCFullYear()),
              (ee.m = He.getUTCMonth()),
              (ee.d = He.getUTCDate() + ((ee.w + 6) % 7)))
            : ((He = Pf(ms(ee.y, 0, 1))),
              (gt = He.getDay()),
              (He = gt > 4 || gt === 0 ? va.ceil(He) : va(He)),
              (He = zd.offset(He, (ee.V - 1) * 7)),
              (ee.y = He.getFullYear()),
              (ee.m = He.getMonth()),
              (ee.d = He.getDate() + ((ee.w + 6) % 7))));
      } else
        ("W" in ee || "U" in ee) &&
          ("w" in ee || (ee.w = "u" in ee ? ee.u % 7 : "W" in ee ? 1 : 0),
          (gt =
            "Z" in ee
              ? Rf(ms(ee.y, 0, 1)).getUTCDay()
              : Pf(ms(ee.y, 0, 1)).getDay()),
          (ee.m = 0),
          (ee.d =
            "W" in ee
              ? ((ee.w + 6) % 7) + ee.W * 7 - ((gt + 5) % 7)
              : ee.w + ee.U * 7 - ((gt + 6) % 7)));
      return "Z" in ee
        ? ((ee.H += (ee.Z / 100) | 0), (ee.M += ee.Z % 100), Rf(ee))
        : Pf(ee);
    };
  }
  function _e(K, ve, $e, ee) {
    for (var Ye = 0, He = ve.length, gt = $e.length, dt, Vt; Ye < He; ) {
      if (ee >= gt) return -1;
      if (((dt = ve.charCodeAt(Ye++)), dt === 37)) {
        if (
          ((dt = ve.charAt(Ye++)),
          (Vt = oe[dt in Rm ? ve.charAt(Ye++) : dt]),
          !Vt || (ee = Vt(K, $e, ee)) < 0)
        )
          return -1;
      } else if (dt != $e.charCodeAt(ee++)) return -1;
    }
    return ee;
  }
  function Ee(K, ve, $e) {
    var ee = v.exec(ve.slice($e));
    return ee ? ((K.p = _.get(ee[0].toLowerCase())), $e + ee[0].length) : -1;
  }
  function xe(K, ve, $e) {
    var ee = P.exec(ve.slice($e));
    return ee ? ((K.w = $.get(ee[0].toLowerCase())), $e + ee[0].length) : -1;
  }
  function te(K, ve, $e) {
    var ee = T.exec(ve.slice($e));
    return ee ? ((K.w = M.get(ee[0].toLowerCase())), $e + ee[0].length) : -1;
  }
  function Se(K, ve, $e) {
    var ee = D.exec(ve.slice($e));
    return ee ? ((K.m = W.get(ee[0].toLowerCase())), $e + ee[0].length) : -1;
  }
  function ie(K, ve, $e) {
    var ee = L.exec(ve.slice($e));
    return ee ? ((K.m = z.get(ee[0].toLowerCase())), $e + ee[0].length) : -1;
  }
  function ke(K, ve, $e) {
    return _e(K, r, ve, $e);
  }
  function Ze(K, ve, $e) {
    return _e(K, o, ve, $e);
  }
  function je(K, ve, $e) {
    return _e(K, l, ve, $e);
  }
  function Ne(K) {
    return p[K.getDay()];
  }
  function G(K) {
    return c[K.getDay()];
  }
  function ce(K) {
    return w[K.getMonth()];
  }
  function de(K) {
    return m[K.getMonth()];
  }
  function F(K) {
    return u[+(K.getHours() >= 12)];
  }
  function X(K) {
    return 1 + ~~(K.getMonth() / 3);
  }
  function Re(K) {
    return p[K.getUTCDay()];
  }
  function Le(K) {
    return c[K.getUTCDay()];
  }
  function ze(K) {
    return w[K.getUTCMonth()];
  }
  function Ue(K) {
    return m[K.getUTCMonth()];
  }
  function Qe(K) {
    return u[+(K.getUTCHours() >= 12)];
  }
  function Ve(K) {
    return 1 + ~~(K.getUTCMonth() / 3);
  }
  return {
    format: function (K) {
      var ve = fe((K += ""), H);
      return (
        (ve.toString = function () {
          return K;
        }),
        ve
      );
    },
    parse: function (K) {
      var ve = ae((K += ""), !1);
      return (
        (ve.toString = function () {
          return K;
        }),
        ve
      );
    },
    utcFormat: function (K) {
      var ve = fe((K += ""), Y);
      return (
        (ve.toString = function () {
          return K;
        }),
        ve
      );
    },
    utcParse: function (K) {
      var ve = ae((K += ""), !0);
      return (
        (ve.toString = function () {
          return K;
        }),
        ve
      );
    },
  };
}
var Rm = { "-": "", _: " ", 0: "0" },
  Tt = /^\s*\d+/,
  yw = /^%/,
  vw = /[\\^$*+?|[\]().{}]/g;
function Je(t, r, o) {
  var l = t < 0 ? "-" : "",
    u = (l ? -t : t) + "",
    c = u.length;
  return l + (c < o ? new Array(o - c + 1).join(r) + u : u);
}
function ww(t) {
  return t.replace(vw, "\\$&");
}
function gs(t) {
  return new RegExp("^(?:" + t.map(ww).join("|") + ")", "i");
}
function ys(t) {
  return new Map(t.map((r, o) => [r.toLowerCase(), o]));
}
function xw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 1));
  return l ? ((t.w = +l[0]), o + l[0].length) : -1;
}
function Sw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 1));
  return l ? ((t.u = +l[0]), o + l[0].length) : -1;
}
function kw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.U = +l[0]), o + l[0].length) : -1;
}
function _w(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.V = +l[0]), o + l[0].length) : -1;
}
function Cw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.W = +l[0]), o + l[0].length) : -1;
}
function $m(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 4));
  return l ? ((t.y = +l[0]), o + l[0].length) : -1;
}
function Im(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.y = +l[0] + (+l[0] > 68 ? 1900 : 2e3)), o + l[0].length) : -1;
}
function Ew(t, r, o) {
  var l = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(r.slice(o, o + 6));
  return l
    ? ((t.Z = l[1] ? 0 : -(l[2] + (l[3] || "00"))), o + l[0].length)
    : -1;
}
function Nw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 1));
  return l ? ((t.q = l[0] * 3 - 3), o + l[0].length) : -1;
}
function Tw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.m = l[0] - 1), o + l[0].length) : -1;
}
function Fm(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.d = +l[0]), o + l[0].length) : -1;
}
function Mw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 3));
  return l ? ((t.m = 0), (t.d = +l[0]), o + l[0].length) : -1;
}
function Lm(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.H = +l[0]), o + l[0].length) : -1;
}
function Pw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.M = +l[0]), o + l[0].length) : -1;
}
function Rw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 2));
  return l ? ((t.S = +l[0]), o + l[0].length) : -1;
}
function $w(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 3));
  return l ? ((t.L = +l[0]), o + l[0].length) : -1;
}
function Iw(t, r, o) {
  var l = Tt.exec(r.slice(o, o + 6));
  return l ? ((t.L = Math.floor(l[0] / 1e3)), o + l[0].length) : -1;
}
function Fw(t, r, o) {
  var l = yw.exec(r.slice(o, o + 1));
  return l ? o + l[0].length : -1;
}
function Lw(t, r, o) {
  var l = Tt.exec(r.slice(o));
  return l ? ((t.Q = +l[0]), o + l[0].length) : -1;
}
function zw(t, r, o) {
  var l = Tt.exec(r.slice(o));
  return l ? ((t.s = +l[0]), o + l[0].length) : -1;
}
function zm(t, r) {
  return Je(t.getDate(), r, 2);
}
function Dw(t, r) {
  return Je(t.getHours(), r, 2);
}
function Ow(t, r) {
  return Je(t.getHours() % 12 || 12, r, 2);
}
function jw(t, r) {
  return Je(1 + zd.count(Ni(t), t), r, 3);
}
function u0(t, r) {
  return Je(t.getMilliseconds(), r, 3);
}
function Aw(t, r) {
  return u0(t, r) + "000";
}
function Uw(t, r) {
  return Je(t.getMonth() + 1, r, 2);
}
function bw(t, r) {
  return Je(t.getMinutes(), r, 2);
}
function Bw(t, r) {
  return Je(t.getSeconds(), r, 2);
}
function Vw(t) {
  var r = t.getDay();
  return r === 0 ? 7 : r;
}
function Hw(t, r) {
  return Je(l0.count(Ni(t) - 1, t), r, 2);
}
function a0(t) {
  var r = t.getDay();
  return r >= 4 || r === 0 ? kl(t) : kl.ceil(t);
}
function Ww(t, r) {
  return ((t = a0(t)), Je(kl.count(Ni(t), t) + (Ni(t).getDay() === 4), r, 2));
}
function Qw(t) {
  return t.getDay();
}
function Yw(t, r) {
  return Je(va.count(Ni(t) - 1, t), r, 2);
}
function qw(t, r) {
  return Je(t.getFullYear() % 100, r, 2);
}
function Xw(t, r) {
  return ((t = a0(t)), Je(t.getFullYear() % 100, r, 2));
}
function Kw(t, r) {
  return Je(t.getFullYear() % 1e4, r, 4);
}
function Zw(t, r) {
  var o = t.getDay();
  return (
    (t = o >= 4 || o === 0 ? kl(t) : kl.ceil(t)),
    Je(t.getFullYear() % 1e4, r, 4)
  );
}
function Gw(t) {
  var r = t.getTimezoneOffset();
  return (
    (r > 0 ? "-" : ((r *= -1), "+")) +
    Je((r / 60) | 0, "0", 2) +
    Je(r % 60, "0", 2)
  );
}
function Dm(t, r) {
  return Je(t.getUTCDate(), r, 2);
}
function Jw(t, r) {
  return Je(t.getUTCHours(), r, 2);
}
function ex(t, r) {
  return Je(t.getUTCHours() % 12 || 12, r, 2);
}
function tx(t, r) {
  return Je(1 + Dd.count(Ti(t), t), r, 3);
}
function c0(t, r) {
  return Je(t.getUTCMilliseconds(), r, 3);
}
function nx(t, r) {
  return c0(t, r) + "000";
}
function rx(t, r) {
  return Je(t.getUTCMonth() + 1, r, 2);
}
function ox(t, r) {
  return Je(t.getUTCMinutes(), r, 2);
}
function ix(t, r) {
  return Je(t.getUTCSeconds(), r, 2);
}
function lx(t) {
  var r = t.getUTCDay();
  return r === 0 ? 7 : r;
}
function sx(t, r) {
  return Je(s0.count(Ti(t) - 1, t), r, 2);
}
function f0(t) {
  var r = t.getUTCDay();
  return r >= 4 || r === 0 ? _l(t) : _l.ceil(t);
}
function ux(t, r) {
  return (
    (t = f0(t)),
    Je(_l.count(Ti(t), t) + (Ti(t).getUTCDay() === 4), r, 2)
  );
}
function ax(t) {
  return t.getUTCDay();
}
function cx(t, r) {
  return Je(wa.count(Ti(t) - 1, t), r, 2);
}
function fx(t, r) {
  return Je(t.getUTCFullYear() % 100, r, 2);
}
function dx(t, r) {
  return ((t = f0(t)), Je(t.getUTCFullYear() % 100, r, 2));
}
function hx(t, r) {
  return Je(t.getUTCFullYear() % 1e4, r, 4);
}
function px(t, r) {
  var o = t.getUTCDay();
  return (
    (t = o >= 4 || o === 0 ? _l(t) : _l.ceil(t)),
    Je(t.getUTCFullYear() % 1e4, r, 4)
  );
}
function mx() {
  return "+0000";
}
function Om() {
  return "%";
}
function jm(t) {
  return +t;
}
function Am(t) {
  return Math.floor(+t / 1e3);
}
var pl, td, d0;
gx({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
});
function gx(t) {
  return (
    (pl = gw(t)),
    (td = pl.format),
    (d0 = pl.parse),
    pl.utcFormat,
    pl.utcParse,
    pl
  );
}
function ba(t) {
  return (t % 4 === 0 && t % 100 !== 0) || t % 400 === 0;
}
function h0(t) {
  const r = Math.trunc(t),
    o = ba(r) ? 366 : 365,
    l = Math.round((t - r) * o),
    u = d0("%Y-%j")(`${r}-${l}`);
  return hn(u, `Could not convert ${t} to date tried (year:${r} - day: ${l})`);
}
function p0(t) {
  const r = parseInt(td("%Y")(t)),
    o = parseInt(td("%j")(t)),
    l = ba(r) ? 366 : 365;
  return r + o / l;
}
function m0(t) {
  throw new Error(t);
}
function g0(t) {
  if (t === void 0) throw new Error("internal bug! unhandled undefined");
  return t;
}
function kt(t, r) {
  if (t === void 0) throw new Error(r);
}
function hn(t, r) {
  if (t === null) throw new Error(r);
  return t;
}
class y0 {
  constructor(r = new Rl(), o = {}) {
    ct(this, "done");
    ct(this, "started");
    ct(this, "level");
    ct(this, "currentNode");
    ct(this, "nodeStack");
    ct(this, "labelNext");
    ct(this, "lengthNext");
    ct(this, "taxonSet");
    ct(this, "tree");
    ct(this, "options");
    ((this.done = !1),
      (this.started = !1),
      (this.level = 0),
      (this.currentNode = void 0),
      (this.nodeStack = []),
      (this.labelNext = !1),
      (this.lengthNext = !1),
      (this.taxonSet = r),
      (this.options = o),
      (this.tree = new Wa({ taxonSet: this.taxonSet })));
  }
  isDone() {
    return this.done;
  }
  isStarted() {
    return this.started;
  }
  getTree() {
    if (!this.done)
      throw new Error("expecting a semi-colon at the end of the newick string");
    if (!this.started)
      throw new Error("No tree to give - parsing has not started.");
    return this.tree;
  }
  parseCharacter(r) {
    if (this.done) throw new Error("Parsing is done. We have seen a ';'");
    if (r.length > 2 && r.substring(0, 2) === "[&") {
      const o = ew(r);
      (kt(
        this.currentNode,
        "Internal Parsing error - Current not is not defined",
      ),
        (this.tree = this.tree.annotateNode(this.currentNode, o)));
    } else if (r === ";") {
      if (this.level > 0)
        throw new Error(
          "unexpected semi-colon in tree did not reach the root yet",
        );
      if (!this.started)
        throw new Error(
          "unexpected semi-colon in tree parsing has not started yet",
        );
      this.done = !0;
    } else if (r === "(") {
      if (((this.started = !0), this.labelNext))
        throw new Error("expecting a comma");
      let o;
      if (((this.level += 1), this.currentNode !== void 0)) {
        const l = this.tree.addNodes(1);
        ((this.tree = l.tree),
          (o = l.nodes[0]),
          this.nodeStack.push(this.currentNode));
      } else o = this.tree.getRoot();
      this.currentNode = o;
    } else if (r === ",") {
      if (((this.labelNext = !1), this.lengthNext))
        throw new Error("branch length missing");
      const o = this.nodeStack.pop();
      (kt(o, "Internal Parsing error - node stack unexpectedly empty"),
        kt(
          this.currentNode,
          "Internal Parsing error - Current not is not defined",
        ),
        (this.tree = this.tree.addChild(o, this.currentNode)),
        (this.currentNode = o));
    } else if (r === ")") {
      if (this.level === 0)
        throw new Error(
          "the brackets in the newick file are not balanced: too many closed",
        );
      if (((this.labelNext = !1), this.lengthNext))
        throw new Error("branch length missing");
      const o = this.nodeStack.pop();
      (kt(o, "Internal Parsing error - node stack unexpectedly empty"),
        kt(
          this.currentNode,
          "Internal Parsing error - Current not is not defined",
        ),
        (this.tree = this.tree.addChild(o, this.currentNode)),
        (this.level -= 1),
        (this.currentNode = o),
        (this.labelNext = !0));
    } else if (r === ":") ((this.labelNext = !1), (this.lengthNext = !0));
    else if (this.lengthNext)
      (kt(
        this.currentNode,
        "Internal Parsing error - Current not is not defined",
      ),
        (this.tree = this.tree.setLength(this.currentNode, parseFloat(r))),
        (this.lengthNext = !1));
    else if (this.labelNext) {
      if (r.startsWith("#"))
        (kt(
          this.currentNode,
          "Internal Parsing error - Current not is not defined",
        ),
          (this.tree = this.tree.setLabel(this.currentNode, r.slice(1))));
      else {
        let o = parseFloat(r);
        (isNaN(o) && (o = r),
          this.options.labelName
            ? (kt(
                this.currentNode,
                "Internal Parsing error - Current not is not defined",
              ),
              (this.tree = this.tree.annotateNode(
                this.currentNode,
                this.options.labelName,
                o,
              )))
            : console.warn(
                `No label name provided to newick parser but found label ${r}. It will be ignored`,
              ));
      }
      this.labelNext = !1;
    } else {
      let o = r;
      ((o.startsWith('"') || o.startsWith("'")) && (o = o.slice(1)),
        (o.endsWith('"') || o.endsWith("'")) && (o = o.slice(0, -1)),
        (o = o.trim()));
      const l = this.tree.addNodes(1);
      this.tree = l.tree;
      const u = l.nodes[0];
      let c;
      if (this.options.translateTaxonNames)
        if (this.options.translateTaxonNames.has(o))
          o = hn(
            this.options.translateTaxonNames.get(o),
            `${o} not found in taxon translation map`,
          );
        else
          throw new Error(
            `No mapping found for ${o} in tipNameMap. It's name will not be updated`,
          );
      if (this.taxonSet.isFinalized) {
        if (!this.taxonSet.hasTaxon(o))
          throw new Error(`Taxon ${o} not found in taxa - but found in tree`);
        c = this.taxonSet.getTaxonByName(o);
      } else (this.taxonSet.addTaxon(o), (c = this.taxonSet.getTaxonByName(o)));
      ((this.tree = this.tree.setTaxon(u, c)),
        this.currentNode && this.nodeStack.push(this.currentNode),
        (this.currentNode = u));
    }
  }
}
function nd(t, r = {}) {
  const o = r.taxonSet ? r.taxonSet : new Rl(),
    l = t
      .split(/\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/)
      .filter((c) => c.length > 0),
    u = new y0(o, r);
  for (const c of l) u.parseCharacter(c);
  return u.getTree();
}
function yx(t, r, o = {}) {
  const l = r
    .split(
      /\s*(?:\bBegin\s+|\bbegin\s+|\bBEGIN\s+|\bend\s*;|\bEnd\s*;|\bEND\s*;)\s*/,
    )
    .filter((u) => u !== "");
  if (l.length === 0 || l === void 0)
    throw new Error(
      "No nexus tokens found in string. This may not be a nexus formated tree",
    );
  if (l.shift().trim().toLowerCase() !== "#nexus")
    throw Error("File does not begin with #NEXUS is it a nexus file?");
  for (const u of l) {
    const c = u.replace(/^\s+|\s+$/g, "").split(/\n/);
    if (c.shift().toLowerCase().trim() === "trees;") {
      let p = !1;
      const m = new Map();
      for (const w of c)
        if (w.trim().toLowerCase() === "translate") p = !0;
        else if (p)
          if (w.trim() === ";") p = !1;
          else {
            const v = w
              .trim()
              .replace(",", "")
              .split(/\s*\s\s*/);
            m.set(v[0], v[1]);
          }
        else {
          const v = w.substring(w.indexOf("("));
          return m.size > 0
            ? nd(v, { parseAnnotations: !0, ...o, tipNameMap: m })
            : nd(v, { parseAnnotations: !0, ...o, tipNameMap: m });
        }
    }
  }
  throw new Error("No tree section found in nexus file");
}
var v0 = Symbol.for("immer-nothing"),
  rd = Symbol.for("immer-draftable"),
  En = Symbol.for("immer-state");
function rr(t, ...r) {
  throw new Error(
    `[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var Cl = Object.getPrototypeOf;
function El(t) {
  return !!t && !!t[En];
}
function Mi(t) {
  var r;
  return t
    ? w0(t) ||
        Array.isArray(t) ||
        !!t[rd] ||
        !!((r = t.constructor) != null && r[rd]) ||
        qs(t) ||
        Va(t)
    : !1;
}
var vx = Object.prototype.constructor.toString();
function w0(t) {
  if (!t || typeof t != "object") return !1;
  const r = Cl(t);
  if (r === null) return !0;
  const o = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
  return o === Object
    ? !0
    : typeof o == "function" && Function.toString.call(o) === vx;
}
function xa(t, r) {
  Ba(t) === 0
    ? Reflect.ownKeys(t).forEach((o) => {
        r(o, t[o], t);
      })
    : t.forEach((o, l) => r(l, o, t));
}
function Ba(t) {
  const r = t[En];
  return r ? r.type_ : Array.isArray(t) ? 1 : qs(t) ? 2 : Va(t) ? 3 : 0;
}
function od(t, r) {
  return Ba(t) === 2 ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r);
}
function x0(t, r, o) {
  const l = Ba(t);
  l === 2 ? t.set(r, o) : l === 3 ? t.add(o) : (t[r] = o);
}
function wx(t, r) {
  return t === r ? t !== 0 || 1 / t === 1 / r : t !== t && r !== r;
}
function qs(t) {
  return t instanceof Map;
}
function Va(t) {
  return t instanceof Set;
}
function wi(t) {
  return t.copy_ || t.base_;
}
function id(t, r) {
  if (qs(t)) return new Map(t);
  if (Va(t)) return new Set(t);
  if (Array.isArray(t)) return Array.prototype.slice.call(t);
  const o = w0(t);
  if (r === !0 || (r === "class_only" && !o)) {
    const l = Object.getOwnPropertyDescriptors(t);
    delete l[En];
    let u = Reflect.ownKeys(l);
    for (let c = 0; c < u.length; c++) {
      const p = u[c],
        m = l[p];
      (m.writable === !1 && ((m.writable = !0), (m.configurable = !0)),
        (m.get || m.set) &&
          (l[p] = {
            configurable: !0,
            writable: !0,
            enumerable: m.enumerable,
            value: t[p],
          }));
    }
    return Object.create(Cl(t), l);
  } else {
    const l = Cl(t);
    if (l !== null && o) return { ...t };
    const u = Object.create(l);
    return Object.assign(u, t);
  }
}
function Od(t, r = !1) {
  return (
    Ha(t) ||
      El(t) ||
      !Mi(t) ||
      (Ba(t) > 1 &&
        Object.defineProperties(t, {
          set: { value: Ju },
          add: { value: Ju },
          clear: { value: Ju },
          delete: { value: Ju },
        }),
      Object.freeze(t),
      r && Object.values(t).forEach((o) => Od(o, !0))),
    t
  );
}
function Ju() {
  rr(2);
}
function Ha(t) {
  return Object.isFrozen(t);
}
var xx = {};
function Pi(t) {
  const r = xx[t];
  return (r || rr(0, t), r);
}
var Ds;
function S0() {
  return Ds;
}
function Sx(t, r) {
  return {
    drafts_: [],
    parent_: t,
    immer_: r,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function Um(t, r) {
  r &&
    (Pi("Patches"),
    (t.patches_ = []),
    (t.inversePatches_ = []),
    (t.patchListener_ = r));
}
function ld(t) {
  (sd(t), t.drafts_.forEach(kx), (t.drafts_ = null));
}
function sd(t) {
  t === Ds && (Ds = t.parent_);
}
function bm(t) {
  return (Ds = Sx(Ds, t));
}
function kx(t) {
  const r = t[En];
  r.type_ === 0 || r.type_ === 1 ? r.revoke_() : (r.revoked_ = !0);
}
function Bm(t, r) {
  r.unfinalizedDrafts_ = r.drafts_.length;
  const o = r.drafts_[0];
  return (
    t !== void 0 && t !== o
      ? (o[En].modified_ && (ld(r), rr(4)),
        Mi(t) && ((t = Sa(r, t)), r.parent_ || ka(r, t)),
        r.patches_ &&
          Pi("Patches").generateReplacementPatches_(
            o[En].base_,
            t,
            r.patches_,
            r.inversePatches_,
          ))
      : (t = Sa(r, o, [])),
    ld(r),
    r.patches_ && r.patchListener_(r.patches_, r.inversePatches_),
    t !== v0 ? t : void 0
  );
}
function Sa(t, r, o) {
  if (Ha(r)) return r;
  const l = r[En];
  if (!l) return (xa(r, (u, c) => Vm(t, l, r, u, c, o)), r);
  if (l.scope_ !== t) return r;
  if (!l.modified_) return (ka(t, l.base_, !0), l.base_);
  if (!l.finalized_) {
    ((l.finalized_ = !0), l.scope_.unfinalizedDrafts_--);
    const u = l.copy_;
    let c = u,
      p = !1;
    (l.type_ === 3 && ((c = new Set(u)), u.clear(), (p = !0)),
      xa(c, (m, w) => Vm(t, l, u, m, w, o, p)),
      ka(t, u, !1),
      o &&
        t.patches_ &&
        Pi("Patches").generatePatches_(l, o, t.patches_, t.inversePatches_));
  }
  return l.copy_;
}
function Vm(t, r, o, l, u, c, p) {
  if (El(u)) {
    const m =
        c && r && r.type_ !== 3 && !od(r.assigned_, l) ? c.concat(l) : void 0,
      w = Sa(t, u, m);
    if ((x0(o, l, w), El(w))) t.canAutoFreeze_ = !1;
    else return;
  } else p && o.add(u);
  if (Mi(u) && !Ha(u)) {
    if (!t.immer_.autoFreeze_ && t.unfinalizedDrafts_ < 1) return;
    (Sa(t, u),
      (!r || !r.scope_.parent_) &&
        typeof l != "symbol" &&
        (qs(o) ? o.has(l) : Object.prototype.propertyIsEnumerable.call(o, l)) &&
        ka(t, u));
  }
}
function ka(t, r, o = !1) {
  !t.parent_ && t.immer_.autoFreeze_ && t.canAutoFreeze_ && Od(r, o);
}
function _x(t, r) {
  const o = Array.isArray(t),
    l = {
      type_: o ? 1 : 0,
      scope_: r ? r.scope_ : S0(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: r,
      base_: t,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let u = l,
    c = jd;
  o && ((u = [l]), (c = Os));
  const { revoke: p, proxy: m } = Proxy.revocable(u, c);
  return ((l.draft_ = m), (l.revoke_ = p), m);
}
var jd = {
    get(t, r) {
      if (r === En) return t;
      const o = wi(t);
      if (!od(o, r)) return Cx(t, o, r);
      const l = o[r];
      return t.finalized_ || !Mi(l)
        ? l
        : l === $f(t.base_, r)
          ? (If(t), (t.copy_[r] = ad(l, t)))
          : l;
    },
    has(t, r) {
      return r in wi(t);
    },
    ownKeys(t) {
      return Reflect.ownKeys(wi(t));
    },
    set(t, r, o) {
      const l = k0(wi(t), r);
      if (l != null && l.set) return (l.set.call(t.draft_, o), !0);
      if (!t.modified_) {
        const u = $f(wi(t), r),
          c = u == null ? void 0 : u[En];
        if (c && c.base_ === o)
          return ((t.copy_[r] = o), (t.assigned_[r] = !1), !0);
        if (wx(o, u) && (o !== void 0 || od(t.base_, r))) return !0;
        (If(t), ud(t));
      }
      return (
        (t.copy_[r] === o && (o !== void 0 || r in t.copy_)) ||
          (Number.isNaN(o) && Number.isNaN(t.copy_[r])) ||
          ((t.copy_[r] = o), (t.assigned_[r] = !0)),
        !0
      );
    },
    deleteProperty(t, r) {
      return (
        $f(t.base_, r) !== void 0 || r in t.base_
          ? ((t.assigned_[r] = !1), If(t), ud(t))
          : delete t.assigned_[r],
        t.copy_ && delete t.copy_[r],
        !0
      );
    },
    getOwnPropertyDescriptor(t, r) {
      const o = wi(t),
        l = Reflect.getOwnPropertyDescriptor(o, r);
      return (
        l && {
          writable: !0,
          configurable: t.type_ !== 1 || r !== "length",
          enumerable: l.enumerable,
          value: o[r],
        }
      );
    },
    defineProperty() {
      rr(11);
    },
    getPrototypeOf(t) {
      return Cl(t.base_);
    },
    setPrototypeOf() {
      rr(12);
    },
  },
  Os = {};
xa(jd, (t, r) => {
  Os[t] = function () {
    return ((arguments[0] = arguments[0][0]), r.apply(this, arguments));
  };
});
Os.deleteProperty = function (t, r) {
  return Os.set.call(this, t, r, void 0);
};
Os.set = function (t, r, o) {
  return jd.set.call(this, t[0], r, o, t[0]);
};
function $f(t, r) {
  const o = t[En];
  return (o ? wi(o) : t)[r];
}
function Cx(t, r, o) {
  var u;
  const l = k0(r, o);
  return l
    ? "value" in l
      ? l.value
      : (u = l.get) == null
        ? void 0
        : u.call(t.draft_)
    : void 0;
}
function k0(t, r) {
  if (!(r in t)) return;
  let o = Cl(t);
  for (; o; ) {
    const l = Object.getOwnPropertyDescriptor(o, r);
    if (l) return l;
    o = Cl(o);
  }
}
function ud(t) {
  t.modified_ || ((t.modified_ = !0), t.parent_ && ud(t.parent_));
}
function If(t) {
  t.copy_ || (t.copy_ = id(t.base_, t.scope_.immer_.useStrictShallowCopy_));
}
var Ex = class {
  constructor(t) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (r, o, l) => {
        if (typeof r == "function" && typeof o != "function") {
          const c = o;
          o = r;
          const p = this;
          return function (m = c, ...w) {
            return p.produce(m, (v) => o.call(this, v, ...w));
          };
        }
        (typeof o != "function" && rr(6),
          l !== void 0 && typeof l != "function" && rr(7));
        let u;
        if (Mi(r)) {
          const c = bm(this),
            p = ad(r, void 0);
          let m = !0;
          try {
            ((u = o(p)), (m = !1));
          } finally {
            m ? ld(c) : sd(c);
          }
          return (Um(c, l), Bm(u, c));
        } else if (!r || typeof r != "object") {
          if (
            ((u = o(r)),
            u === void 0 && (u = r),
            u === v0 && (u = void 0),
            this.autoFreeze_ && Od(u, !0),
            l)
          ) {
            const c = [],
              p = [];
            (Pi("Patches").generateReplacementPatches_(r, u, c, p), l(c, p));
          }
          return u;
        } else rr(1, r);
      }),
      (this.produceWithPatches = (r, o) => {
        if (typeof r == "function")
          return (c, ...p) => this.produceWithPatches(c, (m) => r(m, ...p));
        let l, u;
        return [
          this.produce(r, o, (c, p) => {
            ((l = c), (u = p));
          }),
          l,
          u,
        ];
      }),
      typeof (t == null ? void 0 : t.autoFreeze) == "boolean" &&
        this.setAutoFreeze(t.autoFreeze),
      typeof (t == null ? void 0 : t.useStrictShallowCopy) == "boolean" &&
        this.setUseStrictShallowCopy(t.useStrictShallowCopy));
  }
  createDraft(t) {
    (Mi(t) || rr(8), El(t) && (t = Nx(t)));
    const r = bm(this),
      o = ad(t, void 0);
    return ((o[En].isManual_ = !0), sd(r), o);
  }
  finishDraft(t, r) {
    const o = t && t[En];
    (!o || !o.isManual_) && rr(9);
    const { scope_: l } = o;
    return (Um(l, r), Bm(void 0, l));
  }
  setAutoFreeze(t) {
    this.autoFreeze_ = t;
  }
  setUseStrictShallowCopy(t) {
    this.useStrictShallowCopy_ = t;
  }
  applyPatches(t, r) {
    let o;
    for (o = r.length - 1; o >= 0; o--) {
      const u = r[o];
      if (u.path.length === 0 && u.op === "replace") {
        t = u.value;
        break;
      }
    }
    o > -1 && (r = r.slice(o + 1));
    const l = Pi("Patches").applyPatches_;
    return El(t) ? l(t, r) : this.produce(t, (u) => l(u, r));
  }
};
function ad(t, r) {
  const o = qs(t)
    ? Pi("MapSet").proxyMap_(t, r)
    : Va(t)
      ? Pi("MapSet").proxySet_(t, r)
      : _x(t, r);
  return ((r ? r.scope_ : S0()).drafts_.push(o), o);
}
function Nx(t) {
  return (El(t) || rr(10, t), _0(t));
}
function _0(t) {
  if (!Mi(t) || Ha(t)) return t;
  const r = t[En];
  let o;
  if (r) {
    if (!r.modified_) return r.base_;
    ((r.finalized_ = !0), (o = id(t, r.scope_.immer_.useStrictShallowCopy_)));
  } else o = id(t, !0);
  return (
    xa(o, (l, u) => {
      x0(o, l, _0(u));
    }),
    r && (r.finalized_ = !1),
    o
  );
}
var Tx = new Ex(),
  bt = Tx.produce;
function Mx(t) {
  return Math.abs((t = Math.round(t))) >= 1e21
    ? t.toLocaleString("en").replace(/,/g, "")
    : t.toString(10);
}
function _a(t, r) {
  if (
    (o = (t = r ? t.toExponential(r - 1) : t.toExponential()).indexOf("e")) < 0
  )
    return null;
  var o,
    l = t.slice(0, o);
  return [l.length > 1 ? l[0] + l.slice(2) : l, +t.slice(o + 1)];
}
function Nl(t) {
  return ((t = _a(Math.abs(t))), t ? t[1] : NaN);
}
function Px(t, r) {
  return function (o, l) {
    for (
      var u = o.length, c = [], p = 0, m = t[0], w = 0;
      u > 0 &&
      m > 0 &&
      (w + m + 1 > l && (m = Math.max(1, l - w)),
      c.push(o.substring((u -= m), u + m)),
      !((w += m + 1) > l));

    )
      m = t[(p = (p + 1) % t.length)];
    return c.reverse().join(r);
  };
}
function Rx(t) {
  return function (r) {
    return r.replace(/[0-9]/g, function (o) {
      return t[+o];
    });
  };
}
var $x =
  /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ca(t) {
  if (!(r = $x.exec(t))) throw new Error("invalid format: " + t);
  var r;
  return new Ad({
    fill: r[1],
    align: r[2],
    sign: r[3],
    symbol: r[4],
    zero: r[5],
    width: r[6],
    comma: r[7],
    precision: r[8] && r[8].slice(1),
    trim: r[9],
    type: r[10],
  });
}
Ca.prototype = Ad.prototype;
function Ad(t) {
  ((this.fill = t.fill === void 0 ? " " : t.fill + ""),
    (this.align = t.align === void 0 ? ">" : t.align + ""),
    (this.sign = t.sign === void 0 ? "-" : t.sign + ""),
    (this.symbol = t.symbol === void 0 ? "" : t.symbol + ""),
    (this.zero = !!t.zero),
    (this.width = t.width === void 0 ? void 0 : +t.width),
    (this.comma = !!t.comma),
    (this.precision = t.precision === void 0 ? void 0 : +t.precision),
    (this.trim = !!t.trim),
    (this.type = t.type === void 0 ? "" : t.type + ""));
}
Ad.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? "0" : "") +
    (this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
    (this.comma ? "," : "") +
    (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) +
    (this.trim ? "~" : "") +
    this.type
  );
};
function Ix(t) {
  e: for (var r = t.length, o = 1, l = -1, u; o < r; ++o)
    switch (t[o]) {
      case ".":
        l = u = o;
        break;
      case "0":
        (l === 0 && (l = o), (u = o));
        break;
      default:
        if (!+t[o]) break e;
        l > 0 && (l = 0);
        break;
    }
  return l > 0 ? t.slice(0, l) + t.slice(u + 1) : t;
}
var C0;
function Fx(t, r) {
  var o = _a(t, r);
  if (!o) return t + "";
  var l = o[0],
    u = o[1],
    c = u - (C0 = Math.max(-8, Math.min(8, Math.floor(u / 3))) * 3) + 1,
    p = l.length;
  return c === p
    ? l
    : c > p
      ? l + new Array(c - p + 1).join("0")
      : c > 0
        ? l.slice(0, c) + "." + l.slice(c)
        : "0." + new Array(1 - c).join("0") + _a(t, Math.max(0, r + c - 1))[0];
}
function Hm(t, r) {
  var o = _a(t, r);
  if (!o) return t + "";
  var l = o[0],
    u = o[1];
  return u < 0
    ? "0." + new Array(-u).join("0") + l
    : l.length > u + 1
      ? l.slice(0, u + 1) + "." + l.slice(u + 1)
      : l + new Array(u - l.length + 2).join("0");
}
const Wm = {
  "%": (t, r) => (t * 100).toFixed(r),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Mx,
  e: (t, r) => t.toExponential(r),
  f: (t, r) => t.toFixed(r),
  g: (t, r) => t.toPrecision(r),
  o: (t) => Math.round(t).toString(8),
  p: (t, r) => Hm(t * 100, r),
  r: Hm,
  s: Fx,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16),
};
function Qm(t) {
  return t;
}
var Ym = Array.prototype.map,
  qm = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "µ",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
  ];
function Lx(t) {
  var r =
      t.grouping === void 0 || t.thousands === void 0
        ? Qm
        : Px(Ym.call(t.grouping, Number), t.thousands + ""),
    o = t.currency === void 0 ? "" : t.currency[0] + "",
    l = t.currency === void 0 ? "" : t.currency[1] + "",
    u = t.decimal === void 0 ? "." : t.decimal + "",
    c = t.numerals === void 0 ? Qm : Rx(Ym.call(t.numerals, String)),
    p = t.percent === void 0 ? "%" : t.percent + "",
    m = t.minus === void 0 ? "−" : t.minus + "",
    w = t.nan === void 0 ? "NaN" : t.nan + "";
  function v(T) {
    T = Ca(T);
    var M = T.fill,
      P = T.align,
      $ = T.sign,
      L = T.symbol,
      z = T.zero,
      D = T.width,
      W = T.comma,
      H = T.precision,
      Y = T.trim,
      oe = T.type;
    (oe === "n"
      ? ((W = !0), (oe = "g"))
      : Wm[oe] || (H === void 0 && (H = 12), (Y = !0), (oe = "g")),
      (z || (M === "0" && P === "=")) && ((z = !0), (M = "0"), (P = "=")));
    var fe =
        L === "$"
          ? o
          : L === "#" && /[boxX]/.test(oe)
            ? "0" + oe.toLowerCase()
            : "",
      ae = L === "$" ? l : /[%p]/.test(oe) ? p : "",
      _e = Wm[oe],
      Ee = /[defgprs%]/.test(oe);
    H =
      H === void 0
        ? 6
        : /[gprs]/.test(oe)
          ? Math.max(1, Math.min(21, H))
          : Math.max(0, Math.min(20, H));
    function xe(te) {
      var Se = fe,
        ie = ae,
        ke,
        Ze,
        je;
      if (oe === "c") ((ie = _e(te) + ie), (te = ""));
      else {
        te = +te;
        var Ne = te < 0 || 1 / te < 0;
        if (
          ((te = isNaN(te) ? w : _e(Math.abs(te), H)),
          Y && (te = Ix(te)),
          Ne && +te == 0 && $ !== "+" && (Ne = !1),
          (Se =
            (Ne ? ($ === "(" ? $ : m) : $ === "-" || $ === "(" ? "" : $) + Se),
          (ie =
            (oe === "s" ? qm[8 + C0 / 3] : "") +
            ie +
            (Ne && $ === "(" ? ")" : "")),
          Ee)
        ) {
          for (ke = -1, Ze = te.length; ++ke < Ze; )
            if (((je = te.charCodeAt(ke)), 48 > je || je > 57)) {
              ((ie = (je === 46 ? u + te.slice(ke + 1) : te.slice(ke)) + ie),
                (te = te.slice(0, ke)));
              break;
            }
        }
      }
      W && !z && (te = r(te, 1 / 0));
      var G = Se.length + te.length + ie.length,
        ce = G < D ? new Array(D - G + 1).join(M) : "";
      switch (
        (W &&
          z &&
          ((te = r(ce + te, ce.length ? D - ie.length : 1 / 0)), (ce = "")),
        P)
      ) {
        case "<":
          te = Se + te + ie + ce;
          break;
        case "=":
          te = Se + ce + te + ie;
          break;
        case "^":
          te = ce.slice(0, (G = ce.length >> 1)) + Se + te + ie + ce.slice(G);
          break;
        default:
          te = ce + Se + te + ie;
          break;
      }
      return c(te);
    }
    return (
      (xe.toString = function () {
        return T + "";
      }),
      xe
    );
  }
  function _(T, M) {
    var P = v(((T = Ca(T)), (T.type = "f"), T)),
      $ = Math.max(-8, Math.min(8, Math.floor(Nl(M) / 3))) * 3,
      L = Math.pow(10, -$),
      z = qm[8 + $ / 3];
    return function (D) {
      return P(L * D) + z;
    };
  }
  return { format: v, formatPrefix: _ };
}
var ea, js, E0;
zx({ thousands: ",", grouping: [3], currency: ["$", ""] });
function zx(t) {
  return ((ea = Lx(t)), (js = ea.format), (E0 = ea.formatPrefix), ea);
}
function Dx(t) {
  return Math.max(0, -Nl(Math.abs(t)));
}
function Ox(t, r) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(Nl(r) / 3))) * 3 - Nl(Math.abs(t)),
  );
}
function jx(t, r) {
  return (
    (t = Math.abs(t)),
    (r = Math.abs(r) - t),
    Math.max(0, Nl(r) - Nl(t)) + 1
  );
}
function N0(t, r) {
  const o = t._data.nodes.allNodes[r];
  return o === void 0 ? Ir() : Ua(o);
}
function Ud(t, r) {
  if (typeof r == "number") return N0(t, r);
  if (r instanceof Object) return cd(t, r);
  if (typeof r == "string") {
    const o = Ls(t.taxonSet._data, r);
    return o.type === rt.Some ? cd(t, o.value) : Ax(t, r);
  }
  return Ir();
}
function cd(t, r) {
  const o = t._data.nodes.byTaxon[r.number];
  return o === void 0 ? Ir() : Ud(t, o);
}
function Ax(t, r) {
  const o = t._data.nodes.byLabel[r];
  return o === void 0 ? Ir() : N0(t, o);
}
function Ff(t, r, o) {
  const l = t.getNode(r.number).annotations[o];
  return l === void 0 ? Ir() : Ua(l);
}
function fd(t, r) {
  const o = t._data.nodeToTaxon[r.number];
  return o === void 0 ? Ir() : T0(t, o);
}
function T0(t, r) {
  return typeof r == "number"
    ? Ls(t.taxonSet._data, o0(t.taxonSet._data, r))
    : typeof r == "string"
      ? Ls(t.taxonSet._data, r)
      : fd(t, r);
}
function Lf(t, r) {
  const o = t._data.nodes.allNodes[r.number];
  if (o === void 0) return Ir();
  const l = o.parent;
  return l === void 0 ? Ir() : Ud(t, l);
}
const It = [];
for (let t = 0; t < 256; ++t) It.push((t + 256).toString(16).slice(1));
function Ux(t, r = 0) {
  return (
    It[t[r + 0]] +
    It[t[r + 1]] +
    It[t[r + 2]] +
    It[t[r + 3]] +
    "-" +
    It[t[r + 4]] +
    It[t[r + 5]] +
    "-" +
    It[t[r + 6]] +
    It[t[r + 7]] +
    "-" +
    It[t[r + 8]] +
    It[t[r + 9]] +
    "-" +
    It[t[r + 10]] +
    It[t[r + 11]] +
    It[t[r + 12]] +
    It[t[r + 13]] +
    It[t[r + 14]] +
    It[t[r + 15]]
  ).toLowerCase();
}
let zf;
const bx = new Uint8Array(16);
function Bx() {
  if (!zf) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
      );
    zf = crypto.getRandomValues.bind(crypto);
  }
  return zf(bx);
}
const Vx =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  Xm = { randomUUID: Vx };
function Hx(t, r, o) {
  var u, c, p;
  t = t || {};
  const l =
    (p =
      (c = t.random) != null ? c : (u = t.rng) == null ? void 0 : u.call(t)) !=
    null
      ? p
      : Bx();
  if (l.length < 16) throw new Error("Random bytes length must be >= 16");
  return ((l[6] = (l[6] & 15) | 64), (l[8] = (l[8] & 63) | 128), Ux(l));
}
function ta(t, r, o) {
  return Xm.randomUUID && !t ? Xm.randomUUID() : Hx(t);
}
var wg;
wg = rd;
class Wa {
  constructor(r = {}) {
    ct(this, wg, !0);
    ct(this, "_data");
    ct(this, "taxonSet");
    const { data: o, taxonSet: l } = r;
    let u = o;
    (l ? (this.taxonSet = l) : (this.taxonSet = new Rl()),
      u === void 0 &&
        (u = {
          nodes: {
            allNodes: [
              {
                number: 0,
                children: [],
                parent: void 0,
                label: void 0,
                length: void 0,
                taxon: void 0,
                annotations: {},
                _id: ta(),
              },
            ],
            byTaxon: [],
            byLabel: {},
          },
          nodeToTaxon: [],
          rootNode: 0,
          is_rooted: !0,
          annotations: {},
          heights: [],
          hasLengths: !1,
        }),
      (this._data = u));
  }
  lockTaxa() {
    return (this.taxonSet.lockTaxa(), this);
  }
  addTaxon(r) {
    return (this.taxonSet.addTaxon(r), this);
  }
  getTaxonCount() {
    return this.taxonSet.getTaxonCount();
  }
  getTaxonSet() {
    return this.taxonSet;
  }
  static fromNewick(r, o = {}) {
    return nd(r, o);
  }
  static fromNexus(r, o) {
    const l = new this();
    return yx(l, r, o);
  }
  static fromString(r, o) {
    return r.toLowerCase().includes("#nexus")
      ? this.fromNexus(r, o)
      : this.fromNewick(r, o);
  }
  static fromTree(r, o) {
    let l = new this();
    const u = (c, p) => {
      const m = [];
      let w;
      for (const v of c.getChildren(p)) m.push(u(c, v));
      p !== o
        ? ((l = this._addNodeWithMetadata(c, p, l)),
          (w = l.getNode(l.getNodeCount() - 1)))
        : ((w = l.getRoot()), this._copyNodeMetadata(c, p, l, w));
      for (const v of m) l = l.addChild(w, v);
      return w;
    };
    return (u(r, o), (l = l.deleteLength(l.getRoot())), l);
  }
  static _addNodeWithMetadata(r, o, l) {
    const u = l.addNodes(1),
      c = u.nodes[0];
    return ((l = u.tree), (l = this._copyNodeMetadata(r, o, l, c)), l);
  }
  static _copyNodeMetadata(r, o, l, u) {
    if (r.hasTaxon(o)) {
      const c = r.getTaxonFromNode(o);
      ((l = l.addTaxon(c)),
        console.log("Current taxa:", l.taxonSet),
        (l = l.setTaxon(u, c)));
    }
    if (r.hasLabel(o)) {
      const c = r.getLabel(o);
      l = l.setLabel(u, c);
    }
    for (const c of r.getAnnotationKeys())
      if (r.hasAnnotation(o, c)) {
        const p = r.getFullNodeAnnotation(o, c);
        if (p.type === et.MARKOV_JUMPS) {
          const m = p.value.map((w) => [Number(w.time), w.from, w.to]);
          l = l.annotateNode(u, c, m);
        } else l = l.annotateNode(u, c, p.value);
      }
    if (r.hasBranchLength(o)) {
      const c = r.getLength(o);
      l = l.setLength(u, c);
    }
    return l;
  }
  isRooted() {
    return this._data.is_rooted;
  }
  getAnnotationType(r) {
    if (this._data.annotations[r] === void 0)
      throw new Error(`No annotation found with name: ${r}`);
    return this._data.annotations[r].type;
  }
  getAnnotationKeys() {
    return Object.keys(this._data.annotations);
  }
  getRoot() {
    return this._data.nodes.allNodes[this._data.rootNode];
  }
  getNodeCount() {
    return this._data.nodes.allNodes.length;
  }
  getInternalNodeCount() {
    return this._data.nodes.allNodes.filter((r) => r.children.length > 0)
      .length;
  }
  getExternalNodeCount() {
    return this._data.nodes.allNodes.filter((r) => r.children.length == 0)
      .length;
  }
  getInternalNodes() {
    return this._data.nodes.allNodes.filter((r) => r.children.length > 0);
  }
  getExternalNodes() {
    return this._data.nodes.allNodes.filter((r) => r.children.length == 0);
  }
  getNodes() {
    return this._data.nodes.allNodes;
  }
  getNode(r) {
    const o = Ud(this, r);
    switch (o.type) {
      case rt.Some:
        return o.value;
      case rt.Nothing:
        throw new Error("No node found");
    }
  }
  getNodeByTaxon(r) {
    const o = cd(this, r);
    switch (o.type) {
      case rt.Nothing:
        throw new Error(`No node found for Taxon ${r.name}`);
      case rt.Some:
        return o.value;
    }
  }
  getTaxonByName(r) {
    return this.taxonSet.getTaxonByName(r);
  }
  getNodeByLabel(r) {
    return this.getNode(this._data.nodes.byLabel[r]);
  }
  hasTaxon(r) {
    switch (fd(this, r).type) {
      case rt.Some:
        return !0;
      case rt.Nothing:
        return !1;
    }
  }
  getTaxonFromNode(r) {
    const o = fd(this, r);
    switch (o.type) {
      case rt.Some:
        return o.value;
      case rt.Nothing:
        throw new Error("Node taxon found for the provided node");
    }
  }
  getTaxon(r) {
    const o = T0(this, r);
    switch (o.type) {
      case rt.Some:
        return o.value;
      case rt.Nothing:
        throw new Error("Node taxon found that matched the provided id");
    }
  }
  hasNodeHeights() {
    throw new Error("hasNodeHeights not implemented.");
  }
  getHeight(r) {
    let o = -1;
    for (const l of Xs(this)) {
      const u = this.getDivergence(l);
      u > o && (o = u);
    }
    return o - this.getDivergence(r);
  }
  hasBranchLength(r) {
    return this.getNode(r.number).length !== void 0;
  }
  getLength(r) {
    const o = this.getNode(r.number).length;
    if (o === void 0) {
      if (this.hasLengths())
        throw new Error(
          `The tree has lengths but, no length was found for node ${r.number}`,
        );
      return (
        console.warn(
          "The tree does not have branchlengths so a length of 1 is used as default",
        ),
        1
      );
    }
    return o;
  }
  hasLengths() {
    return this._data.hasLengths;
  }
  _toString(r, o) {
    return (
      o === void 0 && (o = { blFormat: js("0.2"), includeAnnotations: !1 }),
      (this.getChildCount(r) > 0
        ? `(${this.getChildren(r)
            .map((l) => this._toString(l, o))
            .join(",")})${this.hasLabel(r) ? "#" + this.getLabel(r) : ""}`
        : this.hasTaxon(r)
          ? this.getTaxonFromNode(r).name
          : "") +
        (o.includeAnnotations ? this._writeAnnotations(r) : "") +
        (this.hasBranchLength(r) ? `:${o.blFormat(this.getLength(r))}` : "")
    );
  }
  _writeAnnotations(r) {
    const o = this._data.nodes.allNodes[r.number].annotations;
    if (Object.keys(o).length === 0) return "";
    let l = "[&",
      u = 0;
    for (const [c, p] of Object.entries(o))
      (u > 0 && (l += ", "), (l += `${c}=${rw(p)}`), (u += 1));
    return ((l += "]"), l);
  }
  toNewick(r, o) {
    const l = { blFormat: js("0.2"), includeAnnotations: !1, ...o };
    return (r === void 0 && (r = this.getRoot()), this._toString(r, l) + ";");
  }
  getMRCA(r, o) {
    if (Array.isArray(r)) {
      const l = r;
      if (l.length === 0) throw new Error("No nodes provided to get MRCA");
      let u = l[0];
      for (let c = 1; c < l.length; c++)
        if (((u = this.getMRCA(u, l[c])), this.isRoot(u))) return u;
      return u;
    } else {
      if (o === void 0)
        throw new Error(
          "No second node provided. A node must be provided if the first value is not an array",
        );
      const l = [...this.getPathToRoot(r)];
      let u = null;
      for (const c of this.getPathToRoot(o))
        if (l.includes(c)) {
          u = c;
          break;
        }
      if (u === null) throw new Error("No MRCA found");
      return u;
    }
  }
  getPath(r, o) {
    const l = [],
      u = this.getMRCA(r, o);
    for (let c of [r, o]) for (; c != u; ) (l.push(c), (c = this.getParent(c)));
    return l;
  }
  getPathLength(r, o) {
    let l = 0;
    const u = this.getMRCA(r, o);
    for (let c of [r, o])
      for (; c != u; ) {
        const p = this.getLength(c);
        ((l += p), (c = this.getParent(c)));
      }
    return l;
  }
  *getPathToRoot(r) {
    let o = r;
    for (; !this.isRoot(o); ) (yield o, (o = this.getParent(o)));
    yield o;
  }
  getNextSibling(r) {
    if (!this.hasLeftSibling(r) && !this.hasRightSibling(r))
      throw new Error(`Node ${r.number} has no sibling`);
    const o = this.getParent(r),
      l = o.children.map((u) => u).indexOf(r.number);
    return this.getChild(o, (l + 1) % this.getChildCount(o));
  }
  hasRightSibling(r) {
    const o = Lf(this, r);
    switch (o.type) {
      case rt.Nothing:
        return !1;
      case rt.Some:
        return (
          o.value.children.map((l) => l).indexOf(r.number) <
          this.getChildCount(o.value) - 1
        );
    }
  }
  getRightSibling(r) {
    if (!this.hasRightSibling(r))
      throw new Error(`node ${r.number} does not have a right sibling`);
    const o = this.getParent(r),
      l = o.children.map((u) => u).indexOf(r.number);
    return this.getChild(o, l + 1);
  }
  hasLeftSibling(r) {
    const o = Lf(this, r);
    switch (o.type) {
      case rt.Nothing:
        return !1;
      case rt.Some:
        return (
          this.getChildCount(o.value) > 1 &&
          o.value.children.map((l) => l).indexOf(r.number) > 0
        );
    }
  }
  getLeftSibling(r) {
    if (!this.hasLeftSibling(r))
      throw new Error(`node ${r.number} does not have a left sibling`);
    const o = this.getParent(r),
      l = o.children.map((u) => u).indexOf(r.number);
    return this.getChild(o, l - 1);
  }
  getDivergence(r) {
    let o = 0;
    for (const l of this.getPathToRoot(r))
      this.isRoot(l)
        ? this.hasBranchLength(l) && (o += this.getLength(l))
        : (o += this.getLength(l));
    return o;
  }
  getChildCount(r) {
    if (!this._data.nodes.allNodes[r.number])
      throw new Error(`Node ${r.number} not found`);
    return this._data.nodes.allNodes[r.number].children.length;
  }
  getChild(r, o) {
    return this._data.nodes.allNodes[
      this._data.nodes.allNodes[r.number].children[o]
    ];
  }
  getParent(r) {
    const o = Lf(this, r);
    switch (o.type) {
      case rt.Some:
        return o.value;
      case rt.Nothing:
        throw new Error(`No parent for node ${r.number}`);
    }
  }
  getChildren(r) {
    return this._data.nodes.allNodes[r.number].children.map((o) =>
      this.getNode(o),
    );
  }
  hasLabel(r) {
    return this._data.nodes.allNodes[r.number].label !== void 0;
  }
  getLabel(r) {
    const o = this._data.nodes.allNodes[r.number].label;
    if (o === void 0) throw new Error(`no label for node ${r.number}`);
    return o;
  }
  isExternal(r) {
    return this.getNode(r.number).children.length === 0;
  }
  isInternal(r) {
    return this.getNode(r.number).children.length > 0;
  }
  isRoot(r) {
    return this._data.rootNode === r.number;
  }
  addNodes(r = 1) {
    const o = [];
    return {
      tree: bt(this, (l) => {
        const u = l._data.nodes.allNodes.length;
        for (let c = 0; c < r; c++) {
          const p = {
            number: u + c,
            children: [],
            parent: void 0,
            label: void 0,
            length: void 0,
            taxon: void 0,
            annotations: {},
            _id: ta(),
          };
          (o.push(p), l._data.nodes.allNodes.push(p));
        }
      }),
      nodes: o,
    };
  }
  setTaxon(r, o) {
    if (o !== this.taxonSet.getTaxonByName(o.name))
      throw new Error(
        `Taxon ${o.name} is either not in the taxon set. Has it been copied?`,
      );
    return bt(this, (l) => {
      const u = l.getNode(r.number);
      ((u.taxon = o.number),
        (l._data.nodes.byTaxon[o.number] = r.number),
        (l._data.nodeToTaxon[r.number] = o.number));
    });
  }
  getAnnotationSummary(r) {
    if (this._data.annotations[r] === void 0)
      throw new Error(`No annotation with name ${r} found in tree`);
    return this._data.annotations[r];
  }
  getAnnotations() {
    return Object.values(this._data.annotations);
  }
  getAnnotation(r, o, l) {
    const u = Ff(this, this.getNode(r.number), o);
    if (l === void 0) {
      const { value: c } = Pm(u, `Node ${r.number} is not annotated with ${o}`);
      return c;
    } else
      switch (u.type) {
        case rt.Some:
          return u.value.value;
        case rt.Nothing:
          return l;
      }
  }
  getFullNodeAnnotation(r, o) {
    const l = Ff(this, this.getNode(r.number), o);
    return Pm(l, `Node ${r.number} is not annotated with ${o}`);
  }
  hasAnnotation(r, o) {
    switch (Ff(this, this.getNode(r.number), o).type) {
      case rt.Some:
        return !0;
      case rt.Nothing:
        return !1;
    }
  }
  annotateNode(r, o, l) {
    if (typeof o == "string") {
      const u = o,
        c = tw(l),
        p = this._data.annotations[u];
      if (p !== void 0 && p.type !== c.type)
        throw new Error(
          `Tried annotation ${u} was parsed as ${c.type} - but is ${p.type} in tree.`,
        );
      return bt(this, (m) => {
        const w = p ? p.domain : void 0,
          v = Wx(c, w);
        ((m._data.nodes.allNodes[r.number].annotations[u] = {
          id: u,
          type: c.type,
          value: c.value,
        }),
          (m._data.annotations[u] = { id: u, type: c.type, domain: v }));
      });
    } else {
      let u = this;
      for (const [c, p] of Object.entries(o)) u = u.annotateNode(r, c, p);
      return u;
    }
  }
  setHeight(r, o) {
    if (!this.hasLengths())
      throw new Error(
        "Can not set the heights of nodes in a tree without branch lengths",
      );
    return bt(this, (l) => {
      const u = l.getNode(r.number);
      if (o < 0) throw new Error("Height must be non-negative");
      const c = l.getHeight(r) - o;
      if (u.length === void 0) {
        if (!l.isRoot(r))
          throw new Error("Cannot set height on a node without length");
      } else u.length = u.length + c;
      for (const p of l.getChildren(r)) {
        const m = l.getNode(p.number),
          w = l.getLength(m) - c;
        m.length = w;
      }
    });
  }
  setLength(r, o) {
    return bt(this, (l) => {
      const u = l.getNode(r.number);
      ((u.length = o), (l._data.hasLengths = !0));
    });
  }
  deleteLength(r) {
    return bt(this, (o) => {
      const l = o.getNode(r.number);
      l.length = void 0;
    });
  }
  setDivergence(r, o) {
    if (!this.hasLengths())
      throw new Error(
        "Can not set the divergences of nodes in a tree without branch lengths",
      );
    return bt(this, (l) => {
      const u = l.getNode(r.number),
        c = l.getHeight(r),
        p = l.getHeight(l.getRoot()) - c - o,
        m = l.getLength(r);
      u.length = m - p;
    });
  }
  setLabel(r, o) {
    if (this._data.nodes.byLabel[o] !== void 0)
      throw new Error(`Duplicate node label ${o}`);
    return bt(this, (l) => {
      const u = l.getNode(r.number);
      ((u.label = o), (l._data.nodes.byLabel[o] = r.number));
    });
  }
  insertNode(r, o = 0.5) {
    return bt(this, (l) => {
      const u = {
        number: l._data.nodes.allNodes.length,
        children: [],
        parent: void 0,
        label: "",
        length: void 0,
        taxon: void 0,
        annotations: {},
        _id: ta(),
      };
      (l._data.nodes.allNodes.push(u), (l._data.nodes.byTaxon.length += 1));
      const c = l.getNode(r.number),
        p = l.getParent(c),
        m = p.children.indexOf(c.number);
      (p.children.splice(m, 1, u.number), (u.parent = p.number));
      const w = l.getLength(c);
      ((c.length = w * (1 - o)),
        (u.length = w * o),
        (u.children = [c.number]),
        (c.parent = u.number));
    });
  }
  unroot(r) {
    throw new Error("unroot not implemented in immutable tree");
  }
  deleteNode(r) {
    throw new Error("deleteNode not implemented in immutable tree");
  }
  deleteClade(r) {
    throw new Error("deleteClade not implemented in immutable tree");
  }
  orderNodesByDensity(r, o) {
    return bt(this, (l) => {
      o === void 0 && (o = l._data.nodes.allNodes[l._data.rootNode]);
      const u = r ? 1 : -1;
      M0(l._data, o, (c, p, m, w) => (p - w) * u);
    });
  }
  rotate(r, o = !1) {
    return bt(this, (l) => {
      const u = l.getNode(r.number);
      if (((u.children = u.children.reverse()), o))
        for (const c of u.children.map((p) => l.getNode(p))) l.rotate(c, o);
    });
  }
  reroot(r, o = 0.5) {
    return bt(this, (l) => {
      if (r.number === l._data.rootNode) return;
      const u = l.getRoot();
      u.children.length !== 2 &&
        console.warn(
          "Root node has more than two children and we are rerooting! There be dragons!",
        );
      let c = 0;
      if (u.children.length == 2)
        c = u.children
          .map((m) => l.getNode(m))
          .map((m) => l.getLength(m))
          .reduce((m, w) => w + m, 0);
      else {
        const m = [...l.getPathToRoot(r)],
          w = m[m.length - 2];
        if (
          (kt(w, "Index error when looking for the root child"),
          !u.children.includes(w.number))
        )
          throw new Error(
            "Root child not in path to root - likely an internal error",
          );
        c = l.getLength(w);
      }
      const p = l.getNode(r.number);
      if (l.getParent(r) !== u) {
        let m = p,
          w = l.getParent(p);
        const v = l.getChild(w, 0).number === r.number,
          _ = p,
          T = w;
        let M = l.getLength(w);
        for (; !l.isRoot(w); ) {
          if (
            ((w.children = w.children.filter(($) => $ !== m.number)),
            l.getParent(w).number === u.number)
          )
            if (u.children.length == 2) {
              if (!l.hasLeftSibling(w) && !l.hasRightSibling(w))
                throw new Error("no sibling in rerooting");
              const $ = l.hasLeftSibling(w)
                ? l.getLeftSibling(w)
                : l.getRightSibling(w);
              (w.children.push($.number),
                ($.parent = w.number),
                ($.length = c));
            } else {
              const $ = {
                number: l._data.nodes.allNodes.length,
                children: [],
                parent: void 0,
                label: "",
                length: void 0,
                taxon: void 0,
                annotations: {},
                _id: ta(),
              };
              (l._data.nodes.allNodes.push($),
                ($.length = c),
                w.children.push($.number),
                ($.parent = w.number));
              for (const L of u.children) {
                const z = l.getNode(L);
                z.number !== w.number &&
                  ((z.parent = $.number), $.children.push(z.number));
              }
            }
          else {
            const $ = l.getParent(w),
              L = l.getLength($);
            (($.length = M), (M = L), w.children.push($.number));
          }
          ((m = w), (w = l.getParent(w)));
        }
        ((_.parent = u.number),
          (T.parent = u.number),
          (u.children = [_.number, T.number]),
          v || (u.children = u.children.reverse()),
          this.getInternalNodes().forEach(($) => {
            for (const L of l.getChildren($)) L.parent = $.number;
          }));
        const P = l.getLength(_) * o;
        ((T.length = P),
          kt(_.length, "Expected the root's new child to have a length"),
          (_.length -= P));
      } else {
        const m = l.getLength(r) * (1 - o);
        p.length = m;
        const w = l.getNextSibling(r);
        w.length = c - m;
      }
    });
  }
  removeChild(r, o) {
    return bt(this, (l) => {
      ((l._data.nodes.allNodes[r.number].children = l._data.nodes.allNodes[
        r.number
      ].children.filter((u) => u !== o.number)),
        (l._data.nodes.allNodes[o.number].parent = -1));
    });
  }
  sortChildren(r, o) {
    return bt(this, (l) => {
      l._data.nodes.allNodes[r.number].children = this._data.nodes.allNodes[
        r.number
      ].children
        .map((u) => l.getNode(u))
        .sort(o)
        .map((u) => u.number);
    });
  }
  addChild(r, o) {
    return bt(this, (l) => {
      const u = l.getNode(o.number);
      (l.getNode(r.number).children.push(u.number), (u.parent = r.number));
    });
  }
  setRoot(r) {
    return bt(this, (o) => {
      o._data.rootNode = r.number;
    });
  }
}
function M0(t, r, o) {
  let l = 0;
  if (t.nodes.allNodes[r.number].children.length > 0) {
    const u = new Map();
    for (const p of t.nodes.allNodes[r.number].children.map(
      (m) => t.nodes.allNodes[m],
    )) {
      const m = M0(t, p, o);
      (u.set(p.number, m), (l += m));
    }
    const c = t.nodes.allNodes[r.number].children
      .slice()
      .sort((p, m) =>
        o(
          t.nodes.allNodes[p],
          hn(u.get(p), "Internal error when ordering. Counts not defined."),
          t.nodes.allNodes[m],
          hn(u.get(m), "Internal error when ordering. Counts not defined."),
        ),
      );
    c.reduce(
      (p, m, w) => p || m !== t.nodes.allNodes[r.number].children[w],
      !0,
    ) && (t.nodes.allNodes[r.number].children = c);
  } else l = 1;
  return l;
}
function* bd(t, r = void 0) {
  const o = function* (l) {
    yield t.getNode(l.number);
    const u = t.getChildCount(l);
    if (u > 0)
      for (let c = 0; c < u; c++) {
        const p = t.getChild(l, c);
        yield* o(p);
      }
  };
  (r === void 0 && (r = t.getRoot()), yield* o(r));
}
function* P0(t, r = void 0, o = (l, u) => l.number - u.number) {
  const l = function* (u, c = void 0) {
    yield t.getNode(u.number);
    const p = [...t.getChildren(u), t.getParent(u)].filter(
      (m) => m.number !== c,
    );
    p.sort(o);
    for (const m of p) yield* l(m, u.number);
  };
  (r === void 0 && (r = t.getRoot()), yield* l(r));
}
function* R0(t, r = void 0, o = (l, u) => l.number - u.number) {
  const l = function* (u, c = void 0) {
    const p = [...t.getChildren(u), t.getParent(u)].filter(
      (m) => m.number !== c,
    );
    p.sort(o);
    for (const m of p) yield* l(m, u.number);
    yield t.getNode(u.number);
  };
  (r === void 0 && (r = t.getRoot()), yield* l(r));
}
function* Bd(t, r = void 0) {
  const o = function* (l) {
    const u = t.getChildCount(l);
    if (u > 0)
      for (let c = 0; c < u; c++) {
        const p = t.getChild(l, c);
        yield* o(p);
      }
    yield l;
  };
  (r === void 0 && (r = t.getRoot()), yield* o(r));
}
function* Xs(t, r) {
  r === void 0 && (r = t.getRoot());
  const o = function* (l) {
    const u = t.getChildCount(l);
    if (u > 0)
      for (let c = 0; c < u; c++) {
        const p = t.getChild(l, c);
        yield* o(p);
      }
    else yield l;
  };
  yield* o(r);
}
function* $0(t, r) {
  let o = r;
  for (; !t.isRoot(o); ) (yield o, (o = t.getParent(o)));
  yield o;
}
function Wx(t, r) {
  switch (t.type) {
    case et.BOOLEAN:
      return [!0, !1];
    case et.DISCRETE: {
      const o = t.value;
      if (r !== void 0) {
        const l = r;
        return [...new Set([...l, o])].sort();
      } else return [o];
    }
    case et.NUMERICAL: {
      const o = t.value;
      return Sl([...(r || []), o]);
    }
    case et.DISCRETE_SET: {
      const o = t.value,
        l = r || [];
      return [...new Set([...l, ...o])].sort();
    }
    case et.NUMERICAL_SET: {
      const o = t.value;
      return Sl([...(r || []), ...o]);
    }
    case et.DENSITIES:
      if (r !== void 0) {
        const o = r;
        return [...new Set([...o, ...Object.keys(t.value)])].sort();
      } else return [...new Set(Object.keys(t.value))].sort().filter((o) => o);
    case et.MARKOV_JUMPS: {
      const o = t.value.reduce((u, c) => u.concat([c.to, c.from]), []),
        l = r || [];
      return [...new Set([...l, ...o])].sort();
    }
    default:
      throw new Error("Unrecognized type  when updating domain");
  }
}
function Qx() {
  return {
    lastChunk: "",
    status: "parsing",
    end: "",
    start() {},
    transform(t, r) {
      const o = this.lastChunk + t;
      let l = "";
      for (let u = 0; u < o.length; u++) {
        const c = o[u];
        (kt(c, "Internal Error. Hit empty character in array"),
          this.status === "parsing"
            ? (([this.status, this.end] = Yx(c)),
              this.status === "in comment" &&
                (l.length > 0 && r.enqueue(l), (l = "")))
            : c === this.end && ((this.status = "parsing"), (this.end = "")),
          this.status === "parsing" && /\s|;|\]/.test(c)
            ? (l.length > 0 &&
                (/\]/.test(c) && (l += c), r.enqueue(l), (l = "")),
              /;/.test(c) && r.enqueue(c))
            : (l += c));
      }
      this.lastChunk = l;
    },
    flush(t) {
      this.lastChunk && t.enqueue(this.lastChunk);
    },
  };
}
function Yx(t) {
  return t === "'"
    ? ["in single quote", "'"]
    : t === '"'
      ? ["in double quote", '"']
      : t === "["
        ? ["in comment", "]"]
        : ["parsing", ""];
}
const Km = /\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/;
class I0 {
  constructor(r, o = {}) {
    ct(this, "reader");
    ct(this, "taxonSet");
    ct(this, "currentBlock");
    ct(this, "hasTree");
    ct(this, "options");
    ct(this, "translateTaxonMap");
    const l = new TransformStream(Qx());
    ((this.reader = r
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(l)
      .getReader()),
      (this.taxonSet = new Rl()),
      (this.currentBlock = void 0),
      (this.options = o));
  }
  async *getTrees() {
    for (; this.currentBlock !== "trees"; )
      (await this.parseNextBlock(), (this.hasTree = !0));
    yield* this.parseTreesBlock();
  }
  async parseNextBlock() {
    const r = await this.getNextBlockName();
    switch (r) {
      case "taxa":
        ((this.currentBlock = "taxa"), await this.parseTaxaBlock());
        break;
      case "trees":
        this.currentBlock = "trees";
        break;
      default:
        (console.log(
          `skipping block ${r}. Only parsing blocks are taxa and trees for now.`,
        ),
          await this.readToEndOfBlock());
    }
  }
  async nextToken() {
    const { done: r, value: o } = await this.reader.read();
    if (r) throw new Error("unexpectedly hit the end of the stream");
    return o;
  }
  async skipSemiColon() {
    const { done: r, value: o } = await this.reader.read();
    if (r) throw new Error("unexpectedly hit the end of the stream");
    if (!o.match(/;$/)) throw new Error(`expected ";" got ${o}`);
  }
  async getNextBlockName() {
    let r = !0,
      o;
    for (; r; )
      (await this.nextToken()).match(/\bbegin/i) &&
        ((o = await this.nextToken()), await this.skipSemiColon(), (r = !1));
    return o;
  }
  async readToEndOfBlock() {
    let r = !0;
    for (; r; ) (await this.nextToken()).match(/\bend;/i) && (r = !1);
  }
  async skipUntil(r) {
    let o,
      l = !0;
    for (; l; ) ((o = await this.nextToken()), r.test(o) && (l = !1));
    if (o == null)
      throw new Error(`Internal parsing error: ${r.source} not found `);
    return o;
  }
  async readUntil(r) {
    let o = "",
      l = !0;
    for (; l; ) {
      const u = await this.nextToken();
      (r.test(u) && ((o += u), (l = !1)), (o += u));
    }
    return o;
  }
  async parseTaxaBlock() {
    let r,
      o = !0;
    for (; o; ) {
      const l = await this.skipUntil(/dimensions|taxlabels|end/i);
      switch (!0) {
        case /dimensions/i.test(l): {
          const u = await this.readUntil(/;/),
            c = u.match(/ntax=(\d+);/);
          if (c)
            (kt(c[1], "No number of taxa found despite matching regex"),
              (r = parseInt(c[1])));
          else
            throw new Error(
              `Expected dimension in form of ntax=(\\d+);. Got ${u}`,
            );
          break;
        }
        case /taxlabels/i.test(l): {
          let u = await this.nextToken();
          for (; u !== ";"; )
            (this.taxonSet.addTaxon(u), (u = await this.nextToken()));
          if (r && r != this.taxonSet.getTaxonCount())
            throw new Error(
              `found ${this.taxonSet.getTaxonCount()} taxa. Expected: ${r}}`,
            );
          break;
        }
        case /end/i.test(l): {
          if (this.taxonSet.getTaxonCount() === 0)
            throw new Error("hit end of taxa section but didn't find any taxa");
          (this.taxonSet.lockTaxa(), await this.skipSemiColon(), (o = !1));
          break;
        }
        default:
          throw new Error(
            `Reached impossible code looking for dimensions or taxlabels or end in taxa block "${l}"`,
          );
      }
    }
  }
  async *parseTreesBlock() {
    let r,
      o = !0;
    for (; o; ) {
      const l = await this.skipUntil(/translate|tree|end/i);
      switch (!0) {
        case /translate/i.test(l): {
          this.translateTaxonMap = new Map();
          let u = 0,
            c;
          for (r = await this.nextToken(); r !== ";"; ) {
            if (u % 2 == 0) c = r;
            else {
              if (
                (r[r.length - 1] === "," && (r = r.slice(0, -1)),
                this.taxonSet.isFinalized)
              ) {
                if (!this.taxonSet.hasTaxon(r))
                  throw new Error(
                    `Taxon ${r} not found in taxa block - but found in translate block`,
                  );
              } else this.taxonSet.addTaxon(r);
              (kt(
                c,
                "Error parsing nexus. Expected key for taxa but found nothing",
              ),
                this.translateTaxonMap.set(c, r));
            }
            for (r = await this.nextToken(); r === ","; )
              r = await this.nextToken();
            u++;
          }
          this.taxonSet.lockTaxa();
          break;
        }
        case /tree/i.test(l): {
          await this.nextToken();
          const u = new y0(this.taxonSet, {
            translateTaxonNames: this.translateTaxonMap,
          });
          r = await this.skipUntil(/\(/);
          let c = r
            .split(Km)
            .filter((p) => p.length > 0)
            .reverse();
          for (; !u.isDone(); ) {
            for (; c.length > 0; ) {
              const p = c.pop();
              (kt(p, "Unexpectedly hit the end of the buffer"),
                u.parseCharacter(p));
            }
            u.isDone() ||
              ((r = await this.nextToken()),
              (c = r
                .split(Km)
                .filter((p) => p.length > 0)
                .reverse()));
          }
          yield u.getTree();
          break;
        }
        case /end/i.test(l):
          (await this.skipSemiColon(),
            (this.hasTree = !1),
            this.reader.releaseLock(),
            (o = !1));
          break;
        default:
          throw new Error(`Reached impossible code in treeblock block "${l}"`);
      }
    }
  }
}
class F0 {
  constructor() {
    ct(this, "_forwardCache");
    ct(this, "_reverseCache");
    ((this._forwardCache = new Map()), (this._reverseCache = new Map()));
  }
  *traverse(r, o) {
    const l = function* (u) {
      const c = r.getChildCount(u);
      if (c > 0)
        for (let p = 0; p < c; p++) {
          const m = r.getChild(u, p);
          yield* l(m);
        }
      yield u;
    };
    (o === void 0 && (o = r.getRoot()), yield* l(o));
  }
  getNext(r, o) {
    const l = this._forwardCache.get(o);
    if (l !== void 0 && this._forwardCache.get(l) !== void 0) return l;
    if (r.isRoot(o)) return;
    const u = r.getParent(o);
    if (r.hasRightSibling(o)) {
      const c = r.getRightSibling(o);
      (this._forwardCache.set(o, c), this._reverseCache.set(c, o));
    } else (this._forwardCache.set(o, u), this._reverseCache.set(u, o));
    return this._forwardCache.get(o);
  }
  getPrevious(r, o) {
    const l = this._reverseCache.get(o);
    if (l !== void 0 && this._reverseCache.get(l) !== void 0) return l;
    if (o !== this.traverse(r).next().value) {
      if (r.isInternal(o)) {
        const u = r.getChildCount(o) - 1,
          c = r.getChild(o, u);
        (this._reverseCache.set(o, c), this._forwardCache.set(c, o));
      } else if (r.hasLeftSibling(o)) {
        const u = r.getLeftSibling(o);
        (this._reverseCache.set(o, u), this._forwardCache.set(u, o));
      } else {
        let u = o;
        for (; !r.hasLeftSibling(u); ) u = r.getParent(u);
        const c = r.getLeftSibling(u);
        (this._reverseCache.set(o, c), this._forwardCache.set(c, o));
      }
      return this._reverseCache.get(o);
    }
  }
}
var lt = ((t) => (
  (t.Rectangular = "Rectangular"),
  (t.Polar = "Polar"),
  (t.Radial = "Radial"),
  t
))(lt || {});
function L0(t) {
  function r(o) {
    const l = new Map();
    let u = 0;
    for (const c of Bd(o)) {
      let p;
      const m = o.getDivergence(c),
        w = o.getChildCount(c) > 0,
        v = !o.isRoot(c),
        _ =
          o.getChildCount(c) > 0 && (!v || o.getChild(o.getParent(c), 0) !== c);
      if (o.isExternal(c)) ((p = { x: m, y: u }), u++);
      else {
        const M = o
            .getChildren(c)
            .map(($) =>
              hn(l.get($), "Internal Error: child not yet found in layout"),
            ),
          P = hn(
            Fd(M, ($) => $.y),
            "Error taking the mean of child positions",
          );
        p = { x: m, y: P };
      }
      const T = {
        ...p,
        layoutClass: t,
        nodeLabel: {
          alignmentBaseline: w ? (_ ? "bottom" : "hanging") : "middle",
          textAnchor: w ? "end" : "start",
          dxFactor: w ? -1 : 1,
          dyFactor: w ? (_ ? -1 : 1) : 0,
          rotation: 0,
        },
      };
      l.set(c, T);
    }
    return function (c) {
      if (l.has(c)) return l.get(c);
      throw (
        console.log(c),
        new Error("Node not found in layout -  has the tree changed")
      );
    };
  }
  return r;
}
const Vd = L0(lt.Rectangular),
  z0 = L0(lt.Polar);
function D0(t, r = {}) {
  const { spread: o = 1 } = r;
  console.log("radial layout with spread", o);
  const l = new Map(),
    u = [
      {
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        xpos: 0,
        ypos: 0,
        level: 0,
        number: t.getRoot().number,
      },
    ];
  for (const c of bd(t)) {
    const p = u.pop();
    kt(p, "Internal Error, hit the end of the data stack unexpectedly");
    const { angleStart: m, angleEnd: w, xpos: v, ypos: _, level: T } = p,
      M = (m + w) / 2,
      P = t.isRoot(c) ? 0 : t.getLength(c),
      $ = Math.cos(M),
      L = Math.sin(M),
      z = v + P * $,
      D = _ + P * L;
    t.getChildCount(c) > 0;
    let W, H;
    ((W = Math.cos(M)), (H = Math.sin(M)));
    const Y = {
      x: z,
      y: D,
      layoutClass: lt.Radial,
      theta: M,
      nodeLabel: {
        dxFactor: W,
        dyFactor: H,
        alignmentBaseline: "middle",
        textAnchor:
          Zm(M) > Math.PI / 2 && Zm(M) < (3 * Math.PI) / 2 ? "end" : "start",
        rotation: 0,
      },
    };
    if (t.getChildCount(c) > 0) {
      const oe = [];
      let fe = 0;
      for (let xe = 0; xe < t.getChildCount(c); xe++) {
        const te = [...Xs(t, t.getChild(c, xe))].length;
        ((oe[xe] = te), (fe += te));
      }
      let ae = w - m,
        _e = m;
      t.getRoot() !== c &&
        ((ae *= 1 + (o * Math.PI) / 180 / 10), (_e = M - ae / 2));
      let Ee = _e;
      for (let xe = t.getChildCount(c) - 1; xe > -1; xe--) {
        const te = Ee;
        ((Ee = te + (ae * oe[xe]) / fe),
          u.push({
            angleStart: te,
            angleEnd: Ee,
            xpos: z,
            ypos: D,
            level: T + 1,
            number: t.getChild(c, xe).number,
          }));
      }
    }
    l.set(c, Y);
  }
  return function (c) {
    if (l.has(c)) return l.get(c);
    throw new Error("Node not found in layout -  has the tree changed");
  };
}
function Zm(t) {
  for (; t > 2 * Math.PI; ) t -= 2 * Math.PI;
  return t;
}
const qx = () => ({
    x: 0,
    y: 0,
    layoutClass: lt.Rectangular,
    nodeLabel: {
      alignmentBaseline: "middle",
      textAnchor: "end",
      dxFactor: 0,
      dyFactor: 0,
      rotation: 0,
    },
  }),
  $l = Te.createContext(qx),
  Il = Te.createContext(!1),
  Xx = {
    canvasWidth: 0,
    canvasHeight: 0,
    domainX: [0, 1],
    domainY: [0, 1],
    layoutClass: lt.Rectangular,
    invert: !1,
    pollard: 0,
    minRadius: 0,
    fishEye: { x: 0, y: 0, scale: 0 },
    rootAngle: 0,
    angleRange: 0,
  },
  Ks = Te.createContext(Xx);
function Kx(t, r) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(r).domain(t);
      break;
  }
  return this;
}
function Hd(t, r, o) {
  ((t.prototype = r.prototype = o), (o.constructor = t));
}
function O0(t, r) {
  var o = Object.create(t.prototype);
  for (var l in r) o[l] = r[l];
  return o;
}
function Zs() {}
var As = 0.7,
  Ea = 1 / As,
  wl = "\\s*([+-]?\\d+)\\s*",
  Us = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  Rr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Zx = /^#([0-9a-f]{3,8})$/,
  Gx = new RegExp(`^rgb\\(${wl},${wl},${wl}\\)$`),
  Jx = new RegExp(`^rgb\\(${Rr},${Rr},${Rr}\\)$`),
  eS = new RegExp(`^rgba\\(${wl},${wl},${wl},${Us}\\)$`),
  tS = new RegExp(`^rgba\\(${Rr},${Rr},${Rr},${Us}\\)$`),
  nS = new RegExp(`^hsl\\(${Us},${Rr},${Rr}\\)$`),
  rS = new RegExp(`^hsla\\(${Us},${Rr},${Rr},${Us}\\)$`),
  Gm = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Hd(Zs, bs, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Jm,
  formatHex: Jm,
  formatHex8: oS,
  formatHsl: iS,
  formatRgb: eg,
  toString: eg,
});
function Jm() {
  return this.rgb().formatHex();
}
function oS() {
  return this.rgb().formatHex8();
}
function iS() {
  return j0(this).formatHsl();
}
function eg() {
  return this.rgb().formatRgb();
}
function bs(t) {
  var r, o;
  return (
    (t = (t + "").trim().toLowerCase()),
    (r = Zx.exec(t))
      ? ((o = r[1].length),
        (r = parseInt(r[1], 16)),
        o === 6
          ? tg(r)
          : o === 3
            ? new dn(
                ((r >> 8) & 15) | ((r >> 4) & 240),
                ((r >> 4) & 15) | (r & 240),
                ((r & 15) << 4) | (r & 15),
                1,
              )
            : o === 8
              ? na(
                  (r >> 24) & 255,
                  (r >> 16) & 255,
                  (r >> 8) & 255,
                  (r & 255) / 255,
                )
              : o === 4
                ? na(
                    ((r >> 12) & 15) | ((r >> 8) & 240),
                    ((r >> 8) & 15) | ((r >> 4) & 240),
                    ((r >> 4) & 15) | (r & 240),
                    (((r & 15) << 4) | (r & 15)) / 255,
                  )
                : null)
      : (r = Gx.exec(t))
        ? new dn(r[1], r[2], r[3], 1)
        : (r = Jx.exec(t))
          ? new dn(
              (r[1] * 255) / 100,
              (r[2] * 255) / 100,
              (r[3] * 255) / 100,
              1,
            )
          : (r = eS.exec(t))
            ? na(r[1], r[2], r[3], r[4])
            : (r = tS.exec(t))
              ? na(
                  (r[1] * 255) / 100,
                  (r[2] * 255) / 100,
                  (r[3] * 255) / 100,
                  r[4],
                )
              : (r = nS.exec(t))
                ? og(r[1], r[2] / 100, r[3] / 100, 1)
                : (r = rS.exec(t))
                  ? og(r[1], r[2] / 100, r[3] / 100, r[4])
                  : Gm.hasOwnProperty(t)
                    ? tg(Gm[t])
                    : t === "transparent"
                      ? new dn(NaN, NaN, NaN, 0)
                      : null
  );
}
function tg(t) {
  return new dn((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function na(t, r, o, l) {
  return (l <= 0 && (t = r = o = NaN), new dn(t, r, o, l));
}
function lS(t) {
  return (
    t instanceof Zs || (t = bs(t)),
    t ? ((t = t.rgb()), new dn(t.r, t.g, t.b, t.opacity)) : new dn()
  );
}
function dd(t, r, o, l) {
  return arguments.length === 1 ? lS(t) : new dn(t, r, o, l != null ? l : 1);
}
function dn(t, r, o, l) {
  ((this.r = +t), (this.g = +r), (this.b = +o), (this.opacity = +l));
}
Hd(
  dn,
  dd,
  O0(Zs, {
    brighter(t) {
      return (
        (t = t == null ? Ea : Math.pow(Ea, t)),
        new dn(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? As : Math.pow(As, t)),
        new dn(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new dn(Ci(this.r), Ci(this.g), Ci(this.b), Na(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: ng,
    formatHex: ng,
    formatHex8: sS,
    formatRgb: rg,
    toString: rg,
  }),
);
function ng() {
  return `#${ki(this.r)}${ki(this.g)}${ki(this.b)}`;
}
function sS() {
  return `#${ki(this.r)}${ki(this.g)}${ki(this.b)}${ki((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rg() {
  const t = Na(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Ci(this.r)}, ${Ci(this.g)}, ${Ci(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Na(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Ci(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ki(t) {
  return ((t = Ci(t)), (t < 16 ? "0" : "") + t.toString(16));
}
function og(t, r, o, l) {
  return (
    l <= 0
      ? (t = r = o = NaN)
      : o <= 0 || o >= 1
        ? (t = r = NaN)
        : r <= 0 && (t = NaN),
    new or(t, r, o, l)
  );
}
function j0(t) {
  if (t instanceof or) return new or(t.h, t.s, t.l, t.opacity);
  if ((t instanceof Zs || (t = bs(t)), !t)) return new or();
  if (t instanceof or) return t;
  t = t.rgb();
  var r = t.r / 255,
    o = t.g / 255,
    l = t.b / 255,
    u = Math.min(r, o, l),
    c = Math.max(r, o, l),
    p = NaN,
    m = c - u,
    w = (c + u) / 2;
  return (
    m
      ? (r === c
          ? (p = (o - l) / m + (o < l) * 6)
          : o === c
            ? (p = (l - r) / m + 2)
            : (p = (r - o) / m + 4),
        (m /= w < 0.5 ? c + u : 2 - c - u),
        (p *= 60))
      : (m = w > 0 && w < 1 ? 0 : p),
    new or(p, m, w, t.opacity)
  );
}
function uS(t, r, o, l) {
  return arguments.length === 1 ? j0(t) : new or(t, r, o, l != null ? l : 1);
}
function or(t, r, o, l) {
  ((this.h = +t), (this.s = +r), (this.l = +o), (this.opacity = +l));
}
Hd(
  or,
  uS,
  O0(Zs, {
    brighter(t) {
      return (
        (t = t == null ? Ea : Math.pow(Ea, t)),
        new or(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? As : Math.pow(As, t)),
        new or(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        r = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        o = this.l,
        l = o + (o < 0.5 ? o : 1 - o) * r,
        u = 2 * o - l;
      return new dn(
        Df(t >= 240 ? t - 240 : t + 120, u, l),
        Df(t, u, l),
        Df(t < 120 ? t + 240 : t - 120, u, l),
        this.opacity,
      );
    },
    clamp() {
      return new or(ig(this.h), ra(this.s), ra(this.l), Na(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = Na(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${ig(this.h)}, ${ra(this.s) * 100}%, ${ra(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  }),
);
function ig(t) {
  return ((t = (t || 0) % 360), t < 0 ? t + 360 : t);
}
function ra(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Df(t, r, o) {
  return (
    (t < 60
      ? r + ((o - r) * t) / 60
      : t < 180
        ? o
        : t < 240
          ? r + ((o - r) * (240 - t)) / 60
          : r) * 255
  );
}
const Wd = (t) => () => t;
function aS(t, r) {
  return function (o) {
    return t + o * r;
  };
}
function cS(t, r, o) {
  return (
    (t = Math.pow(t, o)),
    (r = Math.pow(r, o) - t),
    (o = 1 / o),
    function (l) {
      return Math.pow(t + l * r, o);
    }
  );
}
function fS(t) {
  return (t = +t) == 1
    ? A0
    : function (r, o) {
        return o - r ? cS(r, o, t) : Wd(isNaN(r) ? o : r);
      };
}
function A0(t, r) {
  var o = r - t;
  return o ? aS(t, o) : Wd(isNaN(t) ? r : t);
}
const lg = (function t(r) {
  var o = fS(r);
  function l(u, c) {
    var p = o((u = dd(u)).r, (c = dd(c)).r),
      m = o(u.g, c.g),
      w = o(u.b, c.b),
      v = A0(u.opacity, c.opacity);
    return function (_) {
      return (
        (u.r = p(_)),
        (u.g = m(_)),
        (u.b = w(_)),
        (u.opacity = v(_)),
        u + ""
      );
    };
  }
  return ((l.gamma = t), l);
})(1);
function dS(t, r) {
  r || (r = []);
  var o = t ? Math.min(r.length, t.length) : 0,
    l = r.slice(),
    u;
  return function (c) {
    for (u = 0; u < o; ++u) l[u] = t[u] * (1 - c) + r[u] * c;
    return l;
  };
}
function hS(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function pS(t, r) {
  var o = r ? r.length : 0,
    l = t ? Math.min(o, t.length) : 0,
    u = new Array(l),
    c = new Array(o),
    p;
  for (p = 0; p < l; ++p) u[p] = Qd(t[p], r[p]);
  for (; p < o; ++p) c[p] = r[p];
  return function (m) {
    for (p = 0; p < l; ++p) c[p] = u[p](m);
    return c;
  };
}
function mS(t, r) {
  var o = new Date();
  return (
    (t = +t),
    (r = +r),
    function (l) {
      return (o.setTime(t * (1 - l) + r * l), o);
    }
  );
}
function Ta(t, r) {
  return (
    (t = +t),
    (r = +r),
    function (o) {
      return t * (1 - o) + r * o;
    }
  );
}
function gS(t, r) {
  var o = {},
    l = {},
    u;
  ((t === null || typeof t != "object") && (t = {}),
    (r === null || typeof r != "object") && (r = {}));
  for (u in r) u in t ? (o[u] = Qd(t[u], r[u])) : (l[u] = r[u]);
  return function (c) {
    for (u in o) l[u] = o[u](c);
    return l;
  };
}
var hd = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Of = new RegExp(hd.source, "g");
function yS(t) {
  return function () {
    return t;
  };
}
function vS(t) {
  return function (r) {
    return t(r) + "";
  };
}
function wS(t, r) {
  var o = (hd.lastIndex = Of.lastIndex = 0),
    l,
    u,
    c,
    p = -1,
    m = [],
    w = [];
  for (t = t + "", r = r + ""; (l = hd.exec(t)) && (u = Of.exec(r)); )
    ((c = u.index) > o &&
      ((c = r.slice(o, c)), m[p] ? (m[p] += c) : (m[++p] = c)),
      (l = l[0]) === (u = u[0])
        ? m[p]
          ? (m[p] += u)
          : (m[++p] = u)
        : ((m[++p] = null), w.push({ i: p, x: Ta(l, u) })),
      (o = Of.lastIndex));
  return (
    o < r.length && ((c = r.slice(o)), m[p] ? (m[p] += c) : (m[++p] = c)),
    m.length < 2
      ? w[0]
        ? vS(w[0].x)
        : yS(r)
      : ((r = w.length),
        function (v) {
          for (var _ = 0, T; _ < r; ++_) m[(T = w[_]).i] = T.x(v);
          return m.join("");
        })
  );
}
function Qd(t, r) {
  var o = typeof r,
    l;
  return r == null || o === "boolean"
    ? Wd(r)
    : (o === "number"
        ? Ta
        : o === "string"
          ? (l = bs(r))
            ? ((r = l), lg)
            : wS
          : r instanceof bs
            ? lg
            : r instanceof Date
              ? mS
              : hS(r)
                ? dS
                : Array.isArray(r)
                  ? pS
                  : (typeof r.valueOf != "function" &&
                        typeof r.toString != "function") ||
                      isNaN(r)
                    ? gS
                    : Ta)(t, r);
}
function xS(t, r) {
  return (
    (t = +t),
    (r = +r),
    function (o) {
      return Math.round(t * (1 - o) + r * o);
    }
  );
}
function SS(t) {
  return function () {
    return t;
  };
}
function kS(t) {
  return +t;
}
var sg = [0, 1];
function ml(t) {
  return t;
}
function pd(t, r) {
  return (r -= t = +t)
    ? function (o) {
        return (o - t) / r;
      }
    : SS(isNaN(r) ? NaN : 0.5);
}
function _S(t, r) {
  var o;
  return (
    t > r && ((o = t), (t = r), (r = o)),
    function (l) {
      return Math.max(t, Math.min(r, l));
    }
  );
}
function CS(t, r, o) {
  var l = t[0],
    u = t[1],
    c = r[0],
    p = r[1];
  return (
    u < l ? ((l = pd(u, l)), (c = o(p, c))) : ((l = pd(l, u)), (c = o(c, p))),
    function (m) {
      return c(l(m));
    }
  );
}
function ES(t, r, o) {
  var l = Math.min(t.length, r.length) - 1,
    u = new Array(l),
    c = new Array(l),
    p = -1;
  for (
    t[l] < t[0] && ((t = t.slice().reverse()), (r = r.slice().reverse()));
    ++p < l;

  )
    ((u[p] = pd(t[p], t[p + 1])), (c[p] = o(r[p], r[p + 1])));
  return function (m) {
    var w = Y1(t, m, 1, l) - 1;
    return c[w](u[w](m));
  };
}
function NS(t, r) {
  return r
    .domain(t.domain())
    .range(t.range())
    .interpolate(t.interpolate())
    .clamp(t.clamp())
    .unknown(t.unknown());
}
function TS() {
  var t = sg,
    r = sg,
    o = Qd,
    l,
    u,
    c,
    p = ml,
    m,
    w,
    v;
  function _() {
    var M = Math.min(t.length, r.length);
    return (
      p !== ml && (p = _S(t[0], t[M - 1])),
      (m = M > 2 ? ES : CS),
      (w = v = null),
      T
    );
  }
  function T(M) {
    return M == null || isNaN((M = +M))
      ? c
      : (w || (w = m(t.map(l), r, o)))(l(p(M)));
  }
  return (
    (T.invert = function (M) {
      return p(u((v || (v = m(r, t.map(l), Ta)))(M)));
    }),
    (T.domain = function (M) {
      return arguments.length ? ((t = Array.from(M, kS)), _()) : t.slice();
    }),
    (T.range = function (M) {
      return arguments.length ? ((r = Array.from(M)), _()) : r.slice();
    }),
    (T.rangeRound = function (M) {
      return ((r = Array.from(M)), (o = xS), _());
    }),
    (T.clamp = function (M) {
      return arguments.length ? ((p = M ? !0 : ml), _()) : p !== ml;
    }),
    (T.interpolate = function (M) {
      return arguments.length ? ((o = M), _()) : o;
    }),
    (T.unknown = function (M) {
      return arguments.length ? ((c = M), T) : c;
    }),
    function (M, P) {
      return ((l = M), (u = P), _());
    }
  );
}
function MS() {
  return TS()(ml, ml);
}
function PS(t, r, o, l) {
  var u = G1(t, r, o),
    c;
  switch (((l = Ca(l != null ? l : ",f")), l.type)) {
    case "s": {
      var p = Math.max(Math.abs(t), Math.abs(r));
      return (
        l.precision == null && !isNaN((c = Ox(u, p))) && (l.precision = c),
        E0(l, p)
      );
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      l.precision == null &&
        !isNaN((c = jx(u, Math.max(Math.abs(t), Math.abs(r))))) &&
        (l.precision = c - (l.type === "e"));
      break;
    }
    case "f":
    case "%": {
      l.precision == null &&
        !isNaN((c = Dx(u))) &&
        (l.precision = c - (l.type === "%") * 2);
      break;
    }
  }
  return js(l);
}
function RS(t) {
  var r = t.domain;
  return (
    (t.ticks = function (o) {
      var l = r();
      return Z1(l[0], l[l.length - 1], o != null ? o : 10);
    }),
    (t.tickFormat = function (o, l) {
      var u = r();
      return PS(u[0], u[u.length - 1], o != null ? o : 10, l);
    }),
    (t.nice = function (o) {
      o == null && (o = 10);
      var l = r(),
        u = 0,
        c = l.length - 1,
        p = l[u],
        m = l[c],
        w,
        v,
        _ = 10;
      for (
        m < p && ((v = p), (p = m), (m = v), (v = u), (u = c), (c = v));
        _-- > 0;

      ) {
        if (((v = ed(p, m, o)), v === w)) return ((l[u] = p), (l[c] = m), r(l));
        if (v > 0) ((p = Math.floor(p / v) * v), (m = Math.ceil(m / v) * v));
        else if (v < 0)
          ((p = Math.ceil(p * v) / v), (m = Math.floor(m * v) / v));
        else break;
        w = v;
      }
      return t;
    }),
    t
  );
}
function On() {
  var t = MS();
  return (
    (t.copy = function () {
      return NS(t, On());
    }),
    Kx.apply(t, arguments),
    RS(t)
  );
}
function $S(t, r, o, l, u = !1, c = 0, p = 1.7 * Math.PI, m = 0, w = 0) {
  const v = Math.min(o, l) / 2,
    _ = _i(p),
    T = t * w,
    M = u ? [c * v, v].reverse() : [c * v, v],
    P = On().domain([T, t]).range(M),
    $ = m + (2 * 3.14 - _) / 2,
    L = $ + _,
    z = On().domain([0, r]).range([$, L]),
    D = [[0, 0], vs(v, $), vs(v, L)],
    W = _i($),
    H = _i(W + _);
  if (H > W)
    for (const je of [Math.PI / 2, Math.PI, (3 * Math.PI) / 2].filter(
      (Ne) => Ne > W && Ne < H,
    )) {
      const [Ne, G] = vs(v, je);
      D.push([Ne, G]);
    }
  else
    for (const je of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].filter(
      (Ne) => Ne > W || Ne < H,
    )) {
      const [Ne, G] = vs(v, je);
      D.push([Ne, G]);
    }
  const Y = Sl(D, (je) => je[0]),
    oe = Sl(D, (je) => je[1]),
    fe = (Y[1] - Y[0]) / (oe[1] - oe[0]),
    ae = Math.min(o, l * fe),
    _e = ae,
    Ee = ae / fe,
    xe = (o - _e) / 2,
    te = (l - Ee) / 2,
    Se = [te, l - te],
    ie = [xe, o - xe],
    ke = On().domain(Y).range(ie),
    Ze = On().domain(oe).range(Se);
  return function (je) {
    const [Ne, G] = [P(je.x), z(je.y)],
      [ce, de] = vs(Ne, G),
      F = _i(G),
      X = {
        alignmentBaseline: "middle",
        textAnchor: F > Math.PI / 2 && F < (3 * Math.PI) / 2 ? "end" : " start",
        dxFactor: Math.cos(F),
        dyFactor: Math.sin(F),
        rotation: U0(F),
      };
    return { ...je, x: ke(ce), y: Ze(de), r: Ne, theta: G, nodeLabel: X };
  };
}
function vs(t, r) {
  return [t * Math.cos(r), t * Math.sin(r)];
}
function _i(t) {
  for (; t > 2 * Math.PI; ) t -= 2 * Math.PI;
  return t;
}
function IS(t) {
  return (_i(t) * 180) / Math.PI;
}
function U0(t) {
  const r = IS(_i(t));
  return r > 90 && r < 270 ? r - 180 : r;
}
const FS = {
  alignmentBaseline: "middle",
  textAnchor: "middle",
  dxFactor: 1,
  dyFactor: 1,
  rotation: 0,
};
function LS({
  domainX: t,
  domainY: r,
  canvasWidth: o,
  canvasHeight: l,
  layoutClass: u,
  invert: c = !1,
  minRadius: p = 0,
  angleRange: m = 2 * Math.PI,
  rootAngle: w = 0,
  pollard: v = 0,
  fishEye: _ = { x: 0, y: 0, scale: 0 },
}) {
  let T, M;
  switch (u) {
    case lt.Rectangular: {
      const P = t[1] * v;
      ((T = On().domain([P, t[1]]).range([0, o])),
        (M = On().domain(r).range([0, l])));
      let $ = (L) => M(L);
      if (_.scale > 0) {
        const L = M.invert(_.y),
          z = zS(_.scale, L),
          D = M.copy().domain(M.domain().map(z));
        $ = (W) => D(z(W));
      }
      return (
        c && T.range([o, 0]),
        function (L) {
          return { ...L, x: T(L.x), y: $(L.y) };
        }
      );
    }
    case lt.Polar:
      return $S(t[1], r[1], o, l, c, p, m, w, v);
    case lt.Radial: {
      const P = On().domain(t).range([0, 1]),
        $ = On().domain(r).range([0, 1]),
        L = Math.min(o, l),
        z = (o - L) / 2,
        D = (l - L) / 2,
        W = [z, L + z],
        H = [D, L + D];
      return (
        (M = On().domain([0, 1]).range(H)),
        (T = On().domain([0, 1]).range(W)),
        function (Y) {
          return { ...Y, x: T(P(Y.x)), y: M($(Y.y)) };
        }
      );
    }
    default:
      throw new Error("Not implemented in calcX");
  }
}
const zS = (t, r) => (o) => {
  if (t === 0) return o;
  const l = 1 / t,
    u = r - o,
    c = 1 - r / (l + r),
    p = 1 - (r - 1) / (l - (r - 1));
  return (1 - (u < 0 ? u / (l - u) : u / (l + u)) - c) / (p - c);
};
function b0(t) {
  const r = (o) => {
    const l = Te.useContext(oo),
      u = Te.useContext($l),
      c = Te.useContext(Il),
      { node: p, ...m } = o,
      w = l(u(p));
    return me.jsx(t, { ...m, x: w.x, y: w.y, animated: c });
  };
  return (
    (r.displayName = `withNode(${t.displayName || t.name || "Component"})`),
    r
  );
}
function B0(t) {
  const r = (o) => {
    var L;
    const l = Te.useContext(oo),
      u = Te.useContext($l),
      c = Te.useContext(Il),
      { domainX: p, layoutClass: m } = Te.useContext(Ks),
      { node: w, parent: v, aligned: _, gap: T = 6, ...M } = o,
      P = u(w),
      $ = l(P);
    if (v === void 0) {
      const z = (L = $.nodeLabel) != null ? L : FS,
        D = z.dxFactor * T,
        W = z.dyFactor * T,
        H = l({ x: p[1], y: P.y }),
        Y = (_ ? H.x : $.x) + D,
        oe = (_ && m === lt.Polar ? H.y : $.y) + W,
        { alignmentBaseline: fe, rotation: ae, textAnchor: _e } = z,
        Ee = _ ? `M${$.x} ${$.y}L${Y} ${oe}` : `M${$.x} ${$.y}L${$.x} ${$.y}`;
      return me.jsx(t, {
        alignmentBaseline: fe,
        rotation: ae,
        textAnchor: _e,
        d: Ee,
        x: Y,
        y: oe,
        ...M,
        animated: c,
      });
    } else {
      const z = u(v),
        D = l(z),
        W =
          m === lt.Polar
            ? hn(
                $.theta,
                "The layout is polar but theta was not calculated for this node",
              )
            : 0,
        H = m === lt.Polar ? U0(W) : 0,
        Y = l({ x: z.x, y: P.y }),
        { dx: oe, dy: fe } = m === lt.Polar ? DS(W, T) : { dx: 0, dy: -1 * T },
        ae = (m === lt.Polar ? ($.x + Y.x) / 2 : ($.x + D.x) / 2) + oe,
        _e =
          (m === lt.Polar
            ? ($.y + Y.y) / 2
            : m === lt.Radial
              ? ($.y + D.y) / 2
              : $.y) + fe;
      return me.jsx(t, {
        alignmentBaseline: "baseline",
        rotation: H,
        textAnchor: "middle",
        x: ae,
        y: _e,
        ...M,
        animated: c,
      });
    }
  };
  return (
    (r.displayName = `withNodeLabel(${t.displayName || t.name || "Component"})`),
    r
  );
}
function DS(t, r) {
  let o, l;
  return (
    t > 0 && t < Math.PI / 2
      ? ((o = Math.sin(Math.PI / 2 - t) * r),
        (l = -Math.cos(Math.PI / 2 - t) * r))
      : t > Math.PI / 2 && t < Math.PI
        ? ((o = -Math.cos(Math.PI / 2 - (Math.PI - t)) * r),
          (l = -Math.sin(Math.PI / 2 - (Math.PI - t)) * r))
        : t > Math.PI && t < (3 * Math.PI) / 2
          ? ((o = Math.cos(Math.PI / 2 - (t - Math.PI)) * r),
            (l = -Math.sin(Math.PI / 2 - (t - Math.PI)) * r))
          : ((o = -Math.cos(Math.PI / 2 - (2 * Math.PI - t)) * r),
            (l = -Math.sin(Math.PI / 2 - (2 * Math.PI - t)) * r)),
    { dx: o, dy: l }
  );
}
function Yd(t) {
  const r = (o) => {
    const { nodes: l, keyBy: u = (m) => m._id, attrs: c = {}, aligned: p } = o;
    return me.jsx("g", {
      className: "node-layer",
      children: l.map((m) => {
        var v;
        const w = (v = c[m._id]) != null ? v : {};
        return me.jsx(t, { node: m, ...w, aligned: p }, u(m));
      }),
    });
  };
  return (
    (r.displayName = `withNodesArray(${t.displayName || t.name || "Component"})`),
    r
  );
}
function V0(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var jf, ug;
function OS() {
  if (ug) return jf;
  ((ug = 1), (jf = t));
  function t(r) {
    var o = 0,
      l = 0,
      u = 0,
      c = 0;
    return r.map(function (p) {
      p = p.slice();
      var m = p[0],
        w = m.toUpperCase();
      if (m != w)
        switch (((p[0] = w), m)) {
          case "a":
            ((p[6] += u), (p[7] += c));
            break;
          case "v":
            p[1] += c;
            break;
          case "h":
            p[1] += u;
            break;
          default:
            for (var v = 1; v < p.length; ) ((p[v++] += u), (p[v++] += c));
        }
      switch (w) {
        case "Z":
          ((u = o), (c = l));
          break;
        case "H":
          u = p[1];
          break;
        case "V":
          c = p[1];
          break;
        case "M":
          ((u = o = p[1]), (c = l = p[2]));
          break;
        default:
          ((u = p[p.length - 2]), (c = p[p.length - 1]));
      }
      return p;
    });
  }
  return jf;
}
var jS = OS();
const AS = V0(jS);
var US = (function () {
    function t(r, o) {
      var l = [],
        u = !0,
        c = !1,
        p = void 0;
      try {
        for (
          var m = r[Symbol.iterator](), w;
          !(u = (w = m.next()).done) &&
          (l.push(w.value), !(o && l.length === o));
          u = !0
        );
      } catch (v) {
        ((c = !0), (p = v));
      } finally {
        try {
          !u && m.return && m.return();
        } finally {
          if (c) throw p;
        }
      }
      return l;
    }
    return function (r, o) {
      if (Array.isArray(r)) return r;
      if (Symbol.iterator in Object(r)) return t(r, o);
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance",
      );
    };
  })(),
  Cs = Math.PI * 2,
  Af = function (t, r, o, l, u, c, p) {
    var m = t.x,
      w = t.y;
    ((m *= r), (w *= o));
    var v = l * m - u * w,
      _ = u * m + l * w;
    return { x: v + c, y: _ + p };
  },
  bS = function (t, r) {
    var o =
        r === 1.5707963267948966
          ? 0.551915024494
          : r === -1.5707963267948966
            ? -0.551915024494
            : 1.3333333333333333 * Math.tan(r / 4),
      l = Math.cos(t),
      u = Math.sin(t),
      c = Math.cos(t + r),
      p = Math.sin(t + r);
    return [
      { x: l - u * o, y: u + l * o },
      { x: c + p * o, y: p - c * o },
      { x: c, y: p },
    ];
  },
  ag = function (t, r, o, l) {
    var u = t * l - r * o < 0 ? -1 : 1,
      c = t * o + r * l;
    return (c > 1 && (c = 1), c < -1 && (c = -1), u * Math.acos(c));
  },
  BS = function (t, r, o, l, u, c, p, m, w, v, _, T) {
    var M = Math.pow(u, 2),
      P = Math.pow(c, 2),
      $ = Math.pow(_, 2),
      L = Math.pow(T, 2),
      z = M * P - M * L - P * $;
    (z < 0 && (z = 0),
      (z /= M * L + P * $),
      (z = Math.sqrt(z) * (p === m ? -1 : 1)));
    var D = ((z * u) / c) * T,
      W = ((z * -c) / u) * _,
      H = v * D - w * W + (t + o) / 2,
      Y = w * D + v * W + (r + l) / 2,
      oe = (_ - D) / u,
      fe = (T - W) / c,
      ae = (-_ - D) / u,
      _e = (-T - W) / c,
      Ee = ag(1, 0, oe, fe),
      xe = ag(oe, fe, ae, _e);
    return (
      m === 0 && xe > 0 && (xe -= Cs),
      m === 1 && xe < 0 && (xe += Cs),
      [H, Y, Ee, xe]
    );
  },
  VS = function (t) {
    var r = t.px,
      o = t.py,
      l = t.cx,
      u = t.cy,
      c = t.rx,
      p = t.ry,
      m = t.xAxisRotation,
      w = m === void 0 ? 0 : m,
      v = t.largeArcFlag,
      _ = v === void 0 ? 0 : v,
      T = t.sweepFlag,
      M = T === void 0 ? 0 : T,
      P = [];
    if (c === 0 || p === 0) return [];
    var $ = Math.sin((w * Cs) / 360),
      L = Math.cos((w * Cs) / 360),
      z = (L * (r - l)) / 2 + ($ * (o - u)) / 2,
      D = (-$ * (r - l)) / 2 + (L * (o - u)) / 2;
    if (z === 0 && D === 0) return [];
    ((c = Math.abs(c)), (p = Math.abs(p)));
    var W = Math.pow(z, 2) / Math.pow(c, 2) + Math.pow(D, 2) / Math.pow(p, 2);
    W > 1 && ((c *= Math.sqrt(W)), (p *= Math.sqrt(W)));
    var H = BS(r, o, l, u, c, p, _, M, $, L, z, D),
      Y = US(H, 4),
      oe = Y[0],
      fe = Y[1],
      ae = Y[2],
      _e = Y[3],
      Ee = Math.abs(_e) / (Cs / 4);
    Math.abs(1 - Ee) < 1e-7 && (Ee = 1);
    var xe = Math.max(Math.ceil(Ee), 1);
    _e /= xe;
    for (var te = 0; te < xe; te++) (P.push(bS(ae, _e)), (ae += _e));
    return P.map(function (Se) {
      var ie = Af(Se[0], c, p, L, $, oe, fe),
        ke = ie.x,
        Ze = ie.y,
        je = Af(Se[1], c, p, L, $, oe, fe),
        Ne = je.x,
        G = je.y,
        ce = Af(Se[2], c, p, L, $, oe, fe),
        de = ce.x,
        F = ce.y;
      return { x1: ke, y1: Ze, x2: Ne, y2: G, x: de, y: F };
    });
  };
function HS(t) {
  for (
    var r,
      o = [],
      l = 0,
      u = 0,
      c = 0,
      p = 0,
      m = null,
      w = null,
      v = 0,
      _ = 0,
      T = 0,
      M = t.length;
    T < M;
    T++
  ) {
    var P = t[T],
      $ = P[0];
    switch ($) {
      case "M":
        ((c = P[1]), (p = P[2]));
        break;
      case "A":
        var L = VS({
          px: v,
          py: _,
          cx: P[6],
          cy: P[7],
          rx: P[1],
          ry: P[2],
          xAxisRotation: P[3],
          largeArcFlag: P[4],
          sweepFlag: P[5],
        });
        if (!L.length) continue;
        for (var z = 0, D; z < L.length; z++)
          ((D = L[z]),
            (P = ["C", D.x1, D.y1, D.x2, D.y2, D.x, D.y]),
            z < L.length - 1 && o.push(P));
        break;
      case "S":
        var W = v,
          H = _;
        ((r == "C" || r == "S") && ((W += W - l), (H += H - u)),
          (P = ["C", W, H, P[1], P[2], P[3], P[4]]));
        break;
      case "T":
        (r == "Q" || r == "T"
          ? ((m = v * 2 - m), (w = _ * 2 - w))
          : ((m = v), (w = _)),
          (P = cg(v, _, m, w, P[1], P[2])));
        break;
      case "Q":
        ((m = P[1]), (w = P[2]), (P = cg(v, _, P[1], P[2], P[3], P[4])));
        break;
      case "L":
        P = oa(v, _, P[1], P[2]);
        break;
      case "H":
        P = oa(v, _, P[1], _);
        break;
      case "V":
        P = oa(v, _, v, P[1]);
        break;
      case "Z":
        P = oa(v, _, c, p);
        break;
    }
    ((r = $),
      (v = P[P.length - 2]),
      (_ = P[P.length - 1]),
      P.length > 4
        ? ((l = P[P.length - 4]), (u = P[P.length - 3]))
        : ((l = v), (u = _)),
      o.push(P));
  }
  return o;
}
function oa(t, r, o, l) {
  return ["C", t, r, o, l, o, l];
}
function cg(t, r, o, l, u, c) {
  return [
    "C",
    t / 3 + (2 / 3) * o,
    r / 3 + (2 / 3) * l,
    u / 3 + (2 / 3) * o,
    c / 3 + (2 / 3) * l,
    u,
    c,
  ];
}
var Uf, fg;
function WS() {
  if (fg) return Uf;
  ((fg = 1), (Uf = o));
  var t = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 },
    r = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
  function o(c) {
    var p = [];
    return (
      c.replace(r, function (m, w, v) {
        var _ = w.toLowerCase();
        for (
          v = u(v),
            _ == "m" &&
              v.length > 2 &&
              (p.push([w].concat(v.splice(0, 2))),
              (_ = "l"),
              (w = w == "m" ? "l" : "L"));
          ;

        ) {
          if (v.length == t[_]) return (v.unshift(w), p.push(v));
          if (v.length < t[_]) throw new Error("malformed path data");
          p.push([w].concat(v.splice(0, t[_])));
        }
      }),
      p
    );
  }
  var l = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
  function u(c) {
    var p = c.match(l);
    return p ? p.map(Number) : [];
  }
  return Uf;
}
var QS = WS();
const YS = V0(QS);
class da {
  constructor(r, o) {
    ct(this, "x");
    ct(this, "y");
    ((this.x = r), (this.y = o));
  }
}
const bf = 6;
function H0(t) {
  const r = YS(t),
    o = AS(r),
    l = HS(o);
  let u = `${l[0][0]} ${l[0][1]} ${l[0][2]} `;
  const c = l
    .filter((p) => p[0] === "C")
    .map((p) => [new da(p[1], p[2]), new da(p[3], p[4]), new da(p[5], p[6])]);
  if (c.length > bf)
    throw new Error(
      `Path must have no more than ${bf} nodes (excluding start point) detected ${c.length} nodes update layout or path.helpers`,
    );
  if (c.length == 0)
    throw new Error(
      "Path must have at least 1 node (excluding start point) update layout or path.helpers",
    );
  for (; c.length < bf; ) {
    const p = hn(c.pop(), "Internal error in normalization"),
      { left: m, right: w } = qS(p, 0.5);
    (c.push(m), c.push(w.reverse()));
  }
  for (let p = 0; p < c.length; p++) {
    const m = c[p];
    u += `C${m[0].x},${m[0].y} ${m[1].x},${m[1].y} ${m[2].x},${m[2].y} `;
  }
  return u;
}
function qS(t, r) {
  const o = [],
    l = [];
  function u(c, p) {
    if (c.length == 1) (o.push(c[0]), l.push(c[0]));
    else {
      const m = Array(c.length - 1);
      for (let w = 0; w < m.length; w++)
        (w == 0 && o.push(c[0]),
          w == m.length - 1 && l.push(c[w + 1]),
          (m[w] = new da(
            (1 - p) * c[w].x + p * c[w + 1].x,
            (1 - p) * c[w].y + p * c[w + 1].y,
          )));
      u(m, p);
    }
  }
  return (u(t, r), { left: o, right: l });
}
function XS(t) {
  const r = (o) => {
    const l = Te.useContext(oo),
      u = Te.useContext($l),
      c = Te.useContext(Il),
      { node: p, parent: m, curvature: w = 0, ...v } = o,
      _ = u(p),
      { layoutClass: T } = _,
      M = m ? u(m) : { x: _.x, y: _.y },
      P = { x: M.x, y: _.y },
      $ = [M, _, P].map((z) => l(z)),
      L = H0(KS($, w, T));
    return me.jsx(t, { d: L, animated: c, ...v });
  };
  return (
    (r.displayName = `withBranchArray(${t.displayName || t.name || "Component"})`),
    r
  );
}
function KS(t, r, o) {
  switch (o) {
    case lt.Rectangular:
      return ZS(t, r);
    case lt.Polar:
      return GS(t);
    case lt.Radial:
      return JS(t);
    default:
      throw new Error(`path generator not implemented for the ${o} of points`);
  }
}
function ZS(t, r) {
  const o = t.length;
  switch (o) {
    case 0:
      return "";
    case 3: {
      const [l, u] = t;
      return r === 0
        ? `M${l.x + 0.001},${l.y}L${l.x},${u.y}L${u.x},${u.y + 0.001}`
        : r < 1
          ? `M${l.x},${l.y}C${l.x},${u.y}, ${l.x + Math.abs(r * (l.x - u.x))},${u.y} ${u.x},${u.y}`
          : `M${l.x},${l.y}L${(l.x + u.x) / 2},${(l.y + u.y) / 2}L${u.x},${u.y}`;
    }
    default:
      throw new Error(
        `path rectangular generator not implemented for this ${o} of points`,
      );
  }
}
function GS(t) {
  const r = t.length;
  switch (r) {
    case 3: {
      const [o, l, u] = t,
        c =
          o.theta === l.theta || o.r === 0
            ? ""
            : `A${o.r},${o.r} 0 0 ${o.theta < l.theta ? 1 : 0} ${u.x},${u.y}`;
      return `M${o.x},${o.y} ${c} L${l.x},${l.y}`;
    }
    case 0:
      return "";
    default:
      throw new Error(
        `Error in polar path generator. not expecting ${r} points`,
      );
  }
}
function JS(t) {
  const r = t.length;
  switch (r) {
    case 0:
      return "";
    case 3: {
      const [o, l] = t;
      return `M${o.x},${o.y}L${(o.x + l.x) / 2},${(o.y + l.y) / 2}L${l.x},${l.y}`;
    }
    default:
      throw new Error(
        `path rectangular generator not implemented for this ${r} of points`,
      );
  }
}
function W0(t) {
  const r = (o) => {
    const {
      branches: l,
      keyBy: u = (m) => m._id,
      attrs: c = {},
      curvature: p,
    } = o;
    return me.jsx("g", {
      className: "branch-layer",
      children: l.map(({ node: m, parent: w }) => {
        var _;
        const v = (_ = c[m._id]) != null ? _ : {};
        return me.jsx(t, { node: m, parent: w, ...v, curvature: p }, u(m));
      }),
    });
  };
  return (
    (r.displayName = `withBranchArray(${t.displayName || t.name || "Component"})`),
    r
  );
}
function Q0(t) {
  const r = (o) => {
    const { clades: l, keyBy: u = (p) => p._id, attrs: c = {} } = o;
    return me.jsx("g", {
      className: "node-layer",
      children: l.map((p) => {
        var w;
        const m = (w = c[p.root._id]) != null ? w : {};
        return me.jsx(t, { clade: p, ...m }, u(p.root));
      }),
    });
  };
  return (
    (r.displayName = `withCladessArray(${t.displayName || t.name || "Component"})`),
    r
  );
}
const ek = Yd(b0(D1)),
  tk = Yd(b0(b1));
function nk(t) {
  switch (t.shape) {
    case Tl.Circle:
      return me.jsx(ek, { ...t });
    case Tl.Rectangle:
      return me.jsx(tk, { ...t });
  }
}
const rk = W0(B0(n0)),
  ok = Yd(B0(n0)),
  ik = W0(XS(Aa));
function lk(t) {
  switch (t.target) {
    case 0:
      return me.jsx(nk, { ...t });
    case 1:
      return me.jsx(ik, { ...t });
    case 2:
      return me.jsx(ok, { ...t });
    case 3:
      return me.jsx(rk, { ...t });
    case 4:
      return me.jsx(Nk, { ...t });
  }
}
var An = ((t) => (
    (t[(t.Node = 0)] = "Node"),
    (t[(t.Branch = 1)] = "Branch"),
    (t[(t.NodeLabel = 2)] = "NodeLabel"),
    (t[(t.BranchLabel = 3)] = "BranchLabel"),
    (t[(t.Clade = 4)] = "Clade"),
    (t[(t.Axis = 5)] = "Axis"),
    t
  ))(An || {}),
  Tl = ((t) => (
    (t[(t.Circle = 0)] = "Circle"),
    (t[(t.Rectangle = 1)] = "Rectangle"),
    t
  ))(Tl || {}),
  Ml = ((t) => (
    (t[(t.Cartoon = 0)] = "Cartoon"),
    (t[(t.Highlight = 1)] = "Highlight"),
    t
  ))(Ml || {});
function sk(t) {
  const { clade: r, ...o } = t,
    l = Te.useContext(oo),
    u = Te.useContext($l),
    c = Te.useContext(Il),
    { root: p, leftMost: m, rightMost: w, mostDiverged: v } = r,
    _ = l(u(p)),
    { x: T, y: M } = _,
    P = l(u(m)),
    $ = l(u(w)),
    L = l(u(v)),
    { layoutClass: z } = u(p);
  let D;
  if (z === lt.Rectangular) {
    const H = L.x,
      Y = $.y,
      oe = P.y;
    D = `M${T},${M}L${H},${Y}L${H},${oe}Z`;
  } else if (z === lt.Polar) {
    const H = P,
      Y = $,
      oe =
        H.theta === Y.theta || H.r === 0
          ? ""
          : `A${H.r},${H.r} 0 0 ${H.theta < Y.theta ? 1 : 0} ${Y.x},${Y.y}`;
    D = `M${T},${M}L${H.x},${H.y} ${oe} Z`;
  } else return null;
  const W = H0(D);
  return me.jsx(Aa, { d: W, ...o, animated: c });
}
const uk = Q0(sk);
function $o(t) {
  return function () {
    return t;
  };
}
const dg = Math.abs,
  Bt = Math.atan2,
  yi = Math.cos,
  ak = Math.max,
  Bf = Math.min,
  Tr = Math.sin,
  gl = Math.sqrt,
  cn = 1e-12,
  Bs = Math.PI,
  Ma = Bs / 2,
  ck = 2 * Bs;
function fk(t) {
  return t > 1 ? 0 : t < -1 ? Bs : Math.acos(t);
}
function hg(t) {
  return t >= 1 ? Ma : t <= -1 ? -Ma : Math.asin(t);
}
const md = Math.PI,
  gd = 2 * md,
  xi = 1e-6,
  dk = gd - xi;
function Y0(t) {
  this._ += t[0];
  for (let r = 1, o = t.length; r < o; ++r) this._ += arguments[r] + t[r];
}
function hk(t) {
  let r = Math.floor(t);
  if (!(r >= 0)) throw new Error(`invalid digits: ${t}`);
  if (r > 15) return Y0;
  const o = 10 ** r;
  return function (l) {
    this._ += l[0];
    for (let u = 1, c = l.length; u < c; ++u)
      this._ += Math.round(arguments[u] * o) / o + l[u];
  };
}
class pk {
  constructor(r) {
    ((this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = r == null ? Y0 : hk(r)));
  }
  moveTo(r, o) {
    this._append`M${(this._x0 = this._x1 = +r)},${(this._y0 = this._y1 = +o)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(r, o) {
    this._append`L${(this._x1 = +r)},${(this._y1 = +o)}`;
  }
  quadraticCurveTo(r, o, l, u) {
    this._append`Q${+r},${+o},${(this._x1 = +l)},${(this._y1 = +u)}`;
  }
  bezierCurveTo(r, o, l, u, c, p) {
    this
      ._append`C${+r},${+o},${+l},${+u},${(this._x1 = +c)},${(this._y1 = +p)}`;
  }
  arcTo(r, o, l, u, c) {
    if (((r = +r), (o = +o), (l = +l), (u = +u), (c = +c), c < 0))
      throw new Error(`negative radius: ${c}`);
    let p = this._x1,
      m = this._y1,
      w = l - r,
      v = u - o,
      _ = p - r,
      T = m - o,
      M = _ * _ + T * T;
    if (this._x1 === null) this._append`M${(this._x1 = r)},${(this._y1 = o)}`;
    else if (M > xi)
      if (!(Math.abs(T * w - v * _) > xi) || !c)
        this._append`L${(this._x1 = r)},${(this._y1 = o)}`;
      else {
        let P = l - p,
          $ = u - m,
          L = w * w + v * v,
          z = P * P + $ * $,
          D = Math.sqrt(L),
          W = Math.sqrt(M),
          H = c * Math.tan((md - Math.acos((L + M - z) / (2 * D * W))) / 2),
          Y = H / W,
          oe = H / D;
        (Math.abs(Y - 1) > xi && this._append`L${r + Y * _},${o + Y * T}`,
          this
            ._append`A${c},${c},0,0,${+(T * P > _ * $)},${(this._x1 = r + oe * w)},${(this._y1 = o + oe * v)}`);
      }
  }
  arc(r, o, l, u, c, p) {
    if (((r = +r), (o = +o), (l = +l), (p = !!p), l < 0))
      throw new Error(`negative radius: ${l}`);
    let m = l * Math.cos(u),
      w = l * Math.sin(u),
      v = r + m,
      _ = o + w,
      T = 1 ^ p,
      M = p ? u - c : c - u;
    (this._x1 === null
      ? this._append`M${v},${_}`
      : (Math.abs(this._x1 - v) > xi || Math.abs(this._y1 - _) > xi) &&
        this._append`L${v},${_}`,
      l &&
        (M < 0 && (M = (M % gd) + gd),
        M > dk
          ? this
              ._append`A${l},${l},0,1,${T},${r - m},${o - w}A${l},${l},0,1,${T},${(this._x1 = v)},${(this._y1 = _)}`
          : M > xi &&
            this
              ._append`A${l},${l},0,${+(M >= md)},${T},${(this._x1 = r + l * Math.cos(c))},${(this._y1 = o + l * Math.sin(c))}`));
  }
  rect(r, o, l, u) {
    this
      ._append`M${(this._x0 = this._x1 = +r)},${(this._y0 = this._y1 = +o)}h${(l = +l)}v${+u}h${-l}Z`;
  }
  toString() {
    return this._;
  }
}
function mk(t) {
  let r = 3;
  return (
    (t.digits = function (o) {
      if (!arguments.length) return r;
      if (o == null) r = null;
      else {
        const l = Math.floor(o);
        if (!(l >= 0)) throw new RangeError(`invalid digits: ${o}`);
        r = l;
      }
      return t;
    }),
    () => new pk(r)
  );
}
function gk(t) {
  return t.innerRadius;
}
function yk(t) {
  return t.outerRadius;
}
function vk(t) {
  return t.startAngle;
}
function wk(t) {
  return t.endAngle;
}
function xk(t) {
  return t && t.padAngle;
}
function Sk(t, r, o, l, u, c, p, m) {
  var w = o - t,
    v = l - r,
    _ = p - u,
    T = m - c,
    M = T * w - _ * v;
  if (!(M * M < cn))
    return ((M = (_ * (r - c) - T * (t - u)) / M), [t + M * w, r + M * v]);
}
function ia(t, r, o, l, u, c, p) {
  var m = t - o,
    w = r - l,
    v = (p ? c : -c) / gl(m * m + w * w),
    _ = v * w,
    T = -v * m,
    M = t + _,
    P = r + T,
    $ = o + _,
    L = l + T,
    z = (M + $) / 2,
    D = (P + L) / 2,
    W = $ - M,
    H = L - P,
    Y = W * W + H * H,
    oe = u - c,
    fe = M * L - $ * P,
    ae = (H < 0 ? -1 : 1) * gl(ak(0, oe * oe * Y - fe * fe)),
    _e = (fe * H - W * ae) / Y,
    Ee = (-fe * W - H * ae) / Y,
    xe = (fe * H + W * ae) / Y,
    te = (-fe * W + H * ae) / Y,
    Se = _e - z,
    ie = Ee - D,
    ke = xe - z,
    Ze = te - D;
  return (
    Se * Se + ie * ie > ke * ke + Ze * Ze && ((_e = xe), (Ee = te)),
    {
      cx: _e,
      cy: Ee,
      x01: -_,
      y01: -T,
      x11: _e * (u / oe - 1),
      y11: Ee * (u / oe - 1),
    }
  );
}
function kk() {
  var t = gk,
    r = yk,
    o = $o(0),
    l = null,
    u = vk,
    c = wk,
    p = xk,
    m = null,
    w = mk(v);
  function v() {
    var _,
      T,
      M = +t.apply(this, arguments),
      P = +r.apply(this, arguments),
      $ = u.apply(this, arguments) - Ma,
      L = c.apply(this, arguments) - Ma,
      z = dg(L - $),
      D = L > $;
    if ((m || (m = _ = w()), P < M && ((T = P), (P = M), (M = T)), !(P > cn)))
      m.moveTo(0, 0);
    else if (z > ck - cn)
      (m.moveTo(P * yi($), P * Tr($)),
        m.arc(0, 0, P, $, L, !D),
        M > cn && (m.moveTo(M * yi(L), M * Tr(L)), m.arc(0, 0, M, L, $, D)));
    else {
      var W = $,
        H = L,
        Y = $,
        oe = L,
        fe = z,
        ae = z,
        _e = p.apply(this, arguments) / 2,
        Ee = _e > cn && (l ? +l.apply(this, arguments) : gl(M * M + P * P)),
        xe = Bf(dg(P - M) / 2, +o.apply(this, arguments)),
        te = xe,
        Se = xe,
        ie,
        ke;
      if (Ee > cn) {
        var Ze = hg((Ee / M) * Tr(_e)),
          je = hg((Ee / P) * Tr(_e));
        ((fe -= Ze * 2) > cn
          ? ((Ze *= D ? 1 : -1), (Y += Ze), (oe -= Ze))
          : ((fe = 0), (Y = oe = ($ + L) / 2)),
          (ae -= je * 2) > cn
            ? ((je *= D ? 1 : -1), (W += je), (H -= je))
            : ((ae = 0), (W = H = ($ + L) / 2)));
      }
      var Ne = P * yi(W),
        G = P * Tr(W),
        ce = M * yi(oe),
        de = M * Tr(oe);
      if (xe > cn) {
        var F = P * yi(H),
          X = P * Tr(H),
          Re = M * yi(Y),
          Le = M * Tr(Y),
          ze;
        if (z < Bs)
          if ((ze = Sk(Ne, G, Re, Le, F, X, ce, de))) {
            var Ue = Ne - ze[0],
              Qe = G - ze[1],
              Ve = F - ze[0],
              K = X - ze[1],
              ve =
                1 /
                Tr(
                  fk(
                    (Ue * Ve + Qe * K) /
                      (gl(Ue * Ue + Qe * Qe) * gl(Ve * Ve + K * K)),
                  ) / 2,
                ),
              $e = gl(ze[0] * ze[0] + ze[1] * ze[1]);
            ((te = Bf(xe, (M - $e) / (ve - 1))),
              (Se = Bf(xe, (P - $e) / (ve + 1))));
          } else te = Se = 0;
      }
      (ae > cn
        ? Se > cn
          ? ((ie = ia(Re, Le, Ne, G, P, Se, D)),
            (ke = ia(F, X, ce, de, P, Se, D)),
            m.moveTo(ie.cx + ie.x01, ie.cy + ie.y01),
            Se < xe
              ? m.arc(
                  ie.cx,
                  ie.cy,
                  Se,
                  Bt(ie.y01, ie.x01),
                  Bt(ke.y01, ke.x01),
                  !D,
                )
              : (m.arc(
                  ie.cx,
                  ie.cy,
                  Se,
                  Bt(ie.y01, ie.x01),
                  Bt(ie.y11, ie.x11),
                  !D,
                ),
                m.arc(
                  0,
                  0,
                  P,
                  Bt(ie.cy + ie.y11, ie.cx + ie.x11),
                  Bt(ke.cy + ke.y11, ke.cx + ke.x11),
                  !D,
                ),
                m.arc(
                  ke.cx,
                  ke.cy,
                  Se,
                  Bt(ke.y11, ke.x11),
                  Bt(ke.y01, ke.x01),
                  !D,
                )))
          : (m.moveTo(Ne, G), m.arc(0, 0, P, W, H, !D))
        : m.moveTo(Ne, G),
        !(M > cn) || !(fe > cn)
          ? m.lineTo(ce, de)
          : te > cn
            ? ((ie = ia(ce, de, F, X, M, -te, D)),
              (ke = ia(Ne, G, Re, Le, M, -te, D)),
              m.lineTo(ie.cx + ie.x01, ie.cy + ie.y01),
              te < xe
                ? m.arc(
                    ie.cx,
                    ie.cy,
                    te,
                    Bt(ie.y01, ie.x01),
                    Bt(ke.y01, ke.x01),
                    !D,
                  )
                : (m.arc(
                    ie.cx,
                    ie.cy,
                    te,
                    Bt(ie.y01, ie.x01),
                    Bt(ie.y11, ie.x11),
                    !D,
                  ),
                  m.arc(
                    0,
                    0,
                    M,
                    Bt(ie.cy + ie.y11, ie.cx + ie.x11),
                    Bt(ke.cy + ke.y11, ke.cx + ke.x11),
                    D,
                  ),
                  m.arc(
                    ke.cx,
                    ke.cy,
                    te,
                    Bt(ke.y11, ke.x11),
                    Bt(ke.y01, ke.x01),
                    !D,
                  )))
            : m.arc(0, 0, M, oe, Y, D));
    }
    if ((m.closePath(), _)) return ((m = null), _ + "" || null);
  }
  return (
    (v.centroid = function () {
      var _ = (+t.apply(this, arguments) + +r.apply(this, arguments)) / 2,
        T =
          (+u.apply(this, arguments) + +c.apply(this, arguments)) / 2 - Bs / 2;
      return [yi(T) * _, Tr(T) * _];
    }),
    (v.innerRadius = function (_) {
      return arguments.length
        ? ((t = typeof _ == "function" ? _ : $o(+_)), v)
        : t;
    }),
    (v.outerRadius = function (_) {
      return arguments.length
        ? ((r = typeof _ == "function" ? _ : $o(+_)), v)
        : r;
    }),
    (v.cornerRadius = function (_) {
      return arguments.length
        ? ((o = typeof _ == "function" ? _ : $o(+_)), v)
        : o;
    }),
    (v.padRadius = function (_) {
      return arguments.length
        ? ((l = _ == null ? null : typeof _ == "function" ? _ : $o(+_)), v)
        : l;
    }),
    (v.startAngle = function (_) {
      return arguments.length
        ? ((u = typeof _ == "function" ? _ : $o(+_)), v)
        : u;
    }),
    (v.endAngle = function (_) {
      return arguments.length
        ? ((c = typeof _ == "function" ? _ : $o(+_)), v)
        : c;
    }),
    (v.padAngle = function (_) {
      return arguments.length
        ? ((p = typeof _ == "function" ? _ : $o(+_)), v)
        : p;
    }),
    (v.context = function (_) {
      return arguments.length ? ((m = _ != null ? _ : null), v) : m;
    }),
    v
  );
}
const _k = kk();
function Ck(t) {
  const { clade: r, ...o } = t,
    l = Te.useContext(oo),
    u = Te.useContext($l),
    c = Te.useContext(Il),
    { root: p, leftMost: m, rightMost: w, mostDiverged: v } = r,
    _ = l(u(p)),
    T = l(u(m)),
    M = l(u(w)),
    P = l(u(v)),
    { layoutClass: $ } = u(p);
  if ($ === lt.Rectangular) {
    const L = P.x - _.x,
      z = Math.abs(T.y - M.y);
    return me.jsx($d, {
      width: L,
      height: z,
      x: _.x,
      y: Math.min(T.y, M.y),
      ...o,
      animated: c,
    });
  } else if ($ === lt.Polar) {
    const L = l({ x: 0, y: 0 }),
      z = `translate(${L.x},${L.y})`,
      D = _.r,
      W = P.r,
      H = T.theta,
      Y = M.theta,
      oe = _k({
        innerRadius: D,
        outerRadius: W + 5,
        startAngle: Y + Math.PI / 2,
        endAngle: H + Math.PI / 2,
      });
    return (
      kt(oe, "Error making arc shape for Clade Highlight"),
      me.jsx(Aa, { d: oe, transform: z, ...o, animated: c })
    );
  } else return null;
}
const Ek = Q0(Ck);
function Nk(t) {
  switch (t.shape) {
    case Ml.Cartoon:
      return me.jsx(uk, { ...t });
    case Ml.Highlight:
      return me.jsx(Ek, { ...t });
  }
}
function Tk(t) {
  return typeof t == "function";
}
function no(t) {
  return function (r) {
    const o = {};
    for (const l in t) {
      const u = t[l];
      Tk(u) ? (o[l] = u(r)) : (o[l] = u);
    }
    return o;
  };
}
function la(t) {
  return function (r) {
    const o = {};
    for (const l in t) {
      const u = t[l];
      u !== void 0 &&
        (o[l] = () => {
          u(r);
        });
    }
    return o;
  };
}
function Mk(t, r) {
  var c, p, m, w, v;
  const o = "filter" in t ? t.filter : () => !0;
  kt(o, "Issue with filter option when making baubles");
  const l = "nodes" in t ? t.nodes : r.getNodes().filter(o),
    u = la((c = t.interactions) != null ? c : {});
  if (t.target === An.Node)
    if (t.shape === Tl.Circle) {
      const _ = no(t.attrs),
        T = l.reduce((M, P) => {
          const $ = _(P),
            L = u(P);
          return ((M[P._id] = { ...$, ...L }), M);
        }, {});
      return { nodes: l, attrs: T, id: t.id, target: t.target, shape: t.shape };
    } else {
      const _ = no(t.attrs),
        T = l.reduce((M, P) => {
          const $ = _(P),
            L = u(P);
          return ((M[P._id] = { ...$, ...L }), M);
        }, {});
      return { nodes: l, attrs: T, id: t.id, target: t.target, shape: t.shape };
    }
  else if (t.target === An.Branch) {
    const _ = l
        .filter(($) => !r.isRoot($))
        .map(($) => ({ node: $, parent: r.getParent($) })),
      T = no({ fill: "none", ...t.attrs }),
      M = la((p = t.interactions) != null ? p : {}),
      P = l.reduce(($, L) => {
        const z = T(L),
          D = M(L);
        return (($[L._id] = { ...z, ...D }), $);
      }, {});
    return {
      branches: _,
      attrs: P,
      id: t.id,
      curvature: t.curvature,
      target: t.target,
    };
  } else if (t.target === An.NodeLabel) {
    const _ = no(t.attrs),
      T = no({ text: t.text }),
      M = la((m = t.interactions) != null ? m : {}),
      P = l.reduce(($, L) => {
        const z = _(L),
          D = M(L),
          W = T(L);
        return (($[L._id] = { ...z, ...D, ...W }), $);
      }, {});
    return {
      nodes: l,
      attrs: P,
      id: t.id,
      target: t.target,
      aligned: (w = t.aligned) != null ? w : !1,
    };
  } else if (t.target === An.BranchLabel) {
    const _ = l.filter((z) => !r.isRoot(z)),
      T = _.map((z) => ({ node: z, parent: r.getParent(z) })),
      M = no(t.attrs),
      P = la((v = t.interactions) != null ? v : {}),
      $ = no({ text: t.text }),
      L = _.reduce((z, D) => {
        const W = M(D),
          H = P(D),
          Y = $(D);
        return ((z[D._id] = { ...W, ...H, ...Y }), z);
      }, {});
    return { branches: T, attrs: L, id: t.id, target: t.target };
  } else {
    const _ = l.map((T) => {
      const M = [...Xs(r, T)],
        P = M[0],
        $ = M[M.length - 1],
        L = M[J1(M, (z) => r.getDivergence(z))];
      return { root: T, leftMost: P, rightMost: $, mostDiverged: L };
    });
    if (t.shape === Ml.Highlight) {
      const T = no(t.attrs),
        M = l.reduce((P, $) => {
          const L = T($),
            z = u($);
          return ((P[$._id] = { ...L, ...z }), P);
        }, {});
      return {
        clades: _,
        attrs: M,
        id: t.id,
        target: t.target,
        shape: t.shape,
      };
    } else {
      const T = no(t.attrs),
        M = l.reduce((P, $) => {
          const L = T($),
            z = u($);
          return ((P[$._id] = { ...L, ...z }), P);
        }, {});
      return {
        clades: _,
        attrs: M,
        id: t.id,
        target: t.target,
        shape: t.shape,
      };
    }
  }
}
function q0(t) {
  return { ...t, shape: Tl.Circle, target: An.Node };
}
function X0(t) {
  return { ...t, shape: Tl.Rectangle, target: An.Node };
}
function qd(t) {
  return { ...t, target: An.Branch };
}
function K0(t) {
  return { attrs: {}, aligned: !1, ...t, target: An.NodeLabel };
}
function Z0(t) {
  return { attrs: {}, ...t, target: An.BranchLabel };
}
function G0(t) {
  return { ...t, shape: Ml.Highlight, target: An.Clade };
}
function J0(t) {
  return { ...t, shape: Ml.Cartoon, target: An.Clade };
}
const _n = {
    offsetBy: 0,
    scaleBy: 1,
    reverse: !1,
    gap: 5,
    title: { text: "", padding: 40, style: {} },
    ticks: { number: 5, format: js(".1f"), padding: 20, style: {}, length: 6 },
    attrs: { strokeWidth: 1 },
  },
  Pa = { evenFill: "#EDEDED", oddFill: "none" };
function Pk(t) {
  const {
    attrs: r,
    evenFill: o = Pa.evenFill,
    oddFill: l = Pa.oddFill,
    tickValues: u,
    scale: c,
    figureScale: p,
    axisY: m,
  } = t;
  return me.jsx("g", {
    className: "axisBars",
    children: u
      .filter((w, v, _) => v < _.length - 1)
      .map((w, v) => {
        const _ = p({ x: c(w), y: m }),
          T = p({ x: c(w), y: 0 }),
          M = p({ x: c(u[v + 1]), y: 0 }),
          P = p({ x: c(u[v + 1]), y: m }),
          $ =
            _.theta === T.theta || _.r === 0
              ? ""
              : `A${_.r},${_.r} 0 1 0 ${T.x},${T.y}`,
          L =
            M.theta === P.theta || M.r === 0
              ? ""
              : `A${M.r},${M.r} 0 1 1 ${P.x},${P.y}`,
          z = `M${_.x},${_.y} ${$} L${T.x},${T.y} L${M.x},${M.y} ${L} L ${_.x} ${_.y} Z`,
          D = v % 2 === 0 ? o : l;
        return me.jsx(Aa, { d: z, fill: D, ...r, animated: !1 }, v);
      }),
  });
}
function Rk(t) {
  const r = Te.useContext(Ks),
    o = Te.useContext(oo),
    { bars: l, attrs: u } = t,
    c = t.ticks ? { ..._n.ticks, ...t.ticks } : _n.ticks,
    p = t.title ? { ..._n.title, ...t.title } : _n.title,
    m = ey(t, r);
  let w;
  c.values != null ? (w = c.values) : (w = m.ticks(c.number));
  const v = _i(o({ x: r.domainX[1], y: r.domainY[1] }).theta),
    _ = r.domainY[1] + r.domainY[1] * 0.005,
    T = o({ x: r.domainX[0], y: _ }),
    M = o({ x: r.domainX[1], y: _ }),
    P = `M${T.x},${T.y} L${M.x},${M.y}`,
    $ = c.length * Math.cos(v),
    L = c.length * Math.sin(v),
    z = c.padding * Math.cos(v),
    D = c.padding * Math.sin(v),
    W = hn(Fd(m.range()), "Error calculating x position for title"),
    H = o({ x: W, y: _ }),
    Y = p.padding * Math.cos(v),
    oe = p.padding * Math.sin(v);
  return me.jsxs("g", {
    className: "axis",
    children: [
      me.jsx(Pk, { ...l, tickValues: w, scale: m, axisY: _ }),
      ":",
      me.jsx("path", { d: P, stroke: "black", ...u }),
      me.jsxs("g", {
        children: [
          w.map((fe, ae) => {
            const _e = o({ x: m(fe), y: _ });
            return me.jsxs(
              "g",
              {
                transform: `translate(${_e.x},${_e.y}) rotate(90)`,
                children: [
                  me.jsx("line", {
                    x1: $,
                    y1: L,
                    x2: 0,
                    y2: 0,
                    stroke: "black",
                    ...u,
                  }),
                  me.jsx("text", {
                    transform: `translate(${z},${D}) rotate(-90)`,
                    textAnchor: "middle",
                    dominantBaseline: "central",
                    ...c.style,
                    children: c.format(fe),
                  }),
                ],
              },
              `tick-${ae}`,
            );
          }),
          me.jsx("g", {
            transform: `translate(${H.x},${H.y}) rotate(90)`,
            children: me.jsx("text", {
              textAnchor: "middle",
              transform: `translate(${Y},${oe}) rotate(-90)`,
              children: p.text,
            }),
          }),
        ],
      }),
    ],
  });
}
function ey(t, r) {
  const {
      reverse: o = _n.reverse,
      offsetBy: l = _n.offsetBy,
      scaleBy: u = _n.scaleBy,
      scale: c,
    } = t,
    { domainX: p } = r,
    m = c === void 0 ? On().domain(p).range(p) : c.copy();
  if (c === void 0) {
    const w = p.map((v) => v + l).map((v) => (v - l) * u + l);
    (m.domain(w), o && m.domain([l - (w[1] - w[0]), l]));
  }
  return m.nice();
}
function $k(t) {
  const {
      attrs: r,
      evenFill: o = Pa.evenFill,
      oddFill: l = Pa.oddFill,
      tickValues: u,
      scale: c,
      axisY: p,
    } = t,
    m = Te.useContext(oo);
  return me.jsx(
    "g",
    {
      className: "axisBars",
      children: u
        .filter((w, v, _) => v < _.length - 1)
        .map((w, v) => {
          const _ = m({ x: c(w), y: p }),
            T = m({ x: c(w), y: -0.05 }),
            M = m({ x: c(u[v + 1]), y: 0 }),
            P = v % 2 === 0 ? o : l;
          return me.jsx(
            $d,
            {
              x: _.x,
              width: M.x - _.x,
              y: T.y,
              height: _.y - T.y,
              fill: P,
              rx: 2,
              ry: 2,
              ...r,
              animated: !1,
            },
            `recBar-${v}`,
          );
        }, []),
    },
    "axisBars",
  );
}
function Ik(t) {
  const r = Te.useContext(Ks),
    o = Te.useContext(oo),
    { gap: l = _n.gap, bars: u } = t,
    c = { ..._n.attrs, ...t.attrs },
    p = t.ticks ? { ..._n.ticks, ...t.ticks } : _n.ticks,
    m = t.title ? { ..._n.title, ...t.title } : _n.title,
    w = ey(t, r);
  let v;
  p.values !== void 0 ? (v = p.values) : (v = w.ticks(p.number));
  const _ = r.domainY[1] + r.domainY[1] * 0.01,
    T = o({ x: r.domainX[0], y: _ }),
    M = o({ x: r.domainX[1], y: _ }),
    P = `M${T.x},${T.y + l} L${M.x},${M.y + l}`,
    $ = hn(Fd(w.range()), "Error calculating x position for title"),
    L = o({ x: $, y: _ });
  return me.jsxs("g", {
    className: "axis",
    children: [
      u ? me.jsx($k, { ...u, tickValues: v, scale: w, axisY: _ }) : null,
      me.jsx("path", { d: P, stroke: "black", ...c }),
      me.jsxs("g", {
        children: [
          v.map((z, D) => {
            const W = o({ x: w(z), y: _ });
            return me.jsxs(
              "g",
              {
                transform: `translate(${W.x},${W.y + l})`,
                children: [
                  me.jsx("line", {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: p.length,
                    stroke: "black",
                    ...c,
                  }),
                  me.jsx("text", {
                    transform: `translate(0,${p.padding})`,
                    textAnchor: "middle",
                    dominantBaseline: "central",
                    ...p.style,
                    children: p.format(z),
                  }),
                ],
              },
              `tick-${D}`,
            );
          }),
          me.jsx("g", {
            transform: `translate(${L.x},${L.y + l}) `,
            children: me.jsx("text", {
              textAnchor: "middle",
              transform: `translate(0,${m.padding})`,
              ...m.style,
              children: m.text,
            }),
          }),
        ],
      }),
    ],
  });
}
function Fk(t) {
  const r = Te.useContext(Ks),
    { layoutClass: o } = r;
  return o === lt.Polar
    ? me.jsx(Rk, { ...t })
    : o === lt.Rectangular
      ? me.jsx(Ik, { ...t })
      : (console.warn(`Axis not supported for ${o}`), null);
}
const Lk = Wa.fromNewick("((A:1,B:1):1,C:2);"),
  an = {
    opts: Id,
    width: 100,
    layout: Vd,
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    tree: Lk,
    baubles: [
      qd({ filter: () => !0, attrs: { stroke: "black", strokeWidth: 1 } }),
    ],
    animated: !1,
  };
function Vs(t) {
  const {
      width: r = an.width,
      height: o = an.width,
      margins: l = an.margins,
      tree: u = an.tree,
      layout: c = an.layout,
      animated: p = an.animated,
      baubles: m = an.baubles,
      axis: w,
    } = t,
    v = t.opts ? t.opts : an.opts,
    {
      rootAngle: _ = an.opts.rootAngle,
      angleRange: T = an.opts.angleRange,
      fishEye: M = an.opts.fishEye,
      pollard: P = an.opts.pollard,
      minRadius: $ = an.opts.minRadius,
      invert: L = an.opts.invert,
    } = v;
  let z,
    D,
    { x: W, y: H } = t;
  W !== void 0 && H !== void 0
    ? ((z = r), (D = o))
    : ((z = r - l.left - l.right),
      (D = o - l.top - l.bottom),
      (W = l.left),
      (H = l.top));
  const Y = c(u, v),
    { layoutClass: oe } = Y(u.getRoot()),
    fe = Sl(u.getNodes().map((te) => Y(te).x)).map((te) =>
      hn(te, "Error finding x extent from layout"),
    ),
    ae = Sl(u.getNodes().map((te) => Y(te).y)).map((te) =>
      hn(te, "Error finding y extent from layout"),
    ),
    _e = {
      canvasWidth: z,
      canvasHeight: D,
      domainX: fe,
      domainY: ae,
      layoutClass: oe,
      invert: L,
      pollard: P,
      minRadius: $,
      fishEye: M,
      rootAngle: _,
      angleRange: T,
    },
    Ee = LS(_e),
    xe = m.map((te) => Mk(te, u));
  return me.jsx("g", {
    children: me.jsx("g", {
      transform: `translate(${W},${H})`,
      children: me.jsx(oo.Provider, {
        value: Ee,
        children: me.jsx(Ks.Provider, {
          value: _e,
          children: me.jsx($l.Provider, {
            value: Y,
            children: me.jsxs(Il.Provider, {
              value: p,
              children: [
                w ? me.jsx(Fk, { ...w }) : null,
                xe.map((te, Se) => {
                  var ie;
                  return me.jsx(lk, { ...te }, (ie = te.id) != null ? ie : Se);
                }),
              ],
            }),
          }),
        }),
      }),
    }),
  });
}
const zk = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      BaseAnnotationType: et,
      BranchLabels: Z0,
      Branches: qd,
      CartoonClades: J0,
      CircleNodes: q0,
      FigTree: Vs,
      HighlightClades: G0,
      ImmutableTree: Wa,
      NexusImporter: I0,
      NodeLabels: K0,
      PreOrderTraversalCache: F0,
      RectangleNodes: X0,
      TaxonSet: Rl,
      dateToDecimal: p0,
      decimalToDate: h0,
      defaultInternalLayoutOptions: Id,
      layoutClass: lt,
      leapYear: ba,
      notNull: kt,
      panic: m0,
      pathToRootIterator: $0,
      polarLayout: z0,
      postOrderIterator: Bd,
      preOrderIterator: bd,
      psuedoRootPostOrderIterator: R0,
      psuedoRootPreOrderIterator: P0,
      radialLayout: D0,
      rectangularLayout: Vd,
      tipIterator: Xs,
      u: g0,
      unNullify: hn,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var sa = {},
  pg;
function Dk() {
  if (pg) return sa;
  pg = 1;
  var t = Sg();
  return ((sa.createRoot = t.createRoot), (sa.hydrateRoot = t.hydrateRoot), sa);
}
var Ok = Dk(),
  Io = {},
  vi = {};
var mg;
function jk() {
  if (mg) return vi;
  mg = 1;
  var t = Hs();
  function r(f) {
    for (
      var y = "https://reactjs.org/docs/error-decoder.html?invariant=" + f,
        k = 1;
      k < arguments.length;
      k++
    )
      y += "&args[]=" + encodeURIComponent(arguments[k]);
    return (
      "Minified React error #" +
      f +
      "; visit " +
      y +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var o = Object.prototype.hasOwnProperty,
    l =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    u = {},
    c = {};
  function p(f) {
    return o.call(c, f)
      ? !0
      : o.call(u, f)
        ? !1
        : l.test(f)
          ? (c[f] = !0)
          : ((u[f] = !0), !1);
  }
  function m(f, y, k, E, U, O, Q) {
    ((this.acceptsBooleans = y === 2 || y === 3 || y === 4),
      (this.attributeName = E),
      (this.attributeNamespace = U),
      (this.mustUseProperty = k),
      (this.propertyName = f),
      (this.type = y),
      (this.sanitizeURL = O),
      (this.removeEmptyString = Q));
  }
  var w = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (f) {
      w[f] = new m(f, 0, !1, f, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (f) {
      var y = f[0];
      w[y] = new m(y, 1, !1, f[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (f) {
        w[f] = new m(f, 2, !1, f.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (f) {
      w[f] = new m(f, 2, !1, f, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (f) {
        w[f] = new m(f, 3, !1, f.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (f) {
      w[f] = new m(f, 3, !0, f, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (f) {
      w[f] = new m(f, 4, !1, f, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (f) {
      w[f] = new m(f, 6, !1, f, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (f) {
      w[f] = new m(f, 5, !1, f.toLowerCase(), null, !1, !1);
    }));
  var v = /[\-:]([a-z])/g;
  function _(f) {
    return f[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (f) {
      var y = f.replace(v, _);
      w[y] = new m(y, 1, !1, f, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (f) {
        var y = f.replace(v, _);
        w[y] = new m(y, 1, !1, f, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (f) {
      var y = f.replace(v, _);
      w[y] = new m(y, 1, !1, f, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (f) {
      w[f] = new m(f, 1, !1, f.toLowerCase(), null, !1, !1);
    }),
    (w.xlinkHref = new m(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (f) {
      w[f] = new m(f, 1, !1, f.toLowerCase(), null, !0, !0);
    }));
  var T = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    M = ["Webkit", "ms", "Moz", "O"];
  Object.keys(T).forEach(function (f) {
    M.forEach(function (y) {
      ((y = y + f.charAt(0).toUpperCase() + f.substring(1)), (T[y] = T[f]));
    });
  });
  var P = /["'&<>]/;
  function $(f) {
    if (typeof f == "boolean" || typeof f == "number") return "" + f;
    f = "" + f;
    var y = P.exec(f);
    if (y) {
      var k = "",
        E,
        U = 0;
      for (E = y.index; E < f.length; E++) {
        switch (f.charCodeAt(E)) {
          case 34:
            y = "&quot;";
            break;
          case 38:
            y = "&amp;";
            break;
          case 39:
            y = "&#x27;";
            break;
          case 60:
            y = "&lt;";
            break;
          case 62:
            y = "&gt;";
            break;
          default:
            continue;
        }
        (U !== E && (k += f.substring(U, E)), (U = E + 1), (k += y));
      }
      f = U !== E ? k + f.substring(U, E) : k;
    }
    return f;
  }
  var L = /([A-Z])/g,
    z = /^ms-/,
    D = Array.isArray;
  function W(f, y) {
    return { insertionMode: f, selectedValue: y };
  }
  function H(f, y, k) {
    switch (y) {
      case "select":
        return W(1, k.value != null ? k.value : k.defaultValue);
      case "svg":
        return W(2, null);
      case "math":
        return W(3, null);
      case "foreignObject":
        return W(1, null);
      case "table":
        return W(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return W(5, null);
      case "colgroup":
        return W(7, null);
      case "tr":
        return W(6, null);
    }
    return 4 <= f.insertionMode || f.insertionMode === 0 ? W(1, null) : f;
  }
  var Y = new Map();
  function oe(f, y, k) {
    if (typeof k != "object") throw Error(r(62));
    y = !0;
    for (var E in k)
      if (o.call(k, E)) {
        var U = k[E];
        if (U != null && typeof U != "boolean" && U !== "") {
          if (E.indexOf("--") === 0) {
            var O = $(E);
            U = $(("" + U).trim());
          } else {
            O = E;
            var Q = Y.get(O);
            (Q !== void 0 ||
              ((Q = $(O.replace(L, "-$1").toLowerCase().replace(z, "-ms-"))),
              Y.set(O, Q)),
              (O = Q),
              (U =
                typeof U == "number"
                  ? U === 0 || o.call(T, E)
                    ? "" + U
                    : U + "px"
                  : $(("" + U).trim())));
          }
          y
            ? ((y = !1), f.push(' style="', O, ":", U))
            : f.push(";", O, ":", U);
        }
      }
    y || f.push('"');
  }
  function fe(f, y, k, E) {
    switch (k) {
      case "style":
        oe(f, y, E);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (
      !(2 < k.length) ||
      (k[0] !== "o" && k[0] !== "O") ||
      (k[1] !== "n" && k[1] !== "N")
    ) {
      if (((y = w.hasOwnProperty(k) ? w[k] : null), y !== null)) {
        switch (typeof E) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!y.acceptsBooleans) return;
        }
        switch (((k = y.attributeName), y.type)) {
          case 3:
            E && f.push(" ", k, '=""');
            break;
          case 4:
            E === !0
              ? f.push(" ", k, '=""')
              : E !== !1 && f.push(" ", k, '="', $(E), '"');
            break;
          case 5:
            isNaN(E) || f.push(" ", k, '="', $(E), '"');
            break;
          case 6:
            !isNaN(E) && 1 <= E && f.push(" ", k, '="', $(E), '"');
            break;
          default:
            (y.sanitizeURL && (E = "" + E), f.push(" ", k, '="', $(E), '"'));
        }
      } else if (p(k)) {
        switch (typeof E) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (
              ((y = k.toLowerCase().slice(0, 5)),
              y !== "data-" && y !== "aria-")
            )
              return;
        }
        f.push(" ", k, '="', $(E), '"');
      }
    }
  }
  function ae(f, y, k) {
    if (y != null) {
      if (k != null) throw Error(r(60));
      if (typeof y != "object" || !("__html" in y)) throw Error(r(61));
      ((y = y.__html), y != null && f.push("" + y));
    }
  }
  function _e(f) {
    var y = "";
    return (
      t.Children.forEach(f, function (k) {
        k != null && (y += k);
      }),
      y
    );
  }
  function Ee(f, y, k, E) {
    f.push(Se(k));
    var U = (k = null),
      O;
    for (O in y)
      if (o.call(y, O)) {
        var Q = y[O];
        if (Q != null)
          switch (O) {
            case "children":
              k = Q;
              break;
            case "dangerouslySetInnerHTML":
              U = Q;
              break;
            default:
              fe(f, E, O, Q);
          }
      }
    return (
      f.push(">"),
      ae(f, U, k),
      typeof k == "string" ? (f.push($(k)), null) : k
    );
  }
  var xe = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    te = new Map();
  function Se(f) {
    var y = te.get(f);
    if (y === void 0) {
      if (!xe.test(f)) throw Error(r(65, f));
      ((y = "<" + f), te.set(f, y));
    }
    return y;
  }
  function ie(f, y, k, E, U) {
    switch (y) {
      case "select":
        f.push(Se("select"));
        var O = null,
          Q = null;
        for (Ae in k)
          if (o.call(k, Ae)) {
            var se = k[Ae];
            if (se != null)
              switch (Ae) {
                case "children":
                  O = se;
                  break;
                case "dangerouslySetInnerHTML":
                  Q = se;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  fe(f, E, Ae, se);
              }
          }
        return (f.push(">"), ae(f, Q, O), O);
      case "option":
        ((Q = U.selectedValue), f.push(Se("option")));
        var he = (se = null),
          Fe = null,
          Ae = null;
        for (O in k)
          if (o.call(k, O)) {
            var tt = k[O];
            if (tt != null)
              switch (O) {
                case "children":
                  se = tt;
                  break;
                case "selected":
                  Fe = tt;
                  break;
                case "dangerouslySetInnerHTML":
                  Ae = tt;
                  break;
                case "value":
                  he = tt;
                default:
                  fe(f, E, O, tt);
              }
          }
        if (Q != null)
          if (((k = he !== null ? "" + he : _e(se)), D(Q))) {
            for (E = 0; E < Q.length; E++)
              if ("" + Q[E] === k) {
                f.push(' selected=""');
                break;
              }
          } else "" + Q === k && f.push(' selected=""');
        else Fe && f.push(' selected=""');
        return (f.push(">"), ae(f, Ae, se), se);
      case "textarea":
        (f.push(Se("textarea")), (Ae = Q = O = null));
        for (se in k)
          if (o.call(k, se) && ((he = k[se]), he != null))
            switch (se) {
              case "children":
                Ae = he;
                break;
              case "value":
                O = he;
                break;
              case "defaultValue":
                Q = he;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(r(91));
              default:
                fe(f, E, se, he);
            }
        if ((O === null && Q !== null && (O = Q), f.push(">"), Ae != null)) {
          if (O != null) throw Error(r(92));
          if (D(Ae) && 1 < Ae.length) throw Error(r(93));
          O = "" + Ae;
        }
        return (
          typeof O == "string" &&
            O[0] ===
              `
` &&
            f.push(`
`),
          O !== null && f.push($("" + O)),
          null
        );
      case "input":
        (f.push(Se("input")), (he = Ae = se = O = null));
        for (Q in k)
          if (o.call(k, Q) && ((Fe = k[Q]), Fe != null))
            switch (Q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(399, "input"));
              case "defaultChecked":
                he = Fe;
                break;
              case "defaultValue":
                se = Fe;
                break;
              case "checked":
                Ae = Fe;
                break;
              case "value":
                O = Fe;
                break;
              default:
                fe(f, E, Q, Fe);
            }
        return (
          Ae !== null
            ? fe(f, E, "checked", Ae)
            : he !== null && fe(f, E, "checked", he),
          O !== null
            ? fe(f, E, "value", O)
            : se !== null && fe(f, E, "value", se),
          f.push("/>"),
          null
        );
      case "menuitem":
        f.push(Se("menuitem"));
        for (var Xt in k)
          if (o.call(k, Xt) && ((O = k[Xt]), O != null))
            switch (Xt) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(400));
              default:
                fe(f, E, Xt, O);
            }
        return (f.push(">"), null);
      case "title":
        (f.push(Se("title")), (O = null));
        for (tt in k)
          if (o.call(k, tt) && ((Q = k[tt]), Q != null))
            switch (tt) {
              case "children":
                O = Q;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(r(434));
              default:
                fe(f, E, tt, Q);
            }
        return (f.push(">"), O);
      case "listing":
      case "pre":
        (f.push(Se(y)), (Q = O = null));
        for (he in k)
          if (o.call(k, he) && ((se = k[he]), se != null))
            switch (he) {
              case "children":
                O = se;
                break;
              case "dangerouslySetInnerHTML":
                Q = se;
                break;
              default:
                fe(f, E, he, se);
            }
        if ((f.push(">"), Q != null)) {
          if (O != null) throw Error(r(60));
          if (typeof Q != "object" || !("__html" in Q)) throw Error(r(61));
          ((k = Q.__html),
            k != null &&
              (typeof k == "string" &&
              0 < k.length &&
              k[0] ===
                `
`
                ? f.push(
                    `
`,
                    k,
                  )
                : f.push("" + k)));
        }
        return (
          typeof O == "string" &&
            O[0] ===
              `
` &&
            f.push(`
`),
          O
        );
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        f.push(Se(y));
        for (var Kt in k)
          if (o.call(k, Kt) && ((O = k[Kt]), O != null))
            switch (Kt) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(399, y));
              default:
                fe(f, E, Kt, O);
            }
        return (f.push("/>"), null);
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return Ee(f, k, y, E);
      case "html":
        return (
          U.insertionMode === 0 && f.push("<!DOCTYPE html>"),
          Ee(f, k, y, E)
        );
      default:
        if (y.indexOf("-") === -1 && typeof k.is != "string")
          return Ee(f, k, y, E);
        (f.push(Se(y)), (Q = O = null));
        for (Fe in k)
          if (o.call(k, Fe) && ((se = k[Fe]), se != null))
            switch (Fe) {
              case "children":
                O = se;
                break;
              case "dangerouslySetInnerHTML":
                Q = se;
                break;
              case "style":
                oe(f, E, se);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                p(Fe) &&
                  typeof se != "function" &&
                  typeof se != "symbol" &&
                  f.push(" ", Fe, '="', $(se), '"');
            }
        return (f.push(">"), ae(f, Q, O), O);
    }
  }
  function ke(f, y, k) {
    if ((f.push('<!--$?--><template id="'), k === null)) throw Error(r(395));
    return (f.push(k), f.push('"></template>'));
  }
  function Ze(f, y, k, E) {
    switch (k.insertionMode) {
      case 0:
      case 1:
        return (
          f.push('<div hidden id="'),
          f.push(y.segmentPrefix),
          (y = E.toString(16)),
          f.push(y),
          f.push('">')
        );
      case 2:
        return (
          f.push('<svg aria-hidden="true" style="display:none" id="'),
          f.push(y.segmentPrefix),
          (y = E.toString(16)),
          f.push(y),
          f.push('">')
        );
      case 3:
        return (
          f.push('<math aria-hidden="true" style="display:none" id="'),
          f.push(y.segmentPrefix),
          (y = E.toString(16)),
          f.push(y),
          f.push('">')
        );
      case 4:
        return (
          f.push('<table hidden id="'),
          f.push(y.segmentPrefix),
          (y = E.toString(16)),
          f.push(y),
          f.push('">')
        );
      case 5:
        return (
          f.push('<table hidden><tbody id="'),
          f.push(y.segmentPrefix),
          (y = E.toString(16)),
          f.push(y),
          f.push('">')
        );
      case 6:
        return (
          f.push('<table hidden><tr id="'),
          f.push(y.segmentPrefix),
          (y = E.toString(16)),
          f.push(y),
          f.push('">')
        );
      case 7:
        return (
          f.push('<table hidden><colgroup id="'),
          f.push(y.segmentPrefix),
          (y = E.toString(16)),
          f.push(y),
          f.push('">')
        );
      default:
        throw Error(r(397));
    }
  }
  function je(f, y) {
    switch (y.insertionMode) {
      case 0:
      case 1:
        return f.push("</div>");
      case 2:
        return f.push("</svg>");
      case 3:
        return f.push("</math>");
      case 4:
        return f.push("</table>");
      case 5:
        return f.push("</tbody></table>");
      case 6:
        return f.push("</tr></table>");
      case 7:
        return f.push("</colgroup></table>");
      default:
        throw Error(r(397));
    }
  }
  var Ne = /[<\u2028\u2029]/g;
  function G(f) {
    return JSON.stringify(f).replace(Ne, function (y) {
      switch (y) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React",
          );
      }
    });
  }
  function ce(f, y) {
    return (
      (y = y === void 0 ? "" : y),
      {
        bootstrapChunks: [],
        startInlineScript: "<script>",
        placeholderPrefix: y + "P:",
        segmentPrefix: y + "S:",
        boundaryPrefix: y + "B:",
        idPrefix: y,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: !1,
        sentCompleteBoundaryFunction: !1,
        sentClientRenderFunction: !1,
        generateStaticMarkup: f,
      }
    );
  }
  function de(f, y, k, E) {
    return k.generateStaticMarkup
      ? (f.push($(y)), !1)
      : (y === "" ? (f = E) : (E && f.push("<!-- -->"), f.push($(y)), (f = !0)),
        f);
  }
  var F = Object.assign,
    X = Symbol.for("react.element"),
    Re = Symbol.for("react.portal"),
    Le = Symbol.for("react.fragment"),
    ze = Symbol.for("react.strict_mode"),
    Ue = Symbol.for("react.profiler"),
    Qe = Symbol.for("react.provider"),
    Ve = Symbol.for("react.context"),
    K = Symbol.for("react.forward_ref"),
    ve = Symbol.for("react.suspense"),
    $e = Symbol.for("react.suspense_list"),
    ee = Symbol.for("react.memo"),
    Ye = Symbol.for("react.lazy"),
    He = Symbol.for("react.scope"),
    gt = Symbol.for("react.debug_trace_mode"),
    dt = Symbol.for("react.legacy_hidden"),
    Vt = Symbol.for("react.default_value"),
    Nn = Symbol.iterator;
  function Un(f) {
    if (f == null) return null;
    if (typeof f == "function") return f.displayName || f.name || null;
    if (typeof f == "string") return f;
    switch (f) {
      case Le:
        return "Fragment";
      case Re:
        return "Portal";
      case Ue:
        return "Profiler";
      case ze:
        return "StrictMode";
      case ve:
        return "Suspense";
      case $e:
        return "SuspenseList";
    }
    if (typeof f == "object")
      switch (f.$$typeof) {
        case Ve:
          return (f.displayName || "Context") + ".Consumer";
        case Qe:
          return (f._context.displayName || "Context") + ".Provider";
        case K:
          var y = f.render;
          return (
            (f = f.displayName),
            f ||
              ((f = y.displayName || y.name || ""),
              (f = f !== "" ? "ForwardRef(" + f + ")" : "ForwardRef")),
            f
          );
        case ee:
          return (
            (y = f.displayName || null),
            y !== null ? y : Un(f.type) || "Memo"
          );
        case Ye:
          ((y = f._payload), (f = f._init));
          try {
            return Un(f(y));
          } catch (k) {}
      }
    return null;
  }
  var Tn = {};
  function bn(f, y) {
    if (((f = f.contextTypes), !f)) return Tn;
    var k = {},
      E;
    for (E in f) k[E] = y[E];
    return k;
  }
  var qt = null;
  function _t(f, y) {
    if (f !== y) {
      ((f.context._currentValue2 = f.parentValue), (f = f.parent));
      var k = y.parent;
      if (f === null) {
        if (k !== null) throw Error(r(401));
      } else {
        if (k === null) throw Error(r(401));
        _t(f, k);
      }
      y.context._currentValue2 = y.value;
    }
  }
  function Do(f) {
    ((f.context._currentValue2 = f.parentValue),
      (f = f.parent),
      f !== null && Do(f));
  }
  function Oo(f) {
    var y = f.parent;
    (y !== null && Oo(y), (f.context._currentValue2 = f.value));
  }
  function jo(f, y) {
    if (
      ((f.context._currentValue2 = f.parentValue), (f = f.parent), f === null)
    )
      throw Error(r(402));
    f.depth === y.depth ? _t(f, y) : jo(f, y);
  }
  function io(f, y) {
    var k = y.parent;
    if (k === null) throw Error(r(402));
    (f.depth === k.depth ? _t(f, k) : io(f, k),
      (y.context._currentValue2 = y.value));
  }
  function Bn(f) {
    var y = qt;
    y !== f &&
      (y === null
        ? Oo(f)
        : f === null
          ? Do(y)
          : y.depth === f.depth
            ? _t(y, f)
            : y.depth > f.depth
              ? jo(y, f)
              : io(y, f),
      (qt = f));
  }
  var Ao = {
    isMounted: function () {
      return !1;
    },
    enqueueSetState: function (f, y) {
      ((f = f._reactInternals), f.queue !== null && f.queue.push(y));
    },
    enqueueReplaceState: function (f, y) {
      ((f = f._reactInternals), (f.replace = !0), (f.queue = [y]));
    },
    enqueueForceUpdate: function () {},
  };
  function sr(f, y, k, E) {
    var U = f.state !== void 0 ? f.state : null;
    ((f.updater = Ao), (f.props = k), (f.state = U));
    var O = { queue: [], replace: !1 };
    f._reactInternals = O;
    var Q = y.contextType;
    if (
      ((f.context = typeof Q == "object" && Q !== null ? Q._currentValue2 : E),
      (Q = y.getDerivedStateFromProps),
      typeof Q == "function" &&
        ((Q = Q(k, U)), (U = Q == null ? U : F({}, U, Q)), (f.state = U)),
      typeof y.getDerivedStateFromProps != "function" &&
        typeof f.getSnapshotBeforeUpdate != "function" &&
        (typeof f.UNSAFE_componentWillMount == "function" ||
          typeof f.componentWillMount == "function"))
    )
      if (
        ((y = f.state),
        typeof f.componentWillMount == "function" && f.componentWillMount(),
        typeof f.UNSAFE_componentWillMount == "function" &&
          f.UNSAFE_componentWillMount(),
        y !== f.state && Ao.enqueueReplaceState(f, f.state, null),
        O.queue !== null && 0 < O.queue.length)
      )
        if (
          ((y = O.queue),
          (Q = O.replace),
          (O.queue = null),
          (O.replace = !1),
          Q && y.length === 1)
        )
          f.state = y[0];
        else {
          for (
            O = Q ? y[0] : f.state, U = !0, Q = Q ? 1 : 0;
            Q < y.length;
            Q++
          ) {
            var se = y[Q];
            ((se = typeof se == "function" ? se.call(f, O, k, E) : se),
              se != null && (U ? ((U = !1), (O = F({}, O, se))) : F(O, se)));
          }
          f.state = O;
        }
      else O.queue = null;
  }
  var Lr = { id: 1, overflow: "" };
  function Uo(f, y, k) {
    var E = f.id;
    f = f.overflow;
    var U = 32 - zr(E) - 1;
    ((E &= ~(1 << U)), (k += 1));
    var O = 32 - zr(y) + U;
    if (30 < O) {
      var Q = U - (U % 5);
      return (
        (O = (E & ((1 << Q) - 1)).toString(32)),
        (E >>= Q),
        (U -= Q),
        { id: (1 << (32 - zr(y) + U)) | (k << U) | E, overflow: O + f }
      );
    }
    return { id: (1 << O) | (k << U) | E, overflow: f };
  }
  var zr = Math.clz32 ? Math.clz32 : bo,
    Ii = Math.log,
    Fl = Math.LN2;
  function bo(f) {
    return ((f >>>= 0), f === 0 ? 32 : (31 - ((Ii(f) / Fl) | 0)) | 0);
  }
  function Bo(f, y) {
    return (f === y && (f !== 0 || 1 / f === 1 / y)) || (f !== f && y !== y);
  }
  var Vo = typeof Object.is == "function" ? Object.is : Bo,
    Ft = null,
    Dr = null,
    pn = null,
    qe = null,
    ur = !1,
    Or = !1,
    ar = 0,
    mn = null,
    jr = 0;
  function gn() {
    if (Ft === null) throw Error(r(321));
    return Ft;
  }
  function Ho() {
    if (0 < jr) throw Error(r(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Vn() {
    return (
      qe === null
        ? pn === null
          ? ((ur = !1), (pn = qe = Ho()))
          : ((ur = !0), (qe = pn))
        : qe.next === null
          ? ((ur = !1), (qe = qe.next = Ho()))
          : ((ur = !0), (qe = qe.next)),
      qe
    );
  }
  function Ar() {
    ((Dr = Ft = null), (Or = !1), (pn = null), (jr = 0), (qe = mn = null));
  }
  function cr(f, y) {
    return typeof y == "function" ? y(f) : y;
  }
  function Fi(f, y, k) {
    if (((Ft = gn()), (qe = Vn()), ur)) {
      var E = qe.queue;
      if (((y = E.dispatch), mn !== null && ((k = mn.get(E)), k !== void 0))) {
        (mn.delete(E), (E = qe.memoizedState));
        do ((E = f(E, k.action)), (k = k.next));
        while (k !== null);
        return ((qe.memoizedState = E), [E, y]);
      }
      return [qe.memoizedState, y];
    }
    return (
      (f =
        f === cr
          ? typeof y == "function"
            ? y()
            : y
          : k !== void 0
            ? k(y)
            : y),
      (qe.memoizedState = f),
      (f = qe.queue = { last: null, dispatch: null }),
      (f = f.dispatch = lo.bind(null, Ft, f)),
      [qe.memoizedState, f]
    );
  }
  function fr(f, y) {
    if (
      ((Ft = gn()), (qe = Vn()), (y = y === void 0 ? null : y), qe !== null)
    ) {
      var k = qe.memoizedState;
      if (k !== null && y !== null) {
        var E = k[1];
        e: if (E === null) E = !1;
        else {
          for (var U = 0; U < E.length && U < y.length; U++)
            if (!Vo(y[U], E[U])) {
              E = !1;
              break e;
            }
          E = !0;
        }
        if (E) return k[0];
      }
    }
    return ((f = f()), (qe.memoizedState = [f, y]), f);
  }
  function lo(f, y, k) {
    if (25 <= jr) throw Error(r(301));
    if (f === Ft)
      if (
        ((Or = !0),
        (f = { action: k, next: null }),
        mn === null && (mn = new Map()),
        (k = mn.get(y)),
        k === void 0)
      )
        mn.set(y, f);
      else {
        for (y = k; y.next !== null; ) y = y.next;
        y.next = f;
      }
  }
  function so() {
    throw Error(r(394));
  }
  function dr() {}
  var Li = {
      readContext: function (f) {
        return f._currentValue2;
      },
      useContext: function (f) {
        return (gn(), f._currentValue2);
      },
      useMemo: fr,
      useReducer: Fi,
      useRef: function (f) {
        ((Ft = gn()), (qe = Vn()));
        var y = qe.memoizedState;
        return y === null ? ((f = { current: f }), (qe.memoizedState = f)) : y;
      },
      useState: function (f) {
        return Fi(cr, f);
      },
      useInsertionEffect: dr,
      useLayoutEffect: function () {},
      useCallback: function (f, y) {
        return fr(function () {
          return f;
        }, y);
      },
      useImperativeHandle: dr,
      useEffect: dr,
      useDebugValue: dr,
      useDeferredValue: function (f) {
        return (gn(), f);
      },
      useTransition: function () {
        return (gn(), [!1, so]);
      },
      useId: function () {
        var f = Dr.treeContext,
          y = f.overflow;
        ((f = f.id), (f = (f & ~(1 << (32 - zr(f) - 1))).toString(32) + y));
        var k = uo;
        if (k === null) throw Error(r(404));
        return (
          (y = ar++),
          (f = ":" + k.idPrefix + "R" + f),
          0 < y && (f += "H" + y.toString(32)),
          f + ":"
        );
      },
      useMutableSource: function (f, y) {
        return (gn(), y(f._source));
      },
      useSyncExternalStore: function (f, y, k) {
        if (k === void 0) throw Error(r(407));
        return k();
      },
    },
    uo = null,
    Wo =
      t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher;
  function Hn(f) {
    return (console.error(f), null);
  }
  function hr() {}
  function zi(f, y, k, E, U, O, Q, se, he) {
    var Fe = [],
      Ae = new Set();
    return (
      (y = {
        destination: null,
        responseState: y,
        progressiveChunkSize: E === void 0 ? 12800 : E,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: Ae,
        pingedTasks: Fe,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: U === void 0 ? Hn : U,
        onAllReady: hr,
        onShellReady: Q === void 0 ? hr : Q,
        onShellError: hr,
        onFatalError: hr,
      }),
      (k = Ur(y, 0, null, k, !1, !1)),
      (k.parentFlushed = !0),
      (f = Qo(y, f, null, k, Ae, Tn, null, Lr)),
      Fe.push(f),
      y
    );
  }
  function Qo(f, y, k, E, U, O, Q, se) {
    (f.allPendingTasks++, k === null ? f.pendingRootTasks++ : k.pendingTasks++);
    var he = {
      node: y,
      ping: function () {
        var Fe = f.pingedTasks;
        (Fe.push(he), Fe.length === 1 && Ht(f));
      },
      blockedBoundary: k,
      blockedSegment: E,
      abortSet: U,
      legacyContext: O,
      context: Q,
      treeContext: se,
    };
    return (U.add(he), he);
  }
  function Ur(f, y, k, E, U, O) {
    return {
      status: 0,
      id: -1,
      index: y,
      parentFlushed: !1,
      chunks: [],
      children: [],
      formatContext: E,
      boundary: k,
      lastPushedText: U,
      textEmbedded: O,
    };
  }
  function pr(f, y) {
    if (((f = f.onError(y)), f != null && typeof f != "string"))
      throw Error(
        'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
          typeof f +
          '" instead',
      );
    return f;
  }
  function br(f, y) {
    var k = f.onShellError;
    (k(y),
      (k = f.onFatalError),
      k(y),
      f.destination !== null
        ? ((f.status = 2), f.destination.destroy(y))
        : ((f.status = 1), (f.fatalError = y)));
  }
  function Yo(f, y, k, E, U) {
    for (Ft = {}, Dr = y, ar = 0, f = k(E, U); Or; )
      ((Or = !1), (ar = 0), (jr += 1), (qe = null), (f = k(E, U)));
    return (Ar(), f);
  }
  function Di(f, y, k, E) {
    var U = k.render(),
      O = E.childContextTypes;
    if (O != null) {
      var Q = y.legacyContext;
      if (typeof k.getChildContext != "function") E = Q;
      else {
        k = k.getChildContext();
        for (var se in k)
          if (!(se in O)) throw Error(r(108, Un(E) || "Unknown", se));
        E = F({}, Q, k);
      }
      ((y.legacyContext = E), Mt(f, y, U), (y.legacyContext = Q));
    } else Mt(f, y, U);
  }
  function Oi(f, y) {
    if (f && f.defaultProps) {
      ((y = F({}, y)), (f = f.defaultProps));
      for (var k in f) y[k] === void 0 && (y[k] = f[k]);
      return y;
    }
    return y;
  }
  function ot(f, y, k, E, U) {
    if (typeof k == "function")
      if (k.prototype && k.prototype.isReactComponent) {
        U = bn(k, y.legacyContext);
        var O = k.contextType;
        ((O = new k(
          E,
          typeof O == "object" && O !== null ? O._currentValue2 : U,
        )),
          sr(O, k, E, U),
          Di(f, y, O, k));
      } else {
        ((O = bn(k, y.legacyContext)), (U = Yo(f, y, k, E, O)));
        var Q = ar !== 0;
        if (
          typeof U == "object" &&
          U !== null &&
          typeof U.render == "function" &&
          U.$$typeof === void 0
        )
          (sr(U, k, E, O), Di(f, y, U, k));
        else if (Q) {
          ((E = y.treeContext), (y.treeContext = Uo(E, 1, 0)));
          try {
            Mt(f, y, U);
          } finally {
            y.treeContext = E;
          }
        } else Mt(f, y, U);
      }
    else if (typeof k == "string") {
      switch (
        ((U = y.blockedSegment),
        (O = ie(U.chunks, k, E, f.responseState, U.formatContext)),
        (U.lastPushedText = !1),
        (Q = U.formatContext),
        (U.formatContext = H(Q, k, E)),
        co(f, y, O),
        (U.formatContext = Q),
        k)
      ) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          U.chunks.push("</", k, ">");
      }
      U.lastPushedText = !1;
    } else {
      switch (k) {
        case dt:
        case gt:
        case ze:
        case Ue:
        case Le:
          Mt(f, y, E.children);
          return;
        case $e:
          Mt(f, y, E.children);
          return;
        case He:
          throw Error(r(343));
        case ve:
          e: {
            ((k = y.blockedBoundary),
              (U = y.blockedSegment),
              (O = E.fallback),
              (E = E.children),
              (Q = new Set()));
            var se = {
                id: null,
                rootSegmentID: -1,
                parentFlushed: !1,
                pendingTasks: 0,
                forceClientRender: !1,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks: Q,
                errorDigest: null,
              },
              he = Ur(f, U.chunks.length, se, U.formatContext, !1, !1);
            (U.children.push(he), (U.lastPushedText = !1));
            var Fe = Ur(f, 0, null, U.formatContext, !1, !1);
            ((Fe.parentFlushed = !0),
              (y.blockedBoundary = se),
              (y.blockedSegment = Fe));
            try {
              if (
                (co(f, y, E),
                f.responseState.generateStaticMarkup ||
                  (Fe.lastPushedText &&
                    Fe.textEmbedded &&
                    Fe.chunks.push("<!-- -->")),
                (Fe.status = 1),
                Wn(se, Fe),
                se.pendingTasks === 0)
              )
                break e;
            } catch (Ae) {
              ((Fe.status = 4),
                (se.forceClientRender = !0),
                (se.errorDigest = pr(f, Ae)));
            } finally {
              ((y.blockedBoundary = k), (y.blockedSegment = U));
            }
            ((y = Qo(
              f,
              O,
              k,
              he,
              Q,
              y.legacyContext,
              y.context,
              y.treeContext,
            )),
              f.pingedTasks.push(y));
          }
          return;
      }
      if (typeof k == "object" && k !== null)
        switch (k.$$typeof) {
          case K:
            if (((E = Yo(f, y, k.render, E, U)), ar !== 0)) {
              ((k = y.treeContext), (y.treeContext = Uo(k, 1, 0)));
              try {
                Mt(f, y, E);
              } finally {
                y.treeContext = k;
              }
            } else Mt(f, y, E);
            return;
          case ee:
            ((k = k.type), (E = Oi(k, E)), ot(f, y, k, E, U));
            return;
          case Qe:
            if (
              ((U = E.children),
              (k = k._context),
              (E = E.value),
              (O = k._currentValue2),
              (k._currentValue2 = E),
              (Q = qt),
              (qt = E =
                {
                  parent: Q,
                  depth: Q === null ? 0 : Q.depth + 1,
                  context: k,
                  parentValue: O,
                  value: E,
                }),
              (y.context = E),
              Mt(f, y, U),
              (f = qt),
              f === null)
            )
              throw Error(r(403));
            ((E = f.parentValue),
              (f.context._currentValue2 =
                E === Vt ? f.context._defaultValue : E),
              (f = qt = f.parent),
              (y.context = f));
            return;
          case Ve:
            ((E = E.children), (E = E(k._currentValue2)), Mt(f, y, E));
            return;
          case Ye:
            ((U = k._init),
              (k = U(k._payload)),
              (E = Oi(k, E)),
              ot(f, y, k, E, void 0));
            return;
        }
      throw Error(r(130, k == null ? k : typeof k, ""));
    }
  }
  function Mt(f, y, k) {
    if (((y.node = k), typeof k == "object" && k !== null)) {
      switch (k.$$typeof) {
        case X:
          ot(f, y, k.type, k.props, k.ref);
          return;
        case Re:
          throw Error(r(257));
        case Ye:
          var E = k._init;
          ((k = E(k._payload)), Mt(f, y, k));
          return;
      }
      if (D(k)) {
        ao(f, y, k);
        return;
      }
      if (
        (k === null || typeof k != "object"
          ? (E = null)
          : ((E = (Nn && k[Nn]) || k["@@iterator"]),
            (E = typeof E == "function" ? E : null)),
        E && (E = E.call(k)))
      ) {
        if (((k = E.next()), !k.done)) {
          var U = [];
          do (U.push(k.value), (k = E.next()));
          while (!k.done);
          ao(f, y, U);
        }
        return;
      }
      throw (
        (f = Object.prototype.toString.call(k)),
        Error(
          r(
            31,
            f === "[object Object]"
              ? "object with keys {" + Object.keys(k).join(", ") + "}"
              : f,
          ),
        )
      );
    }
    typeof k == "string"
      ? ((E = y.blockedSegment),
        (E.lastPushedText = de(
          y.blockedSegment.chunks,
          k,
          f.responseState,
          E.lastPushedText,
        )))
      : typeof k == "number" &&
        ((E = y.blockedSegment),
        (E.lastPushedText = de(
          y.blockedSegment.chunks,
          "" + k,
          f.responseState,
          E.lastPushedText,
        )));
  }
  function ao(f, y, k) {
    for (var E = k.length, U = 0; U < E; U++) {
      var O = y.treeContext;
      y.treeContext = Uo(O, E, U);
      try {
        co(f, y, k[U]);
      } finally {
        y.treeContext = O;
      }
    }
  }
  function co(f, y, k) {
    var E = y.blockedSegment.formatContext,
      U = y.legacyContext,
      O = y.context;
    try {
      return Mt(f, y, k);
    } catch (he) {
      if (
        (Ar(),
        typeof he == "object" && he !== null && typeof he.then == "function")
      ) {
        k = he;
        var Q = y.blockedSegment,
          se = Ur(
            f,
            Q.chunks.length,
            null,
            Q.formatContext,
            Q.lastPushedText,
            !0,
          );
        (Q.children.push(se),
          (Q.lastPushedText = !1),
          (f = Qo(
            f,
            y.node,
            y.blockedBoundary,
            se,
            y.abortSet,
            y.legacyContext,
            y.context,
            y.treeContext,
          ).ping),
          k.then(f, f),
          (y.blockedSegment.formatContext = E),
          (y.legacyContext = U),
          (y.context = O),
          Bn(O));
      } else
        throw (
          (y.blockedSegment.formatContext = E),
          (y.legacyContext = U),
          (y.context = O),
          Bn(O),
          he
        );
    }
  }
  function mr(f) {
    var y = f.blockedBoundary;
    ((f = f.blockedSegment), (f.status = 3), yn(this, y, f));
  }
  function ji(f, y, k) {
    var E = f.blockedBoundary;
    ((f.blockedSegment.status = 3),
      E === null
        ? (y.allPendingTasks--,
          y.status !== 2 &&
            ((y.status = 2),
            y.destination !== null && y.destination.push(null)))
        : (E.pendingTasks--,
          E.forceClientRender ||
            ((E.forceClientRender = !0),
            (f = k === void 0 ? Error(r(432)) : k),
            (E.errorDigest = y.onError(f)),
            E.parentFlushed && y.clientRenderedBoundaries.push(E)),
          E.fallbackAbortableTasks.forEach(function (U) {
            return ji(U, y, k);
          }),
          E.fallbackAbortableTasks.clear(),
          y.allPendingTasks--,
          y.allPendingTasks === 0 && ((E = y.onAllReady), E())));
  }
  function Wn(f, y) {
    if (
      y.chunks.length === 0 &&
      y.children.length === 1 &&
      y.children[0].boundary === null
    ) {
      var k = y.children[0];
      ((k.id = y.id), (k.parentFlushed = !0), k.status === 1 && Wn(f, k));
    } else f.completedSegments.push(y);
  }
  function yn(f, y, k) {
    if (y === null) {
      if (k.parentFlushed) {
        if (f.completedRootSegment !== null) throw Error(r(389));
        f.completedRootSegment = k;
      }
      (f.pendingRootTasks--,
        f.pendingRootTasks === 0 &&
          ((f.onShellError = hr), (y = f.onShellReady), y()));
    } else
      (y.pendingTasks--,
        y.forceClientRender ||
          (y.pendingTasks === 0
            ? (k.parentFlushed && k.status === 1 && Wn(y, k),
              y.parentFlushed && f.completedBoundaries.push(y),
              y.fallbackAbortableTasks.forEach(mr, f),
              y.fallbackAbortableTasks.clear())
            : k.parentFlushed &&
              k.status === 1 &&
              (Wn(y, k),
              y.completedSegments.length === 1 &&
                y.parentFlushed &&
                f.partialBoundaries.push(y))));
    (f.allPendingTasks--, f.allPendingTasks === 0 && ((f = f.onAllReady), f()));
  }
  function Ht(f) {
    if (f.status !== 2) {
      var y = qt,
        k = Wo.current;
      Wo.current = Li;
      var E = uo;
      uo = f.responseState;
      try {
        var U = f.pingedTasks,
          O;
        for (O = 0; O < U.length; O++) {
          var Q = U[O],
            se = f,
            he = Q.blockedSegment;
          if (he.status === 0) {
            Bn(Q.context);
            try {
              (Mt(se, Q, Q.node),
                se.responseState.generateStaticMarkup ||
                  (he.lastPushedText &&
                    he.textEmbedded &&
                    he.chunks.push("<!-- -->")),
                Q.abortSet.delete(Q),
                (he.status = 1),
                yn(se, Q.blockedBoundary, he));
            } catch (Lt) {
              if (
                (Ar(),
                typeof Lt == "object" &&
                  Lt !== null &&
                  typeof Lt.then == "function")
              ) {
                var Fe = Q.ping;
                Lt.then(Fe, Fe);
              } else {
                (Q.abortSet.delete(Q), (he.status = 4));
                var Ae = Q.blockedBoundary,
                  tt = Lt,
                  Xt = pr(se, tt);
                if (
                  (Ae === null
                    ? br(se, tt)
                    : (Ae.pendingTasks--,
                      Ae.forceClientRender ||
                        ((Ae.forceClientRender = !0),
                        (Ae.errorDigest = Xt),
                        Ae.parentFlushed &&
                          se.clientRenderedBoundaries.push(Ae))),
                  se.allPendingTasks--,
                  se.allPendingTasks === 0)
                ) {
                  var Kt = se.onAllReady;
                  Kt();
                }
              }
            } finally {
            }
          }
        }
        (U.splice(0, O), f.destination !== null && Qn(f, f.destination));
      } catch (Lt) {
        (pr(f, Lt), br(f, Lt));
      } finally {
        ((uo = E), (Wo.current = k), k === Li && Bn(y));
      }
    }
  }
  function Br(f, y, k) {
    switch (((k.parentFlushed = !0), k.status)) {
      case 0:
        var E = (k.id = f.nextSegmentId++);
        return (
          (k.lastPushedText = !1),
          (k.textEmbedded = !1),
          (f = f.responseState),
          y.push('<template id="'),
          y.push(f.placeholderPrefix),
          (f = E.toString(16)),
          y.push(f),
          y.push('"></template>')
        );
      case 1:
        k.status = 2;
        var U = !0;
        E = k.chunks;
        var O = 0;
        k = k.children;
        for (var Q = 0; Q < k.length; Q++) {
          for (U = k[Q]; O < U.index; O++) y.push(E[O]);
          U = wt(f, y, U);
        }
        for (; O < E.length - 1; O++) y.push(E[O]);
        return (O < E.length && (U = y.push(E[O])), U);
      default:
        throw Error(r(390));
    }
  }
  function wt(f, y, k) {
    var E = k.boundary;
    if (E === null) return Br(f, y, k);
    if (((E.parentFlushed = !0), E.forceClientRender))
      return (
        f.responseState.generateStaticMarkup ||
          ((E = E.errorDigest),
          y.push("<!--$!-->"),
          y.push("<template"),
          E && (y.push(' data-dgst="'), (E = $(E)), y.push(E), y.push('"')),
          y.push("></template>")),
        Br(f, y, k),
        (f = f.responseState.generateStaticMarkup ? !0 : y.push("<!--/$-->")),
        f
      );
    if (0 < E.pendingTasks) {
      ((E.rootSegmentID = f.nextSegmentId++),
        0 < E.completedSegments.length && f.partialBoundaries.push(E));
      var U = f.responseState,
        O = U.nextSuspenseID++;
      return (
        (U = U.boundaryPrefix + O.toString(16)),
        (E = E.id = U),
        ke(y, f.responseState, E),
        Br(f, y, k),
        y.push("<!--/$-->")
      );
    }
    if (E.byteSize > f.progressiveChunkSize)
      return (
        (E.rootSegmentID = f.nextSegmentId++),
        f.completedBoundaries.push(E),
        ke(y, f.responseState, E.id),
        Br(f, y, k),
        y.push("<!--/$-->")
      );
    if (
      (f.responseState.generateStaticMarkup || y.push("<!--$-->"),
      (k = E.completedSegments),
      k.length !== 1)
    )
      throw Error(r(391));
    return (
      wt(f, y, k[0]),
      (f = f.responseState.generateStaticMarkup ? !0 : y.push("<!--/$-->")),
      f
    );
  }
  function qo(f, y, k) {
    return (
      Ze(y, f.responseState, k.formatContext, k.id),
      wt(f, y, k),
      je(y, k.formatContext)
    );
  }
  function Xo(f, y, k) {
    for (var E = k.completedSegments, U = 0; U < E.length; U++)
      Ko(f, y, k, E[U]);
    if (
      ((E.length = 0),
      (f = f.responseState),
      (E = k.id),
      (k = k.rootSegmentID),
      y.push(f.startInlineScript),
      f.sentCompleteBoundaryFunction
        ? y.push('$RC("')
        : ((f.sentCompleteBoundaryFunction = !0),
          y.push(
            'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("',
          )),
      E === null)
    )
      throw Error(r(395));
    return (
      (k = k.toString(16)),
      y.push(E),
      y.push('","'),
      y.push(f.segmentPrefix),
      y.push(k),
      y.push('")<\/script>')
    );
  }
  function Ko(f, y, k, E) {
    if (E.status === 2) return !0;
    var U = E.id;
    if (U === -1) {
      if ((E.id = k.rootSegmentID) === -1) throw Error(r(392));
      return qo(f, y, E);
    }
    return (
      qo(f, y, E),
      (f = f.responseState),
      y.push(f.startInlineScript),
      f.sentCompleteSegmentFunction
        ? y.push('$RS("')
        : ((f.sentCompleteSegmentFunction = !0),
          y.push(
            'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("',
          )),
      y.push(f.segmentPrefix),
      (U = U.toString(16)),
      y.push(U),
      y.push('","'),
      y.push(f.placeholderPrefix),
      y.push(U),
      y.push('")<\/script>')
    );
  }
  function Qn(f, y) {
    try {
      var k = f.completedRootSegment;
      if (k !== null && f.pendingRootTasks === 0) {
        (wt(f, y, k), (f.completedRootSegment = null));
        var E = f.responseState.bootstrapChunks;
        for (k = 0; k < E.length - 1; k++) y.push(E[k]);
        k < E.length && y.push(E[k]);
      }
      var U = f.clientRenderedBoundaries,
        O;
      for (O = 0; O < U.length; O++) {
        var Q = U[O];
        E = y;
        var se = f.responseState,
          he = Q.id,
          Fe = Q.errorDigest,
          Ae = Q.errorMessage,
          tt = Q.errorComponentStack;
        if (
          (E.push(se.startInlineScript),
          se.sentClientRenderFunction
            ? E.push('$RX("')
            : ((se.sentClientRenderFunction = !0),
              E.push(
                'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("',
              )),
          he === null)
        )
          throw Error(r(395));
        if ((E.push(he), E.push('"'), Fe || Ae || tt)) {
          E.push(",");
          var Xt = G(Fe || "");
          E.push(Xt);
        }
        if (Ae || tt) {
          E.push(",");
          var Kt = G(Ae || "");
          E.push(Kt);
        }
        if (tt) {
          E.push(",");
          var Lt = G(tt);
          E.push(Lt);
        }
        if (!E.push(")<\/script>")) {
          ((f.destination = null), O++, U.splice(0, O));
          return;
        }
      }
      U.splice(0, O);
      var Yn = f.completedBoundaries;
      for (O = 0; O < Yn.length; O++)
        if (!Xo(f, y, Yn[O])) {
          ((f.destination = null), O++, Yn.splice(0, O));
          return;
        }
      Yn.splice(0, O);
      var Zt = f.partialBoundaries;
      for (O = 0; O < Zt.length; O++) {
        var Gt = Zt[O];
        e: {
          ((U = f), (Q = y));
          var zt = Gt.completedSegments;
          for (se = 0; se < zt.length; se++)
            if (!Ko(U, Q, Gt, zt[se])) {
              (se++, zt.splice(0, se));
              var vn = !1;
              break e;
            }
          (zt.splice(0, se), (vn = !0));
        }
        if (!vn) {
          ((f.destination = null), O++, Zt.splice(0, O));
          return;
        }
      }
      Zt.splice(0, O);
      var Jt = f.completedBoundaries;
      for (O = 0; O < Jt.length; O++)
        if (!Xo(f, y, Jt[O])) {
          ((f.destination = null), O++, Jt.splice(0, O));
          return;
        }
      Jt.splice(0, O);
    } finally {
      f.allPendingTasks === 0 &&
        f.pingedTasks.length === 0 &&
        f.clientRenderedBoundaries.length === 0 &&
        f.completedBoundaries.length === 0 &&
        y.push(null);
    }
  }
  function Vr(f, y) {
    try {
      var k = f.abortableTasks;
      (k.forEach(function (E) {
        return ji(E, f, y);
      }),
        k.clear(),
        f.destination !== null && Qn(f, f.destination));
    } catch (E) {
      (pr(f, E), br(f, E));
    }
  }
  function gr() {}
  function yr(f, y, k, E) {
    var U = !1,
      O = null,
      Q = "",
      se = {
        push: function (Fe) {
          return (Fe !== null && (Q += Fe), !0);
        },
        destroy: function (Fe) {
          ((U = !0), (O = Fe));
        },
      },
      he = !1;
    if (
      ((f = zi(
        f,
        ce(k, y ? y.identifierPrefix : void 0),
        { insertionMode: 1, selectedValue: null },
        1 / 0,
        gr,
        void 0,
        function () {
          he = !0;
        },
      )),
      Ht(f),
      Vr(f, E),
      f.status === 1)
    )
      ((f.status = 2), se.destroy(f.fatalError));
    else if (f.status !== 2 && f.destination === null) {
      f.destination = se;
      try {
        Qn(f, se);
      } catch (Fe) {
        (pr(f, Fe), br(f, Fe));
      }
    }
    if (U) throw O;
    if (!he) throw Error(r(426));
    return Q;
  }
  return (
    (vi.renderToNodeStream = function () {
      throw Error(r(207));
    }),
    (vi.renderToStaticMarkup = function (f, y) {
      return yr(
        f,
        y,
        !0,
        'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
      );
    }),
    (vi.renderToStaticNodeStream = function () {
      throw Error(r(208));
    }),
    (vi.renderToString = function (f, y) {
      return yr(
        f,
        y,
        !1,
        'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
      );
    }),
    (vi.version = "18.3.1"),
    vi
  );
}
var ua = {};
var gg;
function Ak() {
  if (gg) return ua;
  gg = 1;
  var t = Hs();
  function r(d) {
    for (
      var g = "https://reactjs.org/docs/error-decoder.html?invariant=" + d,
        S = 1;
      S < arguments.length;
      S++
    )
      g += "&args[]=" + encodeURIComponent(arguments[S]);
    return (
      "Minified React error #" +
      d +
      "; visit " +
      g +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var o = null,
    l = 0;
  function u(d, g) {
    if (g.length !== 0)
      if (512 < g.length)
        (0 < l &&
          (d.enqueue(new Uint8Array(o.buffer, 0, l)),
          (o = new Uint8Array(512)),
          (l = 0)),
          d.enqueue(g));
      else {
        var S = o.length - l;
        (S < g.length &&
          (S === 0
            ? d.enqueue(o)
            : (o.set(g.subarray(0, S), l), d.enqueue(o), (g = g.subarray(S))),
          (o = new Uint8Array(512)),
          (l = 0)),
          o.set(g, l),
          (l += g.length));
      }
  }
  function c(d, g) {
    return (u(d, g), !0);
  }
  function p(d) {
    o &&
      0 < l &&
      (d.enqueue(new Uint8Array(o.buffer, 0, l)), (o = null), (l = 0));
  }
  var m = new TextEncoder();
  function w(d) {
    return m.encode(d);
  }
  function v(d) {
    return m.encode(d);
  }
  function _(d, g) {
    typeof d.error == "function" ? d.error(g) : d.close();
  }
  var T = Object.prototype.hasOwnProperty,
    M =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    P = {},
    $ = {};
  function L(d) {
    return T.call($, d)
      ? !0
      : T.call(P, d)
        ? !1
        : M.test(d)
          ? ($[d] = !0)
          : ((P[d] = !0), !1);
  }
  function z(d, g, S, C, B, A, q) {
    ((this.acceptsBooleans = g === 2 || g === 3 || g === 4),
      (this.attributeName = C),
      (this.attributeNamespace = B),
      (this.mustUseProperty = S),
      (this.propertyName = d),
      (this.type = g),
      (this.sanitizeURL = A),
      (this.removeEmptyString = q));
  }
  var D = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (d) {
      D[d] = new z(d, 0, !1, d, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (d) {
      var g = d[0];
      D[g] = new z(g, 1, !1, d[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (d) {
        D[d] = new z(d, 2, !1, d.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (d) {
      D[d] = new z(d, 2, !1, d, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (d) {
        D[d] = new z(d, 3, !1, d.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (d) {
      D[d] = new z(d, 3, !0, d, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (d) {
      D[d] = new z(d, 4, !1, d, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (d) {
      D[d] = new z(d, 6, !1, d, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (d) {
      D[d] = new z(d, 5, !1, d.toLowerCase(), null, !1, !1);
    }));
  var W = /[\-:]([a-z])/g;
  function H(d) {
    return d[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (d) {
      var g = d.replace(W, H);
      D[g] = new z(g, 1, !1, d, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (d) {
        var g = d.replace(W, H);
        D[g] = new z(g, 1, !1, d, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (d) {
      var g = d.replace(W, H);
      D[g] = new z(g, 1, !1, d, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (d) {
      D[d] = new z(d, 1, !1, d.toLowerCase(), null, !1, !1);
    }),
    (D.xlinkHref = new z(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (d) {
      D[d] = new z(d, 1, !1, d.toLowerCase(), null, !0, !0);
    }));
  var Y = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    oe = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Y).forEach(function (d) {
    oe.forEach(function (g) {
      ((g = g + d.charAt(0).toUpperCase() + d.substring(1)), (Y[g] = Y[d]));
    });
  });
  var fe = /["'&<>]/;
  function ae(d) {
    if (typeof d == "boolean" || typeof d == "number") return "" + d;
    d = "" + d;
    var g = fe.exec(d);
    if (g) {
      var S = "",
        C,
        B = 0;
      for (C = g.index; C < d.length; C++) {
        switch (d.charCodeAt(C)) {
          case 34:
            g = "&quot;";
            break;
          case 38:
            g = "&amp;";
            break;
          case 39:
            g = "&#x27;";
            break;
          case 60:
            g = "&lt;";
            break;
          case 62:
            g = "&gt;";
            break;
          default:
            continue;
        }
        (B !== C && (S += d.substring(B, C)), (B = C + 1), (S += g));
      }
      d = B !== C ? S + d.substring(B, C) : S;
    }
    return d;
  }
  var _e = /([A-Z])/g,
    Ee = /^ms-/,
    xe = Array.isArray,
    te = v("<script>"),
    Se = v("<\/script>"),
    ie = v('<script src="'),
    ke = v('<script type="module" src="'),
    Ze = v('" async=""><\/script>'),
    je = /(<\/|<)(s)(cript)/gi;
  function Ne(d, g, S, C) {
    return "" + g + (S === "s" ? "\\u0073" : "\\u0053") + C;
  }
  function G(d, g, S, C, B) {
    ((d = d === void 0 ? "" : d),
      (g = g === void 0 ? te : v('<script nonce="' + ae(g) + '">')));
    var A = [];
    if (
      (S !== void 0 && A.push(g, w(("" + S).replace(je, Ne)), Se), C !== void 0)
    )
      for (S = 0; S < C.length; S++) A.push(ie, w(ae(C[S])), Ze);
    if (B !== void 0)
      for (C = 0; C < B.length; C++) A.push(ke, w(ae(B[C])), Ze);
    return {
      bootstrapChunks: A,
      startInlineScript: g,
      placeholderPrefix: v(d + "P:"),
      segmentPrefix: v(d + "S:"),
      boundaryPrefix: d + "B:",
      idPrefix: d,
      nextSuspenseID: 0,
      sentCompleteSegmentFunction: !1,
      sentCompleteBoundaryFunction: !1,
      sentClientRenderFunction: !1,
    };
  }
  function ce(d, g) {
    return { insertionMode: d, selectedValue: g };
  }
  function de(d) {
    return ce(
      d === "http://www.w3.org/2000/svg"
        ? 2
        : d === "http://www.w3.org/1998/Math/MathML"
          ? 3
          : 0,
      null,
    );
  }
  function F(d, g, S) {
    switch (g) {
      case "select":
        return ce(1, S.value != null ? S.value : S.defaultValue);
      case "svg":
        return ce(2, null);
      case "math":
        return ce(3, null);
      case "foreignObject":
        return ce(1, null);
      case "table":
        return ce(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return ce(5, null);
      case "colgroup":
        return ce(7, null);
      case "tr":
        return ce(6, null);
    }
    return 4 <= d.insertionMode || d.insertionMode === 0 ? ce(1, null) : d;
  }
  var X = v("<!-- -->");
  function Re(d, g, S, C) {
    return g === "" ? C : (C && d.push(X), d.push(w(ae(g))), !0);
  }
  var Le = new Map(),
    ze = v(' style="'),
    Ue = v(":"),
    Qe = v(";");
  function Ve(d, g, S) {
    if (typeof S != "object") throw Error(r(62));
    g = !0;
    for (var C in S)
      if (T.call(S, C)) {
        var B = S[C];
        if (B != null && typeof B != "boolean" && B !== "") {
          if (C.indexOf("--") === 0) {
            var A = w(ae(C));
            B = w(ae(("" + B).trim()));
          } else {
            A = C;
            var q = Le.get(A);
            (q !== void 0 ||
              ((q = v(
                ae(A.replace(_e, "-$1").toLowerCase().replace(Ee, "-ms-")),
              )),
              Le.set(A, q)),
              (A = q),
              (B =
                typeof B == "number"
                  ? B === 0 || T.call(Y, C)
                    ? w("" + B)
                    : w(B + "px")
                  : w(ae(("" + B).trim()))));
          }
          g ? ((g = !1), d.push(ze, A, Ue, B)) : d.push(Qe, A, Ue, B);
        }
      }
    g || d.push($e);
  }
  var K = v(" "),
    ve = v('="'),
    $e = v('"'),
    ee = v('=""');
  function Ye(d, g, S, C) {
    switch (S) {
      case "style":
        Ve(d, g, C);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (
      !(2 < S.length) ||
      (S[0] !== "o" && S[0] !== "O") ||
      (S[1] !== "n" && S[1] !== "N")
    ) {
      if (((g = D.hasOwnProperty(S) ? D[S] : null), g !== null)) {
        switch (typeof C) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!g.acceptsBooleans) return;
        }
        switch (((S = w(g.attributeName)), g.type)) {
          case 3:
            C && d.push(K, S, ee);
            break;
          case 4:
            C === !0
              ? d.push(K, S, ee)
              : C !== !1 && d.push(K, S, ve, w(ae(C)), $e);
            break;
          case 5:
            isNaN(C) || d.push(K, S, ve, w(ae(C)), $e);
            break;
          case 6:
            !isNaN(C) && 1 <= C && d.push(K, S, ve, w(ae(C)), $e);
            break;
          default:
            (g.sanitizeURL && (C = "" + C), d.push(K, S, ve, w(ae(C)), $e));
        }
      } else if (L(S)) {
        switch (typeof C) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (
              ((g = S.toLowerCase().slice(0, 5)),
              g !== "data-" && g !== "aria-")
            )
              return;
        }
        d.push(K, w(S), ve, w(ae(C)), $e);
      }
    }
  }
  var He = v(">"),
    gt = v("/>");
  function dt(d, g, S) {
    if (g != null) {
      if (S != null) throw Error(r(60));
      if (typeof g != "object" || !("__html" in g)) throw Error(r(61));
      ((g = g.__html), g != null && d.push(w("" + g)));
    }
  }
  function Vt(d) {
    var g = "";
    return (
      t.Children.forEach(d, function (S) {
        S != null && (g += S);
      }),
      g
    );
  }
  var Nn = v(' selected=""');
  function Un(d, g, S, C) {
    d.push(_t(S));
    var B = (S = null),
      A;
    for (A in g)
      if (T.call(g, A)) {
        var q = g[A];
        if (q != null)
          switch (A) {
            case "children":
              S = q;
              break;
            case "dangerouslySetInnerHTML":
              B = q;
              break;
            default:
              Ye(d, C, A, q);
          }
      }
    return (
      d.push(He),
      dt(d, B, S),
      typeof S == "string" ? (d.push(w(ae(S))), null) : S
    );
  }
  var Tn = v(`
`),
    bn = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    qt = new Map();
  function _t(d) {
    var g = qt.get(d);
    if (g === void 0) {
      if (!bn.test(d)) throw Error(r(65, d));
      ((g = v("<" + d)), qt.set(d, g));
    }
    return g;
  }
  var Do = v("<!DOCTYPE html>");
  function Oo(d, g, S, C, B) {
    switch (g) {
      case "select":
        d.push(_t("select"));
        var A = null,
          q = null;
        for (De in S)
          if (T.call(S, De)) {
            var re = S[De];
            if (re != null)
              switch (De) {
                case "children":
                  A = re;
                  break;
                case "dangerouslySetInnerHTML":
                  q = re;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  Ye(d, C, De, re);
              }
          }
        return (d.push(He), dt(d, q, A), A);
      case "option":
        ((q = B.selectedValue), d.push(_t("option")));
        var Ie = (re = null),
          be = null,
          De = null;
        for (A in S)
          if (T.call(S, A)) {
            var it = S[A];
            if (it != null)
              switch (A) {
                case "children":
                  re = it;
                  break;
                case "selected":
                  be = it;
                  break;
                case "dangerouslySetInnerHTML":
                  De = it;
                  break;
                case "value":
                  Ie = it;
                default:
                  Ye(d, C, A, it);
              }
          }
        if (q != null)
          if (((S = Ie !== null ? "" + Ie : Vt(re)), xe(q))) {
            for (C = 0; C < q.length; C++)
              if ("" + q[C] === S) {
                d.push(Nn);
                break;
              }
          } else "" + q === S && d.push(Nn);
        else be && d.push(Nn);
        return (d.push(He), dt(d, De, re), re);
      case "textarea":
        (d.push(_t("textarea")), (De = q = A = null));
        for (re in S)
          if (T.call(S, re) && ((Ie = S[re]), Ie != null))
            switch (re) {
              case "children":
                De = Ie;
                break;
              case "value":
                A = Ie;
                break;
              case "defaultValue":
                q = Ie;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(r(91));
              default:
                Ye(d, C, re, Ie);
            }
        if ((A === null && q !== null && (A = q), d.push(He), De != null)) {
          if (A != null) throw Error(r(92));
          if (xe(De) && 1 < De.length) throw Error(r(93));
          A = "" + De;
        }
        return (
          typeof A == "string" &&
            A[0] ===
              `
` &&
            d.push(Tn),
          A !== null && d.push(w(ae("" + A))),
          null
        );
      case "input":
        (d.push(_t("input")), (Ie = De = re = A = null));
        for (q in S)
          if (T.call(S, q) && ((be = S[q]), be != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(399, "input"));
              case "defaultChecked":
                Ie = be;
                break;
              case "defaultValue":
                re = be;
                break;
              case "checked":
                De = be;
                break;
              case "value":
                A = be;
                break;
              default:
                Ye(d, C, q, be);
            }
        return (
          De !== null
            ? Ye(d, C, "checked", De)
            : Ie !== null && Ye(d, C, "checked", Ie),
          A !== null
            ? Ye(d, C, "value", A)
            : re !== null && Ye(d, C, "value", re),
          d.push(gt),
          null
        );
      case "menuitem":
        d.push(_t("menuitem"));
        for (var Dt in S)
          if (T.call(S, Dt) && ((A = S[Dt]), A != null))
            switch (Dt) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(400));
              default:
                Ye(d, C, Dt, A);
            }
        return (d.push(He), null);
      case "title":
        (d.push(_t("title")), (A = null));
        for (it in S)
          if (T.call(S, it) && ((q = S[it]), q != null))
            switch (it) {
              case "children":
                A = q;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(r(434));
              default:
                Ye(d, C, it, q);
            }
        return (d.push(He), A);
      case "listing":
      case "pre":
        (d.push(_t(g)), (q = A = null));
        for (Ie in S)
          if (T.call(S, Ie) && ((re = S[Ie]), re != null))
            switch (Ie) {
              case "children":
                A = re;
                break;
              case "dangerouslySetInnerHTML":
                q = re;
                break;
              default:
                Ye(d, C, Ie, re);
            }
        if ((d.push(He), q != null)) {
          if (A != null) throw Error(r(60));
          if (typeof q != "object" || !("__html" in q)) throw Error(r(61));
          ((S = q.__html),
            S != null &&
              (typeof S == "string" &&
              0 < S.length &&
              S[0] ===
                `
`
                ? d.push(Tn, w(S))
                : d.push(w("" + S))));
        }
        return (
          typeof A == "string" &&
            A[0] ===
              `
` &&
            d.push(Tn),
          A
        );
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        d.push(_t(g));
        for (var en in S)
          if (T.call(S, en) && ((A = S[en]), A != null))
            switch (en) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(399, g));
              default:
                Ye(d, C, en, A);
            }
        return (d.push(gt), null);
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return Un(d, S, g, C);
      case "html":
        return (B.insertionMode === 0 && d.push(Do), Un(d, S, g, C));
      default:
        if (g.indexOf("-") === -1 && typeof S.is != "string")
          return Un(d, S, g, C);
        (d.push(_t(g)), (q = A = null));
        for (be in S)
          if (T.call(S, be) && ((re = S[be]), re != null))
            switch (be) {
              case "children":
                A = re;
                break;
              case "dangerouslySetInnerHTML":
                q = re;
                break;
              case "style":
                Ve(d, C, re);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                L(be) &&
                  typeof re != "function" &&
                  typeof re != "symbol" &&
                  d.push(K, w(be), ve, w(ae(re)), $e);
            }
        return (d.push(He), dt(d, q, A), A);
    }
  }
  var jo = v("</"),
    io = v(">"),
    Bn = v('<template id="'),
    Ao = v('"></template>'),
    sr = v("<!--$-->"),
    Lr = v('<!--$?--><template id="'),
    Uo = v('"></template>'),
    zr = v("<!--$!-->"),
    Ii = v("<!--/$-->"),
    Fl = v("<template"),
    bo = v('"'),
    Bo = v(' data-dgst="');
  (v(' data-msg="'), v(' data-stck="'));
  var Vo = v("></template>");
  function Ft(d, g, S) {
    if ((u(d, Lr), S === null)) throw Error(r(395));
    return (u(d, S), c(d, Uo));
  }
  var Dr = v('<div hidden id="'),
    pn = v('">'),
    qe = v("</div>"),
    ur = v('<svg aria-hidden="true" style="display:none" id="'),
    Or = v('">'),
    ar = v("</svg>"),
    mn = v('<math aria-hidden="true" style="display:none" id="'),
    jr = v('">'),
    gn = v("</math>"),
    Ho = v('<table hidden id="'),
    Vn = v('">'),
    Ar = v("</table>"),
    cr = v('<table hidden><tbody id="'),
    Fi = v('">'),
    fr = v("</tbody></table>"),
    lo = v('<table hidden><tr id="'),
    so = v('">'),
    dr = v("</tr></table>"),
    Li = v('<table hidden><colgroup id="'),
    uo = v('">'),
    Wo = v("</colgroup></table>");
  function Hn(d, g, S, C) {
    switch (S.insertionMode) {
      case 0:
      case 1:
        return (
          u(d, Dr),
          u(d, g.segmentPrefix),
          u(d, w(C.toString(16))),
          c(d, pn)
        );
      case 2:
        return (
          u(d, ur),
          u(d, g.segmentPrefix),
          u(d, w(C.toString(16))),
          c(d, Or)
        );
      case 3:
        return (
          u(d, mn),
          u(d, g.segmentPrefix),
          u(d, w(C.toString(16))),
          c(d, jr)
        );
      case 4:
        return (
          u(d, Ho),
          u(d, g.segmentPrefix),
          u(d, w(C.toString(16))),
          c(d, Vn)
        );
      case 5:
        return (
          u(d, cr),
          u(d, g.segmentPrefix),
          u(d, w(C.toString(16))),
          c(d, Fi)
        );
      case 6:
        return (
          u(d, lo),
          u(d, g.segmentPrefix),
          u(d, w(C.toString(16))),
          c(d, so)
        );
      case 7:
        return (
          u(d, Li),
          u(d, g.segmentPrefix),
          u(d, w(C.toString(16))),
          c(d, uo)
        );
      default:
        throw Error(r(397));
    }
  }
  function hr(d, g) {
    switch (g.insertionMode) {
      case 0:
      case 1:
        return c(d, qe);
      case 2:
        return c(d, ar);
      case 3:
        return c(d, gn);
      case 4:
        return c(d, Ar);
      case 5:
        return c(d, fr);
      case 6:
        return c(d, dr);
      case 7:
        return c(d, Wo);
      default:
        throw Error(r(397));
    }
  }
  var zi = v(
      'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("',
    ),
    Qo = v('$RS("'),
    Ur = v('","'),
    pr = v('")<\/script>'),
    br = v(
      'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("',
    ),
    Yo = v('$RC("'),
    Di = v('","'),
    Oi = v('")<\/script>'),
    ot = v(
      'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("',
    ),
    Mt = v('$RX("'),
    ao = v('"'),
    co = v(")<\/script>"),
    mr = v(","),
    ji = /[<\u2028\u2029]/g;
  function Wn(d) {
    return JSON.stringify(d).replace(ji, function (g) {
      switch (g) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React",
          );
      }
    });
  }
  var yn = Object.assign,
    Ht = Symbol.for("react.element"),
    Br = Symbol.for("react.portal"),
    wt = Symbol.for("react.fragment"),
    qo = Symbol.for("react.strict_mode"),
    Xo = Symbol.for("react.profiler"),
    Ko = Symbol.for("react.provider"),
    Qn = Symbol.for("react.context"),
    Vr = Symbol.for("react.forward_ref"),
    gr = Symbol.for("react.suspense"),
    yr = Symbol.for("react.suspense_list"),
    f = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    k = Symbol.for("react.scope"),
    E = Symbol.for("react.debug_trace_mode"),
    U = Symbol.for("react.legacy_hidden"),
    O = Symbol.for("react.default_value"),
    Q = Symbol.iterator;
  function se(d) {
    if (d == null) return null;
    if (typeof d == "function") return d.displayName || d.name || null;
    if (typeof d == "string") return d;
    switch (d) {
      case wt:
        return "Fragment";
      case Br:
        return "Portal";
      case Xo:
        return "Profiler";
      case qo:
        return "StrictMode";
      case gr:
        return "Suspense";
      case yr:
        return "SuspenseList";
    }
    if (typeof d == "object")
      switch (d.$$typeof) {
        case Qn:
          return (d.displayName || "Context") + ".Consumer";
        case Ko:
          return (d._context.displayName || "Context") + ".Provider";
        case Vr:
          var g = d.render;
          return (
            (d = d.displayName),
            d ||
              ((d = g.displayName || g.name || ""),
              (d = d !== "" ? "ForwardRef(" + d + ")" : "ForwardRef")),
            d
          );
        case f:
          return (
            (g = d.displayName || null),
            g !== null ? g : se(d.type) || "Memo"
          );
        case y:
          ((g = d._payload), (d = d._init));
          try {
            return se(d(g));
          } catch (S) {}
      }
    return null;
  }
  var he = {};
  function Fe(d, g) {
    if (((d = d.contextTypes), !d)) return he;
    var S = {},
      C;
    for (C in d) S[C] = g[C];
    return S;
  }
  var Ae = null;
  function tt(d, g) {
    if (d !== g) {
      ((d.context._currentValue = d.parentValue), (d = d.parent));
      var S = g.parent;
      if (d === null) {
        if (S !== null) throw Error(r(401));
      } else {
        if (S === null) throw Error(r(401));
        tt(d, S);
      }
      g.context._currentValue = g.value;
    }
  }
  function Xt(d) {
    ((d.context._currentValue = d.parentValue),
      (d = d.parent),
      d !== null && Xt(d));
  }
  function Kt(d) {
    var g = d.parent;
    (g !== null && Kt(g), (d.context._currentValue = d.value));
  }
  function Lt(d, g) {
    if (((d.context._currentValue = d.parentValue), (d = d.parent), d === null))
      throw Error(r(402));
    d.depth === g.depth ? tt(d, g) : Lt(d, g);
  }
  function Yn(d, g) {
    var S = g.parent;
    if (S === null) throw Error(r(402));
    (d.depth === S.depth ? tt(d, S) : Yn(d, S),
      (g.context._currentValue = g.value));
  }
  function Zt(d) {
    var g = Ae;
    g !== d &&
      (g === null
        ? Kt(d)
        : d === null
          ? Xt(g)
          : g.depth === d.depth
            ? tt(g, d)
            : g.depth > d.depth
              ? Lt(g, d)
              : Yn(g, d),
      (Ae = d));
  }
  var Gt = {
    isMounted: function () {
      return !1;
    },
    enqueueSetState: function (d, g) {
      ((d = d._reactInternals), d.queue !== null && d.queue.push(g));
    },
    enqueueReplaceState: function (d, g) {
      ((d = d._reactInternals), (d.replace = !0), (d.queue = [g]));
    },
    enqueueForceUpdate: function () {},
  };
  function zt(d, g, S, C) {
    var B = d.state !== void 0 ? d.state : null;
    ((d.updater = Gt), (d.props = S), (d.state = B));
    var A = { queue: [], replace: !1 };
    d._reactInternals = A;
    var q = g.contextType;
    if (
      ((d.context = typeof q == "object" && q !== null ? q._currentValue : C),
      (q = g.getDerivedStateFromProps),
      typeof q == "function" &&
        ((q = q(S, B)), (B = q == null ? B : yn({}, B, q)), (d.state = B)),
      typeof g.getDerivedStateFromProps != "function" &&
        typeof d.getSnapshotBeforeUpdate != "function" &&
        (typeof d.UNSAFE_componentWillMount == "function" ||
          typeof d.componentWillMount == "function"))
    )
      if (
        ((g = d.state),
        typeof d.componentWillMount == "function" && d.componentWillMount(),
        typeof d.UNSAFE_componentWillMount == "function" &&
          d.UNSAFE_componentWillMount(),
        g !== d.state && Gt.enqueueReplaceState(d, d.state, null),
        A.queue !== null && 0 < A.queue.length)
      )
        if (
          ((g = A.queue),
          (q = A.replace),
          (A.queue = null),
          (A.replace = !1),
          q && g.length === 1)
        )
          d.state = g[0];
        else {
          for (
            A = q ? g[0] : d.state, B = !0, q = q ? 1 : 0;
            q < g.length;
            q++
          ) {
            var re = g[q];
            ((re = typeof re == "function" ? re.call(d, A, S, C) : re),
              re != null && (B ? ((B = !1), (A = yn({}, A, re))) : yn(A, re)));
          }
          d.state = A;
        }
      else A.queue = null;
  }
  var vn = { id: 1, overflow: "" };
  function Jt(d, g, S) {
    var C = d.id;
    d = d.overflow;
    var B = 32 - vr(C) - 1;
    ((C &= ~(1 << B)), (S += 1));
    var A = 32 - vr(g) + B;
    if (30 < A) {
      var q = B - (B % 5);
      return (
        (A = (C & ((1 << q) - 1)).toString(32)),
        (C >>= q),
        (B -= q),
        { id: (1 << (32 - vr(g) + B)) | (S << B) | C, overflow: A + d }
      );
    }
    return { id: (1 << A) | (S << B) | C, overflow: d };
  }
  var vr = Math.clz32 ? Math.clz32 : Gs,
    wr = Math.log,
    Qa = Math.LN2;
  function Gs(d) {
    return ((d >>>= 0), d === 0 ? 32 : (31 - ((wr(d) / Qa) | 0)) | 0);
  }
  function Zo(d, g) {
    return (d === g && (d !== 0 || 1 / d === 1 / g)) || (d !== d && g !== g);
  }
  var Ya = typeof Object.is == "function" ? Object.is : Zo,
    Mn = null,
    fo = null,
    Go = null,
    nt = null,
    qn = !1,
    xr = !1,
    Pn = 0,
    wn = null,
    Ai = 0;
  function Hr() {
    if (Mn === null) throw Error(r(321));
    return Mn;
  }
  function Ui() {
    if (0 < Ai) throw Error(r(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function ho() {
    return (
      nt === null
        ? Go === null
          ? ((qn = !1), (Go = nt = Ui()))
          : ((qn = !0), (nt = Go))
        : nt.next === null
          ? ((qn = !1), (nt = nt.next = Ui()))
          : ((qn = !0), (nt = nt.next)),
      nt
    );
  }
  function Jo() {
    ((fo = Mn = null), (xr = !1), (Go = null), (Ai = 0), (nt = wn = null));
  }
  function Ll(d, g) {
    return typeof g == "function" ? g(d) : g;
  }
  function Xn(d, g, S) {
    if (((Mn = Hr()), (nt = ho()), qn)) {
      var C = nt.queue;
      if (((g = C.dispatch), wn !== null && ((S = wn.get(C)), S !== void 0))) {
        (wn.delete(C), (C = nt.memoizedState));
        do ((C = d(C, S.action)), (S = S.next));
        while (S !== null);
        return ((nt.memoizedState = C), [C, g]);
      }
      return [nt.memoizedState, g];
    }
    return (
      (d =
        d === Ll
          ? typeof g == "function"
            ? g()
            : g
          : S !== void 0
            ? S(g)
            : g),
      (nt.memoizedState = d),
      (d = nt.queue = { last: null, dispatch: null }),
      (d = d.dispatch = Bi.bind(null, Mn, d)),
      [nt.memoizedState, d]
    );
  }
  function bi(d, g) {
    if (
      ((Mn = Hr()), (nt = ho()), (g = g === void 0 ? null : g), nt !== null)
    ) {
      var S = nt.memoizedState;
      if (S !== null && g !== null) {
        var C = S[1];
        e: if (C === null) C = !1;
        else {
          for (var B = 0; B < C.length && B < g.length; B++)
            if (!Ya(g[B], C[B])) {
              C = !1;
              break e;
            }
          C = !0;
        }
        if (C) return S[0];
      }
    }
    return ((d = d()), (nt.memoizedState = [d, g]), d);
  }
  function Bi(d, g, S) {
    if (25 <= Ai) throw Error(r(301));
    if (d === Mn)
      if (
        ((xr = !0),
        (d = { action: S, next: null }),
        wn === null && (wn = new Map()),
        (S = wn.get(g)),
        S === void 0)
      )
        wn.set(g, d);
      else {
        for (g = S; g.next !== null; ) g = g.next;
        g.next = d;
      }
  }
  function Js() {
    throw Error(r(394));
  }
  function Wr() {}
  var ei = {
      readContext: function (d) {
        return d._currentValue;
      },
      useContext: function (d) {
        return (Hr(), d._currentValue);
      },
      useMemo: bi,
      useReducer: Xn,
      useRef: function (d) {
        ((Mn = Hr()), (nt = ho()));
        var g = nt.memoizedState;
        return g === null ? ((d = { current: d }), (nt.memoizedState = d)) : g;
      },
      useState: function (d) {
        return Xn(Ll, d);
      },
      useInsertionEffect: Wr,
      useLayoutEffect: function () {},
      useCallback: function (d, g) {
        return bi(function () {
          return d;
        }, g);
      },
      useImperativeHandle: Wr,
      useEffect: Wr,
      useDebugValue: Wr,
      useDeferredValue: function (d) {
        return (Hr(), d);
      },
      useTransition: function () {
        return (Hr(), [!1, Js]);
      },
      useId: function () {
        var d = fo.treeContext,
          g = d.overflow;
        ((d = d.id), (d = (d & ~(1 << (32 - vr(d) - 1))).toString(32) + g));
        var S = ti;
        if (S === null) throw Error(r(404));
        return (
          (g = Pn++),
          (d = ":" + S.idPrefix + "R" + d),
          0 < g && (d += "H" + g.toString(32)),
          d + ":"
        );
      },
      useMutableSource: function (d, g) {
        return (Hr(), g(d._source));
      },
      useSyncExternalStore: function (d, g, S) {
        if (S === void 0) throw Error(r(407));
        return S();
      },
    },
    ti = null,
    Pt =
      t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher;
  function po(d) {
    return (console.error(d), null);
  }
  function Qr() {}
  function ni(d, g, S, C, B, A, q, re, Ie) {
    var be = [],
      De = new Set();
    return (
      (g = {
        destination: null,
        responseState: g,
        progressiveChunkSize: C === void 0 ? 12800 : C,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: De,
        pingedTasks: be,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: B === void 0 ? po : B,
        onAllReady: A === void 0 ? Qr : A,
        onShellReady: q === void 0 ? Qr : q,
        onShellError: re === void 0 ? Qr : re,
        onFatalError: Ie === void 0 ? Qr : Ie,
      }),
      (S = mo(g, 0, null, S, !1, !1)),
      (S.parentFlushed = !0),
      (d = zl(g, d, null, S, De, he, null, vn)),
      be.push(d),
      g
    );
  }
  function zl(d, g, S, C, B, A, q, re) {
    (d.allPendingTasks++, S === null ? d.pendingRootTasks++ : S.pendingTasks++);
    var Ie = {
      node: g,
      ping: function () {
        var be = d.pingedTasks;
        (be.push(Ie), be.length === 1 && Al(d));
      },
      blockedBoundary: S,
      blockedSegment: C,
      abortSet: B,
      legacyContext: A,
      context: q,
      treeContext: re,
    };
    return (B.add(Ie), Ie);
  }
  function mo(d, g, S, C, B, A) {
    return {
      status: 0,
      id: -1,
      index: g,
      parentFlushed: !1,
      chunks: [],
      children: [],
      formatContext: C,
      boundary: S,
      lastPushedText: B,
      textEmbedded: A,
    };
  }
  function Yr(d, g) {
    if (((d = d.onError(g)), d != null && typeof d != "string"))
      throw Error(
        'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
          typeof d +
          '" instead',
      );
    return d;
  }
  function Sr(d, g) {
    var S = d.onShellError;
    (S(g),
      (S = d.onFatalError),
      S(g),
      d.destination !== null
        ? ((d.status = 2), _(d.destination, g))
        : ((d.status = 1), (d.fatalError = g)));
  }
  function ri(d, g, S, C, B) {
    for (Mn = {}, fo = g, Pn = 0, d = S(C, B); xr; )
      ((xr = !1), (Pn = 0), (Ai += 1), (nt = null), (d = S(C, B)));
    return (Jo(), d);
  }
  function Dl(d, g, S, C) {
    var B = S.render(),
      A = C.childContextTypes;
    if (A != null) {
      var q = g.legacyContext;
      if (typeof S.getChildContext != "function") C = q;
      else {
        S = S.getChildContext();
        for (var re in S)
          if (!(re in A)) throw Error(r(108, se(C) || "Unknown", re));
        C = yn({}, q, S);
      }
      ((g.legacyContext = C), Wt(d, g, B), (g.legacyContext = q));
    } else Wt(d, g, B);
  }
  function eu(d, g) {
    if (d && d.defaultProps) {
      ((g = yn({}, g)), (d = d.defaultProps));
      for (var S in d) g[S] === void 0 && (g[S] = d[S]);
      return g;
    }
    return g;
  }
  function Ol(d, g, S, C, B) {
    if (typeof S == "function")
      if (S.prototype && S.prototype.isReactComponent) {
        B = Fe(S, g.legacyContext);
        var A = S.contextType;
        ((A = new S(
          C,
          typeof A == "object" && A !== null ? A._currentValue : B,
        )),
          zt(A, S, C, B),
          Dl(d, g, A, S));
      } else {
        ((A = Fe(S, g.legacyContext)), (B = ri(d, g, S, C, A)));
        var q = Pn !== 0;
        if (
          typeof B == "object" &&
          B !== null &&
          typeof B.render == "function" &&
          B.$$typeof === void 0
        )
          (zt(B, S, C, A), Dl(d, g, B, S));
        else if (q) {
          ((C = g.treeContext), (g.treeContext = Jt(C, 1, 0)));
          try {
            Wt(d, g, B);
          } finally {
            g.treeContext = C;
          }
        } else Wt(d, g, B);
      }
    else if (typeof S == "string") {
      switch (
        ((B = g.blockedSegment),
        (A = Oo(B.chunks, S, C, d.responseState, B.formatContext)),
        (B.lastPushedText = !1),
        (q = B.formatContext),
        (B.formatContext = F(q, S, C)),
        jl(d, g, A),
        (B.formatContext = q),
        S)
      ) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          B.chunks.push(jo, w(S), io);
      }
      B.lastPushedText = !1;
    } else {
      switch (S) {
        case U:
        case E:
        case qo:
        case Xo:
        case wt:
          Wt(d, g, C.children);
          return;
        case yr:
          Wt(d, g, C.children);
          return;
        case k:
          throw Error(r(343));
        case gr:
          e: {
            ((S = g.blockedBoundary),
              (B = g.blockedSegment),
              (A = C.fallback),
              (C = C.children),
              (q = new Set()));
            var re = {
                id: null,
                rootSegmentID: -1,
                parentFlushed: !1,
                pendingTasks: 0,
                forceClientRender: !1,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks: q,
                errorDigest: null,
              },
              Ie = mo(d, B.chunks.length, re, B.formatContext, !1, !1);
            (B.children.push(Ie), (B.lastPushedText = !1));
            var be = mo(d, 0, null, B.formatContext, !1, !1);
            ((be.parentFlushed = !0),
              (g.blockedBoundary = re),
              (g.blockedSegment = be));
            try {
              if (
                (jl(d, g, C),
                be.lastPushedText && be.textEmbedded && be.chunks.push(X),
                (be.status = 1),
                Hi(re, be),
                re.pendingTasks === 0)
              )
                break e;
            } catch (De) {
              ((be.status = 4),
                (re.forceClientRender = !0),
                (re.errorDigest = Yr(d, De)));
            } finally {
              ((g.blockedBoundary = S), (g.blockedSegment = B));
            }
            ((g = zl(
              d,
              A,
              S,
              Ie,
              q,
              g.legacyContext,
              g.context,
              g.treeContext,
            )),
              d.pingedTasks.push(g));
          }
          return;
      }
      if (typeof S == "object" && S !== null)
        switch (S.$$typeof) {
          case Vr:
            if (((C = ri(d, g, S.render, C, B)), Pn !== 0)) {
              ((S = g.treeContext), (g.treeContext = Jt(S, 1, 0)));
              try {
                Wt(d, g, C);
              } finally {
                g.treeContext = S;
              }
            } else Wt(d, g, C);
            return;
          case f:
            ((S = S.type), (C = eu(S, C)), Ol(d, g, S, C, B));
            return;
          case Ko:
            if (
              ((B = C.children),
              (S = S._context),
              (C = C.value),
              (A = S._currentValue),
              (S._currentValue = C),
              (q = Ae),
              (Ae = C =
                {
                  parent: q,
                  depth: q === null ? 0 : q.depth + 1,
                  context: S,
                  parentValue: A,
                  value: C,
                }),
              (g.context = C),
              Wt(d, g, B),
              (d = Ae),
              d === null)
            )
              throw Error(r(403));
            ((C = d.parentValue),
              (d.context._currentValue = C === O ? d.context._defaultValue : C),
              (d = Ae = d.parent),
              (g.context = d));
            return;
          case Qn:
            ((C = C.children), (C = C(S._currentValue)), Wt(d, g, C));
            return;
          case y:
            ((B = S._init),
              (S = B(S._payload)),
              (C = eu(S, C)),
              Ol(d, g, S, C, void 0));
            return;
        }
      throw Error(r(130, S == null ? S : typeof S, ""));
    }
  }
  function Wt(d, g, S) {
    if (((g.node = S), typeof S == "object" && S !== null)) {
      switch (S.$$typeof) {
        case Ht:
          Ol(d, g, S.type, S.props, S.ref);
          return;
        case Br:
          throw Error(r(257));
        case y:
          var C = S._init;
          ((S = C(S._payload)), Wt(d, g, S));
          return;
      }
      if (xe(S)) {
        Vi(d, g, S);
        return;
      }
      if (
        (S === null || typeof S != "object"
          ? (C = null)
          : ((C = (Q && S[Q]) || S["@@iterator"]),
            (C = typeof C == "function" ? C : null)),
        C && (C = C.call(S)))
      ) {
        if (((S = C.next()), !S.done)) {
          var B = [];
          do (B.push(S.value), (S = C.next()));
          while (!S.done);
          Vi(d, g, B);
        }
        return;
      }
      throw (
        (d = Object.prototype.toString.call(S)),
        Error(
          r(
            31,
            d === "[object Object]"
              ? "object with keys {" + Object.keys(S).join(", ") + "}"
              : d,
          ),
        )
      );
    }
    typeof S == "string"
      ? ((C = g.blockedSegment),
        (C.lastPushedText = Re(
          g.blockedSegment.chunks,
          S,
          d.responseState,
          C.lastPushedText,
        )))
      : typeof S == "number" &&
        ((C = g.blockedSegment),
        (C.lastPushedText = Re(
          g.blockedSegment.chunks,
          "" + S,
          d.responseState,
          C.lastPushedText,
        )));
  }
  function Vi(d, g, S) {
    for (var C = S.length, B = 0; B < C; B++) {
      var A = g.treeContext;
      g.treeContext = Jt(A, C, B);
      try {
        jl(d, g, S[B]);
      } finally {
        g.treeContext = A;
      }
    }
  }
  function jl(d, g, S) {
    var C = g.blockedSegment.formatContext,
      B = g.legacyContext,
      A = g.context;
    try {
      return Wt(d, g, S);
    } catch (Ie) {
      if (
        (Jo(),
        typeof Ie == "object" && Ie !== null && typeof Ie.then == "function")
      ) {
        S = Ie;
        var q = g.blockedSegment,
          re = mo(
            d,
            q.chunks.length,
            null,
            q.formatContext,
            q.lastPushedText,
            !0,
          );
        (q.children.push(re),
          (q.lastPushedText = !1),
          (d = zl(
            d,
            g.node,
            g.blockedBoundary,
            re,
            g.abortSet,
            g.legacyContext,
            g.context,
            g.treeContext,
          ).ping),
          S.then(d, d),
          (g.blockedSegment.formatContext = C),
          (g.legacyContext = B),
          (g.context = A),
          Zt(A));
      } else
        throw (
          (g.blockedSegment.formatContext = C),
          (g.legacyContext = B),
          (g.context = A),
          Zt(A),
          Ie
        );
    }
  }
  function qa(d) {
    var g = d.blockedBoundary;
    ((d = d.blockedSegment), (d.status = 3), nu(this, g, d));
  }
  function tu(d, g, S) {
    var C = d.blockedBoundary;
    ((d.blockedSegment.status = 3),
      C === null
        ? (g.allPendingTasks--,
          g.status !== 2 &&
            ((g.status = 2), g.destination !== null && g.destination.close()))
        : (C.pendingTasks--,
          C.forceClientRender ||
            ((C.forceClientRender = !0),
            (d = S === void 0 ? Error(r(432)) : S),
            (C.errorDigest = g.onError(d)),
            C.parentFlushed && g.clientRenderedBoundaries.push(C)),
          C.fallbackAbortableTasks.forEach(function (B) {
            return tu(B, g, S);
          }),
          C.fallbackAbortableTasks.clear(),
          g.allPendingTasks--,
          g.allPendingTasks === 0 && ((C = g.onAllReady), C())));
  }
  function Hi(d, g) {
    if (
      g.chunks.length === 0 &&
      g.children.length === 1 &&
      g.children[0].boundary === null
    ) {
      var S = g.children[0];
      ((S.id = g.id), (S.parentFlushed = !0), S.status === 1 && Hi(d, S));
    } else d.completedSegments.push(g);
  }
  function nu(d, g, S) {
    if (g === null) {
      if (S.parentFlushed) {
        if (d.completedRootSegment !== null) throw Error(r(389));
        d.completedRootSegment = S;
      }
      (d.pendingRootTasks--,
        d.pendingRootTasks === 0 &&
          ((d.onShellError = Qr), (g = d.onShellReady), g()));
    } else
      (g.pendingTasks--,
        g.forceClientRender ||
          (g.pendingTasks === 0
            ? (S.parentFlushed && S.status === 1 && Hi(g, S),
              g.parentFlushed && d.completedBoundaries.push(g),
              g.fallbackAbortableTasks.forEach(qa, d),
              g.fallbackAbortableTasks.clear())
            : S.parentFlushed &&
              S.status === 1 &&
              (Hi(g, S),
              g.completedSegments.length === 1 &&
                g.parentFlushed &&
                d.partialBoundaries.push(g))));
    (d.allPendingTasks--, d.allPendingTasks === 0 && ((d = d.onAllReady), d()));
  }
  function Al(d) {
    if (d.status !== 2) {
      var g = Ae,
        S = Pt.current;
      Pt.current = ei;
      var C = ti;
      ti = d.responseState;
      try {
        var B = d.pingedTasks,
          A;
        for (A = 0; A < B.length; A++) {
          var q = B[A],
            re = d,
            Ie = q.blockedSegment;
          if (Ie.status === 0) {
            Zt(q.context);
            try {
              (Wt(re, q, q.node),
                Ie.lastPushedText && Ie.textEmbedded && Ie.chunks.push(X),
                q.abortSet.delete(q),
                (Ie.status = 1),
                nu(re, q.blockedBoundary, Ie));
            } catch (tn) {
              if (
                (Jo(),
                typeof tn == "object" &&
                  tn !== null &&
                  typeof tn.then == "function")
              ) {
                var be = q.ping;
                tn.then(be, be);
              } else {
                (q.abortSet.delete(q), (Ie.status = 4));
                var De = q.blockedBoundary,
                  it = tn,
                  Dt = Yr(re, it);
                if (
                  (De === null
                    ? Sr(re, it)
                    : (De.pendingTasks--,
                      De.forceClientRender ||
                        ((De.forceClientRender = !0),
                        (De.errorDigest = Dt),
                        De.parentFlushed &&
                          re.clientRenderedBoundaries.push(De))),
                  re.allPendingTasks--,
                  re.allPendingTasks === 0)
                ) {
                  var en = re.onAllReady;
                  en();
                }
              }
            } finally {
            }
          }
        }
        (B.splice(0, A), d.destination !== null && Ul(d, d.destination));
      } catch (tn) {
        (Yr(d, tn), Sr(d, tn));
      } finally {
        ((ti = C), (Pt.current = S), S === ei && Zt(g));
      }
    }
  }
  function Wi(d, g, S) {
    switch (((S.parentFlushed = !0), S.status)) {
      case 0:
        var C = (S.id = d.nextSegmentId++);
        return (
          (S.lastPushedText = !1),
          (S.textEmbedded = !1),
          (d = d.responseState),
          u(g, Bn),
          u(g, d.placeholderPrefix),
          (d = w(C.toString(16))),
          u(g, d),
          c(g, Ao)
        );
      case 1:
        S.status = 2;
        var B = !0;
        C = S.chunks;
        var A = 0;
        S = S.children;
        for (var q = 0; q < S.length; q++) {
          for (B = S[q]; A < B.index; A++) u(g, C[A]);
          B = Qi(d, g, B);
        }
        for (; A < C.length - 1; A++) u(g, C[A]);
        return (A < C.length && (B = c(g, C[A])), B);
      default:
        throw Error(r(390));
    }
  }
  function Qi(d, g, S) {
    var C = S.boundary;
    if (C === null) return Wi(d, g, S);
    if (((C.parentFlushed = !0), C.forceClientRender))
      ((C = C.errorDigest),
        c(g, zr),
        u(g, Fl),
        C && (u(g, Bo), u(g, w(ae(C))), u(g, bo)),
        c(g, Vo),
        Wi(d, g, S));
    else if (0 < C.pendingTasks) {
      ((C.rootSegmentID = d.nextSegmentId++),
        0 < C.completedSegments.length && d.partialBoundaries.push(C));
      var B = d.responseState,
        A = B.nextSuspenseID++;
      ((B = v(B.boundaryPrefix + A.toString(16))),
        (C = C.id = B),
        Ft(g, d.responseState, C),
        Wi(d, g, S));
    } else if (C.byteSize > d.progressiveChunkSize)
      ((C.rootSegmentID = d.nextSegmentId++),
        d.completedBoundaries.push(C),
        Ft(g, d.responseState, C.id),
        Wi(d, g, S));
    else {
      if ((c(g, sr), (S = C.completedSegments), S.length !== 1))
        throw Error(r(391));
      Qi(d, g, S[0]);
    }
    return c(g, Ii);
  }
  function ru(d, g, S) {
    return (
      Hn(g, d.responseState, S.formatContext, S.id),
      Qi(d, g, S),
      hr(g, S.formatContext)
    );
  }
  function ou(d, g, S) {
    for (var C = S.completedSegments, B = 0; B < C.length; B++)
      Yi(d, g, S, C[B]);
    if (
      ((C.length = 0),
      (d = d.responseState),
      (C = S.id),
      (S = S.rootSegmentID),
      u(g, d.startInlineScript),
      d.sentCompleteBoundaryFunction
        ? u(g, Yo)
        : ((d.sentCompleteBoundaryFunction = !0), u(g, br)),
      C === null)
    )
      throw Error(r(395));
    return (
      (S = w(S.toString(16))),
      u(g, C),
      u(g, Di),
      u(g, d.segmentPrefix),
      u(g, S),
      c(g, Oi)
    );
  }
  function Yi(d, g, S, C) {
    if (C.status === 2) return !0;
    var B = C.id;
    if (B === -1) {
      if ((C.id = S.rootSegmentID) === -1) throw Error(r(392));
      return ru(d, g, C);
    }
    return (
      ru(d, g, C),
      (d = d.responseState),
      u(g, d.startInlineScript),
      d.sentCompleteSegmentFunction
        ? u(g, Qo)
        : ((d.sentCompleteSegmentFunction = !0), u(g, zi)),
      u(g, d.segmentPrefix),
      (B = w(B.toString(16))),
      u(g, B),
      u(g, Ur),
      u(g, d.placeholderPrefix),
      u(g, B),
      c(g, pr)
    );
  }
  function Ul(d, g) {
    ((o = new Uint8Array(512)), (l = 0));
    try {
      var S = d.completedRootSegment;
      if (S !== null && d.pendingRootTasks === 0) {
        (Qi(d, g, S), (d.completedRootSegment = null));
        var C = d.responseState.bootstrapChunks;
        for (S = 0; S < C.length - 1; S++) u(g, C[S]);
        S < C.length && c(g, C[S]);
      }
      var B = d.clientRenderedBoundaries,
        A;
      for (A = 0; A < B.length; A++) {
        var q = B[A];
        C = g;
        var re = d.responseState,
          Ie = q.id,
          be = q.errorDigest,
          De = q.errorMessage,
          it = q.errorComponentStack;
        if (
          (u(C, re.startInlineScript),
          re.sentClientRenderFunction
            ? u(C, Mt)
            : ((re.sentClientRenderFunction = !0), u(C, ot)),
          Ie === null)
        )
          throw Error(r(395));
        (u(C, Ie),
          u(C, ao),
          (be || De || it) && (u(C, mr), u(C, w(Wn(be || "")))),
          (De || it) && (u(C, mr), u(C, w(Wn(De || "")))),
          it && (u(C, mr), u(C, w(Wn(it)))),
          c(C, co));
      }
      B.splice(0, A);
      var Dt = d.completedBoundaries;
      for (A = 0; A < Dt.length; A++) ou(d, g, Dt[A]);
      (Dt.splice(0, A), p(g), (o = new Uint8Array(512)), (l = 0));
      var en = d.partialBoundaries;
      for (A = 0; A < en.length; A++) {
        var tn = en[A];
        e: {
          ((B = d), (q = g));
          var oi = tn.completedSegments;
          for (re = 0; re < oi.length; re++)
            if (!Yi(B, q, tn, oi[re])) {
              (re++, oi.splice(0, re));
              var bl = !1;
              break e;
            }
          (oi.splice(0, re), (bl = !0));
        }
        if (!bl) {
          ((d.destination = null), A++, en.splice(0, A));
          return;
        }
      }
      en.splice(0, A);
      var kr = d.completedBoundaries;
      for (A = 0; A < kr.length; A++) ou(d, g, kr[A]);
      kr.splice(0, A);
    } finally {
      (p(g),
        d.allPendingTasks === 0 &&
          d.pingedTasks.length === 0 &&
          d.clientRenderedBoundaries.length === 0 &&
          d.completedBoundaries.length === 0 &&
          g.close());
    }
  }
  function iu(d, g) {
    try {
      var S = d.abortableTasks;
      (S.forEach(function (C) {
        return tu(C, d, g);
      }),
        S.clear(),
        d.destination !== null && Ul(d, d.destination));
    } catch (C) {
      (Yr(d, C), Sr(d, C));
    }
  }
  return (
    (ua.renderToReadableStream = function (d, g) {
      return new Promise(function (S, C) {
        var B,
          A,
          q = new Promise(function (De, it) {
            ((A = De), (B = it));
          }),
          re = ni(
            d,
            G(
              g ? g.identifierPrefix : void 0,
              g ? g.nonce : void 0,
              g ? g.bootstrapScriptContent : void 0,
              g ? g.bootstrapScripts : void 0,
              g ? g.bootstrapModules : void 0,
            ),
            de(g ? g.namespaceURI : void 0),
            g ? g.progressiveChunkSize : void 0,
            g ? g.onError : void 0,
            A,
            function () {
              var De = new ReadableStream(
                {
                  type: "bytes",
                  pull: function (it) {
                    if (re.status === 1)
                      ((re.status = 2), _(it, re.fatalError));
                    else if (re.status !== 2 && re.destination === null) {
                      re.destination = it;
                      try {
                        Ul(re, it);
                      } catch (Dt) {
                        (Yr(re, Dt), Sr(re, Dt));
                      }
                    }
                  },
                  cancel: function () {
                    iu(re);
                  },
                },
                { highWaterMark: 0 },
              );
              ((De.allReady = q), S(De));
            },
            function (De) {
              (q.catch(function () {}), C(De));
            },
            B,
          );
        if (g && g.signal) {
          var Ie = g.signal,
            be = function () {
              (iu(re, Ie.reason), Ie.removeEventListener("abort", be));
            };
          Ie.addEventListener("abort", be);
        }
        Al(re);
      });
    }),
    (ua.version = "18.3.1"),
    ua
  );
}
var yg;
function Uk() {
  if (yg) return Io;
  yg = 1;
  var t, r;
  return (
    (t = jk()),
    (r = Ak()),
    (Io.version = t.version),
    (Io.renderToString = t.renderToString),
    (Io.renderToStaticMarkup = t.renderToStaticMarkup),
    (Io.renderToNodeStream = t.renderToNodeStream),
    (Io.renderToStaticNodeStream = t.renderToStaticNodeStream),
    (Io.renderToReadableStream = r.renderToReadableStream),
    Io
  );
}
var bk = Uk();
const Bk = xg(bk),
  vg = new Map();
function ty(t) {
  const r = t.svg,
    o = vg.get(r);
  if (o !== void 0) o.render(Vf.createElement(Vs, t));
  else {
    const l = Ok.createRoot(r);
    (vg.set(r, l), l.render(Vf.createElement(Vs, t)));
  }
}
function ny(t) {
  const r = Vf.createElement(Vs, t),
    o = Bk.renderToStaticMarkup(r);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${t.width}" height="${t.height}">${o}</svg>`;
}
const Vk = { ...zk, figtree: ty, figtreeStatic: ny };
exports.BaseAnnotationType = et;
exports.BranchLabels = Z0;
exports.Branches = qd;
exports.CartoonClades = J0;
exports.CircleNodes = q0;
exports.FigTree = Vs;
exports.HighlightClades = G0;
exports.ImmutableTree = Wa;
exports.NexusImporter = I0;
exports.NodeLabels = K0;
exports.PreOrderTraversalCache = F0;
exports.RectangleNodes = X0;
exports.TaxonSet = Rl;
exports.dateToDecimal = p0;
exports.decimalToDate = h0;
exports.defaultInternalLayoutOptions = Id;
exports.figtree = ty;
exports.figtreeStatic = ny;
exports.ft = Vk;
exports.layoutClass = lt;
exports.leapYear = ba;
exports.notNull = kt;
exports.panic = m0;
exports.pathToRootIterator = $0;
exports.polarLayout = z0;
exports.postOrderIterator = Bd;
exports.preOrderIterator = bd;
exports.psuedoRootPostOrderIterator = R0;
exports.psuedoRootPreOrderIterator = P0;
exports.radialLayout = D0;
exports.rectangularLayout = Vd;
exports.tipIterator = Xs;
exports.u = g0;
exports.unNullify = hn;
//# sourceMappingURL=index.cjs.map
