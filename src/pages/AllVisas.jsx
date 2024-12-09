import { useEffect, useState } from "react";
import VisaCard from "../components/VisaCard";
import { Select } from "flowbite-react";

const AllVisas = () => {
  const [visas, setVisas] = useState(null);
  const [selectedVisaType, setSelectedVisaType] = useState("");

  useEffect(() => {
    const queryParam = selectedVisaType
      ? `?visa_type=${encodeURIComponent(selectedVisaType)}`
      : "";
    fetch(`http://localhost:5000/visas${queryParam}`)
      .then(response => response.json())
      .then(data => setVisas(data))
      .finally(() => setLoading(false));
  }, [selectedVisaType]); // Re-fetch whenever the selectedVisaType changes

  const handleFilterChange = event => {
    setSelectedVisaType(event.target.value);
  };

  return (
    <main className="py-[100px]">
      <div className="container">
        <h2 className="text-center font-bold text-4xl mb-5">All Visas</h2>

        <div className="container flex items-center justify-end">
          <Select value={selectedVisaType} onChange={handleFilterChange}>
            <option value="">All Visa Types</option>
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Immigrant Visa">Immigrant Visa</option>
            <option value="Student Visa">Student Visa</option>
          </Select>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {visas?.map(visa => (
            <VisaCard key={visa._id} visa={visa} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllVisas;
