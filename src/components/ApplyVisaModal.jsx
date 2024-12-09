import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { AuthContext } from "../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import toast from "react-hot-toast";

const ApplyVisaModal = ({ openModal, setOpenModal, visa }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    const application = {
      ...data,
      visaInfo: visa,
    };

    fetch("https://visa-master-server.vercel.app/visa-applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    })
      .then(response => response.json())
      .then(data => {
        if (data.acknowledged) {
          reset();
          setOpenModal(false);
          toast.success("Application successful");
        }
      })
      .catch(err => toast.success("Something went wrong! Could not apply."));
  };

  const date = new Date();

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Apply for the visa</Modal.Header>
      <Modal.Body>
        <form
          className="w-full lg:w-1/2 mx-auto space-y-5"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label>Email</Label>
            <TextInput
              {...register("email")}
              type="email"
              placeholder="Email"
              defaultValue={user.email}
              required
            />
          </div>
          <div>
            <Label>First Name</Label>
            <TextInput
              {...register("first_name")}
              type="text"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <Label>Last Name</Label>
            <TextInput
              {...register("last_name")}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <Label>Applied Date</Label>
            <div>
              <input
                type="date"
                {...register("applied_date")}
                defaultValue={date}
                required
              />
            </div>
          </div>
          <div>
            <Label>Fee</Label>
            <TextInput
              {...register("fee")}
              type="text"
              placeholder="Fee"
              required
            />
          </div>
          <div>
            <Button type="submit">Apply</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyVisaModal;
