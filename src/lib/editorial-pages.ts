export type EditorialSection = {
  body: string[]
  title: string
}

export type EditorialPage = {
  description: string
  eyebrow: string
  intro: string
  sections: EditorialSection[]
  slug: string
  title: string
}

export const editorialPages: EditorialPage[] = [
  {
    slug: "about",
    title: "About Calm Living",
    eyebrow: "About",
    description:
      "A gentle editorial home for people who want calmer spaces, slower rituals, and more beautiful everyday living.",
    intro:
      "Calm Living is a journal built for people who are not only decorating rooms, but shaping a feeling. We write for readers who want their homes to feel softer, their routines to feel more intentional, and their everyday environment to support rest, clarity, and warmth.",
    sections: [
      {
        title: "What we are building",
        body: [
          "This journal is growing into a standalone editorial world around cozy living. It brings together home ideas, calming rituals, small-space inspiration, ambient details, and practical guidance in one place that feels thoughtful rather than overwhelming.",
          "Our goal is to help readers create spaces and habits that feel emotionally restorative. That can mean a quieter bedroom, a better reading nook, a warmer evening routine, or simply a home that feels more like a refuge.",
        ],
      },
      {
        title: "Who it is for",
        body: [
          "We write for people who are drawn to comfort, peace, softness, elegance, and slowness. Some arrive through Pinterest searching for cozy decor or balcony ideas. Others come looking for rituals, ambient living, or ways to make small spaces feel more intentional.",
          "Wherever they begin, we want them to feel that they have entered a calm editorial space that understands what they are actually searching for: not just products, but a gentler way to live.",
        ],
      },
      {
        title: "What readers can expect",
        body: [
          "Expect articles that balance inspiration with usefulness. We focus on searchable, lived topics such as cozy home decor, bedroom comfort, reading corners, candle ambience, slow evenings, organization for calm spaces, and seasonal mood shifts.",
          "Everything we publish is meant to offer practical beauty: ideas that feel aspirational, but still achievable in real homes and real routines.",
        ],
      },
    ],
  },
  {
    slug: "editorial-philosophy",
    title: "Editorial Philosophy",
    eyebrow: "Editorial",
    description:
      "We believe a calm publication should feel like a trusted magazine: emotionally resonant, visually clear, and practically useful.",
    intro:
      "Our editorial philosophy comes from a simple idea: people are often searching for a feeling before they are searching for a product. They want comfort, emotional reset, warmth, softness, and beauty that fits into everyday life.",
    sections: [
      {
        title: "A calm editorial space, not a catalogue",
        body: [
          "Calm Living should feel like a curated world around a lifestyle aspiration. We do not want the journal to read like product spam, heavy sales copy, or disconnected trend chasing.",
          "Instead, we aim for gentle authority. The work should feel warm, useful, and emotionally coherent, like a magazine that helps readers imagine a better atmosphere and then shows them how to create it.",
        ],
      },
      {
        title: "Searchable, human, and beautifully structured",
        body: [
          "Because many readers discover us through Pinterest and search, our topics are chosen with clarity. We prefer human, searchable language over vague branding. Cozy bedroom inspiration, reading nook ideas, balcony styling, candle decor, evening rituals, and calm corners are all examples of how we think.",
          "Search intent matters, but so does tone. The journal should always feel soft and editorial, never mechanical.",
        ],
      },
      {
        title: "Inspiration should lead to trust",
        body: [
          "Every piece should do more than look good. It should help readers make progress. That might mean offering a checklist, a guide, a structured set of ideas, or a calmer way to think about their homes and routines.",
          "If our pages earn trust first, everything else follows more naturally: return visits, subscriptions, saves, and deeper reader loyalty.",
        ],
      },
    ],
  },
  {
    slug: "writing-process",
    title: "Writing Process",
    eyebrow: "Process",
    description:
      "Each article starts with a real lifestyle desire and is shaped into a piece that can work as both inspiration and a useful landing page.",
    intro:
      "Our writing process is influenced by how readers actually discover cozy living content online. Many arrive through Pinterest, where search behavior is specific and emotionally charged. That means we write with both discovery and depth in mind.",
    sections: [
      {
        title: "We begin with a searchable desire",
        body: [
          "Articles start from clear, human topics that people actively look for: cozy bedroom ideas, balcony corners, candle decor, evening routines, aesthetic home organization, and small-space comfort.",
          "These are not just keywords to us. They point to real needs: rest, comfort, beauty, calm, and a home that feels emotionally supportive.",
        ],
      },
      {
        title: "We shape each piece for usefulness",
        body: [
          "A strong article should support both inspiration and action. We look for formats that are naturally helpful, such as idea lists, guides, routines, checklists, and themed roundups.",
          "This allows each page to function well as a destination for pins while also standing on its own as a reader-friendly journal entry.",
        ],
      },
      {
        title: "We write for the long term",
        body: [
          "Rather than chasing short-lived content for clicks, we focus on pieces that can keep working over time. That means evergreen home ideas, repeatable rituals, seasonal mood shifts, and gentle guidance readers may return to more than once.",
          "The result should be a content library that feels calm, coherent, and durable.",
        ],
      },
    ],
  },
  {
    slug: "why-this-journal-exists",
    title: "Why This Journal Exists",
    eyebrow: "Purpose",
    description:
      "We created Calm Living to turn visual inspiration into a more meaningful reading experience around cozy spaces, soothing rituals, and practical beauty.",
    intro:
      "Many people discover cozy living through a pin, a saved image, or a quick mood search. But the feeling they want usually goes deeper than that. They are trying to create a home or routine that feels calmer, warmer, more elegant, and emotionally grounding.",
    sections: [
      {
        title: "We wanted a better destination than a single pin",
        body: [
          "Pinterest is a powerful visual search engine, but a saved image is only the beginning. We built this journal as a place where that initial spark of inspiration can turn into guidance, structure, and trust.",
          "Instead of stopping at aesthetic moodboards, readers can continue into articles, themed collections, and practical resources that help them act on what they are drawn to.",
        ],
      },
      {
        title: "We believe cozy living is bigger than decor",
        body: [
          "For us, cozy living includes rooms, rituals, lighting, organization, seasonal shifts, comfort, and the emotional texture of everyday life. It is about how spaces support the body and mind, and how small details change how a day feels.",
          "That is why this journal expands beyond decor into slow living, ambient evenings, thoughtful routines, and small-space beauty.",
        ],
      },
      {
        title: "We are building something readers can return to",
        body: [
          "This journal is designed to become both a landing page for Pinterest discovery and a standalone publication people revisit directly. We want it to feel like a calm editorial home with depth, not just a traffic page.",
          "If readers leave with one thing, it should be this: a sense that a softer, more intentional everyday life is possible, and that they have found a place that can help them build it.",
        ],
      },
    ],
  },
]

export function getEditorialPage(slug: string) {
  return editorialPages.find((page) => page.slug === slug)
}
