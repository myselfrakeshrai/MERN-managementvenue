import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listVendor } from "../../Redux/Actions/VendorActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const VendorSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state.vendorList);
  const { loading, error, vendors, page, pages } = vendorList;

  useEffect(() => {
    dispatch(listVendor(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {vendors.map((vendor) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={vendor._id}
                      >
                        <div className="border-vendor">
                          <Link to={`/vendors/${vendor._id}`}>
                            <div className="shopBack">
                              <img src={vendor.image} alt={vendor.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/vendors/${vendor._id}`}>
                                {vendor.name}
                              </Link>
                            </p>
                            <Rating
                              value={vendor.rating}
                              text={`${vendor.numReviews} reviews`}
                            />
                            <div className="row align-items-start">
                            <div className="col">
                            <h3>NRs. {vendor.price}</h3>
                            </div>
                            <div className="col">
                            <h3>Vendor</h3>
                            </div>
                          </div>       
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorSection;
