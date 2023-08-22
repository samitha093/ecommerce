import React from 'react';

interface ImageTableProps {
  images: Image[];
  loadDataForUpdate: (image: Image) => void;
  removeProductImageById: (id: number) => void; // Correct type for the prop

}

interface Image {
  id: number;
  imageName: string;
  contentType: string;
  imageData: string;
}

const ImageTable: React.FC<ImageTableProps> = ({ images ,loadDataForUpdate ,removeProductImageById}) => {
  return (
    <div className="relative overflow-x-auto">
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: '#001C30' }}>Store</h4>
      </div>
      <table className="w-full text-sm text-left text-black-900 dark:text-gray-900">
        <thead className="text-xs text-gray-100 uppercase bg-gray-100 dark:bg-gray-200 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image name
            </th>
            <th scope="col" className="px-6 py-3">
              Item
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.id} className="bg-white border-b dark:bg-gray-0 dark:border-gray-0">
              <td className="px-6 py-4">
                {image.imageName}
              </td>
              <td className="px-6 py-4">
                <img src={image.imageData} alt={image.imageName} className="w-100 h-10" />
              </td>
              <td className="px-6 py-4">
                <button 
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
                onClick={() => loadDataForUpdate(image)}>
                  Edit
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg"
              onClick={() => removeProductImageById(image.id)}

                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImageTable;
