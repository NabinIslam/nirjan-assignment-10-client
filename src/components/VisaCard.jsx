import { Button } from "flowbite-react";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const VisaCard = ({ visa }) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";
  const isAllVisasPage = pathname === "/all-visas";

  const {
    _id,
    country_image,
    country_name,
    visa_type,
    proccessing_time,
    required_documents,
    description,
    age_restriction,
    fee,
    validity,
    application_method,
  } = visa;

  const handleDeleteVisa = () => {
    fetch(`http://localhost:5000/visas/id/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success("Visa deleted successfully");
        }
      })
      .catch(err => {
        toast.error("Could not delete the visa");
      });
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-4">
      <img
        src={country_image}
        alt={country_name}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-bold">{country_name}</h3>
        <p className="text-sm text-gray-600">Visa Type: {visa_type}</p>
        <p className="text-sm text-gray-600">
          Processing Time: {proccessing_time}
        </p>
        <p className="text-sm text-gray-600">Fee: {fee}</p>
        <p className="text-sm text-gray-600">Validity: {validity}</p>
        <p className="text-sm text-gray-600">
          Application Method: {application_method}
        </p>
      </div>
      <Link to={`/visa/${_id}`}>
        <Button className="mt-4 w-full">See Details</Button>
      </Link>
      {user && !isHomePage && !isAllVisasPage && (
        <>
          <Button className="mt-4 w-full" onClick={() => {}} color="warning">
            Update
          </Button>

          <Button
            className="mt-4 w-full"
            onClick={handleDeleteVisa}
            color="failure"
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default VisaCard;
