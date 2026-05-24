import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'content', 'notion', 'bossa-website-content.template.json');
const dataDir = path.join(root, 'app', 'data');
const generatedHeader = `// AUTO-GENERATED from content/notion/bossa-website-content.template.json\n// Edit the JSON source, then run npm run generate:data.\n\n`;

function readSource() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source JSON: ${sourcePath}`);
  }
  return JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
}

function writeTs(filename, exportName, value) {
  const filePath = path.join(dataDir, filename);
  const body = `${generatedHeader}export const ${exportName} = ${JSON.stringify(value, null, 2)} as const;\n`;
  fs.writeFileSync(filePath, body, 'utf8');
  console.log(`Generated ${path.relative(root, filePath)}`);
}

function paymentsObject(payments = []) {
  return Object.fromEntries(
    payments.map((payment) => [
      payment.key,
      {
        label: payment.label,
        amount: payment.amount,
        href: payment.href,
        note: payment.note,
      },
    ]),
  );
}

function publishableMenuSections(menuSections = []) {
  return menuSections
    .filter((section) => section.status !== 'draft')
    .map((section) => ({
      id: section.id,
      title: section.title,
      note: section.note,
      editableNote: section.editableNote ?? 'Generated from approved BOSSA Notion JSON. Update the JSON source, then run npm run generate:data.',
      status: section.status ?? 'active',
      items: (section.items ?? [])
        .filter((item) => item.status !== 'draft')
        .map((item) => ({
          name: item.name,
          price: item.price,
          description: item.description,
          status: item.status ?? 'active',
          ...(item.image ? { image: item.image } : {}),
          ...(item.tag ? { tag: item.tag } : {}),
        })),
    }));
}

function publishablePartyPackages(partyPackages = []) {
  return partyPackages
    .filter((pkg) => pkg.status !== 'draft')
    .map((pkg) => ({
      name: pkg.name,
      bestFor: pkg.bestFor,
      price: pkg.price,
      image: pkg.image,
      description: pkg.description,
      status: pkg.status ?? 'active',
    }));
}

const source = readSource();
fs.mkdirSync(dataDir, { recursive: true });

writeTs('site.ts', 'siteConfig', source.site ?? {});
writeTs('media.ts', 'mediaAssets', source.media ?? { audio: [], videos: [] });
writeTs('payments.ts', 'paymentLinks', paymentsObject(source.payments ?? []));

const paymentsPath = path.join(dataDir, 'payments.ts');
fs.appendFileSync(
  paymentsPath,
  "\nexport const paymentDisclaimer = 'Confirm on WhatsApp first. Pay deposit only after BOSSA confirms availability.';\n",
  'utf8',
);

const menuSections = publishableMenuSections(source.menuSections ?? []);
writeTs('menu.ts', 'menuSections', menuSections);
writeTs('menu.generated.ts', 'generatedMenuSections', menuSections);
writeTs('party-packages.ts', 'partyPackages', publishablePartyPackages(source.partyPackages ?? []));

console.log('BOSSA website data generation complete.');
