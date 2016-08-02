import {Selector} from '../../src/index.js';

import React, { Component ,PropTypes} from 'react';
import ReactDom from 'react/lib/ReactDOM';


class Demo extends Component{

    render(){
        return (
            <div>
                <Selector></Selector>
            </div>
        )
    }
}



ReactDom.render(
    <Demo></Demo>,
    document.getElementById('root')
);