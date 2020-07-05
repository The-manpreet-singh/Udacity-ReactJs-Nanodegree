import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeFrom from 'form-serialize';

class AddContact extends Component {

    submitHandler = (e) => {
        e.preventDefault()
        const values= serializeFrom( e.target, {hash: true})

        console.log('Value', values)

        if(this.props.onAddContact) {
            this.props.onAddContact(values)
        }
    }
    render() {
        return (
            <div>
                <Link 
                  className='close-create-contact'
                  to='/' >
                  Close
                </Link>
                <form onSubmit={this.submitHandler} className='create-contact-form'>
                   <ImageInput
                     className='create-contact-avatar-input'
                     name='avatarURL'
                     maxHeight={64} />
                   <div className='create-contact-details'>
                       <input type='text' name='name' placeholder='name' />
                       <input type='text' name='handle' placeholder='Handle' />
                       <button>Add Contact</button>
                  </div>  
                </form>
            </div>
        )
    }
}

export default AddContact;
