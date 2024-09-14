import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GlobalServicesService, Option } from '../appService';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  validationUserMessage = {
    firstName: [{ type: 'required', message: 'à renseigner' }],
    lastName: [{ type: 'required', message: 'à renseigner' }],
    contact: [{ type: 'required', message: 'à renseigner' }],
    option: [{ type: 'required', message: 'à renseigner' }],
    sexe: [{ type: 'required', message: 'à renseigner' }],
  };
  validationFormContact: FormGroup;
  Options: Option[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private allServices: GlobalServicesService
  ) {
    this.validationFormContact = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      contact: new FormControl('', Validators.compose([Validators.required])),
      option: new FormControl('', Validators.compose([Validators.required])),
      sexe: new FormControl('', Validators.compose([Validators.required])),
    });

    this.allServices.getOptions().subscribe((res) => {
      this.Options = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as unknown as Option;
      });
    });
  }

  submitForm() {
    if (
      this.validationFormContact.valid &&
      this.verifContact(this.validationFormContact.value.contact)
    ) {
      this.allServices.createProspect(
        this.validationFormContact.value.firstName,
        this.validationFormContact.value.lastName,
        this.validationFormContact.value.contact,
        this.validationFormContact.value.sexe,
        this.validationFormContact.value.option
      );
      this.validationFormContact.reset();
    } else {
      this.allServices.toastAMessage(
        'Faute',
        'revérifier le formulaire',
        'warning'
      );
    }
  }

  verifContact(contact: number) {
    let contactStr = contact.toString();
    if (
      contactStr.length != 9 ||
      (contactStr.slice(0, 2) != '62' &&
        contactStr.slice(0, 2) != '65' &&
        contactStr.slice(0, 2) != '67' &&
        contactStr.slice(0, 2) != '68' &&
        contactStr.slice(0, 2) != '69')
    ) {
      this.allServices.toastAMessage(
        'Faute',
        "l'un des champs contact est mal renseigné, il doit avoir 9 chiffres et commencé par 62,65,67,68 ou 69",
        'warning'
      );
      return false;
    } else {
      return true;
    }
  }
}
