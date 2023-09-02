import React, { useState } from 'react';

interface DeliveryAddressProps {
     deliveryAddressReturn: (deliveryAddress: DeliveryAddressInterface) => void;

}
interface DeliveryAddressInterface{
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;

}
const DeliveryAddress: React.FC<DeliveryAddressProps> = ({deliveryAddressReturn}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const handleDeliveryStreetChange = (event: any) => {
        setStreet(event.target.value);
        };
    const handleDeliveryCityChange = (event: any) => {
        setCity(event.target.value);
        };
    const handleDeliveryStateChange = (event: any) => {
        setState(event.target.value);
        };
    const handleDeliveryPostalCodeChange = (event: any) => {
        setPostalCode(event.target.value);
        };
    const handleDeliveryCountryChange = (event: any) => {
        setCountry(event.target.value);
        };



  const togglePopup = () => {
    if(isOpen){
    const deliveryAddress: DeliveryAddressInterface = {
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
    };
    deliveryAddressReturn(deliveryAddress);
        }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={togglePopup}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Open Popup
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal bg-white p-8 rounded shadow-lg">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
            <p>Complete the your destination</p>
            </div>

            <div className="mt-1 ">
              <input
                placeholder="Street"
                type="text"
                value={street}
                onChange={handleDeliveryStreetChange}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
            
              />
            </div>
            <div className="mt-1 ">
              <input
                placeholder="City"
                type="text"
                value={city}
                onChange={handleDeliveryCityChange}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
               
              />
            </div>
            <div className="mt-1 ">
              <input
                placeholder="State"
                type="text"
                value={state}
                onChange={handleDeliveryStateChange}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
               
              />
            </div>
            <div className="mt-1 ">
              <input
                placeholder="PostalCode"
                type="text"
                value={postalCode}
                onChange={handleDeliveryPostalCodeChange}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              
              />
            </div>
            <div className="mt-1 ">
              <input
                placeholder="Country"
                type="text"
                value={country}
                onChange={handleDeliveryCountryChange}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
           
              />
            </div>

            <div className="flex justify-center">
            <button
                onClick={togglePopup}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Confirm Delivery
            </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryAddress;
