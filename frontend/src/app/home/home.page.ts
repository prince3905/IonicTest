import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, AlertInput, IonAlert } from '@ionic/angular';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: any[] = [];

  showAlert = false;
  formData: any = {};
  incrementedProfileId: any;

  constructor(
    private alertController: AlertController,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.getAllItems();
    this.getAllUser();
  }

  async presentAlert() {
    const randomProfileId = Math.floor(10 + Math.random() * 90);
    const randomUserData = await this.user.getRandomUser().toPromise();
    const user = randomUserData.results[0];
    if (user) {
      const inputData = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        gender: user.gender,
        country: user.location.country,
        profile: user.picture.large,
      };

      const alert = await this.alertController.create({
        header: 'FETCHED DATA',
        inputs: [
          {
            name: 'id',
            type: 'number',
            placeholder: 'Profile ID',
            value: randomProfileId,
          },
          {
            name: 'name',
            type: 'text',
            placeholder: 'Name',
            value: inputData.name,
          },
          {
            name: 'gender',
            type: 'text',
            placeholder: 'Gender',
            value: inputData.gender,
          },
          {
            name: 'country',
            type: 'text',
            placeholder: 'Country',
            value: inputData.country,
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
                const response = await this.user
                  .addUser({
                    id: data.id, 
                    name: data.name,
                    gender: data.gender,
                    country: data.country,
                    profile: inputData.profile,
                  })
                  .toPromise();
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
  }

  async deleteUser(userId: number) {
    try {
      await this.user.deleteUser(userId).toPromise();
      console.log('User deleted with ID:', userId);
      // this.users = this.users.filter((user) => user.id !== userId);
      this.getAllItems();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }

  getAllItems(): void {
    this.user.getAllUsers().subscribe((response: any) => {
      this.users = response;
      this.getAllUser();
    });
  }

  getAllUser(): void {
    this.user.getRandomUser().subscribe((response: any) => {
      const user = response.results[0];
      console.log('User', user);
      if (user) {
        this.formData.name = `${user.name.title} ${user.name.first} ${user.name.last}`;
        this.formData.gender = user.gender;
        this.formData.country = user.location.country;
        this.formData.profile = user.picture.large;
      }
    });
  }
}
