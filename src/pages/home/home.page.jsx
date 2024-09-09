import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox"
import Navigation from "../../components/shared/Navigation";
import Hero from "./components/Hero";
import JobSection from "./components/JobSection";

function HomePage() {
  return (
    <main className="container px=4">
      <div>
        <Hero/>
      </div>
      <div>
        <JobSection/>
      </div>
    </main>
  );
}

export default HomePage;
