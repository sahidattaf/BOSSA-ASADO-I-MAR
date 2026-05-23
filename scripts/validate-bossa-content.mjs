import fs from 'node:fs';
import path from 'node:path';

const contentPath = path.join(process.cwd(), 'content', 'notion', 'bossa-website-content.template.json');
const publicDir = path.join(process.cwd(), 'public');
const errors = [];

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

  for (const section of data.menuSections ?? []) {
    assert(section.id, 'Menu section is missing id.');
    assert(section.title, `Menu section ${section.id ?? 'unknown'} is missing title.`);

    for (const item of section.items ?? []) {
      assert(item.name, `Menu item in ${section.title} is missing name.`);
      assert(item.price, `Menu item ${item.name ?? 'unknown'} is missing price.`);
      assert(item.description, `Menu item ${item.name ?? 'unknown'} is missing description.`);
      if (item.image) assert(isValidPublicPath(item.image), `Image path does not exist or is invalid: ${item.image}`);
      if (item.status === 'draft') errors.push(`Draft menu item should not be in publish template: ${item.name}`);
    }
  }
}

if (errors.length > 0) {
  console.error('\nBOSSA content validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('BOSSA content validation passed.');
