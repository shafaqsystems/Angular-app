import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user-service.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading!: boolean;
  users!: any[];

  constructor(private userService: UserService, private route: ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  } 

  createUser(user?:any){
      const modalRef = this.modalService.open(CreateUserComponent, { centered: true });
      modalRef.componentInstance.userId = user.id;
      modalRef.result.then((result) => {
      }, (close) => {
          this.getUsers();
      })
  }
}
