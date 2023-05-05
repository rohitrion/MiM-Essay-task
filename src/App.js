import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react';
function App() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleInputChange = (index, event) => {
    const newOtp = [...otp];
    const value = event.target.value.replace(/\D/, ''); // only allow numeric input
    newOtp[index] = value;

    if (value) {
      // move focus to next input
      if (index < otp.length - 1) {
        event.target.nextElementSibling.focus();
      }
    } else {
      // if input is empty, move focus to previous input
      if (index > 0) {
        event.target.previousElementSibling.focus();
      }
    }

    setOtp(newOtp);
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData('text/plain');
    const newOtp = [...otp];

    for (let i = 0; i < pasteData.length && i < 6; i++) {
      const value = pasteData[i].replace(/\D/, ''); // only allow numeric input
      if (value) {
        newOtp[i] = value;
      }
    }

    setOtp(newOtp);
  };

  const notify = ( )  =>  toast.success("Phone verfied", )  ;

  const Empty = otp.some((digit) => digit === '');

  return (
    <div className="App">


      <div className="phone-verification-popup">
        <h2>Phone Verification</h2>
        <p>Please enter the 6-digit code we sent to your phone number.</p>
        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(event) => handleInputChange(index, event)}
              onKeyDown={(event) => {
                if (event.key === 'Backspace' && !digit) {
                  // delete the previous input and move focus to it
                  const newOtp = [...otp];
                  newOtp[index - 1] = '';
                  setOtp(newOtp);

                  const previousInput = event.target.previousElementSibling;
                  if (previousInput) {
                    previousInput.focus();
                  }

                } else if (event.key === 'ArrowLeft' && index > 0) {
                  // move focus to previous input
                  event.target.previousElementSibling.focus();
                } else if (event.key === 'ArrowRight' && index < otp.length - 1) {
                  // move focus to next input
                  event.target.nextElementSibling.focus();
                }
              }}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <div className='btn'>
          <button >Change-Number </button>
          <button> Resend OTP </button>
        </div>
        <button disabled={Empty} onClick={() => {notify();console.log(otp)}} >Verify</button>
        <ToastContainer position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          limit={1}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />

      </div>


    </div>

  );
}

export default App;
