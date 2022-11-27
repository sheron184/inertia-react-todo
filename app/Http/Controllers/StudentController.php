<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;

class StudentController extends Controller{
    public function viewDashboard(Request $req){
        return Inertia::render('Dashboard',["students" => Student::all()]);
    }
    public function create(Request $req){
        $imageName = "".uniqid().".".$req->image->extension()."";
        $req->image->move(public_path('uploads'),$imageName);

        $student = new Student();
        $student->name = $req->name;
        $student->age = $req->age;
        $student->status = $req->status;
        $student->image = $imageName;

        $student->save();
    }
}
