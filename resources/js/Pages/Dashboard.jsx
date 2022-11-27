import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { useState,useRef,useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import 'animate.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//font awesome icons
import {faTrash,faSquarePen,faEllipsis,faChevronUp} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard(props) {
    const [showEditForm,setShowEditForm] = useState(false);
    const [showCreateStudentModal,setShowCreateStudentModal] = useState(false);
    const [studentData,setStudentData] = useState({
        name:'',
        age:'',
        status:0,
        image:''
    });
    //SHOW MODAL
    const toggleModal = ()=>{
        showEditForm && setShowEditForm(false);
        !showCreateStudentModal ? setShowCreateStudentModal(true):setShowCreateStudentModal(false);
    }
    //DELETE STUDENT
    const deleteStudent = (id,image)=>{
        Inertia.delete(`/destroy/${id}/${image}`,{
            onBefore: ()=> confirm("Are you sure you want to delete this user?"),
        });
    }
    //EDIT STUDENT
    const editStudent = (student)=>{
        setStudentData(student);
        setShowEditForm(true);
        toggleModal();
    }
    //SHOW ACTION BTNS
    const showActions = (e,id)=>{
        e.stopPropagation();
        document.getElementById(`actions${id}`).classList.toggle("hidden");
    }
    //HIDE ACTION BTNS WHEN CLICK DOC
    window.addEventListener('click',(e)=>{
        e.stopPropagation();
        Array.from(document.getElementsByClassName("action-btns-wrapper")).forEach(wrap=>{
            if(!wrap.classList.contains('hidden')){
                wrap.classList.add("hidden");
            }
        });
    });
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            toggleModal={()=>toggleModal()}
            showCreateStudentModal={showCreateStudentModal}
            showEditForm={showEditForm}
            studentData={studentData}
        >
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className='text-xl font-bold'>Student list</h3>
                            <div className='student-list mt-3'>
                                <ul>
                                    {props.students.length > 0 ? props.students.map((student)=>{
                                        return <li key={student.id} className='py-3 px-3 flex shadow-md bg-gray-100 mb-4 rounded'>
                                                    <img className='rounded-full shadow-md h-12 w-12 flex items-center justify-center' src={`uploads/${student.image}`} width="120" height="60" />
                                                    <div className='flex items-center ml-3'><h5 className='text-lg'>{student.name}</h5></div>
                                                    <div className='student-actions flex-grow justify-end flex'>
                                                        <div className='flex items-center'>
                                                            <div id={`actions${student.id}`} className="hidden action-btns-wrapper">
                                                                <div className='flex py-3 absolute mt-3 shadow-md px-4 bg-white border animate__animated animate__fadeInDown'>
                                                                    <button onClick={()=>editStudent(student)} className='rounded text-white text-yellow-600 text-xl'><FontAwesomeIcon icon={faSquarePen} /></button>
                                                                    <button onClick={()=>deleteStudent(student.id,student.image)} className='rounded ml-2 text-red-500 text-xl'><FontAwesomeIcon icon={faTrash} /></button>
                                                                </div>
                                                            </div>
                                                            <button onClick={event=>event.stopPropagation()} onMouseDown={event=>showActions(event,student.id)} type="button" className="mr-3 z-50" target-id={`actions${student.id}`} aria-expanded="true" aria-haspopup="true">
                                                                <FontAwesomeIcon className='text-2xl' icon={faEllipsis} />
                                                            </button>
                                                        </div>
                                                    </div> 
                                                </li>;
                                    }) : <div className='bg-red-100 border border-red-400 px-4 py-3 rounded text-red-700 my-4'>No students yet</div>}
                                </ul>
                            </div>
                        </div>
                        <div className='actions'>
                            <div className='p-4 flex justify-end'>
                                <button onClick={toggleModal} className='bg-blue-600 hover:bg-blue-700 text-white p-1 pr-3 pl-3 rounded'>+ New Student</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
