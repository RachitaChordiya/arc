export type Category = 'architecture' | 'interior' | 'landscape' | 'planning'

export type ImageFit = 'cover' | 'contain'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/** Bungalow / unit within a parent project (e.g. Vaara A08) */
export type ProjectVariant = {
  id: string
  label: string
  image: string
  /** Optional gallery shown on the variant detail page */
  images?: string[]
  tagline?: string
  overview?: string
  details?: ProjectDetails
  highlights?: string[]
  credits?: string
  fit?: ImageFit
  zoom?: number
  position?: string
}

export type ProjectDetails = {
  location: string
  year: string
  projectType: string
  status: string
  siteArea?: string
}

export type Project = {
  id: string
  title: string
  /** Short line on list cards */
  subtitle: string
  /** Longer hero sentence on the project page (falls back to subtitle) */
  tagline?: string
  category: Category
  image: string
  /** Optional horizontal gallery on the project page */
  images?: string[]
  /** Full project overview body */
  overview?: string
  details?: ProjectDetails
  highlights?: string[]
  credits?: string
  /** How the photo fills the fixed frame */
  fit: ImageFit
  /** CSS zoom relative to the frame (1 = 100%) */
  zoom: number
  /** object-position value */
  position: string
  /** Optional subtypes shown on the project page */
  variants?: ProjectVariant[]
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'architecture', label: 'Architecture' },
  { id: 'interior', label: 'Interior' },
  { id: 'landscape', label: 'Landscape' },
  { id: 'planning', label: 'Planning' },
]

