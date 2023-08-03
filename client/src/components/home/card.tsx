import React from 'react';

function Card() {
  return (
    <div className="w-100px h-full flex justify-center items-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl">
        <div className="flex justify-center">
          <img
            className="w-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoZRL7rVnwQVPuqb1jzS89rFVvbJ90KNEbWmqPYHCJYuv4bZrNGpmTXCdrd_g4xHfIhs0&usqp=CAU"
            alt="Sunset in the mountains"
            style={{ maxWidth: '40%', maxHeight: '50%', objectFit: 'contain' }}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Nutella</div>
          <p className="text-gray-700 text-base">
          Nutella is a creamy and sweet dessert spread made from hazelnuts and cocoa.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
