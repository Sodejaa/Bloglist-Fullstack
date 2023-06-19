import PropTypes from 'prop-types'

const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
        return null
    } else if (message !== null && errorMessage === null) {
        return (
            <div className='message'>
                {message}
            </div>
        )
    } else if (message === null && errorMessage !== null) {
        return (
            <div className='errorMessage'>
                {errorMessage}
            </div>
        )
    }
}

Notification.propTypes = {
    message: PropTypes.string,
    errorMessage: PropTypes.string
}

export default Notification