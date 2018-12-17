import { Injectable } from '@angular/core';
import {Apis} from "bitsharesjs-ws";
import {Login} from "bitsharesjs";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {ChainStore} from "bitsharesjs";

@Injectable()
export class AccountService {

  public fullAccount;

  private account = new Subject<any>();



  constructor() { }


  setAccount(account: any) {
      this.account.next(account);
  }


  getAccount(): Observable<any> {
      return this.account.asObservable();
  }



  public  verifyKeys =  (accountName:string,password:string,subscribe:boolean)=>{

    return new Promise( (resolve, reject) => { 

      let verifyAccountKey = () =>{
        console.log("Verify account keys");
        let account = ChainStore.getAccount(accountName,true);
         if(account){
              account = account.toJS();
              console.log(account);
              console.log(account.active.key_auths);
     

              let auths;
              let hasKey=  false;
              if(account.active.key_auths !== undefined){
                account.active.key_auths.forEach((key,index)=>{
                  auths = {
                    "active":[[account.active.key_auths[index][0]]]
                  }
                  console.log("Auths a verifier (active) : ");
                  console.log(auths);
                  let success =  Login.checkKeys({accountName:accountName, password:password, auths});
                  console.log("le result de checkkeys : ");
                  console.log(success);
                  if(success){
                    hasKey = true;
                  }
                });
                account.owner.key_auths.forEach((key,index)=>{
                  auths = {
                    "owner":[[account.owner.key_auths[index][0]]]
                  }
                  console.log("Auths a verifier (owner) : ");
                  console.log(auths);
                  let success =  Login.checkKeys({accountName:accountName, password:password, auths});
                  console.log("le result de checkkeys : ");
                  console.log(success);
                  if(success){
                    hasKey = true;
                    
                  }
                })

              }
              //Memo key verification
                auths = {
                  "memo":[account.options.memo_key[0][0]]
                }
                console.log("Auths a verifier (memo) : ");
                console.log(auths);
                let success =  Login.checkKeys({accountName:accountName, password:password, auths});
                console.log("le result de checkkeys : ");
                console.log(success);
                if(success){
                  hasKey = true;
                }
              
                if(hasKey){
                  this.fullAccount = account;
                 ChainStore.getAccount(account.id,true);
                  resolve(account);
                }else{
                  resolve(undefined);
                }
                ChainStore.unsubscribe(verifyAccountKey);
          }
      }

      ChainStore.subscribe(verifyAccountKey);
            
      });
       

  }

  


  public subscribeFullAccountChange= (accountId)=>{
    console.log("subscribe to "+accountId);

    Apis.instance()
    .db_api()
    .exec("get_full_accounts", [[accountId], true]).then((accounts)=>{
      console.log("getObject "+accountId);
      console.log(accounts);
      this.setAccount(accounts[0]);
    },
    (error)=>{
      console.log(error);
    });
  }
}
