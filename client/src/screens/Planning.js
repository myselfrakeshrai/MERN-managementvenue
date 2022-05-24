import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {Link} from "react-router-dom";

const Planning = () => {
    return (
        <div>
            <Header/>
            {/* <!-- Jumbotron --> */}
            <div className='container jumbotron-background'>
                <div className="p-4 shadow-4 rounded-3">
                    <h2>Wedding Planning Tools</h2>
                    <p>
                        Your Checklist, Budget, Website, Vendors and more! WeddingWire's free wedding planning tools
                        help you stay one step ahead.
                    </p>

                    <hr className="my-4"/>

                    <p>
                        Plan anywhere, anytime with our wedding planning tools Create your free WeddingWire account to
                        start planning.
                    </p>
                    <br/>
                    <Link to={`/register`}>
                        <button type="button" className="btn btn-primary">
                            Start Planning
                        </button>
                    </Link>
                </div>
            </div>

            {/* <!-- Jumbotron --> */}
          <div className='row'>
          <div className='container col-md-5 jumbotron-background '>
            <div className="p-4 shadow-4 rounded-3">
              <h2>Vendor Manager</h2>
              <hr className="my-4"/>
              <p>
                Quickly find, manage and message your favorite vendors

                Discover more
                Contact professionals
                Easily find and message vendors right from your WeddingWire account

                Don't rely on memory
                Add notes and details about each vendor for later reference

                Save your favorites
                Compare vendors with pricing and reviews to help you decide
              </p>
              <br/>
              <Link to={`/vendors`}>
                <button type="button" className="btn btn-primary">
                  Get your vendors
                </button>
              </Link>
            </div>
          </div>

          <div className='col-md-5 container jumbotron-background '>
            <div className="p-4 shadow-4 rounded-3">
              <h2>Checklist</h2>
              <hr className="my-4"/>
              <p>
                Get the ultimate Wedding Checklist to make sure everything gets done

                Discover more
                Personalize your tasks
                Add, edit or delete tasks anytime to easily customize your WeddingWire Checklist

                Track your progress
                Easily see what tasks you've crossed off and what's left to do for your wedding

                Sync with your Budget
                Your WeddingWire Budget integrates with your Checklist to ensure your never miss anything
              </p>

              <br/>
              <Link to={`/venue`}>
                <button type="button" className="btn btn-primary">
                  Go to check list
                </button>
              </Link>
            </div>
          </div>
          </div>
            <Footer/>
        </div>
    )
}

export default Planning