interface Order {
  value: string;
  display: string;
}

const orders: readonly Order[] = [
  {value: '', display: 'Relevant'},
  {value: 'name', display: 'Name'},
  {value: 'released', display: 'released'},
  {value: 'added', display: 'Added'},
  {value: 'created', display: 'Created'},
  {value: 'updated', display: 'Updated'},
  {value: 'rating', display: 'Rating'},
  {value: 'metacritic', display: 'Metacritic'},
] as const;

interface Props {
  selected?: string;
  handleSelect: (order: string) => void;
}

const OrderSelect = ({selected, handleSelect}: Props) => {
  return (
    <>
      <h2>Platforms</h2>
      <select onChange={(event) => handleSelect(event.target.value)}>
        {orders.map(order =>
          <option key={order.value} value={order.value}
                  selected={selected === order.value}>{order.display}</option>)}
      </select>
    </>
  );
};

export default OrderSelect;
