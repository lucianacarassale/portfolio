/* =========================================================
   DATOS DEL SITIO — este es el único archivo que tenés que
   editar para cambiar textos, contacto y proyectos.
   ========================================================= */

window.SITE = {
  name: 'luciana carassale',
  email: 'lucianacarassale@gmail.com',
  instagram: '',          // ej: 'lucianacarassale' (sin @)
  linkedin: 'https://www.linkedin.com/in/lucianacarassale/',
  cvFile: 'cv/Luciana-Carassale-CV.pdf',   // poné tu CV en PDF en la carpeta cv/ con este nombre
  agency: { name: 'newcycle', url: 'https://www.instagram.com/newcycle/' },
  year: 2026
};

/*
  PROYECTOS — el orden de esta lista es el orden de la web.

  Cada proyecto:
    slug     → nombre corto para la URL (sin espacios ni acentos)
    title    → nombre del proyecto
    collab   → colaboración (se muestra como "título  |  collab"); dejalo '' si no hay
    client   → marca
    role     → rol (va entre corchetes)
    tone     → color de relleno mientras no haya imagen
    cover    → imagen de portada (grilla + fondo al pasar el mouse)
    hero     → imagen o video .mp4 de arriba de todo en la página del proyecto
               (si lo dejás vacío usa la portada)
    gallery  → bloques de la galería, en orden. Tipos:
                 { type: 'full',       src: 'images/projects/badbo/03.jpg' }        ancho completo
                 { type: 'wide',       src: '...' }                                  ancha con márgenes
                 { type: 'pair',       src: ['...', '...'] }                         dos fotos con márgenes
                 { type: 'pair-bleed', src: ['...', '...'] }                         dos fotos de borde a borde
                 { type: 'single',     src: '...' }                                  una foto vertical sola, centrada

  IMÁGENES AUTOMÁTICAS: si cover, hero y gallery están vacíos, se usan las fotos de
  la carpeta del proyecto (images/projects/01 ..., 02 ...) — el número de la carpeta
  es la posición en esta lista. Corré "Actualizar imágenes" después de agregar fotos.
  Si completás gallery a mano acá, eso tiene prioridad sobre lo automático.

  LAYOUT (la forma más fácil de ordenar a mano): una lista de bloques con los
  números de las fotos de la carpeta. El 01 siempre va arriba de todo.
    'completa 02'             una foto o video a todo el ancho
    'fila 03 04 05'           2 o 3 fotos pegadas, una al lado de la otra
    'enmarcada 06'            una o más fotos centradas con margen (fondo blanco)
    'enmarcada 06 07 negro'   lo mismo, con fondo negro (o un color: #1E1E1E)
  Ejemplo:  layout: ['fila 02 03 04', 'enmarcada 05 negro', 'completa 06'],
  Las fotos que no pongas en el layout no se muestran.
  Si el layout usa la 01 (ej: 'fila 01 02'), esa fila reemplaza a la imagen de arriba.
  Para recortar una foto a otra proporción: '01:1.6' (ancho dividido alto; 1.6 = apaisada).
  hero: 'none'        → la 01 queda solo como portada de la grilla, adentro no aparece
  layoutMobile: [...] → otro orden solo para celular (mismo formato que layout)
  bg: '#1A1A1A'       → color de fondo de la página del proyecto
  hover: 'images/...' → imagen de fondo al pasar el mouse en Works/Index (si no, usa la portada)
  Fotos separadas con nombre y lugar abajo:
                      { tarjetas: '03 04', nombres: ['Eric Rojas', ...], lugares: ['Cabo Rojo', ...] }
  Texto dentro del layout:            { texto: ['párrafo 1', 'párrafo 2'] }
  info: { campaign, year, rol, agency, text } → ficha al final del proyecto
                    (CAMPAIGN / ROL / AGENCY + descripción). Si un dato está vacío, se ve [entre corchetes].
  Fila con etiquetas bajo cada foto:  { fila: '06 07 08', etiquetas: ['Active', 'Comfort', 'High fashion'] }
*/

