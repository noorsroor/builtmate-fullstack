import { BoltIcon, CurrencyDollarIcon, ServerIcon } from '@heroicons/react/20/solid';

const EducationalSection = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="pattern-bg"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect fill="url(#pattern-bg)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold text-yellow-600">Discover Modern Living</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Understanding Pre-fabricated Homes
              </h1>
              <p className="mt-6 text-xl text-gray-700">
                Pre-fabricated homes are innovative housing solutions that are built off-site and then assembled at the desired location. 
                They offer a faster, cost-effective, and environmentally friendly approach to home building.
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Pre-fabricated Home Assembly"
            src="https://images.pexels.com/photos/29224566/pexels-photo-29224566/free-photo-of-industrial-overhead-crane-hook-in-konya-warehouse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base text-gray-700 lg:max-w-lg">
              <p>
                Pre-fabricated homes come in various styles and sizes, ranging from compact modular homes to spacious multi-story designs. 
                These homes are constructed with precision and quality, ensuring a durable and energy-efficient living space.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <BoltIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-yellow-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Faster Construction.</strong> 
                    Built off-site in a controlled environment, reducing weather delays and ensuring high quality.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CurrencyDollarIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-yellow-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Cost-Effective.</strong> 
                    Streamlined manufacturing processes and reduced labor costs lower overall expenses.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-yellow-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Eco-Friendly.</strong> 
                    Minimizes waste with precise material usage and supports sustainable building practices.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Whether you are looking for a cozy cabin, a modern family home, or an energy-efficient villa, 
                pre-fabricated homes offer versatile solutions that suit any lifestyle.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">How It Works</h2>
              <p className="mt-6">
                1. Choose Your Design: Select from a wide range of pre-designed models or customize your own.<br />
                2. Precision Manufacturing: Your home is built in a factory under strict quality control.<br />
                3. Fast Assembly: The completed home is delivered and assembled on your site.<br />
                4. Move-In Ready: Experience your new home faster, without the hassle of traditional construction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalSection;
