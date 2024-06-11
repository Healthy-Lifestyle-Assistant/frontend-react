import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Alert from '../../shared/components/Alert.js';
import AlertsList from '../../shared/components/AlertsList.js';
import ValidationMessage from '../../shared/components/ValidationMessage.js';
import BackLink from '../../shared/components/BackLink.js';

import { validateToken, getToken } from '../../shared/services/auth';
import { validateTitle, validateDescription, validateHttpLink } from '../../shared/services/validation.js';
import { createHttpRef } from '../../shared/services/requests.js';
import { buildAlertsList } from '../../shared/services/util.js';
import { SESSION_EXPIRED, SUCCESS, WARNING, MEDIA_ADDED } from '../../shared/services/message.js';

function CreatePlan({ isLoggedIn, urlHistory }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { type, id } = useParams();

    const [selectedOption, setSelectedOption] = useState('once');
    const [components, setComponents] = useState([]);
    const [activityId, setActivityId] = useState('');

    const [mediaName, setMediaName] = useState('');
    const [description, setDescription] = useState('');
    const [httpRef, setHttpRef] = useState('');
    const [httpRefType, setHttpRefType] = useState('');

    const [mediaNameValidation, setMediaNameValidation] = useState('');
    const [descriptionValidation, setDescriptionValidation] = useState('');
    const [httpRefValidation, setHttpRefValidation] = useState('');

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [messagesType, setMessagesType] = useState('');

    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_URL', payload: { currentUrl: location.pathname } });

        const fetchData = async () => {
            try {
                const data = await validateToken();
                if (data.status === 200) {
                    dispatch({ type: 'LOGGED_IN' });
                    dispatch({ type: 'SET_USER_DATA', payload: { fullName: data.body[1] } });
                } else {
                    dispatch({ type: 'LOGGED_OUT' });
                    dispatch({ type: 'CLEAR_USER_DATA' });
                    dispatch({ type: 'SET_GLOBAL_MESSAGE', payload: { message: SESSION_EXPIRED, messageType: WARNING } });
                    navigate('/login');
                }
            } catch (error) {
                setMessageType(WARNING);
                setMessage(error.message);
            }
        };

        fetchData();
    }, []);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleAddComponent = () => {
        // Add a new component to the list
        setComponents([...components, <YourComponent />]);
    };

    const handleSubmit = (event) => {
        const requestAPI = async () => {
            try {
                const token = getToken();
                const requestBody = {
                    name: mediaName,
                    description: description,
                    httpRefType: httpRefType,
                    ref: httpRef
                }
                const response = await createHttpRef(token, requestBody);
                if (response.status === 201) {
                    handleClearForm();
                    setMessage(MEDIA_ADDED);
                    setMessageType(SUCCESS);
                    setMessagesList([]);
                    setMessagesType('');
                } else if (response.status === 401) {
                    dispatch({ type: 'LOGGED_OUT' });
                    dispatch({ type: 'CLEAR_USER_DATA' });
                    dispatch({ type: 'SET_GLOBAL_MESSAGE', payload: { message: SESSION_EXPIRED, messageType: WARNING } });
                    navigate('/login');
                } else {
                    const messages = buildAlertsList(response.body)
                    setMessagesType(WARNING);
                    setMessagesList(messages);
                }
            } catch (error) {
                setMessageType(WARNING);
                setMessage(error.message);
            }
        };

        event.preventDefault();
        const titleValidationMessage = validateTitle(mediaName);
        const descriptionValidationMessage = validateDescription(description);
        const httpRefValidationMessage = validateHttpLink(httpRef);

        if (titleValidationMessage === '' && descriptionValidationMessage === '' && httpRefValidationMessage === '') {
            requestAPI();
        } else {
            if (titleValidationMessage !== '') {
                setMediaNameValidation(titleValidationMessage);
            }
            if (descriptionValidationMessage !== '') {
                setDescriptionValidation(descriptionValidationMessage);
            }
            if (httpRefValidationMessage !== '') {
                setHttpRefValidation(httpRefValidationMessage);
            }
        }
    };

    const handleClearForm = () => {
        setMediaNameValidation('');
        setDescriptionValidation('');
        setHttpRefValidation('');

        setMessagesList([]);
        setMessagesType('');

        setMediaName('');
        setDescription('');
        setHttpRef('');
        setHttpRefType('');
        setMessage('');
        setMessageType('');
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Add to Calendar</title>
                    <html lang='en' />
                </Helmet>
            </HelmetProvider>

            <BackLink previousUrl={urlHistory.previousUrl} currentUrl={urlHistory.currentUrl} />

            <div className='custom-heading'>Add activity to the calendar</div>

            <Alert message={message} messageType={messageType} />

            {messagesList && messagesList.length > 0 &&
                (<AlertsList messages={messagesList} messageType={messagesType} />)}

            <form onSubmit={handleSubmit}>
                {/* select workout, once or repeat,
                once: day and time,
                repeat: start date, end date, days with hours, minutes */}

                <div className='form-group'>
                    <select id='activityId' name='activityId' className='form-label form-input filter-mr'
                        value={activityId} onChange={(e) => setActivityId(e.target.value)} required>
                        <option value='' disabled>Select Activity</option>
                        <option value='id1'>Workout 1</option>
                        <option value='id2'>Workout 2</option>
                    </select>
                </div>

                <div>
                    <div>
                        <input
                            type="radio"
                            id="once"
                            value="once"
                            checked={selectedOption === 'once'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="once">Once</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="repeat"
                            value="repeat"
                            checked={selectedOption === 'repeat'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="repeat">Repeat</label>
                    </div>

                    {selectedOption === 'once' ? (
                        <div>
                            <label>Date and Time:</label>
                            {/* Render your date and time input fields here */}
                            {/* Example: <input type="datetime-local" /> */}
                        </div>
                    ) : (
                        <div>
                            <label>Repeat Interval:</label>
                            <div>
                                <label>Day:</label>
                                <input type="number" />
                            </div>
                            <div>
                                <label>Hours:</label>
                                <input type="number" />
                            </div>
                            <div>
                                <label>Minutes:</label>
                                <input type="number" />
                            </div>

                            {/* plus button */}
                            <div>
                                <button onClick={handleAddComponent}>Add day</button>
                                <div>
                                    {components.map((Component, index) => (
                                        <div key={index}>
                                            <Component />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='form-group filter-mr'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input type='text' id='name' name='name' className='form-input'
                        value={mediaName} onChange={(e) => setMediaName(e.target.value)} required />
                    {mediaNameValidation && <ValidationMessage message={mediaNameValidation} />}
                </div>

                <div className='form-group'>
                    <label htmlFor='description' className='form-label'>Description</label>
                    <input type='text' id='description' name='description' className='form-input'
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                    {descriptionValidation && <ValidationMessage message={descriptionValidation} />}
                </div>



                <div className='form-group'>
                    <label htmlFor='httpRef' className='form-label'>Link</label>
                    <input type='text' id='httpRef' name='httpRef' className='form-input'
                        value={httpRef} onChange={(e) => setHttpRef(e.target.value)} required />
                    {httpRefValidation && <ValidationMessage message={httpRefValidation} />}
                </div>

                <button type='button' className='form-btn' onClick={handleClearForm} style={{ marginRight: 8 }}>Clear</button>
                <input type='submit' value='Apply' className='form-btn' />
            </form>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        urlHistory: state.urlHistory
    };
};

export default connect(mapStateToProps)(CreatePlan);