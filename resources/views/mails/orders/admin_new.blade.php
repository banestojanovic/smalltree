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
                                        <strong>{{ __('mails.orders.created.admin_title') . ' #' . $order->id }}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-16 lh-26 a-center"
                                        style="font-size:16px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 26px; text-align:center;">
                                        <strong>{{ __('mails.orders.created.admin_subtitle') }}</strong>
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
                                        <!-- Button -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td class="btn-20 btn-secondary c-white l-white" bgcolor="#f3189e"
                                                    style="font-size:16px; line-height:24px; mso-padding-alt:15px 35px; font-family:'PT Sans', Arial, sans-serif; text-align:center; font-weight:bold; text-transform:uppercase; min-width:auto !important; border-radius:10px; background: #26694a; color:#ffffff;">
                                                    <a href="#" target="_blank" class="link c-white"
                                                       style="display: block; padding: 15px 35px; text-decoration:none; color:#ffffff;">
                                                        <span class="link c-white"
                                                              style="text-decoration:none; color:#ffffff;">{{ __('mails.orders.created.order_id') }}: {{ $order->id }}</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- END Button -->
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-30" style="padding-bottom: 30px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <th class="column-top" valign="top" width="230"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="title-20 pb-10"
                                                                style="font-size:20px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; padding-bottom: 10px;">
                                                                <strong>{{ __('mails.orders.created.user_details') }}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-16"
                                                                style="font-size:16px; line-height:20px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important;">
                                                                {{ $order->user->name }}
                                                                <br />
                                                                {{ $order->shipping_address->phone }}
                                                                <br />
                                                                {{ $order->user->email }}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </th>
                                                <th class="column-top mpb-15" valign="top" width="30"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                <th class="column-top" valign="top" width="230"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="title-20 pb-10"
                                                                style="font-size:20px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; padding-bottom: 10px;">
                                                                <strong>{{ __('mails.orders.created.shipping_details') }}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-16"
                                                                style="font-size:16px; line-height:20px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important;">
                                                                {{ $order->shipping_address->address_line_1 }}
                                                                <br />
                                                                {{ $order->shipping_address->city }}
                                                                ,
                                                                {{ $order->shipping_address->postal_code }}
                                                            </td>
                                                        </tr>
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
                                @foreach($order->items as $key => $item)
                                    <tr>
                                        <td class="pb-30" style="padding-bottom: 30px;">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    @if($item->product->cover)
                                                        <th class="column-top" valign="top" width="110"
                                                            style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                            <div class="fluid-img"
                                                                 style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                <a
                                                                    href="{{ route('products.show', ['slug' => $item->product->slug]) }}"
                                                                    target="_blank"><img
                                                                        src="{{ $item->product->cover->original_url }}"
                                                                        border="0" width="110" height="100%"
                                                                        alt="" /></a>
                                                            </div>
                                                        </th>
                                                    @endif
                                                    <th class="column-top mpb-15" valign="top" width="30"
                                                        style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                    <th class="column-top" valign="top"
                                                        style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td class="title-20 pb-10"
                                                                    style="font-size:20px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; padding-bottom: 10px;">
                                                                    <strong>{{ $item->product->name}}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-16 lh-26 c-black"
                                                                    style="font-size:16px; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; line-height: 26px; color:#282828;">
                                                                    @if(!empty($order->cart['products'][$key]['variation']))
                                                                        <strong>{{$order->cart['products'][$key]['variation']['variation']['name']}}
                                                                            :</strong> {{ $order->cart['products'][$key]['variation']['value']  }}
                                                                        <br />
                                                                    @endif
                                                                    @if($item->price !== $item->real_price)
                                                                        <strong>{{ __('mails.orders.created.price_per_piece') }}
                                                                            :</strong>
                                                                        <span>{{ number_format($item->price, 2) }}rsd</span>
                                                                        <span style="text-decoration: line-through;">
                                                                            {{ number_format($item->real_price, 2) }}</span>
                                                                    @else
                                                                        <strong>{{ __('mails.orders.created.price_per_piece') }}
                                                                            :</strong>{{ number_format($item->real_price, 2) }}
                                                                        rsd
                                                                    @endif
                                                                    <br />
                                                                    <strong>{{ __('mails.orders.created.quantity') }}
                                                                        :</strong> {{ $item->quantity }}
                                                                    <br />
                                                                    @if($item->price !== $item->real_price)
                                                                        <strong>{{ __('mails.orders.created.price') }}
                                                                            :</strong>
                                                                        <span>{{ number_format($item->price * $item->quantity, 2) }}rsd</span>
                                                                        <span style="text-decoration: line-through;">
                                                                                {{ number_format($item->real_price * $item->quantity, 2) }}rsd</span>
                                                                    @else
                                                                        <strong>{{ __('mails.orders.created.price') }}
                                                                            :</strong> {{ number_format($item->price * $item->quantity, 2) }}
                                                                        rsd
                                                                    @endif
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </th>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                @endforeach
                                <tr>
                                    <td class="pt-10 pb-40" style="padding-top: 10px; padding-bottom: 40px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td class="img" height="1" bgcolor="#ebebeb"
                                                    style="font-size:0pt; line-height:0pt; text-align:left;">&nbsp;
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                @if($order->data['note'])
                                    <tr>
                                        <td class="pb-30" style="padding-bottom: 30px;">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <th class="column-top" valign="top" width="120"
                                                        style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td class="title-20 pb-10"
                                                                    style="font-size:16px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; padding-bottom: 10px;">
                                                                    <strong
                                                                        style="color: #282828; paddint-top: 6px;">{{ __('mails.orders.created.note') }}
                                                                        :</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-16"
                                                                    style="font-size:16px; line-height:16px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important;">
                                                                    {{ $order->data['note'] }}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </th>
                                                    <th class="column-top mpb-15" valign="top" width="30"
                                                        style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="pt-10 pb-40" style="padding-top: 10px; padding-bottom: 40px;">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td class="img" height="1" bgcolor="#ebebeb"
                                                        style="font-size:0pt; line-height:0pt; text-align:left;">&nbsp;
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                @endif
                                <tr>
                                    <td class="pb-30" style="padding-bottom: 30px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <th class="column-top" valign="top" width="120"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="title-20 pb-10"
                                                                style="font-size:16px; line-height:24px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; padding-bottom: 10px;">
                                                                <strong>{{ __('mails.orders.created.payment_method') }}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-16"
                                                                style="font-size:16px; line-height:16px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important;">
                                                                {{ $order->payment_method->getLabel() }}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </th>
                                                <th class="column-top mpb-15" valign="top" width="30"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                <th class="column-top" valign="top" width="340"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td align="right" class="pb-15"
                                                                style="padding-bottom: 15px;">
                                                                <table border="0" cellspacing="0" cellpadding="0"
                                                                       class="mw-100p">
                                                                    <tr>
                                                                        <td class="title-20 lh-30 a-right mt-left mw-auto"
                                                                            width="100"
                                                                            style="font-size:16px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 30px; text-align:right;">
                                                                            <strong>{{ __('mails.orders.created.subtotal') }}
                                                                                :</strong>
                                                                        </td>
                                                                        <td class="img mw-15" width="20"
                                                                            style="width: 100%; font-size:0pt; line-height:0pt; text-align:left;"></td>
                                                                        <td class="title-20 lh-30 mt-right"
                                                                            style="padding-left: 10px; font-size:16px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; line-height: 30px;">
                                                                            {{ number_format($order->amount, 2) }}rsd
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="title-20 lh-30 a-right mt-left"
                                                                            style="width: 100%; font-size:16px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 30px; text-align:right;">
                                                                            <strong>{{__('mails.orders.created.tax')}}
                                                                                :</strong>
                                                                        </td>
                                                                        <td class="img mw-15"
                                                                            style="font-size:0pt; line-height:0pt; text-align:left;"></td>
                                                                        <td class="title-20 lh-30 mt-right"
                                                                            style="font-size:16px; padding-left: 10px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; line-height: 30px;">
                                                                            20%
                                                                        </td>
                                                                    </tr>
                                                                    @if($order->shipping > 0)
                                                                        <tr>
                                                                            <td class="title-20 lh-30 a-right mt-left"
                                                                                style="width: 100%; font-size:16px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 30px; text-align:right;">
                                                                                <strong>{{__('mails.orders.created.shipping')}}
                                                                                    :</strong>
                                                                            </td>
                                                                            <td class="img mw-15"
                                                                                style="font-size:0pt; line-height:0pt; text-align:left;"></td>
                                                                            <td class="title-20 lh-30 mt-right"
                                                                                style="font-size:16px; padding-left: 10px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; line-height: 30px;">
                                                                                {{ number_format($order->shipping, 2) }}
                                                                                rsd
                                                                            </td>
                                                                        </tr>
                                                                    @endif
                                                                    @if ($order->discount > 0)
                                                                        <tr>
                                                                            <td class="title-20 lh-30 a-right mt-left"
                                                                                style="width: 100%; font-size:16px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 30px; text-align:right;">
                                                                                <strong>{{__('mails.orders.created.discount')}}
                                                                                    :</strong>
                                                                            </td>
                                                                            <td class="img mw-15"
                                                                                style="font-size:0pt; line-height:0pt; text-align:left;"></td>
                                                                            <td class="title-20 lh-30 mt-right"
                                                                                style="font-size:16px; padding-left: 10px; color:#282828; font-family:'PT Sans', Arial, sans-serif; text-align:left; min-width:auto !important; line-height: 30px;">
                                                                                {{ number_format($order->discount, 2) }}
                                                                                rsd
                                                                            </td>
                                                                        </tr>
                                                                    @endif
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="pt-10 pb-40"
                                                                style="padding-top: 10px; padding-bottom: 20px;">
                                                                <table width="100%" border="0" cellspacing="0"
                                                                       cellpadding="0">
                                                                    <tr>
                                                                        <td class="img" height="1" bgcolor="#ebebeb"
                                                                            style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                            &nbsp;
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right">
                                                                <!-- Button -->
                                                                <table border="0" cellspacing="0" cellpadding="0"
                                                                       class="mw-100p" style="min-width: 200px;">
                                                                    <tr>
                                                                        <td class="btn-20 btn-secondary c-white l-white"
                                                                            bgcolor="#f3189e"
                                                                            style="font-size:16px; line-height:24px; mso-padding-alt:15px 35px; font-family:'PT Sans', Arial, sans-serif; text-align:center; font-weight:bold; text-transform:uppercase; min-width:auto !important; border-radius:10px; background: #26694a; color:#ffffff;">
                                                                            <a href="#" target="_blank"
                                                                               class="link c-white"
                                                                               style="display: block; padding: 15px 35px; text-decoration:none; color:#ffffff;">
                                                                                <span class="link c-white"
                                                                                      style="text-decoration:none; color:#ffffff; text-transform: uppercase;">{{ __('mails.orders.created.total') }}: {{ number_format($order->total, 2) }}rsd</span>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <!-- END Button -->
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </th>
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
