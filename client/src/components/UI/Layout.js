import React from "react";
import { Header } from "./Header";
import { useUser } from "../../service/authService";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  const user = useUser();
  return (
    <>
      <Header />
      <section className="container">{children}</section>
      <Footer />
    </>
  );
};
