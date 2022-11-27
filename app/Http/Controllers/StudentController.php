<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Support\Facades\File; 
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller{
    public function viewDashboard(Request $req){
        return Inertia::render('Dashboard',["students" => Student::where('user_id',Auth::id())->get()]);
    }
    public function create(Request $req){
        $validate = $req->validate([
            "name"=> "required",
            "age" => "required",
            "image" => "required"
        ]);
        $imageName = "".uniqid().".".$req->image->extension()."";
        $req->image->move(public_path('uploads'),$imageName);

        $student = new Student();
        $student->name = $req->name;
        $student->age = $req->age;
        $student->status = $req->status;
        $student->image = $imageName;
        $student->user_id = Auth::id();

        $student->save();
    }
    public function destroy($id,$image){
        $filePath = public_path('uploads/'.$image.'');
        try{
            if(File::exists($filePath)){
                File::delete($filePath);
            }
            Student::where('id',$id)->delete();
        }catch(Exception $e){
            echo $e;
        }
    }
    public function update(Request $req){
        $validate = $req->validate([
            "name" => "required",
            "age" => "required",
            "image" => "required"
        ]);
        if(gettype($req->image) != "string"){
            $student = Student::where('id',$req->id)->get();
            $filePath = public_path('uploads/'.$student[0]->image.'');

            $imageName = "".uniqid().".".$req->image->extension()."";

            if(File::exists($filePath)){
                File::delete($filePath);
            }

            $imageName = "".uniqid().".".$req->image->extension()."";
            $req->image->move(public_path('uploads'),$imageName);

            $data = [
                "name" => $req->name,
                "age" => $req->age,
                "status" => $req->status,
                "image" => $imageName
            ];
        }else{
            $data = [
                "name" => $req->name,
                "age" => $req->age,
                "status" => $req->status
            ];
        }
        
        Student::where('id',$req->id)->update($data);
    }
}
