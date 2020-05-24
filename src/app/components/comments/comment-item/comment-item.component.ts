import { Component, OnInit, Input, Output } from "@angular/core";
import { ImageService } from "src/app/services/image.service";
import { CommentService } from "src/app/services/comment.service";
import { NotificationService } from "src/app/services/notification.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EventEmitter } from '@angular/core';

@Component({
  selector: "app-comment-item",
  templateUrl: "./comment-item.component.html",
  styleUrls: ["./comment-item.component.scss"]
})
export class CommentItemComponent implements OnInit {
  faTrash = faTrash;

  @Input() comment;
  @Output() refreshComments = new EventEmitter;

  profileImgUrl;
  canDelete = false;

  constructor(
    private imageService: ImageService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.profileImgUrl = this.imageService.getProfileImageUrl(
      this.comment.user.profile_img_url
    );
    this.checkIfUserCanDeleteComment();
  }

  checkIfUserCanDeleteComment() {
    if (
      this.authenticationService.currentUserValue &&
      this.authenticationService.currentUserValue.user.id
    ) {
      this.canDelete = true;
    }
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment.id).subscribe(val => {
      if (val.id) {
        this.notificationService.showSuccessNotification(
          "Komentar je uspješno obrisan!",
          ""
        );
        this.refreshComments.emit(val);
      }
    });
  }
}
