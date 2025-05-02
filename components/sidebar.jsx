import { cn } from "@/lib/util.ts";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "@/components/sidebar-item.jsx";
import BookIcon from "@/public/BookIcon.jsx";

const Sidebar = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href={"/lecturas"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/logo.svg" alt="Mascot" height={40} width={40} />
          <h1 className="text-2xl text-verde tracking-wide font-extrabold">
            Lectio
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label={"Lecturas"} href={"/lecturas"} Icon={BookIcon}></SidebarItem>
        <SidebarItem label={"Clasificación"} href={"/clasificación"} Icon={BookIcon}></SidebarItem>
      </div>
    </div>
  );
};

export default Sidebar;
