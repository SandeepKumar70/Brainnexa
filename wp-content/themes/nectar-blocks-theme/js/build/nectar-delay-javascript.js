! function(e, t, a) {
    "use strict";

    function n() {
        this.scripts = [], this.eventListeners = ["click", "scroll", "touchstart", "touchmove", "keydown", "mousemove"], this.windowWidth = t.innerWidth, this.windowHeight = t.innerHeight, this.noClick = this.preventClick.bind(this), this.load = this.triggerLoad.bind(this), this.pageCritical(), this.loadCritialAnimations(), this.gatherElements(), this.addEvents()
    }
    const i = n.prototype;
    i.gatherElements = function() {
        a.querySelectorAll('script[type="nectarlazyscript"]').forEach((e => {
            this.scripts.push(e)
        }))
    }, i.aboveTheFoldElements = function(e) {
        let t = [];
        const n = a.querySelectorAll(".woocommerce.archive .products, .archive .posts-container, .nectar_hook_global_section_after_header_navigation, .nectar_hook_before_secondary_header");
        return n && n.forEach(((a, n) => {
            a.querySelectorAll(e).forEach((e => {
                t.push(e)
            }))
        })), t
    }, i.maybeAddAnimationEasing = function(e) {
        let t = "";
        if (this.windowWidth > 1e3) {
            let a = "cubic-bezier(0.33, 1, 0.68, 1)",
                n = "0s",
                i = "1s";
            if (e.hasAttribute("data-animation-easing")) {
                const t = e.getAttribute("data-animation-easing");
                void 0 !== this.easings[t] && (a = "cubic-bezier(" + this.easings[t] + ")")
            }
            e.hasAttribute("data-delay") && "" !== e.getAttribute("data-delay") && (n = parseInt(e.getAttribute("data-delay")) + "ms"), t = "transform " + i + " " + a + " " + n + ", clip-path " + i + " " + a + " " + n + ", opacity " + i + " " + a + " " + n
        }
        return t
    }, i.pageCritical = function() {
        const e = a.getElementById("nectar-nav");
        e && e.querySelectorAll("a[href*='" + location.pathname + "']").forEach((function(e) {
            const t = e.getAttribute("href");
            if (t && -1 !== t.indexOf("#")) {
                const n = t.substring(t.indexOf("#")).replace(/[^a-zA-Z0-9-]/g, "");
                if (n.length > 0 && "#" !== n && a.querySelector("div#" + n)) {
                    const t = e.parentNode;
                    t.classList.add("no-pseudo-after-transition"), t.classList.remove("current_page_item"), t.classList.remove("current-menu-item"), setTimeout((() => {
                        t.classList.remove("no-pseudo-after-transition")
                    }), 100)
                }
                a.querySelector('div[data-fullscreen-anchor-id="' + t.substring(t.indexOf("#") + 1) + '"]') && (e.parentNode.classList.remove("current_page_item"), e.parentNode.classList.remove("current-menu-item"))
            }
        })), this.wooCommerce()
    }, i.wooCommerce = function() {
        if (!a.querySelector("body.woocommerce-account #customer_login")) return;
        const e = a.querySelector(".woocommerce-account .woocommerce > #customer_login");
        if (!e) return;
        const t = a.createElement("div");
        t.className = "nectar-form-controls", e.prepend(t), a.querySelectorAll(".woocommerce-account .woocommerce > #customer_login > div:not(.nectar-form-controls)").forEach((function(e, n) {
            const i = e.querySelector(":scope > h2");
            if (i) {
                const e = i.textContent,
                    o = a.createElement("div");
                o.className = 0 === n ? "control active" : "control", o.textContent = e, t.appendChild(o)
            }
        }));
        const n = a.querySelector(".woocommerce-account .woocommerce > #customer_login .u-column1");
        n && n.classList.add("visible")
    }, i.loadCritialAnimations = function() {
        this.easings = {
            linear: "0,0,1,1",
            easeInSine: "0.12, 0, 0.39, 0",
            easeOutSine: "0.61, 1, 0.88, 1",
            easeInOutSine: "0.37, 0, 0.63, 1",
            easeInQuad: "0.11, 0, 0.5, 0",
            easeOutQuad: "0.5, 1, 0.89, 1",
            easeInOutQuad: "0.45, 0, 0.55, 1",
            easeInCubic: "0.32, 0, 0.67, 0",
            easeOutCubic: "0.33, 1, 0.68, 1",
            easeInOutCubic: "0.65, 0, 0.35, 1",
            easeInQuart: "0.5, 0, 0.75, 0",
            easeOutQuart: "0.25, 1, 0.5, 1",
            easeInOutQuart: "0.76, 0, 0.24, 1",
            easeInQuint: "0.64, 0, 0.78, 0",
            easeOutQuint: "0.22, 1, 0.36, 1",
            easeInOutQuint: "0.83, 0, 0.17, 1",
            easeInExpo: "0.8, 0, 0.2, 0",
            easeOutExpo: "0.19, 1, 0.22, 1",
            easeInOutExpo: "0.87, 0, 0.13, 1",
            easeInCirc: "0.6, 0, 0.98, 0",
            easeOutCirc: "0, 0.55, 0.45, 1",
            easeInOutCirc: "0.85, 0, 0.15, 1"
        };
        const e = a.getElementById("ajax-loading-screen");
        e && e.classList.add("loaded"), t.nectarOptions && t.nectarOptions.header_entrance && "true" == t.nectarOptions.header_entrance && a.querySelector("#nectar-nav") && a.querySelector("#nectar-nav").classList.add("entrance-animation"), setTimeout((() => {
            const e = a.querySelector(".widget_shopping_cart .cart_list .empty"),
                t = a.querySelector(".widget_shopping_cart .cart_list"),
                n = a.querySelector("#mobile-cart-link"),
                i = a.querySelector(".cart-menu-wrap.static");
            !e && !i && n && t && n.classList.add("first-load")
        }), 80), this.aboveTheFoldElements(".nectar-waypoint-el").forEach((e => {
            e.classList.add("animated-in")
        })), this.aboveTheFoldElements('.nectar-woo-flickity[data-animation*="fade"]').forEach((e => {
            e.classList.add("animated-in"), e.querySelectorAll(".product").forEach((e => {
                e.style.opacity = "1", e.style.transform = "translate3d(0,0,0)"
            }))
        })), t.innerWidth > 470 && setTimeout((() => {
            const e = function() {};
            a.querySelectorAll(".portfolio-items:not(.carousel)").forEach((t => {
                "undefined" != typeof NectarPortfolio && "undefined" != typeof jQuery && new NectarPortfolio(jQuery(t), e, "", e)
            })), a.querySelectorAll(".masonry:not(.auto_meta_overlaid_spaced) > .posts-container").forEach((t => {
                "undefined" != typeof NectarMasonryBlog && "undefined" != typeof jQuery && (new NectarMasonryBlog(jQuery(t), e, e), t.querySelectorAll(".masonry-blog-item").forEach((e => {
                    e.classList.add("animated-in")
                })))
            }))
        }), 200);
        const n = a.querySelector("body.material #slide-out-widget-area.slide-out-from-right .slide_out_area_close");
        n && n.classList.add("hide_until_rendered")
    }, i.pageLoadHashCheck = function() {
        let e = t.location.hash;
        e && e.length > 0 && (e = e.replace(/[^a-zA-Z0-9-]/g, ""), a.getElementById(e) && this.load())
    }, i.addEvents = function() {
        this.ocmLinks = a.querySelectorAll(".slide-out-widget-area-toggle a"), this.ocmLinks && this.ocmLinks.forEach((e => {
            e.addEventListener("click", (() => {
                t.nectarOcmOpen = !0
            }), {
                once: !0
            }), e.addEventListener("touchend", (() => {
                t.nectarOcmOpen = !0
            }), {
                once: !0
            })
        })), setTimeout((() => {
            this.linksToPrevent = a.querySelectorAll("a.nectar_video_lightbox, a.pp, a[data-fancybox], a.pretty_photo, .wpb_gallery_slidesflickity_style .cell > a:not(.ext-url-link), .wpb_gallery_slidesflickity_static_height_style .cell > a:not(.ext-url-link), #mobile-cart-link, .mobile-search");
            let e = this;
            this.eventListeners.forEach((a => {
                t.addEventListener(a, e.load)
            })), this.linksToPrevent && this.linksToPrevent.forEach((t => {
                t.addEventListener("click", e.noClick)
            })), this.pageLoadHashCheck()
        }), 80)
    }, i.preventClick = function(e) {
        if (!a.body.classList.contains("nectar-delay-js-loaded")) return e.preventDefault(), !1
    }, i.removeEvents = function() {
        let e = this;
        this.eventListeners.forEach((a => {
            t.removeEventListener(a, e.load)
        }))
    }, i.triggerLoad = async function(e) {
        var t = this;
        this.removeEvents(), await new Promise((e => setTimeout(e, 30))), this.preloadScripts(), await this.sequentialScripts(), this.dispatchEvents(), (e && "click" === e.type || e && "touchstart" === e.type) && (e.target && e.target.matches("a") || e.target.closest("a")) && setTimeout((() => {
            this.linksToPrevent && this.linksToPrevent.forEach((a => {
                a.removeEventListener("click", t.noClick), (a === e.target || a.contains(e.target)) && "absolute" !== getComputedStyle(e.target).position && e.target.click()
            }))
        }), 90), a.body.classList.add("nectar-delay-js-loaded")
    }, i.preloadScripts = function() {
        this.scripts.forEach((function(e) {
            const t = e.getAttribute("src");
            if (t) {
                const e = a.createElement("link");
                e.href = t, e.rel = "preload", e.as = "script", a.head.appendChild(e)
            }
        }))
    }, i.sequentialScripts = async function() {
        const e = this.scripts.shift();
        return e ? (await this.loadScript(e), this.sequentialScripts(e)) : Promise.resolve()
    }, i.loadScript = async function(e) {
        if (e.hasAttribute("src")) return new Promise((function(t, n) {
            const i = a.createElement("script");
            [...e.attributes].forEach((e => {
                const t = e.nodeName,
                    a = e.nodeValue;
                "type" !== t ? "data-nectar-blockslazy-type" !== t ? "data-nowprocket" !== t && "data-pagespeed-no-defer" !== t && i.setAttribute(t, a) : i.setAttribute("type", a) : i.setAttribute("data-nectar-blocksdelayed-js-loaded", "true")
            })), i.addEventListener("load", (() => {
                t()
            })), i.addEventListener("error", (() => {
                t()
            })), e.parentNode.replaceChild(i, e)
        }))
    }, i.dispatchEvents = function() {
        t.dispatchEvent(new Event("nectar-delayed-js-loaded"))
    }, new n
}(window.jQuery, window, document);