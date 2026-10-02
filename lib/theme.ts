
export const theme = {
    card: {
        surface:
            "bg-white! border-violet-100! shadow-sm! hover:border-violet-300! hover:shadow-xl! hover:shadow-violet-200/60!",
        imageWrap: "bg-violet-50!",
    },

    badge: {
        category: "bg-white/90! text-violet-700! border! border-violet-100!",
        topRated: "bg-amber-400! text-amber-950!",
    },

    text: {
        title: "text-slate-900! hover:text-violet-600!",
        price: "text-violet-700!",
        muted: "text-slate-500!",
        rating: "text-slate-700!",
        ratingCount: "text-slate-400!",
    },

    star: {
        filled: "text-amber-400!",
        empty: "text-slate-300!",
    },

    button: {
        primary:
            "bg-violet-500! text-white! hover:bg-violet-600! hover:shadow-md! hover:shadow-violet-500/30!",
        inCart:
            "bg-violet-100! text-violet-800! border! border-violet-200! hover:border-violet-400!",
        success: "bg-emerald-600! text-white! shadow-md! shadow-emerald-600/30!",
        focusRing: "focus-visible:ring-violet-500!",
    },
    header: {
        bar: "bg-white/90! border-violet-100! shadow-sm! shadow-violet-100/50!",
        logo: "text-violet-700!",
        logoMark: "bg-violet-500! text-white!",
        link: "text-slate-600! hover:text-violet-700! hover:bg-violet-50!",
        linkActive: "text-violet-700! bg-violet-100!",
        cartBadge: "bg-violet-500! text-white! ring-2! ring-white!",
    },

    footer: {
        surface: "bg-violet-950! border-violet-900!",
        brand: "text-white!",
        heading: "text-violet-200!",
        text: "text-violet-300/80!",
        link: "text-violet-300/80! hover:text-white!",
        divider: "border-violet-900!",
        copyright: "text-violet-400!",
        totalsCard: "bg-violet-900/60! border-violet-800! text-violet-100!",
        totalsValue: "text-white!",
    },
    miniCart: {
        panel: "bg-white! border-violet-100! shadow-violet-200/50!",
        header: "bg-violet-500!",
        headerToggle: "bg-white/15! text-white! hover:bg-white/25!",
        headerTitle: "text-white!",
        headerBadge: "bg-white/20! text-white!",
        list: "divide-violet-50!",
        row: "hover:bg-violet-50!",
        itemName: "text-slate-900!",
        itemMeta: "text-slate-500!",
        qty: "bg-violet-100! text-violet-800!",
        footer: "bg-violet-50! border-violet-100!",
        totalLabel: "text-slate-500!",
        totalValue: "text-violet-700!",
        cta: "bg-violet-500! text-white! hover:bg-violet-600! hover:shadow-md! hover:shadow-violet-500/30!",
        fab: "bg-violet-500! text-white! shadow-violet-500/40! hover:bg-violet-600!",
        fabDot: "text-white/50!",
    },
} as const;