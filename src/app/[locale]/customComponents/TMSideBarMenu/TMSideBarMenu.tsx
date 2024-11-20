"use client";
import TMAvatar from "../TMAvatar";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { ImCalendar } from "react-icons/im";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import TMCalendar from "../TMCalendar";
import useSideBarMenu from "./useSideBarMenu";
import TMAvatarDialog from "../TMAvatarDialog";
import useOverview from "@/app/[locale]/[userId]/overview/useOverview";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Link, usePathname } from "../../../../i18n/routing";
import TMLanguageSelect from "../TMLanguageSelect";

const TMSideBarMenu = () => {
  const {showCalendarDialog, onCloseCalendar, showCalendar, menuItems, pathname, userData} = useSideBarMenu();
  const {handleUploadFile, handleFileChange, closeDialog, openDialog, showAvatarDialog} = useOverview();

  const pathName = usePathname();
  const isCalendar = pathName.endsWith('/tasks');
  return (
    <>
      <div className="flex flex-col gap-8 w-16 pt-10 bg-blue z-[60]">
        <TMAvatar 
          onClick={openDialog} 
          key={userData?.userImg} 
          logo={userData?.userImg} 
          style="cursor-pointer"
        />
        {showAvatarDialog && 
          <TMAvatarDialog
            key={userData?.userImg}
            userImage={userData?.userImg} 
            onChange={handleFileChange} 
            onUpload={handleUploadFile} 
            onClose={closeDialog} 
            showAvatarDialog={showAvatarDialog} 
          />
        }
        <div className="w-8 h-8"></div>
        {isCalendar && <ImCalendar
          onClick={showCalendarDialog}
          className="text-white w-8 h-8 mx-auto box md:hidden cursor-pointer"
        />}
        <Dialog open={showCalendar} onOpenChange={onCloseCalendar}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[425px] flex flex-col justify-between items-start text-center z-[60]">
            <DialogDescription>
              <div
                className="flex fixed shadow-xl bg-white rounded-lg left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <TMCalendar />
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative">
        <Sheet>
          <div className="absolute -left-12 top-28 z-[60]">
            <SheetTrigger>
              <BsReverseLayoutTextSidebarReverse className="text-white w-8 h-8 cursor-pointer" />
            </SheetTrigger>
          </div>
          <SheetContent
            side="left"
            className="w-[200px] sm:w-[200px] max-w-[200px] ml-16 pl-0 max-h-[100vh] pt-10"
          >
            <SheetHeader>
              <SheetTitle className="w-full py-2 px-4">
                <TMLanguageSelect className="max-w-36 bg-blue text-white" />
              </SheetTitle>
            </SheetHeader>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.path} className="relative">
                  <Link
                    href={item.path}
                    className={`flex items-center gap-1 py-2 px-4 rounded hover:bg-gray-50 ${
                      pathname.includes(item.path)
                        ? "text-blue font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {pathname.includes(item.path) ? item.icon : item.iconActive}
                    {item.name}
                  </Link>
                  {pathname.includes(item.path) && (
                    <span
                      className="
                        absolute 
                        left-0 
                        top-1/2 
                        transform -translate-y-1/2 h-0 w-0 
                        border-t-8 
                        border-b-8 
                        border-l-8 
                        border-transparent 
                        border-l-blue"
                    ></span>
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default TMSideBarMenu;