export const projects: Project[] = [
  // Architecture  -  one Vaara residence with bungalow subtypes
  {
    id: 'arc-vaara',
    title: 'Vaara Residence',
    subtitle: 'Four bungalows',
    category: 'architecture',
    image: asset('images/projects/vaara-b08/1.png'),
    fit: 'cover',
    zoom: 1.05,
    position: 'center center',
    variants: [
      {
        id: 'a08',
        label: 'A08 Vaara',
        tagline:
          'A Vaastu-driven corner bungalow where a sloping roof, open-plan living and landscape shape a fluid domestic sequence.',
        image: asset('images/projects/vaara-a08/1.png'),
        images: [
          asset('images/projects/vaara-a08/1.png'),
          asset('images/projects/vaara-a08/2.png'),
          asset('images/projects/vaara-a08/3.png'),
          asset('images/projects/vaara-a08/4.png'),
          asset('images/projects/vaara-a08/5.png'),
          asset('images/projects/vaara-a08/6.png'),
          asset('images/projects/vaara-a08/7.png'),
          asset('images/projects/vaara-a08/first-floor-plan.jpg'),
          asset('images/projects/vaara-a08/ground-floor-plan.jpg'),
        ],
        overview:
          'A08 is a residence at Vaara, Bhor, Pune, situated on a linear corner plot with roads along two sides. The design is shaped by the site’s elongated geometry and follows Vaastu principles while maintaining an open and contemporary spatial character.\n\nThe sloping roof establishes the primary architectural expression of the front elevation, complemented by a semi-circular standing balcony that projects from the first floor. At ground level, an arched entrance marks the threshold into a continuous sequence of living, dining and landscape. Rather than dividing these spaces with internal walls, the plan allows them to flow towards the rear garden, where a pool and outdoor seating extend the domestic spaces into the landscape.\n\nThe kitchen occupies the south-east, while the ground-floor bedroom is positioned in the south-west. A staircase along the southern edge leads to a family space above, from which three bedrooms branch out. Each bedroom is paired with an attached bathroom and balcony, creating a balance between shared openness and private retreat.',
        details: {
          location: 'Bhor, Pune',
          year: '2026',
          projectType: 'Residential Bungalow',
          siteArea: '4141 sq.ft.',
          status: 'Proposed',
        },
        highlights: [
          'Architecture shaped by the corner site  -  With roads along two edges, the corner plot allows the residence to address more than one direction. The elongated geometry informs the linear organisation of the interiors and the relationship between the front and rear landscape.',
          'A distinctive roofline  -  The sloping roof becomes the defining element of the front elevation, giving the bungalow a strong silhouette. A projecting semi-circular standing balcony interrupts the roof mass, introducing a contrasting geometric gesture.',
          'The arched threshold  -  An arch frames the principal entrance at ground level, creating a recognisable threshold between the street and the interior. The curved opening establishes a softer architectural language against the larger roof form.',
          'An uninterrupted ground-floor landscape  -  Living, dining and the backyard are conceived as one continuous spatial field. The absence of unnecessary partitions allows the ground floor to remain flexible, with the pool and outdoor seating becoming extensions of the interior rather than separate destinations.',
          'Vaastu integrated into the plan  -  The spatial arrangement responds to Vaastu principles without compromising the openness of the house. The kitchen occupies the south-east, the principal ground-floor bedroom sits towards the south-west, and the staircase is positioned along the south, while the upper level accommodates a family space and three private bedroom suites.',
        ],
      },
      {
        id: 'a46',
        label: 'A46 Vaara',
        tagline:
          'A linear bungalow in Bhor, Pune, conceived as a continuous sequence of volumes, where movement, landscape and light bind the home together.',
        image: asset('images/projects/vaara-a46/1.png'),
        images: [
          asset('images/projects/vaara-a46/1.png'),
          asset('images/projects/vaara-a46/2.png'),
          asset('images/projects/vaara-a46/3.png'),
          asset('images/projects/vaara-a46/4.png'),
          asset('images/projects/vaara-a46/5.png'),
          asset('images/projects/vaara-a46/6.png'),
          asset('images/projects/vaara-a46/7.png'),
          asset('images/projects/vaara-a46/first-floor-plan.jpg'),
          asset('images/projects/vaara-a46/ground-floor-plan.jpg'),
        ],
        overview:
          'A46 is a residence at Vaara in Bhor, Pune, conceived around the idea of a continuous spatial sequence within a linear plot. Rather than dividing the house into discrete rooms, the plan establishes a gradual transition from the front yard to the living, dining, kitchen and rear landscape.\n\nThe entrance opens into a generous double-height living space, establishing the principal volume of the house. Beyond it, the dining area is subtly stepped up, creating a change in level while maintaining visual continuity. An open steel staircase occupies the space between living and dining, functioning simultaneously as circulation and as a porous architectural element.\n\nThe sequence extends towards the rear garden, where a lap pool and sit-out become an extension of the interior. Above, a family space overlooks the living room and forms a shared threshold to three bedrooms. With one bedroom at ground level and three above, each bedroom is conceived as a private suite with an attached bathroom and balcony.',
        details: {
          location: 'Bhor, Pune',
          year: '2026',
          projectType: 'Residential Bungalow',
          siteArea: '4160 sq.ft.',
          status: 'Proposed',
        },
        highlights: [
          'A continuous spatial axis  -  The linearity of the plot becomes the organising principle of the house. Front yard, living, staircase, dining and rear landscape unfold along a single connected sequence rather than as isolated rooms.',
          'The double-height living volume  -  The living room forms the spatial heart of the residence. Its generous vertical volume brings light into the centre of the plan while establishing visual connections with the family space above.',
          'An open staircase as a porous threshold  -  Positioned between the living and dining areas, the steel staircase is deliberately kept open. It becomes more than circulation - allowing views, light and movement to pass through and visually tying the two levels together.',
          'Interior extending into landscape  -  The spatial sequence culminates in the rear garden, where the lap pool and sit-out operate as an extension of the living and dining spaces. The relationship between built and unbuilt is therefore experienced as a continuous transition.',
          'Private rooms around a shared family space  -  Three first-floor bedrooms are organised around an open family space overlooking the living room below. Together with the ground-floor bedroom, each suite includes an attached bathroom and balcony, balancing privacy with connection to the larger house.',
        ],
      },
      {
        id: 'b08',
        label: 'B08 Vaara',
        tagline: 'A residential bungalow at Vaara, Bhor, Pune.',
        image: asset('images/projects/vaara-b08/1.png'),
        images: [
          asset('images/projects/vaara-b08/1.png'),
          asset('images/projects/vaara-b08/2.png'),
          asset('images/projects/vaara-b08/3.png'),
          asset('images/projects/vaara-b08/4.png'),
          asset('images/projects/vaara-b08/5.png'),
          asset('images/projects/vaara-b08/6.png'),
          asset('images/projects/vaara-b08/first-floor-plan.jpg'),
          asset('images/projects/vaara-b08/ground-floor-plan.jpg'),
        ],
        details: {
          location: 'Bhor, Pune',
          year: '2026',
          projectType: 'Residential Bungalow',
          status: 'Proposed',
        },
      },
      {
        id: 'b66',
        label: 'B66 Vaara',
        tagline:
          'A Mediterranean-inspired luxury bungalow where stone, lime plaster, landscape, and light create a seamless indoor-outdoor living experience.',
        image: asset('images/projects/vaara-b66/1.png'),
        images: [
          asset('images/projects/vaara-b66/1.png'),
          asset('images/projects/vaara-b66/2.png'),
          asset('images/projects/vaara-b66/3.png'),
          asset('images/projects/vaara-b66/4.png'),
          asset('images/projects/vaara-b66/5.png'),
          asset('images/projects/vaara-b66/first-floor-plan.jpg'),
          asset('images/projects/vaara-b66/ground-floor-plan.jpg'),
        ],
        overview:
          'Residence B66 at VAARA in Bhor, Pune is envisioned as a luxurious Mediterranean-style bungalow that blends timeless architectural character with a contemporary approach to indoor-outdoor living. The architecture combines a natural stone façade with textured lime plaster, creating a warm, earthy material palette that sits harmoniously within its landscaped setting.\n\nThe front yard establishes the arrival experience with a pergola, landscaped pockets, and outdoor seating that visually connects to the living spaces and lap pool deck. At the heart of the home, the double-height living and dining area becomes a light-filled social space, incorporating indoor landscape and opening seamlessly towards the outdoors through large sliding glass doors.\n\nThe bungalow accommodates four bedrooms - two on the ground floor and two on the first floor - each designed as a private suite with an attached walk-inwardrobe, toilet, and balcony/sit-out overlooking landscaped surroundings.',
        details: {
          location: 'Bhor, Pune',
          year: '2026',
          projectType: 'Residential Bungalow',
          siteArea: '3804.61 sq.ft.',
          status: 'Proposed',
        },
        highlights: [
          'Seamless indoor-outdoor connection  -  The double-height living and dining space opens directly towards the landscaped exterior and lap pool deck through large sliding glass doors.',
          'Private bedroom suites  -  All four bedrooms feature attached walk-in wardrobes and toilets, along with individual balconies/sit-out spaces that extend the private living experience outdoors.',
          'Double-height social core  -  The living and dining area forms the spatial heart of the bungalow, while the first-floor family seating overlooks this volume, creating visual connectivity between both floors.',
          'Distinctive first-floor balcony  -  A semi-circular standing balcony faces the main road, introducing a sculptural architectural element and creating a prominent feature on the façade.',
        ],
      },
    ],
  },

  // Interior
  {
    id: 'int-master-bedroom',
    title: 'The Master Bedroom',
    subtitle: 'Residential Interior · Shirpur',
    tagline:
      'A contemporary luxury bedroom designed with warm materials, integrated storage, ambient lighting, and a refined palette that creates a calm and elegant personal retreat.',
    category: 'interior',
    image: asset('images/projects/master-bedroom/1.png'),
    images: [
      asset('images/projects/master-bedroom/1.png'),
      asset('images/projects/master-bedroom/2.png'),
      asset('images/projects/master-bedroom/3.png'),
      asset('images/projects/master-bedroom/4.png'),
      asset('images/projects/master-bedroom/5.png'),
      asset('images/projects/master-bedroom/6.png'),
      asset('images/projects/master-bedroom/7.png'),
    ],
    overview:
      'Serene Haven Bedroom is a contemporary residential interior designed to create a sophisticated and tranquil private retreat. The design embraces clean architectural lines, warm wood finishes, soft neutral tones, and layered lighting to achieve a refined yet inviting atmosphere. A defining feature of the project was addressing the presence of two internal doors in addition to the main bedroom entrance. Rather than allowing these openings to interrupt the visual composition, both doors were seamlessly integrated into the feature wall paneling, creating a continuous architectural surface that enhances the room’s sense of order and elegance. Complemented by bespoke furniture, subtle textures, and premium finishes, the design balances functionality with understated luxury. A carefully curated material palette and meticulous detailing result in a timeless bedroom that offers comfort, visual harmony, and an elevated everyday living experience.',
    details: {
      location: 'Shirpur',
      year: '2026',
      projectType: 'Residential Interior',
      status: 'Completed',
    },
    highlights: [
      'Two internal doors were seamlessly integrated into the feature wall paneling, concealing them within the design to achieve a clean, uninterrupted elevation.',
      'Contemporary bedroom designed with a warm neutral palette that creates a calm and welcoming atmosphere.',
      'Spacious walk-in wardrobe planned for efficient organization while maintaining a luxurious aesthetic.',
      'Layered ambient lighting and premium material finishes enhance depth, comfort, and the overall spatial experience.',
    ],
    fit: 'cover',
    zoom: 1.08,
    position: 'center center',
  },
  {
    id: 'int-surana-residence',
    title: 'The Surana Residence',
    subtitle: 'Residential Interior · Shirpur',
    tagline:
      'A contemporary residential interior designed to create warm, elegant, and highly functional living and kitchen spaces with refined detailing.',
    category: 'interior',
    image: asset('images/projects/surana-residence/1.png'),
    images: [
      asset('images/projects/surana-residence/1.png'),
      asset('images/projects/surana-residence/2.png'),
      asset('images/projects/surana-residence/3.png'),
      asset('images/projects/surana-residence/4.png'),
      asset('images/projects/surana-residence/5.png'),
      asset('images/projects/surana-residence/6.png'),
    ],
    overview:
      'Connected Living is a residential interior design project focused on creating elegant, functional, and contemporary living and kitchen spaces. The design emphasizes a seamless balance between aesthetics and practicality through efficient space planning, custom furniture layouts, and thoughtfully designed ceiling compositions. The living area is envisioned as a warm and inviting social space that encourages interaction while maintaining visual sophistication, whereas the kitchen is designed to optimize workflow and everyday functionality with clean, modern detailing. A cohesive palette of materials, finishes, and integrated lighting enhances the overall spatial experience, creating interiors that are both timeless and refined.',
    details: {
      location: 'Shirpur',
      year: '2026',
      projectType: 'Residential Interior',
      status: 'Completed',
    },
    highlights: [
      'Contemporary residential interiors designed with a balance of functionality and visual elegance.',
      'Detailed furniture planning to optimize movement, comfort, and spatial efficiency.',
      'Custom ceiling design integrated with lighting to enhance ambience.',
      'Unified material and colour palette creating continuity between living and kitchen spaces.',
    ],
    fit: 'cover',
    zoom: 1.08,
    position: 'center center',
  },
  {
    id: 'int-shrichand-jain',
    title: 'Shrichand Jain Residence',
    subtitle: 'Residential Interior · Shirpur',
    tagline:
      'Contemporary interiors shaped through clean lines, warm finishes, and thoughtfully crafted everyday spaces.',
    category: 'interior',
    image: asset('images/projects/shrichand-jain/living-1.png'),
    images: [
      asset('images/projects/shrichand-jain/living-1.png'),
      asset('images/projects/shrichand-jain/kitchen-1.png'),
      asset('images/projects/shrichand-jain/kitchen-2.png'),
      asset('images/projects/shrichand-jain/bd1_1.png'),
      asset('images/projects/shrichand-jain/bd1_2.png'),
      asset('images/projects/shrichand-jain/bd1_3.png'),
      asset('images/projects/shrichand-jain/bd2_1.png'),
      asset('images/projects/shrichand-jain/bd2_2.png'),
      asset('images/projects/shrichand-jain/bd2_3.png'),
    ],
    overview:
      'Shrichand Jain Residence is a contemporary residential interior project designed to create refined, comfortable, and highly functional living spaces for modern family life. The design encompasses the living room, kitchen, and bedrooms, each developed with a cohesive visual language that emphasizes clean architectural detailing, warm neutral tones, and thoughtfully integrated lighting. A restrained material palette of laminates, stone finishes, and textured wall treatments creates depth while maintaining visual calm throughout the home. Every space has been planned to balance aesthetics with practicality, ensuring efficient storage, seamless circulation, and everyday comfort. The result is an interior that feels sophisticated yet inviting, where carefully composed proportions, elegant finishes, and subtle design elements work together to deliver a timeless residential environment.',
    details: {
      location: 'Shirpur',
      year: '2026',
      projectType: 'Residential Interior',
      status: 'Ongoing',
    },
    highlights: [
      'A cohesive contemporary design language connects all living spaces through a consistent palette of warm neutrals, elegant finishes, and clean architectural lines.',
      'Layered lighting is integrated into ceilings and feature elements to enhance spatial depth and create a refined ambience.',
      'Functional storage solutions are seamlessly incorporated into the furniture design, maximizing usability while maintaining visual simplicity.',
      'Bedrooms are personalized through feature walls, textured finishes, and integrated wardrobes, creating calm and luxurious private spaces.',
    ],
    fit: 'cover',
    zoom: 1.05,
    position: 'center center',
  },

  // Landscape
  {
    id: 'lan-site-plan',
    title: 'Landscape',
    subtitle: 'Site Plan',
    category: 'landscape',
    image: asset('images/landscape.png'),
    fit: 'contain',
    zoom: 1,
    position: 'center center',
  },
]

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getProjectVariant(
  projectId: string,
  variantId: string,
): ProjectVariant | undefined {
  return getProjectById(projectId)?.variants?.find((v) => v.id === variantId)
}

export function getCategoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.id === category)?.label ?? category
}
