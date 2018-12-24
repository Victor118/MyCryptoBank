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
      balance:0,
      data:{
      labels: ['', '', '', '', '', '', '','','',''],
      datasets: [
          {
         
              data: [0.65, 0.59, 0.80, 0.81, 0.56, 0.55, 0.40,0.35,0.23,0.90],
              fill: true,
              borderColor: '#4bc0c0'
          }
      ]
  }
    },
    {
      asset_type:"1.3.121",
      symbol:"bitUSD",
      balance:0,
      data:{
      labels: ['', '', '', '', '', '', '','','',''],
      datasets: [
          {
         
              data: [65, 59, 80, 81, 56, 55, 40,35,23,90],
              fill: true,
              borderColor: '#4bc0c0'
          }
      ]
  }
    },
    {
      asset_type:"1.3.113",
      symbol:"bitCNY",
      balance:0,
      data:{
      labels: ['', '', '', '', '', '', '','','',''],
      datasets: [
          {
         
              data: [65, 59, 80, 81, 56, 55, 40,35,23,90],
              fill: true,
              borderColor: '#4bc0c0'
          }
      ]
  }
    },
    {
      asset_type:"1.3.861",
      symbol:"OPEN.BTC",
      balance:0,
      data:{
      labels: ['', '', '', '', '', '', '','','',''],
      datasets: [
          {
         
              data: [65, 59, 80, 81, 56, 55, 40,35,23,90],
              fill: true,
              borderColor: '#4bc0c0'
          }
      ]
  }
    }
  ];

  data:any;

  options = {
    
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      },
  
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
      labels: ['', '', '', '', '', '', ''],
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
    this.assets.forEach(async(asset)=>{
      let dataCopy={
        labels: ['', '', '', '', '', '', '','','',''],
        datasets: [
            {
           
                data: [],
                fill: true,
                borderColor: '#4bc0c0'
            }
        ]
    }
      let dateStart = new Date();
      let dateEnd = new Date();
      for(let i =0;i<10;i++){

        dateStart.setDate( dateStart.getDate() - 1);
        dateEnd.setDate( dateStart.getDate());
        let dateStartString = dateStart.getFullYear() + "-" + ("0"+(dateStart.getMonth()+1)).slice(-2) + "-" +("0" + dateStart.getDate()).slice(-2)+ "T00:00:00"; 
        let dateEndString = dateEnd.getFullYear() + "-" + ("0"+(dateEnd.getMonth()+1)).slice(-2) + "-" +("0" + dateEnd.getDate()).slice(-2)+ "T23:59:59"; 
        console.log(dateEndString);
        console.log(dateStartString);
        if(asset.symbol !== "bitUSD"){
          let data = await this.marketService.getTradeHistory("USD",asset.symbol,dateEndString,dateStartString);
          if(data && data.length>0){
            console.log("resultat du market data",data);
            dataCopy.datasets[0].data[i]=parseFloat(data[0].price);
            
          }else if(i>0){
            dataCopy.datasets[0].data[i]=asset.data.datasets[0].data[i-1];
          }else{
            dataCopy.datasets[0].data[i]=0;
          }

          asset.data = Object.assign({}, dataCopy);
        }

 
      }
      console.log("Asset data :",asset.data);

    });
  }

}
