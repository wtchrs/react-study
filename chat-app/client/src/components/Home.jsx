import {SignOutButton, useAuth} from '@clerk/clerk-react';
import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';

const Home = ({socket}) => {
  const {isLoaded, userId} = useAuth();

  const [write, setWrite] = useState(false);
  const [value, setValue] = useState('');

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  useEffect(() => {
    socket.on('messageResponse', data => {
      setMessages([...messages, data]);
      if (!onlineUsers.includes(data.userId)) {
        setOnlineUsers([...onlineUsers, data.userId]);
      }
    });
  }, [socket, messages, onlineUsers]);

  const handleSubmit = () => {
    console.log('handleSubmit');
    setWrite(false);
    if (value) {
      socket.emit('message', {value, userId: userId.slice(0, 10)});
      setValue('');
    }
  };

  const handleChange = (input) => {
    console.log(input);
    setValue(input);
  };

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">Mingle</Link>
        <SignOutButton signOutCallback={() => console.log('Signed out!')}>
          <button className="signOutBtn">Sign out</button>
        </SignOutButton>
      </nav>

      {!write ? (
        <main className="chat">
          <div className="chat__body">
            <div className="chat__content">
              {messages.map((msg, index) =>
                msg.userId === userId.slice(0, 10) ? (
                  <div style={{float: 'right', margin: '7px 0'}} key={index}>
                    <p style={{textAlign: 'right', fontSize: '13px'}}>{msg.userId}</p>
                    <div className="sender__message">{msg.value}</div>
                  </div>
                ) : (
                  <div style={{margin: '7px 0'}} key={index}>
                    <p style={{fontSize: '13px'}}>{msg.userId}</p>
                    <div className="recipient__message">{msg.value}</div>
                  </div>
                ),
              )}
              <div ref={lastMessageRef}></div>
            </div>
            <div className="chat__input">
              <div className="chat__form">
                <button className="createBtn" onClick={() => setWrite(true)}>Write message</button>
              </div>
            </div>
          </div>
          <aside className="chat__bar">
            <h3>Active users</h3>
            <ul>
              {onlineUsers.map(user => <li key={user}>{user}</li>)}
            </ul>
          </aside>
        </main>
      ) : (
        <main className="editor">
          <header className="editor__header">
            <button className="editorBtn" onClick={handleSubmit}>SEND MESSAGE</button>
          </header>
          <div className="editor__container">
            <textarea onChange={e => handleChange(e.target.value)}></textarea>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
