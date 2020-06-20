import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-item.model';
import { WishesService } from '../../services/wishes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  nameItem = '';

  constructor(   private wishesService: WishesService, private route: ActivatedRoute) {
    const listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.wishesService.getList( listId );
   }

  ngOnInit() {
  }

  addItem() {

    if ( this.nameItem.length === 0 ) {
      return;
    }

    const newItem = new ListItem( this.nameItem );
    this.list.items.push( newItem );

    this.nameItem = '';
    this.wishesService.saveStorage();
  }

  changeCheck( item: ListItem ) {

    const notDone = this.list.items
                            .filter( itemData => !itemData.completed )
                            .length;

    if ( notDone === 0 ) {
      this.list.finishDate = new Date();
      this.list.completed = true;
    } else {
      this.list.finishDate = null;
      this.list.completed = false;
    }
    this.wishesService.saveStorage();
  }

  delete( i: number ) {
    this.list.items.splice( i, 1 );
    this.wishesService.saveStorage();
  }
}
