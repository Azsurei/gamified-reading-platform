"use client";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarItem = ({ label, Icon, href }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link href={href} className="w-full">
      <Button
        variant={active ? "ghost" : "light"}
        className="justify-start h-[52px] w-full font-semibold text-lg"
        color={active ? "primary" : "secondary"}
      >
        <Icon stroke={active ? "#1FDB70" : "#333"} className="mr-5" />
        {label}
      </Button>
    </Link>
  );
};

export default SidebarItem;
