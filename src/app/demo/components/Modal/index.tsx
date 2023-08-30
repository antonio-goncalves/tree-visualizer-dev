"use client"
import React, {forwardRef, useEffect, useRef, useState} from 'react'

import styles from "./index.module.scss"
import WebUtils from "@/app/demo/components/webUtils";
import classnames from "classnames";




interface ModalProps {
    isOpen?:boolean,
    onClose?:()=>void,
    children:React.ReactElement
}

export default function Modal({isOpen,onClose,children}:ModalProps){
    const ref = useRef<HTMLDialogElement | null>(null)

    function showModal(){
        if(!ref.current) return
        ref.current?.showModal()
        WebUtils.lockBodyScroll()
    }

    function closeModal(){
        WebUtils.unLockBodyScroll()
        ref.current?.close()
    }

    function _onClose(){
        onClose?.()
        WebUtils.unLockBodyScroll()
    }

    useEffect(()=>{
        return ()=>{
            WebUtils.unLockBodyScroll()
        }
    },[])

    useEffect(()=>{
        if(isOpen && !ref.current?.open) showModal()
        if(!isOpen && ref.current?.open) closeModal()
    },[isOpen])

    function onKeyDown(event:React.KeyboardEvent<HTMLElement>){
        if(event.key === "Enter") _onClose()
    }

    function renderCloseButton(){
        return (
            <div onClick={_onClose} onKeyDown={onKeyDown} className={styles["close-button"]}  role={"button"} tabIndex={0} >
                <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-x"
                viewBox="0 0 16 16">
                <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>

        )
    }

    function renderContent(){
        return (
            <main className={styles.content}>
                {children}
            </main>
        )
    }

    return (
        <>

            <dialog  onClose={_onClose} className={classnames(styles.modal,"border-0 rounded shadow")} ref={ref}>
                {renderContent()}
                {renderCloseButton()}
            </dialog>
        </>
    )
}

