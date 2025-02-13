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
            for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
                enumerable: !0,
                get: n[r]
            })
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
    };
    const t = window.gsap;
    var n = e.n(t);
    const r = window.ScrollTrigger;
    var i = e.n(r);
    n().registerPlugin(i());
    class o {
        autoplayTrigger = "in-viewport";
        gsapInstance = null;
        constructor(e) {
            this.element = e, this.videoElements = [...e.querySelectorAll("video")], this.element.dataset.autoplayTrigger && this.videoElements.length > 0 && (this.autoplayTrigger = this.element.dataset.autoplayTrigger, this.init())
        }
        init() {
            this.bindTrigger()
        }
        usingCompatibleBrowser() {
            return !navigator.userAgent.toLowerCase().includes("firefox")
        }
        bindTrigger() {
            "scroll-seek" === this.autoplayTrigger && this.usingCompatibleBrowser() ? this.scrollSeekTrigger() : "in-viewport" === this.autoplayTrigger && this.inViewTrigger()
        }
        scrollSeekTrigger() {
            const e = {
                trigger: "video",
                start: "clamp(top bottom)",
                end: "bottom top",
                scrub: .3
            };
            if (this.element.closest(".nectar-blocks-pin")) {
                e.pinnedContainer = this.element.closest(".nectar-blocks-pin");
                const t = this.element.closest(".nectar-blocks-pin-root");
                t.id && this.getInstancePositionData(t) && (e.end = () => this.getInstancePositionData(t) ? this.getInstancePositionData(t) ? .end : "")
            }
            this.videoElements.forEach((t => {
                t.onloadedmetadata = () => {
                    const r = n().timeline({
                        scrollTrigger: e
                    });
                    t.currentTime = 0, r.to(t, {
                        currentTime: t.duration,
                        ease: "linear"
                    })
                }
            }))
        }
        inViewTrigger() {
            i().create({
                trigger: this.element,
                start: "top bottom",
                onEnter: () => {
                    this.videoElements.forEach((e => {
                        e.ended || 0 !== e.currentTime || null !== e.querySelector("source[data-nectar-lazy-src]") || e.play()
                    }))
                }
            })
        }
        getInstancePositionData(e) {
            if (!window ? .nectarBlocksFrontend ? .device) return null;
            const t = window.nectarBlocksFrontend.device,
                n = window.nectarBlocksFrontend.scrollAnimationInstances.find((t => t.key === e.id));
            return n ? n.instances[t] ? .scrollTrigger : null
        }
        destroy() {
            this.gsapInstance && this.gsapInstance.kill()
        }
    }
    document.addEventListener("DOMContentLoaded", (() => {
        document.querySelectorAll(".nectar-blocks-video-player").forEach((e => {
            new o(e)
        }))
    }))
})();