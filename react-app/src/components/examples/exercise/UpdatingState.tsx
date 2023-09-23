import {useState} from 'react';
import {produce} from 'immer';

function UpdatingState() {
  const [game, setGame] = useState({id: 1, player: {name: 'John'}});
  const handleGame = () => {
    setGame({...game, player: {...game.player, name: 'Bob'}});
  };

  const [pizza, setPizza] = useState({name: 'Spicy Pepperoni', toppings: ['Mushroom']});
  const handlePizza = () => {
    setPizza({...pizza, toppings: [...pizza.toppings, 'Cheese']});
  };

  const [cart, setCart] = useState({
    discount: .1,
    items: [
      {id: 1, title: 'Product 1', quantity: 1},
      {id: 2, title: 'Product 2', quantity: 1},
    ],
  });
  const makeClickHandler = (id: number) => {
    return () => {
      // setCart({
      //   ...cart,
      //   items: cart.items.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item),
      // });

      // with immer
      setCart(produce(draft => {
        const item = draft.items.find(item => item.id === id);
        if (item) item.quantity++;
      }))
    };
  };

  return (
    <>
      <div>
        <h2>Game</h2>
        <p key={game.id}>id: {game.id}, player name: {game.player.name}</p>
        <button onClick={handleGame}>Click</button>
      </div>

      <div>
        <h2>Pizza</h2>
        <p>name: {pizza.name}, toppings: {pizza.toppings.join(', ')}</p>
        <button onClick={handlePizza}>Click</button>
      </div>

      <div>
        <h2>Cart</h2>
        <p>discount: {cart.discount}</p>
        {cart.items.map(item => (
          <>
            <p key={item.id}>
              <span>title: {item.title}, quantity: {item.quantity} </span>
              <button onClick={makeClickHandler(item.id)}>Add quantity</button>
            </p>
          </>
        ))}
      </div>
    </>
  );
}

export default UpdatingState;
