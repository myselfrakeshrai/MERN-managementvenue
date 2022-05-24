import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteVendor } from "../../Redux/Actions/VendorActions";

const Vendor = (props) => {
  const { vendor } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteVendor(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={vendor.image} alt="Vendor" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {vendor.name}
            </Link>
            <div className="price mb-2">${vendor.price}</div>
            <div className="row">
              <Link
                to={`/vendor/${vendor._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(vendor._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendor;
