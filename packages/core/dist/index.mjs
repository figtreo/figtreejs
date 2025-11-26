import { jsx as $, jsxs as Ie } from "react/jsx-runtime";
import * as ti from "react";
import {
  useState as Oa,
  useRef as Xe,
  useEffect as an,
  useLayoutEffect as as,
  forwardRef as os,
  useCallback as ss,
  useContext as H,
  useMemo as fn,
  createContext as jn,
} from "react";
import { unstable_batchedUpdates as us } from "react-dom";
var ni = sn(),
  A = (e) => on(e, ni),
  ri = sn();
A.write = (e) => on(e, ri);
var qn = sn();
A.onStart = (e) => on(e, qn);
var ii = sn();
A.onFrame = (e) => on(e, ii);
var ai = sn();
A.onFinish = (e) => on(e, ai);
var ut = [];
A.setTimeout = (e, t) => {
  const n = A.now() + t,
    r = () => {
      const a = ut.findIndex((o) => o.cancel == r);
      (~a && ut.splice(a, 1), (Oe -= ~a ? 1 : 0));
    },
    i = { time: n, handler: e, cancel: r };
  return (ut.splice(za(n), 0, i), (Oe += 1), Ba(), i);
};
var za = (e) => ~(~ut.findIndex((t) => t.time > e) || ~ut.length);
A.cancel = (e) => {
  (qn.delete(e), ii.delete(e), ai.delete(e), ni.delete(e), ri.delete(e));
};
A.sync = (e) => {
  ((kr = !0), A.batchedUpdates(e), (kr = !1));
};
A.throttle = (e) => {
  let t;
  function n() {
    try {
      e(...t);
    } finally {
      t = null;
    }
  }
  function r(...i) {
    ((t = i), A.onStart(n));
  }
  return (
    (r.handler = e),
    (r.cancel = () => {
      (qn.delete(n), (t = null));
    }),
    r
  );
};
var oi =
  typeof window < "u"
    ? window.requestAnimationFrame
    : // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {};
A.use = (e) => (oi = e);
A.now = typeof performance < "u" ? () => performance.now() : Date.now;
A.batchedUpdates = (e) => e();
A.catch = console.error;
A.frameLoop = "always";
A.advance = () => {
  A.frameLoop !== "demand"
    ? console.warn(
        "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand",
      )
    : ja();
};
var Ue = -1,
  Oe = 0,
  kr = !1;
function on(e, t) {
  kr ? (t.delete(e), e(0)) : (t.add(e), Ba());
}
function Ba() {
  Ue < 0 && ((Ue = 0), A.frameLoop !== "demand" && oi(Va));
}
function cs() {
  Ue = -1;
}
function Va() {
  ~Ue && (oi(Va), A.batchedUpdates(ja));
}
function ja() {
  const e = Ue;
  Ue = A.now();
  const t = za(Ue);
  if ((t && (qa(ut.splice(0, t), (n) => n.handler()), (Oe -= t)), !Oe)) {
    cs();
    return;
  }
  (qn.flush(),
    ni.flush(e ? Math.min(64, Ue - e) : 16.667),
    ii.flush(),
    ri.flush(),
    ai.flush());
}
function sn() {
  let e = /* @__PURE__ */ new Set(),
    t = e;
  return {
    add(n) {
      ((Oe += t == e && !e.has(n) ? 1 : 0), e.add(n));
    },
    delete(n) {
      return ((Oe -= t == e && e.has(n) ? 1 : 0), e.delete(n));
    },
    flush(n) {
      t.size &&
        ((e = /* @__PURE__ */ new Set()),
        (Oe -= t.size),
        qa(t, (r) => r(n) && e.add(r)),
        (Oe += e.size),
        (t = e));
    },
  };
}
function qa(e, t) {
  e.forEach((n) => {
    try {
      t(n);
    } catch (r) {
      A.catch(r);
    }
  });
}
var ls = Object.defineProperty,
  hs = (e, t) => {
    for (var n in t) ls(e, n, { get: t[n], enumerable: !0 });
  },
  Ne = {};
hs(Ne, {
  assign: () => ds,
  colors: () => ze,
  createStringInterpolator: () => ui,
  skipAnimation: () => Ya,
  to: () => Ha,
  willAdvance: () => ci,
});
function Tr() {}
var fs = (e, t, n) =>
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
var U = (e, t) => e.forEach(t);
function Te(e, t, n) {
  if (N.arr(e)) {
    for (let r = 0; r < e.length; r++) t.call(n, e[r], `${r}`);
    return;
  }
  for (const r in e) e.hasOwnProperty(r) && t.call(n, e[r], r);
}
var he = (e) => (N.und(e) ? [] : N.arr(e) ? e : [e]);
function Lt(e, t) {
  if (e.size) {
    const n = Array.from(e);
    (e.clear(), U(n, t));
  }
}
var It = (e, ...t) => Lt(e, (n) => n(...t)),
  si = () =>
    typeof window > "u" ||
    !window.navigator ||
    /ServerSideRendering|^Deno\//.test(window.navigator.userAgent),
  ui,
  Ha,
  ze = null,
  Ya = !1,
  ci = Tr,
  ds = (e) => {
    (e.to && (Ha = e.to),
      e.now && (A.now = e.now),
      e.colors !== void 0 && (ze = e.colors),
      e.skipAnimation != null && (Ya = e.skipAnimation),
      e.createStringInterpolator && (ui = e.createStringInterpolator),
      e.requestAnimationFrame && A.use(e.requestAnimationFrame),
      e.batchedUpdates && (A.batchedUpdates = e.batchedUpdates),
      e.willAdvance && (ci = e.willAdvance),
      e.frameLoop && (A.frameLoop = e.frameLoop));
  },
  Ft = /* @__PURE__ */ new Set(),
  ge = [],
  ar = [],
  Sn = 0,
  Hn = {
    get idle() {
      return !Ft.size && !ge.length;
    },
    /** Advance the given animation on every frame until idle. */
    start(e) {
      Sn > e.priority ? (Ft.add(e), A.onStart(ms)) : (Wa(e), A(Pr));
    },
    /** Advance all animations by the given time. */
    advance: Pr,
    /** Call this when an animation's priority changes. */
    sort(e) {
      if (Sn) A.onFrame(() => Hn.sort(e));
      else {
        const t = ge.indexOf(e);
        ~t && (ge.splice(t, 1), Ga(e));
      }
    },
    /**
     * Clear all animations. For testing purposes.
     *
     * ☠️ Never call this from within the frameloop.
     */
    clear() {
      ((ge = []), Ft.clear());
    },
  };
