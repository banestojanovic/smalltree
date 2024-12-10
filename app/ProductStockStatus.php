<?php

namespace App;

enum ProductStockStatus: int
{
    case OUT_OF_STOCK = 0;
    case IN_STOCK = 1;
}
