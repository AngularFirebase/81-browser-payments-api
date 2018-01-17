import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';
import { PaymentService } from '../payment.service'

@Component({
  selector: 'payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.sass']
})
export class PaymentRequestComponent implements AfterViewInit {

  @Input() amount: number; // Total amount
  @Input() label: string; // Label for product/purchase

  elements: any;
  paymentRequest: any;
  prButton: any;

  // Element used to mount the button
  @ViewChild('payElement') payElement;

  constructor(private pmt: PaymentService) { }

  ngAfterViewInit() {

    // 1. instantiate a paymentRequest object
    this.paymentRequest = this.pmt.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        amount: this.amount,
        label: this.label,
      },
    });

    // 2. initalize elements
    this.elements = this.pmt.stripe.elements();


    // 3. register listener
    this.paymentRequest.on('source', async (event) => {
      console.log(event)

      // Fires when the user submits their card
      // Make an HTTP call to charge on the backend (using a timeout to simulate the response)
      setTimeout(() => {
        event.complete('success') 
      }, 1000)
    });

    

    // 4. create the button
    this.prButton = this.elements.create('paymentRequestButton', {
      paymentRequest: this.paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'buy', // 'default' | 'donate' | 'buy', 
          theme:  'dark' // 'dark' | 'light' | 'light-outline', 
        },
      }
    });

    // 5. mount the button asynchronously
    this.mountButton()


  }

  async mountButton() {
    const result = await this.paymentRequest.canMakePayment();
    
    if (result) {
      this.prButton.mount(this.payElement.nativeElement);
    } else {  
      console.error('your browser is old school!');
    } 

  }



}
