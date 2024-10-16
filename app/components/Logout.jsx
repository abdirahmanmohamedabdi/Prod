import { doLogout } from "../actions";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Logout = () => {
  const router = useRouter();
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await doLogout();
      toast.success("You have been logged out.");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Failed to log out An error occurred.");
    }
  };
  return (
    <div>
      <Toaster />
      <form onSubmit={handleLogout}>
        <button
          className="ml-8 whitespace-nowrap font-font inline-flex font-font items-center justify-center bg-one from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
          type="submit"
        >
          Logout
        </button>
      </form>
    </div>
  );
};
export default Logout;
