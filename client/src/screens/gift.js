import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchSections from "../components/homeComponents/SearchSections"
import GiftSection from "./../components/homeComponents/GiftSection";

const gift = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
    <Header/>
    <SearchSections />
    <GiftSection keyword={keyword} pagenumber={pagenumber} />
    <Footer/>
    </div>
  )
}

export default gift