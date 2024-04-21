import { Spinner } from "@nextui-org/spinner";
import Link from 'next/link';

export default function SignupForm({ formData, handleChange, handleSubmite, formErrors, isLoading }) {
    return (
        <>

            <div className="mt-7 flex justify-center items-center">
                <form className="max-w-sm mx-auto grow" >
                    <h2 className="font-semibold text-4xl mb-7">Sign Up</h2>
                    <div className="text-center my-5 text-gray-600	">
                    <p >Nice to meet you! Please enter your details</p>
                    </div>

                    <div className="mb-5 ">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <p className="text-gray-400">we will send confirmation email to it </p>

                        <input onChange={handleChange} name="email" value={formData.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required />
                        {formErrors?.email && <p className="text-red-500 text-sm">{formErrors?.email}</p>}
                    </div>

                    <div className="mb-5 ">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password
                        </label>
                        <input value={formData.password} onChange={handleChange} name="password"
                            type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {formErrors?.password && <p className="text-red-500 text-sm text-center">{formErrors?.password}</p>}
                    </div>

                    <div className="mb-5 ">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password
                        </label>
                        <input value={formData.confirmPassword} onChange={handleChange} name="confirmPassword"
                            type="password" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {formErrors?.confirmPassword && <p className="text-red-500 text-sm text-center">{formErrors?.confirmPassword}</p>}
                    </div>

                    {formErrors?.serverError && <div className="text-center border bg-red-600 text-white rounded-lg mb-5 p-3"> {formErrors?.serverError}</div>}

                    <button disabled={isLoading} onClick={handleSubmite} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isLoading ? <Spinner size="sm" color="primary" /> : 'Submit'}
                        </button>

                        <Link href='/login' className="flex justify-center items-center text-center mt-4 text-gray-500	">
                    <p >Already have Account? <span className="text-gray-900">Login</span> </p>
                    </Link>


                </form>
            </div>

        </>
    );
}