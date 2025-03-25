import { Reference } from "@/app/demo/types";
import { useEffect, useRef } from "react";
import React from 'react'

interface ReferencesProps {
    references?: Reference[] | Reference | undefined,
    className?: string,
    autoFocus?: boolean
}

export default function References({ references, className, autoFocus }: ReferencesProps) {
    const ref = useRef<HTMLParagraphElement | null>(null)
    useEffect(() => {
        if (!autoFocus) return
        ref.current?.querySelector("a")?.focus()
    }, [])
    if (!references) return null
    const _references = Array.isArray(references) ? references : [references]
    const title = _references.length > 1 ? "Sources" : "Source"
    const links = _references.map((el, i) => (
        <React.Fragment key={i}><a target={"_blank"} href={el.url} >{el.title}</a>{i < _references.length - 1 ? ", " : ""}</React.Fragment>
    ))
    return (
        <p ref={ref} className={className}>
            <b>{title}:</b> {links}
        </p>
    )
}