import { Outlet } from "react-router";

import MainHeader from "./MainHeader";

import React from 'react'

export default function Root() {
    return <>
        <MainHeader/>
        <main>
            <Outlet/>
        </main>
    </>
};
