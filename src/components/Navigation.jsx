import React from "react";

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import Banner from './Banner';
import TermSelector from "./TermSelector";
import ScheduleModal from "./ScheduleModal";
import { signInWithGoogle, signOut, useAuthState } from '../utils/firebase';
import { useProfile } from '../utils/profile';

const Navigation = ({ title }) => {
    const [user] = useAuthState();
    const [profile, profileLoading, profileError] = useProfile();

    const login = () => {
        signInWithGoogle();
    }

    return (
        <Navbar>
            <NavbarBrand>
                <Banner title={title.length > 0 ? title : "Schedule Builder"} />
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <TermSelector />
                <ScheduleModal />
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {user ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name={user.displayName}
                                size="sm"
                                src={user.photoURL}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                {profile?.isAdmin && (
                                    <p className="font-semibold text-red-500">Welcome back, Admin</p>
                                )}
                                <p className="font-semibold">{user.displayName}</p>
                                <p className="text-default-500">{user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={signOut}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <NavbarItem>
                        <Button color="primary" variant="solid" onClick={login}>
                            Sign In
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar>
    );
}

export default Navigation;
