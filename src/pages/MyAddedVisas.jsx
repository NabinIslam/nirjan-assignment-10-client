import { useContext, useEffect, useState } from "react";
import VisaCard from "../components/VisaCard";
import { AuthContext } from "../provider/AuthProvider";

const MyAddedVisas = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [visas, setVisas] = useState(null);

  useEffect(() => {
    fetch(`https://visa-master-server.vercel.app/visas/${user?.email}`)
      .then(response => response.json())
      .then(data => setVisas(data))
      .catch(err => toast.error(`Couldn't load the visas`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="py-[100px]">
      <div className="container">
        <h2 className="text-center font-bold text-4xl mb-5">My Added Visas</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {visas?.map(visa => (
            <VisaCard key={visa._id} visa={visa} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyAddedVisas;
