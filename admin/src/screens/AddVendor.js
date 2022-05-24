import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddVendorMain from "../components/vendors/AddVendorMain";

const AddVendor = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddVendorMain />
      </main>
    </>
  );
};

export default AddVendor;
