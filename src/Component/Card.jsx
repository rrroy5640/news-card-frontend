import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import axios from "axios";

export const Card = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const topics = [
    "australia",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  useEffect(() => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://news-card-backend-17b7bc6b4da7.herokuapp.com/api/${randomTopic}`
        );
        const newsWithColor = response.data.articles.map((news) => ({
          ...news,
          color: randomColors[Math.floor(Math.random() * randomColors.length)],
        }));
        setNewsData(newsWithColor);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(newsData);
  }, [newsData]);

  const fetchMoreNews = async () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://news-card-backend-17b7bc6b4da7.herokuapp.com/api/${randomTopic}`
      );
      const moreNewsWithColor = response.data.articles.map((news) => ({
        ...news,
        color: randomColors[Math.floor(Math.random() * randomColors.length)],
      }));
      setNewsData((currentNewsData) => [
        ...currentNewsData,
        ...moreNewsWithColor
      ])
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      if (index === newsData.length - 3) {
        fetchMoreNews();
      }
      console.log(`Slider Changed to: ${index + 1}`);
    },
  };
  const randomColors = [
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-red-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-slate-300",
    "bg-blue-500",
  ];

  return (
    <Slider
      {...settings}
      className=" flex flex-col justify-center w-full md:w-96 h-screen sm:h-96"
    >
      {newsData.map((news, index) => {

        return (
          <div
            key={index}
            className={`rounded-lg ${news.color} w-full sm:w-96`}
          >
            <div className=" w-full sm:w-96 h-screen sm:h-96 flex flex-col justify-center space-y-2 items-center text-center p-10 bg- ">
              <p className=" text-white text-2xl">{news.title}</p>
              <p className=" text-white text-xl"> {news.description}</p>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};