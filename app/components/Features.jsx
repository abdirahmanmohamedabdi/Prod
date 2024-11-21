/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon,RefreshIcon,UserGroupIcon, } from '@heroicons/react/outline'
import { UilBookReader } from '@iconscout/react-unicons'
import { UilUniversity } from '@iconscout/react-unicons'
import { UilCommentAltLines } from '@iconscout/react-unicons'
import { UilCoins } from '@iconscout/react-unicons'
import { UilMobileAndroid } from '@iconscout/react-unicons'
const features = [
  {
    name: 'Student Registration',
    description: 'Easily register students and store their personal and academic details in the system.',
    icon: UilBookReader,
  },
  {
    name: 'Fee Tracking',
    description: 'Track fees paid, balances, and overdue payments .',
    icon: UilUniversity,
  },
  
  {
    name: 'Employee Payroll',
    description: 'Manage staff salaries, deductions (NHIF, PAYE, NSSF), and generate payslips.',
    icon: UserGroupIcon,
  },
  {
    name: 'Bulk SMS Notifications',
    description: 'Send instant SMS alerts to students, parents, and staff for important updates.',
    icon: UilCommentAltLines,
  },

 
  {
    name: 'Expense Management',
    description: 'Track and manage all school expenses, including utilities and purchases.',
    icon: UilCoins,
  },
  {
    name: 'Online Payments Integration',
    description: 'Allow parents to pay fees securely through MPESA, Pesapal, or other platforms.',
    icon: UilMobileAndroid,
  },
  
 
];
export default function Example() {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-one font-font uppercase">Everything You Need to Manage Your School</h2>
        <p className="mt-2 text-3xl font-extrabold font-font text-gray-900 tracking-tight sm:text-4xl">
          School management in one place
        </p>
       
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6 font-font">
                <div className="flow-root bg-four rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-one rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 font-font tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base font-font text-gray-500">
                    {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
