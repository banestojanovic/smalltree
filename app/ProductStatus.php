<?php

namespace App;

enum ProductStatus: int
{
    case INACTIVE = 0;
    case ACTIVE = 1;
    case DRAFT = 2;
    case TRASHED = 3;
}
