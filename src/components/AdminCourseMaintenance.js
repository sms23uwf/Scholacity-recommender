import React from 'react';

class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            knowledgeAreaId: props.knowledgeAreaId,
            courseName: '',
            courseDescription: '',
            learningOutcomes: [],
            instructor: '',
            fee: '',
            sessions: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleCourseNameChange(event) {
        this.setState({courseName: event.target.value});
    }

    handleSubmit(event) {
        alert(`course ${this.state.courseName} has been submitted against knowledge area ${this.state.knowledgeAreaId}`)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Course Name:
                    <input type="text" value={this.state.courseName} onChange={this.handleCourseNameChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
