import socketIO from 'socket.io-client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp} from '@clerk/clerk-react';
import Home from './components/Home.jsx';

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Routes>
          <Route path="/*" element={
            <div className="login">
              <SignIn path="/" routing="path" signUpUrl="/register" afterSignInUrl="/chat"/>
              {' '}
            </div>
          }/>
          <Route path="/register/*" element={
            <div className="login">
              <SignUp afterSignUpUrl="/chat" afterSignInUrl="/chat"/>
            </div>
          }/>
          <Route path="/chat" element={
            <>
              <SignedIn>
                <Home socket={socket}/>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn/>
              </SignedOut>
            </>
          }/>
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  );
}

export default App;
