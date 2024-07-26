import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>} 
            <Controller
                name={name || "content"}
                control={control}
                render={({field: {onChange}}) => (
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "table",
                                "paste",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                            content_css: [
                                // Path to your CSS file with TinyMCE styles
                                "https://cdn.tiny.cloud/1/your_tiny_mce_api_key/tinymce/skins/ui/oxide/content.min.css",
                            ],
                            content_style:"body {font-family:helvetica,sans-serif;font-size:14px",
                            toolbar_mode: "floating",
                            relative_urls: false,
                        }}
                        onEditorChange={onChange}
                    /> 
                )}
            />
        </div>
    )
}

