import type { BookMenuPageData } from '../types'

const cover: BookMenuPageData = {
  variant: 'cover',
  title: 'La Carte',
  subtitle: 'Comptoir Darna',
  tagline: 'Marrakech',
  items: [],
}

const entrees: BookMenuPageData = {
  section: 'Carte Restaurant',
  title: 'Entrées',
  items: [
    { name: 'Les Briouates', description: "Légumes aux herbes / poulet citron confit / kefta & amandes / kiri & truffe (G/N/L) — végétarien sur demande. 4 pièces / 8 pièces", price: '180 / 320' },
    { name: 'Tartare de Thon Rouge', description: 'Sauce ponzu / graines de sésame / edamame', price: '240' },
    { name: 'Les 7 Salades de Saison', description: "Saveurs d'orient (N/L)", price: '195', tag: 'veg' },
    { name: 'Houmous & Falafels', description: 'Pain chawarma berbère / pickles (G)', price: '180', tag: 'veg' },
    { name: 'Pastilla Poulet & Amandes', description: 'Sucré & salé (G/N/L)', price: '185' },
    { name: "Tacos d'Agneau", description: 'Agneau confit / sauce tzatziki / pickles de concombre (G/L)', price: '225' },
    { name: 'Pastilla Croustillante de Homard Bleu', description: 'Herbes fraîches / vermicelles citronnés / bisque corsée (G/N/L)', price: '260' },
    { name: 'Burrata & Tomate', description: "Mélasse de grenade / crumble d'olives noires / pesto (G/N/L)", price: '220', tag: 'veg' },
    { name: 'Chouchouka Beldi au Chorizo', description: 'Poivrons et tomates mijotés / chorizo de bœuf / œuf poché / brioche toastée (G)', price: '170' },
    { name: 'Croustillant de Gambas', description: 'Sauce sweet & chili à la grenade fraîche (G/L)', price: '235' },
    { name: 'Ravioles de Homard', description: 'Poêlée façon gyoza / fondue de poireaux au gingembre et citronnelle (G/L/N)', price: '245' },
  ],
}

const plats: BookMenuPageData = {
  section: 'Carte Restaurant',
  title: 'Plats',
  note: 'Garnitures — 45 DHS : Frites maison · Cassolette de petits légumes · Salade sucrine · Purée de pommes de terre · Riz sauté',
  items: [
    { name: 'Tagine de Poulet Mhamer', description: 'Citron confit / olives meslalla (G)', price: '250' },
    { name: 'Filet de Bar Tom Yam', description: 'Chou pakchaï / champignons shimeji (L)', price: '290' },
    { name: "Tagine de Souris d'Agneau", description: 'Pruneaux et amandes torréfiées (G/N)', price: '320' },
    { name: 'Saumon Laqué au Miso', description: 'Haricots verts sautés / citron confit / quinoa frit (G)', price: '270' },
    { name: 'Tagine de Kefta', description: "À l'œuf ou nature. Boulettes de viande mijotées à la sauce tomate paprika et gingembre (G)", price: '250' },
    { name: 'Curry de Poulet', description: 'Lait de coco / riz sauté (G/N/L)', price: '260', tag: 'spicy' },
    { name: 'Dorade à la Charmoula', description: 'Olives Taggiasche / fenouil rôti / sauce marocaine', price: '350' },
    { name: 'Couscous Royal', description: "Côtelettes d'agneau / merguez / cuisse de poulet / bœuf confit (G)", price: '330' },
  ],
}

