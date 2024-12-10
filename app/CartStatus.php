<?php

namespace App;

enum CartStatus: int
{
    case INACTIVE = 0;
    case ACTIVE = 1;
}
