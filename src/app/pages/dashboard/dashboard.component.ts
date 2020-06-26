import { Component, OnInit } from "@angular/core";
import { Label } from "ng2-charts";
import { ChartType, ChartOptions, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { TransactionService } from "src/app/services/transaction.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { CommentService } from "src/app/services/comment.service";
import { UserService } from "src/app/services/user.service";
import { CouponService } from 'src/app/services/coupon.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "bottom",
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: "Broj prodanih proizvoda" },
  ];

  latestTransactions;
  latestTransactionMap = new Map<any, number>();
  latestComments;
  transactions;
  transactionsMap = new Map<any, number>();
  profits;
  coupons;

  newCoupon;

  displayedColumns: string[] = ['code', 'ammount', 'uses'];

  constructor(
    private transactionService: TransactionService,
    private authenticationService: AuthenticationService,
    private commentService: CommentService,
    private userService: UserService,
    private couponService: CouponService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.createCouponForm();
    this.getLatestTransactions();
    this.getLatestComments();
    this.getAllTransactions();
    this.getUsersProfits();
    this.getUsersCoupons();
  }

  createCouponForm() {
    this.newCoupon = this.fb.group({
      code: [null, Validators.required],
      ammount: [null, Validators.required],
      uses: [null, Validators.required],
      user_id: [this.authenticationService.currentUserValue.user.id, Validators.required]
    });
  }

  getLatestTransactions() {
    this.transactionService
      .getLatestUsersTransactions(
        this.authenticationService.currentUserValue.user.id
      )
      .subscribe((val) => {
        this.latestTransactions = val;
        this.latestTransactionMap = this.createTransactionsMap(val);
        this.latestTransactionMap.forEach((value, key) => {
          this.pieChartLabels.push(key.name);
          this.pieChartData.push(value);
        });
      });
  }

  getAllTransactions() {
    this.transactionService
      .getUsersTransactionsWithStauts(
        this.authenticationService.currentUserValue.user.id,
        3
      )
      .subscribe((val) => {
        this.transactions = val;
        this.transactionsMap = this.createTransactionsMap(val);
        this.transactionsMap.forEach((value, key) => {
          this.barChartLabels.push(key.name);
          this.barChartData[0].data.push(value);
        });
      });
  }

  createTransactionsMap(transactions) {
    const map = new Map<any, number>();

    transactions.forEach((transaction) => {
      const key = {
        id: transaction.product.id,
        name: transaction.product.name,
      };
      if (map.get(key) == null) {
        map.set(key, transaction.quantity);
      } else {
        map.set(key, map.get(key) + transaction.quantity);
      }
    });

    return map;
  }

  getLatestComments() {
    this.commentService
      .getLatestCommentsOnUsersProducts(
        this.authenticationService.currentUserValue.user.id
      )
      .subscribe((val) => {
        this.latestComments = val;
        console.log(val);
      });
  }

  getUsersProfits() {
    this.userService
      .getUsersProfit(this.authenticationService.currentUserValue.user.id)
      .subscribe((val) => {
        this.profits = val;
      });
  }

  getUsersCoupons() {
    this.couponService.getUsersCoupons(this.authenticationService.currentUserValue.user.id).subscribe(val => {
      this.coupons = val;
    });
  }

  addCoupon() {
    this.couponService.addNewCoupon(this.newCoupon.value).subscribe(val => {
      console.log(val);
      if (val.id) {
        this.notificationService.showSuccessNotification('Uspješno ste dodali novi kupon', '');
        this.getUsersCoupons();
        this.newCoupon.reset();
      } else {
        this.notificationService.showErrorNotification(val.message, '');
      }
    });
  }

  public get code() {
    return this.newCoupon.get('code');
  }

  public get ammount() {
    return this.newCoupon.get('ammount');
  }

  public get uses() {
    return this.newCoupon.get('uses');
  }

  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
  }
}
