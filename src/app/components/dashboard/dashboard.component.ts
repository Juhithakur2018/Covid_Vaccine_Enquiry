import { Component, OnInit } from '@angular/core';
import {VaccineService} from '../../services/vaccine.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /*pincode="";
  state="";
  district="";*/

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  stateList=[];
  districtList=[];


  constructor(private vaccineService:VaccineService,
  private _formBuilder: FormBuilder
  ) { 

  	this.firstFormGroup = this._formBuilder.group({
      state: ['', Validators.required],
      district: ['',Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      pincode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
    });
  }


  ngOnInit(): void {
  	
    this.callStates();

  }

  get secondFormGroupControl() {
    return this.secondFormGroup.controls;
  }

  get firstFormGroupControl() {
    return this.firstFormGroup.controls;
  }

  callStates(){
  this.vaccineService.getAllStates().subscribe(data => {
  this.stateList=data.states;
  //console.log(this.stateList);
  }, error => console.log(error));
  }

  callDistricts(){
  this.vaccineService.getAllDistricts(parseInt(this.firstFormGroup.value.state)).subscribe(data => {
  	this.districtList=data.districts;
  	//console.log(data);
  }, error => console.log(error));
  }

  searchByPin(){
  console.log("I am from pincode!");
  if(this.secondFormGroup.value.pincode && !this.secondFormGroupControl.pincode.invalid){
  console.log(this.secondFormGroup.value.pincode)
  }
 
  }

  searchByDistrict(){
	  if(this.firstFormGroup.value.state && this.firstFormGroup.value.district){
	  	console.log(this.firstFormGroup.value.state,this.firstFormGroup.value.district);
	  } 
  }

}
