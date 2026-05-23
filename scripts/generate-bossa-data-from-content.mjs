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

writeTs('menu.generated.ts', 'generatedMenuSections', source.menuSections ?? []);

console.log('BOSSA website data generation complete.');
