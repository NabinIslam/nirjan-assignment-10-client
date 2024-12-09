import { Button } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ApplyVisaModal from "../components/ApplyVisaModal";

const VisaDetails = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(`https://visa-master-server.vercel.app/visas/id/${id}`)
      .then(response => response.json())
      .then(data => setVisa(data));
  }, []);

  return (
    <main>
      <div className="container flex flex-col gap-5 items-center justify-center py-[100px]">
        <img className="h-[200px] w-[350px]" src={visa?.country_image} />
        <h1 className="text-4xl font-bold">{visa?.country_name}</h1>
        <h2>Visa Type: {visa?.visa_type}</h2>
        <h2>Processing Time: {visa?.proccessing_time}</h2>
        <h2>Required Documents: {visa?.required_documents}</h2>
        <h2>Description: {visa?.description}</h2>
        <h2>Age Restriction: {visa?.age_restriction}</h2>
        <h2>Fee: {visa?.fee}</h2>
        <h2>Validity: {visa?.validity} months</h2>
        <h2>Application Method: {visa?.application_method}</h2>
        <Button onClick={() => setOpenModal(true)}>Apply for the visa</Button>
      </div>

      <ApplyVisaModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        visa={visa}
      />
    </main>
  );
};

export default VisaDetails;
