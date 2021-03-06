import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth }  from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  isLoggedIn: boolean;

  constructor(
    public afs: AngularFirestore, //injecta
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone // Service NgZone remove  o aviso para scopo
  ) {
      this.afAuth.authState.subscribe(user => {
        if(user){
          this.userData= user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else{
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
   }

   SignIn(email, password){
     return this.afAuth.authState.signInWithEmailAndPassword(email, password)
     .then((result) => {
       this.ngZone.run(() => {
         this.router.navigate(['dashboard']);
       });
       this.SetUserData(result.user);
     }).catch((error) => {
       window.alert(error.message)
     })
   }

   //Sign up with email/password
    SignUp(email, password){
      return this.afAuth.authState.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
    }

    GoogleAuth(){
      return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    
    AuthLogin(provider){
      return this.afAuth.authState.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }

    SetUserData(user){
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }

      return userRef.set(userData , {
        merge: true
      })
    }

    SignOut(){
      return this.afAuth.authState.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      })
    }
  }
