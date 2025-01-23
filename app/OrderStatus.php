<?php

namespace App;

enum OrderStatus: int
{
    case PENDING = 0;

    case CREATED = 1;

    case COMPLETED = 2;

    case PAID = 3;

    case CANCELLED = 4;

    case DECLINED = 5;

    case SENT = 6;
}
