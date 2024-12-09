import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import VisaCard from "../components/VisaCard";

const MyVisaApplications = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/visa-applications/${user?.email}`)
      .then(response => response.json())
      .then(data => setApplications(data))
      .catch(err => toast.error(`Couldn't load the visas`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="py-[100px]">
      <div className="container">
        <h2 className="text-center font-bold text-4xl mb-5">
          My Visa Applications
        </h2>


          <div>
       
          </div>


        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {applications?.map(visa => (
            <VisaCard key={visa._id} visa={visa} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyVisaApplications;
