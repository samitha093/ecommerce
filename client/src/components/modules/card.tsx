import React from 'react';

interface ProductCardProps {
  product: Product;
  productSelect: (id: number,isSelected:boolean) => void; 
}

interface Image {
  id: number;
  imageName: string;
  contentType: string;
  imageData: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  price: number;
  stockQTY: number;
  soldQTY: number;
  imageListId: Image[];
  isSelected: boolean;
}

const Card: React.FC<ProductCardProps> = ({ product ,productSelect}) => {

  return (
    <div className="w-100px h-full flex justify-center items-center "
    
       
    style={{
     marginBottom: '20px',

    }}>
      <div
      
      style={{
        //color code add for background color
        backgroundColor: 'lightgrey',
        padding: '10px',   
        height: '340px', 
        width: '250px',
        borderRadius: '15px', 
      }}
      
      className="max-w-sm rounded overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl">
        <div className="flex justify-center">
          <img
            className="w-full"
            src={product.imageListId[0].imageData}
            alt="Sunset in the mountains"
            style={{ maxWidth: '40%', maxHeight: '50%', objectFit: 'contain' }}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center">{product.name}</div>
          <p className="text-gray-700 text-base text-center">{product.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2 text-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Price: Rs.{product.price.toFixed(2)}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Stock: {product.stockQTY} Units
        </span>
      </div>
        <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => productSelect(product.id,product.isSelected)}
                style={{
                  backgroundColor: product.isSelected ? 'red' : 'blue',
                  color: 'white',
                  borderRadius: '5px', 
                  margin: '0 auto 5px', 
                  padding: '5px 10px', 
                }}
              >
                {product.isSelected ? 'Remove' : 'Add to Cart'}
              </button>
            </div>

      </div>
    </div>
  );
};

export default Card;
