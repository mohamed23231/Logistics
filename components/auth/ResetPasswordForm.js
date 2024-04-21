import { Spinner } from "@nextui-org/spinner";

export default function ResetPasswordForm({ formData, handleChange, handleSubmit, formErrors, isLoading, isSuccess }) {
    return (
        <>
            <div className="mt-20 flex justify-center items-center">
                <form className="max-w-sm mx-auto grow" >
                    <h2 className="font-semibold text-4xl mb-7 text-center">Forget Password</h2>
                    <div className="text-center my-5 text-gray-400">
                        <p>Enter your email address and we will send you a link to reset your password</p>
                    </div>
                    <div className="mb-5 ">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input onChange={handleChange} name="email" value={formData.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required />
                        {formErrors?.email && <p className="text-red-500 text-sm">{formErrors?.email}</p>}
                    </div>

                    {formErrors?.serverError && <div className="text-center border bg-red-600 text-white rounded-lg mb-5 p-3"> {formErrors?.serverError}</div>}
                    {isSuccess && <div className="text-center border bg-green-500 text-white rounded-lg mb-5 p-3">Check your mail for reset instructions</div>}
                    <button disabled={isLoading} onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isLoading ? <Spinner color="white" size="sm" /> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </>
    );
}
