import React, { useState } from 'react';
import axios from 'axios';

function FormMap({ onLocationSelectMap, onLocationSelect }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 2) {
      const response = await axios.get(
        `http://localhost:5000/api/places/search?input=${e.target.value}`
      );
      setSuggestions(response.data);
    }
  };

  const handleSuggestionClick = async (placeId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/places/details?placeId=${placeId}`
    );
    
    const location = response.data.geometry.location;
    console.log("Localização selecionada:", location);
    onLocationSelectMap(location);

    const address = response.data.formatted_address;
    console.log("Endereço completo:", address);

    const addressParts = address.split(',');

    const addressComponents = response.data.address_components;
    let pais;
    
    addressComponents.forEach(component => {
      if (component.types.includes("country")) {
        pais = component.long_name; // País
      }
    });

    if (addressParts.length >= 3) {
      const rua = addressParts[0].trim();
      const cidade = addressParts[1].trim();

      onLocationSelect({
        place_id: placeId,
        lat: location.lat,
        lng: location.lng,
        rua,
        cidade,
        pais,
      });
    }

    setSuggestions([]);
    setInput(response.data.formatted_address);

  } catch (error) {
    console.error('Erro ao buscar detalhes do local:', error);
  }
};


  return (
    <div>
      <form>
        <input
          type="text"
          name="endereco"
          value={input}
          onChange={handleInputChange}
          placeholder="Endereço do Cliente"
          className="w-full border border-gray-300 rounded p-2 pr-10 flex-1"
          required
        />
      </form>
      <ul>
        {suggestions.map((suggestion) => (
          <li className="text-[12px] p-[5px] bg-border-line" key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion.place_id)}>
            {suggestion.description}
            <hr className="border border-gray-300"/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormMap;
