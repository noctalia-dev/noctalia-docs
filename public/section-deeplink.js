(function () {
	// Make in-page section links shareable on Discord: Discord keeps a ?query but
	// strips the #fragment from the OG preview card, so heading + TOC links carry
	// the section as ?section=xxx#xxx. Two parts:
	//   1. rewrite heading-anchor + TOC hrefs so EVERY copy path (right-click
	//      "Copy link address", middle/Cmd-click, drag) yields the shareable form;
	//   2. a delegated click handler scrolls in place (no reload) for plain clicks.
	// The TOC scroll-spy and FAQ TOC injection match links by URL hash, so they
	// keep working with the rewritten hrefs.

	// Heading chain icons + the custom desktop TOC. (#_top "scroll to top" and the
	// FAQ body anchors are intentionally left as native #links.)
	const REWRITE_SELECTOR = ".sl-markdown-content .sl-anchor-link, snake-toc a[href]";

	function hashId(href) {
		try {
			return decodeURIComponent(new URL(href, location.href).hash.slice(1));
		} catch {
			return "";
		}
	}

	function scrollToId(id) {
		const el = document.getElementById(id);
		if (!el) return false;
		if (el instanceof HTMLDetailsElement && el.classList.contains("faq-item")) {
			el.open = true;
		}
		el.scrollIntoView({ behavior: "smooth", block: "start" });
		return true;
	}

	// Rewrite hrefs to the Discord-safe ?section=xxx#xxx form so copying the link
	// (even without clicking) already yields a card-proof URL.
	function rewriteHrefs() {
		document.querySelectorAll(REWRITE_SELECTOR).forEach((a) => {
			if (a.dataset.sectionHref) return;
			const id = hashId(a.href);
			if (!id || id === "_top") return;
			if (!document.getElementById(id)) return;
			const enc = encodeURIComponent(id);
			a.setAttribute("href", "?section=" + enc + "#" + enc);
			a.dataset.sectionHref = "1";
		});
	}

	// Arriving via a shared link: scroll, then tidy the URL back to a clean #xxx.
	function consumeSectionParam() {
		const id = new URLSearchParams(location.search).get("section");
		if (!id) return;
		requestAnimationFrame(() => {
			if (scrollToId(id)) {
				history.replaceState(null, "", "#" + encodeURIComponent(id));
			}
		});
	}

	// One delegated handler for every same-page section jump (heading icons, TOC,
	// in-content anchors). Capture phase so we own the click before the router.
	document.addEventListener(
		"click",
		(e) => {
			// Let modified / non-primary clicks (open in new tab, etc.) fall through.
			if (
				e.defaultPrevented ||
				e.button !== 0 ||
				e.metaKey ||
				e.ctrlKey ||
				e.shiftKey ||
				e.altKey
			) {
				return;
			}
			const a = e.target.closest && e.target.closest("a[href]");
			if (!a) return;
			// FAQ items own their own anchor/open behavior, leave them alone.
			if (a.classList.contains("faq-anchor") || a.closest("summary")) return;

			let url;
			try {
				url = new URL(a.href, location.href);
			} catch {
				return;
			}
			// Only same-page section jumps.
			if (url.origin !== location.origin || url.pathname !== location.pathname) return;

			const id = decodeURIComponent(url.hash.slice(1));
			if (!id || id === "_top") return; // skip empty + the "scroll to top" link
			if (!document.getElementById(id)) return;

			e.preventDefault();
			scrollToId(id);
			const enc = encodeURIComponent(id);
			history.replaceState(null, "", "?section=" + enc + "#" + enc);
		},
		true
	);

	function run() {
		rewriteHrefs();
		consumeSectionParam();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", run);
	} else {
		run();
	}
	// Page content swaps on Starlight view transitions; re-check the URL.
	document.addEventListener("astro:page-load", run);
	// FAQ items inject their own TOC entries after load, rewrite those too.
	document.addEventListener("faq-toc-ready", rewriteHrefs);
})();
