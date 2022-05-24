import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainVendors from "../components/vendors/MainVendors";

const VendorScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainVendors />
      </main>
    </>
  );
};

export default VendorScreen;
