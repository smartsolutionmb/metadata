"use client";
import CurrentUserContext from "@/utils/context";
import React, { useState } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <CurrentUserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default Layout;
