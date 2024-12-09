import { useEffect, useState } from "react";
import VisaCard from "./VisaCard";

const LatestVisas = () => {
  const [visas, setVisas] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/visas/")
      .then(response => response.json())
      .then(data => setVisas(data));
  }, []);

  return (
    <section className="py-[50px]">
      <div className="container">
        <h2 className="text-center font-bold text-4xl mb-5">Latest visas</h2>
      </div>
      <div className="container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {visas?.map(visa => (
          <VisaCard key={visa._id} visa={visa} />
        ))}
      </div>
    </section>
  );
};

export default LatestVisas;
