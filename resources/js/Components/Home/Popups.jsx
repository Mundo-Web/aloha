import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules"
import "swiper/css/autoplay"
import Tippy from "@tippyjs/react";

const Popups = ({ popups }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPopups, setCurrentPopups] = useState([]);

  useEffect(() => {
    // Ordenar los popups por tiempo y abrir el modal basado en el menor tiempo
    if (popups?.length > 0) {
      const sortedPopups = [...popups].sort((a, b) => a.seconds - b.seconds);
      setCurrentPopups(sortedPopups);

      // Abrir el modal después del tiempo establecido del popup con menor tiempo
      const timer = setTimeout(() => setIsOpen(true), sortedPopups[0].seconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [popups]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (currentPopups.length === 0) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 1000 },
        content: {
          padding: 0,
          border: "none",
          background: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          maxWidth: "600px",
          margin: "auto",
        },
      }}
      ariaHideApp={false}
    >
      {/* Swiper para mostrar los popups como slides */}
      <Swiper
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-max max-w-full h-max max-h-full"
      >
        {currentPopups.map((popup, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center h-max relative">
            <Tippy content="Cerrar popup">
            <button className="absolute top-4 right-4 mdi mdi-close text-2xl text-white z-10" onClick={() => setIsOpen(false)} style={{
              textShadow: '0 0 10px rgba(0,0,0,.5)'
            }}></button>
            </Tippy>
            <a
              className="block w-full h-full"
              href={popup.link}
              rel="noopener noreferrer"
            >
              <div
                className="relative flex justify-center items-center w-full h-full"
              >
                {/* Imagen */}
                <img
                  className="block rounded-2xl w-full max-w-[600px] h-auto"
                  src={`/api/ads/media/${popup.image}`}
                  alt={popup.name}
                />
                {/* Título y descripción centrados si existen */}
                {(popup.name || popup.description) && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#fff]"
                    style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)", }}>
                    {popup.name && <h2 className="text-2xl">{popup.name}</h2>}
                    {popup.description && <p>{popup.description}</p>}
                  </div>
                )}
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </ReactModal>
  );
};

export default Popups;
