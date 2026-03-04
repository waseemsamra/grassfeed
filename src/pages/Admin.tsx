import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Save, RotateCcw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useHomeContent } from '../context/HomeContentContext';

const splitLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const sectionTargetMap: Record<string, string> = {
  '/admin/footer': 'footer-content-editor',
  '/admin/contact': 'contact-content-editor',
  '/admin/products': 'product-content-editor',
};

const Admin = () => {
  const location = useLocation();
  const { products, updateProduct, resetProducts } = useProducts();
  const { homeContent, updateHomeContent, resetHomeContent } = useHomeContent();
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? '');

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedId) ?? products[0],
    [products, selectedId]
  );

  useEffect(() => {
    const targetId = sectionTargetMap[location.pathname];
    if (!targetId) return;
    const timeout = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (!selectedProduct) return null;

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="section-padding">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-dark">Admin Panel</h1>
          <p className="text-gray-600">Edit home content and products (saved in your browser via localStorage).</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Link to="/admin" className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-700">Home</Link>
            <Link to="/admin/footer" className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-700">Footer</Link>
            <Link to="/admin/contact" className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-700">Contact Page</Link>
            <Link to="/admin/products" className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-700">Products</Link>
          </div>
        </div>

        <div id="home-content-editor" className="bg-white rounded-2xl shadow-sm p-6 mb-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-dark">Home Page Content</h2>
            <button
              type="button"
              onClick={resetHomeContent}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Home Content
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Hero Image URL</label>
              <input
                value={homeContent.heroImage}
                onChange={(e) => updateHomeContent({ heroImage: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Hero Badge Text</label>
              <input
                value={homeContent.heroBadgeText}
                onChange={(e) => updateHomeContent({ heroBadgeText: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Hero Title</label>
              <input
                value={homeContent.heroTitle}
                onChange={(e) => updateHomeContent({ heroTitle: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Highlighted Word in Title</label>
              <input
                value={homeContent.heroHighlightWord}
                onChange={(e) => updateHomeContent({ heroHighlightWord: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Hero Subtitle</label>
            <textarea
              value={homeContent.heroSubtitle}
              onChange={(e) => updateHomeContent({ heroSubtitle: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Primary Button Text</label>
              <input
                value={homeContent.heroPrimaryButtonText}
                onChange={(e) => updateHomeContent({ heroPrimaryButtonText: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Secondary Button Text</label>
              <input
                value={homeContent.heroSecondaryButtonText}
                onChange={(e) => updateHomeContent({ heroSecondaryButtonText: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Products Badge</label>
              <input
                value={homeContent.productsBadgeText}
                onChange={(e) => updateHomeContent({ productsBadgeText: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Products Section Title</label>
              <input
                value={homeContent.productsTitle}
                onChange={(e) => updateHomeContent({ productsTitle: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Products Subtitle</label>
              <input
                value={homeContent.productsSubtitle}
                onChange={(e) => updateHomeContent({ productsSubtitle: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div id="footer-content-editor" className="pt-2 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-dark mb-3">Footer Content</h3>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Footer Description</label>
              <textarea
                value={homeContent.footerDescription}
                onChange={(e) => updateHomeContent({ footerDescription: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Footer Address</label>
                <input
                  value={homeContent.footerAddress}
                  onChange={(e) => updateHomeContent({ footerAddress: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Footer Phone</label>
                <input
                  value={homeContent.footerPhone}
                  onChange={(e) => updateHomeContent({ footerPhone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Footer Email</label>
                <input
                  value={homeContent.footerEmail}
                  onChange={(e) => updateHomeContent({ footerEmail: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Copyright Text</label>
                <input
                  value={homeContent.footerCopyright}
                  onChange={(e) => updateHomeContent({ footerCopyright: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Privacy Label</label>
                <input
                  value={homeContent.footerPrivacyLabel}
                  onChange={(e) => updateHomeContent({ footerPrivacyLabel: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Terms Label</label>
                <input
                  value={homeContent.footerTermsLabel}
                  onChange={(e) => updateHomeContent({ footerTermsLabel: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div id="contact-content-editor" className="pt-2 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-dark mb-3">Contact Page Content</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contact Hero Image</label>
                <input
                  value={homeContent.contactHeroImage}
                  onChange={(e) => updateHomeContent({ contactHeroImage: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contact Badge</label>
                <input
                  value={homeContent.contactBadgeText}
                  onChange={(e) => updateHomeContent({ contactBadgeText: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contact Title</label>
                <input
                  value={homeContent.contactTitle}
                  onChange={(e) => updateHomeContent({ contactTitle: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-700 mb-1">Contact Subtitle</label>
              <textarea
                value={homeContent.contactSubtitle}
                onChange={(e) => updateHomeContent({ contactSubtitle: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <input value={homeContent.contactVisitTitle} onChange={(e) => updateHomeContent({ contactVisitTitle: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Visit title" />
              <input value={homeContent.contactVisitLine1} onChange={(e) => updateHomeContent({ contactVisitLine1: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Visit line 1" />
              <input value={homeContent.contactVisitLine2} onChange={(e) => updateHomeContent({ contactVisitLine2: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Visit line 2" />
              <input value={homeContent.contactMapAddress} onChange={(e) => updateHomeContent({ contactMapAddress: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Map address" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input value={homeContent.contactCallTitle} onChange={(e) => updateHomeContent({ contactCallTitle: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Call title" />
              <input value={homeContent.contactCallLine1} onChange={(e) => updateHomeContent({ contactCallLine1: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Phone 1" />
              <input value={homeContent.contactCallLine2} onChange={(e) => updateHomeContent({ contactCallLine2: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Phone 2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input value={homeContent.contactEmailTitle} onChange={(e) => updateHomeContent({ contactEmailTitle: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Email title" />
              <input value={homeContent.contactEmailLine1} onChange={(e) => updateHomeContent({ contactEmailLine1: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Email 1" />
              <input value={homeContent.contactEmailLine2} onChange={(e) => updateHomeContent({ contactEmailLine2: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Email 2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input value={homeContent.contactHoursTitle} onChange={(e) => updateHomeContent({ contactHoursTitle: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Hours title" />
              <input value={homeContent.contactHoursLine1} onChange={(e) => updateHomeContent({ contactHoursLine1: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Hours line 1" />
              <input value={homeContent.contactHoursLine2} onChange={(e) => updateHomeContent({ contactHoursLine2: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Hours line 2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input value={homeContent.contactFormTitle} onChange={(e) => updateHomeContent({ contactFormTitle: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Form title" />
              <input value={homeContent.contactFormSubtitle} onChange={(e) => updateHomeContent({ contactFormSubtitle: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Form subtitle" />
              <input value={homeContent.contactFormSubmitText} onChange={(e) => updateHomeContent({ contactFormSubmitText: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Submit button text" />
            </div>
          </div>
        </div>

        <div id="product-content-editor" className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Product Editor</h2>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Product</label>
          <select
            value={selectedProduct.id}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full max-w-sm border border-gray-300 rounded-lg px-3 py-2"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Title</label>
              <input
                value={selectedProduct.title}
                onChange={(e) => updateProduct(selectedProduct.id, { title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Subtitle</label>
              <input
                value={selectedProduct.subtitle}
                onChange={(e) => updateProduct(selectedProduct.id, { subtitle: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Short Description (Home)</label>
            <textarea
              value={selectedProduct.shortDescription}
              onChange={(e) => updateProduct(selectedProduct.id, { shortDescription: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Description (Products Page)</label>
            <textarea
              value={selectedProduct.description}
              onChange={(e) => updateProduct(selectedProduct.id, { description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Image URL</label>
              <input
                value={selectedProduct.image}
                onChange={(e) => updateProduct(selectedProduct.id, { image: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Detail Image URL</label>
              <input
                value={selectedProduct.detailImage}
                onChange={(e) => updateProduct(selectedProduct.id, { detailImage: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Features (one per line)</label>
            <textarea
              value={selectedProduct.features.join('\n')}
              onChange={(e) => updateProduct(selectedProduct.id, { features: splitLines(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-24"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Summary Items (one per line)</label>
            <textarea
              value={selectedProduct.summaryItems.join('\n')}
              onChange={(e) => updateProduct(selectedProduct.id, { summaryItems: splitLines(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-24"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              <Save className="w-4 h-4" />
              Saved Automatically
            </button>
            <button
              type="button"
              onClick={resetProducts}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
