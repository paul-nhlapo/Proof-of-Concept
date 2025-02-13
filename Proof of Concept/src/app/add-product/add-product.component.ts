import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { Product } from '../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup; // Form group to hold the form controls
  brands: any[] = []; // Array to hold the brands
  productTypes: any[] = []; // Array to hold the product types
  product = {} as Product; // Empty product object
  selectedImage: File | null = null; // Variable to hold the selected image file

  constructor(
    private fb: FormBuilder, // FormBuilder for creating the form group
    private storeService: StoreService, // Service for interacting with the store
    private router: Router, // Router for navigation
    private route: ActivatedRoute, // ActivatedRoute for accessing route parameters
    private sanitizer: DomSanitizer // DomSanitizer for sanitizing URLs
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required], // Form control for product name with required validation
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Form control for product price with required validation and pattern validation for decimal numbers
      description: ['', Validators.required], // Form control for product description with required validation
      brandId: ['', Validators.required], // Form control for brand ID with required validation
      productTypeId: ['', Validators.required], // Form control for product type ID with required validation

    });

    // Fetch the brands from the store service and assign them to the brands array
    this.storeService.getBrands().subscribe((brands: any[]) => {
      this.brands = brands;
    });

    // Fetch the product types from the store service and assign them to the productTypes array
    this.storeService.getProductTypes().subscribe((productTypes: any[]) => {
      this.productTypes = productTypes;
    });
  }

  // Function to generate a safe URL for an image given its base64-encoded data
  getImageUrl(imageData: string): SafeUrl {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  // Event handler for file input change event
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0]; // Assign the selected image file to the selectedImage variable
    } else {
      this.selectedImage = null; // If no file is selected, set selectedImage to null
    }
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.productForm.valid) { // Check if the form is valid
      const product: Product = {
        name: this.productForm.value.name, // Get the value of the name form control
        price: this.productForm.value.price, // Get the value of the price form control
        description: this.productForm.value.description, // Get the value of the description form control
        brandId: this.productForm.value.brandId, // Get the value of the brandId form control
        productTypeId: this.productForm.value.productTypeId, // Get the value of the productTypeId form control
        image: 'this.productForm.value.image', // Set the image property to a string value (seems to be incorrect)
        dateCreated: new Date(), // Set the dateCreated property to the current date
        dateModified: new Date(), // Set the dateModified property to the current date
        isActive: true, // Set the isActive property to true
        isDeleted: false, // Set the isDeleted property to false
        productId: 0, // Set the productId property to 0
        productType: this.productTypes.find(pt => pt.productTypeId == this.productForm.value.productTypeId), // Find the product type object based on the selected product type ID
        brand: this.brands.find(b => b.brandId == this.productForm.value.brandId) // Find the brand object based on the selected brand ID
      };

      // Call the addProduct method of the store service to add the product
      this.storeService.addProduct(product).subscribe((response: any) => {
        window.alert('Product added successfully!'); // Show an alert message indicating successful product addition
      });
    }
  }
}
