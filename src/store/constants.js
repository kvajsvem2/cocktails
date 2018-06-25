export default {
  ingredients: [
    {
      name: 'syrup',
      type: 'soft-drink',
      price: 0.2,
      quantity: 0
    },
    {
      name: 'lime',
      type: 'fruit',
      price: 0.1,
      quantity: 0
    },
    {
      name: 'pineapple',
      type: 'fruit',
      price: 0.2,
      quantity: 0
    },
    {
      name: 'orange',
      type: 'fruit',
      price: 0.1,
      quantity: 0
    },
    {
      name: 'cranberry',
      type: 'fruit',
      price: 0.3,
      quantity: 0
    },
    {
      name: 'coconut',
      type: 'fruit',
      price: 0.3,
      quantity: 0
    },
    {
      name: 'mint',
      type: 'herb',
      price: 0.1,
      quantity: 0
    },
    {
      name: 'lemon',
      type: 'fruit',
      price: 0.1,
      quantity: 0
    },
    {
      name: 'tomato',
      type: 'fruit',
      price: 0.1,
      quantity: 0
    },
    {
      name: 'coca cola',
      type: 'soft-drink',
      price: 0.2,
      quantity: 0
    },
    {
      name: 'ginger beer',
      type: 'soft-drink',
      price: 0.4,
      quantity: 0
    },
    {
      name: 'rum',
      type: 'liquor',
      price: 1.5,
      quantity: 0
    },
    {
      name: 'vodka',
      type: 'liquor',
      price: 2.5,
      quantity: 0
    },
    {
      name: 'peach schnapps',
      type: 'liquor',
      price: 1.0,
      quantity: 0
    },
    {
      name: 'triple sec',
      type: 'liquor',
      price: 2.5,
      quantity: 0
    },
    {
      name: 'whiskey',
      type: 'liquor',
      price: 3.0,
      quantity: 0
    },
    {
      name: 'tequila',
      type: 'liquor',
      price: 1.5,
      quantity: 0
    },
    {
      name: 'grenadine',
      type: 'liquor',
      price: 1.5,
      quantity: 0
    },
    {
      name: 'orange liqueur',
      type: 'liquor',
      price: 2.0,
      quantity: 0
    },
    {
      name: 'coffee liqueur',
      type: 'liquor',
      price: 1.5,
      quantity: 0
    },
    {
      name: 'gin',
      type: 'liquor',
      price: 1.5,
      quantity: 0
    },
    {
      name: 'prosecco',
      type: 'wine',
      price: 1.5,
      quantity: 0
    },
    {
      name: 'peach purée',
      type: 'soft-drink',
      price: 0.5,
      quantity: 0
    },
    {
      name: 'cachaça',
      type: 'liquor',
      price: 2.0,
      quantity: 0
    },
    {
      name: 'soda water',
      type: 'soft-drink',
      price: 0.3,
      quantity: 0
    },
    {
      name: 'champagne',
      type: 'wine',
      price: 2.0,
      quantity: 0
    },
    {
      name: 'white wine',
      type: 'wine',
      price: 1.0,
      quantity: 0
    },
    {
      name: 'crème de cassis',
      type: 'liquor',
      price: 2.0,
      quantity: 0
    }
  ],
  cocktails: [
    {
      name: 'Kir',
      ingredients: [
        {name: 'crème de cassis', quantity: 1},
        {name: 'white wine', quantity: 9}
      ],
      type: 'cocktail'
    },
    {
      name: 'French 75',
      ingredients: [
        {name: 'gin', quantity: 3},
        {name: 'syrup', quantity: 2},
        {name: 'lemon', quantity: 1.5},
        {name: 'champagne', quantity: 6}
      ],
      type: 'cocktail'
    },
    {
      name: 'Caipirinha',
      //ingredients: ['lime', 'cachaça'],
       ingredients: [
        {name: 'lime', quantity: 0.5}, 
        {name: 'cachaça', quantity: 5}
      ],
      type: 'cocktail'
    },
    {
      name: 'Bellini',
      //ingredients: ['peach purée', 'prosecco'],
      ingredients: [
        {name: 'peach purée', quantity: 5}, 
        {name: 'prosecco', quantity: 10}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Long Island Iced Tea',
      //ingredients: ['tequila', 'vodka', 'rum', 'triple sec', 'gin', 'lemon', 'syrup', 'coca cola'],
       ingredients: [
        {name: 'tequila', quantity: '1.5'}, 
        {name: 'vodka', quantity: '1.5'}, 
        {name: 'rum', quantity: '1.5'}, 
        {name: 'triple sec', quantity: '1.5'}, 
        {name: 'gin', quantity: '1.5'}, 
        {name: 'lemon', quantity: '2.5'}, 
        {name: 'syrup', quantity: '3'},
        {name: 'coca cola', quantity: '1'} 
      ], 
      type: 'cocktail'
    },
    {
      name: 'Mojito',
      //ingredients: ['rum', 'lime', 'mint', 'soda water'],
       ingredients: [
        {name: 'rum', quantity: 4}, 
        {name: 'lime', quantity: 3}, 
        {name: 'mint', quantity: 6}, 
        {name: 'soda water', quantity: 10}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Pina Colada',
      //ingredients: ['pineapple', 'rum', 'coconut'],
      
      ingredients: [
        {name: 'pineapple', quantity: 9},
        {name: 'rum', quantity: 3},
        {name: 'coconut', quantity: 3}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Sex on the Beach',
      //ingredients: ['vodka', 'peach schnapps', 'orange', 'cranberry'],
      ingredients: [
        {name: 'vodka', quantity: 4},
        {name: 'peach schnapps', quantity: 2},
        {name: 'orange', quantity: 4},
        {name: 'cranberry', quantity: 4}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Cuba Libre',
      //ingredients: ['rum', 'lime', 'coca cola'],
       ingredients: [
        {name: 'rum', quantity: 5},
        {name: 'lime', quantity: 1},
        {name: 'coca cola', quantity: 12}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Cosmopolitan',
      //ingredients: ['lime', 'triple sec', 'cranberry', 'vodka'],
       ingredients: [
        {name: 'lime', quantity: 1.5},
        {name: 'triple sec', quantity: 1.5},
        {name: 'cranberry', quantity: 3},
        {name: 'vodka', quantity: 4}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Tequila Sunrise',
      //ingredients: ['grenadine', 'tequila', 'orange'],
      ingredients: [
        {name: 'grenadine', quantity: 1.5},
        {name: 'tequila', quantity: 4.5},
        {name: 'orange', quantity: 9}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Margarita',
      //ingredients: ['tequila', 'triple sec', 'lime'],
      ingredients: [
        {name: 'tequila', quantity: 3.5},
        {name: 'triple sec', quantity: 2},
        {name: 'lime', quantity: 1.5}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Black Russian',
      //ingredients: ['vodka', 'coffee liqueur'],
      ingredients: [
        {name: 'vodka', quantity: 5},
        {name: 'coffee liqueur', quantity: 2}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Bloody Mary',
      //ingredients: ['vodka', 'tomato', 'lemon'],
      ingredients: [
        {name: 'vodka', quantity: 4.5},
        {name: 'tomato', quantity: 9},
        {name: 'lemon', quantity: 1.5}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Mint julep',
      //ingredients: ['mint', 'whiskey'],
      ingredients: [
        {name: 'mint', quantity: 4},
        {name: 'whiskey', quantity: 6}
      ], 
      type: 'cocktail'
    },
    {
      name: 'Moscow Mule',
      //ingredients: ['vodka', 'ginger beer', 'lime'],
      ingredients: [
        {name: 'vodka', quantity: 4.5},
        {name: 'ginger beer', quantity: 12},
        {name: 'lime', quantity: 0.5}
      ], 
      type: 'cocktail'
    }
]}