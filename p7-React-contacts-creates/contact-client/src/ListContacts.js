import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

class ListContacts extends Component {

   static propTypes = {
    contacts : PropTypes.array.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    }

    state={
        query: '' 
    }

    updateSearch= (query )=> {
        this.setState( ()=>({
            query: query.trim()
        }) )
    }

    clearHandler = () => {
     this.updateSearch('')
    }

      render(){
        //console.log('Props', this.props);
        
        const { query } = this.state
        const { contacts, deleteHandler} = this.props

        const showingContacts = query === '' ? contacts
                                : contacts.filter( (c)=>(
                                    c.name.toLowerCase().includes(query.toLowerCase())
                                ) )

        return (
        <div className='list-contacts'>
            {/* {JSON.stringify(this.state)} */}
         <div className='list-contacts-top'>
              <input 
                 className='search-contacts'
                 type='text'
                 placeholder='Search contacts'
                 value={query}
                 onChange={ (e)=> this.updateSearch(e.target.value) }
                 />

                <Link 
                  className='add-contact' 
                  to= '/Add'
                  >Add Contact </Link>

         </div>  

         { showingContacts.length !== contacts.length && (
             <div className='showing-contacts'>
                 <span> Now shows {showingContacts.length} of
                    {contacts.length}
                 </span>
                 <button onClick={this.clearHandler}>Show all</button>
             </div>
         ) }

          <ol className='contact-list'>
             { showingContacts.map( (contact)=> 
             <li key={contact.name} className='contact-list-item'>
                 <div 
                   className='contact-avatar' 
                    style={{
                       backgroundImage: `url(${contact.avatarURL})`
                 }}>
                 </div>
                 <div className='contact-details'>
                    <p> {contact.name} </p>
                    <p> {contact.handle} </p>
                 </div>
                <button onClick={()=> deleteHandler(contact)} className='contact-remove'>
                    Remove
                </button>
             </li>
             )}
           </ol>
         </div>
           
        )
    }
}
    

export default ListContacts;