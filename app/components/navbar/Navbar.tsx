'use client';

import Container from "../shared/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  //from the user model. got from db.user.push DO THIS FIRST
  // currentUser?: User | null
  currentUser?: SafeUser | null
}


const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  //console.log(currentUser);
  
  return (
    // fixed position, 100 percent width
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser}/>
                </div>
            </Container>
        </div>
    </div>
  )
}
export default Navbar;