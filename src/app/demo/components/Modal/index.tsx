"use client"
import React, {forwardRef, useEffect, useRef, useState} from 'react'

import styles from "./index.module.scss"


export default function ParentModal(){

    const [isOpen,setIsOpen] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            setIsOpen(true)
        },4000)
    },[])

    return(
        <>
            <div>{isOpen?"Open":"Close"}</div>
            <button onClick={()=>{setIsOpen(true)}}>Open modal</button>
            <Modal isOpen={isOpen} onClose={()=>{setIsOpen(false)}}/>
        </>
    )
}

interface ModalProps {
    isOpen?:boolean,
    onClose?:()=>void
}

function Modal({isOpen,onClose}:ModalProps){
    const ref = useRef<HTMLDialogElement | null>(null)

    useEffect(()=>{
        if(isOpen && !ref.current?.open) ref.current?.showModal()
        if(!isOpen && ref.current?.open) ref.current?.close()
    },[isOpen])


    return (
        <>

            <dialog  onClose={onClose} className={styles.modal} ref={ref}>
                Modal
                <button>Inside</button>
            </dialog>
        </>
    )
}

