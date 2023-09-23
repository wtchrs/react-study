import {useState} from 'react';

interface Props {
  children: string;
  maxChars?: number;
}

const ExpandableText = ({children, maxChars = 100}: Props) => {
  if (children.length <= maxChars) return <p>{children}</p>;

  const [isExpanded, setExpanded] = useState(false);
  const text = isExpanded ? children : children.substring(0, maxChars) + '...';
  const handleToggle = () => setExpanded(!isExpanded);

  return (
    <p>{text}
      <button onClick={handleToggle}>{isExpanded ? 'less' : 'more'}</button>
    </p>
  );
};

export default ExpandableText;