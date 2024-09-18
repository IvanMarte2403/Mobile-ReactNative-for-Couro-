// screens/TrainerContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface TrainerContextProps {
  trainerID: string;
  setTrainerID: (id: string) => void;
  token: string;
  setToken: (token: string) => void;
}

export const TrainerContext = createContext<TrainerContextProps>({
  trainerID: '',
  setTrainerID: () => {},
  token: '',
  setToken: () => {},
});

export const TrainerProvider = ({ children }: { children: ReactNode }) => {
  const [trainerID, setTrainerID] = useState('');
  const [token, setToken] = useState('');

  return (
    <TrainerContext.Provider value={{ trainerID, setTrainerID, token, setToken }}>
      {children}
    </TrainerContext.Provider>
  );
};