const platsSignatures: BookMenuPageData = {
  section: 'Carte Restaurant',
  title: 'Plats Signatures & Sélection Végétarienne',
  items: [
    { name: 'Le Fameux Méchoui (pour 2 personnes)', description: "Épaule d'agneau cuite lentement pendant 7 heures et dorée au four / légumes & pommes de terre sautées", price: '750' },
    { name: 'Couscous aux Légumes', description: 'Semoule fine de blé (G)', price: '220', tag: 'veg' },
    { name: 'Le Tigre qui Pleure', description: 'Filet de bœuf tranché / coriandre fraîche / condiment thaï / croustillant de pomme de terre fondant (G/L)', price: '330' },
    { name: 'Tagine Berbère aux Légumes de Saison', description: "Chermoula aux olives violettes et meslalla parfumée à l'huile d'argan", price: '220', tag: 'veg' },
    { name: "Côtelettes d'Agneau Grillées", description: 'Harissa / zaatar / aubergine rôtie & tomates confites', price: '310', tag: 'spicy' },
    { name: 'Ravioles de Cèpes', description: 'Crème de champignons / roquette fraîche / noisettes torréfiées (G/L/N)', price: '260', tag: 'veg' },
  ],
}

const desserts: BookMenuPageData = {
  section: 'Carte Restaurant',
  title: 'Desserts',
  note: "Prix en dirhams (MAD), taxes et service compris. Nos 3 variétés de pains sont faites maison : tomates & olives · thym · chawarma berbère. 🌿 Sélection végétarienne | A = alcool · G = gluten · N = noix · L = produits laitiers",
  items: [
    { name: 'L\u2019Arbre à Macarons (à partager)', description: 'Chocolat Dubaï / citron yuzu / framboise vanille (G/N/L). 6 pièces / 12 pièces', price: '160 / 260' },
    { name: 'Profiteroles au Chocolat', description: 'Crème glacée vanille / sauce chocolat noir (G/L)', price: '125' },
    { name: 'Mousse Intense au Chocolat Noir', description: 'Noix de pécan / sauce caramel (G/N/L)', price: '125' },
    { name: 'Caramel', description: 'Coulant caramel / fleur de sel / crème glacée vanille / émulsion pop-corn (G/N/L)', price: '120' },
    { name: 'Nos Crèmes Brûlées', description: 'Vanille de Madagascar / noisette & noix / chocolat Valrhona (N/L)', price: '120' },
    { name: "Parfait Glacé à la Pistache d'Iran", description: 'Sabayon amande café (G/N/L)', price: '120' },
    { name: 'Patisseries Orientales', description: '(G/N/L)', price: '115' },
    { name: 'Notre Succulente Pastilla à la Crème de Lait « Jawhara »', description: 'Amandes torréfiées (G/N/L)', price: '110' },
    { name: 'Glaces et Sorbets (3 boules au choix)', description: 'Sorbets : mangue passion / framboise à la rose / citron gingembre. Crèmes glacées : vanille de Madagascar / chocolat / caramel beurre salé (L)', price: '115' },
    { name: 'Ananas Rôti', description: 'Crème coco-vanille / marmelade ananas-passion / sorbet citron gingembre (G/N/L)', price: '120' },
  ],
}

const cocktailsSignature: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Cocktails Signature',
  items: [
    { name: 'Secret Garden', description: "Gin Hendrick's infusé, mancenille, concombre frais, basilic, citron", price: '190' },
    { name: 'Berry Breeze', description: "Gin Bombay Sapphire infusé au romarin, mûre fraîche, ginger ale, sirop d'agave", price: '190' },
    { name: 'The Pink Panther', description: 'Gin Bombay Sapphire à la fraise, framboise, gingembre frais, cranberry, basilic, citron', price: '180' },
    { name: 'Tango Mango', description: 'Bacardi carta blanca, liqueur fruit de la passion, mangue fraîche, orange, citron', price: '180' },
    { name: 'Magic Marrakech', description: 'Bacardi carta blanca, liqueur pastèque, fraise, jus de cranberry, citron', price: '190' },
    { name: 'Ispahan', description: 'Vodka infusée à la rose, lychee & framboise, prosecco', price: '190' },
    { name: 'Passion Lychee', description: 'Vodka infusée, fruit de la passion, lychee, ananas, citron', price: '180' },
    { name: 'Crush on You', description: 'Vodka infusée fraise, jus de pamplemousse, sirop méditerranéen', price: '180' },
    { name: 'Treasure', description: "Tequila, poire fraîche, liqueur de fleur de sureau, sirop d'agave", price: '190' },
    { name: 'Aloha Maui', description: "Mezcal, habanero chili, liqueur d'abricot, fruit de la passion, jus de citron", price: '190' },
    { name: 'Smoking Oriental Old Fashion', description: 'Monkey Shoulder, sirop vanille et fenouil, bitter aromatique', price: '190' },
  ],
}

