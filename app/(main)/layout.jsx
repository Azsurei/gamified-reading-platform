import { MobileHeader } from "@/components/mobile-header.jsx";
import Sidebar from "@/components/sidebar.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full pt-6">
          {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
