import { motion } from 'framer-motion'
import comptoirLogo from '../assets/logos/comptoir-darna.png'
import azarLogo from '../assets/logos/azar.svg'
import florenceLogo from '../assets/logos/florence-darabie.jpeg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

type Brand = {
  name: string
  category: string
  address: string[]
  phone?: string
  website?: string
  websiteHref?: string
  email?: string
  logo: string
  // Comment afficher le logo selon son fond d'origine :
  // - 'transparent' : logo à fond transparent, s'affiche tel quel
  // - 'chip'         : logo clair (texte crème) qui a besoin d'un fond
  //                    sombre/coloré derrière lui pour rester lisible
  // - 'framed'       : image qui a déjà sa propre couleur de fond (photo
  //                    logo), on l'encadre proprement plutôt que de la
  //                    faire flotter comme les deux autres
  logoDisplay: 'transparent' | 'chip' | 'framed'
}

const darnaGroupBrands: Brand[] = [
  {
    name: 'Comptoir Darna',
    category: 'Restaurant & Club',
    address: ['Avenue Echouhada', 'Hivernage 40000', 'Marrakech - Maroc'],
    phone: '+212 (0) 5 24 43 77 02/10',
    website: 'comptoirmarrakech.com',
    websiteHref: 'https://comptoirmarrakech.com',
    email: 'contact@comptoirdarna.com',
    logo: comptoirLogo,
    logoDisplay: 'transparent',
  },
  {
    name: 'Azar',
    category: 'Restaurant',
    address: ['82 Rue Yougoslavie', '40000', 'Marrakech – Maroc'],
    phone: '+212 (0) 524 43 09 20',
    website: 'azarmarrakech.com',
    websiteHref: 'https://azarmarrakech.com',
    email: 'contact@azarmarrakech.com',
    logo: azarLogo,
    logoDisplay: 'chip',
  },
  {
    name: "Florence d'Arabie",
    category: 'Vintage Store',
    address: ['Residence Rekichou', 'Appt 1 Hivernage', '40000', 'Marrakech – Maroc'],
    phone: '+212 5 24 43 19 62',
    website: 'instagram.com/flodarabie',
    websiteHref: 'https://instagram.com/flodarabie',
    logo: florenceLogo,
    logoDisplay: 'framed',
  },
]

function BrandLogo({ brand }: { brand: Brand }) {
  if (brand.logoDisplay === 'chip') {
    return (
      <div className="h-20 flex items-center justify-center mb-6">
        <div className="bg-primary rounded-lg px-6 py-4 inline-flex items-center justify-center">
          <img src={brand.logo} alt={brand.name} className="h-10 w-auto object-contain" />
        </div>
      </div>
    )
  }

  if (brand.logoDisplay === 'framed') {
    return (
      <div className="h-20 flex items-center justify-center mb-6">
        <div className="h-20 w-20 rounded-lg overflow-hidden shadow-sm border border-primary/20">
          <img src={brand.logo} alt={brand.name} className="h-full w-full object-cover" />
        </div>
      </div>
    )
  }

  return (
    <div className="h-20 flex items-center justify-center mb-6">
      <img src={brand.logo} alt={brand.name} className="max-h-full max-w-[180px] object-contain" />
    </div>
  )
}

export default function DarnaGroupSection() {
  return (
    <section className="py-stack-lg bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <span className="font-label-sm text-primary uppercase tracking-widest block mb-2">
            Darna Group
          </span>
          <h2 className="font-display-lg text-3xl md:text-5xl text-on-surface mb-4">
            Adresses emblématiques de Marrakech
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {darnaGroupBrands.map((brand, i) => (
            <motion.div
              key={brand.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="bg-white rounded-xl border border-primary p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col text-center"
            >
              <BrandLogo brand={brand} />

              <h3 className="font-headline-md text-on-surface mb-1">{brand.name}</h3>
              <p className="font-label-lg text-primary uppercase tracking-widest text-xs mb-6">
                {brand.category}
              </p>

              <div className="space-y-3 text-left flex-1">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5" aria-hidden="true">
                    location_on
                  </span>
                  <p className="font-body-md text-on-surface-variant">
                    {brand.address.map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < brand.address.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>

                {brand.phone && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
                      call
                    </span>
                    <a
                      href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}
                      className="font-body-md text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {brand.phone}
                    </a>
                  </div>
                )}

                {brand.website && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
                      language
                    </span>
                    <a
                      href={brand.websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body-md text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {brand.website}
                    </a>
                  </div>
                )}

                {brand.email && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
                      mail
                    </span>
                    <a
                      href={`mailto:${brand.email}`}
                      className="font-body-md text-on-surface-variant hover:text-primary transition-colors break-all"
                    >
                      {brand.email}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}