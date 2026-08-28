(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/shared/src/assets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/src/components/AssetIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssetIcon",
    ()=>AssetIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$tokens$2f$TokenEURC$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TokenEURC$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@web3icons+react@4.1.21_react@19.2.3/node_modules/@web3icons/react/dist/icons/tokens/TokenEURC.js [app-client] (ecmascript) <export default as TokenEURC>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$tokens$2f$TokenSOL$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TokenSOL$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@web3icons+react@4.1.21_react@19.2.3/node_modules/@web3icons/react/dist/icons/tokens/TokenSOL.js [app-client] (ecmascript) <export default as TokenSOL>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$tokens$2f$TokenSUI$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TokenSUI$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@web3icons+react@4.1.21_react@19.2.3/node_modules/@web3icons/react/dist/icons/tokens/TokenSUI.js [app-client] (ecmascript) <export default as TokenSUI>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$tokens$2f$TokenUSDC$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TokenUSDC$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@web3icons+react@4.1.21_react@19.2.3/node_modules/@web3icons/react/dist/icons/tokens/TokenUSDC.js [app-client] (ecmascript) <export default as TokenUSDC>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/assets.ts [app-client] (ecmascript)");
'use client';
;
;
;
const EXTERNAL_ICONS = {
    SOL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$tokens$2f$TokenSOL$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TokenSOL$3e$__["TokenSOL"],
    USDC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$tokens$2f$TokenUSDC$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TokenUSDC$3e$__["TokenUSDC"],
    EURC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$tokens$2f$TokenEURC$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TokenEURC$3e$__["TokenEURC"],
    SUI: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$tokens$2f$TokenSUI$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TokenSUI$3e$__["TokenSUI"]
};
function AssetIcon({ asset, size = 32, detailed = false, detailedPwrc = false, className, style }) {
    const definition = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POWERPAY_ASSET_VISUALS"][asset];
    if (definition.source === 'powerpay-owned') {
        const useDetailed = (detailed || detailedPwrc) && size >= (definition.minDetailedImagePx ?? 40);
        const src = useDetailed && definition.image ? definition.image : definition.icon;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: `${definition.name} (${asset})`,
            width: size,
            height: size,
            className: className,
            style: {
                objectFit: 'contain',
                ...style
            }
        }, void 0, false, {
            fileName: "[project]/packages/ui/src/components/AssetIcon.tsx",
            lineNumber: 31,
            columnNumber: 12
        }, this);
    }
    const Icon = EXTERNAL_ICONS[asset];
    if (!Icon) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-label": `${asset} icon`,
        children: asset.slice(0, 1)
    }, void 0, false, {
        fileName: "[project]/packages/ui/src/components/AssetIcon.tsx",
        lineNumber: 34,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
        size: size,
        variant: "branded",
        className: className
    }, void 0, false, {
        fileName: "[project]/packages/ui/src/components/AssetIcon.tsx",
        lineNumber: 35,
        columnNumber: 10
    }, this);
}
_c = AssetIcon;
var _c;
__turbopack_context__.k.register(_c, "AssetIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/src/components/NetworkIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NetworkIcon",
    ()=>NetworkIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$networks$2f$NetworkSolana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NetworkSolana$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@web3icons+react@4.1.21_react@19.2.3/node_modules/@web3icons/react/dist/icons/networks/NetworkSolana.js [app-client] (ecmascript) <export default as NetworkSolana>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$networks$2f$NetworkSui$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NetworkSui$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@web3icons+react@4.1.21_react@19.2.3/node_modules/@web3icons/react/dist/icons/networks/NetworkSui.js [app-client] (ecmascript) <export default as NetworkSui>");
'use client';
;
;
function NetworkIcon({ network, size = 32 }) {
    return network === 'solana' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$networks$2f$NetworkSolana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NetworkSolana$3e$__["NetworkSolana"], {
        size: size,
        variant: "branded"
    }, void 0, false, {
        fileName: "[project]/packages/ui/src/components/NetworkIcon.tsx",
        lineNumber: 7,
        columnNumber: 33
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$web3icons$2b$react$40$4$2e$1$2e$21_react$40$19$2e$2$2e$3$2f$node_modules$2f40$web3icons$2f$react$2f$dist$2f$icons$2f$networks$2f$NetworkSui$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NetworkSui$3e$__["NetworkSui"], {
        size: size,
        variant: "branded"
    }, void 0, false, {
        fileName: "[project]/packages/ui/src/components/NetworkIcon.tsx",
        lineNumber: 7,
        columnNumber: 83
    }, this);
}
_c = NetworkIcon;
var _c;
__turbopack_context__.k.register(_c, "NetworkIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/src/components/WalletIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletIcon",
    ()=>WalletIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_supports-color@10.2.2__@types+node@24.13.3_babel-plugin-_2a2f8afe5838bb866382faf43b03b137/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/assets.ts [app-client] (ecmascript)");
'use client';
;
;
function WalletIcon({ wallet, size = 32 }) {
    const definition = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POWERPAY_WALLET_VISUALS"][wallet];
    const src = wallet === 'phantom' ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POWERPAY_PUBLIC_ASSETS"].wallets.phantom : wallet === 'solflare' ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POWERPAY_PUBLIC_ASSETS"].wallets.solflare : wallet === 'backpack' ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POWERPAY_PUBLIC_ASSETS"].wallets.backpack : __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POWERPAY_PUBLIC_ASSETS"].wallets.walletConnect;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$10$2e$2$2e$2_$5f40$types$2b$node$40$24$2e$13$2e$3_babel$2d$plugin$2d$_2a2f8afe5838bb866382faf43b03b137$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: src,
        alt: `${definition.name} wallet`,
        width: size,
        height: size
    }, void 0, false, {
        fileName: "[project]/packages/ui/src/components/WalletIcon.tsx",
        lineNumber: 13,
        columnNumber: 10
    }, this);
}
_c = WalletIcon;
var _c;
__turbopack_context__.k.register(_c, "WalletIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_0h0nqrb._.js.map