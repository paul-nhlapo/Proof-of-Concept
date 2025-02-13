import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ReportComponent } from './report/report.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './auth.guard';

// Define the routes for the application
const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route, maps to LoginComponent
  { path: 'login', component: LoginComponent }, // Route for login, maps to LoginComponent
  { path: 'register', component: RegisterComponent }, // Route for register, maps to RegisterComponent
  { path: 'products/:id', component: ProductListingComponent, canActivate: [AuthGuard] }, // Route for product listing, maps to ProductListingComponent and requires authentication
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] }, // Route for adding a product, maps to AddProductComponent and requires authentication
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] }, // Route for generating a report, maps to ReportComponent and requires authentication
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configure the router module with the defined routes
  exports: [RouterModule] // Export the configured router module
})
export class AppRoutingModule { } // Export the AppRoutingModule class
