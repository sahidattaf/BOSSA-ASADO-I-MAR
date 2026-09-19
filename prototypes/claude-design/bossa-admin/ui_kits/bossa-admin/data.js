/* BOSSA Admin Command Center — data store
   Plain JS (no JSX) so it can load before Babel-transpiled screens.
   Persists to localStorage; seeds demo data on first load.
   dataTag on every record: 'verified' | 'demo' | 'needs-confirmation' */
(function(){
  const KEY = 'bossaAdminV1';
  const iso = (d) => new Date(d).toISOString();
  const todayPlus = (days, h, m) => { const d = new Date(); d.setDate(d.getDate() + days); d.setHours(h||12, m||0, 0, 0); return iso(d); };
  let uidCounter = 1000;
  const uid = (prefix) => prefix + '-' + (uidCounter++);

  function seed(){
    return {
      role: 'Owner/Admin',
      sidebarCollapsed: false,
      seededAt: iso(new Date()),

      orders: [
        { id: uid('ORD'), customer: 'Marlon Statia', phone: '+5999 511 2201', channel: 'WhatsApp', items: '1x Box #1 BOSSA Box Mix, 2x Beer', fulfillment: 'Pickup', dateTime: todayPlus(0,18,30), total: 61.50, paymentStatus: 'Paid', prepStatus: 'Preparing', notes: 'Extra garlic sauce', assignee: 'Kiona', dataTag: 'demo' },
        { id: uid('ORD'), customer: 'Denise Martina', phone: '+5999 522 8890', channel: 'Phone', items: '2x Box #6 Ribs Classic', fulfillment: 'Pickup', dateTime: todayPlus(0,19,0), total: 99.00, paymentStatus: 'Unpaid', prepStatus: 'New', notes: '', assignee: 'Unassigned', dataTag: 'demo' },
        { id: uid('ORD'), customer: 'Hotel Kura Hulanda', phone: '+5999 434 7700', channel: 'Partner Portal', items: '6x Box #4 Community Fire Box', fulfillment: 'Delivery', dateTime: todayPlus(0,20,0), total: 117.00, paymentStatus: 'Invoiced', prepStatus: 'Confirmed', notes: 'Deliver to staff entrance', assignee: 'Roué', dataTag: 'demo' },
        { id: uid('ORD'), customer: 'Ingrid Pieternella', phone: '+5999 561 0044', channel: 'Walk-in', items: '1x Box #2 Skewer Box, 1x House Juice', fulfillment: 'Pickup', dateTime: todayPlus(0,17,45), total: 57.00, paymentStatus: 'Paid', prepStatus: 'Ready', notes: '', assignee: 'Kiona', dataTag: 'demo' },
        { id: uid('ORD'), customer: 'Airbnb — Casa Blou', phone: '+5999 690 3321', channel: 'WhatsApp', items: '3x Box #5 Chicken Classic', fulfillment: 'Delivery', dateTime: todayPlus(-1,20,10), total: 148.50, paymentStatus: 'Paid', prepStatus: 'Completed', notes: 'Guest group of 6', assignee: 'Roué', dataTag: 'demo' },
        { id: uid('ORD'), customer: 'Tomas Every', phone: '+5999 501 9987', channel: 'WhatsApp', items: '1x Box #3 Fire Bread Sandwich Box', fulfillment: 'Pickup', dateTime: todayPlus(-1,18,0), total: 49.50, paymentStatus: 'Paid', prepStatus: 'Cancelled', notes: 'Guest cancelled, no-show', assignee: 'Unassigned', dataTag: 'demo' }
      ],

      reservations: [
        { id: uid('RES'), guest: 'Sherida Wanga', phone: '+5999 517 4432', date: todayPlus(0,0,0).slice(0,10), time: '19:00', partySize: 4, seating: 'Patio', occasion: 'Birthday', dietary: 'One vegetarian', source: 'WhatsApp', status: 'Confirmed', notes: 'Requests table near fire pit', dataTag: 'demo' },
        { id: uid('RES'), guest: 'J. van Dorp', phone: '+5999 682 1150', date: todayPlus(0,0,0).slice(0,10), time: '20:30', partySize: 2, seating: 'Terrace', occasion: '', dietary: '', source: 'Website', status: 'Confirmed', notes: '', dataTag: 'demo' },
        { id: uid('RES'), guest: 'Curaçao Tours BV', phone: '+5999 465 2200', date: todayPlus(1,0,0).slice(0,10), time: '18:00', partySize: 12, seating: 'Group table', occasion: 'Tour group dinner', dietary: '2 gluten-free', source: 'Tour operator', status: 'New', notes: 'Bus arrives 17:45', dataTag: 'demo' },
        { id: uid('RES'), guest: 'M. Kock', phone: '+5999 555 9021', date: todayPlus(-1,0,0).slice(0,10), time: '19:30', partySize: 3, seating: 'Indoor', occasion: '', dietary: '', source: 'Phone', status: 'No-show', notes: '', dataTag: 'demo' },
        { id: uid('RES'), guest: 'R. Andrade', phone: '+5999 511 6683', date: todayPlus(2,0,0).slice(0,10), time: '19:00', partySize: 6, seating: 'Patio', occasion: 'Anniversary', dietary: '', source: 'WhatsApp', status: 'Confirmed', notes: '', dataTag: 'demo' }
      ],

      menuItems: flattenMenu(),

      productionBatches: [
        { id: uid('BAT'), batch: 'Box #1 — BOSSA Box Mix', requiredQty: 40, preparedQty: 40, remainingQty: 0, dueTime: todayPlus(0,17,0), assignedStaff: 'Grill team A', status: 'Ready', notes: 'Standard Saturday batch', dataTag: 'demo' },
        { id: uid('BAT'), batch: 'Box #6 — Ribs Classic', requiredQty: 25, preparedQty: 14, remainingQty: 11, dueTime: todayPlus(0,18,0), assignedStaff: 'Grill team B', status: 'Preparing', notes: 'Smoker running slow — monitor', dataTag: 'demo' },
        { id: uid('BAT'), batch: 'Box #4 — Community Fire Box', requiredQty: 60, preparedQty: 0, remainingQty: 60, dueTime: todayPlus(0,19,30), assignedStaff: 'Prep team', status: 'Planned', notes: 'Hotel partner order — priority', dataTag: 'demo' },
        { id: uid('BAT'), batch: 'Box #2 — Skewer Box', requiredQty: 30, preparedQty: 30, remainingQty: 0, dueTime: todayPlus(-1,17,30), assignedStaff: 'Grill team A', status: 'Closed', notes: '', dataTag: 'demo' }
      ],

      inventory: [
        { id: uid('INV'), ingredient: 'Whole chicken', supplier: 'Isla Meat Supply', unit: 'kg', currentStock: 42, reorderLevel: 30, unitCost: 6.20, lastPurchaseDate: todayPlus(-3,0,0).slice(0,10), nextRequiredOrder: todayPlus(2,0,0).slice(0,10), stockStatus: 'OK', dataTag: 'demo' },
        { id: uid('INV'), ingredient: 'Pork ribs', supplier: 'Isla Meat Supply', unit: 'kg', currentStock: 11, reorderLevel: 20, unitCost: 9.80, lastPurchaseDate: todayPlus(-5,0,0).slice(0,10), nextRequiredOrder: todayPlus(0,0,0).slice(0,10), stockStatus: 'Low', dataTag: 'demo' },
        { id: uid('INV'), ingredient: 'Chorizo', supplier: 'Kaya Grill Foods', unit: 'kg', currentStock: 8, reorderLevel: 12, unitCost: 7.10, lastPurchaseDate: todayPlus(-4,0,0).slice(0,10), nextRequiredOrder: todayPlus(-1,0,0).slice(0,10), stockStatus: 'Critical', dataTag: 'demo' },
        { id: uid('INV'), ingredient: 'Fire bread (pita)', supplier: 'Panaderia Kòrsou', unit: 'pcs', currentStock: 210, reorderLevel: 120, unitCost: 0.65, lastPurchaseDate: todayPlus(-1,0,0).slice(0,10), nextRequiredOrder: todayPlus(4,0,0).slice(0,10), stockStatus: 'OK', dataTag: 'demo' },
        { id: uid('INV'), ingredient: 'Garlic sauce base', supplier: 'BOSSA kitchen prep', unit: 'L', currentStock: 6, reorderLevel: 8, unitCost: 3.40, lastPurchaseDate: todayPlus(-2,0,0).slice(0,10), nextRequiredOrder: todayPlus(1,0,0).slice(0,10), stockStatus: 'Low', dataTag: 'demo' },
        { id: uid('INV'), ingredient: 'Charcoal', supplier: 'Kòrsou Fire Fuel', unit: 'bag', currentStock: 26, reorderLevel: 15, unitCost: 11.00, lastPurchaseDate: todayPlus(-6,0,0).slice(0,10), nextRequiredOrder: todayPlus(6,0,0).slice(0,10), stockStatus: 'OK', dataTag: 'demo' }
      ],

      customers: [
        { id: uid('CON'), contact: 'Marlon Statia', organization: '', segment: 'Restaurant Customer', phone: '+5999 511 2201', email: '', relationshipStage: 'Repeat', lastContact: todayPlus(0,0,0).slice(0,10), nextFollowUp: '', notes: 'Regular Saturday order', revenueAttributed: 320.00, dataTag: 'demo' },
        { id: uid('CON'), contact: 'Hotel Kura Hulanda', organization: 'Kura Hulanda Village & Spa', segment: 'Hotel', phone: '+5999 434 7700', email: 'fb@kurahulanda.com', relationshipStage: 'Active partner', lastContact: todayPlus(0,0,0).slice(0,10), nextFollowUp: todayPlus(7,0,0).slice(0,10), notes: 'Weekly staff meal order + guest referrals', revenueAttributed: 2140.00, dataTag: 'demo' },
        { id: uid('CON'), contact: 'Casa Blou (host)', organization: 'Casa Blou Airbnb', segment: 'Airbnb Host', phone: '+5999 690 3321', email: '', relationshipStage: 'Active partner', lastContact: todayPlus(-1,0,0).slice(0,10), nextFollowUp: todayPlus(14,0,0).slice(0,10), notes: 'Sends guests weekly, 10% referral rate discussed', revenueAttributed: 890.00, dataTag: 'demo' },
        { id: uid('CON'), contact: 'Curaçao Tours BV', organization: 'Curaçao Tours BV', segment: 'Tour Operator', phone: '+5999 465 2200', email: 'ops@curacaotours.example', relationshipStage: 'Prospect', lastContact: todayPlus(-2,0,0).slice(0,10), nextFollowUp: todayPlus(1,0,0).slice(0,10), notes: 'First group dinner booked — evaluate recurring deal', revenueAttributed: 0, dataTag: 'demo' },
        { id: uid('CON'), contact: 'Isla Meat Supply', organization: 'Isla Meat Supply NV', segment: 'Supplier', phone: '+5999 767 4410', email: 'orders@islameat.example', relationshipStage: 'Active supplier', lastContact: todayPlus(-3,0,0).slice(0,10), nextFollowUp: todayPlus(2,0,0).slice(0,10), notes: 'Primary protein supplier', revenueAttributed: 0, dataTag: 'demo' }
      ],

      content: [
        { id: uid('CMP'), campaignId: 'CMP-2026-014', campaign: 'Weekend Fire Box Push', contentItem: 'Box #1 carousel post', platform: 'Instagram', owner: 'Marketing team', productionStatus: 'Published', publishDate: todayPlus(-2,0,0).slice(0,10), cta: 'Order on WhatsApp', linkedOffer: 'Box #1 — BOSSA Box Mix', performance: 'Needs confirmation', dataTag: 'needs-confirmation' },
        { id: uid('CMP'), campaignId: 'CMP-2026-014', campaign: 'Weekend Fire Box Push', contentItem: 'Fire pit reel', platform: 'Instagram', owner: 'Marketing team', productionStatus: 'Scheduled', publishDate: todayPlus(2,0,0).slice(0,10), cta: 'Order on WhatsApp', linkedOffer: 'Weekend Fire Boxes', performance: '—', dataTag: 'demo' },
        { id: uid('CMP'), campaignId: 'CMP-2026-009', campaign: 'Hotel Partner Outreach', contentItem: 'Partner flyer — Kura Hulanda', platform: 'Print / Email', owner: 'Owner/Admin', productionStatus: 'In production', publishDate: '', cta: 'Contact for partnership', linkedOffer: 'Hotel & Airbnb catering', performance: '—', dataTag: 'demo' },
        { id: uid('CMP'), campaignId: 'CMP-2026-011', campaign: 'Ribs Classic Feature', contentItem: 'WhatsApp broadcast', platform: 'WhatsApp', owner: 'Marketing team', productionStatus: 'Published', publishDate: todayPlus(-6,0,0).slice(0,10), cta: 'Order on WhatsApp', linkedOffer: 'Box #6 — Ribs Classic', performance: 'Needs confirmation', dataTag: 'needs-confirmation' }
      ],

      tasks: [
        { id: uid('TSK'), task: 'Confirm updated food-cost figures for Box #2 and Box #6', owner: 'Owner/Admin', domain: 'Menu', priority: 'High', dueDate: todayPlus(1,0,0).slice(0,10), status: 'Open', relatedRecord: 'Box #2 — Skewer Box', blocker: 'Waiting on supplier invoice', nextAction: 'Request latest invoice from Isla Meat Supply', dataTag: 'demo' },
        { id: uid('TSK'), task: 'Reorder chorizo before Friday prep', owner: 'Manager', domain: 'Inventory', priority: 'Critical', dueDate: todayPlus(0,0,0).slice(0,10), status: 'In progress', relatedRecord: 'Chorizo', blocker: '', nextAction: 'Place order with Kaya Grill Foods', dataTag: 'demo' },
        { id: uid('TSK'), task: 'Follow up with Curaçao Tours BV on recurring booking', owner: 'Marketing', domain: 'Partners', priority: 'Medium', dueDate: todayPlus(2,0,0).slice(0,10), status: 'Open', relatedRecord: 'Curaçao Tours BV', blocker: '', nextAction: 'Send proposal for weekly group dinner rate', dataTag: 'demo' },
        { id: uid('TSK'), task: 'Publish fire pit reel for Weekend Fire Box Push', owner: 'Marketing', domain: 'Content', priority: 'Medium', dueDate: todayPlus(2,0,0).slice(0,10), status: 'Scheduled', relatedRecord: 'CMP-2026-014', blocker: '', nextAction: 'Approve final edit', dataTag: 'demo' },
        { id: uid('TSK'), task: 'Reconcile weekend payment totals', owner: 'Finance', domain: 'Finance', priority: 'High', dueDate: todayPlus(0,0,0).slice(0,10), status: 'Open', relatedRecord: 'Weekend orders', blocker: '', nextAction: 'Cross-check WhatsApp orders against payments', dataTag: 'demo' }
      ],

      decisions: [
        { id: uid('DEC'), decisionId: 'DEC-2026-005', decision: 'Cap Box #4 Community Fire Box at 60 units/night', domain: 'Production', owner: 'Owner/Admin', date: todayPlus(-10,0,0).slice(0,10), reason: 'Fire capacity and staffing limit at current kitchen size', alternatives: 'Add second smoker; outsource prep', expectedResult: 'Consistent quality, no late-night backlog', reviewDate: todayPlus(20,0,0).slice(0,10), status: 'Active', dataTag: 'demo' },
        { id: uid('DEC'), decisionId: 'DEC-2026-006', decision: 'Pilot recurring weekly order with Kura Hulanda', domain: 'Partners', owner: 'Manager', date: todayPlus(-5,0,0).slice(0,10), reason: 'Stabilize weekday revenue with hotel partner demand', alternatives: 'One-off orders only; broaden to more hotels first', expectedResult: 'XCG 2,000+/month recurring — needs confirmation after pilot', reviewDate: todayPlus(25,0,0).slice(0,10), status: 'Under review', dataTag: 'needs-confirmation' }
      ],

      settings: {
        restaurantProfile: { name: 'BOSSA Asado i Mar', address: 'Oranjestraat 116, Pietermaai, Willemstad, Curaçao', phone: '+5999 523 0683', whatsapp: '+5999 523 0683', hours: 'Thursday–Sunday · 12:00 PM–10:00 PM' },
        taxesCurrency: { currency: 'XCG', taxRate: 6 },
        orderStatuses: ['New','Confirmed','Preparing','Ready','Completed','Cancelled'],
        reservationRules: { maxPartySize: 20, holdMinutes: 15, requireDepositAbove: 8 },
        userRoles: ['Owner/Admin','Manager','Kitchen','Marketing','Finance','View only'],
        notificationPrefs: { newOrderAlert: true, lowStockAlert: true, reservationReminders: true },
        dataSourceConnections: [
          { name: 'WhatsApp Business (orders/reservations)', status: 'Needs confirmation' },
          { name: 'Supabase production database', status: 'Not connected — prototype uses localStorage' },
          { name: 'BOSSA Next.js site (menu source of truth)', status: 'Verified — read-only reference' }
        ],
        brandAssets: { logoPrimary: '/assets/logo-primary.png', logoMark: '/assets/logo-mark.png' }
      },

      activity: [
        { id: uid('ACT'), text: 'Order ORD-1004 marked Ready by Kiona', time: todayPlus(0,17,50) },
        { id: uid('ACT'), text: 'Reservation for Sherida Wanga confirmed', time: todayPlus(0,16,10) },
        { id: uid('ACT'), text: 'Chorizo stock flagged Critical — reorder needed', time: todayPlus(0,9,5) },
        { id: uid('ACT'), text: 'Fire pit reel scheduled for Weekend Fire Box Push', time: todayPlus(-1,14,0) }
      ],

      archivedNotice: {}
    };
  }

  function flattenMenu(){
    // Verified names/descriptions/prices come from the BOSSA Next.js repo (app/data/menu.ts).
    // Food cost, margin, availability and featured status are NOT in that source — flagged accordingly.
    const sections = [
      { title: 'Weekend Fire Boxes', items: [
        ['Box #1 — BOSSA Box Mix','Fire-roasted 1 pc chicken whole legs, 1/2 ribs, 1 chorizo, 1 porkchop, garlic bread, and garlic sauce.',49.50,true,true],
        ['Box #2 — Skewer Box','Tenderloin skewer and chicken skewer with garlic sauce and garlic bread.',49.50,true,false],
        ['Box #3 — Fire Bread Sandwich Box','Choice of fire bread sandwiches, priced individually within the box.',49.50,true,false],
        ['Box #4 — Community Fire Box','4 chicken pieces with bread, garlic sauce, and baked potato. Built for speed and volume.',19.50,true,false],
        ['Box #5 — Chicken Classic','Whole fire-roasted chicken or 8 pc roast/grill chicken with 2 sides.',49.50,true,false],
        ['Box #6 — Ribs Classic','Slow-smoked ribs: 2 full ribs with garlic sauce and bread.',49.50,true,true],
        ['Box #7 — SEA BOX Coming Soon','Mixed grill and seafood platter — catch-of-the-day and tenderloin skewers, 2 sides.',99.50,false,false],
        ['Box #8 — Local Fire Box','Side-order style local pickup box with salad, seaweed, hummus, bread, and more.',6,true,false]
      ]},
      { title: 'Skewers / Pinchos', items: [
        ['Chicken Skewer','Marinated chicken skewer grilled with bell pepper, onion, garlic sauce, and fire bread.',25,true,false],
        ['Tenderloin Skewer','Tenderloin skewer with paprika/onion, bold fire flavor, garlic sauce, and fire bread.',35,true,false],
        ['Seafood Skewer — Coming Soon','Catch-of-the-day, shrimp, lobster, or mixed seafood from the fire.',null,false,false]
      ]},
      { title: 'Fire Bread Sandwiches', items: [
        ['Chicken Salad Sandwich','Fresh chicken salad in fire bread with garlic oil and BOSSA flavor.',12,true,false],
        ['Whole Leg Chicken Sandwich','Whole leg chicken, crispy bread, and BOSSA jus.',12,true,false],
        ['Boneless Chicken Sandwich','Boneless chicken with fire seasoning, bread, and sauce.',12,true,false],
        ['Porkchop Sandwich','Wood-fired porkchop, crispy bread, and tamarind-style fire glaze.',12,true,false],
        ['Chorizo Sandwich','Fire-grilled chorizo in warm bread with BOSSA sauce.',12,true,false],
        ['Grilled Steak / Stew Beef Sandwich','Grilled steak or slow stew beef with fire bread and island herbs.',15,true,false],
        ['Tenderloin Sandwich','Tenderloin with toasted bread, fire salt, and premium grill flavor.',20,true,false]
      ]},
      { title: 'Sides & Add-ons', items: [
        ['Fresh Salad','Fresh salad for balance next to chicken, ribs, skewers, and sandwiches.',10,true,false],
        ['Seaweed Bowl','Cold seaweed side for fire boxes and seafood specials.',10,true,false],
        ['Hummus','Creamy hummus for bread, skewers, and party trays.',10,true,false],
        ['Homemade Garlic Bread / Pita','Bread for sauce, smoke, and box dipping.',4,true,false],
        ['Baked Potato','Baked potato with fire seasoning and optional garlic sauce.',7,true,false],
        ['Boiled Cassava','Soft cassava with island seasoning.',10,true,false],
        ['Chorizo Piece','Single chorizo add-on for boxes or local pickup.',6,true,false],
        ['Boiled Peanuts','Local-style peanut bowl for snacking and side orders.',6,true,false]
      ]},
      { title: 'Soups & Stews', items: [
        ['BOSSA Beef Soup','Hearty beef soup slow-simmered with meat, potato, carrot, and island herbs.',15,true,false],
        ['BOSSA Chicken Soup','Homestyle chicken soup with vegetables, light smoke, and comfort flavor.',11,true,false]
      ]},
      { title: 'Drinks / Bebidas', items: [
        ['Beer','Cold beer for weekend boxes and party orders.',6,true,false],
        ['Soft Drink','Cold soda selection. Final brands can be updated before service.',5,true,false],
        ['House Juice','Island juice. Flavor can rotate by day.',7.50,true,false],
        ['Sunset Cocktail Offer — Coming Soon','Limited sunset cocktail offer for Weekend Fire & Sea Specials.',null,false,false]
      ]}
    ];
    const out = [];
    sections.forEach(sec => sec.items.forEach(([name, desc, price, available, featured]) => {
      out.push({
        id: uid('MEN'),
        item: name, category: sec.title, description: desc,
        price: price, priceDataTag: 'verified',
        foodCost: null, foodCostDataTag: 'needs-confirmation',
        margin: null,
        availability: available, featured: featured,
        image: '', lastUpdated: iso(new Date()).slice(0,10),
        priceLocked: true,
        changeHistory: [{ at: iso(new Date()).slice(0,10), note: 'Seeded from BOSSA site menu data (verified source)' }],
        dataTag: 'verified'
      });
    }));
    return out;
  }

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      if (raw) { const parsed = JSON.parse(raw); if (parsed && parsed.orders) return parsed; }
    }catch(e){}
    const s = seed();
    try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){}
    return s;
  }

  let state = load();
  const listeners = new Set();
  function persist(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }
  function notify(){ listeners.forEach(fn => { try{ fn(state); }catch(e){} }); }
  function commit(){ persist(); notify(); }

  function subscribe(fn){ listeners.add(fn); return () => listeners.delete(fn); }
  function getState(){ return state; }

  function addRecord(collection, record){
    const withMeta = Object.assign({ id: uid(collection.slice(0,3).toUpperCase()), archived: false }, record);
    state = Object.assign({}, state, { [collection]: [withMeta, ...state[collection]] });
    commit();
    return withMeta;
  }
  function updateRecord(collection, id, patch){
    state = Object.assign({}, state, {
      [collection]: state[collection].map(r => r.id === id ? Object.assign({}, r, patch) : r)
    });
    commit();
  }
  function archiveRecord(collection, id){ updateRecord(collection, id, { archived: true }); }
  function restoreRecord(collection, id){ updateRecord(collection, id, { archived: false }); }

  function logActivity(text){
    state = Object.assign({}, state, { activity: [{ id: uid('ACT'), text, time: iso(new Date()) }, ...state.activity].slice(0,30) });
    commit();
  }
  function setRole(role){ state = Object.assign({}, state, { role }); commit(); }
  function setSidebarCollapsed(v){ state = Object.assign({}, state, { sidebarCollapsed: v }); commit(); }
  function resetDemoData(){ state = seed(); commit(); }
  function updateSettings(patch){ state = Object.assign({}, state, { settings: Object.assign({}, state.settings, patch) }); commit(); }

  window.BossaAdminStore = {
    getState, subscribe, addRecord, updateRecord, archiveRecord, restoreRecord,
    logActivity, setRole, setSidebarCollapsed, resetDemoData, updateSettings, uid
  };
})();
