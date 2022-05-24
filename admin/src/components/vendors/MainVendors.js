import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Vendor from "./Vendor";
import { useDispatch, useSelector } from "react-redux";
import { listVendors } from "../../Redux/Actions/VendorActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainVendors = () => {
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state.vendorList);
  const { loading, error, vendors } = vendorList;

  const vendorDelete = useSelector((state) => state.vendorDelete);
  const { error: errorDelete, success: successDelete } = vendorDelete;

  useEffect(() => {
    dispatch(listVendors());
  }, [dispatch, successDelete]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Vendor</h2>
        <div>
          <Link to="/addvendor" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Venue</option>
                <option>venue</option>
                <option>Venue</option>
                <option>Venue</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Vendors */}
              {vendors.map((vendor) => (
                <Vendor vendor={vendor} key={vendor._id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainVendors;