const classicTwist: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Classic & Twist',
  items: [
    { name: 'Saffron Negroni', description: 'Saffron gin, campari, martini rosso', price: '190' },
    { name: 'Spritz Rosato', description: 'Martini rosé, martini fiero, mandarine napoléon, pamplemousse, mousseux', price: '190' },
    { name: 'Paloma', description: 'Tequila infusée au bissap, soda au pamplemousse, sel', price: '190' },
    { name: 'Raspberry Moscow Mule', description: 'Vodka infusée à la framboise, ginger ale, framboises fraîches, jus de citron & gingembre', price: '190' },
    { name: 'P*** Star Martini', description: 'Vodka infusée à la vanille, liqueur de passion, fruit de la passion, prosecco', price: '190' },
  ],
}

const mocktails: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Mocktails sans Alcool',
  items: [
    { name: 'Seasonal Fruits Cocktail', description: '100% fruits frais', price: '130' },
    { name: 'Green Potion', description: 'Thé vert matcha, yuzu, orgeat, soda water', price: '130' },
    { name: 'Summer Bliss', description: 'Orange, fraise et citron frais, limonade', price: '130' },
    { name: 'Organic Red', description: 'Framboise fraîche, infusion de fruits rouges, cranberry, sirop de fleur de sureau', price: '130' },
    { name: 'Agua de Jamaica', description: "Infusion de fleur d'hibiscus, ananas, menthe fraîche", price: '130' },
    { name: 'The Sultan Ice Tea', description: 'Thé glacé à la menthe fraîche, fruit de la passion, romarin', price: '130' },
  ],
}

const softDrinks: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Soft Drinks',
  items: [
    { name: 'Coca Cola | Coca Zero', price: '90' },
    { name: 'Schweppes Citron | Tonic | Sprite', price: '90' },
    { name: 'Fruit Juice', description: 'Orange, ananas, pêche, pomme, mangue, tomate, cranberry', price: '90' },
    { name: 'Red Bull', price: '100' },
    { name: 'Ginger Ale Fever Tree | Pink Grapefruit Soda', price: '90' },
    { name: 'Ain Saiss | Ain Saiss Gazeuse (50 cl)', price: '80' },
  ],
}

const bieres: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Bières',
  items: [
    { name: 'San Miguel', price: '110' },
    { name: 'Corona', price: '120' },
    { name: 'Corona Cero 0,0% Alc./Vol.', price: '110' },
  ],
}

const aperitifs: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Apéritifs & Digestifs',
  items: [
    { name: 'Get 27 | Manzana | Grand Marnier | Jägermeister', price: '140' },
    { name: "Poire William | Bailey's Original", price: '140' },
    { name: 'Amaretto | Limoncello | Sambuca Luxardo', price: '140' },
    { name: 'Calvados Père François | Armagnac Sempé', price: '155' },
    { name: 'Hennessy VSOP', price: '190' },
    { name: 'Hennessy XO', price: '320' },
    { name: 'Pastis | Porto Cruz | Martini | Campari', price: '140' },
  ],
}

const gins: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Gins',
  priceColumns: ['Verre', 'Bouteille'],
  items: [
    { name: 'Tanqueray | Bombay Sapphire | Citadelle', prices: ['150', '1900'] },
    { name: "Tanqueray Ten | Hendrick's", prices: ['160', '2000'] },
    { name: 'Le Tribute | Gin Mare', prices: ['160', '2000'] },
  ],
}

