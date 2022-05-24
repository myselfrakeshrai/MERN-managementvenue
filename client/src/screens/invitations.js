import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import InvitationSection from "./../components/homeComponents/InvitationSection";

const invitations = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
    <Header/>
    <InvitationSection keyword={keyword} pagenumber={pagenumber} />
    <Footer/>
    </div>
  )
}

export default invitations