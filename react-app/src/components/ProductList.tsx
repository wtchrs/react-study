import {useEffect, useState} from 'react';

const ProductList = ({category}: {category: string}) => {
  const [_product, setProduct] = useState<string[]>([]);

  useEffect(() => {
    console.log('Fetching products in category ' + category);
    setProduct(['Clothing', 'Household']);
  }, [category]);

  return (
    <>
      <div>ProductList</div>
    </>
  );
};

export default ProductList;
