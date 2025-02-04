@php
    $successfulPayment = !empty($payment) && $payment->isSuccess();
@endphp
<x-mail-layout>
    <!-- Main -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="px-50 mpx-15" style="padding-left: 50px; padding-right: 50px;">
                <!-- Section - Intro -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="pb-50" style="padding-bottom: 50px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="title-36 a-center pb-15"
                                        style="font-size:36px; line-height:40px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; text-align:center; padding-bottom: 15px;">
                                        <strong>{{ $successfulPayment ? __('mails.orders.paid.title') : __('mails.orders.failed.title') }}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-16 lh-26 a-center"
                                        style="font-size:16px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 26px; text-align:center;">
                                        {{ $successfulPayment ? __('mails.orders.paid.subtitle') : __('mails.orders.paid.subtitle') }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <!-- END Section - Intro -->

                <!-- Section - Order Details -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="pb-50" style="padding-bottom: 50px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="pb-30" style="padding-bottom: 30px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <th class="column-top" valign="top" width="230"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="title-20 pb-10"
                                                                style="font-size: 20px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; padding-bottom: 20px;">
                                                                <strong>{{ __('mails.orders.paid.details') }}</strong>
                                                            </td>
                                                        </tr>
                                                        @if(!empty($payment['BillToName']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.customer_name')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['BillToName']}}</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['email']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.customer_email') }}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['email']}}</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['amount']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.amount')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['amount']}}
                                                                    RSD
                                                                </td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['currency']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.currency')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">RSD</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['EXTRA_TRXDATE']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.timestamp')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['EXTRA_TRXDATE']}}</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['oid']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.oid')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['oid']}}</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['Response']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.response_code')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['Response'] === 'Approved' ? 'Odobreno' : 'Odbijeno'}}</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['AuthCode']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.auth_code')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['AuthCode']}}</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['TransId']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.trans_id')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['TransId']}}</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['ProcReturnCode']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.proc_return_code')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['ProcReturnCode']}}</td>
                                                            </tr>
                                                        @endif
                                                        @if(!empty($payment['mdStatus']))
                                                            <tr>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width: auto !important; padding-bottom: 10px;">{{__('mails.orders.payment_details.md_status')}}</td>
                                                                <td style="font-size: 14px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:right; min-width: auto !important; padding-bottom: 10px;">{{$payment['mdStatus']}}</td>
                                                            </tr>
                                                        @endif
                                                    </table>
                                                </th>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-40" style="padding-bottom: 40px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td class="img" height="1" bgcolor="#ebebeb"
                                                    style="font-size:0pt; line-height:0pt; text-align:left;">&nbsp;
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <!-- END Section - Order Details -->
            </td>
        </tr>
    </table>
    <!-- END Main -->
</x-mail-layout>
