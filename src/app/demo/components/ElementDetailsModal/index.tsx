import Modal from "@/app/demo/components/Modal";

import React from "react";
import {TreeElementType} from "@/app/demo/components/Tree";
import Loading from "@/app/demo/components/Loading";


const ElementDetailsWithData = React.lazy(() => import("@/app/demo/components/ElementDetailsWithData"));
interface ElementDetailsModalProps {
    isOpen:boolean,
    elementId:string,
    onClose:()=>void,
    treeElementTypes:TreeElementType[],
    onTreeNodeClick?:(id:string)=>void | undefined
}

export default function ElementDetailsModal({isOpen,onClose,elementId,treeElementTypes,onTreeNodeClick}:ElementDetailsModalProps){

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <React.Suspense fallback={<Loading/>}>
                <ElementDetailsWithData id={elementId} treeElementTypes={treeElementTypes} onTreeNodeClick={onTreeNodeClick}/>
            </React.Suspense>

        </Modal>
    )
}