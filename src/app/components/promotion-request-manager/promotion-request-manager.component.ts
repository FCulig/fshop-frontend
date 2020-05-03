import { Component, OnInit, ViewChild } from '@angular/core';
import { PromotionRequestsService } from 'src/app/services/promotion-requests.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { faTrash, faHourglassHalf, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, transition, style, animate } from '@angular/animations';
import * as Endpoints from './../../services/endpoints.json';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-promotion-request-manager',
  templateUrl: './promotion-request-manager.component.html',
  styleUrls: ['./promotion-request-manager.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PromotionRequestManagerComponent implements OnInit {
  faTrash = faTrash;
  faHourglassHalf = faHourglassHalf;
  faCheck = faCheck;
  faTimes = faTimes;

  requests: MatTableDataSource<PromotionRequestManagerComponent>;
  expandedElement;

  displayedColumns: string[] = ['id', 'username', 'status'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private promotionRequestService: PromotionRequestsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getPromotionRequests();
  }

  getPromotionRequests() {
    this.promotionRequestService.getAllPromotionRequests().subscribe(val => {
      this.requests = new MatTableDataSource(val);
      this.requests.paginator = this.paginator;
      this.requests.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.requests.filter = filterValue.trim().toLowerCase();

    if (this.requests.paginator) {
      this.requests.paginator.firstPage();
    }
  }

  getProfileImageUrl(url) {
    return Endpoints.BASE_URL + Endpoints.PROFILE_PICTURE + url;
  }

  approve(requestId) {
    this.promotionRequestService.approveRequest(requestId).subscribe(val => {
      if (val.id) {
        this.getPromotionRequests();
        this.notificationService.showSuccessNotification('Uspjeh!', 'Uspješno ste promovirali korisnika!');
      }
    });
  }

  decline(requestId) {
    this.promotionRequestService.declineRequest(requestId).subscribe(val => {
      if (val.id) {
        this.getPromotionRequests();
        this.notificationService.showWarningNotification('Zahtjev za promociju je odbijen.', '');
      }
    });
  }

}
