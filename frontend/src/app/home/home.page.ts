import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, AlertInput, IonAlert } from '@ionic/angular';
import { UserService } from 'src/service/user.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{

  users: any[] = [];

  showAlert = false;
  formData: any = {};

  constructor(
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private user: UserService) {}

  ngOnInit(): void {
    this.getAllItems()
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'FETCHED DATA',
      inputs: [
        {
          name: 'id',
          type: 'number',
          placeholder: 'Profile ID',
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
        },
        {
          name: 'gender',
          type: 'text',
          placeholder: 'Gender',
        },
        {
          name: 'country',
          type: 'text',
          placeholder: 'Country',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: async (data) => {
            try {
              const response = await this.user.addUser(data).toPromise();
              console.log('User added:', response);
              this.users.push(response);
            } catch (error) {
              console.error('Failed to add user:', error);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  async deleteUser(userId: number) {
    try {
      await this.user.deleteUser(userId).toPromise();
      console.log('User deleted with ID:', userId);
      // this.users = this.users.filter((user) => user.id !== userId);
      this. getAllItems()
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }
  

  getAllItems(): void {
    this.user.getAllUsers().subscribe((response: any) => {
      this.users = response;
    });
  }

 
}
  
  
  
  
  

