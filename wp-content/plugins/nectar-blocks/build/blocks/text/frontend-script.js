(() => {
    "use strict";
    var t = {
        n: e => {
            var i = e && e.__esModule ? () => e.default : () => e;
            return t.d(i, {
                a: i
            }), i
        },
        d: (e, i) => {
            for (var n in i) t.o(i, n) && !t.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: i[n]
            })
        },
        o: (t, e) => Object.prototype.hasOwnProperty.call(t, e)
    };
    const e = /iPad|iPhone|iPod/.test(navigator.platform) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1,
        i = (t, e = 1) => {
            const i = [
                    ['"', "'"],
                    ["':", "!"],
                    [",'", "~"],
                    ["}", ")", "\\", "\\"],
                    ["{", "(", "\\", "\\"]
                ],
                n = (t, e) => {
                    let i = new RegExp(`${(e[2]?e[2]:"")+e[0]}|${(e[3]?e[3]:"")+e[1]}`, "g");
                    return t.replace(i, (t => t === e[0] ? e[1] : e[0]))
                };
            if (e)
                for (let e = 0; e < i.length; ++e) t = n(t, i[e]);
            else
                for (let e = i.length; e--;) t = n(t, i[e]);
            return t
        },
        n = t => {
            try {
                return JSON.parse(t), t
            } catch (t) {}
            return /[!~$].*[!~$].*[!~$]/.test(t) ? (t => {
                const e = (t = t.substring(0, t.length - 1)).split("");
                let n = e[0];
                if (e.length > 1) {
                    let t = e[1];
                    for (let e of t) {
                        let t = n.split(e);
                        n = t.join(t.pop())
                    }
                }
                return i(n, 0)
            })(t) : t
        },
        s = window.fitty;
    var o = t.n(s);
    class a {
        constructor(t) {
            this.element = t, this.fittyInstance = null, this.fittyElement = this.element.querySelector(".nectar-blocks-text__fit-text"), this.initFitty(), this.events()
        }
        initFitty() {
            this.fittyElement && (this.createInstance(), this.fittyInstance && this.fittyInstance.element.addEventListener("fit", (() => {
                this.element.classList.add("has-fit-text--loaded")
            })))
        }
        events() {
            "ontouchstart" in window || navigator.maxTouchPoints ? screen.orientation ? screen.orientation.addEventListener("change", this.reCalculate.bind(this)) : window.addEventListener("orientationchange", this.reCalculate.bind(this)) : window.addEventListener("resize", this.reCalculate.bind(this)), window.addEventListener("load", this.reCalculate.bind(this))
        }
        createInstance() {
            this.fittyElement = this.element.querySelector(".nectar-blocks-text__fit-text"), this.fittyInstance = o()(this.fittyElement, {
                multiLine: !1,
                maxSize: 600
            })
        }
        reCalculate() {
            this.fittyInstance && (this.destroy(), this.createInstance(), this.fittyInstance.fit())
        }
        destroy() {
            this.fittyInstance && this.fittyInstance.unsubscribe()
        }
    }
    const r = window.gsap;
    var l = t.n(r);
    const c = window.CustomEase;
    var h = t.n(c);
    const m = window.ScrollTrigger;
    var d = t.n(m);
    const g = window.SplitType;
    var p = t.n(g);
    l().registerPlugin(d(), h()), l().config({
        force3D: !0,
        units: {
            strokeDashoffset: ""
        }
    });
    class f {
        splitTextTypes = "words";
        textHightlightVisible = !1;
        mode = "frontend";
        constructor(t, i) {
            this.element = t, i ? (this.animationSettings = i, this.mode = "editor") : this.element.dataset.textAnimation ? this.animationSettings = JSON.parse(n(this.element.dataset.textAnimation)) : this.animationSettings = {}, this.hasAnimationSettings = Object.keys(this.animationSettings).length > 0, "editor" === this.mode ? (this.inViewElement = "body", this.textElement = this.element.querySelector(".nectar-blocks-text__editor-text-element")) : (this.inViewElement = this.element, this.element.querySelector(".nectar-blocks-text__fit-text") ? this.textElement = this.element.querySelector(".nectar-blocks-text__fit-text") : this.textElement = this.element), this.hasTextAnimation = "none" !== this.animationSettings ? .textAnimationEffect, this.hasTextHighlight = this.element.querySelectorAll(".nectar-blocks-text__highlight path") ? .length > 0, this.splitTextInstance = null, this.hasAnimationSettings && (this.createMarkup(), document ? .fonts ? .ready && !e ? document.fonts.ready.then((() => {
                this.initAnimations()
            })) : this.initAnimations()), "frontend" === this.mode && this.events()
        }
        createMarkup() {
            this.hasTextAnimation && this.textElement && (this.splitTextInstance = new(p())(this.textElement, {
                types: this.splitTextTypes,
                tagName: "span"
            }))
        }
        initAnimations() {
            if ("editor" !== this.mode) {
                const t = window.nectarBlocksFrontend.device;
                if (this.scrollTriggerInstance && this.scrollTriggerInstance.revert(), t && !this.animationSettings.deviceTrigger.includes(t)) return;
                if (this.element.classList.contains("is-animated")) return
            }
            this.hasTextAnimation ? setTimeout((() => {
                this.textAnimations()
            }), this.scrollTriggerInstance ? 50 : 0) : this.textHighlightAnimationTrigger()
        }
        textHighlightAnimation() {
            const t = this.element.querySelectorAll('[class*="nectar-blocks-text__highlight"]'),
                e = this.element.querySelectorAll(".nectar-blocks-text__highlight path");
            if (0 === t.length) return void this.textAnimationCompleted();
            const i = [...t].map((t => t.querySelector("svg path") || t)),
                n = {
                    duration: this.animationSettings.duration,
                    stagger: .25
                };
            this.animationSettings.easing && (n.ease = h().create("ease", this.animationSettings.easing.join(","))), this.animationSettings ? .highlightAnimation ? (this.hasTextAnimation || (n.delay = this.animationSettings.delay), l().fromTo(i, {
                strokeDashoffset: "1",
                backgroundSize: "0% var(--highlight-thickness)"
            }, {
                opacity: 1,
                strokeDashoffset: "0",
                backgroundSize: "100% var(--highlight-thickness)",
                ...n,
                onComplete: () => {
                    this.textAnimationCompleted()
                }
            })) : e.length > 0 ? l().fromTo(i, {
                opacity: 0
            }, {
                opacity: 1,
                ...n,
                onComplete: () => {
                    this.textAnimationCompleted()
                }
            }) : this.textAnimationCompleted()
        }
        textHighlightAnimationTrigger() {
            this.hasTextAnimation ? this.textHighlightAnimation() : d().create({
                trigger: this.inViewElement,
                once: !0,
                onEnter: () => {
                    this.textHighlightAnimation()
                }
            })
        }
        textAnimations() {
            let t = [];
            const e = this.textElement ? .querySelectorAll(":scope > *"),
                i = [...e].map((t => {
                    if (t.classList.contains("nectar-blocks-text__highlight")) {
                        const e = [...t.querySelectorAll(":scope > span")];
                        if (e) return e
                    }
                    return t
                })).flat(1);
            if ("words" === this.splitTextTypes && e) {
                if (!this.splitTextInstance ? .words || 0 === this.splitTextInstance.words.length) return;
                t = i
            }
            this.element.classList.remove("doing-text-animation"), this.element.classList.remove("is-animated"), this.element.classList.add("doing-text-animation");
            const s = this.animationSettings.textAnimationEffect,
                o = {
                    stagger: this.animationSettings.timeBetween,
                    duration: this.animationSettings.duration,
                    delay: this.animationSettings.delay
                };
            this.animationSettings.easing && (o.ease = h().create("ease", this.animationSettings.easing.join(",")));
            const a = {
                from: {},
                to: {}
            };
            "reveal" === s ? (a.from = {
                y: "100%",
                clipPath: "inset(0 0 100% 0)"
            }, a.to = {
                y: "0",
                clipPath: "inset(0 0 0% 0)"
            }) : "rotate" === s ? (this.element.style.overflow = "hidden", this.textElement && (this.textElement.style.perspective = "1600px"), a.from = {
                perspectiveOrigin: "0 50%",
                opacity: 0,
                transform: "translateY(110%) rotateX(-90deg) "
            }, a.to = {
                perspectiveOrigin: "0 50%",
                opacity: 1,
                transform: "translateY(0%) rotateX(0deg)"
            }) : "fade" === s ? (a.from.opacity = "0", a.to.opacity = "1") : "spotlight" === s && (a.from.opacity = "0.2", a.to.opacity = "1");
            const r = "Scroll Position" === this.animationSettings.triggerType && "frontend" === this.mode;
            r ? o.onUpdate = () => {
                if (this.hasTextHighlight)
                    if (this.scrollTriggerInstance ? .progress > .95) {
                        if (this.textHightlightVisible) return;
                        this.textHighlightAnimationTrigger(), this.element.classList.remove("doing-text-animation"), this.textHightlightVisible = !0
                    } else {
                        if (!this.textHightlightVisible) return;
                        const t = this.element.querySelector("svg path");
                        t && (t.style.strokeDashoffset = "1"), this.element.classList.add("doing-text-animation"), this.textHightlightVisible = !1
                    }
            } : o.onComplete = () => {
                this.textHighlightAnimationTrigger(), this.element.classList.remove("doing-text-animation"), this.element.classList.add("is-animated")
            };
            const c = l().fromTo(t, { ...a.from
                }, { ...a.to,
                    ...o
                }),
                m = {};
            if (r) {
                const t = this.element.closest(".nectar-blocks-pin"),
                    e = this.element.closest(".nectar-blocks-pin-root");
                if (t && t.dataset.nectarBlockAnimation) {
                    var g;
                    const i = JSON.parse(n(t.dataset.nectarBlockAnimation)).scrollPosition.triggerDevices,
                        s = null !== (g = window ? .nectarBlocksFrontend ? .device) && void 0 !== g ? g : "";
                    if (s && i && i.includes(s) && (m.pinnedContainer = t, m.trigger = m.pinnedContainer, m.start = "clamp(top bottom)", e.id)) {
                        const t = this.getInstancePositionData(e);
                        t && (m.start = t.start, m.end = () => this.getInstancePositionData(e) ? this.getInstancePositionData(e) ? .end : 1e3)
                    }
                }
                const i = 30 - 50 * this.animationSettings.delay;
                this.scrollTriggerInstance = d().create({
                    trigger: this.inViewElement,
                    animation: c,
                    start: "clamp(top 90%)",
                    end: `top ${i}%`,
                    ...m,
                    scrub: 1.2
                }), this.element.classList.remove("pre-animated")
            } else {
                let t = !1;
                "frontend" === this.mode && this.inViewElement.getBoundingClientRect().bottom + window.scrollY <= window.innerHeight && (t = !0), this.scrollTriggerInstance = d().create({
                    trigger: this.inViewElement,
                    animation: c,
                    start: `top ${t?100:90}%`,
                    onEnter: () => {
                        this.element.classList.remove("pre-animated")
                    }
                })
            }
        }
        textAnimationCompleted() {
            window.dispatchEvent(new Event("nectar-blocks-text-animation-complete")), "editor" === this.mode && this.splitTextInstance ? .revert()
        }
        events() {
            "editor" !== this.mode && this.hasAnimationSettings && window.addEventListener("nectar-blocks-changed-device", this.initAnimations.bind(this))
        }
        getInstancePositionData(t) {
            if (!window ? .nectarBlocksFrontend ? .device) return null;
            const e = window.nectarBlocksFrontend.device,
                i = window.nectarBlocksFrontend.scrollAnimationInstances.find((e => e.key === t.id));
            return i ? i.instances[e] ? .scrollTrigger : null
        }
        reCalculate() {
            this.splitTextInstance && this.splitTextInstance.split({})
        }
        destroy() {
            this.splitTextInstance && this.splitTextInstance.revert()
        }
    }(() => {
        const t = e => {
            const i = e.closest(".nectar-blocks-has-pin-animation");
            if (i && i.dataset.nectarBlockAnimation) {
                const o = JSON.parse(n(i.dataset.nectarBlockAnimation));
                if (o) {
                    var s;
                    const i = e.closest(".pin-spacer"),
                        n = o.scrollPosition.triggerDevices,
                        a = null !== (s = window ? .nectarBlocksFrontend ? .device) && void 0 !== s ? s : "";
                    if (a && n.includes(a) && !i) return void setTimeout((() => {
                        t(e)
                    }), 50)
                }
            }
            new f(e)
        };
        document.addEventListener("DOMContentLoaded", (() => {
            const i = new IntersectionObserver((function(e) {
                e.forEach((function(e) {
                    e.isIntersecting && (t(e.target), i.unobserve(e.target))
                }))
            }), {
                rootMargin: "400px 0px 400px 0px",
                threshold: 0
            });
            document.querySelectorAll(".nectar-blocks-text[data-text-animation]").forEach((n => {
                "desktop" === window ? .nectarBlocksFrontend ? .device || e ? t(n) : i.observe(n)
            })), document.querySelectorAll(".nectar-blocks-text.has-fit-text").forEach((t => {
                new a(t)
            }))
        }))
    })()
})();