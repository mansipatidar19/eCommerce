import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  // Getting the user from session storage
  const user = sessionStorage.getItem("user");

  return (
    <>
      {/* Main container for the footer */}
      <div className="custom-footer mt-5">
        <footer className="py-4">
          {/* Row for footer content */}
          <div className="row gx-0">
            <div className="col-12 col-sm-6 col-md-3 mb-3 text-center custom-row">
              <ul className="nav flex-column">
                {/* Links for Book's World section */}
                <li className="nav-item mb-1">
                  <Link
                    to="/"
                    className="nav-link p-0 text-body-secondary custom-footer-link"
                  >
                    WonderLand
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3 text-center custom-row">
              <ul className="nav flex-column">
                <li className="nav-item mb-1">
                  <Link
                    to="/allBooks"
                    className="nav-link p-0 text-body-secondary custom-footer-link"
                  >
                    Bookshelf
                  </Link>
                </li>
              </ul>
            </div>

            {/* Conditional rendering on baiss of user log-in */}
            {user && (
              <>
                {/* Column for Non-fiction Books */}
                <div className="col-12 col-sm-6 col-md-3 mb-3 text-center custom-row">
                  <ul className="nav flex-column">
                    <li className="nav-item mb-1">
                      <Link
                        to="/cart"
                        className="nav-link p-0 text-body-secondary custom-footer-link"
                      >
                        My Bookmarks
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Column for Novels */}
                <div className="col-12 col-sm-6 col-md-3 mb-3 text-center custom-row">
                  <ul className="nav flex-column">
                    <li className="nav-item mb-1">
                      <Link
                        to="/userProfile"
                        className="nav-link p-0 text-body-secondary custom-footer-link"
                      >
                        My Profile
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Row for social media icons */}
          <div className="d-flex flex-column flex-sm-row pt-4 border-top justify-content-center text-secondary mx-4">
            <p>© Mansi, Inc. all rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <Link to="/" className="link-body-emphasis">
                  <i className="fa-brands fa-x-twitter fa-lg text-secondary"></i>
                </Link>
              </li>
              <li className="ms-3">
                <Link to="/" className="link-body-emphasis">
                  <i className="fa-brands fa-instagram fa-lg text-secondary"></i>
                </Link>
              </li>
              <li className="ms-3">
                <Link to="/" className="link-body-emphasis">
                  <i className="fa-brands fa-amazon fa-lg text-secondary"></i>
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