window.PROJECTS = [
  { slug: 'badbo',            title: 'BadBo',            collab: 'Bad Bunny',            client: 'adidas Originals', role: 'Art Direction 2D',      tone: '#5E5A55', cover: '', hero: '', gallery: [],
    info: {
      campaign: "I'm Everything - BadBo",
      year: '2026',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text: 'Creative and visual development of the spatial concept for the launch of Benito Antonio Martínez Ocasio’s first signature shoe, the Badbo 1.0.'
    } },
  { slug: 'love-prevails',    title: 'Love prevails',    collab: 'Willy Chavarria',      client: 'adidas Originals', role: 'Art Direction 2D & 3D', tone: '#7A6650', cover: '', hero: '', gallery: [],
    layout: ['fila 02 03 04', 'enmarcada 05 negro', 'fila 06 07 08'],
    info: {
      campaign: 'Love prevails',
      year: '2026',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text: 'Love Prevails, a project rooted in the idea of love as an act of resistance. The concept explored the contrast between fear and hope, oppression and unity, translating the campaign narrative into a physical environment that celebrated empathy, humanity, and community. Through immersive storytelling, environmental graphics, and spatial design, the experience reinforced the belief that love, connection, and collective strength can prevail even in the most challenging times.'
    } },
  { slug: 'mercedes-benz',    title: 'Mercedes Benz',    collab: 'Bad Bunny',            client: 'adidas Originals', role: 'Art Direction 2D',      tone: '#1E1E1E', cover: '', hero: '', gallery: [],
    info: {
      campaign: 'Adiracer GTS & Motorsport Collection',
      year: '2025',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text: 
        'adidas Originals, Bad Bunny, and the Mercedes-AMG PETRONAS F1 Team announce the launch of the Bad Bunny Adiracer GT and the debut of the Bad Bunny Motorsport Collection, building on the historic partnership that brought Formula 1 to Puerto Rico for the first time.' + '\n\n' +
        'adidas Originals, Bad Bunny y la Mercedes-AMG PETRONAS F1 Team anuncian el lanzamiento de las Bad Bunny Adiracer GT y el debut de la colección Bad Bunny Motorsport, dando continuidad a la histórica alianza que llevó la Fórmula 1 a Puerto Rico por primera vez.'
    } },
  { slug: 'night-market',     title: 'Night Market',     collab: 'Edison Chen',          client: 'adidas Originals', role: 'Activation design',     tone: '#26324F', cover: '', hero: '', gallery: [],
    layout: ['fila 01:1.6 02', 'fila 03 04 05 06', 'fila 07:0.8 08 09 10', 'fila 11 12 13 14'],
    info: {
      campaign: 'Mama\'s Nightmarket',
      year: '2026',
      rol: 'Experience Design & Art Director',
      agency: 'newcycle',
      text: 'Creative and visual development of a 360° experience for the launch of the Edison Chen Mundial Collection. Inspired by traditional Hong Kong night markets, the space combined raw industrial textures, blue crate display systems, and custom environmental graphics to create an immersive retail environment. The concept translated the collection’s blend of football culture and Eastern influences into a physical experience, creating a unique setting where product, storytelling, and community came together.'
    } },
  { slug: 'country-club',     title: 'Country Club',     collab: 'Edison Chen',          client: 'adidas Originals', role: 'Art Direction 2D & 3D', tone: '#4C5A3E', cover: '', hero: '', gallery: [],
    info: {
      campaign: 'Country Club Stan Smith',
      year: '2024',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text: 
        'For this project, we developed a narrative divided into two drops, unfolding the story in two chapters. Our goal was to maintain a consistent visual language and aesthetic across both productions, ensuring coherence throughout the drops.' + '\n\n' +
        'This production is part of a campaign divided into two chapters. The June drop introduces the world of the Country Club and its members, a place where elegance and tradition meet a spirit of playful rebellion. Defined by playfulness, boldness and expression, this first chapter sets the tone for what’s to come, an unexpected and elevated take on exclusivity and etiquette. Within this refined setting, conventions are challenged and new rules begin to emerge, marking the start of UNETIQUETTE.'
    } },
  { slug: 'megaride',         title: 'Megaride',         collab: 'Willy Chavarria',      client: 'adidas Originals', role: 'Art Direction 2D',      tone: '#3A1414', cover: '', hero: '', gallery: [],
    layoutMobile: ['fila 02 03', 'fila 04 05', 'fila 06 07', 'completa 08'],
    info: {
      campaign: 'Megaride',
      year: '2025',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text: 'Beyond Gravity was a conceptual exploration of our relationship with gravity through movement and form. We explored the contrast between lightness and weight, fluidity and grounded presence, imagining how each silhouette could move, exist, and express itself beyond the rules of gravity.'
    } },
  { slug: 'july',             title: 'July',             collab: 'Edison Chen',          client: 'adidas Originals', role: 'Art Direction 2D & 3D', tone: '#56604E', cover: '', hero: '', gallery: [],
    layout: ['completa 02', 'fila 03 04', 'completa 05', 'fila 06 07', 'completa 08'],
    info: {
      campaign: 'Country Club Stan Smith',
      year: '2024',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text: 'UNETIQUETTE, we developed the creative and visual direction of a spatial experience set within the world of a Country Club. Inspired by the latest collaboration between adidas Originals and CLOT by Edison Chen, the project explored the idea of challenging traditional codes of etiquette, belonging, and exclusivity. Through unexpected interventions, immersive storytelling, and playful disruptions, we transformed familiar club spaces into environments where individuality, culture, and self-expression took center stage.'
    } },
  { slug: 'ballerina',        title: 'Ballerina',        collab: 'Bad Bunny',            client: 'adidas Originals', role: 'Art Direction 2D & 3D', tone: '#5A3520', cover: '', hero: '', gallery: [],
    layout: ['completa 02', 'fila 03 04', 'enmarcada 05 06 07', 'fila 08 09 10', 'enmarcada 11 12'],
    info: {
      campaign: 'Ballerina',
      year: '2025',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text:
        'Through dance we meet, connect, and fall in love.' + '\n\n' +
        'Ballerina is not a silhouette made to master any specific genre, but for those who seek to connect with something deeper.'
    } },
  { slug: 'new-york-times',   title: 'New York Times',   collab: 'Bad Bunny',            client: 'adidas Originals', role: 'Backcover Art',         tone: '#77746E', cover: '', hero: 'none', gallery: [],
    hover: 'images/projects/09 New York Times - Bad Bunny/web/02.jpg',
    layout: [
      'completa 02',
      { tarjetas: '03 04 06 05',
        nombres: ['Eric Rojas', 'Joshua Santiago', 'Quique Cabanillas', 'Cezanne Cardone'],
        lugares: ['Cabo Rojo', 'Santurce', 'El Yunque', 'Vega Baja'] }
    ],
    info: {
      campaign: 'New York Times / Back Cover Design',
      year: '2026',
      rol: 'Graphic designer',
      agency: 'newcycle',
      text: 'adidas se va pa’ PR es un homenaje al hogar de Benito Antonio Martínez Ocasio. Una oda a los paisajes de la isla. Un tributo a su cultura. Y un reconocimiento a sus artistas. A toda la gente que está en la diáspora y a los que siguen ahí.'
    } },
  { slug: 'bad-bunny-messi',  title: 'Bad Bunny para Messi', collab: '',                 client: 'adidas Originals', role: 'Art Direction 2D & 3D', tone: '#6E5638', cover: '', hero: '', gallery: [],
    info: { campaign: '', year: '', rol: '', agency: 'newcycle', text: '' } },
  { slug: 'cabo-rojo',        title: 'Cabo Rojo',        collab: 'Bad Bunny',            client: 'adidas Originals', role: 'Art Direction 2D',      tone: '#8A6E62', cover: '', hero: '', gallery: [],
    layout: ['completa 02', 'completa 03', 'fila 06 07', 'completa 05'],
    info: {
      campaign: 'Gazelle Indoor City Series / Cabo Rojo',
      year: '2025',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text: 
        'Gazelle Indoor City Series rinde homenaje a los paisajes de Puerto Rico: El Yunque, Cabo Rojo, Santurce y Vega Baja.' + '\n\n' +
        'Esta silueta toma inspiración del paisaje de Cabo Rojo, reflejado en sus tonos rosados.' + '\n\n' +
        'El lanzamiento busca traer ese entorno a la superficie, celebrando tanto el paisaje como a las personas que lo habitan. Mostramos a la comunidad moviéndose con la naturalidad de quienes conocen cada rincón, como si el espacio fuera parte de ellos.'
    } },
  { slug: 'magazine',         title: 'Magazine',         collab: 'Bad Bunny para Messi', client: 'adidas Originals', role: 'Editorial Design',      tone: '#2E4D5C', cover: '', hero: '', gallery: [],
    layout: ['completa 01', 'completa 02', 'completa 03', 'completa 04', 'fila 05 06', 'fila 07 08', 'completa 09'],
    info: {
      campaign: 'adidas originals Bad Bunny & Messi',
      year: '2024',
      rol: 'Editorial Design',
      agency: 'newcycle',
      text: 
        'The idea behind this magazine is to bring the adidas originals Bad Bunny & Messi campaign into a physical format, a collectible piece that captures the spirit of “The voice of the fans”.' + '\n\n' +
        'It works both as a narrative object and as a catalog of the collaboration.' + '\n\n' +
        'Many fans have dedicated countless tweets, comments, signs, and letters to Leo and Benito: expressions of love that apply to both of them. Through a letter created based on comments from Instagram, YouTube, and X (Twitter), we will highlight the impact they have on their true fans. The idea is to bring forward the infinite love people express to them, in their own voices.'
    } },
  { slug: 'adizero-sl72',     title: 'Adizero SL72', collab: 'Bad Bunny', client: 'adidas Originals', role: 'Art Direction 2D & 3D', tone: '#4A4640', cover: '', hero: '', gallery: [],
    bg: '#1A1A1A',
    layout: [
      'fila 02 03 04',
      'enmarcada 05 #1A1A1A',
      { texto: [
        'The campaign visuals mirror the construction of the sneaker, blending elements from different eras. An analog camera represents the 70s while a digital camera evokes the 2000s.',
        'Each sneaker colorway was linked to a specific pillar: active, high fashion, and comfort. Poses, objects, styling, and visual elements were carefully chosen to reflect the mood and energy of each state, ensuring that every image embodied its corresponding identity.',
        'As Graphic Designer and part of the Art Direction team, we worked with the creative team to shape the concept and storytelling of the campaign, defining the visual language, curating references, and designing assets that brought the idea to life across both digital and photographic outputs, while also ensuring visual consistency during the shoot.'
      ] },
      { fila: '06 07 08', etiquetas: ['Active', 'Comfort', 'High fashion'] },
      'fila 09 10'
    ],
    info: {
      campaign: 'Adizero SL72',
      year: '2025',
      rol: 'Art & Creative direction',
      agency: 'newcycle',
      text: 'Shift the timeline, Inspired by a silhouette made up of elements from different time registers, we developed a concept that invites the audience to play with time. Tapping into the “back to the 70s” trend—highly relevant for our target—we proposed a fusion of timelines and aesthetics.'
    } }
];
