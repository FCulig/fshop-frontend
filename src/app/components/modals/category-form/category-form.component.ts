import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryGroupService } from 'src/app/services/category-group.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  categoryForm;
  groups;

  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private categoryGroupService: CategoryGroupService) { }

  ngOnInit(): void {
    this.getCategoryGroups();
    console.log(this.data);
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      name: [this.data?.name, Validators.required],
      group_id: [this.data?.group_id, Validators.required]
    });
  }

  getCategoryGroups() {
    this.categoryGroupService.getAllCategoryGroups().subscribe(val => {
      this.groups = val;
      console.log(val);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  get name() {
    return this.categoryForm.get('name');
  }

  get group_id() {
    return this.categoryForm.get('group_id');
  }

  submit() {
    this.dialogRef.close(this.categoryForm.value);
  }

}
