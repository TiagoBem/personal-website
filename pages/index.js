import { useRef, useEffect } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const workRefs = useRef([]);
  const serviceRefs = useRef([]);
  const aboutRefContainer = useRef();
  const footerRef = useRef();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
  
    const groupsToObserve = [
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      workRefs.current,
      serviceRefs.current,
      [aboutRefContainer.current],
      [footerRef.current],
    ];
  
    const observers = [];
  
    groupsToObserve.forEach((group) => {
      const validElements = group.filter(Boolean); // remove nulls
  
      if (validElements.length === 0) return;
  
      const observer = new IntersectionObserver(
        (entries, obs) => {
          const isAnyVisible = entries.some((entry) => entry.isIntersecting);
          if (isAnyVisible) {
            stagger(validElements, { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" }, { y: 0, x: 0, transform: "scale(1)" });
            // depois de animar, não precisa observar mais
            validElements.forEach((el) => el && obs.unobserve(el));
          }
        },
        { threshold: 0.1 }
      );
  
      validElements.forEach((el) => observer.observe(el));
      observers.push(observer);
    });
  
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  // useIsomorphicLayoutEffect(() => {
  //   stagger(
  //     [textOne.current, textTwo.current, textThree.current, textFour.current, workRefs.current, serviceRefs.current, aboutRefContainer.current, footerRef.current],
  //     { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
  //     { y: 0, x: 0, transform: "scale(1)" }
  //   );
  // }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
{/* 
      <div style={{ height: "100vh" }} className="relative">
        <img
              src={data.headerPhoto}
              alt="Header"
              className="w-full h-full object-contain"
            />
        </div> */}
      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="w-full flex justify-center mt-10">
          <div className="w-72 h-72 laptop:w-88 laptop:h-88 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={data.headerPhoto}
              alt="Header"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project, index) => (
              <div
                ref={(el) => (workRefs.current[index] = el)}
                key={project.id}
              >
                <WorkCard
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  onClick={() => window.open(project.url)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <div
                ref={(el) => (serviceRefs.current[index] = el)}
                key={service.id}
              >
                <ServiceCard
                  key={index}
                name={service.title}
                description={service.description}
              />
              </div>
            ))}
          </div>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <div
            ref={aboutRefContainer}
            className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5"
          >
            {data.aboutpara}
          </div>
        </div>
        <div
          ref={footerRef}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}
