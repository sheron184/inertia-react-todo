import { Link } from "@inertiajs/inertia-react";

const Welcome = () => {
    return ( 
        <div className="Welcome">
            <div className="p-3 flex justify-center">
                <div className="p-5 border shadow-md">
                    <h2 className="text-3xl text-center mb-3">Welcome</h2>
                    <div className="p-3">
                        <Link className="py-2 px-4 bg-green-500 rounded text-white" href="/login">Login</Link>
                        <span className="ml-2 mr-2">Or</span>
                        <Link className="text-blue-400" href="/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Welcome;