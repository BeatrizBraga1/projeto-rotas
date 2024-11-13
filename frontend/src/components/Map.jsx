import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '400px' };
const defaultCenter = { lat: -22.9012249, lng: -43.1791747 };

const Map = ({ selectedLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCd1SaDDXQRYj9ZEzwwf_QLMbdP_63MtZM',
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/entregas');
        setMarkers(response.data);
      } catch (error) {
        console.error('Erro ao carregar marcações:', error);
      }
    };
    fetchMarkers();
  }, []);

  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      console.log("Centralizando o mapa em:", selectedLocation);
      mapRef.current.panTo(selectedLocation);
      mapRef.current.setZoom(15);
    }
  }, [selectedLocation]);

  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={10}
      onLoad={(map) => (mapRef.current = map)}
    >

      {markers.map((marker) => (
        <Marker
          key={marker.place_id}
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
        />
      ))}

      {selectedLocation && <Marker position={selectedLocation} />}
    </GoogleMap>
  );
};

export default Map;
