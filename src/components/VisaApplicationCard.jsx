const VisaApplicationCard = ({ visa }) => {
  console.log("🚀 ~ VisaApplicationCard ~ visa:", visa);
  return (
    <div className="border shadow rounded-lg p-5">
      <img
        src={visa.visaInfo?.country_name}
        alt={visa.visaInfo?.country_name}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <h5>Country: {visa.visaInfo?.country_name}</h5>
      <h5>Visa Type: {visa.visaInfo?.visa_type}</h5>
      <h5>Processing Time: {visa.visaInfo?.processing_time}</h5>
      <h5>Fee: {visa.fee}</h5>
      <h5>Application Method: {visa.visaInfo?.application_method}</h5>
      <h5>
        Applicant's name: {visa.first_name} {visa.last_name}
      </h5>
      <h5>Applicant’s email: {visa.email}</h5>
      <h5>Applied Date: {visa.applied_date}</h5>
    </div>
  );
};

export default VisaApplicationCard;
