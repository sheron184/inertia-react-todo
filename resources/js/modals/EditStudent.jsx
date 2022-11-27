import { useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';

const EditStudent = ({studentData,toggleModal}) => {
    const [loading,setLoading] = useState(false);
    const {data,setData,post} = useForm(studentData);
    function submitForm(e){
        e.preventDefault();
        setLoading(true);

        post(`/edit_student`,data,{
            forceFormData:true,
        });
        
        setLoading(false);
        toggleModal();
    }
    return ( 
        <div id="createStudentModal" className="modal animate__animated animate__fadeIn">
            <div className="p-3">
                <div className="flex justify-end p-2">
                    <button onClick={()=>toggleModal()} className="bg-red-500 py-1 px-3 text-white rounded">ESC</button>
                </div>
                <div className="flex justify-center">
                    <div className="student-form-wrapper bg-white px-8 py-6 shadow-lg rounded animate__animated animate__fadeInDown">
                        <div className="pb-4">
                            <h4 className='text-lg font-bold'>Edit Student</h4>
                        </div>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" form="username">
                                    Name
                                </label>
                                <input value={data.name} onChange={(e)=>setData('name',e.target.value)} name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" form="username">
                                    Age
                                </label>
                                <input value={data.age} onChange={(e)=>setData('age',e.target.value)} name="age" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Age" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" form="username">
                                    Status
                                </label>
                                <select value={data.status} onChange={(e)=>setData('status',e.target.value)} name="status" id="status" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="active">Active</option>
                                    <option value="inactive">InActive</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <div className='pb-2'>
                                    <label htmlFor="file_input">Student Image</label>
                                </div>
                                <label>
                                    <input onChange={(e)=>setData('image',e.target.files[0])} name='image' id='file_input' type="file" className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 
                                    file:text-sm file:font-medium
                                    file:bg-blue-50 file:text-blue-500
                                    hover:file:cursor-pointer hover:file:bg-green-50
                                    hover:file:text-green-700 
                                " />
                                </label>
                            </div>
                            <div className='pt-3'>
                                <button className='border py-1 rounded px-4 bg-yellow-500 text-white'>{!loading ? 'Update':'Updating..'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditStudent;