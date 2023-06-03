import React, {useState} from 'react';

const Select = ({setRole, setExperience, setCompany}) => {
    const options = [
        {value: '', text: '--Choose role--'},
        {value: 'EXECUTOR', text: 'Executor'},
        {value: 'EMPLOYER', text: 'Employer'},
    ];

    const [selected, setSelected] = useState(options[0].value);

    const handleChange = event => {
        setRole(event.target.value);
        setSelected(event.target.value);
    };

    const CompanyChange = event => {
        setCompany(event.target.value);
    }

    const ExperienceChange = event => {
        setExperience(event.target.value);
    }

    return (
        <div className="container-fluid  mt-3 mb-3 p-0">
            <div className="row input-group m-0">
                <select className="form-select" id="inputGroupSelect01" value={selected} onChange={handleChange}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>
            <div className="row mt-3 me-0 ms-0">
                <input style={{display: selected === "EXECUTOR" ? "block": "none"}} className="form-control" type="text" placeholder="Experience" aria-label="default input example" onChange={e => ExperienceChange(e)}/>
                <input style={{display: selected === "EMPLOYER" ? "block": "none"}} className="form-control" type="text" placeholder="Company" aria-label="default input example" onChange={e => CompanyChange(e)}/>
            </div>
        </div>
    );
};

export default Select;