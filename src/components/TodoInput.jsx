import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { createTask } from '../services/taskService';
import { FaCheck } from 'react-icons/fa6';
import { createTree } from '../services/treeService';
import { useModal } from '../context/ModalContext';

function TodoInput({ addList, addTask, id, familyId }) {

    const { showModal } = useModal();

    const initialValues = {
        input: ""
    };

    const validationSchema = Yup.object({
        input: Yup.string()
            .required("Impossible d'ajouter une tache ou liste vide")
            .trim()
    });

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values.input, id);
        if (id) {
            const newTask = await createTask(values.input, id);
            addTask(newTask.data);
            showModal('BRAVO', newTask.message)
        } else {
            const newList = await createTree(values.input, familyId);
            addList(newList.data);
            showModal('BRAVO', newList.message)
        }
        resetForm();
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