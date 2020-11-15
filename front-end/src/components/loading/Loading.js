import React from 'react';
import './styles/loading.scss';

class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="loading" style={{ '--n': '5' }}>
                <div className="dot" style={{ '--i': '0' }} />
                <div className="dot" style={{ '--i': '1' }} />
                <div className="dot" style={{ '--i': '2' }} />
                <div className="dot" style={{ '--i': '3' }} />
                <div className="dot" style={{ '--i': '4' }} />
            </div>
        );
    }
}

export default Loading;