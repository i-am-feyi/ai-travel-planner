import Link from "next/link";
import React from "react";

const AppFooter = () => {
  return (
    <section className="border-t border-gray-200 py-3">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold">Talia - AI Travel Planner</span>. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-500 text-center">
            Developed By - A Group of 4 Software Engineers from{" "}
            <Link
              href="https://cau.edu.tr"
              target="_blank"
              className="text-green-600 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-green-600 after:transition-all after:duration-500 hover:after:w-full"
            >
              Kibris Aydin University, North Cyprus
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppFooter;
