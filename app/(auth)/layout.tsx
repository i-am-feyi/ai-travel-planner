import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <main className="flex items-center justify-center">{children}</main>
      <div className="p-2">
        {/* <div className="h-full rounded-2xl bg-blue-300 bg-[url('/auth-bg.png')] bg-cover bg-center flex flex-col justify-end">
        <div>

        </div>
          <div className="rounded-b-2xl bg-[#A259FF] w-full flex flex-col justify-end p-4">
            <div>sss</div>
            <div>sss</div>
            <div>sss</div>
            <div>sss</div>
            <div>sss</div>
            <div>sss</div>
            <div>sss</div>
            <div>sss</div>
            <div>sss</div>
            sss
          </div>
        </div> */}
        <div className="flex flex-col h-full rounded-4xl overflow-hidden">
          <div className="aspect-square bg-blue-500">
            <div className="relative object-cover">
              <Image
                src="/auth-bg.png"
                alt="Squared Image"
                className="object-contain w-full"
                width={540}
                height={752}
              />
            </div>
          </div>
          <div className="bg-purple-500 flex-1">ss</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
