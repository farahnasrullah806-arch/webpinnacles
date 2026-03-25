import {
  seedBlogPosts,
  seedCaseStudies,
  seedCategories,
  seedFaqs,
  seedPages,
  seedServicePages,
  seedTestimonials,
  seedUsers,
} from './seeds'

async function run() {
  // This scaffold uses in-memory repositories for local bootstrap.
  // Replace with Drizzle insert statements when wiring a live database.
  // eslint-disable-next-line no-console
  console.log('Seed summary:')
  // eslint-disable-next-line no-console
  console.log({
    users: seedUsers.length,
    pages: seedPages.length,
    servicePages: seedServicePages.length,
    blogPosts: seedBlogPosts.length,
    categories: seedCategories.length,
    caseStudies: seedCaseStudies.length,
    faqs: seedFaqs.length,
    testimonials: seedTestimonials.length,
  })
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
