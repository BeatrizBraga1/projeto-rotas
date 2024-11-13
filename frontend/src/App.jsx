import React, { useState } from 'react';
import FormMap from "./components/FormMap";
import Map from "./components/Map";
import axios from 'axios';
import Table from "./components/Table";

function App() {

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    rua: '',
    cidade: '',
    pais: '',
    peso: '',
    lat: '',
    lng: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/entregas', formData);
      alert(response.data.message);
      setFormData({
        nome: '',
        rua: '',
        cidade: '',
        pais: '',
        place_id: '',
        peso: '',
        lat: '',
        lng: ''
      });
      window.location.reload();
    } catch (error) {
      console.error('Erro ao cadastrar entrega:', error);
      alert('Erro ao cadastrar entrega.');
    }
  };

  const handleDeleteAll = async () => {
    try {
      const confirmed = window.confirm('Tem certeza que deseja deletar todas as entregas?');
      if (confirmed) {
        await axios.delete('http://localhost:5001/api/entregas');
        alert('Todas as entregas foram deletadas com sucesso!');
      }
      window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar entregas:', error);
      alert('Erro ao tentar deletar todas as entregas.');
    }
  };

  const handleLocationSelect = (locationData) => {
    console.log("Dados de localização recebidos:", locationData);
  

    setFormData((prevData) => ({
      ...prevData,
      place_id: locationData.place_id,
      lat: locationData.lat,
      lng: locationData.lng,
      rua: locationData.rua,
      cidade: locationData.cidade,
      pais: locationData.pais,
    }));
  };

  return (
    <div className="flex flex-row">
      <div className="w-[30%] border-r border-gray-300 p-[30px]">
      <div>
        <form onSubmit={handleSubmit} className="w-full p-[20px] border bg-form">
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome Cliente"
            className="w-full border border-gray-300 rounded p-2 pr-10 flex-1"
            required
          />

          <input
            type="hidden"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            placeholder="Endereço Cliente"
            className="w-full border border-gray-300 rounded p-2 pr-10 flex-1"
          />

          <input
            type="hidden"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            placeholder="Cidade Cliente"
            className="w-full border border-gray-300 rounded p-2 pr-10 flex-1"
          />

          <input
            type="hidden"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            placeholder="País Cliente"
            className="w-full border border-gray-300 rounded p-2 pr-10 flex-1"
          />

            <input
            type="hidden"
            name="place_id"
            value={formData.place_id}
            onChange={handleChange}
            placeholder="Código da localização"
            className="w-full border border-gray-300 rounded p-2 pr-10 flex-1"
          />
          
          <input
            type="text"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            placeholder="Peso da Entrega"
            className="w-full border border-gray-300 rounded p-2 pr-10 flex-1"
            required
          />

          <FormMap onLocationSelect={handleLocationSelect} onLocationSelectMap={setSelectedLocation}/>

          <div className="flex flex-row py-[40px]">
            <input
              type="text"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              placeholder="Latitude"
              className="w-full border border-gray-300 rounded p-2 pr-10 flex-1 mr-[5px]"
              disabled
            />

            <input
              type="text"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              placeholder="Longitude"
              className="w-full border border-gray-300 rounded p-2 pr-10 flex-1 ml-[5px]"
              disabled
            />
          </div>

          <button type="submit" className="bg-success-check px-[20px] py-[10px] text-white w-full">
            CADASTRAR CLIENTE
          </button>
        </form>
        <div className="w-full p-[20px] border bg-form mt-[20px]">
          <button onClick={handleDeleteAll} className="bg-danger px-[20px] py-[10px] text-white w-full">
            DELETAR TODAS AS ENTREGAS
          </button>
        </div>
      </div>
      </div>
      <div className="w-[70%] p-[30px]">
        <Map selectedLocation={selectedLocation}/>
        <div className="pt-[30px]">
          <Table />
        </div>
      </div>
      
    </div>
  );
}

export default App;
