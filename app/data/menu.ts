export const menuSections = [
  {
    id: 'weekend-boxes',
    title: 'Weekend Fire Boxes',
    note: 'Thursday–Sunday · take-out only · limited fire batches',
    editableNote: 'Source of truth for the public website menu. Update this file first, then homepage menu blocks follow.',
    items: [
      {
        name: 'Box #1 — BOSSA Box Mix',
        price: 'XCG 49.50',
        description:
          'Fire-roasted 1 pc chicken whole legs, 1/2 ribs, 1 chorizo, 1 porkchop, garlic bread, and garlic sauce.',
      },
      {
        name: 'Box #2 — Skewer Box',
        price: 'XCG 49.50',
        description:
          'Tenderloin skewer and chicken skewer with garlic sauce and garlic bread. Tenderloin skewer 35 · chicken skewer 25.',
      },
      {
        name: 'Box #3 — Fire Bread Sandwich Box',
        price: 'XCG 49.50',
        description:
          '#9 chicken salad 12 · #10 whole legs 12 · #11 chicken boneless 12 · #12 porkchop 12 · #13 chorizo 12 · #14 grilled steak / stew 15 · #15 tenderloin 20.',
      },
      {
        name: 'Box #4 — Community Fire Box',
        price: 'XCG 19.50',
        description:
          '4 chicken pieces with bread, garlic sauce, and baked potato. Built for speed and volume.',
      },
      {
        name: 'Box #5 — Chicken Classic',
        price: 'XCG 49.50',
        description:
          'Whole fire-roasted chicken or 8 pc roast/grill chicken with 2 sides. Family-style fire meal.',
      },
      {
        name: 'Box #6 — Ribs Classic',
        price: 'XCG 49.50',
        description:
          'Slow-smoked ribs: 2 full ribs with garlic sauce and bread. Slow smoke, fast handoff.',
      },
      {
        name: 'Box #7 — SEA BOX Coming Soon',
        price: 'XCG 99.50',
        description:
          'Mixed grill and seafood platter with 1 catch-of-the-day skewer, 1 tenderloin skewer, and 2 sides.',
      },
      {
        name: 'Box #8 — Local Fire Box',
        price: 'XCG 6+',
        description:
          'Side-order style local pickup box: fresh salad, seaweed, hummus, garlic bread/pita, baked potato, cassava, chorizo, boiled peanuts, and beer options.',
      },
    ],
  },
  {
    id: 'skewers',
    title: 'Skewers / Pinchos',
    note: 'Flame-grilled · smoky · served with fire sides',
    editableNote: 'Use this block for chicken, tenderloin, shrimp, seafood, and future veggie skewers.',
    items: [
      {
        name: 'Chicken Skewer',
        price: 'XCG 25',
        description:
          'Marinated chicken skewer grilled with bell pepper, onion, garlic sauce, and fire bread.',
      },
      {
        name: 'Tenderloin Skewer',
        price: 'XCG 35',
        description:
          'Tenderloin skewer with paprika/onion, bold fire flavor, garlic sauce, and fire bread.',
      },
      {
        name: 'Seafood Skewer — Coming Soon',
        price: 'Market price',
        description:
          'Catch-of-the-day, shrimp, lobster, or mixed seafood from the fire for the Weekend Fire & Sea Specials launch.',
      },
    ],
  },
  {
    id: 'sandwiches',
    title: 'Fire Bread Sandwiches',
    note: 'Crispy bread · smoke · sauce · island bite',
    editableNote: 'This block supports sandwich trays, party orders, and the Box #3 sandwich box.',
    items: [
      {
        name: 'Chicken Salad Sandwich',
        price: 'XCG 12',
        description:
          'Fresh chicken salad in fire bread with garlic oil and BOSSA flavor.',
      },
      {
        name: 'Whole Leg Chicken Sandwich',
        price: 'XCG 12',
        description:
          'Whole leg chicken, crispy bread, and BOSSA jus.',
      },
      {
        name: 'Boneless Chicken Sandwich',
        price: 'XCG 12',
        description:
          'Boneless chicken with fire seasoning, bread, and sauce.',
      },
      {
        name: 'Porkchop Sandwich',
        price: 'XCG 12',
        description:
          'Wood-fired porkchop, crispy bread, and tamarind-style fire glaze.',
      },
      {
        name: 'Chorizo Sandwich',
        price: 'XCG 12',
        description:
          'Fire-grilled chorizo in warm bread with BOSSA sauce.',
      },
      {
        name: 'Grilled Steak / Stew Beef Sandwich',
        price: 'XCG 15',
        description:
          'Grilled steak or slow stew beef with fire bread and island herbs.',
      },
      {
        name: 'Tenderloin Sandwich',
        price: 'XCG 20',
        description:
          'Tenderloin with toasted bread, fire salt, and premium grill flavor.',
      },
    ],
  },
  {
    id: 'sides',
    title: 'Sides & Add-ons',
    note: 'Simple sides · fast pickup · box friendly',
    editableNote: 'Update portions and side prices here before publishing future flyers.',
    items: [
      {
        name: 'Fresh Salad',
        price: 'XCG 10',
        description: 'Fresh salad for balance next to chicken, ribs, skewers, and sandwiches.',
      },
      {
        name: 'Seaweed Bowl',
        price: 'XCG 10',
        description: 'Cold seaweed side for fire boxes and seafood specials.',
      },
      {
        name: 'Hummus',
        price: 'XCG 10',
        description: 'Creamy hummus for bread, skewers, and party trays.',
      },
      {
        name: 'Homemade Garlic Bread / Pita',
        price: 'XCG 4',
        description: 'Bread for sauce, smoke, and box dipping.',
      },
      {
        name: 'Baked Potato',
        price: 'XCG 7',
        description: 'Baked potato with fire seasoning and optional garlic sauce.',
      },
      {
        name: 'Boiled Cassava',
        price: 'XCG 10',
        description: 'Soft cassava with island seasoning.',
      },
      {
        name: 'Chorizo Piece',
        price: 'XCG 6',
        description: 'Single chorizo add-on for boxes or local pickup.',
      },
      {
        name: 'Boiled Peanuts',
        price: 'XCG 6',
        description: 'Local-style peanut bowl for snacking and side orders.',
      },
    ],
  },
  {
    id: 'soups-stews',
    title: 'Soups & Stews',
    note: 'Soul in a bowl · slow fire comfort',
    editableNote: 'Use this block for beef soup, chicken soup, stews, and rotating comfort specials.',
    items: [
      {
        name: 'BOSSA Beef Soup',
        price: 'XCG 15',
        description:
          'Hearty beef soup slow-simmered with meat, potato, carrot, and island herbs.',
      },
      {
        name: 'BOSSA Chicken Soup',
        price: 'XCG 11',
        description:
          'Homestyle chicken soup with vegetables, light smoke, and comfort flavor.',
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks / Bebidas',
    note: 'Cold drinks · island refreshment · easy upsell',
    editableNote: 'Add sodas, water, juices, cocktails, beer, and rooftop drinks here.',
    items: [
      {
        name: 'Beer',
        price: 'XCG 6',
        description: 'Cold beer for weekend boxes and party orders.',
      },
      {
        name: 'Soft Drink',
        price: 'XCG 5',
        description: 'Cold soda selection. Final brands can be updated before service.',
      },
      {
        name: 'House Juice',
        price: 'XCG 7.50',
        description: 'Island juice. Flavor can rotate by day.',
      },
      {
        name: 'Sunset Cocktail Offer — Coming Soon',
        price: 'TBD',
        description:
          'Limited sunset cocktail offer for Weekend Fire & Sea Specials.',
      },
    ],
  },
];
