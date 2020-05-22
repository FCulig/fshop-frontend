import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-restock-product-form',
  templateUrl: './restock-product-form.component.html',
  styleUrls: ['./restock-product-form.component.scss']
})
export class RestockProductFormComponent implements OnInit {

  restockForm;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.restockForm = this.fb.group({
      quantity: [this.data?.quantity, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.quantity.value != this.data.quantity) {
      this.dialogRef.close(this.quantity.value);
    } else {
      this.dialogRef.close();
    }
  }

  get quantity() {
    return this.restockForm.get('quantity');
  }

}
