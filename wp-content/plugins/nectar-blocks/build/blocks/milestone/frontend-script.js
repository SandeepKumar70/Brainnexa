(() => {
    "use strict";
    const e = window.countUp,
        t = (e, t = 1) => {
            const n = [
                    ['"', "'"],
                    ["':", "!"],
                    [",'", "~"],
                    ["}", ")", "\\", "\\"],
                    ["{", "(", "\\", "\\"]
                ],
                i = (e, t) => {
                    let n = new RegExp(`${(t[2]?t[2]:"")+t[0]}|${(t[3]?t[3]:"")+t[1]}`, "g");
                    return e.replace(n, (e => e === t[0] ? t[1] : t[0]))
                };
            if (t)
                for (let t = 0; t < n.length; ++t) e = i(e, n[t]);
            else
                for (let t = n.length; t--;) e = i(e, n[t]);
            return e
        };
    class n {
        mode = "frontend";
        instance = null;
        constructor(e, n) {
            if (this.element = e, n) this.settings = n, this.mode = "editor";
            else {
                if (!this.element.dataset.nectarMilestoneAnimation) return;
                this.settings = JSON.parse((e => {
                    try {
                        return JSON.parse(e), e
                    } catch (e) {}
                    return /[!~$].*[!~$].*[!~$]/.test(e) ? (e => {
                        const n = (e = e.substring(0, e.length - 1)).split("");
                        let i = n[0];
                        if (n.length > 1) {
                            let e = n[1];
                            for (let t of e) {
                                let e = i.split(t);
                                i = e.join(e.pop())
                            }
                        }
                        return t(i, 0)
                    })(e) : e
                })(this.element.dataset.nectarMilestoneAnimation)), this.element = e.querySelector(".nectar-blocks-milestone__content")
            }
            this.init(), this.events()
        }
        events() {
            "editor" !== this.mode && window.addEventListener("nectar-blocks-changed-device", this.init.bind(this))
        }
        init() {
            if ("frontend" === this.mode) {
                if (!this.shouldActivateOnDevice()) return;
                if (this.element.classList.contains("is-animated")) return
            }
            this.animation()
        }
        animation() {
            const t = this.element.textContent || "0",
                n = this.element.textContent ? .includes(",") || !1,
                i = this.element.textContent ? .includes(".") ? 1 : 0;
            this.instance = new e.CountUp(this.element, parseFloat(t.replace(/[^0-9.]/g, "")), {
                decimalPlaces: i,
                useGrouping: n,
                duration: this.settings.duration,
                enableScrollSpy: "frontend" === this.mode,
                scrollSpyOnce: !0,
                onCompleteCallback: () => {
                    this.element.classList.add("is-animated"), window.dispatchEvent(new Event("nectar-blocks-milestone-animation-complete"))
                }
            }), this.instance.start()
        }
        shouldActivateOnDevice() {
            var e;
            const t = null !== (e = window ? .nectarBlocksFrontend ? .device) && void 0 !== e ? e : "";
            return !(!t || t && !this.settings.deviceTrigger.includes(t))
        }
        destroy() {
            this.instance && this.instance.reset()
        }
    }
    document.addEventListener("DOMContentLoaded", (() => {
        document.querySelectorAll(".nectar-blocks-milestone").forEach((e => {
            new n(e)
        }))
    }))
})();