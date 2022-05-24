import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditInvitationMain from "../components/invitations/EditinvitationMain";

const InvitationEditScreen = ({ match }) => {
  const invitationId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditInvitationMain invitationId={invitationId} />
      </main>
    </>
  );
};
export default InvitationEditScreen;
