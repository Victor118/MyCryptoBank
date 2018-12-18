import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import {Asset} from '../models/asset';
import {ChainStore} from "bitsharesjs";
import {MarketService} from '../services/market.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  account;

  balances;

  public assets:Array<Asset>=[
    {
      asset_type:"1.3.0",
      symbol:"BTS",
      balance:0
    },
    {
      asset_type:"1.3.121",
      symbol:"bitUSD",
      balance:0
    },
    {
      asset_type:"1.3.113",
      symbol:"bitCNY",
      balance:0
    },
    {
      asset_type:"1.3.861",
      symbol:"open.BTC",
      balance:0
    }
  ];

  data:any;

  options = {
    title:{
      display:false
    },
    legend:{
      display:false
    }
  }

  constructor(private accountService:AccountService,private marketService:MarketService) { 
    this.accountService.getAccount().subscribe((account)=>{
      console.log("something change in fullaccount ");
      console.log(account);
    })

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
         
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: true,
              borderColor: '#4bc0c0'
          }
      ]
  }
  }

  ngOnInit() {
    this.account = this.accountService.fullAccount;
    this.balances = this.accountService.fullAccount.balances;
    for (let key in this.balances) {
      this.assets.forEach((asset)=>{
        if(asset.asset_type == key){
          ChainStore.subscribe(()=>{
            let balance = ChainStore.getObject( this.balances[key],true);
           
            console.log("BALANCE SUBSCRIBER");
            console.log(balance);
            if(balance){
              balance = balance.toJS();
              console.log(balance);
              asset.balance = parseInt(balance.balance);

            }
          })
          
        }
      })
    }
    let dateStart = new Date();
    let dateEnd = new Date();
    dateStart.setDate( dateStart.getDate() - 10);
    let dateStartString = dateStart.getFullYear() + "-" + ("0"+(dateStart.getMonth()+1)).slice(-2) + "-" +("0" + dateStart.getDate()).slice(-2)+ "T" + ("0" + dateStart.getHours()).slice(-2) + ":" + ("0" + dateStart.getMinutes()).slice(-2)+ ":" + ("0" + dateStart.getSeconds()).slice(-2);
    let dateEndString = dateEnd.getFullYear() + "-" + ("0"+(dateEnd.getMonth()+1)).slice(-2) + "-" +("0" + dateEnd.getDate()).slice(-2)+ "T" + ("0" + dateEnd.getHours()).slice(-2) + ":" + ("0" + dateEnd.getMinutes()).slice(-2)+ ":" + ("0" + dateEnd.getSeconds()).slice(-2);
    console.log(dateEndString);
    console.log(dateStartString);
    this.marketService.getTradeHistory("BTS","USD",dateEndString,dateStartString).then((data)=>{
      console.log("Market data ");
      console.log(data);
      //console.log(data.toJS());
    }, (error)=>{
      console.log("Market data error ");
      console.log(error);
    })

    console.log("BALANCES ...");
    console.log(this.balances);
  }

}
