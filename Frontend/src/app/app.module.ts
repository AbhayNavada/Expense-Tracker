import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportService } from './services/report/report.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { TopNavBarComponent } from './components/user/top-nav-bar/top-nav-bar.component';
import { SideNavBarComponent } from './components/user/side-nav-bar/side-nav-bar.component';
import { ContentComponent } from './components/user/content/content.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { AdminTopNavBarComponent } from './components/admin/admin-top-nav-bar/admin-top-nav-bar.component';
import { AdminSideNavBarComponent } from './components/admin/admin-side-nav-bar/admin-side-nav-bar.component';
import { AdminContentComponent } from './components/admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';
import { ApproveghComponent } from './components/admin/admin-content/approvegh/approvegh.component';
import { RemoveghComponent } from './components/admin/admin-content/removegh/removegh.component';
import { InvitationComponent } from './components/user/content/invitation/invitation.component';
import { AddmemberComponent } from './components/user/content/addmember/addmember.component';
import { UploadbillComponent } from './components/user/content/uploadbill/uploadbill.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { InitialComponent } from './components/user/content/transactions/initial/initial.component';
import { CompletedComponent } from './components/user/content/transactions/completed/completed.component';
import { ApprovedComponent } from './components/user/content/transactions/approved/approved.component';
import { UnapprovedComponent } from './components/user/content/transactions/unapproved/unapproved.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GroupReportComponent } from './components/user/content/reports/group-report/group-report.component';
import { IndividualInGroupReportComponent } from './components/user/content/reports/individual-in-group-report/individual-in-group-report.component';
import { IndividualReportComponent } from './components/user/content/reports/individual-report/individual-report.component';
import { ViewMembersComponent } from './components/user/content/view-members/view-members.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    TopNavBarComponent,
    SideNavBarComponent,
    ContentComponent,
    FooterComponent,
    AdminTopNavBarComponent,
    AdminSideNavBarComponent,
    AdminContentComponent,
    AdminFooterComponent,
    ApproveghComponent,
    RemoveghComponent,
    InvitationComponent,
    AddmemberComponent,
    UploadbillComponent,
    ForgotPasswordComponent,
    InitialComponent,
    CompletedComponent,
    ApprovedComponent,
    UnapprovedComponent,
    ResetPasswordComponent,
    GroupReportComponent,
    IndividualInGroupReportComponent,
    IndividualReportComponent,
    ViewMembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
