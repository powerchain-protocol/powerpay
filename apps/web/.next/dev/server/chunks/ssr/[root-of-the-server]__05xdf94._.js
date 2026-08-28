module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/apps/web/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/site-header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$site$2d$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/site-footer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$landing$2d$checkout$2d$preview$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/landing-checkout-preview.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
const rails = [
    {
        title: 'Checkout',
        copy: 'A focused payment surface for USDC, EURC, SOL and PWRC with exact fee disclosure.',
        tag: 'Pay'
    },
    {
        title: 'Scan to pay',
        copy: 'Resolve Solana Pay and PowerPay QR requests into the same canonical payment intent.',
        tag: 'Scan'
    },
    {
        title: 'Wallet approval',
        copy: 'Authentication and wallet authorization stay separate. PowerPay never needs a seed phrase.',
        tag: 'Approve'
    },
    {
        title: 'Settlement',
        copy: 'Chain confirmation is reconciled against the immutable intent before a receipt is issued.',
        tag: 'Verify'
    }
];
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "site-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SiteHeader"], {
                active: "home"
            }, void 0, false, {
                fileName: "[project]/apps/web/app/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "hero",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-copy",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-badge",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "context-dot live"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 21,
                                                columnNumber: 41
                                            }, this),
                                            "USDC-first · Non-custodial"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 21,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: [
                                            "Payments that feel simple.",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 22,
                                                columnNumber: 43
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Settlement that stays verifiable."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 22,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 22,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hero-lead",
                                        children: "PowerPay gives merchants and customers one clean checkout for digital payments—wallet approved, quote locked, and reconciled against the chain before completion."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 23,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/checkout",
                                                className: "primary-button",
                                                children: [
                                                    "Open checkout ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 25,
                                                        columnNumber: 79
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 25,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                href: "#developers",
                                                className: "secondary-button",
                                                children: "Explore infrastructure"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 26,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 24,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-proof",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "USDC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 29,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Default payment asset"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 29,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 29,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "1 intent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 30,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Across scan, checkout & API"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 30,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 30,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Non-custodial"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 31,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Your wallet approves"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 31,
                                                        columnNumber: 50
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 31,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 28,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$landing$2d$checkout$2d$preview$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LandingCheckoutPreview"], {}, void 0, false, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rail-strip",
                        "aria-label": "Supported payment assets and networks",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Built for modern payment rails"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AssetIcon"], {
                                        asset: "USDC",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 16
                                    }, this),
                                    "USDC"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AssetIcon"], {
                                        asset: "EURC",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 40,
                                        columnNumber: 16
                                    }, this),
                                    "EURC"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AssetIcon"], {
                                        asset: "SOL",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 41,
                                        columnNumber: 16
                                    }, this),
                                    "SOL"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AssetIcon"], {
                                        asset: "PWRC",
                                        size: 25
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 42,
                                        columnNumber: 16
                                    }, this),
                                    "PWRC"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NetworkIcon"], {
                                        network: "solana",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 43,
                                        columnNumber: 16
                                    }, this),
                                    "Solana"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "muted-rail",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NetworkIcon"], {
                                        network: "sui",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 44,
                                        columnNumber: 39
                                    }, this),
                                    "Sui ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: "gated"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 44,
                                        columnNumber: 82
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "section",
                        id: "product",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "section-kicker",
                                                children: "Payment experience"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 49,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "One surface from intent to receipt."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 49,
                                                columnNumber: 76
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "PowerPay hides protocol complexity until it is useful. Customers see a merchant, amount, asset, network, fees, and one explicit approval action."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "feature-grid",
                                children: rails.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "feature-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "feature-index",
                                                children: [
                                                    "0",
                                                    index + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 53,
                                                columnNumber: 92
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "feature-tag",
                                                children: item.tag
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 53,
                                                columnNumber: 143
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 53,
                                                columnNumber: 190
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: item.copy
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 53,
                                                columnNumber: 211
                                            }, this)
                                        ]
                                    }, item.title, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "split-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "split-copy",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "section-kicker",
                                        children: "Local & online payments"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Scan at the counter. Checkout on the web."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Whether a payment starts from a camera, a merchant checkout, an API action, or a wallet send, it converges on the same immutable PowerPay intent and attempt model."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "check-list",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Solana Pay-compatible QR resolution"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 63,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Merchant trust and anti-replay controls"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 64,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Quote expiry before wallet signature"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 65,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Recovery without blind rebroadcast"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/checkout",
                                        className: "text-link",
                                        children: "Try the web checkout →"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flow-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flow-row active",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "01"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 46
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Create intent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 66
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Merchant · amount · asset · reference"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 96
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 61
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Locked"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 154
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flow-line"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flow-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "02"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 39
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Wallet approval"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 59
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Simulation + signed fee quote"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 91
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 54
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Approve"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 141
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flow-line"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flow-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "03"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 75,
                                                columnNumber: 39
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Chain settlement"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 59
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Submit · confirm · reconcile"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 92
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 75,
                                                columnNumber: 54
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Verify"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 75,
                                                columnNumber: 141
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flow-line"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flow-row success",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "04"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 47
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Receipt"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 67
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Immutable settlement record"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/page.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 91
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 62
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Settled"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 139
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "section architecture-section",
                        id: "developers",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "section-kicker",
                                                children: "Infrastructure"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Payment UX above a canonical engine."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 72
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "The website does not invent payment state. It reads and advances the same backend state machine used by mobile, QR and Solana Actions."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "architecture-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "architecture-layer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Experience"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Web · Mobile · QR · Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 72
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "architecture-arrow",
                                        children: "↓"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "architecture-layer green-layer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "PowerPay Core"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 89,
                                                columnNumber: 61
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Intent · Quote · Attempt · Policy"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 89,
                                                columnNumber: 87
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "architecture-arrow",
                                        children: "↓"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "architecture-layer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Execution"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Solana adapter · RPC · Programs"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 71
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "architecture-arrow",
                                        children: "↓"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "architecture-layer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Record"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 93,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Ledger · Reconciliation · Receipt"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 93,
                                                columnNumber: 68
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "security-section",
                        id: "security",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "security-copy",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "section-kicker",
                                        children: "Security by design"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 42
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Your account is not your wallet."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 100
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "PowerPay keeps identity, wallet connection and payment authorization as separate security boundaries. The browser requests a signature; the wallet remains the signer."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 141
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "security-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Immutable review"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 100,
                                                columnNumber: 22
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Recipient, amount, asset and network lock before signing."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 100,
                                                columnNumber: 55
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Idempotent attempts"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 101,
                                                columnNumber: 22
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Retries cannot silently create a second independent payment."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 101,
                                                columnNumber: 58
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Fail-closed capabilities"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 102,
                                                columnNumber: 22
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Unavailable bridge, vault or Sui execution stays disabled."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/page.tsx",
                                                lineNumber: 102,
                                                columnNumber: 63
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "final-cta",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "section-kicker",
                                        children: "PowerPay"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "A cleaner checkout for onchain payments."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 64
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Start with USDC on Solana and keep the underlying execution auditable."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 113
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/checkout",
                                className: "primary-button",
                                children: [
                                    "Launch checkout ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 77
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/page.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$site$2d$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SiteFooter"], {}, void 0, false, {
                fileName: "[project]/apps/web/app/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/page.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/web/components/landing-checkout-preview.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingCheckoutPreview",
    ()=>LandingCheckoutPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-rsc] (ecmascript)");
