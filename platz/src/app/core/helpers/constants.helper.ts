export const OPTIONS = {
    emailPattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z]{2,4}$',
};
export const authFieldsErrors = {
    email: [
        { type: 'required', message: 'Enter email address' },
        { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
        { type: 'required', message: 'Enter password' },
        { type: 'minlength', message: 'Password cannot be less than 6 characters' }
    ],
    confirmPassword: [
        { type: 'misMatch', message: 'Password & confirm password didn\'t match' }]
};