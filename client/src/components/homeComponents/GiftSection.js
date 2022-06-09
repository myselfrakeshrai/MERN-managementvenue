import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listGift } from "../../Redux/Actions/GiftActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const giftList = useSelector((state) => state.giftList);
  const { loading, error, gifts, page, pages } = giftList;

  useEffect(() => {
    dispatch(listGift(keyword, pagenumber));
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
                    {gifts.map((gift) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={gift._id}
                      >
                        <div className="border-gift">
                          <Link to={`/gifts/${gift._id}`}>
                            <div className="shopBack">
                              <img src={gift.image} alt={gift.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/gifts/${gift._id}`}>
                                {gift.name}
                              </Link>
                            </p>
                            <Rating
                              value={gift.rating}
                              text={`${gift.numReviews} reviews`}
                            />
                            <div className="row align-items-start">
                            <div className="col">
                            <h3>NRs. {gift.price}</h3>
                            </div>
                            <div className="col">
                            <h3>Venue</h3>
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

export default ShopSection;
