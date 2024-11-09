import React, { useState } from 'react';
import './questionnaire.css'; // Import your CSS file

const Questionnaire = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        industryType: '',
        numEmployees: '',
        dailyVisitors: '',
        hasDetectionTech: '',
        safetyMeasures: [],
        currentEffectiveness: 0,
        interestInAI: '',
        priorityLevel: 0,
        responseSpeedImportance: 0,
        concerns: '',
        additionalThoughts: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked 
                    ? [...prevData[name], value] 
                    : prevData[name].filter((item) => item !== value)
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission (e.g., send to API or database)
    };

    return (
        <div className="questionnaire">
            <h1>Firearm Detection Safety Assessment</h1>
            <p>This survey assesses your current safety measures and explores the benefits of integrating AI firearm detection into your business. Your responses will help us tailor solutions that enhance safety.</p>
            
            <form onSubmit={handleSubmit}>
                <h2>Business Information</h2>
                <div className="form-group">
                    <label>Business Name:</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Enter your business name" />
                </div>
                <div className="form-group">
                    <label>Industry Type:</label>
                    <input type="text" name="industryType" value={formData.industryType} onChange={handleChange} placeholder="Enter your industry" />
                </div>
                <div className="form-group">
                    <label>Number of Employees:</label>
                    <input type="number" name="numEmployees" value={formData.numEmployees} onChange={handleChange} placeholder="Enter number of employees" />
                </div>
                <div className="form-group">
                    <label>Daily Visitors:</label>
                    <input type="number" name="dailyVisitors" value={formData.dailyVisitors} onChange={handleChange} placeholder="Enter number of daily visitors" />
                </div>

                <h2>Current Safety Measures</h2>
                <div className="form-group">
                    <label>Do you currently have any firearm detection technology installed?</label>
                    <select name="hasDetectionTech" value={formData.hasDetectionTech} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>What other safety measures do you have in place? (Check all that apply)</label>
                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" name="safetyMeasures" value="Surveillance cameras" onChange={handleChange} /> Surveillance cameras
                        </label>
                        <label>
                            <input type="checkbox" name="safetyMeasures" value="Security guards" onChange={handleChange} /> Security guards
                        </label>
                        <label>
                            <input type="checkbox" name="safetyMeasures" value="Panic buttons" onChange={handleChange} /> Panic buttons
                        </label>
                        <label>
                            <input type="checkbox" name="safetyMeasures" value="Emergency lockdown procedures" onChange={handleChange} /> Emergency lockdown procedures
                        </label>
                        <label>
                            <input type="checkbox" name="safetyMeasures" value="None of the above" onChange={handleChange} /> None of the above
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>How effective do you think your current safety measures are in preventing gun violence incidents?</label>
                    <input type="range" name="currentEffectiveness" min="0" max="5" value={formData.currentEffectiveness} onChange={handleChange} />
                </div>

                <h2>AI Firearm Detection Integration</h2>
                <div className="form-group">
                    <label>Would you be interested in implementing AI firearm detection technology that can instantly alert law enforcement?</label>
                    <select name="interestInAI" value={formData.interestInAI} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="yes">Yes, definitely</option>
                        <option value="possibly">Possibly, I would like more information</option>
                        <option value="no">No, I am not interested</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>What level of priority would you give to improving firearm detection in your safety strategy?</label>
                    <input type="range" name="priorityLevel" min="0" max="5" value={formData.priorityLevel} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>How important is the speed of police response in ensuring safety at your business?</label>
                    <input type="range" name="responseSpeedImportance" min="0" max="5" value={formData.responseSpeedImportance} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>What concerns would you have about integrating AI firearm detection technology?</label>
                    <textarea name="concerns" value={formData.concerns} onChange={handleChange} placeholder="Enter any concerns" />
                </div>
                <div className="form-group">
                    <label>If you would like to share any other thoughts or suggestions about safety improvements, please do so below:</label>
                    <textarea name="additionalThoughts" value={formData.additionalThoughts} onChange={handleChange} placeholder="Enter additional thoughts" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Questionnaire;
