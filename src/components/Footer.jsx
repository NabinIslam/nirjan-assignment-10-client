import { FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-[50px] border mt-auto">
      <div className="container flex flex-col items-center justify-center gap-3">
        <h2 className="text-center text-4xl font-bold">VisaMaster</h2>
        <h6 className="flex items-center justify-center gap-1">
          <FaEnvelope />
          info@visamaster.com
        </h6>
        <h6 className="flex items-center justify-center gap-1">
          <FaPhone /> +8801234568901
        </h6>
        <p className="text-center text-sm">
          &copy; 2024 VisaMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
