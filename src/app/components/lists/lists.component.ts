import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
import { WishesService } from '../../services/wishes.service';
import { List } from '../../models/list.model';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  
  @ViewChild( IonList ) list: IonList;
  @Input() completed = true;

  constructor(  public wishesService: WishesService,
                private router: Router,
                private alertController: AlertController) { }

  ngOnInit() {}

  listSelected( list: List ) {

    if ( this.completed ) {
      this.router.navigateByUrl(`/tabs/tab2/add/${ list.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${ list.id }`);
    }
  }
  deleteList( list: List ) {
    this.wishesService.deleteList( list );

  }
  async editList( list: List ) {

    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if ( data.title.length === 0 ) {
              return;
            }
            list.title = data.title;
            this.wishesService.saveStorage();
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }
}
