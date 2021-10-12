import React from 'react';
import { ISongsService } from '.';

const SongsServiceContext = React.createContext<ISongsService | null>(null);

export const SongsServiceProvider = SongsServiceContext.Provider;

export const useSongsService = () => {
  const songsService = React.useContext(SongsServiceContext);

  if (!songsService) {
    throw new Error(
      'useSongsService must be used within a SongsServiceProvider'
    );
  }

  return songsService;
};
