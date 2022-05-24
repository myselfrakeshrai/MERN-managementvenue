import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SearchSections = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-12 col-12 m-5 mx-auto align-items-center">
              <h1>Events are going on and search for events.</h1>
              <p>The events are held on the venue and you are invited on the events just book the events.</p>
              <br/>
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button ">
                    search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSections;

