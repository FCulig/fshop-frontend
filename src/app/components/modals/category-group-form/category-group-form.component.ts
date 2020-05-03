import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-group-form',
  templateUrl: './category-group-form.component.html',
  styleUrls: ['./category-group-form.component.scss']
})
export class CategoryGroupFormComponent implements OnInit {

  groupForm;

  constructor(
    public dialogRef: MatDialogRef<CategoryGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder, ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.groupForm = this.fb.group({
      name: [this.data?.name, Validators.required]
    });
  }

  get name() {
    return this.groupForm.get('name');
  }

  submit() {
    this.dialogRef.close(this.groupForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
