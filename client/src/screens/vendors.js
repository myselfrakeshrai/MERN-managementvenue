import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import VendorSection from "../components/homeComponents/VendorSection";

const vendors = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <>
    <Header/>
     <div className='container'> <h2> Wedding Vendors </h2>
     </div>
    <VendorSection keyword={keyword} pagenumber={pagenumber} />
    <Footer/>
    </>
  )
}

export default vendors