import Modal from "@/app/demo/components/Modal";

import React from "react";

const ElementDetails = React.lazy(() => import("@/app/demo/components/ElementDetails"));
interface ElementDetailsModalProps {
    isOpen:boolean,
    elementId:string,
    onClose:()=>void,
}
function renderLazyLoading(){
    return (
        <h1 className={"d-flex justify-content-center mb-0 text-secondary  align-items-center h-100"}>Loading...</h1>
    )
}
export default function ElementDetailsModal({isOpen,onClose,elementId}:ElementDetailsModalProps){
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <React.Suspense fallback={renderLazyLoading()}>
                <ElementDetails elementId={elementId}/>
            </React.Suspense>

        </Modal>
    )
}