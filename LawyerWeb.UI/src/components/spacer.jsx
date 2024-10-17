import React from 'react';

const Spacer = (props) => {
    const { width, height } = props;

    const spacerStyle = {
        width: width ? width : '100%',
        height: height ? height : '5rem'
    };

    return (
        <div style={spacerStyle}></div>
    );
};

export default Spacer;