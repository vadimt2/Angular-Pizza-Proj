import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IProduct, IBellingAndShippInfo, IUser, IOrder, IOrderDetails } from '../../interfaces';
import { CartService, OrderDataService, OrderService, CurrencyService, AlertService } from '../../services';
import { BellingAndShippInfo, OrderDetails, Order, BellingOrShipping , User} from '../../common';

import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: IProduct[] = [];
  isAddressTheSame: boolean = false;
  theSameAddress: string = "theSameAddress";
  shippingPrice: number = null;
  cartTotal: number = 0;
  subTotal: number = 0;
  delivery: boolean = false;
  getCartInfo = null;
  checkoutForm: FormGroup;
  newCurrency:number = null;
  DisplayOnDevFeatures:boolean = false;
  selectedCurrency: string = null;
  showCurrencyPrice: boolean = false;
  loadingBtn:boolean = false;
 
 
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private cartService: CartService,
    private orderDataService: OrderDataService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.getCartInfo = this.orderDataService.tempCartInfo;

    if (!this.getCartInfo) {
      this.router.navigate(['/cart'])
    }

    // console.log(this.getCartInfo)
    this.products = this.cartService.orders;
    this.cartTotal = this.cartService.totalcartvalue;
     this.checkoutForm = this.formBuilder.group({
      firstNameB: new FormControl('', Validators.required),
      lastNameB: new FormControl('', Validators.required),
      emailB:  new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phoneB: new FormControl('', Validators.required),
      addressB: new FormControl('', Validators.required),
      address2B: new FormControl('', ),
      countryB: new FormControl('' , Validators.required),
      stateB: new FormControl('', Validators.required),
      zipB: new FormControl('', Validators.required),
      theSameAddress: new FormControl('',),
      firstNameSh: new FormControl('',),
      lastNameSh: new FormControl('', ),
      addressSh: new FormControl('', ),
      addressSh2: new FormControl('', ),
      countrySh: new FormControl('',),
      stateSh: new FormControl('',),
      zipSh: new FormControl('', ),
    });
    if(this.getCartInfo.shipping.title === "Delivery"){
      this.setSecAddressReq();
    }
    else{
      this.setSecNotAddressReq();
      this.setNotRequiredFiled("address2B");
    }

    if (this.products.length > 0) {
 
        this.products.map(product => {

          this.selectedCurrency = this.currencyService.currency;
          if(this.selectedCurrency === this.currencyService.defualtCurrency){
                 this.showCurrencyPrice = false;
          }
          else{
            this.showCurrencyPrice = true;
            product.currencyPrice = this.currencyService.currencyValue * product.price;
            this.newCurrency =  this.currencyService.currencyValue;
          }

          this.currencyService.currencyChangedString.subscribe((currencyString: string) => {
            this.selectedCurrency = currencyString;
  
            if (this.currencyService.defualtCurrency !== currencyString) {
              this.currencyService.currencyChangedValue.subscribe((currency: number) => {
                this.checkoutForm.setErrors({ 'invalid': true });
                product.currencyPrice = currency * product.price;
                this.newCurrency = currency;
                this.showCurrencyPrice = true;
                setTimeout(() => {
                  this.checkoutForm.setErrors(null);

                }, 1000);
              });
            }
            else {
              this.showCurrencyPrice = false;
            }
          });
          this.shippingPrice = this.getCartInfo.shipping.price;
          this.subTotal = this.cartService.getSubTotal();
          if(this.getCartInfo.shipping.title.toLowerCase() === "Delivery".toLowerCase()){
            this.delivery = true;
          }
        });
      return;
    }
    this.router.navigate(['/home'])
  }

  get f() { return this.checkoutForm.controls; }



  onItemChange(event) {
    if (event.target.name === this.theSameAddress && event.target.checked) {
      this.isAddressTheSame = true;
      this.setSecNotAddressReq();
      return;
    }
    else{
      this.setSecAddressReq();
      this.isAddressTheSame = false;
    }
  }
  
  setSecAddressReq(){
    this.setNotRequiredFiled("address2B");
      
    this.setRequiredFiled("firstNameSh");
    this.setRequiredFiled("lastNameSh");
    this.setRequiredFiled("addressSh");
    // this.setRequiredFiled("addressSh2");
    this.setRequiredFiled("countrySh");
    this.setRequiredFiled("stateSh");
    this.setRequiredFiled("zipSh");
  }

  setSecNotAddressReq(){
    this.setRequiredFiled("address2B");
      
    this.setNotRequiredFiled("firstNameSh");
    this.setNotRequiredFiled("lastNameSh");
    this.setNotRequiredFiled("addressSh");
    // this.setNotRequiredFiled("addressSh2");
    this.setNotRequiredFiled("countrySh");
    this.setNotRequiredFiled("stateSh");
    this.setNotRequiredFiled("zipSh");
  }


   setRequiredFiled(name:string){
    const filed:any = this.checkoutForm.get(name);
    filed.setValidators(Validators.required);
    filed.setErrors({ 'invalid': true });
   }

   setNotRequiredFiled(name:string){
    const filed:any = this.checkoutForm.get(name);
    filed.setValidators(null);
    filed.setErrors(null);
    console.log(filed)
   }



   onSubmit(form: FormGroup) {
    this.submitted = true;
    // this.alertService.clear();
    if (this.checkoutForm.invalid) {
      return;
  }

    if (this.checkoutForm.valid) {
      // Belling:
      let biilingInfo: IBellingAndShippInfo = new BellingAndShippInfo();
      biilingInfo.firstName = form.value.firstNameB;
      biilingInfo.lastName = form.value.lastNameB;
      biilingInfo.email = form.value.emailB;
      biilingInfo.phone = form.value.phoneB;
      biilingInfo.address = form.value.addressBB;
      biilingInfo.address2 = form.value.address2B;
      biilingInfo.country = form.value.countryB;
      biilingInfo.state = form.value.stateB;
      biilingInfo.zip = form.value.zipB;
      biilingInfo.bellingOrShipping = BellingOrShipping.belling;
      // biilingInfo.order = null;
      // biilingInfo.orderId = 0;
      biilingInfo.isTheSame = false;
      biilingInfo.isSaved = false;


      //Shipping is the same
      let shippingAddInfo: IBellingAndShippInfo = new BellingAndShippInfo();
      if (this.isAddressTheSame) {
        shippingAddInfo = biilingInfo;
        shippingAddInfo.bellingOrShipping = BellingOrShipping.shipping;
        shippingAddInfo.isTheSame = true;
        biilingInfo.isTheSame = true;
      }
      else {
        shippingAddInfo.firstName = form.value.firstNameB
        shippingAddInfo.lastName = form.value.lastNameB;
        shippingAddInfo.email = form.value.emailB;
        shippingAddInfo.phone = form.value.phoneB;
        shippingAddInfo.address = form.value.addressB;
        shippingAddInfo.address2 = form.value.address2B;
        shippingAddInfo.country = form.value.countryB;
        shippingAddInfo.state = form.value.stateB;
        shippingAddInfo.zip = form.value.zipB;
        shippingAddInfo.isTheSame = false;
        shippingAddInfo.bellingOrShipping = BellingOrShipping.shipping;
      }


      //IF USER IS REGISTERED:
      // WILL ME A SERVICE CALL BY ID FROM THE LOGIN DATA AUTH SERVICE


      // NOT REGISTERED WILL BE CREATED!!!
      let user: IUser = new User();
      user.email = biilingInfo.email;
      user.firstName = biilingInfo.firstName;
      user.lastName = biilingInfo.lastName;
      user.isRegistered = false;
      user.phone = biilingInfo.phone;
      user.roleId = 2;


      let order: IOrder = new Order();
      order.id = 0;
      order.note = this.getCartInfo.note;
      order.shippingId = this.getCartInfo.shipping.id;
      order.tax = 0;
      order.userId = 0;
      order.user = user;

      if(this.currencyService.defualtCurrency !==  this.selectedCurrency){
        order.shippingCost =  this.shippingPrice * this.newCurrency;
        order.total = (this.cartService.getSubTotal() + this.shippingPrice) * this.newCurrency;
        order.currencyValue = this.newCurrency;
      }
      else{
        order.total = this.cartService.getSubTotal() + this.shippingPrice;
        order.shippingCost =  this.shippingPrice;
      }
       order.currencyString = this.selectedCurrency;

      order.OrderDetails = new Array<OrderDetails>();
      this.cartService.orders.forEach(item => {
        let oderDetail: IOrderDetails = new OrderDetails();
        oderDetail.itemId = item.id;
        oderDetail.quantity = item.quantity;
        // will be chnaged as item price is not the sale price
        oderDetail.sellPrice = item.price;
        order.OrderDetails.push(oderDetail);
      })
      order.bellingAndShippInfo = new Array<IBellingAndShippInfo>();

      if (this.getCartInfo.shipping.id == 1) {
        order.bellingAndShippInfo.push(biilingInfo);
      }
      else {
        order.bellingAndShippInfo.push(biilingInfo);
        order.bellingAndShippInfo.push(shippingAddInfo);
      }

      // console.log(order);

      if(!this.loadingBtn){
        this.loadingBtn = true;
        this.orderService.inseret(order).subscribe((data: any) => {
          console.log(data)
          data.products = this.cartService.orders;
          // console.log(this.shippingPrice)
          // data.shipping.price = this.shippingPrice;
          // data.shipping.title = this.getCartInfo.shipping.title;
          if(data){
          this.cartService.totalcartvalue = 0;
          this.cartService.sendTotal(this.cartService.totalcartvalue);
          this.cartService.orders = [];
          this.cartService.deleteAllLocalSorage();
          this.loadingBtn = false;
          this.router.navigate(['/thank-you'], { state: { data: { data } } })
  
          }
         }, err => {
          this.loadingBtn = false;
          console.log(err)
        });
      }
      



    }


    //  form.value.shipping.title;


    // this.router.navigate(['/checkout'])
  }
}
