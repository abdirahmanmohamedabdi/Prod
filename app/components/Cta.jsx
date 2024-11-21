"use client"
export default function Example() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-three  rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block font-font">Empower Your School with</span>
                <span className="block font-font text-one">Shulenet</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-white font-font">
              Streamline Operations, Enhance Communication, and Improve School management.
              </p>
              <a
                href="#"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-one font-font hover:bg-indigo-50"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="-mt-15 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              className="transform translate-x-6 translate-y-6 rounded-lg object-cover object-right-top sm:translate-x-16 lg:translate-y-20"
              src="https://images.unsplash.com/photo-1510531704581-5b2870972060?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
