/* @ds-bundle: {"format":3,"namespace":"BOSSAAsadoIMarDesignSystem_634348","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"WhatsAppButton","sourcePath":"components/core/WhatsAppButton.jsx"},{"name":"FireBoxCard","sourcePath":"components/menu/FireBoxCard.jsx"},{"name":"MenuItem","sourcePath":"components/menu/MenuItem.jsx"},{"name":"PriceTag","sourcePath":"components/menu/PriceTag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"5ca315a32a58","components/core/Button.jsx":"954a8d789895","components/core/Card.jsx":"5f65585df4db","components/core/Eyebrow.jsx":"da5a00d3da14","components/core/WhatsAppButton.jsx":"038b015f7c2e","components/menu/FireBoxCard.jsx":"cd46b01aeb38","components/menu/MenuItem.jsx":"e1a7254c689d","components/menu/PriceTag.jsx":"422f5579aa2d","ui_kits/weekend-fire/screens.jsx":"045d8ad55e61"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BOSSAAsadoIMarDesignSystem_634348 = window.BOSSAAsadoIMarDesignSystem_634348 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Status / category pill. Tones: fire, gold, sea, live, muted. */
function Badge({
  tone = "fire",
  children,
  style,
  ...props
}) {
  const tones = {
    fire: {
      background: "var(--fire)",
      color: "#140a05",
      border: "1px solid var(--fire)"
    },
    gold: {
      background: "rgba(243,179,91,0.16)",
      color: "var(--gold)",
      border: "1px solid rgba(243,179,91,0.5)"
    },
    sea: {
      background: "rgba(68,199,196,0.14)",
      color: "var(--sea)",
      border: "1px solid rgba(68,199,196,0.45)"
    },
    live: {
      background: "rgba(255,90,20,0.12)",
      color: "var(--status-live)",
      border: "1px solid rgba(255,90,20,0.35)"
    },
    muted: {
      background: "rgba(255,255,255,0.04)",
      color: "var(--sand)",
      border: "1px solid var(--line)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-body)",
      fontWeight: 800,
      fontSize: "12px",
      letterSpacing: "0.02em",
      padding: "7px 12px",
      borderRadius: "var(--radius-pill)",
      ...tones[tone],
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BOSSA pill button. Variants: primary (ember fill), secondary (outline), ghost.
 */
function Button({
  variant = "primary",
  size = "md",
  as = "button",
  children,
  style,
  ...props
}) {
  const base = {
    fontFamily: "var(--font-body)",
    fontWeight: 800,
    borderRadius: "var(--radius-pill)",
    border: "1px solid var(--line)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "transform .2s ease, border-color .2s ease, background .2s ease",
    textDecoration: "none"
  };
  const sizes = {
    sm: {
      padding: "9px 14px",
      fontSize: "13px"
    },
    md: {
      padding: "14px 18px",
      fontSize: "15px"
    },
    lg: {
      padding: "16px 24px",
      fontSize: "17px"
    }
  };
  const variants = {
    primary: {
      background: "var(--fire)",
      color: "#140a05",
      borderColor: "var(--fire)",
      boxShadow: "var(--shadow-fire)"
    },
    secondary: {
      background: "rgba(255,255,255,0.04)",
      color: "var(--cream)"
    },
    ghost: {
      background: "transparent",
      color: "var(--gold)",
      borderColor: "transparent"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "translateY(-1px)";
      if (variant === "primary") e.currentTarget.style.background = "var(--fire-bright)";else e.currentTarget.style.borderColor = "rgba(243,179,91,0.52)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.background = variants[variant].background;
      e.currentTarget.style.borderColor = variants[variant].borderColor || "var(--line)";
    }
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Generic BOSSA surface card with the standard glass gradient + fire border option. */
function Card({
  featured = false,
  glow = false,
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: featured ? "1px solid rgba(255,106,26,0.64)" : "1px solid var(--line)",
      borderRadius: "var(--radius-card)",
      padding: "22px",
      boxShadow: glow ? "var(--shadow-fire-glow)" : "var(--shadow)",
      color: "var(--text)",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Uppercase eyebrow / section label in gold. */
function Eyebrow({
  children,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      fontSize: "12px",
      color: "var(--gold)",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/WhatsAppButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Signature BOSSA WhatsApp CTA — gradient fire→gold pill linking to wa.me. */
function WhatsAppButton({
  number = "59995230683",
  message = "",
  label = "Order on WhatsApp",
  sub,
  style,
  ...props
}) {
  const href = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: "inline-grid",
      gap: "2px",
      justifyItems: "start",
      padding: sub ? "12px 20px" : "14px 22px",
      borderRadius: "var(--radius-pill)",
      background: "linear-gradient(135deg, var(--fire), var(--gold))",
      color: "#120d0a",
      border: "1px solid rgba(255,255,255,0.22)",
      boxShadow: "0 18px 44px rgba(0,0,0,0.42), 0 12px 28px rgba(255,106,26,0.24)",
      fontFamily: "var(--font-body)",
      textDecoration: "none",
      ...style
    }
  }, props), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      opacity: 0.78
    }
  }, sub), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: "15px",
      fontWeight: 900,
      display: "inline-flex",
      gap: "8px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\uD83D\uDCAC"), label));
}
Object.assign(__ds_scope, { WhatsAppButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/WhatsAppButton.jsx", error: String((e && e.message) || e) }); }

// components/menu/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gold price text used in menu rows and box cards. */
function PriceTag({
  children,
  badge = false,
  style,
  ...props
}) {
  if (badge) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: "inline-block",
        background: "var(--fire)",
        color: "#120d0a",
        fontFamily: "var(--font-body)",
        fontWeight: 900,
        fontSize: "14px",
        padding: "6px 14px",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...style
      }
    }, props), children);
  }
  return /*#__PURE__*/React.createElement("strong", _extends({
    style: {
      color: "var(--gold)",
      fontFamily: "var(--font-body)",
      fontWeight: 800,
      whiteSpace: "nowrap",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/menu/FireBoxCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The signature Weekend Fire Box card: numbered ember header, food image,
 * name, contents, price and an order CTA.
 */
function FireBoxCard({
  number,
  name,
  contents,
  price,
  image,
  tag,
  comingSoon = false,
  featured = false,
  onOrder,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      border: featured ? "1px solid rgba(255,106,26,0.64)" : "1px solid var(--line)",
      borderRadius: "var(--radius-card)",
      padding: "16px",
      boxShadow: featured ? "var(--shadow-fire-glow)" : "var(--shadow)",
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "64px",
      padding: "8px 14px",
      borderRadius: "var(--radius-pill)",
      background: "var(--fire)",
      color: "#120d0a",
      fontFamily: "var(--font-display)",
      fontSize: "18px",
      letterSpacing: "0.02em"
    }
  }, "#", number), tag && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "muted"
  }, tag)), image && /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      border: "1px solid var(--line)",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: "100%",
      height: "150px",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "22px",
      letterSpacing: "0.01em",
      color: "var(--cream)",
      margin: "0 0 8px"
    }
  }, name), contents && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      color: "var(--sand)",
      fontSize: "13px",
      lineHeight: 1.5
    }
  }, contents), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, comingSoon ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "sea"
  }, "Coming soon") : /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    badge: true
  }, price), !comingSoon && /*#__PURE__*/React.createElement(__ds_scope.WhatsAppButton, {
    label: `Order Box #${number}`,
    message: `Hi BOSSA! I'd like to order Box #${number} — ${name}.`,
    style: {
      width: "100%",
      justifyItems: "center",
      textAlign: "center"
    },
    onClick: onOrder
  })));
}
Object.assign(__ds_scope, { FireBoxCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/FireBoxCard.jsx", error: String((e && e.message) || e) }); }

// components/menu/MenuItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** A single menu row: name + description on the left, price on the right. */
function MenuItem({
  name,
  description,
  price,
  comingSoon = false,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: "18px",
      paddingTop: "14px",
      borderTop: "1px solid var(--line)",
      opacity: comingSoon ? 0.7 : 1,
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: "0 0 6px",
      fontFamily: "var(--font-serif)",
      fontWeight: 700,
      fontSize: "20px",
      color: "var(--cream)",
      letterSpacing: "0.01em"
    }
  }, name, comingSoon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "11px",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--sea)",
      marginLeft: "10px"
    }
  }, "Coming soon")), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--sand)",
      lineHeight: 1.5,
      fontSize: "14px"
    }
  }, description)), /*#__PURE__*/React.createElement(__ds_scope.PriceTag, null, price));
}
Object.assign(__ds_scope, { MenuItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/MenuItem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/weekend-fire/screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* BOSSA Weekend Fire — UI kit screens. Loaded via Babel in index.html.
   Uses design-system primitives from window[NS]. */
const NS = window.BOSSAAsadoIMarDesignSystem_634348;
const {
  Button,
  Badge,
  Card,
  Eyebrow,
  WhatsAppButton,
  FireBoxCard,
  MenuItem,
  PriceTag
} = NS;
const A = "assets"; // copied into the kit folder

const BOXES = [{
  number: 1,
  name: "BOSSA Box Mix",
  price: "XCG 49.50",
  tag: "Featured",
  featured: true,
  image: A + "/food-ribs-box.png",
  contents: "Fire-roasted 1 pc chicken whole legs, ½ ribs, 1 chorizo, 1 porkchop, garlic bread + garlic sauce."
}, {
  number: 2,
  name: "Skewer Box",
  price: "XCG 49.50",
  tag: "High-margin fire skewers",
  image: A + "/food-tomahawk.png",
  contents: "Tenderloin skewer + chicken skewer with garlic sauce and garlic bread."
}, {
  number: 4,
  name: "Community Fire Box",
  price: "XCG 19.50",
  tag: "Built for speed & volume",
  image: A + "/food-beach-classic.png",
  contents: "4 chicken pieces with bread, garlic sauce and baked potato."
}, {
  number: 6,
  name: "Ribs Classic",
  price: "XCG 49.50",
  tag: "Slow smoke · fast handoff",
  image: A + "/scene-grill-area.png",
  contents: "Slow-smoked ribs: 2 full ribs with garlic sauce and bread."
}, {
  number: 7,
  name: "SEA BOX",
  price: "XCG 99.50",
  tag: "Heavy appetite special",
  comingSoon: true,
  image: A + "/scene-kushina.png",
  contents: "Mixed grill & seafood platter — catch-of-the-day skewer, tenderloin skewer + 2 sides."
}];
const RULES = ["Take-Out Only", "No Modifications", "Order by Number", "Limited Batches", "Signature BOSSA Jus", "Fire Bread Included"];
function NavBar({
  onNav,
  page
}) {
  const links = [["home", "Home"], ["menu", "Weekend Fire"], ["visit", "Visit"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 0",
      gap: "20px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer"
    },
    onClick: () => onNav("home")
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "/logo-mark.png",
    alt: "BOSSA",
    style: {
      width: "44px",
      height: "44px",
      objectFit: "contain",
      background: "var(--cream)",
      borderRadius: "12px",
      padding: "4px"
    }
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "22px",
      letterSpacing: "0.06em"
    }
  }, "BOSSA")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, links.map(([k, label]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    onClick: () => onNav(k),
    style: {
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 700,
      color: page === k ? "var(--gold)" : "var(--sand)"
    }
  }, label)), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => onNav("menu")
  }, "Order now")));
}
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: "34px",
      alignItems: "center",
      padding: "56px 0 64px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "live"
  }, "\uD83D\uDD25 Fire is live \xB7 Thu\u2013Sun"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(40px,6vw,72px)",
      lineHeight: 1.0,
      letterSpacing: "-0.03em",
      margin: "20px 0 22px"
    }
  }, "ROASTED BY FIRE.", /*#__PURE__*/React.createElement("br", null), "SERVED WITH SOUL."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--sand)",
      fontSize: "20px",
      lineHeight: 1.55,
      maxWidth: "520px"
    }
  }, "Wood-fired boxes from Pietermaai, Cura\xE7ao. Limited weekend batches \u2014 when the fire rests, we close."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      marginTop: "30px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    sub: "Fastest way to order",
    label: "Order on WhatsApp"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav("menu")
  }, "See the Fire Boxes"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--line)",
      boxShadow: "var(--shadow)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "/scene-patio.png",
    alt: "BOSSA patio",
    style: {
      width: "100%",
      height: "440px",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "18px",
      right: "18px",
      bottom: "18px",
      padding: "14px 16px",
      borderRadius: "var(--radius-md)",
      background: "rgba(18,13,10,0.74)",
      border: "1px solid rgba(255,255,255,0.16)",
      backdropFilter: "blur(12px)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--gold)"
    }
  }, "Pietermaai patio"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--sand)",
      fontSize: "14px"
    }
  }, "Oranjestraat 116 \xB7 Willemstad, Cura\xE7ao"))));
}
function RulesPanel() {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      height: "fit-content"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "26px",
      color: "var(--gold)",
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }
  }, "\uD83D\uDD25 WEEKEND FIRE RULES"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "12px",
      marginTop: "16px"
    }
  }, RULES.map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      fontWeight: 700,
      fontSize: "14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fire)"
    }
  }, "\u2022"), r))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "20px",
      paddingTop: "16px",
      borderTop: "1px solid var(--line)",
      display: "grid",
      justifyItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    alt: "QR",
    src: "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://wa.me/59995230683&bgcolor=fff7ed",
    style: {
      borderRadius: "10px",
      background: "#fff",
      padding: "6px"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)",
      fontWeight: 800,
      fontSize: "12px"
    }
  }, "www.bossaasado.com")));
}
function MenuScreen({
  onOrder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 0 60px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Thursday \u2013 Sunday \xB7 12:00\u201322:00 \xB7 Take-out only"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(34px,5vw,56px)",
      margin: "10px 0 28px"
    }
  }, "WEEKEND FIRE BOXES"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: "22px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "18px"
    }
  }, BOXES.map(b => /*#__PURE__*/React.createElement(FireBoxCard, _extends({
    key: b.number
  }, b, {
    onOrder: () => onOrder(b)
  })))), /*#__PURE__*/React.createElement(RulesPanel, null)));
}
function VisitScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 0 60px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Visit BOSSA"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(34px,5vw,56px)",
      margin: "10px 0 24px"
    }
  }, "PIETERMAAI \xB7 CURA\xC7AO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: "22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      border: "1px solid var(--line)",
      boxShadow: "var(--shadow)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "/scene-terrace-evening.jpg",
    alt: "BOSSA terrace",
    style: {
      width: "100%",
      height: "420px",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: "var(--gold)"
    }
  }, "Hours & Address"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--sand)"
    }
  }, "Thursday\u2013Sunday \xB7 12:00 PM \u2013 10:00 PM", /*#__PURE__*/React.createElement("br", null), "Oranjestraat 116, Pietermaai, Willemstad, Cura\xE7ao"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    sub: "Reserve or order",
    label: "Message BOSSA"
  })))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "30px 0 40px",
      borderTop: "1px solid var(--line)",
      color: "var(--sand)",
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "/logo-primary.png",
    alt: "BOSSA",
    style: {
      width: "96px",
      borderRadius: "12px",
      background: "var(--cream)",
      padding: "6px"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--cream)"
    }
  }, "BOSSA Asado i Mar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "13px"
    }
  }, "Fire \xB7 Flavor \xB7 Sea \xB7 Caribbean Soul"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "13px",
      textAlign: "right"
    }
  }, "\uD83D\uDCAC +5999 523 0683", /*#__PURE__*/React.createElement("br", null), "Oranjestraat 116, Pietermaai \xB7 Cura\xE7ao"));
}
function OrderModal({
  box,
  onClose
}) {
  if (!box) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(5,4,3,0.78)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      maxWidth: "420px",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    glow: true,
    featured: true
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "fire"
  }, "Box #", box.number), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "28px",
      margin: "12px 0 8px"
    }
  }, box.name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--sand)"
    }
  }, box.contents), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "14px 0 18px"
    }
  }, /*#__PURE__*/React.createElement(PriceTag, {
    badge: true
  }, box.price), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sand)",
      fontSize: "13px"
    }
  }, box.tag)), /*#__PURE__*/React.createElement(WhatsAppButton, {
    label: "Confirm on WhatsApp",
    message: `Hi BOSSA! I'd like Box #${box.number} — ${box.name}.`,
    style: {
      width: "100%",
      justifyItems: "center",
      textAlign: "center"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: onClose,
    style: {
      cursor: "pointer",
      color: "var(--sand)",
      fontSize: "13px"
    }
  }, "Cancel")))));
}
function App() {
  const [page, setPage] = React.useState("home");
  const [box, setBox] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(1120px, calc(100% - 32px))",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    onNav: setPage,
    page: page
  }), page === "home" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    onNav: setPage
  }), /*#__PURE__*/React.createElement(MenuScreen, {
    onOrder: setBox
  })), page === "menu" && /*#__PURE__*/React.createElement(MenuScreen, {
    onOrder: setBox
  }), page === "visit" && /*#__PURE__*/React.createElement(VisitScreen, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(OrderModal, {
    box: box,
    onClose: () => setBox(null)
  }));
}
window.App = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/weekend-fire/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.WhatsAppButton = __ds_scope.WhatsAppButton;

__ds_ns.FireBoxCard = __ds_scope.FireBoxCard;

__ds_ns.MenuItem = __ds_scope.MenuItem;

__ds_ns.PriceTag = __ds_scope.PriceTag;

})();
