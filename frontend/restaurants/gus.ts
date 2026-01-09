import { RestaurantData } from '../data';

const gus: RestaurantData = {
  name: 'Restaurante El Patio',
  logo: null,
  colors: {
    primary: '#2563EB',
    'primary-dark': '#1d4ed8',
    background: '#F8FAFC',
  },
  recommendations: [
    {
      id: 'cheesecake',
      name: 'Cheesecake NY',
      description: 'Salsa de frutos rojos',
      price: 4500,
      category: 'Postres',
      image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'cookie',
      name: 'Choco Cookie',
      description: 'Chips de chocolate belga',
      price: 2500,
      category: 'Postres',
      image: 'https://images.unsplash.com/photo-1499636138143-bd630f5cf446?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'latte',
      name: 'Caramel Latte',
      description: 'Con leche de almendras',
      price: 3200,
      category: 'Bebidas',
      image: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?auto=format&fit=crop&q=80&w=600',
    }
  ],
  menu: [
    {
      id: 'starters',
      title: 'Entradas',
      items: [
        {
          id: '1',
          name: 'Bruschetta Italiana',
          description: 'Tomates frescos, albahaca, ajo y aceite de oliva sobre pan tostado.',
          price: 4500,
          image: '/images/gus/bruschetta.jpg',
          category: 'Entradas',
        },
        {
          id: '2',
          name: 'Carpaccio de Res',
          description: 'Finas láminas de res con parmesano, rúcula y alcaparras.',
          price: 6800,
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
          category: 'Entradas',
        }
      ],
    },
    {
      id: 'mains',
      title: 'Platos Fuertes',
      items: [
        {
          id: '3',
          name: 'Hamburguesa Gus',
          description: '200g de carne angus, queso cheddar, bacon y salsa especial.',
          price: 8500,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
          category: 'Platos Fuertes',
        },
        {
          id: '4',
          name: 'Salmón a la Parrilla',
          description: 'Acompañado de puré de papas y vegetales salteados.',
          price: 12500,
          image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=600',
          category: 'Platos Fuertes',
        },
        {
          id: '5',
          name: 'Pasta Carbonara',
          description: 'Auténtica receta italiana con guanciale y pecorino.',
          price: 7900,
          image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600',
          category: 'Platos Fuertes',
        }
      ],
    },
    {
      id: 'desserts',
      title: 'Postres',
      items: [
        {
          id: 'cheesecake',
          name: 'Cheesecake NY',
          description: 'Clásico cheesecake estilo New York con salsa de frutos rojos.',
          price: 4500,
          image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop',
          category: 'Postres',
        },
        {
          id: 'cookie',
          name: 'Choco Cookie Skillet',
          description: 'Galleta horneada al momento con helado de vainilla.',
          price: 3800,
          image: '/images/gus/skillet.jpg',
          category: 'Postres',
        },
        {
          id: 'brownie',
          name: 'Brownie Fudge',
          description: 'Con nueces y doble chocolate.',
          price: 3500,
          image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
          category: 'Postres',
        }
      ],
    }
  ],
};

export default gus;
