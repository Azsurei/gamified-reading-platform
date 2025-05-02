"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";


export const MobileSideBar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        onPress={onOpen}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
        <DrawerContent >
          {(onClose) => (
            <>
              <DrawerBody className="p-0">
                <Sidebar />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
