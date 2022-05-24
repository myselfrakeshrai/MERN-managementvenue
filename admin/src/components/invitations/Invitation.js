import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteInvitation } from "../../Redux/Actions/InvitationActions";

const Invitation = (props) => {
  const { invitation } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteInvitation(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={invitation.image} alt="Invitation" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {invitation.name}
            </Link>
            <div className="price mb-2">${invitation.price}</div>
            <div className="row">
              <Link
                to={`/invitation/${invitation._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(invitation._id)}
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

export default Invitation;
