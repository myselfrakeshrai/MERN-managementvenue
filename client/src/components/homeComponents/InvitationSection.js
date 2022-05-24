import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listInvitation } from "../../Redux/Actions/InvitationActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const InvitationSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const invitationList = useSelector((state) => state.invitationList);
  const { loading, error, invitations, page, pages } = invitationList;

  useEffect(() => {
    dispatch(listInvitation(keyword, pagenumber));
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
                    {invitations.map((invitation) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={invitation._id}
                      >
                        <div className="border-invitation">
                          <Link to={`/invitations/${invitation._id}`}>
                            <div className="shopBack">
                              <img src={invitation.image} alt={invitation.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/invitations/${invitation._id}`}>
                                {invitation.name}
                              </Link>
                            </p>
                            <Rating
                              value={invitation.rating}
                              text={`${invitation.numReviews} reviews`}
                            />
                            <div class="row align-items-start">
                            <div class="col">
                            <h3>NRs. {invitation.price}</h3>
                            </div>
                            <div className="col">
                            <h3>Invitation</h3>
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

export default InvitationSection;
