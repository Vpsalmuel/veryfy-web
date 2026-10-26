import articleVerify from '../assets/learn/article-verify.png'
import articleRegistration from '../assets/learn/article-registration.png'
import articleTricks from '../assets/learn/article-tricks.png'
import articleSafe from '../assets/learn/article-safe.png'
import articleShopping from '../assets/learn/article-shopping.png'
import articleOnline from '../assets/learn/article-online.png'
import detailHero from '../assets/learn/detail-hero.png'

export type Category = 'counterfeit' | 'verification' | 'safety' | 'sources' | 'tips'

export const categories: { id: 'all' | Category; label: string; tag?: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'counterfeit', label: 'Counterfeit awareness', tag: 'COUNTERFEIT AWARENESS' },
  { id: 'verification', label: 'Verification guides', tag: 'VERIFICATION GUIDES' },
  { id: 'safety', label: 'Product safety', tag: 'PRODUCT SAFETY' },
  { id: 'sources', label: 'Trusted sources', tag: 'TRUSTED SOURCES' },
  { id: 'tips', label: 'Tips', tag: 'TIPS' },
]

export type Article = {
  slug: string
  title: string
  summary: string
  category: Category
  minutes: number
  image: string
  /** Detail-page content; only articles with a design have it */
  body?: {
    subtitle: string
    kind: string
    hero: string
    intro: { title: string; text: string }
    points: { title: string; text: string }[]
  }
}

// Card summaries are the placeholder copy from the design.
const summary = 'A step-by-step guide to using HiddenMark and Uni-Code to authenticate products.'

export const articles: Article[] = [
  { slug: 'how-to-verify-a-product', title: 'How to verify a product with Veryfy', summary, category: 'verification', minutes: 6, image: articleVerify },
  { slug: 'understanding-product-registration', title: 'Understanding product registration', summary, category: 'sources', minutes: 6, image: articleRegistration },
  {
    slug: 'common-counterfeit-tricks',
    title: 'Common counterfeit tricks to watch out for',
    summary,
    category: 'counterfeit',
    minutes: 4,
    image: articleTricks,
    body: {
      subtitle: 'Learn to recognize the warning signs of counterfeit products before you buy',
      kind: 'Product safety guideline',
      hero: detailHero,
      intro: {
        title: 'Know what to look out for',
        text: 'Counterfeit products can look remarkably similar to genuine ones. Paying attention to a few details can help you spot potential warning signs and make safer purchasing decisions.',
      },
      points: [
        {
          title: 'Misleading packaging',
          text: "Look closely at spelling, print quality, logos, seals and packaging that differs from the manufacturer's official presentation. Blurry text, incorrect logos or missing information can be red flags.",
        },
        {
          title: 'Suspiciously low prices',
          text: 'A price that seems too good to be true usually is. Counterfeit products are often sold at unusually low prices, especially on unofficial websites, social media or by unverified sellers.',
        },
        {
          title: 'Unverified sellers',
          text: "Check the seller's reputation and look for authorised retailers or official purchasing channels where possible. Be cautious of new or unknown sellers, especially those without verifiable contact details.",
        },
        {
          title: 'Missing or questionable codes',
          text: "Many genuine products have security features such as QR codes, batch numbers or holograms. If a code is missing, looks altered or doesn't verify, it may be counterfeit.",
        },
      ],
    },
  },
  { slug: 'are-your-products-safe', title: 'Are your products safe to use?', summary, category: 'safety', minutes: 5, image: articleSafe },
  { slug: 'smart-shopping-tips', title: 'Smart shopping tips', summary, category: 'tips', minutes: 3, image: articleShopping },
  { slug: 'shop-safely-online', title: 'How to shop safely online', summary, category: 'counterfeit', minutes: 4, image: articleOnline },
]

export const categoryTag = (c: Category) => categories.find((x) => x.id === c)?.tag ?? ''

export type SortKey = 'relevant' | 'shortest' | 'az'
export const sortOptions: { id: SortKey; label: string }[] = [
  { id: 'relevant', label: 'Most relevant' },
  { id: 'shortest', label: 'Shortest read' },
  { id: 'az', label: 'A–Z' },
]

export function sortArticles(list: Article[], sort: SortKey) {
  if (sort === 'shortest') return [...list].sort((a, b) => a.minutes - b.minutes)
  if (sort === 'az') return [...list].sort((a, b) => a.title.localeCompare(b.title))
  return list
}
