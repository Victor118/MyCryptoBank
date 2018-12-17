import { Injectable } from '@angular/core';
import  {Apis} from "bitsharesjs-ws";

@Injectable()
export class MarketService {

  constructor() { }


  public getTradeHistory = (base:string,quote:string,dateStart:string,dateEnd:string)=>{

    return Apis.instance().db_api().exec( "get_trade_history", [ base,quote,dateStart,dateEnd,10 ] );

  }

  public getMarketHistory = (base:string,quote:string,periode:number,dateStart:string,dateEnd:string)=>{

    return Apis.instance().db_api().exec( "get_market_history", [ base,quote,periode,dateStart,dateEnd ] );

  }

}
