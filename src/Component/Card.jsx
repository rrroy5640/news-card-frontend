import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import axios from "axios";

export const Card = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://news-card-backend-17b7bc6b4da7.herokuapp.com/api/sports"
        );
        setNewsData(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(newsData);
  }, [newsData]);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    swipeToSlide: true,
    adaptiveHeight: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
        },
      },
    ],
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  return (
    <Slider
      {...settings}
      className=" flex flex-col justify-center w-full md:w-96 h-screen md:h-96"
    >
      {newsData.map((news, index) => {
        return (
          <div
            key={index}
            className=" rounded-lg bg-red-200 w-full md:w-96"
          >
            <div className=" w-full md:w-96 h-screen md:h-96 flex items-center text-center p-10 ">
              <p className=" text-white text-2xl">{news.title}</p>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};
