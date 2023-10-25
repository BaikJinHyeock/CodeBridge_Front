import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { updateQuillValue } from "../actions/quillActions";
import "../css/Quill.css";


const QuillCompo_test = ({ update }) => {

    const dispatch = useDispatch();

    const handleQuillChange = (value) => {
        dispatch(updateQuillValue(value));
    }

    const quillValue = useSelector((state) => state.quill.quillValue);


    const quillRef = useRef(null); // useRef로 ref 생성


    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    // [{ color: [] }, { background: [] }],
                ],
            },
        };
    }, []);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
    ];

    return (
        <div>
            <ReactQuill
                style={{ height: "400px" }}
                ref={quillRef} // useRef로 생성한 ref를 연결
                theme="snow"
                placeholder="내용을 입력해주세요."
                value={quillValue}
                onChange={handleQuillChange}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default QuillCompo_test;
