import React from 'react'
import { useModal } from '../context/ModalContext'

function Modal() {
    const { state, hideModal } = useModal()
    return (
        <div>
            {
                state.isVisible &&
                    <section className="absolute h-[100vh] w-[100vw] backdrop-blur-md flex flex-col items-center justify-center z-30"> 
                        <div className="flex flex-col items-center bg-[#8e05c2] opacity-[95%] w-[80vw] sm:w-[30vw] rounded-3xl pt-8 pb-8 p-2 gap-10 border-gray-800 border-2 z-40">
                            <h2>{state.title}</h2>
                            <p className="text-justify text-[#dbd8e3] font-extrabold">{state.message}</p>
                            <button className="bg-[#3e065f] pl-8 pr-8 p-2 rounded-3xl border-gray-800 border-2 text-[#dbd8e3] font-extrabold" onClick={() => {hideModal()}}>OK</button>
                        </div>
                    </section>
            }
        </div>
    )
}

export default Modal