import { Component, OnInit, Input } from "@angular/core";
import { CommentService } from "src/app/services/comment.service";
import { Validators, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input() productId;
  @Input() comments;
  
  commentForm;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment: [null, Validators.required],
      user_id: [
        this.authenticationService.currentUserValue.user.id,
        Validators.required
      ]
    });
  }

  getComments() {
    this.commentService.getCommentsOnProduct(this.productId).subscribe(val => {
      this.comments = val;
      console.log(val);
    });
  }

  submit() {
    this.commentService
      .commentOnProduct(this.productId, this.commentForm.value)
      .subscribe(val => {
        if (val.id) {
          this.notificationService.showSuccessNotification(
            "Uspjeh",
            "Ostavili ste komentar na proizvodu!"
          );
          this.getComments();
        }
      });
  }

  get comment() {
    return this.commentForm.get("comment");
  }
}
