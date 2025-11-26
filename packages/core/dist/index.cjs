"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const M = require("react/jsx-runtime"),
  T = require("react"),
  ro = require("react-dom");
function io(e) {
  const t = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const n in e)
      if (n !== "default") {
        const r = Object.getOwnPropertyDescriptor(e, n);
        Object.defineProperty(
          t,
          n,
          r.get ? r : { enumerable: !0, get: () => e[n] },
        );
      }
  }
  return ((t.default = e), Object.freeze(t));
}
const Zr = io(T);
var Kr = rn(),
  E = (e) => nn(e, Kr),
  Jr = rn();
E.write = (e) => nn(e, Jr);
var jn = rn();
E.onStart = (e) => nn(e, jn);
var ei = rn();
E.onFrame = (e) => nn(e, ei);
var ti = rn();
E.onFinish = (e) => nn(e, ti);
var st = [];
E.setTimeout = (e, t) => {
  const n = E.now() + t,
    r = () => {
      const a = st.findIndex((s) => s.cancel == r);
      (~a && st.splice(a, 1), (Ue -= ~a ? 1 : 0));
    },
    i = { time: n, handler: e, cancel: r };
  return (st.splice(Fa(n), 0, i), (Ue += 1), Da(), i);
};
var Fa = (e) => ~(~st.findIndex((t) => t.time > e) || ~st.length);
E.cancel = (e) => {
  (jn.delete(e), ei.delete(e), ti.delete(e), Kr.delete(e), Jr.delete(e));
};
E.sync = (e) => {
  ((Cr = !0), E.batchedUpdates(e), (Cr = !1));
};
E.throttle = (e) => {
  let t;
  function n() {
    try {
      e(...t);
    } finally {
      t = null;
    }
  }
  function r(...i) {
    ((t = i), E.onStart(n));
  }
  return (
    (r.handler = e),
    (r.cancel = () => {
      (jn.delete(n), (t = null));
    }),
    r
  );
};
var ni = typeof window < "u" ? window.requestAnimationFrame : () => {};
E.use = (e) => (ni = e);
E.now = typeof performance < "u" ? () => performance.now() : Date.now;
E.batchedUpdates = (e) => e();
E.catch = console.error;
E.frameLoop = "always";
E.advance = () => {
  E.frameLoop !== "demand"
    ? console.warn(
        "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand",
      )
    : Oa();
};
var De = -1,
  Ue = 0,
  Cr = !1;
function nn(e, t) {
  Cr ? (t.delete(e), e(0)) : (t.add(e), Da());
}
function Da() {
  De < 0 && ((De = 0), E.frameLoop !== "demand" && ni(Ua));
}
function ao() {
  De = -1;
}
function Ua() {
  ~De && (ni(Ua), E.batchedUpdates(Oa));
}
function Oa() {
  const e = De;
  De = E.now();
  const t = Fa(De);
  if ((t && (ja(st.splice(0, t), (n) => n.handler()), (Ue -= t)), !Ue)) {
    ao();
    return;
  }
  (jn.flush(),
    Kr.flush(e ? Math.min(64, De - e) : 16.667),
    ei.flush(),
    Jr.flush(),
    ti.flush());
}
function rn() {
  let e = new Set(),
    t = e;
  return {
    add(n) {
      ((Ue += t == e && !e.has(n) ? 1 : 0), e.add(n));
    },
    delete(n) {
      return ((Ue -= t == e && e.has(n) ? 1 : 0), e.delete(n));
    },
    flush(n) {
      t.size &&
        ((e = new Set()),
        (Ue -= t.size),
        ja(t, (r) => r(n) && e.add(r)),
        (Ue += e.size),
        (t = e));
    },
  };
}
function ja(e, t) {
  e.forEach((n) => {
    try {
      t(n);
    } catch (r) {
      E.catch(r);
    }
  });
}
var so = Object.defineProperty,
  oo = (e, t) => {
    for (var n in t) so(e, n, { get: t[n], enumerable: !0 });
  },
  Ne = {};
oo(Ne, {
  assign: () => co,
  colors: () => Oe,
  createStringInterpolator: () => ii,
  skipAnimation: () => Ba,
  to: () => za,
  willAdvance: () => ai,
});
function Mr() {}
var uo = (e, t, n) =>
    Object.defineProperty(e, t, { value: n, writable: !0, configurable: !0 }),
  N = {
    arr: Array.isArray,
    obj: (e) => !!e && e.constructor.name === "Object",
    fun: (e) => typeof e == "function",
    str: (e) => typeof e == "string",
    num: (e) => typeof e == "number",
    und: (e) => e === void 0,
  };
function Re(e, t) {
  if (N.arr(e)) {
    if (!N.arr(t) || e.length !== t.length) return !1;
    for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
    return !0;
  }
  return e === t;
}
var O = (e, t) => e.forEach(t);
function Te(e, t, n) {
  if (N.arr(e)) {
    for (let r = 0; r < e.length; r++) t.call(n, e[r], `${r}`);
    return;
  }
  for (const r in e) e.hasOwnProperty(r) && t.call(n, e[r], r);
}
var he = (e) => (N.und(e) ? [] : N.arr(e) ? e : [e]);
function Rt(e, t) {
  if (e.size) {
    const n = Array.from(e);
    (e.clear(), O(n, t));
  }
}
var Et = (e, ...t) => Rt(e, (n) => n(...t)),
  ri = () =>
    typeof window > "u" ||
    !window.navigator ||
    /ServerSideRendering|^Deno\//.test(window.navigator.userAgent),
  ii,
  za,
  Oe = null,
  Ba = !1,
  ai = Mr,
  co = (e) => {
    (e.to && (za = e.to),
      e.now && (E.now = e.now),
      e.colors !== void 0 && (Oe = e.colors),
      e.skipAnimation != null && (Ba = e.skipAnimation),
      e.createStringInterpolator && (ii = e.createStringInterpolator),
      e.requestAnimationFrame && E.use(e.requestAnimationFrame),
      e.batchedUpdates && (E.batchedUpdates = e.batchedUpdates),
      e.willAdvance && (ai = e.willAdvance),
      e.frameLoop && (E.frameLoop = e.frameLoop));
  },
  It = new Set(),
  ye = [],
  tr = [],
  Nn = 0,
  zn = {
    get idle() {
      return !It.size && !ye.length;
    },
    start(e) {
      Nn > e.priority ? (It.add(e), E.onStart(lo)) : (Va(e), E(Sr));
    },
    advance: Sr,
    sort(e) {
      if (Nn) E.onFrame(() => zn.sort(e));
      else {
        const t = ye.indexOf(e);
        ~t && (ye.splice(t, 1), qa(e));
      }
    },
    clear() {
      ((ye = []), It.clear());
    },
  };
