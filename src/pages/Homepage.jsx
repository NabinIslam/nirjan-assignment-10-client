import { DarkThemeToggle, Flowbite } from "flowbite-react";
import LatestVisas from "../components/LatestVisas";
import ThemeToggle from "../components/ThemeToggle";

const Homepage = () => {
  return (
    <Flowbite>
      <main>
        <ThemeToggle />
        <LatestVisas />
      </main>
      <DarkThemeToggle />
    </Flowbite>
  );
};

export default Homepage;
