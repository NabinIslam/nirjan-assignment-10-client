import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import GoogleButton from "react-google-button";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const Register = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(() => {
        updateUser(data.name, data.photo)
          .then(() => {})
          .catch(err => toast.error("Could not update user"));
        navigate(from, { replace: true });
        toast.success("Registration successful");
      })
      .catch(err => toast.error("Could not register!"));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate(from, { replace: true });
        toast.success("Registration successful");
      })
      .catch(err => toast.error("Could not register!"));
  };

  return (
    <main className="pt-40">
      <Helmet>
        <title>Lingo Bingo | Register</title>
      </Helmet>
      <div className="container">
        <form
          className="flex max-w-md flex-col gap-4 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              {...register("name")}
              type="text"
              placeholder="Full name"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="photo" value="Your photo" />
            </div>
            <TextInput
              {...register("photo")}
              type="text"
              placeholder="Photo URL"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput {...register("password")} type="password" required />
          </div>
          <Button type="submit">Register</Button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="font-medium hover:underline" to="/login">
              Login
            </Link>
          </p>
        </form>
        <div className="flex mt-5 items-center justify-center">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </main>
  );
};

export default Register;
