import { FC, useState } from 'react';

interface ListBoxProps {
  children: React.ReactNode;
}

const Box: FC<ListBoxProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
};

export default Box;
