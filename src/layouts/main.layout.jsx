import Navigation from "@/components/shared/Navigation";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <main className="container px-4">
          <Outlet />
        </main>
      );
}

export default MainLayout;
