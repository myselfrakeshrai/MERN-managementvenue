import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import VendorSection from "./../components/homeComponents/VendorSection";

const vendors = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
    <Header/>
    <VendorSection keyword={keyword} pagenumber={pagenumber} />
    <Footer/>
    </div>
  )
}

export default vendors