const tequilas: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Tequilas',
  priceColumns: ['Verre', 'Bouteille'],
  items: [
    { name: 'Jose Cuervo Silver | Gold | Camino Real', prices: ['150', '1900'] },
    { name: 'Patrón Silver', prices: ['180', '2600'] },
    { name: 'Patrón Reposado', prices: ['190', '2800'] },
    { name: 'Patrón Añejo', prices: ['200', '3000'] },
    { name: 'Don Julio Blanco', prices: ['220', '3200'] },
    { name: 'Don Julio Reposado', prices: ['230', '3200'] },
    { name: 'Don Julio Añejo', prices: ['230', '3400'] },
    { name: 'Don Julio Añejo 1942', prices: ['—', '10000'] },
    { name: 'Volcan de mi Terra XA', prices: ['—', '10000'] },
    { name: 'Clase Azul Reposado', prices: ['—', '10000'] },
    { name: 'Adicción Reposado', prices: ['—', '10000'] },
    { name: 'Le Tribute Mezcal', prices: ['190', '2800'] },
  ],
}

const vodkas: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Vodkas',
  priceColumns: ['Verre', 'Bouteille', 'Magnum'],
  items: [
    { name: 'Ketel One | Stolichnaya', prices: ['150', '1900', '—'] },
    { name: 'Grey Goose | Ciroc | Belvedere | Beluga Noble', prices: ['160', '2000', '4000'] },
    { name: 'Stolichnaya Elit | Pravida', prices: ['—', '2100', '—'] },
  ],
}

const whiskiesBlended: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Whiskies — Blended Scotch',
  priceColumns: ['Verre', 'Bouteille'],
  items: [
    { name: "J. Walker Red Label | J&B | Grant's", prices: ['150', '—'] },
    { name: "Monkey Shoulder | Dewar's 12 ans", prices: ['155', '1980'] },
    { name: "J. Walker Black Label | Dewar's 15 ans", prices: ['160', '2000'] },
    { name: 'J. Walker Double Black | Ruby Black', prices: ['185', '2200'] },
    { name: 'J. Walker Blue Label', prices: ['480', '7500'] },
  ],
}

const whiskiesSingleMalt: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Whiskies — Single Malt',
  priceColumns: ['Verre', 'Bouteille'],
  items: [
    { name: 'Glenfiddich 12 ans', prices: ['165', '2000'] },
    { name: 'Glenfiddich 15 ans', prices: ['175', '2200'] },
    { name: 'Glenfiddich 18 ans', prices: ['185', '2600'] },
    { name: 'Glenmorangie The Original 12 ans', prices: ['175', '2200'] },
    { name: 'Glenmorangie Lasanta 15 ans', prices: ['185', '2600'] },
    { name: "Glenmorangie Nectar d'Or", prices: ['220', '2900'] },
    { name: 'The Macallan Double Cask 12 ans', prices: ['200', '2700'] },
  ],
}

const whiskiesTennessee: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Whiskies — Tennessee',
  priceColumns: ['Verre', 'Bouteille'],
  items: [
    { name: "Jack Daniel's", prices: ['155', '1900'] },
    { name: "Jack Daniel's Honey", prices: ['155', '1900'] },
    { name: 'Gentleman Jack', prices: ['160', '2000'] },
    { name: 'Bulleit Bourbon', prices: ['160', '2000'] },
  ],
}

const rhums: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Rhums',
  priceColumns: ['Verre', 'Bouteille'],
  items: [
    { name: 'Bacardi', prices: ['150', '1900'] },
    { name: 'Bacardi Oro', prices: ['150', '1900'] },
    { name: 'Captain Morgan', prices: ['150', '1900'] },
    { name: 'Saint James Royal Ambré', prices: ['150', '1900'] },
    { name: 'Plantation Pineapple', prices: ['160', '2000'] },
    { name: 'Ron Zacapa 23', prices: ['190', '2600'] },
    { name: 'Ron Zacapa XO', prices: ['320', '3400'] },
  ],
}

