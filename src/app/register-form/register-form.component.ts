import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('userPhoneInput', { static: true })
  userPhoneInput!: ElementRef;

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.form = new FormGroup({
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}'),
      ]),
    });

    if (
      localStorage.getItem('user-phone') !== null &&
      localStorage.getItem('user-email') !== null
    ) {
      let str = localStorage.getItem('user-phone')?.slice(3, 18);
      this.form.setValue({
        phone: str,
        email: localStorage.getItem('user-email'),
      });
    }
  }
  onCreateMask(e: Event) {
    let matrix = '(9__) ___ __-__',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = (<HTMLInputElement>e.target).value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    (<HTMLInputElement>e.target).value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ''
        : a;
    });
  }

  onSubmit() {
    const formData = { ...this.form.value };
    const user = {
      phone: '+7 ' + this.form.value.phone,
      email: this.form.value.email,
    };

    const json = JSON.stringify(user);
    console.log('FormData JSON format', json);

    localStorage.setItem('user-phone', user.phone);
    localStorage.setItem('user-email', user.email);
  }
}
