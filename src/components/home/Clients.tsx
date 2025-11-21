import React from 'react';
import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

const Clients = () => {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    swiperRef.current = new Swiper('.clients-carousel', {
      slidesPerView: 'auto',
      spaceBetween: 50,
      centeredSlides: false,
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      freeMode: true,
      freeModeMomentum: false,
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  const clients = [
    "/images/clients/client-01.svg",
    "/images/clients/client-02.svg",
    "/images/clients/client-03.svg",
    "/images/clients/client-04.svg",
    "/images/clients/client-05.svg",
    "/images/clients/client-06.svg",
    "/images/clients/client-07.svg",
  ];

  return (
    <section className="py-19">
      <div className="max-w-[1104px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="relative z-10 overflow-hidden">
          <span className="max-w-[128px] w-full h-[37px] block inset-0 pointer-events-none absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-linear-to-l from-dark/0 to-dark/100"></span>
          <span className="max-w-[128px] w-full h-[37px] block inset-0 pointer-events-none absolute z-10 left-auto top-1/2 -translate-y-1/2 bg-linear-to-r from-dark/0 to-dark/100"></span>
          <div className="swiper clients-carousel">
            <div className="swiper-wrapper items-center select-none ease-linear!">
              {[...clients, ...clients, ...clients].map((client, index) => (
                <div key={index} className="swiper-slide w-auto!">
                  <a href="/#">
                    <img src={client} alt="client" className={client.includes('client-07') ? 'mt-3' : ''} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
