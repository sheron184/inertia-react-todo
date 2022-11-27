import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import 'animate.css';

export default function Dashboard(props) {
    const [showCreateStudentModal,setShowCreateStudentModal] = useState(false);
   
    const toggleModal = ()=>{
        !showCreateStudentModal ? setShowCreateStudentModal(true):setShowCreateStudentModal(false);
    }
    const deleteStudent = (id,image)=>{
        //console.log(image.split(".")[0]);
        Inertia.delete(`/destroy/${id}/${image}`,{
            onBefore: ()=> confirm("Are you sure you want to delete this user?"),
        });
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            toggleModal={()=>toggleModal()}
            showCreateStudentModal={showCreateStudentModal}
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
                                        return <li key={student.id} className='py-3 px-3 flex shadow-md bg-blue-200 mb-4 rounded'>
                                                    <h5 className='text-lg'>{student.name}</h5> 
                                                    <div className='student-actions flex-grow justify-end flex'>
                                                        <button className='rounded px-2 text-white bg-yellow-600 mr-2'>Edit</button>
                                                        <button onClick={()=>deleteStudent(student.id,student.image)} className='rounded px-2 text-white bg-red-800'>Delete</button>
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
