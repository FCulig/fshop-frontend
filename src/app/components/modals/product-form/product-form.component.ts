import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  faUpload = faUpload;

  productForm: FormGroup;
  selectedImages: Array<File> = [];

  categories;
  imagePaths = [];
  userId;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private authenticationService: AuthenticationService
  ) { }


  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(val => {
      this.categories = val;
    });

    this.userId = this.authenticationService.currentUserValue.user.id;

    this.productForm = this.fb.group({
      name: [this.data?.name, Validators.required],
      description: [this.data?.description, Validators.required],
      quantity: [this.data?.quantity, Validators.required],
      price: [this.data?.price, Validators.required],
      user_id: [this.userId, Validators.required],
      category_id: [this.data?.category_id, Validators.required],
      product_images: []
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    let formData = new FormData();
    for (let i = 0; i < this.selectedImages.length; i++) {
      formData.append('product_images[]', this.selectedImages[i], this.selectedImages[i]['name']);
    }

    for (var key in this.productForm.value) {
      if (this.productForm.value.hasOwnProperty(key) && key != 'product_images') {
        formData.append(key, this.productForm.value[key]);
      }
    }

    this.dialogRef.close(formData);
  }

  onFileChanged(event) {
    this.selectedImages = event.target.files;

    this.imagePaths = [];
    for (const key in this.selectedImages) {
      if (this.selectedImages.hasOwnProperty(key)) {
        let reader = new FileReader();
        reader.readAsDataURL(this.selectedImages[key]);
        reader.onload = (_event) => {
          this.imagePaths.push(reader.result);
        }
      }
    }
  }

  getProductImage(id) {
    return this.imageService.getProductImageUrl(id);
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get quantity() {
    return this.productForm.get('quantity');
  }

  get price() {
    return this.productForm.get('price');
  }

  get category_id() {
    return this.productForm.get('category_id');
  }

}
