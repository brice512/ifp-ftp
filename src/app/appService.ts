import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { state } from '@angular/animations';

export class Option {
  id: string;
  code: string;
  name: string;
  schoolFees: number;
  teachingUnits: string[];
  studyLevel: string;
  visibility: boolean;

  constructor(
    id: string,
    code: string,
    name: string,
    schoolFees: number,
    visibility: boolean,
    teachingUnits: string[],
    studyLevel: string
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.schoolFees = schoolFees;
    this.teachingUnits = teachingUnits;
    this.studyLevel = studyLevel;
    this.visibility = visibility;
  }
}

export class prospects {
  firstName: string;
  lastName: string;
  contact: string;
  sexe: string;
  option: string;
  id: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    contact: string,
    sexe: string,
    option: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.contact = contact;
    this.sexe = sexe;
    this.option = option;
    this.id = id;
  }
}
@Injectable({
  providedIn: 'root',
})
export class GlobalServicesService {
  private apiUrl = 'http://localhost:3000/send-email';
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor(
    private angularFireStore: AngularFirestore,
    private toastr: ToastrService,
    private fileStorage: AngularFireStorage,
    private ngFireAuth: AngularFireAuth
  ) {}

  toastAMessage(title: string, message: string, color: string) {
    if (color === 'success') {
      this.toastr.success(message, title);
    } else if (color === 'warning') {
      this.toastr.warning(message, title);
    } else {
      this.toastr.error(message, title);
    }
  }

  getOptions() {
    return this.angularFireStore.collection('options').snapshotChanges();
  }

  createProspect(
    firstName: string,
    lastName: string,
    contact: string,
    sexe: string,
    option: string
  ) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireStore
        .collection('prospects')
        .add({
          firstName: firstName,
          lastName: lastName,
          contact: contact,
          sexe: sexe,
          option: option,
          state: 'non contacté',
        })
        .then(
          (response) => {
            this.toastAMessage(
              'Enregistrement',
              'Inscription soumise',
              'success'
            );
          },
          (error) =>
            this.toastAMessage(
              'Enregistrement',
              'Problème de réseau. Veuillez vérifier votre connexion',
              'error'
            )
        );
    });
  }
}
