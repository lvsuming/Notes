import React from 'react';
class Slide extends React.Component{
    render(){
        return <div className="bq-banner-list" style={{height: 250,background: 'url('+process.env.PUBLIC_URL + '/images/bg-banner.jpg) no-repeat 0 0 / 100%'}}></div>
    }
}
export default Slide;