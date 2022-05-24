import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddInvitationMain from "../components/invitations/AddInvitationMain";

const AddInvitation = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddInvitationMain />
      </main>
    </>
  );
};

export default AddInvitation;
