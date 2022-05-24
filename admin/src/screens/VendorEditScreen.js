import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditVendorMain from "../components/vendors/EditvendorMain";

const VendorEditScreen = ({ match }) => {
  const vendorId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditVendorMain vendorId={vendorId} />
      </main>
    </>
  );
};
export default VendorEditScreen;
