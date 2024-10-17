import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { fetchLogin, getCsrf, getUser } from '../services/userService';
import { useContext } from "react";
import { SecurityContext } from '../context/SecurityContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { TfiAlert } from 'react-icons/tfi';
import { FaSmile } from 'react-icons/fa';



function LoginForm() {
    const { showModal } = useModal()
    const { dispatch } = useContext(UserContext);
    const { setJwt, setCsrf } = useContext(SecurityContext);
    const navigate = useNavigate()

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Veuillez entrez une adresse email valide")
            .required("L'email est obligatoire"),
        password: Yup.string()
            .required("Mot de passe obligatoire")
            .min(9, "Le mot de passe doit contenir au moins 9 characteres")
            .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule"),
    })

    const handleSubmit = async (values) => {
        const csrf = await getCsrf();
        await setCsrf(csrf);        
        const loginData = await fetchLogin(values, csrf, dispatch, setJwt);
        const jwt = loginData.token;
        if(!jwt) {
            showModal(<TfiAlert className="text-[red] text-[3rem]" />, loginData.error.message)
        }
        else {
            showModal(<FaSmile className="text-[#dbc049] text-[3rem]" />, `Bienvenue ${loginData.user.firstName}`)
            await getUser(jwt, dispatch);  
            navigate('/profile');
        }    
    }

  return (
    <div className="mt-20">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="flex flex-col items-center gap-8">
                <div className="flex flex-col w-52">
                    <label htmlFor="email" className="text-[#dbd8e3] font-bold">Email</label>
                    <Field name="email" type="email" className="rounded-3xl p-2 shadow-md shadow-black font-bold mt-4" />
                    <ErrorMessage name="email" component="div" className="error text-red-600 font-bold" />
                </div>

                <div className="flex flex-col w-52">
                    <label htmlFor="password" className="text-[#dbd8e3] font-bold">Mot de passe</label>
                    <Field name="password" type="password" className="rounded-3xl p-2 shadow-md shadow-black font-bold mt-4" />
                    <ErrorMessage name="password" component="div" className="error text-red-600 font-bold" />
                </div>

                <button type="submit" className=" rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1] will-change-transform">Se connecter</button>
            </Form>
        </Formik>
    </div>
  )
}

export default LoginForm