/* This example requires Tailwind CSS v2.0+ */
const navigation = {
  main: [
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Home', href: '#' },
   
  ],
 
}

export default function Example() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a href={item.href} className="text-base font-font text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
       
        <p className="mt-8 text-center text-base font-font text-gray-400">&copy; 2024 ShuleNet, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
