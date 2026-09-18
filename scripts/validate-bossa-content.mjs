import fs from 'node:fs';
import path from 'node:path';

const contentPath = path.join(process.cwd(), 'content', 'notion', 'bossa-website-content.template.json');
const publicDir = path.join(process.cwd(), 'public');
const errors = [];
const warnings = [];
const allowedStatuses = new Set(['active', 'coming-soon', 'draft']);

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function isValidPublicPath(value) {
  if (!value || typeof value !== 'string') return false;
  if (value.startsWith('http://') || value.startsWith('https://')) return true;
  if (!value.startsWith('/')) return false;
  return fs.existsSync(path.join(publicDir, value.slice(1)));
}

function loadJson(filePath) {
  assert(fs.existsSync(filePath), `Missing content file: ${filePath}`);
  if (!fs.existsSync(filePath)) return null;

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    errors.push(`Invalid JSON in ${filePath}: ${error.message}`);
    return null;
  }
}

function validatePublicImagePath(value, label) {
  assert(value, `${label} is missing image path.`);
  if (!value) return;
  assert(value.startsWith('/images/bossa/'), `${label} image must be stored under /images/bossa/: ${value}`);
  assert(value === value.toLowerCase() && !value.includes(' '), `${label} image path must be lowercase with no spaces: ${value}`);
  assert(isValidPublicPath(value), `${label} image path does not exist or is invalid: ${value}`);
}

function normalizedKey(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    const key = normalizedKey(value);
    if (!key) continue;
    assert(!seen.has(key), `Duplicate ${label}: ${value}`);
    seen.add(key);
  }
}

const data = loadJson(contentPath);

if (data) {
  assert(data.meta?.owner === 'Sahid Attaf', 'meta.owner must be Sahid Attaf.');
  assert(data.site?.brandName, 'site.brandName is required.');
  assert(data.site?.whatsappNumber, 'site.whatsappNumber is required.');

  for (const audio of data.media?.audio ?? []) {
    assert(audio.name, 'Each audio item needs a name.');
    assert(isValidPublicPath(audio.path), `Audio path does not exist or is invalid: ${audio.path}`);
  }

  for (const video of data.media?.videos ?? []) {
    assert(video.title, 'Each video needs a title.');
    assert(video.embedUrl?.startsWith('https://www.youtube.com/embed/'), `Video must use YouTube embed URL: ${video.embedUrl}`);
  }

  for (const payment of data.payments ?? []) {
    assert(payment.key, 'Payment item is missing key.');
    assert(payment.label, `Payment ${payment.key ?? 'unknown'} is missing label.`);
    assert(payment.href?.startsWith('https://buy.stripe.com/'), `Payment ${payment.key ?? 'unknown'} must use a Stripe Payment Link.`);
    assert(payment.requiresWhatsAppFirst === true, `Payment ${payment.key ?? 'unknown'} must require WhatsApp first.`);
    assert(!payment.href?.includes('sk_live'), `Payment ${payment.key ?? 'unknown'} must not contain secret keys.`);
  }

  for (const pkg of data.partyPackages ?? []) {
    const label = `Party package ${pkg.name ?? 'unknown'}`;
    assert(pkg.name, 'Party package is missing name.');
    assert(pkg.price, `${label} is missing price.`);
    assert(pkg.bestFor, `${label} is missing bestFor.`);
    assert(pkg.description, `${label} is missing description.`);
    assert(pkg.status, `${label} is missing status.`);
    assert(allowedStatuses.has(pkg.status), `${label} has invalid status: ${pkg.status}`);
    validatePublicImagePath(pkg.image, label);
    if (pkg.status === 'draft') errors.push(`Draft party package should not be in publish template: ${pkg.name}`);
  }

  assert(Array.isArray(data.menuSections) && data.menuSections.length > 0, 'menuSections must not be empty.');
  assertUnique((data.menuSections ?? []).map((section) => section.id), 'menu section id');
  assertUnique((data.menuSections ?? []).flatMap((section) => section.items ?? []).map((item) => item.name), 'menu item name');

  for (const section of data.menuSections ?? []) {
    assert(section.id, 'Menu section is missing id.');
    assert(section.title, `Menu section ${section.id ?? 'unknown'} is missing title.`);
    assert(allowedStatuses.has(section.status ?? 'active'), `Menu section ${section.id ?? 'unknown'} has invalid status: ${section.status}`);

    if (section.id === 'weekend-boxes') {
      for (const item of section.items ?? []) assert(item.image, `Weekend Fire item ${item.name ?? 'unknown'} is missing image path.`);
    }

    for (const item of section.items ?? []) {
      assert(typeof item.whatsappEnabled === 'boolean', `Menu item ${item.name} needs explicit WhatsApp eligibility.`);
      assert(!item.whatsappEnabled || item.status === 'active', `Non-active item ${item.name} cannot enable ordering.`);
      assert(item.name, `Menu item in ${section.title} is missing name.`);
      assert(item.price, `Menu item ${item.name ?? 'unknown'} is missing price.`);
      assert(item.description, `Menu item ${item.name ?? 'unknown'} is missing description.`);
      assert(allowedStatuses.has(item.status ?? 'active'), `Menu item ${item.name ?? 'unknown'} has invalid status: ${item.status}`);
      if (item.image) validatePublicImagePath(item.image, `Menu item ${item.name ?? 'unknown'}`);
      if (item.status === 'draft') errors.push(`Draft menu item should not be in publish template: ${item.name}`);
    }
  }

  const menuItems = (data.menuSections ?? []).flatMap((section) => section.items ?? []);
  const missingItemImages = menuItems.filter((item) => !item.image).map((item) => item.name);
  if (missingItemImages.length > 0) {
    warnings.push(`${missingItemImages.length} menu items need owner-approved item-specific images: ${missingItemImages.join(', ')}`);
  }

  assert(data.menuSections.length === 6, `Expected 6 menu categories, found ${data.menuSections.length}.`);
  assert(menuItems.length === 32, `Expected 32 menu items, found ${menuItems.length}.`);
  assert((data.partyPackages ?? []).length === 4, `Expected 4 party packages, found ${(data.partyPackages ?? []).length}.`);

  const requiredFacts = [
    ['Box #4 — Community Fire Box', 'XCG 19.50', 'active', true],
    ['Box #5 — Chicken Classic', 'XCG 49.50', 'active', true],
    ['Box #7 — SEA BOX Coming Soon', 'XCG 99.50', 'coming-soon', false],
  ];
  for (const [name, price, status, whatsappEnabled] of requiredFacts) {
    const item = menuItems.find((candidate) => candidate.name === name);
    assert(item, `Required menu item is missing: ${name}`);
    if (item) {
      assert(item.price === price, `${name} must remain ${price}.`);
      assert(item.status === status, `${name} must remain ${status}.`);
      assert(item.whatsappEnabled === whatsappEnabled, `${name} WhatsApp eligibility must remain ${whatsappEnabled}.`);
    }
  }

  const orderableComingSoon = menuItems.filter((item) => item.status === 'coming-soon' && item.whatsappEnabled === true);
  assert(orderableComingSoon.length === 0, `Coming Soon items cannot be WhatsApp-orderable: ${orderableComingSoon.map((item) => item.name).join(', ')}`);
}

if (errors.length > 0) {
  console.error('\nBOSSA content validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn('\nBOSSA content validation warnings:\n');
  for (const warning of warnings) console.warn(`- ${warning}`);
}

console.log('BOSSA content validation passed.');
