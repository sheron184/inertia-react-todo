import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Dashboard(props) {
    const [showCreateStudentModal,setShowCreateStudentModal] = useState(false);
    //console.log(props.students);
    const toggleModal = ()=>{
        !showCreateStudentModal ? setShowCreateStudentModal(true):setShowCreateStudentModal(false);
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
                            <h3>Student list</h3>
                            <div className='student-list'>
                                <ul>
                                    {props.students.length > 0 ? props.students.map((student)=>{
                                        <li>{student.name}</li>
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