function lo() {
  (It.forEach(Va), It.clear(), E(Sr));
}
function Va(e) {
  ye.includes(e) || qa(e);
}
function qa(e) {
  ye.splice(
    ho(ye, (t) => t.priority > e.priority),
    0,
    e,
  );
}
function Sr(e) {
  const t = tr;
  for (let n = 0; n < ye.length; n++) {
    const r = ye[n];
    ((Nn = r.priority), r.idle || (ai(r), r.advance(e), r.idle || t.push(r)));
  }
  return ((Nn = 0), (tr = ye), (tr.length = 0), (ye = t), ye.length > 0);
}
function ho(e, t) {
  const n = e.findIndex(t);
  return n < 0 ? e.length : n;
}
var fo = {
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
  _e = "[-+]?\\d*\\.?\\d+",
  Cn = _e + "%";
function Bn(...e) {
  return "\\(\\s*(" + e.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var mo = new RegExp("rgb" + Bn(_e, _e, _e)),
  go = new RegExp("rgba" + Bn(_e, _e, _e, _e)),
  yo = new RegExp("hsl" + Bn(_e, Cn, Cn)),
  po = new RegExp("hsla" + Bn(_e, Cn, Cn, _e)),
  xo = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  bo = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  vo = /^#([0-9a-fA-F]{6})$/,
  wo = /^#([0-9a-fA-F]{8})$/;
function _o(e) {
  let t;
  return typeof e == "number"
    ? e >>> 0 === e && e >= 0 && e <= 4294967295
      ? e
      : null
    : (t = vo.exec(e))
      ? parseInt(t[1] + "ff", 16) >>> 0
      : Oe && Oe[e] !== void 0
        ? Oe[e]
        : (t = mo.exec(e))
          ? ((nt(t[1]) << 24) | (nt(t[2]) << 16) | (nt(t[3]) << 8) | 255) >>> 0
          : (t = go.exec(e))
            ? ((nt(t[1]) << 24) |
                (nt(t[2]) << 16) |
                (nt(t[3]) << 8) |
                Pi(t[4])) >>>
              0
            : (t = xo.exec(e))
              ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>>
                0
              : (t = wo.exec(e))
                ? parseInt(t[1], 16) >>> 0
                : (t = bo.exec(e))
                  ? parseInt(
                      t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4],
                      16,
                    ) >>> 0
                  : (t = yo.exec(e))
                    ? (ki(Ti(t[1]), ln(t[2]), ln(t[3])) | 255) >>> 0
                    : (t = po.exec(e))
                      ? (ki(Ti(t[1]), ln(t[2]), ln(t[3])) | Pi(t[4])) >>> 0
                      : null;
}
function nr(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
        ? t
        : n < 2 / 3
          ? e + (t - e) * (2 / 3 - n) * 6
          : e
  );
}
function ki(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t,
    i = 2 * n - r,
    a = nr(i, r, e + 1 / 3),
    s = nr(i, r, e),
    o = nr(i, r, e - 1 / 3);
  return (
    (Math.round(a * 255) << 24) |
    (Math.round(s * 255) << 16) |
    (Math.round(o * 255) << 8)
  );
}
function nt(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function Ti(e) {
  return (((parseFloat(e) % 360) + 360) % 360) / 360;
}
function Pi(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function ln(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function Ai(e) {
  let t = _o(e);
  if (t === null) return e;
  t = t || 0;
  const n = (t & 4278190080) >>> 24,
    r = (t & 16711680) >>> 16,
    i = (t & 65280) >>> 8,
    a = (t & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
var Ut = (e, t, n) => {
  if (N.fun(e)) return e;
  if (N.arr(e)) return Ut({ range: e, output: t, extrapolate: n });
  if (N.str(e.output[0])) return ii(e);
  const r = e,
    i = r.output,
    a = r.range || [0, 1],
    s = r.extrapolateLeft || r.extrapolate || "extend",
    o = r.extrapolateRight || r.extrapolate || "extend",
    c = r.easing || ((u) => u);
  return (u) => {
    const l = Co(u, a);
    return No(u, a[l], a[l + 1], i[l], i[l + 1], c, s, o, r.map);
  };
};
function No(e, t, n, r, i, a, s, o, c) {
  let u = c ? c(e) : e;
  if (u < t) {
    if (s === "identity") return u;
    s === "clamp" && (u = t);
  }
  if (u > n) {
    if (o === "identity") return u;
    o === "clamp" && (u = n);
  }
  return r === i
    ? r
    : t === n
      ? e <= t
        ? r
        : i
      : (t === -1 / 0
          ? (u = -u)
          : n === 1 / 0
            ? (u = u - t)
            : (u = (u - t) / (n - t)),
        (u = a(u)),
        r === -1 / 0
          ? (u = -u)
          : i === 1 / 0
            ? (u = u + r)
            : (u = u * (i - r) + r),
        u);
}
function Co(e, t) {
  for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n);
  return n - 1;
}
var Mo = { linear: (e) => e },
  Ot = Symbol.for("FluidValue.get"),
  ct = Symbol.for("FluidValue.observers"),
  me = (e) => !!(e && e[Ot]),
  ae = (e) => (e && e[Ot] ? e[Ot]() : e),
  Ei = (e) => e[ct] || null;
function So(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function jt(e, t) {
  const n = e[ct];
  n &&
    n.forEach((r) => {
      So(r, t);
    });
}
var Ha = class {
    constructor(e) {
      if (!e && !(e = this.get)) throw Error("Unknown getter");
      $o(this, e);
    }
  },
  $o = (e, t) => Ya(e, Ot, t);
function xt(e, t) {
  if (e[Ot]) {
    let n = e[ct];
    (n || Ya(e, ct, (n = new Set())),
      n.has(t) || (n.add(t), e.observerAdded && e.observerAdded(n.size, t)));
  }
  return t;
}
function zt(e, t) {
  const n = e[ct];
  if (n && n.has(t)) {
    const r = n.size - 1;
    (r ? n.delete(t) : (e[ct] = null),
      e.observerRemoved && e.observerRemoved(r, t));
  }
}
var Ya = (e, t, n) =>
    Object.defineProperty(e, t, { value: n, writable: !0, configurable: !0 }),
  bn = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  ko =
    /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
  Ri = new RegExp(`(${bn.source})(%|[a-z]+)`, "i"),
  To = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
  Vn = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/,
  Wa = (e) => {
    const [t, n] = Po(e);
    if (!t || ri()) return e;
    const r = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(t);
    if (r) return r.trim();
    if (n && n.startsWith("--")) {
      const i = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(n);
      return i || e;
    } else {
      if (n && Vn.test(n)) return Wa(n);
      if (n) return n;
    }
    return e;
  },
  Po = (e) => {
    const t = Vn.exec(e);
    if (!t) return [,];
    const [, n, r] = t;
    return [n, r];
  },
  rr,
  Ao = (e, t, n, r, i) =>
    `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`,
  Ga = (e) => {
    rr ||
      (rr = Oe
        ? new RegExp(`(${Object.keys(Oe).join("|")})(?!\\w)`, "g")
        : /^\b$/);
    const t = e.output.map((a) =>
        ae(a).replace(Vn, Wa).replace(ko, Ai).replace(rr, Ai),
      ),
      n = t.map((a) => a.match(bn).map(Number)),
      i = n[0]
        .map((a, s) =>
          n.map((o) => {
            if (!(s in o))
              throw Error('The arity of each "output" value must be equal');
            return o[s];
          }),
        )
        .map((a) => Ut({ ...e, output: a }));
    return (a) => {
      const s = !Ri.test(t[0]) && t.find((c) => Ri.test(c))?.replace(bn, "");
      let o = 0;
      return t[0].replace(bn, () => `${i[o++](a)}${s || ""}`).replace(To, Ao);
    };
  },
  si = "react-spring: ",
  Qa = (e) => {
    const t = e;
    let n = !1;
    if (typeof t != "function")
      throw new TypeError(`${si}once requires a function parameter`);
    return (...r) => {
      n || (t(...r), (n = !0));
    };
  },
  Eo = Qa(console.warn);
function Ro() {
  Eo(`${si}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
var Io = Qa(console.warn);
function Lo() {
  Io(
    `${si}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`,
  );
}
function qn(e) {
  return (
    N.str(e) &&
    (e[0] == "#" || /\d/.test(e) || (!ri() && Vn.test(e)) || e in (Oe || {}))
  );
}
var oi = ri() ? T.useEffect : T.useLayoutEffect,
  Fo = () => {
    const e = T.useRef(!1);
    return (
      oi(
        () => (
          (e.current = !0),
          () => {
            e.current = !1;
          }
        ),
        [],
      ),
      e
    );
  };
function Xa() {
  const e = T.useState()[1],
    t = Fo();
  return () => {
    t.current && e(Math.random());
  };
}
function Do(e, t) {
  const [n] = T.useState(() => ({ inputs: t, result: e() })),
    r = T.useRef(),
    i = r.current;
  let a = i;
  return (
    a
      ? (t && a.inputs && Uo(t, a.inputs)) || (a = { inputs: t, result: e() })
      : (a = n),
    T.useEffect(() => {
      ((r.current = a), i == n && (n.inputs = n.result = void 0));
    }, [a]),
    a.result
  );
}
function Uo(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
var Za = (e) => T.useEffect(e, Oo),
  Oo = [];
function Ii(e) {
  const t = T.useRef();
  return (
    T.useEffect(() => {
      t.current = e;
    }),
    t.current
  );
}
var Bt = Symbol.for("Animated:node"),
  jo = (e) => !!e && e[Bt] === e,
  Se = (e) => e && e[Bt],
  ui = (e, t) => uo(e, Bt, t),
  Hn = (e) => e && e[Bt] && e[Bt].getPayload(),
  Ka = class {
    constructor() {
      ui(this, this);
    }
    getPayload() {
      return this.payload || [];
    }
  },
  an = class extends Ka {
    constructor(e) {
      (super(),
        (this._value = e),
        (this.done = !0),
        (this.durationProgress = 0),
        N.num(this._value) && (this.lastPosition = this._value));
    }
    static create(e) {
      return new an(e);
    }
    getPayload() {
      return [this];
    }
    getValue() {
      return this._value;
    }
    setValue(e, t) {
      return (
        N.num(e) &&
          ((this.lastPosition = e),
          t &&
            ((e = Math.round(e / t) * t),
            this.done && (this.lastPosition = e))),
        this._value === e ? !1 : ((this._value = e), !0)
      );
    }
    reset() {
      const { done: e } = this;
      ((this.done = !1),
        N.num(this._value) &&
          ((this.elapsedTime = 0),
          (this.durationProgress = 0),
          (this.lastPosition = this._value),
          e && (this.lastVelocity = null),
          (this.v0 = null)));
    }
  },
  Vt = class extends an {
    constructor(e) {
      (super(0),
        (this._string = null),
        (this._toString = Ut({ output: [e, e] })));
    }
    static create(e) {
      return new Vt(e);
    }
    getValue() {
      const e = this._string;
      return e ?? (this._string = this._toString(this._value));
    }
    setValue(e) {
      if (N.str(e)) {
        if (e == this._string) return !1;
        ((this._string = e), (this._value = 1));
      } else if (super.setValue(e)) this._string = null;
      else return !1;
      return !0;
    }
    reset(e) {
      (e && (this._toString = Ut({ output: [this.getValue(), e] })),
        (this._value = 0),
        super.reset());
    }
  },
  Mn = { dependencies: null },
  Yn = class extends Ka {
    constructor(e) {
      (super(), (this.source = e), this.setValue(e));
    }
    getValue(e) {
      const t = {};
      return (
        Te(this.source, (n, r) => {
          jo(n)
            ? (t[r] = n.getValue(e))
            : me(n)
              ? (t[r] = ae(n))
              : e || (t[r] = n);
        }),
        t
      );
    }
    setValue(e) {
      ((this.source = e), (this.payload = this._makePayload(e)));
    }
    reset() {
      this.payload && O(this.payload, (e) => e.reset());
    }
    _makePayload(e) {
      if (e) {
        const t = new Set();
        return (Te(e, this._addToPayload, t), Array.from(t));
      }
    }
    _addToPayload(e) {
      Mn.dependencies && me(e) && Mn.dependencies.add(e);
      const t = Hn(e);
      t && O(t, (n) => this.add(n));
    }
  },
  Ja = class extends Yn {
    constructor(e) {
      super(e);
    }
    static create(e) {
      return new Ja(e);
    }
    getValue() {
      return this.source.map((e) => e.getValue());
    }
    setValue(e) {
      const t = this.getPayload();
      return e.length == t.length
        ? t.map((n, r) => n.setValue(e[r])).some(Boolean)
        : (super.setValue(e.map(zo)), !0);
    }
  };
function zo(e) {
  return (qn(e) ? Vt : an).create(e);
}
function $r(e) {
  const t = Se(e);
  return t ? t.constructor : N.arr(e) ? Ja : qn(e) ? Vt : an;
}
var Li = (e, t) => {
    const n = !N.fun(e) || (e.prototype && e.prototype.isReactComponent);
    return T.forwardRef((r, i) => {
      const a = T.useRef(null),
        s =
          n &&
          T.useCallback(
            (m) => {
              a.current = qo(i, m);
            },
            [i],
          ),
        [o, c] = Vo(r, t),
        u = Xa(),
        l = () => {
          const m = a.current;
          if (n && !m) return;
          (m ? t.applyAnimatedValues(m, o.getValue(!0)) : !1) === !1 && u();
        },
        h = new Bo(l, c),
        f = T.useRef();
      (oi(
        () => (
          (f.current = h),
          O(c, (m) => xt(m, h)),
          () => {
            f.current &&
              (O(f.current.deps, (m) => zt(m, f.current)),
              E.cancel(f.current.update));
          }
        ),
      ),
        T.useEffect(l, []),
        Za(() => () => {
          const m = f.current;
          O(m.deps, (g) => zt(g, m));
        }));
      const d = t.getComponentProps(o.getValue());
      return Zr.createElement(e, { ...d, ref: s });
    });
  },
  Bo = class {
    constructor(e, t) {
      ((this.update = e), (this.deps = t));
    }
    eventObserved(e) {
      e.type == "change" && E.write(this.update);
    }
  };
function Vo(e, t) {
  const n = new Set();
  return (
    (Mn.dependencies = n),
    e.style && (e = { ...e, style: t.createAnimatedStyle(e.style) }),
    (e = new Yn(e)),
    (Mn.dependencies = null),
    [e, n]
  );
}
function qo(e, t) {
  return (e && (N.fun(e) ? e(t) : (e.current = t)), t);
}
var Fi = Symbol.for("AnimatedComponent"),
  Ho = (
    e,
    {
      applyAnimatedValues: t = () => !1,
      createAnimatedStyle: n = (i) => new Yn(i),
      getComponentProps: r = (i) => i,
    } = {},
  ) => {
    const i = {
        applyAnimatedValues: t,
        createAnimatedStyle: n,
        getComponentProps: r,
      },
      a = (s) => {
        const o = Di(s) || "Anonymous";
        return (
          N.str(s)
            ? (s = a[s] || (a[s] = Li(s, i)))
            : (s = s[Fi] || (s[Fi] = Li(s, i))),
          (s.displayName = `Animated(${o})`),
          s
        );
      };
    return (
      Te(e, (s, o) => {
        (N.arr(e) && (o = Di(s)), (a[o] = a(s)));
      }),
      { animated: a }
    );
  },
  Di = (e) =>
    N.str(e)
      ? e
      : e && N.str(e.displayName)
        ? e.displayName
        : (N.fun(e) && e.name) || null;
function He(e, ...t) {
  return N.fun(e) ? e(...t) : e;
}
var Lt = (e, t) =>
    e === !0 || !!(t && e && (N.fun(e) ? e(t) : he(e).includes(t))),
  es = (e, t) => (N.obj(e) ? t && e[t] : e),
  ts = (e, t) => (e.default === !0 ? e[t] : e.default ? e.default[t] : void 0),
  Yo = (e) => e,
  ci = (e, t = Yo) => {
    let n = Wo;
    e.default && e.default !== !0 && ((e = e.default), (n = Object.keys(e)));
    const r = {};
    for (const i of n) {
      const a = t(e[i], i);
      N.und(a) || (r[i] = a);
    }
    return r;
  },
  Wo = [
    "config",
    "onProps",
    "onStart",
    "onChange",
    "onPause",
    "onResume",
    "onRest",
  ],
  Go = {
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
function Qo(e) {
  const t = {};
  let n = 0;
  if (
    (Te(e, (r, i) => {
      Go[i] || ((t[i] = r), n++);
    }),
    n)
  )
    return t;
}
function ns(e) {
  const t = Qo(e);
  if (t) {
    const n = { to: t };
    return (Te(e, (r, i) => i in t || (n[i] = r)), n);
  }
  return { ...e };
}
function qt(e) {
  return (
    (e = ae(e)),
    N.arr(e)
      ? e.map(qt)
      : qn(e)
        ? Ne.createStringInterpolator({ range: [0, 1], output: [e, e] })(1)
        : e
  );
}
function Xo(e) {
  for (const t in e) return !0;
  return !1;
}
function kr(e) {
  return N.fun(e) || (N.arr(e) && N.obj(e[0]));
}
function Zo(e, t) {
  (e.ref?.delete(e), t?.delete(e));
}
function Ko(e, t) {
  t && e.ref !== t && (e.ref?.delete(e), t.add(e), (e.ref = t));
}
var Jo = { default: { tension: 170, friction: 26 } },
  Tr = { ...Jo.default, mass: 1, damping: 1, easing: Mo.linear, clamp: !1 },
  eu = class {
    constructor() {
      ((this.velocity = 0), Object.assign(this, Tr));
    }
  };
function tu(e, t, n) {
  (n && ((n = { ...n }), Ui(n, t), (t = { ...n, ...t })),
    Ui(e, t),
    Object.assign(e, t));
  for (const s in Tr) e[s] == null && (e[s] = Tr[s]);
  let { frequency: r, damping: i } = e;
  const { mass: a } = e;
  return (
    N.und(r) ||
      (r < 0.01 && (r = 0.01),
      i < 0 && (i = 0),
      (e.tension = Math.pow((2 * Math.PI) / r, 2) * a),
      (e.friction = (4 * Math.PI * i * a) / r)),
    e
  );
}
function Ui(e, t) {
  if (!N.und(t.decay)) e.duration = void 0;
  else {
    const n = !N.und(t.tension) || !N.und(t.friction);
    ((n || !N.und(t.frequency) || !N.und(t.damping) || !N.und(t.mass)) &&
      ((e.duration = void 0), (e.decay = void 0)),
      n && (e.frequency = void 0));
  }
}
var Oi = [],
  nu = class {
    constructor() {
      ((this.changed = !1),
        (this.values = Oi),
        (this.toValues = null),
        (this.fromValues = Oi),
        (this.config = new eu()),
        (this.immediate = !1));
    }
  };
function rs(e, { key: t, props: n, defaultProps: r, state: i, actions: a }) {
  return new Promise((s, o) => {
    let c,
      u,
      l = Lt(n.cancel ?? r?.cancel, t);
    if (l) d();
    else {
      N.und(n.pause) || (i.paused = Lt(n.pause, t));
      let m = r?.pause;
      (m !== !0 && (m = i.paused || Lt(m, t)),
        (c = He(n.delay || 0, t)),
        m ? (i.resumeQueue.add(f), a.pause()) : (a.resume(), f()));
    }
    function h() {
      (i.resumeQueue.add(f),
        i.timeouts.delete(u),
        u.cancel(),
        (c = u.time - E.now()));
    }
    function f() {
      c > 0 && !Ne.skipAnimation
        ? ((i.delayed = !0),
          (u = E.setTimeout(d, c)),
          i.pauseQueue.add(h),
          i.timeouts.add(u))
        : d();
    }
    function d() {
      (i.delayed && (i.delayed = !1),
        i.pauseQueue.delete(h),
        i.timeouts.delete(u),
        e <= (i.cancelId || 0) && (l = !0));
      try {
        a.start({ ...n, callId: e, cancel: l }, s);
      } catch (m) {
        o(m);
      }
    }
  });
}
var li = (e, t) =>
    t.length == 1
      ? t[0]
      : t.some((n) => n.cancelled)
        ? ot(e.get())
        : t.every((n) => n.noop)
          ? is(e.get())
          : ve(
              e.get(),
              t.every((n) => n.finished),
            ),
  is = (e) => ({ value: e, noop: !0, finished: !0, cancelled: !1 }),
  ve = (e, t, n = !1) => ({ value: e, finished: t, cancelled: n }),
  ot = (e) => ({ value: e, cancelled: !0, finished: !1 });
function as(e, t, n, r) {
  const { callId: i, parentId: a, onRest: s } = t,
    { asyncTo: o, promise: c } = n;
  return !a && e === o && !t.reset
    ? c
    : (n.promise = (async () => {
        ((n.asyncId = i), (n.asyncTo = e));
        const u = ci(t, (x, y) => (y === "onRest" ? void 0 : x));
        let l, h;
        const f = new Promise((x, y) => ((l = x), (h = y))),
          d = (x) => {
            const y =
              (i <= (n.cancelId || 0) && ot(r)) ||
              (i !== n.asyncId && ve(r, !1));
            if (y) throw ((x.result = y), h(x), x);
          },
          m = (x, y) => {
            const b = new ji(),
              p = new zi();
            return (async () => {
              if (Ne.skipAnimation)
                throw (Ht(n), (p.result = ve(r, !1)), h(p), p);
              d(b);
              const _ = N.obj(x) ? { ...x } : { ...y, to: x };
              ((_.parentId = i),
                Te(u, (k, P) => {
                  N.und(_[P]) && (_[P] = k);
                }));
              const C = await r.start(_);
              return (
                d(b),
                n.paused &&
                  (await new Promise((k) => {
                    n.resumeQueue.add(k);
                  })),
                C
              );
            })();
          };
        let g;
        if (Ne.skipAnimation) return (Ht(n), ve(r, !1));
        try {
          let x;
          (N.arr(e)
            ? (x = (async (y) => {
                for (const b of y) await m(b);
              })(e))
            : (x = Promise.resolve(e(m, r.stop.bind(r)))),
            await Promise.all([x.then(l), f]),
            (g = ve(r.get(), !0, !1)));
        } catch (x) {
          if (x instanceof ji) g = x.result;
          else if (x instanceof zi) g = x.result;
          else throw x;
        } finally {
          i == n.asyncId &&
            ((n.asyncId = a),
            (n.asyncTo = a ? o : void 0),
            (n.promise = a ? c : void 0));
        }
        return (
          N.fun(s) &&
            E.batchedUpdates(() => {
              s(g, r, r.item);
            }),
          g
        );
      })());
}
function Ht(e, t) {
  (Rt(e.timeouts, (n) => n.cancel()),
    e.pauseQueue.clear(),
    e.resumeQueue.clear(),
    (e.asyncId = e.asyncTo = e.promise = void 0),
    t && (e.cancelId = t));
}
var ji = class extends Error {
    constructor() {
      super(
        "An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.",
      );
    }
  },
  zi = class extends Error {
    constructor() {
      super("SkipAnimationSignal");
    }
  },
  Pr = (e) => e instanceof hi,
  ru = 1,
  hi = class extends Ha {
    constructor() {
      (super(...arguments), (this.id = ru++), (this._priority = 0));
    }
    get priority() {
      return this._priority;
    }
    set priority(e) {
      this._priority != e && ((this._priority = e), this._onPriorityChange(e));
    }
    get() {
      const e = Se(this);
      return e && e.getValue();
    }
    to(...e) {
      return Ne.to(this, e);
    }
    interpolate(...e) {
      return (Ro(), Ne.to(this, e));
    }
    toJSON() {
      return this.get();
    }
    observerAdded(e) {
      e == 1 && this._attach();
    }
    observerRemoved(e) {
      e == 0 && this._detach();
    }
    _attach() {}
    _detach() {}
    _onChange(e, t = !1) {
      jt(this, { type: "change", parent: this, value: e, idle: t });
    }
    _onPriorityChange(e) {
      (this.idle || zn.sort(this),
        jt(this, { type: "priority", parent: this, priority: e }));
    }
  },
  Qe = Symbol.for("SpringPhase"),
  ss = 1,
  Ar = 2,
  Er = 4,
  ir = (e) => (e[Qe] & ss) > 0,
  Le = (e) => (e[Qe] & Ar) > 0,
  Mt = (e) => (e[Qe] & Er) > 0,
  Bi = (e, t) => (t ? (e[Qe] |= Ar | ss) : (e[Qe] &= ~Ar)),
  Vi = (e, t) => (t ? (e[Qe] |= Er) : (e[Qe] &= ~Er)),
  os = class extends hi {
    constructor(e, t) {
      if (
        (super(),
        (this.animation = new nu()),
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
        !N.und(e) || !N.und(t))
      ) {
        const n = N.obj(e) ? { ...e } : { ...t, from: e };
        (N.und(n.default) && (n.default = !0), this.start(n));
      }
    }
    get idle() {
      return !(Le(this) || this._state.asyncTo) || Mt(this);
    }
    get goal() {
      return ae(this.animation.to);
    }
    get velocity() {
      const e = Se(this);
      return e instanceof an
        ? e.lastVelocity || 0
        : e.getPayload().map((t) => t.lastVelocity || 0);
    }
    get hasAnimated() {
      return ir(this);
    }
    get isAnimating() {
      return Le(this);
    }
    get isPaused() {
      return Mt(this);
    }
    get isDelayed() {
      return this._state.delayed;
    }
    advance(e) {
      let t = !0,
        n = !1;
      const r = this.animation;
      let { toValues: i } = r;
      const { config: a } = r,
        s = Hn(r.to);
      (!s && me(r.to) && (i = he(ae(r.to))),
        r.values.forEach((u, l) => {
          if (u.done) return;
          const h = u.constructor == Vt ? 1 : s ? s[l].lastPosition : i[l];
          let f = r.immediate,
            d = h;
          if (!f) {
            if (((d = u.lastPosition), a.tension <= 0)) {
              u.done = !0;
              return;
            }
            let m = (u.elapsedTime += e);
            const g = r.fromValues[l],
              x =
                u.v0 != null
                  ? u.v0
                  : (u.v0 = N.arr(a.velocity) ? a.velocity[l] : a.velocity);
            let y;
            const b =
              a.precision ||
              (g == h ? 0.005 : Math.min(1, Math.abs(h - g) * 0.001));
            if (N.und(a.duration))
              if (a.decay) {
                const p = a.decay === !0 ? 0.998 : a.decay,
                  _ = Math.exp(-(1 - p) * m);
                ((d = g + (x / (1 - p)) * (1 - _)),
                  (f = Math.abs(u.lastPosition - d) <= b),
                  (y = x * _));
              } else {
                y = u.lastVelocity == null ? x : u.lastVelocity;
                const p = a.restVelocity || b / 10,
                  _ = a.clamp ? 0 : a.bounce,
                  C = !N.und(_),
                  k = g == h ? u.v0 > 0 : g < h;
                let P,
                  I = !1;
                const L = 1,
                  D = Math.ceil(e / L);
                for (
                  let v = 0;
                  v < D &&
                  ((P = Math.abs(y) > p),
                  !(!P && ((f = Math.abs(h - d) <= b), f)));
                  ++v
                ) {
                  C &&
                    ((I = d == h || d > h == k), I && ((y = -y * _), (d = h)));
                  const R = -a.tension * 1e-6 * (d - h),
                    S = -a.friction * 0.001 * y,
                    A = (R + S) / a.mass;
                  ((y = y + A * L), (d = d + y * L));
                }
              }
            else {
              let p = 1;
              (a.duration > 0 &&
                (this._memoizedDuration !== a.duration &&
                  ((this._memoizedDuration = a.duration),
                  u.durationProgress > 0 &&
                    ((u.elapsedTime = a.duration * u.durationProgress),
                    (m = u.elapsedTime += e))),
                (p = (a.progress || 0) + m / this._memoizedDuration),
                (p = p > 1 ? 1 : p < 0 ? 0 : p),
                (u.durationProgress = p)),
                (d = g + a.easing(p) * (h - g)),
                (y = (d - u.lastPosition) / e),
                (f = p == 1));
            }
            ((u.lastVelocity = y),
              Number.isNaN(d) &&
                (console.warn("Got NaN while animating:", this), (f = !0)));
          }
          (s && !s[l].done && (f = !1),
            f ? (u.done = !0) : (t = !1),
            u.setValue(d, a.round) && (n = !0));
        }));
      const o = Se(this),
        c = o.getValue();
      if (t) {
        const u = ae(r.to);
        ((c !== u || n) && !a.decay
          ? (o.setValue(u), this._onChange(u))
          : n && a.decay && this._onChange(c),
          this._stop());
      } else n && this._onChange(c);
    }
    set(e) {
      return (
        E.batchedUpdates(() => {
          (this._stop(), this._focus(e), this._set(e));
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
      if (Le(this)) {
        const { to: e, config: t } = this.animation;
        E.batchedUpdates(() => {
          (this._onStart(), t.decay || this._set(e, !1), this._stop());
        });
      }
      return this;
    }
    update(e) {
      return ((this.queue || (this.queue = [])).push(e), this);
    }
    start(e, t) {
      let n;
      return (
        N.und(e)
          ? ((n = this.queue || []), (this.queue = []))
          : (n = [N.obj(e) ? e : { ...t, to: e }]),
        Promise.all(n.map((r) => this._update(r))).then((r) => li(this, r))
      );
    }
    stop(e) {
      const { to: t } = this.animation;
      return (
        this._focus(this.get()),
        Ht(this._state, e && this._lastCallId),
        E.batchedUpdates(() => this._stop(t, e)),
        this
      );
    }
    reset() {
      this._update({ reset: !0 });
    }
    eventObserved(e) {
      e.type == "change"
        ? this._start()
        : e.type == "priority" && (this.priority = e.priority + 1);
    }
    _prepareNode(e) {
      const t = this.key || "";
      let { to: n, from: r } = e;
      ((n = N.obj(n) ? n[t] : n),
        (n == null || kr(n)) && (n = void 0),
        (r = N.obj(r) ? r[t] : r),
        r == null && (r = void 0));
      const i = { to: n, from: r };
      return (
        ir(this) ||
          (e.reverse && ([n, r] = [r, n]),
          (r = ae(r)),
          N.und(r) ? Se(this) || this._set(n) : this._set(r)),
        i
      );
    }
    _update({ ...e }, t) {
      const { key: n, defaultProps: r } = this;
      (e.default &&
        Object.assign(
          r,
          ci(e, (s, o) => (/^on/.test(o) ? es(s, n) : s)),
        ),
        Hi(this, e, "onProps"),
        $t(this, "onProps", e, this));
      const i = this._prepareNode(e);
      if (Object.isFrozen(this))
        throw Error(
          "Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?",
        );
      const a = this._state;
      return rs(++this._lastCallId, {
        key: n,
        props: e,
        defaultProps: r,
        state: a,
        actions: {
          pause: () => {
            Mt(this) ||
              (Vi(this, !0),
              Et(a.pauseQueue),
              $t(this, "onPause", ve(this, St(this, this.animation.to)), this));
          },
          resume: () => {
            Mt(this) &&
              (Vi(this, !1),
              Le(this) && this._resume(),
              Et(a.resumeQueue),
              $t(
                this,
                "onResume",
                ve(this, St(this, this.animation.to)),
                this,
              ));
          },
          start: this._merge.bind(this, i),
        },
      }).then((s) => {
        if (e.loop && s.finished && !(t && s.noop)) {
          const o = us(e);
          if (o) return this._update(o, !0);
        }
        return s;
      });
    }
    _merge(e, t, n) {
      if (t.cancel) return (this.stop(!0), n(ot(this)));
      const r = !N.und(e.to),
        i = !N.und(e.from);
      if (r || i)
        if (t.callId > this._lastToId) this._lastToId = t.callId;
        else return n(ot(this));
      const { key: a, defaultProps: s, animation: o } = this,
        { to: c, from: u } = o;
      let { to: l = c, from: h = u } = e;
      (i && !r && (!t.default || N.und(l)) && (l = h),
        t.reverse && ([l, h] = [h, l]));
      const f = !Re(h, u);
      (f && (o.from = h), (h = ae(h)));
      const d = !Re(l, c);
      d && this._focus(l);
      const m = kr(t.to),
        { config: g } = o,
        { decay: x, velocity: y } = g;
      ((r || i) && (g.velocity = 0),
        t.config &&
          !m &&
          tu(
            g,
            He(t.config, a),
            t.config !== s.config ? He(s.config, a) : void 0,
          ));
      let b = Se(this);
      if (!b || N.und(l)) return n(ve(this, !0));
      const p = N.und(t.reset) ? i && !t.default : !N.und(h) && Lt(t.reset, a),
        _ = p ? h : this.get(),
        C = qt(l),
        k = N.num(C) || N.arr(C) || qn(C),
        P = !m && (!k || Lt(s.immediate || t.immediate, a));
      if (d) {
        const v = $r(l);
        if (v !== b.constructor)
          if (P) b = this._set(C);
          else
            throw Error(
              `Cannot animate between ${b.constructor.name} and ${v.name}, as the "to" prop suggests`,
            );
      }
      const I = b.constructor;
      let L = me(l),
        D = !1;
      if (!L) {
        const v = p || (!ir(this) && f);
        ((d || v) && ((D = Re(qt(_), C)), (L = !D)),
          ((!Re(o.immediate, P) && !P) ||
            !Re(g.decay, x) ||
            !Re(g.velocity, y)) &&
            (L = !0));
      }
      if (
        (D && Le(this) && (o.changed && !p ? (L = !0) : L || this._stop(c)),
        !m &&
          ((L || me(c)) &&
            ((o.values = b.getPayload()),
            (o.toValues = me(l) ? null : I == Vt ? [1] : he(C))),
          o.immediate != P && ((o.immediate = P), !P && !p && this._set(c)),
          L))
      ) {
        const { onRest: v } = o;
        O(au, (S) => Hi(this, t, S));
        const R = ve(this, St(this, c));
        (Et(this._pendingCalls, R),
          this._pendingCalls.add(n),
          o.changed &&
            E.batchedUpdates(() => {
              ((o.changed = !p),
                v?.(R, this),
                p ? He(s.onRest, R) : o.onStart?.(R, this));
            }));
      }
      (p && this._set(_),
        m
          ? n(as(t.to, t, this._state, this))
          : L
            ? this._start()
            : Le(this) && !d
              ? this._pendingCalls.add(n)
              : n(is(_)));
    }
    _focus(e) {
      const t = this.animation;
      e !== t.to &&
        (Ei(this) && this._detach(), (t.to = e), Ei(this) && this._attach());
    }
    _attach() {
      let e = 0;
      const { to: t } = this.animation;
      (me(t) && (xt(t, this), Pr(t) && (e = t.priority + 1)),
        (this.priority = e));
    }
    _detach() {
      const { to: e } = this.animation;
      me(e) && zt(e, this);
    }
    _set(e, t = !0) {
      const n = ae(e);
      if (!N.und(n)) {
        const r = Se(this);
        if (!r || !Re(n, r.getValue())) {
          const i = $r(n);
          (!r || r.constructor != i ? ui(this, i.create(n)) : r.setValue(n),
            r &&
              E.batchedUpdates(() => {
                this._onChange(n, t);
              }));
        }
      }
      return Se(this);
    }
    _onStart() {
      const e = this.animation;
      e.changed ||
        ((e.changed = !0), $t(this, "onStart", ve(this, St(this, e.to)), this));
    }
    _onChange(e, t) {
      (t || (this._onStart(), He(this.animation.onChange, e, this)),
        He(this.defaultProps.onChange, e, this),
        super._onChange(e, t));
    }
    _start() {
      const e = this.animation;
      (Se(this).reset(ae(e.to)),
        e.immediate || (e.fromValues = e.values.map((t) => t.lastPosition)),
        Le(this) || (Bi(this, !0), Mt(this) || this._resume()));
    }
    _resume() {
      Ne.skipAnimation ? this.finish() : zn.start(this);
    }
    _stop(e, t) {
      if (Le(this)) {
        Bi(this, !1);
        const n = this.animation;
        (O(n.values, (i) => {
          i.done = !0;
        }),
          n.toValues && (n.onChange = n.onPause = n.onResume = void 0),
          jt(this, { type: "idle", parent: this }));
        const r = t ? ot(this.get()) : ve(this.get(), St(this, e ?? n.to));
        (Et(this._pendingCalls, r),
          n.changed && ((n.changed = !1), $t(this, "onRest", r, this)));
      }
    }
  };
function St(e, t) {
  const n = qt(t),
    r = qt(e.get());
  return Re(r, n);
}
function us(e, t = e.loop, n = e.to) {
  const r = He(t);
  if (r) {
    const i = r !== !0 && ns(r),
      a = (i || e).reverse,
      s = !i || i.reset;
    return Yt({
      ...e,
      loop: t,
      default: !1,
      pause: void 0,
      to: !a || kr(n) ? n : void 0,
      from: s ? e.from : void 0,
      reset: s,
      ...i,
    });
  }
}
function Yt(e) {
  const { to: t, from: n } = (e = ns(e)),
    r = new Set();
  return (
    N.obj(t) && qi(t, r),
    N.obj(n) && qi(n, r),
    (e.keys = r.size ? Array.from(r) : null),
    e
  );
}
function iu(e) {
  const t = Yt(e);
  return (N.und(t.default) && (t.default = ci(t)), t);
}
function qi(e, t) {
  Te(e, (n, r) => n != null && t.add(r));
}
var au = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Hi(e, t, n) {
  e.animation[n] = t[n] !== ts(t, n) ? es(t[n], e.key) : void 0;
}
function $t(e, t, ...n) {
  (e.animation[t]?.(...n), e.defaultProps[t]?.(...n));
}
var su = ["onStart", "onChange", "onRest"],
  ou = 1,
  uu = class {
    constructor(e, t) {
      ((this.id = ou++),
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
        t && (this._flush = t),
        e && this.start({ default: !0, ...e }));
    }
    get idle() {
      return (
        !this._state.asyncTo &&
        Object.values(this.springs).every(
          (e) => e.idle && !e.isDelayed && !e.isPaused,
        )
      );
    }
    get item() {
      return this._item;
    }
    set item(e) {
      this._item = e;
    }
    get() {
      const e = {};
      return (this.each((t, n) => (e[n] = t.get())), e);
    }
    set(e) {
      for (const t in e) {
        const n = e[t];
        N.und(n) || this.springs[t].set(n);
      }
    }
    update(e) {
      return (e && this.queue.push(Yt(e)), this);
    }
    start(e) {
      let { queue: t } = this;
      return (
        e ? (t = he(e).map(Yt)) : (this.queue = []),
        this._flush ? this._flush(this, t) : (ds(this, t), Rr(this, t))
      );
    }
    stop(e, t) {
      if ((e !== !!e && (t = e), t)) {
        const n = this.springs;
        O(he(t), (r) => n[r].stop(!!e));
      } else
        (Ht(this._state, this._lastAsyncId), this.each((n) => n.stop(!!e)));
      return this;
    }
    pause(e) {
      if (N.und(e)) this.start({ pause: !0 });
      else {
        const t = this.springs;
        O(he(e), (n) => t[n].pause());
      }
      return this;
    }
    resume(e) {
      if (N.und(e)) this.start({ pause: !1 });
      else {
        const t = this.springs;
        O(he(e), (n) => t[n].resume());
      }
      return this;
    }
    each(e) {
      Te(this.springs, e);
    }
    _onFrame() {
      const { onStart: e, onChange: t, onRest: n } = this._events,
        r = this._active.size > 0,
        i = this._changed.size > 0;
      ((r && !this._started) || (i && !this._started)) &&
        ((this._started = !0),
        Rt(e, ([o, c]) => {
          ((c.value = this.get()), o(c, this, this._item));
        }));
      const a = !r && this._started,
        s = i || (a && n.size) ? this.get() : null;
      (i &&
        t.size &&
        Rt(t, ([o, c]) => {
          ((c.value = s), o(c, this, this._item));
        }),
        a &&
          ((this._started = !1),
          Rt(n, ([o, c]) => {
            ((c.value = s), o(c, this, this._item));
          })));
    }
    eventObserved(e) {
      if (e.type == "change")
        (this._changed.add(e.parent), e.idle || this._active.add(e.parent));
      else if (e.type == "idle") this._active.delete(e.parent);
      else return;
      E.onFrame(this._onFrame);
    }
  };
function Rr(e, t) {
  return Promise.all(t.map((n) => cs(e, n))).then((n) => li(e, n));
}
async function cs(e, t, n) {
  const { keys: r, to: i, from: a, loop: s, onRest: o, onResolve: c } = t,
    u = N.obj(t.default) && t.default;
  (s && (t.loop = !1), i === !1 && (t.to = null), a === !1 && (t.from = null));
  const l = N.arr(i) || N.fun(i) ? i : void 0;
  l
    ? ((t.to = void 0), (t.onRest = void 0), u && (u.onRest = void 0))
    : O(su, (g) => {
        const x = t[g];
        if (N.fun(x)) {
          const y = e._events[g];
          ((t[g] = ({ finished: b, cancelled: p }) => {
            const _ = y.get(x);
            _
              ? (b || (_.finished = !1), p && (_.cancelled = !0))
              : y.set(x, {
                  value: null,
                  finished: b || !1,
                  cancelled: p || !1,
                });
          }),
            u && (u[g] = t[g]));
        }
      });
  const h = e._state;
  t.pause === !h.paused
    ? ((h.paused = t.pause), Et(t.pause ? h.pauseQueue : h.resumeQueue))
    : h.paused && (t.pause = !0);
  const f = (r || Object.keys(e.springs)).map((g) => e.springs[g].start(t)),
    d = t.cancel === !0 || ts(t, "cancel") === !0;
  ((l || (d && h.asyncId)) &&
    f.push(
      rs(++e._lastAsyncId, {
        props: t,
        state: h,
        actions: {
          pause: Mr,
          resume: Mr,
          start(g, x) {
            d
              ? (Ht(h, e._lastAsyncId), x(ot(e)))
              : ((g.onRest = o), x(as(l, g, h, e)));
          },
        },
      }),
    ),
    h.paused &&
      (await new Promise((g) => {
        h.resumeQueue.add(g);
      })));
  const m = li(e, await Promise.all(f));
  if (s && m.finished && !(n && m.noop)) {
    const g = us(t, s, i);
    if (g) return (ds(e, [g]), cs(e, g, !0));
  }
  return (c && E.batchedUpdates(() => c(m, e, e.item)), m);
}
function Yi(e, t) {
  const n = { ...e.springs };
  return (
    t &&
      O(he(t), (r) => {
        (N.und(r.keys) && (r = Yt(r)),
          N.obj(r.to) || (r = { ...r, to: void 0 }),
          fs(n, r, (i) => hs(i)));
      }),
    ls(e, n),
    n
  );
}
function ls(e, t) {
  Te(t, (n, r) => {
    e.springs[r] || ((e.springs[r] = n), xt(n, e));
  });
}
function hs(e, t) {
  const n = new os();
  return ((n.key = e), t && xt(n, t), n);
}
function fs(e, t, n) {
  t.keys &&
    O(t.keys, (r) => {
      (e[r] || (e[r] = n(r)))._prepareNode(t);
    });
}
function ds(e, t) {
  O(t, (n) => {
    fs(e.springs, n, (r) => hs(r, e));
  });
}
var Wn = ({ children: e, ...t }) => {
    const n = T.useContext(Sn),
      r = t.pause || !!n.pause,
      i = t.immediate || !!n.immediate;
    t = Do(() => ({ pause: r, immediate: i }), [r, i]);
    const { Provider: a } = Sn;
    return Zr.createElement(a, { value: t }, e);
  },
  Sn = cu(Wn, {});
Wn.Provider = Sn.Provider;
Wn.Consumer = Sn.Consumer;
function cu(e, t) {
  return (
    Object.assign(e, Zr.createContext(t)),
    (e.Provider._context = e),
    (e.Consumer._context = e),
    e
  );
}
var lu = () => {
  const e = [],
    t = function (r) {
      Lo();
      const i = [];
      return (
        O(e, (a, s) => {
          if (N.und(r)) i.push(a.start());
          else {
            const o = n(r, a, s);
            o && i.push(a.start(o));
          }
        }),
        i
      );
    };
  ((t.current = e),
    (t.add = function (r) {
      e.includes(r) || e.push(r);
    }),
    (t.delete = function (r) {
      const i = e.indexOf(r);
      ~i && e.splice(i, 1);
    }),
    (t.pause = function () {
      return (O(e, (r) => r.pause(...arguments)), this);
    }),
    (t.resume = function () {
      return (O(e, (r) => r.resume(...arguments)), this);
    }),
    (t.set = function (r) {
      O(e, (i, a) => {
        const s = N.fun(r) ? r(a, i) : r;
        s && i.set(s);
      });
    }),
    (t.start = function (r) {
      const i = [];
      return (
        O(e, (a, s) => {
          if (N.und(r)) i.push(a.start());
          else {
            const o = this._getProps(r, a, s);
            o && i.push(a.start(o));
          }
        }),
        i
      );
    }),
    (t.stop = function () {
      return (O(e, (r) => r.stop(...arguments)), this);
    }),
    (t.update = function (r) {
      return (O(e, (i, a) => i.update(this._getProps(r, i, a))), this);
    }));
  const n = function (r, i, a) {
    return N.fun(r) ? r(a, i) : r;
  };
  return ((t._getProps = n), t);
};
function hu(e, t, n) {
  const r = N.fun(t) && t;
  r && !n && (n = []);
  const i = T.useMemo(() => (r || arguments.length == 3 ? lu() : void 0), []),
    a = T.useRef(0),
    s = Xa(),
    o = T.useMemo(
      () => ({
        ctrls: [],
        queue: [],
        flush(y, b) {
          const p = Yi(y, b);
          return a.current > 0 &&
            !o.queue.length &&
            !Object.keys(p).some((C) => !y.springs[C])
            ? Rr(y, b)
            : new Promise((C) => {
                (ls(y, p),
                  o.queue.push(() => {
                    C(Rr(y, b));
                  }),
                  s());
              });
        },
      }),
      [],
    ),
    c = T.useRef([...o.ctrls]),
    u = [],
    l = Ii(e) || 0;
  (T.useMemo(() => {
    (O(c.current.slice(e, l), (y) => {
      (Zo(y, i), y.stop(!0));
    }),
      (c.current.length = e),
      h(l, e));
  }, [e]),
    T.useMemo(() => {
      h(0, Math.min(l, e));
    }, n));
  function h(y, b) {
    for (let p = y; p < b; p++) {
      const _ = c.current[p] || (c.current[p] = new uu(null, o.flush)),
        C = r ? r(p, _) : t[p];
      C && (u[p] = iu(C));
    }
  }
  const f = c.current.map((y, b) => Yi(y, u[b])),
    d = T.useContext(Wn),
    m = Ii(d),
    g = d !== m && Xo(d);
  (oi(() => {
    (a.current++, (o.ctrls = c.current));
    const { queue: y } = o;
    (y.length && ((o.queue = []), O(y, (b) => b())),
      O(c.current, (b, p) => {
        (i?.add(b), g && b.start({ default: d }));
        const _ = u[p];
        _ && (Ko(b, _.ref), b.ref ? b.queue.push(_) : b.start(_));
      }));
  }),
    Za(() => () => {
      O(o.ctrls, (y) => y.stop(!0));
    }));
  const x = f.map((y) => ({ ...y }));
  return i ? [x, i] : x;
}
function Gn(e, t) {
  const n = N.fun(e),
    [[r], i] = hu(1, n ? e : [e], n ? [] : t);
  return n || arguments.length == 2 ? [r, i] : r;
}
var ms = class extends hi {
  constructor(e, t) {
    (super(),
      (this.source = e),
      (this.idle = !0),
      (this._active = new Set()),
      (this.calc = Ut(...t)));
    const n = this._get(),
      r = $r(n);
    ui(this, r.create(n));
  }
  advance(e) {
    const t = this._get(),
      n = this.get();
    (Re(t, n) || (Se(this).setValue(t), this._onChange(t, this.idle)),
      !this.idle && Wi(this._active) && ar(this));
  }
  _get() {
    const e = N.arr(this.source) ? this.source.map(ae) : he(ae(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle &&
      !Wi(this._active) &&
      ((this.idle = !1),
      O(Hn(this), (e) => {
        e.done = !1;
      }),
      Ne.skipAnimation
        ? (E.batchedUpdates(() => this.advance()), ar(this))
        : zn.start(this));
  }
  _attach() {
    let e = 1;
    (O(he(this.source), (t) => {
      (me(t) && xt(t, this),
        Pr(t) &&
          (t.idle || this._active.add(t), (e = Math.max(e, t.priority + 1))));
    }),
      (this.priority = e),
      this._start());
  }
  _detach() {
    (O(he(this.source), (e) => {
      me(e) && zt(e, this);
    }),
      this._active.clear(),
      ar(this));
  }
  eventObserved(e) {
    e.type == "change"
      ? e.idle
        ? this.advance()
        : (this._active.add(e.parent), this._start())
      : e.type == "idle"
        ? this._active.delete(e.parent)
        : e.type == "priority" &&
          (this.priority = he(this.source).reduce(
            (t, n) => Math.max(t, (Pr(n) ? n.priority : 0) + 1),
            0,
          ));
  }
};
function fu(e) {
  return e.idle !== !1;
}
function Wi(e) {
  return !e.size || Array.from(e).every(fu);
}
function ar(e) {
  e.idle ||
    ((e.idle = !0),
    O(Hn(e), (t) => {
      t.done = !0;
    }),
    jt(e, { type: "idle", parent: e }));
}
var du = (e, ...t) => new ms(e, t);
Ne.assign({ createStringInterpolator: Ga, to: (e, t) => new ms(e, t) });
var gs = /^--/;
function mu(e, t) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : typeof t == "number" &&
        t !== 0 &&
        !gs.test(e) &&
        !(Ft.hasOwnProperty(e) && Ft[e])
      ? t + "px"
      : ("" + t).trim();
}
var Gi = {};
function gu(e, t) {
  if (!e.nodeType || !e.setAttribute) return !1;
  const n =
      e.nodeName === "filter" ||
      (e.parentNode && e.parentNode.nodeName === "filter"),
    {
      className: r,
      style: i,
      children: a,
      scrollTop: s,
      scrollLeft: o,
      viewBox: c,
      ...u
    } = t,
    l = Object.values(u),
    h = Object.keys(u).map((f) =>
      n || e.hasAttribute(f)
        ? f
        : Gi[f] ||
          (Gi[f] = f.replace(/([A-Z])/g, (d) => "-" + d.toLowerCase())),
    );
  a !== void 0 && (e.textContent = a);
  for (const f in i)
    if (i.hasOwnProperty(f)) {
      const d = mu(f, i[f]);
      gs.test(f) ? e.style.setProperty(f, d) : (e.style[f] = d);
    }
  (h.forEach((f, d) => {
    e.setAttribute(f, l[d]);
  }),
    r !== void 0 && (e.className = r),
    s !== void 0 && (e.scrollTop = s),
    o !== void 0 && (e.scrollLeft = o),
    c !== void 0 && e.setAttribute("viewBox", c));
}
var Ft = {
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
  yu = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1),
  pu = ["Webkit", "Ms", "Moz", "O"];
Ft = Object.keys(Ft).reduce(
  (e, t) => (pu.forEach((n) => (e[yu(n, t)] = e[t])), e),
  Ft,
);
var xu = /^(matrix|translate|scale|rotate|skew)/,
  bu = /^(translate)/,
  vu = /^(rotate|skew)/,
  sr = (e, t) => (N.num(e) && e !== 0 ? e + t : e),
  vn = (e, t) =>
    N.arr(e)
      ? e.every((n) => vn(n, t))
      : N.num(e)
        ? e === t
        : parseFloat(e) === t,
  wu = class extends Yn {
    constructor({ x: e, y: t, z: n, ...r }) {
      const i = [],
        a = [];
      ((e || t || n) &&
        (i.push([e || 0, t || 0, n || 0]),
        a.push((s) => [
          `translate3d(${s.map((o) => sr(o, "px")).join(",")})`,
          vn(s, 0),
        ])),
        Te(r, (s, o) => {
          if (o === "transform")
            (i.push([s || ""]), a.push((c) => [c, c === ""]));
          else if (xu.test(o)) {
            if ((delete r[o], N.und(s))) return;
            const c = bu.test(o) ? "px" : vu.test(o) ? "deg" : "";
            (i.push(he(s)),
              a.push(
                o === "rotate3d"
                  ? ([u, l, h, f]) => [
                      `rotate3d(${u},${l},${h},${sr(f, c)})`,
                      vn(f, 0),
                    ]
                  : (u) => [
                      `${o}(${u.map((l) => sr(l, c)).join(",")})`,
                      vn(u, o.startsWith("scale") ? 1 : 0),
                    ],
              ));
          }
        }),
        i.length && (r.transform = new _u(i, a)),
        super(r));
    }
  },
  _u = class extends Ha {
    constructor(e, t) {
      (super(), (this.inputs = e), (this.transforms = t), (this._value = null));
    }
    get() {
      return this._value || (this._value = this._get());
    }
    _get() {
      let e = "",
        t = !0;
      return (
        O(this.inputs, (n, r) => {
          const i = ae(n[0]),
            [a, s] = this.transforms[r](N.arr(i) ? i : n.map(ae));
          ((e += " " + a), (t = t && s));
        }),
        t ? "none" : e
      );
    }
    observerAdded(e) {
      e == 1 && O(this.inputs, (t) => O(t, (n) => me(n) && xt(n, this)));
    }
    observerRemoved(e) {
      e == 0 && O(this.inputs, (t) => O(t, (n) => me(n) && zt(n, this)));
    }
    eventObserved(e) {
      (e.type == "change" && (this._value = null), jt(this, e));
    }
  },
  Nu = [
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
Ne.assign({
  batchedUpdates: ro.unstable_batchedUpdates,
  createStringInterpolator: Ga,
  colors: fo,
});
var Cu = Ho(Nu, {
    applyAnimatedValues: gu,
    createAnimatedStyle: (e) => new wu(e),
    getComponentProps: ({ scrollTop: e, scrollLeft: t, ...n }) => n,
  }),
  $e = Cu.animated;
const Mu = ["cx", "cy", "r", "stroke", "strokeWidth", "fill"];
function Su(e) {
  const t = {};
  for (const n of Mu) {
    const r = e[n];
    r != null && (typeof r == "number" || typeof r == "string") && (t[n] = r);
  }
  return t;
}
const $u = function (e) {
    const { animated: t, x: n, y: r, ...i } = e,
      a = { ...i, cx: n, cy: r },
      s = Su(a),
      o = Gn({ ...s, config: { duration: 500 } });
    return t
      ? M.jsx($e.circle, { className: "node-shape", ...a, ...o })
      : M.jsx($e.circle, { className: "node-shape", ...a });
  },
  ku = ["d", "stroke", "strokeWidth"];
function Tu(e) {
  const t = {};
  for (const n of ku) {
    const r = e[n];
    r != null && (typeof r == "number" || typeof r == "string") && (t[n] = r);
  }
  return t;
}
function Qn(e) {
  const { animated: t, ...n } = e,
    r = Tu(n),
    i = Gn({ ...r, config: { duration: 500 } });
  return t ? M.jsx($e.path, { ...n, ...i }) : M.jsx($e.path, { ...n });
}
function Qi(e, t) {
  return e - t / 2;
}
const Pu = ["rx", "ry", "x", "y", "width", "height", "stroke", "strokeWidth"];
function Au(e) {
  const t = {};
  for (const n of Pu) {
    const r = e[n];
    r != null && (typeof r == "number" || typeof r == "string") && (t[n] = r);
  }
  return t;
}
const Eu = function (e) {
    const { x: t, y: n, width: r, height: i, ...a } = e,
      s = Qi(t, r),
      o = Qi(n, i),
      c = { ...a, x: s, y: o, width: r, height: i };
    return M.jsx(fi, { ...c });
  },
  fi = function (e) {
    const { animated: t, ...n } = e,
      r = Au(n),
      i = Gn({ ...r, config: { duration: 500 } });
    return t
      ? M.jsx($e.rect, { className: "node-shape", ...n, ...i })
      : M.jsx($e.rect, { className: "node-shape", ...n });
  },
  or = (e) => e instanceof os;
function Xi(e, t, n) {
  return or(e) || or(t) || or(n)
    ? du([e, t, n], (r, i, a) => `translate(${r},${i}) rotate(${a})`)
    : `translate(${e},${t}) rotate(${n})`;
}
function ys(e) {
  const {
      alignmentBaseline: t,
      textAnchor: n,
      rotation: r,
      x: i,
      y: a,
      text: s,
      d: o,
      animated: c,
      ...u
    } = e,
    l = Gn({ x: i, y: a, rotation: r, config: { duration: 500 } });
  if (c) {
    const h = Xi(l.x, l.y, l.rotation);
    return M.jsxs("g", {
      children: [
        M.jsx($e.text, {
          alignmentBaseline: t,
          textAnchor: n,
          transform: h,
          ...u,
          children: s,
        }),
        o
          ? M.jsx($e.path, {
              strokeWidth: 1,
              stroke: "grey",
              strokeDasharray: "2",
              d: o,
            })
          : null,
      ],
    });
  } else {
    const h = Xi(i, a, r);
    return M.jsxs("g", {
      children: [
        M.jsx($e.text, {
          alignmentBaseline: t,
          textAnchor: n,
          transform: h,
          ...u,
          children: s,
        }),
        o
          ? M.jsx($e.path, {
              strokeWidth: 1,
              stroke: "grey",
              strokeDasharray: "2",
              d: o,
            })
          : null,
      ],
    });
  }
}
const Ru = (e) => ({ ...e, x: 0, y: 0 }),
  Ie = T.createContext(Ru),
  ps = {
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
function wn(e, t) {
  return e == null || t == null
    ? NaN
    : e < t
      ? -1
      : e > t
        ? 1
        : e >= t
          ? 0
          : NaN;
}
function Iu(e, t) {
  return e == null || t == null
    ? NaN
    : t < e
      ? -1
      : t > e
        ? 1
        : t >= e
          ? 0
          : NaN;
}
function xs(e) {
  let t, n, r;
  e.length !== 2
    ? ((t = wn), (n = (o, c) => wn(e(o), c)), (r = (o, c) => e(o) - c))
    : ((t = e === wn || e === Iu ? e : Lu), (n = e), (r = e));
  function i(o, c, u = 0, l = o.length) {
    if (u < l) {
      if (t(c, c) !== 0) return l;
      do {
        const h = (u + l) >>> 1;
        n(o[h], c) < 0 ? (u = h + 1) : (l = h);
      } while (u < l);
    }
    return u;
  }
  function a(o, c, u = 0, l = o.length) {
    if (u < l) {
      if (t(c, c) !== 0) return l;
      do {
        const h = (u + l) >>> 1;
        n(o[h], c) <= 0 ? (u = h + 1) : (l = h);
      } while (u < l);
    }
    return u;
  }
  function s(o, c, u = 0, l = o.length) {
    const h = i(o, c, u, l - 1);
    return h > u && r(o[h - 1], c) > -r(o[h], c) ? h - 1 : h;
  }
  return { left: i, center: s, right: a };
}
function Lu() {
  return 0;
}
function Fu(e) {
  return e === null ? NaN : +e;
}
const Du = xs(wn),
  Uu = Du.right;
xs(Fu).center;
function lt(e, t) {
  let n, r;
  if (t === void 0)
    for (const i of e)
      i != null &&
        (n === void 0
          ? i >= i && (n = r = i)
          : (n > i && (n = i), r < i && (r = i)));
  else {
    let i = -1;
    for (let a of e)
      (a = t(a, ++i, e)) != null &&
        (n === void 0
          ? a >= a && (n = r = a)
          : (n > a && (n = a), r < a && (r = a)));
  }
  return [n, r];
}
const Ou = Math.sqrt(50),
  ju = Math.sqrt(10),
  zu = Math.sqrt(2);
function $n(e, t, n) {
  const r = (t - e) / Math.max(0, n),
    i = Math.floor(Math.log10(r)),
    a = r / Math.pow(10, i),
    s = a >= Ou ? 10 : a >= ju ? 5 : a >= zu ? 2 : 1;
  let o, c, u;
  return (
    i < 0
      ? ((u = Math.pow(10, -i) / s),
        (o = Math.round(e * u)),
        (c = Math.round(t * u)),
        o / u < e && ++o,
        c / u > t && --c,
        (u = -u))
      : ((u = Math.pow(10, i) * s),
        (o = Math.round(e / u)),
        (c = Math.round(t / u)),
        o * u < e && ++o,
        c * u > t && --c),
    c < o && 0.5 <= n && n < 2 ? $n(e, t, n * 2) : [o, c, u]
  );
}
function Bu(e, t, n) {
  if (((t = +t), (e = +e), (n = +n), !(n > 0))) return [];
  if (e === t) return [e];
  const r = t < e,
    [i, a, s] = r ? $n(t, e, n) : $n(e, t, n);
  if (!(a >= i)) return [];
  const o = a - i + 1,
    c = new Array(o);
  if (r)
    if (s < 0) for (let u = 0; u < o; ++u) c[u] = (a - u) / -s;
    else for (let u = 0; u < o; ++u) c[u] = (a - u) * s;
  else if (s < 0) for (let u = 0; u < o; ++u) c[u] = (i + u) / -s;
  else for (let u = 0; u < o; ++u) c[u] = (i + u) * s;
  return c;
}
function Ir(e, t, n) {
  return ((t = +t), (e = +e), (n = +n), $n(e, t, n)[2]);
}
function Vu(e, t, n) {
  ((t = +t), (e = +e), (n = +n));
  const r = t < e,
    i = r ? Ir(t, e, n) : Ir(e, t, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function qu(e, t) {
  let n,
    r = -1,
    i = -1;
  if (t === void 0)
    for (const a of e)
      (++i,
        a != null && (n < a || (n === void 0 && a >= a)) && ((n = a), (r = i)));
  else
    for (let a of e)
      (a = t(a, ++i, e)) != null &&
        (n < a || (n === void 0 && a >= a)) &&
        ((n = a), (r = i));
  return r;
}
function di(e, t) {
  let n = 0,
    r = 0;
  if (t === void 0)
    for (let i of e) i != null && (i = +i) >= i && (++n, (r += i));
  else {
    let i = -1;
    for (let a of e)
      (a = t(a, ++i, e)) != null && (a = +a) >= a && (++n, (r += a));
  }
  if (n) return r / n;
}
var V = ((e) => (
  (e.DISCRETE = "DISCRETE"),
  (e.BOOLEAN = "BOOLEAN"),
  (e.NUMERICAL = "NUMERICAL"),
  (e.NUMERICAL_SET = "NUMERICAL_SET"),
  (e.DISCRETE_SET = "DISCRETE_SET"),
  (e.MARKOV_JUMPS = "MARKOV_JUMPS"),
  (e.DENSITIES = "DENSITIES"),
  e
))(V || {});
function Hu(e) {
  const t = e
    .split(/\s*('[^']+'|"[^"]+"|;|\(|\)|,|:|=|\[&|\]|\{|\})\s*/)
    .filter((u) => u.length > 0);
  let n = !0,
    r = "",
    i = !1,
    a = !1,
    s = [],
    o;
  const c = {};
  if (t[0] !== "[&" || t[t.length - 1] !== "]")
    throw new Error(
      "expecting a [& at the start and ] at the end of the annotation",
    );
  for (const u of t)
    if (u === "[&") n = !0;
    else if (u === "=") n = !1;
    else if (u === ",") {
      if (i) continue;
      if (((n = !0), o === void 0)) throw new Error("Empty annotation value");
      c[r] = o;
    } else if (u === "{") (i ? ((a = !0), (s = [])) : (o = []), (i = !0));
    else if (u === "}") a ? ((a = !1), o.push(s)) : (i = !1);
    else if (u === "]") {
      if (o === void 0) throw new Error("Empty annotation value");
      c[r] = o;
    } else {
      let l = u;
      ((l.startsWith('"') || l.startsWith("'")) && (l = l.slice(1)),
        (l.endsWith('"') || l.endsWith("'")) && (l = l.slice(0, -1)),
        n
          ? (r = l.replace(".", "_"))
          : i
            ? a
              ? s.push(l)
              : o.push(l)
            : isNaN(l)
              ? (o = l)
              : (o = parseFloat(l)));
    }
  return c;
}
function Yu(e) {
  if (Array.isArray(e)) {
    if (Array.isArray(e[0])) {
      const i = e;
      if (i.map((a) => a.length === 3).reduce((a, s) => a && s, !0)) {
        const a = i.map(([s, o, c]) => {
          const u = Number(s);
          if (!Number.isFinite(u))
            throw new Error(
              `Expected a markov jump annotation but the first entry ${s} could not be make a number`,
            );
          return { time: u, from: o, to: c };
        });
        return { type: V.MARKOV_JUMPS, value: a };
      } else
        throw Error(
          `Markov jump with dimension ${i[0].length} detected. Expected 3. ${i.map((a) => a.length).join(",")}`,
        );
    }
    const t = e,
      n = t.every((i) => typeof i == "string");
    if (t.every((i) => Number.isFinite(Number(i)))) {
      const i = t.map((a) => Number(a));
      return { type: V.NUMERICAL_SET, value: i };
    }
    return n
      ? { type: V.DISCRETE_SET, value: t.slice() }
      : { type: V.DISCRETE_SET, value: t.map(String) };
  } else if (Wu(e)) {
    const n = Object.entries(e),
      r = n.every(([, a]) => Number.isFinite(Number(a))),
      i = n.every(([, a]) => typeof a == "boolean");
    if (r) {
      const a = {};
      for (const [s, o] of n) {
        const c = Number(o);
        a[s] = c;
      }
      return { type: V.DENSITIES, value: a };
    }
    if (i) {
      const a = n
        .filter(([, s]) => s === !0)
        .map(([s]) => s)
        .sort();
      return { type: V.DISCRETE_SET, value: a };
    }
    throw new Error(
      "Unsupported object value: expected numeric (probabilities) or boolean map",
    );
  } else {
    if (typeof e == "boolean") return { type: V.BOOLEAN, value: e };
    if (typeof e == "number") return { type: V.NUMERICAL, value: e };
    if (typeof e == "string") {
      const t = e.toLowerCase();
      if (t === "true" || t === "false")
        return { type: V.BOOLEAN, value: t === "true" };
      const n = Number(e);
      return Number.isFinite(n)
        ? { type: V.NUMERICAL, value: n }
        : { type: V.DISCRETE, value: e };
    }
  }
  throw new Error(`Unsupported annotation value: ${String(e)}`);
}
function Wu(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Gu(e) {
  switch (e.type) {
    case V.DISCRETE:
      return e.value;
    case V.BOOLEAN:
      return String(e.value);
    case V.NUMERICAL:
      return String(e.value);
    case V.NUMERICAL_SET:
      return "{" + e.value.map((t) => String(t)).join(", ") + "}";
    case V.DISCRETE_SET:
      return "{" + e.value.join(", ") + "}";
    case V.MARKOV_JUMPS:
      return (
        "{" +
        e.value.map((t) => `{${String(t.time)},${t.from},${t.to}}`).join(", ") +
        "}"
      );
    case V.DENSITIES:
      throw new Error(`No defined why to write densities (${e.id}) as a string. 
 Please convert keys and values to separate array annotations.`);
  }
}
var B = ((e) => ((e.Some = "some"), (e.Nothing = "nothing"), e))(B || {});
const Pe = () => ({ type: "nothing" }),
  Xn = (e) => ({ type: "some", value: e }),
  Zi = (e, t) => {
    switch (e.type) {
      case "some":
        return e.value;
      case "nothing":
        throw new Error(t);
    }
  };
function bs(e, t) {
  let n;
  if (t instanceof Object) {
    if (t.type === B.Nothing) return t;
    n = t.value;
  } else n = t;
  const r = e.allNames[n];
  return r === void 0 ? Pe() : Xn(r);
}
function Wt(e, t) {
  let n;
  if (t instanceof Object) {
    if (t.type === B.Nothing) return t;
    n = t.value;
  } else n = t;
  const r = e.byName[n];
  return r === void 0 ? Pe() : Xn(r);
}
function Qu(e, t) {
  return { name: e, number: t, annotations: {} };
}
class sn {
  _data;
  constructor(t) {
    this._data = t || { allNames: [], byName: {}, finalized: !1 };
  }
  lockTaxa() {
    return (this._data.finalized || (this._data.finalized = !0), this);
  }
  addTaxon(t) {
    if (this._data.finalized)
      throw new Error("Cannot add taxon to finalized set");
    let n;
    if (typeof t == "string") {
      const r = t;
      if (Object.prototype.hasOwnProperty.call(this._data.byName, r))
        throw new Error(
          `taxon ${r} already exists in the set. Names must be unique`,
        );
      n = Qu(r, this._data.allNames.length);
    } else {
      if (
        ((n = t),
        Object.prototype.hasOwnProperty.call(this._data.byName, n.name))
      )
        throw new Error(
          `taxon ${n.name} already exists in the set. Names must be unique`,
        );
      if (
        this._data.allNames[n.number] &&
        this._data.allNames[n.number] !== n.name
      )
        throw new Error(
          `taxon number ${n.number} already exists in the set with name ${this._data.allNames[n.number]}. Taxon numbers must be unique`,
        );
      console.log("Adding existing taxon:", n.name);
    }
    return (
      (this._data.allNames[n.number] = n.name),
      (this._data.byName[n.name] = n),
      this
    );
  }
  getTaxon(t) {
    const n = Wt(this._data, bs(this._data, t));
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error(`Taxon by name ${t} not found`);
    }
  }
  getTaxonByName(t) {
    const n = Wt(this._data, t);
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error(`Taxon by name ${t} not found`);
    }
  }
  hasTaxon(t) {
    return Object.prototype.hasOwnProperty.call(this._data.byName, t);
  }
  getTaxonCount() {
    return this._data.allNames.length;
  }
  get isFinalized() {
    return this._data.finalized;
  }
}
const ur = new Date(),
  cr = new Date();
function Ae(e, t, n, r) {
  function i(a) {
    return (e((a = arguments.length === 0 ? new Date() : new Date(+a))), a);
  }
  return (
    (i.floor = (a) => (e((a = new Date(+a))), a)),
    (i.ceil = (a) => (e((a = new Date(a - 1))), t(a, 1), e(a), a)),
    (i.round = (a) => {
      const s = i(a),
        o = i.ceil(a);
      return a - s < o - a ? s : o;
    }),
    (i.offset = (a, s) => (
      t((a = new Date(+a)), s == null ? 1 : Math.floor(s)),
      a
    )),
    (i.range = (a, s, o) => {
      const c = [];
      if (
        ((a = i.ceil(a)),
        (o = o == null ? 1 : Math.floor(o)),
        !(a < s) || !(o > 0))
      )
        return c;
      let u;
      do (c.push((u = new Date(+a))), t(a, o), e(a));
      while (u < a && a < s);
      return c;
    }),
    (i.filter = (a) =>
      Ae(
        (s) => {
          if (s >= s) for (; e(s), !a(s); ) s.setTime(s - 1);
        },
        (s, o) => {
          if (s >= s)
            if (o < 0) for (; ++o <= 0; ) for (; t(s, -1), !a(s); );
            else for (; --o >= 0; ) for (; t(s, 1), !a(s); );
        },
      )),
    n &&
      ((i.count = (a, s) => (
        ur.setTime(+a),
        cr.setTime(+s),
        e(ur),
        e(cr),
        Math.floor(n(ur, cr))
      )),
      (i.every = (a) => (
        (a = Math.floor(a)),
        !isFinite(a) || !(a > 0)
          ? null
          : a > 1
            ? i.filter(
                r ? (s) => r(s) % a === 0 : (s) => i.count(0, s) % a === 0,
              )
            : i
      ))),
    i
  );
}
const Xu = 1e3,
  mi = Xu * 60,
  Zu = mi * 60,
  Gt = Zu * 24,
  vs = Gt * 7,
  gi = Ae(
    (e) => e.setHours(0, 0, 0, 0),
    (e, t) => e.setDate(e.getDate() + t),
    (e, t) =>
      (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * mi) / Gt,
    (e) => e.getDate() - 1,
  );
gi.range;
const yi = Ae(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Gt,
  (e) => e.getUTCDate() - 1,
);
yi.range;
const Ku = Ae(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Gt,
  (e) => Math.floor(e / Gt),
);
Ku.range;
function et(e) {
  return Ae(
    (t) => {
      (t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)),
        t.setHours(0, 0, 0, 0));
    },
    (t, n) => {
      t.setDate(t.getDate() + n * 7);
    },
    (t, n) =>
      (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * mi) / vs,
  );
}
const ws = et(0),
  kn = et(1),
  Ju = et(2),
  ec = et(3),
  ht = et(4),
  tc = et(5),
  nc = et(6);
ws.range;
kn.range;
Ju.range;
ec.range;
ht.range;
tc.range;
nc.range;
function tt(e) {
  return Ae(
    (t) => {
      (t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)),
        t.setUTCHours(0, 0, 0, 0));
    },
    (t, n) => {
      t.setUTCDate(t.getUTCDate() + n * 7);
    },
    (t, n) => (n - t) / vs,
  );
}
const _s = tt(0),
  Tn = tt(1),
  rc = tt(2),
  ic = tt(3),
  ft = tt(4),
  ac = tt(5),
  sc = tt(6);
_s.range;
Tn.range;
rc.range;
ic.range;
ft.range;
ac.range;
sc.range;
const Xe = Ae(
  (e) => {
    (e.setMonth(0, 1), e.setHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setFullYear(e.getFullYear() + t);
  },
  (e, t) => t.getFullYear() - e.getFullYear(),
  (e) => e.getFullYear(),
);
Xe.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : Ae(
        (t) => {
          (t.setFullYear(Math.floor(t.getFullYear() / e) * e),
            t.setMonth(0, 1),
            t.setHours(0, 0, 0, 0));
        },
        (t, n) => {
          t.setFullYear(t.getFullYear() + n * e);
        },
      );
Xe.range;
const Ze = Ae(
  (e) => {
    (e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t);
  },
  (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
  (e) => e.getUTCFullYear(),
);
Ze.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : Ae(
        (t) => {
          (t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
            t.setUTCMonth(0, 1),
            t.setUTCHours(0, 0, 0, 0));
        },
        (t, n) => {
          t.setUTCFullYear(t.getUTCFullYear() + n * e);
        },
      );
Ze.range;
function lr(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return (t.setFullYear(e.y), t);
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function hr(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return (t.setUTCFullYear(e.y), t);
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function kt(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function oc(e) {
  var t = e.dateTime,
    n = e.date,
    r = e.time,
    i = e.periods,
    a = e.days,
    s = e.shortDays,
    o = e.months,
    c = e.shortMonths,
    u = Tt(i),
    l = Pt(i),
    h = Tt(a),
    f = Pt(a),
    d = Tt(s),
    m = Pt(s),
    g = Tt(o),
    x = Pt(o),
    y = Tt(c),
    b = Pt(c),
    p = {
      a: z,
      A: W,
      b: G,
      B: xe,
      c: null,
      d: ra,
      e: ra,
      f: Pc,
      g: jc,
      G: Bc,
      H: $c,
      I: kc,
      j: Tc,
      L: Ns,
      m: Ac,
      M: Ec,
      p: Ce,
      q: te,
      Q: sa,
      s: oa,
      S: Rc,
      u: Ic,
      U: Lc,
      V: Fc,
      w: Dc,
      W: Uc,
      x: null,
      X: null,
      y: Oc,
      Y: zc,
      Z: Vc,
      "%": aa,
    },
    _ = {
      a: je,
      A: wt,
      b: be,
      B: _t,
      c: null,
      d: ia,
      e: ia,
      f: Wc,
      g: rl,
      G: al,
      H: qc,
      I: Hc,
      j: Yc,
      L: Ms,
      m: Gc,
      M: Qc,
      p: Nt,
      q: Ct,
      Q: sa,
      s: oa,
      S: Xc,
      u: Zc,
      U: Kc,
      V: Jc,
      w: el,
      W: tl,
      x: null,
      X: null,
      y: nl,
      Y: il,
      Z: sl,
      "%": aa,
    },
    C = {
      a: D,
      A: v,
      b: R,
      B: S,
      c: A,
      d: ta,
      e: ta,
      f: Nc,
      g: ea,
      G: Ji,
      H: na,
      I: na,
      j: bc,
      L: _c,
      m: xc,
      M: vc,
      p: L,
      q: pc,
      Q: Mc,
      s: Sc,
      S: wc,
      u: fc,
      U: dc,
      V: mc,
      w: hc,
      W: gc,
      x: K,
      X: Y,
      y: ea,
      Y: Ji,
      Z: yc,
      "%": Cc,
    };
  ((p.x = k(n, p)),
    (p.X = k(r, p)),
    (p.c = k(t, p)),
    (_.x = k(n, _)),
    (_.X = k(r, _)),
    (_.c = k(t, _)));
  function k($, F) {
    return function (U) {
      var w = [],
        ne = -1,
        q = 0,
        ue = $.length,
        ce,
        ze,
        $i;
      for (U instanceof Date || (U = new Date(+U)); ++ne < ue; )
        $.charCodeAt(ne) === 37 &&
          (w.push($.slice(q, ne)),
          (ze = Ki[(ce = $.charAt(++ne))]) != null
            ? (ce = $.charAt(++ne))
            : (ze = ce === "e" ? " " : "0"),
          ($i = F[ce]) && (ce = $i(U, ze)),
          w.push(ce),
          (q = ne + 1));
      return (w.push($.slice(q, ne)), w.join(""));
    };
  }
  function P($, F) {
    return function (U) {
      var w = kt(1900, void 0, 1),
        ne = I(w, $, (U += ""), 0),
        q,
        ue;
      if (ne != U.length) return null;
      if ("Q" in w) return new Date(w.Q);
      if ("s" in w) return new Date(w.s * 1e3 + ("L" in w ? w.L : 0));
      if (
        (F && !("Z" in w) && (w.Z = 0),
        "p" in w && (w.H = (w.H % 12) + w.p * 12),
        w.m === void 0 && (w.m = "q" in w ? w.q : 0),
        "V" in w)
      ) {
        if (w.V < 1 || w.V > 53) return null;
        ("w" in w || (w.w = 1),
          "Z" in w
            ? ((q = hr(kt(w.y, 0, 1))),
              (ue = q.getUTCDay()),
              (q = ue > 4 || ue === 0 ? Tn.ceil(q) : Tn(q)),
              (q = yi.offset(q, (w.V - 1) * 7)),
              (w.y = q.getUTCFullYear()),
              (w.m = q.getUTCMonth()),
              (w.d = q.getUTCDate() + ((w.w + 6) % 7)))
            : ((q = lr(kt(w.y, 0, 1))),
              (ue = q.getDay()),
              (q = ue > 4 || ue === 0 ? kn.ceil(q) : kn(q)),
              (q = gi.offset(q, (w.V - 1) * 7)),
              (w.y = q.getFullYear()),
              (w.m = q.getMonth()),
              (w.d = q.getDate() + ((w.w + 6) % 7))));
      } else
        ("W" in w || "U" in w) &&
          ("w" in w || (w.w = "u" in w ? w.u % 7 : "W" in w ? 1 : 0),
          (ue =
            "Z" in w
              ? hr(kt(w.y, 0, 1)).getUTCDay()
              : lr(kt(w.y, 0, 1)).getDay()),
          (w.m = 0),
          (w.d =
            "W" in w
              ? ((w.w + 6) % 7) + w.W * 7 - ((ue + 5) % 7)
              : w.w + w.U * 7 - ((ue + 6) % 7)));
      return "Z" in w
        ? ((w.H += (w.Z / 100) | 0), (w.M += w.Z % 100), hr(w))
        : lr(w);
    };
  }
  function I($, F, U, w) {
    for (var ne = 0, q = F.length, ue = U.length, ce, ze; ne < q; ) {
      if (w >= ue) return -1;
      if (((ce = F.charCodeAt(ne++)), ce === 37)) {
        if (
          ((ce = F.charAt(ne++)),
          (ze = C[ce in Ki ? F.charAt(ne++) : ce]),
          !ze || (w = ze($, U, w)) < 0)
        )
          return -1;
      } else if (ce != U.charCodeAt(w++)) return -1;
    }
    return w;
  }
  function L($, F, U) {
    var w = u.exec(F.slice(U));
    return w ? (($.p = l.get(w[0].toLowerCase())), U + w[0].length) : -1;
  }
  function D($, F, U) {
    var w = d.exec(F.slice(U));
    return w ? (($.w = m.get(w[0].toLowerCase())), U + w[0].length) : -1;
  }
  function v($, F, U) {
    var w = h.exec(F.slice(U));
    return w ? (($.w = f.get(w[0].toLowerCase())), U + w[0].length) : -1;
  }
  function R($, F, U) {
    var w = y.exec(F.slice(U));
    return w ? (($.m = b.get(w[0].toLowerCase())), U + w[0].length) : -1;
  }
  function S($, F, U) {
    var w = g.exec(F.slice(U));
    return w ? (($.m = x.get(w[0].toLowerCase())), U + w[0].length) : -1;
  }
  function A($, F, U) {
    return I($, t, F, U);
  }
  function K($, F, U) {
    return I($, n, F, U);
  }
  function Y($, F, U) {
    return I($, r, F, U);
  }
  function z($) {
    return s[$.getDay()];
  }
  function W($) {
    return a[$.getDay()];
  }
  function G($) {
    return c[$.getMonth()];
  }
  function xe($) {
    return o[$.getMonth()];
  }
  function Ce($) {
    return i[+($.getHours() >= 12)];
  }
  function te($) {
    return 1 + ~~($.getMonth() / 3);
  }
  function je($) {
    return s[$.getUTCDay()];
  }
  function wt($) {
    return a[$.getUTCDay()];
  }
  function be($) {
    return c[$.getUTCMonth()];
  }
  function _t($) {
    return o[$.getUTCMonth()];
  }
  function Nt($) {
    return i[+($.getUTCHours() >= 12)];
  }
  function Ct($) {
    return 1 + ~~($.getUTCMonth() / 3);
  }
  return {
    format: function ($) {
      var F = k(($ += ""), p);
      return (
        (F.toString = function () {
          return $;
        }),
        F
      );
    },
    parse: function ($) {
      var F = P(($ += ""), !1);
      return (
        (F.toString = function () {
          return $;
        }),
        F
      );
    },
    utcFormat: function ($) {
      var F = k(($ += ""), _);
      return (
        (F.toString = function () {
          return $;
        }),
        F
      );
    },
    utcParse: function ($) {
      var F = P(($ += ""), !0);
      return (
        (F.toString = function () {
          return $;
        }),
        F
      );
    },
  };
}
var Ki = { "-": "", _: " ", 0: "0" },
  X = /^\s*\d+/,
  uc = /^%/,
  cc = /[\\^$*+?|[\]().{}]/g;
function j(e, t, n) {
  var r = e < 0 ? "-" : "",
    i = (r ? -e : e) + "",
    a = i.length;
  return r + (a < n ? new Array(n - a + 1).join(t) + i : i);
}
function lc(e) {
  return e.replace(cc, "\\$&");
}
function Tt(e) {
  return new RegExp("^(?:" + e.map(lc).join("|") + ")", "i");
}
function Pt(e) {
  return new Map(e.map((t, n) => [t.toLowerCase(), n]));
}
function hc(e, t, n) {
  var r = X.exec(t.slice(n, n + 1));
  return r ? ((e.w = +r[0]), n + r[0].length) : -1;
}
function fc(e, t, n) {
  var r = X.exec(t.slice(n, n + 1));
  return r ? ((e.u = +r[0]), n + r[0].length) : -1;
}
function dc(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.U = +r[0]), n + r[0].length) : -1;
}
function mc(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.V = +r[0]), n + r[0].length) : -1;
}
function gc(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.W = +r[0]), n + r[0].length) : -1;
}
function Ji(e, t, n) {
  var r = X.exec(t.slice(n, n + 4));
  return r ? ((e.y = +r[0]), n + r[0].length) : -1;
}
function ea(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length) : -1;
}
function yc(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r
    ? ((e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00"))), n + r[0].length)
    : -1;
}
function pc(e, t, n) {
  var r = X.exec(t.slice(n, n + 1));
  return r ? ((e.q = r[0] * 3 - 3), n + r[0].length) : -1;
}
function xc(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.m = r[0] - 1), n + r[0].length) : -1;
}
function ta(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.d = +r[0]), n + r[0].length) : -1;
}
function bc(e, t, n) {
  var r = X.exec(t.slice(n, n + 3));
  return r ? ((e.m = 0), (e.d = +r[0]), n + r[0].length) : -1;
}
function na(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.H = +r[0]), n + r[0].length) : -1;
}
function vc(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.M = +r[0]), n + r[0].length) : -1;
}
function wc(e, t, n) {
  var r = X.exec(t.slice(n, n + 2));
  return r ? ((e.S = +r[0]), n + r[0].length) : -1;
}
function _c(e, t, n) {
  var r = X.exec(t.slice(n, n + 3));
  return r ? ((e.L = +r[0]), n + r[0].length) : -1;
}
function Nc(e, t, n) {
  var r = X.exec(t.slice(n, n + 6));
  return r ? ((e.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
}
function Cc(e, t, n) {
  var r = uc.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function Mc(e, t, n) {
  var r = X.exec(t.slice(n));
  return r ? ((e.Q = +r[0]), n + r[0].length) : -1;
}
function Sc(e, t, n) {
  var r = X.exec(t.slice(n));
  return r ? ((e.s = +r[0]), n + r[0].length) : -1;
}
function ra(e, t) {
  return j(e.getDate(), t, 2);
}
function $c(e, t) {
  return j(e.getHours(), t, 2);
}
function kc(e, t) {
  return j(e.getHours() % 12 || 12, t, 2);
}
function Tc(e, t) {
  return j(1 + gi.count(Xe(e), e), t, 3);
}
function Ns(e, t) {
  return j(e.getMilliseconds(), t, 3);
}
function Pc(e, t) {
  return Ns(e, t) + "000";
}
function Ac(e, t) {
  return j(e.getMonth() + 1, t, 2);
}
function Ec(e, t) {
  return j(e.getMinutes(), t, 2);
}
function Rc(e, t) {
  return j(e.getSeconds(), t, 2);
}
function Ic(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function Lc(e, t) {
  return j(ws.count(Xe(e) - 1, e), t, 2);
}
function Cs(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? ht(e) : ht.ceil(e);
}
function Fc(e, t) {
  return ((e = Cs(e)), j(ht.count(Xe(e), e) + (Xe(e).getDay() === 4), t, 2));
}
function Dc(e) {
  return e.getDay();
}
function Uc(e, t) {
  return j(kn.count(Xe(e) - 1, e), t, 2);
}
function Oc(e, t) {
  return j(e.getFullYear() % 100, t, 2);
}
function jc(e, t) {
  return ((e = Cs(e)), j(e.getFullYear() % 100, t, 2));
}
function zc(e, t) {
  return j(e.getFullYear() % 1e4, t, 4);
}
function Bc(e, t) {
  var n = e.getDay();
  return (
    (e = n >= 4 || n === 0 ? ht(e) : ht.ceil(e)),
    j(e.getFullYear() % 1e4, t, 4)
  );
}
function Vc(e) {
  var t = e.getTimezoneOffset();
  return (
    (t > 0 ? "-" : ((t *= -1), "+")) +
    j((t / 60) | 0, "0", 2) +
    j(t % 60, "0", 2)
  );
}
function ia(e, t) {
  return j(e.getUTCDate(), t, 2);
}
function qc(e, t) {
  return j(e.getUTCHours(), t, 2);
}
function Hc(e, t) {
  return j(e.getUTCHours() % 12 || 12, t, 2);
}
function Yc(e, t) {
  return j(1 + yi.count(Ze(e), e), t, 3);
}
function Ms(e, t) {
  return j(e.getUTCMilliseconds(), t, 3);
}
function Wc(e, t) {
  return Ms(e, t) + "000";
}
function Gc(e, t) {
  return j(e.getUTCMonth() + 1, t, 2);
}
function Qc(e, t) {
  return j(e.getUTCMinutes(), t, 2);
}
function Xc(e, t) {
  return j(e.getUTCSeconds(), t, 2);
}
function Zc(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function Kc(e, t) {
  return j(_s.count(Ze(e) - 1, e), t, 2);
}
function Ss(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? ft(e) : ft.ceil(e);
}
function Jc(e, t) {
  return ((e = Ss(e)), j(ft.count(Ze(e), e) + (Ze(e).getUTCDay() === 4), t, 2));
}
function el(e) {
  return e.getUTCDay();
}
function tl(e, t) {
  return j(Tn.count(Ze(e) - 1, e), t, 2);
}
function nl(e, t) {
  return j(e.getUTCFullYear() % 100, t, 2);
}
function rl(e, t) {
  return ((e = Ss(e)), j(e.getUTCFullYear() % 100, t, 2));
}
function il(e, t) {
  return j(e.getUTCFullYear() % 1e4, t, 4);
}
function al(e, t) {
  var n = e.getUTCDay();
  return (
    (e = n >= 4 || n === 0 ? ft(e) : ft.ceil(e)),
    j(e.getUTCFullYear() % 1e4, t, 4)
  );
}
function sl() {
  return "+0000";
}
function aa() {
  return "%";
}
function sa(e) {
  return +e;
}
function oa(e) {
  return Math.floor(+e / 1e3);
}
var rt, Lr, $s;
ol({
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
function ol(e) {
  return (
    (rt = oc(e)),
    (Lr = rt.format),
    ($s = rt.parse),
    rt.utcFormat,
    rt.utcParse,
    rt
  );
}
function pi(e) {
  return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0;
}
function ul(e) {
  const t = Math.trunc(e),
    n = pi(t) ? 366 : 365,
    r = Math.round((e - t) * n),
    i = $s("%Y-%j")(`${t}-${r}`);
  return fe(i, `Could not convert ${e} to date tried (year:${t} - day: ${r})`);
}
function cl(e) {
  const t = parseInt(Lr("%Y")(e)),
    n = parseInt(Lr("%j")(e)),
    r = pi(t) ? 366 : 365;
  return t + n / r;
}
function ll(e) {
  throw new Error(e);
}
function hl(e) {
  if (e === void 0) throw new Error("internal bug! unhandled undefined");
  return e;
}
function Q(e, t) {
  if (e === void 0) throw new Error(t);
}
function fe(e, t) {
  if (e === null) throw new Error(t);
  return e;
}
class ks {
  done;
  started;
  level;
  currentNode;
  nodeStack;
  labelNext;
  lengthNext;
  taxonSet;
  tree;
  options;
  constructor(t = new sn(), n = {}) {
    ((this.done = !1),
      (this.started = !1),
      (this.level = 0),
      (this.currentNode = void 0),
      (this.nodeStack = []),
      (this.labelNext = !1),
      (this.lengthNext = !1),
      (this.taxonSet = t),
      (this.options = n),
      (this.tree = new _i({ taxonSet: this.taxonSet })));
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
  parseCharacter(t) {
    if (this.done) throw new Error("Parsing is done. We have seen a ';'");
    if (t.length > 2 && t.substring(0, 2) === "[&") {
      const n = Hu(t);
      (Q(
        this.currentNode,
        "Internal Parsing error - Current not is not defined",
      ),
        (this.tree = this.tree.annotateNode(this.currentNode, n)));
    } else if (t === ";") {
      if (this.level > 0)
        throw new Error(
          "unexpected semi-colon in tree did not reach the root yet",
        );
      if (!this.started)
        throw new Error(
          "unexpected semi-colon in tree parsing has not started yet",
        );
      this.done = !0;
    } else if (t === "(") {
      if (((this.started = !0), this.labelNext))
        throw new Error("expecting a comma");
      let n;
      if (((this.level += 1), this.currentNode !== void 0)) {
        const r = this.tree.addNodes(1);
        ((this.tree = r.tree),
          (n = r.nodes[0]),
          this.nodeStack.push(this.currentNode));
      } else n = this.tree.getRoot();
      this.currentNode = n;
    } else if (t === ",") {
      if (((this.labelNext = !1), this.lengthNext))
        throw new Error("branch length missing");
      const n = this.nodeStack.pop();
      (Q(n, "Internal Parsing error - node stack unexpectedly empty"),
        Q(
          this.currentNode,
          "Internal Parsing error - Current not is not defined",
        ),
        (this.tree = this.tree.addChild(n, this.currentNode)),
        (this.currentNode = n));
    } else if (t === ")") {
      if (this.level === 0)
        throw new Error(
          "the brackets in the newick file are not balanced: too many closed",
        );
      if (((this.labelNext = !1), this.lengthNext))
        throw new Error("branch length missing");
      const n = this.nodeStack.pop();
      (Q(n, "Internal Parsing error - node stack unexpectedly empty"),
        Q(
          this.currentNode,
          "Internal Parsing error - Current not is not defined",
        ),
        (this.tree = this.tree.addChild(n, this.currentNode)),
        (this.level -= 1),
        (this.currentNode = n),
        (this.labelNext = !0));
    } else if (t === ":") ((this.labelNext = !1), (this.lengthNext = !0));
    else if (this.lengthNext)
      (Q(
        this.currentNode,
        "Internal Parsing error - Current not is not defined",
      ),
        (this.tree = this.tree.setLength(this.currentNode, parseFloat(t))),
        (this.lengthNext = !1));
    else if (this.labelNext) {
      if (t.startsWith("#"))
        (Q(
          this.currentNode,
          "Internal Parsing error - Current not is not defined",
        ),
          (this.tree = this.tree.setLabel(this.currentNode, t.slice(1))));
      else {
        let n = parseFloat(t);
        (isNaN(n) && (n = t),
          this.options.labelName
            ? (Q(
                this.currentNode,
                "Internal Parsing error - Current not is not defined",
              ),
              (this.tree = this.tree.annotateNode(
                this.currentNode,
                this.options.labelName,
                n,
              )))
            : console.warn(
                `No label name provided to newick parser but found label ${t}. It will be ignored`,
              ));
      }
      this.labelNext = !1;
    } else {
      let n = t;
      ((n.startsWith('"') || n.startsWith("'")) && (n = n.slice(1)),
        (n.endsWith('"') || n.endsWith("'")) && (n = n.slice(0, -1)),
        (n = n.trim()));
      const r = this.tree.addNodes(1);
      this.tree = r.tree;
      const i = r.nodes[0];
      let a;
      if (this.options.translateTaxonNames)
        if (this.options.translateTaxonNames.has(n))
          n = fe(
            this.options.translateTaxonNames.get(n),
            `${n} not found in taxon translation map`,
          );
        else
          throw new Error(
            `No mapping found for ${n} in tipNameMap. It's name will not be updated`,
          );
      if (this.taxonSet.isFinalized) {
        if (!this.taxonSet.hasTaxon(n))
          throw new Error(`Taxon ${n} not found in taxa - but found in tree`);
        a = this.taxonSet.getTaxonByName(n);
      } else (this.taxonSet.addTaxon(n), (a = this.taxonSet.getTaxonByName(n)));
      ((this.tree = this.tree.setTaxon(i, a)),
        this.currentNode && this.nodeStack.push(this.currentNode),
        (this.currentNode = i));
    }
  }
}
function Fr(e, t = {}) {
  const n = t.taxonSet ? t.taxonSet : new sn(),
    r = e
      .split(/\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/)
      .filter((s) => s.length > 0),
    i = new ks(n, t);
  for (const s of r) i.parseCharacter(s);
  return i.getTree();
}
function fl(e, t, n = {}) {
  const r = t
    .split(
      /\s*(?:\bBegin\s+|\bbegin\s+|\bBEGIN\s+|\bend\s*;|\bEnd\s*;|\bEND\s*;)\s*/,
    )
    .filter((a) => a !== "");
  if (r.length === 0 || r === void 0)
    throw new Error(
      "No nexus tokens found in string. This may not be a nexus formated tree",
    );
  if (r.shift().trim().toLowerCase() !== "#nexus")
    throw Error("File does not begin with #NEXUS is it a nexus file?");
  for (const a of r) {
    const s = a.replace(/^\s+|\s+$/g, "").split(/\n/);
    if (s.shift().toLowerCase().trim() === "trees;") {
      let c = !1;
      const u = new Map();
      for (const l of s)
        if (l.trim().toLowerCase() === "translate") c = !0;
        else if (c)
          if (l.trim() === ";") c = !1;
          else {
            const h = l
              .trim()
              .replace(",", "")
              .split(/\s*\s\s*/);
            u.set(h[0], h[1]);
          }
        else {
          const h = l.substring(l.indexOf("("));
          return u.size > 0
            ? Fr(h, { parseAnnotations: !0, ...n, tipNameMap: u })
            : Fr(h, { parseAnnotations: !0, ...n, tipNameMap: u });
        }
    }
  }
  throw new Error("No tree section found in nexus file");
}
var Ts = Symbol.for("immer-nothing"),
  Dr = Symbol.for("immer-draftable"),
  de = Symbol.for("immer-state"),
  dl =
    process.env.NODE_ENV !== "production"
      ? [
          function (e) {
            return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
          },
          function (e) {
            return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
          },
          "This object has been frozen and should not be mutated",
          function (e) {
            return (
              "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " +
              e
            );
          },
          "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
          "Immer forbids circular references",
          "The first or second argument to `produce` must be a function",
          "The third argument to `produce` must be a function or undefined",
          "First argument to `createDraft` must be a plain object, an array, or an immerable object",
          "First argument to `finishDraft` must be a draft returned by `createDraft`",
          function (e) {
            return `'current' expects a draft, got: ${e}`;
          },
          "Object.defineProperty() cannot be used on an Immer draft",
          "Object.setPrototypeOf() cannot be used on an Immer draft",
          "Immer only supports deleting array indices",
          "Immer only supports setting array indices and the 'length' property",
          function (e) {
            return `'original' expects a draft, got: ${e}`;
          },
        ]
      : [];
function se(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = dl[e],
      r = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${r}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var dt = Object.getPrototypeOf;
function mt(e) {
  return !!e && !!e[de];
}
function Ke(e) {
  return e
    ? Ps(e) ||
        Array.isArray(e) ||
        !!e[Dr] ||
        !!e.constructor?.[Dr] ||
        on(e) ||
        Kn(e)
    : !1;
}
var ml = Object.prototype.constructor.toString();
function Ps(e) {
  if (!e || typeof e != "object") return !1;
  const t = dt(e);
  if (t === null) return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object
    ? !0
    : typeof n == "function" && Function.toString.call(n) === ml;
}
function Pn(e, t) {
  Zn(e) === 0
    ? Reflect.ownKeys(e).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function Zn(e) {
  const t = e[de];
  return t ? t.type_ : Array.isArray(e) ? 1 : on(e) ? 2 : Kn(e) ? 3 : 0;
}
function Ur(e, t) {
  return Zn(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function As(e, t, n) {
  const r = Zn(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function gl(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function on(e) {
  return e instanceof Map;
}
function Kn(e) {
  return e instanceof Set;
}
function Ve(e) {
  return e.copy_ || e.base_;
}
function Or(e, t) {
  if (on(e)) return new Map(e);
  if (Kn(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  const n = Ps(e);
  if (t === !0 || (t === "class_only" && !n)) {
    const r = Object.getOwnPropertyDescriptors(e);
    delete r[de];
    let i = Reflect.ownKeys(r);
    for (let a = 0; a < i.length; a++) {
      const s = i[a],
        o = r[s];
      (o.writable === !1 && ((o.writable = !0), (o.configurable = !0)),
        (o.get || o.set) &&
          (r[s] = {
            configurable: !0,
            writable: !0,
            enumerable: o.enumerable,
            value: e[s],
          }));
    }
    return Object.create(dt(e), r);
  } else {
    const r = dt(e);
    if (r !== null && n) return { ...e };
    const i = Object.create(r);
    return Object.assign(i, e);
  }
}
function xi(e, t = !1) {
  return (
    Jn(e) ||
      mt(e) ||
      !Ke(e) ||
      (Zn(e) > 1 &&
        Object.defineProperties(e, {
          set: { value: hn },
          add: { value: hn },
          clear: { value: hn },
          delete: { value: hn },
        }),
      Object.freeze(e),
      t && Object.values(e).forEach((n) => xi(n, !0))),
    e
  );
}
function hn() {
  se(2);
}
function Jn(e) {
  return Object.isFrozen(e);
}
var yl = {};
function Je(e) {
  const t = yl[e];
  return (t || se(0, e), t);
}
var Qt;
function Es() {
  return Qt;
}
function pl(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function ua(e, t) {
  t &&
    (Je("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function jr(e) {
  (zr(e), e.drafts_.forEach(xl), (e.drafts_ = null));
}
function zr(e) {
  e === Qt && (Qt = e.parent_);
}
function ca(e) {
  return (Qt = pl(Qt, e));
}
function xl(e) {
  const t = e[de];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function la(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[de].modified_ && (jr(t), se(4)),
        Ke(e) && ((e = An(t, e)), t.parent_ || En(t, e)),
        t.patches_ &&
          Je("Patches").generateReplacementPatches_(
            n[de].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = An(t, n, [])),
    jr(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== Ts ? e : void 0
  );
}
function An(e, t, n) {
  if (Jn(t)) return t;
  const r = t[de];
  if (!r) return (Pn(t, (i, a) => ha(e, r, t, i, a, n)), t);
  if (r.scope_ !== e) return t;
  if (!r.modified_) return (En(e, r.base_, !0), r.base_);
  if (!r.finalized_) {
    ((r.finalized_ = !0), r.scope_.unfinalizedDrafts_--);
    const i = r.copy_;
    let a = i,
      s = !1;
    (r.type_ === 3 && ((a = new Set(i)), i.clear(), (s = !0)),
      Pn(a, (o, c) => ha(e, r, i, o, c, n, s)),
      En(e, i, !1),
      n &&
        e.patches_ &&
        Je("Patches").generatePatches_(r, n, e.patches_, e.inversePatches_));
  }
  return r.copy_;
}
function ha(e, t, n, r, i, a, s) {
  if ((process.env.NODE_ENV !== "production" && i === n && se(5), mt(i))) {
    const o =
        a && t && t.type_ !== 3 && !Ur(t.assigned_, r) ? a.concat(r) : void 0,
      c = An(e, i, o);
    if ((As(n, r, c), mt(c))) e.canAutoFreeze_ = !1;
    else return;
  } else s && n.add(i);
  if (Ke(i) && !Jn(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    (An(e, i),
      (!t || !t.scope_.parent_) &&
        typeof r != "symbol" &&
        (on(n) ? n.has(r) : Object.prototype.propertyIsEnumerable.call(n, r)) &&
        En(e, i));
  }
}
function En(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && xi(t, n);
}
function bl(e, t) {
  const n = Array.isArray(e),
    r = {
      type_: n ? 1 : 0,
      scope_: t ? t.scope_ : Es(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let i = r,
    a = bi;
  n && ((i = [r]), (a = Xt));
  const { revoke: s, proxy: o } = Proxy.revocable(i, a);
  return ((r.draft_ = o), (r.revoke_ = s), o);
}
var bi = {
    get(e, t) {
      if (t === de) return e;
      const n = Ve(e);
      if (!Ur(n, t)) return vl(e, n, t);
      const r = n[t];
      return e.finalized_ || !Ke(r)
        ? r
        : r === fr(e.base_, t)
          ? (dr(e), (e.copy_[t] = Vr(r, e)))
          : r;
    },
    has(e, t) {
      return t in Ve(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(Ve(e));
    },
    set(e, t, n) {
      const r = Rs(Ve(e), t);
      if (r?.set) return (r.set.call(e.draft_, n), !0);
      if (!e.modified_) {
        const i = fr(Ve(e), t),
          a = i?.[de];
        if (a && a.base_ === n)
          return ((e.copy_[t] = n), (e.assigned_[t] = !1), !0);
        if (gl(n, i) && (n !== void 0 || Ur(e.base_, t))) return !0;
        (dr(e), Br(e));
      }
      return (
        (e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
          (Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = n), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        fr(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), dr(e), Br(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const n = Ve(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== "length",
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty() {
      se(11);
    },
    getPrototypeOf(e) {
      return dt(e.base_);
    },
    setPrototypeOf() {
      se(12);
    },
  },
  Xt = {};
Pn(bi, (e, t) => {
  Xt[e] = function () {
    return ((arguments[0] = arguments[0][0]), t.apply(this, arguments));
  };
});
Xt.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && se(13),
    Xt.set.call(this, e, t, void 0)
  );
};
Xt.set = function (e, t, n) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      se(14),
    bi.set.call(this, e[0], t, n, e[0])
  );
};
function fr(e, t) {
  const n = e[de];
  return (n ? Ve(n) : e)[t];
}
function vl(e, t, n) {
  const r = Rs(t, n);
  return r ? ("value" in r ? r.value : r.get?.call(e.draft_)) : void 0;
}
function Rs(e, t) {
  if (!(t in e)) return;
  let n = dt(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = dt(n);
  }
}
function Br(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && Br(e.parent_));
}
function dr(e) {
  e.copy_ || (e.copy_ = Or(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var wl = class {
  constructor(e) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, n, r) => {
        if (typeof t == "function" && typeof n != "function") {
          const a = n;
          n = t;
          const s = this;
          return function (c = a, ...u) {
            return s.produce(c, (l) => n.call(this, l, ...u));
          };
        }
        (typeof n != "function" && se(6),
          r !== void 0 && typeof r != "function" && se(7));
        let i;
        if (Ke(t)) {
          const a = ca(this),
            s = Vr(t, void 0);
          let o = !0;
          try {
            ((i = n(s)), (o = !1));
          } finally {
            o ? jr(a) : zr(a);
          }
          return (ua(a, r), la(i, a));
        } else if (!t || typeof t != "object") {
          if (
            ((i = n(t)),
            i === void 0 && (i = t),
            i === Ts && (i = void 0),
            this.autoFreeze_ && xi(i, !0),
            r)
          ) {
            const a = [],
              s = [];
            (Je("Patches").generateReplacementPatches_(t, i, a, s), r(a, s));
          }
          return i;
        } else se(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == "function")
          return (s, ...o) => this.produceWithPatches(s, (c) => t(c, ...o));
        let r, i;
        return [
          this.produce(t, n, (s, o) => {
            ((r = s), (i = o));
          }),
          r,
          i,
        ];
      }),
      typeof e?.autoFreeze == "boolean" && this.setAutoFreeze(e.autoFreeze),
      typeof e?.useStrictShallowCopy == "boolean" &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy));
  }
  createDraft(e) {
    (Ke(e) || se(8), mt(e) && (e = _l(e)));
    const t = ca(this),
      n = Vr(e, void 0);
    return ((n[de].isManual_ = !0), zr(t), n);
  }
  finishDraft(e, t) {
    const n = e && e[de];
    (!n || !n.isManual_) && se(9);
    const { scope_: r } = n;
    return (ua(r, t), la(void 0, r));
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const i = t[n];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = Je("Patches").applyPatches_;
    return mt(e) ? r(e, t) : this.produce(e, (i) => r(i, t));
  }
};
function Vr(e, t) {
  const n = on(e)
    ? Je("MapSet").proxyMap_(e, t)
    : Kn(e)
      ? Je("MapSet").proxySet_(e, t)
      : bl(e, t);
  return ((t ? t.scope_ : Es()).drafts_.push(n), n);
}
function _l(e) {
  return (mt(e) || se(10, e), Is(e));
}
function Is(e) {
  if (!Ke(e) || Jn(e)) return e;
  const t = e[de];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    ((t.finalized_ = !0), (n = Or(e, t.scope_.immer_.useStrictShallowCopy_)));
  } else n = Or(e, !0);
  return (
    Pn(n, (r, i) => {
      As(n, r, Is(i));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var Nl = new wl(),
  J = Nl.produce;
function Cl(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString("en").replace(/,/g, "")
    : e.toString(10);
}
function Rn(e, t) {
  if (
    (n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0
  )
    return null;
  var n,
    r = e.slice(0, n);
  return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function gt(e) {
  return ((e = Rn(Math.abs(e))), e ? e[1] : NaN);
}
function Ml(e, t) {
  return function (n, r) {
    for (
      var i = n.length, a = [], s = 0, o = e[0], c = 0;
      i > 0 &&
      o > 0 &&
      (c + o + 1 > r && (o = Math.max(1, r - c)),
      a.push(n.substring((i -= o), i + o)),
      !((c += o + 1) > r));

    )
      o = e[(s = (s + 1) % e.length)];
    return a.reverse().join(t);
  };
}
function Sl(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (n) {
      return e[+n];
    });
  };
}
var $l =
  /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function In(e) {
  if (!(t = $l.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new vi({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
In.prototype = vi.prototype;
function vi(e) {
  ((this.fill = e.fill === void 0 ? " " : e.fill + ""),
    (this.align = e.align === void 0 ? ">" : e.align + ""),
    (this.sign = e.sign === void 0 ? "-" : e.sign + ""),
    (this.symbol = e.symbol === void 0 ? "" : e.symbol + ""),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? "" : e.type + ""));
}
vi.prototype.toString = function () {
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
function kl(e) {
  e: for (var t = e.length, n = 1, r = -1, i; n < t; ++n)
    switch (e[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        (r === 0 && (r = n), (i = n));
        break;
      default:
        if (!+e[n]) break e;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var Ls;
function Tl(e, t) {
  var n = Rn(e, t);
  if (!n) return e + "";
  var r = n[0],
    i = n[1],
    a = i - (Ls = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    s = r.length;
  return a === s
    ? r
    : a > s
      ? r + new Array(a - s + 1).join("0")
      : a > 0
        ? r.slice(0, a) + "." + r.slice(a)
        : "0." + new Array(1 - a).join("0") + Rn(e, Math.max(0, t + a - 1))[0];
}
function fa(e, t) {
  var n = Rn(e, t);
  if (!n) return e + "";
  var r = n[0],
    i = n[1];
  return i < 0
    ? "0." + new Array(-i).join("0") + r
    : r.length > i + 1
      ? r.slice(0, i + 1) + "." + r.slice(i + 1)
      : r + new Array(i - r.length + 2).join("0");
}
const da = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: Cl,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => fa(e * 100, t),
  r: fa,
  s: Tl,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
};
function ma(e) {
  return e;
}
var ga = Array.prototype.map,
  ya = [
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
function Pl(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? ma
        : Ml(ga.call(e.grouping, Number), e.thousands + ""),
    n = e.currency === void 0 ? "" : e.currency[0] + "",
    r = e.currency === void 0 ? "" : e.currency[1] + "",
    i = e.decimal === void 0 ? "." : e.decimal + "",
    a = e.numerals === void 0 ? ma : Sl(ga.call(e.numerals, String)),
    s = e.percent === void 0 ? "%" : e.percent + "",
    o = e.minus === void 0 ? "−" : e.minus + "",
    c = e.nan === void 0 ? "NaN" : e.nan + "";
  function u(h) {
    h = In(h);
    var f = h.fill,
      d = h.align,
      m = h.sign,
      g = h.symbol,
      x = h.zero,
      y = h.width,
      b = h.comma,
      p = h.precision,
      _ = h.trim,
      C = h.type;
    (C === "n"
      ? ((b = !0), (C = "g"))
      : da[C] || (p === void 0 && (p = 12), (_ = !0), (C = "g")),
      (x || (f === "0" && d === "=")) && ((x = !0), (f = "0"), (d = "=")));
    var k =
        g === "$"
          ? n
          : g === "#" && /[boxX]/.test(C)
            ? "0" + C.toLowerCase()
            : "",
      P = g === "$" ? r : /[%p]/.test(C) ? s : "",
      I = da[C],
      L = /[defgprs%]/.test(C);
    p =
      p === void 0
        ? 6
        : /[gprs]/.test(C)
          ? Math.max(1, Math.min(21, p))
          : Math.max(0, Math.min(20, p));
    function D(v) {
      var R = k,
        S = P,
        A,
        K,
        Y;
      if (C === "c") ((S = I(v) + S), (v = ""));
      else {
        v = +v;
        var z = v < 0 || 1 / v < 0;
        if (
          ((v = isNaN(v) ? c : I(Math.abs(v), p)),
          _ && (v = kl(v)),
          z && +v == 0 && m !== "+" && (z = !1),
          (R = (z ? (m === "(" ? m : o) : m === "-" || m === "(" ? "" : m) + R),
          (S =
            (C === "s" ? ya[8 + Ls / 3] : "") +
            S +
            (z && m === "(" ? ")" : "")),
          L)
        ) {
          for (A = -1, K = v.length; ++A < K; )
            if (((Y = v.charCodeAt(A)), 48 > Y || Y > 57)) {
              ((S = (Y === 46 ? i + v.slice(A + 1) : v.slice(A)) + S),
                (v = v.slice(0, A)));
              break;
            }
        }
      }
      b && !x && (v = t(v, 1 / 0));
      var W = R.length + v.length + S.length,
        G = W < y ? new Array(y - W + 1).join(f) : "";
      switch (
        (b && x && ((v = t(G + v, G.length ? y - S.length : 1 / 0)), (G = "")),
        d)
      ) {
        case "<":
          v = R + v + S + G;
          break;
        case "=":
          v = R + G + v + S;
          break;
        case "^":
          v = G.slice(0, (W = G.length >> 1)) + R + v + S + G.slice(W);
          break;
        default:
          v = G + R + v + S;
          break;
      }
      return a(v);
    }
    return (
      (D.toString = function () {
        return h + "";
      }),
      D
    );
  }
  function l(h, f) {
    var d = u(((h = In(h)), (h.type = "f"), h)),
      m = Math.max(-8, Math.min(8, Math.floor(gt(f) / 3))) * 3,
      g = Math.pow(10, -m),
      x = ya[8 + m / 3];
    return function (y) {
      return d(g * y) + x;
    };
  }
  return { format: u, formatPrefix: l };
}
var fn, Zt, Fs;
Al({ thousands: ",", grouping: [3], currency: ["$", ""] });
function Al(e) {
  return ((fn = Pl(e)), (Zt = fn.format), (Fs = fn.formatPrefix), fn);
}
function El(e) {
  return Math.max(0, -gt(Math.abs(e)));
}
function Rl(e, t) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(gt(t) / 3))) * 3 - gt(Math.abs(e)),
  );
}
function Il(e, t) {
  return (
    (e = Math.abs(e)),
    (t = Math.abs(t) - e),
    Math.max(0, gt(t) - gt(e)) + 1
  );
}
function Ds(e, t) {
  const n = e._data.nodes.allNodes[t];
  return n === void 0 ? Pe() : Xn(n);
}
function wi(e, t) {
  if (typeof t == "number") return Ds(e, t);
  if (t instanceof Object) return qr(e, t);
  if (typeof t == "string") {
    const n = Wt(e.taxonSet._data, t);
    return n.type === B.Some ? qr(e, n.value) : Ll(e, t);
  }
  return Pe();
}
function qr(e, t) {
  const n = e._data.nodes.byTaxon[t.number];
  return n === void 0 ? Pe() : wi(e, n);
}
function Ll(e, t) {
  const n = e._data.nodes.byLabel[t];
  return n === void 0 ? Pe() : Ds(e, n);
}
function mr(e, t, n) {
  const r = e.getNode(t.number).annotations[n];
  return r === void 0 ? Pe() : Xn(r);
}
function Hr(e, t) {
  const n = e._data.nodeToTaxon[t.number];
  return n === void 0 ? Pe() : Us(e, n);
}
function Us(e, t) {
  return typeof t == "number"
    ? Wt(e.taxonSet._data, bs(e.taxonSet._data, t))
    : typeof t == "string"
      ? Wt(e.taxonSet._data, t)
      : Hr(e, t);
}
function gr(e, t) {
  const n = e._data.nodes.allNodes[t.number];
  if (n === void 0) return Pe();
  const r = n.parent;
  return r === void 0 ? Pe() : wi(e, r);
}
const Z = [];
for (let e = 0; e < 256; ++e) Z.push((e + 256).toString(16).slice(1));
function Fl(e, t = 0) {
  return (
    Z[e[t + 0]] +
    Z[e[t + 1]] +
    Z[e[t + 2]] +
    Z[e[t + 3]] +
    "-" +
    Z[e[t + 4]] +
    Z[e[t + 5]] +
    "-" +
    Z[e[t + 6]] +
    Z[e[t + 7]] +
    "-" +
    Z[e[t + 8]] +
    Z[e[t + 9]] +
    "-" +
    Z[e[t + 10]] +
    Z[e[t + 11]] +
    Z[e[t + 12]] +
    Z[e[t + 13]] +
    Z[e[t + 14]] +
    Z[e[t + 15]]
  ).toLowerCase();
}
let yr;
const Dl = new Uint8Array(16);
function Ul() {
  if (!yr) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
      );
    yr = crypto.getRandomValues.bind(crypto);
  }
  return yr(Dl);
}
const Ol =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  pa = { randomUUID: Ol };
function jl(e, t, n) {
  e = e || {};
  const r = e.random ?? e.rng?.() ?? Ul();
  if (r.length < 16) throw new Error("Random bytes length must be >= 16");
  return ((r[6] = (r[6] & 15) | 64), (r[8] = (r[8] & 63) | 128), Fl(r));
}
function dn(e, t, n) {
  return pa.randomUUID && !e ? pa.randomUUID() : jl(e);
}
class _i {
  [Dr] = !0;
  _data;
  taxonSet;
  constructor(t = {}) {
    const { data: n, taxonSet: r } = t;
    let i = n;
    (r ? (this.taxonSet = r) : (this.taxonSet = new sn()),
      i === void 0 &&
        (i = {
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
                _id: dn(),
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
      (this._data = i));
  }
  lockTaxa() {
    return (this.taxonSet.lockTaxa(), this);
  }
  addTaxon(t) {
    return (this.taxonSet.addTaxon(t), this);
  }
  getTaxonCount() {
    return this.taxonSet.getTaxonCount();
  }
  getTaxonSet() {
    return this.taxonSet;
  }
  static fromNewick(t, n = {}) {
    return Fr(t, n);
  }
  static fromNexus(t, n) {
    const r = new this();
    return fl(r, t, n);
  }
  static fromString(t, n) {
    return t.toLowerCase().includes("#nexus")
      ? this.fromNexus(t, n)
      : this.fromNewick(t, n);
  }
  static fromTree(t, n) {
    let r = new this();
    const i = (a, s) => {
      const o = [];
      let c;
      for (const u of a.getChildren(s)) o.push(i(a, u));
      s !== n
        ? ((r = this._addNodeWithMetadata(a, s, r)),
          (c = r.getNode(r.getNodeCount() - 1)))
        : ((c = r.getRoot()), this._copyNodeMetadata(a, s, r, c));
      for (const u of o) r = r.addChild(c, u);
      return c;
    };
    return (i(t, n), (r = r.deleteLength(r.getRoot())), r);
  }
  static _addNodeWithMetadata(t, n, r) {
    const i = r.addNodes(1),
      a = i.nodes[0];
    return ((r = i.tree), (r = this._copyNodeMetadata(t, n, r, a)), r);
  }
  static _copyNodeMetadata(t, n, r, i) {
    if (t.hasTaxon(n)) {
      const a = t.getTaxonFromNode(n);
      ((r = r.addTaxon(a)),
        console.log("Current taxa:", r.taxonSet),
        (r = r.setTaxon(i, a)));
    }
    if (t.hasLabel(n)) {
      const a = t.getLabel(n);
      r = r.setLabel(i, a);
    }
    for (const a of t.getAnnotationKeys())
      if (t.hasAnnotation(n, a)) {
        const s = t.getFullNodeAnnotation(n, a);
        if (s.type === V.MARKOV_JUMPS) {
          const o = s.value.map((c) => [Number(c.time), c.from, c.to]);
          r = r.annotateNode(i, a, o);
        } else r = r.annotateNode(i, a, s.value);
      }
    if (t.hasBranchLength(n)) {
      const a = t.getLength(n);
      r = r.setLength(i, a);
    }
    return r;
  }
  isRooted() {
    return this._data.is_rooted;
  }
  getAnnotationType(t) {
    if (this._data.annotations[t] === void 0)
      throw new Error(`No annotation found with name: ${t}`);
    return this._data.annotations[t].type;
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
    return this._data.nodes.allNodes.filter((t) => t.children.length > 0)
      .length;
  }
  getExternalNodeCount() {
    return this._data.nodes.allNodes.filter((t) => t.children.length == 0)
      .length;
  }
  getInternalNodes() {
    return this._data.nodes.allNodes.filter((t) => t.children.length > 0);
  }
  getExternalNodes() {
    return this._data.nodes.allNodes.filter((t) => t.children.length == 0);
  }
  getNodes() {
    return this._data.nodes.allNodes;
  }
  getNode(t) {
    const n = wi(this, t);
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error("No node found");
    }
  }
  getNodeByTaxon(t) {
    const n = qr(this, t);
    switch (n.type) {
      case B.Nothing:
        throw new Error(`No node found for Taxon ${t.name}`);
      case B.Some:
        return n.value;
    }
  }
  getTaxonByName(t) {
    return this.taxonSet.getTaxonByName(t);
  }
  getNodeByLabel(t) {
    return this.getNode(this._data.nodes.byLabel[t]);
  }
  hasTaxon(t) {
    switch (Hr(this, t).type) {
      case B.Some:
        return !0;
      case B.Nothing:
        return !1;
    }
  }
  getTaxonFromNode(t) {
    const n = Hr(this, t);
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error("Node taxon found for the provided node");
    }
  }
  getTaxon(t) {
    const n = Us(this, t);
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error("Node taxon found that matched the provided id");
    }
  }
  hasNodeHeights() {
    throw new Error("hasNodeHeights not implemented.");
  }
  getHeight(t) {
    let n = -1;
    for (const r of er(this)) {
      const i = this.getDivergence(r);
      i > n && (n = i);
    }
    return n - this.getDivergence(t);
  }
  hasBranchLength(t) {
    return this.getNode(t.number).length !== void 0;
  }
  getLength(t) {
    const r = this.getNode(t.number).length;
    if (r === void 0) {
      if (this.hasLengths())
        throw new Error(
          `The tree has lengths but, no length was found for node ${t.number}`,
        );
      return (
        console.warn(
          "The tree does not have branchlengths so a length of 1 is used as default",
        ),
        1
      );
    }
    return r;
  }
  hasLengths() {
    return this._data.hasLengths;
  }
  _toString(t, n) {
    return (
      n === void 0 && (n = { blFormat: Zt("0.2"), includeAnnotations: !1 }),
      (this.getChildCount(t) > 0
        ? `(${this.getChildren(t)
            .map((r) => this._toString(r, n))
            .join(",")})${this.hasLabel(t) ? "#" + this.getLabel(t) : ""}`
        : this.hasTaxon(t)
          ? this.getTaxonFromNode(t).name
          : "") +
        (n.includeAnnotations ? this._writeAnnotations(t) : "") +
        (this.hasBranchLength(t) ? `:${n.blFormat(this.getLength(t))}` : "")
    );
  }
  _writeAnnotations(t) {
    const n = this._data.nodes.allNodes[t.number].annotations;
    if (Object.keys(n).length === 0) return "";
    let r = "[&",
      i = 0;
    for (const [a, s] of Object.entries(n))
      (i > 0 && (r += ", "), (r += `${a}=${Gu(s)}`), (i += 1));
    return ((r += "]"), r);
  }
  toNewick(t, n) {
    const r = { blFormat: Zt("0.2"), includeAnnotations: !1, ...n };
    return (t === void 0 && (t = this.getRoot()), this._toString(t, r) + ";");
  }
  getMRCA(t, n) {
    if (Array.isArray(t)) {
      const r = t;
      if (r.length === 0) throw new Error("No nodes provided to get MRCA");
      let i = r[0];
      for (let a = 1; a < r.length; a++)
        if (((i = this.getMRCA(i, r[a])), this.isRoot(i))) return i;
      return i;
    } else {
      if (n === void 0)
        throw new Error(
          "No second node provided. A node must be provided if the first value is not an array",
        );
      const r = [...this.getPathToRoot(t)];
      let i = null;
      for (const a of this.getPathToRoot(n))
        if (r.includes(a)) {
          i = a;
          break;
        }
      if (i === null) throw new Error("No MRCA found");
      return i;
    }
  }
  getPath(t, n) {
    const r = [],
      i = this.getMRCA(t, n);
    for (let a of [t, n]) for (; a != i; ) (r.push(a), (a = this.getParent(a)));
    return r;
  }
  getPathLength(t, n) {
    let r = 0;
    const i = this.getMRCA(t, n);
    for (let a of [t, n])
      for (; a != i; ) {
        const s = this.getLength(a);
        ((r += s), (a = this.getParent(a)));
      }
    return r;
  }
  *getPathToRoot(t) {
    let n = t;
    for (; !this.isRoot(n); ) (yield n, (n = this.getParent(n)));
    yield n;
  }
  getNextSibling(t) {
    if (!this.hasLeftSibling(t) && !this.hasRightSibling(t))
      throw new Error(`Node ${t.number} has no sibling`);
    const n = this.getParent(t),
      r = n.children.map((i) => i).indexOf(t.number);
    return this.getChild(n, (r + 1) % this.getChildCount(n));
  }
  hasRightSibling(t) {
    const n = gr(this, t);
    switch (n.type) {
      case B.Nothing:
        return !1;
      case B.Some:
        return (
          n.value.children.map((r) => r).indexOf(t.number) <
          this.getChildCount(n.value) - 1
        );
    }
  }
  getRightSibling(t) {
    if (!this.hasRightSibling(t))
      throw new Error(`node ${t.number} does not have a right sibling`);
    const n = this.getParent(t),
      r = n.children.map((i) => i).indexOf(t.number);
    return this.getChild(n, r + 1);
  }
  hasLeftSibling(t) {
    const n = gr(this, t);
    switch (n.type) {
      case B.Nothing:
        return !1;
      case B.Some:
        return (
          this.getChildCount(n.value) > 1 &&
          n.value.children.map((r) => r).indexOf(t.number) > 0
        );
    }
  }
  getLeftSibling(t) {
    if (!this.hasLeftSibling(t))
      throw new Error(`node ${t.number} does not have a left sibling`);
    const n = this.getParent(t),
      r = n.children.map((i) => i).indexOf(t.number);
    return this.getChild(n, r - 1);
  }
  getDivergence(t) {
    let n = 0;
    for (const r of this.getPathToRoot(t))
      this.isRoot(r)
        ? this.hasBranchLength(r) && (n += this.getLength(r))
        : (n += this.getLength(r));
    return n;
  }
  getChildCount(t) {
    if (!this._data.nodes.allNodes[t.number])
      throw new Error(`Node ${t.number} not found`);
    return this._data.nodes.allNodes[t.number].children.length;
  }
  getChild(t, n) {
    return this._data.nodes.allNodes[
      this._data.nodes.allNodes[t.number].children[n]
    ];
  }
  getParent(t) {
    const n = gr(this, t);
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error(`No parent for node ${t.number}`);
    }
  }
  getChildren(t) {
    return this._data.nodes.allNodes[t.number].children.map((n) =>
      this.getNode(n),
    );
  }
  hasLabel(t) {
    return this._data.nodes.allNodes[t.number].label !== void 0;
  }
  getLabel(t) {
    const n = this._data.nodes.allNodes[t.number].label;
    if (n === void 0) throw new Error(`no label for node ${t.number}`);
    return n;
  }
  isExternal(t) {
    return this.getNode(t.number).children.length === 0;
  }
  isInternal(t) {
    return this.getNode(t.number).children.length > 0;
  }
  isRoot(t) {
    return this._data.rootNode === t.number;
  }
  addNodes(t = 1) {
    const n = [];
    return {
      tree: J(this, (r) => {
        const i = r._data.nodes.allNodes.length;
        for (let a = 0; a < t; a++) {
          const s = {
            number: i + a,
            children: [],
            parent: void 0,
            label: void 0,
            length: void 0,
            taxon: void 0,
            annotations: {},
            _id: dn(),
          };
          (n.push(s), r._data.nodes.allNodes.push(s));
        }
      }),
      nodes: n,
    };
  }
  setTaxon(t, n) {
    if (n !== this.taxonSet.getTaxonByName(n.name))
      throw new Error(
        `Taxon ${n.name} is either not in the taxon set. Has it been copied?`,
      );
    return J(this, (r) => {
      const i = r.getNode(t.number);
      ((i.taxon = n.number),
        (r._data.nodes.byTaxon[n.number] = t.number),
        (r._data.nodeToTaxon[t.number] = n.number));
    });
  }
  getAnnotationSummary(t) {
    if (this._data.annotations[t] === void 0)
      throw new Error(`No annotation with name ${t} found in tree`);
    return this._data.annotations[t];
  }
  getAnnotations() {
    return Object.values(this._data.annotations);
  }
  getAnnotation(t, n, r) {
    const i = mr(this, this.getNode(t.number), n);
    if (r === void 0) {
      const { value: a } = Zi(i, `Node ${t.number} is not annotated with ${n}`);
      return a;
    } else
      switch (i.type) {
        case B.Some:
          return i.value.value;
        case B.Nothing:
          return r;
      }
  }
  getFullNodeAnnotation(t, n) {
    const r = mr(this, this.getNode(t.number), n);
    return Zi(r, `Node ${t.number} is not annotated with ${n}`);
  }
  hasAnnotation(t, n) {
    switch (mr(this, this.getNode(t.number), n).type) {
      case B.Some:
        return !0;
      case B.Nothing:
        return !1;
    }
  }
  annotateNode(t, n, r) {
    if (typeof n == "string") {
      const i = n,
        s = Yu(r),
        o = this._data.annotations[i];
      if (o !== void 0 && o.type !== s.type)
        throw new Error(
          `Tried annotation ${i} was parsed as ${s.type} - but is ${o.type} in tree.`,
        );
      return J(this, (c) => {
        const u = o ? o.domain : void 0,
          l = ql(s, u);
        ((c._data.nodes.allNodes[t.number].annotations[i] = {
          id: i,
          type: s.type,
          value: s.value,
        }),
          (c._data.annotations[i] = { id: i, type: s.type, domain: l }));
      });
    } else {
      let i = this;
      for (const [a, s] of Object.entries(n)) i = i.annotateNode(t, a, s);
      return i;
    }
  }
  setHeight(t, n) {
    if (!this.hasLengths())
      throw new Error(
        "Can not set the heights of nodes in a tree without branch lengths",
      );
    return J(this, (r) => {
      const i = r.getNode(t.number);
      if (n < 0) throw new Error("Height must be non-negative");
      const s = r.getHeight(t) - n;
      if (i.length === void 0) {
        if (!r.isRoot(t))
          throw new Error("Cannot set height on a node without length");
      } else i.length = i.length + s;
      for (const o of r.getChildren(t)) {
        const c = r.getNode(o.number),
          u = r.getLength(c) - s;
        c.length = u;
      }
    });
  }
  setLength(t, n) {
    return J(this, (r) => {
      const i = r.getNode(t.number);
      ((i.length = n), (r._data.hasLengths = !0));
    });
  }
  deleteLength(t) {
    return J(this, (n) => {
      const r = n.getNode(t.number);
      r.length = void 0;
    });
  }
  setDivergence(t, n) {
    if (!this.hasLengths())
      throw new Error(
        "Can not set the divergences of nodes in a tree without branch lengths",
      );
    return J(this, (r) => {
      const i = r.getNode(t.number),
        a = r.getHeight(t),
        c = r.getHeight(r.getRoot()) - a - n,
        u = r.getLength(t);
      i.length = u - c;
    });
  }
  setLabel(t, n) {
    if (this._data.nodes.byLabel[n] !== void 0)
      throw new Error(`Duplicate node label ${n}`);
    return J(this, (r) => {
      const i = r.getNode(t.number);
      ((i.label = n), (r._data.nodes.byLabel[n] = t.number));
    });
  }
  insertNode(t, n = 0.5) {
    return J(this, (r) => {
      const i = {
        number: r._data.nodes.allNodes.length,
        children: [],
        parent: void 0,
        label: "",
        length: void 0,
        taxon: void 0,
        annotations: {},
        _id: dn(),
      };
      (r._data.nodes.allNodes.push(i), (r._data.nodes.byTaxon.length += 1));
      const a = r.getNode(t.number),
        s = r.getParent(a),
        o = s.children.indexOf(a.number);
      (s.children.splice(o, 1, i.number), (i.parent = s.number));
      const u = r.getLength(a);
      ((a.length = u * (1 - n)),
        (i.length = u * n),
        (i.children = [a.number]),
        (a.parent = i.number));
    });
  }
  unroot(t) {
    throw new Error("unroot not implemented in immutable tree");
  }
  deleteNode(t) {
    throw new Error("deleteNode not implemented in immutable tree");
  }
  deleteClade(t) {
    throw new Error("deleteClade not implemented in immutable tree");
  }
  orderNodesByDensity(t, n) {
    return J(this, (r) => {
      n === void 0 && (n = r._data.nodes.allNodes[r._data.rootNode]);
      const i = t ? 1 : -1;
      Os(r._data, n, (a, s, o, c) => (s - c) * i);
    });
  }
  rotate(t, n = !1) {
    return J(this, (r) => {
      const i = r.getNode(t.number);
      if (((i.children = i.children.reverse()), n))
        for (const a of i.children.map((s) => r.getNode(s))) r.rotate(a, n);
    });
  }
  reroot(t, n = 0.5) {
    return J(this, (r) => {
      if (t.number === r._data.rootNode) return;
      const i = r.getRoot();
      i.children.length !== 2 &&
        console.warn(
          "Root node has more than two children and we are rerooting! There be dragons!",
        );
      let a = 0;
      if (i.children.length == 2)
        a = i.children
          .map((o) => r.getNode(o))
          .map((o) => r.getLength(o))
          .reduce((o, c) => c + o, 0);
      else {
        const o = [...r.getPathToRoot(t)],
          c = o[o.length - 2];
        if (
          (Q(c, "Index error when looking for the root child"),
          !i.children.includes(c.number))
        )
          throw new Error(
            "Root child not in path to root - likely an internal error",
          );
        a = r.getLength(c);
      }
      const s = r.getNode(t.number);
      if (r.getParent(t) !== i) {
        let o = s,
          c = r.getParent(s);
        const u = r.getChild(c, 0).number === t.number,
          l = s,
          h = c;
        let f = r.getLength(c);
        for (; !r.isRoot(c); ) {
          if (
            ((c.children = c.children.filter((m) => m !== o.number)),
            r.getParent(c).number === i.number)
          )
            if (i.children.length == 2) {
              if (!r.hasLeftSibling(c) && !r.hasRightSibling(c))
                throw new Error("no sibling in rerooting");
              const g = r.hasLeftSibling(c)
                ? r.getLeftSibling(c)
                : r.getRightSibling(c);
              (c.children.push(g.number),
                (g.parent = c.number),
                (g.length = a));
            } else {
              const m = {
                number: r._data.nodes.allNodes.length,
                children: [],
                parent: void 0,
                label: "",
                length: void 0,
                taxon: void 0,
                annotations: {},
                _id: dn(),
              };
              (r._data.nodes.allNodes.push(m),
                (m.length = a),
                c.children.push(m.number),
                (m.parent = c.number));
              for (const g of i.children) {
                const x = r.getNode(g);
                x.number !== c.number &&
                  ((x.parent = m.number), m.children.push(x.number));
              }
            }
          else {
            const m = r.getParent(c),
              g = r.getLength(m);
            ((m.length = f), (f = g), c.children.push(m.number));
          }
          ((o = c), (c = r.getParent(c)));
        }
        ((l.parent = i.number),
          (h.parent = i.number),
          (i.children = [l.number, h.number]),
          u || (i.children = i.children.reverse()),
          this.getInternalNodes().forEach((m) => {
            for (const g of r.getChildren(m)) g.parent = m.number;
          }));
        const d = r.getLength(l) * n;
        ((h.length = d),
          Q(l.length, "Expected the root's new child to have a length"),
          (l.length -= d));
      } else {
        const o = r.getLength(t) * (1 - n);
        s.length = o;
        const c = r.getNextSibling(t);
        c.length = a - o;
      }
    });
  }
  removeChild(t, n) {
    return J(this, (r) => {
      ((r._data.nodes.allNodes[t.number].children = r._data.nodes.allNodes[
        t.number
      ].children.filter((i) => i !== n.number)),
        (r._data.nodes.allNodes[n.number].parent = -1));
    });
  }
  sortChildren(t, n) {
    return J(this, (r) => {
      r._data.nodes.allNodes[t.number].children = this._data.nodes.allNodes[
        t.number
      ].children
        .map((i) => r.getNode(i))
        .sort(n)
        .map((i) => i.number);
    });
  }
  addChild(t, n) {
    return J(this, (r) => {
      const i = r.getNode(n.number);
      (r.getNode(t.number).children.push(i.number), (i.parent = t.number));
    });
  }
  setRoot(t) {
    return J(this, (n) => {
      n._data.rootNode = t.number;
    });
  }
}
function Os(e, t, n) {
  let r = 0;
  if (e.nodes.allNodes[t.number].children.length > 0) {
    const i = new Map();
    for (const o of e.nodes.allNodes[t.number].children.map(
      (c) => e.nodes.allNodes[c],
    )) {
      const c = Os(e, o, n);
      (i.set(o.number, c), (r += c));
    }
    const a = e.nodes.allNodes[t.number].children
      .slice()
      .sort((o, c) =>
        n(
          e.nodes.allNodes[o],
          fe(i.get(o), "Internal error when ordering. Counts not defined."),
          e.nodes.allNodes[c],
          fe(i.get(c), "Internal error when ordering. Counts not defined."),
        ),
      );
    a.reduce(
      (o, c, u) => o || c !== e.nodes.allNodes[t.number].children[u],
      !0,
    ) && (e.nodes.allNodes[t.number].children = a);
  } else r = 1;
  return r;
}
function* js(e, t = void 0) {
  const n = function* (r) {
    yield e.getNode(r.number);
    const i = e.getChildCount(r);
    if (i > 0)
      for (let a = 0; a < i; a++) {
        const s = e.getChild(r, a);
        yield* n(s);
      }
  };
  (t === void 0 && (t = e.getRoot()), yield* n(t));
}
function* zl(e, t = void 0, n = (r, i) => r.number - i.number) {
  const r = function* (i, a = void 0) {
    yield e.getNode(i.number);
    const s = [...e.getChildren(i), e.getParent(i)].filter(
      (o) => o.number !== a,
    );
    s.sort(n);
    for (const o of s) yield* r(o, i.number);
  };
  (t === void 0 && (t = e.getRoot()), yield* r(t));
}
function* Bl(e, t = void 0, n = (r, i) => r.number - i.number) {
  const r = function* (i, a = void 0) {
    const s = [...e.getChildren(i), e.getParent(i)].filter(
      (o) => o.number !== a,
    );
    s.sort(n);
    for (const o of s) yield* r(o, i.number);
    yield e.getNode(i.number);
  };
  (t === void 0 && (t = e.getRoot()), yield* r(t));
}
function* zs(e, t = void 0) {
  const n = function* (r) {
    const i = e.getChildCount(r);
    if (i > 0)
      for (let a = 0; a < i; a++) {
        const s = e.getChild(r, a);
        yield* n(s);
      }
    yield r;
  };
  (t === void 0 && (t = e.getRoot()), yield* n(t));
}
function* er(e, t) {
  t === void 0 && (t = e.getRoot());
  const n = function* (r) {
    const i = e.getChildCount(r);
    if (i > 0)
      for (let a = 0; a < i; a++) {
        const s = e.getChild(r, a);
        yield* n(s);
      }
    else yield r;
  };
  yield* n(t);
}
function* Vl(e, t) {
  let n = t;
  for (; !e.isRoot(n); ) (yield n, (n = e.getParent(n)));
  yield n;
}
function ql(e, t) {
  switch (e.type) {
    case V.BOOLEAN:
      return [!0, !1];
    case V.DISCRETE: {
      const n = e.value;
      if (t !== void 0) {
        const r = t;
        return [...new Set([...r, n])].sort();
      } else return [n];
    }
    case V.NUMERICAL: {
      const n = e.value;
      return lt([...(t || []), n]);
    }
    case V.DISCRETE_SET: {
      const n = e.value,
        r = t || [];
      return [...new Set([...r, ...n])].sort();
    }
    case V.NUMERICAL_SET: {
      const n = e.value;
      return lt([...(t || []), ...n]);
    }
    case V.DENSITIES:
      if (t !== void 0) {
        const n = t;
        return [...new Set([...n, ...Object.keys(e.value)])].sort();
      } else return [...new Set(Object.keys(e.value))].sort().filter((n) => n);
    case V.MARKOV_JUMPS: {
      const n = e.value.reduce((i, a) => i.concat([a.to, a.from]), []),
        r = t || [];
      return [...new Set([...r, ...n])].sort();
    }
    default:
      throw new Error("Unrecognized type  when updating domain");
  }
}
function Hl() {
  return {
    lastChunk: "",
    status: "parsing",
    end: "",
    start() {},
    transform(e, t) {
      const n = this.lastChunk + e;
      let r = "";
      for (let i = 0; i < n.length; i++) {
        const a = n[i];
        (Q(a, "Internal Error. Hit empty character in array"),
          this.status === "parsing"
            ? (([this.status, this.end] = Yl(a)),
              this.status === "in comment" &&
                (r.length > 0 && t.enqueue(r), (r = "")))
            : a === this.end && ((this.status = "parsing"), (this.end = "")),
          this.status === "parsing" && /\s|;|\]/.test(a)
            ? (r.length > 0 &&
                (/\]/.test(a) && (r += a), t.enqueue(r), (r = "")),
              /;/.test(a) && t.enqueue(a))
            : (r += a));
      }
      this.lastChunk = r;
    },
    flush(e) {
      this.lastChunk && e.enqueue(this.lastChunk);
    },
  };
}
function Yl(e) {
  return e === "'"
    ? ["in single quote", "'"]
    : e === '"'
      ? ["in double quote", '"']
      : e === "["
        ? ["in comment", "]"]
        : ["parsing", ""];
}
const xa = /\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/;
class Wl {
  reader;
  taxonSet;
  currentBlock;
  hasTree;
  options;
  translateTaxonMap;
  constructor(t, n = {}) {
    const r = new TransformStream(Hl());
    ((this.reader = t
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(r)
      .getReader()),
      (this.taxonSet = new sn()),
      (this.currentBlock = void 0),
      (this.options = n));
  }
  async *getTrees() {
    for (; this.currentBlock !== "trees"; )
      (await this.parseNextBlock(), (this.hasTree = !0));
    yield* this.parseTreesBlock();
  }
  async parseNextBlock() {
    const t = await this.getNextBlockName();
    switch (t) {
      case "taxa":
        ((this.currentBlock = "taxa"), await this.parseTaxaBlock());
        break;
      case "trees":
        this.currentBlock = "trees";
        break;
      default:
        (console.log(
          `skipping block ${t}. Only parsing blocks are taxa and trees for now.`,
        ),
          await this.readToEndOfBlock());
    }
  }
  async nextToken() {
    const { done: t, value: n } = await this.reader.read();
    if (t) throw new Error("unexpectedly hit the end of the stream");
    return n;
  }
  async skipSemiColon() {
    const { done: t, value: n } = await this.reader.read();
    if (t) throw new Error("unexpectedly hit the end of the stream");
    if (!n.match(/;$/)) throw new Error(`expected ";" got ${n}`);
  }
  async getNextBlockName() {
    let t = !0,
      n;
    for (; t; )
      (await this.nextToken()).match(/\bbegin/i) &&
        ((n = await this.nextToken()), await this.skipSemiColon(), (t = !1));
    return n;
  }
  async readToEndOfBlock() {
    let t = !0;
    for (; t; ) (await this.nextToken()).match(/\bend;/i) && (t = !1);
  }
  async skipUntil(t) {
    let n,
      r = !0;
    for (; r; ) ((n = await this.nextToken()), t.test(n) && (r = !1));
    if (n == null)
      throw new Error(`Internal parsing error: ${t.source} not found `);
    return n;
  }
  async readUntil(t) {
    let n = "",
      r = !0;
    for (; r; ) {
      const i = await this.nextToken();
      (t.test(i) && ((n += i), (r = !1)), (n += i));
    }
    return n;
  }
  async parseTaxaBlock() {
    let t,
      n = !0;
    for (; n; ) {
      const r = await this.skipUntil(/dimensions|taxlabels|end/i);
      switch (!0) {
        case /dimensions/i.test(r): {
          const i = await this.readUntil(/;/),
            a = i.match(/ntax=(\d+);/);
          if (a)
            (Q(a[1], "No number of taxa found despite matching regex"),
              (t = parseInt(a[1])));
          else
            throw new Error(
              `Expected dimension in form of ntax=(\\d+);. Got ${i}`,
            );
          break;
        }
        case /taxlabels/i.test(r): {
          let i = await this.nextToken();
          for (; i !== ";"; )
            (this.taxonSet.addTaxon(i), (i = await this.nextToken()));
          if (t && t != this.taxonSet.getTaxonCount())
            throw new Error(
              `found ${this.taxonSet.getTaxonCount()} taxa. Expected: ${t}}`,
            );
          break;
        }
        case /end/i.test(r): {
          if (this.taxonSet.getTaxonCount() === 0)
            throw new Error("hit end of taxa section but didn't find any taxa");
          (this.taxonSet.lockTaxa(), await this.skipSemiColon(), (n = !1));
          break;
        }
        default:
          throw new Error(
            `Reached impossible code looking for dimensions or taxlabels or end in taxa block "${r}"`,
          );
      }
    }
  }
  async *parseTreesBlock() {
    let t,
      n = !0;
    for (; n; ) {
      const r = await this.skipUntil(/translate|tree|end/i);
      switch (!0) {
        case /translate/i.test(r): {
          this.translateTaxonMap = new Map();
          let i = 0,
            a;
          for (t = await this.nextToken(); t !== ";"; ) {
            if (i % 2 == 0) a = t;
            else {
              if (
                (t[t.length - 1] === "," && (t = t.slice(0, -1)),
                this.taxonSet.isFinalized)
              ) {
                if (!this.taxonSet.hasTaxon(t))
                  throw new Error(
                    `Taxon ${t} not found in taxa block - but found in translate block`,
                  );
              } else this.taxonSet.addTaxon(t);
              (Q(
                a,
                "Error parsing nexus. Expected key for taxa but found nothing",
              ),
                this.translateTaxonMap.set(a, t));
            }
            for (t = await this.nextToken(); t === ","; )
              t = await this.nextToken();
            i++;
          }
          this.taxonSet.lockTaxa();
          break;
        }
        case /tree/i.test(r): {
          await this.nextToken();
          const i = new ks(this.taxonSet, {
            translateTaxonNames: this.translateTaxonMap,
          });
          t = await this.skipUntil(/\(/);
          let a = t
            .split(xa)
            .filter((o) => o.length > 0)
            .reverse();
          for (; !i.isDone(); ) {
            for (; a.length > 0; ) {
              const o = a.pop();
              (Q(o, "Unexpectedly hit the end of the buffer"),
                i.parseCharacter(o));
            }
            i.isDone() ||
              ((t = await this.nextToken()),
              (a = t
                .split(xa)
                .filter((o) => o.length > 0)
                .reverse()));
          }
          yield i.getTree();
          break;
        }
        case /end/i.test(r):
          (await this.skipSemiColon(),
            (this.hasTree = !1),
            this.reader.releaseLock(),
            (n = !1));
          break;
        default:
          throw new Error(`Reached impossible code in treeblock block "${r}"`);
      }
    }
  }
}
class Gl {
  _forwardCache;
  _reverseCache;
  constructor() {
    ((this._forwardCache = new Map()), (this._reverseCache = new Map()));
  }
  *traverse(t, n) {
    const r = function* (i) {
      const a = t.getChildCount(i);
      if (a > 0)
        for (let s = 0; s < a; s++) {
          const o = t.getChild(i, s);
          yield* r(o);
        }
      yield i;
    };
    (n === void 0 && (n = t.getRoot()), yield* r(n));
  }
  getNext(t, n) {
    const r = this._forwardCache.get(n);
    if (r !== void 0 && this._forwardCache.get(r) !== void 0) return r;
    if (t.isRoot(n)) return;
    const i = t.getParent(n);
    if (t.hasRightSibling(n)) {
      const a = t.getRightSibling(n);
      (this._forwardCache.set(n, a), this._reverseCache.set(a, n));
    } else (this._forwardCache.set(n, i), this._reverseCache.set(i, n));
    return this._forwardCache.get(n);
  }
  getPrevious(t, n) {
    const r = this._reverseCache.get(n);
    if (r !== void 0 && this._reverseCache.get(r) !== void 0) return r;
    if (n !== this.traverse(t).next().value) {
      if (t.isInternal(n)) {
        const i = t.getChildCount(n) - 1,
          a = t.getChild(n, i);
        (this._reverseCache.set(n, a), this._forwardCache.set(a, n));
      } else if (t.hasLeftSibling(n)) {
        const i = t.getLeftSibling(n);
        (this._reverseCache.set(n, i), this._forwardCache.set(i, n));
      } else {
        let i = n;
        for (; !t.hasLeftSibling(i); ) i = t.getParent(i);
        const a = t.getLeftSibling(i);
        (this._reverseCache.set(n, a), this._forwardCache.set(a, n));
      }
      return this._reverseCache.get(n);
    }
  }
}
var H = ((e) => (
  (e.Rectangular = "Rectangular"),
  (e.Polar = "Polar"),
  (e.Radial = "Radial"),
  e
))(H || {});
function Bs(e) {
  function t(n) {
    const r = new Map();
    let i = 0;
    for (const a of zs(n)) {
      let s;
      const o = n.getDivergence(a),
        c = n.getChildCount(a) > 0,
        u = !n.isRoot(a),
        l =
          n.getChildCount(a) > 0 && (!u || n.getChild(n.getParent(a), 0) !== a);
      if (n.isExternal(a)) ((s = { x: o, y: i }), i++);
      else {
        const f = n
            .getChildren(a)
            .map((m) =>
              fe(r.get(m), "Internal Error: child not yet found in layout"),
            ),
          d = fe(
            di(f, (m) => m.y),
            "Error taking the mean of child positions",
          );
        s = { x: o, y: d };
      }
      const h = {
        ...s,
        layoutClass: e,
        nodeLabel: {
          alignmentBaseline: c ? (l ? "bottom" : "hanging") : "middle",
          textAnchor: c ? "end" : "start",
          dxFactor: c ? -1 : 1,
          dyFactor: c ? (l ? -1 : 1) : 0,
          rotation: 0,
        },
      };
      r.set(a, h);
    }
    return function (a) {
      if (r.has(a)) return r.get(a);
      throw (
        console.log(a),
        new Error("Node not found in layout -  has the tree changed")
      );
    };
  }
  return t;
}
const Vs = Bs(H.Rectangular),
  Ql = Bs(H.Polar);
function Xl(e, t = {}) {
  const { spread: n = 1 } = t;
  console.log("radial layout with spread", n);
  const r = new Map(),
    i = [
      {
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        xpos: 0,
        ypos: 0,
        level: 0,
        number: e.getRoot().number,
      },
    ];
  for (const a of js(e)) {
    const s = i.pop();
    Q(s, "Internal Error, hit the end of the data stack unexpectedly");
    const { angleStart: o, angleEnd: c, xpos: u, ypos: l, level: h } = s,
      f = (o + c) / 2,
      d = e.isRoot(a) ? 0 : e.getLength(a),
      m = Math.cos(f),
      g = Math.sin(f),
      x = u + d * m,
      y = l + d * g,
      b = e.getChildCount(a) > 0;
    let p, _;
    ((p = Math.cos(f)), (_ = Math.sin(f)));
    const C = {
      x,
      y,
      layoutClass: H.Radial,
      theta: f,
      nodeLabel: {
        dxFactor: p,
        dyFactor: _,
        alignmentBaseline: "middle",
        textAnchor:
          ba(f) > Math.PI / 2 && ba(f) < (3 * Math.PI) / 2 ? "end" : "start",
        rotation: 0,
      },
    };
    if (e.getChildCount(a) > 0) {
      const k = [];
      let P = 0;
      for (let v = 0; v < e.getChildCount(a); v++) {
        const R = [...er(e, e.getChild(a, v))].length;
        ((k[v] = R), (P += R));
      }
      let I = c - o,
        L = o;
      e.getRoot() !== a &&
        ((I *= 1 + (n * Math.PI) / 180 / 10), (L = f - I / 2));
      let D = L;
      for (let v = e.getChildCount(a) - 1; v > -1; v--) {
        const R = D;
        ((D = R + (I * k[v]) / P),
          i.push({
            angleStart: R,
            angleEnd: D,
            xpos: x,
            ypos: y,
            level: h + 1,
            number: e.getChild(a, v).number,
          }));
      }
    }
    r.set(a, C);
  }
  return function (a) {
    if (r.has(a)) return r.get(a);
    throw new Error("Node not found in layout -  has the tree changed");
  };
}
function ba(e) {
  for (; e > 2 * Math.PI; ) e -= 2 * Math.PI;
  return e;
}
const Zl = () => ({
    x: 0,
    y: 0,
    layoutClass: H.Rectangular,
    nodeLabel: {
      alignmentBaseline: "middle",
      textAnchor: "end",
      dxFactor: 0,
      dyFactor: 0,
      rotation: 0,
    },
  }),
  bt = T.createContext(Zl),
  vt = T.createContext(!1),
  Kl = {
    canvasWidth: 0,
    canvasHeight: 0,
    domainX: [0, 1],
    domainY: [0, 1],
    layoutClass: H.Rectangular,
    invert: !1,
    pollard: 0,
    minRadius: 0,
    fishEye: { x: 0, y: 0, scale: 0 },
    rootAngle: 0,
    angleRange: 0,
  },
  un = T.createContext(Kl);
function Jl(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Ni(e, t, n) {
  ((e.prototype = t.prototype = n), (n.constructor = e));
}
function qs(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function cn() {}
var Kt = 0.7,
  Ln = 1 / Kt,
  ut = "\\s*([+-]?\\d+)\\s*",
  Jt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  eh = /^#([0-9a-f]{3,8})$/,
  th = new RegExp(`^rgb\\(${ut},${ut},${ut}\\)$`),
  nh = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`),
  rh = new RegExp(`^rgba\\(${ut},${ut},${ut},${Jt}\\)$`),
  ih = new RegExp(`^rgba\\(${ke},${ke},${ke},${Jt}\\)$`),
  ah = new RegExp(`^hsl\\(${Jt},${ke},${ke}\\)$`),
  sh = new RegExp(`^hsla\\(${Jt},${ke},${ke},${Jt}\\)$`),
  va = {
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
Ni(cn, en, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: wa,
  formatHex: wa,
  formatHex8: oh,
  formatHsl: uh,
  formatRgb: _a,
  toString: _a,
});
function wa() {
  return this.rgb().formatHex();
}
function oh() {
  return this.rgb().formatHex8();
}
function uh() {
  return Hs(this).formatHsl();
}
function _a() {
  return this.rgb().formatRgb();
}
function en(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = eh.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? Na(t)
          : n === 3
            ? new oe(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1,
              )
            : n === 8
              ? mn(
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  (t & 255) / 255,
                )
              : n === 4
                ? mn(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = th.exec(e))
        ? new oe(t[1], t[2], t[3], 1)
        : (t = nh.exec(e))
          ? new oe(
              (t[1] * 255) / 100,
              (t[2] * 255) / 100,
              (t[3] * 255) / 100,
              1,
            )
          : (t = rh.exec(e))
            ? mn(t[1], t[2], t[3], t[4])
            : (t = ih.exec(e))
              ? mn(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4],
                )
              : (t = ah.exec(e))
                ? Sa(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = sh.exec(e))
                  ? Sa(t[1], t[2] / 100, t[3] / 100, t[4])
                  : va.hasOwnProperty(e)
                    ? Na(va[e])
                    : e === "transparent"
                      ? new oe(NaN, NaN, NaN, 0)
                      : null
  );
}
function Na(e) {
  return new oe((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function mn(e, t, n, r) {
  return (r <= 0 && (e = t = n = NaN), new oe(e, t, n, r));
}
function ch(e) {
  return (
    e instanceof cn || (e = en(e)),
    e ? ((e = e.rgb()), new oe(e.r, e.g, e.b, e.opacity)) : new oe()
  );
}
function Yr(e, t, n, r) {
  return arguments.length === 1 ? ch(e) : new oe(e, t, n, r ?? 1);
}
function oe(e, t, n, r) {
  ((this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r));
}
Ni(
  oe,
  Yr,
  qs(cn, {
    brighter(e) {
      return (
        (e = e == null ? Ln : Math.pow(Ln, e)),
        new oe(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? Kt : Math.pow(Kt, e)),
        new oe(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new oe(Ge(this.r), Ge(this.g), Ge(this.b), Fn(this.opacity));
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
    hex: Ca,
    formatHex: Ca,
    formatHex8: lh,
    formatRgb: Ma,
    toString: Ma,
  }),
);
function Ca() {
  return `#${Ye(this.r)}${Ye(this.g)}${Ye(this.b)}`;
}
function lh() {
  return `#${Ye(this.r)}${Ye(this.g)}${Ye(this.b)}${Ye((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ma() {
  const e = Fn(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ge(this.r)}, ${Ge(this.g)}, ${Ge(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Fn(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ge(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ye(e) {
  return ((e = Ge(e)), (e < 16 ? "0" : "") + e.toString(16));
}
function Sa(e, t, n, r) {
  return (
    r <= 0
      ? (e = t = n = NaN)
      : n <= 0 || n >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
    new we(e, t, n, r)
  );
}
function Hs(e) {
  if (e instanceof we) return new we(e.h, e.s, e.l, e.opacity);
  if ((e instanceof cn || (e = en(e)), !e)) return new we();
  if (e instanceof we) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    r = e.b / 255,
    i = Math.min(t, n, r),
    a = Math.max(t, n, r),
    s = NaN,
    o = a - i,
    c = (a + i) / 2;
  return (
    o
      ? (t === a
          ? (s = (n - r) / o + (n < r) * 6)
          : n === a
            ? (s = (r - t) / o + 2)
            : (s = (t - n) / o + 4),
        (o /= c < 0.5 ? a + i : 2 - a - i),
        (s *= 60))
      : (o = c > 0 && c < 1 ? 0 : s),
    new we(s, o, c, e.opacity)
  );
}
function hh(e, t, n, r) {
  return arguments.length === 1 ? Hs(e) : new we(e, t, n, r ?? 1);
}
function we(e, t, n, r) {
  ((this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r));
}
Ni(
  we,
  hh,
  qs(cn, {
    brighter(e) {
      return (
        (e = e == null ? Ln : Math.pow(Ln, e)),
        new we(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? Kt : Math.pow(Kt, e)),
        new we(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * t,
        i = 2 * n - r;
      return new oe(
        pr(e >= 240 ? e - 240 : e + 120, i, r),
        pr(e, i, r),
        pr(e < 120 ? e + 240 : e - 120, i, r),
        this.opacity,
      );
    },
    clamp() {
      return new we($a(this.h), gn(this.s), gn(this.l), Fn(this.opacity));
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
      const e = Fn(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${$a(this.h)}, ${gn(this.s) * 100}%, ${gn(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  }),
);
function $a(e) {
  return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
}
function gn(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function pr(e, t, n) {
  return (
    (e < 60
      ? t + ((n - t) * e) / 60
      : e < 180
        ? n
        : e < 240
          ? t + ((n - t) * (240 - e)) / 60
          : t) * 255
  );
}
const Ci = (e) => () => e;
function fh(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function dh(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (r) {
      return Math.pow(e + r * t, n);
    }
  );
}
function mh(e) {
  return (e = +e) == 1
    ? Ys
    : function (t, n) {
        return n - t ? dh(t, n, e) : Ci(isNaN(t) ? n : t);
      };
}
function Ys(e, t) {
  var n = t - e;
  return n ? fh(e, n) : Ci(isNaN(e) ? t : e);
}
const ka = (function e(t) {
  var n = mh(t);
  function r(i, a) {
    var s = n((i = Yr(i)).r, (a = Yr(a)).r),
      o = n(i.g, a.g),
      c = n(i.b, a.b),
      u = Ys(i.opacity, a.opacity);
    return function (l) {
      return (
        (i.r = s(l)),
        (i.g = o(l)),
        (i.b = c(l)),
        (i.opacity = u(l)),
        i + ""
      );
    };
  }
  return ((r.gamma = e), r);
})(1);
function gh(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0,
    r = t.slice(),
    i;
  return function (a) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
    return r;
  };
}
function yh(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function ph(e, t) {
  var n = t ? t.length : 0,
    r = e ? Math.min(n, e.length) : 0,
    i = new Array(r),
    a = new Array(n),
    s;
  for (s = 0; s < r; ++s) i[s] = Mi(e[s], t[s]);
  for (; s < n; ++s) a[s] = t[s];
  return function (o) {
    for (s = 0; s < r; ++s) a[s] = i[s](o);
    return a;
  };
}
function xh(e, t) {
  var n = new Date();
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return (n.setTime(e * (1 - r) + t * r), n);
    }
  );
}
function Dn(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
function bh(e, t) {
  var n = {},
    r = {},
    i;
  ((e === null || typeof e != "object") && (e = {}),
    (t === null || typeof t != "object") && (t = {}));
  for (i in t) i in e ? (n[i] = Mi(e[i], t[i])) : (r[i] = t[i]);
  return function (a) {
    for (i in n) r[i] = n[i](a);
    return r;
  };
}
var Wr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  xr = new RegExp(Wr.source, "g");
function vh(e) {
  return function () {
    return e;
  };
}
function wh(e) {
  return function (t) {
    return e(t) + "";
  };
}
function _h(e, t) {
  var n = (Wr.lastIndex = xr.lastIndex = 0),
    r,
    i,
    a,
    s = -1,
    o = [],
    c = [];
  for (e = e + "", t = t + ""; (r = Wr.exec(e)) && (i = xr.exec(t)); )
    ((a = i.index) > n &&
      ((a = t.slice(n, a)), o[s] ? (o[s] += a) : (o[++s] = a)),
      (r = r[0]) === (i = i[0])
        ? o[s]
          ? (o[s] += i)
          : (o[++s] = i)
        : ((o[++s] = null), c.push({ i: s, x: Dn(r, i) })),
      (n = xr.lastIndex));
  return (
    n < t.length && ((a = t.slice(n)), o[s] ? (o[s] += a) : (o[++s] = a)),
    o.length < 2
      ? c[0]
        ? wh(c[0].x)
        : vh(t)
      : ((t = c.length),
        function (u) {
          for (var l = 0, h; l < t; ++l) o[(h = c[l]).i] = h.x(u);
          return o.join("");
        })
  );
}
function Mi(e, t) {
  var n = typeof t,
    r;
  return t == null || n === "boolean"
    ? Ci(t)
    : (n === "number"
        ? Dn
        : n === "string"
          ? (r = en(t))
            ? ((t = r), ka)
            : _h
          : t instanceof en
            ? ka
            : t instanceof Date
              ? xh
              : yh(t)
                ? gh
                : Array.isArray(t)
                  ? ph
                  : (typeof t.valueOf != "function" &&
                        typeof t.toString != "function") ||
                      isNaN(t)
                    ? bh
                    : Dn)(e, t);
}
function Nh(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return Math.round(e * (1 - n) + t * n);
    }
  );
}
function Ch(e) {
  return function () {
    return e;
  };
}
function Mh(e) {
  return +e;
}
var Ta = [0, 1];
function it(e) {
  return e;
}
function Gr(e, t) {
  return (t -= e = +e)
    ? function (n) {
        return (n - e) / t;
      }
    : Ch(isNaN(t) ? NaN : 0.5);
}
function Sh(e, t) {
  var n;
  return (
    e > t && ((n = e), (e = t), (t = n)),
    function (r) {
      return Math.max(e, Math.min(t, r));
    }
  );
}
function $h(e, t, n) {
  var r = e[0],
    i = e[1],
    a = t[0],
    s = t[1];
  return (
    i < r ? ((r = Gr(i, r)), (a = n(s, a))) : ((r = Gr(r, i)), (a = n(a, s))),
    function (o) {
      return a(r(o));
    }
  );
}
function kh(e, t, n) {
  var r = Math.min(e.length, t.length) - 1,
    i = new Array(r),
    a = new Array(r),
    s = -1;
  for (
    e[r] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
    ++s < r;

  )
    ((i[s] = Gr(e[s], e[s + 1])), (a[s] = n(t[s], t[s + 1])));
  return function (o) {
    var c = Uu(e, o, 1, r) - 1;
    return a[c](i[c](o));
  };
}
function Th(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function Ph() {
  var e = Ta,
    t = Ta,
    n = Mi,
    r,
    i,
    a,
    s = it,
    o,
    c,
    u;
  function l() {
    var f = Math.min(e.length, t.length);
    return (
      s !== it && (s = Sh(e[0], e[f - 1])),
      (o = f > 2 ? kh : $h),
      (c = u = null),
      h
    );
  }
  function h(f) {
    return f == null || isNaN((f = +f))
      ? a
      : (c || (c = o(e.map(r), t, n)))(r(s(f)));
  }
  return (
    (h.invert = function (f) {
      return s(i((u || (u = o(t, e.map(r), Dn)))(f)));
    }),
    (h.domain = function (f) {
      return arguments.length ? ((e = Array.from(f, Mh)), l()) : e.slice();
    }),
    (h.range = function (f) {
      return arguments.length ? ((t = Array.from(f)), l()) : t.slice();
    }),
    (h.rangeRound = function (f) {
      return ((t = Array.from(f)), (n = Nh), l());
    }),
    (h.clamp = function (f) {
      return arguments.length ? ((s = f ? !0 : it), l()) : s !== it;
    }),
    (h.interpolate = function (f) {
      return arguments.length ? ((n = f), l()) : n;
    }),
    (h.unknown = function (f) {
      return arguments.length ? ((a = f), h) : a;
    }),
    function (f, d) {
      return ((r = f), (i = d), l());
    }
  );
}
function Ah() {
  return Ph()(it, it);
}
function Eh(e, t, n, r) {
  var i = Vu(e, t, n),
    a;
  switch (((r = In(r ?? ",f")), r.type)) {
    case "s": {
      var s = Math.max(Math.abs(e), Math.abs(t));
      return (
        r.precision == null && !isNaN((a = Rl(i, s))) && (r.precision = a),
        Fs(r, s)
      );
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null &&
        !isNaN((a = Il(i, Math.max(Math.abs(e), Math.abs(t))))) &&
        (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null &&
        !isNaN((a = El(i))) &&
        (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return Zt(r);
}
function Rh(e) {
  var t = e.domain;
  return (
    (e.ticks = function (n) {
      var r = t();
      return Bu(r[0], r[r.length - 1], n ?? 10);
    }),
    (e.tickFormat = function (n, r) {
      var i = t();
      return Eh(i[0], i[i.length - 1], n ?? 10, r);
    }),
    (e.nice = function (n) {
      n == null && (n = 10);
      var r = t(),
        i = 0,
        a = r.length - 1,
        s = r[i],
        o = r[a],
        c,
        u,
        l = 10;
      for (
        o < s && ((u = s), (s = o), (o = u), (u = i), (i = a), (a = u));
        l-- > 0;

      ) {
        if (((u = Ir(s, o, n)), u === c)) return ((r[i] = s), (r[a] = o), t(r));
        if (u > 0) ((s = Math.floor(s / u) * u), (o = Math.ceil(o / u) * u));
        else if (u < 0)
          ((s = Math.ceil(s * u) / u), (o = Math.floor(o * u) / u));
        else break;
        c = u;
      }
      return e;
    }),
    e
  );
}
function ge() {
  var e = Ah();
  return (
    (e.copy = function () {
      return Th(e, ge());
    }),
    Jl.apply(e, arguments),
    Rh(e)
  );
}
function Ih(e, t, n, r, i = !1, a = 0, s = 1.7 * Math.PI, o = 0, c = 0) {
  const u = Math.min(n, r) / 2,
    l = We(s),
    h = e * c,
    f = i ? [a * u, u].reverse() : [a * u, u],
    d = ge().domain([h, e]).range(f),
    m = o + (2 * 3.14 - l) / 2,
    g = m + l,
    x = ge().domain([0, t]).range([m, g]),
    y = [[0, 0], At(u, m), At(u, g)],
    b = We(m),
    p = We(b + l);
  if (p > b)
    for (const Y of [Math.PI / 2, Math.PI, (3 * Math.PI) / 2].filter(
      (z) => z > b && z < p,
    )) {
      const [z, W] = At(u, Y);
      y.push([z, W]);
    }
  else
    for (const Y of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].filter(
      (z) => z > b || z < p,
    )) {
      const [z, W] = At(u, Y);
      y.push([z, W]);
    }
  const _ = lt(y, (Y) => Y[0]),
    C = lt(y, (Y) => Y[1]),
    k = (_[1] - _[0]) / (C[1] - C[0]),
    P = Math.min(n, r * k),
    I = P,
    L = P / k,
    D = (n - I) / 2,
    v = (r - L) / 2,
    R = [v, r - v],
    S = [D, n - D],
    A = ge().domain(_).range(S),
    K = ge().domain(C).range(R);
  return function (z) {
    const [W, G] = [d(z.x), x(z.y)],
      [xe, Ce] = At(W, G),
      te = We(G),
      je = {
        alignmentBaseline: "middle",
        textAnchor:
          te > Math.PI / 2 && te < (3 * Math.PI) / 2 ? "end" : " start",
        dxFactor: Math.cos(te),
        dyFactor: Math.sin(te),
        rotation: Ws(te),
      };
    return { ...z, x: A(xe), y: K(Ce), r: W, theta: G, nodeLabel: je };
  };
}
function At(e, t) {
  return [e * Math.cos(t), e * Math.sin(t)];
}
function We(e) {
  for (; e > 2 * Math.PI; ) e -= 2 * Math.PI;
  return e;
}
function Lh(e) {
  return (We(e) * 180) / Math.PI;
}
function Ws(e) {
  const t = Lh(We(e));
  return t > 90 && t < 270 ? t - 180 : t;
}
const Fh = {
  alignmentBaseline: "middle",
  textAnchor: "middle",
  dxFactor: 1,
  dyFactor: 1,
  rotation: 0,
};
function Dh({
  domainX: e,
  domainY: t,
  canvasWidth: n,
  canvasHeight: r,
  layoutClass: i,
  invert: a = !1,
  minRadius: s = 0,
  angleRange: o = 2 * Math.PI,
  rootAngle: c = 0,
  pollard: u = 0,
  fishEye: l = { x: 0, y: 0, scale: 0 },
}) {
  let h, f;
  switch (i) {
    case H.Rectangular: {
      const d = e[1] * u;
      ((h = ge().domain([d, e[1]]).range([0, n])),
        (f = ge().domain(t).range([0, r])));
      let m = (g) => f(g);
      if (l.scale > 0) {
        const g = f.invert(l.y),
          x = Uh(l.scale, g),
          y = f.copy().domain(f.domain().map(x));
        m = (b) => y(x(b));
      }
      return (
        a && h.range([n, 0]),
        function (x) {
          return { ...x, x: h(x.x), y: m(x.y) };
        }
      );
    }
    case H.Polar:
      return Ih(e[1], t[1], n, r, a, s, o, c, u);
    case H.Radial: {
      const d = ge().domain(e).range([0, 1]),
        m = ge().domain(t).range([0, 1]),
        g = Math.min(n, r),
        x = (n - g) / 2,
        y = (r - g) / 2,
        b = [x, g + x],
        p = [y, g + y];
      return (
        (f = ge().domain([0, 1]).range(p)),
        (h = ge().domain([0, 1]).range(b)),
        function (C) {
          return { ...C, x: h(d(C.x)), y: f(m(C.y)) };
        }
      );
    }
    default:
      throw new Error("Not implemented in calcX");
  }
}
const Uh = (e, t) => (n) => {
  if (e === 0) return n;
  const r = 1 / e,
    i = t - n,
    a = 1 - t / (r + t),
    s = 1 - (t - 1) / (r - (t - 1));
  return (1 - (i < 0 ? i / (r - i) : i / (r + i)) - a) / (s - a);
};
function Gs(e) {
  const t = (n) => {
    const r = T.useContext(Ie),
      i = T.useContext(bt),
      a = T.useContext(vt),
      { node: s, ...o } = n,
      c = r(i(s));
    return M.jsx(e, { ...o, x: c.x, y: c.y, animated: a });
  };
  return (
    (t.displayName = `withNode(${e.displayName || e.name || "Component"})`),
    t
  );
}
function Qs(e) {
  const t = (n) => {
    const r = T.useContext(Ie),
      i = T.useContext(bt),
      a = T.useContext(vt),
      { domainX: s, layoutClass: o } = T.useContext(un),
      { node: c, parent: u, aligned: l, gap: h = 6, ...f } = n,
      d = i(c),
      m = r(d);
    if (u === void 0) {
      const g = m.nodeLabel ?? Fh,
        x = g.dxFactor * h,
        y = g.dyFactor * h,
        b = r({ x: s[1], y: d.y }),
        p = (l ? b.x : m.x) + x,
        _ = (l && o === H.Polar ? b.y : m.y) + y,
        { alignmentBaseline: C, rotation: k, textAnchor: P } = g,
        I = l ? `M${m.x} ${m.y}L${p} ${_}` : `M${m.x} ${m.y}L${m.x} ${m.y}`;
      return M.jsx(e, {
        alignmentBaseline: C,
        rotation: k,
        textAnchor: P,
        d: I,
        x: p,
        y: _,
        ...f,
        animated: a,
      });
    } else {
      const g = i(u),
        x = r(g),
        y =
          o === H.Polar
            ? fe(
                m.theta,
                "The layout is polar but theta was not calculated for this node",
              )
            : 0,
        b = o === H.Polar ? Ws(y) : 0,
        p = r({ x: g.x, y: d.y }),
        { dx: _, dy: C } = o === H.Polar ? Oh(y, h) : { dx: 0, dy: -1 * h },
        k = (o === H.Polar ? (m.x + p.x) / 2 : (m.x + x.x) / 2) + _,
        P =
          (o === H.Polar
            ? (m.y + p.y) / 2
            : o === H.Radial
              ? (m.y + x.y) / 2
              : m.y) + C;
      return M.jsx(e, {
        alignmentBaseline: "baseline",
        rotation: b,
        textAnchor: "middle",
        x: k,
        y: P,
        ...f,
        animated: a,
      });
    }
  };
  return (
    (t.displayName = `withNodeLabel(${e.displayName || e.name || "Component"})`),
    t
  );
}
function Oh(e, t) {
  let n, r;
  return (
    e > 0 && e < Math.PI / 2
      ? ((n = Math.sin(Math.PI / 2 - e) * t),
        (r = -Math.cos(Math.PI / 2 - e) * t))
      : e > Math.PI / 2 && e < Math.PI
        ? ((n = -Math.cos(Math.PI / 2 - (Math.PI - e)) * t),
          (r = -Math.sin(Math.PI / 2 - (Math.PI - e)) * t))
        : e > Math.PI && e < (3 * Math.PI) / 2
          ? ((n = Math.cos(Math.PI / 2 - (e - Math.PI)) * t),
            (r = -Math.sin(Math.PI / 2 - (e - Math.PI)) * t))
          : ((n = -Math.cos(Math.PI / 2 - (2 * Math.PI - e)) * t),
            (r = -Math.sin(Math.PI / 2 - (2 * Math.PI - e)) * t)),
    { dx: n, dy: r }
  );
}
function Si(e) {
  const t = (n) => {
    const { nodes: r, keyBy: i = (o) => o._id, attrs: a = {}, aligned: s } = n;
    return M.jsx("g", {
      className: "node-layer",
      children: r.map((o) => {
        const c = a[o._id] ?? {};
        return M.jsx(e, { node: o, ...c, aligned: s }, i(o));
      }),
    });
  };
  return (
    (t.displayName = `withNodesArray(${e.displayName || e.name || "Component"})`),
    t
  );
}
function Xs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var br, Pa;
function jh() {
  if (Pa) return br;
  ((Pa = 1), (br = e));
  function e(t) {
    var n = 0,
      r = 0,
      i = 0,
      a = 0;
    return t.map(function (s) {
      s = s.slice();
      var o = s[0],
        c = o.toUpperCase();
      if (o != c)
        switch (((s[0] = c), o)) {
          case "a":
            ((s[6] += i), (s[7] += a));
            break;
          case "v":
            s[1] += a;
            break;
          case "h":
            s[1] += i;
            break;
          default:
            for (var u = 1; u < s.length; ) ((s[u++] += i), (s[u++] += a));
        }
      switch (c) {
        case "Z":
          ((i = n), (a = r));
          break;
        case "H":
          i = s[1];
          break;
        case "V":
          a = s[1];
          break;
        case "M":
          ((i = n = s[1]), (a = r = s[2]));
          break;
        default:
          ((i = s[s.length - 2]), (a = s[s.length - 1]));
      }
      return s;
    });
  }
  return br;
}
var zh = jh();
const Bh = Xs(zh);
var Vh = (function () {
    function e(t, n) {
      var r = [],
        i = !0,
        a = !1,
        s = void 0;
      try {
        for (
          var o = t[Symbol.iterator](), c;
          !(i = (c = o.next()).done) &&
          (r.push(c.value), !(n && r.length === n));
          i = !0
        );
      } catch (u) {
        ((a = !0), (s = u));
      } finally {
        try {
          !i && o.return && o.return();
        } finally {
          if (a) throw s;
        }
      }
      return r;
    }
    return function (t, n) {
      if (Array.isArray(t)) return t;
      if (Symbol.iterator in Object(t)) return e(t, n);
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance",
      );
    };
  })(),
  Dt = Math.PI * 2,
  vr = function (t, n, r, i, a, s, o) {
    var c = t.x,
      u = t.y;
    ((c *= n), (u *= r));
    var l = i * c - a * u,
      h = a * c + i * u;
    return { x: l + s, y: h + o };
  },
  qh = function (t, n) {
    var r =
        n === 1.5707963267948966
          ? 0.551915024494
          : n === -1.5707963267948966
            ? -0.551915024494
            : 1.3333333333333333 * Math.tan(n / 4),
      i = Math.cos(t),
      a = Math.sin(t),
      s = Math.cos(t + n),
      o = Math.sin(t + n);
    return [
      { x: i - a * r, y: a + i * r },
      { x: s + o * r, y: o - s * r },
      { x: s, y: o },
    ];
  },
  Aa = function (t, n, r, i) {
    var a = t * i - n * r < 0 ? -1 : 1,
      s = t * r + n * i;
    return (s > 1 && (s = 1), s < -1 && (s = -1), a * Math.acos(s));
  },
  Hh = function (t, n, r, i, a, s, o, c, u, l, h, f) {
    var d = Math.pow(a, 2),
      m = Math.pow(s, 2),
      g = Math.pow(h, 2),
      x = Math.pow(f, 2),
      y = d * m - d * x - m * g;
    (y < 0 && (y = 0),
      (y /= d * x + m * g),
      (y = Math.sqrt(y) * (o === c ? -1 : 1)));
    var b = ((y * a) / s) * f,
      p = ((y * -s) / a) * h,
      _ = l * b - u * p + (t + r) / 2,
      C = u * b + l * p + (n + i) / 2,
      k = (h - b) / a,
      P = (f - p) / s,
      I = (-h - b) / a,
      L = (-f - p) / s,
      D = Aa(1, 0, k, P),
      v = Aa(k, P, I, L);
    return (
      c === 0 && v > 0 && (v -= Dt),
      c === 1 && v < 0 && (v += Dt),
      [_, C, D, v]
    );
  },
  Yh = function (t) {
    var n = t.px,
      r = t.py,
      i = t.cx,
      a = t.cy,
      s = t.rx,
      o = t.ry,
      c = t.xAxisRotation,
      u = c === void 0 ? 0 : c,
      l = t.largeArcFlag,
      h = l === void 0 ? 0 : l,
      f = t.sweepFlag,
      d = f === void 0 ? 0 : f,
      m = [];
    if (s === 0 || o === 0) return [];
    var g = Math.sin((u * Dt) / 360),
      x = Math.cos((u * Dt) / 360),
      y = (x * (n - i)) / 2 + (g * (r - a)) / 2,
      b = (-g * (n - i)) / 2 + (x * (r - a)) / 2;
    if (y === 0 && b === 0) return [];
    ((s = Math.abs(s)), (o = Math.abs(o)));
    var p = Math.pow(y, 2) / Math.pow(s, 2) + Math.pow(b, 2) / Math.pow(o, 2);
    p > 1 && ((s *= Math.sqrt(p)), (o *= Math.sqrt(p)));
    var _ = Hh(n, r, i, a, s, o, h, d, g, x, y, b),
      C = Vh(_, 4),
      k = C[0],
      P = C[1],
      I = C[2],
      L = C[3],
      D = Math.abs(L) / (Dt / 4);
    Math.abs(1 - D) < 1e-7 && (D = 1);
    var v = Math.max(Math.ceil(D), 1);
    L /= v;
    for (var R = 0; R < v; R++) (m.push(qh(I, L)), (I += L));
    return m.map(function (S) {
      var A = vr(S[0], s, o, x, g, k, P),
        K = A.x,
        Y = A.y,
        z = vr(S[1], s, o, x, g, k, P),
        W = z.x,
        G = z.y,
        xe = vr(S[2], s, o, x, g, k, P),
        Ce = xe.x,
        te = xe.y;
      return { x1: K, y1: Y, x2: W, y2: G, x: Ce, y: te };
    });
  };
function Wh(e) {
  for (
    var t,
      n = [],
      r = 0,
      i = 0,
      a = 0,
      s = 0,
      o = null,
      c = null,
      u = 0,
      l = 0,
      h = 0,
      f = e.length;
    h < f;
    h++
  ) {
    var d = e[h],
      m = d[0];
    switch (m) {
      case "M":
        ((a = d[1]), (s = d[2]));
        break;
      case "A":
        var g = Yh({
          px: u,
          py: l,
          cx: d[6],
          cy: d[7],
          rx: d[1],
          ry: d[2],
          xAxisRotation: d[3],
          largeArcFlag: d[4],
          sweepFlag: d[5],
        });
        if (!g.length) continue;
        for (var x = 0, y; x < g.length; x++)
          ((y = g[x]),
            (d = ["C", y.x1, y.y1, y.x2, y.y2, y.x, y.y]),
            x < g.length - 1 && n.push(d));
        break;
      case "S":
        var b = u,
          p = l;
        ((t == "C" || t == "S") && ((b += b - r), (p += p - i)),
          (d = ["C", b, p, d[1], d[2], d[3], d[4]]));
        break;
      case "T":
        (t == "Q" || t == "T"
          ? ((o = u * 2 - o), (c = l * 2 - c))
          : ((o = u), (c = l)),
          (d = Ea(u, l, o, c, d[1], d[2])));
        break;
      case "Q":
        ((o = d[1]), (c = d[2]), (d = Ea(u, l, d[1], d[2], d[3], d[4])));
        break;
      case "L":
        d = yn(u, l, d[1], d[2]);
        break;
      case "H":
        d = yn(u, l, d[1], l);
        break;
      case "V":
        d = yn(u, l, u, d[1]);
        break;
      case "Z":
        d = yn(u, l, a, s);
        break;
    }
    ((t = m),
      (u = d[d.length - 2]),
      (l = d[d.length - 1]),
      d.length > 4
        ? ((r = d[d.length - 4]), (i = d[d.length - 3]))
        : ((r = u), (i = l)),
      n.push(d));
  }
  return n;
}
function yn(e, t, n, r) {
  return ["C", e, t, n, r, n, r];
}
function Ea(e, t, n, r, i, a) {
  return [
    "C",
    e / 3 + (2 / 3) * n,
    t / 3 + (2 / 3) * r,
    i / 3 + (2 / 3) * n,
    a / 3 + (2 / 3) * r,
    i,
    a,
  ];
}
var wr, Ra;
function Gh() {
  if (Ra) return wr;
  ((Ra = 1), (wr = n));
  var e = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 },
    t = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
  function n(a) {
    var s = [];
    return (
      a.replace(t, function (o, c, u) {
        var l = c.toLowerCase();
        for (
          u = i(u),
            l == "m" &&
              u.length > 2 &&
              (s.push([c].concat(u.splice(0, 2))),
              (l = "l"),
              (c = c == "m" ? "l" : "L"));
          ;

        ) {
          if (u.length == e[l]) return (u.unshift(c), s.push(u));
          if (u.length < e[l]) throw new Error("malformed path data");
          s.push([c].concat(u.splice(0, e[l])));
        }
      }),
      s
    );
  }
  var r = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
  function i(a) {
    var s = a.match(r);
    return s ? s.map(Number) : [];
  }
  return wr;
}
var Qh = Gh();
const Xh = Xs(Qh);
class _n {
  x;
  y;
  constructor(t, n) {
    ((this.x = t), (this.y = n));
  }
}
const _r = 6;
function Zs(e) {
  const t = Xh(e),
    n = Bh(t),
    r = Wh(n);
  let i = `${r[0][0]} ${r[0][1]} ${r[0][2]} `;
  const a = r
    .filter((s) => s[0] === "C")
    .map((s) => [new _n(s[1], s[2]), new _n(s[3], s[4]), new _n(s[5], s[6])]);
  if (a.length > _r)
    throw new Error(
      `Path must have no more than ${_r} nodes (excluding start point) detected ${a.length} nodes update layout or path.helpers`,
    );
  if (a.length == 0)
    throw new Error(
      "Path must have at least 1 node (excluding start point) update layout or path.helpers",
    );
  for (; a.length < _r; ) {
    const s = fe(a.pop(), "Internal error in normalization"),
      { left: o, right: c } = Zh(s, 0.5);
    (a.push(o), a.push(c.reverse()));
  }
  for (let s = 0; s < a.length; s++) {
    const o = a[s];
    i += `C${o[0].x},${o[0].y} ${o[1].x},${o[1].y} ${o[2].x},${o[2].y} `;
  }
  return i;
}
function Zh(e, t) {
  const n = [],
    r = [];
  function i(a, s) {
    if (a.length == 1) (n.push(a[0]), r.push(a[0]));
    else {
      const o = Array(a.length - 1);
      for (let c = 0; c < o.length; c++)
        (c == 0 && n.push(a[0]),
          c == o.length - 1 && r.push(a[c + 1]),
          (o[c] = new _n(
            (1 - s) * a[c].x + s * a[c + 1].x,
            (1 - s) * a[c].y + s * a[c + 1].y,
          )));
      i(o, s);
    }
  }
  return (i(e, t), { left: n, right: r });
}
function Kh(e) {
  const t = (n) => {
    const r = T.useContext(Ie),
      i = T.useContext(bt),
      a = T.useContext(vt),
      { node: s, parent: o, curvature: c = 0, ...u } = n,
      l = i(s),
      { layoutClass: h } = l,
      f = o ? i(o) : { x: l.x, y: l.y },
      d = { x: f.x, y: l.y },
      m = [f, l, d].map((x) => r(x)),
      g = Zs(Jh(m, c, h));
    return M.jsx(e, { d: g, animated: a, ...u });
  };
  return (
    (t.displayName = `withBranchArray(${e.displayName || e.name || "Component"})`),
    t
  );
}
function Jh(e, t, n) {
  switch (n) {
    case H.Rectangular:
      return ef(e, t);
    case H.Polar:
      return tf(e);
    case H.Radial:
      return nf(e);
    default:
      throw new Error(`path generator not implemented for the ${n} of points`);
  }
}
function ef(e, t) {
  const n = e.length;
  switch (n) {
    case 0:
      return "";
    case 3: {
      const [r, i] = e;
      return t === 0
        ? `M${r.x + 0.001},${r.y}L${r.x},${i.y}L${i.x},${i.y + 0.001}`
        : t < 1
          ? `M${r.x},${r.y}C${r.x},${i.y}, ${r.x + Math.abs(t * (r.x - i.x))},${i.y} ${i.x},${i.y}`
          : `M${r.x},${r.y}L${(r.x + i.x) / 2},${(r.y + i.y) / 2}L${i.x},${i.y}`;
    }
    default:
      throw new Error(
        `path rectangular generator not implemented for this ${n} of points`,
      );
  }
}
function tf(e) {
  const t = e.length;
  switch (t) {
    case 3: {
      const [n, r, i] = e,
        a =
          n.theta === r.theta || n.r === 0
            ? ""
            : `A${n.r},${n.r} 0 0 ${n.theta < r.theta ? 1 : 0} ${i.x},${i.y}`;
      return `M${n.x},${n.y} ${a} L${r.x},${r.y}`;
    }
    case 0:
      return "";
    default:
      throw new Error(
        `Error in polar path generator. not expecting ${t} points`,
      );
  }
}
function nf(e) {
  const t = e.length;
  switch (t) {
    case 0:
      return "";
    case 3: {
      const [n, r] = e;
      return `M${n.x},${n.y}L${(n.x + r.x) / 2},${(n.y + r.y) / 2}L${r.x},${r.y}`;
    }
    default:
      throw new Error(
        `path rectangular generator not implemented for this ${t} of points`,
      );
  }
}
function Ks(e) {
  const t = (n) => {
    const {
      branches: r,
      keyBy: i = (o) => o._id,
      attrs: a = {},
      curvature: s,
    } = n;
    return M.jsx("g", {
      className: "branch-layer",
      children: r.map(({ node: o, parent: c }) => {
        const u = a[o._id] ?? {};
        return M.jsx(e, { node: o, parent: c, ...u, curvature: s }, i(o));
      }),
    });
  };
  return (
    (t.displayName = `withBranchArray(${e.displayName || e.name || "Component"})`),
    t
  );
}
function Js(e) {
  const t = (n) => {
    const { clades: r, keyBy: i = (s) => s._id, attrs: a = {} } = n;
    return M.jsx("g", {
      className: "node-layer",
      children: r.map((s) => {
        const o = a[s.root._id] ?? {};
        return M.jsx(e, { clade: s, ...o }, i(s.root));
      }),
    });
  };
  return (
    (t.displayName = `withCladessArray(${e.displayName || e.name || "Component"})`),
    t
  );
}
const rf = Si(Gs($u)),
  af = Si(Gs(Eu));
function sf(e) {
  switch (e.shape) {
    case yt.Circle:
      return M.jsx(rf, { ...e });
    case yt.Rectangle:
      return M.jsx(af, { ...e });
  }
}
const of = Ks(Qs(ys)),
  uf = Si(Qs(ys)),
  cf = Ks(Kh(Qn));
function lf(e) {
  switch (e.target) {
    case 0:
      return M.jsx(sf, { ...e });
    case 1:
      return M.jsx(cf, { ...e });
    case 2:
      return M.jsx(uf, { ...e });
    case 3:
      return M.jsx(of, { ...e });
    case 4:
      return M.jsx(Pf, { ...e });
  }
}
var pe = ((e) => (
    (e[(e.Node = 0)] = "Node"),
    (e[(e.Branch = 1)] = "Branch"),
    (e[(e.NodeLabel = 2)] = "NodeLabel"),
    (e[(e.BranchLabel = 3)] = "BranchLabel"),
    (e[(e.Clade = 4)] = "Clade"),
    (e[(e.Axis = 5)] = "Axis"),
    e
  ))(pe || {}),
  yt = ((e) => (
    (e[(e.Circle = 0)] = "Circle"),
    (e[(e.Rectangle = 1)] = "Rectangle"),
    e
  ))(yt || {}),
  pt = ((e) => (
    (e[(e.Cartoon = 0)] = "Cartoon"),
    (e[(e.Highlight = 1)] = "Highlight"),
    e
  ))(pt || {});
function hf(e) {
  const { clade: t, ...n } = e,
    r = T.useContext(Ie),
    i = T.useContext(bt),
    a = T.useContext(vt),
    { root: s, leftMost: o, rightMost: c, mostDiverged: u } = t,
    l = r(i(s)),
    { x: h, y: f } = l,
    d = r(i(o)),
    m = r(i(c)),
    g = r(i(u)),
    { layoutClass: x } = i(s);
  let y;
  if (x === H.Rectangular) {
    const p = g.x,
      _ = m.y,
      C = d.y;
    y = `M${h},${f}L${p},${_}L${p},${C}Z`;
  } else if (x === H.Polar) {
    const p = d,
      _ = m,
      C =
        p.theta === _.theta || p.r === 0
          ? ""
          : `A${p.r},${p.r} 0 0 ${p.theta < _.theta ? 1 : 0} ${_.x},${_.y}`;
    y = `M${h},${f}L${p.x},${p.y} ${C} Z`;
  } else return null;
  const b = Zs(y);
  return M.jsx(Qn, { d: b, ...n, animated: a });
}
const ff = Js(hf);
function Fe(e) {
  return function () {
    return e;
  };
}
const Ia = Math.abs,
  ee = Math.atan2,
  Be = Math.cos,
  df = Math.max,
  Nr = Math.min,
  Me = Math.sin,
  at = Math.sqrt,
  ie = 1e-12,
  tn = Math.PI,
  Un = tn / 2,
  mf = 2 * tn;
function gf(e) {
  return e > 1 ? 0 : e < -1 ? tn : Math.acos(e);
}
function La(e) {
  return e >= 1 ? Un : e <= -1 ? -Un : Math.asin(e);
}
const Qr = Math.PI,
  Xr = 2 * Qr,
  qe = 1e-6,
  yf = Xr - qe;
function eo(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function pf(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return eo;
  const n = 10 ** t;
  return function (r) {
    this._ += r[0];
    for (let i = 1, a = r.length; i < a; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class xf {
  constructor(t) {
    ((this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = t == null ? eo : pf(t)));
  }
  moveTo(t, n) {
    this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +n)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(t, n) {
    this._append`L${(this._x1 = +t)},${(this._y1 = +n)}`;
  }
  quadraticCurveTo(t, n, r, i) {
    this._append`Q${+t},${+n},${(this._x1 = +r)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(t, n, r, i, a, s) {
    this
      ._append`C${+t},${+n},${+r},${+i},${(this._x1 = +a)},${(this._y1 = +s)}`;
  }
  arcTo(t, n, r, i, a) {
    if (((t = +t), (n = +n), (r = +r), (i = +i), (a = +a), a < 0))
      throw new Error(`negative radius: ${a}`);
    let s = this._x1,
      o = this._y1,
      c = r - t,
      u = i - n,
      l = s - t,
      h = o - n,
      f = l * l + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = t)},${(this._y1 = n)}`;
    else if (f > qe)
      if (!(Math.abs(h * c - u * l) > qe) || !a)
        this._append`L${(this._x1 = t)},${(this._y1 = n)}`;
      else {
        let d = r - s,
          m = i - o,
          g = c * c + u * u,
          x = d * d + m * m,
          y = Math.sqrt(g),
          b = Math.sqrt(f),
          p = a * Math.tan((Qr - Math.acos((g + f - x) / (2 * y * b))) / 2),
          _ = p / b,
          C = p / y;
        (Math.abs(_ - 1) > qe && this._append`L${t + _ * l},${n + _ * h}`,
          this
            ._append`A${a},${a},0,0,${+(h * d > l * m)},${(this._x1 = t + C * c)},${(this._y1 = n + C * u)}`);
      }
  }
  arc(t, n, r, i, a, s) {
    if (((t = +t), (n = +n), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i),
      c = r * Math.sin(i),
      u = t + o,
      l = n + c,
      h = 1 ^ s,
      f = s ? i - a : a - i;
    (this._x1 === null
      ? this._append`M${u},${l}`
      : (Math.abs(this._x1 - u) > qe || Math.abs(this._y1 - l) > qe) &&
        this._append`L${u},${l}`,
      r &&
        (f < 0 && (f = (f % Xr) + Xr),
        f > yf
          ? this
              ._append`A${r},${r},0,1,${h},${t - o},${n - c}A${r},${r},0,1,${h},${(this._x1 = u)},${(this._y1 = l)}`
          : f > qe &&
            this
              ._append`A${r},${r},0,${+(f >= Qr)},${h},${(this._x1 = t + r * Math.cos(a))},${(this._y1 = n + r * Math.sin(a))}`));
  }
  rect(t, n, r, i) {
    this
      ._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +n)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function bf(e) {
  let t = 3;
  return (
    (e.digits = function (n) {
      if (!arguments.length) return t;
      if (n == null) t = null;
      else {
        const r = Math.floor(n);
        if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
        t = r;
      }
      return e;
    }),
    () => new xf(t)
  );
}
function vf(e) {
  return e.innerRadius;
}
function wf(e) {
  return e.outerRadius;
}
function _f(e) {
  return e.startAngle;
}
function Nf(e) {
  return e.endAngle;
}
function Cf(e) {
  return e && e.padAngle;
}
function Mf(e, t, n, r, i, a, s, o) {
  var c = n - e,
    u = r - t,
    l = s - i,
    h = o - a,
    f = h * c - l * u;
  if (!(f * f < ie))
    return ((f = (l * (t - a) - h * (e - i)) / f), [e + f * c, t + f * u]);
}
function pn(e, t, n, r, i, a, s) {
  var o = e - n,
    c = t - r,
    u = (s ? a : -a) / at(o * o + c * c),
    l = u * c,
    h = -u * o,
    f = e + l,
    d = t + h,
    m = n + l,
    g = r + h,
    x = (f + m) / 2,
    y = (d + g) / 2,
    b = m - f,
    p = g - d,
    _ = b * b + p * p,
    C = i - a,
    k = f * g - m * d,
    P = (p < 0 ? -1 : 1) * at(df(0, C * C * _ - k * k)),
    I = (k * p - b * P) / _,
    L = (-k * b - p * P) / _,
    D = (k * p + b * P) / _,
    v = (-k * b + p * P) / _,
    R = I - x,
    S = L - y,
    A = D - x,
    K = v - y;
  return (
    R * R + S * S > A * A + K * K && ((I = D), (L = v)),
    {
      cx: I,
      cy: L,
      x01: -l,
      y01: -h,
      x11: I * (i / C - 1),
      y11: L * (i / C - 1),
    }
  );
}
function Sf() {
  var e = vf,
    t = wf,
    n = Fe(0),
    r = null,
    i = _f,
    a = Nf,
    s = Cf,
    o = null,
    c = bf(u);
  function u() {
    var l,
      h,
      f = +e.apply(this, arguments),
      d = +t.apply(this, arguments),
      m = i.apply(this, arguments) - Un,
      g = a.apply(this, arguments) - Un,
      x = Ia(g - m),
      y = g > m;
    if ((o || (o = l = c()), d < f && ((h = d), (d = f), (f = h)), !(d > ie)))
      o.moveTo(0, 0);
    else if (x > mf - ie)
      (o.moveTo(d * Be(m), d * Me(m)),
        o.arc(0, 0, d, m, g, !y),
        f > ie && (o.moveTo(f * Be(g), f * Me(g)), o.arc(0, 0, f, g, m, y)));
    else {
      var b = m,
        p = g,
        _ = m,
        C = g,
        k = x,
        P = x,
        I = s.apply(this, arguments) / 2,
        L = I > ie && (r ? +r.apply(this, arguments) : at(f * f + d * d)),
        D = Nr(Ia(d - f) / 2, +n.apply(this, arguments)),
        v = D,
        R = D,
        S,
        A;
      if (L > ie) {
        var K = La((L / f) * Me(I)),
          Y = La((L / d) * Me(I));
        ((k -= K * 2) > ie
          ? ((K *= y ? 1 : -1), (_ += K), (C -= K))
          : ((k = 0), (_ = C = (m + g) / 2)),
          (P -= Y * 2) > ie
            ? ((Y *= y ? 1 : -1), (b += Y), (p -= Y))
            : ((P = 0), (b = p = (m + g) / 2)));
      }
      var z = d * Be(b),
        W = d * Me(b),
        G = f * Be(C),
        xe = f * Me(C);
      if (D > ie) {
        var Ce = d * Be(p),
          te = d * Me(p),
          je = f * Be(_),
          wt = f * Me(_),
          be;
        if (x < tn)
          if ((be = Mf(z, W, je, wt, Ce, te, G, xe))) {
            var _t = z - be[0],
              Nt = W - be[1],
              Ct = Ce - be[0],
              $ = te - be[1],
              F =
                1 /
                Me(
                  gf(
                    (_t * Ct + Nt * $) /
                      (at(_t * _t + Nt * Nt) * at(Ct * Ct + $ * $)),
                  ) / 2,
                ),
              U = at(be[0] * be[0] + be[1] * be[1]);
            ((v = Nr(D, (f - U) / (F - 1))), (R = Nr(D, (d - U) / (F + 1))));
          } else v = R = 0;
      }
      (P > ie
        ? R > ie
          ? ((S = pn(je, wt, z, W, d, R, y)),
            (A = pn(Ce, te, G, xe, d, R, y)),
            o.moveTo(S.cx + S.x01, S.cy + S.y01),
            R < D
              ? o.arc(S.cx, S.cy, R, ee(S.y01, S.x01), ee(A.y01, A.x01), !y)
              : (o.arc(S.cx, S.cy, R, ee(S.y01, S.x01), ee(S.y11, S.x11), !y),
                o.arc(
                  0,
                  0,
                  d,
                  ee(S.cy + S.y11, S.cx + S.x11),
                  ee(A.cy + A.y11, A.cx + A.x11),
                  !y,
                ),
                o.arc(A.cx, A.cy, R, ee(A.y11, A.x11), ee(A.y01, A.x01), !y)))
          : (o.moveTo(z, W), o.arc(0, 0, d, b, p, !y))
        : o.moveTo(z, W),
        !(f > ie) || !(k > ie)
          ? o.lineTo(G, xe)
          : v > ie
            ? ((S = pn(G, xe, Ce, te, f, -v, y)),
              (A = pn(z, W, je, wt, f, -v, y)),
              o.lineTo(S.cx + S.x01, S.cy + S.y01),
              v < D
                ? o.arc(S.cx, S.cy, v, ee(S.y01, S.x01), ee(A.y01, A.x01), !y)
                : (o.arc(S.cx, S.cy, v, ee(S.y01, S.x01), ee(S.y11, S.x11), !y),
                  o.arc(
                    0,
                    0,
                    f,
                    ee(S.cy + S.y11, S.cx + S.x11),
                    ee(A.cy + A.y11, A.cx + A.x11),
                    y,
                  ),
                  o.arc(A.cx, A.cy, v, ee(A.y11, A.x11), ee(A.y01, A.x01), !y)))
            : o.arc(0, 0, f, C, _, y));
    }
    if ((o.closePath(), l)) return ((o = null), l + "" || null);
  }
  return (
    (u.centroid = function () {
      var l = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2,
        h =
          (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 - tn / 2;
      return [Be(h) * l, Me(h) * l];
    }),
    (u.innerRadius = function (l) {
      return arguments.length
        ? ((e = typeof l == "function" ? l : Fe(+l)), u)
        : e;
    }),
    (u.outerRadius = function (l) {
      return arguments.length
        ? ((t = typeof l == "function" ? l : Fe(+l)), u)
        : t;
    }),
    (u.cornerRadius = function (l) {
      return arguments.length
        ? ((n = typeof l == "function" ? l : Fe(+l)), u)
        : n;
    }),
    (u.padRadius = function (l) {
      return arguments.length
        ? ((r = l == null ? null : typeof l == "function" ? l : Fe(+l)), u)
        : r;
    }),
    (u.startAngle = function (l) {
      return arguments.length
        ? ((i = typeof l == "function" ? l : Fe(+l)), u)
        : i;
    }),
    (u.endAngle = function (l) {
      return arguments.length
        ? ((a = typeof l == "function" ? l : Fe(+l)), u)
        : a;
    }),
    (u.padAngle = function (l) {
      return arguments.length
        ? ((s = typeof l == "function" ? l : Fe(+l)), u)
        : s;
    }),
    (u.context = function (l) {
      return arguments.length ? ((o = l ?? null), u) : o;
    }),
    u
  );
}
const $f = Sf();
function kf(e) {
  const { clade: t, ...n } = e,
    r = T.useContext(Ie),
    i = T.useContext(bt),
    a = T.useContext(vt),
    { root: s, leftMost: o, rightMost: c, mostDiverged: u } = t,
    l = r(i(s)),
    h = r(i(o)),
    f = r(i(c)),
    d = r(i(u)),
    { layoutClass: m } = i(s);
  if (m === H.Rectangular) {
    const g = d.x - l.x,
      x = Math.abs(h.y - f.y);
    return M.jsx(fi, {
      width: g,
      height: x,
      x: l.x,
      y: Math.min(h.y, f.y),
      ...n,
      animated: a,
    });
  } else if (m === H.Polar) {
    const g = r({ x: 0, y: 0 }),
      x = `translate(${g.x},${g.y})`,
      y = l.r,
      b = d.r,
      p = h.theta,
      _ = f.theta,
      C = $f({
        innerRadius: y,
        outerRadius: b + 5,
        startAngle: _ + Math.PI / 2,
        endAngle: p + Math.PI / 2,
      });
    return (
      Q(C, "Error making arc shape for Clade Highlight"),
      M.jsx(Qn, { d: C, transform: x, ...n, animated: a })
    );
  } else return null;
}
const Tf = Js(kf);
function Pf(e) {
  switch (e.shape) {
    case pt.Cartoon:
      return M.jsx(ff, { ...e });
    case pt.Highlight:
      return M.jsx(Tf, { ...e });
  }
}
function Af(e) {
  return typeof e == "function";
}
function Ee(e) {
  return function (t) {
    const n = {};
    for (const r in e) {
      const i = e[r];
      Af(i) ? (n[r] = i(t)) : (n[r] = i);
    }
    return n;
  };
}
function xn(e) {
  return function (t) {
    const n = {};
    for (const r in e) {
      const i = e[r];
      i !== void 0 &&
        (n[r] = () => {
          i(t);
        });
    }
    return n;
  };
}
function Ef(e, t) {
  const n = "filter" in e ? e.filter : () => !0;
  Q(n, "Issue with filter option when making baubles");
  const r = "nodes" in e ? e.nodes : t.getNodes().filter(n),
    i = xn(e.interactions ?? {});
  if (e.target === pe.Node)
    if (e.shape === yt.Circle) {
      const a = Ee(e.attrs),
        s = r.reduce((o, c) => {
          const u = a(c),
            l = i(c);
          return ((o[c._id] = { ...u, ...l }), o);
        }, {});
      return { nodes: r, attrs: s, id: e.id, target: e.target, shape: e.shape };
    } else {
      const a = Ee(e.attrs),
        s = r.reduce((o, c) => {
          const u = a(c),
            l = i(c);
          return ((o[c._id] = { ...u, ...l }), o);
        }, {});
      return { nodes: r, attrs: s, id: e.id, target: e.target, shape: e.shape };
    }
  else if (e.target === pe.Branch) {
    const a = r
        .filter((u) => !t.isRoot(u))
        .map((u) => ({ node: u, parent: t.getParent(u) })),
      s = Ee({ fill: "none", ...e.attrs }),
      o = xn(e.interactions ?? {}),
      c = r.reduce((u, l) => {
        const h = s(l),
          f = o(l);
        return ((u[l._id] = { ...h, ...f }), u);
      }, {});
    return {
      branches: a,
      attrs: c,
      id: e.id,
      curvature: e.curvature,
      target: e.target,
    };
  } else if (e.target === pe.NodeLabel) {
    const a = Ee(e.attrs),
      s = Ee({ text: e.text }),
      o = xn(e.interactions ?? {}),
      c = r.reduce((u, l) => {
        const h = a(l),
          f = o(l),
          d = s(l);
        return ((u[l._id] = { ...h, ...f, ...d }), u);
      }, {});
    return {
      nodes: r,
      attrs: c,
      id: e.id,
      target: e.target,
      aligned: e.aligned ?? !1,
    };
  } else if (e.target === pe.BranchLabel) {
    const a = r.filter((h) => !t.isRoot(h)),
      s = a.map((h) => ({ node: h, parent: t.getParent(h) })),
      o = Ee(e.attrs),
      c = xn(e.interactions ?? {}),
      u = Ee({ text: e.text }),
      l = a.reduce((h, f) => {
        const d = o(f),
          m = c(f),
          g = u(f);
        return ((h[f._id] = { ...d, ...m, ...g }), h);
      }, {});
    return { branches: s, attrs: l, id: e.id, target: e.target };
  } else {
    const a = r.map((s) => {
      const o = [...er(t, s)],
        c = o[0],
        u = o[o.length - 1],
        l = o[qu(o, (h) => t.getDivergence(h))];
      return { root: s, leftMost: c, rightMost: u, mostDiverged: l };
    });
    if (e.shape === pt.Highlight) {
      const s = Ee(e.attrs),
        o = r.reduce((c, u) => {
          const l = s(u),
            h = i(u);
          return ((c[u._id] = { ...l, ...h }), c);
        }, {});
      return {
        clades: a,
        attrs: o,
        id: e.id,
        target: e.target,
        shape: e.shape,
      };
    } else {
      const s = Ee(e.attrs),
        o = r.reduce((c, u) => {
          const l = s(u),
            h = i(u);
          return ((c[u._id] = { ...l, ...h }), c);
        }, {});
      return {
        clades: a,
        attrs: o,
        id: e.id,
        target: e.target,
        shape: e.shape,
      };
    }
  }
}
function Rf(e) {
  return { ...e, shape: yt.Circle, target: pe.Node };
}
function If(e) {
  return { ...e, shape: yt.Rectangle, target: pe.Node };
}
function to(e) {
  return { ...e, target: pe.Branch };
}
function Lf(e) {
  return { attrs: {}, aligned: !1, ...e, target: pe.NodeLabel };
}
function Ff(e) {
  return { attrs: {}, ...e, target: pe.BranchLabel };
}
function Df(e) {
  return { ...e, shape: pt.Highlight, target: pe.Clade };
}
function Uf(e) {
  return { ...e, shape: pt.Cartoon, target: pe.Clade };
}
const le = {
    offsetBy: 0,
    scaleBy: 1,
    reverse: !1,
    gap: 5,
    title: { text: "", padding: 40, style: {} },
    ticks: { number: 5, format: Zt(".1f"), padding: 20, style: {}, length: 6 },
    attrs: { strokeWidth: 1 },
  },
  On = { evenFill: "#EDEDED", oddFill: "none" };
function Of(e) {
  const {
    attrs: t,
    evenFill: n = On.evenFill,
    oddFill: r = On.oddFill,
    tickValues: i,
    scale: a,
    figureScale: s,
    axisY: o,
  } = e;
  return M.jsx("g", {
    className: "axisBars",
    children: i
      .filter((c, u, l) => u < l.length - 1)
      .map((c, u) => {
        const l = s({ x: a(c), y: o }),
          h = s({ x: a(c), y: 0 }),
          f = s({ x: a(i[u + 1]), y: 0 }),
          d = s({ x: a(i[u + 1]), y: o }),
          m =
            l.theta === h.theta || l.r === 0
              ? ""
              : `A${l.r},${l.r} 0 1 0 ${h.x},${h.y}`,
          g =
            f.theta === d.theta || f.r === 0
              ? ""
              : `A${f.r},${f.r} 0 1 1 ${d.x},${d.y}`,
          x = `M${l.x},${l.y} ${m} L${h.x},${h.y} L${f.x},${f.y} ${g} L ${l.x} ${l.y} Z`,
          y = u % 2 === 0 ? n : r;
        return M.jsx(Qn, { d: x, fill: y, ...t, animated: !1 }, u);
      }),
  });
}
function jf(e) {
  const t = T.useContext(un),
    n = T.useContext(Ie),
    { bars: r, attrs: i } = e,
    a = e.ticks ? { ...le.ticks, ...e.ticks } : le.ticks,
    s = e.title ? { ...le.title, ...e.title } : le.title,
    o = no(e, t);
  let c;
  a.values != null ? (c = a.values) : (c = o.ticks(a.number));
  const u = We(n({ x: t.domainX[1], y: t.domainY[1] }).theta),
    l = t.domainY[1] + t.domainY[1] * 0.005,
    h = n({ x: t.domainX[0], y: l }),
    f = n({ x: t.domainX[1], y: l }),
    d = `M${h.x},${h.y} L${f.x},${f.y}`,
    m = a.length * Math.cos(u),
    g = a.length * Math.sin(u),
    x = a.padding * Math.cos(u),
    y = a.padding * Math.sin(u),
    b = fe(di(o.range()), "Error calculating x position for title"),
    p = n({ x: b, y: l }),
    _ = s.padding * Math.cos(u),
    C = s.padding * Math.sin(u);
  return M.jsxs("g", {
    className: "axis",
    children: [
      M.jsx(Of, { ...r, tickValues: c, scale: o, axisY: l }),
      ":",
      M.jsx("path", { d, stroke: "black", ...i }),
      M.jsxs("g", {
        children: [
          c.map((k, P) => {
            const I = n({ x: o(k), y: l });
            return M.jsxs(
              "g",
              {
                transform: `translate(${I.x},${I.y}) rotate(90)`,
                children: [
                  M.jsx("line", {
                    x1: m,
                    y1: g,
                    x2: 0,
                    y2: 0,
                    stroke: "black",
                    ...i,
                  }),
                  M.jsx("text", {
                    transform: `translate(${x},${y}) rotate(-90)`,
                    textAnchor: "middle",
                    dominantBaseline: "central",
                    ...a.style,
                    children: a.format(k),
                  }),
                ],
              },
              `tick-${P}`,
            );
          }),
          M.jsx("g", {
            transform: `translate(${p.x},${p.y}) rotate(90)`,
            children: M.jsx("text", {
              textAnchor: "middle",
              transform: `translate(${_},${C}) rotate(-90)`,
              children: s.text,
            }),
          }),
        ],
      }),
    ],
  });
}
function no(e, t) {
  const {
      reverse: n = le.reverse,
      offsetBy: r = le.offsetBy,
      scaleBy: i = le.scaleBy,
      scale: a,
    } = e,
    { domainX: s } = t,
    o = a === void 0 ? ge().domain(s).range(s) : a.copy();
  if (a === void 0) {
    const u = s.map((l) => l + r).map((l) => (l - r) * i + r);
    (o.domain(u), n && o.domain([r - (u[1] - u[0]), r]));
  }
  return o.nice();
}
function zf(e) {
  const {
      attrs: t,
      evenFill: n = On.evenFill,
      oddFill: r = On.oddFill,
      tickValues: i,
      scale: a,
      axisY: s,
    } = e,
    o = T.useContext(Ie);
  return M.jsx(
    "g",
    {
      className: "axisBars",
      children: i
        .filter((c, u, l) => u < l.length - 1)
        .map((c, u) => {
          const l = o({ x: a(c), y: s }),
            h = o({ x: a(c), y: -0.05 }),
            f = o({ x: a(i[u + 1]), y: 0 }),
            d = u % 2 === 0 ? n : r;
          return M.jsx(
            fi,
            {
              x: l.x,
              width: f.x - l.x,
              y: h.y,
              height: l.y - h.y,
              fill: d,
              rx: 2,
              ry: 2,
              ...t,
              animated: !1,
            },
            `recBar-${u}`,
          );
        }, []),
    },
    "axisBars",
  );
}
function Bf(e) {
  const t = T.useContext(un),
    n = T.useContext(Ie),
    { gap: r = le.gap, bars: i } = e,
    a = { ...le.attrs, ...e.attrs },
    s = e.ticks ? { ...le.ticks, ...e.ticks } : le.ticks,
    o = e.title ? { ...le.title, ...e.title } : le.title,
    c = no(e, t);
  let u;
  s.values !== void 0 ? (u = s.values) : (u = c.ticks(s.number));
  const l = t.domainY[1] + t.domainY[1] * 0.01,
    h = n({ x: t.domainX[0], y: l }),
    f = n({ x: t.domainX[1], y: l }),
    d = `M${h.x},${h.y + r} L${f.x},${f.y + r}`,
    m = fe(di(c.range()), "Error calculating x position for title"),
    g = n({ x: m, y: l });
  return M.jsxs("g", {
    className: "axis",
    children: [
      i ? M.jsx(zf, { ...i, tickValues: u, scale: c, axisY: l }) : null,
      M.jsx("path", { d, stroke: "black", ...a }),
      M.jsxs("g", {
        children: [
          u.map((x, y) => {
            const b = n({ x: c(x), y: l });
            return M.jsxs(
              "g",
              {
                transform: `translate(${b.x},${b.y + r})`,
                children: [
                  M.jsx("line", {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: s.length,
                    stroke: "black",
                    ...a,
                  }),
                  M.jsx("text", {
                    transform: `translate(0,${s.padding})`,
                    textAnchor: "middle",
                    dominantBaseline: "central",
                    ...s.style,
                    children: s.format(x),
                  }),
                ],
              },
              `tick-${y}`,
            );
          }),
          M.jsx("g", {
            transform: `translate(${g.x},${g.y + r}) `,
            children: M.jsx("text", {
              textAnchor: "middle",
              transform: `translate(0,${o.padding})`,
              ...o.style,
              children: o.text,
            }),
          }),
        ],
      }),
    ],
  });
}
function Vf(e) {
  const t = T.useContext(un),
    { layoutClass: n } = t;
  return n === H.Polar
    ? M.jsx(jf, { ...e })
    : n === H.Rectangular
      ? M.jsx(Bf, { ...e })
      : (console.warn(`Axis not supported for ${n}`), null);
}
const qf = _i.fromNewick("((A:1,B:1):1,C:2);"),
  re = {
    opts: ps,
    width: 100,
    layout: Vs,
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    tree: qf,
    baubles: [
      to({ filter: () => !0, attrs: { stroke: "black", strokeWidth: 1 } }),
    ],
    animated: !1,
  };
function Hf(e) {
  const {
      width: t = re.width,
      height: n = re.width,
      margins: r = re.margins,
      tree: i = re.tree,
      layout: a = re.layout,
      animated: s = re.animated,
      baubles: o = re.baubles,
      axis: c,
    } = e,
    u = e.opts ? e.opts : re.opts,
    {
      rootAngle: l = re.opts.rootAngle,
      angleRange: h = re.opts.angleRange,
      fishEye: f = re.opts.fishEye,
      pollard: d = re.opts.pollard,
      minRadius: m = re.opts.minRadius,
      invert: g = re.opts.invert,
    } = u;
  let x,
    y,
    { x: b, y: p } = e;
  b !== void 0 && p !== void 0
    ? ((x = t), (y = n))
    : ((x = t - r.left - r.right),
      (y = n - r.top - r.bottom),
      (b = r.left),
      (p = r.top));
  const _ = a(i, u),
    { layoutClass: C } = _(i.getRoot()),
    k = lt(i.getNodes().map((v) => _(v).x)).map((v) =>
      fe(v, "Error finding x extent from layout"),
    ),
    P = lt(i.getNodes().map((v) => _(v).y)).map((v) =>
      fe(v, "Error finding y extent from layout"),
    ),
    I = {
      canvasWidth: x,
      canvasHeight: y,
      domainX: k,
      domainY: P,
      layoutClass: C,
      invert: g,
      pollard: d,
      minRadius: m,
      fishEye: f,
      rootAngle: l,
      angleRange: h,
    },
    L = Dh(I),
    D = o.map((v) => Ef(v, i));
  return M.jsx("g", {
    children: M.jsx("g", {
      transform: `translate(${b},${p})`,
      children: M.jsx(Ie.Provider, {
        value: L,
        children: M.jsx(un.Provider, {
          value: I,
          children: M.jsx(bt.Provider, {
            value: _,
            children: M.jsxs(vt.Provider, {
              value: s,
              children: [
                c ? M.jsx(Vf, { ...c }) : null,
                D.map((v, R) => M.jsx(lf, { ...v }, v.id ?? R)),
              ],
            }),
          }),
        }),
      }),
    }),
  });
}
exports.BaseAnnotationType = V;
exports.BranchLabels = Ff;
exports.Branches = to;
exports.CartoonClades = Uf;
exports.CircleNodes = Rf;
exports.FigTree = Hf;
exports.HighlightClades = Df;
exports.ImmutableTree = _i;
exports.NexusImporter = Wl;
exports.NodeLabels = Lf;
exports.PreOrderTraversalCache = Gl;
exports.RectangleNodes = If;
exports.TaxonSet = sn;
exports.dateToDecimal = cl;
exports.decimalToDate = ul;
exports.defaultInternalLayoutOptions = ps;
exports.layoutClass = H;
exports.leapYear = pi;
exports.notNull = Q;
exports.panic = ll;
exports.pathToRootIterator = Vl;
exports.polarLayout = Ql;
exports.postOrderIterator = zs;
exports.preOrderIterator = js;
exports.psuedoRootPostOrderIterator = Bl;
exports.psuedoRootPreOrderIterator = zl;
exports.radialLayout = Xl;
exports.rectangularLayout = Vs;
exports.tipIterator = er;
exports.u = hl;
exports.unNullify = fe;
