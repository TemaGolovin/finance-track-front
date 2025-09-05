'use client';
import { EyeClosed, EyeIcon } from 'lucide-react';
import { Input } from './input';
import { ComponentProps, useState } from 'react';
import { Button } from '../button/button';

interface InputPasswordProps extends ComponentProps<typeof Input> {}

export const InputPassword: React.FC<InputPasswordProps> = ({ ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <Input {...props} type={isPasswordVisible ? 'text' : 'password'} autoComplete="off" />
      <Button
        type="button"
        size={'icon'}
        className="absolute right-2 bottom-4 hover:bg-transparent"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? <EyeIcon className="w-5" /> : <EyeClosed className="w-5" />}
      </Button>
    </div>
  );
};
