import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { fetchsign, getCsrf } from '../services/userService';
import { useModal } from '../context/ModalContext';
import { TfiAlert } from 'react-icons/tfi';

function SignForm({ setIsRegister }) {
    const { showModal } = useModal()
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        firstName: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Veuillez entrez une adresse email valide")
            .required("L'email est obligatoire"),
        password: Yup.string()
            .required("Mot de passe obligatoire")
            .min(9, "Le mot de passe doit contenir au moins 9 characteres")
            .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule"),
        confirmPassword: Yup.string()
            .required("Mot de passe obligatoire")
            .oneOf([Yup.ref('password'), null], "Les deux mots de passe doivent être identiques"),
        name: Yup.string()
            .required('Votre nom est obligatoire'),
        firstName: Yup.string()
            .required('Votre prénom est obligatoire')
    })

    const handleSubmit = async (values) => {
        try {
            const csrf = await getCsrf()
            const response = await fetchsign(values, csrf)
            if(response.error) {
                showModal(<TfiAlert />, response.error.message)
            } else {
                showModal(`BRAVO ${response.firstName}`, response.message)
            }
            setIsRegister(true);
        } catch (error) {
            showModal('ERREUR', 'Une erreur est survenue')
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

                <div className="flex flex-col w-52">
                    <label htmlFor="confirmPassword" className="text-[#dbd8e3] font-bold">Confirmer le mot de passe</label>
                    <Field name="confirmPassword" type="password" className="rounded-3xl p-2 shadow-md shadow-black font-bold mt-4" />
                    <ErrorMessage name="confirmPassword" component="div" className="error text-red-600 font-bold" />
                </div>

                <div className="flex flex-col w-52">
                    <label htmlFor="name" className="text-[#dbd8e3] font-bold">Votre nom</label>
                    <Field name="name" type="text" className="rounded-3xl p-2 shadow-md shadow-black font-bold mt-4" />
                    <ErrorMessage name="name" component="div" className="error text-red-600 font-bold" />
                </div>

                <div className="flex flex-col w-52">
                    <label htmlFor="firstName" className="text-[#dbd8e3] font-bold">Votre prénom</label>
                    <Field name="firstName" type="text" className="rounded-3xl p-2 shadow-md shadow-black font-bold mt-4" />
                    <ErrorMessage name="firstName" component="div" className="error text-red-600 font-bold" />
                </div>

                <button type="submit" className=" rounded-3xl bg-[#8e05c2] p-3 shadow-black shadow-md font-bold text-[#dbd8e3] duration-200 transition-transform hover:translate-x-2 hover:scale-[1.1] will-change-transform">S'inscrire</button>
            </Form>
        </Formik>
    </div>
  )
}

export default SignForm