function ms() {
  (Ft.forEach(Wa), Ft.clear(), A(Pr));
}
function Wa(e) {
  ge.includes(e) || Ga(e);
}
function Ga(e) {
  ge.splice(
    gs(ge, (t) => t.priority > e.priority),
    0,
    e,
  );
}
function Pr(e) {
  const t = ar;
  for (let n = 0; n < ge.length; n++) {
    const r = ge[n];
    ((Sn = r.priority), r.idle || (ci(r), r.advance(e), r.idle || t.push(r)));
  }
  return ((Sn = 0), (ar = ge), (ar.length = 0), (ge = t), ge.length > 0);
}
function gs(e, t) {
  const n = e.findIndex(t);
  return n < 0 ? e.length : n;
}
var ys = {
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
  $n = _e + "%";
function Yn(...e) {
  return "\\(\\s*(" + e.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var ps = new RegExp("rgb" + Yn(_e, _e, _e)),
  xs = new RegExp("rgba" + Yn(_e, _e, _e, _e)),
  bs = new RegExp("hsl" + Yn(_e, $n, $n)),
  vs = new RegExp("hsla" + Yn(_e, $n, $n, _e)),
  ws = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  _s = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  Ns = /^#([0-9a-fA-F]{6})$/,
  Ms = /^#([0-9a-fA-F]{8})$/;
function Cs(e) {
  let t;
  return typeof e == "number"
    ? e >>> 0 === e && e >= 0 && e <= 4294967295
      ? e
      : null
    : (t = Ns.exec(e))
      ? parseInt(t[1] + "ff", 16) >>> 0
      : ze && ze[e] !== void 0
        ? ze[e]
        : (t = ps.exec(e))
          ? ((it(t[1]) << 24) | // r
              (it(t[2]) << 16) | // g
              (it(t[3]) << 8) | // b
              255) >>> // a
            0
          : (t = xs.exec(e))
            ? ((it(t[1]) << 24) | // r
                (it(t[2]) << 16) | // g
                (it(t[3]) << 8) | // b
                Ri(t[4])) >>> // a
              0
            : (t = ws.exec(e))
              ? parseInt(
                  t[1] +
                    t[1] + // r
                    t[2] +
                    t[2] + // g
                    t[3] +
                    t[3] + // b
                    "ff",
                  // a
                  16,
                ) >>> 0
              : (t = Ms.exec(e))
                ? parseInt(t[1], 16) >>> 0
                : (t = _s.exec(e))
                  ? parseInt(
                      t[1] +
                        t[1] + // r
                        t[2] +
                        t[2] + // g
                        t[3] +
                        t[3] + // b
                        t[4] +
                        t[4],
                      // a
                      16,
                    ) >>> 0
                  : (t = bs.exec(e))
                    ? (Ai(
                        Ei(t[1]),
                        // h
                        dn(t[2]),
                        // s
                        dn(t[3]),
                        // l
                      ) |
                        255) >>> // a
                      0
                    : (t = vs.exec(e))
                      ? (Ai(
                          Ei(t[1]),
                          // h
                          dn(t[2]),
                          // s
                          dn(t[3]),
                          // l
                        ) |
                          Ri(t[4])) >>> // a
                        0
                      : null;
}
function or(e, t, n) {
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
function Ai(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t,
    i = 2 * n - r,
    a = or(i, r, e + 1 / 3),
    o = or(i, r, e),
    s = or(i, r, e - 1 / 3);
  return (
    (Math.round(a * 255) << 24) |
    (Math.round(o * 255) << 16) |
    (Math.round(s * 255) << 8)
  );
}
function it(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function Ei(e) {
  return (((parseFloat(e) % 360) + 360) % 360) / 360;
}
function Ri(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function dn(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function Ii(e) {
  let t = Cs(e);
  if (t === null) return e;
  t = t || 0;
  const n = (t & 4278190080) >>> 24,
    r = (t & 16711680) >>> 16,
    i = (t & 65280) >>> 8,
    a = (t & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
var zt = (e, t, n) => {
  if (N.fun(e)) return e;
  if (N.arr(e))
    return zt({
      range: e,
      output: t,
      extrapolate: n,
    });
  if (N.str(e.output[0])) return ui(e);
  const r = e,
    i = r.output,
    a = r.range || [0, 1],
    o = r.extrapolateLeft || r.extrapolate || "extend",
    s = r.extrapolateRight || r.extrapolate || "extend",
    c = r.easing || ((u) => u);
  return (u) => {
    const l = $s(u, a);
    return Ss(u, a[l], a[l + 1], i[l], i[l + 1], c, o, s, r.map);
  };
};
function Ss(e, t, n, r, i, a, o, s, c) {
  let u = c ? c(e) : e;
  if (u < t) {
    if (o === "identity") return u;
    o === "clamp" && (u = t);
  }
  if (u > n) {
    if (s === "identity") return u;
    s === "clamp" && (u = n);
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
function $s(e, t) {
  for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n);
  return n - 1;
}
var ks = {
    linear: (e) => e,
  },
  Bt = Symbol.for("FluidValue.get"),
  ht = Symbol.for("FluidValue.observers"),
  de = (e) => !!(e && e[Bt]),
  ae = (e) => (e && e[Bt] ? e[Bt]() : e),
  Li = (e) => e[ht] || null;
function Ts(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function Vt(e, t) {
  const n = e[ht];
  n &&
    n.forEach((r) => {
      Ts(r, t);
    });
}
var Qa = class {
    constructor(e) {
      if (!e && !(e = this.get)) throw Error("Unknown getter");
      Ps(this, e);
    }
  },
  Ps = (e, t) => Xa(e, Bt, t);
function vt(e, t) {
  if (e[Bt]) {
    let n = e[ht];
    (n || Xa(e, ht, (n = /* @__PURE__ */ new Set())),
      n.has(t) || (n.add(t), e.observerAdded && e.observerAdded(n.size, t)));
  }
  return t;
}
function jt(e, t) {
  const n = e[ht];
  if (n && n.has(t)) {
    const r = n.size - 1;
    (r ? n.delete(t) : (e[ht] = null),
      e.observerRemoved && e.observerRemoved(r, t));
  }
}
var Xa = (e, t, n) =>
    Object.defineProperty(e, t, {
      value: n,
      writable: !0,
      configurable: !0,
    }),
  _n = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  As =
    /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
  Fi = new RegExp(`(${_n.source})(%|[a-z]+)`, "i"),
  Es = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
  Wn = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/,
  Za = (e) => {
    const [t, n] = Rs(e);
    if (!t || si()) return e;
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
      if (n && Wn.test(n)) return Za(n);
      if (n) return n;
    }
    return e;
  },
  Rs = (e) => {
    const t = Wn.exec(e);
    if (!t) return [,];
    const [, n, r] = t;
    return [n, r];
  },
  sr,
  Is = (e, t, n, r, i) =>
    `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`,
  Ka = (e) => {
    sr ||
      (sr = ze
        ? // match color names, ignore partial matches
          new RegExp(`(${Object.keys(ze).join("|")})(?!\\w)`, "g")
        : // never match
          /^\b$/);
    const t = e.output.map((a) =>
        ae(a).replace(Wn, Za).replace(As, Ii).replace(sr, Ii),
      ),
      n = t.map((a) => a.match(_n).map(Number)),
      i = n[0]
        .map((a, o) =>
          n.map((s) => {
            if (!(o in s))
              throw Error('The arity of each "output" value must be equal');
            return s[o];
          }),
        )
        .map((a) => zt({ ...e, output: a }));
    return (a) => {
      const o = !Fi.test(t[0]) && t.find((c) => Fi.test(c))?.replace(_n, "");
      let s = 0;
      return t[0].replace(_n, () => `${i[s++](a)}${o || ""}`).replace(Es, Is);
    };
  },
  li = "react-spring: ",
  Ja = (e) => {
    const t = e;
    let n = !1;
    if (typeof t != "function")
      throw new TypeError(`${li}once requires a function parameter`);
    return (...r) => {
      n || (t(...r), (n = !0));
    };
  },
  Ls = Ja(console.warn);
function Fs() {
  Ls(`${li}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
var Ds = Ja(console.warn);
function Us() {
  Ds(
    `${li}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`,
  );
}
function Gn(e) {
  return (
    N.str(e) &&
    (e[0] == "#" ||
      /\d/.test(e) || // Do not identify a CSS variable as an AnimatedString if its SSR
      (!si() && Wn.test(e)) ||
      e in (ze || {}))
  );
}
var hi = si() ? an : as,
  Os = () => {
    const e = Xe(!1);
    return (
      hi(
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
function eo() {
  const e = Oa()[1],
    t = Os();
  return () => {
    t.current && e(Math.random());
  };
}
function zs(e, t) {
  const [n] = Oa(() => ({
      inputs: t,
      result: e(),
    })),
    r = Xe(),
    i = r.current;
  let a = i;
  return (
    a
      ? (t && a.inputs && Bs(t, a.inputs)) ||
        (a = {
          inputs: t,
          result: e(),
        })
      : (a = n),
    an(() => {
      ((r.current = a), i == n && (n.inputs = n.result = void 0));
    }, [a]),
    a.result
  );
}
function Bs(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
var to = (e) => an(e, Vs),
  Vs = [];
function Di(e) {
  const t = Xe();
  return (
    an(() => {
      t.current = e;
    }),
    t.current
  );
}
var qt = Symbol.for("Animated:node"),
  js = (e) => !!e && e[qt] === e,
  Se = (e) => e && e[qt],
  fi = (e, t) => fs(e, qt, t),
  Qn = (e) => e && e[qt] && e[qt].getPayload(),
  no = class {
    constructor() {
      fi(this, this);
    }
    /** Get every `AnimatedValue` used by this node. */
    getPayload() {
      return this.payload || [];
    }
  },
  un = class extends no {
    constructor(e) {
      (super(),
        (this._value = e),
        (this.done = !0),
        (this.durationProgress = 0),
        N.num(this._value) && (this.lastPosition = this._value));
    }
    /** @internal */
    static create(e) {
      return new un(e);
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
  Ht = class extends un {
    constructor(e) {
      (super(0),
        (this._string = null),
        (this._toString = zt({
          output: [e, e],
        })));
    }
    /** @internal */
    static create(e) {
      return new Ht(e);
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
      (e &&
        (this._toString = zt({
          output: [this.getValue(), e],
        })),
        (this._value = 0),
        super.reset());
    }
  },
  kn = { dependencies: null },
  Xn = class extends no {
    constructor(e) {
      (super(), (this.source = e), this.setValue(e));
    }
    getValue(e) {
      const t = {};
      return (
        Te(this.source, (n, r) => {
          js(n)
            ? (t[r] = n.getValue(e))
            : de(n)
              ? (t[r] = ae(n))
              : e || (t[r] = n);
        }),
        t
      );
    }
    /** Replace the raw object data */
    setValue(e) {
      ((this.source = e), (this.payload = this._makePayload(e)));
    }
    reset() {
      this.payload && U(this.payload, (e) => e.reset());
    }
    /** Create a payload set. */
    _makePayload(e) {
      if (e) {
        const t = /* @__PURE__ */ new Set();
        return (Te(e, this._addToPayload, t), Array.from(t));
      }
    }
    /** Add to a payload set. */
    _addToPayload(e) {
      kn.dependencies && de(e) && kn.dependencies.add(e);
      const t = Qn(e);
      t && U(t, (n) => this.add(n));
    }
  },
  ro = class extends Xn {
    constructor(e) {
      super(e);
    }
    /** @internal */
    static create(e) {
      return new ro(e);
    }
    getValue() {
      return this.source.map((e) => e.getValue());
    }
    setValue(e) {
      const t = this.getPayload();
      return e.length == t.length
        ? t.map((n, r) => n.setValue(e[r])).some(Boolean)
        : (super.setValue(e.map(qs)), !0);
    }
  };
function qs(e) {
  return (Gn(e) ? Ht : un).create(e);
}
function Ar(e) {
  const t = Se(e);
  return t ? t.constructor : N.arr(e) ? ro : Gn(e) ? Ht : un;
}
var Ui = (e, t) => {
    const n =
      // Function components must use "forwardRef" to avoid being
      // re-rendered on every animation frame.
      !N.fun(e) || (e.prototype && e.prototype.isReactComponent);
    return os((r, i) => {
      const a = Xe(null),
        o =
          n && // eslint-disable-next-line react-hooks/rules-of-hooks
          ss(
            (m) => {
              a.current = Ws(i, m);
            },
            [i],
          ),
        [s, c] = Ys(r, t),
        u = eo(),
        l = () => {
          const m = a.current;
          if (n && !m) return;
          (m ? t.applyAnimatedValues(m, s.getValue(!0)) : !1) === !1 && u();
        },
        h = new Hs(l, c),
        f = Xe();
      (hi(
        () => (
          (f.current = h),
          U(c, (m) => vt(m, h)),
          () => {
            f.current &&
              (U(f.current.deps, (m) => jt(m, f.current)),
              A.cancel(f.current.update));
          }
        ),
      ),
        an(l, []),
        to(() => () => {
          const m = f.current;
          U(m.deps, (g) => jt(g, m));
        }));
      const d = t.getComponentProps(s.getValue());
      return /* @__PURE__ */ ti.createElement(e, { ...d, ref: o });
    });
  },
  Hs = class {
    constructor(e, t) {
      ((this.update = e), (this.deps = t));
    }
    eventObserved(e) {
      e.type == "change" && A.write(this.update);
    }
  };
function Ys(e, t) {
  const n = /* @__PURE__ */ new Set();
  return (
    (kn.dependencies = n),
    e.style &&
      (e = {
        ...e,
        style: t.createAnimatedStyle(e.style),
      }),
    (e = new Xn(e)),
    (kn.dependencies = null),
    [e, n]
  );
}
function Ws(e, t) {
  return (e && (N.fun(e) ? e(t) : (e.current = t)), t);
}
var Oi = Symbol.for("AnimatedComponent"),
  Gs = (
    e,
    {
      applyAnimatedValues: t = () => !1,
      createAnimatedStyle: n = (i) => new Xn(i),
      getComponentProps: r = (i) => i,
    } = {},
  ) => {
    const i = {
        applyAnimatedValues: t,
        createAnimatedStyle: n,
        getComponentProps: r,
      },
      a = (o) => {
        const s = zi(o) || "Anonymous";
        return (
          N.str(o)
            ? (o = a[o] || (a[o] = Ui(o, i)))
            : (o = o[Oi] || (o[Oi] = Ui(o, i))),
          (o.displayName = `Animated(${s})`),
          o
        );
      };
    return (
      Te(e, (o, s) => {
        (N.arr(e) && (s = zi(o)), (a[s] = a(o)));
      }),
      {
        animated: a,
      }
    );
  },
  zi = (e) =>
    N.str(e)
      ? e
      : e && N.str(e.displayName)
        ? e.displayName
        : (N.fun(e) && e.name) || null;
function Ye(e, ...t) {
  return N.fun(e) ? e(...t) : e;
}
var Dt = (e, t) =>
    e === !0 || !!(t && e && (N.fun(e) ? e(t) : he(e).includes(t))),
  io = (e, t) => (N.obj(e) ? t && e[t] : e),
  ao = (e, t) => (e.default === !0 ? e[t] : e.default ? e.default[t] : void 0),
  Qs = (e) => e,
  di = (e, t = Qs) => {
    let n = Xs;
    e.default && e.default !== !0 && ((e = e.default), (n = Object.keys(e)));
    const r = {};
    for (const i of n) {
      const a = t(e[i], i);
      N.und(a) || (r[i] = a);
    }
    return r;
  },
  Xs = [
    "config",
    "onProps",
    "onStart",
    "onChange",
    "onPause",
    "onResume",
    "onRest",
  ],
  Zs = {
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
    // Transition props
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
    // Internal props
    keys: 1,
    callId: 1,
    parentId: 1,
  };
function Ks(e) {
  const t = {};
  let n = 0;
  if (
    (Te(e, (r, i) => {
      Zs[i] || ((t[i] = r), n++);
    }),
    n)
  )
    return t;
}
function oo(e) {
  const t = Ks(e);
  if (t) {
    const n = { to: t };
    return (Te(e, (r, i) => i in t || (n[i] = r)), n);
  }
  return { ...e };
}
function Yt(e) {
  return (
    (e = ae(e)),
    N.arr(e)
      ? e.map(Yt)
      : Gn(e)
        ? Ne.createStringInterpolator({
            range: [0, 1],
            output: [e, e],
          })(1)
        : e
  );
}
function Js(e) {
  for (const t in e) return !0;
  return !1;
}
function Er(e) {
  return N.fun(e) || (N.arr(e) && N.obj(e[0]));
}
function eu(e, t) {
  (e.ref?.delete(e), t?.delete(e));
}
function tu(e, t) {
  t && e.ref !== t && (e.ref?.delete(e), t.add(e), (e.ref = t));
}
var nu = {
    default: { tension: 170, friction: 26 },
  },
  Rr = {
    ...nu.default,
    mass: 1,
    damping: 1,
    easing: ks.linear,
    clamp: !1,
  },
  ru = class {
    constructor() {
      ((this.velocity = 0), Object.assign(this, Rr));
    }
  };
function iu(e, t, n) {
  (n && ((n = { ...n }), Bi(n, t), (t = { ...n, ...t })),
    Bi(e, t),
    Object.assign(e, t));
  for (const o in Rr) e[o] == null && (e[o] = Rr[o]);
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
function Bi(e, t) {
  if (!N.und(t.decay)) e.duration = void 0;
  else {
    const n = !N.und(t.tension) || !N.und(t.friction);
    ((n || !N.und(t.frequency) || !N.und(t.damping) || !N.und(t.mass)) &&
      ((e.duration = void 0), (e.decay = void 0)),
      n && (e.frequency = void 0));
  }
}
var Vi = [],
  au = class {
    constructor() {
      ((this.changed = !1),
        (this.values = Vi),
        (this.toValues = null),
        (this.fromValues = Vi),
        (this.config = new ru()),
        (this.immediate = !1));
    }
  };
function so(e, { key: t, props: n, defaultProps: r, state: i, actions: a }) {
  return new Promise((o, s) => {
    let c,
      u,
      l = Dt(n.cancel ?? r?.cancel, t);
    if (l) d();
    else {
      N.und(n.pause) || (i.paused = Dt(n.pause, t));
      let m = r?.pause;
      (m !== !0 && (m = i.paused || Dt(m, t)),
        (c = Ye(n.delay || 0, t)),
        m ? (i.resumeQueue.add(f), a.pause()) : (a.resume(), f()));
    }
    function h() {
      (i.resumeQueue.add(f),
        i.timeouts.delete(u),
        u.cancel(),
        (c = u.time - A.now()));
    }
    function f() {
      c > 0 && !Ne.skipAnimation
        ? ((i.delayed = !0),
          (u = A.setTimeout(d, c)),
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
        a.start({ ...n, callId: e, cancel: l }, o);
      } catch (m) {
        s(m);
      }
    }
  });
}
var mi = (e, t) =>
    t.length == 1
      ? t[0]
      : t.some((n) => n.cancelled)
        ? ct(e.get())
        : t.every((n) => n.noop)
          ? uo(e.get())
          : ve(
              e.get(),
              t.every((n) => n.finished),
            ),
  uo = (e) => ({
    value: e,
    noop: !0,
    finished: !0,
    cancelled: !1,
  }),
  ve = (e, t, n = !1) => ({
    value: e,
    finished: t,
    cancelled: n,
  }),
  ct = (e) => ({
    value: e,
    cancelled: !0,
    finished: !1,
  });
function co(e, t, n, r) {
  const { callId: i, parentId: a, onRest: o } = t,
    { asyncTo: s, promise: c } = n;
  return !a && e === s && !t.reset
    ? c
    : (n.promise = (async () => {
        ((n.asyncId = i), (n.asyncTo = e));
        const u = di(t, (x, y) =>
          // The `onRest` prop is only called when the `runAsync` promise is resolved.
          y === "onRest" ? void 0 : x,
        );
        let l, h;
        const f = new Promise((x, y) => ((l = x), (h = y))),
          d = (x) => {
            const y =
              // The `cancel` prop or `stop` method was used.
              (i <= (n.cancelId || 0) && ct(r)) || // The async `to` prop was replaced.
              (i !== n.asyncId && ve(r, !1));
            if (y) throw ((x.result = y), h(x), x);
          },
          m = (x, y) => {
            const b = new ji(),
              p = new qi();
            return (async () => {
              if (Ne.skipAnimation)
                throw (Wt(n), (p.result = ve(r, !1)), h(p), p);
              d(b);
              const _ = N.obj(x) ? { ...x } : { ...y, to: x };
              ((_.parentId = i),
                Te(u, (k, T) => {
                  N.und(_[T]) && (_[T] = k);
                }));
              const M = await r.start(_);
              return (
                d(b),
                n.paused &&
                  (await new Promise((k) => {
                    n.resumeQueue.add(k);
                  })),
                M
              );
            })();
          };
        let g;
        if (Ne.skipAnimation) return (Wt(n), ve(r, !1));
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
          else if (x instanceof qi) g = x.result;
          else throw x;
        } finally {
          i == n.asyncId &&
            ((n.asyncId = a),
            (n.asyncTo = a ? s : void 0),
            (n.promise = a ? c : void 0));
        }
        return (
          N.fun(o) &&
            A.batchedUpdates(() => {
              o(g, r, r.item);
            }),
          g
        );
      })());
}
function Wt(e, t) {
  (Lt(e.timeouts, (n) => n.cancel()),
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
  qi = class extends Error {
    constructor() {
      super("SkipAnimationSignal");
    }
  },
  Ir = (e) => e instanceof gi,
  ou = 1,
  gi = class extends Qa {
    constructor() {
      (super(...arguments), (this.id = ou++), (this._priority = 0));
    }
    get priority() {
      return this._priority;
    }
    set priority(e) {
      this._priority != e && ((this._priority = e), this._onPriorityChange(e));
    }
    /** Get the current value */
    get() {
      const e = Se(this);
      return e && e.getValue();
    }
    /** Create a spring that maps our value to another value */
    to(...e) {
      return Ne.to(this, e);
    }
    /** @deprecated Use the `to` method instead. */
    interpolate(...e) {
      return (Fs(), Ne.to(this, e));
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
    /** Called when the first child is added. */
    _attach() {}
    /** Called when the last child is removed. */
    _detach() {}
    /** Tell our children about our new value */
    _onChange(e, t = !1) {
      Vt(this, {
        type: "change",
        parent: this,
        value: e,
        idle: t,
      });
    }
    /** Tell our children about our new priority */
    _onPriorityChange(e) {
      (this.idle || Hn.sort(this),
        Vt(this, {
          type: "priority",
          parent: this,
          priority: e,
        }));
    }
  },
  Ze = Symbol.for("SpringPhase"),
  lo = 1,
  Lr = 2,
  Fr = 4,
  ur = (e) => (e[Ze] & lo) > 0,
  Fe = (e) => (e[Ze] & Lr) > 0,
  $t = (e) => (e[Ze] & Fr) > 0,
  Hi = (e, t) => (t ? (e[Ze] |= Lr | lo) : (e[Ze] &= ~Lr)),
  Yi = (e, t) => (t ? (e[Ze] |= Fr) : (e[Ze] &= ~Fr)),
  ho = class extends gi {
    constructor(e, t) {
      if (
        (super(),
        (this.animation = new au()),
        (this.defaultProps = {}),
        (this._state = {
          paused: !1,
          delayed: !1,
          pauseQueue: /* @__PURE__ */ new Set(),
          resumeQueue: /* @__PURE__ */ new Set(),
          timeouts: /* @__PURE__ */ new Set(),
        }),
        (this._pendingCalls = /* @__PURE__ */ new Set()),
        (this._lastCallId = 0),
        (this._lastToId = 0),
        (this._memoizedDuration = 0),
        !N.und(e) || !N.und(t))
      ) {
        const n = N.obj(e) ? { ...e } : { ...t, from: e };
        (N.und(n.default) && (n.default = !0), this.start(n));
      }
    }
    /** Equals true when not advancing on each frame. */
    get idle() {
      return !(Fe(this) || this._state.asyncTo) || $t(this);
    }
    get goal() {
      return ae(this.animation.to);
    }
    get velocity() {
      const e = Se(this);
      return e instanceof un
        ? e.lastVelocity || 0
        : e.getPayload().map((t) => t.lastVelocity || 0);
    }
    /**
     * When true, this value has been animated at least once.
     */
    get hasAnimated() {
      return ur(this);
    }
    /**
     * When true, this value has an unfinished animation,
     * which is either active or paused.
     */
    get isAnimating() {
      return Fe(this);
    }
    /**
     * When true, all current and future animations are paused.
     */
    get isPaused() {
      return $t(this);
    }
    /**
     *
     *
     */
    get isDelayed() {
      return this._state.delayed;
    }
    /** Advance the current animation by a number of milliseconds */
    advance(e) {
      let t = !0,
        n = !1;
      const r = this.animation;
      let { toValues: i } = r;
      const { config: a } = r,
        o = Qn(r.to);
      (!o && de(r.to) && (i = he(ae(r.to))),
        r.values.forEach((u, l) => {
          if (u.done) return;
          const h =
            // Animated strings always go from 0 to 1.
            u.constructor == Ht ? 1 : o ? o[l].lastPosition : i[l];
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
              (g == h ? 5e-3 : Math.min(1, Math.abs(h - g) * 1e-3));
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
                  M = !N.und(_),
                  k = g == h ? u.v0 > 0 : g < h;
                let T,
                  R = !1;
                const I = 1,
                  F = Math.ceil(e / I);
                for (
                  let v = 0;
                  v < F &&
                  ((T = Math.abs(y) > p),
                  !(!T && ((f = Math.abs(h - d) <= b), f)));
                  ++v
                ) {
                  M &&
                    ((R = d == h || d > h == k), R && ((y = -y * _), (d = h)));
                  const E = -a.tension * 1e-6 * (d - h),
                    C = -a.friction * 1e-3 * y,
                    P = (E + C) / a.mass;
                  ((y = y + P * I), (d = d + y * I));
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
          (o && !o[l].done && (f = !1),
            f ? (u.done = !0) : (t = !1),
            u.setValue(d, a.round) && (n = !0));
        }));
      const s = Se(this),
        c = s.getValue();
      if (t) {
        const u = ae(r.to);
        ((c !== u || n) && !a.decay
          ? (s.setValue(u), this._onChange(u))
          : n && a.decay && this._onChange(c),
          this._stop());
      } else n && this._onChange(c);
    }
    /** Set the current value, while stopping the current animation */
    set(e) {
      return (
        A.batchedUpdates(() => {
          (this._stop(), this._focus(e), this._set(e));
        }),
        this
      );
    }
    /**
     * Freeze the active animation in time, as well as any updates merged
     * before `resume` is called.
     */
    pause() {
      this._update({ pause: !0 });
    }
    /** Resume the animation if paused. */
    resume() {
      this._update({ pause: !1 });
    }
    /** Skip to the end of the current animation. */
    finish() {
      if (Fe(this)) {
        const { to: e, config: t } = this.animation;
        A.batchedUpdates(() => {
          (this._onStart(), t.decay || this._set(e, !1), this._stop());
        });
      }
      return this;
    }
    /** Push props into the pending queue. */
    update(e) {
      return ((this.queue || (this.queue = [])).push(e), this);
    }
    start(e, t) {
      let n;
      return (
        N.und(e)
          ? ((n = this.queue || []), (this.queue = []))
          : (n = [N.obj(e) ? e : { ...t, to: e }]),
        Promise.all(n.map((r) => this._update(r))).then((r) => mi(this, r))
      );
    }
    /**
     * Stop the current animation, and cancel any delayed updates.
     *
     * Pass `true` to call `onRest` with `cancelled: true`.
     */
    stop(e) {
      const { to: t } = this.animation;
      return (
        this._focus(this.get()),
        Wt(this._state, e && this._lastCallId),
        A.batchedUpdates(() => this._stop(t, e)),
        this
      );
    }
    /** Restart the animation. */
    reset() {
      this._update({ reset: !0 });
    }
    /** @internal */
    eventObserved(e) {
      e.type == "change"
        ? this._start()
        : e.type == "priority" && (this.priority = e.priority + 1);
    }
    /**
     * Parse the `to` and `from` range from the given `props` object.
     *
     * This also ensures the initial value is available to animated components
     * during the render phase.
     */
    _prepareNode(e) {
      const t = this.key || "";
      let { to: n, from: r } = e;
      ((n = N.obj(n) ? n[t] : n),
        (n == null || Er(n)) && (n = void 0),
        (r = N.obj(r) ? r[t] : r),
        r == null && (r = void 0));
      const i = { to: n, from: r };
      return (
        ur(this) ||
          (e.reverse && ([n, r] = [r, n]),
          (r = ae(r)),
          N.und(r) ? Se(this) || this._set(n) : this._set(r)),
        i
      );
    }
    /** Every update is processed by this method before merging. */
    _update({ ...e }, t) {
      const { key: n, defaultProps: r } = this;
      (e.default &&
        Object.assign(
          r,
          di(e, (o, s) => (/^on/.test(s) ? io(o, n) : o)),
        ),
        Gi(this, e, "onProps"),
        Tt(this, "onProps", e, this));
      const i = this._prepareNode(e);
      if (Object.isFrozen(this))
        throw Error(
          "Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?",
        );
      const a = this._state;
      return so(++this._lastCallId, {
        key: n,
        props: e,
        defaultProps: r,
        state: a,
        actions: {
          pause: () => {
            $t(this) ||
              (Yi(this, !0),
              It(a.pauseQueue),
              Tt(this, "onPause", ve(this, kt(this, this.animation.to)), this));
          },
          resume: () => {
            $t(this) &&
              (Yi(this, !1),
              Fe(this) && this._resume(),
              It(a.resumeQueue),
              Tt(
                this,
                "onResume",
                ve(this, kt(this, this.animation.to)),
                this,
              ));
          },
          start: this._merge.bind(this, i),
        },
      }).then((o) => {
        if (e.loop && o.finished && !(t && o.noop)) {
          const s = fo(e);
          if (s) return this._update(s, !0);
        }
        return o;
      });
    }
    /** Merge props into the current animation */
    _merge(e, t, n) {
      if (t.cancel) return (this.stop(!0), n(ct(this)));
      const r = !N.und(e.to),
        i = !N.und(e.from);
      if (r || i)
        if (t.callId > this._lastToId) this._lastToId = t.callId;
        else return n(ct(this));
      const { key: a, defaultProps: o, animation: s } = this,
        { to: c, from: u } = s;
      let { to: l = c, from: h = u } = e;
      (i && !r && (!t.default || N.und(l)) && (l = h),
        t.reverse && ([l, h] = [h, l]));
      const f = !Re(h, u);
      (f && (s.from = h), (h = ae(h)));
      const d = !Re(l, c);
      d && this._focus(l);
      const m = Er(t.to),
        { config: g } = s,
        { decay: x, velocity: y } = g;
      ((r || i) && (g.velocity = 0),
        t.config &&
          !m &&
          iu(
            g,
            Ye(t.config, a),
            // Avoid calling the same "config" prop twice.
            t.config !== o.config ? Ye(o.config, a) : void 0,
          ));
      let b = Se(this);
      if (!b || N.und(l)) return n(ve(this, !0));
      const p =
          // When `reset` is undefined, the `from` prop implies `reset: true`,
          // except for declarative updates. When `reset` is defined, there
          // must exist a value to animate from.
          N.und(t.reset) ? i && !t.default : !N.und(h) && Dt(t.reset, a),
        _ = p ? h : this.get(),
        M = Yt(l),
        k = N.num(M) || N.arr(M) || Gn(M),
        T = !m && (!k || Dt(o.immediate || t.immediate, a));
      if (d) {
        const v = Ar(l);
        if (v !== b.constructor)
          if (T) b = this._set(M);
          else
            throw Error(
              `Cannot animate between ${b.constructor.name} and ${v.name}, as the "to" prop suggests`,
            );
      }
      const R = b.constructor;
      let I = de(l),
        F = !1;
      if (!I) {
        const v = p || (!ur(this) && f);
        ((d || v) && ((F = Re(Yt(_), M)), (I = !F)),
          ((!Re(s.immediate, T) && !T) ||
            !Re(g.decay, x) ||
            !Re(g.velocity, y)) &&
            (I = !0));
      }
      if (
        (F && Fe(this) && (s.changed && !p ? (I = !0) : I || this._stop(c)),
        !m &&
          ((I || de(c)) &&
            ((s.values = b.getPayload()),
            (s.toValues = de(l) ? null : R == Ht ? [1] : he(M))),
          s.immediate != T && ((s.immediate = T), !T && !p && this._set(c)),
          I))
      ) {
        const { onRest: v } = s;
        U(uu, (C) => Gi(this, t, C));
        const E = ve(this, kt(this, c));
        (It(this._pendingCalls, E),
          this._pendingCalls.add(n),
          s.changed &&
            A.batchedUpdates(() => {
              ((s.changed = !p),
                v?.(E, this),
                p ? Ye(o.onRest, E) : s.onStart?.(E, this));
            }));
      }
      (p && this._set(_),
        m
          ? n(co(t.to, t, this._state, this))
          : I
            ? this._start()
            : Fe(this) && !d
              ? this._pendingCalls.add(n)
              : n(uo(_)));
    }
    /** Update the `animation.to` value, which might be a `FluidValue` */
    _focus(e) {
      const t = this.animation;
      e !== t.to &&
        (Li(this) && this._detach(), (t.to = e), Li(this) && this._attach());
    }
    _attach() {
      let e = 0;
      const { to: t } = this.animation;
      (de(t) && (vt(t, this), Ir(t) && (e = t.priority + 1)),
        (this.priority = e));
    }
    _detach() {
      const { to: e } = this.animation;
      de(e) && jt(e, this);
    }
    /**
     * Update the current value from outside the frameloop,
     * and return the `Animated` node.
     */
    _set(e, t = !0) {
      const n = ae(e);
      if (!N.und(n)) {
        const r = Se(this);
        if (!r || !Re(n, r.getValue())) {
          const i = Ar(n);
          (!r || r.constructor != i ? fi(this, i.create(n)) : r.setValue(n),
            r &&
              A.batchedUpdates(() => {
                this._onChange(n, t);
              }));
        }
      }
      return Se(this);
    }
    _onStart() {
      const e = this.animation;
      e.changed ||
        ((e.changed = !0), Tt(this, "onStart", ve(this, kt(this, e.to)), this));
    }
    _onChange(e, t) {
      (t || (this._onStart(), Ye(this.animation.onChange, e, this)),
        Ye(this.defaultProps.onChange, e, this),
        super._onChange(e, t));
    }
    // This method resets the animation state (even if already animating) to
    // ensure the latest from/to range is used, and it also ensures this spring
    // is added to the frameloop.
    _start() {
      const e = this.animation;
      (Se(this).reset(ae(e.to)),
        e.immediate || (e.fromValues = e.values.map((t) => t.lastPosition)),
        Fe(this) || (Hi(this, !0), $t(this) || this._resume()));
    }
    _resume() {
      Ne.skipAnimation ? this.finish() : Hn.start(this);
    }
    /**
     * Exit the frameloop and notify `onRest` listeners.
     *
     * Always wrap `_stop` calls with `batchedUpdates`.
     */
    _stop(e, t) {
      if (Fe(this)) {
        Hi(this, !1);
        const n = this.animation;
        (U(n.values, (i) => {
          i.done = !0;
        }),
          n.toValues && (n.onChange = n.onPause = n.onResume = void 0),
          Vt(this, {
            type: "idle",
            parent: this,
          }));
        const r = t ? ct(this.get()) : ve(this.get(), kt(this, e ?? n.to));
        (It(this._pendingCalls, r),
          n.changed && ((n.changed = !1), Tt(this, "onRest", r, this)));
      }
    }
  };
function kt(e, t) {
  const n = Yt(t),
    r = Yt(e.get());
  return Re(r, n);
}
function fo(e, t = e.loop, n = e.to) {
  const r = Ye(t);
  if (r) {
    const i = r !== !0 && oo(r),
      a = (i || e).reverse,
      o = !i || i.reset;
    return Gt({
      ...e,
      loop: t,
      // Avoid updating default props when looping.
      default: !1,
      // Never loop the `pause` prop.
      pause: void 0,
      // For the "reverse" prop to loop as expected, the "to" prop
      // must be undefined. The "reverse" prop is ignored when the
      // "to" prop is an array or function.
      to: !a || Er(n) ? n : void 0,
      // Ignore the "from" prop except on reset.
      from: o ? e.from : void 0,
      reset: o,
      // The "loop" prop can return a "useSpring" props object to
      // override any of the original props.
      ...i,
    });
  }
}
function Gt(e) {
  const { to: t, from: n } = (e = oo(e)),
    r = /* @__PURE__ */ new Set();
  return (
    N.obj(t) && Wi(t, r),
    N.obj(n) && Wi(n, r),
    (e.keys = r.size ? Array.from(r) : null),
    e
  );
}
function su(e) {
  const t = Gt(e);
  return (N.und(t.default) && (t.default = di(t)), t);
}
function Wi(e, t) {
  Te(e, (n, r) => n != null && t.add(r));
}
var uu = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Gi(e, t, n) {
  e.animation[n] = t[n] !== ao(t, n) ? io(t[n], e.key) : void 0;
}
function Tt(e, t, ...n) {
  (e.animation[t]?.(...n), e.defaultProps[t]?.(...n));
}
var cu = ["onStart", "onChange", "onRest"],
  lu = 1,
  hu = class {
    constructor(e, t) {
      ((this.id = lu++),
        (this.springs = {}),
        (this.queue = []),
        (this._lastAsyncId = 0),
        (this._active = /* @__PURE__ */ new Set()),
        (this._changed = /* @__PURE__ */ new Set()),
        (this._started = !1),
        (this._state = {
          paused: !1,
          pauseQueue: /* @__PURE__ */ new Set(),
          resumeQueue: /* @__PURE__ */ new Set(),
          timeouts: /* @__PURE__ */ new Set(),
        }),
        (this._events = {
          onStart: /* @__PURE__ */ new Map(),
          onChange: /* @__PURE__ */ new Map(),
          onRest: /* @__PURE__ */ new Map(),
        }),
        (this._onFrame = this._onFrame.bind(this)),
        t && (this._flush = t),
        e && this.start({ default: !0, ...e }));
    }
    /**
     * Equals `true` when no spring values are in the frameloop, and
     * no async animation is currently active.
     */
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
    /** Get the current values of our springs */
    get() {
      const e = {};
      return (this.each((t, n) => (e[n] = t.get())), e);
    }
    /** Set the current values without animating. */
    set(e) {
      for (const t in e) {
        const n = e[t];
        N.und(n) || this.springs[t].set(n);
      }
    }
    /** Push an update onto the queue of each value. */
    update(e) {
      return (e && this.queue.push(Gt(e)), this);
    }
    /**
     * Start the queued animations for every spring, and resolve the returned
     * promise once all queued animations have finished or been cancelled.
     *
     * When you pass a queue (instead of nothing), that queue is used instead of
     * the queued animations added with the `update` method, which are left alone.
     */
    start(e) {
      let { queue: t } = this;
      return (
        e ? (t = he(e).map(Gt)) : (this.queue = []),
        this._flush ? this._flush(this, t) : (xo(this, t), Dr(this, t))
      );
    }
    /** @internal */
    stop(e, t) {
      if ((e !== !!e && (t = e), t)) {
        const n = this.springs;
        U(he(t), (r) => n[r].stop(!!e));
      } else
        (Wt(this._state, this._lastAsyncId), this.each((n) => n.stop(!!e)));
      return this;
    }
    /** Freeze the active animation in time */
    pause(e) {
      if (N.und(e)) this.start({ pause: !0 });
      else {
        const t = this.springs;
        U(he(e), (n) => t[n].pause());
      }
      return this;
    }
    /** Resume the animation if paused. */
    resume(e) {
      if (N.und(e)) this.start({ pause: !1 });
      else {
        const t = this.springs;
        U(he(e), (n) => t[n].resume());
      }
      return this;
    }
    /** Call a function once per spring value */
    each(e) {
      Te(this.springs, e);
    }
    /** @internal Called at the end of every animation frame */
    _onFrame() {
      const { onStart: e, onChange: t, onRest: n } = this._events,
        r = this._active.size > 0,
        i = this._changed.size > 0;
      ((r && !this._started) || (i && !this._started)) &&
        ((this._started = !0),
        Lt(e, ([s, c]) => {
          ((c.value = this.get()), s(c, this, this._item));
        }));
      const a = !r && this._started,
        o = i || (a && n.size) ? this.get() : null;
      (i &&
        t.size &&
        Lt(t, ([s, c]) => {
          ((c.value = o), s(c, this, this._item));
        }),
        a &&
          ((this._started = !1),
          Lt(n, ([s, c]) => {
            ((c.value = o), s(c, this, this._item));
          })));
    }
    /** @internal */
    eventObserved(e) {
      if (e.type == "change")
        (this._changed.add(e.parent), e.idle || this._active.add(e.parent));
      else if (e.type == "idle") this._active.delete(e.parent);
      else return;
      A.onFrame(this._onFrame);
    }
  };
function Dr(e, t) {
  return Promise.all(t.map((n) => mo(e, n))).then((n) => mi(e, n));
}
async function mo(e, t, n) {
  const { keys: r, to: i, from: a, loop: o, onRest: s, onResolve: c } = t,
    u = N.obj(t.default) && t.default;
  (o && (t.loop = !1), i === !1 && (t.to = null), a === !1 && (t.from = null));
  const l = N.arr(i) || N.fun(i) ? i : void 0;
  l
    ? ((t.to = void 0), (t.onRest = void 0), u && (u.onRest = void 0))
    : U(cu, (g) => {
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
    ? ((h.paused = t.pause), It(t.pause ? h.pauseQueue : h.resumeQueue))
    : h.paused && (t.pause = !0);
  const f = (r || Object.keys(e.springs)).map((g) => e.springs[g].start(t)),
    d = t.cancel === !0 || ao(t, "cancel") === !0;
  ((l || (d && h.asyncId)) &&
    f.push(
      so(++e._lastAsyncId, {
        props: t,
        state: h,
        actions: {
          pause: Tr,
          resume: Tr,
          start(g, x) {
            d
              ? (Wt(h, e._lastAsyncId), x(ct(e)))
              : ((g.onRest = s), x(co(l, g, h, e)));
          },
        },
      }),
    ),
    h.paused &&
      (await new Promise((g) => {
        h.resumeQueue.add(g);
      })));
  const m = mi(e, await Promise.all(f));
  if (o && m.finished && !(n && m.noop)) {
    const g = fo(t, o, i);
    if (g) return (xo(e, [g]), mo(e, g, !0));
  }
  return (c && A.batchedUpdates(() => c(m, e, e.item)), m);
}
function Qi(e, t) {
  const n = { ...e.springs };
  return (
    t &&
      U(he(t), (r) => {
        (N.und(r.keys) && (r = Gt(r)),
          N.obj(r.to) || (r = { ...r, to: void 0 }),
          po(n, r, (i) => yo(i)));
      }),
    go(e, n),
    n
  );
}
function go(e, t) {
  Te(t, (n, r) => {
    e.springs[r] || ((e.springs[r] = n), vt(n, e));
  });
}
function yo(e, t) {
  const n = new ho();
  return ((n.key = e), t && vt(n, t), n);
}
function po(e, t, n) {
  t.keys &&
    U(t.keys, (r) => {
      (e[r] || (e[r] = n(r)))._prepareNode(t);
    });
}
function xo(e, t) {
  U(t, (n) => {
    po(e.springs, n, (r) => yo(r, e));
  });
}
var Zn = ({ children: e, ...t }) => {
    const n = H(Tn),
      r = t.pause || !!n.pause,
      i = t.immediate || !!n.immediate;
    t = zs(() => ({ pause: r, immediate: i }), [r, i]);
    const { Provider: a } = Tn;
    return /* @__PURE__ */ ti.createElement(a, { value: t }, e);
  },
  Tn = fu(Zn, {});
Zn.Provider = Tn.Provider;
Zn.Consumer = Tn.Consumer;
function fu(e, t) {
  return (
    Object.assign(e, ti.createContext(t)),
    (e.Provider._context = e),
    (e.Consumer._context = e),
    e
  );
}
var du = () => {
  const e = [],
    t = function (r) {
      Us();
      const i = [];
      return (
        U(e, (a, o) => {
          if (N.und(r)) i.push(a.start());
          else {
            const s = n(r, a, o);
            s && i.push(a.start(s));
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
      return (U(e, (r) => r.pause(...arguments)), this);
    }),
    (t.resume = function () {
      return (U(e, (r) => r.resume(...arguments)), this);
    }),
    (t.set = function (r) {
      U(e, (i, a) => {
        const o = N.fun(r) ? r(a, i) : r;
        o && i.set(o);
      });
    }),
    (t.start = function (r) {
      const i = [];
      return (
        U(e, (a, o) => {
          if (N.und(r)) i.push(a.start());
          else {
            const s = this._getProps(r, a, o);
            s && i.push(a.start(s));
          }
        }),
        i
      );
    }),
    (t.stop = function () {
      return (U(e, (r) => r.stop(...arguments)), this);
    }),
    (t.update = function (r) {
      return (U(e, (i, a) => i.update(this._getProps(r, i, a))), this);
    }));
  const n = function (r, i, a) {
    return N.fun(r) ? r(a, i) : r;
  };
  return ((t._getProps = n), t);
};
function mu(e, t, n) {
  const r = N.fun(t) && t;
  r && !n && (n = []);
  const i = fn(() => (r || arguments.length == 3 ? du() : void 0), []),
    a = Xe(0),
    o = eo(),
    s = fn(
      () => ({
        ctrls: [],
        queue: [],
        flush(y, b) {
          const p = Qi(y, b);
          return a.current > 0 &&
            !s.queue.length &&
            !Object.keys(p).some((M) => !y.springs[M])
            ? Dr(y, b)
            : new Promise((M) => {
                (go(y, p),
                  s.queue.push(() => {
                    M(Dr(y, b));
                  }),
                  o());
              });
        },
      }),
      [],
    ),
    c = Xe([...s.ctrls]),
    u = [],
    l = Di(e) || 0;
  (fn(() => {
    (U(c.current.slice(e, l), (y) => {
      (eu(y, i), y.stop(!0));
    }),
      (c.current.length = e),
      h(l, e));
  }, [e]),
    fn(() => {
      h(0, Math.min(l, e));
    }, n));
  function h(y, b) {
    for (let p = y; p < b; p++) {
      const _ = c.current[p] || (c.current[p] = new hu(null, s.flush)),
        M = r ? r(p, _) : t[p];
      M && (u[p] = su(M));
    }
  }
  const f = c.current.map((y, b) => Qi(y, u[b])),
    d = H(Zn),
    m = Di(d),
    g = d !== m && Js(d);
  (hi(() => {
    (a.current++, (s.ctrls = c.current));
    const { queue: y } = s;
    (y.length && ((s.queue = []), U(y, (b) => b())),
      U(c.current, (b, p) => {
        (i?.add(b), g && b.start({ default: d }));
        const _ = u[p];
        _ && (tu(b, _.ref), b.ref ? b.queue.push(_) : b.start(_));
      }));
  }),
    to(() => () => {
      U(s.ctrls, (y) => y.stop(!0));
    }));
  const x = f.map((y) => ({ ...y }));
  return i ? [x, i] : x;
}
function Kn(e, t) {
  const n = N.fun(e),
    [[r], i] = mu(1, n ? e : [e], n ? [] : t);
  return n || arguments.length == 2 ? [r, i] : r;
}
var bo = class extends gi {
  constructor(e, t) {
    (super(),
      (this.source = e),
      (this.idle = !0),
      (this._active = /* @__PURE__ */ new Set()),
      (this.calc = zt(...t)));
    const n = this._get(),
      r = Ar(n);
    fi(this, r.create(n));
  }
  advance(e) {
    const t = this._get(),
      n = this.get();
    (Re(t, n) || (Se(this).setValue(t), this._onChange(t, this.idle)),
      !this.idle && Xi(this._active) && cr(this));
  }
  _get() {
    const e = N.arr(this.source) ? this.source.map(ae) : he(ae(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle &&
      !Xi(this._active) &&
      ((this.idle = !1),
      U(Qn(this), (e) => {
        e.done = !1;
      }),
      Ne.skipAnimation
        ? (A.batchedUpdates(() => this.advance()), cr(this))
        : Hn.start(this));
  }
  // Observe our sources only when we're observed.
  _attach() {
    let e = 1;
    (U(he(this.source), (t) => {
      (de(t) && vt(t, this),
        Ir(t) &&
          (t.idle || this._active.add(t), (e = Math.max(e, t.priority + 1))));
    }),
      (this.priority = e),
      this._start());
  }
  // Stop observing our sources once we have no observers.
  _detach() {
    (U(he(this.source), (e) => {
      de(e) && jt(e, this);
    }),
      this._active.clear(),
      cr(this));
  }
  /** @internal */
  eventObserved(e) {
    e.type == "change"
      ? e.idle
        ? this.advance()
        : (this._active.add(e.parent), this._start())
      : e.type == "idle"
        ? this._active.delete(e.parent)
        : e.type == "priority" &&
          (this.priority = he(this.source).reduce(
            (t, n) => Math.max(t, (Ir(n) ? n.priority : 0) + 1),
            0,
          ));
  }
};
function gu(e) {
  return e.idle !== !1;
}
function Xi(e) {
  return !e.size || Array.from(e).every(gu);
}
function cr(e) {
  e.idle ||
    ((e.idle = !0),
    U(Qn(e), (t) => {
      t.done = !0;
    }),
    Vt(e, {
      type: "idle",
      parent: e,
    }));
}
var yu = (e, ...t) => new bo(e, t);
Ne.assign({
  createStringInterpolator: Ka,
  to: (e, t) => new bo(e, t),
});
var vo = /^--/;
function pu(e, t) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : typeof t == "number" &&
        t !== 0 &&
        !vo.test(e) &&
        !(Ut.hasOwnProperty(e) && Ut[e])
      ? t + "px"
      : ("" + t).trim();
}
var Zi = {};
function xu(e, t) {
  if (!e.nodeType || !e.setAttribute) return !1;
  const n =
      e.nodeName === "filter" ||
      (e.parentNode && e.parentNode.nodeName === "filter"),
    {
      className: r,
      style: i,
      children: a,
      scrollTop: o,
      scrollLeft: s,
      viewBox: c,
      ...u
    } = t,
    l = Object.values(u),
    h = Object.keys(u).map((f) =>
      n || e.hasAttribute(f)
        ? f
        : Zi[f] ||
          (Zi[f] = f.replace(
            /([A-Z])/g,
            // Attributes are written in dash case
            (d) => "-" + d.toLowerCase(),
          )),
    );
  a !== void 0 && (e.textContent = a);
  for (const f in i)
    if (i.hasOwnProperty(f)) {
      const d = pu(f, i[f]);
      vo.test(f) ? e.style.setProperty(f, d) : (e.style[f] = d);
    }
  (h.forEach((f, d) => {
    e.setAttribute(f, l[d]);
  }),
    r !== void 0 && (e.className = r),
    o !== void 0 && (e.scrollTop = o),
    s !== void 0 && (e.scrollLeft = s),
    c !== void 0 && e.setAttribute("viewBox", c));
}
var Ut = {
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
    // SVG-related properties
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  bu = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1),
  vu = ["Webkit", "Ms", "Moz", "O"];
Ut = Object.keys(Ut).reduce(
  (e, t) => (vu.forEach((n) => (e[bu(n, t)] = e[t])), e),
  Ut,
);
var wu = /^(matrix|translate|scale|rotate|skew)/,
  _u = /^(translate)/,
  Nu = /^(rotate|skew)/,
  lr = (e, t) => (N.num(e) && e !== 0 ? e + t : e),
  Nn = (e, t) =>
    N.arr(e)
      ? e.every((n) => Nn(n, t))
      : N.num(e)
        ? e === t
        : parseFloat(e) === t,
  Mu = class extends Xn {
    constructor({ x: e, y: t, z: n, ...r }) {
      const i = [],
        a = [];
      ((e || t || n) &&
        (i.push([e || 0, t || 0, n || 0]),
        a.push((o) => [
          `translate3d(${o.map((s) => lr(s, "px")).join(",")})`,
          // prettier-ignore
          Nn(o, 0),
        ])),
        Te(r, (o, s) => {
          if (s === "transform")
            (i.push([o || ""]), a.push((c) => [c, c === ""]));
          else if (wu.test(s)) {
            if ((delete r[s], N.und(o))) return;
            const c = _u.test(s) ? "px" : Nu.test(s) ? "deg" : "";
            (i.push(he(o)),
              a.push(
                s === "rotate3d"
                  ? ([u, l, h, f]) => [
                      `rotate3d(${u},${l},${h},${lr(f, c)})`,
                      Nn(f, 0),
                    ]
                  : (u) => [
                      `${s}(${u.map((l) => lr(l, c)).join(",")})`,
                      Nn(u, s.startsWith("scale") ? 1 : 0),
                    ],
              ));
          }
        }),
        i.length && (r.transform = new Cu(i, a)),
        super(r));
    }
  },
  Cu = class extends Qa {
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
        U(this.inputs, (n, r) => {
          const i = ae(n[0]),
            [a, o] = this.transforms[r](N.arr(i) ? i : n.map(ae));
          ((e += " " + a), (t = t && o));
        }),
        t ? "none" : e
      );
    }
    // Start observing our inputs once we have an observer.
    observerAdded(e) {
      e == 1 && U(this.inputs, (t) => U(t, (n) => de(n) && vt(n, this)));
    }
    // Stop observing our inputs once we have no observers.
    observerRemoved(e) {
      e == 0 && U(this.inputs, (t) => U(t, (n) => de(n) && jt(n, this)));
    }
    eventObserved(e) {
      (e.type == "change" && (this._value = null), Vt(this, e));
    }
  },
  Su = [
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
    // SVG
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
  batchedUpdates: us,
  createStringInterpolator: Ka,
  colors: ys,
});
var $u = Gs(Su, {
    applyAnimatedValues: xu,
    createAnimatedStyle: (e) => new Mu(e),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getComponentProps: ({ scrollTop: e, scrollLeft: t, ...n }) => n,
  }),
  $e = $u.animated;
const ku = ["cx", "cy", "r", "stroke", "strokeWidth", "fill"];
function Tu(e) {
  const t = {};
  for (const n of ku) {
    const r = e[n];
    r != null && (typeof r == "number" || typeof r == "string") && (t[n] = r);
  }
  return t;
}
const Pu = function (e) {
    const { animated: t, x: n, y: r, ...i } = e,
      a = { ...i, cx: n, cy: r },
      o = Tu(a),
      s = Kn({
        ...o,
        config: { duration: 500 },
      });
    return t
      ? /* @__PURE__ */ $($e.circle, {
          className: "node-shape",
          ...a,
          ...s,
        })
      : /* @__PURE__ */ $($e.circle, { className: "node-shape", ...a });
  },
  Au = ["d", "stroke", "strokeWidth"];
function Eu(e) {
  const t = {};
  for (const n of Au) {
    const r = e[n];
    r != null && (typeof r == "number" || typeof r == "string") && (t[n] = r);
  }
  return t;
}
function Jn(e) {
  const { animated: t, ...n } = e,
    r = Eu(n),
    i = Kn({
      ...r,
      config: { duration: 500 },
    });
  return t
    ? /* @__PURE__ */ $($e.path, {
        ...n,
        ...i,
      })
    : /* @__PURE__ */ $($e.path, { ...n });
}
function Ki(e, t) {
  return e - t / 2;
}
const Ru = ["rx", "ry", "x", "y", "width", "height", "stroke", "strokeWidth"];
function Iu(e) {
  const t = {};
  for (const n of Ru) {
    const r = e[n];
    r != null && (typeof r == "number" || typeof r == "string") && (t[n] = r);
  }
  return t;
}
const Lu = function (e) {
    const { x: t, y: n, width: r, height: i, ...a } = e,
      o = Ki(t, r),
      s = Ki(n, i),
      c = { ...a, x: o, y: s, width: r, height: i };
    return /* @__PURE__ */ $(yi, { ...c });
  },
  yi = function (e) {
    const { animated: t, ...n } = e,
      r = Iu(n),
      i = Kn({
        ...r,
        config: { duration: 500 },
      });
    return t
      ? /* @__PURE__ */ $($e.rect, {
          className: "node-shape",
          ...n,
          ...i,
        })
      : /* @__PURE__ */ $($e.rect, { className: "node-shape", ...n });
  },
  hr = (e) => e instanceof ho;
function Ji(e, t, n) {
  return hr(e) || hr(t) || hr(n)
    ? yu([e, t, n], (r, i, a) => `translate(${r},${i}) rotate(${a})`)
    : `translate(${e},${t}) rotate(${n})`;
}
function wo(e) {
  const {
      alignmentBaseline: t,
      textAnchor: n,
      rotation: r,
      x: i,
      y: a,
      text: o,
      d: s,
      animated: c,
      ...u
    } = e,
    l = Kn({
      x: i,
      y: a,
      rotation: r,
      config: { duration: 500 },
    });
  if (c) {
    const h = Ji(l.x, l.y, l.rotation);
    return /* @__PURE__ */ Ie("g", {
      children: [
        /* @__PURE__ */ $($e.text, {
          alignmentBaseline: t,
          textAnchor: n,
          transform: h,
          ...u,
          children: o,
        }),
        s
          ? /* @__PURE__ */ $($e.path, {
              strokeWidth: 1,
              stroke: "grey",
              strokeDasharray: "2",
              d: s,
            })
          : null,
      ],
    });
  } else {
    const h = Ji(i, a, r);
    return /* @__PURE__ */ Ie("g", {
      children: [
        /* @__PURE__ */ $($e.text, {
          alignmentBaseline: t,
          textAnchor: n,
          transform: h,
          ...u,
          children: o,
        }),
        s
          ? /* @__PURE__ */ $($e.path, {
              strokeWidth: 1,
              stroke: "grey",
              strokeDasharray: "2",
              d: s,
            })
          : null,
      ],
    });
  }
}
const Fu = (e) => ({
    ...e,
    x: 0,
    y: 0,
  }),
  Le = jn(Fu),
  Du = {
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
    cartoonedNodes: /* @__PURE__ */ new Map(),
    pollard: 0,
    padding: 20,
    invert: !1,
    minRadius: 0,
  };
function Mn(e, t) {
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
function Uu(e, t) {
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
function _o(e) {
  let t, n, r;
  e.length !== 2
    ? ((t = Mn), (n = (s, c) => Mn(e(s), c)), (r = (s, c) => e(s) - c))
    : ((t = e === Mn || e === Uu ? e : Ou), (n = e), (r = e));
  function i(s, c, u = 0, l = s.length) {
    if (u < l) {
      if (t(c, c) !== 0) return l;
      do {
        const h = (u + l) >>> 1;
        n(s[h], c) < 0 ? (u = h + 1) : (l = h);
      } while (u < l);
    }
    return u;
  }
  function a(s, c, u = 0, l = s.length) {
    if (u < l) {
      if (t(c, c) !== 0) return l;
      do {
        const h = (u + l) >>> 1;
        n(s[h], c) <= 0 ? (u = h + 1) : (l = h);
      } while (u < l);
    }
    return u;
  }
  function o(s, c, u = 0, l = s.length) {
    const h = i(s, c, u, l - 1);
    return h > u && r(s[h - 1], c) > -r(s[h], c) ? h - 1 : h;
  }
  return { left: i, center: o, right: a };
}
function Ou() {
  return 0;
}
function zu(e) {
  return e === null ? NaN : +e;
}
const Bu = _o(Mn),
  Vu = Bu.right;
_o(zu).center;
function ft(e, t) {
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
const ju = Math.sqrt(50),
  qu = Math.sqrt(10),
  Hu = Math.sqrt(2);
function Pn(e, t, n) {
  const r = (t - e) / Math.max(0, n),
    i = Math.floor(Math.log10(r)),
    a = r / Math.pow(10, i),
    o = a >= ju ? 10 : a >= qu ? 5 : a >= Hu ? 2 : 1;
  let s, c, u;
  return (
    i < 0
      ? ((u = Math.pow(10, -i) / o),
        (s = Math.round(e * u)),
        (c = Math.round(t * u)),
        s / u < e && ++s,
        c / u > t && --c,
        (u = -u))
      : ((u = Math.pow(10, i) * o),
        (s = Math.round(e / u)),
        (c = Math.round(t / u)),
        s * u < e && ++s,
        c * u > t && --c),
    c < s && 0.5 <= n && n < 2 ? Pn(e, t, n * 2) : [s, c, u]
  );
}
function Yu(e, t, n) {
  if (((t = +t), (e = +e), (n = +n), !(n > 0))) return [];
  if (e === t) return [e];
  const r = t < e,
    [i, a, o] = r ? Pn(t, e, n) : Pn(e, t, n);
  if (!(a >= i)) return [];
  const s = a - i + 1,
    c = new Array(s);
  if (r)
    if (o < 0) for (let u = 0; u < s; ++u) c[u] = (a - u) / -o;
    else for (let u = 0; u < s; ++u) c[u] = (a - u) * o;
  else if (o < 0) for (let u = 0; u < s; ++u) c[u] = (i + u) / -o;
  else for (let u = 0; u < s; ++u) c[u] = (i + u) * o;
  return c;
}
function Ur(e, t, n) {
  return ((t = +t), (e = +e), (n = +n), Pn(e, t, n)[2]);
}
function Wu(e, t, n) {
  ((t = +t), (e = +e), (n = +n));
  const r = t < e,
    i = r ? Ur(t, e, n) : Ur(e, t, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Gu(e, t) {
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
function pi(e, t) {
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
var V = /* @__PURE__ */ ((e) => (
  (e.DISCRETE = "DISCRETE"),
  (e.BOOLEAN = "BOOLEAN"),
  (e.NUMERICAL = "NUMERICAL"),
  (e.NUMERICAL_SET = "NUMERICAL_SET"),
  (e.DISCRETE_SET = "DISCRETE_SET"),
  (e.MARKOV_JUMPS = "MARKOV_JUMPS"),
  (e.DENSITIES = "DENSITIES"),
  e
))(V || {});
function Qu(e) {
  const t = e
    .split(/\s*('[^']+'|"[^"]+"|;|\(|\)|,|:|=|\[&|\]|\{|\})\s*/)
    .filter((u) => u.length > 0);
  let n = !0,
    r = "",
    i = !1,
    a = !1,
    o = [],
    s;
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
      if (((n = !0), s === void 0)) throw new Error("Empty annotation value");
      c[r] = s;
    } else if (u === "{") (i ? ((a = !0), (o = [])) : (s = []), (i = !0));
    else if (u === "}") a ? ((a = !1), s.push(o)) : (i = !1);
    else if (u === "]") {
      if (s === void 0) throw new Error("Empty annotation value");
      c[r] = s;
    } else {
      let l = u;
      ((l.startsWith('"') || l.startsWith("'")) && (l = l.slice(1)),
        (l.endsWith('"') || l.endsWith("'")) && (l = l.slice(0, -1)),
        n
          ? (r = l.replace(".", "_"))
          : i
            ? a
              ? o.push(l)
              : s.push(l)
            : isNaN(l)
              ? (s = l)
              : (s = parseFloat(l)));
    }
  return c;
}
function Xu(e) {
  if (Array.isArray(e)) {
    if (Array.isArray(e[0])) {
      const i = e;
      if (i.map((a) => a.length === 3).reduce((a, o) => a && o, !0)) {
        const a = i.map(([o, s, c]) => {
          const u = Number(o);
          if (!Number.isFinite(u))
            throw new Error(
              `Expected a markov jump annotation but the first entry ${o} could not be make a number`,
            );
          return { time: u, from: s, to: c };
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
      ? {
          type: V.DISCRETE_SET,
          value: t.slice(),
        }
      : {
          type: V.DISCRETE_SET,
          value: t.map(String),
        };
  } else if (Zu(e)) {
    const n = Object.entries(e),
      r = n.every(([, a]) => Number.isFinite(Number(a))),
      i = n.every(([, a]) => typeof a == "boolean");
    if (r) {
      const a = {};
      for (const [o, s] of n) {
        const c = Number(s);
        a[o] = c;
      }
      return { type: V.DENSITIES, value: a };
    }
    if (i) {
      const a = n
        .filter(([, o]) => o === !0)
        .map(([o]) => o)
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
function Zu(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Ku(e) {
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
      throw new Error(
        `No defined why to write densities (${e.id}) as a string. 
 Please convert keys and values to separate array annotations.`,
      );
  }
}
var B = /* @__PURE__ */ ((e) => (
  (e.Some = "some"),
  (e.Nothing = "nothing"),
  e
))(B || {});
const Pe = () => ({
    type: "nothing",
    /* Nothing */
  }),
  er = (e) => ({
    type: "some",
    value: e,
  }),
  ea = (e, t) => {
    switch (e.type) {
      case "some":
        return e.value;
      case "nothing":
        throw new Error(t);
    }
  };
function No(e, t) {
  let n;
  if (t instanceof Object) {
    if (t.type === B.Nothing) return t;
    n = t.value;
  } else n = t;
  const r = e.allNames[n];
  return r === void 0 ? Pe() : er(r);
}
function Qt(e, t) {
  let n;
  if (t instanceof Object) {
    if (t.type === B.Nothing) return t;
    n = t.value;
  } else n = t;
  const r = e.byName[n];
  return r === void 0 ? Pe() : er(r);
}
function Ju(e, t) {
  return {
    name: e,
    number: t,
    annotations: {},
  };
}
class tr {
  _data;
  constructor(t) {
    this._data = t || {
      allNames: [],
      byName: {},
      finalized: !1,
    };
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
      n = Ju(r, this._data.allNames.length);
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
    const n = Qt(this._data, No(this._data, t));
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error(`Taxon by name ${t} not found`);
    }
  }
  getTaxonByName(t) {
    const n = Qt(this._data, t);
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
const fr = /* @__PURE__ */ new Date(),
  dr = /* @__PURE__ */ new Date();
function Ae(e, t, n, r) {
  function i(a) {
    return (
      e(
        (a =
          arguments.length === 0
            ? /* @__PURE__ */ new Date()
            : /* @__PURE__ */ new Date(+a)),
      ),
      a
    );
  }
  return (
    (i.floor = (a) => (e((a = /* @__PURE__ */ new Date(+a))), a)),
    (i.ceil = (a) => (e((a = new Date(a - 1))), t(a, 1), e(a), a)),
    (i.round = (a) => {
      const o = i(a),
        s = i.ceil(a);
      return a - o < s - a ? o : s;
    }),
    (i.offset = (a, o) => (
      t((a = /* @__PURE__ */ new Date(+a)), o == null ? 1 : Math.floor(o)),
      a
    )),
    (i.range = (a, o, s) => {
      const c = [];
      if (
        ((a = i.ceil(a)),
        (s = s == null ? 1 : Math.floor(s)),
        !(a < o) || !(s > 0))
      )
        return c;
      let u;
      do (c.push((u = /* @__PURE__ */ new Date(+a))), t(a, s), e(a));
      while (u < a && a < o);
      return c;
    }),
    (i.filter = (a) =>
      Ae(
        (o) => {
          if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
        },
        (o, s) => {
          if (o >= o)
            if (s < 0) for (; ++s <= 0; ) for (; t(o, -1), !a(o); );
            else for (; --s >= 0; ) for (; t(o, 1), !a(o); );
        },
      )),
    n &&
      ((i.count = (a, o) => (
        fr.setTime(+a),
        dr.setTime(+o),
        e(fr),
        e(dr),
        Math.floor(n(fr, dr))
      )),
      (i.every = (a) => (
        (a = Math.floor(a)),
        !isFinite(a) || !(a > 0)
          ? null
          : a > 1
            ? i.filter(
                r ? (o) => r(o) % a === 0 : (o) => i.count(0, o) % a === 0,
              )
            : i
      ))),
    i
  );
}
const ec = 1e3,
  xi = ec * 60,
  tc = xi * 60,
  Xt = tc * 24,
  Mo = Xt * 7,
  bi = Ae(
    (e) => e.setHours(0, 0, 0, 0),
    (e, t) => e.setDate(e.getDate() + t),
    (e, t) =>
      (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * xi) / Xt,
    (e) => e.getDate() - 1,
  );
bi.range;
const vi = Ae(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Xt,
  (e) => e.getUTCDate() - 1,
);
vi.range;
const nc = Ae(
  (e) => {
    e.setUTCHours(0, 0, 0, 0);
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t);
  },
  (e, t) => (t - e) / Xt,
  (e) => Math.floor(e / Xt),
);
nc.range;
function nt(e) {
  return Ae(
    (t) => {
      (t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)),
        t.setHours(0, 0, 0, 0));
    },
    (t, n) => {
      t.setDate(t.getDate() + n * 7);
    },
    (t, n) =>
      (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * xi) / Mo,
  );
}
const Co = nt(0),
  An = nt(1),
  rc = nt(2),
  ic = nt(3),
  dt = nt(4),
  ac = nt(5),
  oc = nt(6);
Co.range;
An.range;
rc.range;
ic.range;
dt.range;
ac.range;
oc.range;
function rt(e) {
  return Ae(
    (t) => {
      (t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)),
        t.setUTCHours(0, 0, 0, 0));
    },
    (t, n) => {
      t.setUTCDate(t.getUTCDate() + n * 7);
    },
    (t, n) => (n - t) / Mo,
  );
}
const So = rt(0),
  En = rt(1),
  sc = rt(2),
  uc = rt(3),
  mt = rt(4),
  cc = rt(5),
  lc = rt(6);
So.range;
En.range;
sc.range;
uc.range;
mt.range;
cc.range;
lc.range;
const Ke = Ae(
  (e) => {
    (e.setMonth(0, 1), e.setHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setFullYear(e.getFullYear() + t);
  },
  (e, t) => t.getFullYear() - e.getFullYear(),
  (e) => e.getFullYear(),
);
Ke.every = (e) =>
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
Ke.range;
const Je = Ae(
  (e) => {
    (e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0));
  },
  (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t);
  },
  (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
  (e) => e.getUTCFullYear(),
);
Je.every = (e) =>
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
Je.range;
function mr(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return (t.setFullYear(e.y), t);
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function gr(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return (t.setUTCFullYear(e.y), t);
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Pt(e, t, n) {
  return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function hc(e) {
  var t = e.dateTime,
    n = e.date,
    r = e.time,
    i = e.periods,
    a = e.days,
    o = e.shortDays,
    s = e.months,
    c = e.shortMonths,
    u = At(i),
    l = Et(i),
    h = At(a),
    f = Et(a),
    d = At(o),
    m = Et(o),
    g = At(s),
    x = Et(s),
    y = At(c),
    b = Et(c),
    p = {
      a: z,
      A: W,
      b: G,
      B: xe,
      c: null,
      d: oa,
      e: oa,
      f: Ic,
      g: qc,
      G: Yc,
      H: Ac,
      I: Ec,
      j: Rc,
      L: $o,
      m: Lc,
      M: Fc,
      p: Me,
      q: te,
      Q: ca,
      s: la,
      S: Dc,
      u: Uc,
      U: Oc,
      V: zc,
      w: Bc,
      W: Vc,
      x: null,
      X: null,
      y: jc,
      Y: Hc,
      Z: Wc,
      "%": ua,
    },
    _ = {
      a: Be,
      A: Nt,
      b: be,
      B: Mt,
      c: null,
      d: sa,
      e: sa,
      f: Zc,
      g: sl,
      G: cl,
      H: Gc,
      I: Qc,
      j: Xc,
      L: To,
      m: Kc,
      M: Jc,
      p: Ct,
      q: St,
      Q: ca,
      s: la,
      S: el,
      u: tl,
      U: nl,
      V: rl,
      w: il,
      W: al,
      x: null,
      X: null,
      y: ol,
      Y: ul,
      Z: ll,
      "%": ua,
    },
    M = {
      a: F,
      A: v,
      b: E,
      B: C,
      c: P,
      d: ia,
      e: ia,
      f: $c,
      g: ra,
      G: na,
      H: aa,
      I: aa,
      j: Nc,
      L: Sc,
      m: _c,
      M: Mc,
      p: I,
      q: wc,
      Q: Tc,
      s: Pc,
      S: Cc,
      u: yc,
      U: pc,
      V: xc,
      w: gc,
      W: bc,
      x: K,
      X: Y,
      y: ra,
      Y: na,
      Z: vc,
      "%": kc,
    };
  ((p.x = k(n, p)),
    (p.X = k(r, p)),
    (p.c = k(t, p)),
    (_.x = k(n, _)),
    (_.X = k(r, _)),
    (_.c = k(t, _)));
  function k(S, L) {
    return function (D) {
      var w = [],
        ne = -1,
        j = 0,
        ue = S.length,
        ce,
        Ve,
        Pi;
      for (D instanceof Date || (D = /* @__PURE__ */ new Date(+D)); ++ne < ue; )
        S.charCodeAt(ne) === 37 &&
          (w.push(S.slice(j, ne)),
          (Ve = ta[(ce = S.charAt(++ne))]) != null
            ? (ce = S.charAt(++ne))
            : (Ve = ce === "e" ? " " : "0"),
          (Pi = L[ce]) && (ce = Pi(D, Ve)),
          w.push(ce),
          (j = ne + 1));
      return (w.push(S.slice(j, ne)), w.join(""));
    };
  }
  function T(S, L) {
    return function (D) {
      var w = Pt(1900, void 0, 1),
        ne = R(w, S, (D += ""), 0),
        j,
        ue;
      if (ne != D.length) return null;
      if ("Q" in w) return new Date(w.Q);
      if ("s" in w) return new Date(w.s * 1e3 + ("L" in w ? w.L : 0));
      if (
        (L && !("Z" in w) && (w.Z = 0),
        "p" in w && (w.H = (w.H % 12) + w.p * 12),
        w.m === void 0 && (w.m = "q" in w ? w.q : 0),
        "V" in w)
      ) {
        if (w.V < 1 || w.V > 53) return null;
        ("w" in w || (w.w = 1),
          "Z" in w
            ? ((j = gr(Pt(w.y, 0, 1))),
              (ue = j.getUTCDay()),
              (j = ue > 4 || ue === 0 ? En.ceil(j) : En(j)),
              (j = vi.offset(j, (w.V - 1) * 7)),
              (w.y = j.getUTCFullYear()),
              (w.m = j.getUTCMonth()),
              (w.d = j.getUTCDate() + ((w.w + 6) % 7)))
            : ((j = mr(Pt(w.y, 0, 1))),
              (ue = j.getDay()),
              (j = ue > 4 || ue === 0 ? An.ceil(j) : An(j)),
              (j = bi.offset(j, (w.V - 1) * 7)),
              (w.y = j.getFullYear()),
              (w.m = j.getMonth()),
              (w.d = j.getDate() + ((w.w + 6) % 7))));
      } else
        ("W" in w || "U" in w) &&
          ("w" in w || (w.w = "u" in w ? w.u % 7 : "W" in w ? 1 : 0),
          (ue =
            "Z" in w
              ? gr(Pt(w.y, 0, 1)).getUTCDay()
              : mr(Pt(w.y, 0, 1)).getDay()),
          (w.m = 0),
          (w.d =
            "W" in w
              ? ((w.w + 6) % 7) + w.W * 7 - ((ue + 5) % 7)
              : w.w + w.U * 7 - ((ue + 6) % 7)));
      return "Z" in w
        ? ((w.H += (w.Z / 100) | 0), (w.M += w.Z % 100), gr(w))
        : mr(w);
    };
  }
  function R(S, L, D, w) {
    for (var ne = 0, j = L.length, ue = D.length, ce, Ve; ne < j; ) {
      if (w >= ue) return -1;
      if (((ce = L.charCodeAt(ne++)), ce === 37)) {
        if (
          ((ce = L.charAt(ne++)),
          (Ve = M[ce in ta ? L.charAt(ne++) : ce]),
          !Ve || (w = Ve(S, D, w)) < 0)
        )
          return -1;
      } else if (ce != D.charCodeAt(w++)) return -1;
    }
    return w;
  }
  function I(S, L, D) {
    var w = u.exec(L.slice(D));
    return w ? ((S.p = l.get(w[0].toLowerCase())), D + w[0].length) : -1;
  }
  function F(S, L, D) {
    var w = d.exec(L.slice(D));
    return w ? ((S.w = m.get(w[0].toLowerCase())), D + w[0].length) : -1;
  }
  function v(S, L, D) {
    var w = h.exec(L.slice(D));
    return w ? ((S.w = f.get(w[0].toLowerCase())), D + w[0].length) : -1;
  }
  function E(S, L, D) {
    var w = y.exec(L.slice(D));
    return w ? ((S.m = b.get(w[0].toLowerCase())), D + w[0].length) : -1;
  }
  function C(S, L, D) {
    var w = g.exec(L.slice(D));
    return w ? ((S.m = x.get(w[0].toLowerCase())), D + w[0].length) : -1;
  }
  function P(S, L, D) {
    return R(S, t, L, D);
  }
  function K(S, L, D) {
    return R(S, n, L, D);
  }
  function Y(S, L, D) {
    return R(S, r, L, D);
  }
  function z(S) {
    return o[S.getDay()];
  }
  function W(S) {
    return a[S.getDay()];
  }
  function G(S) {
    return c[S.getMonth()];
  }
  function xe(S) {
    return s[S.getMonth()];
  }
  function Me(S) {
    return i[+(S.getHours() >= 12)];
  }
  function te(S) {
    return 1 + ~~(S.getMonth() / 3);
  }
  function Be(S) {
    return o[S.getUTCDay()];
  }
  function Nt(S) {
    return a[S.getUTCDay()];
  }
  function be(S) {
    return c[S.getUTCMonth()];
  }
  function Mt(S) {
    return s[S.getUTCMonth()];
  }
  function Ct(S) {
    return i[+(S.getUTCHours() >= 12)];
  }
  function St(S) {
    return 1 + ~~(S.getUTCMonth() / 3);
  }
  return {
    format: function (S) {
      var L = k((S += ""), p);
      return (
        (L.toString = function () {
          return S;
        }),
        L
      );
    },
    parse: function (S) {
      var L = T((S += ""), !1);
      return (
        (L.toString = function () {
          return S;
        }),
        L
      );
    },
    utcFormat: function (S) {
      var L = k((S += ""), _);
      return (
        (L.toString = function () {
          return S;
        }),
        L
      );
    },
    utcParse: function (S) {
      var L = T((S += ""), !0);
      return (
        (L.toString = function () {
          return S;
        }),
        L
      );
    },
  };
}
var ta = { "-": "", _: " ", 0: "0" },
  Q = /^\s*\d+/,
  fc = /^%/,
  dc = /[\\^$*+?|[\]().{}]/g;
function O(e, t, n) {
  var r = e < 0 ? "-" : "",
    i = (r ? -e : e) + "",
    a = i.length;
  return r + (a < n ? new Array(n - a + 1).join(t) + i : i);
}
function mc(e) {
  return e.replace(dc, "\\$&");
}
function At(e) {
  return new RegExp("^(?:" + e.map(mc).join("|") + ")", "i");
}
function Et(e) {
  return new Map(e.map((t, n) => [t.toLowerCase(), n]));
}
function gc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 1));
  return r ? ((e.w = +r[0]), n + r[0].length) : -1;
}
function yc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 1));
  return r ? ((e.u = +r[0]), n + r[0].length) : -1;
}
function pc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.U = +r[0]), n + r[0].length) : -1;
}
function xc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.V = +r[0]), n + r[0].length) : -1;
}
function bc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.W = +r[0]), n + r[0].length) : -1;
}
function na(e, t, n) {
  var r = Q.exec(t.slice(n, n + 4));
  return r ? ((e.y = +r[0]), n + r[0].length) : -1;
}
function ra(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length) : -1;
}
function vc(e, t, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
  return r
    ? ((e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00"))), n + r[0].length)
    : -1;
}
function wc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 1));
  return r ? ((e.q = r[0] * 3 - 3), n + r[0].length) : -1;
}
function _c(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.m = r[0] - 1), n + r[0].length) : -1;
}
function ia(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.d = +r[0]), n + r[0].length) : -1;
}
function Nc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 3));
  return r ? ((e.m = 0), (e.d = +r[0]), n + r[0].length) : -1;
}
function aa(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.H = +r[0]), n + r[0].length) : -1;
}
function Mc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.M = +r[0]), n + r[0].length) : -1;
}
function Cc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 2));
  return r ? ((e.S = +r[0]), n + r[0].length) : -1;
}
function Sc(e, t, n) {
  var r = Q.exec(t.slice(n, n + 3));
  return r ? ((e.L = +r[0]), n + r[0].length) : -1;
}
function $c(e, t, n) {
  var r = Q.exec(t.slice(n, n + 6));
  return r ? ((e.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
}
function kc(e, t, n) {
  var r = fc.exec(t.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function Tc(e, t, n) {
  var r = Q.exec(t.slice(n));
  return r ? ((e.Q = +r[0]), n + r[0].length) : -1;
}
function Pc(e, t, n) {
  var r = Q.exec(t.slice(n));
  return r ? ((e.s = +r[0]), n + r[0].length) : -1;
}
function oa(e, t) {
  return O(e.getDate(), t, 2);
}
function Ac(e, t) {
  return O(e.getHours(), t, 2);
}
function Ec(e, t) {
  return O(e.getHours() % 12 || 12, t, 2);
}
function Rc(e, t) {
  return O(1 + bi.count(Ke(e), e), t, 3);
}
function $o(e, t) {
  return O(e.getMilliseconds(), t, 3);
}
function Ic(e, t) {
  return $o(e, t) + "000";
}
function Lc(e, t) {
  return O(e.getMonth() + 1, t, 2);
}
function Fc(e, t) {
  return O(e.getMinutes(), t, 2);
}
function Dc(e, t) {
  return O(e.getSeconds(), t, 2);
}
function Uc(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function Oc(e, t) {
  return O(Co.count(Ke(e) - 1, e), t, 2);
}
function ko(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? dt(e) : dt.ceil(e);
}
function zc(e, t) {
  return ((e = ko(e)), O(dt.count(Ke(e), e) + (Ke(e).getDay() === 4), t, 2));
}
function Bc(e) {
  return e.getDay();
}
function Vc(e, t) {
  return O(An.count(Ke(e) - 1, e), t, 2);
}
function jc(e, t) {
  return O(e.getFullYear() % 100, t, 2);
}
function qc(e, t) {
  return ((e = ko(e)), O(e.getFullYear() % 100, t, 2));
}
function Hc(e, t) {
  return O(e.getFullYear() % 1e4, t, 4);
}
function Yc(e, t) {
  var n = e.getDay();
  return (
    (e = n >= 4 || n === 0 ? dt(e) : dt.ceil(e)),
    O(e.getFullYear() % 1e4, t, 4)
  );
}
function Wc(e) {
  var t = e.getTimezoneOffset();
  return (
    (t > 0 ? "-" : ((t *= -1), "+")) +
    O((t / 60) | 0, "0", 2) +
    O(t % 60, "0", 2)
  );
}
function sa(e, t) {
  return O(e.getUTCDate(), t, 2);
}
function Gc(e, t) {
  return O(e.getUTCHours(), t, 2);
}
function Qc(e, t) {
  return O(e.getUTCHours() % 12 || 12, t, 2);
}
function Xc(e, t) {
  return O(1 + vi.count(Je(e), e), t, 3);
}
function To(e, t) {
  return O(e.getUTCMilliseconds(), t, 3);
}
function Zc(e, t) {
  return To(e, t) + "000";
}
function Kc(e, t) {
  return O(e.getUTCMonth() + 1, t, 2);
}
function Jc(e, t) {
  return O(e.getUTCMinutes(), t, 2);
}
function el(e, t) {
  return O(e.getUTCSeconds(), t, 2);
}
function tl(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function nl(e, t) {
  return O(So.count(Je(e) - 1, e), t, 2);
}
function Po(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? mt(e) : mt.ceil(e);
}
function rl(e, t) {
  return ((e = Po(e)), O(mt.count(Je(e), e) + (Je(e).getUTCDay() === 4), t, 2));
}
function il(e) {
  return e.getUTCDay();
}
function al(e, t) {
  return O(En.count(Je(e) - 1, e), t, 2);
}
function ol(e, t) {
  return O(e.getUTCFullYear() % 100, t, 2);
}
function sl(e, t) {
  return ((e = Po(e)), O(e.getUTCFullYear() % 100, t, 2));
}
function ul(e, t) {
  return O(e.getUTCFullYear() % 1e4, t, 4);
}
function cl(e, t) {
  var n = e.getUTCDay();
  return (
    (e = n >= 4 || n === 0 ? mt(e) : mt.ceil(e)),
    O(e.getUTCFullYear() % 1e4, t, 4)
  );
}
function ll() {
  return "+0000";
}
function ua() {
  return "%";
}
function ca(e) {
  return +e;
}
function la(e) {
  return Math.floor(+e / 1e3);
}
var at, Or, Ao;
hl({
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
function hl(e) {
  return (
    (at = hc(e)),
    (Or = at.format),
    (Ao = at.parse),
    at.utcFormat,
    at.utcParse,
    at
  );
}
function Eo(e) {
  return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0;
}
function Of(e) {
  const t = Math.trunc(e),
    n = Eo(t) ? 366 : 365,
    r = Math.round((e - t) * n),
    i = Ao("%Y-%j")(`${t}-${r}`);
  return pe(i, `Could not convert ${e} to date tried (year:${t} - day: ${r})`);
}
function zf(e) {
  const t = parseInt(Or("%Y")(e)),
    n = parseInt(Or("%j")(e)),
    r = Eo(t) ? 366 : 365;
  return t + n / r;
}
function Bf(e) {
  throw new Error(e);
}
function Vf(e) {
  if (e === void 0) throw new Error("internal bug! unhandled undefined");
  return e;
}
function Z(e, t) {
  if (e === void 0) throw new Error(t);
}
function pe(e, t) {
  if (e === null) throw new Error(t);
  return e;
}
class Ro {
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
  constructor(t = new tr(), n = {}) {
    ((this.done = !1),
      (this.started = !1),
      (this.level = 0),
      (this.currentNode = void 0),
      (this.nodeStack = []),
      (this.labelNext = !1),
      (this.lengthNext = !1),
      (this.taxonSet = t),
      (this.options = n),
      (this.tree = new qo({ taxonSet: this.taxonSet })));
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
      const n = Qu(t);
      (Z(
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
      (Z(n, "Internal Parsing error - node stack unexpectedly empty"),
        Z(
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
      (Z(n, "Internal Parsing error - node stack unexpectedly empty"),
        Z(
          this.currentNode,
          "Internal Parsing error - Current not is not defined",
        ),
        (this.tree = this.tree.addChild(n, this.currentNode)),
        (this.level -= 1),
        (this.currentNode = n),
        (this.labelNext = !0));
    } else if (t === ":") ((this.labelNext = !1), (this.lengthNext = !0));
    else if (this.lengthNext)
      (Z(
        this.currentNode,
        "Internal Parsing error - Current not is not defined",
      ),
        (this.tree = this.tree.setLength(this.currentNode, parseFloat(t))),
        (this.lengthNext = !1));
    else if (this.labelNext) {
      if (t.startsWith("#"))
        (Z(
          this.currentNode,
          "Internal Parsing error - Current not is not defined",
        ),
          (this.tree = this.tree.setLabel(this.currentNode, t.slice(1))));
      else {
        let n = parseFloat(t);
        (isNaN(n) && (n = t),
          this.options.labelName
            ? (Z(
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
          n = pe(
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
function zr(e, t = {}) {
  const n = t.taxonSet ? t.taxonSet : new tr(),
    r = e
      .split(/\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/)
      .filter((o) => o.length > 0),
    i = new Ro(n, t);
  for (const o of r) i.parseCharacter(o);
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
    const o = a.replace(/^\s+|\s+$/g, "").split(/\n/);
    if (o.shift().toLowerCase().trim() === "trees;") {
      let c = !1;
      const u = /* @__PURE__ */ new Map();
      for (const l of o)
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
            ? zr(h, {
                parseAnnotations: !0,
                ...n,
                tipNameMap: u,
              })
            : zr(h, {
                parseAnnotations: !0,
                ...n,
                tipNameMap: u,
              });
        }
    }
  }
  throw new Error("No tree section found in nexus file");
}
var Io = Symbol.for("immer-nothing"),
  Br = Symbol.for("immer-draftable"),
  fe = Symbol.for("immer-state"),
  dl =
    process.env.NODE_ENV !== "production"
      ? [
          // All error codes, starting by 0:
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
          // Note: if more errors are added, the errorOffset in Patches.ts should be increased
          // See Patches.ts for additional errors
        ]
      : [];
function oe(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = dl[e],
      r = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${r}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var gt = Object.getPrototypeOf;
function yt(e) {
  return !!e && !!e[fe];
}
function et(e) {
  return e
    ? Lo(e) ||
        Array.isArray(e) ||
        !!e[Br] ||
        !!e.constructor?.[Br] ||
        cn(e) ||
        rr(e)
    : !1;
}
var ml = Object.prototype.constructor.toString();
function Lo(e) {
  if (!e || typeof e != "object") return !1;
  const t = gt(e);
  if (t === null) return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object
    ? !0
    : typeof n == "function" && Function.toString.call(n) === ml;
}
function Rn(e, t) {
  nr(e) === 0
    ? Reflect.ownKeys(e).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function nr(e) {
  const t = e[fe];
  return t ? t.type_ : Array.isArray(e) ? 1 : cn(e) ? 2 : rr(e) ? 3 : 0;
}
function Vr(e, t) {
  return nr(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Fo(e, t, n) {
  const r = nr(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function gl(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function cn(e) {
  return e instanceof Map;
}
function rr(e) {
  return e instanceof Set;
}
function qe(e) {
  return e.copy_ || e.base_;
}
function jr(e, t) {
  if (cn(e)) return new Map(e);
  if (rr(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  const n = Lo(e);
  if (t === !0 || (t === "class_only" && !n)) {
    const r = Object.getOwnPropertyDescriptors(e);
    delete r[fe];
    let i = Reflect.ownKeys(r);
    for (let a = 0; a < i.length; a++) {
      const o = i[a],
        s = r[o];
      (s.writable === !1 && ((s.writable = !0), (s.configurable = !0)),
        (s.get || s.set) &&
          (r[o] = {
            configurable: !0,
            writable: !0,
            // could live with !!desc.set as well here...
            enumerable: s.enumerable,
            value: e[o],
          }));
    }
    return Object.create(gt(e), r);
  } else {
    const r = gt(e);
    if (r !== null && n) return { ...e };
    const i = Object.create(r);
    return Object.assign(i, e);
  }
}
function wi(e, t = !1) {
  return (
    ir(e) ||
      yt(e) ||
      !et(e) ||
      (nr(e) > 1 &&
        Object.defineProperties(e, {
          set: { value: mn },
          add: { value: mn },
          clear: { value: mn },
          delete: { value: mn },
        }),
      Object.freeze(e),
      t && Object.values(e).forEach((n) => wi(n, !0))),
    e
  );
}
function mn() {
  oe(2);
}
function ir(e) {
  return Object.isFrozen(e);
}
var yl = {};
function tt(e) {
  const t = yl[e];
  return (t || oe(0, e), t);
}
var Zt;
function Do() {
  return Zt;
}
function pl(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function ha(e, t) {
  t &&
    (tt("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function qr(e) {
  (Hr(e), e.drafts_.forEach(xl), (e.drafts_ = null));
}
function Hr(e) {
  e === Zt && (Zt = e.parent_);
}
function fa(e) {
  return (Zt = pl(Zt, e));
}
function xl(e) {
  const t = e[fe];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function da(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[fe].modified_ && (qr(t), oe(4)),
        et(e) && ((e = In(t, e)), t.parent_ || Ln(t, e)),
        t.patches_ &&
          tt("Patches").generateReplacementPatches_(
            n[fe].base_,
            e,
            t.patches_,
            t.inversePatches_,
          ))
      : (e = In(t, n, [])),
    qr(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== Io ? e : void 0
  );
}
function In(e, t, n) {
  if (ir(t)) return t;
  const r = t[fe];
  if (!r) return (Rn(t, (i, a) => ma(e, r, t, i, a, n)), t);
  if (r.scope_ !== e) return t;
  if (!r.modified_) return (Ln(e, r.base_, !0), r.base_);
  if (!r.finalized_) {
    ((r.finalized_ = !0), r.scope_.unfinalizedDrafts_--);
    const i = r.copy_;
    let a = i,
      o = !1;
    (r.type_ === 3 && ((a = new Set(i)), i.clear(), (o = !0)),
      Rn(a, (s, c) => ma(e, r, i, s, c, n, o)),
      Ln(e, i, !1),
      n &&
        e.patches_ &&
        tt("Patches").generatePatches_(r, n, e.patches_, e.inversePatches_));
  }
  return r.copy_;
}
function ma(e, t, n, r, i, a, o) {
  if ((process.env.NODE_ENV !== "production" && i === n && oe(5), yt(i))) {
    const s =
        a &&
        t &&
        t.type_ !== 3 && // Set objects are atomic since they have no keys.
        !Vr(t.assigned_, r)
          ? a.concat(r)
          : void 0,
      c = In(e, i, s);
    if ((Fo(n, r, c), yt(c))) e.canAutoFreeze_ = !1;
    else return;
  } else o && n.add(i);
  if (et(i) && !ir(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    (In(e, i),
      (!t || !t.scope_.parent_) &&
        typeof r != "symbol" &&
        (cn(n) ? n.has(r) : Object.prototype.propertyIsEnumerable.call(n, r)) &&
        Ln(e, i));
  }
}
function Ln(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && wi(t, n);
}
function bl(e, t) {
  const n = Array.isArray(e),
    r = {
      type_: n ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: t ? t.scope_ : Do(),
      // True for both shallow and deep changes.
      modified_: !1,
      // Used during finalization.
      finalized_: !1,
      // Track which properties have been assigned (true) or deleted (false).
      assigned_: {},
      // The parent draft state.
      parent_: t,
      // The base state.
      base_: e,
      // The base proxy.
      draft_: null,
      // set below
      // The base copy with any updated values.
      copy_: null,
      // Called by the `produce` function.
      revoke_: null,
      isManual_: !1,
    };
  let i = r,
    a = _i;
  n && ((i = [r]), (a = Kt));
  const { revoke: o, proxy: s } = Proxy.revocable(i, a);
  return ((r.draft_ = s), (r.revoke_ = o), s);
}
var _i = {
    get(e, t) {
      if (t === fe) return e;
      const n = qe(e);
      if (!Vr(n, t)) return vl(e, n, t);
      const r = n[t];
      return e.finalized_ || !et(r)
        ? r
        : r === yr(e.base_, t)
          ? (pr(e), (e.copy_[t] = Wr(r, e)))
          : r;
    },
    has(e, t) {
      return t in qe(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(qe(e));
    },
    set(e, t, n) {
      const r = Uo(qe(e), t);
      if (r?.set) return (r.set.call(e.draft_, n), !0);
      if (!e.modified_) {
        const i = yr(qe(e), t),
          a = i?.[fe];
        if (a && a.base_ === n)
          return ((e.copy_[t] = n), (e.assigned_[t] = !1), !0);
        if (gl(n, i) && (n !== void 0 || Vr(e.base_, t))) return !0;
        (pr(e), Yr(e));
      }
      return (
        (e.copy_[t] === n && // special case: handle new props with value 'undefined'
          (n !== void 0 || t in e.copy_)) || // special case: NaN
          (Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = n), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        yr(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), pr(e), Yr(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(e, t) {
      const n = qe(e),
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
      oe(11);
    },
    getPrototypeOf(e) {
      return gt(e.base_);
    },
    setPrototypeOf() {
      oe(12);
    },
  },
  Kt = {};
Rn(_i, (e, t) => {
  Kt[e] = function () {
    return ((arguments[0] = arguments[0][0]), t.apply(this, arguments));
  };
});
Kt.deleteProperty = function (e, t) {
  return (
    process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && oe(13),
    Kt.set.call(this, e, t, void 0)
  );
};
Kt.set = function (e, t, n) {
  return (
    process.env.NODE_ENV !== "production" &&
      t !== "length" &&
      isNaN(parseInt(t)) &&
      oe(14),
    _i.set.call(this, e[0], t, n, e[0])
  );
};
function yr(e, t) {
  const n = e[fe];
  return (n ? qe(n) : e)[t];
}
function vl(e, t, n) {
  const r = Uo(t, n);
  return r
    ? "value" in r
      ? r.value
      : // This is a very special case, if the prop is a getter defined by the
        // prototype, we should invoke it with the draft as context!
        r.get?.call(e.draft_)
    : void 0;
}
function Uo(e, t) {
  if (!(t in e)) return;
  let n = gt(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = gt(n);
  }
}
function Yr(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && Yr(e.parent_));
}
function pr(e) {
  e.copy_ || (e.copy_ = jr(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var wl = class {
  constructor(e) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, n, r) => {
        if (typeof t == "function" && typeof n != "function") {
          const a = n;
          n = t;
          const o = this;
          return function (c = a, ...u) {
            return o.produce(c, (l) => n.call(this, l, ...u));
          };
        }
        (typeof n != "function" && oe(6),
          r !== void 0 && typeof r != "function" && oe(7));
        let i;
        if (et(t)) {
          const a = fa(this),
            o = Wr(t, void 0);
          let s = !0;
          try {
            ((i = n(o)), (s = !1));
          } finally {
            s ? qr(a) : Hr(a);
          }
          return (ha(a, r), da(i, a));
        } else if (!t || typeof t != "object") {
          if (
            ((i = n(t)),
            i === void 0 && (i = t),
            i === Io && (i = void 0),
            this.autoFreeze_ && wi(i, !0),
            r)
          ) {
            const a = [],
              o = [];
            (tt("Patches").generateReplacementPatches_(t, i, a, o), r(a, o));
          }
          return i;
        } else oe(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == "function")
          return (o, ...s) => this.produceWithPatches(o, (c) => t(c, ...s));
        let r, i;
        return [
          this.produce(t, n, (o, s) => {
            ((r = o), (i = s));
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
    (et(e) || oe(8), yt(e) && (e = _l(e)));
    const t = fa(this),
      n = Wr(e, void 0);
    return ((n[fe].isManual_ = !0), Hr(t), n);
  }
  finishDraft(e, t) {
    const n = e && e[fe];
    (!n || !n.isManual_) && oe(9);
    const { scope_: r } = n;
    return (ha(r, t), da(void 0, r));
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
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
    const r = tt("Patches").applyPatches_;
    return yt(e) ? r(e, t) : this.produce(e, (i) => r(i, t));
  }
};
function Wr(e, t) {
  const n = cn(e)
    ? tt("MapSet").proxyMap_(e, t)
    : rr(e)
      ? tt("MapSet").proxySet_(e, t)
      : bl(e, t);
  return ((t ? t.scope_ : Do()).drafts_.push(n), n);
}
function _l(e) {
  return (yt(e) || oe(10, e), Oo(e));
}
function Oo(e) {
  if (!et(e) || ir(e)) return e;
  const t = e[fe];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    ((t.finalized_ = !0), (n = jr(e, t.scope_.immer_.useStrictShallowCopy_)));
  } else n = jr(e, !0);
  return (
    Rn(n, (r, i) => {
      Fo(n, r, Oo(i));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var Nl = new wl(),
  J = Nl.produce;
function Ml(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString("en").replace(/,/g, "")
    : e.toString(10);
}
function Fn(e, t) {
  if (
    (n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0
  )
    return null;
  var n,
    r = e.slice(0, n);
  return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function pt(e) {
  return ((e = Fn(Math.abs(e))), e ? e[1] : NaN);
}
function Cl(e, t) {
  return function (n, r) {
    for (
      var i = n.length, a = [], o = 0, s = e[0], c = 0;
      i > 0 &&
      s > 0 &&
      (c + s + 1 > r && (s = Math.max(1, r - c)),
      a.push(n.substring((i -= s), i + s)),
      !((c += s + 1) > r));

    )
      s = e[(o = (o + 1) % e.length)];
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
function Dn(e) {
  if (!(t = $l.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new Ni({
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
Dn.prototype = Ni.prototype;
function Ni(e) {
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
Ni.prototype.toString = function () {
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
var zo;
function Tl(e, t) {
  var n = Fn(e, t);
  if (!n) return e + "";
  var r = n[0],
    i = n[1],
    a = i - (zo = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    o = r.length;
  return a === o
    ? r
    : a > o
      ? r + new Array(a - o + 1).join("0")
      : a > 0
        ? r.slice(0, a) + "." + r.slice(a)
        : "0." + new Array(1 - a).join("0") + Fn(e, Math.max(0, t + a - 1))[0];
}
function ga(e, t) {
  var n = Fn(e, t);
  if (!n) return e + "";
  var r = n[0],
    i = n[1];
  return i < 0
    ? "0." + new Array(-i).join("0") + r
    : r.length > i + 1
      ? r.slice(0, i + 1) + "." + r.slice(i + 1)
      : r + new Array(i - r.length + 2).join("0");
}
const ya = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: Ml,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => ga(e * 100, t),
  r: ga,
  s: Tl,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
};
function pa(e) {
  return e;
}
var xa = Array.prototype.map,
  ba = [
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
        ? pa
        : Cl(xa.call(e.grouping, Number), e.thousands + ""),
    n = e.currency === void 0 ? "" : e.currency[0] + "",
    r = e.currency === void 0 ? "" : e.currency[1] + "",
    i = e.decimal === void 0 ? "." : e.decimal + "",
    a = e.numerals === void 0 ? pa : Sl(xa.call(e.numerals, String)),
    o = e.percent === void 0 ? "%" : e.percent + "",
    s = e.minus === void 0 ? "−" : e.minus + "",
    c = e.nan === void 0 ? "NaN" : e.nan + "";
  function u(h) {
    h = Dn(h);
    var f = h.fill,
      d = h.align,
      m = h.sign,
      g = h.symbol,
      x = h.zero,
      y = h.width,
      b = h.comma,
      p = h.precision,
      _ = h.trim,
      M = h.type;
    (M === "n"
      ? ((b = !0), (M = "g"))
      : ya[M] || (p === void 0 && (p = 12), (_ = !0), (M = "g")),
      (x || (f === "0" && d === "=")) && ((x = !0), (f = "0"), (d = "=")));
    var k =
        g === "$"
          ? n
          : g === "#" && /[boxX]/.test(M)
            ? "0" + M.toLowerCase()
            : "",
      T = g === "$" ? r : /[%p]/.test(M) ? o : "",
      R = ya[M],
      I = /[defgprs%]/.test(M);
    p =
      p === void 0
        ? 6
        : /[gprs]/.test(M)
          ? Math.max(1, Math.min(21, p))
          : Math.max(0, Math.min(20, p));
    function F(v) {
      var E = k,
        C = T,
        P,
        K,
        Y;
      if (M === "c") ((C = R(v) + C), (v = ""));
      else {
        v = +v;
        var z = v < 0 || 1 / v < 0;
        if (
          ((v = isNaN(v) ? c : R(Math.abs(v), p)),
          _ && (v = kl(v)),
          z && +v == 0 && m !== "+" && (z = !1),
          (E = (z ? (m === "(" ? m : s) : m === "-" || m === "(" ? "" : m) + E),
          (C =
            (M === "s" ? ba[8 + zo / 3] : "") +
            C +
            (z && m === "(" ? ")" : "")),
          I)
        ) {
          for (P = -1, K = v.length; ++P < K; )
            if (((Y = v.charCodeAt(P)), 48 > Y || Y > 57)) {
              ((C = (Y === 46 ? i + v.slice(P + 1) : v.slice(P)) + C),
                (v = v.slice(0, P)));
              break;
            }
        }
      }
      b && !x && (v = t(v, 1 / 0));
      var W = E.length + v.length + C.length,
        G = W < y ? new Array(y - W + 1).join(f) : "";
      switch (
        (b && x && ((v = t(G + v, G.length ? y - C.length : 1 / 0)), (G = "")),
        d)
      ) {
        case "<":
          v = E + v + C + G;
          break;
        case "=":
          v = E + G + v + C;
          break;
        case "^":
          v = G.slice(0, (W = G.length >> 1)) + E + v + C + G.slice(W);
          break;
        default:
          v = G + E + v + C;
          break;
      }
      return a(v);
    }
    return (
      (F.toString = function () {
        return h + "";
      }),
      F
    );
  }
  function l(h, f) {
    var d = u(((h = Dn(h)), (h.type = "f"), h)),
      m = Math.max(-8, Math.min(8, Math.floor(pt(f) / 3))) * 3,
      g = Math.pow(10, -m),
      x = ba[8 + m / 3];
    return function (y) {
      return d(g * y) + x;
    };
  }
  return {
    format: u,
    formatPrefix: l,
  };
}
var gn, Jt, Bo;
Al({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
});
function Al(e) {
  return ((gn = Pl(e)), (Jt = gn.format), (Bo = gn.formatPrefix), gn);
}
function El(e) {
  return Math.max(0, -pt(Math.abs(e)));
}
function Rl(e, t) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(pt(t) / 3))) * 3 - pt(Math.abs(e)),
  );
}
function Il(e, t) {
  return (
    (e = Math.abs(e)),
    (t = Math.abs(t) - e),
    Math.max(0, pt(t) - pt(e)) + 1
  );
}
function Vo(e, t) {
  const n = e._data.nodes.allNodes[t];
  return n === void 0 ? Pe() : er(n);
}
function Mi(e, t) {
  if (typeof t == "number") return Vo(e, t);
  if (t instanceof Object) return Gr(e, t);
  if (typeof t == "string") {
    const n = Qt(e.taxonSet._data, t);
    return n.type === B.Some ? Gr(e, n.value) : Ll(e, t);
  }
  return Pe();
}
function Gr(e, t) {
  const n = e._data.nodes.byTaxon[t.number];
  return n === void 0 ? Pe() : Mi(e, n);
}
function Ll(e, t) {
  const n = e._data.nodes.byLabel[t];
  return n === void 0 ? Pe() : Vo(e, n);
}
function xr(e, t, n) {
  const r = e.getNode(t.number).annotations[n];
  return r === void 0 ? Pe() : er(r);
}
function Qr(e, t) {
  const n = e._data.nodeToTaxon[t.number];
  return n === void 0 ? Pe() : jo(e, n);
}
function jo(e, t) {
  return typeof t == "number"
    ? Qt(e.taxonSet._data, No(e.taxonSet._data, t))
    : typeof t == "string"
      ? Qt(e.taxonSet._data, t)
      : Qr(e, t);
}
function br(e, t) {
  const n = e._data.nodes.allNodes[t.number];
  if (n === void 0) return Pe();
  const r = n.parent;
  return r === void 0 ? Pe() : Mi(e, r);
}
const X = [];
for (let e = 0; e < 256; ++e) X.push((e + 256).toString(16).slice(1));
function Fl(e, t = 0) {
  return (
    X[e[t + 0]] +
    X[e[t + 1]] +
    X[e[t + 2]] +
    X[e[t + 3]] +
    "-" +
    X[e[t + 4]] +
    X[e[t + 5]] +
    "-" +
    X[e[t + 6]] +
    X[e[t + 7]] +
    "-" +
    X[e[t + 8]] +
    X[e[t + 9]] +
    "-" +
    X[e[t + 10]] +
    X[e[t + 11]] +
    X[e[t + 12]] +
    X[e[t + 13]] +
    X[e[t + 14]] +
    X[e[t + 15]]
  ).toLowerCase();
}
let vr;
const Dl = new Uint8Array(16);
function Ul() {
  if (!vr) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
      );
    vr = crypto.getRandomValues.bind(crypto);
  }
  return vr(Dl);
}
const Ol =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  va = { randomUUID: Ol };
function zl(e, t, n) {
  e = e || {};
  const r = e.random ?? e.rng?.() ?? Ul();
  if (r.length < 16) throw new Error("Random bytes length must be >= 16");
  return ((r[6] = (r[6] & 15) | 64), (r[8] = (r[8] & 63) | 128), Fl(r));
}
function yn(e, t, n) {
  return va.randomUUID && !e ? va.randomUUID() : zl(e);
}
class qo {
  //TODO remove the TaxonSetInterface implementation.
  [Br] = !0;
  _data;
  taxonSet;
  constructor(t = {}) {
    const { data: n, taxonSet: r } = t;
    let i = n;
    (r ? (this.taxonSet = r) : (this.taxonSet = new tr()),
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
                _id: yn(),
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
  // Parsers and constructors
  static fromNewick(t, n = {}) {
    return zr(t, n);
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
    const i = (a, o) => {
      const s = [];
      let c;
      for (const u of a.getChildren(o)) s.push(i(a, u));
      o !== n
        ? ((r = this._addNodeWithMetadata(a, o, r)),
          (c = r.getNode(r.getNodeCount() - 1)))
        : ((c = r.getRoot()), this._copyNodeMetadata(a, o, r, c));
      for (const u of s) r = r.addChild(c, u);
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
        const o = t.getFullNodeAnnotation(n, a);
        if (o.type === V.MARKOV_JUMPS) {
          const s = o.value.map((c) => [Number(c.time), c.from, c.to]);
          r = r.annotateNode(i, a, s);
        } else r = r.annotateNode(i, a, o.value);
      }
    if (t.hasBranchLength(n)) {
      const a = t.getLength(n);
      r = r.setLength(i, a);
    }
    return r;
  }
  // ------------------ Getters ----------------------
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
    const n = Mi(this, t);
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error("No node found");
    }
  }
  getNodeByTaxon(t) {
    const n = Gr(this, t);
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
    switch (Qr(this, t).type) {
      case B.Some:
        return !0;
      case B.Nothing:
        return !1;
    }
  }
  getTaxonFromNode(t) {
    const n = Qr(this, t);
    switch (n.type) {
      case B.Some:
        return n.value;
      case B.Nothing:
        throw new Error("Node taxon found for the provided node");
    }
  }
  //TODO overload as above.
  getTaxon(t) {
    const n = jo(this, t);
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
  //todo cache
  getHeight(t) {
    let n = -1;
    for (const r of Ci(this)) {
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
      n === void 0 && (n = { blFormat: Jt("0.2"), includeAnnotations: !1 }),
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
    for (const [a, o] of Object.entries(n))
      (i > 0 && (r += ", "), (r += `${a}=${Ku(o)}`), (i += 1));
    return ((r += "]"), r);
  }
  toNewick(t, n) {
    const r = {
      blFormat: Jt("0.2"),
      includeAnnotations: !1,
      ...n,
    };
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
        const o = this.getLength(a);
        ((r += o), (a = this.getParent(a)));
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
    const n = br(this, t);
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
    const n = br(this, t);
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
    const n = br(this, t);
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
          const o = {
            number: i + a,
            children: [],
            parent: void 0,
            label: void 0,
            length: void 0,
            taxon: void 0,
            annotations: {},
            _id: yn(),
          };
          (n.push(o), r._data.nodes.allNodes.push(o));
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
    const i = xr(this, this.getNode(t.number), n);
    if (r === void 0) {
      const { value: a } = ea(i, `Node ${t.number} is not annotated with ${n}`);
      return a;
    } else
      switch (i.type) {
        case B.Some:
          return i.value.value;
        // value of the maybe = annotation . value of the annotation
        case B.Nothing:
          return r;
      }
  }
  getFullNodeAnnotation(t, n) {
    const r = xr(this, this.getNode(t.number), n);
    return ea(r, `Node ${t.number} is not annotated with ${n}`);
  }
  hasAnnotation(t, n) {
    switch (xr(this, this.getNode(t.number), n).type) {
      case B.Some:
        return !0;
      case B.Nothing:
        return !1;
    }
  }
  annotateNode(t, n, r) {
    if (typeof n == "string") {
      const i = n,
        o = Xu(r),
        s = this._data.annotations[i];
      if (s !== void 0 && s.type !== o.type)
        throw new Error(
          `Tried annotation ${i} was parsed as ${o.type} - but is ${s.type} in tree.`,
        );
      return J(this, (c) => {
        const u = s ? s.domain : void 0,
          l = jl(o, u);
        ((c._data.nodes.allNodes[t.number].annotations[i] = {
          id: i,
          type: o.type,
          value: o.value,
        }),
          (c._data.annotations[i] = {
            id: i,
            type: o.type,
            domain: l,
          }));
      });
    } else {
      let i = this;
      for (const [a, o] of Object.entries(n)) i = i.annotateNode(t, a, o);
      return i;
    }
  }
  //TODO handle height and divergence changes still not very happy with how these are handled.
  setHeight(t, n) {
    if (!this.hasLengths())
      throw new Error(
        "Can not set the heights of nodes in a tree without branch lengths",
      );
    return J(this, (r) => {
      const i = r.getNode(t.number);
      if (n < 0) throw new Error("Height must be non-negative");
      const o = r.getHeight(t) - n;
      if (i.length === void 0) {
        if (!r.isRoot(t))
          throw new Error("Cannot set height on a node without length");
      } else i.length = i.length + o;
      for (const s of r.getChildren(t)) {
        const c = r.getNode(s.number),
          u = r.getLength(c) - o;
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
  // can only be called once heights are known.
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
        // todo copy annotations from root
        _id: yn(),
      };
      (r._data.nodes.allNodes.push(i), (r._data.nodes.byTaxon.length += 1));
      const a = r.getNode(t.number),
        o = r.getParent(a),
        s = o.children.indexOf(a.number);
      (o.children.splice(s, 1, i.number), (i.parent = o.number));
      const u = r.getLength(a);
      ((a.length = u * (1 - n)),
        (i.length = u * n),
        (i.children = [a.number]),
        (a.parent = i.number));
    });
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  unroot(t) {
    throw new Error("unroot not implemented in immutable tree");
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  deleteNode(t) {
    throw new Error("deleteNode not implemented in immutable tree");
  }
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  deleteClade(t) {
    throw new Error("deleteClade not implemented in immutable tree");
  }
  orderNodesByDensity(t, n) {
    return J(this, (r) => {
      n === void 0 && (n = r._data.nodes.allNodes[r._data.rootNode]);
      const i = t ? 1 : -1;
      Ho(r._data, n, (a, o, s, c) => (o - c) * i);
    });
  }
  rotate(t, n = !1) {
    return J(this, (r) => {
      const i = r.getNode(t.number);
      if (((i.children = i.children.reverse()), n))
        for (const a of i.children.map((o) => r.getNode(o))) r.rotate(a, n);
    });
  }
  //TODO handle lengthless tree
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
          .map((s) => r.getNode(s))
          .map((s) => r.getLength(s))
          .reduce((s, c) => c + s, 0);
      else {
        const s = [...r.getPathToRoot(t)],
          c = s[s.length - 2];
        if (
          (Z(c, "Index error when looking for the root child"),
          !i.children.includes(c.number))
        )
          throw new Error(
            "Root child not in path to root - likely an internal error",
          );
        a = r.getLength(c);
      }
      const o = r.getNode(t.number);
      if (r.getParent(t) !== i) {
        let s = o,
          c = r.getParent(o);
        const u = r.getChild(c, 0).number === t.number,
          l = o,
          h = c;
        let f = r.getLength(c);
        for (; !r.isRoot(c); ) {
          if (
            ((c.children = c.children.filter((m) => m !== s.number)),
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
                _id: yn(),
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
          ((s = c), (c = r.getParent(c)));
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
          Z(l.length, "Expected the root's new child to have a length"),
          (l.length -= d));
      } else {
        const s = r.getLength(t) * (1 - n);
        o.length = s;
        const c = r.getNextSibling(t);
        c.length = a - s;
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
function Ho(e, t, n) {
  let r = 0;
  if (e.nodes.allNodes[t.number].children.length > 0) {
    const i = /* @__PURE__ */ new Map();
    for (const s of e.nodes.allNodes[t.number].children.map(
      (c) => e.nodes.allNodes[c],
    )) {
      const c = Ho(e, s, n);
      (i.set(s.number, c), (r += c));
    }
    const a = e.nodes.allNodes[t.number].children
      .slice()
      .sort((s, c) =>
        n(
          e.nodes.allNodes[s],
          pe(i.get(s), "Internal error when ordering. Counts not defined."),
          e.nodes.allNodes[c],
          pe(i.get(c), "Internal error when ordering. Counts not defined."),
        ),
      );
    a.reduce(
      (s, c, u) => s || c !== e.nodes.allNodes[t.number].children[u],
      !0,
    ) && (e.nodes.allNodes[t.number].children = a);
  } else r = 1;
  return r;
}
function* Bl(e, t = void 0) {
  const n = function* (r) {
    yield e.getNode(r.number);
    const i = e.getChildCount(r);
    if (i > 0)
      for (let a = 0; a < i; a++) {
        const o = e.getChild(r, a);
        yield* n(o);
      }
  };
  (t === void 0 && (t = e.getRoot()), yield* n(t));
}
function* jf(e, t = void 0, n = (r, i) => r.number - i.number) {
  const r = function* (i, a = void 0) {
    yield e.getNode(i.number);
    const o = [...e.getChildren(i), e.getParent(i)].filter(
      (s) => s.number !== a,
    );
    o.sort(n);
    for (const s of o) yield* r(s, i.number);
  };
  (t === void 0 && (t = e.getRoot()), yield* r(t));
}
function* qf(e, t = void 0, n = (r, i) => r.number - i.number) {
  const r = function* (i, a = void 0) {
    const o = [...e.getChildren(i), e.getParent(i)].filter(
      (s) => s.number !== a,
    );
    o.sort(n);
    for (const s of o) yield* r(s, i.number);
    yield e.getNode(i.number);
  };
  (t === void 0 && (t = e.getRoot()), yield* r(t));
}
function* Vl(e, t = void 0) {
  const n = function* (r) {
    const i = e.getChildCount(r);
    if (i > 0)
      for (let a = 0; a < i; a++) {
        const o = e.getChild(r, a);
        yield* n(o);
      }
    yield r;
  };
  (t === void 0 && (t = e.getRoot()), yield* n(t));
}
function* Ci(e, t) {
  t === void 0 && (t = e.getRoot());
  const n = function* (r) {
    const i = e.getChildCount(r);
    if (i > 0)
      for (let a = 0; a < i; a++) {
        const o = e.getChild(r, a);
        yield* n(o);
      }
    else yield r;
  };
  yield* n(t);
}
function* Hf(e, t) {
  let n = t;
  for (; !e.isRoot(n); ) (yield n, (n = e.getParent(n)));
  yield n;
}
function jl(e, t) {
  switch (e.type) {
    case V.BOOLEAN:
      return [!0, !1];
    case V.DISCRETE: {
      const n = e.value;
      if (t !== void 0) {
        const r = t;
        return [.../* @__PURE__ */ new Set([...r, n])].sort();
      } else return [n];
    }
    case V.NUMERICAL: {
      const n = e.value;
      return ft([...(t || []), n]);
    }
    case V.DISCRETE_SET: {
      const n = e.value,
        r = t || [];
      return [.../* @__PURE__ */ new Set([...r, ...n])].sort();
    }
    case V.NUMERICAL_SET: {
      const n = e.value;
      return ft([...(t || []), ...n]);
    }
    case V.DENSITIES:
      if (t !== void 0) {
        const n = t;
        return [
          .../* @__PURE__ */ new Set([...n, ...Object.keys(e.value)]),
        ].sort();
      } else return [...new Set(Object.keys(e.value))].sort().filter((n) => n);
    case V.MARKOV_JUMPS: {
      const n = e.value.reduce((i, a) => i.concat([a.to, a.from]), []),
        r = t || [];
      return [.../* @__PURE__ */ new Set([...r, ...n])].sort();
    }
    default:
      throw new Error("Unrecognized type  when updating domain");
  }
}
function ql() {
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
        (Z(a, "Internal Error. Hit empty character in array"),
          this.status === "parsing"
            ? (([this.status, this.end] = Hl(a)),
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
function Hl(e) {
  return e === "'"
    ? ["in single quote", "'"]
    : e === '"'
      ? ["in double quote", '"']
      : e === "["
        ? ["in comment", "]"]
        : ["parsing", ""];
}
const wa = /\s*('[^']+'|"[^"]+"|\[&[^[]+]|,|:|\)|\(|;)\s*/;
class Yf {
  reader;
  taxonSet;
  currentBlock;
  hasTree;
  options;
  translateTaxonMap;
  constructor(t, n = {}) {
    const r = new TransformStream(ql());
    ((this.reader = t
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(r)
      .getReader()),
      (this.taxonSet = new tr()),
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
  //make skip and then a list of regex to skip
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
  // private async getNextCommand(command: RegExp) {
  //   let value;
  //   let keepGoing = true
  //   while (keepGoing) {
  //     value = await this.nextToken()
  //     if (value === ";") {
  //       throw `Hit ; looking for ${command}`
  //     }
  //     if (command.test(value)) {
  //       keepGoing=false
  //     }
  //   }
  //   return value
  // }
  // skip until match and return match
  async skipUntil(t) {
    let n,
      r = !0;
    for (; r; ) ((n = await this.nextToken()), t.test(n) && (r = !1));
    if (n == null)
      throw new Error(`Internal parsing error: ${t.source} not found `);
    return n;
  }
  // read up to match return everything up to including the match
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
            (Z(a[1], "No number of taxa found despite matching regex"),
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
          this.translateTaxonMap = /* @__PURE__ */ new Map();
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
              (Z(
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
          const i = new Ro(this.taxonSet, {
            translateTaxonNames: this.translateTaxonMap,
          });
          t = await this.skipUntil(/\(/);
          let a = t
            .split(wa)
            .filter((s) => s.length > 0)
            .reverse();
          for (; !i.isDone(); ) {
            for (; a.length > 0; ) {
              const s = a.pop();
              (Z(s, "Unexpectedly hit the end of the buffer"),
                i.parseCharacter(s));
            }
            i.isDone() ||
              ((t = await this.nextToken()),
              (a = t
                .split(wa)
                .filter((s) => s.length > 0)
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
class Wf {
  _forwardCache;
  _reverseCache;
  constructor() {
    ((this._forwardCache = /* @__PURE__ */ new Map()),
      (this._reverseCache = /* @__PURE__ */ new Map()));
  }
  *traverse(t, n) {
    const r = function* (i) {
      const a = t.getChildCount(i);
      if (a > 0)
        for (let o = 0; o < a; o++) {
          const s = t.getChild(i, o);
          yield* r(s);
        }
      yield i;
    };
    (n === void 0 && (n = t.getRoot()), yield* r(n));
  }
  //Check we've been to next otherwise we need to update again.
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
var q = /* @__PURE__ */ ((e) => (
  (e.Rectangular = "Rectangular"),
  (e.Polar = "Polar"),
  (e.Radial = "Radial"),
  e
))(q || {});
function Yo(e) {
  function t(n) {
    const r = /* @__PURE__ */ new Map();
    let i = 0;
    for (const a of Vl(n)) {
      let o;
      const s = n.getDivergence(a),
        c = n.getChildCount(a) > 0,
        u = !n.isRoot(a),
        l =
          n.getChildCount(a) > 0 && (!u || n.getChild(n.getParent(a), 0) !== a);
      if (n.isExternal(a)) ((o = { x: s, y: i }), i++);
      else {
        const f = n
            .getChildren(a)
            .map((m) =>
              pe(r.get(m), "Internal Error: child not yet found in layout"),
            ),
          d = pe(
            pi(f, (m) => m.y),
            "Error taking the mean of child positions",
          );
        o = { x: s, y: d };
      }
      const h = {
        ...o,
        layoutClass: e,
        nodeLabel: {
          alignmentBaseline: c ? (l ? "bottom" : "hanging") : "middle",
          // todo calc on the fly
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
const Yl = Yo(q.Rectangular),
  Gf = Yo(q.Polar);
function Qf(e, t = {}) {
  const { spread: n = 1 } = t;
  console.log("radial layout with spread", n);
  const r = /* @__PURE__ */ new Map(),
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
  for (const a of Bl(e)) {
    const o = i.pop();
    Z(o, "Internal Error, hit the end of the data stack unexpectedly");
    const { angleStart: s, angleEnd: c, xpos: u, ypos: l, level: h } = o,
      f = (s + c) / 2,
      d = e.isRoot(a) ? 0 : e.getLength(a),
      m = Math.cos(f),
      g = Math.sin(f),
      x = u + d * m,
      y = l + d * g,
      b = e.getChildCount(a) > 0;
    let p, _;
    ((p = Math.cos(f)), (_ = Math.sin(f)));
    const M = {
      x,
      y,
      layoutClass: q.Radial,
      theta: f,
      nodeLabel: {
        dxFactor: p,
        dyFactor: _,
        alignmentBaseline: "middle",
        textAnchor:
          _a(f) > Math.PI / 2 && _a(f) < (3 * Math.PI) / 2 ? "end" : "start",
        rotation: 0,
        // textSafeDegrees(normalizeAngle(branchAngle))
      },
    };
    if (e.getChildCount(a) > 0) {
      const k = [];
      let T = 0;
      for (let v = 0; v < e.getChildCount(a); v++) {
        const E = [...Ci(e, e.getChild(a, v))].length;
        ((k[v] = E), (T += E));
      }
      let R = c - s,
        I = s;
      e.getRoot() !== a &&
        ((R *= 1 + (n * Math.PI) / 180 / 10), (I = f - R / 2));
      let F = I;
      for (let v = e.getChildCount(a) - 1; v > -1; v--) {
        const E = F;
        ((F = E + (R * k[v]) / T),
          i.push({
            angleStart: E,
            angleEnd: F,
            xpos: x,
            ypos: y,
            level: h + 1,
            number: e.getChild(a, v).number,
          }));
      }
    }
    r.set(a, M);
  }
  return function (a) {
    if (r.has(a)) return r.get(a);
    throw new Error("Node not found in layout -  has the tree changed");
  };
}
function _a(e) {
  for (; e > 2 * Math.PI; ) e -= 2 * Math.PI;
  return e;
}
const Wl = () => ({
    x: 0,
    y: 0,
    layoutClass: q.Rectangular,
    nodeLabel: {
      // todo move this to a helper function
      alignmentBaseline: "middle",
      textAnchor: "end",
      dxFactor: 0,
      dyFactor: 0,
      rotation: 0,
    },
  }),
  wt = jn(Wl),
  _t = jn(!1),
  Gl = {
    canvasWidth: 0,
    canvasHeight: 0,
    domainX: [0, 1],
    domainY: [0, 1],
    layoutClass: q.Rectangular,
    invert: !1,
    pollard: 0,
    minRadius: 0,
    fishEye: {
      x: 0,
      y: 0,
      scale: 0,
    },
    rootAngle: 0,
    angleRange: 0,
  },
  ln = jn(Gl);
function Ql(e, t) {
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
function Si(e, t, n) {
  ((e.prototype = t.prototype = n), (n.constructor = e));
}
function Wo(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function hn() {}
var en = 0.7,
  Un = 1 / en,
  lt = "\\s*([+-]?\\d+)\\s*",
  tn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Xl = /^#([0-9a-f]{3,8})$/,
  Zl = new RegExp(`^rgb\\(${lt},${lt},${lt}\\)$`),
  Kl = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`),
  Jl = new RegExp(`^rgba\\(${lt},${lt},${lt},${tn}\\)$`),
  eh = new RegExp(`^rgba\\(${ke},${ke},${ke},${tn}\\)$`),
  th = new RegExp(`^hsl\\(${tn},${ke},${ke}\\)$`),
  nh = new RegExp(`^hsla\\(${tn},${ke},${ke},${tn}\\)$`),
  Na = {
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
Si(hn, nn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ma,
  // Deprecated! Use color.formatHex.
  formatHex: Ma,
  formatHex8: rh,
  formatHsl: ih,
  formatRgb: Ca,
  toString: Ca,
});
function Ma() {
  return this.rgb().formatHex();
}
function rh() {
  return this.rgb().formatHex8();
}
function ih() {
  return Go(this).formatHsl();
}
function Ca() {
  return this.rgb().formatRgb();
}
function nn(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = Xl.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? Sa(t)
          : n === 3
            ? new se(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1,
              )
            : n === 8
              ? pn(
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  (t & 255) / 255,
                )
              : n === 4
                ? pn(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = Zl.exec(e))
        ? new se(t[1], t[2], t[3], 1)
        : (t = Kl.exec(e))
          ? new se(
              (t[1] * 255) / 100,
              (t[2] * 255) / 100,
              (t[3] * 255) / 100,
              1,
            )
          : (t = Jl.exec(e))
            ? pn(t[1], t[2], t[3], t[4])
            : (t = eh.exec(e))
              ? pn(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4],
                )
              : (t = th.exec(e))
                ? Ta(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = nh.exec(e))
                  ? Ta(t[1], t[2] / 100, t[3] / 100, t[4])
                  : Na.hasOwnProperty(e)
                    ? Sa(Na[e])
                    : e === "transparent"
                      ? new se(NaN, NaN, NaN, 0)
                      : null
  );
}
function Sa(e) {
  return new se((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function pn(e, t, n, r) {
  return (r <= 0 && (e = t = n = NaN), new se(e, t, n, r));
}
function ah(e) {
  return (
    e instanceof hn || (e = nn(e)),
    e ? ((e = e.rgb()), new se(e.r, e.g, e.b, e.opacity)) : new se()
  );
}
function Xr(e, t, n, r) {
  return arguments.length === 1 ? ah(e) : new se(e, t, n, r ?? 1);
}
function se(e, t, n, r) {
  ((this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r));
}
Si(
  se,
  Xr,
  Wo(hn, {
    brighter(e) {
      return (
        (e = e == null ? Un : Math.pow(Un, e)),
        new se(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? en : Math.pow(en, e)),
        new se(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new se(Qe(this.r), Qe(this.g), Qe(this.b), On(this.opacity));
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
    hex: $a,
    // Deprecated! Use color.formatHex.
    formatHex: $a,
    formatHex8: oh,
    formatRgb: ka,
    toString: ka,
  }),
);
function $a() {
  return `#${We(this.r)}${We(this.g)}${We(this.b)}`;
}
function oh() {
  return `#${We(this.r)}${We(this.g)}${We(this.b)}${We((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ka() {
  const e = On(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Qe(this.r)}, ${Qe(this.g)}, ${Qe(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function On(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Qe(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function We(e) {
  return ((e = Qe(e)), (e < 16 ? "0" : "") + e.toString(16));
}
function Ta(e, t, n, r) {
  return (
    r <= 0
      ? (e = t = n = NaN)
      : n <= 0 || n >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
    new we(e, t, n, r)
  );
}
function Go(e) {
  if (e instanceof we) return new we(e.h, e.s, e.l, e.opacity);
  if ((e instanceof hn || (e = nn(e)), !e)) return new we();
  if (e instanceof we) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    r = e.b / 255,
    i = Math.min(t, n, r),
    a = Math.max(t, n, r),
    o = NaN,
    s = a - i,
    c = (a + i) / 2;
  return (
    s
      ? (t === a
          ? (o = (n - r) / s + (n < r) * 6)
          : n === a
            ? (o = (r - t) / s + 2)
            : (o = (t - n) / s + 4),
        (s /= c < 0.5 ? a + i : 2 - a - i),
        (o *= 60))
      : (s = c > 0 && c < 1 ? 0 : o),
    new we(o, s, c, e.opacity)
  );
}
function sh(e, t, n, r) {
  return arguments.length === 1 ? Go(e) : new we(e, t, n, r ?? 1);
}
function we(e, t, n, r) {
  ((this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r));
}
Si(
  we,
  sh,
  Wo(hn, {
    brighter(e) {
      return (
        (e = e == null ? Un : Math.pow(Un, e)),
        new we(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? en : Math.pow(en, e)),
        new we(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * t,
        i = 2 * n - r;
      return new se(
        wr(e >= 240 ? e - 240 : e + 120, i, r),
        wr(e, i, r),
        wr(e < 120 ? e + 240 : e - 120, i, r),
        this.opacity,
      );
    },
    clamp() {
      return new we(Pa(this.h), xn(this.s), xn(this.l), On(this.opacity));
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
      const e = On(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${Pa(this.h)}, ${xn(this.s) * 100}%, ${xn(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  }),
);
function Pa(e) {
  return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
}
function xn(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function wr(e, t, n) {
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
const $i = (e) => () => e;
function uh(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function ch(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (r) {
      return Math.pow(e + r * t, n);
    }
  );
}
function lh(e) {
  return (e = +e) == 1
    ? Qo
    : function (t, n) {
        return n - t ? ch(t, n, e) : $i(isNaN(t) ? n : t);
      };
}
function Qo(e, t) {
  var n = t - e;
  return n ? uh(e, n) : $i(isNaN(e) ? t : e);
}
const Aa = (function e(t) {
  var n = lh(t);
  function r(i, a) {
    var o = n((i = Xr(i)).r, (a = Xr(a)).r),
      s = n(i.g, a.g),
      c = n(i.b, a.b),
      u = Qo(i.opacity, a.opacity);
    return function (l) {
      return (
        (i.r = o(l)),
        (i.g = s(l)),
        (i.b = c(l)),
        (i.opacity = u(l)),
        i + ""
      );
    };
  }
  return ((r.gamma = e), r);
})(1);
function hh(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0,
    r = t.slice(),
    i;
  return function (a) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
    return r;
  };
}
function fh(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function dh(e, t) {
  var n = t ? t.length : 0,
    r = e ? Math.min(n, e.length) : 0,
    i = new Array(r),
    a = new Array(n),
    o;
  for (o = 0; o < r; ++o) i[o] = ki(e[o], t[o]);
  for (; o < n; ++o) a[o] = t[o];
  return function (s) {
    for (o = 0; o < r; ++o) a[o] = i[o](s);
    return a;
  };
}
function mh(e, t) {
  var n = /* @__PURE__ */ new Date();
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return (n.setTime(e * (1 - r) + t * r), n);
    }
  );
}
function zn(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
function gh(e, t) {
  var n = {},
    r = {},
    i;
  ((e === null || typeof e != "object") && (e = {}),
    (t === null || typeof t != "object") && (t = {}));
  for (i in t) i in e ? (n[i] = ki(e[i], t[i])) : (r[i] = t[i]);
  return function (a) {
    for (i in n) r[i] = n[i](a);
    return r;
  };
}
var Zr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  _r = new RegExp(Zr.source, "g");
function yh(e) {
  return function () {
    return e;
  };
}
function ph(e) {
  return function (t) {
    return e(t) + "";
  };
}
function xh(e, t) {
  var n = (Zr.lastIndex = _r.lastIndex = 0),
    r,
    i,
    a,
    o = -1,
    s = [],
    c = [];
  for (e = e + "", t = t + ""; (r = Zr.exec(e)) && (i = _r.exec(t)); )
    ((a = i.index) > n &&
      ((a = t.slice(n, a)), s[o] ? (s[o] += a) : (s[++o] = a)),
      (r = r[0]) === (i = i[0])
        ? s[o]
          ? (s[o] += i)
          : (s[++o] = i)
        : ((s[++o] = null), c.push({ i: o, x: zn(r, i) })),
      (n = _r.lastIndex));
  return (
    n < t.length && ((a = t.slice(n)), s[o] ? (s[o] += a) : (s[++o] = a)),
    s.length < 2
      ? c[0]
        ? ph(c[0].x)
        : yh(t)
      : ((t = c.length),
        function (u) {
          for (var l = 0, h; l < t; ++l) s[(h = c[l]).i] = h.x(u);
          return s.join("");
        })
  );
}
function ki(e, t) {
  var n = typeof t,
    r;
  return t == null || n === "boolean"
    ? $i(t)
    : (n === "number"
        ? zn
        : n === "string"
          ? (r = nn(t))
            ? ((t = r), Aa)
            : xh
          : t instanceof nn
            ? Aa
            : t instanceof Date
              ? mh
              : fh(t)
                ? hh
                : Array.isArray(t)
                  ? dh
                  : (typeof t.valueOf != "function" &&
                        typeof t.toString != "function") ||
                      isNaN(t)
                    ? gh
                    : zn)(e, t);
}
function bh(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return Math.round(e * (1 - n) + t * n);
    }
  );
}
function vh(e) {
  return function () {
    return e;
  };
}
function wh(e) {
  return +e;
}
var Ea = [0, 1];
function ot(e) {
  return e;
}
function Kr(e, t) {
  return (t -= e = +e)
    ? function (n) {
        return (n - e) / t;
      }
    : vh(isNaN(t) ? NaN : 0.5);
}
function _h(e, t) {
  var n;
  return (
    e > t && ((n = e), (e = t), (t = n)),
    function (r) {
      return Math.max(e, Math.min(t, r));
    }
  );
}
function Nh(e, t, n) {
  var r = e[0],
    i = e[1],
    a = t[0],
    o = t[1];
  return (
    i < r ? ((r = Kr(i, r)), (a = n(o, a))) : ((r = Kr(r, i)), (a = n(a, o))),
    function (s) {
      return a(r(s));
    }
  );
}
function Mh(e, t, n) {
  var r = Math.min(e.length, t.length) - 1,
    i = new Array(r),
    a = new Array(r),
    o = -1;
  for (
    e[r] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
    ++o < r;

  )
    ((i[o] = Kr(e[o], e[o + 1])), (a[o] = n(t[o], t[o + 1])));
  return function (s) {
    var c = Vu(e, s, 1, r) - 1;
    return a[c](i[c](s));
  };
}
function Ch(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function Sh() {
  var e = Ea,
    t = Ea,
    n = ki,
    r,
    i,
    a,
    o = ot,
    s,
    c,
    u;
  function l() {
    var f = Math.min(e.length, t.length);
    return (
      o !== ot && (o = _h(e[0], e[f - 1])),
      (s = f > 2 ? Mh : Nh),
      (c = u = null),
      h
    );
  }
  function h(f) {
    return f == null || isNaN((f = +f))
      ? a
      : (c || (c = s(e.map(r), t, n)))(r(o(f)));
  }
  return (
    (h.invert = function (f) {
      return o(i((u || (u = s(t, e.map(r), zn)))(f)));
    }),
    (h.domain = function (f) {
      return arguments.length ? ((e = Array.from(f, wh)), l()) : e.slice();
    }),
    (h.range = function (f) {
      return arguments.length ? ((t = Array.from(f)), l()) : t.slice();
    }),
    (h.rangeRound = function (f) {
      return ((t = Array.from(f)), (n = bh), l());
    }),
    (h.clamp = function (f) {
      return arguments.length ? ((o = f ? !0 : ot), l()) : o !== ot;
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
function $h() {
  return Sh()(ot, ot);
}
function kh(e, t, n, r) {
  var i = Wu(e, t, n),
    a;
  switch (((r = Dn(r ?? ",f")), r.type)) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return (
        r.precision == null && !isNaN((a = Rl(i, o))) && (r.precision = a),
        Bo(r, o)
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
  return Jt(r);
}
function Th(e) {
  var t = e.domain;
  return (
    (e.ticks = function (n) {
      var r = t();
      return Yu(r[0], r[r.length - 1], n ?? 10);
    }),
    (e.tickFormat = function (n, r) {
      var i = t();
      return kh(i[0], i[i.length - 1], n ?? 10, r);
    }),
    (e.nice = function (n) {
      n == null && (n = 10);
      var r = t(),
        i = 0,
        a = r.length - 1,
        o = r[i],
        s = r[a],
        c,
        u,
        l = 10;
      for (
        s < o && ((u = o), (o = s), (s = u), (u = i), (i = a), (a = u));
        l-- > 0;

      ) {
        if (((u = Ur(o, s, n)), u === c)) return ((r[i] = o), (r[a] = s), t(r));
        if (u > 0) ((o = Math.floor(o / u) * u), (s = Math.ceil(s / u) * u));
        else if (u < 0)
          ((o = Math.ceil(o * u) / u), (s = Math.floor(s * u) / u));
        else break;
        c = u;
      }
      return e;
    }),
    e
  );
}
function me() {
  var e = $h();
  return (
    (e.copy = function () {
      return Ch(e, me());
    }),
    Ql.apply(e, arguments),
    Th(e)
  );
}
function Ph(e, t, n, r, i = !1, a = 0, o = 1.7 * Math.PI, s = 0, c = 0) {
  const u = Math.min(n, r) / 2,
    l = Ge(o),
    h = e * c,
    f = i ? [a * u, u].reverse() : [a * u, u],
    d = me().domain([h, e]).range(f),
    m = s + (2 * 3.14 - l) / 2,
    g = m + l,
    x = me().domain([0, t]).range([m, g]),
    y = [[0, 0], Rt(u, m), Rt(u, g)],
    b = Ge(m),
    p = Ge(b + l);
  if (p > b)
    for (const Y of [Math.PI / 2, Math.PI, (3 * Math.PI) / 2].filter(
      (z) => z > b && z < p,
    )) {
      const [z, W] = Rt(u, Y);
      y.push([z, W]);
    }
  else
    for (const Y of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].filter(
      (z) => z > b || z < p,
    )) {
      const [z, W] = Rt(u, Y);
      y.push([z, W]);
    }
  const _ = ft(y, (Y) => Y[0]),
    M = ft(y, (Y) => Y[1]),
    k = (_[1] - _[0]) / (M[1] - M[0]),
    T = Math.min(n, r * k),
    R = T,
    I = T / k,
    F = (n - R) / 2,
    v = (r - I) / 2,
    E = [v, r - v],
    C = [F, n - F],
    P = me().domain(_).range(C),
    K = me().domain(M).range(E);
  return function (z) {
    const [W, G] = [d(z.x), x(z.y)],
      [xe, Me] = Rt(W, G),
      te = Ge(G),
      Be = {
        alignmentBaseline: "middle",
        textAnchor:
          te > Math.PI / 2 && te < (3 * Math.PI) / 2 ? "end" : " start",
        dxFactor: Math.cos(te),
        dyFactor: Math.sin(te),
        rotation: Xo(te),
      };
    return {
      ...z,
      x: P(xe),
      y: K(Me),
      r: W,
      theta: G,
      nodeLabel: Be,
    };
  };
}
function Rt(e, t) {
  return [e * Math.cos(t), e * Math.sin(t)];
}
function Ge(e) {
  for (; e > 2 * Math.PI; ) e -= 2 * Math.PI;
  return e;
}
function Ah(e) {
  return (Ge(e) * 180) / Math.PI;
}
function Xo(e) {
  const t = Ah(Ge(e));
  return t > 90 && t < 270 ? t - 180 : t;
}
const Eh = {
  alignmentBaseline: "middle",
  textAnchor: "middle",
  dxFactor: 1,
  dyFactor: 1,
  rotation: 0,
};
function Rh({
  domainX: e,
  domainY: t,
  canvasWidth: n,
  canvasHeight: r,
  layoutClass: i,
  invert: a = !1,
  minRadius: o = 0,
  angleRange: s = 2 * Math.PI,
  rootAngle: c = 0,
  pollard: u = 0,
  fishEye: l = { x: 0, y: 0, scale: 0 },
}) {
  let h, f;
  switch (i) {
    case q.Rectangular: {
      const d = e[1] * u;
      ((h = me().domain([d, e[1]]).range([0, n])),
        (f = me().domain(t).range([0, r])));
      let m = (g) => f(g);
      if (l.scale > 0) {
        const g = f.invert(l.y),
          x = Ih(l.scale, g),
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
    case q.Polar:
      return Ph(e[1], t[1], n, r, a, o, s, c, u);
    case q.Radial: {
      const d = me().domain(e).range([0, 1]),
        m = me().domain(t).range([0, 1]),
        g = Math.min(n, r),
        x = (n - g) / 2,
        y = (r - g) / 2,
        b = [x, g + x],
        p = [y, g + y];
      return (
        (f = me().domain([0, 1]).range(p)),
        (h = me().domain([0, 1]).range(b)),
        function (M) {
          return {
            ...M,
            x: h(d(M.x)),
            y: f(m(M.y)),
          };
        }
      );
    }
    default:
      throw new Error("Not implemented in calcX");
  }
}
const Ih = (e, t) => (n) => {
  if (e === 0) return n;
  const r = 1 / e,
    i = t - n,
    a = 1 - t / (r + t),
    o = 1 - (t - 1) / (r - (t - 1));
  return (1 - (i < 0 ? i / (r - i) : i / (r + i)) - a) / (o - a);
};
function Zo(e) {
  const t = (n) => {
    const r = H(Le),
      i = H(wt),
      a = H(_t),
      { node: o, ...s } = n,
      c = r(i(o));
    return /* @__PURE__ */ $(e, { ...s, x: c.x, y: c.y, animated: a });
  };
  return (
    (t.displayName = `withNode(${e.displayName || e.name || "Component"})`),
    t
  );
}
function Ko(e) {
  const t = (n) => {
    const r = H(Le),
      i = H(wt),
      a = H(_t),
      { domainX: o, layoutClass: s } = H(ln),
      { node: c, parent: u, aligned: l, gap: h = 6, ...f } = n,
      d = i(c),
      m = r(d);
    if (u === void 0) {
      const g = m.nodeLabel ?? Eh,
        x = g.dxFactor * h,
        y = g.dyFactor * h,
        b = r({ x: o[1], y: d.y }),
        p = (l ? b.x : m.x) + x,
        _ = (l && s === q.Polar ? b.y : m.y) + y,
        { alignmentBaseline: M, rotation: k, textAnchor: T } = g,
        R = l ? `M${m.x} ${m.y}L${p} ${_}` : `M${m.x} ${m.y}L${m.x} ${m.y}`;
      return /* @__PURE__ */ $(e, {
        alignmentBaseline: M,
        rotation: k,
        textAnchor: T,
        d: R,
        x: p,
        y: _,
        ...f,
        animated: a,
      });
    } else {
      const g = i(u),
        x = r(g),
        y =
          s === q.Polar
            ? pe(
                m.theta,
                "The layout is polar but theta was not calculated for this node",
              )
            : 0,
        b = s === q.Polar ? Xo(y) : 0,
        p = r({ x: g.x, y: d.y }),
        { dx: _, dy: M } = s === q.Polar ? Lh(y, h) : { dx: 0, dy: -1 * h },
        k = (s === q.Polar ? (m.x + p.x) / 2 : (m.x + x.x) / 2) + _,
        T =
          (s === q.Polar
            ? (m.y + p.y) / 2
            : s === q.Radial
              ? (m.y + x.y) / 2
              : m.y) + M;
      return /* @__PURE__ */ $(e, {
        alignmentBaseline: "baseline",
        rotation: b,
        textAnchor: "middle",
        x: k,
        y: T,
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
function Lh(e, t) {
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
function Ti(e) {
  const t = (n) => {
    const { nodes: r, keyBy: i = (s) => s._id, attrs: a = {}, aligned: o } = n;
    return /* @__PURE__ */ $("g", {
      className: "node-layer",
      children: r.map((s) => {
        const c = a[s._id] ?? {};
        return /* @__PURE__ */ $(
          e,
          {
            node: s,
            ...c,
            aligned: o,
          },
          i(s),
        );
      }),
    });
  };
  return (
    (t.displayName = `withNodesArray(${e.displayName || e.name || "Component"})`),
    t
  );
}
function Jo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Nr, Ra;
function Fh() {
  if (Ra) return Nr;
  ((Ra = 1), (Nr = e));
  function e(t) {
    var n = 0,
      r = 0,
      i = 0,
      a = 0;
    return t.map(function (o) {
      o = o.slice();
      var s = o[0],
        c = s.toUpperCase();
      if (s != c)
        switch (((o[0] = c), s)) {
          case "a":
            ((o[6] += i), (o[7] += a));
            break;
          case "v":
            o[1] += a;
            break;
          case "h":
            o[1] += i;
            break;
          default:
            for (var u = 1; u < o.length; ) ((o[u++] += i), (o[u++] += a));
        }
      switch (c) {
        case "Z":
          ((i = n), (a = r));
          break;
        case "H":
          i = o[1];
          break;
        case "V":
          a = o[1];
          break;
        case "M":
          ((i = n = o[1]), (a = r = o[2]));
          break;
        default:
          ((i = o[o.length - 2]), (a = o[o.length - 1]));
      }
      return o;
    });
  }
  return Nr;
}
var Dh = Fh();
const Uh = /* @__PURE__ */ Jo(Dh);
var Oh = /* @__PURE__ */ (function () {
    function e(t, n) {
      var r = [],
        i = !0,
        a = !1,
        o = void 0;
      try {
        for (
          var s = t[Symbol.iterator](), c;
          !(i = (c = s.next()).done) &&
          (r.push(c.value), !(n && r.length === n));
          i = !0
        );
      } catch (u) {
        ((a = !0), (o = u));
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw o;
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
  Ot = Math.PI * 2,
  Mr = function (t, n, r, i, a, o, s) {
    var c = t.x,
      u = t.y;
    ((c *= n), (u *= r));
    var l = i * c - a * u,
      h = a * c + i * u;
    return {
      x: l + o,
      y: h + s,
    };
  },
  zh = function (t, n) {
    var r =
        n === 1.5707963267948966
          ? 0.551915024494
          : n === -1.5707963267948966
            ? -0.551915024494
            : 1.3333333333333333 * Math.tan(n / 4),
      i = Math.cos(t),
      a = Math.sin(t),
      o = Math.cos(t + n),
      s = Math.sin(t + n);
    return [
      {
        x: i - a * r,
        y: a + i * r,
      },
      {
        x: o + s * r,
        y: s - o * r,
      },
      {
        x: o,
        y: s,
      },
    ];
  },
  Ia = function (t, n, r, i) {
    var a = t * i - n * r < 0 ? -1 : 1,
      o = t * r + n * i;
    return (o > 1 && (o = 1), o < -1 && (o = -1), a * Math.acos(o));
  },
  Bh = function (t, n, r, i, a, o, s, c, u, l, h, f) {
    var d = Math.pow(a, 2),
      m = Math.pow(o, 2),
      g = Math.pow(h, 2),
      x = Math.pow(f, 2),
      y = d * m - d * x - m * g;
    (y < 0 && (y = 0),
      (y /= d * x + m * g),
      (y = Math.sqrt(y) * (s === c ? -1 : 1)));
    var b = ((y * a) / o) * f,
      p = ((y * -o) / a) * h,
      _ = l * b - u * p + (t + r) / 2,
      M = u * b + l * p + (n + i) / 2,
      k = (h - b) / a,
      T = (f - p) / o,
      R = (-h - b) / a,
      I = (-f - p) / o,
      F = Ia(1, 0, k, T),
      v = Ia(k, T, R, I);
    return (
      c === 0 && v > 0 && (v -= Ot),
      c === 1 && v < 0 && (v += Ot),
      [_, M, F, v]
    );
  },
  Vh = function (t) {
    var n = t.px,
      r = t.py,
      i = t.cx,
      a = t.cy,
      o = t.rx,
      s = t.ry,
      c = t.xAxisRotation,
      u = c === void 0 ? 0 : c,
      l = t.largeArcFlag,
      h = l === void 0 ? 0 : l,
      f = t.sweepFlag,
      d = f === void 0 ? 0 : f,
      m = [];
    if (o === 0 || s === 0) return [];
    var g = Math.sin((u * Ot) / 360),
      x = Math.cos((u * Ot) / 360),
      y = (x * (n - i)) / 2 + (g * (r - a)) / 2,
      b = (-g * (n - i)) / 2 + (x * (r - a)) / 2;
    if (y === 0 && b === 0) return [];
    ((o = Math.abs(o)), (s = Math.abs(s)));
    var p = Math.pow(y, 2) / Math.pow(o, 2) + Math.pow(b, 2) / Math.pow(s, 2);
    p > 1 && ((o *= Math.sqrt(p)), (s *= Math.sqrt(p)));
    var _ = Bh(n, r, i, a, o, s, h, d, g, x, y, b),
      M = Oh(_, 4),
      k = M[0],
      T = M[1],
      R = M[2],
      I = M[3],
      F = Math.abs(I) / (Ot / 4);
    Math.abs(1 - F) < 1e-7 && (F = 1);
    var v = Math.max(Math.ceil(F), 1);
    I /= v;
    for (var E = 0; E < v; E++) (m.push(zh(R, I)), (R += I));
    return m.map(function (C) {
      var P = Mr(C[0], o, s, x, g, k, T),
        K = P.x,
        Y = P.y,
        z = Mr(C[1], o, s, x, g, k, T),
        W = z.x,
        G = z.y,
        xe = Mr(C[2], o, s, x, g, k, T),
        Me = xe.x,
        te = xe.y;
      return { x1: K, y1: Y, x2: W, y2: G, x: Me, y: te };
    });
  };
function jh(e) {
  for (
    var t,
      n = [],
      r = 0,
      i = 0,
      a = 0,
      o = 0,
      s = null,
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
        ((a = d[1]), (o = d[2]));
        break;
      case "A":
        var g = Vh({
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
          ? ((s = u * 2 - s), (c = l * 2 - c))
          : ((s = u), (c = l)),
          (d = La(u, l, s, c, d[1], d[2])));
        break;
      case "Q":
        ((s = d[1]), (c = d[2]), (d = La(u, l, d[1], d[2], d[3], d[4])));
        break;
      case "L":
        d = bn(u, l, d[1], d[2]);
        break;
      case "H":
        d = bn(u, l, d[1], l);
        break;
      case "V":
        d = bn(u, l, u, d[1]);
        break;
      case "Z":
        d = bn(u, l, a, o);
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
function bn(e, t, n, r) {
  return ["C", e, t, n, r, n, r];
}
function La(e, t, n, r, i, a) {
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
var Cr, Fa;
function qh() {
  if (Fa) return Cr;
  ((Fa = 1), (Cr = n));
  var e = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 },
    t = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
  function n(a) {
    var o = [];
    return (
      a.replace(t, function (s, c, u) {
        var l = c.toLowerCase();
        for (
          u = i(u),
            l == "m" &&
              u.length > 2 &&
              (o.push([c].concat(u.splice(0, 2))),
              (l = "l"),
              (c = c == "m" ? "l" : "L"));
          ;

        ) {
          if (u.length == e[l]) return (u.unshift(c), o.push(u));
          if (u.length < e[l]) throw new Error("malformed path data");
          o.push([c].concat(u.splice(0, e[l])));
        }
      }),
      o
    );
  }
  var r = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
  function i(a) {
    var o = a.match(r);
    return o ? o.map(Number) : [];
  }
  return Cr;
}
var Hh = qh();
const Yh = /* @__PURE__ */ Jo(Hh);
class Cn {
  x;
  y;
  constructor(t, n) {
    ((this.x = t), (this.y = n));
  }
}
const Sr = 6;
function es(e) {
  const t = Yh(e),
    n = Uh(t),
    r = jh(n);
  let i = `${r[0][0]} ${r[0][1]} ${r[0][2]} `;
  const a = r
    .filter((o) => o[0] === "C")
    .map((o) => [new Cn(o[1], o[2]), new Cn(o[3], o[4]), new Cn(o[5], o[6])]);
  if (a.length > Sr)
    throw new Error(
      `Path must have no more than ${Sr} nodes (excluding start point) detected ${a.length} nodes update layout or path.helpers`,
    );
  if (a.length == 0)
    throw new Error(
      "Path must have at least 1 node (excluding start point) update layout or path.helpers",
    );
  for (; a.length < Sr; ) {
    const o = pe(a.pop(), "Internal error in normalization"),
      { left: s, right: c } = Wh(o, 0.5);
    (a.push(s), a.push(c.reverse()));
  }
  for (let o = 0; o < a.length; o++) {
    const s = a[o];
    i += `C${s[0].x},${s[0].y} ${s[1].x},${s[1].y} ${s[2].x},${s[2].y} `;
  }
  return i;
}
function Wh(e, t) {
  const n = [],
    r = [];
  function i(a, o) {
    if (a.length == 1) (n.push(a[0]), r.push(a[0]));
    else {
      const s = Array(a.length - 1);
      for (let c = 0; c < s.length; c++)
        (c == 0 && n.push(a[0]),
          c == s.length - 1 && r.push(a[c + 1]),
          (s[c] = new Cn(
            (1 - o) * a[c].x + o * a[c + 1].x,
            (1 - o) * a[c].y + o * a[c + 1].y,
          )));
      i(s, o);
    }
  }
  return (i(e, t), { left: n, right: r });
}
function Gh(e) {
  const t = (n) => {
    const r = H(Le),
      i = H(wt),
      a = H(_t),
      { node: o, parent: s, curvature: c = 0, ...u } = n,
      l = i(o),
      { layoutClass: h } = l,
      f = s ? i(s) : { x: l.x, y: l.y },
      d = { x: f.x, y: l.y },
      m = [f, l, d].map((x) => r(x)),
      g = es(Qh(m, c, h));
    return /* @__PURE__ */ $(e, { d: g, animated: a, ...u });
  };
  return (
    (t.displayName = `withBranchArray(${e.displayName || e.name || "Component"})`),
    t
  );
}
function Qh(e, t, n) {
  switch (n) {
    case q.Rectangular:
      return Xh(e, t);
    case q.Polar:
      return Zh(e);
    case q.Radial:
      return Kh(e);
    default:
      throw new Error(`path generator not implemented for the ${n} of points`);
  }
}
function Xh(e, t) {
  const n = e.length;
  switch (n) {
    case 0:
      return "";
    case 3: {
      const [r, i] = e;
      return t === 0
        ? `M${r.x + 1e-3},${r.y}L${r.x},${i.y}L${i.x},${i.y + 1e-3}`
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
function Zh(e) {
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
function Kh(e) {
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
function ts(e) {
  const t = (n) => {
    const {
      branches: r,
      keyBy: i = (s) => s._id,
      attrs: a = {},
      curvature: o,
    } = n;
    return /* @__PURE__ */ $("g", {
      className: "branch-layer",
      children: r.map(({ node: s, parent: c }) => {
        const u = a[s._id] ?? {};
        return /* @__PURE__ */ $(
          e,
          {
            node: s,
            parent: c,
            ...u,
            curvature: o,
          },
          i(s),
        );
      }),
    });
  };
  return (
    (t.displayName = `withBranchArray(${e.displayName || e.name || "Component"})`),
    t
  );
}
function ns(e) {
  const t = (n) => {
    const { clades: r, keyBy: i = (o) => o._id, attrs: a = {} } = n;
    return /* @__PURE__ */ $("g", {
      className: "node-layer",
      children: r.map((o) => {
        const s = a[o.root._id] ?? {};
        return /* @__PURE__ */ $(
          e,
          {
            clade: o,
            ...s,
          },
          i(o.root),
        );
      }),
    });
  };
  return (
    (t.displayName = `withCladessArray(${e.displayName || e.name || "Component"})`),
    t
  );
}
const Jh = Ti(Zo(Pu)),
  ef = Ti(Zo(Lu));
function tf(e) {
  switch (e.shape) {
    case xt.Circle:
      return /* @__PURE__ */ $(Jh, { ...e });
    case xt.Rectangle:
      return /* @__PURE__ */ $(ef, { ...e });
  }
}
const nf = ts(Ko(wo)),
  rf = Ti(Ko(wo)),
  af = ts(Gh(Jn));
function of(e) {
  switch (e.target) {
    case 0:
      return /* @__PURE__ */ $(tf, { ...e });
    case 1:
      return /* @__PURE__ */ $(af, { ...e });
    case 2:
      return /* @__PURE__ */ $(rf, { ...e });
    case 3:
      return /* @__PURE__ */ $(nf, { ...e });
    case 4:
      return /* @__PURE__ */ $(Sf, { ...e });
  }
}
var ye = /* @__PURE__ */ ((e) => (
    (e[(e.Node = 0)] = "Node"),
    (e[(e.Branch = 1)] = "Branch"),
    (e[(e.NodeLabel = 2)] = "NodeLabel"),
    (e[(e.BranchLabel = 3)] = "BranchLabel"),
    (e[(e.Clade = 4)] = "Clade"),
    (e[(e.Axis = 5)] = "Axis"),
    e
  ))(ye || {}),
  xt = /* @__PURE__ */ ((e) => (
    (e[(e.Circle = 0)] = "Circle"),
    (e[(e.Rectangle = 1)] = "Rectangle"),
    e
  ))(xt || {}),
  bt = /* @__PURE__ */ ((e) => (
    (e[(e.Cartoon = 0)] = "Cartoon"),
    (e[(e.Highlight = 1)] = "Highlight"),
    e
  ))(bt || {});
function sf(e) {
  const { clade: t, ...n } = e,
    r = H(Le),
    i = H(wt),
    a = H(_t),
    { root: o, leftMost: s, rightMost: c, mostDiverged: u } = t,
    l = r(i(o)),
    { x: h, y: f } = l,
    d = r(i(s)),
    m = r(i(c)),
    g = r(i(u)),
    { layoutClass: x } = i(o);
  let y;
  if (x === q.Rectangular) {
    const p = g.x,
      _ = m.y,
      M = d.y;
    y = `M${h},${f}L${p},${_}L${p},${M}Z`;
  } else if (x === q.Polar) {
    const p = d,
      _ = m,
      M =
        p.theta === _.theta || p.r === 0
          ? ""
          : `A${p.r},${p.r} 0 0 ${p.theta < _.theta ? 1 : 0} ${_.x},${_.y}`;
    y = `M${h},${f}L${p.x},${p.y} ${M} Z`;
  } else return null;
  const b = es(y);
  return /* @__PURE__ */ $(Jn, { d: b, ...n, animated: a });
}
const uf = ns(sf);
function De(e) {
  return function () {
    return e;
  };
}
const Da = Math.abs,
  ee = Math.atan2,
  je = Math.cos,
  cf = Math.max,
  $r = Math.min,
  Ce = Math.sin,
  st = Math.sqrt,
  ie = 1e-12,
  rn = Math.PI,
  Bn = rn / 2,
  lf = 2 * rn;
function hf(e) {
  return e > 1 ? 0 : e < -1 ? rn : Math.acos(e);
}
function Ua(e) {
  return e >= 1 ? Bn : e <= -1 ? -Bn : Math.asin(e);
}
const Jr = Math.PI,
  ei = 2 * Jr,
  He = 1e-6,
  ff = ei - He;
function rs(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function df(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return rs;
  const n = 10 ** t;
  return function (r) {
    this._ += r[0];
    for (let i = 1, a = r.length; i < a; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class mf {
  constructor(t) {
    ((this._x0 =
      this._y0 = // start of current subpath
      this._x1 =
      this._y1 =
        null),
      (this._ = ""),
      (this._append = t == null ? rs : df(t)));
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
  bezierCurveTo(t, n, r, i, a, o) {
    this
      ._append`C${+t},${+n},${+r},${+i},${(this._x1 = +a)},${(this._y1 = +o)}`;
  }
  arcTo(t, n, r, i, a) {
    if (((t = +t), (n = +n), (r = +r), (i = +i), (a = +a), a < 0))
      throw new Error(`negative radius: ${a}`);
    let o = this._x1,
      s = this._y1,
      c = r - t,
      u = i - n,
      l = o - t,
      h = s - n,
      f = l * l + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = t)},${(this._y1 = n)}`;
    else if (f > He)
      if (!(Math.abs(h * c - u * l) > He) || !a)
        this._append`L${(this._x1 = t)},${(this._y1 = n)}`;
      else {
        let d = r - o,
          m = i - s,
          g = c * c + u * u,
          x = d * d + m * m,
          y = Math.sqrt(g),
          b = Math.sqrt(f),
          p = a * Math.tan((Jr - Math.acos((g + f - x) / (2 * y * b))) / 2),
          _ = p / b,
          M = p / y;
        (Math.abs(_ - 1) > He && this._append`L${t + _ * l},${n + _ * h}`,
          this
            ._append`A${a},${a},0,0,${+(h * d > l * m)},${(this._x1 = t + M * c)},${(this._y1 = n + M * u)}`);
      }
  }
  arc(t, n, r, i, a, o) {
    if (((t = +t), (n = +n), (r = +r), (o = !!o), r < 0))
      throw new Error(`negative radius: ${r}`);
    let s = r * Math.cos(i),
      c = r * Math.sin(i),
      u = t + s,
      l = n + c,
      h = 1 ^ o,
      f = o ? i - a : a - i;
    (this._x1 === null
      ? this._append`M${u},${l}`
      : (Math.abs(this._x1 - u) > He || Math.abs(this._y1 - l) > He) &&
        this._append`L${u},${l}`,
      r &&
        (f < 0 && (f = (f % ei) + ei),
        f > ff
          ? this
              ._append`A${r},${r},0,1,${h},${t - s},${n - c}A${r},${r},0,1,${h},${(this._x1 = u)},${(this._y1 = l)}`
          : f > He &&
            this
              ._append`A${r},${r},0,${+(f >= Jr)},${h},${(this._x1 = t + r * Math.cos(a))},${(this._y1 = n + r * Math.sin(a))}`));
  }
  rect(t, n, r, i) {
    this
      ._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +n)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function gf(e) {
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
    () => new mf(t)
  );
}
function yf(e) {
  return e.innerRadius;
}
function pf(e) {
  return e.outerRadius;
}
function xf(e) {
  return e.startAngle;
}
function bf(e) {
  return e.endAngle;
}
function vf(e) {
  return e && e.padAngle;
}
function wf(e, t, n, r, i, a, o, s) {
  var c = n - e,
    u = r - t,
    l = o - i,
    h = s - a,
    f = h * c - l * u;
  if (!(f * f < ie))
    return ((f = (l * (t - a) - h * (e - i)) / f), [e + f * c, t + f * u]);
}
function vn(e, t, n, r, i, a, o) {
  var s = e - n,
    c = t - r,
    u = (o ? a : -a) / st(s * s + c * c),
    l = u * c,
    h = -u * s,
    f = e + l,
    d = t + h,
    m = n + l,
    g = r + h,
    x = (f + m) / 2,
    y = (d + g) / 2,
    b = m - f,
    p = g - d,
    _ = b * b + p * p,
    M = i - a,
    k = f * g - m * d,
    T = (p < 0 ? -1 : 1) * st(cf(0, M * M * _ - k * k)),
    R = (k * p - b * T) / _,
    I = (-k * b - p * T) / _,
    F = (k * p + b * T) / _,
    v = (-k * b + p * T) / _,
    E = R - x,
    C = I - y,
    P = F - x,
    K = v - y;
  return (
    E * E + C * C > P * P + K * K && ((R = F), (I = v)),
    {
      cx: R,
      cy: I,
      x01: -l,
      y01: -h,
      x11: R * (i / M - 1),
      y11: I * (i / M - 1),
    }
  );
}
function _f() {
  var e = yf,
    t = pf,
    n = De(0),
    r = null,
    i = xf,
    a = bf,
    o = vf,
    s = null,
    c = gf(u);
  function u() {
    var l,
      h,
      f = +e.apply(this, arguments),
      d = +t.apply(this, arguments),
      m = i.apply(this, arguments) - Bn,
      g = a.apply(this, arguments) - Bn,
      x = Da(g - m),
      y = g > m;
    if ((s || (s = l = c()), d < f && ((h = d), (d = f), (f = h)), !(d > ie)))
      s.moveTo(0, 0);
    else if (x > lf - ie)
      (s.moveTo(d * je(m), d * Ce(m)),
        s.arc(0, 0, d, m, g, !y),
        f > ie && (s.moveTo(f * je(g), f * Ce(g)), s.arc(0, 0, f, g, m, y)));
    else {
      var b = m,
        p = g,
        _ = m,
        M = g,
        k = x,
        T = x,
        R = o.apply(this, arguments) / 2,
        I = R > ie && (r ? +r.apply(this, arguments) : st(f * f + d * d)),
        F = $r(Da(d - f) / 2, +n.apply(this, arguments)),
        v = F,
        E = F,
        C,
        P;
      if (I > ie) {
        var K = Ua((I / f) * Ce(R)),
          Y = Ua((I / d) * Ce(R));
        ((k -= K * 2) > ie
          ? ((K *= y ? 1 : -1), (_ += K), (M -= K))
          : ((k = 0), (_ = M = (m + g) / 2)),
          (T -= Y * 2) > ie
            ? ((Y *= y ? 1 : -1), (b += Y), (p -= Y))
            : ((T = 0), (b = p = (m + g) / 2)));
      }
      var z = d * je(b),
        W = d * Ce(b),
        G = f * je(M),
        xe = f * Ce(M);
      if (F > ie) {
        var Me = d * je(p),
          te = d * Ce(p),
          Be = f * je(_),
          Nt = f * Ce(_),
          be;
        if (x < rn)
          if ((be = wf(z, W, Be, Nt, Me, te, G, xe))) {
            var Mt = z - be[0],
              Ct = W - be[1],
              St = Me - be[0],
              S = te - be[1],
              L =
                1 /
                Ce(
                  hf(
                    (Mt * St + Ct * S) /
                      (st(Mt * Mt + Ct * Ct) * st(St * St + S * S)),
                  ) / 2,
                ),
              D = st(be[0] * be[0] + be[1] * be[1]);
            ((v = $r(F, (f - D) / (L - 1))), (E = $r(F, (d - D) / (L + 1))));
          } else v = E = 0;
      }
      (T > ie
        ? E > ie
          ? ((C = vn(Be, Nt, z, W, d, E, y)),
            (P = vn(Me, te, G, xe, d, E, y)),
            s.moveTo(C.cx + C.x01, C.cy + C.y01),
            E < F
              ? s.arc(C.cx, C.cy, E, ee(C.y01, C.x01), ee(P.y01, P.x01), !y)
              : (s.arc(C.cx, C.cy, E, ee(C.y01, C.x01), ee(C.y11, C.x11), !y),
                s.arc(
                  0,
                  0,
                  d,
                  ee(C.cy + C.y11, C.cx + C.x11),
                  ee(P.cy + P.y11, P.cx + P.x11),
                  !y,
                ),
                s.arc(P.cx, P.cy, E, ee(P.y11, P.x11), ee(P.y01, P.x01), !y)))
          : (s.moveTo(z, W), s.arc(0, 0, d, b, p, !y))
        : s.moveTo(z, W),
        !(f > ie) || !(k > ie)
          ? s.lineTo(G, xe)
          : v > ie
            ? ((C = vn(G, xe, Me, te, f, -v, y)),
              (P = vn(z, W, Be, Nt, f, -v, y)),
              s.lineTo(C.cx + C.x01, C.cy + C.y01),
              v < F
                ? s.arc(C.cx, C.cy, v, ee(C.y01, C.x01), ee(P.y01, P.x01), !y)
                : (s.arc(C.cx, C.cy, v, ee(C.y01, C.x01), ee(C.y11, C.x11), !y),
                  s.arc(
                    0,
                    0,
                    f,
                    ee(C.cy + C.y11, C.cx + C.x11),
                    ee(P.cy + P.y11, P.cx + P.x11),
                    y,
                  ),
                  s.arc(P.cx, P.cy, v, ee(P.y11, P.x11), ee(P.y01, P.x01), !y)))
            : s.arc(0, 0, f, M, _, y));
    }
    if ((s.closePath(), l)) return ((s = null), l + "" || null);
  }
  return (
    (u.centroid = function () {
      var l = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2,
        h =
          (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 - rn / 2;
      return [je(h) * l, Ce(h) * l];
    }),
    (u.innerRadius = function (l) {
      return arguments.length
        ? ((e = typeof l == "function" ? l : De(+l)), u)
        : e;
    }),
    (u.outerRadius = function (l) {
      return arguments.length
        ? ((t = typeof l == "function" ? l : De(+l)), u)
        : t;
    }),
    (u.cornerRadius = function (l) {
      return arguments.length
        ? ((n = typeof l == "function" ? l : De(+l)), u)
        : n;
    }),
    (u.padRadius = function (l) {
      return arguments.length
        ? ((r = l == null ? null : typeof l == "function" ? l : De(+l)), u)
        : r;
    }),
    (u.startAngle = function (l) {
      return arguments.length
        ? ((i = typeof l == "function" ? l : De(+l)), u)
        : i;
    }),
    (u.endAngle = function (l) {
      return arguments.length
        ? ((a = typeof l == "function" ? l : De(+l)), u)
        : a;
    }),
    (u.padAngle = function (l) {
      return arguments.length
        ? ((o = typeof l == "function" ? l : De(+l)), u)
        : o;
    }),
    (u.context = function (l) {
      return arguments.length ? ((s = l ?? null), u) : s;
    }),
    u
  );
}
const Nf = _f();
function Mf(e) {
  const { clade: t, ...n } = e,
    r = H(Le),
    i = H(wt),
    a = H(_t),
    { root: o, leftMost: s, rightMost: c, mostDiverged: u } = t,
    l = r(i(o)),
    h = r(i(s)),
    f = r(i(c)),
    d = r(i(u)),
    { layoutClass: m } = i(o);
  if (m === q.Rectangular) {
    const g = d.x - l.x,
      x = Math.abs(h.y - f.y);
    return /* @__PURE__ */ $(yi, {
      width: g,
      height: x,
      x: l.x,
      y: Math.min(h.y, f.y),
      ...n,
      animated: a,
    });
  } else if (m === q.Polar) {
    const g = r({ x: 0, y: 0 }),
      x = `translate(${g.x},${g.y})`,
      y = l.r,
      b = d.r,
      p = h.theta,
      _ = f.theta,
      M = Nf({
        innerRadius: y,
        outerRadius: b + 5,
        startAngle: _ + Math.PI / 2,
        endAngle: p + Math.PI / 2,
      });
    return (
      Z(M, "Error making arc shape for Clade Highlight"),
      /* @__PURE__ */ $(Jn, { d: M, transform: x, ...n, animated: a })
    );
  } else return null;
}
const Cf = ns(Mf);
function Sf(e) {
  switch (e.shape) {
    case bt.Cartoon:
      return /* @__PURE__ */ $(uf, { ...e });
    case bt.Highlight:
      return /* @__PURE__ */ $(Cf, { ...e });
  }
}
function $f(e) {
  return typeof e == "function";
}
function Ee(e) {
  return function (t) {
    const n = {};
    for (const r in e) {
      const i = e[r];
      $f(i) ? (n[r] = i(t)) : (n[r] = i);
    }
    return n;
  };
}
function wn(e) {
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
function kf(e, t) {
  const n = "filter" in e ? e.filter : () => !0;
  Z(n, "Issue with filter option when making baubles");
  const r = "nodes" in e ? e.nodes : t.getNodes().filter(n),
    i = wn(e.interactions ?? {});
  if (e.target === ye.Node)
    if (e.shape === xt.Circle) {
      const a = Ee(e.attrs),
        o = r.reduce((s, c) => {
          const u = a(c),
            l = i(c);
          return ((s[c._id] = { ...u, ...l }), s);
        }, {});
      return {
        nodes: r,
        attrs: o,
        id: e.id,
        target: e.target,
        shape: e.shape,
      };
    } else {
      const a = Ee(e.attrs),
        o = r.reduce((s, c) => {
          const u = a(c),
            l = i(c);
          return ((s[c._id] = { ...u, ...l }), s);
        }, {});
      return {
        nodes: r,
        attrs: o,
        id: e.id,
        target: e.target,
        shape: e.shape,
      };
    }
  else if (e.target === ye.Branch) {
    const a = r
        .filter((u) => !t.isRoot(u))
        .map((u) => ({ node: u, parent: t.getParent(u) })),
      o = Ee({ fill: "none", ...e.attrs }),
      s = wn(e.interactions ?? {}),
      c = r.reduce((u, l) => {
        const h = o(l),
          f = s(l);
        return ((u[l._id] = { ...h, ...f }), u);
      }, {});
    return {
      branches: a,
      attrs: c,
      id: e.id,
      curvature: e.curvature,
      target: e.target,
    };
  } else if (e.target === ye.NodeLabel) {
    const a = Ee(e.attrs),
      o = Ee({ text: e.text }),
      s = wn(e.interactions ?? {}),
      c = r.reduce((u, l) => {
        const h = a(l),
          f = s(l),
          d = o(l);
        return ((u[l._id] = { ...h, ...f, ...d }), u);
      }, {});
    return {
      nodes: r,
      attrs: c,
      id: e.id,
      target: e.target,
      aligned: e.aligned ?? !1,
    };
  } else if (e.target === ye.BranchLabel) {
    const a = r.filter((h) => !t.isRoot(h)),
      o = a.map((h) => ({ node: h, parent: t.getParent(h) })),
      s = Ee(e.attrs),
      c = wn(e.interactions ?? {}),
      u = Ee({ text: e.text }),
      l = a.reduce((h, f) => {
        const d = s(f),
          m = c(f),
          g = u(f);
        return ((h[f._id] = { ...d, ...m, ...g }), h);
      }, {});
    return {
      branches: o,
      attrs: l,
      id: e.id,
      target: e.target,
    };
  } else {
    const a = r.map((o) => {
      const s = [...Ci(t, o)],
        c = s[0],
        u = s[s.length - 1],
        l = s[Gu(s, (h) => t.getDivergence(h))];
      return {
        root: o,
        leftMost: c,
        rightMost: u,
        mostDiverged: l,
      };
    });
    if (e.shape === bt.Highlight) {
      const o = Ee(e.attrs),
        s = r.reduce((c, u) => {
          const l = o(u),
            h = i(u);
          return ((c[u._id] = { ...l, ...h }), c);
        }, {});
      return {
        clades: a,
        attrs: s,
        id: e.id,
        target: e.target,
        shape: e.shape,
      };
    } else {
      const o = Ee(e.attrs),
        s = r.reduce((c, u) => {
          const l = o(u),
            h = i(u);
          return ((c[u._id] = { ...l, ...h }), c);
        }, {});
      return {
        clades: a,
        attrs: s,
        id: e.id,
        target: e.target,
        shape: e.shape,
      };
    }
  }
}
function Xf(e) {
  return { ...e, shape: xt.Circle, target: ye.Node };
}
function Zf(e) {
  return { ...e, shape: xt.Rectangle, target: ye.Node };
}
function Tf(e) {
  return { ...e, target: ye.Branch };
}
function Kf(e) {
  return {
    attrs: {},
    aligned: !1,
    ...e,
    target: ye.NodeLabel,
  };
}
function Jf(e) {
  return { attrs: {}, ...e, target: ye.BranchLabel };
}
function ed(e) {
  return {
    ...e,
    shape: bt.Highlight,
    target: ye.Clade,
  };
}
function td(e) {
  return { ...e, shape: bt.Cartoon, target: ye.Clade };
}
const le = {
    offsetBy: 0,
    scaleBy: 1,
    reverse: !1,
    gap: 5,
    title: { text: "", padding: 40, style: {} },
    ticks: {
      number: 5,
      format: Jt(".1f"),
      padding: 20,
      style: {},
      length: 6,
    },
    attrs: { strokeWidth: 1 },
  },
  Vn = {
    evenFill: "#EDEDED",
    oddFill: "none",
  };
function Pf(e) {
  const {
    attrs: t,
    evenFill: n = Vn.evenFill,
    oddFill: r = Vn.oddFill,
    tickValues: i,
    scale: a,
    figureScale: o,
    axisY: s,
  } = e;
  return /* @__PURE__ */ $("g", {
    className: "axisBars",
    children: i
      .filter((c, u, l) => u < l.length - 1)
      .map((c, u) => {
        const l = o({ x: a(c), y: s }),
          h = o({ x: a(c), y: 0 }),
          f = o({
            x: a(i[u + 1]),
            y: 0,
          }),
          d = o({
            x: a(i[u + 1]),
            y: s,
          }),
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
        return /* @__PURE__ */ $(
          Jn,
          {
            d: x,
            fill: y,
            ...t,
            animated: !1,
          },
          u,
        );
      }),
  });
}
function Af(e) {
  const t = H(ln),
    n = H(Le),
    { bars: r, attrs: i } = e,
    a = e.ticks ? { ...le.ticks, ...e.ticks } : le.ticks,
    o = e.title ? { ...le.title, ...e.title } : le.title,
    s = is(e, t);
  let c;
  a.values != null ? (c = a.values) : (c = s.ticks(a.number));
  const u = Ge(
      n({
        x: t.domainX[1],
        y: t.domainY[1],
      }).theta,
    ),
    l = t.domainY[1] + t.domainY[1] * 5e-3,
    h = n({ x: t.domainX[0], y: l }),
    f = n({ x: t.domainX[1], y: l }),
    d = `M${h.x},${h.y} L${f.x},${f.y}`,
    m = a.length * Math.cos(u),
    g = a.length * Math.sin(u),
    x = a.padding * Math.cos(u),
    y = a.padding * Math.sin(u),
    b = pe(pi(s.range()), "Error calculating x position for title"),
    p = n({ x: b, y: l }),
    _ = o.padding * Math.cos(u),
    M = o.padding * Math.sin(u);
  return /* @__PURE__ */ Ie("g", {
    className: "axis",
    children: [
      /* @__PURE__ */ $(Pf, {
        ...r,
        tickValues: c,
        scale: s,
        axisY: l,
      }),
      ":",
      /* @__PURE__ */ $("path", { d, stroke: "black", ...i }),
      /* @__PURE__ */ Ie("g", {
        children: [
          c.map((k, T) => {
            const R = n({ x: s(k), y: l });
            return /* @__PURE__ */ Ie(
              "g",
              {
                transform: `translate(${R.x},${R.y}) rotate(90)`,
                children: [
                  /* @__PURE__ */ $("line", {
                    x1: m,
                    y1: g,
                    x2: 0,
                    y2: 0,
                    stroke: "black",
                    ...i,
                  }),
                  /* @__PURE__ */ $("text", {
                    transform: `translate(${x},${y}) rotate(-90)`,
                    textAnchor: "middle",
                    dominantBaseline: "central",
                    ...a.style,
                    children: a.format(k),
                  }),
                ],
              },
              `tick-${T}`,
            );
          }),
          /* @__PURE__ */ $("g", {
            transform: `translate(${p.x},${p.y}) rotate(90)`,
            children: /* @__PURE__ */ $("text", {
              textAnchor: "middle",
              transform: `translate(${_},${M}) rotate(-90)`,
              children: o.text,
            }),
          }),
        ],
      }),
    ],
  });
}
function is(e, t) {
  const {
      reverse: n = le.reverse,
      offsetBy: r = le.offsetBy,
      scaleBy: i = le.scaleBy,
      scale: a,
    } = e,
    { domainX: o } = t,
    s = a === void 0 ? me().domain(o).range(o) : a.copy();
  if (a === void 0) {
    const u = o.map((l) => l + r).map((l) => (l - r) * i + r);
    (s.domain(u), n && s.domain([r - (u[1] - u[0]), r]));
  }
  return s.nice();
}
function Ef(e) {
  const {
      attrs: t,
      evenFill: n = Vn.evenFill,
      oddFill: r = Vn.oddFill,
      tickValues: i,
      scale: a,
      axisY: o,
    } = e,
    s = H(Le);
  return /* @__PURE__ */ $(
    "g",
    {
      className: "axisBars",
      children: i
        .filter((c, u, l) => u < l.length - 1)
        .map((c, u) => {
          const l = s({ x: a(c), y: o }),
            h = s({ x: a(c), y: -0.05 }),
            f = s({
              x: a(i[u + 1]),
              y: 0,
            }),
            d = u % 2 === 0 ? n : r;
          return /* @__PURE__ */ $(
            yi,
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
function Rf(e) {
  const t = H(ln),
    n = H(Le),
    {
      // direction = defaultAxisProps.direction,
      gap: r = le.gap,
      bars: i,
    } = e,
    a = { ...le.attrs, ...e.attrs },
    o = e.ticks ? { ...le.ticks, ...e.ticks } : le.ticks,
    s = e.title ? { ...le.title, ...e.title } : le.title,
    c = is(e, t);
  let u;
  o.values !== void 0 ? (u = o.values) : (u = c.ticks(o.number));
  const l = t.domainY[1] + t.domainY[1] * 0.01,
    h = n({ x: t.domainX[0], y: l }),
    f = n({ x: t.domainX[1], y: l }),
    d = `M${h.x},${h.y + r} L${f.x},${f.y + r}`,
    m = pe(pi(c.range()), "Error calculating x position for title"),
    g = n({ x: m, y: l });
  return /* @__PURE__ */ Ie("g", {
    className: "axis",
    children: [
      i
        ? /* @__PURE__ */ $(Ef, {
            ...i,
            tickValues: u,
            scale: c,
            axisY: l,
          })
        : null,
      /* @__PURE__ */ $("path", { d, stroke: "black", ...a }),
      /* @__PURE__ */ Ie("g", {
        children: [
          u.map((x, y) => {
            const b = n({ x: c(x), y: l });
            return /* @__PURE__ */ Ie(
              "g",
              {
                transform: `translate(${b.x},${b.y + r})`,
                children: [
                  /* @__PURE__ */ $("line", {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: o.length,
                    stroke: "black",
                    ...a,
                  }),
                  /* @__PURE__ */ $("text", {
                    transform: `translate(0,${o.padding})`,
                    textAnchor: "middle",
                    dominantBaseline: "central",
                    ...o.style,
                    children: o.format(x),
                  }),
                ],
              },
              `tick-${y}`,
            );
          }),
          /* @__PURE__ */ $("g", {
            transform: `translate(${g.x},${g.y + r}) `,
            children: /* @__PURE__ */ $("text", {
              textAnchor: "middle",
              transform: `translate(0,${s.padding})`,
              ...s.style,
              children: s.text,
            }),
          }),
        ],
      }),
    ],
  });
}
function If(e) {
  const t = H(ln),
    { layoutClass: n } = t;
  return n === q.Polar
    ? /* @__PURE__ */ $(Af, { ...e })
    : n === q.Rectangular
      ? /* @__PURE__ */ $(Rf, { ...e })
      : (console.warn(`Axis not supported for ${n}`), null);
}
const Lf = qo.fromNewick("((A:1,B:1):1,C:2);"),
  re = {
    opts: Du,
    width: 100,
    layout: Yl,
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    tree: Lf,
    baubles: [
      Tf({
        filter: () => !0,
        attrs: { stroke: "black", strokeWidth: 1 },
      }),
    ],
    animated: !1,
  };
function nd(e) {
  const {
      width: t = re.width,
      height: n = re.width,
      margins: r = re.margins,
      tree: i = re.tree,
      layout: a = re.layout,
      animated: o = re.animated,
      baubles: s = re.baubles,
      // margins = defaultOpts.margins
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
    { layoutClass: M } = _(i.getRoot()),
    k = ft(i.getNodes().map((v) => _(v).x)).map((v) =>
      pe(v, "Error finding x extent from layout"),
    ),
    T = ft(i.getNodes().map((v) => _(v).y)).map((v) =>
      pe(v, "Error finding y extent from layout"),
    ),
    R = {
      canvasWidth: x,
      canvasHeight: y,
      domainX: k,
      domainY: T,
      layoutClass: M,
      invert: g,
      pollard: d,
      minRadius: m,
      fishEye: f,
      rootAngle: l,
      angleRange: h,
    },
    I = Rh(R),
    F = s.map((v) => kf(v, i));
  return /* @__PURE__ */ $("g", {
    children: /* @__PURE__ */ $("g", {
      transform: `translate(${b},${p})`,
      children: /* @__PURE__ */ $(Le.Provider, {
        value: I,
        children: /* @__PURE__ */ $(ln.Provider, {
          value: R,
          children: /* @__PURE__ */ $(wt.Provider, {
            value: _,
            children: /* @__PURE__ */ Ie(_t.Provider, {
              value: o,
              children: [
                c ? /* @__PURE__ */ $(If, { ...c }) : null,
                F.map((v, E) => /* @__PURE__ */ $(of, { ...v }, v.id ?? E)),
              ],
            }),
          }),
        }),
      }),
    }),
  });
}
export {
  V as BaseAnnotationType,
  Jf as BranchLabels,
  Tf as Branches,
  td as CartoonClades,
  Xf as CircleNodes,
  nd as FigTree,
  ed as HighlightClades,
  qo as ImmutableTree,
  Yf as NexusImporter,
  Kf as NodeLabels,
  Wf as PreOrderTraversalCache,
  Zf as RectangleNodes,
  tr as TaxonSet,
  zf as dateToDecimal,
  Of as decimalToDate,
  Du as defaultInternalLayoutOptions,
  q as layoutClass,
  Eo as leapYear,
  Z as notNull,
  Bf as panic,
  Hf as pathToRootIterator,
  Gf as polarLayout,
  Vl as postOrderIterator,
  Bl as preOrderIterator,
  qf as psuedoRootPostOrderIterator,
  jf as psuedoRootPreOrderIterator,
  Qf as radialLayout,
  Yl as rectangularLayout,
  Ci as tipIterator,
  Vf as u,
  pe as unNullify,
};
