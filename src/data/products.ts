export interface ProductCategoryItem {
  name: string;
  description: string;
  benefits: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  image: string;
  detailImage: string;
  summaryItems: string[];
  features: string[];
  items: ProductCategoryItem[];
  specifications: ProductSpec[];
  benefits: string[];
  uses: string[];
  relatedProducts: string[];
}

export const defaultProducts: Product[] = [
  {
    id: 'hay',
    title: 'Hay Products',
    subtitle: 'Premium Grass Hays',
    shortDescription: 'Premium Rhodes Grass, Timothy Hay, and Rye Grass for optimal livestock nutrition.',
    description:
      'Our hay products are carefully harvested and cured to preserve maximum nutritional value. We offer a variety of grass hays suitable for different livestock needs.',
    longDescription:
      'Our premium hay products are sourced from the finest grasslands, carefully harvested at the optimal time to ensure maximum nutritional content. Each bale is inspected for quality, moisture content, and leaf retention. We offer Rhodes Grass, Timothy Hay, and Rye Grass - each suited for different livestock needs and dietary requirements.',
    image: '/product-hay.jpg',
    detailImage: '/detail-timothy.jpg',
    summaryItems: ['Rhodes Grass', 'Timothy Hay', 'Rye Grass'],
    features: ['High Fiber Content', 'Low NSC', 'Excellent Palatability'],
    items: [
      {
        name: 'Rhodes Grass',
        description: 'High-fiber, low-protein grass ideal for maintenance diets.',
        benefits: ['Excellent for horses', 'Low NSC content', 'Great for weight management'],
      },
      {
        name: 'Timothy Hay',
        description: 'Premium quality hay perfect for horses and small animals.',
        benefits: ['High palatability', 'Balanced nutrition', 'Easy digestion'],
      },
      {
        name: 'Rye Grass',
        description: 'Nutritious grass hay with excellent energy content.',
        benefits: ['High energy', 'Good protein levels', 'Versatile usage'],
      },
    ],
    specifications: [
      { label: 'Protein Content', value: '8-12%' },
      { label: 'Moisture', value: '< 15%' },
      { label: 'Fiber', value: '25-35%' },
      { label: 'Bale Weight', value: '15-25 kg' },
      { label: 'Storage', value: 'Dry, ventilated' },
    ],
    benefits: [
      'High fiber content aids digestion',
      'Natural source of vitamins and minerals',
      'Low in non-structural carbohydrates',
      'Promotes healthy gut function',
      'Helps maintain ideal body weight',
    ],
    uses: [
      'Daily feed for horses and cattle',
      'Supplemental fiber source',
      'Bedding material',
      'Forage for small animals',
    ],
    relatedProducts: ['alfalfa', 'straw', 'grain'],
  },
  {
    id: 'alfalfa',
    title: 'Alfalfa Products',
    subtitle: 'Protein-Rich Feed',
    shortDescription: 'High-protein alfalfa hay and pellets, perfect for dairy cattle and horses.',
    description:
      'Alfalfa is known as the "queen of forages" due to its high protein content and digestibility. Our alfalfa products are perfect for growing and lactating animals.',
    longDescription:
      'Alfalfa is one of the most nutrient-dense forages available, providing high levels of protein, calcium, and vitamins. Our alfalfa products are harvested at early bloom to maximize leaf content and nutritional value. Perfect for growing, lactating, and working animals that require extra energy and protein.',
    image: '/product-alfalfa.jpg',
    detailImage: '/product-alfalfa.jpg',
    summaryItems: ['Alfalfa Hay', 'Alfalfa Pellets', 'Alfalfa Meal'],
    features: ['18-22% Protein', 'High Calcium', 'Rich in Vitamins'],
    items: [
      {
        name: 'Alfalfa Hay',
        description: 'Leafy, green hay with high protein and calcium content.',
        benefits: ['18-22% protein', 'Rich in calcium', 'Excellent for dairy'],
      },
      {
        name: 'Alfalfa Pellets',
        description: 'Convenient compressed alfalfa for easy feeding.',
        benefits: ['Less waste', 'Easy storage', 'Consistent nutrition'],
      },
      {
        name: 'Alfalfa Meal',
        description: 'Ground alfalfa perfect for mixing with other feeds.',
        benefits: ['Easy to mix', 'Uniform texture', 'High digestibility'],
      },
    ],
    specifications: [
      { label: 'Protein Content', value: '18-22%' },
      { label: 'Calcium', value: '1.2-1.5%' },
      { label: 'Energy', value: 'High' },
      { label: 'Form', value: 'Hay, Pellets, Meal' },
      { label: 'Best For', value: 'Dairy, Growing animals' },
    ],
    benefits: [
      'Exceptional protein content',
      'Rich in calcium for bone health',
      'High energy for active animals',
      'Excellent palatability',
      'Supports milk production',
    ],
    uses: ['Dairy cattle feed', 'Growing youngstock', 'Working horses', 'Pregnant and lactating animals'],
    relatedProducts: ['hay', 'pellets', 'grain'],
  },
  {
    id: 'straw',
    title: 'Straw Products',
    subtitle: 'Quality Bedding & Feed',
    shortDescription: 'Quality wheat and barley straw for bedding and feed supplementation.',
    description:
      'Our straw products serve dual purposes - as bedding material and low-nutrient feed supplement. Sourced from premium grain crops.',
    longDescription:
      'Straw is an essential farm product with multiple uses. As bedding, it provides comfort, warmth, and absorption for livestock. As feed, it adds fiber to the diet and helps maintain digestive health. Our straw is thoroughly cleaned to minimize dust and contaminants.',
    image: '/product-straw.jpg',
    detailImage: '/product-straw.jpg',
    summaryItems: ['Wheat Straw', 'Barley Straw', 'Oat Straw'],
    features: ['Excellent Bedding', 'High Absorption', 'Low Dust'],
    items: [
      {
        name: 'Wheat Straw',
        description: 'Golden straw excellent for bedding and fiber supplement.',
        benefits: ['Soft bedding', 'Low dust', 'Good absorption'],
      },
      {
        name: 'Barley Straw',
        description: 'Durable straw with slightly higher nutritional value.',
        benefits: ['Long lasting', 'Better nutrition', 'Versatile use'],
      },
      {
        name: 'Oat Straw',
        description: 'Soft, sweet-smelling straw preferred by many animals.',
        benefits: ['Highly palatable', 'Sweet aroma', 'Easy to handle'],
      },
    ],
    specifications: [
      { label: 'Type', value: 'Wheat, Barley, Oat' },
      { label: 'Length', value: '5-15 cm' },
      { label: 'Dust Level', value: 'Low' },
      { label: 'Absorption', value: 'High' },
      { label: 'Packaging', value: 'Bales, Loose' },
    ],
    benefits: [
      'Excellent bedding material',
      'Good absorption properties',
      'Low cost feed supplement',
      'High fiber content',
      'Comfortable for animals',
    ],
    uses: ['Animal bedding', 'Fiber supplement', 'Erosion control', 'Composting material'],
    relatedProducts: ['hay', 'grain', 'pellets'],
  },
  {
    id: 'grain',
    title: 'Grain & Silage',
    subtitle: 'High-Energy Feed',
    shortDescription: 'Nutrient-rich grain products and fermented silage for maximum energy.',
    description:
      'Energy-dense grain products and fermented silage for maximum livestock performance. Perfect for finishing animals and high-production livestock.',
    longDescription:
      'Our grain and silage products provide concentrated energy for high-performance livestock. Corn silage offers a perfect balance of fiber and energy, while our grain mixes can be customized to meet specific nutritional requirements. All products are tested for quality and safety.',
    image: '/product-grain.jpg',
    detailImage: '/detail-silage.jpg',
    summaryItems: ['Corn Silage', 'Grain Mix', 'Fermented Feed'],
    features: ['High Energy', 'Fermented', 'Year-Round Available'],
    items: [
      {
        name: 'Corn Silage',
        description: 'Fermented corn providing excellent energy and fiber.',
        benefits: ['High energy', 'Good fiber content', 'Year-round availability'],
      },
      {
        name: 'Grain Mix',
        description: 'Balanced blend of grains for optimal nutrition.',
        benefits: ['Complete nutrition', 'Consistent quality', 'Customizable blends'],
      },
      {
        name: 'Fermented Feed',
        description: 'Probiotics-rich fermented feed for gut health.',
        benefits: ['Improved digestion', 'Probiotic benefits', 'Enhanced palatability'],
      },
    ],
    specifications: [
      { label: 'Energy Content', value: 'High' },
      { label: 'Starch', value: '25-35%' },
      { label: 'Form', value: 'Whole, Ground, Silage' },
      { label: 'Moisture (Silage)', value: '60-70%' },
      { label: 'Storage Life', value: '12+ months' },
    ],
    benefits: [
      'High energy for growth',
      'Improved feed efficiency',
      'Fermented for digestibility',
      'Year-round availability',
      'Cost-effective nutrition',
    ],
    uses: ['Finishing cattle', 'High-production dairy', 'Working animals', 'Energy supplementation'],
    relatedProducts: ['alfalfa', 'pellets', 'hay'],
  },
  {
    id: 'pellets',
    title: 'Pellets & Capsules',
    subtitle: 'Convenient Nutrition',
    shortDescription: 'Convenient compressed feed pellets and nutritional capsules.',
    description:
      'Compressed feed products offering convenience without compromising nutrition. Easy to store, measure, and feed.',
    longDescription:
      'Our pellets and capsules provide complete nutrition in a convenient, easy-to-feed form. The pelleting process reduces waste, improves digestibility, and ensures consistent nutrient intake. Capsules offer targeted supplementation for specific health needs.',
    image: '/product-pellets.jpg',
    detailImage: '/product-pellets.jpg',
    summaryItems: ['Feed Pellets', 'Nutritional Capsules', 'Supplement Pellets'],
    features: ['Minimal Waste', 'Easy Storage', 'Consistent Nutrition'],
    items: [
      {
        name: 'Feed Pellets',
        description: 'Complete nutrition in convenient pellet form.',
        benefits: ['No sorting', 'Easy measurement', 'Minimal waste'],
      },
      {
        name: 'Nutritional Capsules',
        description: 'Targeted nutrition supplements in capsule form.',
        benefits: ['Precise dosing', 'Easy administration', 'Targeted nutrition'],
      },
      {
        name: 'Supplement Pellets',
        description: 'Vitamin and mineral supplements for balanced diets.',
        benefits: ['Complete minerals', 'Vitamin enriched', 'Health support'],
      },
    ],
    specifications: [
      { label: 'Diameter', value: '6-8 mm' },
      { label: 'Length', value: '10-20 mm' },
      { label: 'Density', value: 'High' },
      { label: 'Durability', value: '> 95%' },
      { label: 'Packaging', value: '25kg, 50kg, Bulk' },
    ],
    benefits: [
      'Minimal feed waste',
      'Easy to measure and feed',
      'Improved digestibility',
      'Consistent nutrition',
      'Long shelf life',
    ],
    uses: ['Daily complete feed', 'Supplement delivery', 'Travel and shows', 'Automatic feeders'],
    relatedProducts: ['alfalfa', 'grain', 'straw'],
  },
];
