// src/lib/categories.ts
export const categories = [
  {
    id: 'Electronique',
    name: 'Électronique',
    subcategories: [
      { id: 'Téléphone', name: 'Téléphone' },
      { id: 'Ordinateur_Portable', name: 'Ordinateur portable' },
      { id: 'Tablette', name: 'Tablette' },
      { id: 'Autre', name: 'Autre électronique' }
    ]
  },
  {
    id: 'Accessoires',
    name: 'Accessoires',
    subcategories: [
      { id: 'Clés', name: 'Clés' },
      { id: 'Portefeuille', name: 'Portefeuille' },
      { id: 'Sac', name: 'Sac' },
      { id: 'Autre', name: 'Autre accessoire' }
    ]
  },
  {
    id: 'Documents',
    name: 'Documents',
    subcategories: [
      { id: 'Pièce_Identité', name: 'Pièce d\'identité' },
      { id: 'Carte_Bancaire', name: 'Carte bancaire' },
      { id: 'Autre', name: 'Autre document' }
    ]
  },
  {
    id: 'Sports',
    name: 'Sports',
    subcategories: [
      { id: 'Gants_De_Boxe', name: 'Gants de boxe' },
      { id: 'Autre', name: 'Autre équipement sportif' }
    ]
  },
  {
    id: 'Autre',
    name: 'Autre',
    subcategories: [
      { id: 'Autre', name: 'Autre' }
    ]
  }
];

