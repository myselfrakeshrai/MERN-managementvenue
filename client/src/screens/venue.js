import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchSections from "../components/homeComponents/SearchSections"
import ShopSection from "./../components/homeComponents/ShopSection";

const venue = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
    <Header/>
    <SearchSections />
    <ShopSection keyword={keyword} pagenumber={pagenumber} />
    <Footer/>
    </div>
  )
}

export default venue