import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'

import { EtudiantService } from './etudiant.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COURS';

  departements:any;
  etudiants:any;
  myForm:FormGroup;

  constructor(private service:EtudiantService, private fb:FormBuilder){
    this.myForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      matricule:['',Validators.required],
      departement:['',Validators.required],
    })
    this.getDepartements();
    this.getEtudiants();

  }


  getDepartements(){
    this.service.getDepartement().subscribe({
      next:(response)=>{
        console.log(response)
        this.departements = response
      },
      error:(error)=>console.log(error)
    })
  }


  getEtudiants(){
    this.service.getEtudiants().subscribe({
      next:(response)=>{
        this.etudiants = response
      },
      error:(error)=>console.log(error)
    })
  }

  enregistrer(){
   
    if(this.myForm.valid){
     
      this.service.saveEtudiant(this.myForm.value).subscribe({
        next:(response)=>{
          this.myForm.reset()
          this.getDepartements()
          this.getEtudiants()
        },
        error:(error)=>console.error(error)
      })
    
    }
  }
}
