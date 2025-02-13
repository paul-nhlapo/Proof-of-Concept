import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Product } from '../models/product.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {

  products: Product[] = []; // Array to store all products
  filteredProducts: Product[] = []; // Array to store filtered products
  searchText: string = ''; // Variable to store search text

  constructor(private storeService: StoreService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Fetch products from the store service
    this.storeService.getProducts().subscribe(response => {
      this.products = response; // Assign the fetched products to the 'products' array
      this.filteredProducts = response; // Assign the fetched products to the 'filteredProducts' array
    });
  }

  // Function to sort products in order
  InOrder(sortBy: string, sortOrder: string): void {
    this.products.sort((a, b) => {
      const x = (a as any)[sortBy]; // Get the value of 'sortBy' property from 'a' product
      const y = (b as any)[sortBy]; // Get the value of 'sortBy' property from 'b' product
      if (sortOrder === 'asc') {
        return x < y ? -1 : x > y ? 1 : 0; // Compare the values and return -1, 1, or 0 based on the sort order
      } else {
        return x > y ? -1 : x < y ? 1 : 0; // Compare the values and return -1, 1, or 0 based on the sort order
      }
    });
  }

  // Function to get the safe URL for an image
  getImageUrl(imageData: string): SafeUrl {
    const imageUrl = `data:image/jpeg;base64,${imageData}`; // Construct the image URL with base64 encoded image data
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl); // Return the safe URL for the image
  }

  // Function to filter products based on search text
  filterProducts() {
    const filterText = this.searchText.toLowerCase().trim(); // Convert the search text to lowercase and remove leading/trailing spaces
    this.filteredProducts = this.products.filter(product => {
      return (
        product.name.toLowerCase().includes(filterText) || // Check if product name includes the filter text
        product.description.toLowerCase().includes(filterText) || // Check if product description includes the filter text
        product.price.toString().toLowerCase().includes(filterText) || // Check if product price (converted to string) includes the filter text
        product.brand.name.toLowerCase().includes(filterText) || // Check if product brand name includes the filter text
        product.productType.name.toLowerCase().includes(filterText) // Check if product type name includes the filter text
      );
    });
  }
}
