import { doLogout } from "../actions";

const Logout = () => {
    return (
        <form action={doLogout}>
            <button className="ml-8 whitespace-nowrap font-font inline-flex font-font items-center justify-center bg-one from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700" type="submit">Logout</button>
            </form>
    )
}
export default Logout