const champagnes: BookMenuPageData = {
  section: 'Carte Boissons',
  title: 'Champagnes',
  priceColumns: ['Bouteille', 'Magnum'],
  note: "Prix en dirhams (MAD), taxes et service compris. L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
  items: [
    { name: 'Moët & Chandon Brut', prices: ['2000', '4000'] },
    { name: 'Moët & Chandon Rosé', prices: ['2600', '5200'] },
    { name: 'Ruinart Brut', prices: ['2200', '4600'] },
    { name: 'Ruinart Rosé', prices: ['3800', '7600'] },
    { name: 'Ruinart Blanc de Blanc', prices: ['3400', '7600'] },
    { name: 'Laurent Perrier Brut', prices: ['2000', '4000'] },
    { name: 'Laurent Perrier Cuvée Rosé', prices: ['3000', '5800'] },
    { name: 'Taittinger Brut', prices: ['2000', '—'] },
    { name: 'Taittinger Rosé', prices: ['2200', '—'] },
    { name: 'Dom Pérignon Brut', prices: ['9000', '—'] },
    { name: 'Dom Pérignon Rosé', prices: ['15000', '—'] },
    { name: 'Coupe de Champagne', prices: ['220', '—'] },
  ],
}

const restaurantCategories = [entrees, plats, platsSignatures, desserts]
const drinksCategories = [
  cocktailsSignature,
  classicTwist,
  mocktails,
  softDrinks,
  bieres,
  aperitifs,
  gins,
  tequilas,
  vodkas,
  whiskiesBlended,
  whiskiesSingleMalt,
  whiskiesTennessee,
  rhums,
  champagnes,
]

/**
 * The book has a fixed page size, so a category with many (or long) items
 * can't always fit on a single page. Rather than let a page scroll — which
 * would break the "same size everywhere" feel of a real book — we split
 * long categories across several pages ("Entrées", "Entrées (suite)"...),
 * estimating how much vertical space each item needs.
 */
const MAX_WEIGHT_PER_PAGE = 15

function itemWeight(item: BookMenuPageData['items'][number]): number {
  const descriptionLength = item.description?.length ?? 0
  const nameOverflow = Math.max(item.name.length - 30, 0)
  return 1 + Math.ceil((descriptionLength + nameOverflow) / 55)
}

function paginateCategory(category: BookMenuPageData): BookMenuPageData[] {
  const items = category.items
  if (items.length === 0) return [category]

  const weights = items.map(itemWeight)
  const totalWeight = weights.reduce((sum, w) => sum + w, 0)
  const chunkCount = Math.max(1, Math.ceil(totalWeight / MAX_WEIGHT_PER_PAGE))
  const target = totalWeight / chunkCount

  const chunks: BookMenuPageData['items'][] = []
  let current: BookMenuPageData['items'] = []
  let currentWeight = 0

  items.forEach((item, i) => {
    const w = weights[i]
    // Close the current page once it reaches its fair share — unless that
    // would leave more pages than planned (keeps the split balanced instead
    // of leaving a near-empty trailing page for the last item or two).
    if (current.length > 0 && currentWeight + w > target && chunks.length < chunkCount - 1) {
      chunks.push(current)
      current = []
      currentWeight = 0
    }
    current.push(item)
    currentWeight += w
  })
  chunks.push(current)

  return chunks.map((pageItems, i) => ({
    ...category,
    title: i === 0 ? category.title : `${category.title} (suite)`,
    // The note (garnitures, legend, allergen key...) only belongs on the last page.
    note: i === chunks.length - 1 ? category.note : undefined,
    items: pageItems,
  }))
}

const contentPages: BookMenuPageData[] = []
const tocEntries: { title: string; section?: string; pageIndex: number }[] = []

for (const category of [...restaurantCategories, ...drinksCategories]) {
  tocEntries.push({ title: category.title, section: category.section, pageIndex: contentPages.length })
  contentPages.push(...paginateCategory(category))
}

const PAGES_BEFORE_CONTENT = 2 // cover + sommaire

const toc: BookMenuPageData = {
  variant: 'toc',
  title: 'Sommaire',
  items: tocEntries.map((entry) => ({
    name: entry.title,
    description: entry.section,
    price: String(entry.pageIndex + PAGES_BEFORE_CONTENT + 1),
  })),
}

export const bookMenuPages: BookMenuPageData[] = [cover, toc, ...contentPages]
