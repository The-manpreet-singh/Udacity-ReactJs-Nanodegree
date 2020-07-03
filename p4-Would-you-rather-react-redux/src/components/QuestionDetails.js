import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

const QuestionDetails = props => (
    <div className='component-container'>
        <Question id={props.match.params.id} detailed/>
    </div>
)

export default connect()(QuestionDetails);
