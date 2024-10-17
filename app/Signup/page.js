"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { doSocialLogin } from "../actions";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster for notifications

const SignUp = () => {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 201) {
        toast.success("Account created successfully!");

        router.push("/Login");
      } else {
        // Show error toast
        toast.error("Failed to create an account. Please try again.");
      }
    } catch (e) {
      console.error(e.message);
      // Show error toast on catch
      toast.error("An error occurred during sign-up. Please try again.");
    }
  }

  return (
    <div>
      <Toaster />

      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo1.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-font font-extrabold text-gray-900">
            Sign up for an account
          </h2>
          <p className="mt-2 text-center text-sm font-font text-gray-600">
            Or{" "}
            <a
              href="/Login"
              className="font-medium text-indigo-600 font-font hover:text-indigo-500"
            >
              Sign In
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-font font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium font-font text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium font-font text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between"></div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center font-font py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-one hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white font-font text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <form action={doSocialLogin}>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div>
                    <button
                      type="submit"
                      name="action"
                      value="google"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Google</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enable-background="new 0 0 24 24"
                          viewBox="0 0 24 24"
                          id="google"
                        >
                          <path
                            fill="#ff8333"
                            d="M12.22182,5.97728c1.42137-0.02391,2.79488,0.51341,3.82273,1.49545l2.86819-2.86818c-1.81006-1.7-4.20788-2.63339-6.69092-2.60455C8.44087,1.99855,4.98265,4.13047,3.28544,7.5091L6.62636,10.1C7.41416,7.66784,9.66545,6.00909,12.22182,5.97728z"
                          ></path>
                          <path
                            fill="#ff6500"
                            d="M3.28547,7.50908c-1.41819,2.82599-1.41819,6.15582,0,8.98181L6.62634,13.9c-0.41812-1.23216-0.41812-2.56784,0-3.8L3.28547,7.50908z"
                          ></path>
                          <path
                            fill="#ffa266"
                            d="M15.60822,17.06822c-2.80401,1.79981-6.53614,0.98574-8.33595-1.81827c-0.2705-0.42143-0.48748-0.8749-0.64593-1.34995l-3.34087,2.59089C4.98265,19.86954,8.44089,22.00147,12.22185,22c2.43429,0.06602,4.8018-0.80065,6.61815-2.42269L15.60822,17.06822z"
                          ></path>
                          <path
                            fill="#ffc199"
                            d="M21.64001,10.18182h-9.41815v3.86816h5.38177c-0.22498,1.23639-0.94592,2.3269-1.99542,3.01819c-0.00317,0.00208-0.00647,0.0036-0.00964,0.00562c0.00317-0.00201,0.00647-0.00354,0.00964-0.00555l3.23175,2.50909l0.00006-0.00006c1.9903-1.91693,3.07397-4.5882,2.98181-7.34998C21.82239,11.54138,21.76154,10.85687,21.64001,10.18182z"
                          ></path>
                        </svg>
                      </svg>
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      name="action"
                      value="github"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with GitHub</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 1"
                          viewBox="0 0 24 24"
                          id="github"
                        >
                          <path
                            fill="#FF6500"
                            d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"
                          ></path>
                        </svg>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
