(() => {
    "use strict";
    var e = {
        n: t => {
            var n = t && t.__esModule ? () => t.default : () => t;
            return e.d(n, {
                a: n
            }), n
        },
        d: (t, n) => {
            for (var s in n) e.o(n, s) && !e.o(t, s) && Object.defineProperty(t, s, {
                enumerable: !0,
                get: n[s]
            })
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
    };
    const t = window.SplitType;
    var n = e.n(t);
    class s {
        constructor(e) {
            this.element = e, this.linkElement = this.element.querySelector("a"), this.textElement = this.element.querySelector(".nectar__link"), this.init()
        }
        init() {
            this.textEffect(), this.events()
        }
        events() {
            this.linkElement.addEventListener("mouseenter", (() => {
                this.linkElement.classList.remove("hover"), setTimeout((() => {
                    this.linkElement.classList.add("hover")
                }), 30)
            }))
        }
        textEffect() {
            if (this.element.classList.contains("nectar-blocks-button--Wave")) {
                const e = new(n())(this.textElement, {
                    types: ["words", "chars"]
                });
                e.chars && e.chars.forEach(((e, t) => {
                    e.style.animationDelay = .02 * t + "s"
                }))
            }
        }
    }
    document.addEventListener("DOMContentLoaded", (() => {
        document.querySelectorAll(".nectar-blocks-button").forEach((e => {
            new s(e)
        }))
    }))
})();