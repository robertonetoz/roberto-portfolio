export type Category = "Saúde" | "Imobiliário" | "Fitness e lazer" | "Tatuagem" | "Agronegócio";

export type Project = {
  slug: string;
  name: string;
  kind: string;
  city?: string;
  category: Category;
  description: string;
  url: string;
  stack: string[];
  /** Height in px of /projects/{slug}-full.jpg (width is always 1440). */
  fullHeight: number;
};

export const projects: Project[] = [
  {
    slug: "martins3agro",
    name: "Martins3Agro Boitel",
    kind: "Pecuária de precisão",
    city: "Uberlândia, MG e Três Lagoas, MS",
    category: "Agronegócio",
    description:
      "Site do boitel com as duas unidades, as quatro modalidades comerciais explicadas com exemplos e um simulador de operação para o pecuarista.",
    url: "https://martins3agro.com/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "itororo",
    name: "Itororó Park Club",
    kind: "Clube de esporte e lazer",
    category: "Fitness e lazer",
    description:
      "Portal do clube com estrutura, esportes, agenda de eventos, galeria, blog, horários de funcionamento e área do sócio.",
    url: "https://www.itororoparkclub.org.br/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "parquesul",
    name: "Parque Sul Karaíba",
    kind: "Microbairro planejado",
    city: "Uberlândia, MG",
    category: "Imobiliário",
    description:
      "Apresentação do primeiro microbairro planejado da Zona Sul, com complexo de saúde, tour 360°, incorporadoras e localização.",
    url: "https://parquesul.com.br/",
    stack: ["WordPress", "Elementor"],
    fullHeight: 4200,
  },
  {
    slug: "brenokauai",
    name: "Breno Kauai",
    kind: "Tatuador",
    city: "Uberlândia, MG",
    category: "Tatuagem",
    description:
      "Portfólio para um tatuador de fine line, floral, mandala e pontilhismo, com galeria de trabalhos e orçamento direto.",
    url: "https://brenokauaitattoo.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "salles",
    name: "Salles Empreendimentos",
    kind: "Incorporadora",
    category: "Imobiliário",
    description:
      "Site de uma incorporadora com 33 anos de mercado, com lançamentos em destaque e página para cada empreendimento.",
    url: "https://sallesempreendimentos.com.br/",
    stack: ["WordPress", "Elementor"],
    fullHeight: 4200,
  },
  {
    slug: "gabrielamiranda",
    name: "Dra. Gabriela Miranda",
    kind: "Emagrecimento e performance",
    city: "Uberlândia, MG",
    category: "Saúde",
    description:
      "Site médico focado em emagrecimento, saúde metabólica e performance, com consulta presencial e teleconsulta.",
    url: "https://dragabrielamiranda.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "twentyone",
    name: "Twenty One Company",
    kind: "Academia desde 2001",
    city: "Uberlândia, MG",
    category: "Fitness e lazer",
    description:
      "Rede com três unidades: musculação, Fit Dance, Pilates, bike e Muay Thai, com horários e convênios Wellhub e TotalPass.",
    url: "https://twentyonecompany.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "persa",
    name: "Persa Incorporações",
    kind: "Incorporadora",
    city: "Uberlândia, MG",
    category: "Imobiliário",
    description:
      "Vitrine de empreendimentos com status e percentual de obra de cada lançamento, plantas e contato com a equipe de vendas.",
    url: "https://persaincorporacoes.com.br/",
    stack: ["WordPress", "Elementor"],
    fullHeight: 3102,
  },
  {
    slug: "lysaink",
    name: "Lysa Ink",
    kind: "Tatuagem dark e blackwork",
    city: "Uberlândia, MG",
    category: "Tatuagem",
    description:
      "Identidade sombria para uma tatuadora de blackwork, pontilhismo e temas góticos, com galeria e orçamento pelo WhatsApp.",
    url: "https://lysaink.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "carolinamorais",
    name: "Dra. Carolina Morais",
    kind: "Cirurgiã-dentista",
    city: "Uberlândia, MG",
    category: "Saúde",
    description:
      "Consultório odontológico com todos os tratamentos, de limpeza e clareamento a implantes, e agendamento de avaliação.",
    url: "https://dracarolinamorais-seven.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "ademi",
    name: "Ademi Uberlândia",
    kind: "Associação do mercado imobiliário",
    city: "Uberlândia, MG",
    category: "Imobiliário",
    description:
      "Site institucional da associação que reúne incorporadoras e construtoras da região, com notícias e realizações.",
    url: "https://ademiudi.com.br/",
    stack: ["WordPress", "Elementor"],
    fullHeight: 4200,
  },
  {
    slug: "bodyclub",
    name: "Body Club",
    kind: "Academia",
    city: "Araguari, MG",
    category: "Fitness e lazer",
    description:
      "Academia aberta todos os dias, com musculação, circuitos funcionais, Power Bike e avaliação física.",
    url: "https://bodyclub-smoky.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "rodrigosergio",
    name: "Dr. Rodrigo Sérgio",
    kind: "Ginecologista e obstetra",
    city: "Araguari, MG",
    category: "Saúde",
    description:
      "Site para ginecologista, obstetra e ultrassonografista, com pré-natal de baixo e alto risco e agendamento.",
    url: "https://drrodrigosergio.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "marinasouza",
    name: "Marina Souza",
    kind: "Psicóloga",
    city: "Uberlândia, MG",
    category: "Saúde",
    description:
      "Psicoterapia online para mulheres jovens e adultas, com abordagem acolhedora e agendamento direto pelo WhatsApp.",
    url: "https://psimarinasouza.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
  {
    slug: "lorenabarbosa",
    name: "Lorena Barbosa",
    kind: "Psicóloga psicotraumatologista",
    city: "Araguari, MG",
    category: "Saúde",
    description:
      "Atendimento presencial em Araguari e online para todo o Brasil, com foco em psicotraumatologia.",
    url: "https://psilorenabarbosa.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS"],
    fullHeight: 4200,
  },
];

export const categories: Category[] = ["Saúde", "Imobiliário", "Fitness e lazer", "Tatuagem", "Agronegócio"];
