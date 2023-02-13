import React, { useState } from 'react';
import Item from '../../component/Product/Item'
import {HeaderApp} from '../../component/Header_Category/HeaderApp'

export function Product() {
    return (
        <div>
            <HeaderApp/>
            <h1>This is Product page</h1>
            <Item/>
        </div>
    )
}
