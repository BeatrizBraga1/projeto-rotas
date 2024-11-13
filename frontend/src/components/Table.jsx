import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [entregas, setEntregas] = useState([]);
  const [totalPeso, setTotalPeso] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/entregas');
        setEntregas(response.data);

        const pesoTotal = response.data.reduce((acc, entrega) => acc + entrega.peso, 0);
        setTotalPeso(pesoTotal);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      }
    };

    fetchEntregas();
  }, []);

  const totalClientes = entregas.length;
  const ticketMedio = totalClientes ? (totalPeso / totalClientes).toFixed(2) : 0;
  const totalPages = Math.ceil(entregas.length / itemsPerPage);

  const currentItems = entregas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <div className="flex flex-row">
        <p className="pr-[10px]">Total de clientes: {totalClientes};</p>
        <p className="pr-[10px]">Peso total: {totalPeso.toFixed(2)} kg;</p>
        <p>Ticket Médio*: {ticketMedio}</p>
      </div>
      <div>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Rua</th>
              <th>Cidade</th>
              <th>País</th>
              <th>Peso</th>
              <th>Lat</th>
              <th>Lng</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entrega) => (
              <tr key={entrega.id}>
                <td>{entrega.nome}</td>
                <td>{entrega.rua}</td>
                <td>{entrega.cidade}</td>
                <td>{entrega.pais}</td>
                <td>{entrega.peso} kg</td>
                <td>{entrega.lat}</td>
                <td>{entrega.lng}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button className="text-blue-500 text-[12px] font-semibold" onClick={goToPreviousPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span className="text-[12px] font-semibold">Página {currentPage} de {totalPages}</span>
          <button className="text-blue-500 text-[12px] font-semibold" onClick={goToNextPage} disabled={currentPage === totalPages}>
            Próxima
          </button>
        </div>
      </div>
      <p className="pt-[30px] text-[12px]">*Peso total/Total de clientes</p>
    </div>
  );
};

export default Table;
