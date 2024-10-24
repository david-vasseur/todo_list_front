import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { createTask } from '../services/taskService';
import { FaCheck } from 'react-icons/fa6';
import { createTree } from '../services/treeService';
import { useModal } from '../context/ModalContext';
import { SecurityContext } from '../context/SecurityContext';

function TodoInput({ id, familyId }) {

    const { showModal } = useModal();
    const { csrf } = useContext(SecurityContext);

    const initialValues = {
        input: ""
    };

    const validationSchema = Yup.object({
        input: Yup.string()
            .required("Impossible d'ajouter une tache ou liste vide")
            .trim()
    });

    const handleSubmit = async (values, { resetForm }, initialValues) => {
        if (id) {
            const newTask = await createTask(csrf, values.input, id);
            showModal('BRAVO', newTask.message)
        } else {
            const newList = await createTree(csrf, values.input, familyId);
            showModal('BRAVO', newList.message)
        }
        resetForm({ values: initialValues });
    };

  return (

    <div className="bg-[#3e065f] p-2 rounded-3xl">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="flex gap-5 justify-center items-center">
                <div>
                    <Field name="input" type="text" className="rounded-xl w-80 p-2" />
                    <ErrorMessage name="input" component="div" className="text-red-700 font-extrabold absolute" />
                </div>
                <button type="submit" className="z-10 pl-1 pr-1 bg-[#3e065f] text-[#dbd8e3] rounded-2xl hover:scale-[1.1] hover:text-[green] transition-[5]"><FaCheck className="text-[2rem] " /></button>
            </Form>
        </Formik>
    </div>
  )
}

export default TodoInput;