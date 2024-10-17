
import { ExternalLinkIcon } from '@heroicons/react/solid'
import Link from 'next/link'
export default function Cta() {
  return (
    <div className="relative bg-gray-800">
      <div className="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-base font-semibold  font-font uppercase tracking-wider text-one">Join PishiPoa Today!</h2>
          <p className="mt-2 text-white text-3xl font-extrabold font-font text-four tracking-tight sm:text-4xl">Discover, Create, and Share Your Favorite Recipes!</p>
          <p className="mt-3 text-lg font-font text-white">
          Are you passionate about food? Whether you’re a home cook or an experienced chef, PishiPoa is the perfect place to share your culinary creations, discover new recipes, and connect with fellow food lovers.
          </p>
          <div className="mt-8">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/Signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent font-font text-base font-medium rounded-md text-white bg-one hover:bg-three"
              >
                Ready to Get Cooking?
                <ExternalLinkIcon className="-mr-1 ml-3 h-5 w-5 text-white" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
