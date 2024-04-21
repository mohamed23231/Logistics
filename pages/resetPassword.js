import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

const schema = z.object({
    email: z.string().email(),
});

export default function ResetPassword() {
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // State for success status
    const [formData, setFormData] = useState({
        email: ""
    });

    const resetPasswordLogic = async () => {
        try {
            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formData);
            console.log(res.data);
            setIsSuccess(true); // Set isSuccess to true on successful API call
        } catch (error) {
            if (error?.response) {
                setFormErrors({ ...formErrors, serverError: error.response.data.message });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await schema.parseAsync(formData);
            await resetPasswordLogic();
        } catch (error) {
            if (error.errors && error.errors.length > 0) {
                const errors = {};
                error.errors.forEach(err => {
                    errors[err.path[0]] = err.message;
                });
                setFormErrors(errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: undefined, serverError: undefined });
    };

    return (
        <ResetPasswordForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
            formErrors={formErrors}
            isLoading={isLoading}
            isSuccess={isSuccess} // Pass isSuccess as a prop to the ResetPasswordForm component
        />
    );
}
