import React, { useEffect } from "react";
// Imported Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Imported Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../slices/ProductSlice";

function Slider() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  // This will get the first 8 products
  const productsToShow = products.slice(0, 8);

  // Fetching products on render
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <>
      <div className="container my-5 pt-1">
        <h2 className="slider-head border-bottom pb-2 px-3 text-secondary">
          <i className="fa-solid fa-book me-3"></i>Our Bookshelf
        </h2>
      </div>
      <div className="mx-4">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          effect={"slide"}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // For mobiles
            370: {
              slidesPerView: 1,
              spaceBetween: 10,
            },

            // For tablets
            750: {
              slidesPerView: 2,
              spaceBetween: 35,
            },

            // For laptops
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
        >
          {productsToShow.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="card px-3 border-0 text-center mx-4 px-2">
                <div>
                  <img
                    src={product.image}
                    className="card-img-top mx-auto rounded-4"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-secondary">
                      {product.title}
                    </h5>
                    <p className="card-text fs-5">₹{product.price}</p>
                    {/* Redirecting to products details page */}
                    <Link
                      to={`/productDetails/${product._id}`}
                      className="btn btn-secondary"
                    >
                      <i className="fa-solid fa-bookmark me-2"></i>
                      More...
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Slider;
