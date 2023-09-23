interface Props {
  cartItems: string[];
  onClear: () => void;
}

const Cart = ({cartItems, onClear}: Props) => {
  return (
    <>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => <li key={item}>{item}</li>)}
      </ul>
      <button onClick={onClear}>Clear</button>
    </>
  );
};

export default Cart;