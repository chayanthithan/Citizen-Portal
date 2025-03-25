import { Component, inject, OnInit } from '@angular/core';
import { Income } from '../../model/income';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainService } from '../../service/main.service';
import { IncomeDto } from '../../model/incomeDto';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-income',
  imports: [FormsModule,CommonModule,NgToastModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{
  __main:MainService = inject(MainService)
  citizenId: any;
constructor(private toastr:ToastrService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.incomeDto.citizenId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('citizen id',this.citizenId)
  }

  incomeList: Income[] = Array(5).fill({}).map(() => ({
    incomeType: '',
    incomeSource: '',
    incomeValue: 0
  }));

  incomeDto: IncomeDto = {
    citizenId: '',
    incomes: []
  };
submitIncome() {
  // Filter out empty entries before submitting
  const nonEmptyIncomes = this.incomeList.filter(income => 
    income.incomeType && income.incomeSource && income.incomeValue
  );

  // this.incomeDto.citizenId = this.__main.loginDto.userId;
  this.incomeDto.incomes = nonEmptyIncomes;

  const getData = this.__main.addIncomeDetails(this.incomeDto);
  getData.subscribe({
    next: (response) => {
      this.toastr.success('Income added successfully!!');
      this.router.navigate(["/user-details"]);
    },
    error: (error) => {
      this.toastr.error('Failed to add income!!');
    }
  });
}

// submitIncome(){

// this.incomeDto.citizenId = this.__main.loginDto.userId;
// this.incomeDto.income = this.incomeList;
//   const getData = this.__main.addIncomeDetails(this.incomeDto);
//   getData.subscribe({
//     next:(response)=>{
//       this.toastr.success('income added successfully!!')
//     },error:(error)=>{
//       this.toastr.success('failed to add income!!')
//     }
//   })
// }
}
