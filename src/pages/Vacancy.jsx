import React from 'react';
import {Link} from "react-router-dom";

const Vacancy = (props) => {
    return (
        <section id="pricing" className="pricing" style={{padding: "30px"}}>
            {/*data-aos="fade-up"*/}
            <div className="container" >
                {/*data-aos="zoom-in" data-aos-delay="100"*/}
                <div className="col-lg-12 " >
                    <div className="box">
                        <h3 style={{color: "#07d5c0"}}>{props.vacancy.name}</h3>
                        <div className="price">{props.vacancy.price}<sup> ₽</sup></div>
                        <p>{props.vacancy.text}</p>
                        <Link to={`/vacancy/${props.vacancy.id}`} className="btn-buy">View detail</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vacancy;