export interface Ally {
  id: string;
  name: string;
  role: { es: string; it: string };
  title: { es: string; it: string };
  country: 'co' | 'it' | 'co-it';
  bio: { es: string; it: string };
  socials: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
  initials: string;
}

export const ALLIES: Ally[] = [
  {
    id: 'andres-diaz',
    name: 'Andrés Mauricio Díaz Herrera',
    initials: 'AD',
    country: 'co-it',
    role: {
      es: 'Presidente · Oficial de Cumplimiento',
      it: 'Presidente · Responsabile della Conformità',
    },
    title: {
      es: 'Dream Sport\'s International S.R.L. (Italia) · S.A.S. (Colombia)',
      it: 'Dream Sport\'s International S.R.L. (Italia) · S.A.S. (Colombia)',
    },
    bio: {
      es: 'Empresario colombiano con proyección internacional, Andrés Díaz es un líder estratégico enfocado en la creación, estructuración y expansión de proyectos empresariales de alto impacto en América Latina y Europa. Como Presidente de Dream Sport\'s International S.R.L. en Italia, dirige el desarrollo de un ecosistema orientado a la promoción, formación y proyección de talento deportivo a nivel internacional. Como Oficial de Cumplimiento en Colombia, garantiza la implementación de estándares regulatorios, transparencia corporativa y buenas prácticas empresariales. Su experiencia incluye la creación de empresas, gestión de inversión, desarrollo de alianzas estratégicas y liderazgo en sectores como deporte, infraestructura, organización de eventos y negocios internacionales.',
      it: 'Imprenditore colombiano con proiezione internazionale, Andrés Díaz è un leader strategico focalizzato sulla creazione, strutturazione ed espansione di progetti imprenditoriali ad alto impatto in America Latina e in Europa. Come Presidente di Dream Sport\'s International S.R.L. in Italia, guida lo sviluppo di un ecosistema orientato alla promozione, formazione e proiezione del talento sportivo a livello internazionale. Come Responsabile della Conformità in Colombia, garantisce l\'implementazione di standard normativi, trasparenza aziendale e buone pratiche commerciali. La sua esperienza include la creazione di imprese, gestione degli investimenti, sviluppo di alleanze strategiche e leadership nei settori sport, infrastrutture, organizzazione di eventi e affari internazionali.',
    },
    socials: { whatsapp: 'https://wa.me/573167526055' },
  },
  {
    id: 'claudio-capuano',
    name: 'Claudio Capuano',
    initials: 'CC',
    country: 'it',
    role: {
      es: 'Socio Fundador',
      it: 'Socio Fondatore',
    },
    title: {
      es: 'Dream Sport\'s International S.R.L. (Italia)',
      it: 'Dream Sport\'s International S.R.L. (Italia)',
    },
    bio: {
      es: 'Socio Fundador de Dream Sport\'s International S.R.L. en Italia, Claudio Capuano aporta su visión y experiencia al proyecto desde la base de operaciones europea, siendo pieza clave en la estructuración y consolidación institucional del programa internacional.',
      it: 'Socio Fondatore di Dream Sport\'s International S.R.L. in Italia, Claudio Capuano apporta la sua visione ed esperienza al progetto dalla base operativa europea, rappresentando un elemento chiave nella strutturazione e nel consolidamento istituzionale del programma internazionale.',
    },
    socials: { whatsapp: 'https://wa.me/393290317945' },
  },
  {
    id: 'yamile-cely',
    name: 'Luz Yamile Cely Ávila',
    initials: 'YC',
    country: 'co-it',
    role: {
      es: 'Directora de Salud y Rendimiento Deportivo (CMPO)',
      it: 'Direttrice della Salute e della Performance Sportiva (CMPO)',
    },
    title: {
      es: 'Socia Fundadora Italia · Vicepresidenta Colombia',
      it: 'Socia Fondatrice Italia · Vicepresidente Colombia',
    },
    bio: {
      es: 'Fisioterapeuta y Especialista en Gerencia de Instituciones de Salud, Yamile Cely cuenta con más de 15 años de trayectoria en rehabilitación, rendimiento físico y dirección estratégica de procesos clínicos. Como Directora de Salud y Rendimiento Deportivo, lidera la estructuración e implementación de todos los componentes médicos y de bienestar del ecosistema deportivo. Como Socia Fundadora en Italia y Vicepresidenta en Colombia, ha sido pieza clave en la consolidación institucional del proyecto, integrando conocimiento técnico en fisioterapia con liderazgo en gestión de equipos de salud y diseño de programas integrales para atletas de alto nivel.',
      it: 'Fisioterapista e Specialista in Management delle Istituzioni Sanitarie, Yamile Cely vanta oltre 15 anni di esperienza in riabilitazione, rendimento fisico e direzione strategica di processi clinici. Come Direttrice della Salute e della Performance Sportiva, guida la strutturazione e l\'implementazione di tutte le componenti mediche e del benessere nell\'ecosistema sportivo. Come Socia Fondatrice in Italia e Vicepresidente in Colombia, è stata un elemento fondamentale nel consolidamento istituzionale del progetto, integrando le competenze tecniche in fisioterapia con la leadership nella gestione di equipe sanitarie e nella progettazione di programmi integrali per atleti di alto livello.',
    },
    socials: {},
  },
  {
    id: 'andres-soto',
    name: 'Andrés Mateo Soto',
    initials: 'AS',
    country: 'co',
    role: {
      es: 'Director Deportivo Global (CSO)',
      it: 'Direttore Sportivo Globale (CSO)',
    },
    title: {
      es: 'Chief Sports Officer – Dream Sport\'s International',
      it: 'Chief Sports Officer – Dream Sport\'s International',
    },
    bio: {
      es: 'Como Director Deportivo Global, Andrés Mateo Soto es el responsable de la planificación, desarrollo e implementación de la estructura deportiva de Dream Sport\'s International. Lidera la operación deportiva integral, desde la identificación y proyección de talento hasta la coordinación de cuerpos técnicos internacionales y multidisciplinarios. Su gestión se orienta a la identificación de atletas con proyección internacional, alineando procesos técnicos, físicos y tácticos con las exigencias del deporte profesional en Europa y América Latina. Se distingue por su capacidad de generar impacto humano, promoviendo una cultura basada en la disciplina, la constancia, la integralidad del ser y la excelencia deportiva.',
      it: 'Come Direttore Sportivo Globale, Andrés Mateo Soto è responsabile della pianificazione, dello sviluppo e dell\'implementazione della struttura sportiva di Dream Sport\'s International. Guida l\'operazione sportiva integrale, dall\'identificazione e proiezione dei talenti al coordinamento degli staff tecnici internazionali e multidisciplinari. La sua gestione è orientata all\'identificazione di atleti con proiezione internazionale, allineando processi tecnici, fisici e tattici alle esigenze dello sport professionistico in Europa e America Latina. Si distingue per la capacità di generare impatto umano, promuovendo una cultura basata su disciplina, costanza, integralità della persona ed eccellenza sportiva.',
    },
    socials: {},
  },
  {
    id: 'karen-chaparro',
    name: 'Karen Viviana Chaparro Cely',
    initials: 'KC',
    country: 'co-it',
    role: {
      es: 'Directora de Comunicación Digital (CCDSO)',
      it: 'Direttrice della Comunicazione Digitale (CCDSO)',
    },
    title: {
      es: 'Socia Fundadora Italia · Accionista Colombia',
      it: 'Socia Fondatrice Italia · Azionista Colombia',
    },
    bio: {
      es: 'Profesional con enfoque estratégico en comunicación digital, posicionamiento de marca y gestión de ecosistemas digitales. Como Directora de Comunicación Digital y Estrategia de Medios, lidera el diseño, desarrollo e implementación de la estrategia global de comunicación de Dream Sport\'s International, integrando redes sociales, plataformas digitales y canales institucionales. Su gestión fortalece la identidad de marca, amplifica el alcance internacional del proyecto y genera conexiones con audiencias estratégicas. Como Socia Fundadora en Italia y Accionista en Colombia, ha sido determinante en la construcción de una imagen corporativa sólida, coherente y alineada con los valores del proyecto.',
      it: 'Professionista con approccio strategico alla comunicazione digitale, al posizionamento del brand e alla gestione degli ecosistemi digitali. Come Direttrice della Comunicazione Digitale e della Strategia Media, guida la progettazione, lo sviluppo e l\'implementazione della strategia di comunicazione globale di Dream Sport\'s International, integrando social media, piattaforme digitali e canali istituzionali. La sua gestione rafforza l\'identità del brand, amplifica la portata internazionale del progetto e genera connessioni con audience strategiche. Come Socia Fondatrice in Italia e Azionista in Colombia, è stata determinante nella costruzione di un\'immagine aziendale solida, coerente e allineata con i valori del progetto.',
    },
    socials: {},
  },
  {
    id: 'gian-capasso',
    name: 'Gian Giacomo Capasso',
    initials: 'GC',
    country: 'it',
    role: {
      es: 'Miembro del Consejo de Administración',
      it: 'Membro del Consiglio di Amministrazione',
    },
    title: {
      es: 'Cooperativa italiana · Aliado estratégico',
      it: 'Cooperativa italiana · Partner strategico',
    },
    bio: {
      es: 'Gian Giacomo Capasso integra visión organizativa, sensibilidad social y vocación empresarial. Como Miembro del Consejo de Administración de una histórica cooperativa italiana, participa activamente en procesos de direccionamiento y consolidación de una organización arraigada en el tejido económico y social del país. Su perfil se distingue por una especial atención al ámbito juvenil, reconociendo en los jóvenes un recurso estratégico para el futuro. Combina experiencia administrativa, cultura cooperativa y visión de desarrollo, aportando con seriedad y criterio estratégico a iniciativas que integran solidez organizativa, enfoque social y valorización de nuevas generaciones.',
      it: 'Gian Giacomo Capasso integra visione organizzativa, sensibilità sociale e vocazione imprenditoriale. Come Membro del Consiglio di Amministrazione di una storica cooperativa italiana, partecipa attivamente ai processi di indirizzo e consolidamento di un\'organizzazione profondamente radicata nel tessuto economico e sociale del paese. Il suo profilo si distingue per una particolare attenzione all\'ambito giovanile, riconoscendo nei giovani una risorsa strategica per il futuro. Combina esperienza amministrativa, cultura cooperativa e visione di sviluppo, contribuendo con serietà e criterio strategico a iniziative che integrano solidità organizzativa, approccio sociale e valorizzazione delle nuove generazioni.',
    },
    socials: {},
  },
  {
    id: 'monia-giugliano',
    name: 'Monia Giuliano',
    initials: 'MG',
    country: 'it',
    role: {
      es: 'Empresaria y Fundadora',
      it: 'Imprenditrice e Fondatrice',
    },
    title: {
      es: 'Madagascar S.R.L. · Aliada estratégica',
      it: 'Madagascar S.R.L. · Partner strategica',
    },
    bio: {
      es: 'Monia Giuliano es una empresaria que se distingue por su visión, sensibilidad educativa y capacidad para transformar ideas y valores en proyectos concretos. Como Fundadora de Madagascar S.R.L., ha creado una organización enfocada en el desarrollo de programas orientados a la formación, la educación y el crecimiento integral de los adolescentes. Su actividad se distingue por la capacidad de identificar necesidades del entorno y transformarlas en proyectos sostenibles de alto impacto, fundamentados en responsabilidad, continuidad y valor social. Su perfil combina orientación empresarial con profunda sensibilidad hacia la educación adolescente, la inclusión y el desarrollo humano.',
      it: 'Monia Giuliano è un\'imprenditrice che si distingue per la sua visione, sensibilità educativa e capacità di trasformare idee e valori in progetti concreti. Come Fondatrice di Madagascar S.R.L., ha creato un\'organizzazione focalizzata sullo sviluppo di programmi orientati alla formazione, all\'educazione e alla crescita integrale degli adolescenti. La sua attività si distingue per la capacità di identificare le esigenze dell\'ambiente e trasformarle in progetti sostenibili ad alto impatto, fondati su responsabilità, continuità e valore sociale. Il suo profilo combina orientamento imprenditoriale con una profonda sensibilità verso l\'educazione adolescenziale, l\'inclusione e lo sviluppo umano.',
    },
    socials: {},
  },
];
