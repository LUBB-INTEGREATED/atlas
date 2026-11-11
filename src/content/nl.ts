import { ATLAS_IMAGES } from '@/src/assets/images';

export type ServiceCategory = 'Operationeel' | 'Planning & advies' | 'Totaaloplossingen';

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  lead: string;
  image: string;
  whatWeDoIntro: string;
  whatWeDoBullets: string[];
  applications: string[];
  steps: ServiceStep[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
}

export interface CourseItem {
  id: string;
  title: string;
  duration: string;
  level: string;
  certificate: string;
  summary: string;
  highlights: string[];
}

export interface VacancyItem {
  slug: string;
  title: string;
  region: string;
  hours: string;
  start: string;
  salaryIndication: string;
  summary: string;
  intro: string;
  whatYouDo: string[];
  whatWeAsk: string[];
  whatWeOffer: string[];
}

export const nl = {
  nav: {
    home: 'Home',
    diensten: 'Diensten',
    opleidingen: 'Opleidingen',
    overOns: 'Over ons',
    werkenBij: 'Werken bij',
    contact: 'Contact',
    cta: 'Offerte aanvragen',
    planningReachable: 'Planning bereikbaar · 24/7',
    allServices: 'Alle 11 diensten bekijken',
  },
  hero: {
    kicker: 'ATLAS HOLLAND B.V. — VERKEERSVEILIGHEID',
    headlineBefore: 'Verkeer in',
    headlineItalic: 'goede banen',
    headlineAfter: '.',
    lead: 'Gecertificeerde verkeersregelaars en complete verkeersoplossingen voor infra, bouw, evenementen en calamiteiten. Landelijk inzetbaar, 24/7 bereikbaar.',
    primaryCta: 'Verkeersregelaars aanvragen',
    secondaryCta: 'Bekijk diensten',
    chipText: 'Planning bereikbaar · 24/7',
    arches: [
      {
        alt: 'Gecertificeerde verkeersregelaar van Atlas Holland tijdens het gouden uur op een rustig kruispunt',
        caption: 'Beroepsverkeersregelaars op locatie',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.heroTrafficController,
      },
      {
        alt: 'Zorgvuldig ingerichte wegwerkzaamheden langs een Nederlandse gracht bij zonsopkomst',
        caption: 'Overzichtelijke werkvakken & doorstroming',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.heroCalmRoadworks,
      },
      {
        alt: 'Architectonisch 3D-stilleven met oranje verkeerskegel en blauwe afzetting onder een crèmekleurige boog',
        caption: 'Rust, voorbereiding en vakmanschap',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.stillLifeConePlinth,
      },
    ],
  },
  introStatement: {
    part1: 'Van verkeersplan tot',
    part2: 'uitvoering op locatie. Eén partner die',
    part3: 'meedenkt, snel schakelt en veiligheid altijd voorop zet.',
  },
  homeServices: {
    label: 'DIENSTEN',
    heading: 'Alles voor een veilige werkplek',
    allLinkLabel: 'Alle 11 diensten',
    categories: ['Operationeel', 'Planning & advies', 'Totaaloplossingen'] as ServiceCategory[],
  },
  werkwijze: {
    label: 'WERKWIJZE',
    headingBefore: 'Rust in elk',
    headingItalic: 'verkeersvraagstuk',
    lead: 'Van de eerste tekening tot de laatste pion op straat: wij zorgen dat weggebruikers, omwonenden en vakmensen veilig hun weg vervolgen.',
    steps: [
      {
        number: '01',
        title: 'Voorbereiding',
        subtitle: 'Verkeersplan en advies',
        description:
          'We brengen verkeersstromen, faseringen en vergunningseisen helder in kaart. U ontvangt een doordacht verkeers- of BLVC-plan dat direct bespreekbaar is met gemeente en wegbeheerder.',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.stillLifeConePlinth,
      },
      {
        number: '02',
        title: 'Uitvoering',
        subtitle: 'Gecertificeerde verkeersregelaars',
        description:
          'Onze landelijk aangestelde verkeersregelaars, bouwportiers en veiligheidspersonen staan op tijd, volledig uitgerust en goed gebrieft op locatie. Gastvrij in toon, beslist in veiligheid.',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.heroTrafficController,
      },
      {
        number: '03',
        title: 'Coördinatie',
        subtitle: 'Één aanspreekpunt, direct bijsturen',
        description:
          'Verandert de planning of vraagt de situatie op straat om opschaling? Uw vaste projectcoördinator schakelt direct bij, 24 uur per dag en 7 dagen per week.',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.heroCalmRoadworks,
      },
    ],
  },
  inCijfers: {
    label: 'IN CIJFERS',
  },
  voorWie: {
    label: 'VOOR WIE',
    headingBefore: 'Betrouwbare inzet voor',
    headingItalic: 'elke opdrachtgever',
    audiences: [
      {
        title: 'Gemeenten',
        subtitle: 'Veilige doorstroming en heldere omgevingcommunicatie bij stedelijke herinrichting.',
        checks: [
          'Gecertificeerde beroepsverkeersregelaars met lokale kennis',
          'Toetsbare CROW 96b-verkeersplannen en BLVC-borging',
          'Representatieve en gastvrije benadering van bewoners',
        ],
        href: '/diensten/verkeersplannen',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.heroCalmRoadworks,
        spanClass: 'lg:col-span-7',
      },
      {
        title: 'Aannemers & Infra',
        subtitle: 'Continuïteit op de bouwplaats en veilige in- en uitritten voor werkverkeer.',
        checks: [
          'VCA-gecertificeerde verkeersregelaars en ervaren bouwportiers',
          'Flexibele op- en afschaling bij nacht- of weekendwerk',
          'Tijdelijke bebording en afzettingen conform BRL 9101',
        ],
        href: '/diensten/verkeersregelaars',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.operationsSiteAccess,
        spanClass: 'lg:col-span-5',
      },
      {
        title: 'Nutsbedrijven',
        subtitle: 'Direct inzetbare begeleiding bij geplande netverzwaring en acute storingen.',
        checks: [
          '24/7 calamiteitenlijn met snelle landelijke opkomsttijd',
          'Korte werkplekbeveiliging in smalle woonstraten en stadscentra',
          'Veiligheidspersonen voor werk nabij trambanen',
        ],
        href: '/diensten/calamiteiten',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.heroTrafficController,
        spanClass: 'lg:col-span-5',
      },
      {
        title: 'Evenementen & Locaties',
        subtitle: 'Een ontspannen aankomst en vlot vertrek voor duizenden bezoekers.',
        checks: [
          'Gastvrije parkeerbegeleiding en pendelbus-coördinatie',
          'Motorbegeleiding bij wielerkoersen, marathons en konvooien',
          'Integraal mobiliteitsplan afgestemd met hulpdiensten',
        ],
        href: '/diensten/evenementen',
        // TODO: replace with real Atlas photo
        image: ATLAS_IMAGES.eventsTrafficFlow,
        spanClass: 'lg:col-span-7',
      },
    ],
  },
  waaromAtlas: {
    label: 'WAAROM ATLAS',
    headingBefore: 'Korte lijnen. Duidelijke afspraken.',
    headingItalic: 'Betrokken op locatie.',
    lead: 'Veiligheid vraagt om rust en overzicht. Daarom werken wij zonder schijven of callcenters: u spreekt direct met de mensen die uw project plannen en begeleiden.',
    values: [
      {
        title: 'Snel schakelen',
        description:
          'Binnen 24 uur een helder voorstel. Bij spoed of calamiteiten staan onze mensen dezelfde dag of nacht nog op locatie.',
      },
      {
        title: 'Veiligheid voorop',
        description:
          'Volledig gecertificeerd volgens landelijke richtlijnen, met periodieke werkplekinspecties en persoonlijke begeleiding.',
      },
      {
        title: 'Ervaren vakmensen',
        description:
          'Representatieve verkeersregelaars die rust bewaren op drukke kruispunten en vriendelijk communiceren met weggebruikers.',
      },
      {
        title: 'Één vast aanspreekpunt',
        description:
          'Van de eerste vergunningstekening tot de evaluatie achteraf heeft u één vaste coördinator die uw project kent.',
      },
    ],
  },
  landelijk: {
    label: 'LANDELIJK INZETBAAR',
    headingBefore: 'Overal in Nederland',
    headingItalic: 'snel ter plaatse',
    description:
      'Met regionale steunpunten en een landelijk netwerk van beroepsverkeersregelaars ondersteunen wij projecten in alle twaalf provincies. Of het nu gaat om één kruispunt in de binnenstad of een meerdaagse afsluiting op een provinciale weg.',
    phoneLabel: 'Direct de 24/7 planning spreken',
    regions: [
      { name: 'Randstad & Utrecht', x: 46, y: 52 },
      { name: 'Noord-Holland', x: 44, y: 34 },
      { name: 'Zuid-Holland & Rijnmond', x: 34, y: 58 },
      { name: 'Noord-Brabant & Zeeland', x: 48, y: 74 },
      { name: 'Gelderland & Overijssel', x: 68, y: 50 },
      { name: 'Noord-Nederland', x: 66, y: 22 },
      { name: 'Limburg', x: 64, y: 86 },
    ],
  },
  kwaliteit: {
    label: 'KWALITEIT',
    heading: 'Geborgde veiligheid en erkende certificering',
    description:
      'Al onze werkzaamheden worden uitgevoerd volgens de geldende CROW-richtlijnen, Arbowetgeving en landelijke aanstellingseisen.',
  },
  werkenBijBanner: {
    label: 'WERKEN BIJ ATLAS',
    heading: 'Word verkeersregelaar.',
    lead: 'Werk in de buitenlucht, houd het verkeer veilig in beweging en groei door met erkende opleidingen op onze kosten.',
    benefits: ['Gratis opleiding', 'Goed salaris', 'Complete uitrusting'],
    cta: 'Bekijk vacatures',
  },
  closingCta: {
    label: 'DIRECT SCHAKELEN',
    heading: 'Verkeersregelaars nodig?',
    lead: 'Vraag vrijblijvend een voorstel aan of bel direct met onze 24/7 planning voor overleg of spoedinzet.',
    buttonLabel: 'Offerte aanvragen',
  },
  services: [
    {
      slug: 'verkeersregelaars',
      title: 'Verkeersregelaars',
      category: 'Operationeel',
      shortDescription:
        'Gecertificeerde beroepsverkeersregelaars voor wegwerkzaamheden, bouwprojecten, evenementen en omleidingen.',
      lead: 'Landelijk aangestelde beroepsverkeersregelaars die rust, veiligheid en doorstroming brengen op ieder kruispunt en werkvak — van enkele uren tot langlopende infraprojecten.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.heroTrafficController,
      whatWeDoIntro:
        'Wanneer de reguliere verkeerssituatie tijdelijk wijzigt door wegwerkzaamheden, hijswerkzaamheden of een omleiding, zorgen onze beroepsverkeersregelaars voor een veilige en kalme afwikkeling van al het verkeer. Zij vormen het visitekaartje van uw project op straat.',
      whatWeDoBullets: [
        'Inzet van landelijk bevoegde beroepsverkeersregelaars (met geldige aanstellingspas en VCA)',
        'Begeleiding van gemotoriseerd verkeer, fietsers, voetgangers en openbaar vervoer',
        'Korte en heldere briefing voorafgaand aan iedere dienst door onze projectcoördinator',
        'Flexibel inzetbaar voor dag-, avond-, nacht- en weekenddiensten in heel Nederland',
      ],
      applications: [
        'Asfaltonderhoud, rioolvervanging en herinrichting van binnensteden',
        'Kabel- en leidingwerkzaamheden voor nutsbedrijven',
        'Hijswerkzaamheden en zwaar bouwtransport in woonwijken',
        'Tijdelijke uitval van verkeersregelinstallaties (VRI)',
      ],
      steps: [
        {
          title: 'Inventarisatie & advies',
          description: 'Samen bepalen we het benodigde aantal verkeersregelaars, de posities en de werktijden.',
        },
        {
          title: 'Briefing & inzet op locatie',
          description: 'Onze vakmensen melden zich ruim op tijd op de werklocatie, volledig uitgerust en geïnstrueerd.',
        },
        {
          title: 'Evaluatie & bijsturing',
          description: 'Tijdens de uitvoering houden we contact met uw uitvoerder en schalen we direct bij waar nodig.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig voor een aanvraag?',
          answer:
            'Voor een gerichte offerte of directe inzet ontvangen wij graag de locatie, datum, begin- en eindtijd, het soort werkzaamheden en het gewenste aantal verkeersregelaars. Twijfelt u over het juiste aantal? Dan adviseren wij u direct.',
        },
        {
          question: 'Is meerdaagse of langdurige inzet mogelijk?',
          answer:
            'Ja. Wij verzorgen zowel korte inzetten van één dagdeel als langlopende projecten van meerdere maanden met een vaste poule van vertrouwde verkeersregelaars.',
        },
        {
          question: 'Hoe snel kunt u verkeersregelaars leveren?',
          answer:
            'Reguliere aanvragen bevestigen wij binnen 24 uur. Bij spoed of een onverwachte stremming kunnen wij via onze 24/7 planning dezelfde dag of nacht nog opschalen.',
        },
      ],
      relatedSlugs: ['tijdelijke-verkeersmaatregelen', 'bouwportier', 'verkeersplannen'],
    },
    {
      slug: 'bouwportier',
      title: 'Bouwportier',
      category: 'Operationeel',
      shortDescription:
        'Gecontroleerde bouwplaatstoezicht, bezoekersregistratie en veilige doorstroming van bouwverkeer bij de poort.',
      lead: 'Een gastvrije en alerte bouwportier die toeziet op toegangscontrole, persoonlijke beschermingsmiddelen en het veilig in- en uitrijden van bouwtransport.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.operationsSiteAccess,
      whatWeDoIntro:
        'De in- en uitrit van een bouwplaats is het scharnierpunt tussen de openbare weg en het bouwterrein. Onze bouwportiers combineren toegangscontrole en logistiek overzicht met de bevoegdheid om bouwverkeer veilig de openbare weg op en af te begeleiden.',
      whatWeDoBullets: [
        'Controle op toegangspassen, bouwhekken en verplichte PBM’s bij het betreden van de bouwplaats',
        'Registratie van bezoekers, onderaannemers en leveranciers conform uw bouwplaatsprotocol',
        'Veilig begeleiden van achteruitrijdend vrachtverkeer tussen bouwpoort en openbare weg',
        'Aanspreekpunt voor omwonenden, pakketdiensten en hulpdiensten aan de poort',
      ],
      applications: [
        'Binnenstedelijke woningbouw- en utiliteitsprojecten met beperkte manoeuvreerruimte',
        'Grootschalige renovatieprojecten met veel dagelijkse deeltransporten',
        'Bouwplaatsen grenzend aan drukke fietsroutes, scholen of winkelgebieden',
      ],
      steps: [
        {
          title: 'Poortprotocol afstemmen',
          description: 'We nemen uw bouwplaatsregels, levertijden en registratiesysteem door.',
        },
        {
          title: 'Vaste gezichten aan de poort',
          description: 'U krijgt een vast team bouwportiers dat de uitvoerders en vaste leveranciers kent.',
        },
        {
          title: 'Dagelijkse rapportage',
          description: 'Bijzonderheden, bezoekersstromen en logistieke knelpunten koppelen we direct terug.',
        },
      ],
      faqs: [
        {
          question: 'Heeft een bouwportier van Atlas ook een aanstelling als verkeersregelaar?',
          answer:
            'Ja, onze bouwportiers beschikken over een landelijke aanstelling als beroepsverkeersregelaar en VCA. Daarmee mogen zij ook op de openbare weg het verkeer stilzetten bij in- en uitrijdend bouwverkeer.',
        },
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'Wij vernemen graag de projectlocatie, de gewenste openingstijden van de bouwpoort, de verwachte transportbewegingen en eventuele specifieke registratiesystemen waarmee u werkt.',
        },
        {
          question: 'Is meerdaagse inzet mogelijk?',
          answer:
            'Zeker. Bouwportiers worden meestal voor de volledige looptijd van de ruwbouw- en afbouwfase ingezet met vaste gezichten.',
        },
      ],
      relatedSlugs: ['verkeersregelaars', 'blvc-plannen', 'projectcoordinatie'],
    },
    {
      slug: 'veiligheidspersoon-tram',
      title: 'Veiligheidspersoon tram',
      category: 'Operationeel',
      shortDescription:
        'Gespecialiseerd veiligheidspersoneel bij werkzaamheden nabij trambanen dat tijdig waarschuwt bij naderend tramverkeer.',
      lead: 'Gecertificeerde veiligheidspersonen die continu waken over uw medewerkers bij werkzaamheden in of langs het profiel van vrije ruimte van de tram.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.heroTrafficController,
      whatWeDoIntro:
        'Werken in de nabijheid van trambanen en bovenleidingen brengt specifieke risico’s met zich mee: trams naderen vrijwel geluidloos en hebben een lange remweg. Onze veiligheidspersonen tram hebben als enige taak het bewaken van de veilige werkzone en het tijdig geven van het ontruimingssignaal.',
      whatWeDoBullets: [
        'Continue observatie van naderend tramverkeer en bewaking van de veiligheidszone',
        'Uitvoeren van veiligheidsinstructies voor aanvang van de dienst met de werkploeg',
        'Directe afstemming met vervoersbedrijven en verkeersleiding op locatie',
        'Combinatie mogelijk met bevoegde verkeersregelaars voor kruisend wegverkeer',
      ],
      applications: [
        'Groenvoorziening, snoeiwerk en straatreiniging langs vrije trambanen',
        'Asfalt-, bestratings- en kabelwerkzaamheden op kruisingen met tramspoor',
        'Gevelonderhoud en steigerbouw direct grenzend aan tramroutes',
      ],
      steps: [
        {
          title: 'Risicoanalyse & zichtlijnen',
          description: 'Vooraf beoordelen we de zichtafstanden, rijsnelheden en veilige wijkplaatsen.',
        },
        {
          title: 'Instructie op de werklocatie',
          description: 'Voor de start spreekt de veiligheidspersoon het waarschuwingssignaal en de wijkplaats door met iedereen in het werkvak.',
        },
        {
          title: 'Continue waakzaamheid',
          description: 'Gedurende het werk houdt de veiligheidspersoon onafgebroken toezicht zonder neventaken.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'De exacte locatie (straat en lijnnummer), datum, werktijden, aard van de werkzaamheden en de afstand tot het spoor.',
        },
        {
          question: 'Mag een veiligheidspersoon tram tegelijkertijd meehelpen met de werkzaamheden?',
          answer:
            'Nee. Om de veiligheid 100% te garanderen voert een veiligheidspersoon tram tijdens het bewaken van de werkplek nooit andere werkzaamheden uit.',
        },
        {
          question: 'Hoe snel kunt u leveren?',
          answer:
            'Voor geplande werkzaamheden adviseren wij minimaal 48 uur vooraf aan te vragen; bij spoedstoringen schakelen wij direct via onze 24/7 planning.',
        },
      ],
      relatedSlugs: ['verkeersregelaars', 'calamiteiten', 'verkeersplannen'],
    },
    {
      slug: 'parkeerbegeleiding',
      title: 'Parkeerbegeleiding',
      category: 'Operationeel',
      shortDescription:
        'Gastvrije begeleiding van bezoekers naar parkeergelegenheid met vrije aanrijroutes en nooduitgangen.',
      lead: 'Een warm welkom en een soepele parkeerervaring bij publieksevenementen, congressen, bedrijfsopeningen en drukke winkellocaties.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.eventsTrafficFlow,
      whatWeDoIntro:
        'Het eerste en laatste moment van ieder bezoek vindt plaats op het parkeerterrein. Onze parkeerbegeleiders combineren gastheerschap met strakke logistieke sturing: zij benutten de parkeercapaciteit optimaal en houden calamiteitenroutes vrij.',
      whatWeDoBullets: [
        'Representatieve en vriendelijke ontvangst van bezoekers, VIP-gasten en leveranciers',
        'Efficiënt vullen van parkeervelden, parkeergarages en tijdelijke overloopterreinen',
        'Vrijhouden van kruispunten, inritten van omwonenden en routes voor hulpdiensten',
        'Begeleiding van pendelbussen, taxi-standplaatsen en Kiss & Ride-zones',
      ],
      applications: [
        'Festivals, sportevenementen, beurzen en zakelijke congressen',
        'Tijdelijke parkeerdruk bij winkelcentra, ziekenhuizen en musea',
        'Bedrijfsopeningen en herdenkingsbijeenkomsten',
      ],
      steps: [
        {
          title: 'Capaciteit & rijroutes bepalen',
          description: 'We bekijken de verwachte bezoekerspiek, de in- en uitritten en de bewegwijzering.',
        },
        {
          title: 'Inrichten & ontvangen',
          description: 'Onze parkeerbegeleiders vangen bezoekers al bij de aanrijroute op en wijzen vlot een plek toe.',
        },
        {
          title: 'Gecontroleerde uitstroom',
          description: 'Na afloop schakelen we het terrein om naar uitstroomrichting voor een rustig en veilig vertrek.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'Locatie, datum, verwachte aankomst- en vertrektijden, het geschatte aantal voertuigen en de indeling van de parkeerterreinen.',
        },
        {
          question: 'Kunnen jullie ook tijdelijke parkeerbebording en pionnen meenemen?',
          answer:
            'Ja, wij leveren desgewenst complete bewegwijzering, afzetkegels, verlichting en rijplaatmarkering mee.',
        },
        {
          question: 'Hoe snel kunt u leveren?',
          answer:
            'Binnen 24 uur ontvangt u een voorstel op maat. Ook bij onverwacht grote drukte kunnen wij snel extra begeleiders inzetten.',
        },
      ],
      relatedSlugs: ['evenementen', 'motorbegeleiding', 'verkeersregelaars'],
    },
    {
      slug: 'motorbegeleiding',
      title: 'Motorbegeleiding',
      category: 'Operationeel',
      shortDescription:
        'Mobiele verkeersbegeleiding voor wielerkoersen, hardloopevenementen, konvooien en verplaatsende routes.',
      lead: 'Wendbare motorverkeersregelaars die vooruitrijden op de route, kruispunten tijdig vrijmaken en zorgen voor een veilige doorgang van peloton of stoet.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.eventsTrafficFlow,
      whatWeDoIntro:
        'Bij een verplaatsend evenement verschuift het werkvak elke minuut. Onze gecertificeerde motorverkeersregelaars werken in een rollend systeem: zij beveiligen kruispunten vlak voor aankomst van de stoet en geven de weg direct na passage weer vrij aan het overige verkeer.',
      whatWeDoBullets: [
        'Ervaren motorrijders met landelijke aanstelling als beroepsverkeersregelaar',
        'Beproefd rollend afzetsysteem voor minimale stremmingstijd per kruispunt',
        'Uitgerust met professionele portofooncommunicatie en opvallende signalering',
        'Voorafgaande routeschouw op knelpunten, wegwerkzaamheden en gevaarlijke kruisingen',
      ],
      applications: [
        'Wielerwedstrijden, toertochten, marathons en triatlons',
        'Goede-doelenritten, oldtimertochten en optochten',
        'Begeleiding van bijzondere transporten op stedelijke aansluitroutes',
      ],
      steps: [
        {
          title: 'Routeschouw & draaiboek',
          description: 'We rijden of analyseren de route vooraf en markeren alle kritieke kruispunten.',
        },
        {
          title: 'Rollende beveiliging',
          description: 'Tijdens de tocht rouleren onze motorrijders soepel voor de kop van de wedstrijd of stoet uit.',
        },
        {
          title: 'Vlotte vrijgave',
          description: 'Na de bezemwagen wordt elk kruispunt direct en veilig teruggegeven aan het reguliere verkeer.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'Het GPX-routebestand of de routebeschrijving, datum, start- en finishtijd, verwachte kruissnelheid en het aantal deelnemers.',
        },
        {
          question: 'Combineren jullie motorbegeleiding met vaste posten?',
          answer:
            'Ja, op complexe hoofdkruisingen plaatsen wij vaste verkeersregelaars terwijl de motorrijders de tussenliggende zijstraten afdekken.',
        },
        {
          question: 'Is meerdaagse inzet mogelijk?',
          answer:
            'Uiteraard. Wij begeleiden zowel eendaagse koersen als meerdaagse etappetochten door heel Nederland.',
        },
      ],
      relatedSlugs: ['evenementen', 'parkeerbegeleiding', 'verkeersplannen'],
    },
    {
      slug: 'verkeersplannen',
      title: 'Verkeersplannen',
      category: 'Planning & advies',
      shortDescription:
        'Heldere CROW-conforme verkeersplannen die verkeersstromen, tijdelijke maatregelen en inzet van personeel samenbrengen.',
      lead: 'Doordachte verkeersplannen en faseringstekeningen volgens CROW 96a en 96b, klaar voor vergunningaanvraag én praktische uitvoering buiten.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.stillLifeConePlinth,
      whatWeDoIntro:
        'Een goed verkeersplan voorkomt vertraging bij de vergunningverlening én onduidelijkheid op straat. Onze verkeerskundig tekenaars en adviseurs vertalen uw bouwfasering naar overzichtelijke CROW-conforme verkeersplannen waarin maatregelen, omleidingen en verkeersregelaars logisch op elkaar aansluiten.',
      whatWeDoBullets: [
        'Opstellen van gedetailleerde bebordings- en afzettingstekeningen conform CROW 96a en 96b',
        'Uitwerken van omleidingsroutes voor autoverkeer, fietsers, openbaar vervoer en hulpdiensten',
        'Ondersteuning bij het afstemmingsoverleg met gemeente, provincie en hulpdiensten',
        'Naadloze vertaling van tekening naar plaatsing van borden en inzet van verkeersregelaars',
      ],
      applications: [
        'Vergunningaanvragen voor tijdelijke wegafsluitingen en rijstrookonttrekkingen',
        'Gefaseerde reconstructies van kruispunten en gebiedsontsluitingswegen',
        'Verkeerscirculatieplannen rondom grote bouwprojecten en evenementen',
      ],
      steps: [
        {
          title: 'Projectanalyse',
          description: 'We bespreken uw werkvak, bouwplanning, aanvoerroutes en de eisen van de wegbeheerder.',
        },
        {
          title: 'Ontwerp & toetsing',
          description: 'U ontvangt een heldere verkeersplantekening inclusief maatregelenstaat en toelichting.',
        },
        {
          title: 'Realisatie buiten',
          description: 'Na akkoord verzorgen wij desgewenst direct de plaatsing van de maatregelen en de verkeersregelaars.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'Een situatieschets of DWG/PDF van het werkgebied, de gewenste uitvoeringsperiode, het type werkzaamheden en eventuele randvoorwaarden van de gemeente.',
        },
        {
          question: 'Hoe snel leveren jullie een concept-verkeersplan op?',
          answer:
            'Standaard verkeersplannen leveren wij binnen 3 tot 5 werkdagen op; bij spoedprojecten kan dit binnen 24 tot 48 uur.',
        },
        {
          question: 'Passen jullie het plan aan als de gemeente opmerkingen heeft?',
          answer:
            'Ja, een revisieronde naar aanleiding van opmerkingen van de wegbeheerder of hulpdiensten is bij ons altijd inbegrepen.',
        },
      ],
      relatedSlugs: ['blvc-plannen', 'tijdelijke-verkeersmaatregelen', 'projectcoordinatie'],
    },
    {
      slug: 'blvc-plannen',
      title: 'BLVC-plannen',
      category: 'Planning & advies',
      shortDescription:
        'Bereikbaarheid, Leefbaarheid, Veiligheid en Communicatie integraal geborgd in de voorbereiding van uw project.',
      lead: 'Praktische BLVC-plannen waarmee u draagvlak creëert bij gemeenten en omwonenden, en hinder rond uw bouwplaats aantoonbaar beperkt.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.heroCalmRoadworks,
      whatWeDoIntro:
        'Steeds meer gemeenten stellen bij binnenstedelijke bouw- en infraprojecten een BLVC-plan verplicht. Wij schrijven geen papieren tijgers, maar concrete plannen die direct laten zien hoe de buurt bereikbaar blijft, hoe bouwverkeer veilig rijdt en hoe de omgeving tijdig wordt geïnformeerd.',
      whatWeDoBullets: [
        'Volledige uitwerking van Bereikbaarheid, Leefbaarheid, Veiligheid en Communicatie per bouwfase',
        'Afstemming van venstertijden, laad- en loszones, schoolroutes en calamiteitenroutes',
        'Integratie met bouwplaatsinrichting, verkeersplannen en inzet van bouwportiers',
        'Begeleiding bij EMVI/BPKV-aanbestedingen en omgevingsgesprekken',
      ],
      applications: [
        'Binnenstedelijke herontwikkeling, sloop- en nieuwbouwprojecten',
        'Grootschalige verduurzamings- en rioleringsprojecten in woonwijken',
        'Aanbestedingen waarbij omgevingsmanagement en hinderbeperking zwaar meewegen',
      ],
      steps: [
        {
          title: 'Omgevingsscan',
          description: 'We brengen scholen, winkeliers, OV-routes, bewoners en kwetsbare verkeersstromen in beeld.',
        },
        {
          title: 'Uitwerking per bouwfase',
          description: 'Per fase leggen we concrete maatregelen, rijroutes en communicatiemomenten vast.',
        },
        {
          title: 'Borging tijdens uitvoering',
          description: 'Onze coördinatoren en bouwportiers voeren de afspraken uit het BLVC-plan buiten daadwerkelijk uit.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'De projectlocatie, de globale fasering, de bouwplaatsinrichting en het BLVC-kader of de leidraad van de betreffende gemeente.',
        },
        {
          question: 'Kunnen jullie het BLVC-plan ook combineren met verkeersplannen?',
          answer:
            'Graag zelfs. Door BLVC en de CROW-verkeersplannen in één hand te houden, sluiten tekst en tekeningen 100% op elkaar aan.',
        },
        {
          question: 'Hoe snel kunt u leveren?',
          answer:
            'Een compleet BLVC-plan staat doorgaans binnen 5 tot 8 werkdagen klaar voor indiening bij het bevoegd gezag.',
        },
      ],
      relatedSlugs: ['verkeersplannen', 'bouwportier', 'projectcoordinatie'],
    },
    {
      slug: 'projectcoordinatie',
      title: 'Projectcoördinatie',
      category: 'Planning & advies',
      shortDescription:
        'Één vast aanspreekpunt dat voorbereiding, planning, vergunningen en aansturing op locatie met elkaar verbindt.',
      lead: 'Volledige ontzorging op het gebied van verkeersmanagement: uw vaste projectcoördinator bewaakt de planning, stuurt de mensen buiten aan en houdt contact met de wegbeheerder.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.operationsSiteAccess,
      whatWeDoIntro:
        'Bij complexe of langdurige projecten wilt u als hoofduitvoerder of projectleider niet dagelijks bezig zijn met het verschuiven van borden of het inplannen van diensten. Onze projectcoördinator neemt de volledige regie over de tijdelijke verkeersorganisatie uit handen.',
      whatWeDoBullets: [
        'Één vast aanspreekpunt voor uw uitvoeringsteam, gemeente en onderaannemers',
        'Dagelijkse afstemming van personeelsinzet, bebording en wijzigende werkvakken',
        'Periodieke schouw en kwaliteitscontrole op de werklocatie',
        'Proactieve bijsturing bij weersinvloeden, uitloop of gewijzigde bouwlogistiek',
      ],
      applications: [
        'Meerjarige gebiedsontwikkelingen en grote wegenbouwprojecten',
        'Raamcontracten voor gemeentelijk onderhoud en warmtenetaanleg',
        'Hoogwaardige utiliteitsbouw met strakke just-in-time leveringen',
      ],
      steps: [
        {
          title: 'Kick-off & fasering',
          description: 'Uw coördinator sluit aan bij het bouwteam en vertaalt de uitvoeringsplanning naar verkeersinzet.',
        },
        {
          title: 'Aanwezigheid op locatie',
          description: 'We instrueren de ploegen, controleren de afzettingen en zijn bereikbaar voor uw uitvoerders.',
        },
        {
          title: 'Overzichtelijke rapportage',
          description: 'U ontvangt heldere weekoverzichten van de inzet, uren en voortgang per deelfase.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'Een overzicht van de projectomvang, de doorlooptijd en de gewenste rolverdeling tussen uw uitvoeringsteam en onze coördinator.',
        },
        {
          question: 'Is meerdaagse of meermaandelijkse inzet mogelijk?',
          answer:
            'Ja, projectcoördinatie wordt juist ingezet op trajecten van enkele weken tot meerdere jaren.',
        },
        {
          question: 'Hoe snel kunt u starten?',
          answer:
            'Binnen 24 uur plannen wij een kennismaking met een van onze senior projectcoördinatoren.',
        },
      ],
      relatedSlugs: ['verkeersplannen', 'tijdelijke-verkeersmaatregelen', 'verkeersregelaars'],
    },
    {
      slug: 'tijdelijke-verkeersmaatregelen',
      title: 'Tijdelijke verkeersmaatregelen',
      category: 'Totaaloplossingen',
      shortDescription:
        'Afzettingen, bebording, geleidebakens en omleidingsroutes vakkundig geplaatst, gecontroleerd en onderhouden.',
      lead: 'Van enkele omleidingsborden tot complete werkvakafzettingen conform BRL 9101 en CROW 96b: wij plaatsen, controleren en verwijderen alle tijdelijke verkeersmaatregelen.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.heroCalmRoadworks,
      whatWeDoIntro:
        'Duidelijke bebording en verzorgde afzettingen zorgen voor rust bij de weggebruiker en veiligheid voor de vakmensen in het werkvak. Wij leveren, plaatsen en onderhouden gecertificeerd materiaal en combineren dit naadloos met de inzet van onze verkeersregelaars.',
      whatWeDoBullets: [
        'Plaatsen en instandhouden van RVV-bebording, tekstkarren, geleidebakens en barriers',
        'Uitvoering conform CROW 96a/96b en BRL 9101 door gecertificeerde monteurs',
        'Inrichten van heldere geel-zwarte omleidingsroutes voor auto- en fietsverkeer',
        '24/7 storingsdienst bij stormschade, aanrijdingen of wijzigingen in de fasering',
      ],
      applications: [
        'Volledige of gedeeltelijke wegafsluitingen op gemeentelijke en provinciale wegen',
        'Tijdelijke snelheidsbeperkingen en versmalde rijstroken bij wegwerkzaamheden',
        'Bewegwijzering en parkeerverboden bij evenementen en verhuizingen',
      ],
      steps: [
        {
          title: 'Tekening & materiaallijst',
          description: 'Op basis van het verkeersplan stellen we de exacte bebordings- en afzettingsstaat samen.',
        },
        {
          title: 'Vakkundige plaatsing',
          description: 'Onze buitendienst plaatst de maatregelen op het afgesproken tijdstip en legt dit vast met schouwfoto’s.',
        },
        {
          title: 'Beheer & tijdige vrijgave',
          description: 'We controleren de opstelling tussentijds en halen alles direct na afronding van het werk weer weg.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'De locatie, gewenste plaatsings- en ophaaldatum, en indien aanwezig het verkeersplan. Heeft u nog geen verkeersplan? Dan tekenen wij dit direct voor u uit.',
        },
        {
          question: 'Is meerdaagse of langdurige huur mogelijk?',
          answer:
            'Ja, al onze tijdelijke verkeersmaatregelen zijn zowel voor één dag als voor langlopende bouwprojecten te huur inclusief onderhoud.',
        },
        {
          question: 'Hoe snel kunt u leveren?',
          answer:
            'Geplande afzettingen staan op het exact afgesproken moment. Voor spoedafzettingen na een calamiteit rijden wij 24/7 direct uit.',
        },
      ],
      relatedSlugs: ['verkeersplannen', 'verkeersregelaars', 'calamiteiten'],
    },
    {
      slug: 'evenementen',
      title: 'Evenementen verkeersmanagement',
      category: 'Totaaloplossingen',
      shortDescription:
        'Bezoekers- en verkeersstromen soepel geregeld vanaf de aanrijroute en het parkeren tot en met een veilig vertrek.',
      lead: 'Gastvrij en doordacht verkeersmanagement voor publieksevenementen, festivals, sportwedstrijden en congressen in heel Nederland.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.eventsTrafficFlow,
      whatWeDoIntro:
        'Bij een geslaagd evenement merken bezoekers nauwelijks dat het verkeer geregeld wordt: alles stroomt logisch en ontspannen door. Wij verzorgen het volledige mobiliteitstraject van mobiliteitsplan en vergunningstekening tot bebording, parkeerbegeleiders en beroepsverkeersregelaars.',
      whatWeDoBullets: [
        'Integraal verkeers- en mobiliteitsplan voor vergunningverlening en veiligheidsregio',
        'Gastvrije evenementen- en beroepsverkeersregelaars op aanrijroutes en oversteekplaatsen',
        'Inrichting van parkeerterreinen, fietsenstallingen, Kiss & Ride en pendelbusroutes',
        'Centrale coördinatie op het evenemententerrein met directe lijn naar organisatie en hulpdiensten',
      ],
      applications: [
        'Meerdaagse muziekfestivals, culinaire evenementen en stadsfeesten',
        'Wielerkoersen, hardloopevenementen en grote stadionbijeenkomsten',
        'Zakelijke congressen, beurzen en open dagen op bedrijfslocaties',
      ],
      steps: [
        {
          title: 'Mobiliteitsplan & vergunning',
          description: 'We vertalen bezoekersaantallen en tijdsloten naar heldere aanrijroutes en capaciteitsberekeningen.',
        },
        {
          title: 'Opbouw & ontvangst',
          description: 'Wij plaatsen de bewegwijzering en ontvangen uw bezoekers met een glimlach op alle posten.',
        },
        {
          title: 'Uitstroom & afbouw',
          description: 'Tijdens de piek aan het einde van het evenement zorgen wij voor een veilige, vlotte uitstroom.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig?',
          answer:
            'Locatie, datum, openingstijden, verwacht bezoekersaantal, vervoersmix (auto, fiets, OV/pendelbus) en de beschikbare parkeervelden.',
        },
        {
          question: 'Is meerdaagse inzet mogelijk?',
          answer:
            'Ja, wij begeleiden veel meerdaagse evenementen inclusief de op- en afbouwdagen voor leveranciers.',
        },
        {
          question: 'Hoe snel kunt u een voorstel maken?',
          answer:
            'Binnen 24 uur ontvangt u een eerste inschatting of plannen we een routeschouw op het evenemententerrein.',
        },
      ],
      relatedSlugs: ['parkeerbegeleiding', 'motorbegeleiding', 'tijdelijke-verkeersmaatregelen'],
    },
    {
      slug: 'calamiteiten',
      title: 'Calamiteiten & spoedinzet',
      category: 'Totaaloplossingen',
      shortDescription:
        'Snelle 24/7 inzet van verkeersregelaars en afzettingen bij incidenten, netstoringen en onverwachte wegafsluitingen.',
      lead: 'Wanneer elke minuut telt: onze 24/7 calamiteitendienst levert dag en nacht gecertificeerde verkeersregelaars en spoedafzettingen op locatie.',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.heroTrafficController,
      whatWeDoIntro:
        'Een gesprongen waterleiding, stroomstoring, spoedreparatie aan het wegdek of een uitgevallen verkeerslicht wacht niet tot kantooruren. Via ons 24/7 noodnummer krijgt u direct een ervaren planner aan de lijn die onmiddellijk verkeersregelaars en afzetmateriaal uit de regio aanstuurt.',
      whatWeDoBullets: [
        '24 uur per dag, 365 dagen per jaar direct persoonlijk contact met onze eigen meldkamer/planning',
        'Snelle opkomsttijden dankzij landelijke spreiding van verkeersregelaars en steunpunten',
        'Directe beveiliging van het werkvak zodat storingsmonteurs veilig kunnen starten',
        'Mogelijkheid tot naadloze overgang van spoedinzet naar meerdaagse herstelwerkzaamheden',
      ],
      applications: [
        'Acute kabel-, gas-, water- en warmtenetstoringen',
        'Spoedherstel van asfalt, verzakkingen, bruggen en vangrails',
        'Storing of aanrijdingsschade bij verkeersregelinstallaties (VRI) en spoorwegovergangen',
        'Storm-, water- of brandschade waarbij straten tijdelijk moeten worden afgezet',
      ],
      steps: [
        {
          title: 'Directe melding (24/7)',
          description: 'U belt onze spoedlijn en geeft de locatie en de aard van de calamiteit door.',
        },
        {
          title: 'Onmiddellijke uitruk',
          description: 'De dichtstbijzijnde verkeersregelaars en eventuele afzetwagen gaan direct onderweg.',
        },
        {
          title: 'Veilig stellen & overdracht',
          description: 'Ter plaatse stemmen we af met de storingsmonteur of hulpdienst en houden we u op de hoogte.',
        },
      ],
      faqs: [
        {
          question: 'Welke informatie heeft u nodig bij een spoedmelding?',
          answer:
            'De exacte locatie (adres of hectometerpaal), het type incident, een telefoonnummer van de contactpersoon op locatie en het gewenste aantal verkeersregelaars.',
        },
        {
          question: 'Hoe snel zijn jullie op locatie?',
          answer:
            'Bij spoed sturen wij direct de dichtstbijzijnde vakmensen aan. Afhankelijk van de regio zijn wij doorgaans binnen 60 tot 90 minuten ter plaatse.',
        },
        {
          question: 'Kunnen wij ook een vast 24/7 raamcontract voor calamiteiten afsluiten?',
          answer:
            'Ja. Voor aannemers, gemeenten en nutsbedrijven richten wij vaste 24/7 waakdiensten en SLA-afspraken in.',
        },
      ],
      relatedSlugs: ['verkeersregelaars', 'tijdelijke-verkeersmaatregelen', 'veiligheidspersoon-tram'],
    },
  ] as ServiceItem[],
  opleidingenPage: {
    breadcrumb: 'Opleidingen',
    titleBefore: 'Praktijkgerichte',
    titleItalic: 'veiligheidsopleidingen',
    lead: 'Goed opgeleide mensen maken het verschil op straat. Via de Atlas Academie verzorgen wij erkende opleidingen en herhalingstrainingen voor onze eigen vakmensen én voor teams van opdrachtgevers.',
    courses: [
      {
        id: 'beroepsverkeersregelaar',
        title: 'Beroepsverkeersregelaar (Landelijke aanstelling)',
        duration: '4 dagen (theorie + praktijkexamen)',
        level: 'Erkend SVNL-examen',
        certificate: 'Landelijke aanstellingspas (5 jaar geldig)',
        summary:
          'De volledige opleiding tot landelijk bevoegd beroepsverkeersregelaar. Inclusief wet- en regelgeving, stoptekens, dynamisch regelen op drukke kruispunten en praktijkexamen op de openbare weg.',
        highlights: ['Theorie, kruispunttraining en examenbegeleiding', 'Inclusief aanvraag landelijke aanstellingspas'],
      },
      {
        id: 'brl-9101',
        title: 'BRL 9101 — Veilig werken langs de weg (CROW 96a/96b)',
        duration: '2 dagen',
        level: 'Monteur & Vakman TVM',
        certificate: 'Erkend BRL 9101 / CROW certificaat',
        summary:
          'Voor iedereen die tijdelijke verkeersmaatregelen plaatst, controleert of verwijdert. Focus op veilig opbouwen en afbreken van werkvakken volgens CROW 96a en 96b.',
        highlights: ['Praktijkoefeningen met bebording en bakens', 'Toetsing op actuele CROW-richtlijnen'],
      },
      {
        id: 'vca-vol',
        title: 'VCA Basis & VCA-VOL',
        duration: '1 dag (inclusief aansluitend examen)',
        level: 'Basisveiligheid & Operationeel Leidinggevenden',
        certificate: 'Officieel VCA-diploma (10 jaar geldig)',
        summary:
          'Onmisbare kennis over veilig werken op de bouwplaats en langs de infrastructuur: risicobeheersing, PBM’s, werkvergunningen en handelen bij gevaarlijke situaties.',
        highlights: ['Klassikale lesdag met ervaren praktijkdocent', 'Direct digitaal examen aan het einde van de dag'],
      },
      {
        id: 'ehbo-bhv',
        title: 'BHV & Levensreddend Handelen op de bouwplaats',
        duration: '1 dag',
        level: 'Basis & Herhaling',
        certificate: 'BHV-certificaat & pas (1 jaar geldig)',
        summary:
          'Snel en doeltreffend handelen bij ongevallen op de werklocatie: reanimatie met AED, wondverzorging, brandbestrijding en alarmering van hulpdiensten.',
        highlights: ['Afgestemd op buitenwerk in infra en bouw', 'Praktijkgerichte scenario’s'],
      },
      {
        id: 'agressie-conflicthantering',
        title: 'De-escalerend communiceren & Agressiehantering',
        duration: '1 dagdeel (4 uur)',
        level: 'Verdiepingstraining',
        certificate: 'Bewijs van deelname Atlas Academie',
        summary:
          'Hoe blijf je kalm, gastvrij en duidelijk wanneer weggebruikers gehaast of gefrustreerd zijn? Praktische gesprekstechnieken en houding op straat met een trainingsacteur.',
        highlights: ['Oefenen met realistische praktijksituaties', 'Direct meer rust en zelfvertrouwen op post'],
      },
      {
        id: 'tramveiligheid',
        title: 'Veiligheidspersoon Tram & Stedelijk Spoor',
        duration: '1 dag',
        level: 'Specialisatie',
        certificate: 'Certificaat Veiligheidspersoon Tram',
        summary:
          'Gespecialiseerde instructie voor het beveiligen van werkploegen binnen of nabij het profiel van vrije ruimte van trambanen en bovenleidingen.',
        highlights: ['Zichtlijnen, remwegen en ontruimingsprocedures', 'Communicatie met werkploeg en vervoerder'],
      },
    ] as CourseItem[],
    form: {
      heading: 'Inschrijven of incompany aanvragen',
      subtext:
        'Wilt u uzelf of een medewerker aanmelden voor een opleiding, of zoekt u een groepstraining op uw eigen locatie? Laat uw gegevens achter; wij nemen binnen één werkdag contact op met de eerstvolgende startdata.',
    },
  },
  overOnsPage: {
    breadcrumb: 'Over ons',
    titleBefore: 'Veiligheid met',
    titleItalic: 'aandacht en rust',
    lead: 'Atlas Holland B.V. is opgericht vanuit een heldere overtuiging: verkeersveiligheid op en rond werkplekken verdient dezelfde zorgvuldigheid, uitstraling en betrouwbaarheid als het bouwproject zelf.',
    storyHeading: 'Alles onder één dak, met korte lijnen',
    storyParagraphs: [
      'Waar verkeersregeling vaak als sluitpost wordt gezien, benaderen wij ieder werkvak en evenement als een visitekaartje voor de opdrachtgever. Een weggebruiker die vriendelijk en duidelijk wordt begeleid, ervaart minder hinder en volgt aanwijzingen met vertrouwen op.',
      'Daarom combineren wij verkeerskundige voorbereiding (verkeersplannen, BLVC en vergunningen) met eigen gecertificeerde vakmensen en tijdelijke verkeersmaatregelen. U heeft één vast aanspreekpunt dat zowel de tekening als de praktijk buiten door en door kent.',
      'Onze mensen op straat krijgen de beste uitrusting, doorlopende scholing en persoonlijke begeleiding. Want wie met plezier en trots op zijn post staat, straalt precies die kalmte uit die het verkeer veilig in beweging houdt.',
    ],
    values: [
      {
        title: 'Veiligheid',
        description:
          'Geen concessies aan zichtbaarheid, gecertificeerde kennis en een veilige werkplek voor onze mensen en uw bouwteam.',
      },
      {
        title: 'Kwaliteit',
        description:
          'Verzorgde uitrusting, stipte opkomst, CROW-conforme plannen en heldere terugkoppeling na iedere dienst.',
      },
      {
        title: 'Betrokkenheid',
        description:
          'Wij denken vooraf mee over slimme faseringen en kennen onze opdrachtgevers én onze verkeersregelaars persoonlijk.',
      },
      {
        title: 'Flexibiliteit',
        description:
          'Bouwplanningen veranderen. Onze 24/7 planning schakelt soepel mee bij uitloop, nachtwerk of onverwachte spoed.',
      },
    ],
  },
  werkenBijPage: {
    breadcrumb: 'Werken bij Atlas',
    titleBefore: 'Jouw inzet',
    titleItalic: 'maakt het verschil',
    titleAfter: '.',
    subtitleBadge: 'Geen ervaring? Wij leiden je op.',
    lead: 'Als verkeersregelaar of veiligheidspersoon bij Atlas Holland zorg jij voor rust en veiligheid op de weg. Je werkt buiten, hebt afwisselende projecten in jouw regio en staat er nooit alleen voor.',
    benefits: [
      {
        title: 'Salaris & vakantiegeld',
        description:
          'Een uitstekend uurloon dat wekelijks of vierwekelijks stipt wordt uitbetaald, inclusief reiskostenvergoeding en toeslagen voor avond-, nacht- en weekenduren.',
      },
      {
        title: 'Gratis opleidingen',
        description:
          'Nog geen aanstellingspas of VCA? Wij betalen je volledige opleiding tot beroepsverkeersregelaar en begeleiden je persoonlijk naar het examen.',
      },
      {
        title: 'Werkkleding & PBM',
        description:
          'Je ontvangt een compleet, comfortabel en representatief kledingpakket voor elk seizoen, inclusief verwarmde winterkleding en professionele portofoon.',
      },
      {
        title: 'Hecht team',
        description:
          'Bij Atlas ben je geen nummer. Onze planners kennen je bij naam, houden rekening met jouw voorkeursuren en komen regelmatig langs op locatie.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Solliciteer',
        description: 'Vul binnen twee minuten het formulier in — met of zonder cv.',
      },
      {
        number: '02',
        title: 'Kennismaken',
        description: 'We drinken samen een kop koffie en bespreken jouw wensen en uren.',
      },
      {
        number: '03',
        title: 'Opleiding',
        description: 'Heb je nog geen pas? Dan start je direct met de gratis opleiding.',
      },
      {
        number: '04',
        title: 'Aan de slag',
        description: 'Volledig uitgerust en goed ingewerkt ga je op pad in jouw regio.',
      },
    ],
    vacancies: [
      {
        slug: 'beroepsverkeersregelaar-fulltime-parttime',
        title: 'Beroepsverkeersregelaar (met of zonder ervaring)',
        region: 'Landelijk / Eigen regio',
        hours: '16 – 40 uur per week',
        start: 'Per direct of in overleg',
        salaryIndication: '€ 16,50 – € 21,00 bruto per uur + toeslagen',
        summary:
          'Houd het verkeer veilig en gastvrij in beweging bij wegwerkzaamheden, bouwprojecten en evenementen in jouw eigen regio.',
        intro:
          'Elke dag is anders wanneer je buiten werkt als beroepsverkeersregelaar bij Atlas Holland. De ene week begeleid je het verkeer bij de herinrichting van een gezellige binnenstad, de volgende week sta je bij een groot infraproject of een mooi evenement.',
        whatYouDo: [
          'Je begeleidt weggebruikers (automobilisten, fietsers en voetgangers) veilig en duidelijk langs wegwerkzaamheden of omleidingen.',
          'Je bent het vriendelijke en kalme aanspreekpunt voor bewoners en passanten die een vraag hebben over de route.',
          'Je werkt nauw samen met je collega-verkeersregelaars, de uitvoerder op locatie en onze centrale planning.',
          'Je let scherp op de veiligheid van het werkvak en de zichtbaarheid van de afzettingen.',
        ],
        whatWeAsk: [
          'Je hebt een verantwoorde, rustige en gastvrije houding in het verkeer.',
          'Je spreekt goed Nederlands zodat je duidelijk kunt communiceren met weggebruikers en collega’s.',
          'Ervaring of een geldige aanstellingspas is mooi meegenomen, maar niet verplicht: wij leiden je volledig gratis op.',
          'Je bent minimaal 16 uur per week beschikbaar (fulltime, parttime of flexibel in te delen).',
        ],
        whatWeOffer: [
          'Een uitstekend salaris tussen € 16,50 en € 21,00 bruto per uur (afhankelijk van ervaring), plus onregelmatigheidstoeslagen.',
          'Volledig betaalde opleiding tot landelijk beroepsverkeersregelaar én VCA.',
          'Hoogwaardig kledingpakket voor zomer en winter en goede reiskostenvergoeding (of bedrijfsauto in overleg).',
          'Een fijne werksfeer met planners die echt naar je luisteren en zorgen voor werk dicht bij huis.',
        ],
      },
      {
        slug: 'bouwportier-toegangscontrole',
        title: 'Bouwportier & Logistiek Verkeersbegeleider',
        region: 'Randstad, Utrecht & Noord-Brabant',
        hours: '24 – 40 uur per week',
        start: 'In overleg',
        salaryIndication: '€ 17,25 – € 21,50 bruto per uur',
        summary:
          'Het vaste gezicht aan de poort van moderne bouwprojecten: jij combineert gastvrij ontvangst met veilig bouwtransport.',
        intro:
          'Als bouwportier heb je een vaste, verantwoordelijke plek bij één of twee mooie bouwprojecten. Je kent de uitvoerders en chauffeurs bij naam, houdt overzicht bij de poort en zorgt dat vrachtverkeer veilig de openbare weg op en af rijdt.',
        whatYouDo: [
          'Je ontvangt bezoekers, onderaannemers en chauffeurs bij de ingang van de bouwplaats en registreert hun komst.',
          'Je ziet erop toe dat iedereen het terrein betreedt met de juiste persoonlijke beschermingsmiddelen.',
          'Bij zwaar bouwtransport zet je als bevoegd verkeersregelaar kort het verkeer en fietspad stil voor een veilige manoeuvre.',
          'Je houdt de in- en uitrit vrij en schakelt direct met de uitvoerder bij leveringen.',
        ],
        whatWeAsk: [
          'Je bent representatief, communicatief vaardig en staat stevig in je schoenen.',
          'Je vindt het prettig om op een vaste projectlocatie structuur en rust te bewaren.',
          'Je hebt een aanstellingspas verkeersregelaar en VCA, of bent bereid deze via ons kosteloos te behalen.',
        ],
        whatWeOffer: [
          'Vaste werktijden overdag (meestal maandag t/m vrijdag tussen 06:30 en 16:00 uur) op een vaste locatie.',
          'Goed salaris, pensioenopbouw, vakantiegeld en reiskostenvergoeding.',
          'Een verwarmde portiersloge op locatie en een compleet Atlas kledingpakket.',
        ],
      },
      {
        slug: 'evenementen-en-weekendverkeersregelaar',
        title: 'Evenementen- & Weekendverkeersregelaar (Bijbaan / Flexibel)',
        region: 'Heel Nederland',
        hours: '8 – 24 uur per week (flexibel)',
        start: 'Per direct',
        salaryIndication: '€ 16,00 – € 19,50 bruto per uur + weekendtoeslag',
        summary:
          'Werk op de mooiste festivals, sportwedstrijden en publieksevenementen en bepaal zelf welke dagen je werkt.',
        intro:
          'Zoek je een afwisselende parttime baan of bijbaan in de buitenlucht waarbij je zelf je rooster bepaalt? Met ons evenemententeam zorg je bij festivals, concerten en wielerkoersen dat duizenden bezoekers met een glimlach aankomen en parkeren.',
        whatYouDo: [
          'Je verwelkomt bezoekers op aanrijroutes en begeleidt hen vlot naar de juiste parkeervelden of Kiss & Ride.',
          'Je houdt kruispunten en calamiteitenroutes rondom het evenemententerrein veilig en overzichtelijk.',
          'Je werkt in een gezellig team onder leiding van een ervaren Atlas-coördinator.',
        ],
        whatWeAsk: [
          'Je bent gastvrij, energiek en werkt graag samen in een team.',
          'Je bent regelmatig beschikbaar in het weekend of tijdens evenementendagen.',
          'Minimumleeftijd 18 jaar; wij verzorgen je instructie en opleiding.',
        ],
        whatWeOffer: [
          'Maximale flexibiliteit: geef via onze app eenvoudig door wanneer je wel en niet kunt werken.',
          'Aantrekkelijk uurloon inclusief mooie weekend- en avondtoeslagen.',
          'Samenwerken op bijzondere evenementenlocaties door het hele land.',
        ],
      },
      {
        slug: 'projectcoordinator-buitendienst',
        title: 'Projectcoördinator Verkeersveiligheid (Binnendienst / Buitendienst)',
        region: 'Utrecht (centraal) & landelijk',
        hours: '32 – 40 uur per week',
        start: 'In overleg',
        salaryIndication: '€ 3.400 – € 4.350 bruto per maand + leaseauto',
        summary:
          'De schakel tussen onze opdrachtgevers, de planning en onze mensen buiten. Jij bewaakt de kwaliteit en veiligheid op onze projecten.',
        intro:
          'Als projectcoördinator ben je het vaste gezicht voor een aantal van onze vaste aannemers en gemeenten. Je neemt nieuwe aanvragen op, bezoekt werklocaties en zorgt dat onze verkeersregelaars en afzettingen er altijd piekfijn bij staan.',
        whatYouDo: [
          'Je adviseert opdrachtgevers op locatie over de beste inzet van verkeersregelaars en tijdelijke verkeersmaatregelen.',
          'Je brieft en begeleidt onze verkeersregelaars bij de opstart van nieuwe of complexe projecten.',
          'Je voert werkplekinspecties uit en stemt af met uitvoerders en gemeentelijke toezichthouders.',
          'Je werkt nauw samen met onze verkeerskundig tekenaars en de centrale planning in Utrecht.',
        ],
        whatWeAsk: [
          'Je hebt ervaring in de infra, bouwlogistiek of verkeersveiligheid (bijvoorbeeld als hoofduitvoerder, senior verkeersregelaar of werkvoorbereider).',
          'Je bent oplossingsgericht, houdt het hoofd koel en communiceert helder.',
          'Je bent in het bezit van rijbewijs B en VCA-VOL (of bereid dit te halen).',
        ],
        whatWeOffer: [
          'Een zelfstandige sleutelrol binnen een groeiend, warm familie- en vakbedrijf.',
          'Uitstekend maandsalaris, representatieve leaseauto, laptop en telefoon.',
          'Volop ruimte om mee te bouwen aan de verdere groei van Atlas Holland.',
        ],
      },
    ] as VacancyItem[],
    faqs: [
      {
        question: 'Ik heb nog geen ervaring of certificaat. Kan ik dan toch solliciteren?',
        answer:
          'Jazeker! De meeste van onze collega’s zijn zonder ervaring begonnen. Wij regelen én betalen je opleiding tot landelijk beroepsverkeersregelaar en je VCA-certificaat. Tijdens het inwerken ga je eerst samen met een ervaren collega op pad.',
      },
      {
        question: 'Kan ik zelf aangeven hoeveel uur en op welke dagen ik wil werken?',
        answer:
          'Ja. Of je nu een vaste fulltime werkweek van 40 uur zoekt of liever 2 of 3 vaste dagen per week werkt: we spreken samen een rooster af dat past bij jouw thuissituatie.',
      },
      {
        question: 'Moet ik een rijbewijs hebben om als verkeersregelaar te werken?',
        answer:
          'Een rijbewijs B is handig en geeft je meer mogelijkheden, maar is niet verplicht. Veel locaties in steden zijn ook uitstekend bereikbaar met het openbaar vervoer of door samen te rijden met een collega uit de buurt.',
      },
      {
        question: 'Hoe snel hoor ik iets na mijn sollicitatie?',
        answer:
          'Binnen één werkdag belt onze recruiter of planner je op voor een korte kennismaking. Vaak kun je dezelfde week al langskomen voor een kop koffie.',
      },
    ],
  },
};

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return nl.services.find((s) => s.slug === slug);
}

export function getVacancyBySlug(slug: string): VacancyItem | undefined {
  return nl.werkenBijPage.vacancies.find((v) => v.slug === slug);
}
