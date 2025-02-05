import CourseSection from "@/components/homeComponents/course-section/CourseSection";
import HeaderHome from "@/components/homeComponents/HeaderHome";
import NavBarHome from "@/components/homeComponents/NavBarHome";
import TestimonialsHome from "@/components/homeComponents/testmonials/TestimonialsHome";
import WhatYouGet from "@/components/homeComponents/WhatYouGet";
import WhyUs from "@/components/homeComponents/WhyUs";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="container mx-auto">
      <ToastContainer />
      <NavBarHome />
      <HeaderHome />
      <TestimonialsHome />
      <WhyUs />
      <WhatYouGet />
      <CourseSection />
      
    </div>
  );
}
