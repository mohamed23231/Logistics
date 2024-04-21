import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import SignupForm from '../components/auth/SignupForm';
import { useRouter } from 'next/router';

/**
 * Component for handling user signup.
 */
export default function Signup() {
    const router = useRouter();

    // State for form errors
    const [formErrors, setFormErrors] = useState({});
    // State for loading status
    const [isLoading, setIsLoading] = useState(false);
    // State for form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    /**
     * Schema for validating signup form data using Zod.
     */
    const schema = z.object({
        email: z.string().email(),
        password: z
            .string()
            .min(8)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง~]).{8,}$/,
                { message: 'Password must contain at least one lowercase letter, one uppercase letter, and one special character' }
            ),
        confirmPassword: z.string()
            .refine((value) => value === formData.password, { message: "Passwords don't match" })
    });

    /**
     * Logic for user signup.
     */
    const loginLogic = async () => {
        try {
            console.log('hello');
            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', {
                email: formData.email,
                password: formData.password,
                name: 'test',
                rePassword: formData.confirmPassword,
                phone: "01010700700"
            });
            router.push('/login');

            console.log(res.data);
        } catch (error) {
            console.log('hello from login error', error);
            if (error?.response) {
                setFormErrors({ ...formErrors, serverError: error.response.data.message });
            }
        }
    };

    /**
     * Handler for form submission.
     * @param {Event} e - Form submit event.
     */
    const handleSubmite = async (e) => {
        e.preventDefault();

        setIsLoading(true); // Set loading to true when the button is clicked
        try {
            console.log('Before schema validation');
            await schema.parseAsync(formData);
            console.log('After schema validation');
            await loginLogic(); // Perform signup logic
        } catch (error) {
            console.error('Validation Error:', error);
            console.error('Error Message:', error.message); // Add this line for debugging

            if (error.errors && error.errors.length > 0) {
                const errors = {};
                error.errors.forEach(err => {
                    errors[err.path[0]] = err.message;
                });
                setFormErrors(errors);
            }
        } finally {
            setIsLoading(false); // Set loading to false after signup logic completes
        }
    };

    /**
     * Handler for input changes.
     * @param {Event} e - Input change event.
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: undefined, serverError: undefined });
    };

    // Render the SignupForm component with props
    return (
        <SignupForm
            handleChange={handleChange}
            handleSubmite={handleSubmite}
            formData={formData}
            formErrors={formErrors}
            isLoading={isLoading}
        />
    );
}
