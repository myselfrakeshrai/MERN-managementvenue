import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainInvitations from "../components/invitations/MainInvitations";

const InvitationScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainInvitations />
      </main>
    </>
  );
};

export default InvitationScreen;
