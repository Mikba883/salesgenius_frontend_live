import { useState } from 'react';

const Testimonials = () => {
  const [showMore, setShowMore] = useState(false);

  const testimonials = [
    { name: "Machel Pildium", handle: "@machel", image: "/images/user/user-01.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's." },
    { name: "Wilson Bator", handle: "@wilson", image: "/images/user/user-02.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.", extra: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { name: "Roger George", handle: "@roger", image: "/images/user/user-03.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's." },
    { name: "Adison Dias", handle: "@adison", image: "/images/user/user-04.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.", extra: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { name: "Abram Lipshutz", handle: "@abram", image: "/images/user/user-05.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's." },
    { name: "Jaylon Press", handle: "@jaylon", image: "/images/user/user-06.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's." },
    { name: "Zain Franci", handle: "@zain", image: "/images/user/user-07.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's." },
    { name: "Cristofer Carder", handle: "@cristofer", image: "/images/user/user-08.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's." },
    { name: "Dulce Rosser", handle: "@dulce", image: "/images/user/user-09.png", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.", extra: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  ];

  return (
    <section className="relative z-20 overflow-hidden pt-22.5 lg:pt-27.5 xl:pt-32.5 2xl:pt-45 pb-20">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* section title */}
        <div className="text-center mb-15">
          <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
            <img src="/images/hero/icon-title.svg" alt="icon" />
            <span className="hero-subtitle-text">Wall of love</span>
          </span>
          <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
            What Our User Says
          </h2>
          <p className="max-w-[714px] mx-auto font-medium">
            Our AI writing tool is designed to empower you with exceptional writing capabilities, 
            making the writing process more efficient, accurate, and enjoyable.
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5 ${!showMore ? 'max-h-[855px] overflow-hidden' : ''}`}>
          {/* Column 1 */}
          <div className="space-y-7.5">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div className="flex items-center gap-4.5">
                  <div className="max-w-[48px] w-full h-12 rounded-full">
                    <img src={testimonial.image} alt="user" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">{testimonial.name}</h5>
                    <p className="text-sm font-medium">{testimonial.handle}</p>
                  </div>
                </div>
                <div className="user-divider relative my-6 w-full h-[1px]"></div>
                <p>{testimonial.text}</p>
                {testimonial.extra && <p className="mt-6">{testimonial.extra}</p>}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                  <span className="absolute bottom-0 right-0 -z-1">
                    <img src="/images/blur/blur-18.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-7.5 hidden sm:block">
            {testimonials.slice(3, 6).map((testimonial, index) => (
              <div key={index} className="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div className="flex items-center gap-4.5">
                  <div className="max-w-[48px] w-full h-12 rounded-full">
                    <img src={testimonial.image} alt="user" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">{testimonial.name}</h5>
                    <p className="text-sm font-medium">{testimonial.handle}</p>
                  </div>
                </div>
                <div className="user-divider relative my-6 w-full h-[1px]"></div>
                <p>{testimonial.text}</p>
                {testimonial.extra && <p className="mt-6">{testimonial.extra}</p>}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                  <span className="absolute bottom-0 right-0 -z-1">
                    <img src="/images/blur/blur-18.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="space-y-7.5 hidden lg:block">
            {testimonials.slice(6, 9).map((testimonial, index) => (
              <div key={index} className="user-border-gradient relative overflow-hidden px-8 py-9 rounded-[19px]">
                <div className="flex items-center gap-4.5">
                  <div className="max-w-[48px] w-full h-12 rounded-full">
                    <img src={testimonial.image} alt="user" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">{testimonial.name}</h5>
                    <p className="text-sm font-medium">{testimonial.handle}</p>
                  </div>
                </div>
                <div className="user-divider relative my-6 w-full h-[1px]"></div>
                <p>{testimonial.text}</p>
                {testimonial.extra && <p className="mt-6">{testimonial.extra}</p>}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                  <span className="absolute bottom-0 right-0 -z-1">
                    <img src="/images/blur/blur-18.svg" alt="blur-sm" className="max-w-none" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${showMore ? 'sticky -mt-52 transition-opacity duration-300 opacity-100' : ''} absolute inset-x-0 flex justify-center pt-32 pb-8 pointer-events-none bottom-20 bg-linear-to-t from-dark`}>
          <button
            onClick={() => setShowMore(!showMore)}
            type="button"
            className="button-border-gradient hover:button-gradient-hover relative top-20 text-sm text-white font-semibold px-4.5 py-3 rounded-lg pointer-events-auto flex mx-auto -mt-7.5 ease-in duration-300"
          >
            <span>{showMore ? 'Okay, I get the point' : 'Show more...'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
