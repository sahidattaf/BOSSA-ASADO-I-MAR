export const siteRoutes = [
  ['Home', '/'],
  ['Menu', '/menu'],
  ['Weekend Fire', '/weekend-fire'],
  ['Rooftop', '/rooftop-lounge'],
  ['Catering', '/catering'],
  ['Private Events', '/private-events'],
  ['Tourists', '/tourist-experiences'],
  ['Gallery', '/gallery'],
  ['Reviews', '/reviews'],
  ['Partners', '/partners'],
  ['Contact', '/contact'],
  ['AI Concierge', '/ai-concierge'],
] as const;

export const revenuePages = {
  catering: {
    eyebrow: 'Catering · Villas · Weddings · Offices · Yacht Groups',
    title: 'Fire-grill catering in Curacao.',
    subtitle:
      'BOSSA brings wood-fire food, Caribbean sides, and clean WhatsApp planning to villas, offices, weddings, yacht groups, hotels, and Airbnb hosts.',
    image: '/images/bossa/bbq-party-del-rey.jpg',
    primaryCta: 'Request catering quote',
    whatsappMessage:
      'Bon dia BOSSA, I want a catering quote. Name: ___ Event date: ___ Guest count: ___ Location: ___ Budget: ___ Preferred food style: ___',
    sections: [
      {
        title: 'Catering Packages',
        items: [
          'Fire box service for casual groups and villa nights.',
          'Skewer, ribs, chicken, seafood, and sandwich trays.',
          'Corporate lunch and office celebration formats.',
          'Wedding, yacht, hotel, and Airbnb guest experiences.',
        ],
      },
      {
        title: 'Perfect For',
        items: ['Villa owners', 'Corporate offices', 'Weddings', 'Yacht groups', 'Hotels', 'Airbnb hosts'],
      },
      {
        title: 'How It Works',
        items: [
          'Send guest count, date, location, budget, and food direction.',
          'BOSSA confirms fire capacity and the best service format.',
          'Menu, quote, and pickup or event timing are locked before prep.',
        ],
      },
    ],
  },
  privateEvents: {
    eyebrow: 'Private Dining · Group Bookings · Fire Experience',
    title: 'Private events with BOSSA fire energy.',
    subtitle:
      'Plan birthdays, corporate dinners, family gatherings, tour groups, bachelor nights, and hotel guest events around a clear fire-grill food flow.',
    image: '/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png',
    primaryCta: 'Plan private event',
    whatsappMessage:
      'Bon dia BOSSA, I want to plan a private event. Name: ___ Date: ___ Group size: ___ Event type: ___ Budget: ___',
    sections: [
      {
        title: 'Event Types',
        items: ['Birthdays', 'Corporate dinners', 'Family gatherings', 'Tour groups', 'Bachelor nights', 'Hotel guest events'],
      },
      {
        title: 'BOSSA Fire Experience',
        items: [
          'Fire boxes and trays for easy group service.',
          'Skewers, ribs, chicken, seafood direction, sides, and sauces.',
          'Rooftop or terrace-style energy when the venue supports it.',
        ],
      },
      {
        title: 'Planning Flow',
        items: [
          'Send date, group size, event type, and budget.',
          'BOSSA recommends the right group menu format.',
          'Confirm pickup, delivery, or event handoff timing.',
        ],
      },
    ],
  },
  touristExperiences: {
    eyebrow: 'Tourist Experiences · Sunset · Fire · Caribbean Flavor',
    title: 'Curaçao fire-grill experiences for visitors.',
    subtitle:
      'Turn dinner into a memorable island moment: sunset fire dinners, Caribbean grill nights, chef table energy, rum-and-fire packages, and content creator experiences.',
    image: '/images/bossa/hero-grill-area.png',
    primaryCta: 'Book tourist experience',
    whatsappMessage:
      'Bon dia BOSSA, I want a tourist experience. Name: ___ Date: ___ Guest count: ___ Package interest: ___ Hotel / location: ___',
    sections: [
      {
        title: 'Experience Ideas',
        items: [
          'Sunset Fire Dinner with welcome drink and fire-grill platter.',
          'Caribbean Grill Experience for visitors who want local flavor.',
          'Rum & Fire Night for small groups and special occasions.',
          'Chef Table Experience for premium private bookings.',
          'Content Creator Package for photo and video moments.',
        ],
      },
      {
        title: 'Partner Friendly',
        items: ['Hotels', 'Tour operators', 'Villa managers', 'Airbnb hosts', 'Yacht charters'],
      },
      {
        title: 'Booking Flow',
        items: [
          'Send travel date, guest count, package interest, and location.',
          'BOSSA confirms availability and suggested experience format.',
          'Guests receive a simple WhatsApp confirmation.',
        ],
      },
    ],
  },
  partners: {
    eyebrow: 'Hotels · Airbnb Hosts · Villa Managers · Tour Operators',
    title: 'Become a BOSSA partner.',
    subtitle:
      'Build recurring hospitality revenue through partner referrals, group food packages, tourist experiences, and curated fire-grill moments.',
    image: '/images/bossa/bossa-contact-card.png',
    primaryCta: 'Discuss partnership',
    whatsappMessage:
      'Bon dia BOSSA, I want to discuss a partnership. Business name: ___ Type of business: ___ Contact person: ___ Idea: ___',
    sections: [
      {
        title: 'Partner Targets',
        items: ['Hotels', 'Airbnb hosts', 'Villa managers', 'Tour operators', 'Yacht charters', 'Influencers', 'Corporate offices'],
      },
      {
        title: 'Partner Offers',
        items: [
          'Guest dinner referrals and WhatsApp booking support.',
          'Private villa, yacht, and rooftop food packages.',
          'Tourist experience menus for visitors.',
          'Content and influencer collaboration moments.',
        ],
      },
      {
        title: 'Next Step',
        items: [
          'Send your business name, contact person, audience, and idea.',
          'BOSSA reviews the best offer format.',
          'Partner flow starts simple, then grows with proof.',
        ],
      },
    ],
  },
} as const;

export const galleryGroups = [
  {
    title: 'Food',
    image: '/images/bossa/ribs-bossa.png',
    text: 'Ribs, skewers, sandwiches, sides, and fire boxes built to photograph well and eat even better.',
  },
  {
    title: 'Fire',
    image: '/images/bossa/hero-grill-area.png',
    text: 'Wood, charcoal, smoke, and the BOSSA fire process.',
  },
  {
    title: 'Rooftop',
    image: '/images/bossa/restaurant-design.jpg',
    text: 'Pietermaai energy, terrace moments, and future rooftop-style hospitality.',
  },
  {
    title: 'Events',
    image: '/images/bossa/bbq-party-del-rey.jpg',
    text: 'Group orders, private events, catering, and behind-the-scenes prep.',
  },
] as const;

export const starterReviews = [
  {
    quote: 'Sample layout: The fire-grill flavors, WhatsApp order flow, and Pietermaai location made the night easy.',
    source: 'Customer quote placeholder',
  },
  {
    quote: 'Sample layout: Perfect for a villa dinner, group order, or weekend food moment.',
    source: 'Tourist experience placeholder',
  },
  {
    quote: 'Sample layout: Strong food, clear pickup timing, and a memorable fire-box presentation.',
    source: 'Weekend Fire placeholder',
  },
] as const;
