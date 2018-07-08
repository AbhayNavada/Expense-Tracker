import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminContentComponent } from './components/admin/admin-content/admin-content.component';
import { ApproveghComponent } from './components/admin/admin-content/approvegh/approvegh.component';
import { RemoveghComponent } from './components/admin/admin-content/removegh/removegh.component';
import { UserComponent } from './components/user/user.component';
import { ContentComponent } from './components/user/content/content.component';
import { InvitationComponent } from './components/user/content/invitation/invitation.component';
import { AddmemberComponent } from './components/user/content/addmember/addmember.component';
import { UploadbillComponent } from './components/user/content/uploadbill/uploadbill.component';
import { InitialComponent } from './components/user/content/transactions/initial/initial.component';
import { CompletedComponent } from './components/user/content/transactions/completed/completed.component';
import { ApprovedComponent } from './components/user/content/transactions/approved/approved.component';
import { UnapprovedComponent } from './components/user/content/transactions/unapproved/unapproved.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GroupReportComponent } from './components/user/content/reports/group-report/group-report.component';
import { IndividualInGroupReportComponent } from './components/user/content/reports/individual-in-group-report/individual-in-group-report.component';
import { IndividualReportComponent } from './components/user/content/reports/individual-report/individual-report.component';
import { ViewMembersComponent } from './components/user/content/view-members/view-members.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'forgotPassword',
		component: ForgotPasswordComponent
	},
	{
		path: 'resetPassword/:id',
		component: ResetPasswordComponent
	},
	{
		path: 'admin',
		component: AdminComponent,
		children: [
			{
				path: '',
				redirectTo: 'content',
				pathMatch: 'full'
			},
			{
				path: 'content',
				component: AdminContentComponent,
				children: [
					{
						path: '',
						redirectTo: 'approvegh',
						pathMatch: 'full'
					},
					{
						path: 'approvegh',
						component: ApproveghComponent
					},
					{
						path: 'removegh',
						component: RemoveghComponent
					}
				]
			}
		]
	},
	{
		path: 'user',
		component: UserComponent,
		children: [
			{
				path: '',
				redirectTo: 'content',
				pathMatch: 'full'
			},
			{
				path: 'content',
				component: ContentComponent,
				children: [
					{
						path: '',
						redirectTo: 'invitation',
						pathMatch: 'full'
					},
					{
						path: 'invitation',
						component: InvitationComponent
					},
					{
						path: 'viewMembers',
						component: ViewMembersComponent
					},
					{
						path: 'addmember',
						component: AddmemberComponent
					},
					{
						path: 'uploadbill',
						component: UploadbillComponent
					},
					{
						path: 'groupReport',
						component: GroupReportComponent
					},
					{
						path: 'individualInGroupReport',
						component: IndividualInGroupReportComponent
					},
					{
						path: 'individualReport',
						component: IndividualReportComponent
					},
					{
						path: 'initialtransaction',
						component: InitialComponent						
					},
					{
						path: 'completedtransaction',
						component: CompletedComponent						
					},
					{
						path: 'approvedtransaction',
						component: ApprovedComponent						
					},
					{
						path: 'unapprovedtransaction',
						component: UnapprovedComponent												
					}										
				]
			}
		]
	}
];

@NgModule({
	exports: [
		RouterModule
	],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
