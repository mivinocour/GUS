import { RestaurantData } from '../data';

const sikwa: RestaurantData = {
  name: 'Sikwa',
  // To use a local image, place it in /public/images/sikwa/ and reference like this:
  // logo: '/images/sikwa/logo.png',
  logo: 'https://sikwa.cr/wp-content/uploads/2023/06/cropped-Logo-sikwa-sin-fondo-600x338.png',
  colors: {
    primary: '#6a994e',
    'primary-dark': '#386641',
    background: '#fffaf0',
  },
  recommendations: [
    {
      id: 'cacao',
      name: 'Bebida de Cacao',
      description: 'Tradicional de la casa',
      price: 3200,
      category: 'Bebidas',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'cujiniquil',
      name: 'Cujiniquil',
      description: 'Ensalada tradicional Bribri',
      price: 3900,
      category: 'Entradas',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
    }
  ],
  menu: [
    {
      id: 'starters',
      title: 'Entradas',
      items: [
        {
          id: 'cujiniquil',
          name: 'Cujiniquil',
          description: 'Ensalada de tubérculos rallados y coco',
          price: 3900,
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
          category: 'Entradas',
        },
      ],
    },
    {
      id: 'mains',
      title: 'Platos Estrella',
      items: [
        {
          id: 'pezgallopinto',
          name: 'Pez sobre Gallo Pinto',
          description: 'Filete de pescado fresco sobre gallo pinto con coco',
          price: 7500,
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600',
          category: 'Platos Estrella',
        },
      ],
    },
    {
      id: 'desserts',
      title: 'Postres',
      items: [
        {
          id: 'frutabosque',
          name: 'Frutas del Bosque',
          description: 'Frutas locales, cacao y miel',
          price: 3300,
          image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&q=80&w=600',
          category: 'Postres',
        },
      ],
    }
  ],
};

export default sikwa;