;
;
function LandingCheckoutPreview() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hero-product",
        "aria-label": "PowerPay checkout preview",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preview-topbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "preview-dot"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 7,
                                columnNumber: 15
                            }, this),
                            "Checkout preview"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                        lineNumber: 7,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "preview-network",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NetworkIcon"], {
                                network: "solana",
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 8,
                                columnNumber: 43
                            }, this),
                            " Solana"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preview-body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "preview-main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "section-kicker",
                                children: "PowerPay checkout"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Complete payment"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Fast, transparent checkout with a signed quote before wallet approval."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 14,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "preview-field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "asset-id",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AssetIcon"], {
                                                asset: "USDC",
                                                size: 30
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 16,
                                                columnNumber: 39
                                            }, this),
                                            "USDC"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 16,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "preview-amount",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "125.00"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 17,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "$125.00"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 17,
                                                columnNumber: 68
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 17,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 15,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "preview-method active-method",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "radio-dot"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 19,
                                        columnNumber: 57
                                    }, this),
                                    "Wallet payment ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Recommended"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 19,
                                        columnNumber: 102
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "preview-method",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "radio-dot empty"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 20,
                                        columnNumber: 43
                                    }, this),
                                    "Solana Pay ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "QR / link"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 20,
                                        columnNumber: 90
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "preview-pay",
                                children: "Review payment"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "preview-summary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "section-kicker",
                                children: "Order summary"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "merchant-avatar",
                                children: "P"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "PowerPay Demo"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "verified-line",
                                children: "✓ Verified merchant"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "Payment"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 29,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: "125.00 USDC"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 29,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 29,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "Network"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 30,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: "Solana"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 30,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: "Quote"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 31,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: "Locked"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                                lineNumber: 31,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "preview-total",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 33,
                                        columnNumber: 42
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "125.00 USDC"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                        lineNumber: 33,
                                        columnNumber: 60
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/landing-checkout-preview.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/powerpay-logo.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PowerPayLogo",
    ()=>PowerPayLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/assets.ts [app-rsc] (ecmascript)");
