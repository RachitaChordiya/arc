import { Link, Navigate, useParams } from 'react-router-dom'
import { ImageCarousel } from '../components/ImageCarousel'
import {
  getCategoryLabel,
  getProjectById,
  getProjectVariant,
  type ProjectDetails,
} from '../data/projects'
import './ProjectPage.css'

type CopyBlock = {
  overview?: string
  details?: ProjectDetails
  highlights?: string[]
  credits?: string
}

function ProjectBody({ copy }: { copy: CopyBlock }) {
  const hasCopy =
    Boolean(copy.overview) ||
    Boolean(copy.details) ||
    Boolean(copy.highlights?.length) ||
    Boolean(copy.credits)

  if (!hasCopy) return null

  const overviewParagraphs = copy.overview
    ? copy.overview.split(/\n\n+/).filter(Boolean)
    : []

  return (
    <div className="project-page__body">
      {copy.details && (
        <section className="project-page__section">
          <h2 className="project-page__section-title">Project details</h2>
          <dl className="project-page__facts">
            <div>
              <dt>Location</dt>
              <dd>{copy.details.location}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{copy.details.year}</dd>
            </div>
            <div>
              <dt>Project type</dt>
              <dd>{copy.details.projectType}</dd>
            </div>
            {copy.details.siteArea && (
              <div>
                <dt>Site area</dt>
                <dd>{copy.details.siteArea}</dd>
              </div>
            )}
            <div>
              <dt>Status</dt>
              <dd>{copy.details.status}</dd>
            </div>
          </dl>
        </section>
      )}

      {overviewParagraphs.length > 0 && (
        <section className="project-page__section">
          <h2 className="project-page__section-title">Overview</h2>
          {overviewParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="project-page__prose">
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {copy.highlights && copy.highlights.length > 0 && (
        <section className="project-page__section">
          <h2 className="project-page__section-title">Design highlights</h2>
          <ul className="project-page__highlights">
            {copy.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {copy.credits && (
        <section className="project-page__section">
          <h2 className="project-page__section-title">Credits</h2>
          <p className="project-page__prose">{copy.credits}</p>
        </section>
      )}
    </div>
  )
}

export function ProjectPage() {
  const { id, variantId } = useParams<{ id: string; variantId?: string }>()
  const project = id ? getProjectById(id) : undefined

  if (!project) {
    return <Navigate to="/" replace />
  }

  const variant = variantId
    ? getProjectVariant(project.id, variantId)
    : undefined

  if (variantId && !variant) {
    return <Navigate to={`/project/${project.id}`} replace />
  }

  const variants = project.variants ?? []

  // Variant detail (e.g. Vaara bungalow)
  if (variant) {
    const gallery = variant.images?.length ? variant.images : [variant.image]

    return (
      <main className="project-page">
        <Link to={`/project/${project.id}`} className="project-page__back">
          ← Back to {project.title}
        </Link>

        <p className="project-page__category">
          {getCategoryLabel(project.category)}
        </p>
        <h1 className="project-page__title">{variant.label}</h1>
        {variant.tagline ? (
          <p className="project-page__lede">{variant.tagline}</p>
        ) : (
          <p className="project-page__subtitle">{project.title}</p>
        )}

        <ImageCarousel
          images={gallery}
          alt={variant.label}
          fit={variant.fit ?? project.fit}
        />

        <ProjectBody
          copy={{
            overview: variant.overview,
            details: variant.details,
            highlights: variant.highlights,
            credits: variant.credits,
          }}
        />
      </main>
    )
  }

  const projectGallery = project.images?.length
    ? project.images
    : [project.image]

  return (
    <main className="project-page">
      <Link to="/" className="project-page__back">
        ← Back to portfolio
      </Link>

      <p className="project-page__category">
        {getCategoryLabel(project.category)}
      </p>
      <h1 className="project-page__title">{project.title}</h1>
      <p className="project-page__lede">
        {project.tagline ?? project.subtitle}
      </p>

      {variants.length > 0 ? (
        <div className="project-page__variants-row">
          {variants.map((item) => (
            <Link
              key={item.id}
              to={`/project/${project.id}/${item.id}`}
              className="project-page__variant-card"
              aria-label={`View ${item.label}`}
            >
              <div className="project-page__variant-media">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <div className="project-page__variant-meta">
                <span className="project-page__variant-label">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <ImageCarousel
            images={projectGallery}
            alt={`${project.title} - ${project.subtitle}`}
            fit={project.fit}
          />
          <ProjectBody
            copy={{
              overview: project.overview,
              details: project.details,
              highlights: project.highlights,
              credits: project.credits,
            }}
          />
        </>
      )}
    </main>
  )
}
