import React from 'react'
import style from "../SCSS/pages/_testWrite.module.scss";

const TestWrite = () => {
    return (
        <div className={style.main_container}>
            <div className={style.left_container}>
                <p>Plase fill out the question</p>
                <h2>테스트 내용에 대해 작성해주세요</h2>
            </div>

            <div className={style.right_container}>

                <form>
                    <h4>테스트 제목</h4>
                    <input type="text" className='form-control' />
                    <h4>테스트 난이도</h4>
                    <input type="text" className='form-control' />
                    <h4>테스트 언어 선택</h4>
                    <select className='form-control' name='recruit'>
                        <option>Java</option>
                        <option>Python</option>
                    </select>
                    <h4>문제 설명</h4>
                    <textarea name="" className='form-control' />
                    <h4>제한조건</h4>
                    <textarea name="" className='form-control' />


                    
                </form>



            </div>


        </div>
    )
}

export default TestWrite