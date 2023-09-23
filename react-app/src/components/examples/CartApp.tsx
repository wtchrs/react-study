import './App.css';
import {MouseEvent, useRef, useState} from 'react';
import NavBar from '../../components/NavBar.tsx';
import Cart from '../../components/Cart.tsx';

function App() {
  const [cartItems, setCartItems] = useState(['Product1', 'Product2']);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) {
      const textContent = nameRef.current.value;
      if (textContent) {
        setCartItems([...cartItems, textContent]);
      }
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="itemName">Name</label>
        <input ref={nameRef} type="text" id="itemName" name="itemName"/>
        <input type="submit" onClick={handleClick}/>
      </form>
      <NavBar cartItemsCount={cartItems.length}/>
      <Cart cartItems={cartItems} onClear={() => setCartItems([])}/>
    </div>
  );
}

export default App;
