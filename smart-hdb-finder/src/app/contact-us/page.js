"use client";
import Image from "next/image";  // This import is required to use the <Image /> component

export default function ContactUsPage() {
  return (
    <div className="p-8 bg-gray-100 h-full flex flex-col flex-grow">
      <h1 className="text-4xl font-semibold text-center mb-8">Meet the Team</h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-center max-w-[750px] mx-auto gap-8">
            {/* Team Member 1: Aik Chong */}
            <div className="flex flex-col items-center w-[200px]">
              <Image
                src="/aik%20chong.jpeg" // Corrected path for Aik Chong
                alt="Aik Chong"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-bold truncate">
              <a href="https://www.linkedin.com/in/tanaikchong/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">Aik Chong</a>
              </h2>
              <p className="text-lg text-gray-500 truncate">Full Stack Developer</p>
            </div>

            {/* Team Member 2: Daryl Poh */}
            <div className="flex flex-col items-center w-[200px]">
              <Image
                src="/daryl.jpeg" // Corrected path for Daryl Poh
                alt="Daryl Poh"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-bold truncate">
              <a href="https://www.linkedin.com/in/daryl-poh-a00b28280/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">Daryl Poh</a>
              </h2>
              <p className="text-lg text-gray-500 truncate">Full Stack Developer</p>
            </div>

            {/* Team Member 3: Justin */}
            <div className="flex flex-col items-center w-[200px]">
              <Image
                src="/justin.jpeg" // Corrected path for Justin
                alt="Justin"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-bold truncate">
              <a href="https://www.linkedin.com/in/justin-au-hong-yao/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">Justin</a>
              </h2>
              <p className="text-lg text-gray-500 truncate">Full Stack Developer</p>
            </div>

            {/* Team Member 4: Pratham */}
            <div className="flex flex-col items-center w-[200px]">
              <Image
                src="/pratham.jpeg" // Corrected path for Pratham
                alt="Pratham"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-bold truncate">
              <a href="https://www.linkedin.com/in/pratham-mehra-2675b6243/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">Pratham</a>
              </h2>
              <p className="text-lg text-gray-500 truncate">Full Stack Developer</p>
            </div>

            {/* Team Member 5: Prsanna */}
            <div className="flex flex-col items-center w-[200px]">
              <Image
                src="/prsanna.jpeg" // Corrected path for Prsanna
                alt="Prasanna"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-bold truncate">
                <a href="https://www.linkedin.com/in/prasanna-m/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">Prsanna</a>
              </h2>
              <p className="text-lg text-gray-500 truncate">Full Stack Developer</p>
            </div>

            {/* Team Member 6: Shar */}
            <div className="flex flex-col items-center text-center w-[200px]">
              <Image
                src="/shar.jpeg" // Corrected path for Shar
                alt="Shar"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-bold truncate">
                <a href="https://www.linkedin.com/in/nur-sharlynn-esham/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">Sharlynn</a>
              </h2>
              <p className="text-lg text-gray-500">Team Lead/Full Stack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}