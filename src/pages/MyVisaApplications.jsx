import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Button, TextInput } from "flowbite-react";
import VisaApplicationCard from "../components/VisaApplicationCard";

const MyVisaApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch visa applications
  const fetchApplications = (query = "") => {
    const url = query
      ? `http://localhost:5000/visa-applications/${user?.email}?country_name=${query}`
      : `http://localhost:5000/visa-applications/${user?.email}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setApplications(data))
      .catch(err => toast.error("Couldn't load the visas"));
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const handleSearch = event => {
    event.preventDefault();
    fetchApplications(searchQuery.trim());
  };

  return (
    <main className="py-[100px]">
      <div className="container">
        <h2 className="text-center font-bold text-4xl mb-5">
          My Visa Applications
        </h2>

        <form
          className="flex items-center justify-center gap-5"
          onSubmit={handleSearch}
        >
          <TextInput
            className="w-[300px]"
            type="text"
            placeholder="Search your visa applications"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            required
          />
          <Button type="submit">Search</Button>
        </form>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 mt-10">
          {applications?.length > 0 ? (
            applications.map(visa => (
              <VisaApplicationCard key={visa?._id} visa={visa} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No visa applications found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyVisaApplications;
