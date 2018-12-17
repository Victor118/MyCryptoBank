import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apis, ChainConfig} from "bitsharesjs-ws";
import {ChainStore} from "bitsharesjs";
import {LoadingService} from './services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyCryptoBank';

  private coreAsset;

  
  
  constructor (private router: Router,private loadingService:LoadingService) {
    this.init();


    
  }

  public init = async ()=>{
    this.loadingService.loading = true;
    //Synchrone Bitshares connection
    let result = await this.initBitsharesConnection();
    await this.initChainStore(result);
    // ChainStore.subscribe((object)=>{
    //   console.log("chainStore has changed ...");
    //   console.log(object);
    // })
    //Bitshares connexion OK
    // ChainStore.subscribe(()=>{
    //   let account = ChainStore.getObject('1.2.421280');
    //   console.log(account);
    // });
    //  Apis.instance()
    // .db_api()
    // .exec("get_full_accounts", [["victor118"], true]);
    this.loadingService.loading = false;
    console.log("URL : " +this.router.url);
    if(this.router.url === '/'){

      this.router.navigate(['/login']);
    }else{
      this.router.navigate([this.router.url]);
    }
  }

  private  initBitsharesConnection= async ():Promise<void>=>{
   return  Apis.instance(
        "wss://node.bitshares.eu",
       //"wss://bitshares.openledger.info/ws",
        true
    ).init_promise.then((object)=>{
      console.log(object);
      console.log("connection OK !");


      // Apis.instance()
      // .db_api()
      // .exec("get_assets", [["1.3.0"], false]).then((asset)=>{
      //   console.log("assets");
      //   console.log(asset);
      // });


      return object;
    },(error)=>{
      console.log("ERREUR INITIALISATION CHAIN STORE");
      console.log(error);
      //try to reconnect
    

      this.initBitsharesConnection();
    }).catch((e)=>{
      console.log("CATCH INITIALISATION CHAIN STORE");
      console.log(e);
    });
  }

  private initChainStore = async (result)=>{
    
      this.coreAsset = result[0].network.core_asset;
      console.log("Core asset : ");
      console.log(this.coreAsset);
      return <Promise<void>>ChainStore.init();
  
  }
}
