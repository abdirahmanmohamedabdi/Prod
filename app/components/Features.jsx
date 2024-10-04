/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon,FireIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Mobile-Friendly Experience',
    description: 'Whether you’re in the kitchen or on the go, PishiPoa is designed to work seamlessly on any device. Enjoy a fully responsive design that adapts to your phone, tablet, or desktop.',
  },
  { name: 'Discover and Search Recipes', description: 'Looking for something new to cook? Browse through thousands of recipes from fellow food lovers. Whether you’re craving a specific dish or want to explore new cuisines, PishiPoa has it all.' },
  { name: 'Personalized Recipe Collections', description: 'Organize your favorite recipes with personalized collections. Whether it’s for weeknight dinners, holiday feasts, or desserts, create collections that fit your needs.' },
  { name: 'User-Friendly Dashboard', description: 'Once you sign in, PishiPoa gives you a personalized dashboard to help manage your cooking journey. Track your uploads, see what recipes are trending, and revisit your favorite dishes in one convenient place.' },
]

export default function Example() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div>
          <h2 className="text-base font-semibold font-font text-one  font-font uppercase tracking-wide">Discover the Features of PishiPoa!</h2>
        
          <p className="mt-4 text-lg font-font text-gray-500">
          At PishiPoa, we’ve created a platform that not only makes sharing and discovering recipes fun but also super easy! Explore the powerful features that make PishiPoa your go-to place for everything food.
          </p>
        </div>
        <div className="mt-12 lg:mt-0 lg:col-span-2">
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <FireIcon className="absolute h-6 w-6 text-one" aria-hidden="true" />
                  <p className="ml-9 text-lg leading-6 font-font font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-9 text-base font-font text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