;
;
;
;
function PowerPayLogo({ compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        href: "/",
        className: "brand",
        "aria-label": "PowerPay home",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                src: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["POWERPAY_PUBLIC_ASSETS"].brand.markGreen,
                alt: "",
                width: 46,
                height: 46,
                priority: true
            }, void 0, false, {
                fileName: "[project]/apps/web/components/powerpay-logo.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-copy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-word",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Power"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/powerpay-logo.tsx",
                                lineNumber: 11,
                                columnNumber: 39
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Pay"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/powerpay-logo.tsx",
                                lineNumber: 11,
                                columnNumber: 57
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/powerpay-logo.tsx",
                        lineNumber: 11,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-sub",
                        children: "Digital payment rails"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/powerpay-logo.tsx",
                        lineNumber: 12,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/powerpay-logo.tsx",
                lineNumber: 10,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/powerpay-logo.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/site-footer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteFooter",
    ()=>SiteFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$powerpay$2d$logo$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/powerpay-logo.tsx [app-rsc] (ecmascript)");
;
;
;
function SiteFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "site-footer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "footer-brand",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$powerpay$2d$logo$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PowerPayLogo"], {}, void 0, false, {
                        fileName: "[project]/apps/web/components/site-footer.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "USDC-first payments with wallet approval, deterministic fees, and verifiable settlement."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/site-footer.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/site-footer.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "footer-links",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Product"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-footer.tsx",
                                lineNumber: 12,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/checkout",
                                children: "Checkout"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-footer.tsx",
                                lineNumber: 12,
                                columnNumber: 38
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/#product",
                                children: "Payments"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-footer.tsx",
                                lineNumber: 12,
                                columnNumber: 76
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/#security",
                                children: "Security"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-footer.tsx",
                                lineNumber: 12,
                                columnNumber: 114
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/site-footer.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Resources"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-footer.tsx",
                                lineNumber: 13,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/#developers",
                                children: "Developers"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-footer.tsx",
                                lineNumber: 13,
                                columnNumber: 40
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/asset-preview",
                                children: "Assets"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-footer.tsx",
                                lineNumber: 13,
                                columnNumber: 83
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://github.com/powerchain-protocol",
                                target: "_blank",
                                rel: "noreferrer",
                                children: "GitHub"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-footer.tsx",
                                lineNumber: 13,
                                columnNumber: 124
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/site-footer.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/site-footer.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "footer-bottom",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "© 2026 PowerPay"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/site-footer.tsx",
                        lineNumber: 15,
                        columnNumber: 38
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Non-custodial · Wallet authorized"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/site-footer.tsx",
                        lineNumber: 15,
                        columnNumber: 66
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/site-footer.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/site-footer.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/components/site-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$powerpay$2d$logo$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/powerpay-logo.tsx [app-rsc] (ecmascript)");
;
;
;
function SiteHeader({ active = 'home' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "site-header",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$powerpay$2d$logo$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PowerPayLogo"], {}, void 0, false, {
                fileName: "[project]/apps/web/components/site-header.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "header-nav",
                "aria-label": "Primary navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/#product",
                        className: active === 'home' ? 'header-link active' : 'header-link',
                        children: "Product"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/site-header.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/checkout",
                        className: active === 'checkout' ? 'header-link active' : 'header-link',
                        children: "Checkout"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/site-header.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/#developers",
                        className: "header-link",
                        children: "Developers"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/site-header.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/#security",
                        className: "header-link",
                        children: "Security"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/site-header.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/site-header.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "header-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "network-badge",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "network-dot"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/site-header.tsx",
                                lineNumber: 15,
                                columnNumber: 41
                            }, this),
                            "Solana"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/site-header.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/checkout",
                        className: "header-cta",
                        children: "Open PowerPay"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/site-header.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/site-header.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/site-header.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/shared/src/assets.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POWERPAY_ASSET_VISUALS",
    ()=>POWERPAY_ASSET_VISUALS,
    "POWERPAY_NETWORK_VISUALS",
    ()=>POWERPAY_NETWORK_VISUALS,
    "POWERPAY_PUBLIC_ASSETS",
    ()=>POWERPAY_PUBLIC_ASSETS,
    "POWERPAY_WALLET_VISUALS",
    ()=>POWERPAY_WALLET_VISUALS
]);
const POWERPAY_PUBLIC_ASSETS = {
    brand: {
        mark: '/assets/brand/powerpay-mark-green.png',
        markGreen: '/assets/brand/powerpay-mark-green.png',
        markWhite: '/assets/brand/powerpay-mark-white.png',
        markDark: '/assets/brand/powerpay-mark-dark.png',
        markSvg: '/assets/brand/powerpay-mark-green.svg',
        logo: '/assets/brand/powerpay-logo.svg',
        logoPng: '/assets/brand/powerpay-logo.png',
        logoLight: '/assets/brand/powerpay-logo-light.svg',
        logoLightPng: '/assets/brand/powerpay-logo-light.png',
        logoDark: '/assets/brand/powerpay-logo-dark.svg',
        logoDarkPng: '/assets/brand/powerpay-logo-dark.png',
        powerChainLogo: '/assets/brand/powerchain-logo.svg',
        powerChainLogoPng: '/assets/brand/powerchain-logo.png',
        powerChainMarkGreen: '/assets/brand/powerchain-mark-green.png',
        powerChainMarkWhite: '/assets/brand/powerchain-mark-white.png',
        powerChainMarkDark: '/assets/brand/powerchain-mark-dark.png',
        appIcon: '/assets/brand/powerpay-app-icon.png'
    },
    tokens: {
        PWRC: {
            mark: '/assets/tokens/pwrc-mark.png',
            markSvg: '/assets/tokens/pwrc-mark.svg',
            coin: '/assets/tokens/pwrc-coin.png',
            coin2x: '/assets/tokens/pwrc-coin@2x.png',
            light: '/assets/tokens/pwrc-light.png',
            dark: '/assets/tokens/pwrc-dark.png'
        },
        wPWRC: {
            mark: '/assets/tokens/wpwrc-mark.png',
            coin: '/assets/tokens/wpwrc-coin.png',
            coin2x: '/assets/tokens/wpwrc-coin@2x.png',
            light: '/assets/tokens/wpwrc-light.png',
            dark: '/assets/tokens/wpwrc-dark.png'
        },
        USDC: '/assets/tokens/usdc.svg',
        EURC: '/assets/tokens/eurc.svg',
        SOL: '/assets/tokens/sol.svg',
        SUI: '/assets/tokens/sui.svg'
    },
    networks: {
        solana: '/assets/networks/solana.svg',
        sui: '/assets/networks/sui.svg',
        solanaFallback: '/assets/networks/solana.png',
        suiFallback: '/assets/networks/sui.png'
    },
    wallets: {
        phantom: '/icons/wallets/phantom.svg',
        solflare: '/icons/wallets/solflare.svg',
        backpack: '/icons/wallets/backpack.svg',
        walletConnect: '/icons/wallets/wallet-connect.svg'
    },
    illustrations: {
        emptyWallet: '/images/illustrations/empty-wallet.svg',
        paymentSuccess: '/images/illustrations/payment-success.svg',
        paymentFailed: '/images/illustrations/payment-failed.svg',
        scanQr: '/images/illustrations/scan-qr.svg',
        securePayment: '/images/illustrations/secure-payment.svg',
        walletConnect: '/images/illustrations/wallet-connect.svg',
        noTransactions: '/images/illustrations/no-transactions.svg',
        onramp: '/images/illustrations/onramp.svg',
        checkoutAndStorefront: '/images/illustrations/checkout-and-storefront.png',
        mobilePaymentsShowcase: '/images/illustrations/mobile-payments-showcase.png'
    }
};
const POWERPAY_ASSET_VISUALS = {
    PWRC: {
        symbol: 'PWRC',
        name: 'PowerChain Token',
        network: 'solana',
        decimals: 9,
        source: 'powerpay-owned',
        icon: POWERPAY_PUBLIC_ASSETS.tokens.PWRC.mark,
        image: POWERPAY_PUBLIC_ASSETS.tokens.PWRC.coin,
        minDetailedImagePx: 40
    },
    wPWRC: {
        symbol: 'wPWRC',
        name: 'Wrapped PowerChain Token',
        network: 'sui',
        decimals: 9,
        source: 'powerpay-owned',
        icon: POWERPAY_PUBLIC_ASSETS.tokens.wPWRC.mark,
        image: POWERPAY_PUBLIC_ASSETS.tokens.wPWRC.coin,
        minDetailedImagePx: 40,
        wrappedAsset: 'PWRC'
    },
    SOL: {
        symbol: 'SOL',
        name: 'Solana',
        network: 'solana',
        decimals: 9,
        source: 'web3icons',
        web3Symbol: 'SOL'
    },
    USDC: {
        symbol: 'USDC',
        name: 'USD Coin',
        network: 'solana',
        decimals: 6,
        source: 'web3icons',
        web3Symbol: 'USDC'
    },
    EURC: {
        symbol: 'EURC',
        name: 'EURC',
        network: 'solana',
        decimals: 6,
        source: 'web3icons',
        web3Symbol: 'EURC'
    },
    SUI: {
        symbol: 'SUI',
        name: 'Sui',
        network: 'sui',
        decimals: 9,
        source: 'web3icons',
        web3Symbol: 'SUI'
    }
};
const POWERPAY_WALLET_VISUALS = {
    phantom: {
        name: 'Phantom',
        source: 'web3icons',
        web3Name: 'phantom',
        asset: POWERPAY_PUBLIC_ASSETS.wallets.phantom
    },
    solflare: {
        name: 'Solflare',
        source: 'web3icons',
        web3Name: 'solflare',
        asset: POWERPAY_PUBLIC_ASSETS.wallets.solflare
    },
    backpack: {
        name: 'Backpack',
        source: 'web3icons',
        web3Name: 'backpack',
        asset: POWERPAY_PUBLIC_ASSETS.wallets.backpack
    },
    walletConnect: {
        name: 'WalletConnect',
        source: 'web3icons',
        web3Name: 'wallet-connect',
        asset: POWERPAY_PUBLIC_ASSETS.wallets.walletConnect
    }
};
const POWERPAY_NETWORK_VISUALS = {
    solana: {
        name: 'Solana',
        source: 'web3icons',
        web3Name: 'solana',
        asset: POWERPAY_PUBLIC_ASSETS.networks.solana,
        fallback: POWERPAY_PUBLIC_ASSETS.networks.solanaFallback
    },
    sui: {
        name: 'Sui',
        source: 'web3icons',
        web3Name: 'sui',
        asset: POWERPAY_PUBLIC_ASSETS.networks.sui,
        fallback: POWERPAY_PUBLIC_ASSETS.networks.suiFallback
    }
};
}),
"[project]/packages/ui/src/components/AssetIcon.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssetIcon",
    ()=>AssetIcon
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AssetIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AssetIcon() from the server but AssetIcon is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/packages/ui/src/components/AssetIcon.tsx", "AssetIcon");
}),
"[project]/packages/ui/src/components/AssetIcon.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssetIcon",
    ()=>AssetIcon
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AssetIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AssetIcon() from the server but AssetIcon is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/packages/ui/src/components/AssetIcon.tsx <module evaluation>", "AssetIcon");
}),
"[project]/packages/ui/src/components/AssetIcon.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$AssetIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/components/AssetIcon.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$AssetIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/AssetIcon.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$AssetIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/packages/ui/src/components/NetworkIcon.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NetworkIcon",
    ()=>NetworkIcon
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const NetworkIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NetworkIcon() from the server but NetworkIcon is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/packages/ui/src/components/NetworkIcon.tsx", "NetworkIcon");
}),
"[project]/packages/ui/src/components/NetworkIcon.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NetworkIcon",
    ()=>NetworkIcon
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const NetworkIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NetworkIcon() from the server but NetworkIcon is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/packages/ui/src/components/NetworkIcon.tsx <module evaluation>", "NetworkIcon");
}),
"[project]/packages/ui/src/components/NetworkIcon.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$NetworkIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/components/NetworkIcon.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$NetworkIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/NetworkIcon.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$NetworkIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/packages/ui/src/components/WalletIcon.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletIcon",
    ()=>WalletIcon
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const WalletIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call WalletIcon() from the server but WalletIcon is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/packages/ui/src/components/WalletIcon.tsx", "WalletIcon");
}),
"[project]/packages/ui/src/components/WalletIcon.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletIcon",
    ()=>WalletIcon
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const WalletIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call WalletIcon() from the server but WalletIcon is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/packages/ui/src/components/WalletIcon.tsx <module evaluation>", "WalletIcon");
}),
"[project]/packages/ui/src/components/WalletIcon.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$WalletIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/components/WalletIcon.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$WalletIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/WalletIcon.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$WalletIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/packages/ui/src/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([], undefined, true);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$AssetIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/AssetIcon.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$NetworkIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/NetworkIcon.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$WalletIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/WalletIcon.tsx [app-rsc] (ecmascript)");
__turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$AssetIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$NetworkIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$WalletIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__);
}),
"[project]/packages/ui/src/index.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$AssetIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/AssetIcon.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$NetworkIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/NetworkIcon.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$WalletIcon$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/WalletIcon.tsx [app-rsc] (ecmascript)");
;
;
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__05xdf94._.js.map