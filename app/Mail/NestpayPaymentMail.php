<?php

namespace App\Mail;

use Cubes\Nestpay\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NestpayPaymentMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var Payment
     */
    protected $payment;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $payment = $this->payment;

        return $this->view('nestpay::email')->with('payment', $payment);
    }
}
