import {
  Button,
  Checkbox,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const AddVisa = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    const visaData = { ...data, addedBy: user.email };

    fetch("http://localhost:5000/visas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visaData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.acknowledged) {
          reset();
          toast.success("Visa added successfully");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <main className="py-[100px]">
      <div className="container">
        <h2 className="text-center font-bold text-4xl mb-5">Add a Visa</h2>
        <form
          className="w-full lg:w-1/2 mx-auto space-y-5"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label>Country Image</Label>
            <TextInput
              {...register("country_image")}
              type="text"
              placeholder="Image URL"
              required
            />
          </div>

          <div>
            <Label>Country Name</Label>
            <TextInput
              {...register("country_name")}
              type="text"
              placeholder="Country Name"
              required
            />
          </div>

          <div>
            <Label>Visa Type</Label>
            <Select {...register("visa_type")} required>
              <option value="Work Visa">Work Visa</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Immigrant Visa">Immigrant Visa</option>
            </Select>
          </div>

          <div>
            <Label>Proccessing Time</Label>
            <TextInput
              {...register("proccessing_time")}
              type="text"
              placeholder="Proccessing Time"
              required
            />
          </div>

          <div>
            <Label htmlFor="Valid passport">Required Documents</Label>
            <div className="flex items-center gap-2">
              <Checkbox
                {...register("required_documents")}
                value="Valid passport"
                id="Valid passport"
              />
              <Label htmlFor="Valid passport">Valid passport</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                {...register("required_documents")}
                value="Visa application form"
                id="Visa application form"
              />
              <Label htmlFor="Visa application form">
                Visa application form
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                {...register("required_documents")}
                value="Recent passport-sized photograph"
                id="Recent passport-sized photograph"
              />
              <Label htmlFor="Recent passport-sized photograph">
                Recent passport-sized photograph
              </Label>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Description"
              rows={5}
              required
            />
          </div>

          <div>
            <Label>Age Restriction</Label>
            <TextInput
              {...register("age_restriction")}
              type="number"
              placeholder="Age Restriction"
              required
            />
          </div>
          <div>
            <Label>Fee</Label>
            <TextInput
              {...register("fee")}
              type="number"
              placeholder="Fee"
              required
            />
          </div>

          <div>
            <Label>Validity</Label>
            <TextInput
              {...register("validity")}
              type="number"
              placeholder="In month"
              required
            />
          </div>

          <div>
            <Label>Application Method</Label>
            <Select {...register("application_method")} required>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </Select>
          </div>

          <div>
            <Button type="submit">Add Visa</Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddVisa;
