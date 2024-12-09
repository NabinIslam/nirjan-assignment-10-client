import { Button, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import GoogleButton from "react-google-button";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = data => {
    signIn(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true });

        toast.success("Login successful");
      })
      .catch(err => toast.error("Could not login!"));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate(from, { replace: true });
        toast.success("Login successful");
      })
      .catch(err => toast.error("Could not login!"));
  };

  return (
    <main className="pt-40">
      <Helmet>
        <title>Lingo Bingo | Login</title>
      </Helmet>
      <form
        className="flex max-w-md flex-col gap-4 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput {...register("password")} type="password" required />
        </div>
        <Button type="submit">Login</Button>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link className="font-medium hover:underline" to="/register">
            Register
          </Link>
        </p>
      </form>

      <div className="flex mt-5 items-center justify-center">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </main>
  );
};

export default Login;
