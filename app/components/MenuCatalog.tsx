import { menuSections } from '../data/menu';
import { siteConfig } from '../data/site';
import MenuSection from './MenuSection';

type MenuCatalogProps = {
  idPrefix?: string;
  sectionHeadingLevel?: 'h2' | 'h3';
  showOrderActions?: boolean;
};

const buildItemOrderUrl = (itemName: string, price: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Bon dia BOSSA, I want to order ${itemName} (${price}). Name: ___ Pickup time: ___ Quantity: ___`,
  )}`;

export default function MenuCatalog({
  idPrefix = 'menu',
  sectionHeadingLevel = 'h3',
  showOrderActions = false,
}: MenuCatalogProps) {
  const SectionHeading = sectionHeadingLevel;
  const ItemHeading = sectionHeadingLevel === 'h2' ? 'h3' : 'h4';

  return (
    <div className="menu-catalog">
      <nav className="menu-category-jump" aria-label="Menu categories">
        {menuSections.map((section) => (
          <a href={`#${idPrefix}-${section.id}`} key={section.id}>{section.title}</a>
        ))}
      </nav>

      <div className="menu-stack">
        {menuSections.map((section, sectionIndex) => (
          <MenuSection
            id={`${idPrefix}-${section.id}`}
            key={section.id}
            title={section.title}
            note={section.note}
            itemCount={section.items.length}
            defaultOpen={sectionIndex === 0}
          >
            <div className="menu-section-header">
              <div>
                <SectionHeading>{section.title}</SectionHeading>
                <p>{section.note}</p>
              </div>
            </div>

            <div className="menu-items">
              {section.items.map((item) => {
                const canOrder = item.status === 'active' && item.whatsappEnabled;
                const image = 'image' in item ? item.image : undefined;

                return (
                  <article className={`menu-item${image ? '' : ' menu-item--no-image'}`} key={item.name}>
                    {image ? <img src={image} alt={`${item.name} from BOSSA`} loading="lazy" /> : null}
                    <div className="menu-item-copy">
                      <div className="menu-item-heading">
                        <ItemHeading>{item.name}</ItemHeading>
                        {item.status === 'coming-soon' ? <span className="menu-status">Coming Soon</span> : null}
                      </div>
                      <p>{item.description}</p>
                    </div>
                    <div className="menu-item-action">
                      <strong>{item.price}</strong>
                      {showOrderActions && canOrder ? (
                        <a
                          className="button menu-order-button"
                          href={buildItemOrderUrl(item.name, item.price)}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Order ${item.name} via WhatsApp`}
                          data-track="whatsapp-click"
                          data-cta-source="menu"
                          data-cta-label="item-order"
                          data-offer-id={item.name}
                        >
                          Order on WhatsApp
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </MenuSection>
        ))}
      </div>
    </div>
  );
}
