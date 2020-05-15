import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  faUpload = faUpload;

  categoryForm;
  groups;

  imagePath;
  selectedFile: File;

  selectedValue;

  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private categoryGroupService: CategoryGroupService,
    private imageService: ImageService
  ) {
  }

  ngOnInit(): void {
    this.getCategoryGroups();
    console.log(this.data);
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      name: [this.data?.name, Validators.required],
      group_id: [this.data?.group.id, Validators.required],
      image: []
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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    }
  }

  getCategoryImage() {
    return this.imageService.getCategoryImageUrl(this.data.img);
  }

  get name() {
    return this.categoryForm.get('name');
  }

  get group_id() {
    return this.categoryForm.get('group_id');
  }

  submit() {
    let formData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile['name']);
    }

    for (var key in this.categoryForm.value) {
      if (this.categoryForm.value.hasOwnProperty(key) && key != 'image') {
        console.log(key + ": " + this.categoryForm.value[key]);
        formData.append(key, this.categoryForm.value[key]);
      }
    }

    this.dialogRef.close(formData);
  }

}
