<?php

namespace App;

enum UserRole: int
{
    case SUPER_ADMIN = 1;
    case ADMIN = 2;
    case SUPPORT = 3;
    case USER = 4;
}
