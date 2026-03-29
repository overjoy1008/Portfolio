"use client";

import React, { useState } from "react";
import { MusicPlayer } from "./MusicPlayer";
import { EmailModal } from "./emailModal";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // We need to pass setIsEmailModalOpen down to children if they need it.
  // Since we're using a simple Layout, we can use a custom event or a context,
  // but for "minimal changes", I'll just keep the modal here and use a global state or just keep it in App for now if it's easier.
  // Actually, the user asked for Music Player to be global. 
  // Let's just put the persistent elements here.

  return (
    <>
      {children}
      <MusicPlayer />
      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />
      {/* 
        To allow children to open the modal, we can use a simple window event 
        or just keep the modal in App.tsx but outside the Routes.
      */}
    </>
  );
};
