(() => {
    "use strict";
    const t = (t, e = 1) => {
            const s = [
                    ['"', "'"],
                    ["':", "!"],
                    [",'", "~"],
                    ["}", ")", "\\", "\\"],
                    ["{", "(", "\\", "\\"]
                ],
                i = (t, e) => {
                    let s = new RegExp(`${(e[2]?e[2]:"")+e[0]}|${(e[3]?e[3]:"")+e[1]}`, "g");
                    return t.replace(s, (t => t === e[0] ? e[1] : e[0]))
                };
            if (e)
                for (let e = 0; e < s.length; ++e) t = i(t, s[e]);
            else
                for (let e = s.length; e--;) t = i(t, s[e]);
            return t
        },
        e = e => {
            try {
                return JSON.parse(e), e
            } catch (t) {}
            return /[!~$].*[!~$].*[!~$]/.test(e) ? (e => {
                const s = (e = e.substring(0, e.length - 1)).split("");
                let i = s[0];
                if (s.length > 1) {
                    let t = s[1];
                    for (let e of t) {
                        let t = i.split(e);
                        i = t.join(t.pop())
                    }
                }
                return t(i, 0)
            })(e) : e
        };
    class s {
        descOnActive = !1;
        isHorizontalAutoSelect = !1;
        isResettingAutoRotate = !1;
        autoRotateSettings = null;
        autoRotateTimestamp = null;
        autoRotateActive = !1;
        autoRotateProgress = 0;
        constructor(t) {
            this.element = t, this.navEl = this.element.querySelector(`.nectar-blocks-tabs__nav.parent-${this.element.id}`), this.navItems = this.element.querySelectorAll(`.nectar-blocks-tabs__nav.parent-${this.element.id} > a`), this.contentItems = this.element.querySelectorAll(`.nectar-blocks-tabs__content.parent-${this.element.id} > div`), this.navItems.length && this.contentItems.length ? (this.navEl.classList.contains("desc-active-only") && (this.descOnActive = !0), this.events(), this.init()) : console.warn("NectarTabs: missing nav or content items")
        }
        events() {
            this.navItems.forEach((t => {
                t.addEventListener("click", this.clickHandler.bind(this))
            })), window.addEventListener("nectar-blocks-changed-device", this.changedDevice.bind(this)), this.deepLink(), window.addEventListener("resize", (() => {
                this.showDescription([...this.navItems].findIndex((t => t.classList.contains("is-active"))))
            }))
        }
        init() {
            const t = [...this.navItems].findIndex((t => t.classList.contains("is-active")));
            this.showDescription(t), this.horizontalAutoSelect(), this.autoRotateInit()
        }
        clickHandler(t) {
            t.preventDefault();
            const e = t.currentTarget;
            if (e.classList.contains("is-active")) return;
            const s = [...this.navItems].indexOf(e);
            this.show(s), this.showDescription(s)
        }
        show(t) {
            this.navItems[t] && this.contentItems[t] ? (setTimeout((() => {
                this.element.classList.add("interacted-with"), this.navItems.forEach((t => {
                    t.classList.remove("is-active")
                })), this.contentItems.forEach((t => {
                    t.classList.remove("is-active")
                })), this.navItems[t].classList.add("is-active"), this.contentItems[t].classList.add("is-active"), this.isHorizontalAutoSelect && this.navItems[t].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                })
            }), 60), ScrollTrigger.getAll().forEach((s => {
                var i;
                const o = s.trigger;
                if (!o) return;
                if (s ? .vars ? .end) return;
                if (!this.contentItems[t].contains(o)) return;
                const n = o.dataset ? .autoplayTrigger;
                if (n && "in-viewport" === n) {
                    const t = o.querySelector(".nectar-blocks-video-player__video video");
                    t && (t.currentTime = 0, t.play())
                }
                if (!s.animation) return;
                const a = null !== (i = window ? .nectarBlocksFrontend ? .device) && void 0 !== i ? i : "",
                    r = o.closest("div[data-nectar-block-animation]");
                if (r && r.dataset.nectarBlockAnimation) {
                    const t = JSON.parse(e(r.dataset.nectarBlockAnimation));
                    t ? .scrollIntoView ? .triggerDevices ? .includes(a) && (o.classList.add("no-transition"), s.animation ? .restart())
                }
            }))) : console.warn("NectarTabs: cannot find nav or content item")
        }
        showDescription(t) {
            if (!this.descOnActive) return;
            this.navItems.forEach(((e, s) => {
                if (s !== t) {
                    const t = e.querySelector(".nectar-blocks-tabs__nav__link__desc");
                    if (!t) return;
                    t.style.maxHeight = "0px"
                }
            }));
            const e = this.navItems[t].querySelector(".nectar-blocks-tabs__nav__link__desc");
            if (!e) return;
            const s = e.scrollHeight;
            e.style.maxHeight = `${s}px`
        }
        deepLink() {
            const t = window.location.hash;
            if (t) {
                const e = this.element.querySelector(t);
                e && this.contentItems.forEach(((t, s) => {
                    t.contains(e) && this.show(s)
                }))
            }
        }
        autoRotateNext() {
            let t = [...this.navItems].findIndex((t => t.classList.contains("is-active"))) + 1;
            t >= this.navItems.length && (this.isResettingAutoRotate = !0, setTimeout((() => {
                this.isResettingAutoRotate = !1
            }), 800), t = 0), this.show(t), this.showDescription(t), this.autoRotateTimestamp = null
        }
        autoRotateTick() {
            if (!this.autoRotateSettings) return;
            const t = 1e3 * this.autoRotateSettings.timeBetween,
                e = s => {
                    if (!this.autoRotateActive) return void requestAnimationFrame(e);
                    this.autoRotateTimestamp || (this.autoRotateTimestamp = s);
                    const i = s - this.autoRotateTimestamp;
                    this.autoRotateProgress = i / t * 100, this.element.style.setProperty("--auto-rotate-percentage", `${this.autoRotateProgress}%`), this.autoRotateProgress >= 100 && this.autoRotateNext(), requestAnimationFrame(e)
                };
            requestAnimationFrame(e)
        }
        autoRotateStop() {
            this.autoRotateActive = !1, this.autoRotateTimestamp = null, this.autoRotateProgress = 100, this.element.style.setProperty("--auto-rotate-percentage", `${this.autoRotateProgress}%`), this.element.classList.add("auto-rotate-stopped")
        }
        autoRotateReset() {
            this.autoRotateTimestamp = null
        }
        autoRotateInit() {
            if (!this.element.dataset.autoRotate) return;
            this.autoRotateSettings = JSON.parse(e(this.element.dataset.autoRotate));
            const t = this.autoRotateSettings;
            if (!t || !t.enabled) return;
            this.autoRotateTick();
            const s = new IntersectionObserver((t => {
                t.forEach((t => {
                    t.isIntersecting ? this.autoRotateActive = !0 : (this.autoRotateActive = !1, this.autoRotateTimestamp = null)
                }))
            }), {
                rootMargin: "0px 0px 0px 0px",
                threshold: 0
            });
            s.observe(this.element), this.navItems.forEach((e => {
                e.addEventListener("click", (() => {
                    t.stopOnInteraction ? (this.autoRotateStop(), s.unobserve(this.element)) : this.autoRotateReset()
                }))
            }))
        }
        changedDevice() {
            this.setIsHorizontalAutoSelect()
        }
        horizontalAutoSelect() {
            this.setIsHorizontalAutoSelect();
            const t = new IntersectionObserver((t => {
                this.isHorizontalAutoSelect && t.forEach((t => {
                    const e = t.target;
                    if (!this.isResettingAutoRotate && t.isIntersecting && !e.classList.contains("is-active")) {
                        const t = [...this.navItems].indexOf(e);
                        this.show(t), this.showDescription(t), this ? .autoRotateSettings ? .stopOnInteraction ? this.autoRotateStop() : this.autoRotateReset()
                    }
                }))
            }), {
                rootMargin: "0% -48% 0% -48%",
                threshold: 0
            });
            this.navItems.forEach((e => {
                t.observe(e)
            }))
        }
        setIsHorizontalAutoSelect() {
            const t = window.getComputedStyle(this.navEl);
            if (t.overflowX && "auto" === t.overflowX) {
                const t = this.navEl.offsetWidth;
                this.navItems.length > 0 && [...this.navItems].every((e => e.offsetWidth > t / 2)) ? (this.isHorizontalAutoSelect = !0, this.navEl.classList.add("horizontal-auto-select")) : (this.isHorizontalAutoSelect = !1, this.navEl.classList.remove("horizontal-auto-select"))
            } else this.isHorizontalAutoSelect = !1, this.navEl.classList.remove("horizontal-auto-select")
        }
    }
    document.addEventListener("DOMContentLoaded", (() => {
        document.querySelectorAll(".nectar-blocks-tabs").forEach((t => {
            new s(t)
        }))
    }))
})();