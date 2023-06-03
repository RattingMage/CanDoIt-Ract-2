import React, {useState} from 'react';
import {add_vacancy} from "../actions/vacancy";
import {Navigate} from "react-router-dom";

const AddVacancy = () => {
    const [formData, setFormData] = useState({
        name: "",
        text: "",
        min_experience: 0,
        price: 0
    });
    const [vacancyCreated, setVacancyCreated] = useState( false);

    const {name, text, min_experience, price} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        add_vacancy(name, text, min_experience, price).then(r => setVacancyCreated(true));
        e.preventDefault();
    };
    if (vacancyCreated){
        return (<Navigate to="/home"/>);
    }
    else {
        return (
            <form className="m-3" onSubmit={e => onSubmit(e)}>
                <input className="form-control form-control-lg mb-3" type="text" placeholder="Name" aria-label=".form-control-lg example" name="name" onChange={e => onChange(e)}></input>
                <textarea className="form-control mb-3" id="exampleFormControlTextarea1" rows="3" placeholder="Description" name="text" onChange={e => onChange(e)}></textarea>
                <input className="form-control form-control-lg mb-3" type="text" placeholder="Price" aria-label=".form-control-lg example" name="price" onChange={e => onChange(e)}></input>
                <input className="form-control form-control-lg mb-3" type="text" placeholder="Experience" aria-label=".form-control-lg example" name="min_experience" onChange={e => onChange(e)}></input>
                <button type="submit" className="btn btn-outline-primary">Add</button>
            </form>
        );
    }
};

export default AddVacancy;