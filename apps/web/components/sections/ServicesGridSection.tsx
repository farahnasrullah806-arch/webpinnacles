import type { ServicePage } from '@webpinnacles/contracts'
import { ServiceCard } from '@/components/ui/ServiceCard'

export function ServicesGridSection({ services }: { services: ServicePage[] }) {
  return (
    <section className="section-shell">
      <div className="container-web">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.8rem)', marginTop: 0 }}>
          The Growth Engine That Actually Converts
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 18,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              icon="⚡"
              title={service.title}
              description={service.subtitle}
              forWho={['Medical', 'Real Estate', 'Fitness', 'Home Services']}
              outcomes={[service.resultBadge, 'Appointment-driven ROI']}
              href={`/services/${service.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
