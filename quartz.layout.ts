import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const explorerOpts = {
  title: "🗂️ Activités",
  folderDefaultState: "open" as const,
  folderClickBehavior: "link" as const,
  mapFn: (node: any) => {
    const labels: Record<string, string> = {
      en: "🇬🇧 English",
      fr: "🇫🇷 Français",
      "simple-morse-guide": "� Morse Chat (beginner)",
      "receiver-guide": "📻 Morse Receiver (advanced)",
      "sender-guide": "📡 Morse Sender (advanced)",
      "kids-guide": "📖 Morse Extra",
      "impression-3d": "🖨️ Impression 3D",
      "simple-morse-guide-fr": "💬 Morse Chat (débutant)",
      "receiver-guide-fr": "📻 Morse Récepteur (avancé)",
      "sender-guide-fr": "📡 Morse Émetteur (avancé)",
      "kids-guide-fr": "📖 Morse Extra",
      "microbit-stem-day": "📋 Détails supplémentaires",
    }
    const seg = node.slugSegment
    if (seg && labels[seg]) {
      node.displayName = labels[seg]
    }
  },
  sortFn: (a: any, b: any) => {
    const segA = a.slugSegment ?? ""
    const segB = b.slugSegment ?? ""

    // Folders first
    if (a.isFolder && !b.isFolder) return -1
    if (!a.isFolder && b.isFolder) return 1

    // Programs/reference last among files
    if (segA === "impression-3d") return 1
    if (segB === "impression-3d") return -1

    // fr before en among folders
    if (segA === "fr" && segB === "en") return -1
    if (segA === "en" && segB === "fr") return 1

    // Within a language folder: morse-chat → receiver → sender → kids → 3d
    const order = [
      "simple-morse-guide",
      "receiver-guide",
      "sender-guide",
      "kids-guide",
      "impression-3d",
      "simple-morse-guide-fr",
      "receiver-guide-fr",
      "sender-guide-fr",
      "kids-guide-fr",
      "microbit-stem-day",
    ]
    const idxA = order.indexOf(segA)
    const idxB = order.indexOf(segB)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1

    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
  filterFn: (node: any) => node.slugSegment !== "tags",
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "microbit.org": "https://microbit.org/",
      MakeCode: "https://makecode.microbit.org/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(explorerOpts),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(explorerOpts),
  ],
  right: [],
}
