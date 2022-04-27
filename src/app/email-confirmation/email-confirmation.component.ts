import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Step } from '../step.enum';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent {

  @ViewChild('emailModel', {static: false}) emailModel!: NgModel;
  @ViewChild('verificationCodeModel', {static: false}) verificationCodeModel!: NgModel;

  validVerificationCodes = ['3556','12345'];
  alreadyConfirmedEmails = ['123@123.com'];

  stepEnum  = Step;
  step: Step = Step.notSent;

  emailValidationErrors: string[] = [];
  verificationCodeValidationErrors: string[] = [];

  constructor() { }

  onClickSend(emailModel: NgModel) {
    this.emailValidationErrors = [];

    if (!emailModel.value) {
      this.emailValidationErrors.push('Please enter your email!');
    }

    if (emailModel.dirty && emailModel.invalid) {
      this.emailValidationErrors.push('Sorry, your email is invalid!');
    }

    if (this.alreadyConfirmedEmails.includes(emailModel.value)) {
      this.emailValidationErrors.push('Sorry, your email already confirmed!');
    }

    if (this.emailValidationErrors.length === 0) {
      this.step = Step.sent; 
    }

  }

  onClickConfirmEmail(verificationCodeModel: NgModel) {
    this.verificationCodeValidationErrors = [];

    if (!verificationCodeModel.value) {
      this.verificationCodeValidationErrors.push('Please enter your verification code!');
    }

    if (verificationCodeModel.value && !this.validVerificationCodes.includes(verificationCodeModel.value.toString())) {
      this.verificationCodeValidationErrors.push('Sorry, your verification code is invalid!');
    }

    if (this.verificationCodeValidationErrors.length === 0) {
      this.step = Step.confirmed;
    }
  }

  handleKeyUp(event: any) {
    /* 'Enter' key */
    if (event.keyCode === 13){
      switch(this.step) {
        case Step.notSent: {
          this.onClickSend(this.emailModel);
          break;
        }
        case Step.sent: {
          this.onClickConfirmEmail(this.verificationCodeModel);
          break;
        }
      }
   }
  }
}
