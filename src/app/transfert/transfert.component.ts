import { Component, OnInit } from '@angular/core';
import { TransfertService } from '../services/transfert.service';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.scss']
})
export class TransfertComponent implements OnInit {

  text: string;

  results: {name:string,id:string}[];

    constructor(private transfertService:TransfertService,private accountService:AccountService) {
    
        
       }
    
      ngOnInit() {
      }

      public transfert = ()=>{
        this.transfertService.transfert();
      }

      public search(event) {

        console.log(event.query);
        this.accountService.lookupAccounts(event.query).then((data)=>{
          console.log("Resultat du lookup :");
          console.log(data);
          if(data !== undefined){
            this.results=[];
            data.forEach((d)=>{
              this.results.push({name:d[0],id:d[1]});
            })
          }
        })
    }
}